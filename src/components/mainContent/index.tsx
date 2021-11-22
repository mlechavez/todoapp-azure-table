import React from "react";

import { Container } from "./styles";

type Props = {
  children: React.ReactNode;
};
const MainContent = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default MainContent;
