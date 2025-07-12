# skill-swap-platform/server/routes/admin.py
from fastapi import APIRouter, HTTPException
from database import users, swaps, announcements
from bson import ObjectId
router = APIRouter()

@router.get("/users")
def all_users():
    user_list = users.find({}, {"password": 0})
    output = []
    for user in user_list:
        user["_id"] = str(user["_id"])
        output.append(user)
    return output

@router.patch("/user/{user_id}/ban")
def ban_user(user_id: str):
    users.update_one({"_id": ObjectId(user_id)}, {"$set": {"banned": True}})
    return {"status": "banned"}

@router.delete("/user/{user_id}")
def delete_user(user_id: str):
    users.delete_one({"_id": ObjectId(user_id)})
    return {"status": "deleted"}

@router.get("/swaps")
def all_swaps():
    swap_list = swaps.find({})
    output = []
    for swap in swap_list:
        swap["_id"] = str(swap["_id"])
        output.append(swap)
    return output

@router.delete("/swap/{swap_id}")
def delete_swap_admin(swap_id: str):
    swaps.delete_one({"_id": ObjectId(swap_id)})
    return {"status": "deleted"}

@router.post("/announce")
def announce(data: dict):
    announcements.insert_one(data)
    return {"status": "announcement posted"}

@router.get("/report/users")
def report_users():
    user_list = users.find({}, {"password": 0})
    output = []
    for user in user_list:
        user["_id"] = str(user["_id"])
        output.append(user)
    return output

@router.get("/report/swaps")
def report_swaps():
    swap_list = swaps.find({})
    output = []
    for swap in swap_list:
        swap["_id"] = str(swap["_id"])
        output.append(swap)
    return output
