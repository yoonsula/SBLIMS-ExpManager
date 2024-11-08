import React, { useState, useEffect } from 'react';
import { updateTaskData } from '../../api';
import styles from '../projTask.module.css'; // 여기서 CSS 모듈을 import 한다고 가정합니다

const TaskModal = ({ taskId, taskData, show, handleClose }) => {
  const [updatedTask, setUpdatedTask] = useState(taskData);
  const [errors, setErrors] = useState({}); // 유효성 검증 에러 메시지 상태 추가
  const [loading, setLoading] = useState(false);
  const [structureName, setStructureName] = useState(''); 

  useEffect(() => {
    if (show) {
      setUpdatedTask(taskData); // 모달 열릴 때 초기화
    }
  }, [show, taskData]);

  const handleChange = (e) => { 
    const { name, type, structure } = e.target; 
    if (type === 'file') { 
      const file = structure[0]; 
      setUpdatedTask((prevTask) => ({ ...prevTask, [name]: file })); 
      setStructureName(structure ? structure.name : '');
      console.log(structureName)
    } else { 
      const value = e.target.value; 
      setUpdatedTask((prevTask) => ({ ...prevTask, [name]: value })); 
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
    } 
  }; 

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    // 필수 입력 필드 검증
    if (!updatedTask.researcher) newErrors.researcher = '연구자를 입력하세요.';
    if (!updatedTask.genDate) newErrors.genDate = '생성 날짜를 선택하세요.';
    if (!updatedTask.startDate) newErrors.startDate = '시작 날짜를 선택하세요.';
    if (!updatedTask.endDate) newErrors.endDate = '종료 날짜를 선택하세요.';
    if (updatedTask.status === '') newErrors.status = '상태를 선택하세요.';

    // 날짜 유효성 검증: genDate < startDate < endDate
    if (updatedTask.genDate && updatedTask.startDate) {
      if (updatedTask.genDate > updatedTask.startDate) {
        newErrors.genDate = '생성 날짜는 시작 날짜 이전이어야 합니다.';
        newErrors.startDate = '시작 날짜는 생성 날짜 이후이어야 합니다.';
      }
    }

    if (updatedTask.startDate && updatedTask.endDate) {
      if (updatedTask.startDate > updatedTask.endDate) {
        newErrors.startDate = '시작 날짜는 종료 날짜 이전이어야 합니다.';
        newErrors.endDate = '종료 날짜는 시작 날짜 이후이어야 합니다.';
      }
    }

    return newErrors;
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // 에러가 있는 경우 에러 상태 설정
      setErrors(validationErrors);
    } else {
      // 에러가 없으면 데이터 저장 로직 실행
      setLoading(true);
      updateTaskData(taskId, updatedTask)
        .then(() => {
          console.log("Task updated successfully.");
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error while updating task:", error);
          setLoading(false);
        });
    }
  };

  if (!show) return null; // show가 false일 경우 모달을 렌더링하지 않음

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h4>태스크 수정</h4>
        <hr />
        <form onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label htmlFor="formTaskId">Task ID</label>
            <input
              type="number"
              name="taskId"
              value={updatedTask.taskId || ''}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="formTaskName">태스크 이름</label>
            <input
              type="text"
              name="taskName"
              value={updatedTask.taskName || ''}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="researcher">연구자 <span className="text-danger">*</span></label>
            <input
              type="text"
              name="researcher"
              value={updatedTask.researcher || ''}
              onChange={handleChange}
            />
            {errors.researcher && <p className="text-danger">{errors.researcher}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="projId">프로젝트 ID</label>
            <input
              type="text"
              name="projId"
              value={updatedTask.projId || ''}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="DNA_ConstructID">DNA_ConstructID</label>
            <input
              type="text"
              name="DNA_ConstructID"
              value={updatedTask.DNA_ConstructID || ''}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="genDate">생성 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              name="genDate"
              value={updatedTask.genDate || ''}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
            />
            {errors.genDate && <p className="text-danger">{errors.genDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="startDate">시작 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              name="startDate"
              value={updatedTask.startDate || ''}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
            />
            {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">종료 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              name="endDate"
              value={updatedTask.endDate || ''}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
            />
            {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
          </div>
          <div className={styles.formGroup}> 
            <label htmlFor="structure">Structure</label> 
            <input
              type="file" 
              name="structure" 
              onChange={handleChange} 
            /> 
            {structureName && <p style={{ color: 'blue', fontSize: '12px' }}>현재 파일: {structureName}</p>}  
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">상태 <span className="text-danger">*</span></label>
            <select
              name="status"
              value={updatedTask.status}
              onChange={handleChange}
              className={styles.selectStyle}
            >
              <option value="0">시작전</option>
              <option value="1">진행중</option>
              <option value="2">완료</option>
            </select>
            {errors.status && <p className="text-danger">{errors.status}</p>}
          </div>
          <div className={styles.modalFooter}>
            <button type="button" onClick={handleClose}>닫기</button>
            <button type="submit" disabled={loading}>
              {loading ? '저장 중...' : '저장'}
            </button>
            {loading && <div className="loading-icon"></div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;