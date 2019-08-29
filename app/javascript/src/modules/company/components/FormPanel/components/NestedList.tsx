import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {
  SearchCompanies_searchCompanies_users,
} from '../../../../../graphql/queries/__generated__/SearchCompanies';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {}, 
    profilePhoto: {
      width: '30px', 
      height: '30px', 
      borderRadius: '50%',
      marginRight: '12px', 
    }, 
    companyLogo: {
      width: '24px', 
      height: '24px', 
      marginRight: '12px', 
    },
    nested: {
      paddingLeft: '42px', 
    }
  })
)

interface NestedListProps {
  data: SearchCompanies_searchCompanies_users;
  handleClick: (newValue: string) => void;
}

export default function NestedList(props: NestedListProps) {
  const {data, handleClick} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItem onClick={() => setOpen(!open)} disableGutters>
        {data.profileUrl && 
          <img 
            className={classes.profilePhoto} 
            src={data.profileUrl} 
            alt={data.fullName} 
          />
        }
        <ListItemText primary={data.fullName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.companies && data.companies.map(company => (
            <ListItem 
              key={company.id} 
              className={classes.nested}
              onClick={() => handleClick(company.name)}
              disableGutters
            >
              {company.logoUrl && 
                <img 
                  className={classes.companyLogo}
                  src={company.logoUrl} 
                  alt={company.name} 
                />
              }
              <ListItemText primary={company.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  )
}