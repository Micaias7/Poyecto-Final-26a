import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { purchaseInfo, singlePurchase } from '../../redux/actions';
import { Link } from "react-router-dom";
import './PurchaseInfo.scss'

export default function PurchaseInfo() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const purchase = useSelector(state => state.singlePurchaseInfo)

    useEffect(() => {
        dispatch(singlePurchase(user.uid));
    }, [dispatch]);
  
    return (
        <div className='purchaseInfoContainer'>
            {    console.log(purchase)}
            {
              
                purchase.length > 0 ? purchase.map(m => {
                    return (
                        <div className='singlePurchaseContainer'>
                            <div className='purchaseCard'>
                                <div className='purchaseHeader'>
                                    <h3 >{m.product[0]}</h3>
                                    <img src={m.image[0]} />
                                </div>
                                <div className='purchaseInfo'>
                                    <h5>Talle:{m.product[1]}</h5>
                                    <h5>Cantidad:{m.product[2]}</h5>
                                    <h5>Precio por unidad:{m.product[3]}</h5>
                                    <span>Fecha de compra: {m.date}</span>
                                </div>
                                <h4>{m.product[4]}</h4>
                            </div>
                            <div className='purchaseFooter'>
                            {
                                m.orderStatus === 'pending' ? <div><span>Ya podés pasar a retirar tu producto</span></div> :
                                    <div className='valorationContainer'><span>Danos tu valoración</span><button><Link>Valorar Producto</Link></button></div>
                            }
                            </div>
                        </div>
                    )
                }) : <div><h2>No se ha realizado ninguna compra</h2></div>
            }
        </div>
    )
}