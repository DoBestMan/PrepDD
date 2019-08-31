
import {withStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const StyledBadge = withStyles({
  badge: {
    top: '12%',
    right: '3px',
    minWidth: '10px',
    height: '10px',
    backgroundColor: '#6EB81D',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: '11px',
    color: '#FFFFFF',
    letterSpacing: '0',
    textAlign: 'center',
  },
})(Badge);

export default StyledBadge;