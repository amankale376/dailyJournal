import React from 'react';
import Body from '../components/body';
import Header from '../components/header';
import Footer from '../components/footer';
import Axios  from 'axios';

function DeletePost(){
    const [posts, setPosts] = React.useState([]);
    const token = localStorage.getItem('token');
    console.log({token});
    function getBlogs(){
         Axios.get("http://localhost:3001/getUserPosts",{headers:{'Authorization':`Bearer ${token}`}})
         .then((response)=>{
               response?.data?.posts?.map((e)=>{
                   return setPosts((prevValue)=>{
                    return [...prevValue,e];
               });
               });
         });
    }

    React.useEffect(()=>{
           return getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
   
    return <>
     <Header />
    <Body heading="Your Posts " Content={posts} pageType="deletePost"/>
     <Footer/>
    </>
}

export default DeletePost;