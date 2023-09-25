import classes from '../assets/fileUp.module.css';
import Item from './Item';
import UnValidItem from './UnValidItem';
export default function FileUploader() {
  return (
    <div className={classes.row}>
      <div className={classes.container}>
          <Item />
          <p style={{marginTop:'20px'}}></p>
          <UnValidItem />
      </div>
    </div>
  )
}
