import React, { Component } from "react";
import { Grid, Typography } from '@mui/material';

/* 
  Este componnte tiene como funcion estructurar y poder dejar ver la 
  factura final, que seria el resumen de la compra
*/

export default class Factura extends Component {

  render() {
    const {
      date,
      nombre,
      documento,
      telefono,
      nombrePersonaRecibe,
      carrito,
      subtotal,
      total,
      tipoVia,
      item1,
      item2,
      item3,
      apartamento,
      barrio
    } = this.props;

    const style = {
      fontSize: 12
    }

    const styleData = {
      marginRight: 'auto'
    }

    return (
      <>
        <Grid container spacing={2} sx={{ width: '40%', marginLeft: 'auto', marginRight: 'auto' }}>

          <Grid item sm={12} sx={{ marginTop: 2, marginLeft: 'auto', marginRight: 'auto' }}><Typography align='center' sx={{ fontWeight: 600 }}>TODO SISTEMAS STI</Typography> </Grid>
          <Grid item sm={12} sx={{ marginLeft: 'auto', marginRight: 'auto' }}><Typography align='center' sx={{ fontWeight: 600, marginTop: -2 }}>NIT 830120348-3</Typography> </Grid>

          <Grid item container sx={{ marginTop: -1 }}>
            <Grid item sm={3} sx={{ marginRight: '50px' }}><Typography align='left' sx={style}>Fecha</Typography></Grid>
            <Grid item sm={9} sx={styleData}  ><Typography align='left' sx={style}>{String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear()}</Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -2 }}>
            <Grid item sm={3} sx={{ marginRight: '45px' }}><Typography align='left' sx={style}>Cliente</Typography></Grid>
            <Grid item sm={9} sx={styleData}  ><Typography align='left' sx={style}>{nombre}</Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -2 }} >
            <Grid item sm={3} sx={{ marginRight: '20px' }}><Typography align='left' sx={style}>Documento</Typography></Grid>
            <Grid item sm={9} sx={styleData} ><Typography align='left' sx={style}>{documento}</Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -2 }}>
            <Grid item sm={3} sx={{ marginRight: '33px' }}><Typography align='left' sx={style}>Dirección</Typography></Grid>
            <Grid item sm={9} sx={styleData} ><Typography align='left' sx={style}>
              {`${tipoVia} ${item1} # ${item2} - ${item3} ${apartamento && apartamento} - ${barrio}`}
            </Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -2 }}>
            <Grid item sm={3} sx={{ marginRight: '40px' }}><Typography align='left' sx={style}>Teléfono</Typography></Grid>
            <Grid item sm={9} sx={styleData} ><Typography align='left' sx={style}>{telefono}</Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -2 }}>
            <Grid item sm={3} sx={{ marginRight: '13px' }}><Typography align='left' sx={style}>Quien Recibe</Typography></Grid>
            <Grid item sm={9} sx={styleData} ><Typography align='left' sx={style}>{nombrePersonaRecibe}</Typography> </Grid>
          </Grid>

         

          <Grid item container sx={{ marginTop: 1 }}>
            <Grid item sm={3} sx={{ marginRight: '10px', width: '90px' }}><Typography align='left' sx={style}>Descripción</Typography></Grid>
            <Grid item sm={3} sx={{ marginRight: '10px', width: '10px' }}><Typography align='right' sx={style}>Cant</Typography> </Grid>
            <Grid item sm={3} sx={{ marginRight: '10px', width: '80px' }}><Typography align='right' sx={style}>Valor</Typography> </Grid>
            <Grid item sm={3} sx={{ width: '80px' }}><Typography align='right' sx={style}>Total</Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -1 }}>
            {
              carrito && carrito.map(({ nombre, precio, cantidadSeleccionada }) => (
                <>
                  <Grid item sm={3} sx={{ marginRight: '10px', width: '90px' }}><Typography align='left' sx={style}>{nombre}</Typography></Grid>
                  <Grid item sm={3} sx={{ marginRight: '10px', width: '10px' }}><Typography align='right' sx={style}>{cantidadSeleccionada}</Typography> </Grid>
                  <Grid item sm={3} sx={{ marginRight: '10px', width: '80px' }}><Typography align='right' sx={style}>$ {new Intl.NumberFormat().format(precio)}</Typography> </Grid>
                  <Grid item sm={3} sx={{ width: '80px' }}><Typography align='right' sx={style}>$ {new Intl.NumberFormat().format(precio * cantidadSeleccionada)}</Typography> </Grid>
                  <Grid item sm={3} sx={{ marginTop: -2 }}>______________________________________</Grid>
                </>
              ))
            }
          </Grid>

          <Grid item container sx={{ marginTop: 1 }}>
            <Grid item sm={6} sx={{ marginRight: '40px' }}><Typography align='left' sx={style}>Subtotal</Typography></Grid>
            <Grid item sm={6}><Typography align='left' sx={style}>$ {subtotal}</Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -2 }}>
            <Grid item sm={6} sx={{ marginRight: '26px' }}><Typography align='left' sx={style}>Descuento</Typography></Grid>
            <Grid item sm={6}><Typography align='left' sx={style}>$ 0</Typography> </Grid>
          </Grid>

          <Grid item container sx={{ marginTop: -2 }}>
            <Grid item sm={6} sx={{ marginRight: '59px' }}><Typography align='left' sx={style}>Total</Typography></Grid>
            <Grid item sm={6}><Typography align='left' sx={style}>$ {total}</Typography> </Grid>
          </Grid>

        </Grid>
      </>
    )
  }
}
