import clsx from "clsx";
import type { FC, ReactNode } from "react";

type Props_BlockLayout = {
  className?: string;
  children: ReactNode;
};

const BlockLayout: FC<Props_BlockLayout> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "p-1 lg:p-5 border-(length:--my-border) -m-(--my-border)",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlockLayout;
