import React, { useState } from 'react';
import CreateProjectModal from './project/CreateProject.js';
import CreateTaskModal from './task/CreateTask.js';
import styles from './projTask.module.css';
import 'font-awesome/css/font-awesome.min.css';

const CreateButton = ({ type , projId}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <button type="button" className={styles.button} onClick={handleShow}>
        <i className="fa fa-plus"></i> {type === 'project' ? 'Add Project' : 'Add Task'}
      </button>

      {showModal && (
        type === 'project' ? (
          <CreateProjectModal handleClose={handleClose} />
        ) : (
          <CreateTaskModal handleClose={handleClose} projId={projId} />
        )
      )}
    </>
  );
};

export default CreateButton;