import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, completeCommand, CommandSuggest } from "./app";
import { Suggest } from "./suggest";
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

export const CommandSuggestion: React.FC = ({}) => {
  const dispatch = useDispatch();
  const show = useSelector<AppState, boolean>(state => state.show);
  const [top, left] = useSelector<AppState, [number, number]>(state => [
    state.top,
    state.left
  ]);
  const suggests = useSelector<AppState, CommandSuggest[]>(state =>
    filter(state.input, state.suggests, { extract: s => s.name }).map(
      m => m.original
    )
  );

  const handleClickSuggest = React.useCallback(
    (command: string) => {
      dispatch(completeCommand({ command }));
    },
    [dispatch]
  );

  if (!show) {
    return null;
  }

  if (suggests.length === 0) {
    return null;
  }

  return (
    <Container
      style={{
        top,
        left
      }}
    >
      {suggests.map(suggest => (
        <Suggest
          key={`suggest-${suggest.name}`}
          {...suggest}
          onClick={handleClickSuggest}
        />
      ))}
    </Container>
  );
};
