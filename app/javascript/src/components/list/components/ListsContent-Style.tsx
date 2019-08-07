import { makeStyles } from '@material-ui/core/styles'

const panelWidth = 539

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  flex: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  alignCenter: {
    alignItems: 'center'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.duration.leavingScreen
    })
  },
  paperShift: {
    width: `calc(100% - ${panelWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut, 
      duration: theme.transitions.duration.enteringScreen
    })
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  fixedWidth: {
    width: 120
  },
  visuallyHidden: {
    border: 0, 
    clip: 'rect(0 0 0 0)',
    height: 1, 
    margin: -1, 
    overflow: 'hidden',
    padding: 0, 
    position: 'absolute', 
    top: 20, 
    width: 1
  },
  invisibleButton: {
    visibility: 'hidden'
  },
  visibleButton: {
    visibility: 'visible',
    float: 'right'
  },
  position: {
    marginTop: '9px'
  },
  statusBadge: {
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    marginTop: '5px'
  },
  high: {
    backgroundColor: '#2A894B',
  },
  medium: {
    backgroundColor: '#1969A5'
  },
  low: {
    backgroundColor: '#81AFFF'
  }
}))

export default useStyles