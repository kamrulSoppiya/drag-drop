import classes from '../assets/item.module.css';

export default function Item({imgFormat, handleImageUploader , handleDragEnter, isDragging, selectedFile}) {
  return (
    <div className={`{drop-zone ${isDragging ? 'dragging' : ''}} ${classes.container}`} onDragEnter={handleDragEnter}>
        <label htmlFor="file-input" className="custom-file-label">
        <h6 className={classes.btnDrag}>Add images</h6>
        </label>
        <input type="file" accept={imgFormat} onChange={handleImageUploader} style={{ display: 'none' }} id="file-input"/>
        <p>or darg and drop</p>
    </div>
  )
}
