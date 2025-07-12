# skill-swap-platform/server/routes/user.py
from fastapi import APIRouter, HTTPException
from database import users
from bson import ObjectId
from pydantic import BaseModel

router = APIRouter()

class VisibilityRequest(BaseModel):
    email: str
    public: bool

@router.patch("/visibility")
def toggle_visibility(data: VisibilityRequest):
    users.update_one({"email": data.email}, {"$set": {"public": data.public}})
    return {"status": "success"}

@router.get("/public")
def public_users():
    public_list = users.find({"public": True}, {"password": 0})
    output = []
    for user in public_list:
        user["_id"] = str(user["_id"])
        output.append(user)
    return output

@router.get("/{email}")
def get_user(email: str):
    user = users.find_one({"email": email}, {"password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = str(user["_id"])
    return user

@router.put("/update")
def update_user(data: dict):
    users.update_one({"email": data["email"]}, {"$set": data})
    return {"status": "success"}
