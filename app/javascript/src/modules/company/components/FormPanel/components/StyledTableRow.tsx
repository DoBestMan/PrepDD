import {withStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const StyledTableRow = withStyles({
  root: {
    height: '60px',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '15px',
    color: '#2C2C2C',
  },
})(TableRow);

export default StyledTableRow;
