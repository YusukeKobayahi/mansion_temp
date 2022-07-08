import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
import { event } from "~/lib/gtag";
import styles from "./index.module.scss";
import classnames from "classnames";
import { GoogleAnalyticsEvent } from "~/lib/types";
import ConditionalWrapper from "~/components/commons/ConditionalWrapper";

export type LinkProps = {
  linkProps?: NextLinkProps;
  text: string;
  subText?: string;
  eventParams?: GoogleAnalyticsEvent;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Link: React.FC<LinkProps> = ({
  linkProps,
  text,
  subText,
  eventParams,
  onClick,
  className,
}: LinkProps) => {
  return (
    <ConditionalWrapper
      condition={linkProps !== undefined}
      wrapper={(children) => (
        <NextLink
          href={linkProps ? linkProps.href : {}}
          prefetch={linkProps?.prefetch ? linkProps?.prefetch : false}
          {...linkProps}
        >
          {children}
        </NextLink>
      )}
    >
      <button
        className={classnames(styles.link, className)}
        onClick={(e) => {
          if (eventParams) event(eventParams);
          if (onClick) onClick(e);
        }}
      >
        {text}
        {subText && <span className={styles.subText}>{subText}</span>}
      </button>
    </ConditionalWrapper>
  );
};

export default Link;
