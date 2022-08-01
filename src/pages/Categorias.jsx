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
import { CategoriaContext } from '../context';
import { ModalEliminar, ModalAgregarActualizarCategoria } from '../components';

/* 
  Este componente tiene como funcion ser la pantalla principal de la categoria,
  mostrado todos los registros y las diferentes opciones para manejar la informacion
*/

export const Categorias = () => {

  const { categorias, listar, onChangeCategoriaActualizar, limpiar } = useContext(CategoriaContext);

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

  const [modalEliminar, setModalEliminar] = React.useState(false);
  const [modalAgregar, setModalAgregar] = React.useState(false);

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
      <Typography variant='h4' align='center' mt={2} mb={2}>Categorías</Typography>

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
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Nombres</TableCell>
              <TableCell align="center" sx={{ fontSize: 18, fontWeight: 600 }} >Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              categorias && categorias.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ idCategoria, nombre }) => (
                <TableRow>
                  <TableCell align="left">{nombre}</TableCell>
                  <TableCell align="center">
                    <Button size='small'
                      sx={{
                        background: COLOR.azulOscuro,
                        color: COLOR.blanco,
                      }}
                      onClick={() => {
                        onChangeCategoriaActualizar(idCategoria, nombre);
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
                        onChangeCategoriaActualizar(idCategoria, nombre);
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
          count={categorias.length}
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
        action={'CATEGORIA'}
      />
      <ModalAgregarActualizarCategoria
        modalAgregar={modalAgregar}
        cerrarModalAgregar={cerrarModalAgregar} />

    </>
  )
}
