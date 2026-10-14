import React, { useState, useRef } from 'react';
import Regular from '../Typography/Regular';
import { DashboardIcons } from '../../contants';

const MultiFileUpload = ({
  SetFiles = null,
  limitText = "Image files e.g. JPG, PNG , AWF and PDF or CSV",
  pdfOnly = false,
}) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files); // Convert FileList to Array
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    if (SetFiles) {
      SetFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  };

  const handleDropInput = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    if (SetFiles) {
      SetFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleButtonClick}
      className="flex items-center justify-center duration-300 border-2 border-dashed rounded-md cursor-pointer hover:border-slate-300 hover:bg-slate-100 hover:transition"
    >
      <div className="flex flex-col items-center justify-center gap-3 py-3">
        <img
          src={DashboardIcons.DRAGDROP}
          alt="icon"
          width={70}
          height={70}
        />
        <Regular props={"text-[10px] text-center"}>
          Drag & Drop your files here or choose files
        </Regular>
        <input
          ref={fileInputRef}
          type="file"
          multiple // Enable multi-file upload
          accept={pdfOnly ? ".pdf, .awf" : undefined} // Handle file types conditionally
          onChange={handleDropInput}
          style={{ display: 'none' }}
        />
        {/* <Regular props={"text-[10px] text-gray-400 text-center"}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <span
                key={index}
                className="block text-blue-500 underline text-[#0098F9]"
              >
                File: {file.name}
              </span>
            ))
          ) : (
            limitText
          )}
        </Regular> */}
      </div>
    </div>
  );
};

export default MultiFileUpload;