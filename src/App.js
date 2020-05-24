import React,{Fragment,useState, useEffect} from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';
import Error from './componentes/Error';

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const { ciudad, pais } = busqueda;

  const [consultar, guardarConsultar] = useState(false);
  const [resultado,guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  useEffect(()=>{
    const consultarAPI = async ()=>{
      if(consultar){
        const appId = "f0a5d78acf54bdda225e3d68dc4a7823";

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta  = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false);
        }
      }
    }
    consultarAPI();
  },[consultar,ciudad,pais])

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  }else{
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header titulo="Clima" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12"><Formulario guardarConsultar={guardarConsultar} busqueda={busqueda} guardarBusqueda={guardarBusqueda} /></div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
