const CHANGE_TOOLTIP = 'CHANGE_TOOLTIP'

export const changeTooltip = index => ({type: CHANGE_TOOLTIP, index})

const initialState = 0

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TOOLTIP:
      return action.index
    default:
      return state
  }
}
