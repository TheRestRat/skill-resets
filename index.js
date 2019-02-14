const SHOW_SYSTEM_RESET_MESSAGE = false
const RESET_FONT_COLOR = '#FF0000' // https://www.google.com/search?q=colour+picker
const FLASHING_NOTIFICATION = false

module.exports = function SkillResets(dispatch) {
  let model

  dispatch.hook('S_LOGIN', 10, event => {model = event.templateId})

  const showMessage = message => {
    dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 2, {
      message : message,
      type: FLASHING_NOTIFICATION ? 70 : 2,
      channel: 0,
      chat: 0
    })
  }

  dispatch.hook('S_CREST_MESSAGE', 2, event => {
    if (event.type === 6) {
      showMessage(
        `<img src="img://skill__0__${model}__${event.skill}
        " width="48" height="48" vspace="-20"/><font size="24" color="${RESET_FONT_COLOR}">&nbsp;RESET</font>`
      )
      if (!SHOW_SYSTEM_RESET_MESSAGE) return false
    }
  })
}
