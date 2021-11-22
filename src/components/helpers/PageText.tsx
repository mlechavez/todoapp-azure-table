import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  tagElement?: "p" | "span";
  onClick?: () => void;
  [props: string]: any;
};
const PageText = ({
  className,
  children,
  tagElement,
  onClick,
  props,
}: Props) => {
  if (!tagElement || tagElement === "p")
    return (
      <p className={className} onClick={onClick} {...props}>
        {children}
      </p>
    );
  return (
    <span className={className} onClick={onClick} {...props}>
      {children}
    </span>
  );
};

export default PageText;
