import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from "react-router-dom";
import { COLOR } from '../helpers/Constantes';
import { Typography } from '@mui/material';

/* 
  Este componente tiene como funcion ser la pantalla emergente que se abre al momento de 
  agregar un producto al carrito de compras
*/

export const ModalProductoAgregadoalCarrito = ({ open, handleClose }) => {

  return (
    <Dialog
      maxWidth='sm'
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography align='center' variant='h5'>Producto agregado con éxito</Typography>
      </DialogTitle>
      <DialogActions>
        <Button
          sx={{
            border: `1px solid ${COLOR.verdeOscuro}`,
            color: 'black'
          }}
          onClick={() => handleClose()}
        >
          Seguir comprando
        </Button>
        &nbsp;&nbsp;&nbsp;
        <NavLink to='/carrito' style={{ textDecoration: 'none' }}>
          <Button
            sx={{
              background: COLOR.verdeOscuro,
              color: COLOR.blanco
            }}>
            Ir al carrito
          </Button>
        </NavLink>
      </DialogActions>
    </Dialog>
  )
}
