import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import { InfoTooltip, ClientComponent } from 'components/Organisms'
import { loadBossSrc } from 'utils'
import PinIcon from 'assets/svgs/pin.svg'
import useTimeAgo from './useTimeAgo'
import { BossCardProps } from './types'

const BossCard = ({ bossStats, pinned, onPìn }: BossCardProps) => {
  const { name, currentChance, lastAppearences } = bossStats
  const [lastSeen] = lastAppearences.slice(-1)

  const lastSeenText = useTimeAgo(lastSeen)

  return (
    <li className="card flex items-center gap-2">
      <SpritePortrait
        src={loadBossSrc(name)}
        alt={name}
        offset
        width={64}
        height={64}
      />
      <div className="grid gap-1.5">
        <div className="flex items-center gap-1.5">
          <h4 className="text-base">{name}</h4>
          {lastSeenText && <InfoTooltip content={lastSeenText} labelSize />}
        </div>

        <small title="Chance to spawn" className="text-tsm">
          {currentChance ? `${(currentChance * 100).toFixed(2)}%` : 'Unknown'}
        </small>
      </div>

      <button
        type="button"
        className="clickable ml-auto grid place-items-center self-start rounded p-1"
        onClick={() => onPìn(name)}
      >
        <ClientComponent>
          <PinIcon
            className={clsx(
              'h-4 w-4 transition-all',
              pinned ? 'fill-primaryHighlight' : 'fill-separator',
            )}
            style={{ rotate: pinned ? 'unset' : '45deg' }}
          />
        </ClientComponent>
      </button>
    </li>
  )
}

export default BossCard
