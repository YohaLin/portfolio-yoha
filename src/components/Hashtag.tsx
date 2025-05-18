import clsx from "clsx";
import React, { type FC } from "react";

type Prop_Hashtag = {
  tag: string;
  className?: string;
};

const Hashtag: FC<Prop_Hashtag> = ({ tag, className }) => {
  return (
    <span
      className={clsx(
        "inline-block px-2 py-0.5 bg-gray-200 text-gray-800 rounded text-xs font-tenro cursor-default",
        className
      )}
    >
      {tag}
    </span>
  );
};

export default Hashtag;
