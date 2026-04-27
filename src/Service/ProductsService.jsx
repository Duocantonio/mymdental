const mainURL = "http://localhost:8080/MyMDentalCommerce/products"
const extensionURL = "/clientProducts"
const otherExtendionURL = "/clientProducts/page/"

export const getClientProducts = async () => {
  const response = await fetch(mainURL + extensionURL)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error("Error en la petición de productos")
    error.status = response.status
    error.body = data
    throw error
  }

  return data
}

export const getClientProductsByPage = async (pageIndex) => {
  const response = await fetch(mainURL + otherExtendionURL + pageIndex)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error("Error en la petición de productos")
    error.status = response.status
    error.body = data
    throw error
  }

  return data
}

export const getDatesByProducts = async () => {
  const response = await fetch(mainURL + "/getMaxProductPages")
  const data = await response.json().catch(() => null)

  if (!response.ok){
    const error = new Error("Error en la petición del número máximo de páginas de productos")
    error.status = response.status
    error.body = data
    throw error
  }
  return data
}

export const getClientProductsByPageFilter = async (departmentName, pageIndex) => {
  console.log(mainURL + "/filterClientProductsByPage/" + departmentName + "/" + pageIndex)
  const response = await fetch(mainURL + "/filterClientProductsByPage/" + departmentName + "/" + pageIndex)
  const data = await response.json().catch(() => null)

  if (!response.ok){
    const error = new Error("Error en la petición del número máximo de páginas de productos")
    error.status = response.status
    error.body = data
    throw error
  }
  return data
}  

export const getDatesByProductsFilter = async (departmentName) => {
  const response = await fetch(mainURL + "/getMaxProductPagesByDepartment/" + departmentName)
  const data = await response.json().catch(() => null)

  if (!response.ok){
    const error = new Error("Error en la petición del número máximo de páginas de productos")
    error.status = response.status
    error.body = data
    throw error
  }
  return data


}
