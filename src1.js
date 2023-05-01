'use strict';

// Modal de Bienvenida
const botonModal = document.querySelector('#cerrarMB');

botonModal.addEventListener('click', () => {
  const modalBienve = document.querySelector('#modalBienve');
  modalBienve.style.display = 'none';
});

//Seleccionar nodos

const cards = document.querySelectorAll('.card');

//Crear variables de dos cartas con valor null(sin valor) para no
//representar ninguna carta en particular

let firstCard = null;
let secondCard = null;

//Contador de intentos y maximo de intentos

let count = 0; //puntuacion final

//Mostrador de contador de intentos en la pagina

const counter = document.querySelector('#counter'); //nº actual de intentos(pantalla)
counter.textContent = `Intentos: ${count}`;

//Definimos variables para contar aciertos

let matches = 0;

// Definimos Función reveal
let canClick = true; //Variable para bloquear opción de clic

const reveal = (e) => {
  console.log('Click en una carta', canClick);
  if (!canClick) return; //Si no se puede hacer clic, salimos de la función

  const currentCard = e.currentTarget; //Obtenemos carta actual clickeada(currentCard)
  currentCard.classList.add('flipped'); //Agregamos clase flipped en currentCard

  if (!firstCard) {
    //Si firstCard = null...
    firstCard = currentCard;
    count--; //Valor de la primera carta
  } else {
    secondCard = currentCard; //valor de la segunda cartaconsole.log(secondCard);
    count++; //Aumentamos contador una vez seleccionada la segunda
    counter.textContent = `Intentos: ${count}`;
  }

  //Comparamos valores de las 2 cartas

  if (firstCard && secondCard) {
    //Obtenemos contenido de la cara back de la carta
    const firstEmoji = firstCard.querySelector('.back').textContent;
    const secondEmoji = secondCard.querySelector('.back').textContent;

    console.log(firstCard, secondCard);

    if (firstEmoji === secondEmoji) {
      //Clase css coinciden, emparejada,
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      // Eliminar el evento de click en ambas cartas.
      firstCard.removeEventListener('click', reveal);
      secondCard.removeEventListener('click', reveal);

      // Vaciamos las cartas.
      firstCard = null;
      secondCard = null;
    } else {
      canClick = false; //Bloqueamos opción de clic

      setTimeout(() => {
        //Eliminamos la clase flipped de la tarjeta actual
        if (firstCard) firstCard.classList.remove('flipped'); //Una vez que se ha verificado la coincidencia,
        //elimina clase flipped y
        if (secondCard) secondCard.classList.remove('flipped');
        firstCard = null; //volvemos a no tener valor
        secondCard = null;

        canClick = true; //Desbloqueamos opción de clic después de 2 segundos
      }, 1000);
    }

    count++;
    counter.textContent = `Intentos: ${count}`;
  }
  //Comprabamos si ha encontrado todas las parejas
  const matchedCards = document.querySelectorAll('.matched'); //Obtenemos todas las cartas emparejadas
  if (matchedCards.length === 16) {
    //Si hay 16 cartas emparejadas
    counter.textContent = `¡Juego completado en ${count} intentos!`; //Mostramos mensaje con número de intentos
  } /*setTimeout(() => {
      alert(
        `¡Felicidades! Has encontrado todas las parejas en ${count} intentos.`
      );
    }, 500);*/
};

const matchedCards = document.querySelectorAll('.matched');

if (matchedCards.lenght === cards.length) {
  for (const card of cards) {
    card.removeEventListener('click', reveal);
  }
}

const emojis = [
  '👻',
  '🤖',
  '👽',
  '👾',
  '👩‍🚀',
  '☄️',
  '🚀',
  '🦾',
  '👻',
  '🤖',
  '👽',
  '👾',
  '👩‍🚀',
  '☄️',
  '🚀',
  '🦾',
];

const randomEmojis = emojis.sort(() => Math.random() - 0.5);

for (let i = 0; i < cards.length; i++) {
  cards[i].querySelector('.back').innerHTML = randomEmojis[i];
}

for (const card of cards) {
  card.addEventListener('click', reveal);
}

//Resetear Juego

function resetGame() {
  // Ocultar todos los emojis
  for (const card of cards) {
    card.classList.remove('flipped');

    card.classList.remove('matched');
    card.addEventListener('click', reveal);
  }

  //** setTimeout(() => {       (para que se mezclen una vez se hayan girado las cartas)

  // Volver a mezclar los emojis
  const randomEmojis = emojis.sort(() => Math.random() - 0.5);
  for (let i = 0; i < cards.length; i++) {
    cards[i].querySelector('.back').innerHTML = randomEmojis[i];
  }
  //** */ }, 1000); (para que se mezclen una vez se hayan girado las cartas)

  // Reiniciar variables
  firstCard = null;
  secondCard = null;
  count = 0; // a mi ahora no se me pone el contador a 0 y no he tocado nada del código lo tengo exactamente igual que Javi...
}

const resetButton = document.querySelector('.botonReinicio');
resetButton.addEventListener('click', resetGame);
