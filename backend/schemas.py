from pydantic import BaseModel, EmailStr

# Signup schema
class UserCreate(BaseModel):
    full_name: str  
    email: EmailStr
    password: str

# Login schema 
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
        orm_mode = True  


class TaskResponse(TaskCreate):
    id: int  

    class Config:
        orm_mode = True
