

'use client';
import { useState } from 'react';
import Link from 'next/link';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;


  //this function is for when we click on any list item to preview
  const handleFileClick = (index) => {
    setSelectedFileIndex(index);
    // You can perform actions when a file is clicked, such as opening a preview
  };


  //chang
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    addFiles(selectedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //this is when selected button or drag happens
  const addFiles = (newFiles) => {
    const updatedFiles = [];
    for (let i = 0; i < newFiles.length; i++) {
      updatedFiles.push({
        name: newFiles[i].name,
        file: newFiles[i],
        size: (newFiles[i].size / 1024 / 1024).toFixed(2)
      });
    }
    setFiles([...files, ...updatedFiles]);
  };


  //this function is used when we are clicking the upload button
  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select a file');
      return;
    }

    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      try {
        uploadedFiles.push({
          name: files[i].file.name,
          timestamp: new Date().toLocaleString(),
          size: (files[i].file.size / (1024 * 1024)).toFixed(2)
        });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }

    // Update allFiles state only after uploading
    setAllFiles([...allFiles, ...uploadedFiles]);

    // Optional: Clear the files after processing
    setFiles([]);
  };

  // Pagination
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = allFiles.slice(indexOfFirstFile, indexOfLastFile);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedFileIndex(null);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedFileIndex(null);
  };


  //when from a selected  file which is not uploaded an item is removed..
  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  return (

    <div className="file-upload-container">
      <div className="drop-zone-container">
        <div className="drop-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
          <p>Drag and drop files here, or click to select files</p>
          <input type="file" onChange={handleFileChange} multiple style={{ display: 'none' }} />
          <button className="upload-button" onClick={() => document.querySelector('input[type=file]').click()}>
            Select Files
          </button>
          <div className="file-details-container" style={{ display: files.length ? 'block' : 'none' }}>
            <div className="file-list">
              {files.map((file, index) => (
                <div className="file-item-custom" key={index}>
                  <div>
                    {file.name} - {file.size} MB
                    <span className="remove-button" onClick={() => removeFile(index)}>X</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleUpload} className="custom-upload-button">
        Upload
      </button>

      <div className="file-details-container" >
        <div className="file-list">
          {currentFiles.map((file, index) => (
            <div
              key={index}
              className={`file-item ${selectedFileIndex === index ? 'selected' : ''}`}
              onClick={() => handleFileClick(index)}
            >
              <div className="file-details">
                <div>
                  <strong>Name:</strong> {file.name}
                </div>
                <div>
                  <strong>Timestamp:</strong> {file.timestamp}
                </div>
                <div>
                  <strong>Size:</strong> {file.size} MB
                </div>

              </div>
            </div>
          ))}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">
              Previous
            </button>
            <button onClick={nextPage} disabled={currentFiles.length < filesPerPage} className="pagination-button">
              Next
            </button>
          </div>
        </div>



        {selectedFileIndex !== null && (
          <div className="file-preview-container">
            <h3>File Preview</h3>
            <div className="preview-content">
              {currentFiles[selectedFileIndex].name.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src='/1.pdf'
                  title="PDF Viewer"
                  width="100%"
                  height="600"
                />
              ) : (
                <div className="image-container">
                  <img src='/0.png' alt="File Preview" />
                </div>
              )}
            </div>
            <div className="file-preview-details">
              <div>
                <strong>Name:</strong> {currentFiles[selectedFileIndex].name}
              </div>
              <div>
                <strong>Timestamp:</strong> {currentFiles[selectedFileIndex].timestamp}
              </div>
              <div>
                <strong>Size:</strong> {currentFiles[selectedFileIndex].size} MB
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
