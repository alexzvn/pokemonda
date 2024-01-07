'use client'

import clsx from 'clsx'
import _ from 'lodash'
import { getUser } from '~/context/UserContext'
import { actions, useAccountDispatch, useAccountSelector } from '~/redux/AccountStore'

export default function Pokemon({ pokemon }: React.PropsWithRef<{ pokemon: Pokemon }>) {
  const user = getUser()
  const likes = useAccountSelector(state => state.liked)
  const dispatch = useAccountDispatch()
  const isLiked = new Set(likes).has(pokemon.id)

  const like = () => {
    user && dispatch(isLiked ? actions.unlike(pokemon.id) : actions.like(pokemon.id))
  }

  const image = pokemon.sprites.other.dream_world.front_default
    || pokemon.sprites.back_default

  return (
    <div className="card card-compact bg-base-100 shadow">
      <figure className="aspect-square bg-base-200/50 p-3">
        <img className="aspect-square object-contain" src={image} alt={pokemon.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {_.capitalize(pokemon.name)}
        </h2>

        <div>
          <button className={clsx('btn btn-sm', !isLiked && 'btn-warning')} onClick={like}>
            { isLiked ? 'Unlike' : 'Like' }
          </button>
        </div>
      </div>
    </div>
  )
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string
    back_female: string|null
    front_default: string
    front_female: string|null
    other: {
      dream_world: {
        front_default: string
      }
      'offical-artwork': {
        front_default: string
        front_shiny: string
      }
    }
  }
}
