import React from 'react';
import Body from '../components/body';
import Header from '../components/header';
import Footer from '../components/footer';
import Axios from 'axios';
import { Backdrop, Button, CircularProgress,} from '@material-ui/core';




function Home(){
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [offset, setOffset] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(false);
    const [backdropOpen, setBackdropOpen] = React.useState(true);
    function getPosts(){
         Axios.get("http://localhost:3001/getAllPosts/?offset="+offset)
         .then((response)=>{
               response.data.allPosts.map((e)=>{
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
      getPosts();
    }
    React.useEffect(()=>{
      return getPosts(offset);
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
      {backdropOpen?<></>:
      <>
    <Body heading="All Posted Blogs " Content={posts} pageType="home" />

    {hasMore?
    <Button onClick={nextPage}>{"Load More.."}</Button>
    :<></>}
    
    </>
  }
     <Footer/>
    </>
}

export default Home;
