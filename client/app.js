document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const resultsDiv = document.getElementById('results');

    console.log('Elements:', { searchButton, searchBar, resultsDiv });  

    if (searchButton && searchBar && resultsDiv) {
        searchButton.addEventListener('click', () => {
            const query = searchBar.value.trim();
            console.log('Search button clicked. Query:', query);
            if (query) {
                fetchRecipes(query);
            }
        });
    } else {
        console.error('One or more elements are missing.');
    }

    function fetchRecipes(query) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        console.log('Fetching URL:', url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                if (data && data.meals) {
                    displayResults(data);
                } else {
                    console.error('No meals found in response');
                    resultsDiv.innerHTML = '<p>No recipes found</p>';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    

    function displayResults(data) {
        resultsDiv.innerHTML = '';
        if (data.meals && data.meals.length > 0) {
            data.meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('meal');
                mealDiv.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img">
                    <p>${meal.strInstructions}</p>
                `;
                resultsDiv.appendChild(mealDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>No recipes found</p>';
        }
    }
});
