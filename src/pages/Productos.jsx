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
import { ProductoContext, CategoriaContext } from '../context';
import { ModalAgregarActualizarProducto, ModalEliminar } from '../components';

/* 
  Este componente tiene como funcion ser la pantalla principal del producto,
  mostrado todos los registros y las diferentes opciones para manejar la informacion
*/

export const Productos = () => {

  const { listar, productos, limpiar, actualizaridProducto, buscarporid } = useContext(ProductoContext);
  const { limpiar: limpiarCategoria } = useContext(CategoriaContext);

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
    limpiarCategoria();
  };

  const cerrarModalAgregar = () => {
    setModalAgregar(false);
    limpiar();
    limpiarCategoria();
  };

  return (
    <>
      <Typography variant='h4' align='center' mt={2} mb={2}>Productos</Typography>

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
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Categoría</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Nombre</TableCell>
              <TableCell align="right" sx={{ fontSize: 18, fontWeight: 600 }} >Precio</TableCell>
              <TableCell align="right" sx={{ fontSize: 18, fontWeight: 600 }} >Cantidad</TableCell>
              <TableCell align="center" sx={{ fontSize: 18, fontWeight: 600 }} >Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              productos && productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ idProducto, categoria, nombre, precio, cantidad }) => (
                <TableRow>
                  <TableCell align="left">{categoria}</TableCell>
                  <TableCell align="left">{nombre}</TableCell>
                  <TableCell align="right">$ {new Intl.NumberFormat().format(precio)}</TableCell>
                  <TableCell align="right">{cantidad}</TableCell>
                  <TableCell align="center">
                    <Button size='small'
                      sx={{
                        background: COLOR.azulOscuro,
                        color: COLOR.blanco,
                      }}
                      onClick={() => {
                        buscarporid(idProducto);
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
                        actualizaridProducto(idProducto);
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
          count={productos.length}
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
        action={'PRODUCTO'}
      />
      <ModalAgregarActualizarProducto
        modalAgregar={modalAgregar}
        cerrarModalAgregar={cerrarModalAgregar}
      />

    </>
  )
}
