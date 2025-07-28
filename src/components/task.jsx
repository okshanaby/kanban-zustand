import { useMemo } from "react";
import { useStore } from "../store";

const Task = ({ title }) => {
  const tasks = useStore(store => store.tasks);

  const thisTask = useMemo(() => {
    return tasks.find(t => t.title === title);
  }, [tasks, title]);

  let style = "";
  switch (thisTask.status) {
    case "ONGOING":
      style = "bg-[var(--COLOR-ONGOING)]";
      break;
    case "DONE":
      style = "bg-[var(--COLOR-DONE)]";
      break;

    default:
      style = "bg-[var(--COLOR-GRAY-LIGHT)]";
      break;
  }

  return (
    <div className="bg-white rounded min-h-[5rem] text-black p-1 flex flex-col justify-between">
      <div className="">{thisTask.title}</div>
      <div className="flex justify-between">
        <div className=""></div>
        <div className={`text-sm p-1 py-0.5 rounded ${style}`}>
          {thisTask.status}
        </div>
      </div>
    </div>
  );
};

export default Task;
