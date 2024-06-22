"use client";

import React, { memo, useEffect, useRef } from "react";

export type ProgressBarProps = {
  percent: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform =
        "rotate(" + (45 + percent * 1.8) + "deg)";
    }
  }, [percent]);

  return (
    <div className="relative float-left text-center">
      <div className="relative overflow-hidden w-16 h-8">
        <div
          className="absolute w-16 h-16 box-border rounded-[50%] border-r-[#E03923] border-b-[#E03923] border-4 border-solid border-[#e039231a] left-0 top-0"
          ref={barRef}
        ></div>
      </div>
      <span className="text-[#E03923] text-base font-bold absolute left-0 right-0 -bottom-1.5">
        <strong>{percent}</strong>%
      </span>
    </div>
  );
};

export default memo(ProgressBar);
