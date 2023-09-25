import classes from '../assets/unValid.module.css';

export default function UnValidItem() {
  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <p>File type is not valid</p>
        </div>
    </div>
  )
}
