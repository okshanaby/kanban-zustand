import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = set => {
  return {
    draggedTask: null,
    tasks: [
      { title: "TestTask", status: "ONGOING" },
      { title: "Test 2 Task", status: "PLANNED" },
      { title: "Test 3 Task", status: "DONE" },
      { title: "Test 4 Task", status: "ONGOING" },
    ],
    addTask: (title, status) =>
      set(
        store => ({
          tasks: [...store.tasks, { title, status }],
        }),
        false,
        "ADDING NEW TASK" // action label
      ),
    deleteTask: title =>
      set(store => ({
        tasks: store.tasks.filter(task => task.title !== title),
      })),
    setDraggedTask: title => set({ draggedTask: title }),
    moveTask: (title, status) =>
      set(store => ({
        tasks: store.tasks.map(task =>
          task.title === title ? { title, status } : task
        ),
      })),
  };
};

const logger = config => (set, get, api) =>
  config(
    (...args) => {
      const currentState = get()
      // console.log("🚀 ~ logger ~ currentState:", currentState)
      // console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  logger(persist(devtools(store), { name: "kanban-zustand-store" }))
);
