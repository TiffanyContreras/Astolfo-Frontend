import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HistoriaCompra from "../historial_compra/HistorialCompra";
import "./CantidadBoletas.css";

const CantidadBoletas = (props) => {
  const [num_chair_general, setNumChairGeneral] = useState(0);
  const [num_chair_vip, setNumChairVip] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [total, setTotal] = useState(0);
  const [sDisponiblesGeneral, setSDisponiblesGeneral] = useState([]);
  const [sDisponiblesPreferencial, setSDisponiblesPreferencial] = useState([]);

  useEffect(() => {
    setTotal(num_chair_general * 30 + num_chair_vip * 60);
    setPuntos(num_chair_general * 5 + num_chair_vip * 10);
  }, [num_chair_general, num_chair_vip]);

  const downChairGeneral = () => {
    if (num_chair_general > 0) {
      setNumChairGeneral(num_chair_general - 1);
    }
  };

  const upChairGeneral = () => {
    if (num_chair_general < sDisponiblesGeneral.length) {
      setNumChairGeneral(num_chair_general + 1);
    }
  };

  const downChairVip = () => {
    if (num_chair_vip > 0) {
      setNumChairVip(num_chair_vip - 1);
    }
  };

  const upChairVip = () => {
    if (num_chair_vip < sDisponiblesPreferencial.length) {
      setNumChairVip(num_chair_vip + 1);
    }
  };

  useEffect(() => {
    mostrarBoton(total);
  }, [total]);

  const mostrarBoton = (newTotal) => {
    if (newTotal === 0) {
      document.getElementById("buy_btn").style.opacity = 0;
    } else {
      document.getElementById("buy_btn").style.opacity = 1;
    }
  };

  useEffect(() => {
    props.objReserva.disponibles.forEach((silla) => {
      if (silla.v_tipo === "General") {
        setSDisponiblesGeneral((prevSDisponiblesGeneral) => [
          ...prevSDisponiblesGeneral,
          silla,
        ]);
      } else if (silla.v_tipo === "Preferencial") {
        setSDisponiblesPreferencial((prevSDisponiblesPreferencial) => [
          ...prevSDisponiblesPreferencial,
          silla,
        ]);
      }
    });
  }, [props.objReserva.disponibles]);

  const enviarDatosBoletas = () => {
    const obj = {
      boletasGeneral: num_chair_general,
      boletasVip: num_chair_vip,
      total: total,
      puntos: puntos,
    };
    props.recibirCantidadBoletas(obj);
  };

  return (
    <div className="content">
      <div className="buy_tickets">
        <div className="tickets_header">
          <h1>Compra de Boletas</h1>
        </div>
        <div className="tickets_content">
          <div className="tickets_title">
            <h1>Elija la cantidad de boletas que desea Comprar</h1>
          </div>
          <div className="chair_general">
            <input id="item1" type="checkbox" value="general" />
            <label htmlFor="item1" className="btn_tickets">
              <div className="title_chair">SILLA GENERAL</div>
              <div className="img_down">
                <img
                  className="down_img"
                  src={require("../../resources/img/abajo.png")}
                  alt="abajo_img"
                />
              </div>
            </label>
            <div className="chair_content">
              <div className="chair_panel chair_info">
                <img
                  src="https://img.icons8.com/officel/40/000000/theatre-seat.png"
                  alt="general_img"
                />
                <h3>General</h3>
              </div>
              <div className="chair_panel chair_price">
                <h2>Boleta General</h2>
                <h4>Valor:</h4>
                <p>Q30.00</p>
              </div>
              <div className="chair_panel chair_num_chose">
                <button className="less" onClick={downChairGeneral}>
                  <img
                    className="btn_num_tick_img"
                    src={require("../../resources/img/menos.png")}
                    alt="menos_img"
                  />
                </button>
                <p>{num_chair_general}</p>
                <button className="more" onClick={upChairGeneral}>
                  <img
                    className="btn_num_tick_img"
                    src={require("../../resources/img/mas.png")}
                    alt="mas_img"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="chair_vip">
            <input id="item2" type="checkbox" value="vip" />
            <label htmlFor="item2" className="btn_tickets">
              <div className="title_chair">SILLA PREFERENCIAL</div>
              <div className="img_down">
                <img
                  className="down_img"
                  src={require("../../resources/img/abajo.png")}
                  alt="abajo_img"
                />
              </div>
            </label>
            <div className="chair_content">
              <div className="chair_panel chair_info">
                <img
                  src="https://img.icons8.com/dusk/64/000000/armchair.png"
                  alt="vip_img"
                />
                <h3>Preferencial</h3>
              </div>
              <div className="chair_panel chair_price">
                <h2>Boleta Preferencial</h2>
                <h4>Valor:</h4>
                <p>Q60.00</p>
              </div>
              <div className="chair_panel chair_num_chose">
                <button className="less" onClick={downChairVip}>
                  <img
                    className="btn_num_tick_img"
                    src={require("../../resources/img/menos.png")}
                    alt="menos_img"
                  />
                </button>
                <p>{num_chair_vip}</p>
                <button className="more" onClick={upChairVip}>
                  <img
                    className="btn_num_tick_img"
                    src={require("../../resources/img/mas.png")}
                    alt="mas_img"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="tickets_total">
            <label className="btn_tickets_total">
              <img
                className="buy_img"
                src={require("../../resources/img/compra.png")}
                alt="buy_img"
              />
              TOTAL COMPRA BOLETAS
            </label>
            <div className="chair_content_total">
              <div className="chair_panel chair_info">
                <h2>Boletas General</h2>
                <h4>Cantidad:</h4>
                <p>{num_chair_general}</p>
              </div>
              <div className="chair_panel chair_price">
                <h2>Boletas Preferencial</h2>
                <h4>Cantidad:</h4>
                <p>{num_chair_vip}</p>
              </div>
              <div className="chair_panel chair_num_chose">
                <h2>Total a pagar</h2>
                <h4>Valor:</h4>
                <p>Q{total}</p>
              </div>
              <div className="chair_panel chair_num_chose2">
                <h2>Total puntos</h2>
                <p>{puntos}</p>
              </div>
            </div>
          </div>
          <div className="button_buy">
            <Link className="btn_buy" to="/EscogerAsientos">
              <button
                id="buy_btn"
                className="buy_btn"
                onClick={enviarDatosBoletas}
              >
                Confirmar
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="buy_history">
        <HistoriaCompra estado={1} />
      </div>
    </div>
  );
};

export default CantidadBoletas;
