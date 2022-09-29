import styled from "styled-components";

export const CountdownContainer = styled.div`
  color: ${(props) => props.theme["gray-100"]};
  font-family: "Roboto Mono", monospace;
  line-height: 8rem;
  font-size: 10rem;

  display: flex;
  gap: 1rem;

  span {
    background-color: ${(props) => props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  width: 4rem;
  display: flex;
  color: ${(props) => props.theme["green-500"]};
  justify-content: center;
  overflow: hidden;
  padding: 2rem 0;
`;
