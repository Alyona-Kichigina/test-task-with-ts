import React, {useCallback, useState} from 'react';
import {IDataProduct} from "../App";

const CartItem = (props: {
    product: IDataProduct, getRemoveId: (id: number) => void, getPayload: (product: IDataProduct) => void
}) => {
    const {product, product: {title, quantity, id}, getRemoveId, getPayload} = props
    const price = product.price / 100;

    const onMinus = () => {
        if (quantity !== 0) {
            getPayload({...product, quantity: quantity - 1})
        }
    }
    const onPlus = () => {
        getPayload({...product, quantity: quantity + 1})
    }

    const onDelete = () => {
        getRemoveId(id)
    }


    return (
        <div className="row">
            <div className="title">{title}</div>
            <div className="quantity">
                <button onClick={onMinus}>-</button>
                <div className="quantity-value">{quantity}</div>
                <button onClick={onPlus}>+</button>
            </div>
            <div className="price">{price}</div>
            <div className="total">{price * quantity}</div>
            <button className="delete" onClick={onDelete}>Remove</button>
        </div>
    );
};

export default React.memo(CartItem);
