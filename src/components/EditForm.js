import React, { useEffect } from 'react'
import { useState } from 'react'
import { useEditTodoMutation } from '../features/api/apiSlice';

const EditForm = ({setEditMode,text, id}) => {
    // {setEditMode, text, id}
    // const [text, setText] = useState(text);
    const [editTodo , {isSuccess}] = useEditTodoMutation();
    const [input, setInput] = useState(text);

    const handleEditText = () => {
        editTodo({
          id: id,
          data: {
            text: input,
          },
        });
      };
      useEffect(() => {
        if (isSuccess) {
          setEditMode(false);
        }
      }, [isSuccess, setEditMode]);

   
  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-3/5 my-6 mx-auto max-w-2xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full">
            <h3 className="text-xl font-semibold">Edit Todo Text</h3>
            <button className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setEditMode(false)}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <input type="text" defaultValue={text} className="border block w-full p-2" onChange={(e) => setInput(e.target.value)} />
          </div>

          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setEditMode(false)}>
              Close
            </button>
            <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleEditText}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default EditForm;
