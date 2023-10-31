import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fileInput: {
    display: "none",
  },
}));

const MovieForm = () => {
  const [formData, setFormData] = useState({
    v_nombre: "",
    v_genero: "",
    v_clasificacion: "",
    v_reparto: "",
    v_director: "",
    d_fecha_estreno: "",
    v_pais_origen: "",
    i_duracion: "",
    tx_sinapsis: "",
    v_foto: "",
  });

  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setFormData({ ...formData, v_foto: base64Image });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ padding: 15 }}>
      <Typography gutterBottom variant="h4" style={{ textAlign: "left" }}>
        Ingrese información de la pelicula
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Nombre"
              name="v_nombre"
              fullWidth
              onChange={handleInputChange}
              value={formData.v_nombre}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Género"
              name="v_genero"
              fullWidth
              onChange={handleInputChange}
              value={formData.v_genero}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Clasificación"
              name="v_clasificacion"
              fullWidth
              onChange={handleInputChange}
              value={formData.v_clasificacion}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Reparto"
              name="v_reparto"
              fullWidth
              onChange={handleInputChange}
              value={formData.v_reparto}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Director"
              name="v_director"
              fullWidth
              onChange={handleInputChange}
              value={formData.v_director}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Fecha de Estreno"
              name="d_fecha_estreno"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={handleInputChange}
              value={formData.d_fecha_estreno}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="País de Origen"
              name="v_pais_origen"
              fullWidth
              onChange={handleInputChange}
              value={formData.v_pais_origen}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Duración (minutos)"
              name="i_duracion"
              type="number"
              fullWidth
              onChange={handleInputChange}
              value={formData.i_duracion}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Sinopsis"
              name="tx_sinapsis"
              multiline
              rows={4}
              fullWidth
              onChange={handleInputChange}
              value={formData.tx_sinapsis}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="file-input"
              className={classes.fileInput}
            />
            <label htmlFor="file-input">
              <Button variant="contained" color="primary" component="span">
                Cargar imagen
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            {formData.v_foto && (
              <Card
                elevation={0}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <CardMedia
                  component="img"
                  alt="Visualización de la imagen"
                  height="auto"
                  image={formData.v_foto}
                  style={{ width: "30%", height: "30%" }}
                />
              </Card>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginBottom: "1%" }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default MovieForm;
