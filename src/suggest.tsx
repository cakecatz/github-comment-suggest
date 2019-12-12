import * as React from "react";
import styled from "styled-components";

const Container = styled.button`
  padding: 8px 16px;
  background: none;
  width: 100%;
  border: none;

  border-bottom: 1px solid #eaecef;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f4f4f4;
  }
`;

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
    <Container onClick={() => onClick(command)}>
      <div style={{ fontWeight: "bold", textAlign: "left" }}>
        <strong>{name}</strong>
      </div>
      <div className="text-gray" style={{ textAlign: "left" }}>
        {description}
      </div>
    </Container>
  );
};
