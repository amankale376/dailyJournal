import React from 'react';
import Body from '../components/body';
import Header from '../components/header';
import Footer from '../components/footer';
import Axios from 'axios';



function Home(){
    const [posts, setPosts] = React.useState([]);

    function getPosts(){
         Axios.get("http://localhost:3001/getAllPosts")
         .then((response)=>{
                console.log({response})
               response.data.allPosts.map((e)=>{
                   return setPosts((prevValue)=>{
                    return [...prevValue,e];
               });
               });
          

         });

    }
    React.useEffect(()=>{
           return getPosts();
    },[]);
   
    return <>
     <Header />
    <Body heading="All Posted Blogs " Content={posts} pageType="home" />
     <Footer/>
    </>
}

export default Home;