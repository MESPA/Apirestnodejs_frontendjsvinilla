


const url = 'http://localhost:3000/api/articulos/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalarticulo =  new bootstrap.Modal(document.getElementById('modalarticulo'));
const formarticulo = document.querySelector('form')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
let opcion=''

btncrear.addEventListener('click', ()=>{
    descripcion.value=''
    precio.value=''
    stock.value=''

    modalarticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar=(articulos)=>{
    articulos.forEach(articulo => {
        resultados += `<tr>
                        <td>${articulo.id}</td>
                        <td>${articulo.descripcion}</td>
                        <td>${articulo.precio}</td>
                        <td>${articulo.stock}</td>
                        <td class = "text-center">
                        <a class="btneditar btn btn-primary">Editar</a>
                        <a class="btnborrar btn btn-danger">Borrar</a>
                        
                        </td>
                      </tr>`
    });
    contenedor.innerHTML= resultados;
}

//procedimiento mostrar
fetch(url)
.then(response => response.json())
.then(data => mostrar(data))
.catch(error => console.log(error))


//evento click
const on =(element,event,selector,handler)=>{
    element.addEventListener(event, e =>{
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//eliminar registro
on(document,'click','.btnborrar', e=>{
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML

Swal.fire({
    title: "Se eliminara el articulo",
    text: "¿Eliminar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
})
.then(resultado => {
    if (resultado.value) {
        // Hicieron click en "Sí"
                fetch(url+id,{
                    method: 'DELETE'
                })
                .then(res => res.json())
                Swal.fire({
                    title: "Se elimino ",
                    text: "correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then(()=> location.reload());
            
        console.log("*se elimina la venta*");
    } else {
        // Dijeron que no
        console.log("*NO se elimina la venta*");
    }
});

})

//editar
let idform = 0 
on(document,'click','.btneditar', (e) =>{
 
    const fila = e.target.parentNode.parentNode
    console.log(fila)
    idform = fila.children[0].innerHTML
  
    const desc= fila.children[1].innerHTML
    const pre= fila.children[2].innerHTML
    const stock = fila.children[3].innerHTML

    console.log(stock)

    descripcion.value = desc
    precio.value = pre
    stock.value = stock
    opcion = 'editar'
    modalarticulo.show()
   
})
//procedimiento para crear y editar
formarticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if (opcion == 'crear') {

        Swal.fire({
            title: "Desea Crear ",
            text: "¿El Articulo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, Guardar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
                fetch(url,{
                    method : 'POST',
                    headers:{
                            'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        descripcion:descripcion.value,
                        precio:precio.value,
                        stock:stock.value
                    })
                })
                .then(response => response.json())
                .then(data => {
                    const newartic = []
                    newartic.push(data)
                    mostrar(newartic)
                })
                        Swal.fire({
                            title: "Se Craeron  ",
                            text: "Correctamente",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        })
                    
                console.log("*se elimina la venta*");
            } else {
                // Dijeron que no
                Swal.fire({
                    title: "Se Cancelo   ",
                    text: "La creacion del articulo",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    timer: 4500
                })
            }
        })

        //console.log('crear articulo')
       
        .then(()=> location.reload())
    }
    if (opcion == 'editar') {
        ///console.log('editar articulo')
        fetch(url + idform,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
        },
        body: JSON.stringify({
            descripcion:descripcion.value,
            precio:precio.value,
            stock:stock.value
            })
        })
        .then(response => response.json())
        .then(response => location.reload())
    }
    modalarticulo.hide()
})