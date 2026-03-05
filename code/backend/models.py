from fastapi import FastAPI, HTTPException, Depends
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Info(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    repo_url: str
    summary : str
    genres: str
    playlist_url: str

