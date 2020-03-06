<template>
  <v-container>
    <div>
      <v-btn @click="start('A')">
        Start A
      </v-btn>
      <v-btn @click="start('B')">
        Start B
      </v-btn>
      <v-btn @click="call()">
        Call other
      </v-btn>
      <v-btn @click="answer" :color="incomingCall && !remoteStream ? 'warning' : ''">
        Answer other
      </v-btn>
    </div>
    <video autoplay playsinline :srcObject.prop="localStream"></video>
    <video autoplay playsinline :srcObject.prop="remoteStream"></video>
  </v-container>
</template>

<script>
  import Peer from "peerjs"

  const CALL_OPTIONS = {video: true}

  export default {
    name: 'Video',
    data: () => ({
      name: null,
      peer: null,
      localStream: null,
      remoteStream: null,
      incomingCall: null,
    }),
    methods: {
      start(name) {
        console.log(`starting ${name}`)
        this.name = name
        this.peer = new Peer(name, {host: 'localhost', port: 9000, path: '/peer'})
        this.peer.on('call', (call) => {
          console.log('received call')
          this.incomingCall = call
        })
        navigator.mediaDevices
          .getUserMedia(CALL_OPTIONS)
          .then((stream) => {
            this.localStream = stream
          })
      },
      call() {
        const personToCall = this.name == 'A' ? 'B' : 'A'
        console.log(`calling ${personToCall}`)
        const call = this.peer.call(personToCall, this.localStream)
        call.on('stream', (stream) => this.remoteStream = stream)
      },
      answer() {
        console.log('answering')
        this.incomingCall.answer(this.localStream)
        this.incomingCall.on('stream', (stream) => this.remoteStream = stream)
      }
    },
  }
</script>
