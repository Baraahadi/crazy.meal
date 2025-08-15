"use strict";
const mealName = document.getElementById("input-mealName");
const mealPrice = document.getElementById("input-mealPrice");
const mealImage=document.getElementById("mealImageUpload");
const placeOrderBtn = document.getElementById("place-order-btn");
const orderForm = document.getElementById("order-form");
const orderList = document.querySelector("#orderTable tbody");
const clearOrder=document.getElementById("clearOrders")

//creating an orders constructor
function orders(name, price, image) {
  this.mealName = name;
  this.mealPrice = price;
  this.img=image;
}

// handling user orders
let userOrders = JSON.parse(localStorage.getItem("orders")) || [];
// console.log(userOrders);

function showUserOrders(e)
 {
  e.preventDefault();

    const userMealName = mealName.value;
    const userMealPrice = mealPrice.value;
    const file = mealImage.files[0];

  if (!file) 
    {
    alert("Please select an image");
    return;
    } 


    const reader = new FileReader();
    reader.onload = function(event)
    {
    const base64Img = event.target.result;

    ////creating new order obj
    const userOrder = new orders(userMealName, userMealPrice, base64Img);
    userOrders.push(userOrder);

    ////saving orders in local storage
    localStorage.setItem("orders", JSON.stringify(userOrders));

    ////rendering data from local storage
    renderOrders();

    orderForm.reset();
    };
   reader.readAsDataURL(file);

 }

 ////// creating function to render the  orders

function renderOrders() 
{
  orderList.innerHTML = "";

  userOrders.forEach((e) => 
  {
   
    orderList.innerHTML += 
    `  
    <tr>
                <td >${e.mealName}</td>
                 <td>${e.mealPrice} JOD</td>
                 <td class="status">completed</td>
                <td><img src="${e.img}" alt="" width="50"></td>

    </tr>
    `
 
  });
}
/////// creating a function to delete the orders from local storage 

function resetOrders()
{
  if (userOrders !== "")
  {
     localStorage.removeItem('orders');
     userOrders=[];
     renderOrders();
  }
}
// window.onload = renderOrders;
orderForm.addEventListener("submit", showUserOrders);
clearOrder.addEventListener('click', resetOrders)
