import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../store";
import Task from "./task";

const Column = ({ state }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);


  const tasks = useStore(store => store.tasks);
  const setDraggedTask = useStore(store => store.setDraggedTask);
  const draggedTask = useStore(store => store.draggedTask);
  const moveTask = useStore(store => store.moveTask);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => task.status === state);
  }, [tasks, state]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleDragEnter = e => {
    e.preventDefault();
    setDragCounter(prev => prev + 1);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setDragCounter(prev => prev - 1);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
    moveTask(draggedTask, state);
    setDraggedTask(null);
    setDragCounter(0); // Reset counter
  };
  return (
    <div
      className={`bg-[var(--COLOR-GRAY-DARK)] rounded min-h-[20rem] w-1/3 max-w-[20rem] p-3 border-dashed border-2 ${
        dragCounter > 0 ? "border-gray-100" : "border-transparent"
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between">
        <h3>{state}</h3>
        <button
          className="p-1 py-0.5 rounded bg-gray-500 text-sm cursor-pointer hover:bg-gray-600"
          onClick={openModal}
        >
          Add
        </button>
      </div>
      <div className="space-y-2 mt-3">
        {filteredTasks.map(task => (
          <Task title={task.title} key={task.title} />
        ))}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          state={state}
        />
      )}
    </div>
  );
};

export default Column;

const Modal = ({ isOpen, setIsModalOpen, state }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const addTask = useStore(store => store.addTask);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddTask = () => {
    if (!text.trim()) return;

    addTask(text, state);
    setIsModalOpen(false);
    setText("");
  };

  if (!isOpen) return null;

  return (
    <div className=" bg-gray-50/10 h-full w-full absolute top-0 left-0 flex items-center justify-center">
      <div className="flex items-center gap-2 bg-white rounded-2xl p-6">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          ref={inputRef}
          className="p-1 rounded border border-gray-600 text-black"
        />
        <button
          className="p-1 py-0.5 rounded bg-gray-500 text-sm cursor-pointer hover:bg-gray-600"
          onClick={handleAddTask}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
