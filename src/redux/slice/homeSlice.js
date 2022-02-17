import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const homeslice = createSlice({
  name: 'home',
  initialState: {
   IssueBookId:null,
   IssueUserId:null
    
  },
  reducers: {
    setIssueBookId: (state, action) => {
      state.IssueBookId = action.payload;
    },
    setIssueUserId: (state, action) => {
      state.IssueUserId = action.payload;
    },
  },
});

//actions
export const { setIssueBookId,setIssueUserId } = homeslice.actions;


export default homeslice.reducer;
