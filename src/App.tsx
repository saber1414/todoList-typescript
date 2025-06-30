import React, { useEffect, useState } from "react";
import { Todo } from "./components/Todo.type";
import Swal from "sweetalert2";

import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saveTodo = localStorage.getItem("todos");
    return saveTodo ? JSON.parse(saveTodo) : [];
  });
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // add todos
  const addTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      title: input.trim(),
      isCompleted: false,
    };

    setTodos((prev: Todo[]) => [...prev, newTodo]);
    setInput("");
  };

  // remove todo
  const removeTodo = (id: number): void => {
    Swal.fire({
      icon: "warning",
      title: "DELETE TODO",
      text: "Do you want to delete this todo?",
      showCancelButton: true,
      confirmButtonText: "YES",
      cancelButtonText: "NO",
    }).then((res) => {
      if (res.isConfirmed) {
        setTodos((prev: Todo[]) => prev.filter((todo) => todo.id !== id));
      }
    });
  };

  return (
    <>
      <div className="TodoWrapper">
        <h1>Todo List ❤️ </h1>
        <form onSubmit={addTodo} className="TodoForm">
          <input
            type="text"
            className="todo-input"
            placeholder="What is the task today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </form>
        {todos.length ? (
          todos.map((todo) => (
            <div key={todo.id} className="Todo">
              <p
                className="" // or completed className
              >
                {todo.title}
              </p>
              <div
                onClick={() => removeTodo(todo.id)}
                className="btn btn-danger"
              >
                DELETE
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default App;
