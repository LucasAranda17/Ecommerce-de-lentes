window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 450,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 800,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 4
			  }
			}
		]
	});
});
//FUNCION PARA GENERAR LA INTERFAZ DE PRODUCTOS CON JQUERY
function productosUI(productos, id){
  $(id).empty();
  for (const producto of productos) {
     $(id).append(`<div class="card"  style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">${producto.precio}</p>
                      <span class="badge badge-info">${producto.categoria}</span>
                      <a href="#" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
                    </div>
                  </div>`);
  }
  $('.btn-compra').on("click", comprarProducto);
}
//MANEJADOR DE COMPRA DE PRODUCTOS
function comprarProducto(e){
  //PREVENIR REFRESCO AL PRESIONAR ENLACES
  e.preventDefault();
  //PREVENIR LA PROPAGACION DEL EVENTO
  e.stopPropagation();
  //OBTENER ID DEL BOTON PRESIONADO
  const idProducto   = e.target.id;
  //BUSCAR PRIMERO EL OBJETO EN EL CARRITO (SI FUE SELECCIONADO);
  const seleccionado = carrito.find(p => p.id == idProducto);
  //SI NO SE ENCONTRO BUSCAR EN ARRAY DE PRODUCTOS
  if(seleccionado == undefined){
    carrito.push(productos.find(p => p.id == idProducto));
  }else{
    //SI SE ENCONTRO AGREGAR UN CANTIDAD
    seleccionado.agregarCantidad(1);
  }
 
  //GUARDAR EN STORAGE
  localStorage.setItem("CARRITO",JSON.stringify(carrito));
  //GENERAR SALID PRODUCTO
  carritoUI(carrito);
}
//FUNCION PARA RENDERIZAR LA INTERFAZ DEL CARRITO
function carritoUI(productos){
  //CAMBIAR INTERIOR DEL INDICADOR DE CANTIDAD DE PRODUCTOS;
  $('#carritoCantidad').html(productos.length);
  //VACIAR EL INTERIOR DEL CUERPO DEL CARRITO;
  $('#carritoProductos').empty();
  for (const producto of productos) {
    $('#carritoProductos').append(registroCarrito(producto));
  }
  //AGREGAR TOTAL
  $('#carritoProductos').append(`<p id="totalCarrito"> TOTAL ${totalCarrito(productos)}</p>`)
  //ASOCIAMOS LOS EVENTOS A LA INTERFAZ GENERADA
  $('.btn-delete').on('click', eliminarCarrito);
  $('.btn-add').click(addCantidad);
  $('.btn-sub').click(subCantidad);
}
//FUNCION PARA GENERAR LA ESTRUCTURA DEL REGISTO HTML
function registroCarrito(producto){
  return `<p> ${producto.nombre} 
          <span class="badge badge-warning">$ ${producto.precio}</span>
          <span class="badge badge-dark">${producto.cantidad}</span>
          <span class="badge badge-success"> $ ${producto.subtotal()}</span>
          <a id="${producto.id}" class="btn btn-info    btn-add">+</a>
          <a id="${producto.id}" class="btn btn-warning btn-sub">-</a>
          <a id="${producto.id}" class="btn btn-danger  btn-delete">x</a>
          </p>`
}

function eliminarCarrito(e){
  console.log(e.target.id);
  //PRIMER FORMA DE ELIMINAR (SI CARRITO NO ES CONSTANTE) -> FILTER
  //carrito = carrito.filter(producto => producto.id != e.target.id);
  //SEGUNDA FORMA DE ELIMINAR  -> RECORTANDO EL ARRAY CON SPLICE
  let posicion = carrito.findIndex(p => p.id == e.target.id);
  carrito.splice(posicion, 1);
  //GENERAR NUEVAMENTE INTERFAZ
  carritoUI(carrito);
  //GUARDAR EN STORAGE EL NUEVO CARRITO
  localStorage.setItem("CARRITO",JSON.stringify(carrito));
}
//MANEJADOR PARA AGREGAR CANTIDAD CANTIDAD
function addCantidad(){
  let producto = carrito.find(p => p.id == this.id);
  producto.agregarCantidad(1);
  $(this).parent().children()[1].innerHTML = producto.cantidad;
  $(this).parent().children()[2].innerHTML = producto.subtotal();
  //MODIFICAR TOTAL
  $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
  //GUARDAR EN STORAGE
  localStorage.setItem("CARRITO",JSON.stringify(carrito));
}
//MANEJADOR PARA RESTAR CANTIDAD
function subCantidad(){
  let producto = carrito.find(p => p.id == this.id);
  if(producto.cantidad > 1){
    producto.agregarCantidad(-1);
    //$(this).parent().children()[1].innerHTML = producto.cantidad;
    let registroUI = $(this).parent().children();
    registroUI[1].innerHTML = producto.cantidad;
    registroUI[2].innerHTML = producto.subtotal();
    //MODIFICAR TOTAL
    $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
    //GUARDAR EN STORAGE
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }
}
//FUNCION PARA GENERAR OPCIONES DE UN SELECT
function selectUI(lista, selector){
  //VACIAR OPCIONES EXISTENTES
  $(selector).empty();
  //RECORRER LISTA Y AÑADIR UNA OPCION POR CADA ELEMENTO
  lista.forEach(element => {
      $(selector).append(`<option value='${element}'>${element}</option>`);
  });
  $(selector).prepend(`<option value='TODOS' selected>TODOS</option>`);
}
//FUNCION PARA OBTENER EL PRECIO TOTAL DEL CARRITO
function totalCarrito(carrito){
  console.log(carrito);
  let total = 0;
  carrito.forEach(p => total += p.subtotal());
  return total;
}
