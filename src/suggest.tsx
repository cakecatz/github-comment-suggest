import * as React from "react";

interface Props {
  name: string;
  command: string;
  description: string;
  onClick: (name: string) => void;
}

export const Suggest: React.FC<Props> = ({
  name,
  command,
  description,
  onClick
}) => {
  return (
    <button
      onClick={() => onClick(command)}
      style={{
        padding: "8px 16px",
        background: "none",
        width: "100%",
        border: "none"
      }}
    >
      <div style={{ fontWeight: "bold", textAlign: "left" }}>
        <strong>{name}</strong>
      </div>
      <div className="text-gray" style={{ textAlign: "left" }}>
        {description}
      </div>
    </button>
  );
};
