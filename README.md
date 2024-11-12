1. db 연결
- docker 컨테이너가 실행되는 위치에 /db_data/site.db를 위치시킵니다.
- 만약 다른 경로에 위치한 db를 불러오고싶다면 절대 경로 or 상대 경로를 호스트 디렉토리에 적어줍니다.
```yml
# ./docker-compose.yml
# backend > volumns 부분 수정
/data/sblims/ExpManager/db_data:/var/lib
```

2. port 변경
- 포트 변경 원할 시 호스트 포트를 변경합니다.
```yml
# ./docker-compose.yml
# backend > port, frontend > port 부분 수정
ports:
      - "8002:8000" # 백엔드 8002로 변경 원할 시
frontend:
      ports:
            - "3002:3000" # 프론트엔드 포트 3002로 변경 원할 시
      environment:
            - REACT_APP_BACKEND_PORT=8002 # 위에서 설정한 백엔드 포트로 변경
```

3. docker-compose build
```bash
$ docker-compose build
```

4. 이미지 확인
```bash
docker images
```

5. 컨테이너 실행
- docker-compose.yml 파일이 있는 경로에서 다음 명령 실행
```bash
docker-compose up
# 실행 멈추고 싶다면, docker-compose down
```

6. 접속
- Back-end
  - http://0.0.0.0:8002
- Front-end
  - http://0.0.0.0:3002
