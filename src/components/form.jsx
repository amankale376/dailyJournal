import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  formTitle: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
  formButton: {
    '& > *': {
      width: '50%',
    },
    marginLeft:'.8rem',
    marginTop:'.5rem',
  
  },
  formContent: {
    '& > *': {
      margin: theme.spacing(1),
      width: '90%',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

 function Grids(props) {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const classes = useStyles();

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState(''); 

  const [open, setOpen] = React.useState(false);
  const [faliureOpen, setfaliureOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  }; 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return  
    }
    setOpen(false);
    history.push("/");
  };
  const handleClickfaliure = () => {
    setfaliureOpen(true);
  }; 
  const handleClosefaliure = (event, reason) => {
    if (reason === 'clickaway') {
      return  
    }
    setfaliureOpen(false);
  };
  function submitPost(){
    if(title === "" || content === ""){
      handleClickfaliure()
    }
    else
    {
Axios.post("http://localhost:3001/createPost",{
  title:title,
  content:content
  },{headers:{"Authorization":`Bearer ${token}` }})
.then((response)=>{
  if(response?.data?.success === true ){
    handleClick()
  }
}).catch((e)=>{
  if(e?.response?.data?.message === 'Unauthorized'){
    alert("Please check your login credentials");
  }else{
  alert(e?.response?.data?.message);
  }
});
}
  }

  return (
    <> 
      <Snackbar open={faliureOpen} autoHideDuration={6000} onClose={handleClosefaliure}>
        <Alert onClose={handleClosefaliure} severity="error">
          title and content can not be empty.
        </Alert>
      </Snackbar>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Blog Posted!!
        </Alert>
      </Snackbar>
      
      <div className="bodyGrid">
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
       
          <Paper className={classes.paper}>
              <Typography varient='h4'>Make a new Post Here</Typography>
          <Divider/>
          <form  noValidate autoComplete="off">
          <div className={classes.form} >
      <TextField id="" onChange={(e)=>{
        setTitle(e.target.value);
      }} className={classes.formTitle} label="Title" 
      value={title}
      />
      
      <TextField id=""onChange={(e)=>{
        setContent(e.target.value);
      }} value={content}  className={classes.formContent} label="Content" multiline="true" />
     </div>
     <Divider/>
      <Button onClick={submitPost} variant="outlined" className={classes.formButton} >Post</Button>
    </form>
          </Paper>
        </Grid>
      </Grid>
    </div>


    </div>
    
    </>
  );
}
export default Grids;