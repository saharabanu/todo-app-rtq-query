import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cancelImage from "../assets/images/cancel.png";
import { useDeleteTodoMutation, useEditTodoMutation } from "../features/api/apiSlice";
import EditForm from "./EditForm";
import { toast } from "react-toastify";



export default function Todo({todo}) {
    const [editMode, setEditMode] = useState(false);
   
   const [editTodo] = useEditTodoMutation();
    const {id, text, completed, color} = todo;


    const [deleteTodo, {isSuccess, isError}] = useDeleteTodoMutation();

    const handleDelete = (id) => {
          deleteTodo(id)
    }

    useEffect(() => {
        if (isSuccess);
    }, [isSuccess]);

    const handleToggle = (id) => {
        editTodo({id: id, data: {completed: !completed}})
    }

    const handleColorChanged = (color) => {
        editTodo({ id, data:{color:color}})
    }


    const notify = () => {
        if (isSuccess) {
          toast.success("Todo Deleted Successfully!", {
            position: "top-center",
          });
        } else if (isError) {
          toast.error("An Error Occured", {
            position: "top-center",
          });
        }
      };


      const handleEdit = () => {
        setEditMode(true);
      };
      useEffect(() => {
        if (isSuccess || isError) {
          notify();
        }
      }, [isSuccess, isError]);

    return (
        <>
      

        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
        <div className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${completed && "border-green-500 focus-within:border-green-500"}`}>

            {/* <input onClick={() => handleToggle(id)}
                type="checkbox"
                className="opacity-0 absolute rounded-full"
            />
            <svg
                className="hidden fill-current w-3 h-3 text-green-500 pointer-events-none"
                viewBox="0 0 20 20"
            >
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg> */}
            <input type="checkbox" checked={completed} onChange={() => handleToggle(id)} className="opacity-0 absolute rounded-full" />
          {completed && (
            <svg className="fill-current w-3 h-3 text-green-500 pointer-events-none" viewBox="0 0 20 20">
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>

        {editMode && (
          <div className="absolute m-0 p-0 w-1/3">
            <EditForm setEditMode={setEditMode} text={text} id={id} />
          </div>
        )} 
        <div onDoubleClick={handleEdit} className={`select-none flex-1 ${completed && "line-through"}`}>
          {text}
        </div>

        
       

        <div>
        <i className="fa-solid fa-pencil cursor-pointer" onClick={() => handleEdit(id)}></i>
        </div>

        <div onClick={() => handleColorChanged("green")} className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${color === "green" && "bg-green-500"}`} ></div>

        <div onClick={() => handleColorChanged("yellow")} className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${color === "yellow" && "bg-yellow-500"}`}></div>

        <div onClick={() => handleColorChanged("red")} className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${color === "red" && "bg-red-500"}`}></div>

        <img onClick={()=>handleDelete(id)}
            src={cancelImage}
            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
            alt="Cancel"
        />
        
    </div>


   
    </> 
    );
}




 
    
  