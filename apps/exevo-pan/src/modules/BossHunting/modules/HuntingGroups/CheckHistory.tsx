import clsx from 'clsx'
import { useState } from 'react'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { Table, Button } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import { ViewedIcon, ChevronDownIcon } from 'assets/svgs'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'
import { TableIconWrapper } from './components'
import { multipleSpawnLocationBosses } from '../../bossInfo'

type CheckHistoryProps = {
  guildId: string
}

const pageSize = 10

/* @ ToDo: i18n */

const CheckHistory = ({ guildId }: CheckHistoryProps) => {
  const { huntingGroups } = useTranslations()
  const i18n = huntingGroups.LogHistory

  const [pageIndex, setPageIndex] = useState(0)
  const [list, setList] = useState<TRPCRouteOutputs['listGuildChecks']>([])
  const [{ initiallyFetched, exhausted }, setQueryStatus] = useState({
    initiallyFetched: false,
    exhausted: false,
  })

  const query = trpc.listGuildChecks.useQuery(
    {
      guildId,
      pageIndex,
      pageSize,
    },
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        const queryExhausted = data.length === 0 || data.length < pageSize
        setQueryStatus({ initiallyFetched: true, exhausted: queryExhausted })
        setList((prev) => [...prev, ...data])
      },
    },
  )

  const isLoading = query.isFetching

  return (
    <Table>
      {list.length > 0 && (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn />
              <Table.HeadColumn className="text-left">
                {i18n.event}
              </Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {list.map(({ id, checkedAt, boss, location, member }) => (
              <Table.Row
                key={id}
                className={clsx(
                  !!query.data?.find(
                    (lastFetchedItem) => lastFetchedItem.id === id,
                  ) && 'animate-fadeIn',
                )}
              >
                <Table.Column className="w-6 px-3">
                  <TableIconWrapper>
                    <ViewedIcon className="fill-primaryHighlight" />
                  </TableIconWrapper>
                </Table.Column>
                <Table.Column>
                  <div className="grid gap-1 py-0.5">
                    <span className="leading-tight">
                      <strong>{member.name}</strong> checked{' '}
                      <strong className="text-primaryHighlight">
                        {multipleSpawnLocationBosses.displayName({
                          name: boss,
                          location,
                        })}
                      </strong>
                    </span>

                    {/* @ ToDo: abstract into a component */}
                    <span className="text-tsm font-light opacity-60">
                      {checkedAt.toLocaleString('pt-BR', {
                        hour12: false,
                      })}
                    </span>
                  </div>
                </Table.Column>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Element>
      )}

      {initiallyFetched && list.length === 0 && (
        <EmptyState text={i18n.emptyState} variant="medium" className="my-4" />
      )}

      {/* @ ToDo: abstract into a component */}
      {!exhausted && (
        <Button
          hollow
          pill
          className="mx-auto"
          disabled={isLoading}
          onClick={() => setPageIndex((prev) => prev + 1)}
        >
          {isLoading ? (
            <div
              role="alert"
              className="loading-spinner fill-onPrimary h-6 w-6"
            />
          ) : (
            <>
              <ChevronDownIcon className="h-6 w-6" />
              {i18n.loadMore}
            </>
          )}
        </Button>
      )}
    </Table>
  )
}

export default CheckHistory
