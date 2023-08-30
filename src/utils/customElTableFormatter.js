
export const phoneFormatter = (value) => {
  return value.replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
}
export const businessNumberFormatter = (value) => {
  return value.replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
}

