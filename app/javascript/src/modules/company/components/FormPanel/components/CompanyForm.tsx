import React, {useState} from'react'
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Button from '@material-ui/core/Button'

import {
  CompanySettings_company_parents, 
  CompanySettings_company_brokers
} from '../../../../../graphql/queries/__generated__/CompanySettings'
import StyledItem from './StyledItem'
import AutoSuggest from './AutoSuggest'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative', 
      marginTop: '24px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '12px', 
      textTransform: 'capitalize'      
    },
    companyList: {
      display: 'flex',
      height: '36px', 
      alignItems: 'center', 
      borderBottom: '1px solid #D8D8D8', 
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '15px', 
      textTransform: 'capitalize',
    },
    clickableArea: {
      flexGrow: 1,
      height: '25px'
    },
    addPaper: {
      width: '100%', 
      background: '#FFFFFF', 
      position: 'absolute', 
      top: '30px',
      right: '0px', 
      padding: '12px', 
      boxSizing: 'border-box', 
      border: '2px solid #D8D8D8',
      borderRadius: '3px',
    },
    addLink: {
      marginTop: '24px',
      color: '#3A84FF',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      textTransform: 'capitalize'
    },
  })
)

interface CompanyFormProps {
  label: string;
  placeholder: string;
  companies: CompanySettings_company_parents[] | CompanySettings_company_brokers[] | null;
  onUpdate: (newValue: string) => void;
}

export default function CompanyForm(props: CompanyFormProps) {
  const {label, placeholder, companies, onUpdate} = props
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(false)
  const [parent, setParent] = useState<string>("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onUpdate(parent)
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      <p>{label}</p>
      <div className={classes.companyList}>
        { companies && companies.map(company => (
            <StyledItem key={company.id} label={company.name} />
          ))
        }
        <div 
          className={classes.clickableArea}
          onClick={() => setOpen(true)}
          style={{position: 'relative'}}
        >
          { (!companies || !companies.length) ?
            placeholder : null
          }
        </div>
      </div>

      { open && 
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <form 
            className={classes.addPaper}
            onSubmit={handleSubmit}
          >
            <AutoSuggest
              value={parent}
              handleChange={(newParent: string) => setParent(newParent)}
            />
            <Button 
              type="submit"
              className={classes.addLink} 
            >
              Invite new company
            </Button>
          </form>
        </ClickAwayListener>
      }
    </div>
  )
}