import React from 'react';
import { deleteProjData, deleteTaskData } from '../api'; // 공통 API 함수 불러오기

const DeleteButton = ({ projId, taskId }) => {
  const handleDeleteConfirm = async() => {
    const isToDelete = projId || taskId;
    const isProject = Boolean(projId);

    if (window.confirm("정말 삭제하시겠습니까?")) {
      const deleteFunc = isProject ? deleteProjData : deleteTaskData;
      
      try {
        await deleteFunc(isToDelete);
        console.log("data deleted successfully.");
        window.location.reload();
        alert("새로운 DB를 불러옵니다...")
      } catch (error) {
          console.log("Error while deleting project:", error);
      };
    }
  };

  return (
    <button onClick={handleDeleteConfirm} className="btn btn-danger mx-1">
      Delete
    </button>
  );
};

export default DeleteButton;