const fetchData =  async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '2ac4a8c1',
            s: searchTerm
        }
    });
    console.log(response.data)
}

fetchData('avengers')