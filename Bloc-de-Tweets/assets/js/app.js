// VARIABLES
const listaTweets = document.getElementById('lista-tweets');
const vaciarNotasbtn = document.getElementById('vaciar-notas');



// Event Listeners
eventListeners();

function eventListeners(){
    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

    //Vaciar todas las notas
    vaciarNotasbtn.addEventListener('click', vaciarNotas );

}


// Funciones



// Agregar tweet al formulario
function agregarTweet(e){
    e.preventDefault();
    // Leer el valor del textArea
    const tweet = document.getElementById('tweet').value;
   
    
   // Crear boton de eliminar
   const botonBorrar = document.createElement('a');
   botonBorrar.classList = 'borrar-tweet';
   botonBorrar.innerText = 'X';

   // Crear elemento y agregar a la lista
   const li = document.createElement('li');
   li.innerText = tweet;
   // Agregar boton de borrar tweets
   li.appendChild(botonBorrar);
   // Agrega el tweet a la lista
   listaTweets.appendChild(li);
   // Agregar al LocalStorage
   agregarTweetLocalStorage(tweet); 
   
    
}

// Eliminar tweet del DOM

function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);
    }
   
}

// Mostrar datos del LocalStorage en la lista

function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // Crear elemento y agregar a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // Agregar boton de borrar tweets
        li.appendChild(botonBorrar);
        // Agrega el tweet a la lista
    listaTweets.appendChild(li);
    });
    
}

// Agregar tweet al local Storage

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Agregar el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a arreglo de localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// Comprobar que haya elementos en LocalStorage, retorna un arreglo

function obtenerTweetsLocalStorage(){
    let tweets;

    //Revisar valors localStorage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// Eliminar tweet del Local Storage

function borrarTweetLocalStorage(tweet){

    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length-1);
    
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Al pulsar enter se agrega la tarea a la derecha

function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        var boton = document.getElementById("tweet");
        angular.element(boton).triggerHandler('click');
    }
}

// Con este boton se eliminan todas las notas
function vaciarNotas(){

    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }

    // Vaciar local Storage
    vaciarLocalStorage();

    return false;
}



// Elimina todos las notas de Local Storage

function vaciarLocalStorage(){
    localStorage.clear()
}