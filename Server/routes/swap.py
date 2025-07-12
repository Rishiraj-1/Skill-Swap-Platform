from fastapi import APIRouter, HTTPException
from database import swaps
from bson import ObjectId

router = APIRouter()

@router.post("/request")
def create_swap(data: dict):
    data["status"] = "pending"
    swaps.insert_one(data)
    return {"status": "success"}

@router.get("/user/{email}")
def get_user_swaps(email: str):
    swap_list = swaps.find({"$or": [{"from_user_email": email}, {"to_user_email": email}]})
    output = []
    for swap in swap_list:
        swap["_id"] = str(swap["_id"])
        output.append(swap)
    return output

@router.patch("/{swap_id}")
def update_swap(swap_id: str, data: dict):
    swaps.update_one({"_id": ObjectId(swap_id)}, {"$set": {"status": data["status"]}})
    return {"status": "updated"}

@router.delete("/{swap_id}")
def delete_swap(swap_id: str):
    swaps.delete_one({"_id": ObjectId(swap_id)})
    return {"status": "deleted"}