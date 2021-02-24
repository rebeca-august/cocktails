import React, { FormEvent, useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const searchValue = useRef<HTMLInputElement>(null)

  const searchCocktail = () => {
    if (searchValue.current) {
      setSearchTerm(searchValue.current.value)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  React.useEffect(() => {
    if (searchValue.current) {
      searchValue.current.focus()
    }
  }, [])

  return (
    <section className="section search">
      <form action="" className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
