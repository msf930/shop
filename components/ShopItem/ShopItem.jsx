"use client"

import React,  from 'react';


import ImageHandler from "@/components/ImageHandler/ImageHandler";
import StarRatings from "react-star-ratings/build/star-ratings";
import SpecialHandler from "@/components/SpecialHandler/SpecialHandler";



export default async function ShopItem(props)  {
    //get image ref names
    const img1RefName = props.img1.asset._ref;
    const img2RefName = props.img2.asset._ref;

    //get random number for rating
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    const randomReviewCount = getRandomInt(1, 30);
    const randomRank = getRandomInt(3.00,5.00);
    const randomSale = getRandomInt(15,30)


    return (
        <div>
            <div className="shopItemContainer">
                <div className="shopItemImageContainer">
                    <div className="image1">
                        <ImageHandler
                            imgName={img1RefName}
                            title={props.title}
                        />
                    </div>
                    <div className="image2">
                        <ImageHandler
                            imgName={img2RefName}
                            title={props.title}
                        />
                    </div>

                </div>
                <div className="shopItemTextContainer">
                    <p className='shopItemTitle'>{props.title}</p>
                    <p className='shopItemDetail'>{props.detail}</p>
                    {props.special
                        ?
                        <SpecialHandler price={props.price} sale={randomSale}/>
                        :
                        <p className='shopItemPrice'>${props.price}.00</p>
                    }

                    <div className="ratingContainer">
                        <div className='starRatingContainer'>
                            <StarRatings
                                rating={randomRank}
                                starRatedColor="#ADA18F"
                                starEmptyColor="#CFC7BC"
                                numberOfStars={5}
                                name='rating'
                                starDimension="15px"
                                starSpacing="2px"
                            />
                        </div>
                        <p className="starRatingCount">({randomReviewCount})</p>
                    </div>
                </div>
                <div className="saleTagContainer">
                    <p className="saleTagContent">Sale {randomSale}%</p>
                </div>
            </div>
        </div>
    );
};

