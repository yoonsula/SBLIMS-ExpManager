from pydantic import BaseModel # Most widely used data validation library for python
from typing import Union
from datetime import date

class ProjBase(BaseModel):
    projName: str
    manager: str
    genDate: date
    startDate: date
    endDate: date
    info: Union[str, None] = None
    status: int
    files: Union[str, None] = None
        
class ProjCreate(ProjBase):
    pass

class Proj(ProjBase):
    projId: int
    
    class Config: 
        from_attributes = True
                
        
class TaskBase(BaseModel):
    taskName: str
    researcher: str
    DNA_ConstructID: Union[str, None] = None
    genDate: date
    startDate: date
    endDate: date
    structure: Union[str, None] = None
    status: int
        
class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    taskId: int
    projId: int
    
    class Config:
        from_attributes = True
        
        
class wfBase(BaseModel):
    wfName: Union[str, None] = None
    status: int
    
class WfCreate(wfBase):
    pass
    
class Workflow(wfBase):
    taskId: int
    wfId: int
    
    class Config:
        from_attributes = True
        
        
class uoBase(BaseModel):
    uoName: Union[str, None] = None
    status: int

class uoCreate(uoBase):
    pass

class UnitOperation(uoBase):
    wfId: int
    uoId: int
    
    class Config:
        from_attributes = True
        
