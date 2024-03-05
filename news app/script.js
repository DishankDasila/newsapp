//API_KEY is a special code that identifies the user to the news API (NewsAPI in this case).
//url is the base URL for making requests to the NewsAPI.

const API_KEY = "4e87cdfd506742608513fdd5e1f5ecdf";
const url = "https://newsapi.org/v2/everything?q=";


//When the webpage finishes loading, this code calls a function named fetchNews with the argument "World".
//This initially loads news related to the world.
window.addEventListener("load", () => fetchNews("World"));
function reload() {
    window.location.reload();
}
//This function takes a query (like "India", "Business", etc.) as an argument.
//It makes an asynchronous (non-blocking) request to the news API using the fetch function,
//combining the base URL and the query along with the API Key.
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();//It then converts the response into JSON format using await res.json(), which contains the news data.
    bindData(data.articles);
}

//This function takes an array of news articles as input.
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");//It first gets a reference to the container where news cards will be displayed and the template for a news card from your HTML.
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = ""; //Then, it clears any existing content in the container with cardsContainer.innerHTML = "".

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

//This function takes a clone of the card template and an article as input.
//It finds specific elements within the card (like the news image, title, source, and description) and updates their content with information from the article.
//It also formats and sets the publication date and time.
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

//This function is called when a navigation item (like "India", "Business", etc.) is clicked.
//It calls fetchNews with the clicked item's id.
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});










