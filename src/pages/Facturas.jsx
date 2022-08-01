import React, { useContext, useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { FacturaContext } from '../context';
import Factura from '../components/Factura';
import ReactToPrint from 'react-to-print';
import { COLOR } from '../helpers/Constantes';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

/* 
  Este componente tiene como funcion ser la pantalla principal de la factura,
  mostrado todos los registros y poderla visualizar 
*/

export const Facturas = () => {

  const componentRef = useRef();

  const { facturas, listar } = useContext(FacturaContext);

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

  const [data, setData] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    nombrePersonaRecibe: '',
    carrito: '',
    subtotal: '',
    total: '',
    barrio: '',
    tipoVia: '',
    item1: '',
    item2: '',
    item3: '',
    apartamento: ''
  });

  const format = (dato) => {
    return new Intl.NumberFormat().format(dato);
  }

  const cargarInfo = ({ cliente, documento, telefono, quienRecibe, carrito, subtotal, total, direccion, barrio }) => {

    let indiceTipoVia = direccion.indexOf(' ');
    let indice1 = direccion.indexOf('#');
    let indice2 = direccion.indexOf('-');
    let indice3 = direccion.indexOf(' ', indice2 + 2);

    let tipoVia = direccion.substring(0, indiceTipoVia);
    let item1 = direccion.substring(indiceTipoVia + 1, indice1 - 1);
    let item2 = direccion.substring(indice1 + 2, indice2 - 1);
    let item3 = direccion.substring(indice2 + 2, indice3);
    let apartamento = direccion.substring(indice3 + 1);

    setData({
      ...data,
      nombre: cliente,
      documento,
      telefono,
      nombrePersonaRecibe: quienRecibe,
      carrito,
      subtotal,
      total,
      barrio,
      tipoVia,
      item1,
      item2,
      item3,
      apartamento
    });

    setTimeout(() => {
      document.getElementById('imprimir').click();
    }, 1000);

  }

  return (
    <>

      <Typography variant='h4' align='center' mt={2} mb={2}>Facturas</Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Cliente</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Dirección</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Barrio</TableCell>
              <TableCell align="left" sx={{ fontSize: 18, fontWeight: 600 }} >Fecha</TableCell>
              <TableCell align="right" sx={{ fontSize: 18, fontWeight: 600 }} >Total</TableCell>
              <TableCell align="center" sx={{ fontSize: 18, fontWeight: 600 }} >Ver Factura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              facturas && facturas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((factura) => (
                <TableRow>
                  <TableCell align="left">{factura.cliente}</TableCell>
                  <TableCell align="left">{factura.direccion}</TableCell>
                  <TableCell align="left">{factura.barrio}</TableCell>
                  <TableCell align="left">{factura.fechaCreacion}</TableCell>
                  <TableCell align="right">$ {new Intl.NumberFormat().format(factura.precio)}</TableCell>
                  <TableCell align="center">
                    <Button sx={{ color: COLOR.verdeOscuro, width: '50%' }} onClick={() => cargarInfo(factura)}>
                      <ReceiptLongIcon sx={{ fontSize: 35 }} />
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
          count={facturas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Filas por Páginas'
        />
      </TableContainer>

      <div style={{ display: 'none' }}>
        <ReactToPrint
          trigger={() => <Button
            id='imprimir'
            sx={{ background: COLOR.verdeOscuro, color: COLOR.blanco, width: '50%' }}
          >
            Generar factura
          </Button>}
          content={() => componentRef.current}
        />
        <Factura
          ref={componentRef}
          date={new Date()}
          nombre={data.nombre}
          documento={data.documento}
          telefono={data.telefono}
          nombrePersonaRecibe={data.nombrePersonaRecibe}
          carrito={data.carrito}
          subtotal={format(data.subtotal)}
          total={format(data.total)}
          tipoVia={data.tipoVia}
          item1={data.item1}
          item2={data.item2}
          item3={data.item3}
          apartamento={data.apartamento}
          barrio={data.barrio}
        />
      </div>
    </>
  )
}
