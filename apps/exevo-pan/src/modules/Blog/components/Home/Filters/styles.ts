import styled, { css } from 'styled-components'
import { Switch as BaseSwitch, Input as BaseInput } from 'components/Atoms'

export const Wrapper = styled.aside`
  position: sticky;
  top: 120px;

  display: grid;
  gap: 16px;
`

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 400;
`

export const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 300;
`

export const GroupWrapper = styled.div`
  display: grid;
  gap: 8px;
`

const labelStyle = css`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.2px;
`

export const Switch = styled(BaseSwitch)`
  ${labelStyle}
`

export const Label = styled.label`
  display: block;
  ${labelStyle}
`

export const Input = styled(BaseInput)`
  [role='alert'] {
    display: none;
  }
`

export const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`
