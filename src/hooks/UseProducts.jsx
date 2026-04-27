import { useState, useEffect } from "react";

import { getClientProducts } from "../Service/ProductsService";
import { getClientProductsByPage } from "../Service/ProductsService";
import { getDatesByProducts } from "../Service/ProductsService";
import { getClientProductsByPageFilter } from "../Service/ProductsService";
import { getDatesByProductsFilter } from "../Service/ProductsService";

export function useProductsState(indexPage = 1, isFiltered = false, filter = "") {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorBody, setErrorBody] = useState(null);

  const [maxPages, setMaxPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(indexPage);
  const [loadingPages, setLoadingPages] = useState(true);
  const [errorPages, setErrorPages] = useState(false);
  const [errorBodyPages, setErrorBodyPages] = useState(null);

  const fetchClientProducts = (page, filterValue) => {
    const pageToFetch = page ?? 1;
    const searchFilter = filterValue ?? "";

    setLoading(true);
    setError(false);
    setErrorBody(null);
    setProducts([]);

    const request = isFiltered
      ? getClientProductsByPageFilter(searchFilter, pageToFetch)
      : getClientProductsByPage(pageToFetch);

    request
      .then((result) => {setProducts(result); console.log(result)})
      .catch((err) => {
        setError(true);
        setErrorBody(err.body ?? {
          code: err.code ?? err.status,
          message: err.message,
        });
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const fetchDates = (page, filterValue) => {
    const pageToFetch = page ?? 1;
    const searchFilter = filterValue ?? "";

    setLoadingPages(true);
    setErrorPages(false);
    setErrorBodyPages(null);

    const request = isFiltered
      ? getDatesByProductsFilter(searchFilter, pageToFetch)
      : getDatesByProducts(pageToFetch);

    request
      .then((data) => {
        setMaxPages(data.totalPages);
        setCurrentPage(pageToFetch);
      })
      .catch((err) => {
        setErrorPages(true);
        setErrorBodyPages(err.body ?? {
          code: err.code,
          message: err.message,
        });
        console.error(err);
      })
      .finally(() => setLoadingPages(false));
  };

  const reloadProducts = () => {
    fetchClientProducts(currentPage, filter);
    fetchDates(currentPage, filter);
  };

  const searchProductsByPage = (page) => {
    const pageToFetch = page ?? 1;
    setCurrentPage(pageToFetch);
    fetchClientProducts(pageToFetch, filter);
    fetchDates(pageToFetch, filter);
  };

  useEffect(() => {
    searchProductsByPage(indexPage);
  }, [indexPage, isFiltered, filter]);

  const productsState = { products, loading, error, errorBody, searchProductsByPage, reloadProducts };
  const pagesState = {
    maxPages,
    currentPage,
    loadingPages,
    errorPages,
    errorBodyPages,
    getDatesByProductsPage: fetchDates,
  };

  return { productsState, pagesState };
}

export function useClientProductsState() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorBody, setErrorBody] = useState(null)

  const fetchClientProducts = () => {
    setLoading(true)
    setError(false)
    setErrorBody(null)
    
    getClientProducts()
      .then((products) => setProducts(products))
      .catch((error) => {
        setError(true)
        setErrorBody(error.body ?? {
          code: error.status,
          message: error.message,
        })
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchClientProducts()
  }, [])

  return { products, loading, error, errorBody, reloadProducts: fetchClientProducts }
}

export function useClientProductsByPageState(indexPage = 1){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorBody, setErrorBody] = useState(null)

  const [maxPages, setMaxPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(indexPage)
  const [loadingPages, setLoadingPages] = useState(true)
  const [errorPages, setErrorPages] = useState(false)
  const [errorBodyPages, setErrorBodyPages] = useState(null)

  const fetchClientProductsByPage = (indexPage) => {
    console.log("fetching products by page: " + indexPage)
    setLoading(true)
    setError(false)
    setErrorBody(null)
    setProducts([])
    getClientProductsByPage(indexPage)
      .then((products) => setProducts(products))
      .catch((error) => {setError(true); setErrorBody(error.body ?? {
        code: error.code,
        message: error.message
      })})
      .finally(() => setLoading(false))
  }
  
  const fetchDatesByProductsPage = (indexPage) => {
    console.log("fetching dates by products page: " + indexPage)
    setLoadingPages(true)
    setErrorPages(false)
    setErrorBodyPages(null)
    getDatesByProducts(indexPage).then((data) => {
      setMaxPages(data.totalPages)
      setCurrentPage(indexPage)
    }).catch((e) => {
      setErrorPages(true)
      setErrorBodyPages(e.body ?? {
        code: e.code,
        message: e.message
      })
    }).finally(() => setLoadingPages(false))
  }

  useEffect(() => {
    fetchClientProductsByPage(indexPage)
    fetchDatesByProductsPage(indexPage)
  },[])

  const productsState = {products, loading, error, errorBody, searchProductsByPage: fetchClientProductsByPage}
  const pagesState = {maxPages, currentPage, loadingPages, errorPages, errorBodyPages, getDatesByProductsPage: fetchDatesByProductsPage}

  return {productsState, pagesState}

}

export function useClientProductsByPageStateAndFilter(indexPage = 1, filter = ""){
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorBody, setErrorBody] = useState(null)

  const [maxPages, setMaxPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(indexPage)
  const [loadingPages, setLoadingPages] = useState(true)
  const [errorPages, setErrorPages] = useState(false)
  const [errorBodyPages, setErrorBodyPages] = useState(null)

  const fetchClientProductsByPageAndFilter = (indexPage, filter) => {
    console.log("fetching products by page: " + indexPage + " with filter: " + filter)
    setLoading(true)
    setError(false)
    setErrorBody(null)
    setProducts([])
    getClientProductsByPageFilter(filter, indexPage)
      .then((products) => setProducts(products))
      .catch((e) => {setError(true); setErrorBody(e.body ?? {
        code: e.code,
        message: e.message
      })})
      .finally(() => setLoading(false))

  }

  const fetchDatesByProductsPageAndFilter = (indexPage, filter) => {
    console.log("fetching dates by products page: " + indexPage + " with filter: " + filter)
    setLoadingPages(true)
    setErrorPages(false)
    setErrorBodyPages(null)
    getDatesByProductsFilter(filter, indexPage).then((data) => {
      setMaxPages(data.totalPages)
      setCurrentPage(indexPage)
    }).catch((e) => {
      setErrorPages(true)
      setErrorBodyPages(e.body ?? {
        code: e.code,
        message: e.message
      })
    }).finally(() => setLoadingPages(false))
  }

  useEffect(() => {
    fetchClientProductsByPageAndFilter(indexPage, filter)
    fetchDatesByProductsPageAndFilter(indexPage, filter)
    },[])

  const productsState = {products, loading, error, errorBody, searchProductsByPage: fetchClientProductsByPageAndFilter}
  const pagesState = {maxPages, currentPage, loadingPages, errorPages, errorBodyPages, getDatesByProductsPage: fetchDatesByProductsPageAndFilter}

  return {productsState, pagesState}
}