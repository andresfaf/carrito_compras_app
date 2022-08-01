import React from 'react';
import { Grid, Typography } from '@mui/material';

/* 
  Este componente tiene como función estructurar los registros
  del resumen de la compra, mostrando el detalle del carrito en la 
  pantalla de finalizar compra
*/

export const ItemResumenCompra = ({ nombre, precio, cantidad }) => {
  return (
    <Grid item container sx={{ borderBottom: '1px solid #c2c2c2', padding: 1 }} >
      <Grid item sx={{width: '100%'}}>
        <Typography align='left' fontSize={14} sx={{ marginBottom: '8px', fontWeight: 600, color: '#565656' }}>{nombre}</Typography>

        <Typography > 
          <span style={{ float: 'left', fontSize: 12 }}>Cantidad. {cantidad}</span>
          <span style={{ float: 'right', fontSize: 12, fontWeight: 'bold' }}>$ {new Intl.NumberFormat().format(precio)}</span>
        </Typography>
      </Grid>
    </Grid>
  )
}
