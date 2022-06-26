import { HasNextValueArgs } from './types'

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const isNumber = (value: string) => numbers.includes(value)

export const hasNextValue = ({ min, max, buffer }: HasNextValueArgs) => {
  if (buffer.length === max.toString().length) return false

  let i = 0
  while (i < numbers.length) {
    const nextPossibleValue = +(buffer + numbers[i])
    if (nextPossibleValue >= min && nextPossibleValue <= max) return true
    i += 1
  }

  return false
}
