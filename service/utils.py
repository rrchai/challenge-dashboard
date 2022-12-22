
from challengeObjs import Challenge


def find_staging(syn, live_id) -> Challenge:

    live_name = syn.restGET(f"/entity/{live_id}")["name"]
    staging_id = live_id[:-1] + str(int(live_id[len(live_id)-1]) + 1)
    staging_name = syn.restGET(f"/entity/{staging_id}")["name"]

    if staging_name == f"{live_name} - staging":
        return {"projectId": staging_id, "name": staging_name}
    else:
        return {}
