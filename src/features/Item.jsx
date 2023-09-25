// // import Button from './Button'
// import classes from '../assets/item.module.css';
// import { useEffect, useState } from 'react';
// export default function Item() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // Drag And Drop
//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const file = e.dataTransfer.files[0];

//     if (file) {
//       setSelectedFile(file.name)
//       console.log('file:', file);
//     }
//   };

//   useEffect(() => {
//     const preventDefault = (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//     };

//     window.addEventListener('dragenter', preventDefault);
//     window.addEventListener('dragover', preventDefault);
//     window.addEventListener('dragleave', handleDragLeave);
//     window.addEventListener('drop', handleDrop);

//     return () => {
//       window.removeEventListener('dragenter', preventDefault);
//       window.removeEventListener('dragover', preventDefault);
//       window.removeEventListener('dragleave', handleDragLeave);
//       window.removeEventListener('drop', handleDrop);
//     };
//   }, []);


//   const handleFileSelect = (e)=>{
//     const file = e.target.files[0];
//     setSelectedFile(file);
//   }

//   return (
//     <>
        
//     </>
//   )
// }

// {/* {selectedFile && (<div className="image-preview" style={{width:"300px"}}>
//           <img src={selectedFile} alt="Uploaded" style={{width:"313px"}} />
//       </div>
//   )}   */}
