import { useEffect } from 'react';
import classes from '../assets/unValid.module.css';

export default function UnValidItem({msg, setError}){
  useEffect(()=>{
    setTimeout(()=>{
      setError({status:false})
    },4000)
  },[setError])
  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <p>{msg}</p>
        </div>
    </div>
  )
}
