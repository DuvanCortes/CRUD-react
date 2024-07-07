import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


function App() {

  const[id,setId] = useState("0");
  const[nombre,setNombre] = useState("");
  const[edad,setEdad] = useState("");
  const[pais,setPais] = useState("");
  const[cargo,setCargo] = useState("");
  const[anios,setAnios] = useState("");

  const [Listempleados, setEmpleados] = useState ([]);
  const [editar, setEditar] = useState(false);
  

  const add = () =>{
  Axios.post("http://localhost:3001/create",{
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    anios:anios
  }).then(()=>{
    consultar();
    cancelar();
      Swal.fire({
      title: "<strong>Registro exitoso</strong>",
      html: "<i>El empleado <strong>"+ nombre+"</strong> fue creado correctamente</i>",
      icon: 'success',
      timer: 10000
    })
  })
  }

  const consultar = () =>{
    Axios.get("http://localhost:3001/consultar").then((listar)=>{
      setEmpleados(listar.data);
    })
    }

    const actualizar = (val) =>{
      setEditar(true);
      setId (val.id);
      setNombre (val.nombre);
      setEdad (val.edad);
      setPais (val.pais);
      setCargo (val.cargo);
      setAnios (val.anios);
      }

      const update = () =>{
        Axios.put("http://localhost:3001/update",{
          id:id,
          nombre:nombre,
          edad:edad,
          pais:pais,
          cargo:cargo,
          anios:anios
        }).then(()=>{
          consultar();
          cancelar();
            Swal.fire({
            title: "<strong>Actualización completa</strong>",
            html: "<i>El empleado <strong>"+ nombre+"</strong> se actualizó correctamente</i>",
            icon: 'success',
            timer: 10000
          })
        })
        }

        const cancelar = () =>{
          setEditar(false);
          setId("");
          setNombre("");
          setEdad("");
          setPais("");
          setCargo("");
          setAnios("");
          }

          const borrar = (val) =>{
            
            Swal.fire({
              title: "<i>Seguro que desea eliminar el empleado <strong>"+val.nombre+"</strong> ?</i>",
              text: "No podras revertir",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Seguro, borrar"
            }).then((result) => {
              if (result.isConfirmed) {
                  Axios.delete(`http://localhost:3001/eliminar/${val.id}`).then(()=>{
                  consultar();
                  cancelar();
                   })
                  Swal.fire({
                  title: "<strong>Eliminación completa</strong>",
                  html: "<i>El empleado <strong>"+val.nombre+"</strong> se eliminó correctamente</i>",
                  icon: "success"
                });
              }
            });
            
    }

  return (
    
    <div className="App">
    <div className="container">       
           <div className="card text-center">
          <div className="card-header">
            GESTIÓN EMPLEADOS
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" 
             onChange={(event)=>{
              setNombre(event.target.value);
            }}
            className="form-control" value={nombre} placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1"/>
            </div> 
        
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="text" 
             onChange={(event)=>{
              setEdad(event.target.value);
            }}
            className="form-control" value={edad} placeholder="Edad" aria-label="Edad" aria-describedby="basic-addon1"/>
            </div>  
        
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text" 
             onChange={(event)=>{
              setPais(event.target.value);
            }}
            className="form-control" value={pais} placeholder="Pais" aria-label="Pais" aria-describedby="basic-addon1"/>
            </div> 

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" 
             onChange={(event)=>{
              setCargo(event.target.value);
            }}
            className="form-control" value={cargo} placeholder="Cargo" aria-label="Cargo" aria-describedby="basic-addon1"/>
            </div> 
        
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input type="text" 
             onChange={(event)=>{
              setAnios(event.target.value);
            }}
            className="form-control" value={anios} placeholder="Años" aria-label="Años" aria-describedby="basic-addon1"/>
            </div> 
          </div>
          <div className="card-footer text-muted">

            {
              editar? 
              <div>
              <button className='btn btn-warning' onClick={update}>Actualizar</button>
              <button className='btn btn-info' onClick={cancelar}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>
            }
          
          </div>

          <div className="card-footer text-muted">
          <button className='btn btn-success' onClick={consultar}>Consultar</button>
          <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Edad</th>
                  <th scope="col">País</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Experiencia</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {
            Listempleados.map((val,key)=>{
              return <tr key={val.id}>
                    <th>{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.anios}</td>
                    <td><div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-warning" onClick={()=>{
                        actualizar(val);
                      }}>Actualizar</button>
                      <button type="button" className="btn btn-danger" onClick={()=>{
                        borrar(val);
                      }}>Eliminar</button> 
                    </div></td>
                </tr>
              })
               }
                
              </tbody>
          </table>  
        </div>
        </div>
    </div>
    </div>
  );
}

export default App;
