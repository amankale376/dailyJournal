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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import jsonwebtoken from 'jsonwebtoken';


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

 function MyDetails(props) {
     const token = localStorage.getItem('token');
     let checkToken;
     try {
         checkToken = jsonwebtoken.verify(token, process.env.REACT_APP_JWT_SECRET)
     } catch (error) {
         checkToken = false;
     }
  const history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = React.useState(checkToken?.username);
  const [name, setName] = React.useState(checkToken?.name); 
  const [email, setEmail] = React.useState(checkToken?.email); 

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  
  }; 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return  
    }
    setOpen(false);
    localStorage.setItem('token',null);
    history.push('/');
  };
  function editDetailsSubmit(){
Axios.post("http://localhost:3001/editUser",{
  username,
  email,
  name
  },{headers:{"Authorization":`Bearer ${token}`}})
.then((response)=>{
  if(response?.data?.success){
    handleClick()
  }
}).catch((e)=>{
  if(e?.response?.data?.message === 'Unauthorized'){
    alert("Please check your login credentials");
  }else if(e?.response?.data?.message === 'Forbidden resource'){
    alert("Admin can not change Details")
}else{
  alert(e?.response?.data?.message);
  }
});

  }

  return (
    <> 
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Edit Completed!
        </Alert>
      </Snackbar>
      
      <div className="bodyGrid">
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
       
          <Paper className={classes.paper}>
              <Typography varient='h4'>Enter ID</Typography>
          <Divider/>
          <form  noValidate autoComplete="off">
          <div className={classes.form} >
      
      <TextField id="" onChange={(e)=>{
        setUsername(e.target.value);
      }} value={username} className={classes.formContent} label="Username" helperText= "Current Unique username"/>
      
      <TextField id=""onChange={(e)=>{
        setName(e.target.value);
      }} value={name}  className={classes.formContent} label="Name" helperText="Current name" />
      
      <TextField id=""onChange={(e)=>{
        setEmail(e.target.value);
      }} value={email}  className={classes.formContent} type ="email" label ="Email" helperText="Current email address" />
      
     </div>
     
     <Divider/>
      <Button onClick={editDetailsSubmit} variant="outlined" className={classes.formButton}  >Edit</Button>
    </form>
    
       
          </Paper>
        </Grid>
      </Grid>
    </div>


    </div>
    
    </>
  );
}
export default MyDetails;