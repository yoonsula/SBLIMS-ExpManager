FROM python:3.9-slim

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Command to run the application
# 포트 변경 원할 시 변경
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]