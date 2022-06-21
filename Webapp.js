//handler for pull request
const animeForm = document.getElementById("form")
animeForm.addEventListener('submit', getAnimeHandler)

function getAnimeHandler(e) {
    e.preventDefault();

    //get request to populate results
    let input = e.target.animeSearch.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${input}`)
    .then(res => res.json())
    .then(function (data) {
        const animes = data.data;

        //get number of search results and displays
        let total = 0;
        animes.forEach(() => {
            total++;
        })
        document.getElementById('results').textContent = `${total} results!`

    }).catch((error) => {
        alert('No anime found')
    })  
}
