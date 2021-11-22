import styled from "styled-components";

import ItemWrapper from "../helpers/ItemWrapper";
import PageText from "../helpers/PageText";
export const Container = styled(ItemWrapper)`
  align-items: ${(props) => (props.alignItems ? props.alignItems : `stretch`)};
  align-content: ${(props) =>
    props.alignContent ? props.alignContent : `stretch`};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : `inherit`};
  color: ${(props) => (props.color ? props.color : `inherit`)};
  display: ${(props) => (props.display ? props.display : `block`)};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : `row`};
  flex-grow: ${(props) => (props.flexGrow ? props.flexGrow : `0`)};
  flex-shrink: ${(props) => (props.flexShrink ? props.flexShrink : `1`)};
  flex-basis: ${(props) => (props.flexBasis ? props.flexBasis : `auto`)};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : `flex-start`};
  max-width: 960px;
  min-height: 98vh;
  padding-top: ${(props) =>
    props.paddingTop ? `${props.paddingTop}px` : `initial`};
  width: 100%;
`;

export const Section = styled(ItemWrapper)`
  align-items: ${(props) => (props.alignItems ? props.alignItems : `stretch`)};
  align-content: ${(props) =>
    props.alignContent ? props.alignContent : `stretch`};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : `inherit`};
  color: ${(props) => (props.color ? props.color : `inherit`)};
  display: ${(props) => (props.display ? props.display : `block`)};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : `row`};
  flex-grow: ${(props) => (props.flexGrow ? props.flexGrow : `0`)};
  flex-shrink: ${(props) => (props.flexShrink ? props.flexShrink : `1`)};
  flex-basis: ${(props) => (props.flexBasis ? props.flexBasis : `auto`)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : `400`)};
  gap: ${(props) => (props.gap ? props.gap : 0)};
`;

export const Content = styled(ItemWrapper)`
  flex-grow: ${(props) => (props.flexGrow ? props.flexGrow : `0`)};
  color: ${(props) => (props.color ? props.color : `#333`)};
`;
export const Text = styled(PageText)`
  background-color: inherit;
`;

export const HorizontalCard = styled(ItemWrapper)`
  align-items: ${(props) => (props.alignItems ? props.alignItems : `center`)};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : `#f9f9f9`};
  border-radius: 8px;
  color: ${(props) => (props.color ? props.color : `inherit`)};
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : `row`};
  flex-grow: ${(props) => (props.flexGrow ? props.flexGrow : `0`)};
  flex-shrink: ${(props) => (props.flexShrink ? props.flexShrink : `1`)};
  flex-basis: ${(props) => (props.flexBasis ? props.flexBasis : `auto`)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : `400`)};
  gap: 15px;
  margin-bottom: 15px;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : `10px`)};
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : `10px`};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : `20px`)};
  padding-right: ${(props) =>
    props.paddingRight ? props.paddingRight : `20px`};
  width: 100%;
  :hover {
    p {
      cursor: pointer;
    }
  }
`;

export const Chevron = styled(PageText)`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 15px;
  cursor: pointer;
`;

export const TagWrapper = styled(ItemWrapper)`
  align-items: center;
  background-color: var(--main-color);
  color: var(--text-color);
  display: flex;
  gap: 15px;
  margin: 10px 0;
  padding: 15px;
  :hover {
    cursor: pointer;
  }
`;

export const ButtonContainer = styled(ItemWrapper)`
  align-items: center;
  color: var(--main-color);
  display: flex;
  gap: 5px;
  padding: 10px;
  cursor: pointer;
`;
