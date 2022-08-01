import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { COLOR } from '../helpers/Constantes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { PersonaContext } from '../context';
import { ModalEliminar, ModalAgregarActualizarPersona } from '../components';

/* 
  Este componente tiene como funcion ser la pantalla principal de la persona,
  mostrado todos los registros y las diferentes opciones para manejar la informacion
*/

export const Personas = () => {

  const { personas, listar, limpiar, actualizaridPersona, buscarporid } = useContext(PersonaContext);


  useEffect(() => {
    listar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);

  const abrirModalEliminar = () => setModalEliminar(true);
  const abrirModalAgregar = () => setModalAgregar(true);

  const cerrarModalEliminar = () => {
    setModalEliminar(false);
    limpiar();
  };

  const cerrarModalAgregar = () => {
    setModalAgregar(false);
    limpiar();
  };



  return (
    <>
      <Typography variant='h4' align='center' mt={2} mb={2}>Personas</Typography>

      <TableContainer component={Paper}>

        <Typography align='right' >
          <Button sx={{
            background: COLOR.verdeOscuro,
            color: COLOR.blanco,
          }}
            onClick={abrirModalAgregar}
          >
            <AddIcon />
          </Button>
        </Typography>

        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Nombre</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Apellido</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Documento</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Correo Electrónico</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Teléfono</TableCell>
              <TableCell align="center" sx={{ fontSize: 18, fontWeight: 600 }} >Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              personas && personas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ idPersona, nombre, apellido, documento, correo, telefono }) => (
                  <TableRow>
                    <TableCell align="left">{nombre}</TableCell>
                    <TableCell align="left">{apellido}</TableCell>
                    <TableCell align="left">{documento}</TableCell>
                    <TableCell align="left">{correo}</TableCell>
                    <TableCell align="left">{telefono}</TableCell>
                    <TableCell align="center">
                      <Button size='small'
                        sx={{
                          background: COLOR.azulOscuro,
                          color: COLOR.blanco,
                        }}
                        onClick={() => {
                           buscarporid(idPersona);
                           abrirModalAgregar();
                        }}
                      >
                        <EditIcon />
                      </Button>
                      &nbsp;&nbsp;
                      <Button size='small'
                        sx={{
                          background: COLOR.rojo,
                          color: COLOR.blanco,
                        }}
                        onClick={() => {
                          actualizaridPersona(idPersona);
                          abrirModalEliminar();
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={personas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Filas por Páginas'
        />

      </TableContainer>

      <ModalEliminar
        modalEliminar={modalEliminar}
        cerrarModalEliminar={cerrarModalEliminar}
        action='PERSONA'
      />

      <ModalAgregarActualizarPersona
        modalAgregar={modalAgregar}
        cerrarModalAgregar={cerrarModalAgregar}
      />


    </>
  )
}
