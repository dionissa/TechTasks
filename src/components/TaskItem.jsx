import { useState } from "react";


// sem muita explicação pra essa parte também, é quase só a renderização do card e uns onclick com uns estilos pra deixar certo
export function TaskItem({ task, handleRemoveTask, handleCheckDone }) {
  const [isTaskDone, setIsTaskDone] = useState(false);

  const toggleTaskDone = () => {
    setIsTaskDone(!isTaskDone);
    handleCheckDone(task.id);
  };

  return (
    <div
      onClick={toggleTaskDone}
      className={`relative p-4 rounded-md text-justify ${
        isTaskDone ? 'bg-green-500' : 'bg-slate-800'
      }`}
      key={task.id}
    >
      <p className={`text-slate-200 ${isTaskDone ? 'line-through' : ''}`}>
        • {task.text}
      </p>
      <span
        className="text-slate-400 hover:text-slate-200 cursor-pointer absolute bg-red-600 rounded-md px-2 top-0 right-0"
        style={{ textDecoration: 'none' }}
        onClick={(e) => {
          handleRemoveTask(task.id);
        }}
      >X</span>
    </div>
  );
}

export default TaskItem;
