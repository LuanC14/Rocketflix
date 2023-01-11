import { moviesData } from "./dataMovies.js"

class randomMoviesApp {
    constructor(element) {
        this.root = document.querySelector(element)
        this.FindMovie()
        this.load()
    }

    load() {
        this.savedMovies = JSON.parse(localStorage.getItem('@Movies-Saved')) || []
    }

    save() {
        localStorage.setItem('@Movies-Saved', JSON.stringify(this.savedMovies))
    }

    FindMovie() {
        const spawnMovieButton = this.root.querySelector('.find-movie')

        spawnMovieButton.onclick = () => {
            const multiplicator = Math.random() * 999
            const randomNumber = Math.trunc(multiplicator)

            document.querySelector('.movie').classList.remove('hide')

            this.spawnMovie(randomNumber)
        }
    }

    async spawnMovie(id) {
        try {
            this.movie = await moviesData.moviesIMDB(id)

            if (this.movie.original_title == undefined || null) {
                throw new Error("O ID gerado não corresponde a nenhum filme, tente novamente")
            }
            this.updatePage()
            this.addMovieList(this.movie)
        }
        catch (error) {
            this.errorUpdate()
        }
    }

    addMovieList(movie) {
        const saveButton = this.root.querySelector('main .save-movie')
        saveButton.onclick = () => {
            if (this.savedMovies.length >= 8) {
                return alert("Ops, você já possui muito filme na sua lista de espera, remova os que você já assistiu")
            }

            this.savedMovies = [movie, ...this.savedMovies]
            this.updateList()
            this.save()
            console.log(this.savedMovies)
        }
    }

    deleteMovieList(movie) {
        const filteredMovie = this.savedMovies
            .filter(entry => entry.original_title != movie.original_title)

        this.savedMovies = filteredMovie
        this.updateList()
        this.save()
    }
}

export class appPage extends randomMoviesApp {
    constructor(element) {
        super(element)
        this.updatePage
        this.errorUpdate
        this.updateList()
    }

    updatePage() {
        this.root.querySelector('main p').innerHTML = `<span class="title"> ${this.movie.original_title}</span>${this.movie.overview}`
        this.root.querySelector('main img').src = `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
        clearTimeout(this.timeoutError)
    }

    updateList() {
        this.removeAllLi()
        this.savedMovies.forEach(movie => {
            const itemList = this.createItemList()
            itemList.querySelector('img').src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            itemList.querySelector('p').textContent = movie.original_title
            itemList.querySelector('.remove-movie').onclick = () => {
                this.deleteMovieList(movie)
            }

            const ul = this.root.querySelector('.saved-movies')
            ul.append(itemList)
        })
    }

    createItemList() {
        const li = document.createElement('li')

        li.innerHTML = `
        <li>
        <button class="remove-movie">X</button>          
        <img src="" alt="">
          <p></p>
          </li>`


        return li
    }

    removeAllLi() {
        const liNode = this.root.querySelectorAll('ul li')

        liNode.forEach((li) => {
            li.remove()
        })
    }

    errorUpdate() {
        this.root.querySelector('main img').src = "./assets/code.png"
        this.root.querySelector('main p').innerHTML = `<span class="title">Ops, hoje não é dia de assistir filme. Bora codar! 🚀</span>
        <p> Brincadeiras a parte, o ID gerado aleatoriamente não corresponde a nenhum filme no servidor, tente novamente!</p>`

        this.timeoutError = setTimeout(() => {
            this.root.querySelector('.movie').classList.add('hide')
        }, 10000)
    }

}
