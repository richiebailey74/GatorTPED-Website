//react imports
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import clsx from 'clsx';

//material ui core imports
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import HomeButton from "./HomeButton";

//material ui icon imports
import HomeIcon from '@material-ui/icons/Home';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//image import
import drawerImage from "./sideBar2.jpg";

//const variable for sidebar width
const drawerWidth = '200px';



//handles all the styles for the components down below for the same file, using u-styles in CSS
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 2,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
    backgroundColor: "red"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1, align: 'center'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    color: 'white',
    backgroundImage: 'url(' + drawerImage + ')',
    backgroundSize: 'cover',
    width: drawerWidth,
    height: '100%'
  },
  drawerHeader: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    //necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    maxWidth: '50%',
    maxHeight: '70%',
  },
  center: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  icon: {
    fill: 'white'
  },
  avatar: {
    fill: 'white'
  },
  imageIcon: { height: '100%' },
  iconRoot: { textAlign: 'center' },
  card: {
    width: 300,
    margin: 'auto'
  },
  media: {
    height: '100%',
    width: '100%'
  }
}));

//callback function that passes in props (history, used for routing)
const Appbar = (props) => {

    //consts defined to be used for functionality in the exportable
    const classes = useStyles();
    const theme = useTheme();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory(); //history used for subpage routing
    const location = useLocation();
    const [open, setOpen] = React.useState(false); //Drawer
    const [menuOpen, setMenuOpen] = React.useState(false);
    const anchorRef = React.useRef(null); //Menu

    //Drawer open and close functions
    const handleDrawerOpen = () => { setOpen(true); };
    const handleDrawerClose = () => { setOpen(false); };

    //Menu open and close functions depending on if it is open or not and where the mouse click event e occurs on the page
    const handleToggle = () => { setMenuOpen((prevOpen) => !prevOpen)};
    
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) { return; } 
      setMenuOpen(false)
    };

    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setMenuOpen(false);
      }
    }

    const prevOpen = React.useRef(open);

    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
      prevOpen.current = open;
    }, [open]);

    //logout function allows users to logout of logged in account and redirects to the home page
    const logout = useCallback(() => {
      dispatch({ type: 'LOGOUT' });

      history.push('/');

      setUser(null);
    }, [dispatch, history]);
    
    //this token is used to check if there exists a logged in user in by checking to see if there exists a token in the browser
    const token = user?.token;

    //this function essentially logs the user out if they have been logged in for a certain period of time
    useEffect(() => {
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, token, logout]);

    

    //list of objects that will be displayed when sidebar swings out, will be dereferenced later in the returned part of the exportable
    const itemsList = [
      {
          text: 'Home', 
          icon: <HomeIcon className={classes.icon}/>,
          onClick: () => history.push('/')
      },
      {
          text: 'Projects', 
          icon: <ImageSearchIcon className={classes.icon}/>,
          onClick: () => history.push('/projectsearch')
      },
      {
          text: 'Calendar',
          icon: <CalendarTodayIcon className={classes.icon}/>,
          onClick: () => history.push('/calendar')
      },
      {
          text: 'Contact Us', 
          icon: <ContactMailIcon className={classes.icon}/>,
          onClick: () => history.push('/contact')
      },
      {
          text: 'Exec Board', 
          icon: <AssignmentIcon className={classes.icon}/>,
          onClick: () => history.push('/eboard')
      },
      {
          text: 'FAQ',
          icon: <LiveHelpIcon className={classes.icon}/>,
          onClick: () => history.push('/faq')
      },
    ]

    //this adds edit profile and upload project to the navigation bar only if a user is logged in
    if(token) {
      itemsList.push({
        text: 'Edit Profile',
        icon: <EditIcon className={classes.icon}/>,
        onClick: () => history.push('/dashboard')
      });
      itemsList.push({
        text: 'Upload Project', 
        icon: <PublishIcon className={classes.icon}/>,
        onClick: () => history.push('/submitpost')
      });
    }

    //list of objects that will be displayed in the drop down menu (start empty)
    //this will also be dereferenced later on in the returned part of the exportable
    const menuItems = [    
    ]

    //if a user is logged in then push options to go to the edit profile page or to logout
    if(token) {
      menuItems.push({text: 'Profile', onClick: () => history.push('/dashboard')});
      menuItems.push({text: 'Logout', onClick: logout});
    }
    //if a user is not login then the option to go to login page appears, and subsequently login or sign up to viewer is available
    else {
      menuItems.push({text: 'Login', onClick: () => history.push('/auth')});
    }

    //actual part of the exportable returned with the appropriate styling to be displayed
    return (
      <div className={classes.root}>

        <CssBaseline />

        <AppBar style={{ background: 'transparent', boxShadow: 'none'}} position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open})}>
          <Toolbar>

            {/* This div contains the profile drop down menu and uses react router to direct to subpages depending on which item was clicked (notice the url change up top) */}
            <div>
              <Button ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
                <AccountCircleIcon style={{fontSize: '32px'}} className={classes.avatar}/>
              </Button>
              <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        
                        { menuItems.map((item) =>  {
                          const { text, onClick } = item;
                          return (
                            <MenuItem button key={text} onClick={ () => { onClick(); handleToggle() }}>
                              <ListItemText primary={text} />
                            </MenuItem>
                          ); 
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
                )}
              </Popper>
            </div>

            {/* This is the home button that displays at the top of every page that if clicked redirects to the home page */}
            <div style={{ position: 'fixed', left: '50%', top: '45px', transform: 'translate(-50%, -50%)'}}>
              <Link href="/" variant="h6" color="inherit" underline="none">
                <HomeButton />
              </Link>
            </div>

            {/* This is the menu icon button on the right side that swings open the drawer sidebar*/}
            <ClickAwayListener onClickAway={handleDrawerClose}>
              <div style={{ position: 'absolute', left: '96%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerOpen} className={clsx(open && classes.hide)}>
                  <MenuIcon style={{fontSize: '32px'}}/>
                </IconButton>
              </div>
            </ClickAwayListener>
          </Toolbar>
        </AppBar>

        {/* This is the sidebar with routing functionality to direct users to the appropriate subpages*/}
          <Drawer className={classes.drawer} anchor="right" open={open} classes={{paper: classes.drawerPaper, }}>
            <div className={classes.drawerHeader}>
              <IconButton style={{color: 'white'}} onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <ClickAwayListener onClickAway={handleDrawerClose}>
              <List>
                { itemsList.map((item) =>  {
                  const { text, icon, onClick } = item;
                  return (
                    <ListItem button key={text} onClick={ () => { onClick(); handleDrawerClose()}}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
            </ClickAwayListener>
        </Drawer>
      </div>
    );
};

export default withRouter(Appbar);
