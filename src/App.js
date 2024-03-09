import {Router , Routes ,Route, Link, useNavigate} from "react-router-dom"
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost";



function App() {

  const [posts , setPosts] = useState ([]);

  const [search ,setSearch] = useState('');

  const [searchResults, setSearchResults]  = useState([]);

  useEffect(()=>{
    const fetchPosts = async () =>{
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err){
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else{
          console.log(`Error:${err.message}`);
        }
      }
    }
    fetchPosts();
  },[])

  useEffect(() => {
    const filteredResults = posts.filter((post) => {
      return (
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    });
     setSearchResults(filteredResults.reverse());
  }, [posts, search]);
  

  const [postTitle ,setPostTitle] = useState('');

  const [postBody ,setPostBody] = useState('');

  const [editTitle ,setEditTitle] = useState('');

  const [editBody ,setEditBody] = useState('');


  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id +1 :1;
    const datetime = format(new Date(),'MMMM dd , yyyy pp');
    const newpost = {id , title:postTitle,datetime,body:postBody};
    try{
    const response = await api.post('/posts',newpost)
    const allPosts = [...posts,response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/')
    } catch (err){
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else{
        console.log(`Error:${err.message}`);
      }
    } 
  }


  const handleEdit = async (id) =>{
    const datetime = format(new Date(),'MMMM dd , yyyy pp');

    const updatedPost = {id , title:editTitle,datetime,body:editBody};
    
    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
          setPosts(posts.map(posts =>posts.id ? {...response.data} : posts));
          setEditTitle('');
          setEditBody('');
          navigate('/');
    }catch (err){
      console.log(`Error:${err.message}`);
    }
    
  }

  const handleDelete = async (id) =>{
    try{
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(posts =>posts.id !== id);
      setPosts(postsList)
      navigate('/')
    }catch (err){
        console.log(`Error:${err.message}`);
      }
    }

  return (
    <div className="App">
   
   
      <Header title="King Media"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
         <Route path='/'element={ <Home posts={searchResults}/>} />

         <Route path='post'> 
         <Route index element={ <NewPost 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}/>}
          />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
          </Route>
          
          <Route path="/edit/:id" element={<EditPost 
             handleEdit={handleEdit}
             editBody={editBody}
             setEditBody={setEditBody}
             editTitle={editTitle}
             posts={posts}
             setPosts={setPosts}
             setEditTitle={setEditTitle} />} />
                   

          <Route path='about' element={<About />} />
          <Route path ='*' element={<Missing />} />
      </Routes>
      <Footer />
    
    </div>
  );
}

export default App;
