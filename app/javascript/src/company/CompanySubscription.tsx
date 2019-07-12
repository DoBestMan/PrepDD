import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: '60%',
        marginLeft: '30%',
    },
});

export default function CompanySubscription() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        Watermarking: false,
    });
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

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
