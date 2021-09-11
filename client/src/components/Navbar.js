import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import { logout } from '../redux/actions/authActions';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ForumIcon from '@material-ui/icons/Forum';
import CallIcon from '@material-ui/icons/Call';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  title: {
       flexGrow: 1,
       textAlign:'right',
     },
  menu:{
    flexGrow: 1,
    textAlign:'left',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Navbar() {

  
  
  
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ouvre,setOuvre] =  React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenu = (event) => {
    setOuvre(true);
  };
const handleClose = () => {
   setOuvre(false);
 };
 const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ background: 'black' }} position='fixed' className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.menu} >
           <div > <Link style={{color: 'honeydew	' ,filter: 'brightness(1.5)', textDecoration:'none'}} to='/'>Home</Link> <Link style={{color: 'white' , textDecoration:'none'}} to='/posts'>Our Forum</Link></div>
           </Typography>
           {!auth.isAuth ?  
           <Typography variant="h6"  className={classes.title}>
             <div > <Link style={{color: 'honeydew' ,filter: 'brightness(1.5)', textDecoration:'none'}} to='/login'>Login</Link> <Link style={{color: 'white' , textDecoration:'none'}} to='/register'>Register</Link></div>
           </Typography>
           :
           <Typography variant="h6"  style={{display:'inline-block'}} className={classes.title}>
             <div style={{}}> <Link style={{color: 'honeydew' ,filter: 'brightness(1.5)', textDecoration:'none'}} to='/profile'>Profile</Link> <Link style={{color: 'white' , textDecoration:'none'}} onClick={() => dispatch(logout())}>Logout</Link> {!auth.user ? null : <Avatar  alt="Remy Sharp"  style={{display:'inline-block',verticalAlign: 'middle' }} src={auth.user.image.url || auth.user.image}  className={classes.small} />}</div>
             
            {/* <div className={classes.root}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"                              
                >
                {!auth.user ? <AccountCircle   /> : <Avatar alt="Remy Sharp"   src={auth.user.image.url || auth.user.image}  className={classes.small} />}
              </IconButton>
              <Menu
                id="menu-appbar"
                style={{top:'0px'}}
                anchorOrigin={{
                  
                  horizontal: 'right',
                  top:0 }}
                keepMounted
                open={ouvre}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} ><Link to='/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>logout</MenuItem>
              </Menu>
              
            </div> */}
           </Typography>}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem>
          {auth.isAuth &&(
           
            
          
              !auth.user ? null : 
              <ListItem button>
                <ListItemIcon><Avatar alt="Remy Sharp" src={auth.user.image.url || auth.user.image} className={classes.small} /></ListItemIcon>
                <ListItemText > <Link to='/profile'>{auth.user.firstname} {auth.user.lastname}</Link></ListItemText>
            </ListItem>
              // <div style={{display:'inline-block'}}>
                
                

              //   <Avatar alt="Remy Sharp" src={auth.user.image.url || auth.user.image} className={classes.small} />
                
              //   <Link to='/profile'>{auth.user.firstname} {auth.user.lastname}</Link>
                
              // </div>
          )}
          
          </ListItem>
          <Divider />
        <List>
          
            <ListItem >
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText ><Link style={{textDecoration:'none'}} to='/'>Home</Link> </ListItemText>
            </ListItem>
            <ListItem >
              <ListItemIcon><DirectionsCarIcon/></ListItemIcon>
              <ListItemText><Link style={{textDecoration:'none'}} to='/cardealerlist'>Cardealer List</Link></ListItemText>
            </ListItem>
            <ListItem >
              <ListItemIcon><ForumIcon/></ListItemIcon>
              <ListItemText><Link style={{textDecoration:'none'}} to='/posts'>Our Forum</Link></ListItemText>
            </ListItem>
        </List>

        <Divider />
        
          
        <div style={{textAlign:'center',fontSize:'16px',fontWeight:'bolder'}}>
          Contact Us Via
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText disableTypography style={{marginLeft:-20 ,fontSize:'15px'}} s onClick={() => openInNewTab('https://mail.google.com/mail/u/0/#inbox?compose=CllgCJNsMBjQPksCprrjPSRxDMRdrfVKxvsjBShtTPKWCmpRmJQnQWVkfbpltBktVWNMCdkNHCL')} > yessineghezaiel@gmail.com</ListItemText>
          </ListItem>
          
          <ListItem button>
            <ListItemIcon><FacebookIcon /> </ListItemIcon>
            <ListItemText  onClick={() => openInNewTab('https://www.facebook.com/profile.php?id=100000048181375')} >Yessine Ghezaiel </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon><LinkedInIcon /></ListItemIcon>
            <ListItemText onClick={() => openInNewTab('https://www.linkedin.com/in/ghezaiel-yessine-3a983819b')} > Yessine Ghezaiel</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon><CallIcon /></ListItemIcon>
            <ListItemText > +216 25 142 674</ListItemText>
          </ListItem>
          
        </List>
      </Drawer>
    
        
      
    </div>
  );
}
