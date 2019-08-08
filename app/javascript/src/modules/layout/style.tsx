import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const miniDrawerWidth = 72;
const drawerWidth = 240;
const appBarHeight = 73;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
    },
    mark: {
      fontFamily: 'Helvetica',
      fontSize: '18px',
      fontWeight: 800, 
      color: '#0E3B5C',
      lineHeight: '48px'
    },
    primaryColor: {
      color: '#3A84FF'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: miniDrawerWidth,
      width: `calc(100% - ${miniDrawerWidth}px)`,
      height: appBarHeight,
      background: '#FFFFFF',
      color: '#606060',
      border: '1px solid #D8D8D8',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaper: {
      boxSizing: 'border-box', 
      width: drawerWidth,
      background: '#FFFFFF',
      border: '1px solid #D8D8D8',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      boxSizing: 'border-box', 
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: '72px',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    paddingOpen: {
      paddingLeft: 24,
      paddingRight: 24
    },
    paddingClose: {
      paddingLeft: 18, 
      paddingRight: 18
    },
    marginOpen: {
      margin: '15px 24px 0px 24px'
    },
    marginClose: {
      margin: '15px 18px 0px 18px'
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
      marginLeft: drawerWidth,
      marginTop: '73px',
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    contentOpen: {
      marginLeft: '72px',
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fullWidth: {
      width: '100%'
    },
    company: {
      display: 'none',
      boxSizing: 'border-box',
      padding: '24px 24px 19px 24px',
      borderRight: '1px solid #D8D8D8',
      fontFamily: 'Helvetica',
      fontSize: '18px',
      fontWeight: 800, 
      color: '#2C2C2C',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
      '&:hover': {
        cursor: 'pointer',
        background: '#EBF2FF'
      }
    },
    pl12: {
      paddingLeft: '12px'
    },
    grow: {
      flexGrow: 1,
    },
    toolbar: {
      height: appBarHeight
    },
    search: {
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      background: '#F2F2F2',
      borderRadius: '3px',
      fontFamily: 'Helvetica',
      fontWeight: 800, 
      fontSize: '15px'
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      height: 42, 
      fontFamily: 'Helvetica',
      fontSize: '15px',
      fontWeight: 800, 
      color: 'black'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 6),
      transition: theme.transitions.create('width'),
      width: '100%',
      height: 42, 
      [theme.breakpoints.up('md')]: {
        width: 300,
      },
    },
    inviteButton: {
      width: '91px',
      background: '#3A84FF',
      borderRadius: '3px',
      fontFamily: 'Helvetica',
      fontWeight: 800, 
      fontSize: '15px',
      color: '#FFFFFF',
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    appBarItemSize: {
      width: '40px',
      height: '40px'
    },
    mr39: {
      marginRight: '39px'
    },
    arrowOpen: {
      position: 'fixed', 
      top: '41px', 
      left: '226px',
      background: '#EBF2FF',
      borderRadius: '15px',
      transform: 'rotate(-180deg)',
      color:'#3A84FF',
      "zIndex": 10000, 

      transition: theme.transitions.create('left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    arrowClose: {
      position: 'fixed', 
      top: '41px', 
      left: '60px',
      background: '#EBF2FF',
      borderRadius: '15px',
      color:'#3A84FF',
      "zIndex": 10000, 

      transition: theme.transitions.create('left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }),
);

export default useStyles;