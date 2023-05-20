export const getDefaultProducts = () => {
  return fetch('https://api.mercadolibre.com/sites/MLA/search?q=:query')
    .then(res => res.json())
}
