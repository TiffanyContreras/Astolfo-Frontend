import React, { Component } from "react";
import "./Silla.css";

export default class Silla extends Component {
  state = {
    tipo_silla: this.props.tipo_silla,
    estado_silla: this.props.estado_silla,
    url: "",
    codigo: this.props.codigo_silla,
  };

  componentDidMount() {
    if (this.props.tipo_silla === "Preferencial") {
      if (this.props.estado_silla === "Disponible")
        this.setState({
          url: require("../../resources/img/silla_vip_blanca.png"),
        });
      else
        this.setState({
          url: require("../../resources/img/silla_vip_roja.png"),
        });
    } else if (this.props.tipo_silla === "General") {
      if (this.props.estado_silla === "Disponible")
        this.setState({ url: require("../../resources/img/silla_blanca.png") });
      else
        this.setState({ url: require("../../resources/img/silla_roja.png") });
    }
  }

  seleccionarSilla = () => {
    this.props.verificarSeleccion(this.state.tipo_silla);
    if (
      this.state.tipo_silla === "Preferencial" &&
      this.state.estado_silla === "Disponible" &&
      this.props.seleccion
    ) {
      this.setState({
        url: require("../../resources/img/silla_vip_verde.png"),
      });
      this.setState({ estado_silla: "Seleccionada" });
      this.props.actualizarNumeroSillas(this.state.tipo_silla, 1);
      this.props.actualizarSillasEscogidas("Seleccion", this.props.silla);
    } else if (
      this.state.tipo_silla === "Preferencial" &&
      this.state.estado_silla === "Seleccionada"
    ) {
      this.setState({
        url: require("../../resources/img/silla_vip_blanca.png"),
      });
      this.setState({ estado_silla: "Disponible" });
      this.props.actualizarNumeroSillas(this.state.tipo_silla, -1);
      this.props.actualizarSillasEscogidas("Deseleccion", this.props.silla);
    }
    if (
      this.state.tipo_silla === "General" &&
      this.state.estado_silla === "Disponible" &&
      this.props.seleccion
    ) {
      this.setState({ url: require("../../resources/img/silla_verde.png") });
      this.setState({ estado_silla: "Seleccionada" });
      this.props.actualizarNumeroSillas(this.state.tipo_silla, 1);
      this.props.actualizarSillasEscogidas("Seleccion", this.props.silla);
    } else if (
      this.state.tipo_silla === "General" &&
      this.state.estado_silla === "Seleccionada"
    ) {
      this.setState({ url: require("../../resources/img/silla_blanca.png") });
      this.setState({ estado_silla: "Disponible" });
      this.props.actualizarNumeroSillas(this.state.tipo_silla, -1);
      this.props.actualizarSillasEscogidas("Deseleccion", this.props.silla);
    }
    this.props.verificarSeleccion(this.state.tipo_silla);
  };

  render() {
    return (
      <div className="chair">
        <div className="chair_img_div">
          <button className="btn_chair_img" onClick={this.seleccionarSilla}>
            <img
              id="chair_img"
              className="chair_img"
              src={this.state.url}
              alt="chair_img"
            />
          </button>
        </div>
        <div className="chair_code">
          <p>{this.state.codigo}</p>
        </div>
      </div>
    );
  }
}
