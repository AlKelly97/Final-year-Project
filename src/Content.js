import React, {Component} from 'react';
import './App.css';
//import update from 'react-addons-update';
import  {API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
//import App from './App';


class fetchBlog extends Component{
  
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state ={
      title:'',
      postBlogId: '',
    };

    
        this.forceUpdate = this.forceUpdate.bind(this);
        this.handleDeleteBlog = this.submit.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this);
      
        
        

  }

  handleChange(blogId, event) {
    this.setState({[blogId]:event.target.value });
    
  }
  async submit() {
    
    const input ={
      title: this.state.title,     
      blogID: this.props.match.params.account    
    }
    console.log(input);

    await API.graphql(graphqlOperation(mutations.createPost, {input: input}))
      .then(data => console.log(data))
      .catch(err => console.log(err));
      this.getBlog(this.props.match.params.account);
      
    }
  
//creating a function to interact with the api
state = {
  blogs: []
}
async getBlog(id){
  
  const oneTodo = await API.graphql(graphqlOperation(queries.getBlog, { id: id }));
  console.log({blogs:oneTodo});
  this.setState({blogs:oneTodo})

}



componentDidMount(){
  console.log(this.props.match.params.account)
  this.getBlog(this.props.match.params.account)
};


async handleDeletePost(event){
  let val = event.target.value;
  console.log(val)
  const removepost = await API.graphql(graphqlOperation(mutations.deletePost, {input: {id:val}}))
  console.log(removepost);
  window.location.reload()
    
  }


async handleUpdatePost(post){
  const postdetails = {
    title: this.state.title,
    //content: this.state.content,
    id: post.id,
    
};
  console.log(postdetails);
  await API.graphql(graphqlOperation(mutations.updatePost, {input: postdetails}))
      .then(data => {
        console.log(data)
this.getBlog(this.props.match.params.account);
})
      .catch(err => console.log(err));
      
     
    }


render() {
  
  if (this.state.blogs) {
    if (this.state.blogs.data) {
      if (this.state.blogs.data.getBlog) {
        if (this.state.blogs.data.getBlog)
        return (
          
        <div>

<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500&display=swap" rel="stylesheet"></link>

<nav>
        <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/News">News</a></li>
        <li><a href="tips.html">Lockdown Tips</a></li>
        <li><a href="/Posts">Discussions</a></li>
    </ul>
        </nav>
         <h3>{this.state.blogs.data.getBlog.name}</h3>
           
        

        <div>
            {this.state.blogs.data.getBlog.posts.items.map(grabPost => 
                                    <li key ={grabPost.id}> <br>
                                        </br><h2>{grabPost.title}</h2>
                                        
                                        <h4>Update this post!</h4>
          <input
              title="title"
              placeholder="Enter a title!"
              onChange={(event) => {this.handleChange('title',event)}}
          />
          
          
          <button variant = "success" value ={grabPost.id} onClick={() => {this.handleUpdatePost(grabPost)}}>
            Update Post
          </button>
                                         
          <button variant="danger" value= {grabPost.id} onClick={this.handleDeletePost}>Delete Post</button> 
                                             
                                    </li> )}
        <div>

      
       <h4>Add a post to this blog!</h4>
          <input
              title="title"
              placeholder="Enter a title!"
              onChange={(event) => {this.handleChange('title',event)}}
          />
          <button value = {this.props.match.params.account} onClick={this.submit}>
            Add
          </button>
         
                                   
</div>
                           

                                  </div>
                                         </div>

       
        );
        
      }
    }
  }

  return <h3>Loading..</h3>;

}

}
export default (fetchBlog)