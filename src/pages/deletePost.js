import React from 'react';
import Body from '../components/body';
import Header from '../components/header';
import Footer from '../components/footer';
import Axios  from 'axios';
import { Backdrop, Button, CircularProgress } from '@material-ui/core';

function DeletePost(){
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [offset, setOffset] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(false);
    const [backdropOpen, setBackdropOpen] = React.useState(true);
    const token = localStorage.getItem('token');
    function getBlogs(){
         Axios.get("http://localhost:3001/getUserPosts/?offset="+offset,{headers:{'Authorization':`Bearer ${token}`}})
         .then((response)=>{
               response?.data?.posts?.map((e)=>{
                   return setPosts((prevValue)=>{
                    return [...prevValue,e];
               });
               });
               setPage(page + 1); 
               setOffset(page*10);
              setHasMore(response.data.hasMore);
               setBackdropOpen(false);
         }).catch((e)=>{
            if(e?.response?.data?.message === 'Unauthorized'){
              alert("Please check your login credentials");
            }else{
            alert(e?.response?.data?.message);
            }
          });
    }
    function nextPage(){
      getBlogs();
    }
    React.useEffect(()=>{
           return getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
   
    return <>
     <Header />
     <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {backdropOpen?<></>:<>
    <Body heading="Your Posts " Content={posts} pageType="deletePost"/>
    {hasMore?
    <Button onClick={nextPage}>{"Load More.."}</Button>
    :<></>}
    </>
  }
     <Footer/>
    </>
}

export default DeletePost;