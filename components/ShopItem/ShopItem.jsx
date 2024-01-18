"use client"

import React, {useEffect, useState} from 'react';


import ImageHandler from "@/components/ImageHandler/ImageHandler";
import StarRatings from "react-star-ratings/build/star-ratings";
import SpecialHandler from "@/components/SpecialHandler/SpecialHandler";
import Link from "next/link";



export default function ShopItem(props)  {

    const [colorIndex, setColorIndex] = useState(0);

    //get image ref names


    //get random number for rating
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    const randomReviewCount = 25;
    const randomRank = 4;
    const randomSale = 20;

    const id = props.id;
    const colorArr = getColors(props.variants);
    const imgObjArr = getImageObj(props.variants);
    const imgRefArr = getImages(imgObjArr[colorIndex])
    const imgURLArr = URLArrGen(imgRefArr[0]);






 console.log(imgRefArr);
    return (
        <div>
            <div className="shopItemContainer">
                <div className="newTagContainer">
                    {props.new
                        ?
                        <p className="newTagContent">New Arrival</p>
                        :
                        <div></div>
                    }

                </div>
                <div className="shopItemImageContainer">
                    <Link href={props.link}>
                        <div className="image1">
                            <ImageHandler
                                imgName={imgURLArr[0]}
                                title={props.title}
                            />
                        </div>
                        <div className="image2">
                            <ImageHandler
                                imgName={imgURLArr[1]}
                                title={props.title}
                            />
                        </div>
                    </Link>
                </div>
                <div className="shopItemColorContainer">
                    {colorArr.map((color, index) => (
                        <button
                            onClick={() => setColorIndex(index)}
                            key={index}
                            style={{
                                backgroundColor: color,
                                width: '30px',
                                height: '30px',
                                border: '2px solid black',
                                margin: '10px',
                                padding: '20px',
                                cursor: 'pointer'
                            }}

                        ></button>
                    ))}
                </div>

                <div className="shopItemTextContainer">
                    <Link href={props.link}>
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
                    </Link>
                </div>

                <div className="saleTagContainer">
                    {props.special
                        ?
                        <p className="saleTagContent">Sale {randomSale}%</p>
                        :
                        <div></div>
                    }

                </div>
            </div>
        </div>
    );
};

function getColors(data){
    const colorArr = [];
    data.map((item, i) => (
        colorArr.push(item.color)
    ))

    return colorArr;
}
function URLArrGen(props){
    const URLArr = [];
    props.map((i) => (
        URLArr.push(getImgURL(i))
    ))
    return URLArr;
}
function getImgURL(props){
    const img1slice = props.slice(6);
    const lastDashIndex = img1slice.lastIndexOf("-");
    const img1FileName = img1slice.slice(0, lastDashIndex) + "." + img1slice.slice(lastDashIndex + 1);
    return 'https://cdn.sanity.io/images/xx2b8ubw/production/'+ img1FileName;
}
function getImageObj(data){
    const dataArr = [];
    data.map((item, i) => (
        dataArr.push(item)
    ))
    const imgObjArr =
        dataArr.map((item,i) => (
            Object
                .keys(item)
                .map(k => item[k])
        ))
    return imgObjArr;
}
function getImages(data){
    const dataArr = [];
    data.map((item, i) => (
        dataArr.push(item)
    ))
    const imgObj = dataArr.filter(Array.isArray);
    const imgObjObj =
        imgObj.map((item,i) => (
            Object
                .keys(item)
                .map(k => item[k])
        ))
    const arr =
    imgObjObj.map((item, i) => (
        Object
            .keys(item)
            .map(k => item[k].asset._ref)
    ))

    return arr;
}
