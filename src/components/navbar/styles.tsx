import styled from "styled-components";
import ItemWrapper from "../helpers/ItemWrapper";
import PageText from "../helpers/PageText";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-image: linear-gradient(var(--text-color), var(--main-color));
  color: #333;
  z-index: 2;
`;

export const Heading = styled.h1`
  text-align: center;
  font-family: "Fruktur", cursive;
  padding: 30px 15px;
  letter-spacing: 2px;
`;

export const Wrapper = styled(ItemWrapper)`
  flex-grow: 1;
  display: ${(props) => (props.display ? props.display : "block")};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
`;

export const MenuItem = styled(ItemWrapper)`
  > a {
    align-items: center;
    color: var(--main-color);
    cursor: pointer;
    display: flex;
    gap: 15px;
    color: var(--main-color);
    font-weight: bold;
    letter-spacing: 2px;
    padding: 15px;
    text-decoration: none;

    :hover {
      background-color: var(--main-color);
      color: var(--text-color);
      border-left: 2px solid var(--text-color);
      border-right: 2px solid var(--text-color);
      box-shadow: 3px 0 5px var(--main-color);
    }

    .menu-name {
      flex: 1 1 auto;
      font-family: "Montserrat", cursive;
    }
  }

  > a.active {
    background-color: var(--main-color);
    color: var(--text-color);
    border-left: 2px solid var(--text-color);
    border-right: 2px solid var(--text-color);
    box-shadow: 3px 0 5px var(--main-color);
  }
`;
export const ThemeWrapper = styled(ItemWrapper)`
  text-align: center;
  padding: 15px;
  color: var(--text-color);
`;

export const CounterText = styled(PageText)`
  font-weight: bold;
`;
