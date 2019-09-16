import React, {useState} from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Toolbar,
  Typography, 
  IconButton,
	Button
} from '@material-ui/core';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AttachFile from '@material-ui/icons/AttachFile';
import GetApp from '@material-ui/icons/GetApp';
import Delete from '@material-ui/icons/DeleteForever';
import More from '@material-ui/icons/MoreHoriz';

import Dropdown from './components/Dropdown';
import AddUsersModal from './components/AddUsersModal';

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
  selectedLists: string[];
  setSelectedLists: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSections: string[];
  setSelectedSections: React.Dispatch<React.SetStateAction<string[]>>;
	multiTasks: any[];
	openDeleteModal: () => void;
	openAddUsersModal: () => void;
  addUsersModal: boolean;
}

export default function TaskToolbar(props: TaskToolbarProps) {
  const {
    lists,
    selectedLists, 
    setSelectedLists, 
    selectedSections, 
    setSelectedSections, 
		multiTasks,
		openDeleteModal,
		openAddUsersModal,
		addUsersModal,
  } = props;
  const classes = useStyles();

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

  // All these two handlers are doing is picking up a click. 
	// checking for multiple selections, passing back to task page
	const handleAddPersonClick = (e: any) => {
	  if (multiTasks.length) {
			openAddUsersModal();
		}
	}

	// see handleAddPersonClick comment
	const handleDeleteClick = (e: any) => {
		if (multiTasks.length) {
				openDeleteModal();
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
			<div>
				{ addUsersModal && 
					<AddUsersModal test="ok"/>
				}
			</div>
			<div>
			{ multiTasks.length ? 
      <Button variant="outlined" className={''}>
				{ multiTasks.length + " tasks selected" } 
      </Button>
			: null }
      </div>
      <div className={classes.action}>
        <IconButton onClick={handleAddPersonClick} aria-label="filter list">
          <PersonAdd />
        </IconButton>
        <IconButton aria-label="filter list">
          <AttachFile />
        </IconButton>
        <IconButton aria-label="filter list">
          <GetApp />
        </IconButton>
        <IconButton onClick={handleDeleteClick} aria-label="filter list">
          <Delete />
        </IconButton>
        <IconButton aria-label="filter list">
          <More />
        </IconButton>        
      </div>
    </Toolbar>
  )
}
