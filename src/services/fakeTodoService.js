import uuid from "react-uuid";

const todos = [
  {
    _id: uuid(),
    task: "Send CV",
    completed: true,
  },
  {
    _id: uuid(),
    task: "Have first interview",
    completed: true,
  },
  {
    _id: uuid(),
    task: "Send exercise solution",
    completed: false,
  },
  {
    _id: uuid(),
    task: "Get hired!",
    completed: false,
  },
];

export function getTodos() {
  return todos;
}
