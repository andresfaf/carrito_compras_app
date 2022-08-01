import { useContext, useState } from "react"
import { FacturaContext, CarritoContext } from "../context";
import axios from 'axios';
import { URL } from '../helpers/Constantes';

/* 
  Componente FacturaProvider para el manejo de llamados a la api,
  manejo de metodos con logica y manejo de los datos
*/

export const FacturaProvider = ({ children }) => {

  const [facturas, setFacturas] = useState([]);

  const { identificacion, envio, municipio, tipoVia, carrito, agregar: agregarCarrito } = useContext(CarritoContext);

  const obtenerPrecio = () => {
    let total = 0;
    carrito.forEach(({ precio, cantidadSeleccionada }) => {
      total += precio * cantidadSeleccionada;
    });
    return total;
  }

  const agregar = async () => {
    const personaObj = {
      idPersona: 0,
      nombre: identificacion.nombre,
      apellido: identificacion.apellido,
      documento: identificacion.documento,
      correo: identificacion.correo,
      telefono: identificacion.telefono,
      estado: true
    }

    let persona = axios.post(`${URL}/persona/guardar`, personaObj);
    let [personaData] = await axios.all([persona]);
    let { data: dataPersona } = personaData.data;

    let facturaObj = {
      idFactura: 0,
      precio: obtenerPrecio(),
      fechaCreacion: new Date(),
      idPersona: dataPersona.idPersona,
      idMunicipio: municipio.codigo,
      direccion: `${tipoVia.nombre} ${envio.item1} # ${envio.item2} - ${envio.item3} ${envio.apartamento && envio.apartamento}`,
      barrio: envio.barrio,
      quienRecibe: envio.nombrePersonaRecibe,
      estado: true,
    }

    let factura = axios.post(`${URL}/factura/guardar`, facturaObj);
    let [facturaData] = await axios.all([factura]);
    let { data: dataFactura } = facturaData.data;

    agregarCarrito(dataFactura.idFactura);
  }

  const listar = async () => {
    let personas = axios.get(`${URL}/persona/listar`);
    let facturas = axios.get(`${URL}/factura/listar`);
    let carritos = axios.get(`${URL}/carrito/listar`);
    let productos = axios.get(`${URL}/producto/listar`);

    let [resPersonas, resFacturas, resCarritos, resProductos] = await axios.all([personas, facturas, carritos, productos]);
    let { data: dataPersonas } = resPersonas.data;
    let { data: dataFacturas } = resFacturas.data;
    let { data: dataCarritos } = resCarritos.data;
    let { data: dataProductos } = resProductos.data;

    let array = [];

    dataFacturas.forEach(factura => {
      let persona = dataPersonas.find(iter => iter.idPersona === factura.idPersona);
      let carritos = dataCarritos.filter(iter => iter.idFactura === factura.idFactura);
      let arrayProductos = [];
      let subtotal = 0;
      carritos.forEach(carrito => {
        let producto = dataProductos.find(iter => iter.idProducto === carrito.idProducto);
        let obj = {
          ...producto,
          cantidadSeleccionada: carrito.cantidad
        }
        subtotal += carrito.cantidad * producto.precio;
        arrayProductos.push(obj);
      })

      let obj = {
        ...factura,
        cliente: `${persona.nombre} ${persona.apellido}`,
        documento: persona.documento,
        telefono: persona.telefono,
        carrito: arrayProductos,
        subtotal: subtotal,
        total: subtotal
      }
      array.push(obj);
    })
    setFacturas(array.reverse());
  }

  return (
    <FacturaContext.Provider
      value={{
        facturas,
        agregar,
        listar
      }}>
      {children}
    </FacturaContext.Provider>
  )
}
