document.addEventListener('DOMContentLoaded', function () {
  const calcularBtn = document.getElementById('calcular-btn');
  const consultaUltimoCalculoBtn = document.getElementById('consultar-ultimo-calculo-btn');

  calcularBtn.addEventListener('click', function () {
    const tipoEnvio = document.getElementById('tipo-envio').value;
    //const puntoPartida = document.getElementById('puntoPartida').value;
    const destino = document.getElementById('destino').value;
    //const clasificacion = document.getElementById('clasificacion').value;
    //const contieneTelas = document.getElementById('contiene-telas').checked;
    //const tipoTejido = document.getElementById('tipo-tejido').value;
    const cantidadProductos = parseInt(document.getElementById('cantidad-productos').value);
    //const pesoTotal = parseInt(document.getElementById('peso-total').value);
    const valorDeclarado = parseInt(document.getElementById('valor-declarado').value);


    const ciudadesPorContinente = {
      america: ["Buenos Aires(Argentina)", "Sao Paulo(Brasil)", "Nueva York(USA)", "Los Ángeles(USA", "Ciudad de México(México)", "Bogotá (Colombia)", "Lima (Perú)", "Toronto (Canadá)", "Santiago (Chile)", "Río de Janeiro (Brasil)", "Caracas (Venezuela)"],
      europa: ["Londres", "París", "Roma", "Barcelona", "Berlín (Alemania)", "Ámsterdam (Países Bajos)", "Madrid (España)"],
      asia: ["Tokio", "Pekín", "Singapur", "Dubái", "Shanghái (China)", "Busan (Corea del Sur)", "Guangzhou (China)", "Qingdao (China)", "Seúl (Corea del Sur)", "Bangkok (Tailandia)", "Yakarta (Indonesia)", "Delhi (India)", "Tel Aviv (Israel)"]
    };

    const tiempoEnvio = calcularTiempoEnvio(tipoEnvio);
    const valorFinalEnvio = calcularValorFinalEnvio(tipoEnvio, destino, cantidadProductos, /*pesoTotal,*/ valorDeclarado);


    document.getElementById('resultado-tiempo-envio').textContent = `El tiempo de envio es de: ${tiempoEnvio}`;
    document.getElementById('resultado-calcular-impuestos').textContent = `El valor final del envío es: $${valorFinalEnvio}`;



  });


  consultaUltimoCalculoBtn.addEventListener('click', function () {

    // se recupera del local storage
    const tiempoEnvioUltimoCalculo = localStorage.getItem('diasGestionVuelos'); // Si se hubiera tratado de un objeto, array se habría utilidado JSON.parse() para convertirlo nuevamente en un objeto/array
    const calculoImpuestoUltimo = localStorage.getItem('totalValorUltimo');

    document.getElementById('consulta-ultimo-tiempo-envio').textContent = `Tiempo de envio: ${tiempoEnvioUltimoCalculo}`;
    document.getElementById('consulta-ultimo-calculo-impuestos').textContent = `Total con impuestos: $${calculoImpuestoUltimo}`;

  })



  function calcularTiempoEnvio(tipoEnvio) {
    let diasGestion = 0;
    let diasVuelo = 0;   

    if (tipoEnvio === 'nacional') {
      diasGestion = 2;
      diasVuelo = 3;
    } else if (tipoEnvio === 'internacional') {
      diasGestion = 4;
      diasVuelo = 6;
    }
    
    localStorage.setItem('diasGestionVuelos', diasGestion + diasVuelo ); // se guarda en local storage. Si hubiera sido un objeto, array se habria usado JSON.stringify()

    return diasGestion + diasVuelo;
  }

  function calcularValorFinalEnvio(tipoEnvio, destino, cantidadProductos, /*pesoTotal,*/ valorDeclarado) {
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

    const IVA = 0.21;
    impuestos = valorDeclarado * IVA;

    const valorFinal = valorEnvio + impuestos;

    localStorage.setItem('totalValorUltimo', valorFinal); // se guarda en local storage. Si hubiera sido un objeto, array se habria usado JSON.stringify()

    return valorFinal;
  }
});

//--------------------------------------------------------------------------------


