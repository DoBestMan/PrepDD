import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'

const StyledTableCell = withStyles({
  root: {
    padding: '6px 0px 6px 21px',
    fontFamily: 'Montserrat',
    fontSize: '12px',
    fontWeight: 600, 
    color: '#606060'
  }
})(TableCell)

export default StyledTableCell