<template>
  <section class="timer">
    <h1 class="title">{{title}}</h1>

    <div id="countdown">
      <div id="minutes">{{minutes}}</div>
      <div id="separator">:</div>
      <div id="seconds">{{seconds}}</div>
    </div>

    <div id="buttons">
      <v-btn icon round dark v-if="!timer"
        @click="startTimer" x-large>
        <v-icon>mdi-play</v-icon>
      </v-btn>

      <v-btn icon round dark v-if="timer"
        @click="stopTimer" x-large>
        <v-icon>mdi-pause</v-icon>
      </v-btn>

      <v-btn icon round dark  v-if="resetButton"
        @click="resetCurrentTime" x-large>
        <v-icon>mdi-undo</v-icon>
      </v-btn>

      <v-btn icon round dark @click="forwardTimer" x-large>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      timer: null,
      totalTime: 0,
      resetButton: false,
      title: 'Time to focus!',
      inFocusTime: true,
      inBreakTime: false,
      inLongBreakTime: false,
      focusTimeCount: 1,
      breakTimeCount: 0,
      LongBreakTimeCount: 0,
      sound: new Audio(require('../assets/bip_countdown.mp3'))
    }
  },
  beforeMount () {
    this.totalTime = this.focusTime * 60
    // if (this.autoStart) { this.startTimer() }
  },

  mounted () {
    // this.$store.dispatch('setDrawer', true)
  },

  methods: {
    startTimer () {
      this.timer = setInterval(() => this.countdown(), 1000)
      this.resetButton = true
    },
    stopTimer () {
      clearInterval(this.timer) // this feature can be activated by user on settings screen
      this.timer = null
      this.resetButton = true
    },
    resetTimer () {
      let time = 0
      // Define next timer
      if (this.inLongBreakTime) {
        time = this.focusTime
        this.inFocusTime = true
        this.inLongBreakTime = false
        this.inBreakTime = false
      } else if (this.inFocusTime) {
        if (this.focusTimeCount > 0 && this.focusTimeCount % 4 === 0) {
          time = this.longBreak
          this.inFocusTime = false
          this.inLongBreakTime = true
          this.inBreakTime = false
        } else {
          time = this.shortBreak
          this.inFocusTime = false
          this.inLongBreakTime = false
          this.inBreakTime = true
        }
      } else {
        time = this.focusTime
        this.inFocusTime = true
        this.inLongBreakTime = false
        this.inBreakTime = false
      }

      this.totalTime = (time * 60)
      clearInterval(this.timer)
      this.timer = null
      this.resetButton = false
      if (this.autoStart) {
        this.startTimer()
      }
    },

    async playSound () {
      this.sound.play()
    },

    padTime (time) {
      return (time < 10 ? '0' : '') + time
    },
    countdown () {
      if (this.totalTime >= 1) {
        this.totalTime--
        if ((this.minutes < 1) && this.seconds <= 5) {
          this.playSound()
        }
      } else {
        this.totalTime = 0
        this.resetTimer()
      }
    },
    forwardTimer () {
      this.resetTimer()
    },
    resetCurrentTime () {
      this.totalTime = this.getCurrentTimer() * 60
    },
    getCurrentTimer () {
      if (this.inFocusTime) { return this.focusTime }
      if (this.inBreakTime) { return this.shortBreak }
      if (this.inLongBreakTime) { return this.longBreak }
    },
    ...mapActions({
      'setTimerState': 'timer/setCurrentState'
    })
  },

  computed: {
    ...mapGetters({
      focusTime: 'timer/focusTime',
      shortBreak: 'timer/shortBreak',
      longBreak: 'timer/longBreak',
      autoStart: 'timer/autoStart'
    }),
    minutes () {
      const minutes = Math.floor(this.totalTime / 60)
      return this.padTime(minutes)
    },
    seconds () {
      const seconds = this.totalTime - (this.minutes * 60)
      return this.padTime(seconds)
    }
  },

  watch: {
    inFocusTime (val) {
      if (val === false) { return }
      this.title = 'Time to focus!'
      this.setTimerState('focus')
      this.focusTimeCount += 1
    },
    inBreakTime (val) {
      if (val === false) { return }
      this.title = 'A little break to breath!'
      this.setTimerState('short-break')
      this.breakTimeCount += 1
    },
    inLongBreakTime (val) {
      if (val === false) { return }
      this.title = 'Lets have a long break'
      this.setTimerState('long-break')
      this.longBreakTimeCount += 1
    }
  }
}
</script>

<style lang="scss">
  $timer-padding: 80px;

  .timer {
    color: #fff;
    height: calc(100vh - 80px * 2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: $timer-padding 0;

    #countdown {
      font-size: 18em;
      display: flex;
      justify-content: center;
      color: #FFF;
    }
  }
</style>
