import styles from "./index.module.scss";
import classnames from "classnames";
import ConditionalWrapper from "~/components/commons/ConditionalWrapper";
import React from "react";

type ItemProps = {
  text: React.ReactNode;
  underline?: "solid" | "dashed" | "none";
  fontSize?: "sm" | "md";
  arrow?: boolean;
  type?: "button" | "normal";
  bgColor?: "white" | "transparent";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

// eslint-disable-next-line react/display-name
const Item = React.forwardRef(
  (
    {
      text,
      onClick,
      underline = "none",
      fontSize = "md",
      arrow = true,
      type = "button",
      bgColor = "white",
    }: ItemProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const titleClasses = classnames(
      [styles.title],
      [styles[`bg-${bgColor}`]],
      [styles[`underline-${underline}`]],
      [styles[`font-size-${fontSize}`]]
    );

    const wrappers = {
      // eslint-disable-next-line react/display-name
      normal: (children: React.ReactNode) => {
        return <div className={titleClasses}>{children}</div>;
      },
      // eslint-disable-next-line react/display-name
      button: (children: React.ReactNode) => {
        return (
          <button ref={ref} className={titleClasses} onClick={onClick}>
            {children}
          </button>
        );
      },
    };
    return (
      <ConditionalWrapper wrapper={wrappers[type]}>
        <div>{text}</div>
        <div
          className={classnames(styles.arrow, arrow ? "visible" : "invisible")}
        >
          <span></span>
        </div>
      </ConditionalWrapper>
    );
  }
);

export default Item;
