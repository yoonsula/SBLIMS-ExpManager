// EditButton.js
import React, { useState } from 'react';
import ProjectModal from './project/InfoProject';
import TaskModal from './task/InfoTask';

const InfoButton = ({ projId, taskId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <>
      <button onClick={handleShow} className="btn btn-info mx-1">
        Info
      </button>

      {projId && showModal && (
        <ProjectModal
          projId={projId}
          handleClose={handleClose}
        />
      )}
      {taskId && showModal && (
        <TaskModal
          taskId={taskId}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default InfoButton;
