from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship

from database import Base

class Project(Base):
    __tablename__ = "Project"

    projId = Column(Integer, primary_key=True, autoincrement=True)
    projName = Column(String(16), unique=True, index=True)
    manager = Column(String(16))
    genDate = Column(Date)
    startDate = Column(Date)
    endDate = Column(Date)
    info = Column(String(200))
    status = Column(Integer)
    files = Column(String)

    tasks = relationship("Task", back_populates="projects")
    

class Task(Base):
    __tablename__ = "Task"
    
    taskId = Column(Integer, primary_key=True, autoincrement=True)
    taskName = Column(String(16), unique=True, index=True)
    researcher = Column(String(16))
    projId = Column(Integer, ForeignKey("Project.projId"))
    DNA_ConstructID = Column(String(32))
    genDate = Column(Date)
    startDate = Column(Date)
    endDate = Column(Date)
    structure = Column(String) # Store file path
    status = Column(Integer)
    
    projects = relationship("Project", back_populates="tasks")
    
    
class Workflow(Base):
    __tablename__ = "Workflow"
    
    taskId = Column(Integer, ForeignKey("Task.taskId"))
    wfId = Column(Integer, primary_key=True, autoincrement=True)
    wfName = Column(String(32))
    status = Column(Integer, default=0)
    

class UnitOperation(Base):
    __tablename__ = "UnitOperation"
    
    wfId = Column(Integer, ForeignKey("Workflow.wfId"))
    uoId = Column(Integer, primary_key=True, autoincrement=True)
    uoName = Column(String(32))
    status = Column(Integer, default=0)