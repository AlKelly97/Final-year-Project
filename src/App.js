//Importing the necessary dependancies for the project
import './App.css';
import NewsList from './NewsList';
import $ from "jquery"
import React from 'react'

//The App component handles all of the rendering in the browser.
function App() {

  //Using Jquery to call and render the API data fro covidAPI. 
  //Uses a GET request to return Confirmed cases, Recovered and Deaths
  $.getJSON("https://api.covid19api.com/total/country/IE", function (api) {
    console.log(api)
    var Confirmed = api[api.length - 1].Confirmed
    var Deaths = api[api.length - 1].Deaths;
    var Recovered = api[api.length - 1].Recovered;

    $(".Confirmed").html('<strong>Confirmed:</strong>' + Confirmed);
    $(".Deaths").html('<strong>Deaths:</strong>' + Deaths);
    $(".Recovered").html('<strong>Recovered:</strong>' + Recovered);
  });

  //Simple HTML content below:
  return (
    <div className="App">
      <header className="App-header">
        <nav>
        <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="tips.html">Lockdown Tips</a></li>
        <li><a href="/Posts">Discussions</a></li>
    </ul>
        </nav>

        </header>
        <body>
         
<div className="cases">

       <div id="left"> <p class="Confirmed"></p></div>
      <div id="center"> <p class="Deaths"></p></div>
      <div id="right"> <p class="Recovered"></p></div>
</div>

          {/*Calls the NewsList Component and displays it all from the below tag.*/}
          <NewsList/>
          


          </body>
       
     
      
    </div>
  );
}






export default App;
