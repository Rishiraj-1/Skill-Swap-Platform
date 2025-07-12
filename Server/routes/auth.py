# skill-swap-platform/server/routes/auth.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import users

router = APIRouter()

# ✅ Pydantic model for signup request
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    location: str
    skills_offered: list[str]
    skills_wanted: list[str]
    availability: str

# ✅ Pydantic model for login request
class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(data: SignupRequest):
    if users.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    user = data.dict()
    user["role"] = "user"
    user["public"] = True
    user["banned"] = False
    users.insert_one(user)
    return {"status": "success", "message": "User created"}

@router.post("/login")
def login(data: LoginRequest):
    user = users.find_one({"email": data.email})
    print("Login Attempt: ", data.email)
    if not user:
        print("User not found")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if user["password"] != data.password:
        print("Wrong password for", data.email)
        raise HTTPException(status_code=401, detail="Invalid credentials")

    print("✅ Logged in:", user["email"])
    user["_id"] = str(user["_id"])
    user.pop("password", None)
    return {"status": "success", "user": user}