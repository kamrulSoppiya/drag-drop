import { useEffect, useState } from "react";
import classes from '../assets/item.module.css';
const ImageUploader = ({ onImageUpload,imgFormat }) => {
    // const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
  
    // Drag And Drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];

        if (file) {
            setSelectedFile(file)
            console.log('file:', file);
        }
    };

    useEffect(() => {
        const preventDefault = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        window.addEventListener('dragenter', preventDefault);
        window.addEventListener('dragover', preventDefault);
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('drop', handleDrop);

        return () => {
        window.removeEventListener('dragenter', preventDefault);
        window.removeEventListener('dragover', preventDefault);
        window.removeEventListener('dragleave', handleDragLeave);
        window.removeEventListener('drop', handleDrop);
        };
    }, []);


//   Image Uploader
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      //  console.log(file);
      if (file && isSupportedImageFormat(file,imgFormat)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
        //   console.log(base64Image)
          setSelectedFile(base64Image);
          onImageUpload(base64Image);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a supported image format (PNG, JPG, or JPEG).');
      }
    };
  
    const isSupportedImageFormat = (file,imgFormat) => {
      const conCatData = imgFormat.map(element => 'image/' + element);
      return conCatData.includes(file.type)
    };
  
    return (
      <div className={`{drop-zone ${isDragging ? 'dragging' : ''}} ${classes.container}`} onDragEnter={handleDragEnter}>
         <label htmlFor="file-input" className="custom-file-label">
            {selectedFile ? selectedFile.name :<h6 className={classes.btnDrag}>Add images</h6>}
            </label>
            <input type="file" accept={imgFormat} onChange={handleImageUpload} style={{ display: 'none' }} id="file-input"/>
            <p>or darg and drop</p>
            {selectedFile && (<div className="image-preview" style={{width:"300px"}}>
                <img src={selectedFile} alt="Uploaded" style={{width:"313px"}} />
                </div>
            )}      
      </div>
    );
  };

  export default ImageUploader;
