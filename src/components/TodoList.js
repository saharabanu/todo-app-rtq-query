import { useGetTodosQuery } from "../features/api/apiSlice";
import Error from "./pages/Error";
import TodoLoader from "./pages/TodoLoader";
import Todo from "./Todo";

export default function TodoList() {
    const { data: todos, isLoading, isError } = useGetTodosQuery();

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
        content = <Error message="No Todos found!" />;
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
