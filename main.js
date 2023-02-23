const list = document.querySelector('#list')
const inputSearch = document.querySelector('#city-form')
const errorAlarm = document.querySelector('.error-alarm');

 document.querySelector('#city-form').addEventListener('submit', function(e){
  e.preventDefault();

(async () => {
  const cityName = document.querySelector('#city-input').value;
  const url = `https://restcountries.com/v3.1/name/${cityName}`;
  const inputCity = document.querySelector('#city-input')
  
  if(!inputCity.value){
    errorAlarm.innerHTML = `<p class="error-message">Enter a city to continue</p>`
    setTimeout(() => {
      errorAlarm.innerHTML = '';   
     }, 5000);  

     return
  }

  if(inputCity.value)

  try{
       fetch(url) 
     .then(response => {
      if (!response.ok) {
       const notFound = document.querySelector('.error-notfound')
       notFound.innerHTML = `<p class="pCityNotFound">City not found, please try again.</p>`
        }
       return response.json();
    })
        .then(data => {
       console.log(data[0].capital);
       console.log(data[0].name.common);
       console.log(data[0].population);
       console.log(
        Object.values(data[0].languages).toString().split(",").join(",")
       )

      list.innerHTML = `
      <div class="bandeira">
      <img src="${data[0].flags.svg}" class="flags-img">
      </div>
      <div class="wrapper">
      <div class="nome-capital"> 
      <p> Nome: ${data[0].name.common}</p>
      <p> Capital: ${data[0].capital} </p>
      </div>
      <div class="idioma-pop">
      <p>Idioma: ${Object.values(data[0].languages).toString().split(" ,").join(", ")}</p> 
      <p> População: ${data[0].population} </p>
      </div>
      `;      
    })

    inputCity.focus();
    inputCity.value = ''

  }catch(error){

  }
   
  })();  
  
 })