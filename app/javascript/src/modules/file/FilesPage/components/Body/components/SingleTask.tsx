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

function SingleTask(props: SingleTaskProps) {
  const {value, index, location} = props;
  const classes = useStyles();

	const [lists, setLists] = useState<any>([]);
  const [selectedListId, setSelectedListId] = useState<string>('');

	const [tasks, setTasks] = useState<any>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

	const [files, setFiles] = useState<any[]>([]);
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

  const onDrop = (addedFiles: File[]) => {
		setFiles([...files, ...addedFiles])
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


	const toggleSelectedFile = (id: number) => {
		if (selectedFiles.includes(id)) {
			setSelectedFiles(selectedFiles.filter(fid => fid != id))
		} else {
			setSelectedFiles([...selectedFiles, id])
		}
	}

	const handleUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			var formData = new FormData();
			formData.append('task_id', selectedTaskId);
			files.forEach((file: File) => {
				formData.append(`files[]`, file);
			});
   
			var ok = await fetch('/api/upload', {
				method: 'POST',
				headers: {
          'x-api-key': 'jKXFpXpMXYeeI0aCPfh14w',
				},
				body: formData
			})	

			var json = await ok.json()
			console.log(json);
	}

	useEffect(() => {
		var lists = idx(listData, listData => listData.userLists.lists)

		if (selectedTaskId) console.log(lists);
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


  /* handles updating files, lists, tasks, when a file is dragged from
		 the task screen
	*/
	useEffect(() => {
		var files = idx(location, location => location.files.files);
		var listId = idx(location, location => location.files.listId);
		var taskId = idx(location, location => location.files.taskId);

		if (files) setFiles(files) 
	  if (listId) setSelectedListId(listId)	
		if (taskId) setSelectedTaskId(taskId)
		
	}, [location])

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
<Button onClick={handleUpload}>
Upload
</Button>
    </Paper>
  );
}

export default withRouter(SingleTask);
