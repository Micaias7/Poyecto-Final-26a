const { Router } = require("express");
const Stripe = require("stripe");
const { User, Product, Sell_order } = require("../db");
const { Op } = require("sequelize");
const stripe = new Stripe("sk_test_51LDapSLLyNiW7nbRhEOHcLQfx1muclzGM39fTvok1XgfvSbdgHF0t9tpytNGb8DgtorDUsoRtUqArlmUiNwoedu2005lvflXcg");
const router = Router();
const { mailPayment} = require("../middlewares/middlewares.js");

//
router.post("/api/checkout", async (req, res) => {
    // you can get more data to find in a database, and so on
    const { id, amount , description, user, shippingInfo} = req.body;
    //sacarle el ultimo elemento, que son los datos de envio
    console.log(shippingInfo)
    try {
      const userComprador = await User.findByPk(user)//trae el user que compro, validar si no existe
      if(user){
        const payment = await stripe.paymentIntents.create({
          amount:amount*100,
          currency: "USD",
          description: description.map(p=>p.name + ': ' +p.quantity).join(' '),
          payment_method: id,
          confirm: true, //confirm the payment at the same time
        });
        
        if(payment.status === 'succeeded'){
          const newSellOrder = await Sell_order.create({
            amount:amount*100,
            product:description.map(p=>p.name + ': ' + p.quantity).join(','),//armar funcion 
            country:shippingInfo.country,
            province:shippingInfo.province,
            city:shippingInfo.city,
            postalCode:shippingInfo.postalCode
          })
          //console.log('newsellorder',newSellOrder)
          const userCompra = await Promise.all(description.map(async (p)=>{
            return await Product.findByPk(p.id)
          })) 
          newSellOrder.addProducts(userCompra)
          //console.log(userComprador)
          userComprador.addSell_order(newSellOrder)
        }
        //console.log("Hola1",userComprador.dataValues.email)
        mailPayment(userComprador.dataValues.email, id, mensaje="Pago exitoso");
      }     
      else return res.json({ message: "hubo un error"})
      
      return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
      console.log(error);
      return res.json({ message: "hubo un error"/* error.raw.message */ });
    } 
  }); 

  module.exports = router;