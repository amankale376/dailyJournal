import React from 'react';
import Header from '../components/header';
import Body from '../components/body';
import Footer from '../components/footer';

let blogs =[];
const blog = {
    user:{
        username:'admin'
    },
    title:"Hi! I'm Aman Your friendly neighbourhood coder.",
    content: "This project will help people to keep track of their knowledge safely and securely.",
    createdAt: new Date('Sun May 22 2022').toLocaleDateString()
}
blogs.push(blog);

function About(){
    return <>
    <Header />
   <Body heading="About Author" Content={blogs} pageType="about" />
    <Footer/>
   </> ;

}


export default About;