import { createSlice} from '@reduxjs/toolkit';


const initialState={
    status:"all"
   
}

const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{}
})

export default filterSlice.reducer

// export default filterSlice.reducer;
// export const {filterByStatus,filterBySearch,pagination} = filterSlice.actions;