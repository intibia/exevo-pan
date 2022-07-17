import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { ButtonProps } from './types'

const Button = ({
  className,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const isDisabled = loading || disabled

  return (
    <button
      className={clsx(
        'button-component hover:highlight-10 cursor-pointer shadow-md transition-all hover:shadow-lg active:shadow-inner',
        disabled &&
          !loading &&
          'bg-separator cursor-default text-black opacity-60 shadow-none',
        isDisabled ? 'pointer-events-none text-black' : 'text-onPrimary',
        className,
      )}
      {...props}
      type="button"
      disabled={isDisabled}
    >
      {loading ? (
        <div
          className="loading-spinner before:bg-primaryVariant after:bg-primary mx-auto"
          style={{
            background:
              'linear-gradient(to right, rgb(var(--primaryVariant)) 10%, rgba(255, 255, 255, 0) 42%)',
          }}
          role="alert"
          aria-label={common.LoadingLabel}
        />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
