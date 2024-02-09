import { useState } from "react";
import {X} from 'lucide-react'


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
      className={`relative p-4 rounded-md text-justify hover:scale-[1.03] transition-all scroll-smooth antialiased hover:z-50 ${
        isTaskDone ? 'bg-green-500' : 'bg-slate-800'
      }`}
      key={task.id}
    >
    <p className={`text-slate-200 pointer-events-none ${isTaskDone ? 'line-through' : ''}`}>
        • {task.text}
      </p>
      <span
        className="text-slate-400 hover:text-slate-200 cursor-pointer absolute px-1 top-0 right-0"
        style={{ textDecoration: 'none' }}
        onClick={() => {
          handleRemoveTask(task.id);
        }}
      >{<X size={16} strokeWidth={0.5}/>}</span>
    </div>
  );
}

export default TaskItem;
