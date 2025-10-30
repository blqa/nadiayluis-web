// Establece la fecha y hora de inicio del cronómetro
// Formato: Año, Mes (0-11), Día, Hora, Minuto, Segundo
const fechaInicio = new Date(2025, 5, 11, 23, 23, 0); // Mes 5 es junio

// Función auxiliar para pluralizar
const pluralizar = (cantidad, unidad) => {
    return cantidad === 1 ? `${cantidad} ${unidad}` : `${cantidad} ${unidad}s`;
};

function actualizarCronometro() {
    const ahora = new Date();
    let diferenciaMs = ahora - fechaInicio; // Diferencia en milisegundos

    // Manejo de fechas futuras (por si acaso)
    if (diferenciaMs < 0) {
        const segundosRestantes = Math.floor(Math.abs(diferenciaMs) / 1000);
        const minutosRestantes = Math.floor(segundosRestantes / 60);
        const horasRestantes = Math.floor(minutosRestantes / 60);
        const diasRestantes = Math.floor(horasRestantes / 24);

        let tiempoFaltante = [];
        if (diasRestantes > 0) tiempoFaltante.push(pluralizar(diasRestantes, 'día'));
        if (horasRestantes % 24 > 0) tiempoFaltante.push(pluralizar(horasRestantes % 24, 'hora'));
        if (minutosRestantes % 60 > 0) tiempoFaltante.push(pluralizar(minutosRestantes % 60, 'minuto'));
        if (segundosRestantes % 60 > 0 || (diasRestantes === 0 && horasRestantes === 0 && minutosRestantes === 0 && segundosRestantes > 0)) {
            tiempoFaltante.push(pluralizar(segundosRestantes % 60, 'segundo'));
        }

        let textoFuturo = "El momento de la felicidad está por llegar...";
        if (tiempoFaltante.length > 0) {
            const ultimo = tiempoFaltante.pop();
            textoFuturo = `Faltan ${tiempoFaltante.join(', ')}${tiempoFaltante.length > 0 ? ' y ' : ''}${ultimo} para que la magia comience.`;
        } else { 
            textoFuturo = "¡El momento ha llegado!";
        }

        document.getElementById('cronometro').textContent = textoFuturo;
        return;
    }

    // Calcular años, meses, días, horas, minutos y segundos
    let anios = 0;
    let meses = 0;
    let dias = 0;
    let horas = 0;
    let minutos = 0;
    let segundos = 0;

    let tempFecha = new Date(fechaInicio.getTime()); // Copia para manipular

    // Calcular años y meses
    while (true) {
        let proximoAnioFecha = new Date(tempFecha.getFullYear() + 1, tempFecha.getMonth(), tempFecha.getDate(), tempFecha.getHours(), tempFecha.getMinutes(), tempFecha.getSeconds());
        if (proximoAnioFecha <= ahora) {
            anios++;
            tempFecha = proximoAnioFecha;
        } else {
            break;
        }
    }

    while (true) {
        let proximoMesFecha = new Date(tempFecha.getFullYear(), tempFecha.getMonth() + 1, tempFecha.getDate(), tempFecha.getHours(), tempFecha.getMinutes(), tempFecha.getSeconds());
        if (proximoMesFecha <= ahora) {
            meses++;
            tempFecha = proximoMesFecha;
        } else {
            break;
        }
    }
    
    // Recalcular la diferencia en milisegundos después de restar años y meses
    diferenciaMs = ahora - tempFecha;

    // Calcular días, horas, minutos y segundos de la diferencia restante
    segundos = Math.floor(diferenciaMs / 1000);
    minutos = Math.floor(segundos / 60);
    horas = Math.floor(minutos / 60);
    dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;

    // Construir la cadena de resultado condicionalmente
    let resultado = [];

    if (anios > 0) {
        resultado.push(pluralizar(anios, 'año'));
    }
    if (meses > 0) {
        resultado.push(pluralizar(meses, 'mes'));
    }
    if (dias > 0) {
        resultado.push(pluralizar(dias, 'día'));
    }
    if (horas > 0) {
        resultado.push(pluralizar(horas, 'hora'));
    }
    if (minutos > 0) {
        resultado.push(pluralizar(minutos, 'minuto'));
    }
    if (segundos > 0 || resultado.length === 0) {
        resultado.push(pluralizar(segundos, 'segundo'));
    }
    
    // Unir los elementos con comas, y la última con "y"
    let textoFinal = "";
    if (resultado.length > 1) {
        const ultimo = resultado.pop();
        textoFinal = resultado.join(', ') + ' y ' + ultimo;
    } else {
        textoFinal = resultado[0] || "0 segundos"; // En caso de que todo sea cero al inicio
    }

    document.getElementById('cronometro').textContent = textoFinal;
}

// Actualiza el cronómetro cada segundo
setInterval(actualizarCronometro, 1000);

// Llama a la función una vez al cargar para mostrar el tiempo inmediatamente
actualizarCronometro();
