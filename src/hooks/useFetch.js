import { useEffect, useState } from "react";

const useFetch = () => {
  const [json, setJson] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const URL = "https://fakestoreapi.com/products/";
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(URL)
        const result = await response.json()
        if (response.ok) {
          setJson(result)
        } else {
          setHasError(true)
          setErrorMessage(result)
        }
        setIsLoading(false)
      } catch (err) {
        setHasError(true)
        setErrorMessage(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
return { json, isLoading, hasError, errorMessage }
}
export default useFetch
