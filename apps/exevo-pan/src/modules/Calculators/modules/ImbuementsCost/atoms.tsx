import { Input as BaseInput } from 'components/Atoms'
import { numberWithCommaSeparator } from 'utils'
import { InputProps } from 'components/Atoms/Input/types'

export const LabelWrapper = (args: JSX.IntrinsicElements['div']) => (
  <div className="flex items-center gap-1" {...args} />
)

export const Input = (args: Omit<InputProps, 'ref'>) => (
  <BaseInput
    inputMode="numeric"
    noAlert
    mask={numberWithCommaSeparator}
    {...args}
  />
)
