/* global store, actions, sleep */
const chai = require('chai')
chai.use(require('chai-interface'))
const expect = chai.expect
const { adminApi, BILLING_PLANS } = require('./index')

module.exports = {
  name: 'downgrade a test user',
  target: 'chrome',
  it: 'should downgrade test user to free',
  before: async () => {
    try {
      await adminApi.users.put({
        userId: global.TEST_USER_ID,
        billingPlan: BILLING_PLANS.FIFTY_MEG,
      })
    } catch (e) {
      console.error(e)
      console.error(e.data.validationFailuresArray)
      throw e
    }
  },
  eval: async () => {
    await sleep(1000)
    store.dispatch(actions.session.get())
    await sleep(3000)
    const { session } = store.getState()
    return [session]
  },
  assert: ([response]) => {
    expect(response.billing_plan_id).to.equal(-7)
  },
}
