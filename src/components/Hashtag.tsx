import clsx from "clsx";
import { type FC } from "react";

type Prop_Hashtag = {
  tag: string;
  className?: string;
};

const Hashtag: FC<Prop_Hashtag> = ({ tag, className }) => {
  return (
    <span
      className={clsx(
        "inline-block px-1 py-1 md:px-2 md:py-1.5 rounded-[5px] text-xs font-tenor cursor-default whitespace-nowrap",
        className
      )}
    >
      {tag}
    </span>
  );
};

export default Hashtag;
