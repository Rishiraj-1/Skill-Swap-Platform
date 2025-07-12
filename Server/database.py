# skill-swap-platform/server/database.py
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("MONGO_URL"))
db = client["skill_swap"]

users = db["users"]
swaps = db["swap_requests"]
feedback = db["feedback"]
announcements = db["announcements"]