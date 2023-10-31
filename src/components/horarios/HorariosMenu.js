import React, { useState, useEffect } from "react";
import SubMenu from "./SubMenu";
import "./HorariosMenu.css";

const HorariosMenu = (props) => {
  const [funcionesColonial, setFuncionesColonial] = useState([]);
  const [funcionesCinemark, setFuncionesCinemark] = useState([]);
  const [funcionesAutocinema, setFuncionesAutocinema] = useState([]);

  const actualizarFunciones = () => {
    setFuncionesColonial([]);
    setFuncionesCinemark([]);
    setFuncionesAutocinema([]);

    props.list_funciones.forEach((funcion) => {
      if (funcion.v_nombre === "Cine Colonial") {
        setFuncionesColonial((prevFuncionesColonial) => [
          ...prevFuncionesColonial,
          funcion,
        ]);
      } else if (funcion.v_nombre === "Cinemark Plaza Jutiapa") {
        setFuncionesCinemark((prevFuncionesCinemark) => [
          ...prevFuncionesCinemark,
          funcion,
        ]);
      } else if (funcion.v_nombre === "Autocinema Jutiapa") {
        setFuncionesAutocinema((prevFuncionesAutocinema) => [
          ...prevFuncionesAutocinema,
          funcion,
        ]);
      }
    });
  };

  useEffect(() => {
    actualizarFunciones();
    // eslint-disable-next-line
  }, [props.list_funciones]);

  return (
    <div className="middle">
      <div className="menu">
        <div className="item">
          <input id="item1" type="checkbox" value="teatro1" />
          <label htmlFor="item1" className="btn">
            <img
              className="theater_img"
              src={require("../../resources/img/gran_estacion.png")}
              alt="cine_colonial_img"
            />
            Cine Colonial
          </label>
          <div className="submenu">
            <div className="btn_submenu">
              <SubMenu
                funciones={funcionesColonial}
                recibirHoraTeatro={props.recibirHoraTeatro}
                teatro={"Cine Colonial"}
                panel={props.panel}
                panelBackground={props.panelBackground}
              />
            </div>
          </div>
        </div>
        <div className="item" id="cinemark_jutiapa">
          <input id="item2" type="checkbox" value="teatro2" />
          <label htmlFor="item2" className="btn">
            <img
              className="theater_img cinemark_jutiapa"
              src={require("../../resources/img/plaza_americas.png")}
              alt="cinemark_jutiapa_img"
            />
            Cinemark Plaza Jutiapa
          </label>
          <div className="submenu">
            <div className="btn_submenu">
              <SubMenu
                funciones={funcionesCinemark}
                recibirHoraTeatro={props.recibirHoraTeatro}
                teatro={"Cinemark Plaza Jutiapa"}
                panel={props.panel}
                panelBackground={props.panelBackground}
              />
            </div>
          </div>
        </div>
        <div className="item" id="autocinema_jutiapa">
          <input id="item3" type="checkbox" value="teatro3" />
          <label htmlFor="item3" className="btn">
            <img
              className="theater_img autocinema_jutiapa"
              src={require("../../resources/img/titan_plaza.png")}
              alt="autocinema_jutiapa_img"
            />
            Autocinema Jutiapa
          </label>
          <div className="submenu">
            <div className="btn_submenu">
              <SubMenu
                funciones={funcionesAutocinema}
                recibirHoraTeatro={props.recibirHoraTeatro}
                teatro={"Autocinema Jutiapa"}
                panel={props.panel}
                panelBackground={props.panelBackground}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorariosMenu;
