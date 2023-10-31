import React from "react";
import PeliculaCartelera from "./PeliculaCartelera";
//import Button from "@material-ui/core/Button";
import "./Cartelera.css";
//import { useHistory } from "react-router-dom";

const Cartelera = (props) => {
 // const history = useHistory();

  const mostrarPeliculas = () => {
    return (
      <div className="cartel_movies">
        {props.list_movies.data &&
          props.list_movies.data.length > 0 &&
          props.list_movies.data.map((movies) => (
            <PeliculaCartelera
              key={movies.id}
              movie={movies}
              obtenerPeliculaEscogida={props.obtenerPeliculaEscogida}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header_billboard">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Cartelera</h1>
          {/* <Button
            variant="contained"
            color="primary"
            style={{ height: 40 }}
            onClick={() => {
              history.push("/NuevaPelicula");
            }}
          >
            Ingresar pelicula
          </Button> */}
        </div>
      </div>

      {mostrarPeliculas()}
    </div>
  );
};

export default Cartelera;
