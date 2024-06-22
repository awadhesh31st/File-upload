"use client";
import React, {
  ChangeEvent,
  FC,
  ReactNode,
  useCallback,
  useState,
} from "react";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
];
const maxSize = 6 * 1024 * 1024;

type UploadFileProps = {
  buttonType: "basicBtn" | "btnwithMessage";
  iconPosition?: "left" | "right";
  icon?: ReactNode;
};

const UploadFile: FC<UploadFileProps> = ({
  buttonType,
  iconPosition,
  icon,
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
        className="px-6 py-4 text-white bg-[#6E00BE] border-0 rounded-lg max-md:py-3 max-md:px-4 text-base max-md:text-sm font-bold max-md:font-semibold text-center cursor-pointer relative"
        aria-labelledby="upload-label"
        role="button"
        aria-label={`${selectedFile}`}
      >
        {buttonType !== "basicBtn" && (
          <>
            <span className="absolute bg-green-600 flex justify-center px-4 py-0.5 left-8 -top-2 text-[10px] items-center font-normal text-white rounded-b-lg h-5">
              Save 60% of time!
            </span>
            <span className="absolute -top-2 size-2 left-6 rotate-180 border-r-8 border-r-[white] border-t-8 border-t-green-700 border-solid" />
          </>
        )}
        {iconPosition === "right" && <></>}
        <span>Upload Resume</span>
        {iconPosition === "left" && <></>}
      </label>
    </>
  );
};

export default React.memo(UploadFile);
