import { useState } from "react";
import { getDatesByProducts } from "../Service/ProductsService";


export function pagesDatesByProductsState(){
    const [maxPages, setMaxPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorBody, setErrorBody] = useState(null)

    const fetchDatesByProducts = () => {
        setLoading(true)
        setError(false)
        setErrorBody(null)
        getDatesByProducts()
            .then((dates) => setMaxPages(dates))
            .catch((error) => {
                setError(true);
                setErrorBody(error.body ?? {
                    code: error.code,
                    message: error.message
                })
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchDatesByProducts()
    }, [])

    return { maxPages, currentPage, loading, error, errorBody, reloadDatesPages: fetchDatesByProducts}
}