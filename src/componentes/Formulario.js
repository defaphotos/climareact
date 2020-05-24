import React, { useState } from "react";
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {
 

  const { ciudad, pais } = busqueda;
  const [error, guardarError] = useState(false);
  const actualizarBusqueda = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const enviarDatos = (e) => {
    e.preventDefault();
    if (ciudad.trim() === "" || pais.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarConsultar(true);
  };

  return (
    <form onSubmit={enviarDatos}>
      {error ? (
          <Error mensaje="Todos los campos son obligatorios" />

      ) : null}
      <div className="input-field col s12">
        <input
          onChange={actualizarBusqueda}
          value={ciudad}
          type="text"
          name="ciudad"
          id="ciudad"
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select
          onChange={actualizarBusqueda}
          name="pais"
          id="pais"
          value={pais}
        >
          <option value="">Seleccione un país</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
          <option value="CL">Chile</option>
        </select>
        <label htmlFor="pais">País: </label>

        <div className="input-field col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Buscar Clima</button>
            </div>
      </div>
    </form>
  );
};

Formulario.propTypes ={
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;
