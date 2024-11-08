import React, { useState, useEffect } from 'react';
import { getProjDataById } from '../../api'; // getProjDataById 함수 임포트
import styles from '../projTask.module.css';

const InfoProjectModal = ({ projId, handleClose }) => {
  const [proj, setProj] = useState({
    info: '',
    files: '',
  });

  useEffect(() => {
    const fetchProjData = async () => {
      try {
        const data = await getProjDataById(projId);
        setProj(data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjData();
  }, [projId]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setProj({
        ...proj,
        files: Array.from(files).map(file => file.name).join(', '), // 선택한 파일 이름을 상태에 저장
      });
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={(e)=>e.stopPropagation()}>
      <div className={styles.modalContent}>
        <h4>상세정보</h4>
        <hr />
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="info">정보</label>
            <textarea
              id="info"
              rows={5}
              name="info"
              value={proj.info}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="files">파일</label>
            <input
              type="text"
              name="files"
              value={proj.files}
              readOnly
              onChange={handleFileChange}
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

export default InfoProjectModal;