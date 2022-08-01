import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../context';
import DeleteIcon from '@mui/icons-material/Delete';
import { COLOR } from '../helpers/Constantes';
import { NavLink } from "react-router-dom";
import SecurityIcon from '@mui/icons-material/Security';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

/* 
  Este componente tiene como funcion ser la pantalla principal del carrito,
  donde se muestra el detalle de la compra
*/

export const Carrito = () => {

  const { carrito, eliminarProductoDelCarrito, incrementarCantidadSeleccionada, decrementarCantidadSeleccionada } = useContext(CarritoContext);

  const [datosCompra, setDatosCompra] = useState({
    totalProductos: 0,
    subtotal: 0,
    ahorro: 0,
    total: 0
  });

  useEffect(() => {
    let totalProductos = 0;
    let subtotal = 0;
    carrito.forEach(({ cantidadSeleccionada, precio }) => {
      totalProductos += cantidadSeleccionada;
      subtotal += (precio * cantidadSeleccionada);
    });
    setDatosCompra({
      ...datosCompra,
      totalProductos,
      subtotal,
      total: subtotal

    });
  }, [carrito]);

  return (
    <>
      <Typography align='center' variant='h6' mt={3} sx={{ color: '#A4A4A4' }}>
        <SecurityIcon sx={{ fontSize: 20 }} />&nbsp;Tu compra es <span style={{ fontWeight: 'bold' }}>100% segura</span>
      </Typography>
      <Divider />

      <Grid container m={5}>
        <Grid item container md={8}
          sx={{
            borderRight: '1px solid #c2c2c2',
            marginRight: '20px',
            height: '450px',
            overflow: 'auto',
          }}
        >
          <Grid item md={4}><Typography align='left' sx={{ fontWeight: 'bold' }}>Producto</Typography></Grid>
          <Grid item md={2}><Typography align='right' sx={{ fontWeight: 'bold' }}>Precio</Typography></Grid>
          <Grid item md={3}><Typography align='center' sx={{ fontWeight: 'bold' }}>Cantidad</Typography></Grid>
          <Grid item md={2}><Typography align='right' sx={{ fontWeight: 'bold' }}>Total</Typography></Grid>
          <Grid item md={1}><Typography align='center' sx={{ fontWeight: 'bold' }}></Typography></Grid>
          {
            carrito.map(({ idProducto, nombre, precio, cantidad, cantidadSeleccionada }) => (
              <>
                <Grid item md={4}><Typography align='left' >{nombre}</Typography></Grid>
                <Grid item md={2}><Typography align='right'>$ {new Intl.NumberFormat().format(precio)}</Typography></Grid>

                <Grid item md={3} >
                  <Typography align='center'>

                    <Paper elevation={6} style={{ width: '150px', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px' }}>
                      <span
                        style={{ float: 'left', marginLeft: '10px', padding: '0px 10px 0px 10px', borderRadius: '50px' }}
                        onClick={() => {
                          decrementarCantidadSeleccionada(idProducto, cantidadSeleccionada);
                        }}
                      >
                        <RemoveIcon />
                      </span>
                      <span >{cantidadSeleccionada}</span>
                      <span
                        style={{ float: 'right', marginRight: '10px', padding: '0px 10px 0px 10px', borderRadius: '50px' }}
                        onClick={() => {
                          incrementarCantidadSeleccionada(idProducto, cantidad, cantidadSeleccionada);
                        }}
                      >
                        <AddIcon />
                      </span>
                    </Paper>

                  </Typography>
                </Grid>

                <Grid item md={2}><Typography align='right'>$ {new Intl.NumberFormat().format(precio * cantidadSeleccionada)}</Typography></Grid>
                <Grid item md={1}
                  onClick={() => eliminarProductoDelCarrito(idProducto)}
                >
                  <Typography align='center'><DeleteIcon sx={{ color: COLOR.rojo }} /></Typography>
                </Grid>

              </>
            ))
          }

        </Grid>

        <Grid item container md={3}>
          <Grid item md={12} >
            <Typography align='right'>{datosCompra.totalProductos} Productos</Typography>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center" md={12} mt={2}>
            <Typography align='left' sx={{ fontSize: 20 }} >Subtotal </Typography>
            <Typography align='left' sx={{ fontWeight: 'bold', fontSize: 20 }}>$ {new Intl.NumberFormat().format(datosCompra.subtotal)}</Typography>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center" md={12}>
            <Typography align='left' sx={{ fontSize: 20 }}>Descuento </Typography>
            <Typography align='left' sx={{ fontWeight: 'bold', fontSize: 20 }}>$ {new Intl.NumberFormat().format(datosCompra.ahorro)}</Typography>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center" md={12} mt={2}>
            <Typography align='left' sx={{ fontSize: 20 }}  >Total </Typography>
            <Typography align='left' sx={{ fontWeight: 'bold', fontSize: 20 }}>
              $ {new Intl.NumberFormat().format(datosCompra.total)}
            </Typography>
          </Grid>

          <Grid item md={12} mt={4}>
            <NavLink to='/finalizarcompra' style={{ textDecoration: 'none' }}>
              <Button
                fullWidth
                sx={{
                  background: COLOR.verdeOscuro,
                  color: COLOR.blanco,
                  textTransform: 'none',
                  fontSize: 16
                }}
              >Finalizar Compra</Button>
            </NavLink>
          </Grid>
          <Grid item md={12} mt={1}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <Button
                fullWidth
                sx={{
                  border: `1px solid ${COLOR.verdeOscuro}`,
                  color: 'black',
                  textTransform: 'none',
                  fontSize: 16
                }}
              > Seguir Comprando</Button>
            </NavLink>
            {/**/}
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}
