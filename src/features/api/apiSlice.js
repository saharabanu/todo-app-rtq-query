import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://desolate-headland-58487.herokuapp.com",
    }),
    tagTypes: ["todos", "todo"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (queryString) => ({
                url: `/todos?${queryString}`,

                
                
            }),
            providesTags: ["todos"]
        }),
        getTodo: builder.query({
            query: (todoId) => `/todos/${todoId}`,
            providesTags: (result, error, arg) => [{ type: "todo", id: arg }],
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todos",
                method: "POST",
                body: data,
                
            }),
           invalidatesTags: ["todos"]
        }),


        // editVideo: builder.mutation({
        //     query: ({ id, data }) => ({
        //         url: `/videos/${id}`,
        //         method: "PATCH",
        //         body: data,
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         "Videos",
        //         { type: "Video", id: arg.id },
                
        //     ],
        // }),
        editTodo: builder.mutation({
            query: ({id, data}) => ({
              url: `/todos/${id}`,
              method: "PATCH",
              body: data,
            }),
            invalidatesTags: ["todos"],
          }),


   


        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ["todos"]
        })
    })
})

export const {useGetTodosQuery, useGetTodoQuery, useDeleteTodoMutation, useAddTodoMutation, useEditTodoMutation} = apiSlice