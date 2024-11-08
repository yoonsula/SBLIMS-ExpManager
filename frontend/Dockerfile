FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
# frontend 실행될 포트 변경
ENV PORT=3002
# backend dockerfile에서 설정한 포트로 변경
ENV REACT_APP_BACKEND_PORT=8002

CMD ["npm", "start"]