import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

const StyledTableCell = withStyles({
  root: {
    height: '60px', 
    padding: '0px', 
    fontFamily: 'Montserrat',
    fontSize: '15px',
    fontWeight: 600, 
    color: '#2C2C2C'
  }
})(TableCell)

export default StyledTableCell