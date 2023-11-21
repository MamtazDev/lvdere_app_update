import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCourse: undefined,
  selectedLesson: undefined,
  editingCourse: undefined,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setSelectedLesson: (state, action) => {
      state.selectedLesson = action.payload;
    },
    setEditingCourse: (state, action) => {
      state.editingCourse = action.payload;
    },
  },
});

export const { setSelectedCourse, setSelectedLesson, setEditingCourse } =
  courseSlice.actions;
export default courseSlice.reducer;
