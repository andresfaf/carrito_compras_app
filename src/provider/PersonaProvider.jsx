import { useState } from "react"
import { PersonaContext } from "../context";
import axios from 'axios';
import { URL } from '../helpers/Constantes';
import Swal from 'sweetalert2';

/* 
  Componente PersonaProvider para el manejo de llamados a la api,
  manejo de metodos con logica y manejo de los datos
*/

export const PersonaProvider = ({ children }) => {

  const [personas, setPersonas] = useState([]);

  const [persona, setPersona] = useState({
    idPersona: 0,
    nombre: '',
    apellido: '',
    documento: '',
    correo: '',
    telefono: '',
    estado: false
  });

  const listar = async () => {
    let response = axios.get(`${URL}/persona/listar`);
    let [Response] = await axios.all([response]);
    let { data } = Response.data;
    setPersonas(data.reverse());
  }

  const buscarporid = async (id) => {
    let response = axios.get(`${URL}/persona/buscarporid/${id}`);
    let [Response] = await axios.all([response]);
    let { data } = Response.data;
    setPersona(data);
  }

  const eliminar = async (id) => {
    axios.delete(`${URL}/persona/eliminar/${id}`)
      .then((response) => {
        listar();
        limpiar();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro eliminado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  const agregar = async (persona) => {
    axios.post(`${URL}/persona/guardar`, persona).then((response) => {
      listar();
      limpiar();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: !persona.idPersona ? 'Registros Guardado con éxito!!' : 'Registro Actualizado con éxito!!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const onChangePersona = ({ target }) => {
    const { name, value } = target;
    setPersona({
      ...persona,
      [name]: value
    });
  }

  const onChangePersonaActualizar = (idPersona, nombre, apellido, documento, correo, telefono) => {
    setPersona({
      ...persona,
      idPersona,
      nombre,
      apellido,
      documento,
      correo,
      telefono
    });
  }

  const actualizaridPersona = (idPersona) => {
    setPersona({
      ...persona,
      idPersona,
    });
  }

  const limpiar = () => {
    setPersona({
      idPersona: 0,
      nombre: '',
      apellido: '',
      documento: '',
      correo: '',
      telefono: '',
      estado: false
    });
  }

  return (
    <PersonaContext.Provider
      value={{
        personas,
        persona,
        setPersonas,
        setPersona,
        listar,
        buscarporid,
        eliminar,
        agregar,
        onChangePersona,
        onChangePersonaActualizar,
        limpiar,
        actualizaridPersona
      }}>
      {children}
    </PersonaContext.Provider>
  )
}
