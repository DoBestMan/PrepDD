import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import idx from 'idx';
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

import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import UploadIcon from '@material-ui/icons/CloudUpload';

import {useAllTemplates} from '../../../graphql/queries/AllTemplates';
import {
  AllTemplates_templateLists, 
  AllTemplates_templateLists_tasks,
} from '../../../graphql/queries/__generated__/AllTemplates'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 156px)',
      padding: '0px calc((100% - 1380px) / 2) 0px calc((100% - 1380px) / 2)', 
      borderBottom: '1px solid #D8D8D8',
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
      height: '100%',
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
      backgroundColor: '#1969A5',
    },
    low: {
      backgroundColor: '#81AFFF',
    },
  })
);

export default function Body() {
  const classes = useStyles();
  const {loading, data, error} = useAllTemplates({});
  const [lists, setLists] = useState<AllTemplates_templateLists[]>([]);
  const [selected, setSelected] = useState<number>(-1);

  useEffect(() => {
    const templateLists = idx(data, data => data.templateLists);

    if (loading || !templateLists) return;
    setLists(templateLists);
  }, [loading, idx(data, data => data.templateLists)])

  const renderPriority = (priority: string) => {
    return (
      <div className={classes.flex}>
        <div
          className={clsx(
            classes.status,
            priority === 'High'
              ? classes.high
              : priority === 'Medium'
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
  };

  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <Typography variant="h2">Select List</Typography>
        <ArrowDownIcon fontSize="large" />
      </div>
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
            {/* {selected >= 0 && lists && lists[selected] && lists[selected].tasks && 
              lists[selected].tasks.map((item: AllTemplates_templateLists_tasks) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{renderPriority(item.priority as string)}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })
            } */}
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
  );
}
