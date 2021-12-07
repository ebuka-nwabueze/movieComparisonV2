const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {

    
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results">

                </div>
            </div>
        </div>
    `;

// this is where the user inputs is recieved
const input = root.querySelector('input')
const dropdown = root.querySelector('.dropdown')
const resultsWrapper = root.querySelector('.results')

const onInput = async (event)=> {
     const items = await fetchData(event.target.value) 
     console.log(items)
     if(!items.length){
        dropdown.classList.remove('is-active')
        return;
     }

    // deletes the previous seacrh to accommodate the new results
    resultsWrapper.innerHTML = ''
    // iterate over the returned items and place the results inside an element holder
    dropdown.classList.add('is-active')

    for (let item of items){
        const option = document.createElement('a')
        

        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item)
        option.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active')
            input.value = inputValue(item)

            onOptionSelect(item)
            //This funtion handles the follow up request and html to be rendered
            
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
};