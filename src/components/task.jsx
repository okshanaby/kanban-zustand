const STATUS = "DONE";

const Task = ({ title }) => {
  let style = "";
  switch (STATUS) {
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
      <div className="">{title}</div>
      <div className="flex justify-between">
        <div className=""></div>
        <div className={`text-sm p-1 py-0.5 rounded ${style}`}>{STATUS}</div>
      </div>
    </div>
  );
};

export default Task;
