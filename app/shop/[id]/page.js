"use client"

import React, {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation'
import PortableText from "react-portable-text"
import SwiperHandler from "@/components/SwiperHandler/SwiperHandler";
import StarRatings from "react-star-ratings/build/star-ratings";
import ARCHER from '../../../public/ARCHER.png';
import Image from "next/image";
import { LiaLocationArrowSolid,LiaFacebookSquare, LiaInstagram, LiaYoutubeSquare } from "react-icons/lia";
import CommentHandler from "@/components/CommentHandler/CommentHandler";



export default function Page() {


    const [productData, setProductData] = useState({});
    const [variantData, setVariantData] = useState([]);
    const [variantImageData, setVariantImageData] = useState([]);
    const [contentData, setContentData] = useState([]);
    const [descriptionData, setDescriptionData] = useState("");
    const [reviewData, setReviewData] = useState([]);
    const [postData, setPostData] = useState([]);

    const [colorIndex, setColorIndex] = useState(0);

    const [randomNum, setRandomNum] = useState(0);
    const [randomReviews, setRandomReviews] = useState(0);

    const [rateLoading, setRateLoading] = useState(true);
    const [randomLoaded, setRandomLoaded] = useState(false);
    const [postLoading, setPostLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);

    const [visibleItems, setVisibleItems] = useState(3);
    const itemsToAdd = 3;

    const loadMoreItems = () => {
        if(reviewData.length - visibleItems === 1){
            setVisibleItems(prevVisibleItems => prevVisibleItems + 1);
        } else if (reviewData.length - visibleItems === 2) {
            setVisibleItems(prevVisibleItems => prevVisibleItems + 2);
        } else {
            setVisibleItems(prevVisibleItems => prevVisibleItems + itemsToAdd);
        }
    };


    const pathname = usePathname();
    const id = pathname.slice(6);
    const imagesData = getVariantImages(variantImageData);
    const imagesURLArr = URLArrGen(imagesData);
    const colorsArr = getColors(variantData);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();
                setProductData(result.result[0]);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchVariantData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();

                setVariantData(result.result[0].productVariants);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVariantData();
    }, [id,colorIndex]);

    useEffect(() => {
        const fetchVariantImageData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();

                setVariantImageData(result.result[0].productVariants[colorIndex].variantImages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVariantImageData();
    }, [id,colorIndex]);

    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();

                setContentData(result.result[0].content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchContentData();
    }, [id]);

    useEffect(() => {
        const fetchDescriptionData = async () => {
            try {
                const response = await fetch(`https://xx2b8ubw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id%20%3D%3D%20"${id}"%5D`);
                const result = await response.json();

                setDescriptionData(result.result[0].description);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDescriptionData();
    }, [id]);

    useEffect(() => {
        const getRandomNum = () => {
            setRateLoading(true);
            const num = getRandomInt(3,5);
            const float = getRandomFloat();
            const total = num + float;
            setRandomNum(total);
            setRateLoading(false);
        };

        getRandomNum();
    }, []);

    useEffect(() => {
        const getRandomRatingCount = () => {
            setRandomLoaded(false);
            const num = getRandomInt(1,14);
            setRandomReviews(num);
            setRandomLoaded(true);
        };
        getRandomRatingCount();
    }, []);

    useEffect(() => {
        const fetchReviewData = async () => {
            setCommentLoading(true);
            try {
                const response = await fetch("https://dummyjson.com/comments");
                const result = await response.json();

                setReviewData(result.comments.slice(0, 15 - randomReviews));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setCommentLoading(false);
        };

        fetchReviewData();
    }, [randomReviews]);

    useEffect(() => {
        const fetchCommentData = async () => {
            setPostLoading(true);
            try {
                const response = await fetch("https://dummyjson.com/posts");
                const result = await response.json();

                setPostData(result.posts.slice(0, 15 - randomReviews));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setPostLoading(false);
        };

        fetchCommentData();
    }, [randomReviews]);

// console.log(reviewData);



    return (
        <div className="productPage">
                <div className="productTop">
                    <a className="productTopBtn" href="/#t2">
                        <LiaLocationArrowSolid className="productTopIcon"/>
                        <p className="productTopBtnText">Back to Shop</p>
                    </a>
                    <a href="/">
                        <Image
                            src={ARCHER}
                            alt="logo"
                            height={100}
                            width={100}
                        >
                        </Image>
                    </a>
                </div>
            <div className="productContainer">
                <div className="shopImgContainer">
                    <SwiperHandler swiperArr = {imagesURLArr}/>
                </div>
                <div className="productInfo">
                    <h1> {productData.title}</h1>
                    <h2> {productData.detail}</h2>
                    <hr className="productInfoDivider"/>
                    <p className="productDescription">{descriptionData}</p>
                    <hr className="productInfoDivider"/>
                    <div className="priceRatingContainer">
                        <h2 className="price"> ${productData.price}.00</h2>
                        {!rateLoading
                            ? <div className="productRatingContainer">
                                <StarRatings
                                    rating={randomNum}
                                    starRatedColor="#5C5140"
                                    starEmptyColor="#CFC7BC"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                                <p>{randomNum} |</p>
                                <p>{15 - randomReviews} reviews</p>
                            </div>
                            :
                            <div></div>
                        }
                    </div>

                    <hr className="productInfoDivider"/>
                    <h2 style={{textTransform: 'capitalize'}}>
                        Color: {colorsArr[colorIndex]}
                    </h2>

                    <div className="colorContainer">
                        {variantData.map((color, index) => (
                            <button
                                onClick={() => setColorIndex(index)}
                                key={index}
                                style={{
                                    backgroundColor: color.color,
                                    width: '50px',
                                    height: '50px',
                                    border: '2px solid black',
                                    margin: '10px',
                                    padding: '20px',
                                    cursor: 'pointer'
                                }}
                            ></button>
                        ))}
                    </div>
                    <div className="buyBtnContainer">
                        <button className="buyBtn">Buy Now</button>
                    </div>
                </div>
            </div>
            {
                !postLoading && !commentLoading
                ?
                    <div className="reviewContainer">
                        {reviewData.length < 3
                            ?
                            <p className="reviewCounter">{reviewData.length}/{15-randomReviews} Reviews</p>
                            :
                            <p className="reviewCounter">{visibleItems}/{15-randomReviews} Reviews</p>
                        }
                        <hr className="reviewHeaderDivider"/>
                        {reviewData.slice(0, visibleItems).map((item,i) => (
                            <CommentHandler
                                user={item.user.username}
                                body={postData[i].body}
                                title={postData[i].title}
                                key={i}
                            />
                        )) }
                        {visibleItems < reviewData.length && (
                            <button className="loadBtn" onClick={loadMoreItems}>Load More</button>
                        )}
                    </div>
                :
                    <div></div>
            }
            <div className="footerContainer">
                <a href="/">
                    <Image
                        src={ARCHER}
                        alt="logo"
                        height={100}
                        width={100}
                        className="footerLogo"
                    >
                    </Image>
                </a>
                <div className="footerIconContainer">
                    <LiaFacebookSquare className="footerIcon"/>
                    <LiaInstagram className="footerIcon"/>
                    <LiaYoutubeSquare className="footerIcon"/>
                </div>
                <div className="phone">303-245-3390</div>
                <div className="links">
                    <a href="/">Home</a>
                    <a href="/#t2">Shop</a>
                    <a href="/#t3">Media</a>
                    <a href="/#t4">About</a>
                    <a href="/#t5">Contact</a>
                </div>

            </div>

        </div>
    );
};
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
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function getRandomFloat(){
    const min = Math.ceil(0);
    const max = Math.floor(9);
    return (Math.floor(Math.random() * (max - min) + min)/10);
}
function getColors(props){
    const colorArr = [];
    props.map((color, i) => (
        colorArr.push(props[i].color)
    ))
    return colorArr;
}
function getVariantImages(data){

    const itemArr = [];
        itemArr.push(data)
    const imgObjArr =
    itemArr.map((item,i) => (
        Object
            .keys(item)
            .map(k => item[k].asset._ref)
    ))
    const imgArr = imgObjArr[0];
    return imgArr;
}
// function loadMoreItems(){
//     setVisibleItems(prevVisibleItems => prevVisibleItems + itemsToAdd);
// };
