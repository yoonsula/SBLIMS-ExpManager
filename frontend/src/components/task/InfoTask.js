import React, { useState, useEffect } from 'react';
import { getTaskDataById } from '../../api'; // getProjDataById 함수 임포트
import styles from '../projTask.module.css';

const InfoTaskModal = ({ taskId, handleClose }) => {
  const [task, setTask] = useState({
    structure: '',
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const data = await getTaskDataById(taskId);
        setTask(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [taskId]); // projId?

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>상세정보</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="info">Structure</label>
            <textarea
              id="structure"
              rows={5}
              name="structure"
              value={task.structure || ''}
              readOnly
            />
          </div>
        </form>
        <div className={styles.modalFooter}>
          <button onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default InfoTaskModal;