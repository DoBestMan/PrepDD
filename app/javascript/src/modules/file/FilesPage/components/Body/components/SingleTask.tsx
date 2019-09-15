import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import {withRouter} from 'react-router';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Paper, 
  Typography,
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Checkbox, 
	Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import { useDropzone } from 'react-dropzone'
import * as cs from '../../../../../../constants/theme';
import NameLabel from '../../../../../common/NameLabel';
import StatusLabel from '../../../../../common/StatusLabel';
import ListDropdown from './ListDropdown';
import VersionDropdown from './VersionDropdown';

import {useUserLists} from '../../../../../../graphql/queries/UserLists';
import {useUserTasks} from '../../../../../../graphql/queries/UserTasks';

const Excel = require('images/dummy/logos/excel.svg');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    table: {
      tableLayout: 'fixed',
    },
    invisible: {
      display: 'none',
    },
    flex: {
      display: 'flex', 
      alignItems: 'center', 
    },
    grow: {
      flexGrow: 1, 
    },
    primary: {
      color: cs.COLORS.primary, 
    },
    filesPane: {
      marginTop: '24px', 
      padding: '6px',
      background: '#F2F2F2', 
      border: '1px solid #D8D8D8', 
      borderRadius: '3px', 
    }, 
    fileLabel: {
      height: '36px', 
      margin: '0px 6px 0px 0px', 
    }, 
    textarea: {
      width: '100%', 
      height: '100px', 
      marginTop: '24px', 
      padding: '12px', 
      resize: 'none', 
      fontFamily: cs.FONT.family, 
      fontSize: cs.FONT.size.xs, 
      fontWeight: cs.FONT.weight.regular, 
      border: '1px solid #D8D8D8', 
      borderRadius: '3px', 
    },
    selection: {
      marginTop: '24px', 
      height: '42px', 
      borderTop: '1px solid #D8D8D8', 
      borderBottom : '1px solid #D8D8D8', 
    }, 
    delete: {
      fontSize: '28px', 
      cursor: 'pointer', 
      '&:hover': {
        border: `1px solid ${cs.COLORS.primary}`, 
        borderRadius: '3px', 
      }
    }, 
    mr12: {
      marginRight: '12px', 
    }
  })
);

interface SingleTaskProps {
  value?: number;
  index?: number;
	location?: any;
}

const options = [
  {
    label: 'Any powers of attorneys granted by the Company to a third party, granting such party the authority to bind the Company.', 
    value: 'Any powers of attorneys granted by the Company to a third party, granting such party the authority to bind the Company.', 
  }, 
  {
    label: 'The Company’s stock books or ledgers and current capitalization table (including restricted stock, options, RSUs, phantom stock and warrants).', 
    value: 'The Company’s stock books or ledgers and current capitalization table (including restricted stock, options, RSUs, phantom stock and warrants).', 
  }, 
  {
    label: 'Lists of all current owners of shares or convertible securities, including address, tax ID or SSN, number of shares owned, dates of issuance and full payment, the consideration received by the Company and applicable stop transfer orders or restrictive legends.', 
    value: 'Lists of all current owners of shares or convertible securities, including address, tax ID or SSN, number of shares owned, dates of issuance and full payment, the consideration received by the Company and applicable stop transfer orders or restrictive legends.', 
  }
]

function SingleTask(props: SingleTaskProps) {
  const {value, index, location} = props;
  const classes = useStyles();
	console.log(location);

	const [lists, setLists] = useState<any>([]);
  const [selectedListId, setSelectedListId] = useState<string>('');

	const [tasks, setTasks] = useState<any>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

	const [files, setFiles] = useState<File[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const {
		loading: listLoading, 
		data: listData, 
		error: listError
  } = useUserLists({});

	const {
		loading: taskLoading,
		data: taskData,
		error: taskError
	} = useUserTasks({
	  listIds: [selectedListId],
		sectionIds: [],
		limit: 1000,
		offset: 0	
	});

  const onDrop = useCallback((addedFiles: File[]) => {
		// check if duplicate file
		// if not, add to files
		setFiles([...files, ...addedFiles])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


	const toggleSelectedFile = (id: number) => {
		if (selectedFiles.includes(id)) {
			setSelectedFiles(selectedFiles.filter(fid => fid != id))
		} else {
			setSelectedFiles([...selectedFiles, id])
		}
	}

	useEffect(() => {
		var lists = idx(listData, listData => listData.userLists.lists)

		if (listLoading) return;
		if (lists) { 
			setLists(lists.map(list => ({label: list.name, value: list.id})))
		};
	}, [listLoading]);

	useEffect(() => {
		var tasks = idx(taskData, taskData => taskData.userTasks)

		if (taskLoading) return;
		if (tasks) { 
			setTasks(tasks.map(task => ({label: task.name, value: task.id})))
		}; 
	}, [taskLoading]);


  return (
    <Paper
      className={clsx(classes.root, value !== index && classes.invisible)}
      aria-labelledby="Single Task"
      elevation={0}
    >
      <div className={clsx(classes.filesPane, classes.flex)} {...getRootProps()}>
				<input {...getInputProps()} />
			{
				isDragActive ? (<p>drop some files</p>) : (!files.length ? <p>drop</p> : files.map((file, index) => 
						<NameLabel label={file.name} key={index} logo={Excel} className={classes.fileLabel} />
				))
			}
      </div>

      <textarea 
        className={classes.textarea}
        placeholder="Add public comment or description..."
      />

      <div className={classes.flex} style={{marginTop: '24px'}}>
        <ListDropdown
          options={lists}
					handleUpdate={setSelectedListId}
					placeholder='select a List'
          value={selectedListId}
        />
        <ListDropdown
          options={tasks}
					handleUpdate={setSelectedTaskId}
					placeholder='select a Task'
          value={selectedTaskId}
        />
        <div className={classes.grow} />
        <StatusLabel currentStatus="Start" selected/>
      </div>

      <div className={clsx(classes.flex, classes.selection)}>
        <Typography variant="h6" className={classes.primary}>
          2 files selected
        </Typography>
        <div className={classes.grow} />
        <DeleteIcon className={classes.delete} />
      </div>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox color="primary" 
							/>
            </TableCell>
            <TableCell>File</TableCell>
            <TableCell>Public Comment</TableCell>
            <TableCell>Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
{ files.map( (file, index) =>
          <TableRow key={index}>
            <TableCell padding="checkbox">
              <Checkbox color="primary"
								checked={selectedFiles.includes(index)}
								onChange={() => toggleSelectedFile(index)}
							 />
            </TableCell>
            <TableCell>
              <div className={classes.flex}>
                <img width="18" height="18" src={Excel} className={classes.mr12} />
                <Typography variant="h6">{file.name}</Typography>
              </div>
            </TableCell>
            <TableCell>
              Add...
            </TableCell>
            <TableCell>
              <VersionDropdown value="Update" />
            </TableCell>
          </TableRow>
) }
        </TableBody>
      </Table>
<Button>
Upload
</Button>
    </Paper>
  );
}

export default withRouter(SingleTask);
