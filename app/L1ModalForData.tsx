import React, { FC } from "react";

type L1ModalForDataProps = {
    smallScrrenWidth?: string;
}

const L1ModalForData: FC<L1ModalForDataProps> = ({ smallScrrenWidth = 'max-md:w-full' }) => {
  return (
    <>
      <div className={`px-6 py-4 text-[#6E00BE] bg-white border border-[#6E00BE] rounded-lg max-md:py-3 max-md:px-4 text-base max-md:text-sm font-bold max-md:font-semibold text-center cursor-pointer ${smallScrrenWidth}`}>
        Add Manually
      </div>
    </>
  );
};

export default L1ModalForData;
