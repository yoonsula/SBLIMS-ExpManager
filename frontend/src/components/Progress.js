import React, { useState, useEffect } from 'react';
import './Progress.css';
import MDEditor from '@uiw/react-md-editor';
import { getProjData, getTaskData, getWfData, getUoData } from '../api';

const TreeNode = ({ node, onSelectNode, updateStatus, nodeType }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.tasks || node.workflows || node.operations;

  const statusMap = {
    0: '시작전',
    1: '진행중',
    2: '완료'
  };
  
  // And a reverse mapping for updating the state
  const statusReverseMap = {
    '시작전': 0,
    '진행중': 1,
    '완료': 2
  };

  const handleClick = () => {
    setExpanded(!expanded);
    onSelectNode(node, nodeType);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case '시작전':
        return { color: 'gray' };
      case '진행중':
        return { color: 'blue' };
      case '완료':
        return { color: 'green' };
      case 0:
        return { color: 'gray' };
      case 1:
        return { color: 'blue' };
      case 2:
        return { color: 'green' };
      default:
        return {};
    }
  };

  // 상태 변경 핸들러
  const handleStatusChange = (e) => {
    const newStatus = statusReverseMap[e.target.value];
    updateStatus(node, nodeType, newStatus);
  };

  return (
    <div className="tree-node">
      <div className="node-header" onClick={handleClick}>
        <span style={getStatusStyle(node.status)}> ({statusMap[node.status]}) </span>
        <span>{node.projName || node.taskName || node.wfName || node.uoName}</span>
        {hasChildren && <span className={expanded ? 'caret-down' : 'caret-right'} />}
        {!hasChildren && (
          <select value={statusMap[node.status]} onChange={handleStatusChange} className="status-select">
            <option value="시작전">시작전</option>
            <option value="진행중">진행중</option>
            <option value="완료">완료</option>
          </select>
          
          
        )}
      </div>
      {expanded && hasChildren && (
        <div className="node-children">
          {node.tasks && node.tasks.map((task, index) => (
            <TreeNode node={task} key={index} onSelectNode={onSelectNode} updateStatus={updateStatus} nodeType="task" />
          ))}
          {node.workflows && node.workflows.map((workflow, index) => (
            <TreeNode node={workflow} key={index} onSelectNode={onSelectNode} updateStatus={updateStatus} nodeType="workflow" />
          ))}
          {node.operations && node.operations.map((operation, index) => (
            <TreeNode node={operation} key={index} onSelectNode={onSelectNode} updateStatus={updateStatus} nodeType="operation" />
          ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({ data, onSelectNode, updateStatus }) => (
  <div>
    {data.map((project, index) => (
      <TreeNode node={project} key={index} onSelectNode={onSelectNode} updateStatus={updateStatus} nodeType="project" />
    ))}
  </div>
);

const Progress = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const projects = await getProjData();
        const workflows = await getWfData();
        const operations = await getUoData();

        const projectTasksPromises = projects.map(async (project) => {
          const tasks = await getTaskData(project.projId);
          const tasksWithWorkflows = tasks.map((task) => ({
            ...task,
            workflows: workflows.filter((wf) => wf.taskId === task.taskId).map((wf) => ({
              ...wf,
              operations: operations.filter((op) => op.wfId === wf.wfId),
            })),
          }));
          return { ...project, tasks: tasksWithWorkflows };
        });

        const mergedData = await Promise.all(projectTasksPromises);
        setData(mergedData);
      } catch (error) {
        console.error('Data fetch error:', error);
      }
    }
    fetchData();
  }, []);

  const handleNodeSelect = (node, nodeType) => {
    if (nodeType === 'workflow') {
      setSelectedWorkflow(node);
    } else if (nodeType === 'operation') {
      setSelectedWorkflow(null);
      setSelectedOperation(node);
    } else {
      setSelectedWorkflow(null);
      setSelectedOperation(null);
    }
  };

  const updateStatus = (node, nodeType, newStatus) => {
    const updateNodeStatus = (nodes) => {
      return nodes.map(n => {
        if (n === node) {
          return { ...n, status: newStatus };
        }
        if (n.tasks) {
          return { ...n, tasks: updateNodeStatus(n.tasks) };
        }
        if (n.workflows) {
          return { ...n, workflows: updateNodeStatus(n.workflows) };
        }
        if (n.operations) {
          return { ...n, operations: updateNodeStatus(n.operations) };
        }
        return n;
      });
    };

    setData(prevData => updateNodeStatus(prevData));
  };

  const [value, setValue] = useState("## SBLIMS 실험 모니터링 화면\n\n**각 단계에 대한 항목을 선택해주세요.**");

  return (
    <div className="tableContainer">
      <div className="leftSection">
        <Tree data={data} onSelectNode={handleNodeSelect} updateStatus={updateStatus} />
      </div>
      <div className="rightSection">
        <div data-color-mode="light">
          {!selectedOperation && !selectedWorkflow && <MDEditor value={value} height={700} onChange={setValue} />}
          {selectedWorkflow && <MDEditor value={selectedWorkflow.wfName} height={700} onChange={setValue} />}
          {!selectedWorkflow && selectedOperation && <MDEditor value={selectedOperation.uoName} height={700} onChange={setValue} />}
          <MDEditor.Markdown style={{ whiteSpace: 'pre-wrap' }} />
        </div>
        <br />
        <button style={{float: "right"}}>변경사항 저장</button>
      </div>
    </div>
  );
};

export default Progress;