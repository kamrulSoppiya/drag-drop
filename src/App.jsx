import classes from './assets/fileUp.module.css';
import ImageUploader from "./features/ImageUploader";
function App() {
  const handleImageUpload = ( file, base64Img) => {
    console.log('Uploaded File:', file);
    console.log('Base64:', base64Img);
  };

  const imgFormat = ["jpg", "jpeg", "png", ];
  
  return (
      <div className={classes.row}>
        <div className={classes.container}>
            <ImageUploader onImageUpload={handleImageUpload} imgFormat={imgFormat} />
        </div>
      </div>
  );
}

export default App

