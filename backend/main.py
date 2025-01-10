from fastapi import Depends, FastAPI, HTTPException, Request, Response, File, UploadFile, Form
from datetime import date
from sqlalchemy.orm import Session
from typing import List, Optional

import crud, models, schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from fastapi.responses import FileResponse
from md_parsing import parse_markdown_headers
from fastapi.responses import JSONResponse
from typing import Union
from PIL import Image
import io
from fastapi.responses import PlainTextResponse

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "SBLIMS",
    description="## Experiment Manager api",
    version="1.0.1"
)

ALLOW_ORIGINS = [
    "*",
    # "http://localhost:8081",
    # "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


def get_db(request: Request):
    return request.state.db

# 프로젝트 관련 엔드포인트

## 프로젝트 읽기
@app.get("/projects/", response_model=List[schemas.Proj])
def read_projects(db: Session = Depends(get_db)):
    projects = crud.get_projects(db)
    return projects

## 프로젝트 생성
@app.post("/project/")
def create_project(projName: str=Form(...),
                   manager: str=Form(...),
                   genDate: date=Form(...),
                   startDate: date=Form(...),
                   endDate: date=Form(...),
                   info: Union[str, None]=Form(None),
                   status: int=Form(...),
                   file: UploadFile = File(...),
                   db: Session = Depends(get_db)
                   ):
    
    if file:    
        upload_dir = f"./uploaded_files/projects/{projName}"
        
        # 디렉토리가 존재하지 않으면 생성
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
            
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
    db_project = schemas.ProjBase(projName=projName,
                                 manager=manager,
                                 genDate=genDate,
                                 startDate=startDate,
                                 endDate=endDate,
                                 info=info,
                                 status=status,
                                 files=file_path)
    print(db_project.dict())

    return crud.create_project(db=db, project=db_project)
    

## 프로젝트 하나 읽기
@app.get("/projects/{projId}", response_model=schemas.Proj)
def read_project(projId: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, projId=projId)
    if db_project is None:
        raise HTTPException(status_code=404, detail="프로젝트를 찾을 수 없습니다")
    return db_project

## 프로젝트 수정
# @app.put("/projects/{projId}", response_model=schemas.Proj)
# def update_project(projId: int, project: schemas.ProjCreate, db: Session = Depends(get_db)):
#     db_project = crud.update_project(db, projId=projId, project=project)
#     if db_project is None:
#         raise HTTPException(status_code=404, detail="프로젝트를 찾을 수 없습니다")
#     return db_project
@app.put("/projects/{projId}", response_model=schemas.Proj)
def update_project(projId: int,
                   projName: str = Form(...),
                   manager: str = Form(...),
                   genDate: date = Form(...),
                   startDate: date = Form(...),
                   endDate: date = Form(...),
                   info: Union[str, None] = Form(None),
                   status: int = Form(...),
                   file: UploadFile = File(None),  # 파일은 필수 아님
                   db: Session = Depends(get_db)):
    
    db_project = crud.get_project(db, projId=projId)  # 기존 프로젝트 존재 여부 확인
    if db_project is None:
        raise HTTPException(status_code=404, detail="프로젝트를 찾을 수 없습니다")

    # 파일 저장 처리 (파일이 제공된 경우에만)
    file_path = db_project.files
    if file:
        upload_dir = f"./uploaded_files/projects/{projName}"
        
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    # 프로젝트 정보 업데이트
    update_data = schemas.ProjBase(
        projName=projName,
        manager=manager,
        genDate=genDate,
        startDate=startDate,
        endDate=endDate,
        info=info,
        status=status,
        files=file_path
    )

    # DB 업데이트 수행
    db_project = crud.update_project(db, projId=projId, project=update_data)
    
    return db_project

## 프로젝트 삭제
@app.delete("/projects/{projId}", response_model=schemas.Proj)
def delete_project(projId: int, db: Session = Depends(get_db)):
    db_project = crud.delete_project(db, projId=projId)
    if db_project is None:
        raise HTTPException(status_code=404, detail="프로젝트를 찾을 수 없습니다")
    return db_project

# 태스크 관련 엔드포인트

## 태스크 읽기
@app.get("/tasks/", response_model=List[schemas.Task])
def read_tasks(projId: int, db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db, projId)
    return tasks

## 태스크 생성
@app.post("/task/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, projId: int, db: Session = Depends(get_db)):
    db_task = crud.get_task_by_name(db, task_name=task.taskName)
    if db_task:
        raise HTTPException(status_code=400, detail="태스크 이름이 이미 사용 중입니다")
    return crud.create_task(db=db, task=task, projId=projId)


## 태스크 업로드 및 workflow/unitOperation 업로드(완료) + 마크다운파일 제한 (진행전)
@app.post("/projects/{projId}/tasks/")
def create_task_for_project(projId: int, 
                            taskName: str = Form(...),
                            researcher: str = Form(...),
                            DNA_ConstructID: str = Form(...),
                            genDate: date = Form(...),
                            startDate: date = Form(...),
                            endDate: date = Form(...),
                            status: int = Form(...),
                            structure: Optional[UploadFile] = File(None),
                            db: Session = Depends(get_db)):
        
    task_data = {
        "taskName": taskName,
        "researcher": researcher,
        "DNA_ConstructID": DNA_ConstructID,
        "genDate": genDate,
        "startDate": startDate,
        "endDate": endDate,
        "structure": None, # filepath에 taskId 붙여주기 위해 None으로 일단 업로드
        "status": status
    }
    
    task_create = schemas.TaskCreate(**task_data)
    db_task = crud.create_task(db=db, task=task_create, projId=projId)
    
    
    if structure:    
        upload_dir = f"uploaded_files/task_{db_task.taskId}"
        
        # 디렉토리가 존재하지 않으면 생성
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
            
        file_path = os.path.join(upload_dir, structure.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(structure.file, buffer)
            
        db_task.structure = file_path
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        
        header_structure = parse_markdown_headers(db_task.structure)
        
        for wfName, uo_list in header_structure.items():
            db_wf = crud.create_workflow(db=db, taskId=db_task.taskId, wfName=wfName)
            if db_wf is None:
                raise HTTPException(status_code=404, detail="워크플로우를 찾을 수 없습니다")
            for uoName in uo_list:
                db_uo = crud.create_unitOperation(db=db, wfId=db_wf.wfId, uoName=uoName)
                if db_uo is None:
                    raise HTTPException(status_code=404, detail="유닛오퍼레이션을 찾을 수 없습니다")
    if structure is None:
        db_task.structure = None
        
    return db_task

## 태스크 하나 읽기
@app.get("/tasks/{taskId}", response_model=schemas.Task)
def read_task(taskId: int, db: Session = Depends(get_db)):
    db_task = crud.get_task(db, taskId=taskId)
    if db_task is None:
        raise HTTPException(status_code=404, detail="태스크를 찾을 수 없습니다")
    return db_task

## 태스크 업데이트
@app.put("/tasks/{taskId}/")
def update_task(taskId: int,
                taskName: Optional[str] = Form(...),
                researcher: Optional[str] = Form(...),
                DNA_ConstructID: Optional[str] = Form(...),
                genDate: Optional[date] = Form(...),
                startDate: Optional[date] = Form(...),
                endDate: Optional[date] = Form(...),
                status: Optional[int] = Form(...),
                structure: Optional[UploadFile] = File(None), 
                db: Session = Depends(get_db)):

    db_task = crud.get_task(db=db, taskId=taskId)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = {
        "taskName": taskName,
        "researcher": researcher,
        "DNA_ConstructID": DNA_ConstructID,
        "genDate": genDate,
        "startDate": startDate,
        "endDate": endDate,
        "status": status
    }
    
    for key, value in update_data.items():
        if value is not None:
            setattr(db_task, key, value)
        

    if structure:
        upload_dir = f"./uploaded_files/task_{db_task.taskId}"
        # 이전에 파일 업로드 안했었으면 폴더 새로 생성해줘야함.
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        file_path = os.path.join(upload_dir, structure.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(structure.file, buffer)

        db_task.structure = file_path
        
    
        header_structure = parse_markdown_headers(db_task.structure)
        
        for wfName, uo_list in header_structure.items():
            db_wf = crud.create_workflow(db=db, taskId=db_task.taskId, wfName=wfName)
            if db_wf is None:
                raise HTTPException(status_code=404, detail="워크플로우를 찾을 수 없습니다")
            for uoName in uo_list:
                db_uo = crud.create_unitOperation(db=db, wfId=db_wf.wfId, uoName=uoName)
                if db_uo is None:
                    raise HTTPException(status_code=404, detail="유닛오퍼레이션을 찾을 수 없습니다")
    if structure is None:
        db_task.structure = None
                
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

## 태스크 삭제
@app.delete("/tasks/{taskId}", response_model=schemas.Task)
def delete_task(taskId: int, db: Session = Depends(get_db)):
    db_task = crud.delete_task(db, taskId=taskId)
    if db_task is None:
        raise HTTPException(status_code=404, detail="태스크를 찾을 수 없습니다")
    return db_task

@app.get("/projects/{projId}/tasks/", response_model=List[schemas.Task])
def read_tasks_by_project(projId: int, db: Session = Depends(get_db)):
    tasks = crud.get_tasks_by_project(db, projId=projId)
    return tasks

## 태스크 DB 파일 다운로드 (완료)
@app.get("/tasks/{task_id}/download")
def download_task_structure(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task(db=db, task_id=task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    file_path = db_task.structure
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(path=file_path, filename=os.path.basename(file_path))

## 워크플로우 테이블 불러오기 (완료)
@app.get("/workflows/", response_model=List[schemas.Workflow])
def read_workflows(db: Session = Depends(get_db)):
    projects = crud.get_workflows(db)
    return projects

## 유닛오퍼레이션 테이블 불러오기 (완료)
@app.get("/unitoperations/", response_model=List[schemas.UnitOperation])
def read_unitOperations(db: Session = Depends(get_db)):
    unitOperations = crud.get_unitOperations(db)
    return unitOperations


# project db 내 마크다운 파일 업로드
@app.post("/upload/{projId}/")
async def upload_proj_file(projId, file: UploadFile, db: Session = Depends(get_db)):
    UPLOAD_DIR = f"./uploaded_files/projects/{projId}"  # 이미지를 저장할 서버 경로
    
    content = await file.read()
    file_name = file.filename
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    with open(file_path, "wb") as fp:
        fp.write(content)  # 서버 로컬 스토리지에 이미지 저장 (쓰기)

    db_proj = crud.get_project(db=db, projId=projId)
    if not db_proj:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db_proj.files = file_path
    db.add(db_proj)
    db.commit()
    db.refresh(db_proj)
    
    return {"project": db_proj, "filePath": file_path}

# task db 내 마크다운 파일 업로드
@app.post("/upload/{taskId}/")
async def upload_task_file(taskId, file: UploadFile, db: Session = Depends(get_db)):
    UPLOAD_DIR = f"./uploaded_files/tasks/{taskId}"  # 이미지를 저장할 서버 경로
    
    if not file.filename.endswith('.md'):
        raise HTTPException(status_code=400, detail="Only .md files are supported.")
    
    content = await file.read()
    file_name = file.filename
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    with open(file_path, "wb") as fp:
        fp.write(content)  # 서버 로컬 스토리지에 이미지 저장 (쓰기)

    db_task = crud.get_task(db=db, taskId=taskId)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.structure = file_path
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    
    return {"task": db_task}


@app.get("/project/{projId}/image/")
async def get_proj_file(projId, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, projId=projId)
    if db_project is None:
        raise HTTPException(status_code=404, detail="프로젝트를 찾을 수 없습니다")
    
    file_path = db_project.files
    print(file_path)
    # 경로에 파일이 존재하는지 확인
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="file not found")

    # 파일 확장자를 검사
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension in ['.png', '.jpg', '.jpeg']:
        # 이미지를 열고 바이트로 변환
        try:
            with Image.open(file_path) as img:
                img_byte_arr = io.BytesIO()
                img.save(img_byte_arr, format='PNG')
                img_byte_arr = img_byte_arr.getvalue()
            return Response(content=img_byte_arr, media_type="image/png")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

    elif file_extension == '.md':
        # 마크다운 파일 읽기
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                markdown_content = f.read()
            return PlainTextResponse(content=markdown_content, media_type="text/markdown")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error processing markdown file: {str(e)}")

    else:
        # 지원하지 않는 파일 형식
        raise HTTPException(status_code=400, detail="Unsupported file type")
