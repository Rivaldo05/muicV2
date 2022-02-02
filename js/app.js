const select = (el) =>document.querySelector(el)
const selectId = (el)=> document.getElementById(el)

const btn_proximo = selectId('proximo')
const btn_play = selectId('play')
const btn_anterior = selectId('anterior')
const titulo_musica = selectId('music-title')
const imagem = selectId('img')
const audio = selectId('audio')
const divImg = selectId('Music-img') 
const progressBar = selectId('progress-bar')
const conteinerProgress = selectId('conteiner-progressBar')


let musicaIndex = 0

function loadMusic(musicas){ // muisicas vem do arquivo musics.js

    let imagem_ = (musicas[musicaIndex].img == '')? 'default.jpg' : musicas[musicaIndex].img
    titulo_musica.innerHTML = musicas[musicaIndex].name
    audio.src = `musicas/${musicas[musicaIndex].name}.mp3`
    imagem.src = `imagens/${imagem_}`
}

function player(){
    divImg.classList.remove('hide')
    btn_play.querySelector('i.far').classList.remove('fa-play-circle')
    btn_play.querySelector('i.far').classList.add('fa-pause-circle')
    audio.play()
    
}

function pause(){
    divImg.classList.add('hide')
    btn_play.querySelector('i.far').classList.add('fa-play-circle')
    btn_play.querySelector('i.far').classList.remove('fa-pause-circle')
    audio.pause()
}

function prox_musica(){
    musicaIndex++
    if(musicaIndex > musicas.length - 1){
        musicaIndex =0
    }
    loadMusic(musicas)
    player()
}

function musica_ant(){
    musicaIndex--
    if(musicaIndex<0){
        musicaIndex = musicas.length - 1
    }
    loadMusic(musicas)
    player()
}


/*********************Progress bar****************** */

function atualiazaProgressBar(e){
    /*const duration = audio.duration; const currentTime = audio.currentTime .... mesma coisa que o codigo abaixo*/

    const {duration, currentTime} = e.srcElement

    //console.log(duration, currentTime) duration e currentTime vem do EVENTO TIMEUPDADTE
        //console.log(e.srcElement.currentTime);

    const porcentagem = (currentTime / duration) * 100
    progressBar.style.width = `${porcentagem}%`
}

function setaProgresso(e){
    const largura = this.clientWidth // pega a largura do conteiner progressbar
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / largura) * duration
}
/******************************************************** */

loadMusic(musicas)

btn_play.addEventListener('click', ()=>{
    const playing = divImg.classList.contains('hide')
    if(!playing){
        pause()
    }else{
        player()
    }
})
btn_proximo.addEventListener('click', prox_musica)
btn_anterior.addEventListener('click', musica_ant)
audio.addEventListener('timeupdate', atualiazaProgressBar)
conteinerProgress.addEventListener('click', setaProgresso)
audio.addEventListener('ended', prox_musica)
