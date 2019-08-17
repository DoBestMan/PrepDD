import React, {useState} from'react'
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles'

import StyledItem from './StyledItem'

const G2Logo = require('images/dummy/logos/g2-logo.svg')
const PrepDDLogo = require('images/logos/prepdd-logo.svg')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '24px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontSize: '12px', 
      textTransform: 'capitalize'      
    },
    companyList: {
      display: 'flex',
      height: '36px', 
      borderBottom: '1px solid #D8D8D8', 
    }
  })
)

const parents = [
  { label: "G2 Crowd", url: G2Logo },
  { label: "PrepDD", url: PrepDDLogo }
]

interface CompanyFormProps {
  label: string;
  placeholder: string;
}

export default function CompanyForm(props: CompanyFormProps) {
  const {label, placeholder} = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p>{label}</p>
      <div className={classes.companyList}>
        { parents.map(item => 
          <StyledItem key={item.label} label={item.label} logo={item.url} />
        )}
      </div>
    </div>
  )
}