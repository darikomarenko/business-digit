import { useState, useCallback } from "react";
import styles from './styles.module.scss'
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge
} from "react-flow-renderer";

const getNodeId = () => `${String(+new Date()).slice(6)}`;

const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 100, y: 100 }},
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 }}
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Diagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [state, setState] = useState({ title: "" });
  const [editState, setEditState] = useState({ id: "", title: "" });

  const onEdit = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editState.id) {
          node.data = {
            ...node.data,
            label: `${editState.title}`
          };
        }

        return node;
      })
    );
  };

  const onAdd = () => {
    const id = getNodeId();
    const newNode = {
      id,
      data: { label: `${state.title}` },
      position: {
        x: 0,
        y: 0 + (nodes.length + 1) * 20
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onConnect = useCallback((params) => {
    const newEdge = { id: `e${params.source}-${params.target}`, source: params.source, target: params.target };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  return (
    <div className={styles['addform']}>
      <div className={styles['addform__firstline']}>
      Название:{" "}
      <input
        type="text"
        onChange={(e) => {
          setState((prev) => ({ ...prev, title: e.target.value }));
        }}
      />
      <button onClick={onAdd}>Добавить блок</button>
      </div>
      <div className={styles['addform__secondline']}>
      Id:{" "}
      <input
        type="text"
        onChange={(e) => {
          setEditState((prev) => ({ ...prev, id: e.target.value }));
        }}
      />
      Название:{" "}
      <input
        type="text"
        onChange={(e) => {
          setEditState((prev) => ({ ...prev, title: e.target.value }));
        }}
      />
      <button onClick={onEdit}>Изменить блок</button>
      </div>
      <div style={{ width: "500px", height: "500px" }}>
        <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} onNodesChange={onNodesChange} />
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <Diagram />
  </ReactFlowProvider>
);