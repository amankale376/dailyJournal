import React from 'react';
import { Container, Typography ,CssBaseline } from '@material-ui/core';
import Grids from './grid';
import Form from './form';
import DeleteGrid from './deleteGrid';
import SignupForm from './Signup';

function Body(props){
function display(){
    if(props?.pageType ==="PostBlog"){
       return <Form/> ;
    }else if(props.pageType ==="home" || props.pageType ==="about")
    {       if(props.Content.length< 1){
        return  <Grids title={"No posts Found!!"} content={"please create a new Post!"}  />; 
    }else{
        return props.Content.map((element)=>{
            return  <Grids title={element.title} key={element._id} 
            content={element.content} date={element.createdAt} pictures={element.pictures} user={element.user} comments={element.comments}/>;
        })
    }
       
    }else if(props.pageType === "deletePost"){
        if(props.Content.length<1){
            return  <DeleteGrid title={"No posts Found!!"} content={"please create a new Post!"} foundPost={false} />;
        }else{
        return props.Content.map((element,index)=>{
            return  <DeleteGrid key={index} _id={element._id} title={element.title} 
            content={element.content} date={element.createdAt} pictures={element.pictures} user={element.user} comments={element.comments} foundPost={true}/>;
        }) 
    }
    }else if(props.pageType==="Signup"){
        return <SignupForm/>
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
    <Container maxWidth="lg">
    {display()}
    </Container>
    </>
}

export default Body;