// EditButton.js
import React, { useState } from 'react';
import ProjectModal from './project/EditProject';
import TaskModal from './task/EditTask';

const EditButton = ({ projId, projData, taskId, taskData }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary mx-1">
        Edit
      </button>

      {projId && projData && (
        <ProjectModal
          projId={projId}
          projData={projData}
          show={showModal}
          handleClose={handleClose}
        />
      )}
      {taskId && taskData && (
        <TaskModal
          taskId={taskId}
          taskData={taskData}
          show={showModal}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default EditButton;
