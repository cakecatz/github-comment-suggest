import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { PR_NEW_COMMENT_ID } from "./constants";

export interface Suggestion {
  name: string;
  description: string;
}

export interface AppState {
  show: boolean;
  top: number | null;
  left: number | null;
  input: string;
  suggestions: Suggestion[];
}

export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;

const initialState: AppState = {
  show: false,
  top: null,
  left: null,
  input: "",
  suggestions: []
};

export const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    showSuggestion(
      state,
      { payload }: PayloadAction<{ top: number; left: number; input: string }>
    ) {
      state.show = true;
      state.top = payload.top - 5;
      state.left = payload.left + 20;
      state.input = payload.input;
    },
    hideSuggestion(state) {
      state.show = false;
      state.top = null;
      state.left = null;
      state.input = "";
    },
    registerSuggestions(
      state,
      { payload }: PayloadAction<{ suggestions: Suggestion[] }>
    ) {
      state.suggestions = payload.suggestions;
    }
  }
});

export const {
  showSuggestion,
  hideSuggestion,
  registerSuggestions
} = app.actions;

export const insertSuggestion = ({
  suggestion
}: {
  suggestion: string;
}): AppThunk => async dispatch => {
  const target = <HTMLTextAreaElement>(
    document.getElementById(PR_NEW_COMMENT_ID)
  );

  if (!target) {
    throw new Error("not found target");
  }

  target.value = `${suggestion} `;
  target.focus();

  dispatch(hideSuggestion());
};
