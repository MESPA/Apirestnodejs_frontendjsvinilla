const { json } = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
//usar formato json para insertar
app.use(express.json());
app.use(cors());
//conexion a la base de datos
let conexion= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'Emy.ez30',
    database:'articulosdb'
});
//probando conexion
conexion.connect(function(error){
    if (error) {
        throw error;

    } else {
        console.log("conexion exitosa")
    }
})

app.get('/',function(req,res){
    res.send('Ruta de Inicio');
});

//mostrar datos via get
app.get('/api/articulos', (req,res)=> {
    conexion.query('select * from articulos', (error,results)=>{
        if (error) {
            throw error
        } else {
            res.send(results);
        }
    })
} );

//mostrar un solo articulo
app.get('/api/articulos/:id', (req,res)=> {
    conexion.query('select * from articulos where id= ?',[req.params.id], (error,result)=>{
        if (error) {
            throw error
        } else {
            //traer todas las datos
            res.send(result);
            //traer fila especifica
           // res.send(fila[0].descripcion);

        }
    })
} );
//crear articulo por post
app.post('/api/articulos',(req,res)=>{
    let data= {
        descripcion: req.body.descripcion,
        precio:req.body.precio,
        stock:req.body.stock
    };
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql,data,function(error , results){

        if (error) {
            throw error
        } else {
            //traer todas las datos
            res.send(results);
            //traer fila especifica
           // res.send(fila[0].descripcion);

        }
    });
});

//editar por put
app.put('/api/articulos/:id',(req,res)=>{
    let id= req.params.id;
    let descripcion= req.body.descripcion;
    let precio=req.body.precio;
    let stock=req.body.stock
    let sql = "UPDATE articulos SET descripcion=?,precio=?,stock=?"
    conexion.query(sql ,[descripcion,precio,stock],function(error,results){

        if (error) {
            throw error
        } else {
            res.send(results)
            
        }
    });
});

//eliminar articulo delete
app.delete('/api/articulos/:id', (req,res)=>{
    conexion.query('delete from articulos where id=?',[req.params.id],function(error,results){

        if (error) {
            throw error
        } else {
            res.send(results)
            
        }
    })
})

// const puerto = process.env.PORT || 3000;

//ver el servidor de express en el puerto 3000
app.listen('3000', function(){
    console.log("server ok")
});