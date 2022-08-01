import { useContext, useState } from "react";
import { ProductoContext, CategoriaContext } from "../context";
import axios from 'axios';
import { URL } from '../helpers/Constantes';
import Swal from 'sweetalert2';

/* 
  Componente ProductoProvider para el manejo de llamados a la api,
  manejo de metodos con logica y manejo de los datos
*/

export const ProductoProvider = ({ children }) => {

  const { buscarporid: buscarporidcategoria, limpiar: limpiarcategoria } = useContext(CategoriaContext);

  const [productos, setProductos] = useState([]);

  const [producto, setProducto] = useState({
    idProducto: 0,
    nombre: '',
    idCategoria: 0,
    precio: '',
    cantidad: '',
    estado: false
  });

  const [productosxCategoria, setProductosxCategoria] = useState([]);

  const listar = async () => {
    
    let responsec = axios.get(`${URL}/categoria/listar`);
    let response = axios.get(`${URL}/producto/listar`);

    let [Responsec, Response] = await axios.all([responsec, response]);
    let { data: datac } = Responsec.data;
    let { data } = Response.data;
    
    let array = [];
    data.forEach(producto => {
      
      let { nombre } = datac.find(categoria => categoria.idCategoria === producto.idCategoria);
      let obj = {
        ...producto,
        categoria: nombre
      }
      array.push(obj);
    });

    setProductos(array.reverse());
  }

  const buscarporid = async (id) => {
    let response = axios.get(`${URL}/producto/buscarporid/${id}`);
    let [Response] = await axios.all([response]);
    let { data } = Response.data;
    buscarporidcategoria(data.idCategoria);
    setProducto(data);
  }

  const eliminar = async (idProducto) => {
    axios.delete(`${URL}/producto/eliminar/${idProducto}`)
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

  const agregar = async (producto) => {
    axios.post(`${URL}/producto/guardar`, producto).then((response) => {
      listar();
      limpiar();
      limpiarcategoria();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: !producto.idCategoria ? 'Registros Guardado con éxito!!' : 'Registro Actualizado con éxito!!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const actualizarStock = async (producto) => {
    let data = axios.post(`${URL}/producto/guardar`, producto);
    await axios.all([data]);
  }

  const onChangeProducto = ({ target }) => {
    const { name, value } = target;
    setProducto({
      ...producto,
      [name]: value
    });
  }

  const actualizaridProducto = (idProducto) => {
    setProducto({
      ...producto,
      idProducto,
    });
  }

  const limpiar = () => {
    setProducto({
      idProducto: 0,
      nombre: '',
      idCategoria: 0,
      precio: '',
      cantidad: '',
      estado: false
    });
  }

  const actualizaridCategoria = ({ idCategoria }) => {
    setProducto({
      ...producto,
      idCategoria: !!idCategoria ? idCategoria : 0
    });
  }

  const buscarProductosxCategoria = async (idCategoria) => {
    let response = axios.get(`${URL}/producto/listar`);
    let [Response] = await axios.all([response]);
    let { data } = Response.data;
    let productosHabilitados = data.filter(producto => producto.idCategoria === idCategoria);
    setProductosxCategoria(productosHabilitados);
    setProductos([]);
  }

  return (
    <ProductoContext.Provider
      value={{
        productos,
        producto,
        productosxCategoria,
        setProductos,
        setProducto,
        listar,
        eliminar,
        agregar,
        onChangeProducto,
        actualizaridProducto,
        limpiar,
        actualizaridCategoria,
        buscarporid,
        buscarProductosxCategoria,
        actualizarStock
      }}>
      {children}
    </ProductoContext.Provider>

  )
}
