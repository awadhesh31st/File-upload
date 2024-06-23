"use client";
import Image from "next/image";
import React, { ChangeEvent, FC, useCallback, useState } from "react";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
];
const maxSize = 6 * 1024 * 1024;

type UploadFileProps = {
  btnLabel: string;
  btnMessage?: string;
  buttonType: "basicBtn" | "btnwithMessage";
  iconPosition?: "left" | "right";
};

const UploadFile: FC<UploadFileProps> = ({
  btnLabel,
  btnMessage,
  buttonType,
  iconPosition,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (allowedTypes.includes(file.type) && file.size <= maxSize) {
          setSelectedFile(file);
          await handleFileUpload(file);
        } else {
          setSelectedFile(null);
          console.info(
            "Please select a valid file (PDF, DOC, DOCX, RTF) under 6MB."
          );
        }
      }
    },
    []
  );

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("your-api-endpoint", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Resume uploaded successfully!");
      } else {
        console.info("Failed to upload resume. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setUploading(false);
    }
  }, []);

  const renderIcon = (
    <span className="relative size-4">
      <Image src="/ai-magic.svg" alt="icon" fill />
    </span>
  );

  return (
    <>
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.doc,.docx,.rtf"
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={uploading}
      />
      <label
        htmlFor="file-upload"
        className="px-6 py-4 text-white flex gap-1 items-center justify-center bg-[#6E00BE] border-0 rounded-lg max-md:py-3 max-md:px-4 text-base max-md:text-sm font-bold max-md:font-semibold text-center cursor-pointer relative"
        aria-labelledby="upload-label"
        role="button"
        aria-label={`${selectedFile}`}
      >
        {buttonType !== "basicBtn" && (
          <>
            <span className="absolute bg-green-600 flex justify-center px-4 py-0.5 left-8 -top-2 text-[10px] items-center font-normal text-white rounded-b-lg h-5">
              {btnMessage}
            </span>
            <span className="absolute -top-2 size-2 left-6 rotate-180 border-r-8 border-r-[white] border-t-8 border-t-green-700 border-solid" />
          </>
        )}
        {iconPosition === "right" && renderIcon}
        <span>{btnLabel}</span>
        {iconPosition === "left" && renderIcon}
      </label>
    </>
  );
};

export default React.memo(UploadFile);
