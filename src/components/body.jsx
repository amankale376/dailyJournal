import React from 'react';
import { Container, Typography ,CssBaseline } from '@material-ui/core';
import Grids from './grid';
import Form from './form';
import AboutGrid from './aboutGrid';
import DeleteGrid from './deleteGrid';
import SignupForm from './Signup';
import jsonwebtoken from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import MyDetails from './details';

function Body(props){
const history = useHistory();
const token = localStorage.getItem('token');
let checkLogin;
try {
    checkLogin = jsonwebtoken.verify(token,process.env.REACT_APP_JWT_SECRET);
} catch (error) {
    checkLogin = false;
}
function display(){
    if(props?.pageType ==="PostBlog"){
        if(checkLogin){
            return <Form/> ;
        }
        history.push('/');
    }else if(props.pageType ==="home")
    {       if(props.Content.length< 1){
        return  <Grids title={"No posts Found!!"} content={"please create a new Post!"}  />; 
    }else{
        return props.Content.map((element)=>{
            return  <Grids title={element.title} id={element._id} 
            content={element.content} date={element.createdAt} user={element.user} comments={element.comments} />;
        })
    }
       
    }else if(props.pageType === "deletePost"){
        if(checkLogin){
        if(props.Content.length<1){
            return  <DeleteGrid title={"No posts Found!!"} content={"please create a new Post!"} foundPost={false} />;
        }else{
        return props.Content.map((element,index)=>{
            return  <DeleteGrid key={index} _id={element._id} title={element.title} 
            content={element.content} date={element.createdAt} user={element.user} comments={element.comments} foundPost={true}/>;
        }) 
    }}
    history.push('/');
    }else if(props.pageType==="Signup"){
        return <SignupForm/>
    }else if(props.pageType ==="about"){
        return props.Content.map((element)=>{
            return  <AboutGrid title={element.title} id={element._id} 
            content={element.content} date={element.createdAt} user={element.user} />;
        })
    }else if(props.pageType ==="myDetails"){
        if(checkLogin){
        return <MyDetails/>
    }
    history.push('/');
    }
}
return <>
    <Container maxWidth="xl">
        <CssBaseline />
        <div > 
        <Typography variant='h2'>
         <p className="Heading">{props.heading}</p>  
        </Typography>
        </div>
    </Container>
    <Container maxWidth="lg" >
    {display()}
    </Container>
    </>
}

export default Body;