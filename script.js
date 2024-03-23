document.getElementById('preferences-form').addEventListener('submit', function (event) {
    event.preventDefault();


    const cuisineType = document.getElementById('cuisine-type').value;
    const mealType = document.getElementById('meal-type').value;
    const ingredients = document.getElementById('ingredients').value;
    
    const API_ID = config.API_ID
    const API_KEY = config.API_KEY





    let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}`;

    if (cuisineType) {
        url += `&cuisineType=${cuisineType}`;
    }

    if (mealType) {
        url += `&mealType=${mealType}`;
    }

    if (ingredients) {
        url += `&q=${ingredients}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const recipes = data.hits.map(hit => hit.recipe);
            const recipeContainer = document.getElementById('recipe-container');
            recipeContainer.innerHTML = recipes.map(recipe => `
                <div class="recipe">
                    <h3>${recipe.label}</h3>
                    <img src="${recipe.image}" alt="${recipe.label}" data-url="${recipe.url}">
                    <a href="${recipe.url}" target="_blank"></a>
                </div>
            `).join('');

            // Add event listener to images
            const recipeImages = document.querySelectorAll('.recipe img');
            recipeImages.forEach(img => {
                img.addEventListener('click', function () {
                    const recipeUrl = this.getAttribute('data-url');
                    if (recipeUrl) {
                        window.open(recipeUrl, '_blank');
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
});
document.addEventListener('DOMContentLoaded', function () {
    const randomRecipeContainer = document.querySelector('.random');

    const API_ID = config.API_ID
    const API_KEY = config.API_KEY

    let url1=`https://api.edamam.com/api/recipes/v2?type=public&q=potato&app_id=${API_ID}&app_key=${API_KEY}&random=true`;

    fetch(url1)
        .then(response => response.json())
        .then(data => {
            const recipes = data.hits.map(hit => hit.recipe);
            randomRecipeContainer.innerHTML = recipes.map(recipe => `
                <div class="recipe">
                    <h3>${recipe.label}</h3>
                    <img src="${recipe.image}" alt="${recipe.label}" data-url="${recipe.url}">
                    <a href="${recipe.url}" target="_blank"></a>
                </div>
            `).join('');

            // Add event listener to images
            const recipeImages = randomRecipeContainer.querySelectorAll('.recipe img');
            recipeImages.forEach(img => {
                img.addEventListener('click', function () {
                    const recipeUrl = this.getAttribute('data-url');
                    if (recipeUrl) {
                        window.open(recipeUrl, '_blank');
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching random recipes:', error));
});