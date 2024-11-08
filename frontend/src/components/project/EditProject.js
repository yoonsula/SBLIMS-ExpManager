import React, { useEffect, useState } from 'react'; 
import { updateProjData } from '../../api'; 
import styles from '../projTask.module.css'; 

const EditProjectModal = ({ projId, projData, show, handleClose }) => { 
  const [updatedProj, setUpdatedProj] = useState(projData); 
  const [errors, setErrors] = useState({}); // 유효성 검증 에러 메시지 상태 추가 
  const [loading, setLoading] = useState(false); 
  const [fileName, setFileName] = useState(''); 

  useEffect(() => { 
    if (show) { 
      setUpdatedProj(projData); 
      // 프로젝트 데이터에 파일 이름이 존재하면 파일 이름을 설정 
      if (projData && projData.files) { 
        setFileName(projData.files || ''); // projData에 파일 정보가 있다는 가정 
      } else { 
        setFileName('선택된 파일 없음'); // 파일이 없다면 빈 문자열로 설정 
      } 
    } 
  }, [show, projData]); 

  // 입력값 변경 핸들러 
  const handleChange = (e) => { 
    const { name, type, files } = e.target; 

    if (type === 'file') { 
      const file = files[0]; 
      setUpdatedProj((prevProj) => ({ ...prevProj, [name]: file })); 
      setFileName(file ? file.name : ''); 
    } else { 
      const value = e.target.value; 
      setUpdatedProj((prevProj) => ({ ...prevProj, [name]: value })); 
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
    } 
  }; 

  // 유효성 검사 함수 
  const validate = () => { 
    const newErrors = {}; 

    // 필수 입력 필드 검증 
    if (!updatedProj.manager) newErrors.manager = '매니저를 입력하세요.'; 
    if (!updatedProj.genDate) newErrors.genDate = '생성 날짜를 선택하세요.'; 
    if (!updatedProj.startDate) newErrors.startDate = '시작 날짜를 선택하세요.'; 
    if (!updatedProj.endDate) newErrors.endDate = '종료 날짜를 선택하세요.'; 
    if (updatedProj.status === '') newErrors.status = '상태를 입력하세요.'; 

    // 날짜 유효성 검증: genDate < startDate < endDate 
    if (updatedProj.genDate && updatedProj.startDate) { 
      if (updatedProj.genDate > updatedProj.startDate) { 
        newErrors.genDate = '생성 날짜는 시작 날짜 이전이어야 합니다.'; 
        newErrors.startDate = '시작 날짜는 생성 날짜 이후이어야 합니다.'; 
      } 
    } 

    if (updatedProj.startDate && updatedProj.endDate) { 
      if (updatedProj.startDate > updatedProj.endDate) { 
        newErrors.startDate = '시작 날짜는 종료 날짜 이전이어야 합니다.'; 
        newErrors.endDate = '종료 날짜는 시작 날짜 이후이어야 합니다.'; 
      } 
    } 

    return newErrors; 
  }; 

  // 저장 버튼 클릭 핸들러 
  const handleSave = async (e) => { 
    e.preventDefault(); // 폼 제출 기본 동작 방지 
    const validationErrors = validate(); 
    if (Object.keys(validationErrors).length > 0) { 
      // 에러가 있는 경우 에러 상태 설정 
      setErrors(validationErrors); 
    } else { 
      setLoading(true); 

      // updatedProj의 복사본 생성
      const projToUpdate = { ...updatedProj }; 

      // files 필드가 문자열(파일 이름)인 경우 삭제
      if (typeof projToUpdate.files === 'string') { 
        delete projToUpdate.files; 
      }

      try { 
        await updateProjData(projId, projToUpdate); 
        console.log("Project updated successfully."); 
        window.location.reload(); 
      } catch (error) { 
        console.log("Error while updating project:", error); 
        setLoading(false); 
      } 
    } 
  }; 

  if (!show) return null; 

  return ( 
    <div className={styles.modalOverlay} onClick={handleClose}> 
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> 
        <h4>프로젝트 수정</h4> 
        <hr /> 
        <form onSubmit={handleSave}> 
          <div className={styles.formGroup}> 
            <label htmlFor="formID">ID</label> 
            <input 
              type="number" 
              name="projId" 
              value={updatedProj.projId} 
              disabled 
            /> 
          </div> 
          <div className={styles.formGroup}> 
            <label htmlFor="formProjID">프로젝트 이름</label> 
            <input 
              type="text" 
              name="projName" 
              value={updatedProj.projName} 
              disabled 
            /> 
          </div> 
          <div className={styles.formGroup}> 
            <label htmlFor="manager">매니저 <span className="text-danger">*</span></label> 
            <input 
              type="text" 
              name="manager" 
              value={updatedProj.manager} 
              onChange={handleChange} 
            /> 
            {errors.manager && <p className="text-danger">{errors.manager}</p>} 
          </div> 
          <div className={styles.formGroup}> 
            <label htmlFor="genDate">생성 날짜 <span className="text-danger">*</span></label> 
            <input 
              type="date" 
              name="genDate" 
              value={updatedProj.genDate || ''} 
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
              value={updatedProj.startDate || ''} 
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
              value={updatedProj.endDate || ''} 
              onChange={handleChange} 
              min="2020-01-01" 
              max="2030-12-31" 
            /> 
            {errors.endDate && <p className="text-danger">{errors.endDate}</p>} 
          </div> 
          <div className={styles.formGroup}> 
            <label htmlFor="info">정보</label> 
            <textarea 
              name="info" 
              rows={3} 
              value={updatedProj.info || ''} 
              onChange={handleChange} 
            /> 
          </div> 
          <div className={styles.formGroup}> 
            <label htmlFor="files">파일</label> 
            <input 
              type="file" 
              name="files" 
              onChange={handleChange} 
            /> 
            {fileName && <p style={{ color: 'blue', fontSize: '12px' }}>현재 파일: {fileName}</p>}  
          </div> 
          <div className={styles.formGroup}>
            <label htmlFor="status">상태 <span className="text-danger">*</span></label>
            <select
              name="status"
              value={updatedProj.status}
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

export default EditProjectModal;