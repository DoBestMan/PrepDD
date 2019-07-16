import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        marginTop: 50,
        marginLeft: '10%',
    },
    paper: {
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
    },
}));

export default function CompanySettings(props: {path?: string}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        Watermarking: false,
    });
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>
                            Company Settings
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            Company Name
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            PrepDD
                        </Typography>
                        <Divider/>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
            </Grid>

            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.Watermarking}
                            onChange={handleChange('Watermarking')}
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
