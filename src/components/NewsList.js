import NewsItem from './NewsItem'
import React, { useEffect, useState } from 'react'
import Axios from 'axios';

//Using NewsList to list all articles in the console.
const NewsList = () => {
        const [articles, setArticles] = useState([]);

        useEffect(() => {
            const getArticles = async () => {
                //Can add BBC News and NY times to the API account.
                //Max 100 requests per 24 hours
                const res = await Axios.get('http://newsapi.org/v2/top-headlines?q=Coronavirus&country=IE&category=health&pageSize=4&apiKey=d8e5c413969144569184d0a7433888b8');
                //('http://newsapi.org/v2/everything?q=coronavirus&sources=the-irish-times,bbc-news&apiKey=d8e5c413969144569184d0a7433888b8')
                setArticles(res.data.articles);
                console.log(res)
            };

            getArticles();

        }, []);
//Mapping the elements "title, description, url, urltoImage" to elements in the browser
    return( 
        <div>
            {articles.map(({title, description, url, urlToImage}) => (
                <NewsItem   title={title} desription={description} url={url} urlToImage={urlToImage}    />
            ))}
                
        </div>
    )
};
export default NewsList;