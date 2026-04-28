import { useState, useEffect } from "react";
import { getProductById } from "../Service/ProductsService";

export function useDetailsClientProductState(idProduct){

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorBody, setErrorBody] = useState(null)

    const fecthClientProductById = (idProduct) => {
        setLoading(true)
        setError(false)

        getProductById(idProduct)
            .then((product) => setProduct(product))
            .catch((e) => {
                setError(true)
                setErrorBody(e.body ?? {
                    code: e.code,
                    message: e.message
                })
            }).then(() => setLoading(false))
    }

    useEffect(() => {
        fecthClientProductById(idProduct)
    }, []);
    
    return { product, loading, error, errorBody, reloadProductById: fecthClientProductById}
    
}