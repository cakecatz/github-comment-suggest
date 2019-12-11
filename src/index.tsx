import * as React from "react";
import * as ReactDOM from "react-dom";
import { CommandSuggestion } from "./command-suggestion";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore, AnyAction } from "@reduxjs/toolkit";
import { app, AppState, hideSuggestion, showSuggestion } from "./app";
import { PR_NEW_COMMENT_ID } from "./constants";

const COMMAND_TRIGGER_REGEX = /^\/[a-z]*$/;
const nodeId = "github-comment-suggest";
const commentArea = document.getElementById(PR_NEW_COMMENT_ID);
const node = document.createElement("div");
node.setAttribute("id", nodeId);
document.body.appendChild(node);

function initialize(store: EnhancedStore<AppState, AnyAction>) {
  ReactDOM.render(
    <Provider store={store}>
      <CommandSuggestion />
    </Provider>,
    document.getElementById(nodeId)
  );
}

if (commentArea) {
  const store = configureStore({ reducer: app.reducer });

  commentArea.addEventListener("input", (e: InputEvent) => {
    const t = e.currentTarget as HTMLTextAreaElement;
    const s = store.getState();

    const pos = t.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    console.log(s);

    if (COMMAND_TRIGGER_REGEX.test(t.value)) {
      store.dispatch(
        showSuggestion({
          input: t.value,
          top: pos.top + scrollTop,
          left: pos.left + scrollLeft
        })
      );
    } else if (s.show) {
      store.dispatch(hideSuggestion());
    }
  });

  initialize(store);
}
