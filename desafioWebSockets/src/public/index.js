const socketClient = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputPrice = document.getElementById('price');
const btnSend = document.getElementById('enviar');
const btnReset = document.getElementById('eliminar');
const products = document.getElementById('products');

socketClient.on("products", (data) => {
  console.log(data);
});

socketClient.on("arrayProducts", (data) => {
  let html = data
    .map((elem) => {
      return `<div>
                   <strong>${elem.title}</strong>:
                   <em>${elem.price}</em>
          </div>`;
    })
    .join(" ");

  document.getElementById("products").innerHTML = html;
});

form.onsubmit = (e)=> {
    e.preventDefault();
  let newProduct = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
  };

  socketClient.emit("new-product", newProduct);

  socketClient.emit("delete-product", newProduct);

}


