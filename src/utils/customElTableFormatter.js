
export const phoneFormatter = (value) => {
  return value.replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
}
export const businessNumberFormatter = (value) => {
  return value.replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
}

export const numberFormatter = (value) => {
  const number = value.replace(/[^0-9]/g, '')
  return number.length === 0 ? '0' : Number(number).toString()
}

export const moneyFormatter = (amount, decimalCount = 0, decimal = '.', thousands = ',') => {
  try {
    amount = `${amount}`.replace(/[^0-9-]/g, '')
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
  }
}

export const startDatePostFix = (value) => value + ' 00:00:01'
export const endDatePostFix = (value) => value + ' 23:59:59'
