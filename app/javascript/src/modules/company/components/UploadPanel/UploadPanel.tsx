import React, {useState} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ReactDropzone from 'react-dropzone';

import {useGlobalState} from '../../../../store';
import * as cs from '../../../../constants/types';
import UploadIcon from '@material-ui/icons/CloudUpload';
import {CompanySettings_company} from '../../../../graphql/queries/__generated__/CompanySettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '52px',
      width: '250px',
      height: '250px',
      position: 'relative',
      border: '2px dashed #D8D8D8',
      borderRadius: '3px',
      padding: '12px',
      '&:focus': {
        outline: 'none',
      },
    },
    uploadArea: {
      width: '250px',
      height: '42px',
      position: 'absolute',
      top: '205px',
      left: '0px',
      backgroundColor: 'rgba(48, 48, 48, 0.5)',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    uploadLabel: {
      display: 'flex',
      height: 'inherit',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontFamily: 'Montserrat',
      fontSize: '15px',
      fontWeight: 600,
    },
    uploadFileLabel: {
      color: '#D8D8D8',
      fontFamily: 'Montserrat',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    uploadActive: {
      background: '#EBF2FF',
      borderColor: '#3A84FF',
    },
    invisible: {
      display: 'none',
    },
  })
);

interface UploadPanelProps {
  company: CompanySettings_company;
  setCompany: (value: React.SetStateAction<CompanySettings_company>) => void;
}

export default function UploadPanel(props: UploadPanelProps) {
  const {company, setCompany} = props;
  const classes = useStyles();
  const [showUpload, setShowUpload] = useState(false);

  const {state, dispatch} = useGlobalState();

  const handleDrop = (acceptedFiles: File[]) => {
    const user_data = new FormData();
    user_data.append('logo', acceptedFiles[0]);
    user_data.append('id', company.id);

    axios
      .post('/api/update_company_logo', user_data, {
        headers: {
          'x-api-key': 'jKXFpXpMXYeeI0aCPfh14w',
        },
      })
      .then(res => {
        setCompany({
          ...company,
          logoUrl: res.data.logo_url,
        });
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: {
            variant: 'success',
            message: 'Update logo successfully',
          },
        });

        if (state.currentUser.companies) {
          const index = state.currentUser.companies.findIndex(
            a => a.id === company.id
          );
          const newCompanies = state.currentUser.companies;

          newCompanies[index].logoUrl = res.data.logo_url;
          dispatch({
            type: 'SET_CURRENT_USER',
            user: {
              ...state.currentUser,
              companies: newCompanies,
            },
          });
        }
      })
      .catch(error => {
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: {
            variant: 'error',
            message: 'Upload logo failed',
          },
        });
      });
  };

  return (
    <ReactDropzone accept="image/*" onDrop={handleDrop}>
      {({getRootProps, getInputProps, isDragActive}) => (
        <div
          {...getRootProps()}
          className={clsx(classes.root, isDragActive && classes.uploadActive)}
        >
          <input {...getInputProps()} />
          {company.logoUrl ? (
            <div
              onMouseOver={() => setShowUpload(true)}
              onMouseOut={() => setShowUpload(false)}
            >
              <img
                src={company.logoUrl}
                width="222"
                height="222"
                alt="Microsoft"
              />
              <div
                className={clsx(
                  classes.uploadArea,
                  !showUpload && classes.invisible
                )}
              >
                <div className={classes.uploadLabel}>
                  <UploadIcon />
                  <span style={{marginLeft: '12px'}}>Update Logo</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={classes.uploadFileLabel}>
              <UploadIcon style={{fontSize: '120px'}} />
              <br />
              <span>
                Drag ang Drop/
                <br />
                upload logo
              </span>
            </div>
          )}
        </div>
      )}
    </ReactDropzone>
  );
}
