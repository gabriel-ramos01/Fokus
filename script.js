const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioBeep = new Audio('/sons/beep.mp3')
const audioPause = new Audio('/sons/pause.mp3')
const audioPlay = new Audio('/sons/play.wav')
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;

musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500
  alteraContexto('foco');
  focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300
  alteraContexto('descanso-curto');
  curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900
  alteraContexto('descanso-longo');
  longoBt.classList.add('active');
});

function alteraContexto(contexto) {
  MostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active');
  });

  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = ` Otimize sua produtividade,<br>
      <strong class="app__title-strong">Mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?,<br>
        <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície,<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
    default:
      break;
  }
}

function contagemRegressiva() {
  iniciarOuPausar();
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    audioBeep.play()
    alert('Tempo finalizado!');
    
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  MostrarTempo()
}

startPauseBt.addEventListener('click', () => {
  if (intervaloID) {
    zerar();
    audioPause.play()
  } else {
    iniciarOuPausar();
    intervaloID = setInterval(contagemRegressiva, 1000);
    audioPlay.play()
  }
});

function iniciarOuPausar() {
  startPauseBt.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloID);
  intervaloID = null;
  startPauseBt.textContent = "Começar";
}
function MostrarTempo() {
  const Tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = Tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}


MostrarTempo()