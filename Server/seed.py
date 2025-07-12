from database import users, swaps

# Insert sample users
users.insert_many([
    {
        "name": "Sujal Sule",
        "email": "sujal@gmail.com",
        "password": "1234",
        "skills_offered": ["HTML", "CSS"],
        "skills_wanted": ["Python"],
        "availability": "Weekends",
        "public": True,
        "role": "user",
        "banned": False
    },
    {
        "name": "Admin User",
        "email": "admin@gmail.com",
        "password": "admin123",
        "skills_offered": [],
        "skills_wanted": [],
        "availability": "Anytime",
        "public": False,
        "role": "admin",
        "banned": False
    }
])
print("✅ Users seeded.")
