import { useState } from "react";

// interface NoteVars{
//   Title: string;
//   Body : string;
//   Status : boolean;
//   Key : number;
//   FuncRef1 : any;
//   FuncRef2 : any;
// };

// function Note( {Title, Body, Status, Key, FuncRef1, FuncRef2} : NoteVars){
//   const [Fstatus, ChangeFstatus] = useState(Status);

//   return (<p key={Key}> {Title} : {Body} <input type="checkbox" checked={Fstatus} onChange={() => { ChangeFstatus(!Fstatus); FuncRef1(1, !Fstatus); FuncRef2(Key, Fstatus)  } } /> </p> );
// }

// function RenderList( array : any[], FuncRef1 : any, FucnRef2 : any){
//   return (
//     <div>
//       {array.map( note => <Note Title={note.Title} Body={note.Body} Status={note.Status} Key={note.Key} FuncRef1={FuncRef1} FuncRef2={FucnRef2} />)}
//     </div>
//   );
// }

// function App(){
//   const [Notes, ChangeNotes] = useState([ {Title : "Placeholder", Body : "Placeholder", Status : false, Key : 0 } ]);
//   const [NoteTitle, ChangeNoteTitle] = useState("");
//   const [NoteBody, ChangeNoteBody] = useState("");
//   const [AmountDone, ChangeAmountOfDone] = useState(0);
//   const [Filter, ChangeFilter] = useState(0);

//   let index = 0

//   function ChangeAmount(number : number, whichway : boolean){
//     number *= (whichway) ? 1 : -1;
//     ChangeAmountOfDone(AmountDone + number);
//   }

//   function SetTasks(){
//     let TaskArray = Notes;
//     TaskArray.push( {Title : NoteTitle, Body : NoteBody, Status : false, Key : index } );
//     index++;

//     console.log(TaskArray);

//     ChangeNotes(TaskArray);
//   }

//   function UpdateTasks(index : number, whichway : boolean){
//     let TaskArray = Notes;
//     TaskArray[index].Status = whichway;

//     ChangeNotes(TaskArray);
//   }

//   return (
//     <main>
//       <input type="button" value="Add task" onClick={SetTasks} />
//       <input type="text" id="Title" onChange={ (event) => ChangeNoteTitle(event.currentTarget.value) } />
//       <input type="text" id="Body" onChange={ (event) => ChangeNoteBody(event.currentTarget.value) } />

//       <input type="button" id="Filter" value="Zmień filter" />

//       <br/>

//       <p>Tasks left: {Notes.length - AmountDone}</p>

//       {RenderList(Notes, ChangeAmount, UpdateTasks)}
//     </main>
//   );
// }

interface TasksProps{
  id: number;
  text: string;
  isDone: boolean;
  toggleTask? : () => void;
  deleteTask? : () => void;
}

function Task( {id, text, isDone, toggleTask, deleteTask} : TasksProps ){
  return(
    <>
      <input type="checkbox" checked={isDone} onChange={toggleTask}/>
      <div key={id}>{text} - ({isDone ? 'Done' : 'Not Done'})</div>
      <button onClick={deleteTask}>Delete task</button>
    </>
  );
}

const initialTasks : TasksProps[] = [
    {id: 1, text: "b", isDone: false},
    {id: 2, text: "a", isDone: false}
  ];


function App(){
  type FilterMode = 'All' | 'Done' | 'Active';
  type SortMode = 'Alphabetical' | 'Completion' | 'Original';

  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState<FilterMode>('All');
  const [mode, setMode] = useState<SortMode>('Original');

  const notDoneCount = (tasks.filter( task => task.isDone == false )).length;

  function toggleTask(id : number){
    return tasks.map(task => {
      if(task.id === id){
        task.isDone = !task.isDone;
      }

      return task;
    });
  }

  function deleteTask(id : number){
    setTasks(tasks.filter(task => task.id !== id));
  }

  function addTask(){
    if(!newTaskTitle.trim()) return;

    const newTask : TasksProps = {
      id: Date.now(),
      text : newTaskTitle,
      isDone : false
    }

    setTasks([
      newTask,
      ...tasks,
    ]);
  }

  return(
    <main>
      <button onClick={() => setFilter("All")}>Wszystkie</button>
      <button onClick={() => setFilter("Done")}>Zrobione</button>
      <button onClick={() => setFilter("Active")}>Nie zrobione</button>

      <button onClick={() => setMode("Original")}>Oryginalne</button>
      <button onClick={() => setMode("Alphabetical")}>Alfabetycznie</button>
      <button onClick={() => setMode("Completion")}>Komplicja</button>

      <input type="text" onChange={e => setNewTaskTitle(e.target.value)} />
      <button onClick={addTask}> Dodaj </button>

      {tasks
        .filter(task => {
          if(filter === 'All'){
            return true;
          }
          else if(filter === 'Active'){
            return !task.isDone;
          }
          else if(filter === 'Done'){
            return task.isDone;
          }
        })
        .toSorted((a : TasksProps, b : TasksProps) : number | undefined => {
          if(mode === 'Original'){
            return 0;
          }
          else if(mode === 'Alphabetical'){
            return a.text.localeCompare(b.text);
          }
          else if(mode === 'Completion'){
            return Number(a.isDone) - Number(b.isDone);
          }
        })
        .map(task => <Task id={task.id} text={task.text} isDone={task.isDone} toggleTask={() => setTasks(toggleTask(task.id))} deleteTask={() => deleteTask(task.id)} />)}

      Amount of tasks not done: {notDoneCount}
    </main>
  );
}

export default App