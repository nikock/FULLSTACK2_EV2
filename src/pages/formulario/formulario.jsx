import React, { useState } from "react";
import styles from "./formulario.module.css";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className={styles.container}>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.campo}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <button type="submit" className={styles.boton}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Formulario;