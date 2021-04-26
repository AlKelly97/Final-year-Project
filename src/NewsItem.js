import React from 'react'
import './App.css'
const NewsItem = ({title, desription, url, urlToImage}) => {
    return (
        <div className ='news-item'>
            <img className ='news-img' src={urlToImage} alt=""/>
            <h3><a href={url}>{title}</a></h3>
            <p>{desription}</p>
        </div>
    )
}

export default NewsItem;