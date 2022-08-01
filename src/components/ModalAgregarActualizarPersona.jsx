import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DialogContent, DialogContentText, Grid, TextField, Typography } from '@mui/material';
import { PersonaContext } from '../context';
import { COLOR } from '../helpers/Constantes';

/* 
  Este componente tiene como funcion ser la pantalla emergente que se abre al momento de 
  registrar o actualizar una persona
*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalAgregarActualizarPersona = ({ modalAgregar, cerrarModalAgregar }) => {

  const { persona, agregar, onChangePersona } = useContext(PersonaContext);

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
      <DialogTitle><Typography variant='h6' align='center'>{!!persona.idPersona ? 'Actualizar Persona' : 'Agregar Persona'}</Typography></DialogTitle>
      <form onSubmit={(e) => {
        e.preventDefault();
        agregar(persona);
        cerrarModalAgregar();
      }}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={1} >
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  value={persona.documento}
                  label="Número de Documento"
                  variant="outlined"
                  name='documento'
                  onChange={onChangePersona}
                >
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  value={persona.nombre}
                  label="Nombre"
                  variant="outlined"
                  name='nombre'
                  onChange={onChangePersona}
                >
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  value={persona.apellido}
                  label="Apellido"
                  variant="outlined"
                  name='apellido'
                  onChange={onChangePersona}
                >
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  type='email'
                  required
                  fullWidth
                  value={persona.correo}
                  label="Correo"
                  variant="outlined"
                  name='correo'
                  onChange={onChangePersona}
                >
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  type='telefono'
                  required
                  fullWidth
                  value={persona.telefono}
                  label="Teléfono"
                  variant="outlined"
                  name='telefono'
                  onChange={onChangePersona}
                >
                </TextField>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={cerrarModalAgregar} sx={{ background: COLOR.rojo, color: COLOR.blanco }}>Cerrar</Button>
          <Button
            type='submit'
            size='small'
            sx={{ background: COLOR.verdeOscuro, color: COLOR.blanco }}
          >
            {!!persona.idPersona ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
