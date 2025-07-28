import { useMemo } from "react";
import { useStore } from "../store";
import Task from "./task";

const Column = ({ state }) => {
  const tasks = useStore(store => store.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => task.status === state);
  }, [tasks, state]);

  return (
    <div className="bg-[var(--COLOR-GRAY-DARK)] rounded min-h-[20rem] w-1/3 max-w-[20rem] p-3">
      <h3>{state}</h3>
      <div className="space-y-2 mt-3">
        {filteredTasks.map(task => (
          <Task title={task.title} key={task.title} />
        ))}
      </div>
    </div>
  );
};

export default Column;
