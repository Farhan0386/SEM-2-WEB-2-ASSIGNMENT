const form=document.querySelector('#weatherForm');
constAPI_KEY='e81cba2d4c42f96db974303ccebe8a68';
form.addEventListener('submit', async function(event){
    event.preventDefault();
    const seacrchedCity=document.querySelector('#city').value;  
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${seacrchedCity}&appid=${API_KEY}`);
    const data=await response.json();
    
    console.log(data);
})
