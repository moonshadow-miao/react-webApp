import * as actions from '../actionsType'

export function loading() {
  return { type:actions.OPEN_LOADING }
}

export function loaded() {
  return  { type:actions.CLOSE_LOADING}

}
