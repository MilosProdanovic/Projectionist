let key = "9ad839273b220803b9a6143becde4b49";
let baseURL = 'https://api.themoviedb.org/3/';
let token = '';
let poster = null;
let poster2 = null;
let baseImageURL = null;
let inputs = document.querySelectorAll('.input') 
let movieSearch = document.querySelector('#movie')
let button = document.querySelector('#movieButton')
let container = document.querySelector('#container')
let submitForm = document.querySelector('#submit')
let mail = document.querySelector('#email')
let pass = document.querySelector('#password')
let firstName = document.querySelector('#firstname')
let lastName = document.querySelector('#lastname')
let paragraphs = document.querySelectorAll('.message')
let form = document.querySelector('#form')
let header = document.querySelector('#header')
let banner = document.querySelector('#banner')
let dropdown = document.querySelector('#dropdown-content')
let topRated = document.querySelector('#top-rated')
let popular = document.querySelector('#popular')
let upcoming = document.querySelector('#upcoming')
let inCinema = document.querySelector('#cinema')
let sort = document.querySelector('#sort')
let ham = document.querySelector('#hamburger')
let dropList = document.querySelector('#dropdown')
let back = document.querySelector('#back')
let watchlist = document.querySelector('#watchlist')

let sortResults = []; 
let clicks = 0;
let movieId = 0;

//VALIDATON//

function nameValidation(e){
    let regName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
    let message = document.querySelector('#fnameMessage')

    if(firstName.value.match(regName)){
        firstName.style.border = '1px solid green'
        message.style.display = 'none'
    }else{
        firstName.style.border = '1px solid red'
        message.style.display = 'flex'
    }       
}

firstName.addEventListener('keyup', nameValidation)

function lastnameValidation(e){
    let regName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
    let message = document.querySelector('#lnameMessage')

    if(lastName.value.match(regName)){
        lastName.style.border = '1px solid green'
        message.style.display = 'none'
    }else{
        lastName.style.border = '1px solid red'
        message.style.display = 'flex'
    }       
}

lastName.addEventListener('keyup', lastnameValidation)

function emailValidation(e){
    let message = document.querySelector('#emailMessage')
    let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.value.match(regMail)){
        mail.style.border = '1px solid green'
        message.style.display = 'none'
    }else{
        mail.style.border = '1px solid red'
        message.style.display = 'flex'
    }
}

mail.addEventListener('keyup',emailValidation)

function passValidation(e){
    let message = document.querySelector('#passMessage')
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(pass.value.length >= 8 && pass.value.match(lowerCaseLetters) 
    && pass.value.match(upperCaseLetters) && pass.value.match(numbers)) {
        pass.style.border = '1px solid green'
        message.style.display = 'none'
    }else {
        pass.style.border = '1px solid red'
        message.style.display = 'flex'
    }    
} 

pass.addEventListener('keyup',passValidation)

function subForm(e){
    e.preventDefault()
    if(firstName.value !== '' && lastName.value !== '' && mail.value !== '' && pass.value !== ''
    && firstName.style.borderColor !== "red" && lastName.style.borderColor !== "red"
    && mail.style.borderColor !== "red" && pass.style.borderColor !== "red"){
       display()
    }
}

function display (){
    form.style.display = "none"
    header.style.display = "block"
    banner.style.display = "block"
    container.style.display = "flex"
}

submitForm.addEventListener('click', subForm)

//HEADER//

function dropMenu(){
    ham.addEventListener('click',((e)=> {
        dropdown.classList.toggle('block')
    })
)
    dropdown.addEventListener('mouseleave',function(){
        setTimeout(function(){
        dropdown.classList.remove('block')
        },300)
    })
}

dropMenu()

function check(){
    if(movieSearch.value === ''){
        button.disabled = true
    }else{
        button.disabled = false
    }
}

//FETCH//

function getConfig() {
    let url = ''.concat(baseURL, 'configuration?api_key=', key);
    fetch(url)
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            baseImageURL = data.images.secure_base_url;
            poster = data.images.poster_sizes[2];
            poster2 = data.images.poster_sizes[3]
        })
        .catch(function (err) {
            console.log(err);
        });
}
  
function runSearch(e) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', key, '&query=', movieSearch.value);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            sortResults = data.results
            listItems(data.results);
            sessionStorage.setItem("items", JSON.stringify(data.results))
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getTopRated(e) {
    clicks = 1;
    let url = ''.concat(baseURL, 'movie/top_rated?api_key=', key);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            dropdown.classList.toggle('block')
            sortResults = data.results
            listItems(data.results)
            sessionStorage.setItem("items", JSON.stringify(data.results))
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getPopular(e) {
    let url = ''.concat(baseURL, 'movie/popular?api_key=', key);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            dropdown.classList.toggle('block')
            sortResults = data.results
            listItems(data.results)
            sessionStorage.setItem("items", JSON.stringify(data.results))
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getUpcoming(e) {
    let url = ''.concat(baseURL, 'movie/upcoming?api_key=', key);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            dropdown.classList.toggle('block')
            sortResults = data.results
            listItems(data.results)
            sessionStorage.setItem("items", JSON.stringify(data.results))
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getIn(e) {
    let url = ''.concat(baseURL, 'movie/now_playing?api_key=', key);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            dropdown.classList.toggle('block')
            sortResults = data.results
            listItems(data.results)
            sessionStorage.setItem("items", JSON.stringify(data.results))
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieDetails(e) {
    movieId = (Number(e.path[1].id))
    let url = ''.concat(baseURL, 'movie/', movieId, '?api_key=', key);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            listDetails(data)
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getVideo(e) {
    movieId = (Number(e.path[1].id))
    let url = ''.concat(baseURL, 'movie/', movieId, '/videos?api_key=', key);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            listVideo(data)
        })
        .catch(function (err) {
            console.log(err);
        });
}

function getToken(e){
    let url = ''.concat(baseURL + 'authentication/guest_session/new?api_key=' + key)
    fetch(url)
        .then(result => result.json())
        .then((data => 
            token = data.guest_session_id)
        )
        .catch(function (err) {
            console.log(err);
        });
}

//MAIN ITEMS//

function sortItems(e){
    if(clicks % 2 === 0){
        sortResults.sort(function(a,b){
        return b.vote_average - a.vote_average
        })
    }
    else{
        sortResults.sort(function(a,b){
        return  a.vote_average - b.vote_average
        })
    }
  clicks += 1
  sessionStorage.setItem("items", JSON.stringify(sortResults))
  listItems(sortResults)
}

function listItems(items){
    let values = [];
    let keys = Object.keys(localStorage)
    for(let i = 0; i < keys.length; i++){
        values.push(JSON.parse(localStorage.getItem(keys[i])))
    }
    let watchlistId = []
    for(let i = 0; i < items.length; i++){
        for (let j = 0; j < values.length; j++){
            if(items[i].id === values[j].id){
                watchlistId.push(items[i].id)
            }
        }
   }
    container.innerHTML = "";
    movieSearch.value = "";
    let noMovie = document.createElement('div')
    noMovie.textContent = "No movies"
    noMovie.classList.add('card')
    noMovie.style.color = 'white'
    if(items.length === 0){
            container.append(noMovie)
        }
        for(let i = 0; i < items.length; i++){
            let stars = document.createElement('div')
            stars.id = 'stars'
            for(let i = 1; i <= 10; i++){
                let star = document.createElement('a');
                star.innerText = '⭐'
                star.id = i;
                stars.append(star) 
            }
            let image = document.createElement('img');
            let title = document.createElement('div')
            let card = document.createElement('div');
            let addButton = document.createElement('button')
            let rating = document.createElement('div')
            if(items[i].poster_path === null){
                image.src = "img/err.png"
            }
            else{
            image.src = baseImageURL + poster + items[i].poster_path;
            }
            title.textContent = items[i].title
            title.style.fontSize = '20px'
            title.classList.add('movieTitle')
            addButton.classList = 'addMovies'
            addButton.textContent = '+'
            rating.textContent = "rating: " + items[i].vote_average;
            rating.classList.add('movieRating')
            card.classList = 'card';
            card.setAttribute('id', items[i].id)
            card.append (addButton,image, title,rating,stars)
            addButton.addEventListener('click', ((e)=>{
                addButton.classList.add('removeMovies')
                localStorage.setItem(card.id, JSON.stringify(items[i]))
                watchlistNumber()
                listItems(items)
            })) 
            watchlistId.map((a)=>{
                if(a === Number(card.id)){
                    addButton.textContent = "x"
                    addButton.classList.add('removeMovies')
                    addButton.addEventListener('click', ((e)=>{
                        localStorage.removeItem(card.id);
                        addButton.classList.remove('removeMovies')
                        watchlistNumber()
                        listItems(items)
                    })
                )}
            })
            container.append(card)
            sort.classList.add('block')
            button.disabled = true
            image.addEventListener('click', movieDetails)
            title.addEventListener('click', movieDetails)
            image.addEventListener('click', getVideo)
            title.addEventListener('click', getVideo)
            rating.addEventListener('click', ((e)=>{
                stars.classList.toggle('block')
            }))
            stars.addEventListener('mouseleave', ((e)=>{
                stars.classList.remove('flex')
            }))
            starRating(card)
        }
}

function getWatchList(){
    ham.classList.add('none')
    back.classList.remove('none')
    banner.classList = ('none')
    let values = [];
    let keys = Object.keys(localStorage)
    for(let i = 0; i < keys.length; i++){
        values.push(JSON.parse(localStorage.getItem(keys[i])))
    }
    listItems(values)
}

document.cookie = []
let previousId = document.cookie.split(',')

function starRating(card){  
        let cardsList = card.childNodes
        cardsList[cardsList.length -1].childNodes.forEach((singleStar, clickedIndex) => {
            singleStar.addEventListener('click', (e)=>{ 
                let rateId = e.path[2].id
                for(let i = 0; i < previousId.length; i++){
                    if(rateId === (previousId[i])){
                    e.path[1].innerHTML = "You already rated!"
                    return false
                    }
                }
                let url = ''.concat(baseURL + 'movie/' +  e.path[2].id + '/rating?api_key=' + key + '&guest_session_id=' + token)
                fetch(url,{                   
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({value: e.target.id})
    
                    })
                    .then(response => response.json())
                    .then(data => {                 
                        console.log(data)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            e.path[1].classList.toggle('disabled');
            cardsList[cardsList.length -1].childNodes.forEach((otherStar, otherIndex) => {
                    if(otherIndex <= clickedIndex){
                        otherStar.classList.add('active')
                    }     
            })
            previousId.push(rateId)
            document.cookie = previousId
        })
    })
}
      
function listDetails(details){
    container.innerHTML = ""
    banner.classList = ('none')
    let values = [];
    let watchlistId = []
    let keys = Object.keys(localStorage)
    for(let i = 0; i < keys.length; i++){
        values.push(JSON.parse(localStorage.getItem(keys[i])))
    }
    values.map((a)=>{
        watchlistId.push(a.id)
    })
    let card = document.createElement('div');
    let image = document.createElement('img');
    let title = document.createElement('div');
    let rating = document.createElement('div');
    let overview = document.createElement('div');
    let date = document.createElement('div');
    let time = document.createElement('div');
    let countriesTag = document.createElement('span');
    countriesTag.textContent = "Countries: "
    let companiesTag = document.createElement('span');
    companiesTag.textContent = "Studios: "
    let languagesTag = document.createElement('span');
    languagesTag.textContent = "Languages: "
    let companiesDiv = document.createElement('div')
    let countriesDiv = document.createElement('div')
    let languagesDiv = document.createElement('div')
    let addButton = document.createElement('button')
    ham.classList.add('none')
    back.classList.remove('none')

    image.src = baseImageURL + poster2 + details.poster_path;
    title.textContent = details.title;
    title.classList.add('detailTitle')
    rating.textContent = 'Rating: ' + details.vote_average;
    overview.textContent = 'Movie Info: ' + details.overview;
    date.textContent = 'Release Date: ' + details.release_date
    time.textContent = 'Runtime: ' + details.runtime + " min."
    addButton.classList = 'addMovies'
    addButton.textContent = '+'
    addButton.addEventListener('click', ((e)=>{
        localStorage.setItem(card.id, JSON.stringify(details))
        addButton.classList.add('removeMovies')
        listDetails(details)
    }))
    addButton.addEventListener('click',getVideo)

    card.classList.add('cardDetails')
    card.setAttribute('id', details.id)
    
    card.append(addButton, image)

    details.genres.map((tag)=>{
        let genres = document.createElement('span')
        let genresTag = tag.name
        genres.textContent = genresTag
        genres.classList.add('genres')
        card.append(genres)
    })

    card.append(title, rating, overview, date, time)
    languagesDiv.append(languagesTag)

    details.spoken_languages.map((tag)=>{
        let languages = document.createElement('span')
        let languagesTagName = tag.english_name
        languages.textContent = " " + languagesTagName + ",";
        languagesDiv.append(languages)
    })

    languagesDiv.lastChild.textContent = languagesDiv.lastChild.textContent.slice(0, languagesDiv.lastChild.textContent.length -1)
    card.append(languagesDiv)
    companiesDiv.append(companiesTag)

    details.production_companies.map((tag)=>{
        let companies = document.createElement('span')
        let companiesTagName = tag.name
        companies.textContent = " " + companiesTagName + ",";
        companiesDiv.append(companies)
    })

    companiesDiv.lastChild.textContent = companiesDiv.lastChild.textContent.slice(0, companiesDiv.lastChild.textContent.length -1)
    card.append(companiesDiv)
    countriesDiv.append(countriesTag)

    details.production_countries.map((tag)=>{
        let countries = document.createElement('span')
        let countriesTagName = tag.name
        countries.textContent = " " + countriesTagName + ",";
        countriesDiv.append(countries)
    })
    countriesDiv.lastChild.textContent = countriesDiv.lastChild.textContent.slice(0, countriesDiv.lastChild.textContent.length -1)
    card.append(countriesDiv)
    
    container.append(card)
    watchlistId.map((a)=>{
        if(a === details.id){
            addButton.textContent = "x"
            addButton.classList.add('removeMovies')
            addButton.addEventListener('click',getVideo)
            addButton.addEventListener('click', ((e)=>{
                localStorage.removeItem(details.id);
                addButton.classList.add('addMovies')
                watchlistNumber()
                listDetails(details)
            })
        )}
    })
}

function listVideo(video){
    let trailer = document.createElement('iframe')
    trailer.src = "https://www.youtube.com/embed/" + video.results[0].key
    container.append(trailer)
    watchlistNumber()
}

function backFun(){
    let backItems = JSON.parse(sessionStorage.getItem('items'))
    banner.classList.remove('none')
    ham.classList.remove('none')
    back.classList.add('none')
    if(backItems === null){
        container.innerHTML = ""
        return false
    }
    listItems(backItems)
}

function watchlistNumber(){
    let num = document.querySelector('#movieNumber')
    
    num.innerText = localStorage.length
    if(localStorage.length === 0){
        num.innerText = ""
    }
}

watchlistNumber()

//EVENT LISTENERS//

document.addEventListener('DOMContentLoaded', getConfig);
document.addEventListener('DOMContentLoaded', getToken)
document.addEventListener('DOMContentLoaded', ((e)=>{
    sessionStorage.removeItem('items')
}))
banner.addEventListener('mouseover', check)
button.addEventListener('click',runSearch)
banner.addEventListener('keyup', ((e)=>{
    if(e.key === 'Enter'){
       runSearch()
    }
}))
topRated.addEventListener('click', getTopRated)
popular.addEventListener('click', getPopular)
upcoming.addEventListener('click', getUpcoming)
inCinema.addEventListener('click', getIn)
sort.addEventListener('click', sortItems)
watchlist.addEventListener('click', getWatchList)
back.addEventListener('click', backFun)
