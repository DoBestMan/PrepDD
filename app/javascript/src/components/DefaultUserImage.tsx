import React from 'react'
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
      width: '30px', 
      height: '30px', 
      position: 'relative',
      borderRadius: '50%', 
      background: '#AFAFAF', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    label: {
      color: '#FFFFFF', 
      fontFamily: 'Montserrat', 
      fontSize: '12px', 
      fontWeight: 'bold'
    }
  })
)

interface DefaultUserImageProps {
  width?: number;
  height?: number;
  userName: string;
}

export default function DefaultUserImage(props: DefaultUserImageProps) {
  const { width, height, userName } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p className={classes.label}>
        {userName.split(' ').slice(0, 2).map(name=>name[0]).join('')}
      </p>
    </div>
  )
}