import React, { useState, useEffect } from 'react';
import { createTaskData } from '../../api'; // createTaskData 함수 임포트
import styles from '../projTask.module.css'

const CreateTaskModal = ({ handleClose, projId }) => {
  const [newTask, setNewTask] = useState({
    taskName: '',
    researcher: '',
    DNA_ConstructID: '',
    projId: projId,
    genDate: '',
    startDate: '',
    endDate: '',
    structure: null,
    status: '0',
  });

  const [errors, setErrors] = useState({}); // 유효성 검증 에러 메시지 상태 추가
  const [loading, setLoading] = useState(false);

  // useEffect를 사용하여 projID가 변경될 때 newTask를 업데이트함
  useEffect(() => {
    setNewTask((Task) => ({
      ...Task,
      projId: projId,
    }));
  }, [projId]);


  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, structure } = e.target;
    console.log(structure)
    if (type === 'file') {
      // 파일 입력이 변경된 경우
      setNewTask((newTask) => ({ ...newTask, [name]: structure }));
    } else {
      // 일반 텍스트 입력에 대한 변경 처리
      setNewTask((newTask) => ({ ...newTask, [name]: value }));
  
      // 에러 메시지 초기화
      setErrors((errors) => ({ ...errors, [name]: '' }));
    }
  };



  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    // 필수 입력 필드 검증
    if (!newTask.taskName) newErrors.taskName = '태스크 이름을 입력하세요.';
    if (!newTask.researcher) newErrors.researcher = '연구자를 입력하세요.';
    if (!newTask.DNA_ConstructID) newErrors.DNA_ConstructID = 'DNA Construct ID를 입력하세요.';
    if (!newTask.genDate) newErrors.genDate = '생성 날짜를 선택하세요.';
    if (!newTask.startDate) newErrors.startDate = '시작 날짜를 선택하세요.';
    if (!newTask.endDate) newErrors.endDate = '종료 날짜를 선택하세요.';

    // 날짜 유효성 검증: genDate < startDate < endDate
    if (newTask.genDate && newTask.startDate) {
      if (newTask.genDate > newTask.startDate) {
        newErrors.genDate = '생성 날짜는 시작 날짜 이전이어야 합니다.';
        newErrors.startDate = '시작 날짜는 생성 날짜 이후이어야 합니다.';
      }
    }

    if (newTask.startDate && newTask.endDate) {
      if (newTask.startDate > newTask.endDate) {
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
      createTaskData(newTask, projId)
        .then((data) => {
          console.log('Task created successfully:', data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error while creating task:', error);
          setLoading(false);
        });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h4>태스크 생성</h4>
        <hr />
        <form onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label htmlFor="formTaskName">태스크 이름 <span className="text-danger">*</span></label>
            <input
              type="text"
              id="formTaskName"
              name="taskName"
              value={newTask.taskName}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.taskName && <p className="text-danger">{errors.taskName}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="formResearcher">연구자 <span className="text-danger">*</span></label>
            <input
              type="text"
              id="formResearcher"
              name="researcher"
              value={newTask.researcher}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.researcher && <p className="text-danger">{errors.researcher}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="formDNA_ConstructID">DNA Construct ID<span className="text-danger">*</span></label>
            <input
              type="text"
              id="formDNA_ConstructID"
              name="DNA_ConstructID"
              value={newTask.DNA_ConstructID}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.DNA_ConstructID && <p className="text-danger">{errors.DNA_ConstructID}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="formProjId">프로젝트 ID <span className="text-danger">*</span></label>
            <input
              type="text"
              id="formProjId"
              name="projId"
              value={projId}
              onChange={handleChange}
              disabled
              autoComplete="off"
            />
            {errors.projId && <p className="text-danger">{errors.projId}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="formGenDate">생성 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              id="formGenDate"
              name="genDate"
              value={newTask.genDate}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
              autoComplete="off"
            />
            {errors.genDate && <p className="text-danger">{errors.genDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="formStartDate">시작 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              id="formStartDate"
              name="startDate"
              value={newTask.startDate}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
              autoComplete="off"
            />
            {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="formEndDate">종료 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              id="formEndDate"
              name="endDate"
              value={newTask.endDate}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
              autoComplete="off"
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
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">상태 <span className="text-danger">*</span></label>
            <select
              name="status"
              value={newTask.status}
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
              {loading ? '생성 중...' : '생성'}
            </button>
            {loading && <div className="loading-icon"></div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;