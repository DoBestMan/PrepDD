import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'

const StyledBadge = withStyles({
  badge: {
    top: '15%',
    right: '6px', 
    minWidth: '15px', 
    height: '15px',
    background: '#FF507C',
    fontFamily: 'Montserrat',
    fontWeight: 'bold', 
    fontSize: '11px',
    color: '#FFFFFF',
    letterSpacing: '0',
    textAlign: 'center'
  }
})(Badge)

export default StyledBadge