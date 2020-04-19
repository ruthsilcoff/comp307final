import store from './store/index'

let ws

export function initWebSocket() {
  ws = new WebSocket('ws://127.0.0.1:8707')

  ws.onopen = () => {
    console.log('WebSocket opened')
    store.dispatch('subscribeToWS')
  }

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data)
    console.log('WebSocket message received: ', data)

    switch (data.type) {
      case 'DirectMessage':
        store.dispatch('pushNewMessage', data.payload)
        break
      default:
        console.error('WS message not handled')
    }
  }

  ws.onclose = () => {
    console.error('WS connection lost. Attempting to reconnect')
    setTimeout(() => initWebSocket(), 1000)
  }
}

export function sendToWS(type, payload) {
  if (ws.readyState === 0) {
    setTimeout(() => sendToWS(type, payload), 100)
    return
  }
  const data = {type, payload}
  console.log('WS sending: ', data)
  ws.send(JSON.stringify(data))
}
