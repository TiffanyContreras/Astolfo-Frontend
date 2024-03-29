import React, { Component } from "react";
import axios from "axios";
import "./Registro.css";
import { toast } from "react-toastify";

export default class Registro extends Component {
  state = {
    pk_numero_identificacion: "",
    v_primernombre: "",
    v_segundonombre: "",
    v_primerapellido: "",
    v_segundoapellido: "",
    i_telefono: "",
    v_direccion: "",
    v_pass: "",
    fk_tipo_documento: "1",
    v_correo_electronico: "",
    v_foto: "",
  };

  registrarUsuario = (event) => {
    event.preventDefault();
    axios
      .post("https://astolfo.fly.dev/cliente", {
        pk_numero_identificacion: parseInt(
          this.state.pk_numero_identificacion,
          10
        ),
        v_primernombre: this.state.v_primernombre,
        v_segundonombre: this.state.v_segundonombre,
        v_primerapellido: this.state.v_primerapellido,
        v_segundoapellido: this.state.v_segundoapellido,
        i_telefono: parseInt(this.state.i_telefono, 10),
        v_direccion: this.state.v_direccion,
        v_pass: this.state.v_pass,
        fk_tipo_documento: parseInt(this.state.fk_tipo_documento, 10),
        v_correo_electronico: this.state.v_correo_electronico,
        v_foto: this.state.v_foto,
        tipo_persona: 1,
      })
      .then((response) => {
        toast("Usuario registrado correctamente", { type: "success" });
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        document.getElementById("input3").value = "";
        document.getElementById("input4").value = "";
        document.getElementById("input5").value = "";
        document.getElementById("input6").value = "";
        document.getElementById("input7").value = "";
        document.getElementById("nombre_usuario").value = "";
        document
          .getElementById("image_preview")
          .querySelector(".image_preview_image").style.display = null;
        document
          .getElementById("image_preview")
          .querySelector(".span_preview").style.display = null;
        document
          .getElementById("image_preview")
          .querySelector(".image_preview_image")
          .setAttribute("src", "");
      })
      .catch((error) => {
        toast(error.response.data.message, { type: "error" });
      });
  };

  obtenerTipoCedula = (event) => {
    this.setState({ fk_tipo_documento: event.target.value });
  };

  onChange = (event) => {
    if (event.target.name === "v_primernombre") {
      const nombres = event.target.value.split(" ");
      this.setState({
        v_primernombre: nombres[0],
        v_segundonombre: nombres[1],
      });
    } else if (event.target.name === "v_primerapellido") {
      const apellidos = event.target.value.split(" ");
      this.setState({
        v_primerapellido: apellidos[0],
        v_segundoapellido: apellidos[1],
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  crearNombreUsuario = (event) => {
    const nombreUsuario = document.getElementById("nombre_usuario");
    nombreUsuario.value = event.target.value;
    this.setState({ pk_numero_identificacion: event.target.value });
  };

  subirImagenUsuario = (event) => {
    var self = this;
    const previewContainer = document.getElementById("image_preview");
    const previewImage = previewContainer.querySelector(".image_preview_image");
    const previewDefaultText = previewContainer.querySelector(".span_preview");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      previewDefaultText.style.display = "none";
      previewImage.style.display = "block";
      reader.addEventListener("load", function () {
        previewImage.setAttribute("src", this.result);
        self.setState({ v_foto: this.result });
      });
      reader.readAsDataURL(file);
    } else {
      previewDefaultText.style.display = null;
      previewImage.style.display = null;
      previewImage.setAttribute("src", "");
    }
  };

  render() {
    return (
      <div className="registrer">
        <div className="container_registrer">
          <div className="row_registrer">
            <div className="form_registrer">
              <form className="form">
                <h1>REGISTRO DE USUARIO</h1>
                <h5>Ingresa tus Datos Personales</h5>
                <div className="row_form">
                  <div className="form_half">
                    <p>Nombres</p>
                    <input
                      id="input1"
                      name="v_primernombre"
                      type="text"
                      className="input_half"
                      placeholder="Ingrese nombres"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form_half">
                    <p>Apellidos</p>
                    <input
                      id="input2"
                      name="v_primerapellido"
                      type="text"
                      className="input_half"
                      placeholder="Ingrese apellidos"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="row_form">
                  <div className="form_half">
                    <p>Tipo de Documento</p>
                    <select
                      className="tipo_documento"
                      onChange={this.obtenerTipoCedula}
                    >
                      <option value="1">Cedula de Ciudadania</option>
                      <option value="2">Targeta de Identidad</option>
                      <option value="3">Cedula de Extrangeria</option>
                    </select>
                  </div>
                  <div className="form_half">
                    <p>Numero Documento</p>
                    <input
                      id="input3"
                      type="text"
                      className="input_half"
                      placeholder="Ingrese numero de documento"
                      onChange={this.crearNombreUsuario}
                    />
                  </div>
                </div>
                <div className="email_form">
                  <p>Correo Electronico</p>
                  <input
                    id="input4"
                    name="v_correo_electronico"
                    type="email"
                    className="input_complete"
                    placeholder="Ingrese email"
                    onChange={this.onChange}
                  />
                </div>
                <div className="row_form">
                  <div className="form_half">
                    <p>Numero de Telefono</p>
                    <input
                      id="input5"
                      name="i_telefono"
                      type="text"
                      className="input_half"
                      placeholder="Ingrese numero telefonico"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form_half">
                    <p>Direccion de Residencia</p>
                    <input
                      id="input6"
                      name="v_direccion"
                      type="text"
                      className="input_half"
                      placeholder="Ingrese direccion"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <h5>Ingresa tus datos de Usuario</h5>
                <div className="row_form">
                  <div className="form_half">
                    <p>Nombre de Usuario</p>
                    <input
                      id="nombre_usuario"
                      type="text"
                      className="input_half"
                      placeholder="Ingrese nombre usuario"
                      readOnly
                    />
                  </div>
                  <div className="form_half">
                    <p>Clave de Usuario</p>
                    <input
                      id="input7"
                      name="v_pass"
                      type="password"
                      className="input_half"
                      placeholder="Ingresecontraseña"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="image_user">
                  <p>Suba la imagen de perfil</p>
                  <input
                    type="file"
                    name="inpFile"
                    id="inpFile"
                    className="inpFile"
                    onChange={this.subirImagenUsuario}
                  />
                  <div className="image_preview" id="image_preview">
                    <img
                      className="image_preview_image"
                      src=""
                      alt="img_preview"
                    />
                    <span className="span_preview">Previa de Imagen</span>
                  </div>
                </div>
                <div className="button_form">
                  <button
                    className="button_search"
                    onClick={this.registrarUsuario}
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
            <div className="background">
              <img
                className="img_background"
                src={require("../../resources/img/background.png")}
                alt="background_register"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
