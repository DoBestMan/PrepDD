import React from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';

const drawerWidth = 210
const miniDrawerWidth = 72
const topBarHeight = 73

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
      height: `calc(100% - ${topBarHeight}px)`,
      marginLeft: drawerWidth,
      marginTop: topBarHeight,
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    contentOpen: {
      marginLeft: miniDrawerWidth,
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    togglerOpen: {
      position: 'fixed', 
      top: '41px', 
      left: drawerWidth - 12,
      background: '#EBF2FF',
      borderRadius: '15px',
      transform: 'rotate(-180deg)',
      color:'#3A84FF',
      "zIndex": 10000, 
      opacity: 0, 

      transition: theme.transitions.create('left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    togglerClose: {
      position: 'fixed', 
      top: '41px', 
      left: miniDrawerWidth - 12,
      background: '#EBF2FF',
      borderRadius: '15px',
      color:'#3A84FF',
      "zIndex": 10000, 
      opacity: 0, 

      transition: theme.transitions.create('left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    narrowShow: {
      opacity: 1
    },
    narrowOver: {
      position: 'absolute',
      left: drawerWidth, 
      width: 24, 
      height: '100vh', 
      zIndex: 10000
    },
  })
);

export default function Layout(props: {path?: string, children: React.ReactNode}) {
  const { children } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(true);
  const [showNarrow, setShowNarrow] = React.useState<boolean>(false);

  const toggleDrawer = () => setOpen(!open)

  return (
    <div className={classes.root}>
      <TopBar open={open} />
      <SideBar 
        open={open} 
        setShowNarrow={setShowNarrow}
      />
      <div 
        className={classes.narrowOver} 
        onMouseOver={() => setShowNarrow(true)}
        onMouseOut={() => setShowNarrow(false)}
      />
      <PlayCircleOutline 
        className={clsx(
          open && classes.togglerOpen, !open && classes.togglerClose,
          (!open || showNarrow) && classes.narrowShow
        )}
        onClick={toggleDrawer}
        onMouseOver={() => setShowNarrow(true)}
        onMouseOut={() => setShowNarrow(false)}
      />
      <main className={clsx(classes.content, !open && classes.contentOpen)} >
        { children }
      </main>
    </div>
  )
}