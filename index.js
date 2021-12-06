const fetchData =  async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '2ac4a8c1',
            s: searchTerm
        }
    });

    if (response.data.Error){
        return [];
    }

    return response.data.Search

};


const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">

            </div>
        </div>
    </div>
`;

// this is where the user inputs is recieved
const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const onInput = async (event)=> {
     const movies = await fetchData(event.target.value) 

     if(!movies.length){
        dropdown.classList.remove('is-active')
        return;
     }

    // deletes the previous seacrh to accommodate the new results
    resultsWrapper.innerHTML = ''
    // iterate over the returned movies and place the results inside an element holder
    dropdown.classList.add('is-active')

    for (let movie of movies){
        const option = document.createElement('a')
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src="${imgSrc}">
        ${movie.Title}
        `
        option.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active')
            input.value = movie.Title

            //This funtion handles the follow up request and html to be rendered
            onMovieSelect(movie)
        })
        resultsWrapper.appendChild(option)
    }
     
};

input.addEventListener('input', debounce(onInput,500))

// event listener to close the dropdown when outside the the root element is clicked.

document.addEventListener('click', (event)=>{
    if (!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    };
});


const onMovieSelect = async (movie)=>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '2ac4a8c1',
            i: movie.imdbID
        }
    });
   document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail)=>{
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>    
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">BoxOffice</p>
        </article>    
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>    
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">imdbRating</p>
        </article>    
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">imdbVotes</p>
        </article>    
    `;
};