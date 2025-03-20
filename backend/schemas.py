from pydantic import BaseModel, EmailStr

# Signup schema (requires fullName)
class UserCreate(BaseModel):
    full_name: str  # Use snake_case for Pydantic model fields
    email: EmailStr
    password: str

# Login schema (only email & password)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Task creation schema
class TaskCreate(BaseModel):
    created_by: str
    title: str
    description: str
    status: str

    class Config:
        orm_mode = True  # Allows conversion from SQLAlchemy ORM models


# ✅ Task response schema
class TaskResponse(TaskCreate):
    id: int  # Include `id` for response

    class Config:
        orm_mode = True