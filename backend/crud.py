from sqlalchemy.orm import Session
import models, schemas
from datetime import date

# 프로젝트 관련 함수들
def get_project(db: Session, projId: int):
    return db.query(models.Project).filter(models.Project.projId == projId).first()

def get_project_by_name(db: Session, proj_name: str):
    return db.query(models.Project).filter(models.Project.projName == proj_name).first()

def get_projects(db: Session):
    return db.query(models.Project).all()

def create_project(db: Session, project: schemas.ProjCreate):
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, projId: int, project: schemas.ProjCreate):
    db_project = db.query(models.Project).filter(models.Project.projId == projId).first()
    if db_project:
        for key, value in project.model_dump().items():
            setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
    return db_project

def delete_project(db: Session, projId: int):
    db_project = db.query(models.Project).filter(models.Project.projId == projId).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project


# 태스크 관련 함수들
def get_task(db: Session, taskId: int):
    return db.query(models.Task).filter(models.Task.taskId == taskId).first()

def get_task_by_name(db: Session, task_name: str):
    return db.query(models.Task).filter(models.Task.taskName == task_name).first()

def get_tasks(db: Session, projId: int):
    return db.query(models.Task).filter(models.Task.projId == projId).all()

def create_task(db: Session, task: schemas.TaskCreate, projId: int):
    db_task = models.Task(**task.model_dump(), projId=projId)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, taskId: int, task: schemas.TaskCreate):
    db_task = db.query(models.Task).filter(models.Task.taskId == taskId).first()
    if db_task:
        for key, value in task.model_dump().items():
            setattr(db_task, key, value)
        db.commit()
        db.refresh(db_task)
    return db_task

def delete_task(db: Session, taskId: int):
    db_task = db.query(models.Task).filter(models.Task.taskId == taskId).first()
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task

# 프로젝트에 속한 태스크 가져오기
def get_tasks_by_project(db: Session, projId: int):
    return db.query(models.Task).filter(models.Task.projId == projId).all()


# Workflow 관련 함수
def get_workflows(db: Session):
    return db.query(models.Workflow).all()

def create_workflow(db, taskId: str, wfName: str, status=0):        
    db_wf = models.Workflow(taskId=taskId, wfName=wfName, status=status) # 사용자가 지정한 값 또는 기본값
    db.add(db_wf)
    db.commit()
    db.refresh(db_wf)    
    return db_wf


# unitoperation 관련 함수
def get_unitOperations(db: Session):
    return db.query(models.UnitOperation).all()

def create_unitOperation(db, wfId: str, uoName: str, status=0):        
    db_uo = models.UnitOperation(wfId=wfId, uoName=uoName, status=status) # 사용자가 지정한 값 또는 기본값
    db.add(db_uo)
    db.commit()
    db.refresh(db_uo)
    return db_uo