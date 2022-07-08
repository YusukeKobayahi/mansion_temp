type ConditionalWrapperProps = {
  condition?: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
};

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition = true,
  wrapper,
  children,
}: ConditionalWrapperProps) => {
  return <>{condition ? wrapper(children) : children}</>;
};

export default ConditionalWrapper;
