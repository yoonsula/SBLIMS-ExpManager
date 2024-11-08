import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import { getProjData, getTaskData } from '../api.js';
import DeleteButton from './DeleteButton.js';
import EditButton from './EditButton.js';
import InfoButton from './InfoButton.js';
import CreateButton from './CreateButton.js';
import styles from './projTask.module.css';
import 'font-awesome/css/font-awesome.min.css';
import Pagination from './Pagination.js';

const STATUS = {
  0: '시작전',
  1: '진행중',
  2: '완료'
};

// 진행상황 필터 버튼 컴포넌트
const FilterButtons = ({ currentFilter, onChange }) => {
  const filters = ['전체', '시작전', '진행중', '완료'];
  return (
    <div className={styles.filterContainer}>
      {filters.map(filter => (
        <button
          key={filter}
          className={currentFilter === filter ? styles.activeFilter : ''}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

// 공통 검색 및 생성 버튼 컴포넌트
const SearchAndCreate = ({ searchTerm, onSearchChange, createType, projId }) => (
  <div className={styles.search_input}>
    <input 
      type="text"
      className={styles.right_margin} 
      placeholder="검색어를 입력해주세요." 
      value={searchTerm}
      onChange={onSearchChange}
    />
    <CreateButton type={createType} projId={projId} />
  </div>
);

// 공통 테이블 컴포넌트
const DataTable = ({ columns, data, emptyMessage, renderRow }) => (
  <Table striped bordered hover className={styles.table}>
    <thead>
      <tr>
        {columns.map(col => <th key={col}>{col}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length} className="text-center align-middle">
            {emptyMessage}
          </td>
        </tr>
      ) : (
        data.map(renderRow)
      )}
    </tbody>
  </Table>
);

export default function ProjTaskList() {
  // 프로젝트 상태
  const [projList, setProjList] = useState([]);
  const [projSearchTerm, setProjSearchTerm] = useState('');
  const [projFilter, setProjFilter] = useState('전체');
  const [projPage, setProjPage] = useState(0);
  const [projRowsPerPage, setProjRowsPerPage] = useState(10);

  // 태스크 상태
  const [taskList, setTaskList] = useState([]);
  const [taskSearchTerm, setTaskSearchTerm] = useState('');
  const [taskFilter, setTaskFilter] = useState('전체');
  const [taskPage, setTaskPage] = useState(0);
  const [taskRowsPerPage, setTaskRowsPerPage] = useState(10);

  // 선택된 프로젝트
  const [selectedProjId, setSelectedProjId] = useState(null);
  const [taskTableVisible, setTaskTableVisible] = useState(false);

  // 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchProjList = async () => {
      try {
        const response = await getProjData();
        setProjList(response);
      } catch (error) {
        console.error('Error while fetching Projects:', error);
      }
    };

    fetchProjList();
  }, []);

  // 프로젝트 행 클릭 핸들러
  const handleRowClick = useCallback(async (e, projId) => {
    // 버튼 클릭을 방지
    if (e.target.closest('button')) return;

    if (projId === selectedProjId) { // 선택된 프로젝트 ID가 현재 선택되어 있는 프로젝트 ID(`selectedProjId`)와 동일한 경우
      setTaskTableVisible(false);
      setSelectedProjId(null);
    } else {
      setSelectedProjId(projId);
      try {
        const tasks = await getTaskData(projId);
        setTaskList(tasks);
        setTaskTableVisible(true);
      } catch (error) {
        console.error('Error while fetching Tasks:', error);
        setTaskList([]);
        setTaskTableVisible(true);
      }
      // 태스크 페이지 초기화
      setTaskPage(0);
    }
  }, [selectedProjId]);

  // 필터링된 프로젝트 리스트
  const filteredProjList = useMemo(() => {
    return projList.filter(proj => {
      const matchesSearch =
        proj.projName.toLowerCase().includes(projSearchTerm.toLowerCase()) ||
        proj.manager.toLowerCase().includes(projSearchTerm.toLowerCase());

      if (projFilter === '전체') return matchesSearch;
      return matchesSearch && STATUS[proj.status] === projFilter;
    });
  }, [projList, projSearchTerm, projFilter]);

  // 페이지네이션된 프로젝트 리스트
  const paginatedProjList = useMemo(() => {
    const start = projPage * projRowsPerPage;
    return filteredProjList.slice(start, start + projRowsPerPage);
  }, [filteredProjList, projPage, projRowsPerPage]);

  // 필터링된 태스크 리스트
  const filteredTaskList = useMemo(() => {
    return taskList.filter(task => {
      const matchesSearch =
        task.taskName.toLowerCase().includes(taskSearchTerm.toLowerCase()) ||
        task.researcher.toLowerCase().includes(taskSearchTerm.toLowerCase());

      if (taskFilter === '전체') return matchesSearch;
      return matchesSearch && STATUS[task.status] === taskFilter;
    });
  }, [taskList, taskSearchTerm, taskFilter]);

  // 페이지네이션된 태스크 리스트
  const paginatedTaskList = useMemo(() => {
    const start = taskPage * taskRowsPerPage;
    return filteredTaskList.slice(start, start + taskRowsPerPage);
  }, [filteredTaskList, taskPage, taskRowsPerPage]);

  // 프로젝트 테이블 컬럼
  const projColumns = ['프로젝트 ID', '프로젝트 이름', '매니저', '생성일자', '시작일자', '종료일자', '버튼'];

  // 태스크 테이블 컬럼
  const taskColumns = ['태스크 ID', '태스크 이름', '연구자', '생성일자', '시작일자', '종료일자', '버튼'];

  return (
    <div className={styles.tableContainer}>
      {/* 프로젝트 섹션 */}
      <div className={styles.leftSection}>
        <div className={styles.tableTitle}>
          <div className={styles.table_title_left}>Project DB</div>
        </div>
        <div className={styles.subContent}>
          <FilterButtons currentFilter={projFilter} onChange={setProjFilter} />
          <SearchAndCreate 
            searchTerm={projSearchTerm}
            onSearchChange={(e) => { setProjSearchTerm(e.target.value); setProjPage(0); setTaskTableVisible(false); }}
            createType="project"
          />
        </div>
        <DataTable
          columns={projColumns}
          data={paginatedProjList}
          emptyMessage="데이터가 없습니다."
          renderRow={(proj) => (
            <tr key={proj.projId} onClick={(e) => handleRowClick(e, proj.projId)}>
              <td>{proj.projId}</td>
              <td>{proj.projName}</td>
              <td>{proj.manager}</td>
              <td>{proj.genDate}</td>
              <td>{proj.startDate}</td>
              <td>{proj.endDate}</td>
              <td>
                <EditButton projId={proj.projId} projData={proj} />
                <DeleteButton projId={proj.projId} />
                <InfoButton projId={proj.projId} />
              </td>
            </tr>
          )}
        />
        <Pagination
          count={filteredProjList.length}
          page={projPage}
          rowsPerPage={projRowsPerPage}
          onPageChange={(event, newPage) => setProjPage(newPage)}
          onRowsPerPageChange={(event) => { 
            setProjRowsPerPage(parseInt(event.target.value, 10)); 
            setProjPage(0); 
          }}
        />
      </div>

      {/* 태스크 섹션 */}
      {taskTableVisible && (
        <div className={styles.rightSection}>
          <div className={styles.tableTitle}>
            <div className={styles.table_title_left}>Task DB</div>
          </div>
          <div className={styles.subContent}>
            <FilterButtons currentFilter={taskFilter} onChange={setTaskFilter} />
            <SearchAndCreate 
              searchTerm={taskSearchTerm}
              onSearchChange={(e) => { setTaskSearchTerm(e.target.value); setTaskPage(0); }}
              createType="task"
              projId={selectedProjId}
            />
          </div>
          <DataTable
            columns={taskColumns}
            data={paginatedTaskList}
            emptyMessage="데이터가 없습니다."
            renderRow={(task) => (
              <tr key={task.taskId}>
                <td>{task.taskId}</td>
                <td>{task.taskName}</td>
                <td>{task.researcher}</td>
                <td>{task.genDate}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>
                  <EditButton projId={selectedProjId} taskId={task.taskId} taskData={task} />
                  <DeleteButton taskId={task.taskId} />
                  <InfoButton taskId={task.taskId} />
                </td>
              </tr>
            )}
          />
          <Pagination
            count={filteredTaskList.length}
            page={taskPage}
            rowsPerPage={taskRowsPerPage}
            onPageChange={(event, newPage) => setTaskPage(newPage)}
            onRowsPerPageChange={(event) => { 
              setTaskRowsPerPage(parseInt(event.target.value, 10)); 
              setTaskPage(0); 
            }}
          />
        </div>
      )}
    </div>
  );
}