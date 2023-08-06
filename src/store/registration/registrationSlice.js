import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  userData: null,
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})


export const {
  setUserData,
} = registrationSlice.actions

export default registrationSlice.reducer
