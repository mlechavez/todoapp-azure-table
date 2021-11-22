import React from "react";

type Props = {
  alignItems?: string;
  backgroundColor: string;
  children: React.ReactNode;
  className?: string;
  color?: string;
  display?: string;
  alignContent: string;
  flexDirection?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexBasis?: string;
  fontWeight?: string | number;
  gap?: string;
  justifyContent?: string;
  margin?: string;
  maxWidth?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft: string;
  paddingRight: string;
  [props: string]: any;
  onClick: () => void;
};
const ItemWrapper = ({ children, className, onClick, props }: Props) => {
  return (
    <div className={className} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default ItemWrapper;
