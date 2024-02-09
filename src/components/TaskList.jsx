import React from 'react';
import TaskItem from './TaskItem';


// aqui também acho que dispensa explicações, recebe todas as props e passa mais uma vez pro taskitem
function TaskList({ handleChangeQuery, query, taskArray, handleAddTaskToArray, handleRemoveTask, handleCheckDone }) {
  return (
    <div className="flex flex-col m-4 gap-4">
      <div className="flex justify-center m-4 gap-4">
        {/*a parte do query vem desse input aqui*/}
        <input
          onChange={handleChangeQuery}
          value={query}
          className="outline-none bg-slate-500 px-2 text-slate-100 rounded-md placeholder:text-slate-200"
          type="text"
          id="taskInput"
          placeholder="Digite a tarefa"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTaskToArray();
            }
          }}
        />
        <button onClick={handleAddTaskToArray} className="bg-slate-300 rounded-md p-1" id="submitButton">
          Adicionar
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {taskArray.map((task) => (
          <TaskItem task={task} key={task.id} handleRemoveTask={handleRemoveTask} handleCheckDone={handleCheckDone} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
