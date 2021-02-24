import React from 'react'
import { Link } from 'react-router-dom'
import { Cocktail as CocktailType } from '../pages/SingleCocktail'

type Props = {
  cocktail: CocktailType
}

const Cocktail = ({ cocktail }: Props) => {
  const { id, name, image, glass, info } = cocktail

  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-detail">
          details
        </Link>
      </div>
    </article>
  )
}

export default Cocktail
