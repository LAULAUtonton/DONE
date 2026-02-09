from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI()

# CORS: permitir frontend de Netlify
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://journal3eso.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/api/groups")
def get_groups():
    return []

class GroupCreate(BaseModel):
    group_name: str
    members: List[str]
    project_type: str

@app.post("/api/groups")
def create_group(group: GroupCreate):
    return {
        "id": str(uuid.uuid4()),
        "group_name": group.group_name,
        "members": group.members,
        "project_type": group.project_type,
    }
