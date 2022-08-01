import React, { useContext, useEffect, useRef, useState } from 'react';
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { CarritoContext, FacturaContext } from '../context';
import NumbersIcon from '@mui/icons-material/Numbers';
import { ItemResumenCompra } from '../components';
import Factura from '../components/Factura';
import { COLOR } from '../helpers/Constantes';
import ReactToPrint from 'react-to-print';
import { useNavigate } from 'react-router-dom';

/* 
  Este componente tiene como funcion mostrar el resumen de la compra,
  y para que el usuario ingrese los datos del servicio, 
  datos como la informacion del clinetes y dl envio
*/

export const FinalizarCompra = () => {

  const navigate = useNavigate();
  const componentRef = useRef();

  const {
    departamento,
    municipio,
    tipoVia,
    envio,
    identificacion,
    onChangeIdentificacion,
    setDepartamento,
    setMunicipio,
    setTipoVia,
    onChangeEnvio,
    carrito
  } = useContext(CarritoContext);

  const { agregar } = useContext(FacturaContext);

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let acu = 0;
    carrito.forEach(({ precio, cantidadSeleccionada }) => {
      acu += precio * cantidadSeleccionada;
    });
    setSubtotal(acu);
  }, [carrito]);


  const obtenerTotal = () => {
    let total = 0;
    carrito.forEach(({ precio, cantidadSeleccionada }) => {
      total += precio * cantidadSeleccionada;
    });
    return total;
  }

  const format = (dato) => {
    return new Intl.NumberFormat().format(dato);
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        agregar();
      }}>

        <Typography align='center' variant='h5' mt={3}>Finalizar Compra</Typography>
        <Grid container mt={2} direction="row" justifyContent="center" alignItems="flex-start">

          <Grid item container md={8} sm={8} lg={6} sx={{ padding: 2, marginBottom: 10 }}>
            {/* Identificacion */}
            <Grid item container spacing={2} sx={{ border: '1px solid #c2c2c2', padding: 2 }}>
              <Grid item md={12} sm={12}><Typography variant='h6' sx={{ fontWeight: 'bold' }}>Identificación</Typography></Grid>
              <Grid item md={12} sm={12}>
                <TextField
                  value={identificacion.correo}
                  size='small'
                  required
                  fullWidth
                  label='Correo'
                  name='correo'
                  type='email'
                  onChange={onChangeIdentificacion}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <TextField
                  value={identificacion.nombre}
                  size='small'
                  required
                  fullWidth
                  label='Nombre'
                  name='nombre'
                  onChange={onChangeIdentificacion}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <TextField
                  value={identificacion.apellido}
                  size='small'
                  required
                  fullWidth
                  label='Apellido'
                  name='apellido'
                  onChange={onChangeIdentificacion}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <TextField
                  value={identificacion.documento}
                  size='small'
                  required
                  fullWidth
                  label='Cédula de Ciudadanía'
                  name='documento'
                  onChange={onChangeIdentificacion}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <TextField
                  value={identificacion.telefono}
                  size='small'
                  required
                  fullWidth
                  label='Teléfono'
                  name='telefono'
                  onChange={onChangeIdentificacion}
                />
              </Grid>
            </Grid>
            {/* Envio */}
            <Grid item container spacing={2} sx={{ border: '1px solid #c2c2c2', padding: 2, marginTop: 5 }}>
              <Grid item md={12} sm={12}><Typography variant='h6' sx={{ fontWeight: 'bold' }}>Envio</Typography></Grid>
              <Grid item md={12}>
                <Autocomplete
                  noOptionsText={'No hay opciones'}
                  value={departamento}
                  onChange={(event, value) => setDepartamento(value)}
                  id="departamento"
                  size='small'
                  name="departamento"
                  options={[{ nombre: "Antioquia", codigo: 1 }]}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => <TextField required {...params} variant="outlined" label="Departamentos" fullWidth />
                  }
                />
              </Grid>
              <Grid item md={12}>
                <Autocomplete
                  noOptionsText={'No hay opciones'}
                  value={municipio}
                  onChange={(event, value) => setMunicipio(value)}
                  id="municipio"
                  size='small'
                  name="municipio"
                  options={[
                    { nombre: "Medellín", codigo: 1 },
                    { nombre: "Itagui", codigo: 2 },
                    { nombre: "Bello", codigo: 3 },
                    { nombre: "Envigado", codigo: 4 },
                    { nombre: "La Extrella", codigo: 5 },
                    { nombre: "Sabaneta", codigo: 6 },
                  ]}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => <TextField required {...params} variant="outlined" label="Municipios" fullWidth />
                  }
                />
              </Grid>
              <Grid item md={12} sm={12}><Typography fontSize={16} sx={{ fontWeight: 'bold' }}>Complete su dirección de entrega</Typography></Grid>
              <Grid item md={12}>
                <Autocomplete
                  noOptionsText={'No hay opciones'}
                  value={tipoVia}
                  onChange={(event, value) => setTipoVia(value)}
                  id="tipoVia"
                  size='small'
                  name="tipoVia"
                  options={[
                    { nombre: "Avenida" },
                    { nombre: "Avenida Calle" },
                    { nombre: "Avenida Carrera" },
                    { nombre: "Calle" },
                    { nombre: "Carrera" },
                    { nombre: "Circular" },
                    { nombre: "Diagonal" },
                    { nombre: "Transversal" },
                    { nombre: "Autopista" },
                    { nombre: "Kilómetro" },
                    { nombre: "Circunvalar" },
                    { nombre: "Manzana" },
                    { nombre: "Apartado Aéreo" },
                  ]}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => <TextField required {...params} variant="outlined" label="Tipo de vía" fullWidth />
                  }
                />
              </Grid>
              <Grid item md={4} sm={12}>
                <TextField
                  value={envio.item1}
                  size='small'
                  required
                  fullWidth
                  label='Ej 24A'
                  name='item1'
                  onChange={onChangeEnvio}
                />
              </Grid>
              <Grid item md={1} sm={12}><NumbersIcon /></Grid>
              <Grid item md={4} sm={12}>
                <TextField
                  value={envio.item2}
                  size='small'
                  required
                  fullWidth
                  label='59B'
                  name='item2'
                  onChange={onChangeEnvio}
                />
              </Grid>
              <Grid item md={3} sm={12}>
                <TextField
                  value={envio.item3}
                  size='small'
                  required
                  fullWidth
                  label='49'
                  name='item3'
                  onChange={onChangeEnvio}
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <TextField
                  disabled
                  value={`${!!tipoVia ? tipoVia.nombre : ''} ${envio.item1} # ${envio.item2} - ${envio.item3}`}
                  size='small'
                  fullWidth
                  label='Dirección'
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <TextField
                  value={envio.apartamento}
                  size='small'
                  fullWidth
                  label='Piso o Apartamento'
                  name='apartamento'
                  onChange={onChangeEnvio}
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <TextField
                  value={envio.barrio}
                  size='small'
                  required
                  fullWidth
                  label='Barrio'
                  name='barrio'
                  onChange={onChangeEnvio}
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <TextField
                  value={envio.nombrePersonaRecibe}
                  size='small'
                  required
                  fullWidth
                  label='Nombre de la persona que va a recibir'
                  name='nombrePersonaRecibe'
                  onChange={onChangeEnvio}
                />
              </Grid>
            </Grid>
            {/* Btn enviar */}
            <Grid item md={12} mt={2}>
              <Typography align='center'>
                <ReactToPrint
                  trigger={() => <Button
                    type='submt'
                    sx={{ background: COLOR.verdeOscuro, color: COLOR.blanco, width: '50%' }}
                  >
                    Generar factura
                  </Button>}
                  onAfterPrint={() => navigate('/facturas')}
                  content={() => componentRef.current}
                />
              </Typography>

            </Grid>
          </Grid>

          {/* rsumen de la compra */}
          <Grid item container md={3} sm={3} lg={3} direction="column" justifyContent="flex-start" alignItems="center"
            sx={{ border: '1px solid #c2c2c2', padding: 2 }}>
            <Grid item mb={2}>
              <Typography variant='h6' align='center' sx={{ fontWeight: 'bold' }}>Resumen de la compra</Typography>
            </Grid>
            {
              carrito.map(({ nombre, precio, cantidadSeleccionada }) => (
                <ItemResumenCompra nombre={nombre} precio={precio} cantidad={cantidadSeleccionada} />
              ))
            }


            <Grid container direction="row" justifyContent="space-between" alignItems="center"
              sx={{ borderBottom: '1px solid #c2c2c2', color: '#a4a4a4' }} mt={4}>
              <Typography>Subtotal</Typography>
              <Typography>$ {new Intl.NumberFormat().format(subtotal)}</Typography>
            </Grid>

            <Grid container direction="row" justifyContent="space-between" alignItems="center"
              sx={{ color: '#a4a4a4' }}>
              <Typography>Total</Typography>
              <Typography>$ {new Intl.NumberFormat().format(subtotal)}</Typography>
            </Grid>

          </Grid>

        </Grid>
      </form>

      <div style={{ display: 'none' }}>
        <Factura
          ref={componentRef}
          date={new Date()}
          nombre={identificacion.nombre}
          documento={identificacion.documento}
          telefono={identificacion.telefono}
          nombrePersonaRecibe={envio.nombrePersonaRecibe}
          carrito={carrito}
          subtotal={format(obtenerTotal())}
          total={format(obtenerTotal())}
          tipoVia={tipoVia && tipoVia.nombre}
          item1={envio.item1}
          item2={envio.item2}
          item3={envio.item3}
          apartamento={envio.apartamento}
          barrio={envio.barrio}
        />
      </div>
    </>
  )
}
