import { useState } from "react";

const initialTasks = [
  {
    id: 0,
    taskname: "Learn React",
    status: false,
  },
];

export default function TodoList() {
  const [todo, setTodo] = useState(initialTasks);
  const [name, setName] = useState("");
  const [completedTasks, setCompeltedTasks] = useState([]);

  function handleTodo() {
    const newId = todo.length;
    setTodo([...todo, { id: newId, taskname: name, status: false }]);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function markAsCompleted(task) {
    setCompeltedTasks([...completedTasks, task]);
    setTodo(todo.filter((a) => a.id !== task.id));
  }

  function revertTodo(done) {
    setTodo([...todo, { id: done.id, taskname: done.taskname, status: false }]);
    setCompeltedTasks(completedTasks.filter((a) => a.id !== done.id));
  }

  const completedlist = completedTasks.map((done) => (
    <div key={done.id}>
      <ul>
        <li>
          <span className="ml-2">{done.taskname}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-2"
            onClick={() => revertTodo(done)}
          >
            revert
          </button>
        </li>
      </ul>
    </div>
  ));

  const list = todo.map((task) => (
    <div key={task.id}>
      <ul>
        <li className="text-orange-200">
          <input
            className="mr-2 "
            type="checkbox"
            onClick={() => markAsCompleted(task)}
          />
          {task.taskname}
        </li>
      </ul>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-100 flex p-4 items-top justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold  mb-2 flex items-center justify-center ">
          Todo List
        </h1>
        <input
          className="border rounded w-full py-2 px-3 mr-4"
          placeholder="Enter todo"
          value={name}
          onChange={handleName}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-2"
          onClick={handleTodo}
        >
          Add todo
        </button>
        <h1 className="text-2xl font-semibold">Pending Task List</h1>
        {list}
        <hr></hr>

        <h1 className="text-2xl font-semibold">Completed Task List</h1>

        {completedlist}
      </div>
    </div>
  );
}
