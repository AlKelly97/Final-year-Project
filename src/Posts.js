import { API,graphqlOperation} from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import { listBlogs } from './graphql/queries'
import { createBlog, deleteBlog } from './graphql/mutations'
import { withAuthenticator,AmplifySignOut } from '@aws-amplify/ui-react'


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
            //window.location.reload()
        }

    return (
        
        <div>
              <nav>
        <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/News">News</a></li>
        <li><a href="tips.html">Lockdown Tips</a></li>
        <li><a href="/Posts">Discussions</a></li>
    </ul>
        </nav>


            <AmplifySignOut button-text="Custom Text"></AmplifySignOut>
    {
        Blogs.map((Blog, index) => (

        <div> 
                <li key={Blog.id ? Blog.id : index}>
                        {Blog.name}
                </li>
                
                <a href={`Content/${Blog.id}`}>click me</a>

                <button variant="danger" value= {Blog.id} onClick={removeBlog}>Delete Blog</button> 
        </div>
          
    )
    )
    }
       <input

        onChange={event => setInput('name', event.target.value)}
        /* Add in some style for the form inputs?? */
        value={formState.name}
        placeholder="Name"
      />
        <button onClick={addBlog}>Create Blog</button>
        </div>
    )
}

export default withAuthenticator (Posts)


