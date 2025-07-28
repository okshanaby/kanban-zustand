import { create } from "zustand";

const store = set => {
  return {
    tasks: [
      { title: "TestTask", status: "ONGOING" },
      { title: "Test 2 Task", status: "PLANNED" },
      { title: "Test 3 Task", status: "DONE" },
      { title: "Test 4 Task", status: "ONGOING" },
    ],
  };
};

export const useStore = create(store);
