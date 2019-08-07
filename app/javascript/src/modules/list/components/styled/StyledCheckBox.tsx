import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'

const StyledCheckBox = withStyles({
  root: {
    '&$checked': {
      color: '#3A84FF'
    }
  },
  checked: {}
})(Checkbox)

export default StyledCheckBox