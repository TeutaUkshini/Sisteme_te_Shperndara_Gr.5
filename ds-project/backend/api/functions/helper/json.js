'use strict'

const serializeJson = obj => {
  const json = JSON.stringify(obj)
  return json
}

const deserializeJson = json => {
  return JSON.parse(json)
}

module.exports = {
  serializeJson,
  deserializeJson
}
