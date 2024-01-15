import React from 'react';

const SpecialHandler = (props) => {
    const salePrice = Math.round(props.price * (1 - (props.sale/100)));
    return (
        <div className="specialContainer">
            <p className='shopItemPriceSpecial'>${salePrice}.00</p>
            <p className='shopItemPriceSpecialOld'>${props.price}.00</p>
        </div>
    );
};

export default SpecialHandler;