// Arreglo para identificar los botones
var buttonColours = ["verde", "rojo", "amarillo", "azul"];
// Arreglo para almacenar el patrón del juego
var patron = [];
// Arreglo para almacenar todos los botones
var patronUsuario = [];
// Variables para control de nivel e inicio del juego
var nivel = 0;
var iniciado = false;

// Función para comenzar el juego
$(document).keypress(function() {
  if (iniciado == false) {
    $("#nivel").text("Level " + nivel);
    nextSequence();
    iniciado = true;
  }
});

// Función para la secuencia
function nextSequence() {
  //Creación de patrón
  var randomNumber = Math.round(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  patron.push(randomChosenColour);

  // Boton de la secuencia
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Sonido del boton a apretar
  playSound(randomChosenColour);

  // Aumento del nivel
  nivel++;

  // Se guarda el nuevo valor de "NIVEL", para remarcar que se avanzo al próximo nivel de juego
  $("#nivel").text("Level " + nivel);

  // Se vacia el patron del usuario para que deba memorizar el patron de juego y apretarlo todo nuevamente
  patronUsuario = [];
}

// Funcion para detectar que botón es clickeado
$(".btn").click(function() {
  // Variable en la cual se almacena el botón clickeado
  var userChosenColor = $(this).attr("id");

  // Almacenado de cada botón clickeado en el arreglo
  patronUsuario.push(userChosenColor);

  // Se usa la funcion de sonido para activarse al clickear cada botón
  playSound(userChosenColor);
  animatePress(userChosenColor);

  respuesta(patronUsuario.length - 1);

});

// Función para revisar las respuestas
function respuesta(currentLevel) {

  // Condicional IF para comparar los patrones
  if (patron[currentLevel] === patronUsuario[currentLevel]) {
    console.log("Bien");

    // Condicional if para corroborar que la longitud de ambos patrones sea iguales
    if (patronUsuario.length === patron.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    $("#nivel").html("Game Over <br> <small>Press Any Key to Restart</small>");

    // Audio de errar
    audio = new Audio("sounds/error.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    rejugar();

  }

}

// Función para rejugar
function rejugar() {
  nivel = 0;
  patron = [];
  iniciado = false;
}

// Función para ejecutar el sonido de los botones
function playSound(name) {
  // Sonido
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//Función para animar un botón al ser apretado
function animatePress(currentColor) {

  // Añadir una clase al clickearlo
  $("#" + currentColor).addClass("pressed");

  // Timer para que la clase se remueva al terminar el contador
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
