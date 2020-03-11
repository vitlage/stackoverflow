import React from 'react';

const SearchItem = ({data}) => {

    const { question_id, title, score, creation_date, link: question_link,
            owner: { reputation, display_name, profile_image, link : owner_link }
          } = data;

    const transformDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDay();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return `${month} ${day}, ${year} ${hours}:${minutes}`;
    };

    return (
        <li className="results">
            <img src={profile_image} alt="" className="image"/>
            <div className="main-details">
                <div className="main-title">{title} | Score {score}</div>
                <div className="sub-details">{transformDate(creation_date)}, Reputation: {reputation}, {display_name}</div>
                <div>Link to owner: <a href={owner_link}>{owner_link}</a></div>
                <div>Link to question: <a href={question_link}>{question_link}</a></div>
            </div>
        </li>
    );
};

export default SearchItem;