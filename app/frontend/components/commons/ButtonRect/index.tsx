import styles from "./index.module.scss";
import classnames from "classnames";
import NextLink, { LinkProps } from "next/link";
import ConditionalWrapper from "~/components/commons/ConditionalWrapper";

type Color = "brown" | "dark-brown";
type ButtonRectProps = {
  text: string;
  onClick?: React.MouseEventHandler;
  color?: Color;
  outline?: boolean;
  disabled?: boolean;
  className?: string;
  outerClassName?: string;
  linkProps?: LinkProps;
};

/**
 * ### linkProps
 * NextLinkコンポーネントに渡される引数の塊。指定しない場合はNextLinkは使用されない。
 * ### className
 * コンポーネント内のbuttonタグに直接当てられるクラス。
 * ### outerClassName
 * コンポーネント内の一番外側に当てられるクラス。
 * 基本的にmarginなどの外側に影響するスタイルを当てる際に使うといい。
 * NextLinkが使用されない場合はclassNameで完結できる場合がほとんどだが副作用に注意してスタイルを当てること。
 */
const ButtonRect: React.FC<ButtonRectProps> = ({
  text,
  onClick,
  color = "brown",
  outline = false,
  disabled = false,
  className = "",
  outerClassName = "",
  linkProps,
}: ButtonRectProps) => {
  const customStyles = classnames(
    styles[color],
    {
      [styles.outline]: outline,
      [styles.disabled]: disabled,
    },
    className
  );
  return (
    <div className={outerClassName}>
      <ConditionalWrapper
        condition={linkProps !== undefined}
        wrapper={(children) => (
          <NextLink
            href={linkProps?.href ? linkProps.href : {}}
            {...linkProps}
            prefetch={false}
          >
            {children}
          </NextLink>
        )}
      >
        <button
          className={classnames(styles.btn, customStyles)}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </ConditionalWrapper>
    </div>
  );
};

export default ButtonRect;
