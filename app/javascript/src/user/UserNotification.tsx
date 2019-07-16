import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  noteTitle: {
    width: '100%',
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  notificationSelect: {
    width: '100%',
  },
  notificationGrid: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
  },
  notificationSub: {
    float: 'left',
    width: '50%',
  },
  notificationSub2: {
    float: 'left',
    width: '50%',
    textAlign: 'right',
  },
  divider: {
    border: '0.5 solid rgba(0, 0, 0, 0.12)',
  },
}));

export default function UserNotification(props: {path?: string}) {
  const classes = useStyles();
  const [frequency, setFrequency] = React.useState('');

  const handleChange = event => {
    setFrequency(event.target.value);
  };
  return (
    <div className={classes.root}>
      <div className={classes.noteTitle}>
        <Typography variant="h5" component="h2">
          Alert Notifications
        </Typography>
      </div>

      <div className={classes.notificationSelect}>
        <form autoComplete="off">
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-select">Frequency</InputLabel>
            <Select
              value={'immediately'}
              onChange={handleChange}
              input={<BootstrapInput name="age" id="age-customized-select" />}
            >
              <MenuItem value={'immediately'}>Immediately</MenuItem>
              <MenuItem value={'daily'}>Daily</MenuItem>
              <MenuItem value={'weekly'}>Weekly</MenuItem>
              <MenuItem value={'never'}>Never</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-select">Day</InputLabel>
            <Select
              value={'wednesday'}
              onChange={handleChange}
              input={<BootstrapInput name="age" id="age-customized-select" />}
            >
              <MenuItem value={'monday'}>Monday</MenuItem>
              <MenuItem value={'tuesday'}>Tuesday</MenuItem>
              <MenuItem value={'wednesday'}>Wednesday</MenuItem>
              <MenuItem value={'thursday'}>Thursday</MenuItem>
              <MenuItem value={'friday'}>Friday</MenuItem>
              <MenuItem value={'saturday'}>saturday</MenuItem>
              <MenuItem value={'sunday'}>Sunday</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-select">Time</InputLabel>
            <Select
              value={'10:00pm'}
              onChange={handleChange}
              input={<BootstrapInput name="age" id="age-customized-select" />}
            >
              <MenuItem value={'10:00pm'}>10:00 pm</MenuItem>
              <MenuItem value={'11:00pm'}>11:00 pm</MenuItem>
              <MenuItem value={'12:00am'}>12:00 am</MenuItem>
              <MenuItem value={'1:00am'}>1:00 am</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="age-customized-select">Time Zone</InputLabel>
            <Select
              value={'utc-5'}
              onChange={handleChange}
              input={<BootstrapInput name="age" id="age-customized-select" />}
            >
              <MenuItem value={'utc-5'}>Central Standard Time (UCT-5)</MenuItem>
              <MenuItem value={'utc-6'}>Central Standard Time (UCT-6)</MenuItem>
              <MenuItem value={'utc-7'}>Central Standard Time (UCT-7)</MenuItem>
              <MenuItem value={'utc-8'}>Central Standard Time (UCT-8)</MenuItem>
              <MenuItem value={'utc-9'}>Central Standard Time (UCT-9)</MenuItem>
            </Select>
          </FormControl>
          <Divider />
        </form>
      </div>

      <div className={classes.notificationGrid}>
        <div className={classes.notificationSub}>
          <Typography variant="h5" component="h2">
            Added into new team
          </Typography>
        </div>

        <div className={classes.notificationSub2}>
          <FormControlLabel
            control={
              <Switch
                checked={true}
                onChange={handleChange}
                value="checkedB"
                color="primary"
              />
            }
            label={''}
          />
        </div>
      </div>

      <div className={classes.notificationGrid}>
        <div className={classes.notificationSub}>
          <Typography variant="h5" component="h2">
            New file added
          </Typography>
        </div>

        <div className={classes.notificationSub2}>
          <FormControlLabel
            control={
              <Switch
                checked={true}
                onChange={handleChange}
                value="checkedB"
                color="primary"
              />
            }
            label={''}
          />
        </div>
      </div>

      <div className={classes.notificationGrid}>
        <div className={classes.notificationSub}>
          <Typography variant="h5" component="h2">
            New task in existing list
          </Typography>
        </div>

        <div className={classes.notificationSub2}>
          <FormControlLabel
            control={
              <Switch
                checked={true}
                onChange={handleChange}
                value="checkedB"
                color="primary"
              />
            }
            label={''}
          />
        </div>
      </div>
    </div>
  );
}
