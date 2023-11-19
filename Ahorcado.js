// Cuando el documento este listo...
$(document).ready(function () {
    const VIDAS = 7;
    var vidas = VIDAS;
    var interval;
    
    let palabras = ["ABANDONO", "BANANERO", "CALAVERA", "DELFINES", "EJERCITO", "FANTASMA", "GASOLINA", "HARDWARE", "IMPRIMIR", "MILLONES", "LEYENDAS", "XILOFONO"];
    let lengthPalabra = palabras[0].length;

    // Número aleatorio entre 0 y 11
    let randomNumber = Math.floor(Math.random() * palabras.length);
    var palabraSeleccionada = palabras[randomNumber];

    var stringPalabra = "";

    for (let i = 0; i < lengthPalabra; i++)
    {
        $("#divLetras").append("<span class='letras'>_</span>");
        stringPalabra += "_";
    }

    addLetters();

    // Evento onclick de los botones de las letras
    $("#divBotones button").click(function (e) { 
        // Deshabilitamos el botón una vez se ha pulsado
        $(this).prop("disabled", true);
        
        let letra = $(this).text();
        let isIncluded = comprobarLetra(letra);

        if (isIncluded)
        {
            cambiarEspaciosPorLetras(letra);
            
            // Lo cambiamos al color verde
            $(this).removeClass("btn-secondary").addClass("btn-success");
            
            if (haGanado())
            {
                $("#divBotones button").prop("disabled", true);
                showAlert("Has ganado!!", "<p>Enhorabuena!</p><p>Pulsa Aceptar o F5 para volver a jugar</p>");
            }
        }
        else
        {
            // Cambiamos el texto del número de vidas
            $("#numVidas").text(vidas);

            // Lo cambiamos al color rojo
            $(this).removeClass("btn-secondary").addClass("btn-danger");

            // En el if cambiamos mostramos la imagen y en el else vamos moviendo la imagen
            if (vidas == (VIDAS - 1))
                $("#man").css("visibility", "visible");
            else
            {
                if (vidas == 1) 
                {
                    // Hacemos que parpadee el texto de las vidas
                    $(".container > h3").addClass("blink");
                    let blink = $('.blink')[0];
                    interval = setInterval(function() {
                        blink.style.opacity = (blink.style.opacity == 0 ? 1 : 0);
                    }, 750);
                }

                $("#man").css("left",  "-" + ((VIDAS - (vidas + 1)) * 75) + "px");
            }
            
            if (haPerdido())
            {
                clearInterval(interval);
                $(".container > h3").removeClass("blink");
                $("#divBotones button").prop("disabled", true);
                showAlert("Has perdido!!", "<p>No te quedan vidas, la palabra era <b>" + palabraSeleccionada + "</b></p><p>Pulsa Aceptar o F5 para volver a jugar</p>");
            }
        }
    });

    // Evento onclick del botón Aceptar del modal
    $("#modal .modal-footer > button").click(function (e) {
        // Refrescar la página
        window.location.href = window.location.href;
    });


    // Funciones
    function addLetters()
    {
        // Creamos dinámicamente los botones con las letras
        let letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < letras.length; i++)     
            $("#divBotones").append("<button type='button' class='btn btn-secondary'>"+ letras[i] +"</button>");

        // Movemos los botenes en dos filas (first-row y second-row)
        $("#divBotones").append("<div class='first-row'></div>");
        let fila1 = $("#divBotones > button").slice(0, (letras.length / 2));
        $("#divBotones > .first-row").append(fila1);

        $("#divBotones").append("<div class='second-row'></div>");
        let fila2 = $("#divBotones > button");
        $("#divBotones > .second-row").append(fila2);
    }

    function comprobarLetra(letra)
    {
        if (palabraSeleccionada.includes(letra))
            return true;
        else
        {
            vidas--;
            return false;
        }
    }

    function cambiarEspaciosPorLetras(letra)
    {
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (palabraSeleccionada[i] === letra)
            {
                $("#divLetras > span:nth-child(" + (i + 1) + ")").text(letra);
                stringPalabra = stringPalabra.substring(0, i) + letra + stringPalabra.substring(i + 1);
            }
        }
    }

    function haGanado() 
    {
        if (stringPalabra.includes("_"))
            return false;
        else
            return true;
    }

    function haPerdido()
    {
        if (vidas == 0)
            return true;
        else
            return false;
    }

    function showAlert(title, message) 
    {
        $("#modalLabel").text(title);
        $(".modal-body").html(message);
        $("#btnShowModal").trigger("click");
    }
});