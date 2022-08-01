import { useContext, useState } from "react"
import { CarritoContext, ProductoContext } from "../context";
import axios from 'axios';
import { URL } from '../helpers/Constantes';
import Swal from 'sweetalert2';

/* 
  Componente CarritoProvider para el manejo de llamados a la api,
  manejo de metodos con logica y manejo de los datos
*/

export const CarritoProvider = ({ children }) => {

  const { actualizarStock } = useContext(ProductoContext);

  const [acumuladorCarrito, setAcumuladorCarrito] = useState(0);

  const [carrito, setCarrito] = useState([]);

  const [identificacion, setIdentificacion] = useState({
    correo: '',
    nombre: '',
    apellido: '',
    documento: '',
    telefono: ''
  });

  const [departamento, setDepartamento] = useState(null);;
  const [municipio, setMunicipio] = useState(null);
  const [tipoVia, setTipoVia] = useState(null);

  const [envio, setEnvio] = useState({
    item1: '',
    item2: '',
    item3: '',
    apartamento: '',
    barrio: '',
    nombrePersonaRecibe: ''
  })

  const onChangeEnvio = ({ target }) => {
    const { name, value } = target;
    setEnvio({
      ...envio,
      [name]: value
    });
  }

  const onChangeIdentificacion = ({ target }) => {
    const { name, value } = target;
    setIdentificacion({
      ...identificacion,
      [name]: value
    });
  }

  const agregarProducto = (producto, cantidad) => {
    setCarrito(carrito => [...carrito, { ...producto, cantidadSeleccionada: cantidad }]);
    incrementarAcumuladorCarrito();
  }

  const incrementarAcumuladorCarrito = () => {
    setAcumuladorCarrito(acumuladorCarrito => acumuladorCarrito + 1)
  }

  const decrementarAcumuladorCarrito = () => {
    setAcumuladorCarrito(acumuladorCarrito => acumuladorCarrito - 1)
  }

  const validarProducto = (producto, cantidad) => {
    let existe = carrito.find(prod => prod.idProducto === producto.idProducto);
    if (!!existe) {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Este producto ya se encuentra en el carrito',
        showConfirmButton: false,
        timer: 1500
      });
      return false
    } else {
      let validacion = validarCantidad(producto.cantidad, cantidad);
      if (validacion) {
        agregarProducto(producto, cantidad);
        return true
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'No hay suficientes productos disponibles',
          showConfirmButton: false,
          timer: 1500
        });
        return false
      }
    }
  }

  const validarCantidad = (stock, cantidad) => {
    if (stock >= cantidad) return true;
    else return false
  }

  const eliminarProductoDelCarrito = (id) => {
    let productos = carrito.filter(producto => producto.idProducto !== id);
    setCarrito(productos);
    decrementarAcumuladorCarrito();
  }

  const incrementarCantidadSeleccionada = (idProducto, cantidad, cantidadSeleccionada) => {
    let validacion = validarCantidad(cantidad, cantidadSeleccionada + 1);
    if (validacion) {
      let array = [];
      let obj = {};
      carrito.forEach(producto => {
        if (producto.idProducto === idProducto) {
          obj = {
            ...producto,
            cantidadSeleccionada: cantidadSeleccionada + 1
          }
        } else {
          obj = {
            ...producto
          }
        }
        array.push(obj);
      });
      setCarrito(array);
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'No hay suficientes productos disponibles',
        showConfirmButton: false,
        timer: 1500
      });
    }

  }

  const decrementarCantidadSeleccionada = (idProducto, cantidadSeleccionada) => {
    let array = [];
    let obj = {};
    carrito.forEach(producto => {
      if (producto.idProducto === idProducto) {
        obj = {
          ...producto,
          cantidadSeleccionada: cantidadSeleccionada === 1 ? 1 : cantidadSeleccionada - 1
        }
      } else {
        obj = {
          ...producto
        }
      }
      array.push(obj);
    });
    setCarrito(array);

  }

  const agregar = async (idFactura) => {
    carrito.forEach((producto) => {
      let carrito = {
        idCarrito: 0,
        idProducto: producto.idProducto,
        cantidad: producto.cantidadSeleccionada,
        idFactura: idFactura,
        estado: true
      }
      let productoAux = {
        ...producto,
        cantidad: producto.cantidad - producto.cantidadSeleccionada
      }
      agregarAlcarrito(carrito);
      actualizarStock(productoAux);
    });

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Registros Guardado con éxito!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const agregarAlcarrito = async (carrito) => {
    let data = axios.post(`${URL}/carrito/guardar`, carrito);
    await axios.all([data]);
  }

  return (
    <CarritoContext.Provider
      value={{
        acumuladorCarrito,
        carrito,
        identificacion,
        departamento,
        municipio,
        tipoVia,
        envio,
        setAcumuladorCarrito,
        setCarrito,
        agregarProducto,
        validarProducto,
        eliminarProductoDelCarrito,
        incrementarCantidadSeleccionada,
        decrementarCantidadSeleccionada,
        onChangeIdentificacion,
        setDepartamento,
        setMunicipio,
        setTipoVia,
        setEnvio,
        onChangeEnvio,
        agregar
      }}>
      {children}
    </CarritoContext.Provider>
  )
}
