import { useState } from 'react'
import { Table } from 'components/Atoms'
import EmptyState from 'components/EmptyState'
import { trpc } from 'lib/trpc'
import {
  PersonAddAltIcon,
  PersonRemoveIcon,
  BlogIcon,
  OutlineRemoveIcon,
} from 'assets/svgs'
import type { TRPCRouteOutputs } from 'pages/api/trpc/[trpc]'
import type { LOG_ENTRY_TYPE } from '@prisma/client'

/* @ ToDo: i18n */

/*
    - loading state (initial tambem)
    - load more button
*/

type LogHistoryProps = {
  guildId: string
}

type LogEntryElement = Record<LOG_ENTRY_TYPE, React.ReactNode>

const LogHistory = ({ guildId }: LogHistoryProps) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [list, setList] = useState<TRPCRouteOutputs['listGuildLog']>([])

  const query = trpc.listGuildLog.useQuery(
    {
      guildId,
      pageIndex,
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: (data) => setList((prev) => [...prev, ...data]),
    },
  )

  return (
    <Table>
      {list.length > 0 ? (
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn />
              <Table.HeadColumn className="text-left">Event</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {list.map(
              ({
                id,
                createdAt,
                type,
                actionGuildMember,
                targetGuildMember,
                metadata,
              }) => (
                <Table.Row key={id}>
                  <Table.Column className="child:w-6 child:h-6 child:align-middle child:opacity-70 w-6 px-3">
                    {
                      (
                        {
                          LEAVE_MEMBER: (
                            <PersonRemoveIcon className="fill-red" />
                          ),
                          REJECT_MEMBER: (
                            <OutlineRemoveIcon className="fill-red" />
                          ),
                          KICK_MEMBER: (
                            <PersonRemoveIcon className="fill-red" />
                          ),
                          ACCEPT_MEMBER: (
                            <PersonAddAltIcon className="fill-greenHighlight" />
                          ),
                          NOTIFICATION: (
                            <BlogIcon className="fill-primaryHighlight" />
                          ),
                        } as LogEntryElement
                      )[type]
                    }
                  </Table.Column>
                  <Table.Column>
                    <div className="grid gap-1 py-0.5">
                      <span>
                        {
                          (
                            {
                              LEAVE_MEMBER: (
                                <>
                                  <strong>{metadata}</strong> left the group
                                </>
                              ),
                              REJECT_MEMBER: (
                                <>
                                  <strong>{actionGuildMember?.name}</strong>{' '}
                                  rejected <strong>{metadata}</strong>{' '}
                                  application
                                </>
                              ),
                              KICK_MEMBER: (
                                <>
                                  <strong>{actionGuildMember?.name}</strong>{' '}
                                  kicked <strong>{metadata}</strong>
                                </>
                              ),
                              ACCEPT_MEMBER: (
                                <>
                                  <strong>{actionGuildMember?.name}</strong>{' '}
                                  approved{' '}
                                  <strong>{targetGuildMember?.name}</strong>{' '}
                                  application
                                </>
                              ),
                              NOTIFICATION: (
                                <>
                                  <strong>{actionGuildMember?.name}</strong>{' '}
                                  sighted a{' '}
                                  <strong className="text-primaryHighlight">
                                    {metadata}
                                  </strong>
                                </>
                              ),
                            } as LogEntryElement
                          )[type]
                        }
                      </span>

                      <span className="text-tsm font-light opacity-60">
                        {new Date(createdAt).toLocaleString('pt-BR', {
                          hour12: false,
                        })}
                      </span>
                    </div>
                  </Table.Column>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table.Element>
      ) : (
        <EmptyState text="No log history" variant="medium" className="my-4" />
      )}
    </Table>
  )
}

export default LogHistory
