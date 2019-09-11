import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Toolbar,
  Typography, 
  IconButton,
} from '@material-ui/core';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AttachFile from '@material-ui/icons/AttachFile';
import GetApp from '@material-ui/icons/GetApp';
import Delete from '@material-ui/icons/DeleteForever';
import More from '@material-ui/icons/MoreHoriz';

import Dropdown from './components/Dropdown';

import {OptionType} from '../../../../../constants/types';
import {UserLists_userLists_lists} from '../../../../../graphql/queries/__generated__/UserLists';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      padding: '12px 24px', 
      borderBottom: '1px solid #D8D8D8',
    },
    grow: {
      flexGrow: 1, 
    },
    action: {
      color: theme.palette.text.secondary,      
    },
    split: {
      marginLeft: '9px', 
      marginRight: '12px',
    }
  })
);

const SectionOptions = [
  {label: 'Finance', value: '1'}, 
  {label: 'Legal', value: '2'}, 
  {label: 'Debt', value: '3'},
];

interface TaskToolbarProps {
  lists: UserLists_userLists_lists[];
}

export default function TaskToolbar(props: TaskToolbarProps) {
  const {lists} = props;
  const classes = useStyles();

  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const ListOptions = lists.map(list => {
    return {
      value: list.id, 
      label: list.name, 
    } as OptionType;
  });

  const getSectionOptions = () => {
    let options: OptionType[] = [];

    selectedLists.map(selectedList => {
      const findList = lists.find(list => list.id === selectedList);

      if (findList && findList.sections) {
        options = options.concat(
          findList.sections.map(section => {
            return {
              value: section.id, 
              label: section.name, 
            } as OptionType;
          })
        );
      }
    });
    
    return options;
  }

  const handleChangeList = (newValue: string) => {
    const index = selectedLists.findIndex(list => list === newValue);

    if (index >= 0) {
      setSelectedLists([
        ...selectedLists.slice(0, index), 
        ...selectedLists.slice(index + 1),
      ]);
    } else {
      setSelectedLists([
        ...selectedLists, 
        newValue, 
      ])
    }
  }

  const handleChangeSection = (newValue: string) => {
    const index = selectedSections.findIndex(section => section === newValue);

    if (index >= 0) {
      setSelectedSections([
        ...selectedSections.slice(0, index), 
        ...selectedSections.slice(index + 1),
      ]);
    } else {
      setSelectedSections([
        ...selectedSections, 
        newValue, 
      ])
    }
  }

  return (
    <Toolbar className={classes.root}>
      <Dropdown
        options={ListOptions}
        placeholder="List name"
        multiSelection="Multiple lists"
        value={selectedLists}
        onChange={handleChangeList}
      />
      <Typography variant="h4" className={classes.split}>/</Typography>
      <Dropdown
        options={getSectionOptions()}
        placeholder="All sections"
        multiSelection="Multiple sections"
        value={selectedSections}
        onChange={handleChangeSection}
      />
      <div className={classes.grow} />
      <div className={classes.action}>
        <IconButton aria-label="filter list">
          <PersonAdd />
        </IconButton>
        <IconButton aria-label="filter list">
          <AttachFile />
        </IconButton>
        <IconButton aria-label="filter list">
          <GetApp />
        </IconButton>
        <IconButton aria-label="filter list">
          <Delete />
        </IconButton>
        <IconButton aria-label="filter list">
          <More />
        </IconButton>        
      </div>
    </Toolbar>
  )
}