import { useMemo } from "react";
import { useStore } from "../store";

const Task = ({ title }) => {
  const tasks = useStore(store => store.tasks);
  const deleteTask = useStore(store => store.deleteTask);

  const thisTask = useMemo(() => {
    return tasks.find(t => t.title === title);
  }, [tasks, title]);

  let style = "";
  switch (thisTask.status) {
    case "ONGOING":
      style = "text-yellow-500";
      break;
    case "DONE":
      style = "text-green-500";
      break;

    default:
      style = "text-gray-500";
      break;
  }

  const handleDeleteTask = () => {
    deleteTask(title);
  };

  return (
    <div className="bg-white rounded min-h-[5rem] text-black p-1 flex flex-col justify-between">
      <div className="">{thisTask.title}</div>
      <div className="flex justify-between">
        <div className="">
          <button
            className="p-1 py-0.5 rounded bg-red-500/90 text-white text-xs cursor-pointer hover:bg-red-600"
            onClick={handleDeleteTask}
          >
            Delete
          </button>
        </div>
        <div className={`text-sm p-1 py-0.5 rounded font-semibold ${style}`}>
          {thisTask.status}
        </div>
      </div>
    </div>
  );
};

export default Task;
