import { nanoid } from "nanoid"

export default async function getMovie(movie: string) {
    let respons = await fetch(`http://www.omdbapi.com/?apikey=7e04df9e&t=${movie}`)
    if (!respons.ok) {
        throw Error("Problem ....")
    } else {
        let result = await respons.json()
        return {
            id:nanoid(),
            ...result,
            watched: false,
            alreadyWatched: false,
        }
    }
}