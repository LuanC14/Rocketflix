export class moviesData {
    static moviesIMDB(id) {
        const endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=5d12bf50c9dda147a8504eec3222b4a8`

        return fetch(endpoint)
            .then(data => data.json())
            .then((data) => {
                const { original_title, overview, poster_path } = data
                console.log(data)
                return { original_title, overview, poster_path }
            })
    }
}