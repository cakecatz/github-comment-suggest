import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, completeCommand, CommandSuggest } from "./app";
import { Suggest } from "./suggest";

interface Props {}

export const CommandSuggestion: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const show = useSelector<AppState, boolean>(state => state.show);
  const [top, left] = useSelector<AppState, [number, number]>(state => [
    state.top,
    state.left
  ]);
  const suggests = useSelector<AppState, CommandSuggest[]>(state =>
    state.suggests.filter(suggest => suggest.name.includes(state.input))
  );

  const handleClickSuggest = React.useCallback(
    (command: string) => {
      dispatch(completeCommand({ command }));
    },
    [dispatch]
  );

  return (
    show && (
      <div
        style={{
          position: "absolute",
          top,
          left,
          background: "white",
          zIndex: 1000,
          width: 400,
          transform: "translateY(-100%)",
          border: "1px solid #d1d5da",
          borderRadius: 3
        }}
      >
        {suggests.map(suggest => (
          <Suggest
            key={`suggest-${suggest.name}`}
            {...suggest}
            onClick={handleClickSuggest}
          />
        ))}
      </div>
    )
  );
};
