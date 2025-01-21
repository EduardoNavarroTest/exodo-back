const minutosAMilisegundos = (minutos) => {
    return minutos * 60 * 1000;
}

const milisegunodosAMinutos = (milisegundos) => {
    return milisegundos / 60 / 1000;
}



const calcularMilisegundosXFecha = (fechaHora) => {
    const year = parseInt(fechaHora.substring(0, 4));
    const mes = parseInt(fechaHora.substring(4, 6) - 1);
    const dia = parseInt(fechaHora.substring(6, 8));
    const hora = parseInt(fechaHora.substring(9, 11));
    const minuto = parseInt(fechaHora.substring(11, 13));


    const fechaDada = new Date(year, mes, dia, hora, minuto);
    const fechaActual = new Date();
   
    console.log(`La fecha dada es: ${fechaDada}`);
    console.log(`La fecha actual es: ${fechaActual}`);

    console.log(`La diferencia en milisegundos es: ${fechaActual - fechaDada}`);

    // Calcular la diferencia en milisegundos
    const diferenciaMs = fechaActual - fechaDada;

    return `Han pasado ${diferenciaMs} milisegundos.`;
}



const milisegundos = minutosAMilisegundos(5)
console.log(milisegundos);

const minutos = milisegunodosAMinutos(300000)
console.log(`${minutos} minutos`);