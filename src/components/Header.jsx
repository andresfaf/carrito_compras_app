import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Icon from '../assets/todoSistemas-icon-1.png';
import { NavLink } from "react-router-dom";
import { COLOR } from '../helpers/Constantes';

/* 
  Componente utilizado para el encabezado general de la aplicación
*/

export function Header() {

  const styleInactivo = {
    textDecoration: 'none',
    marginRight: '40px',
    color: COLOR.verdeOscuro
  }

  const style1Activo = {
    textDecoration: 'none',
    marginRight: '40px',
    color: COLOR.azulOscuro,
    borderBottom: `1px solid ${COLOR.azulClaro}`
  }

  return (
    <Box sx={{ flexGrow: 1, margin: -1 }}>
      <AppBar position="static" sx={{ background: 'white', color: 'black' }}>
        <Toolbar>
          <NavLink to='/' >
          <img src={Icon} alt='Logo Todo Sistemas' width={200} />
          </NavLink>

          <NavLink to='/' style={({ isActive }) => isActive ? style1Activo : styleInactivo} >
            <Typography variant="h6"> Home</Typography>
          </NavLink>

          <NavLink to='/categorias' style={({ isActive }) => isActive ? style1Activo : styleInactivo} >
            <Typography variant="h6"> Categorías</Typography>
          </NavLink>

          <NavLink to='/productos' style={({ isActive }) => isActive ? style1Activo : styleInactivo} >
            <Typography variant="h6"> Productos</Typography>
          </NavLink>

          <NavLink to='/personas' style={({ isActive }) => isActive ? style1Activo : styleInactivo} >
            <Typography variant="h6"> Personas</Typography>
          </NavLink>

          <NavLink to='/facturas' style={({ isActive }) => isActive ? style1Activo : styleInactivo} >
            <Typography variant="h6"> Facturas</Typography>
          </NavLink>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
