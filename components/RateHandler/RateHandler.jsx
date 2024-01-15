"use client"

import React from 'react';

const RateHandler = () => {
    const randomReviewCount = (Math.floor(Math.random() * 30) + 1);
    const reviews = randomReviewCount.toString();
    return (
        <div>
            ({reviews})
        </div>
    );
};

export default RateHandler;