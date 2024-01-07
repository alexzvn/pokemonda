import PokeAPI from "~/api/PokeAPI"
import Pokemon, { Pokemon as IPokemon } from "~/components/Pokemon"
import Main from './Main'

interface ListPokemon {
  count: number,
  next?: string
  previous?: string
  results: Array<{ name: string, url: string }>
}

export default async function Home() {
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
  const list = await PokeAPI.get<ListPokemon>('/pokemon?limit=10')

  const requests = list.results.map(poke => {

    return PokeAPI.get('/pokemon/' + random(1, 1000)) as Promise<IPokemon>
    // return fetch(poke.url).then(res => res.json()) as Promise<IPokemon>
  })

  const pokemons = await Promise.all(requests)

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-10">
        <Main pokemons={pokemons} />
      </div>
    </div>
  )
}
