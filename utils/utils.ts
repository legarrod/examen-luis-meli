export const transformNumber = (number: number | undefined = 0) => {
  const options = { style: 'decimal', useGrouping: true }
  const formattedNumber = new Intl.NumberFormat('es-AR', options).format(number)
  return formattedNumber
}

export const replaceLink = (url: string) => {
  let urlAmigable = url?.replace(/ /g, '-')
  urlAmigable = urlAmigable?.replace('/', '-')
  urlAmigable = urlAmigable?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  return urlAmigable
}

export const formtaOriginalText = (url: string) => {
  const urlFormated = decodeURIComponent(url)
  const words = urlFormated.toLowerCase().split(' ')
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1)
    }
  }
  return words.join(' ')
}

export const getProductCode = (url?: string | undefined) => {
  const urlParam = url ?? ''
  return urlParam.split('-').pop()
}
