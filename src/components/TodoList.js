import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import Error from "./pages/Error";
import NoTodo from "./pages/NoTodo";
import Success from "./pages/Success";
import TodoLoader from "./pages/TodoLoader";
import Todo from "./Todo";

export default function TodoList() {
   
    const {status, colors} = useSelector((state) => state.filters);


    let queryString = "";
    queryString += colors?.map((color) => `color=${color}`).join("&");
    if (status === "Complete") {
      queryString += `&completed=${true}`;
    }
    if (status === "Incomplete") {
      queryString += `&completed=${false}`;
    }
    const { data: todos, isLoading, isError } = useGetTodosQuery(queryString);
    // decide what to render
    let content = null;

    if (isLoading) {
        content = (
            <>
               <TodoLoader/>
               <TodoLoader/>
               <TodoLoader/>
               <TodoLoader/>
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />;
    }

    if (!isLoading && !isError && todos?.length === 0) {
        content = <NoTodo message="No Todos found!" />;
    }

    if (!isLoading && !isError && todos?.length > 0) {
        content = todos.map((todo) => <Todo key={todo.id} todo={todo} />);
    }
   
    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
          {content}
        </div>
    );
}
