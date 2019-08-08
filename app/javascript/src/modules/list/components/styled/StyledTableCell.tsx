import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

const StyledTableCell = withStyles({
  root: {
    padding: '4px 24px 4px 24px',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    fontWeight: 800, 
    color: '#606060'
  }
})(TableCell)

export default StyledTableCell