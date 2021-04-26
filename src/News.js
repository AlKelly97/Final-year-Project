//Importing the necessary dependancies for the project
import React, {Component} from 'react'
import Axios from 'axios';
import Select from 'react-select'
import NewsList from './NewsList';

export default class News extends Component {
//Using a constructor to handle state management when rendering the browser.
    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
            name: '',
        }
    }
    //Similar to the NewsList component, where we use an Axios get request to fetch our data
    async getArticles() {
        const res = await Axios.get('https://newsapi.org/v2/everything?q=coronavirus&domains=thesun.co.uk,irishtimes.com&pageSize=20&apiKey=d8e5c413969144569184d0a7433888b8')
        const articles = res.data.articles

        //Mapping our data to local variables.
        const SetArticles = articles.map(d => ({

            "label": d.title,
            "body": d.description,
            "link": d.url,
            "photo": d.urlToImage,
            "source": d.source.name
        }))

        this.setState({
            selectArticles: SetArticles
        })

    }

    handleChange(e) {
        this.setState({
            title: e.label,
            description: e.body,
            url: e.link,
            urlToImage: e.urlToImage,
            source: e.source
        })
    }

    componentDidMount() {
        this.getArticles()
    }

    render() {
            console.log(this.state.selectArticles)
      return (

        <div>

 <nav>
    <ul>

            <li><a href="/">Home</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="tips.html">Lockdown Tips</a></li>
            <li><a href="/Posts">Discussions</a></li>

    </ul>

</nav>

          
    <Select options={this.state.selectArticles} placeholder = "Select A News Article" onChange={this.handleChange.bind(this)} />
         <p><u><strong>{this.state.source}</strong></u></p>

         <p><strong>{this.state.title}</strong></p>
         

         <p>{this.state.description}</p>
         

         <p>{this.state.url}</p>
      

      <NewsList/>

        </div>
      )
    }
  }


//export default News;


