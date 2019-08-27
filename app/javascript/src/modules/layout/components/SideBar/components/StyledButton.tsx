import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles({
  root: {
    width: '100%',
    height: '36px',
    marginTop: '6px',
    marginBottom: '15px',
    border: '2px solid #3A84FF',
    borderRadius: '3px',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#3A84FF',
    textAlign: 'center',
    minWidth: '0px',
    '&:hover': {
      border: '2px solid #3A84FF',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default StyledButton;
