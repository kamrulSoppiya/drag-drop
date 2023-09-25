import ImageUploader from "./features/ImageUploader";
import classes from './assets/fileUp.module.css';
import UnValidItem from './features/UnValidItem';

function App() {
  const handleImageUpload = (base64Img) => {
    console.log('Base64:', base64Img);
  };

  const imgFormat = ["jpg", "jpeg", "png"];
  return (
      <div className={classes.row}>
        <div className={classes.container}>
            <ImageUploader onImageUpload={handleImageUpload} imgFormat={imgFormat} />
            <p style={{marginTop:'20px'}}></p>
            <UnValidItem />
        </div>
      </div>
  );
}

export default App

