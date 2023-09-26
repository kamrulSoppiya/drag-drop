import ImageUploader from "./features/ImageUploader";
function App() {
  const handleImageUpload = ( file, base64Img) => {
    console.log('Uploaded File:', file);
    console.log('Base64:', base64Img);
  };

  const imgFormat = ["jpg", "jpeg", "png", ];
  
  return (
      <ImageUploader onImageUpload={handleImageUpload} imgFormat={imgFormat} />
  );
}

export default App

