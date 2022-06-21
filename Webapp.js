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

        for(let anime of animes){

            //some anime are not returning a year. changes null value to 'N/A'
            if(anime.year == null) {
                anime.year = 'N/A';
            }

            //builds animeList section
            let newAnime = document.createElement('div');
            newAnime.className = 'anime';
            //writes the html for each anime returned
            newAnime.innerHTML = `
            <img id='${anime.mal_id}img' src=${anime.images.webp.image_url}>
            <div class='animeContent'>
                <span style="font-weight:bold">${anime.title} </span><button id='${anime.mal_id}btn'>More Info</button>
                <br>
                <br>
            </div>
            <div class='mouseClickContent'>
                <span id=${anime.mal_id} hidden>Episodes: ${anime.episodes}, Since: ${anime.year}</span>
            </div>`
            //add each anime to a list
            document.getElementById('animeList').appendChild(newAnime);

            //grabs all buttons under anime to turn to more info buttons
            const btn = document.getElementById(`${anime.mal_id}btn`)

            //adding buttons for more info
            btn.addEventListener('click', function () {
                if (btn.textContent == 'More Info') {
                    document.getElementById(`${anime.mal_id}`).hidden = false;
                    document.getElementById(`${anime.mal_id}btn`).textContent = 'Hide Info';
                }
                else if(btn.textContent == 'Hide Info') {
                    document.getElementById(`${anime.mal_id}`).hidden = true;
                    document.getElementById(`${anime.mal_id}btn`).textContent = 'More Info';
                }
            })

            const animeImg = document.getElementById(`${anime.mal_id}img`)

            //adding anime synopsis
            animeImg.addEventListener('mouseover', function () {

                document.getElementById('mouseOverContentTitle').textContent = `${anime.title}`;
                document.getElementById('mouseOverContent').textContent = `${anime.synopsis}`;
            })
        }
    }).catch((error) => {
        alert('No anime found')
        //in case of bug
    })  
}


//handler for delete button
const deleteBtn = document.getElementById('delete')
deleteBtn.addEventListener('click', clearSearchHandler)

function clearSearchHandler(e) {
    let animeToClear = document.querySelectorAll('.anime')
    for(let anime of animeToClear) {
        anime.remove();
    }
    document.getElementById('mouseOverContent').textContent = '';
    document.getElementById('mouseOverContentTitle').textContent = '';
    document.getElementById('results').textContent = '';
}