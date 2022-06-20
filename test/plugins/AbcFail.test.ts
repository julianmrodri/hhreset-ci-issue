import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import hre, { ethers } from 'hardhat'
import { ZERO_ADDRESS } from '../common/constants'

describe('Test Breaks with Reset', () => {
  let owner: SignerWithAddress

  before('Reset HH Network', async () => {
    // Reset network for clean execution
    await hre.network.provider.send('hardhat_reset')
  })

  beforeEach(async () => {
    ;[owner] = await ethers.getSigners()
  })

  describe('Test', () => {
    it('Cannot reach in CI due to failure in reset', async () => {
      // Check owner address
      expect(owner.address).to.not.equal(ZERO_ADDRESS)
    })
  })
})
