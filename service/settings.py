from pydantic import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    app_dir: Path = Path(__file__).parents[1]
    base_path: str = "/api/v1"
