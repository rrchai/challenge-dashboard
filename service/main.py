from fastapi import FastAPI, Response, HTTPException
from fastapi.responses import RedirectResponse
import re

from challengeObjs import Challenge, Evaluation
from typing import List, Union
from utils import find_staging
import synapseclient
from challengeutils.utils import delete_submission
# from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware

syn = synapseclient.Synapse(configPath="./.synapseConfig")
syn.login()
id = syn.getUserProfile()["ownerId"]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
def docs_handler():
    return RedirectResponse(app.docs_url)


# @app.get("/user/favorites")
# def list_favorites():
#     return syn.restGET("/favorite")


@app.get("/user/challenges")
def list_challenges(user=id) -> List[Challenge]:
    chlgs = syn.restGET(f"/challenge?participantId={user}")
    chlg_objs = []
    for chlg in chlgs["results"]:
        chlg_name = syn.restGET(f"/entity/{chlg['projectId']}")["name"]
        chlg_obj = Challenge(chlg["id"], chlg["projectId"], chlg_name)
        chlg_objs.append(chlg_obj)
    return {"results": chlg_objs, "totalNumberOfResults": chlgs["totalNumberOfResults"]}


@app.get("/challenge/{id}")
def get_challenge(id: str):
    return syn.restGET(f"/challenge/{id}")


@app.get("/challenge/{projectId}/staging")
def get_staging(projectId: str) -> List[Evaluation]:
    return find_staging(syn, projectId)


@app.get("/challenge/{projectId}/evaluations")
def list_evaluations(projectId: str) -> List[Evaluation]:
    evals = syn.getEvaluationByContentSource(projectId)
    eval_objs = []
    for eval in evals:
        eval_objs.append({"id": eval["id"], "name": eval["name"]})
    return {"results": eval_objs, "totalNumberOfResults": len(eval_objs)}


@app.get("/challenge/{projectId}/views")
def list_submission_views(projectId: str):
    staging = get_staging(projectId)
    return [t for t in syn.getChildren(staging['projectId'], includeTypes=['submissionview'])]


@app.get("/challenge/{projectId}/workflows")
def list_workflows(projectId: str):
    staging = get_staging(projectId)
    folders = [t for t in syn.getChildren(
        staging['projectId'], includeTypes=['folder'])]
    infra = list(filter(lambda d: re.search(
        r"infrastructure|infra", d["name"], re.I), folders))
    # why wf is not link?? - looks like a bug from synapse
    # and how to get link url to retrieve github url
    wfs = syn.getChildren(infra[0]["id"], includeTypes=['file'])
    return wfs


@app.get("/view/{id}")
def get_submission_view(id: str):
    # feel like faster than 'evaluation_queue_query' with no limits
    query = f"select * from {id}"
    view_df = syn.tableQuery(query).asDataFrame(
    )
    return Response(view_df.to_json(orient="records"), media_type="application/json")

@app.delete("/submission/{id}")
def delete_a_submission(id: str):
    try:
        delete_submission(syn, id)
        return {}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
