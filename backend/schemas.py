from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    fullName: str  
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str

    class Config:
        orm_mode = True  


class TaskResponse(TaskCreate):
    id: int  

    class Config:
        orm_mode = True
