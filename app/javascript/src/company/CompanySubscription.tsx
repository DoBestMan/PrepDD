import React, {useCallback} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '60%',
    marginLeft: '30%',
    marginTop: 50,
  },
});

export default function CompanySubscription(props: {path?: string}) {
  const classes = useStyles();

  const [state, setState] = React.useState({watermarking: false});

  const handleWatermarkingChange = useCallback(event => {
    setState({...state, watermarking: event.target.checked});
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="body1" gutterBottom>
        Total active storage used XXX
      </Typography>

      <Typography variant="body1" gutterBottom>
        No. of Seats utilized during a given month XXX
      </Typography>

      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={state.watermarking}
              onChange={handleWatermarkingChange}
              value="Watermarking"
              color="primary"
            />
          }
          label="File PDF + Watermarking"
        />
      </FormGroup>
    </div>
  );
}
