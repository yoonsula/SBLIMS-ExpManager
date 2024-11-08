import axios from 'axios';

const PORT = process.env.REACT_APP_BACKEND_PORT || '8000';
const API_BASE_URL = 'http://' + window.location.host.split(':')[0] + ':' + PORT;

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});


export const getProjData = async () => {
  try {
    const response = await instance.get('/projects/');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects: ', error);
    throw error;
  }
};

export const getProjDataById = async (projId) => {
  try {
    const response = await instance.get(`/projects/${projId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project: ', error);
    throw error;
  }
};

export const getTaskDataById = async (taskId) => {
  try {
    const response = await instance.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task: ', error);
    throw error;
  }
};

export const getTaskData = async (projId) => {
    try {
      const response = await instance.get(`/tasks?projId=${projId}`)
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  };

export const createProjData = async (project) => {
  const formData = new FormData();
  
  formData.append('projName', project.projName);
  formData.append('manager', project.manager);
  formData.append('genDate', project.genDate);
  formData.append('startDate', project.startDate);
  formData.append('endDate', project.endDate);
  
  if (project.info) {
    formData.append('info', project.info);
  }
  
  formData.append('status', project.status);
  if (project.files) {
    formData.append('file', project.files);
  }
  const response = await instance.post('/project/', formData);
  return response.data;
};
  
export const createTaskData = async (task, projId) => {
  try {
    const response = await instance.post(`/task?projId=${projId}`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task: ', serializeAxiosError(error));
    throw error;
  }
};
  
export const deleteProjData = async (projId) => {
try {
    const response = await instance.delete(`/projects/${projId}`);
    return response.data;
} catch (error) {
    console.error('Error deleting data: ', serializeAxiosError(error));
    throw error;
}
};


export const deleteTaskData = async (taskId) => {
  try {
      const response = await instance.delete(`/tasks/${taskId}`);
      return response.data;
  } catch (error) {
      console.error('Error deleting data: ', serializeAxiosError(error));
      throw error;
  }
};


export const updateProjData = async (projId, updatedProj) => {
  const formData = new FormData();

  formData.append('projName', updatedProj.projName);
  formData.append('manager', updatedProj.manager);
  formData.append('genDate', updatedProj.genDate);
  formData.append('startDate', updatedProj.startDate);
  formData.append('endDate', updatedProj.endDate);

  if (updatedProj.info) {
    formData.append('info', updatedProj.info);
  }

  formData.append('status', updatedProj.status);

  if (updatedProj.files instanceof File) {
    formData.append('file', updatedProj.files);
  }

  try {
    const response = await instance.put(`/projects/${projId}`, formData); // PUT 요청에 FormData 사용
    return response.data;
  } catch (error) {
    console.error('Error updating data: ', error); // serializeAxiosError 사용 여부는 필요 시 결정
    throw error;
  }
};

export const updateTaskData = async (taskId, updatedTask) => {
  try {
    const response = await instance.put(`/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task: ', serializeAxiosError(error));
    throw error;
  }
};

export const getProjFile = async(projId) => {
  try {
    const response = await instance.get(`/project/${projId}/image/`)
    return response.data
  } catch (error) {
    console.error('Error updating task: ', serializeAxiosError(error));
    throw error;
  }
}

export const getWfData = async () => {
  try {
    const response = await instance.get(`/workflows/`)
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

export const getUoData = async () => {
  try {
    const response = await instance.get(`/unitoperations/`)
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

function serializeAxiosError(error) {
    return {
      message: error.message,
      ...(error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : {}),
      config: error.config,
    };
}


