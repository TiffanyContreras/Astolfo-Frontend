import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import Inicio from "./components/inicio/Inicio";
import Login from "./components/login/Login";
import Registro from "./components/registro/Registro";
import NavUsuario from "./components/navegacion_usuario/NavUsuario";
import Perfil from "./components/perfil/Perfil";
import Cartelera from "./components/cartelera/Cartelera";
import DescripcionPelicula from "./components/descripcion_pelicula/DescripcionPelicula";
import CantidadBoletas from "./components/cantidad_boletas/CantidadBoletas";
import SeleccionSillas from "./components/seleccion_sillas/SeleccionSillas";
import ResumenCompra from "./components/resumen_compra/ResumenCompra";
import Snacks from "./components/snacks/Snacks";
import TarjetaCredito from "./components/tarjeta_credito/TerjetaCredito";
import axios from "axios";
//import MovieForm from "./components/nueva_pelicula/MovieForm";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
class App extends Component {
  state = {
    login: false,
    consulta_p: true,
    consulta_s: true,
    reserva: false,
    boletas: false,
    sillas: false,
    pelicula_escogida: false,
    snacks: false,
    list_movies: [],
    list_snakcs: [],
    objPreReserva: {},
    objReserva: {},
    objBoletas: {},
    objSnacks: {},
    objSillas: {},
    persona: {},
    cliente: {},
    authtoken: {},
    pelicula: {},
  };

  componentDidMount() {
    if (this.state.consulta_p) {
      axios
        .get("https://astolfo.fly.dev/peliculas")
        .then((response) => {
          this.setState({ list_movies: response.data, consulta_p: false });
        })
        .catch((error) => {
          toast(error.response.data.message, { type: "error" });
        });
    }
    if (this.state.consulta_s) {
      axios
        .get("https://astolfo.fly.dev/snack")
        .then((response) => {
          this.setState({ list_snakcs: response.data, consulta_s: false });
        })
        .catch((error) => {
          toast(error.response.data.message, { type: "error" });
        });
    }
  }

  obtenerDatosUsuarioIngresado = (persona, cliente, authtoken) => {
    this.setState({
      persona: persona,
      cliente: cliente,
      authtoken: authtoken,
      login: true,
    });
  };

  obtenerPeliculaEscogida = (pelicula) => {
    this.setState({ pelicula: pelicula, pelicula_escogida: true });
  };

  consultarDisponibilidad = async (objPreReserva) => {
    this.setState({ objPreReserva: objPreReserva });
    axios
      .get(
        "https://astolfo.fly.dev/reserva/" +
          objPreReserva.sala +
          "/" +
          objPreReserva.funcion +
          "/" +
          this.state.persona?.data?.pk_numero_identificacion,
        {
          headers: { authtoken: this.state.authtoken },
        }
      )
      .then(async (response) => {
        var obj = {
          reserva: response.data.data[0],
          reservadas: response.data.data[1],
          proceso: response.data.data[2],
          disponibles: response.data.data[3],
        };
        this.setState({ objReserva: obj, reserva: true });
      })
      .catch((error) => {
        toast(error.response.data.message, { type: "error" });
      });
  };

  recibirCantidadBoletas = (objBoletas) => {
    this.setState({ objBoletas: objBoletas, boletas: true });
  };

  reservarSillas = async (objSillas) => {
    try {
      this.setState({ objSillas: objSillas, sillas: true });
      if (objSillas.sSeleccionadas && objSillas.sSeleccionadas.length > 0) {
        for (const silla of objSillas.sSeleccionadas) {
          await axios.post(
            "https://astolfo.fly.dev/reserva/silla/",
            {
              fk_silla: silla.id,
              fk_funcion_sala: this.state.objPreReserva.fun_sala,
              fk_reserva: this.state.objReserva.reserva.id,
              pk_numero_identificacion:
                this.state.persona.data.pk_numero_identificacion,
            },
            {
              headers: { authtoken: this.state.authtoken },
            }
          );
        }
      }
      toast("Se han reservado las sillas exitosamente", { type: "success" });
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };

  reservarSnacks = async (objSnacks) => {
    try {
      this.setState({ objSnacks: objSnacks, snacks: true });
      if (
        objSnacks.snaksSeleccionados &&
        objSnacks.snaksSeleccionados.length > 0
      ) {
        for (const snack of objSnacks.snaksSeleccionados) {
          if (snack.numero > 0) {
            await axios.post(
              "https://astolfo.fly.dev/reserva/snack/",
              {
                fk_reserva: this.state.objReserva.reserva.id,
                fk_snack: snack.id,
                i_cantidad: snack.numero,
              },
              {
                headers: { authtoken: this.state.authtoken },
              }
            );
          }
        }
        toast("Se han reservado los snacks exitosamente", { type: "success" });
      }
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };

  confirmarReserva = async () => {
    try {
      const reservaResponse = await axios.post(
        "https://astolfo.fly.dev/reserva/reserva/",
        {
          fk_reserva: this.state.objReserva.reserva.id,
          pk_numero_identificacion:
            this.state.persona.data.pk_numero_identificacion,
        },
        {
          headers: { authtoken: this.state.authtoken },
        }
      );

      if (reservaResponse.data.message === "confirmado") {
        for (const silla of this.state.objSillas.sSeleccionadas) {
          try {
            await axios.post(
              "https://astolfo.fly.dev/reserva/sreserva/",
              {
                fk_silla: silla.id,
                fk_reserva: this.state.objReserva.reserva.id,
              },
              {
                headers: { authtoken: this.state.authtoken },
              }
            );
          } catch (error) {
            toast(error.response.data.message, { type: "error" });
          }
        }

        for (const snack of this.state.objSnacks.snaksSeleccionados) {
          if (snack.numero > 0) {
            try {
              await axios.post("https://astolfo.fly.dev/snack/snack/", {
                id: snack.id,
                i_cantidad: snack.numero,
              });
            } catch (error) {
              toast(error.response.data.message, { type: "error" });
            }
          }
        }
        toast("Se ha confirmado la reserva exitosamente", {
          type: "success",
        });
      } else {
        toast("Se ha agotado el tiempo para confirmar la reserva", {
          type: "error",
        });
      }
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };

  cerrarSecion = () => {
    this.setState({
      login: false,
      persona: {},
      cliente: {},
      authtoken: {},
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.login && (
          <NavUsuario
            persona={this.state.persona}
            cerrarSecion={this.cerrarSecion}
          />
        )}
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                <Navegacion />
                <Inicio />
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/Inicio"
          render={() => {
            return (
              <div>
                <Navegacion />
                <Inicio />
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/Login"
          render={() => {
            return (
              <div>
                <Navegacion />
                <Login enviarDatos={this.obtenerDatosUsuarioIngresado} />
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/Registro"
          render={() => {
            return (
              <div>
                <Navegacion />
                <Registro />
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/Perfil"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.login ? (
                  <Perfil
                    persona={this.state.persona}
                    cliente={this.state.cliente}
                  />
                ) : (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/TarjetaCredito"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.login ? (
                  <TarjetaCredito
                    persona={this.state.persona}
                    cliente={this.state.cliente}
                  />
                ) : (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/Cartelera"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.consulta_p ? (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <Cartelera
                    list_movies={this.state.list_movies}
                    obtenerPeliculaEscogida={this.obtenerPeliculaEscogida}
                    login={this.state.login}
                  />
                )}
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/DescripcionPelicula"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.pelicula_escogida ? (
                  <DescripcionPelicula
                    login={this.state.login}
                    pelicula={this.state.pelicula}
                    consultarDisponibilidad={this.consultarDisponibilidad}
                  />
                ) : (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                <PiePagina />
              </div>
            );
          }}
        />

        <Route
          path="/Snacks"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.consulta_s ? (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <Snacks
                    list_snakcs={this.state.list_snakcs}
                    reservarSnaks={this.reservarSnacks}
                  />
                )}
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/CompraBoletas"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.login && this.state.reserva ? (
                  <CantidadBoletas
                    objReserva={this.state.objReserva}
                    recibirCantidadBoletas={this.recibirCantidadBoletas}
                  />
                ) : (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/EscogerAsientos"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.boletas ? (
                  <SeleccionSillas
                    objBoletas={this.state.objBoletas}
                    objPreReserva={this.state.objPreReserva}
                    objReserva={this.state.objReserva}
                    reservarSillas={this.reservarSillas}
                  />
                ) : (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                <PiePagina />
              </div>
            );
          }}
        />
        <Route
          path="/ResumenCompra"
          render={() => {
            return (
              <div>
                <Navegacion />
                {this.state.snacks ? (
                  <ResumenCompra
                    objPreReserva={this.state.objPreReserva}
                    objBoletas={this.state.objBoletas}
                    objSnacks={this.state.objSnacks}
                    objSillas={this.state.objSillas}
                    persona={this.state.persona}
                    pelicula={this.state.pelicula}
                    confirmarReserva={this.confirmarReserva}
                  />
                ) : (
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                <PiePagina />
              </div>
            );
          }}
        />
        {/* <Route
          path="/NuevaPelicula"
          render={() => {
            return (
              <div>
                <Navegacion />
                <MovieForm />
                <PiePagina />
              </div>
            );
          }}
        /> */}
      </div>
    );
  }
}

export default withRouter(App);
