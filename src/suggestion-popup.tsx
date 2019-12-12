import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, insertSuggestion, Suggestion } from "./app";
import { SuggestionListItem } from "./suggestion-list-item";
import styled from "styled-components";
import { filter } from "fuzzy";

const Container = styled.div`
  position: absolute;
  background: white;
  z-index: 1000;
  width: 400px;
  transform: translateY(-100%);
  border: 1px solid #d1d5da;
  border-radius: 3px;
`;

export const SuggestionPopup: React.FC = ({}) => {
  const dispatch = useDispatch();
  const show = useSelector<AppState, boolean>(state => state.show);
  const [top, left] = useSelector<AppState, [number, number]>(state => [
    state.top,
    state.left
  ]);
  const suggestions = useSelector<AppState, Suggestion[]>(state =>
    filter(state.input, state.suggestions, { extract: s => s.name }).map(
      m => m.original
    )
  );

  const handleClickSuggestion = React.useCallback(
    (suggestion: string) => {
      dispatch(insertSuggestion({ suggestion }));
    },
    [dispatch]
  );

  if (!show) {
    return null;
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Container
      style={{
        top,
        left
      }}
    >
      {suggestions.map(suggestion => (
        <SuggestionListItem
          key={`suggestion-${suggestion.name}`}
          {...suggestion}
          onClick={handleClickSuggestion}
        />
      ))}
    </Container>
  );
};
