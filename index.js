const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

//app.use(express.static('static'));
app.use(cors());

//Server-side Values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2; //2pt per $1

//Endpoint 1: Calculate the total price of items in the cart /cart-total?newItemPrice=1200&cartTotal=0
function totalCartPrice(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCartPrice(newItemPrice, cartTotal).toString());
});

//Endpoint 2 : Apply a discount based on membership status /membership-discount?cartTotal=3600&isMember=true
function membershipDiscount(isMember, cartTotal) {
  if (isMember === 'true') {
    return cartTotal - (cartTotal * discountPercentage) / 100;
  } else return cartTotal;
}
app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember;
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(membershipDiscount(isMember, cartTotal).toString());
});

//Endpoint 3 : Calculate tax on the cart total /calculate-tax?cartTotal=3600>
function calculateTax(cartTotal) {
  return (cartTotal * taxRate) / 100;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

//Endpoint 4 : Estimate delivery time based on shipping method /estimate-delivery?shippingMethod=express&distance=600>
function estimateDeliveryt(shippingMethod, distance) {
  let day;
  if (shippingMethod === 'Standard') {
    day = distance / 50;
  } else day = distance / 100;
  return day;
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDeliveryt(shippingMethod, distance).toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance /shipping-cost?weight=2&distance=600>
function shippingCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(shippingCost(weight, distance).toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase /loyalty-points?purchaseAmount=3600>
function loyaltyPoints(purchaseAmount) {
  return purchaseAmount * 2;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyaltyPoints(purchaseAmount).toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
