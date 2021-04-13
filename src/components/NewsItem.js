import React from 'react'

const NewsItem = ({title, desription, url, urlToImage}) => {
    return (
        <div>
            <img src={urlToImage} alt=""/>
            <h3><a href={url}>{title}</a></h3>
            <p>{desription}</p>
        </div>
    )
}

export default NewsItem;