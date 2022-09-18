import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import { colorRemoved, colorSelected, statusChanged } from "../features/filters/filterSlice";

const numberOfTodos = (no_todos) => {
    switch (no_todos) {
        case 0:
            
            return "No task"
        case 1:
            
            return "1 task"
    
        default:
           return `${no_todos} tasks`
    }
}

export default function Footer() {
    const dispatch = useDispatch();
    const {status, colors} = useSelector((state) => state.filters);
    const {data: todos, isLoading, isSuccess, isError}= useGetTodosQuery();
    

    const todosRemaining = todos?.filter(todo => !todo.completed).length;
   

    const handleColorChange = (color) => {
        if (colors.includes(color)) {
          dispatch(colorRemoved(color));
        } else {
          dispatch(colorSelected(color));
        }
      };

      const handleStatusChanged = (status) =>{
       dispatch(statusChanged(status))
      }
    


    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
         
        <p>{numberOfTodos(todosRemaining)} left</p>
       
            <ul className="flex space-x-1 items-center text-xs">
                <li onClick={() => handleStatusChanged("All")} className="cursor-pointer font-bold">All</li>
                <li>|</li>
                <li onClick={() => handleStatusChanged("Incomplete")} className="cursor-pointer">Incomplete</li>
                <li>|</li>
                <li onClick={() => handleStatusChanged("Complete")}  className="cursor-pointer">Complete</li>
                <li></li>
                <li></li>
                <li onClick={()=> handleColorChange("green")} className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${colors.includes("green") && "bg-green-500"
                    }`}></li>
                <li onClick={()=> handleColorChange("red")} className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
                        colors.includes("red") && "bg-red-500"
                    }`}></li>
                <li onClick={()=> handleColorChange("yellow")}  className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
                        colors.includes("yellow") && "bg-yellow-500"
                    }`}></li>
            </ul>
        </div>
    );
}
