import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      border-bottom: 3px solid transparent;
      color: ${(props) => props.theme["gray-100"]};
      transition: border-bottom-color 0.2s;
      border-top: 3px solid transparent;
      justify-content: center;
      align-items: center;

      &:hover {
        border-bottom-color: ${(props) => props.theme["green-500"]};
      }

      &.active {
        color: ${(props) => props.theme["green-500"]};
      }
    }
  }
`;
