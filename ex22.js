const searchButton = document.getElementById("submitSearch");
const inputElement = document.getElementById("searchWord");
const imageElement = document.querySelector("#imageContainer img");
const feedbackParagraph = document.createElement("p");

document.getElementById("inputContainer").appendChild(feedbackParagraph);
    const fetchGif = () => {
    const apiKey = "onLjxLfEubIEZrIjVx9ITGNQ7WqhAon5";
    const searchTerm = inputElement.value.trim();

    if (!searchTerm) {
    feedbackParagraph.textContent = "Please enter the GIF you want to search.";
    return;
    }

    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error("Failed to fetch GIF");
        }
        return response.json();
    })
    .then(data => {
        if (data.data.images) {
            imageElement.src = data.data.images.original.url;
            inputElement.value = "";
            feedbackParagraph.textContent = "";
        } else {
        throw new Error("No GIF found for this search term");
        }
    })
    .catch(error => {
        console.error(error);
        feedbackParagraph.textContent = error.message;
    });

    inputElement.value = "";
};

searchButton.addEventListener("click", fetchGif);

searchButton.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchGif();
    }
    });

