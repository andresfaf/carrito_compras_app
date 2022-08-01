import React, { useContext, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { COLOR } from '../helpers/Constantes';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CategoriaContext, ProductoContext, CarritoContext } from '../context';
import { NavLink } from "react-router-dom";

/* 
  Este componente tiene como funcion ser el segundo encabezado 
  en la pagina principal, para que hay se pueda seleccionar las diferentes categorias 
  y navegar al carrito de compras
*/

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 0,
    border: `2px solid white`,
    background: COLOR.azulOscuro,
    color: COLOR.blanco,
    padding: '0 4px',
  },
}));

export const HeaderCarrito = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { categorias, listar, setCategoriaSeleccionada } = useContext(CategoriaContext);
  const { buscarProductosxCategoria } = useContext(ProductoContext);
  const { acumuladorCarrito } = useContext(CarritoContext);

  useEffect(() => {
    listar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 1, marginLeft: -1, marginRight: -1 }}>
      <AppBar position="static" sx={{ background: COLOR.verdeOscuro, color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: COLOR.blanco }} onClick={handleClick}>
            Categorías
          </Typography>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              categorias.map(({ idCategoria, nombre }) => (
                <MenuItem onClick={() => {
                  buscarProductosxCategoria(idCategoria);
                  setCategoriaSeleccionada(nombre);
                  handleClose();
                }}>{nombre}</MenuItem>
              ))
            }
          </Menu>

          <NavLink to='/carrito'>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={acumuladorCarrito} >
                <Typography style={{ color: COLOR.blanco, textDecoration: 'none' }}>Ir al carrito</Typography><ShoppingCartIcon sx={{ color: COLOR.blanco }} />
              </StyledBadge>
            </IconButton>
          </NavLink>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
