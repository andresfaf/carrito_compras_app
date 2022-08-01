import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DialogContent, DialogContentText, TextField, Typography } from '@mui/material';
import { CategoriaContext } from '../context';
import { COLOR } from '../helpers/Constantes';

/* 
  Este componente tiene como funcion ser la pantalla emergente que se abre al momento de 
  registrar o actualizar una catgoria
*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalAgregarActualizarCategoria = ({ modalAgregar, cerrarModalAgregar }) => {

  const { categoria, agregar, onChangeCategoria } = useContext(CategoriaContext);

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={modalAgregar}
      TransitionComponent={Transition}
      keepMounted
      onClose={cerrarModalAgregar}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle><Typography variant='h6' align='center'>{!!categoria.idCategoria ? 'Actualizar Categoría' : 'Agregar Categoría'}</Typography></DialogTitle>
      <form onSubmit={(e) => {
        e.preventDefault();
        agregar(categoria);
        cerrarModalAgregar();
      }}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              required
              fullWidth
              value={categoria.nombre}
              label="Ingresar Categoría"
              variant="outlined"
              name='nombre'
              onChange={onChangeCategoria}
            >
            </TextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={cerrarModalAgregar} sx={{ background: COLOR.rojo, color: COLOR.blanco }}>Cerrar</Button>
          <Button
            type='submit'
            size='small'
            sx={{ background: COLOR.verdeOscuro, color: COLOR.blanco }}
          >
            {!!categoria.idCategoria ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
