export const transformNUmber = (number: number) => {
  const options = { style: 'decimal', useGrouping: true }
  const formattedNumber = new Intl.NumberFormat('es-AR', options).format(number)
  return formattedNumber
}
