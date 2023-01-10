import { moviesData } from "./dataMovies.js"

class randomMoviesApp {
    constructor(element) {
        this.root = document.querySelector(element)
        this.FindMovie()
    }

    FindMovie() {
        const spawnMovieButton = this.root.querySelector('main button')

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
                throw new Error("O ID gerado não corresponde a nenhum filme")
            }

            this.updatePage()
        }
        catch (error) {
            this.errorUpdate()
            return console.log(error.message)
        }
    }
}

export class appPage extends randomMoviesApp {
    constructor(element) {
        super(element)
        this.updatePage
        this.errorUpdate
    }

    updatePage() {
        this.root.querySelector('main p').innerHTML = `<span class="title"> ${this.movie.original_title}</span>${this.movie.overview}`
        this.root.querySelector('main img').src = `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
        clearTimeout(this.timeoutError)
    }

    errorUpdate() {
        this.root.querySelector('main img').src = "./assets/code.png"
        this.root.querySelector('main p').innerHTML = `<span class="title">Ops, hoje não é dia de assistir filme. Bora codar! 🚀</span>`

        this.timeoutError = setTimeout(() => {
            this.root.querySelector('.movie').classList.add('hide')
        }, 5000)
    }
}
