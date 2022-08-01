import React, { useContext, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { HeaderCarrito, CardProducto } from '../components';
import { ProductoContext, CategoriaContext } from '../context';

/* 
  Este componente tiene como fucnión ser la pantalla principal de la aplicacion
  donde se va a poder seleccionar la categoria y a su ves los productos que se van a 
  agregar al carrito de compras
*/

export const HomePage = () => {

  const { productosxCategoria } = useContext(ProductoContext);
  const { categoriaSeleccionada, listar, categorias } = useContext(CategoriaContext);

  useEffect(() => {
    listar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorias])

  return (
    <>
      <HeaderCarrito />

      <Grid container spacing={2} mb={10}>
        <Grid item md={2} mt={2}></Grid>
        <Grid item container md={9} spacing={5}>
          <Grid item md={12} sx={{ marginTop: 2 }}>
            <Typography align='center' variant='h5'>{categoriaSeleccionada || 'Seleccionar Categoría'}</Typography>
          </Grid>
          {
            productosxCategoria.map((producto) => (
              <Grid item md={3}>
                <CardProducto producto={producto} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </>
  )
}
