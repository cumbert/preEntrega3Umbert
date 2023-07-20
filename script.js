document.addEventListener('DOMContentLoaded', function () {
  const calcularBtn = document.getElementById('calcular-btn');
  const calcularImpuestosBtn = document.getElementById('calcular-impuestos-btn');

  calcularBtn.addEventListener('click', function () {
    const tipoEnvio = document.getElementById('tipo-envio').value;
    const puntoPartida = document.getElementById('puntoPartida').value;
    const destino = document.getElementById('destino').value;
    const clasificacion = document.getElementById('clasificacion').value;
    const contieneTelas = document.getElementById('contiene-telas').checked;
    const tipoTejido = document.getElementById('tipo-tejido').value;
    const ciudadesPorContinente = {
      america: ["Buenos Aires(Argentina)", "Sao Paulo(Brasil)", "Nueva York(USA)", "Los Ángeles(USA","Ciudad de México(México)","Bogotá (Colombia)","Lima (Perú)","Toronto (Canadá)","Santiago (Chile)","Río de Janeiro (Brasil)","Caracas (Venezuela)"],
      europa: ["Londres", "París", "Roma", "Barcelona","Berlín (Alemania)","Ámsterdam (Países Bajos)","Madrid (España)"],
      asia: ["Tokio", "Pekín", "Singapur", "Dubái","Shanghái (China)","Busan (Corea del Sur)","Guangzhou (China)","Qingdao (China)","Seúl (Corea del Sur)","Bangkok (Tailandia)","Yakarta (Indonesia)","Delhi (India)","Tel Aviv (Israel)"]
    };

    const tiempoEnvio = calcularTiempoEnvio(tipoEnvio);
    document.getElementById('resultado').textContent = `El tiempo estimado de envío es: ${tiempoEnvio} días`;
  });

  calcularImpuestosBtn.addEventListener('click', function () {
    const tipoEnvio = document.getElementById('tipo-envio').value;
    const destino = document.getElementById('destino').value;
    const cantidadProductos = parseInt(document.getElementById('cantidad-productos').value);
    const pesoTotal = parseInt(document.getElementById('peso-total').value);
    const valorDeclarado = parseInt(document.getElementById('valor-declarado').value);

    const valorFinalEnvio = calcularValorFinalEnvio(tipoEnvio, destino, cantidadProductos, pesoTotal, valorDeclarado);
    document.getElementById('resultado').textContent = `El valor final del envío es: $${valorFinalEnvio.toFixed(2)}`;
  });

  function calcularTiempoEnvio(tipoEnvio) {
    let diasGestion = 0;
    let diasVuelo = 0;

    if (tipoEnvio === 'nacional') {
      diasGestion = 2;
      diasVuelo = 2;
    } else if (tipoEnvio === 'internacional') {
      diasGestion = 4;
      diasVuelo = 4;
    }

    return diasGestion + diasVuelo;
  }

  function calcularValorFinalEnvio(tipoEnvio, destino, cantidadProductos, pesoTotal, valorDeclarado) {
    const tarifasEnvioNacional = {
      hasta70Productos: 4000,
      hasta100Productos: 5500
    };
    const tarifasEnvioInternacional = {
      america: {
        hasta70Productos: 16000,
        hasta100Productos: 21000
      },
      europa: {
        hasta70Productos: 19000,
        hasta100Productos: 27000
      },
      asia: {
        hasta70Productos: 24000,
        hasta100Productos: 31000
      }
    };

    let valorEnvio = 0;
    let impuestos = 0;

    if (tipoEnvio === 'nacional') {
      if (cantidadProductos <= 70) {
        valorEnvio = tarifasEnvioNacional.hasta70Productos;
      } else if (cantidadProductos <= 100) {
        valorEnvio = tarifasEnvioNacional.hasta100Productos;
      }
    } else if (tipoEnvio === 'internacional') {
      if (destino === 'america') {
        if (cantidadProductos <= 70) {
          valorEnvio = tarifasEnvioInternacional.america.hasta70Productos;
        } else if (cantidadProductos <= 100) {
          valorEnvio = tarifasEnvioInternacional.america.hasta100Productos;
        }
      } else if (destino === 'europa') {
        if (cantidadProductos <= 70) {
          valorEnvio = tarifasEnvioInternacional.europa.hasta70Productos;
        } else if (cantidadProductos <= 100) {
          valorEnvio = tarifasEnvioInternacional.europa.hasta100Productos;
        }
      } else if (destino === 'asia') {
        if (cantidadProductos <= 70) {
          valorEnvio = tarifasEnvioInternacional.asia.hasta70Productos;
        } else if (cantidadProductos <= 100) {
          valorEnvio = tarifasEnvioInternacional.asia.hasta100Productos;
        }
      }
    }

    const iva = 0.21;
    impuestos = valorDeclarado * iva;

    const valorFinal = valorEnvio + impuestos;
    return valorFinal;
  }
});

//--------------------------------------------------------------------------------


