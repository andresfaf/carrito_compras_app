import { useState } from "react"
import { CategoriaContext } from "../context";
import axios from 'axios';
import { URL } from '../helpers/Constantes';
import Swal from 'sweetalert2';

/* 
  Componente CategoriaProvider para el manejo de llamados a la api,
  manejo de metodos con logica y manejo de los datos
*/

export const CategoriaProvider = ({ children }) => {

  const [categorias, setCategorias] = useState([]);

  const [categoria, setCategoria] = useState({
    idCategoria: 0,
    nombre: '',
    estado: false
  });

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const listar = async () => {
    let response = axios.get(`${URL}/categoria/listar`);
    let [Response] = await axios.all([response]);
    let { data } = Response.data;
    setCategorias(data.reverse());
  }

  const buscarporid = async (id) => {
    let response = axios.get(`${URL}/categoria/buscarporid/${id}`);
    let [Response] = await axios.all([response]);
    let { data } = Response.data;
    setCategoria(data);
  }

  const eliminar = async (idCategoria) => {
    axios.delete(`${URL}/categoria/eliminar/${idCategoria}`)
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

  const agregar = async (categoria) => {
    axios.post(`${URL}/categoria/guardar`, categoria).then((response) => {
      listar();
      limpiar();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: !categoria.idCategoria ? 'Registros Guardado con éxito!!' : 'Registro Actualizado con éxito!!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const onChangeCategoria = ({ target }) => {
    const { name, value } = target;
    setCategoria({
      ...categoria,
      [name]: value
    });
  }

  const onChangeCategoriaActualizar = (idCategoria, nombre) => {
    setCategoria({
      ...categoria,
      idCategoria,
      nombre,
    });
  }

  const limpiar = () => {
    setCategoria({
      idCategoria: 0,
      nombre: '',
      estado: false
    });
  }

  const listarTdo = async () => {
    let response = axios.get(`${URL}/categoria/listar`);
    let [Response] = await axios.all([response]);
    let { data } = Response.data;
    return data;
  }

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        categoria,
        categoriaSeleccionada,
        setCategorias,
        setCategoria,
        listar,
        eliminar,
        agregar,
        limpiar,
        onChangeCategoriaActualizar,
        onChangeCategoria,
        buscarporid,
        setCategoriaSeleccionada,
        listarTdo
      }}>
      {children}
    </CategoriaContext.Provider>

  )
}
