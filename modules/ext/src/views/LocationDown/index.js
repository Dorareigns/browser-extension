import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import AccountOverlay from 'components/AccountOverlay'
import { actions } from 'state'

export default () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goBack = useCallback(() => dispatch(actions.view.back()), [])

  return <AccountOverlay status="locationDown" close={goBack} />
}
