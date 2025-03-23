import clsx from "clsx";
import type { FC } from "react";

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className }) => {
  return (
    <div className={clsx("w-[var(--my-border)] bg-black", className)}></div>
  );
};

export default Divider;
