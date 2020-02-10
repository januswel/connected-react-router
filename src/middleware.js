import { CALL_HISTORY_METHOD, RESET_HISTORIES } from './actions'

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
const routerMiddleware = (history) => store => next => action => { // eslint-disable-line no-unused-vars
  if (![CALL_HISTORY_METHOD, RESET_HISTORIES].includes(action.type)) {
    return next(action)
  }

  if (action.type === RESET_HISTORIES) {
    history.entries = []
    history.index = -1
  }

  const { payload: { method, args } } = action
  history[method](...args)
}


export default routerMiddleware
