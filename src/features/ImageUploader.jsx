import { useCallback, useEffect, useState } from "react";
import Item from "./Item";
import UnValidItem from "./UnValidItem";

const ImageUploader = ({ onImageUpload,imgFormat }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState({
      status:false, msg:''
    });
  
    // Drag And Drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const innerHandeler = useCallback((e)=>{
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && isSupportedImageFormat(file,imgFormat)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setError({status:false});
          const base64Image = e.target.result;
          setSelectedFile(base64Image);
          onImageUpload(file, base64Image);
        };
        reader.readAsDataURL(file);
      } else {
        setError(
          {
            status:true,
            msg:`Invalid image format. Please upload an image.`   
          });
      }
    },[imgFormat, onImageUpload])

    const handleDrop = useCallback((e) => {
        setIsDragging(false);
        innerHandeler(e);
    },[innerHandeler]);

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
    }, [handleDrop]);

//   Image Uploader
    const handleImageUploader = (e) => {
      const file = e.target.files[0];
      if (file && isSupportedImageFormat(file,imgFormat)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          setSelectedFile(base64Image);
          onImageUpload(file,base64Image);
        };
        reader.readAsDataURL(file);
      } else {
        setError(
          {
            status:true,
            msg:`Invalid image format. Please upload an image.`   
          });
      }
      
    };

    const isSupportedImageFormat = (file,imgFormat) => {
      const conCatData = imgFormat.map(element => 'image/' + element);
      return conCatData.includes(file.type)
    };
    
    return (
      <>
      {!error.status ? <Item imgFormat={imgFormat} handleImageUploader={handleImageUploader} selectedFile={selectedFile} handleDragEnter={handleDragEnter} isDragging={isDragging}/> : <UnValidItem msg={error.msg} setError={setError}/>}
        {selectedFile && (
          <div className="image-preview" style={{width:"200px"}}>
            <img src={selectedFile} alt="Uploaded" style={{width:"200px"}} />
          </div>
        )}      
      </>
    );
  };

  export default ImageUploader;
