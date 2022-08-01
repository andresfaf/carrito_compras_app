import { Typography } from '@mui/material';
import React from 'react';
import NotFound from '../assets/notFound.png';

/* 
  Componente para mostrar mensajes de que se navego a una ruta no aceptada
*/

export const PageNotFound = () => {
  return (
    <>
      <Typography align='center'> <img src={NotFound} alt='Not Found' /> </Typography>
      <Typography align='center' variant='h4'>Página no Encontrada</Typography>
    </>
  )
}
