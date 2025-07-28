import Task from "./task";

const Column = ({ state }) => {
  return (
    <div className="bg-[var(--COLOR-GRAY-DARK)] rounded min-h-[20rem] w-1/3 max-w-[20rem] p-3">
      <h3>{state}</h3>
      <div className="space-y-2 mt-3">
        <Task title="Todo" />
        <Task title="Todo" />
        <Task title="Todo" />
      </div>
    </div>
  );
};

export default Column;
