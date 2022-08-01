import React, { forwardRef, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DialogContent, DialogContentText, Grid, TextField, Typography } from '@mui/material';
import { ProductoContext, CategoriaContext } from '../context';
import { COLOR } from '../helpers/Constantes';
import Autocomplete from '@mui/material/Autocomplete';

/* 
  Este componente tiene como funcion ser la pantalla emergente que se abre al momento de 
  registrar o actualizar un producto
*/

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalAgregarActualizarProducto = ({ modalAgregar, cerrarModalAgregar }) => {

  const { producto, agregar, onChangeProducto, actualizaridCategoria } = useContext(ProductoContext);

  const { listar: listarCategorias, categorias, setCategoria, categoria } = useContext(CategoriaContext);

  useEffect(() => {
    listarCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={modalAgregar}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        cerrarModalAgregar();
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle><Typography variant='h6' align='center'>{!!producto.idProducto ? 'Actualizar Producto' : 'Agregar Producto'}</Typography></DialogTitle>
      <form onSubmit={(e) => {
        e.preventDefault();
        agregar(producto);
        cerrarModalAgregar();
      }}>
        <DialogContent>

          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={1} >
              <Grid item md={12}>
                <Autocomplete
                  noOptionsText={'No hay opciones'}
                  value={categoria}
                  onChange={(event, value) => {
                    setCategoria(value);
                    actualizaridCategoria(value);
                  }}
                  id="categoria"
                  name="categoria"
                  options={categorias}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => <TextField required {...params} variant="outlined" label="Categorias" fullWidth />
                  }
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  value={producto.nombre}
                  label="Nombre"
                  variant="outlined"
                  name='nombre'
                  onChange={onChangeProducto}
                >
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  type='number'
                  value={producto.precio}
                  label="Precio"
                  variant="outlined"
                  name='precio'
                  onChange={onChangeProducto}
                >
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  type='number'
                  value={producto.cantidad}
                  label="Cantidad"
                  variant="outlined"
                  name='cantidad'
                  onChange={onChangeProducto}
                >
                </TextField>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button size='small' onClick={() => {
            cerrarModalAgregar();
          }}
            sx={{ background: COLOR.rojo, color: COLOR.blanco }}
          >Cerrar</Button>
          <Button
            type='submit'
            size='small'
            sx={{ background: COLOR.verdeOscuro, color: COLOR.blanco }}
          >
            {!!producto.idProducto ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
