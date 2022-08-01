import { Grid, Typography } from "@mui/material";
import { COLOR } from '../helpers/Constantes';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';

/* 
  Componente utilizado para el pie de pagina de la aplicación
*/

export const Footer = () => {

  const style = {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
    background: COLOR.azulOscuro,
    color: COLOR.blanco
  }
  return (
    <footer style={style}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography align="center">&nbsp;&nbsp; &#169; &nbsp;&nbsp; Andres Felipe Acosta Fuertes</Typography>
        <Typography align="center" sx={{ marginTop: '0px', margin: '0px' }}>
          <FacebookIcon />&nbsp;&nbsp;
          <InstagramIcon />&nbsp;&nbsp;
          <TwitterIcon />&nbsp;&nbsp;
          <LinkedInIcon />&nbsp;&nbsp;
          <YouTubeIcon />&nbsp;&nbsp;
          <GitHubIcon />&nbsp;&nbsp;
        </Typography>
      </Grid>
    </footer>
  )
}
