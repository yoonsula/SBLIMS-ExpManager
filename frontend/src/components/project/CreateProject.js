import React, { useState } from 'react';
import { createProjData } from '../../api'; // createProjData 함수 임포트
import styles from '../projTask.module.css';

const CreateProjectModal = ({ handleClose }) => {
  const [newProject, setNewProject] = useState({
    projName: '',
    manager: '',
    genDate: '',
    startDate: '',
    endDate: '',
    info: '',
    files: null,
    status: '0',
  });

  const [errors, setErrors] = useState({}); // 유효성 검증 에러 메시지 상태 추가
  const [loading, setLoading] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      // 파일 입력이 변경된 경우
      setNewProject((newProject) => ({ ...newProject, [name]: files[0] }));
    } else {
      // 일반 텍스트 입력에 대한 변경 처리
      setNewProject((newProject) => ({ ...newProject, [name]: value }));
  
      // 에러 메시지 초기화
      setErrors((errors) => ({ ...errors, [name]: '' }));
    }
  };

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    // 필수 입력 필드 검증 (HTML5 기본 메시지를 방지하기 위해 required 삭제)
    if (!newProject.projName) newErrors.projName = '프로젝트 이름을 입력하세요.';
    if (!newProject.manager) newErrors.manager = '매니저를 입력하세요.';
    if (!newProject.genDate) newErrors.genDate = '생성 날짜를 선택하세요.';
    if (!newProject.startDate) newErrors.startDate = '시작 날짜를 선택하세요.';
    if (!newProject.endDate) newErrors.endDate = '종료 날짜를 선택하세요.';
    if (newProject.status === '') newErrors.status = '상태를 입력하세요.';

    // 날짜 유효성 검증
    if (newProject.genDate && newProject.startDate) {
      if (newProject.genDate > newProject.startDate) {
        newErrors.genDate = '생성 날짜는 시작 날짜와 같거나 이전이어야 합니다.';
        newErrors.startDate = '시작 날짜는 생성 날짜와 같거나 이후이어야 합니다.';
      }
    }

    if (newProject.startDate && newProject.endDate) {
      if (newProject.startDate > newProject.endDate) {
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
      createProjData(newProject)
        .then((data) => {
          console.log('Project created successfully:', data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error while creating project:', error);
          setLoading(false);
        });
    }
  };
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h4>프로젝트 생성</h4>
        <hr />
        <form onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label htmlFor="projName">프로젝트 이름 <span className="text-danger">*</span></label>
            <input
              type="text"
              id="projName"
              name="projName"
              value={newProject.projName}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.projName && <p className="text-danger">{errors.projName}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="manager">매니저 <span className="text-danger">*</span></label>
            <input
              type="text"
              id="manager"
              name="manager"
              value={newProject.manager}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.manager && <p className="text-danger">{errors.manager}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="genDate">생성 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              id="genDate"
              name="genDate"
              value={newProject.genDate}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
              autoComplete="off"
            />
            {errors.genDate && <p className="text-danger">{errors.genDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="startDate">시작 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newProject.startDate}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
              autoComplete="off"
            />
            {errors.startDate && <p className="text-danger">{errors.startDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">종료 날짜 <span className="text-danger">*</span></label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={newProject.endDate}
              onChange={handleChange}
              min="2020-01-01"
              max="2030-12-31"
              autoComplete="off"
            />
            {errors.endDate && <p className="text-danger">{errors.endDate}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="info">정보</label>
            <textarea
              id="info"
              rows={3}
              name="info"
              value={newProject.info}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="files">파일</label>
            <input
              type="file"
              name="files"
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">상태 <span className="text-danger">*</span></label>
            <select
              name="status"
              value={newProject.status}
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

export default CreateProjectModal;