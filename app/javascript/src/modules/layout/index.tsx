import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { InputBase } from '@material-ui/core'

import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AddIcon from '@material-ui/icons/Add'

import {
  StyledButton,
  StyledBadge
} from './components/styled'
import { MainListItems, AdminListItems } from './components/NavbarItems'
import Dropdown from './components/Dropdown'
import useStyles from './style'

export default function Layout(props: {path?: string, children: object}) {
  const { children } = props

  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <AppBar 
        className={clsx(classes.appBar, open && classes.appBarShift)}
        position="fixed" 
        elevation={0}
      >
        <Toolbar className={classes.toolbar} disableGutters>
          <Dropdown />

          <div className={clsx(classes.search, classes.grow)}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for lists, request, or files"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{"aria-label": "search"}}
            />
          </div>

          <Typography variant="inherit">
            <Button className={classes.inviteButton}>
              Invite
            </Button>
            <IconButton aria-label="show 4 new notifications" color="inherit">
              <StyledBadge badgeContent={4} color="secondary">
                <NotificationsIcon className={classes.appBarItemSize} />
              </StyledBadge>
            </IconButton>
            <IconButton
              className={classes.mr39}
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle className={classes.appBarItemSize} />
            </IconButton>
          </Typography>
          </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <List disablePadding>
          <ListItem className={clsx(classes.paddingOpen, !open && classes.paddingClose)} disableGutters>
            <ListItemIcon>
              <img src="../assets/img/logos/prepdd-logo.svg" alt="PrepDD"/>
            </ListItemIcon>
            <ListItemText>
              <span className={classes.mark}>
                PREP<span className={classes.primaryColor}>DD</span>
              </span>
            </ListItemText>
          </ListItem>
          <ListItem className={clsx(classes.paddingOpen, !open && classes.paddingClose)} disableGutters>
            {open ?
              <StyledButton variant="outlined" color="primary">Create</StyledButton> :
              <StyledButton variant="outlined" color="primary" style={{height: "36px"}}>
                <AddIcon />
              </StyledButton>
            }
          </ListItem>          
          <MainListItems open={open} />
        </List>
        <Divider className={clsx(classes.marginOpen, !open && classes.marginClose)}/>
        <List disablePadding>
          <AdminListItems open={open} />
        </List>
      </Drawer>

      <PlayCircleOutline className={clsx(open && classes.arrowOpen, !open && classes.arrowClose)} onClick={toggleDrawer}/>

      <main className={clsx(classes.content, !open && classes.contentOpen)} >
        { children }
      </main>
    </div>
  )
}