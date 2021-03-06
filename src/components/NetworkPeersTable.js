import React from 'react'
import { translate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { Table, Column, Cell } from 'fixed-data-table'
import { tableHeight } from '../utilities/common'

/** Required components. */
import TableCell from './TableCell'

/** Load translation namespaces and delay rendering until they are loaded. */
@translate(['wallet'], { wait: true })

/** Make the component reactive and inject MobX stores. */
@inject('network') @observer

class NetworkPeersTable extends React.Component {
  constructor (props) {
    super(props)
    this.t = props.t
    this.network = props.network
  }

  render () {
    const { peers } = this.network

    return (
      <Table
        rowsCount={peers.length}
        rowHeight={25}
        headerHeight={25}
        width={892}
        height={tableHeight(peers.length, 227)}
      >
        <Column
          header={<Cell>{this.t('wallet:peers')}</Cell>}
          cell={<TableCell data={peers} column='addr' />}
          width={170}
        />
        <Column
          header={<Cell>{this.t('wallet:country')}</Cell>}
          cell={<TableCell data={peers} column='country' />}
          width={170}
        />
        <Column
          header={<Cell>{this.t('wallet:version')}</Cell>}
          cell={<TableCell data={peers} column='version' />}
          width={112}
        />
        <Column
          header={<Cell>{this.t('wallet:os')}</Cell>}
          cell={<TableCell data={peers} column='os' />}
          width={100}
        />
        <Column
          header={<Cell>{this.t('wallet:connected')}</Cell>}
          cell={<TableCell data={peers} column='conntime' />}
          width={150}
        />
        <Column
          header={<Cell>{this.t('wallet:startingHeight')}</Cell>}
          cell={<TableCell data={peers} column='startingheight' />}
          width={110}
        />
        <Column
          header={<Cell>{this.t('wallet:banScore')}</Cell>}
          cell={<TableCell data={peers} column='banscore' />}
          width={80}
        />
      </Table>
    )
  }
}

export default NetworkPeersTable
