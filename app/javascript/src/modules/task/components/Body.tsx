import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import idx from 'idx';
import axios from 'axios';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core';
import ReactDropzone from 'react-dropzone';

import UploadIcon from '@material-ui/icons/CloudUpload';
import Dropdown from './Dropdown';

import {useAllTemplates} from '../../../graphql/queries/AllTemplates';
import {
  AllTemplates_templateLists, 
  AllTemplates_templateLists_tasks,
} from '../../../graphql/queries/__generated__/AllTemplates'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      height: 'calc(100vh - 156px)',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)', 
      borderBottom: '1px solid #D8D8D8',
    },
    footer: {
      height: '72px', 
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)', 
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      display: 'flex',
      marginTop: '48px',
    },
    rightPane: {
      minWidth: '200px',
      marginLeft: '72px',
    },
    uploadButton: {
      width: '100%', 
      height: '42px', 
      padding: '0px', 
    },
    uploadArea: {
      width: '100%',
      height: '350px',
      border: '2px dashed #D8D8D8',
      borderRadius: '3px',
      marginTop: '30px',
      paddingTop: '50px',
      color: '#D8D8D8',
      textAlign: 'center',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    uploadLabelColor: {
      color: '#D8D8D8',
    },
    uploadActive: {
      background: '#EBF2FF',
      borderColor: '#3A84FF',
    },
    statusLabelColor: {
      color: '#606060',
    },
    status: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px',
    },
    high: {
      backgroundColor: '#2792A2',
    },
    medium: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #2792A2',
    },
    low: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #2792A2',
    },
    textFlow: {
      display: 'inline-block',
      width: 'fit-content', 
      maxWidth: 'calc(80%)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
);

export default function Body() {
  const classes = useStyles();
  const {loading, data, error} = useAllTemplates({});
  const [lists, setLists] = useState<AllTemplates_templateLists[]>([]);
  const [selected, setSelected] = useState<AllTemplates_templateLists | null>(null);
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    const templateLists = idx(data, data => data.templateLists);

    if (loading || !templateLists) return;
    setLists(templateLists);
  }, [loading, idx(data, data => data.templateLists)])

  const renderPriority = (priority: string) => {
    return (
      <div className={classes.flex} style={{textTransform: 'capitalize'}}>
        <div
          className={clsx(
            classes.status,
            priority === 'high'
              ? classes.high
              : priority === 'medium'
              ? classes.medium
              : classes.low
          )}
        />
        <Typography variant="h6">{priority}</Typography>
      </div>
    );
  };

  const handleDrop = (acceptedFiles: File[]) => {
    // Handle importing templates
    const form_data = new FormData();
    form_data.append('file', acceptedFiles[0]);

    axios
      .post('/api/import_task', form_data, {
        headers: {
          'x-api-key': 'jKXFpXpMXYeeI0aCPfh14w',
        },
      })
      .then(res => {
        const tempTasks = idx(res, res => res.data.tasks);
        if (tempTasks) {
          const tasks = Object.values(tempTasks);
          const newTasks = tasks.map((task: any) => {
            return {
              __typename: "Task",
              id: '',
              name: task.name, 
              section: task.section, 
              description: task.description, 
              priority: task.priority, 
              status: 'Todo'  
            } as AllTemplates_templateLists_tasks;
          });

          if (selected) {
            setSelected({
              ...selected, 
              tasks: [
                ...selected.tasks, 
                ...newTasks, 
              ]
            });
          }
        }
      })
  };

  const handleAddTask = () => {
    setEditable(true);
  }

  return (
    <div>
      <div className={classes.body}>
        <Dropdown 
          data={lists} 
          selected={selected}
          setSelected={setSelected}
        />
        <div className={classes.content}>
          <Table style={{tableLayout: 'fixed'}}>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell style={{width: '200px'}}>Section</TableCell>
                <TableCell style={{width: '150px'}}>Priority</TableCell>
                <TableCell>Description</TableCell>
                <TableCell style={{width: '125px'}}>Example Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selected && selected.tasks && 
                selected.tasks.map((item: AllTemplates_templateLists_tasks, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className={classes.textFlow}>{item.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className={classes.textFlow}>
                          {item.section && item.section.name ? item.section.name: ""}
                        </div>
                      </TableCell>
                      <TableCell>{renderPriority(item.priority as string)}</TableCell>
                      <TableCell>
                        <div className={classes.textFlow}>{item.description}</div>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
          <div className={classes.rightPane}>
            <Button variant="outlined" className={classes.uploadButton}>Download Template</Button>
            <ReactDropzone 
              multiple
              accept="application/*" 
              onDrop={handleDrop}
            >
              {({getRootProps, getInputProps, isDragActive}) => (
                <div
                  {...getRootProps()}
                  className={clsx(classes.uploadArea, isDragActive && classes.uploadActive)}
                >
                  <input {...getInputProps()} />
                  <div>
                    <UploadIcon style={{fontSize: '120px'}} />
                    <br />
                    <Typography variant="h4" className={classes.uploadLabelColor}>
                      Drag and Drop/
                      <br />
                      Import Tasks
                    </Typography>
                  </div>
                </div>
              )}
            </ReactDropzone>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.flex} style={{paddingTop: '18px'}}>
          <Button onClick={handleAddTask}>+ Add task</Button>
        </div>
      </div>
    </div>
    
  );
}
