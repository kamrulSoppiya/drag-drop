import { useEffect, useState } from "react";
import classes from '../assets/fileUp.module.scss';

// eslint-disable-next-line react/prop-types
const ImageUploader = ({ onImageUpload, imgFormat }) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState({
    status: false, msg: ''
  });

  // Drag And Drop
  const handleDragEnter = (event) => {
    event.preventDefault()
    setIsDragging(true);
  };

  // Function for base64 and Data onLoad   
  const dataOnLoad = (file) => {
    if (file && isSupportedImageFormat(file, imgFormat)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setSelectedFile(base64Image);
        onImageUpload(file, base64Image);
      };
      reader.readAsDataURL(file);
    } else {
      setError(
        {
          status: true,
          msg: `Invalid image format. Please upload an Valid image.`
        });
    }
  }

  const handleDrop = (event) => {
    setIsDragging(false);
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    dataOnLoad(file);
  };

  //  Image Uploader
  const handleImageUploader = (event) => {
    const file = event.target.files[0];
    dataOnLoad(file);
  };

  const isSupportedImageFormat = (file, imgFormat) => {
    // eslint-disable-next-line react/prop-types
    const conCatData = imgFormat.map(element => 'image/' + element);
    return conCatData.includes(file.type)
  };

  useEffect(() => {
    if (!error.status) return;
    const timer = setTimeout(() => {
      setError({ status: false })
    }, 4000)

    return () => clearTimeout(timer)

  }, [error.status])

  return (
    <div className={classes.row}>
      <div className={classes.container}>
        {error.status && <div className={classes.containerUnvalid}>
          <div className={classes.content}>
            <p>{error.msg}</p>
          </div>
        </div>}

        {!error.status && <div className={`{drop-zone ${isDragging ? 'dragging' : ''}} ${classes.containerItem}`} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragOver={event => event.preventDefault()}>
          <label htmlFor="file-input" className="custom-file-label">
            <h6 className={classes.btnDrag}>Add images</h6>
          </label>
          <input type="file" accept={imgFormat} onChange={handleImageUploader} style={{ display: 'none' }} id="file-input" />
          <p>or darg and drop</p>
        </div>}

        {selectedFile && (
          <div className="image-preview" style={{ width: "200px" }}>
            <img src={selectedFile} alt="Uploaded" style={{ width: "200px" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
