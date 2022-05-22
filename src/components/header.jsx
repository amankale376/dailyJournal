import React from 'react';
import {Typography,Toolbar, AppBar, CssBaseline} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DrawerRight from './drawer';
import {Link} from 'react-router-dom';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function Header(props){
  const pathname = window.location.pathname;
  const [DState, setDState] = React.useState(false);

  function setState(){
    setDState(true);
    
  }

  function setStateFalse(){
    setDState(false);
    
  }
  
    const classes = useStyles();
    return <div className={classes.root} >
    <CssBaseline />
    <AppBar position="static" style={{background:"#5e454b", color:"#fff"}}>
    <Toolbar>
    {pathname === '/'?<>
    <Typography variant='h3' className={classes.title}>
        <p className="app-bar-text-left">Daily Journal</p>
          </Typography>
    </>:
        <Typography variant='h3' className={classes.title}>
        <p className="app-bar-text-left"><Link to="/">Daily Journal</Link></p>
          </Typography>
            }
          <Link to="/about">
          <IconButton>
          <InfoIcon style={{color:'white'}}/>
          </IconButton>
            </Link>
          <Link to="/">
            {pathname === '/'?<></>:
          <IconButton>
          <HomeIcon style={{color:'white'}}/>
          </IconButton>
            }
          </Link>
      <IconButton onClick={setState}>
      <MenuOpenRoundedIcon style={{color:'white'}} />
       </IconButton>    
        
    </Toolbar>
    </AppBar>
    <DrawerRight state={DState} setStateFalse={setStateFalse} />

       </div>
}
export default Header;