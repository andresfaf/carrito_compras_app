import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { COLOR } from '../helpers/Constantes';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid, Paper } from '@mui/material';
import { CarritoContext } from '../context';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import NotImage from '../assets/notImage.png';
import { ModalProductoAgregadoalCarrito } from '../components';

/* 
  Este componente tiene como función generar la estructura de los productos
  cuando se escoje una categoria para pdoer agregalos al carrito
*/

export const CardProducto = ({ producto }) => {

  const { validarProducto } = useContext(CarritoContext);

  const [cantidad, setCantidad] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper elevation={10}>
        <Card>
          <CardMedia
            sx={{ padding: 1 }}
            component="img"
            height="150"
            src={NotImage}
            alt="green iguana"
          />
          <CardContent
            sx={{ maxHeight: 120, minHeight: 120 }}
          >
            <Typography fontSize={15} > {producto.nombre} </Typography>
            <br />
            <Typography fontSize={15} sx={{ color: '#8B8B8B' }} align='center'>$ {new Intl.NumberFormat().format(producto.precio)} </Typography>
          </CardContent>
          <Paper elevation={6} sx={{ margin: '0px 10px 0px 10px' }}>
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
              <Grid item onClick={() => {
                if (cantidad !== 0) {
                  setCantidad(cantidad - 1);
                }
              }}><RemoveIcon /></Grid>
              <Grid item sx={{ fontSize: '22px', fontWeight: 'bold' }}>{cantidad}</Grid>
              <Grid item onClick={() => setCantidad(cantidad + 1)}><AddIcon /></Grid>
            </Grid>
          </Paper>
          <CardActions>
            <Button
              fullWidth
              size="small"
              sx={{
                background: COLOR.verdeOscuro,
                color: COLOR.blanco,
                textTransform: 'none'
              }}
              startIcon={<ShoppingCartIcon />}
              variant='text'
              onClick={() => {
                if (cantidad === 0) {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'La cantidad no puede estar en cero',
                    showConfirmButton: false,
                    timer: 1500
                  });
                } else {
                  let validacion = validarProducto(producto, cantidad);
                  if (validacion) handleClickOpen();

                  setCantidad(0);
                }
              }}
            >Agregar al Carrito
            </Button>
          </CardActions>
        </Card>
      </Paper>

      <ModalProductoAgregadoalCarrito open={open} handleClose={handleClose} />
    </>
  )
}
