import React, { useState, useRef } from 'react';
import Regular from '../Typography/Regular';
import { DashboardIcons, EstimaticsImg } from '../../contants'

const DragAndDropEstimatics = ({ SetFiles = null, limitText = "Image files e.g. JPG, PNG and PDF or CSV", pdfOnly = false, isImage = false, isCSV = false }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

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

    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    SetFiles(droppedFile);

    // You can perform actions with the dropped file here.

  };

  const handleDropInput = (e) => {
    e.preventDefault();
    setDragging(false);


    const droppedFile = e.target.files[0];

    setFile(droppedFile);
    SetFiles(droppedFile);

  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const styleToApply = {
    border: '2px dashed #cccccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer'
  }

  return (

    // <div
    //   className={`drag-and-drop ${dragging ? 'active' : ''}`}
    //   onDragEnter={handleDragEnter}
    //   onDragLeave={handleDragLeave}
    //   onDragOver={handleDragOver}
    //   onDrop={handleDrop}
    //   style={styleToApply}
    //   >
    //   <p>Drag and drop a file here</p>
    //   {file && <p>File: {file.name}</p>}
    // </div>

    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => handleButtonClick()}
      className='border-dashed border-2 flex justify-center items-center rounded-md cursor-pointer hover:border-slate-300 hover:bg-slate-100 hover:transition duration-300'>

      <div className='py-3 flex justify-center items-center flex-col gap-3'>
        <img src={DashboardIcons.DRAGDROP} alt='icon' width={70} height={70} />

        <Regular props={"text-[10px] text-center"}>
          Drag & Drop your files here or choose file
        </Regular>


        {/* pdfOnly = false, isImage = false, isCSV = false */}

        <input ref={fileInputRef} type="file" accept={`${pdfOnly ? '.pdf , .awf ' : null},${isImage ? '.jpg , .png' : null},${isImage ? '.csv' : null}`} required onChange={handleDropInput} style={{ display: 'none' }} />
        {/* 
        {
          pdfOnly ?
            <input ref={fileInputRef} type="file" accept={`.pdf, .awf ,.png, .jpg`} required onChange={handleDropInput} style={{ display: 'none' }} /> :
            <input ref={fileInputRef} type="file" onChange={handleDropInput} style={{ display: 'none' }} />
        } */}



        <Regular props={"text-[10px] text-gray-400 text-center"}>
          {file ? <span className='text-blue-500 underline text-[#0098F9]'>File: {file.name}</span> : limitText}
        </Regular>

      </div>

    </div>

  );
};

export default DragAndDropEstimatics;