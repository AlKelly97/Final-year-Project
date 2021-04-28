import { API,graphqlOperation} from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import { listBlogs } from './graphql/queries'
import { createBlog, deleteBlog } from './graphql/mutations'
import { withAuthenticator,AmplifySignOut } from '@aws-amplify/ui-react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import './App.css'



const initialState = {
    name: ''
}




const Posts = () => {
        const [formState, setFormState] = useState(initialState)
        const [Blog, setBlogs] = useState([])
        const [Blogs, SetBlogs] = useState([])
        
        useEffect(() => {
            fetchBlogs()
        }, [])



        //Possible setInput Function Goes here...
        function setInput(key, value) {
            setFormState({
                ...formState,
                [key]: value
            })
        }
        //Creating the FetchBlogs Async Function..

        async function fetchBlogs() {
            try {
                const BlogData = await API.graphql(graphqlOperation(listBlogs))
                const Blog = BlogData.data.listBlogs.items
                SetBlogs(Blog)
                console.log(Blog)
            } catch (err) {
                console.log('error fetching blogs ')
            }
        }

        async function addBlog() {
            try {
                if (!formState.name) return
                const makeBlog = {
                    ...formState
                }
                setBlogs([...Blog, makeBlog])
                setFormState(initialState)
                console.log(formState)
                await API.graphql(graphqlOperation(createBlog, {
                    input: makeBlog
                }))
            } catch (err) {
                console.log('error creating Blog Post:', err)
            }
           window.location.reload()
        }


        async function removeBlog(event) {
            let val = event.target.value;
            console.log(val)
            const DeleteBlog = await API.graphql(graphqlOperation(deleteBlog, {
                input: {
                    id: val
                }
            }));
            console.log(DeleteBlog)
            window.location.reload()
        }

    return (
        
        <div>
                    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet"></link>

              <nav>
        <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/News">News</a></li>
       
        <li><a href="/Posts">Discussions</a></li>
    </ul>
        </nav>


            <AmplifySignOut button-text="Custom Text"></AmplifySignOut>

            <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" >
        Home
      </Link>
     
      <Typography color="textPrimary">Posts</Typography>
    </Breadcrumbs>

    {
        Blogs.map((Blog, index) => (

        <div className='contentContainer'> 
                <li key={Blog.id ? Blog.id : index}>
                        <h2>{Blog.name}</h2>
                </li>
              <div className = "Buttons">
                <Button  variant="outlined" href={`Content/${Blog.id}`}>View Content</Button>
                <button style={styles.button}value= {Blog.id} variant="outlined" onClick={removeBlog}>DELETE BLOG</button>       

               
               </div> 
        </div>
        
          
    )
    )
    }
   
    <div className = "FormInput">
      <TextField id="filled-basic" label="Add A Blog!" variant = "filled"

        onChange={event => setInput('name', event.target.value)}
        /* Add in some style for the form inputs?? */
        value={formState.name}
        placeholder="Name"
        
      >
        </TextField>      
        <Button variant="outlined" onClick={addBlog}>Create Blog</Button>
      
        </div>
        
        </div>
    )
}


const styles={
    button: { backgroundColor: "Transparent", color: 'Black', fontSize: 15, padding: '7px 0px', borderRadius: '4px'}
            
            }

export default withAuthenticator (Posts)


