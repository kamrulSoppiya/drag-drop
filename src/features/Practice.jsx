import React, { useState } from 'react';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imgFormat, setImgFormat] = useState('');
  const [imageData, setImageData] = useState('');
  const [isAddButtonDisabled, setAddButtonDisabled] = useState(true);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function () {
        setUploadedImage(reader.result);
        setAddButtonDisabled(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function () {
        setUploadedImage(reader.result);
        setAddButtonDisabled(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddButtonsClick = () => {
    // Call your ImageUpload function with imgFormat and imageData
    ImageUpload(imgFormat, imageData);
  };

  return (
    <div className="App" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div id="drop-area">
        {uploadedImage ? (
          <img src={uploadedImage} alt="Uploaded" />
        ) : (
          <p>Drag and drop an image here or click to select one.</p>
        )}
        <input
          type="file"
          id="file-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      </div>
      <div id="buttons">
        <button
          id="add-buttons"
          onClick={handleAddButtonsClick}
          disabled={isAddButtonDisabled}
        >
          Add Buttons
        </button>
      </div>
    </div>
  );
}

function ImageUpload(imgFormat, imageData) {
  // Implement your image upload logic here
  // You can use imgFormat and imageData to send the image to your server
  console.log('Uploading image with format:', imgFormat);
  console.log('Image data:', imageData);
}

export default App;
