import styled, { css } from 'styled-components'
import MagicSvg from 'assets/svgs/magic.svg'
import CharmSvg from 'assets/svgs/charms.svg'
import BookSvg from 'assets/svgs/book.svg'

const iconStyle = css`
  margin-right: 4px;
  width: 18px;
  height: 18px;
  fill: var(--onSurface);
`

export const TitleWrapper = styled.h5`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
`

export const Icons = {
  Imbuement: styled(MagicSvg)`
    ${iconStyle}
  `,
  Charm: styled(CharmSvg)`
    ${iconStyle}
  `,
  Quest: styled(BookSvg)`
    ${iconStyle}
  `,
}
