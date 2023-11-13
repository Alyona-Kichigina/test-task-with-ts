import React from 'react';
import CartItem from "./CartItem";
import {IDataProduct} from "../App";

const Cart = (props: {dataProduct: IDataProduct[], getRemoveId: (id: number) => void, getPayload: (product: IDataProduct) => void}) => {
    const {dataProduct, getRemoveId, getPayload} = props

    return (
        <div className="cart">
            {dataProduct.map((item) => {
                return <CartItem key={item.id} product={item} getRemoveId={getRemoveId} getPayload={getPayload} />;
            })}
        </div>
    );
};

export default Cart;
