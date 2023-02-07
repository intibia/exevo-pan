import { memo } from 'react'
import { SubHeader, Main } from 'templates'
import { useRoutes } from '../routes'

type ComponentProps = {
  children: React.ReactNode
}

const Template = ({ children }: ComponentProps) => {
  const routes = useRoutes()

  return (
    <Main>
      <SubHeader navItems={routes} />
      <>{children}</>
    </Main>
  )
}

export default memo(Template)
