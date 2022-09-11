import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import { useAddTodoMutation } from "../features/api/apiSlice";
import Error from "./pages/Error";
import Success from "./pages/Success";

export default function Header() {
    const [addTodo , { isLoading, isError, isSuccess}] = useAddTodoMutation();

    const [text, setText] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      addTodo({
        text,
        completed: false
      })
      setText("")
    
    }





    return (
        <div>
        <>
            <form method="POST" onSubmit={handleSubmit} className="flex items-center bg-gray-100 px-4 py-4 rounded-md">
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>

             {isSuccess && (
                    <Success message="todo was added successfully" />
                )}
                {isError && (
                    <Error message="There was an error adding todo!" />
                )}
            </form>
            </>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li className="flex space-x-1 cursor-pointer">
                    <img className="w-4 h-4" src={tickImage} alt="Complete" />
                    <span>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer">Clear completed</li>
            </ul>
        </div>
    );
}
