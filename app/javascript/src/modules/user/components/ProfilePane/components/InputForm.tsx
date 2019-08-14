import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      marginBottom: '6px'
    },
    label: {
      marginBottom: '3px', 
      color: '#606060', 
      fontFamily: 'Montserrat', 
      fontWeight: 600, 
      fontSize: '12px'
    },
    input: {
      height: '42px', 
      paddingLeft: '12px',
      color: '#2C2C2C',
      fontFamily: 'Montserrat', 
      fontSize: '15px', 
      fontWeight: 600, 
      border: '1px solid #D8D8D8', 
      borderRadius: '3px',
      '&::placeholder': {
        color: '#red',
      }, 
      '&:hover': {
        border: '1px solid #3A84FF'
      },
      '&:focus': {
        border: '1px solid #3A84FF',
        outlineColor: '#3A84FF'
      }
    },
  })
)

interface InputFormProps {
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  style?: any; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm(props: InputFormProps) {
  const { name, label, value, type, placeholder, onChange, onBlur, style, ...other } = props
  const classes = useStyles()

  return (
    <div className={classes.root} style={style}>
      <label className={classes.label}>{label}</label>
      <input 
        className={classes.input}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        {...other}
      />
    </div>
  )
}