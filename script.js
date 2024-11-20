// const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
// const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";


// const main = document.getElementById("section");
// const form = document.getElementById("form");
// const search = document.getElementById("query");

// returnMovies(APILINK)
// function returnMovies(url){
//   fetch(url).then(res => res.json())
//   .then(function(data){
//   console.log(data.results);
//   data.results.forEach(element => {
//       const div_card = document.createElement('div');
//       div_card.setAttribute('class', 'card');
      
//       const div_row = document.createElement('div');
//       div_row.setAttribute('class', 'row');
      
//       const div_column = document.createElement('div');
//       div_column.setAttribute('class', 'column');
      
//       const image = document.createElement('img');
//       image.setAttribute('class', 'thumbnail');
//       image.setAttribute('id', 'image');
      
//       const title = document.createElement('h3');
//       title.setAttribute('id', 'title');
      
//       const center = document.createElement('center');

//       title.innerHTML = `${element.title}`;
//       image.src = IMG_PATH + element.poster_path;

//       center.appendChild(image);
//       div_card.appendChild(center);
//       div_card.appendChild(title);
//       div_column.appendChild(div_card);
//       div_row.appendChild(div_column);

//       main.appendChild(div_row);
//   });
// });
// }

// form.addEventListener("submit", (e) => {
// e.preventDefault();
// main.innerHTML = '';

// const searchItem = search.value;

// if (searchItem) {
//   returnMovies(SEARCHAPI + searchItem);
//     search.value = "";
// }
// });


async function returnMovies() {
  try {
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Process data here
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

returnMovies();


const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function fetchWithRetry(url, retries = 3) {
  return fetch(url).then(res => {
    if (!res.ok) {
      if (retries > 0) {
        console.warn(`Retrying... (${3 - retries + 1})`);
        return fetchWithRetry(url, retries - 1);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }
    return res.json();
  });
}


returnMovies(APILINK);

function returnMovies(url) {
  fetchWithRetry(url)
    .then(data => {
      console.log(data.results);
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');

        title.innerHTML = `${element.title}`;
        image.src = IMG_PATH + element.poster_path;

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
      });
    })
    .catch(error => {
      console.error('Error fetching the data:', error);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); //to avoid refreshing of page
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});


//Explaination of the Code -->

// This code creates a simple movie browser using the TMDb (The Movie Database) API, displaying popular movies by default and allowing users to search for specific movies. Here's an explanation of the code in simple terms:

// 1. Constants and Variables
// APILINK: URL to fetch popular movies from TMDb.
// IMG_PATH: Base URL for movie poster images.
// SEARCHAPI: URL to search for specific movies using a query string.
// main: Refers to the HTML element where the movie cards will be displayed.
// form and search: Represent the HTML form and the search input box used for searching movies.

// 2. Fetch Function with Retry Mechanism
// fetchWithRetry(url, retries):
// Fetches data from the given URL.
// If the request fails, it retries up to 3 times.
// If all retries fail, an error is logged.

// 3. Display Movies
// returnMovies(url):
// Fetches movie data using the given URL.
// For each movie in the fetched data:
// Creates an HTML structure for displaying the movie title and poster.
// Adds this structure to the webpage dynamically using JavaScript.

// Steps inside returnMovies:
// Fetch Data: The fetchWithRetry function fetches movie data from the API.
// Create Movie Cards:
// A <div> is created for each movie (div_card) to represent a card.
// Another <div> (div_row) groups cards together.
// Inside the card, an image (<img>) and a title (<h3>) are dynamically added.
// The movie poster (poster_path) is fetched from TMDb using the IMG_PATH URL.
// Add to Webpage: The constructed card is appended to the main HTML element.

// 4. Search Functionality
// When a user types in the search box and submits the form:
// Prevent Page Refresh: The e.preventDefault() function stops the default form submission behavior (which refreshes the page).
// Clear Previous Results: main.innerHTML = '' clears the displayed movies.
// Fetch and Display Search Results:
// Builds a URL using the user's search query (SEARCHAPI + searchItem).
// Calls returnMovies() to display the search results.

// 5. Error Handling
// If the fetch operation fails (e.g., due to network issues), an error message is logged to the console.


// How It Works
// 1.Default Movies: When the page loads, the most popular movies are displayed using the APILINK.
// 2.Search:
//     The user enters a movie name in the search box.
//     The app fetches matching movies using the SEARCHAPI.
//     The results are displayed on the webpage.


// Key Features-->
// 1)Dynamic Content: Fetches and displays movies dynamically without requiring a page reload.
// 2)Retry Mechanism: Ensures data fetching is reliable.
// 3)User Search: Allows users to search for specific movies by name.

// This project is a great way to practice working with APIs, JavaScript DOM manipulation, and asynchronous programming!