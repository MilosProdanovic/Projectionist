let key = "9ad839273b220803b9a6143becde4b49";
let baseURL = 'https://api.themoviedb.org/3/';
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
    let hamburger = document.querySelector('#ham')
    hamburger.addEventListener('click',((e)=> {
        dropdown.classList.toggle('block')
    })
)}

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
            alert(err);
        });
}
  
function runSearch(e) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', key, '&query=', movieSearch.value);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            sortResults = data.results
            listItems(data.results);
        })
        .catch(function (err) {
            alert(err);
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
        })
        .catch(function (err) {
            alert(err);
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
        })
        .catch(function (err) {
            alert(err);
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
        })
        .catch(function (err) {
            alert(err);
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
        })
        .catch(function (err) {
            alert(err);
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
            alert(err);
        });
}

function getVideo(e) {
    movieId = (Number(e.path[1].id))
    let url = ''.concat(baseURL, '/movie/', movieId, '/videos?api_key=', key);
    fetch(url)
        .then(result => result.json())
        .then((data) => {
            listVideo(data)
        })
        .catch(function (err) {
            alert(err);
        });
}

//MAIN ITEMS//

function sortItems(e){
    if(clicks % 2 === 0){
        sortResults.sort(function(a,b){
        return b.vote_average - a.vote_average
        })
    }else{
        sortResults.sort(function(a,b){
        return  a.vote_average - b.vote_average
        })
    }
  clicks += 1
  listItems(sortResults)
}

function listItems(items){
    container.innerHTML = "";
    movieSearch.value = "";
    for(let i = 0; i < items.length; i++){
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
            card.append (addButton,image, title,rating)
            container.append(card)
            sort.classList.add('block')
            button.disabled = true
            image.addEventListener('click', movieDetails)
            title.addEventListener('click', movieDetails)
            image.addEventListener('click', getVideo)
            title.addEventListener('click', getVideo)
        }
}

function listDetails(details){
    container.innerHTML = ""
    banner.classList = ('none')
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
    let companiesDiv = document.createElement('div')
    let countriesDiv = document.createElement('div')
    let addButton = document.createElement('button')
    let ham = document.querySelector('.dropdown')
    ham.classList.add('none')

    image.src = baseImageURL + poster2 + details.poster_path;
    title.textContent = details.title;
    title.classList.add('detailTitle')
    rating.textContent = 'Rating: ' + details.vote_average;
    overview.textContent = 'Movie Info: ' + details.overview;
    date.textContent = 'Release Date: ' + details.release_date
    time.textContent = 'Runtime: ' + details.runtime + " min."
    addButton.classList = 'addMovies'
    addButton.textContent = '+'
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

    companiesDiv.append(companiesTag)
    card.append(title, rating, overview, date, time)

    details.production_companies.map((tag)=>{
        let companies = document.createElement('span')
        let companiesTag = tag.name
        companies.textContent = " " + companiesTag + ",";
        companiesDiv.append(companies)
    })

    companiesDiv.lastChild.textContent = companiesDiv.lastChild.textContent.slice(0, companiesDiv.lastChild.textContent.length -1)
    countriesDiv.append(countriesTag)
    card.append(companiesDiv)

    details.production_countries.map((tag)=>{
        let countries = document.createElement('span')
        let countriesTag = tag.name
        countries.textContent = " " + countriesTag + ",";
        countriesDiv.append(countries)
    })

    countriesDiv.lastChild.textContent = countriesDiv.lastChild.textContent.slice(0, countriesDiv.lastChild.textContent.length -1)
    card.append(countriesDiv)
    container.append(card)
}

function listVideo(video){
    let trailer = document.createElement('iframe')
    console.log(video.results[0].key )
    trailer.src = "https://www.youtube.com/embed/" + video.results[0].key 

    container.append(trailer)
}

document.addEventListener('DOMContentLoaded', getConfig);
banner.addEventListener('mouseover', check)
button.addEventListener('click',runSearch)
topRated.addEventListener('click', getTopRated)
popular.addEventListener('click', getPopular)
upcoming.addEventListener('click', getUpcoming)
inCinema.addEventListener('click', getIn)
sort.addEventListener('click', sortItems)

