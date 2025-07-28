import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../store";
import Task from "./task";

const Column = ({ state }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasks = useStore(store => store.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => task.status === state);
  }, [tasks, state]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[var(--COLOR-GRAY-DARK)] rounded min-h-[20rem] w-1/3 max-w-[20rem] p-3">
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
