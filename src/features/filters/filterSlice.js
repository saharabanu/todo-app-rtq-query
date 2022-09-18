import { createSlice} from '@reduxjs/toolkit';


const initialState={
    status: "All",
    colors: [],
   
}

const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
        statusChanged:(state,action)=>{
            state.status = action.payload
        },
        colorSelected:(state,action)=>{
            state.colors.push(action.payload);

        },
        colorRemoved:(state,action)=>{
            state.colors = state.colors.filter(
                (existingColor) => existingColor !== action.payload
            )
        },
    }
})

export default filterSlice.reducer;
export const {colorRemoved, statusChanged, colorSelected} = filterSlice.actions;


// all commpleted   state.map(todo => {
//     ...todo, completed: true,
// })

// clear completed 
// state.filter(todo => !todo.completed)


// footers filter 