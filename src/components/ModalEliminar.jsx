import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Typography } from '@mui/material';
import { CategoriaContext, ProductoContext, PersonaContext } from '../context';
import { COLOR } from '../helpers/Constantes';

/* 
  Este componente tiene como funcion ser la pantalla emergente que se abre al momento de 
  liminar un registro, sirve como comprobación antes de elimianr el registro
*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalEliminar = ({ modalEliminar, cerrarModalEliminar, action }) => {

  const { categoria, eliminar: eliminarCategoria } = useContext(CategoriaContext);
  const { producto, eliminar: eliminarProducto } = useContext(ProductoContext);
  const { persona, eliminar: eliminarPersona } = useContext(PersonaContext);

  return (
    <Dialog
      open={modalEliminar}
      TransitionComponent={Transition}
      keepMounted
      onClose={cerrarModalEliminar}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle><Typography variant='h6' align='center'>¿Esta Seguro de Eliminar este Registro?</Typography></DialogTitle>
      <DialogActions>
        <Button size='small' onClick={cerrarModalEliminar} sx={{ background: COLOR.rojo, color: COLOR.blanco }}>Cerrar</Button>
        <Button
          size='small'
          onClick={() => {
            switch (action) {
              case 'CATEGORIA':
                eliminarCategoria(categoria.idCategoria);
                break;
              case 'PRODUCTO':
                eliminarProducto(producto.idProducto);
                break;
              case 'PERSONA':
                eliminarPersona(persona.idPersona);
                break;
                
              default:
                break;
            }

            cerrarModalEliminar();
          }}
          sx={{ background: COLOR.verdeOscuro, color: COLOR.blanco }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
