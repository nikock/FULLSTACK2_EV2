import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import Formulario from "./formulario"; 


// Pruebas unitarias que pasan la prueban (7).


// 1. renderizado de encabezado principal.
test("1. Verifica el texto del título principal h1", () => {
    // Pasa: El texto esperado coincide exactamente con el encabezado renderizado.
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const titulo = screen.getByRole("heading", { level: 1 });
    expect(titulo.textContent).toBe("Registro de Usuario");
});

// 2. estado inicial vacio del input nombre.
test("2. Verifica que el campo de nombre inicie vacío", () => {
    // Pasa: El input se monta sin valores por defecto.
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const nombreInput = screen.getByLabelText("Nombre:");
    expect(nombreInput.value).toBe("");
});

// 3. simulacion de escritura en input nombre.
test("3. Verifica la actualización del input de nombre al escribir", () => {
    // Pasa: fireEvent modifica el valor y la asercion coincide con el target
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const nombreInput = screen.getByLabelText("Nombre:");
    fireEvent.change(nombreInput, { target: { value: "Pedrito" } });
    expect(nombreInput.value).toBe("Pedrito");
});

// 4. simulacion de escritura en input apellido.
test("4. Verifica la actualización del input de apellido al escribir", () => {
    // pasa: el cambio de estado en el apellido se refleja correctamente.
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const apellidoInput = screen.getByLabelText("Apellido:");
    fireEvent.change(apellidoInput, { target: { value: "González" } });
    expect(apellidoInput.value).toBe("González");
});

// 5. simulacion de escritura en input correo.
test("5. Verifica la actualización del input de correo al escribir", () => {
    // Pasa: el campo de correo recibe el formato ingresado por el usuario.
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const emailInput = screen.getByLabelText("Correo:");
    fireEvent.change(emailInput, { target: { value: "usuario@duoc.cl" } });
    expect(emailInput.value).toBe("usuario@duoc.cl");
});

// 6. existencia del boton de envío en el DOM.
test("6. Verifica que el botón de registrar esté presente en pantalla", () => {
    // Pasa: el botón existe en el DOM síncrono al montarse el componente.
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const boton = screen.getByRole("button", { name: /registrar|enviar/i });
    expect(boton).toBeTruthy();
});

// 7. simulacion de clic sin recargar pantalla.
test("7. Simula el clic del botón de envío", () => {
    // Pasa: El evento click se dispara sin romper el flujo del formulario
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const boton = screen.getByRole("button", { name: /registrar|enviar/i });
    const clickValido = fireEvent.click(boton);
    expect(clickValido).toBe(true);
});


// Pruebas unitarias que fallan (3).

// 8. Error de aserción en titulo h1.
test("8. [FALLA INTENCIONAL] Verifica el título con un texto erróneo", () => {
    // Falla: ya que se espera "Tienda virtual" pero el componente muestra "registro del usuario".
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const titulo = screen.getByRole("heading", { level: 1 });
    // Falla: Cambiar 'Tienda Virtual' por 'Registro de Usuario' para que pase.
    expect(titulo.textContent).toBe("Tienda Virtual");
});

// 9. Error de discrepancia de valor en input.
test("9. [FALLA INTENCIONAL] Verifica el valor de apellido contra un dato incorrecto", () => {
    // Falla: El evento envía "Perez" pero la prueba espera erróneamente "Gomez".
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    const apellidoInput = screen.getByLabelText("Apellido:");
    fireEvent.change(apellidoInput, { target: { value: "Pérez" } });
    // Falla: Cambiar "Gomez" por "Perez" para que pase.
    expect(apellidoInput.value).toBe("Gómez");
});

// 10. Error por buscar un elemento inexistente en el DOM.
test("10. [FALLA INTENCIONAL] Busca un botón que no existe en el componente", () => {
    // Falla :  getByRole arroja error porque no existe ningún botón llamado "Eliminar".
    render(
        <MemoryRouter>
            <Formulario />
        </MemoryRouter>
    );
    // Falla: Cambiar "Eliminar" por "Registrar" o "Enviar" para que pase.
    const botonEliminar = screen.getByRole("button", { name: "Eliminar" });
    expect(botonEliminar).toBeTruthy();
});