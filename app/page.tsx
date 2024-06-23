import Image from "next/image";
import React from "react";
import ProgressBar from "./progress";
import UploadFile from "./UploadFile";
import L1ModalForData from "./L1ModalForData";

const content =
  "Sorry, PrepAI needs a few more details to unlock your <span class='textShade'>personalised Q&As</span>";

const HomePage = () => {
  const l1withResumeUpload = (
    <div className="flex flex-col gap-6 max-md:gap-4 max-md:items-center">
      <div className="flex justify-start max-md:justify-center items-start max-md:items-center flex-col max-md:text-center">
        <div className="flex gap-2 max-md:gap-1 items-center justify-center">
          <h4 className="text-2xl font-bold max-md:text-sm text-[#17142A]">
            Complete your profile to unlock
          </h4>
          <span className="relative size-8 max-md:size-6">
            <Image src="/Lock-password.svg" alt="lock" fill />
          </span>
        </div>
        <p className="text-[#777584] text-sm font-normal max-md:text-xs">
          PrepAI needs to know you better in order to curate the perfect
          questions for your profile. Just upload your resume and we will do the
          rest!
        </p>
      </div>
      <div className="flex max-md:flex-col gap-6 max-md:gap-4 items-baseline max-md:items-center max-md:w-max mt-2">
        <div className="flex flex-col gap-3 max-md:gap-1">
          <UploadFile
            btnLabel="Upload Resume"
            btnMessage="Save 60% of time!"
            buttonType="btnwithMessage"
          />
          <span className="text-[#59566C] text-xs font-normal">
            *Doc, Docx, RTF, PDF (Max file size - 6MB)
          </span>
        </div>
        <L1ModalForData />
      </div>
    </div>
  );

  const l1Modal = <div id="profileInspectionApopThemeDefault" className="invisible"></div>;

  const l1Only = (
    <>
      {l1Modal}
      <div className="flex flex-col gap-4 max-md:gap-3 max-md:items-center">
        <div className="flex justify-start max-md:justify-center items-start max-md:items-center flex-col max-md:text-center">
          <div className="flex gap-2 max-md:gap-1 items-center justify-center">
            <h4
              className="text-2xl font-bold max-md:text-sm text-[#17142A]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
        <div className="flex max-md:flex-col gap-6 max-md:gap-4 items-baseline max-md:items-center max-md:w-max">
          <L1ModalForData smallScrrenWidth="max-md:w-[232px]" />
        </div>
      </div>
    </>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="flex bg-[#FAFAFB] p-6 rounded-xl max-md:p-4 max-md:m-4 max-md:flex-col gap-9 max-md:gap-4 max-md:items-center max-w-3xl max-md:w-full">
        <div className="flex py-2 px-4 gap-0.5 border rounded-t-lg border-b-0  borderProfileGradient h-full flex-col justify-center items-center w-[120px] text-center">
          <ProgressBar percent={30} />
          <span className="text-[10px] font-normal text-[#E03923] mt-2">
            Critical!
          </span>
          <span className="text-[#17142A] text-[10px] font-semibold w-[88px]">
            Profile Score
          </span>
        </div>
        {l1withResumeUpload}
      </div>
    </div>
  );
};

export default HomePage;
