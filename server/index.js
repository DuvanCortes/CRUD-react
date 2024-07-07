const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"empleados_crud"
});

//CREAR EMPLEADO

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("--------------------->Empleado registrado con éxito");
            }
        }
    );
});

//CONSULTAR EMPLEADO

app.get("/consultar",(req,res)=>{
    
    db.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send (result);
            }
        }
    );
});

//ACTUALIZAR EMPLEADO

app.put("/update",(req,res)=>{

    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("--------------------->Empleado actualizado con éxito");
            }
        }
    );
});

app.delete("/eliminar/:id",(req,res)=>{
    
    const id = req.params.id;
    
    db.query('DELETE FROM empleados WHERE id=?',[id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("--------------------->Empleado borrado con éxito");
            }
        }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})