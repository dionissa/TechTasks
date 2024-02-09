import { useState, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';
import { toast } from 'sonner';

export function App() {

  // Query é onde vai pegar o que o usuário digitou pra nova tarefa
  const [query, setQuery] = useState('');
  // taskArray é a array que vão ficar todas as tasks, ai invés de receber uma [] vazia logo de cara,
  // vai abrir uma função que se o localStorage não tiver nada, cria um [], mas se tiver alguma coisa no
  // local storage, ele vai iniciar essa array com as tasks salvas lá.
  const [taskArray, setTaskArray] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // esse useEffect vai ser pra guardar as tasks quando forem adicionas pelo usuário no localStorage
  // ele vai stringifar elar e depois passar como Json no taskArray.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskArray));
  }, [taskArray]);

  // funçãozinha básica só pra o que o usuário digitar no input seja pego e usado como valor pra criar a task
  function handleChangeQuery(event) {
    setQuery(event.target.value);
  }

  // a cereja do código, onde vai adicionar a task quando clicar no Adicionar,
  // se não tiver nada no query (input de texto) ele vai fazer nada
  // caso tenha algo, ele vai passar o novo valor de TaskArray com o set usando uma função,
  // essa função vai pegar a lista antiga, usando o spread e depois adicionar a task nova.
  // essa task nova recebe um id único (com o date.now que sempre vai dar um valor diferente),
  // um texto que vem do query e já inicia com o isDone falso, porque vai iniciar incompleta né
  function handleAddTaskToArray() {
    if (!query) return;

    const newTask = {
      id: Date.now(),
      text: query,
      isDone: false
    };
    toast.success('Nota criada')

    setTaskArray(prevTaskArray => [...prevTaskArray, newTask]);

    setQuery('');
  }

  //  outra funçãozinha para remover a task da lista, aqui a gente cria uma taskarray atualizada, como?
  // ele vai iterar sobre todos os itens da taskarray padrão lá e filtrar, procurando pelo id da div que foi clicada
  // como com certeza vai ter um div com o id igual (porque o botão foi feito nela né) ele vai achar e então vai tirar esse task da array
  // ai como a gente não pode alterar a array principal, temos que passar uma nova array sem essa task que a gente tirou.
  // esse setTaskArray com a updated faz isso.
  function handleRemoveTask(taskId) {
    const updatedTaskArray = taskArray.filter((task) => task.id !== taskId);
    setTaskArray(updatedTaskArray);
  }


  // pra gente conseguir fazer a função de check na nota, foi uma ideia bem simples mas efetiva
  // é feito uma função que vai alterar lá a nossa taskArray (alterar é sempre no caso criar uma array nova e substituir)
  // usando um if pra encontrar o id da div clicada, quando achar qual é essa div ele vai retornar o quê?
  // um spread com todas as informações da task que tem na lista padrão, mas, com a alteração do booleano isDone :)
  function handleCheckDone(taskId) {
    setTaskArray(prevTaskArray =>
      prevTaskArray.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            isDone: !task.isDone
          };
        }
        return task;
      })
    );
  }


  // aqui nem precisa explicar né, return criador de div e lançando todas as funções como props
  return (
    <div className='flex flex-col justify-center'>
      <h1 className="text-3xl font-bold underline">
        TechTasks
      </h1>
      <div>
        <TaskList
          taskArray={taskArray}
          handleAddTaskToArray={handleAddTaskToArray}
          handleRemoveTask={handleRemoveTask}
          handleChangeQuery={handleChangeQuery}
          query={query}
          handleCheckDone={handleCheckDone}
        />
      </div>
    </div>
  );
}

export default App;
