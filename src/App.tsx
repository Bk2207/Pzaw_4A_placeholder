import { useState } from "react";

interface NoteVars{
  Title: string;
  Body : string;
  Status : boolean;
  Key : number;
  FuncRef1 : any;
  FuncRef2 : any;
};

function Note( {Title, Body, Status, Key, FuncRef1, FuncRef2} : NoteVars){
  const [Fstatus, ChangeFstatus] = useState(Status);

  return (<p key={Key}> {Title} : {Body} <input type="checkbox" checked={Fstatus} onChange={() => { ChangeFstatus(!Fstatus); FuncRef1(1, !Fstatus); FuncRef2(Key, Fstatus)  } } /> </p> );
}

function RenderList( array : any[], FuncRef1 : any, FucnRef2 : any){
  return (
    <div>
      {array.map( note => <Note Title={note.Title} Body={note.Body} Status={note.Status} Key={note.Key} FuncRef1={FuncRef1} FuncRef2={FucnRef2} />)}
    </div>
  );
}

function App(){
  const [Notes, ChangeNotes] = useState([ {Title : "Placeholder", Body : "Placeholder", Status : false, Key : 0 } ]);
  const [NoteTitle, ChangeNoteTitle] = useState("");
  const [NoteBody, ChangeNoteBody] = useState("");
  const [AmountDone, ChangeAmountOfDone] = useState(0);
  const [Filter, ChangeFilter] = useState(0);

  let index = 0

  function ChangeAmount(number : number, whichway : boolean){
    number *= (whichway) ? 1 : -1;
    ChangeAmountOfDone(AmountDone + number);
  }

  function SetTasks(){
    let TaskArray = Notes;
    TaskArray.push( {Title : NoteTitle, Body : NoteBody, Status : false, Key : index } );
    index++;

    console.log(TaskArray);

    ChangeNotes(TaskArray);
  }

  function UpdateTasks(index : number, whichway : boolean){
    let TaskArray = Notes;
    TaskArray[index].Status = whichway;

    ChangeNotes(TaskArray);
  }

  return (
    <main>
      <input type="button" value="Add task" onClick={SetTasks} />
      <input type="text" id="Title" onChange={ (event) => ChangeNoteTitle(event.currentTarget.value) } />
      <input type="text" id="Body" onChange={ (event) => ChangeNoteBody(event.currentTarget.value) } />

      <input type="button" id="Filter" value="Zmień filter" />

      <br/>

      <p>Tasks left: {Notes.length - AmountDone}</p>

      {RenderList(Notes, ChangeAmount, UpdateTasks)}
    </main>
  );
}

export default App