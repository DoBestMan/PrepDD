import { withStyles } from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'

const StyledListItemIcon = withStyles({
  root: {
    color: '#2C2C2C',
    minWidth: '32px'
  }
})(ListItemIcon)

export default StyledListItemIcon