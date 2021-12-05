const fetchData =  async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '2ac4a8c1',
            s: searchTerm
        }
    });
    console.log(response.data)
}

let timeoutId;
const onInput = (event)=> {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        fetchData(event.target.value) 
    }, 5000);
    
}

const input = document.querySelector('input')

input.addEventListener('input', onInput)