import { createSlice } from "@reduxjs/toolkit";

export const ASYNC_STATUS_WAITING = 0;
export const ASYNC_STATUS_DONE = 1;

const asyncStatus = createSlice({
  reducers: {
    waiting: (state) => {
      state.status = ASYNC_STATUS_WAITING;
    },
    done: (state) => {
      state.status = ASYNC_STATUS_DONE;
    },
  },
  initialState: {
    status: 1,
  },
  slice: "asyncStatus",
  name: "asyncStatus",
});

export default asyncStatus;
