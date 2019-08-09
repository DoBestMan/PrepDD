import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'

const StyledListSubheader = withStyles({
  root: {
    padding: '15px 24px 0px 24px',
    fontFamily: 'Montserrat',
    fontWeight: 'bold', 
    fontSize: '13px',
    color: '#606060'
  }
})(ListSubheader)

export default StyledListSubheader