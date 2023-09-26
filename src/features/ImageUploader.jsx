import { useEffect, useState } from "react";
import classes from '../assets/fileUp.module.css';

const ImageUploader = ({ onImageUpload, imgFormat }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState({
    status: false, msg: ''
  });
  
  // Drag And Drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const innerHandeler = (e, file) => {
    if (file && isSupportedImageFormat(file, imgFormat)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setError({ status: false });
        const base64Image = e.target.result;
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


  const handleDrop = (e) => {
    setIsDragging(false);
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    innerHandeler(e, file);
  };

  //   Image Uploader
  const handleImageUploader = (e) => {
    const file = e.target.files[0];
    innerHandeler(e, file);
  };

  const isSupportedImageFormat = (file, imgFormat) => {
    const conCatData = imgFormat.map(element => 'image/' + element);
    return conCatData.includes(file.type)
  };
  
  // Item
  function Item() {
    return (
      <div className={`{drop-zone ${isDragging ? 'dragging' : ''}} ${classes.containerItem}`} onDragEnter={handleDragEnter}>
          <label htmlFor="file-input" className="custom-file-label">
          <h6 className={classes.btnDrag}>Add images</h6>
          </label>
          <input type="file" accept={imgFormat} onChange={handleImageUploader} style={{ display: 'none' }} id="file-input"/>
          <p>or darg and drop</p>
      </div>
    )
  } 

  // Unvalid Item
  function UnValidItem(){
    useEffect(()=>{
      setTimeout(()=>{
        setError({status:false})
      },4000)
    },[])
    return (
      <div className={classes.containerUnvalid}>
          <div className={classes.content}>
              <p>{error.msg}</p>
          </div>
      </div>
    )
  }


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

  return (
    <>
      {!error.status ? <Item /> : <UnValidItem />}
      {selectedFile && (
        <div className="image-preview" style={{ width: "200px" }}>
          <img src={selectedFile} alt="Uploaded" style={{ width: "200px" }} />
        </div>
      )}
    </>
  );
};

export default ImageUploader;
