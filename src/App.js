import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState("");
  const [allTodo, setallTodo] = useState([]);
  const [updatetodo, setUpdatetodo] = useState("");
  //getting the lenth of the todo that is added
  const numTodo = allTodo.length;

  // function that handles submit
  const headleSubmit = (e) => {
    e.preventDefault();
    //checking if the input is empty
    if (todo !== "") {
      //updating edited list
      if (updatetodo === "") {
        //asigning a unique id on todo and storing the value from into allTodo with spread operator
        setallTodo([{ id: `{todo}-${Date.now()}`, todo }, ...allTodo]);
        //reseeting the input field
      } else {
        //getting id of the current allTodo
        const taskUpdate = allTodo.filter((todoId) => todoId.id === updatetodo);
        //assigning the text to the id
        taskUpdate.todo = todo;

        //finding current id that was clicked
        const newObjitem = allTodo.findIndex((f) => f.id === updatetodo);
        taskUpdate.id = `{todo}-${Date.now()}`;
        const tempArray = [...allTodo];
        console.log(tempArray);
        //updating the text that was clicked
        tempArray[newObjitem] = taskUpdate;
        setallTodo([...tempArray]);
      }
    }
    setTodo("");
    setUpdatetodo("");
  };

  //delete function
  const handleDelete = (id) => {
    const deleteTodo = allTodo.filter((todoId) => todoId.id !== id);
    setallTodo([...deleteTodo]);
  };

  //edit function
  const handleEdit = (id) => {
    //getting the clicked todo in the input field
    setTodo(id.todo);
    //getting the id of the todo that is to be updated
    setUpdatetodo(id.id);
  };
  //clear list
  function handleClearList() {
    //confirming before delete
    const confirmed = window.confirm("Are you sure you to want clear the list");
    if (confirmed) setallTodo([]);
  }
  //update function
  function handleCheck(item) {
    //getting the status of the chechedbox
    const checkedStatus = document.getElementById(item.id).checked;
    //getting the array items that was not clicked
    const notChecked = allTodo.filter((todoId) => todoId.id !== item.id);
    //getting the array items that was clikcked
    const checkedItem = allTodo.filter((todoId) => todoId.id === item.id);
    //getting the status of the items that was clicked
    if (checkedStatus) {
      //re-ordering the items in the array
      setallTodo([...notChecked, checkedItem[0]]);
    } else {
      setallTodo([checkedItem[0], ...notChecked]);
    }
    //getting label of item that was clikcked and toggling the line-through class
    document
      .getElementById(item.id)
      .nextSibling.classList.toggle("line-through");
  }
  // const checkTodo = allTodo.map((td) =>
  //   td.id === id ? todo : { ...todo, checked: !todo.checked }
  // classList.toggle("mystyle")

  return (
    // todo container
    <div className="App">
      <div className="container space-y-3 relative" key={todo.id}>
        <h1>Todo-List App</h1>

        {/* form section */}
        <form className="todoform" onSubmit={headleSubmit}>
          {/* function that handle onChange of the form */}
          <input
            key={todo.id}
            className=" text-gray-500 todoInput"
            type="text"
            value={todo}
            placeholder="Enter Todo"
            onChange={(e) => setTodo(e.target.value)} //targeting the value in the input
          />
          <button
            className={`${
              updatetodo === ""
                ? "bg-blue-600 transition-all duration-700"
                : "bg-green-500 transition-all duration-700"
            }`}
            type="submit"
          >
            {updatetodo === "" ? "Enter" : "Update"}
          </button>

          {allTodo.length > 0 && (
            <button onClick={handleClearList}>Clear List</button>
          )}
        </form>
        {/* list section */}
        <ul className="todoUl space-y-2 divide-y ">
          {/* using map methode get values */}
          {allTodo.map((todoIteams) => (
            <li key={todoIteams.id}>
              <div
                className="flex pt-2 w-[490px] items-center"
                key={todoIteams.id}
              >
                <input
                  key={todoIteams.id}
                  onChange={() => handleCheck(todoIteams)}
                  type="checkbox"
                  id={todoIteams.id}
                  value={todoIteams.checked}
                  className=" peer inputcheck"
                  required=""
                />
                <label
                  htmlFor={todoIteams.id}
                  className=" text-left px-2 flex-grow todoText  "
                >
                  {todoIteams.todo}
                </label>
                {/* calling handleEdit function inside edit button*/}
                <button
                  id={todoIteams.id}
                  className="btnaction"
                  onClick={() => handleEdit(todoIteams)}
                >
                  Edit
                </button>
                {/* calling handleDelete function inside delete button*/}
                <button
                  className="btnaction"
                  onClick={() => handleDelete(todoIteams.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <footer className="absolute bottom-4  font-bold font-mono">
          {!allTodo.length
            ? "Start adding items to your todo list"
            : `You have added ${numTodo} todo on your list`}
        </footer>
      </div>
    </div>
  );
}
