import React, {useCallback, useMemo, useState} from 'react';
import './App.css';
import Cart from "./Component/Cart";
import axios from "axios";

// 1. Add types or interfaces for all entities, varaibles and functions
// 2. Fix the component logic, errors and optimize it

// PS:
// 1. Prices are in cents, convert it into USD

export interface IDataProduct {
  id: number;
  title: string;
  price: number;
  quantity: number
}

const data = [
  { id: 1, title: "Product 1", price: 95000, quantity: 1 },
  { id: 2, title: "Product 2", price: 120000, quantity: 3 },
  { id: 3, title: "Product 3", price: 180000, quantity: 2 },
  { id: 4, title: "Product 4", price: 44000, quantity: 1 },
  { id: 5, title: "Product 5", price: 100000, quantity: 10 }
];

function App() {
  const [dataProduct, setDataProduct] = useState<IDataProduct[]>(data)
    const [USDRate, setUSDRate] = useState(0)

    const submit = () => {
      console.log(dataProduct)
  };

    const getRemoveId = (id: number) => {
        setDataProduct(dataProduct.filter((item) => item.id !== id))
    }

  const totalProduct = useMemo(() => {
    return dataProduct.reduce((acc, {price, quantity}) => {
      return acc + (price * quantity) / 100
    }, 0)
  }, [dataProduct])


    const getPayloadProduct = (product: IDataProduct) => {
        setDataProduct(dataProduct.reduce((acc: any, item) => {
            if (product.id === item.id) {
                acc.push(product)
            } else {
                acc.push(item)
            }
            return acc
        }, []))
    }
// клик на актуальный курс
    const getActualRate = useCallback(() => {
        try {
            (async () => {
                const {data: {Valute: {USD}}} = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
                setUSDRate(USD?.Value)
                setDataProduct(dataProduct.reduce((acc: any, item) => {
                    acc.push(
                        {
                            ...item,
                            price: Math.ceil(item.price/USD?.Value)
                        }
                    )
                    return acc
                },[]))
            })()
        } catch(e) {
            console.log(e)
        }
    }, [])
  return (
      <>
        <h1>Shopping cart</h1>
        <div className="head">
          <div className="sum">
            <span className="sum-title">Total:</span>
            <span className="sum-value">{totalProduct}</span>
          </div>
            <div className="flex">
                <div className="link" onClick={getActualRate}>Convert to USD at current exchange rate</div>
                <div>
                    Current USD exchange rate {Math.round(USDRate)}
                </div>
            </div>
        </div>
        <Cart dataProduct={dataProduct} getRemoveId={getRemoveId} getPayload={getPayloadProduct} />

        <button onClick={submit}>Checkout</button>
      </>
  );
}

export default App;
