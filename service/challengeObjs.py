from typing import Union


class Evaluation:
    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name


class ChallengeProject:
    def __init__(self, projectId: str, name: str):
        self.projectId = projectId
        self.name = name


class Challenge:
    def __init__(self, id: str, projectId: str, name: str):
        self.id = id
        self.projectId = projectId
        self.name = name
