import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'
import { Cocktail } from './pages/SingleCocktail'

type State = {
  loading: boolean
  cocktails: Cocktail[]
  setSearchTerm: Dispatch<SetStateAction<string>>
}

type CocktailsData = {
  drinks: {
    idDrink: string
    strDrink: string
    strDrinkThumb: string
    strAlcoholic: string
    strGlass: string
  }[]
}

type Props = {
  children: ReactNode
}

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext({} as State)

const AppProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState<Cocktail[]>([])

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = (await response.json()) as CocktailsData
      const { drinks } = data

      if (drinks) {
        const newCocktails = drinks.map((drink) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = drink
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks])

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
