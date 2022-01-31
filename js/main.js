//FUNCION QUE SE EJECUTA CUANDO SE CARGA EL DOM
$(document).ready(function () {
    if("CARRITO" in localStorage){
        const arrayLiterales = JSON.parse(localStorage.getItem("CARRITO"));
        for (const literal of arrayLiterales) {
            carrito.push(new Producto(literal.id, literal.nombre, literal.precio, literal.categoria, literal.cantidad));
        }
        //console.log(carrito);
        carritoUI(carrito);
    }
    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation();
    });
});
//FUNCION QUE SE EJECUTA CUANDO SE CARGA TODA LAS IMAGENES DE LA APLICACION
window.addEventListener('load',()=>{
    //ELIMINAR ELEMENTO DEL DOM
    $('#indicadorCarga').remove();
    //MOSTRAR ELEMENTO CON UN FADE
    $('#productosContenedor').fadeIn("slow");
})
//INSTANCIAR OBJETOS Y ASOCIAR A ARRAY GLOBAL
productos.push(new Producto(1, "Anteojos Sol Infinit", 65, categorias[0], 1, "https://http2.mlstatic.com/D_NQ_NP_674856-MLA44475831283_012021-W.webp"));
productos.push(new Producto(2, "Anteojos Sol Infinit", 130, categorias[0], 1, "https://http2.mlstatic.com/D_NQ_NP_742679-MLA43832244575_102020-W.webp"));
productos.push(new Producto(4, "Anteojos Sol Infinit", 60, categorias[1], 1, "https://http2.mlstatic.com/D_NQ_NP_977380-MLA44165030186_112020-W.webp"));
productos.push(new Producto(5, "Anteojos Sol Infinit", 60, categorias[1], 1, "https://http2.mlstatic.com/D_NQ_NP_916862-MLA47100960286_082021-W.webp"));
productos.push(new Producto(6, "Anteojos Sol Infinit", 60, categorias[1], 1, "https://http2.mlstatic.com/D_NQ_NP_648063-MLA43691191417_102020-W.webp"));
productos.push(new Producto(7, "Anteojos Sol Infinit", 75, categorias[2], 1, "https://http2.mlstatic.com/D_NQ_NP_913869-MLA45717031435_042021-W.webp"));
productos.push(new Producto(8, "Anteojos Sol Infinit", 75, categorias[2], 1,"https://http2.mlstatic.com/D_NQ_NP_936312-MLA43506360902_092020-W.webp"));
productos.push(new Producto(9, "Anteojos Sol Infinit", 75, categorias[2], 1, "https://http2.mlstatic.com/D_NQ_NP_712306-MLA43612375419_092020-W.webp"));
productos.push(new Producto(10, "Anteojos Sol Infinit", 100, categorias[3], 1, "https://http2.mlstatic.com/D_NQ_NP_799029-MLA45535194564_042021-W.webp"));
productos.push(new Producto(11, "Anteojos Sol Infinit", 100, categorias[3], 1,"https://http2.mlstatic.com/D_NQ_NP_890742-MLA45977964724_052021-W.webp"));
productos.push(new Producto(12, "Anteojos Sol Infinit", 100, categorias[3], 1, "https://http2.mlstatic.com/D_NQ_NP_851478-MLA46865095856_072021-W.webp"));
productos.push(new Producto(12, "Anteojos Sol Infinit", 100, categorias[3], 1, "https://http2.mlstatic.com/D_NQ_NP_969715-MLA31621682319_072019-W.webp"));
//GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
productosUI(productos, '#productosContenedor');
//DEFINIR EVENTOS SOBRE LA INTEFAZ GENERADA (LLEVAR A FUNCION productosUI SI QUEREMOS QUE FUNCIONE CON EL FILTRO)
//$('.btn-compra').on("click", comprarProducto);
//GENERAR OPCIONES PARA FILTRAR POR CATEGORIA
selectUI(categorias,"#filtroCategorias");
//DEFINIR EVENTOS SOBRE EL SELECT GENERADO
$('#filtroCategorias').change(function (e) { 
    //OBTENEMOS EL NUEVO VALOR DEL SELECT
    const value = this.value;
    //SOLUCION CON ANIMACIONES
    $('#productosContenedor').fadeOut(600,function(){
        //EL FILTRO SE REALIZA UNA VEZ OCULTO EL CONTENEDOR
        if(value == 'TODOS'){
            productosUI(productos, '#productosContenedor');
        }else{
            const filtrados = productos.filter(producto => producto.categoria == value);
            productosUI(filtrados, '#productosContenedor');
        }
        //MOSTRAR UNA VEZ GENERADOS LOS PRODUCTOS
        $('#productosContenedor').fadeIn();
    });
});
//DEFINIR EVENTOS SOBRE EL INPUT DE BUSCADA -> USA keyup cuando la tecla se suelta
$("#busquedaProducto").keyup(function (e) { 
    const criterio = this.value.toUpperCase();
    console.log(criterio);
    if(criterio != ""){
                                                        //el resulado de esto es verdadero
        const encontrados = productos.filter(p =>       p.nombre.includes(criterio.toUpperCase()) 
                                                    || p.categoria.includes(criterio.toUpperCase()));
        productosUI(encontrados, '#productosContenedor');
    }
    else{
        const encontrados = productos;
        productosUI(encontrados, '#productosContenedor');
        
    }
});
//DEFINIR EVENTOS SOMBRE EL INPUT DE FILTRO DE PRECIO
$(".inputPrecio").change(function (e) { 
    const min = $("#minProducto").val();
    const max = $("#maxProducto").val();
    if((min > 0) && (max > 0)){
                                                 //el resulado de esto es verdadero
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#productosContenedor');
    }else{
        productosUI(productos, '#productosContenedor');
        
    }
});