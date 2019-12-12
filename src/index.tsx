import * as React from "react";
import * as ReactDOM from "react-dom";
import { CommandSuggestion } from "./command-suggestion";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore, AnyAction } from "@reduxjs/toolkit";
import {
  app,
  AppState,
  hideSuggestion,
  showSuggestion,
  registerSuggests,
  CommandSuggest
} from "./app";
import { PR_NEW_COMMENT_ID } from "./constants";

const COMMAND_TRIGGER_REGEX = /^\/[a-z]*$/;
const nodeId = "github-comment-suggest";
const commentArea = document.getElementById(PR_NEW_COMMENT_ID);
const node = document.createElement("div");
node.setAttribute("id", nodeId);
document.body.appendChild(node);

async function getCommandList(): Promise<CommandSuggest[]> {
  return new Promise(resolve => {
    chrome.storage.sync.get(
      {
        commandList: []
      },
      function(items) {
        resolve(items.commandList as CommandSuggest[]);
      }
    );
  });
}

function initialize(store: EnhancedStore<AppState, AnyAction>) {
  getCommandList().then(list => {
    store.dispatch(registerSuggests({ suggests: list }));
  });

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
