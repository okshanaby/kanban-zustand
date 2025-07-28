import { create } from "zustand";

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
      set(store => ({
        tasks: [...store.tasks, { title, status }],
      })),
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

export const useStore = create(store);
