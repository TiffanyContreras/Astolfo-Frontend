import React, { useState, useEffect } from "react";
import HistoriaCompra from "../historial_compra/HistorialCompra";
import Silla from "./Silla";
import "./SeleccionSillas.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function SeleccionSillas(props) {
  const [sPreferencial, setSPreferencial] = useState([]);
  const [sGeneral, setSGeneral] = useState([]);
  const [sSeleccionadas, setSSeleccionadas] = useState([]);
  const [preferencial, setPreferencial] = useState(true);
  const [general, setGeneral] = useState(true);
  const [numeroGeneral, setNumeroGeneral] = useState(0);
  const [numeroPreferencial, setNumeroPreferencial] = useState(0);
  const [paso, setPaso] = useState(false);
  const history = useHistory();

  useEffect(() => {
    var sPreferencial = [];
    var sGeneral = [];

    props.objReserva.disponibles.forEach((silla) => {
      if (silla.v_tipo === "General") {
        silla.estado = "Disponible";
        sGeneral.push(silla);
      } else if (silla.v_tipo === "Preferencial") {
        silla.estado = "Disponible";
        sPreferencial.push(silla);
      }
    });

    props.objReserva.reservadas.forEach((silla) => {
      if (silla.v_tipo === "General") {
        silla.estado = "Reservada";
        sGeneral.push(silla);
      } else if (silla.v_tipo === "Preferencial") {
        silla.estado = "Reservada";
        sPreferencial.push(silla);
      }
    });

    props.objReserva.proceso.forEach((silla) => {
      if (silla.v_tipo === "General") {
        silla.estado = "Reservada";
        sGeneral.push(silla);
      } else if (silla.v_tipo === "Preferencial") {
        silla.estado = "Reservada";
        sPreferencial.push(silla);
      }
    });

    sPreferencial.sort((a, b) => b.id - a.id);
    sGeneral.sort((a, b) => b.id - a.id);

    setSGeneral(sGeneral);
    setSPreferencial(sPreferencial);

    if (props.objBoletas.boletasGeneral === 0) {
      setGeneral(false);
    }
    if (props.objBoletas.boletasVip === 0) {
      setPreferencial(false);
    }
  }, [props.objReserva, props.objBoletas]);

  useEffect(() => {
    if (
      numeroGeneral === props.objBoletas.boletasGeneral &&
      numeroPreferencial === props.objBoletas.boletasVip
    ) {
      setPaso(true);
    } else {
      setPaso(false);
    }
  }, [
    numeroGeneral,
    numeroPreferencial,
    props.objBoletas.boletasGeneral,
    props.objBoletas.boletasVip,
  ]);

  const verificarSeleccion = (tipoSilla) => {
    console.log("tipoSilla: ", tipoSilla);
    if (
      tipoSilla === "General" &&
      numeroGeneral >= props.objBoletas.boletasGeneral
    ) {
      setGeneral(false);
    } else if (tipoSilla === "General") {
      setGeneral(true);
    }
    if (
      tipoSilla === "Preferencial" &&
      numeroPreferencial >= props.objBoletas.boletasVip
    ) {
      setPreferencial(false);
    } else if (tipoSilla === "Preferencial") {
      setPreferencial(true);
    }
  };

  const actualizarNumeroSillas = (tipoSilla, numero) => {
    console.log("numero: ", numero);
    console.log("tipoSilla: ", tipoSilla);
    if (tipoSilla === "General") {
      setNumeroGeneral(numeroGeneral + numero);
    } else if (tipoSilla === "Preferencial") {
      setNumeroPreferencial(numeroPreferencial + numero);
    }
  };

  const actualizarSillasEscogidas = (accion, silla) => {
    console.log("silla: ", silla);
    console.log("accion: ", accion);
    if (accion === "Seleccion") {
      setSSeleccionadas([...sSeleccionadas, silla]);
    } else if (accion === "Deseleccion") {
      setSSeleccionadas(sSeleccionadas.filter((item) => item.id !== silla.id));
    }
  };

  const mostrarSillas = () => {
    return (
      <div className="charis_position">
        {sPreferencial.map((silla) => (
          <Silla
            key={silla.id}
            tipo_silla={silla.v_tipo}
            estado_silla={silla.estado}
            codigo_silla={silla.pk_numero}
            seleccion={preferencial}
            silla={silla}
            actualizarSillasEscogidas={actualizarSillasEscogidas}
            verificarSeleccion={verificarSeleccion}
            actualizarNumeroSillas={actualizarNumeroSillas}
          />
        ))}
        <div className="separator" />
        {sGeneral.map((silla) => (
          <Silla
            key={silla.id}
            tipo_silla={silla.v_tipo}
            estado_silla={silla.estado}
            codigo_silla={silla.pk_numero}
            seleccion={general}
            silla={silla}
            actualizarSillasEscogidas={actualizarSillasEscogidas}
            verificarSeleccion={verificarSeleccion}
            actualizarNumeroSillas={actualizarNumeroSillas}
          />
        ))}
      </div>
    );
  };

  const enviarSillasReservadas = () => {
    if (paso) {
      var obj = {
        numeroGeneral: numeroGeneral,
        numeroPreferencial: numeroPreferencial,
        sSeleccionadas: sSeleccionadas,
      };
      props.reservarSillas(obj);
      history.push("/snacks");
    } else {
      toast("Debe seleccionar todas las sillas", {
        type: "info",
      });
    }
  };

  return (
    <div className="content">
      <div className="chairs_selection">
        <div className="tickets_header">
          <h1>Seleccion de sillas</h1>
        </div>
        <div className="chairs_selection_header">
          <div className="tickets_title">
            <h1>Elija los asientos correspondientes a sus boletas</h1>
          </div>
        </div>
        <div className="chairs_selection_content">
          <div className="panel_chairs">{mostrarSillas()}</div>
        </div>
        <div className="chairs_convention">
          <div className="chair_convention_panel">
            <div className="chair_convention_general">
              <div className="chair_convention_content_img">
                <img
                  className="chair_img_conv"
                  src={require("../../resources/img/silla_blanca.png")}
                  alt="chair_img"
                />
              </div>
              <div className="chair_convention_content_text">
                <h3>Asiento general disponible</h3>
              </div>
            </div>
            <div className="chair_convention_vip">
              <div className="chair_convention_content_img">
                <img
                  className="chair_img_conv"
                  src={require("../../resources/img/silla_vip_blanca.png")}
                  alt="chair_img"
                />
              </div>
              <div className="chair_convention_content_text">
                <h3>Asiento preferencial disponible</h3>
              </div>
            </div>
          </div>
          <div className="chair_convention_panel">
            <div className="chair_convention_general">
              <div className="chair_convention_content_img">
                <img
                  className="chair_img_conv"
                  src={require("../../resources/img/silla_verde.png")}
                  alt="chair_img"
                />
              </div>
              <div className="chair_convention_content_text">
                <h3>Asiento general seleccionado</h3>
              </div>
            </div>
            <div className="chair_convention_vip">
              <div className="chair_convention_content_img">
                <img
                  className="chair_img_conv"
                  src={require("../../resources/img/silla_vip_verde.png")}
                  alt="chair_img"
                />
              </div>
              <div className="chair_convention_content_text">
                <h3>Asiento preferencial seleccionado</h3>
              </div>
            </div>
          </div>
          <div className="chair_convention_panel">
            <div className="chair_convention_general">
              <div className="chair_convention_content_img">
                <img
                  className="chair_img_conv"
                  src={require("../../resources/img/silla_roja.png")}
                  alt="chair_img"
                />
              </div>
              <div className="chair_convention_content_text">
                <h3>Asiento general ocupado</h3>
              </div>
            </div>
            <div className="chair_convention_vip">
              <div className="chair_convention_content_img">
                <img
                  className="chair_img_conv"
                  src={require("../../resources/img/silla_vip_roja.png")}
                  alt="chair_img"
                />
              </div>
              <div className="chair_convention_content_text">
                <h3>Asiento preferencial ocupado</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="button_chair_confirm">
          <button
            className="btn_chair_confirm"
            onClick={enviarSillasReservadas}
          >
            Confirmar
          </button>
        </div>
      </div>
      <div className="buy_history">
        <HistoriaCompra estado={2} />
      </div>
    </div>
  );
}

export default SeleccionSillas;
