import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  padding: 2.5rem;
  max-width: 74rem;
  height: calc(100vh - 10rem);
  background-color: ${(props) => props.theme["gray-800"]};
  flex-direction: column;
  border-radius: 8px;
  margin: 5rem auto;

  @media (max-width: 1368px) {
    margin-right: 2rem;
    margin-left: 2rem;
  }

  @media (max-height: 700px) {
    height: 100%;
  }
`;
