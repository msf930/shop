"use state"

import React, {useEffect, useState} from 'react';
import StarRatings from "react-star-ratings/build/star-ratings";

export default function CommentHandler(props){

    const [randomNumber, setRandomNumber] = useState(0);
    const [randomDate, setRandomDate] = useState("");




    useEffect(() => {
        const getRandomRating = () => {
            const num = getRandomRate(3,5);
            setRandomNumber(num);
        };
        getRandomRating();
    }, []);

    useEffect(() => {
        const getRandomDateTime = () => {
            const postDate = getRandomDate();
            const monthNum = postDate.getMonth();
            const monthString = monthNum.toString();
            const dayNum = postDate.getDate();
            const dayString = dayNum.toString();
            const yearNum = postDate.getFullYear();
            const yearString = yearNum.toString();
            const dateString = monthString.concat("/",dayString,"/",yearString);
            setRandomDate(dateString);
        };
        getRandomDateTime();
    }, []);


    return (
        <div>
            <div className="reviewHandlerContainer">
                <div className="reviewProfile">
                    <div className="userIcon">
                        <span>{props.user.slice(0,1)}</span>
                    </div>
                    <div className="profileText">
                        <h1>{props.user}</h1>
                        <p>Verified User</p>

                    </div>
                </div>
                <div>
                    <div className="ratingDateContainer">
                        <StarRatings
                            rating={randomNumber}
                            starRatedColor="#5C5140"
                            starEmptyColor="#CFC7BC"
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing="2px"
                        />
                        <div className="commentDate">
                            <h2>{randomDate}</h2>
                        </div>

                    </div>
                    <div className="commentBody">
                        <h1>{props.title}</h1>
                        <p>{props.body}</p>
                    </div>
                </div>
            </div>
            <hr className="productInfoDivider"/>
        </div>
    );
};


function getRandomRate(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomDate(){
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2024-01-31');
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    const newDate = new Date(randomTimestamp)
    return newDate;
}