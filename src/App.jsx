import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { HomePage, PageNotFound, Categorias, Productos, Personas, Facturas, Carrito, FinalizarCompra } from "./pages";
import { CategoriaProvider, ProductoProvider, PersonaProvider, CarritoProvider, FacturaProvider } from "./provider";

/* 
  Componente que tiene como funcion Rutear las diferentes vistas del header y
  poner los componentes de la carpeta provider en contexto global, esto con el fin de
  poder utilizar los metodos y variables que se encuentras en el interior de cada uno en toda
  la aplicacion
*/

function App() {
  return (
    <>
      <CategoriaProvider>
        <ProductoProvider >
          <PersonaProvider >
            <CarritoProvider >
              <FacturaProvider >
                <Header />

                <Routes>
                  <Route path="/" element={<HomePage />}></Route>

                  <Route path="/categorias" element={<Categorias />}></Route>
                  <Route path="/productos" element={<Productos />}></Route>
                  <Route path="/personas" element={<Personas />}></Route>
                  <Route path="/facturas" element={<Facturas />}></Route>
                  <Route path="/carrito" element={<Carrito />}></Route>
                  <Route path="/finalizarcompra" element={<FinalizarCompra />}></Route>

                  <Route path="/*" element={<PageNotFound />}></Route>
                </Routes>

                <Footer />
              </FacturaProvider>
            </CarritoProvider>
          </PersonaProvider>
        </ProductoProvider>
      </CategoriaProvider>
    </>
  );
}

export default App;
