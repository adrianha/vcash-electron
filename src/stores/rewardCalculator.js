import { action, autorun, computed, observable } from 'mobx'
import { calculateIncentive, calculatePoW } from '../utilities/blockRewards'
import i18next from '../utilities/i18next'

/** Required store instances. */
import rpc from './rpc'
import wallet from './wallet'

class RewardCalculator {
  /**
   * Observable properties.
   * @property {string} block - Block number.
   * @property {number} blocktime - getblock.result.time RPC response.
   */
  @observable block = ''
  @observable blocktime = 0

  constructor () {
    /** Auto check if block exists and retrieve block time. */
    autorun(() => {
      rpc.call([
        {
          method: 'getblockhash',
          params: [this.blockInt]
        }
      ], (response) => {
        if (response !== null) {
          /** If block exists, get blocktime. */
          if (response[0].hasOwnProperty('result') === true) {
            rpc.call([
              {
                method: 'getblock',
                params: [response[0].result]
              }
            ], (response) => {
              if (response !== null) {
                return this.setBlocktime(response[0].result.time * 1000)
              }
            })
          }

          /** Clear previous blocktime. */
          if (this.blocktime !== 0) this.setBlocktime()
        }
      })
    })
  }

  /**
   * Get block string converted to number.
   * @function blockInt
   * @return {number} Block.
   */
  @computed get blockInt () {
    return this.block === ''
      ? 0
      : parseInt(this.block)
  }

  /**
   * Get data for the next 100k rewards in 2.5k increments.
   * @function chartData
   * @return {array} Chart data.
   */
  @computed get chartData () {
    let data = []

    for (let i = this.blockInt; i <= this.blockInt + 100000; i += 2500) {
      const incentivePercent = calculateIncentive(i)
      const powReward = calculatePoW(i)
      const incentiveReward = (powReward / 100) * incentivePercent
      const miningReward = powReward - incentiveReward

      data.push({
        block: i,
        [i18next.t('wallet:incentiveReward')]: Math.round(incentiveReward * 1e6) / 1e6,
        [i18next.t('wallet:miningReward')]: Math.round(miningReward * 1e6) / 1e6,
        [i18next.t('wallet:powReward')]: Math.round(powReward * 1e6) / 1e6
      })
    }

    return data
  }

  /**
   * Get block PoW reward.
   * @function powReward
   * @return {number} PoW reward.
   */
  @computed get powReward () {
    return calculatePoW(this.block)
  }

  /**
   * Get block incentive percentage.
   * @function incentivePercent
   * @return {number} Incentive percentage.
   */
  @computed get incentivePercent () {
    return calculateIncentive(this.block)
  }

  /**
   * Get block incentive reward.
   * @function incentiveReward
   * @return {number} Incentive reward.
   */
  @computed get incentiveReward () {
    return (this.powReward / 100) * this.incentivePercent
  }

  /**
   * Check if datetime is exact or an estimation.
   * @function estimation
   * @return {boolean} Estimated.
   */
  @computed get estimation () {
    if (this.blocktime === 0) return true
    return false
  }

  /**
   * Get block time or an approximate estimation.
   * @function time
   * @return {number} Blocktime.
   */
  @computed get time () {
    if (this.blocktime !== 0) return this.blocktime

    /** Return an approximation. */
    return new Date().getTime() +
      (1000 * 140 * (this.blockInt - wallet.info.blocks))
  }

  /**
   * Set block.
   * @function setBlock
   * @param {number} block - Block number.
   */
  @action setBlock (block = '') {
    if (block.toString().match(/^[0-9]{0,7}$/) !== null) {
      this.block = block
    }
  }

  /**
   * Set RPC response block time.
   * @function setBlocktime
   * @param {number} blocktime - Blocktime.
   */
  @action setBlocktime (blocktime = 0) {
    this.blocktime = blocktime
  }
}

/** Initialize a new globally used store. */
const rewardCalculator = new RewardCalculator()

/**
 * Export initialized store as default export,
 * and store class as named export.
 */
export default rewardCalculator
export { RewardCalculator }
