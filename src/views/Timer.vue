<template>
  <div class="timer" :style="styleTimerBackground">
    <h1 class="title">{{title}}</h1>

    <div id="countdown">
      <div id="minutes">{{minutes}}</div>
      <div id="separator">:</div>
      <div id="seconds">{{seconds}}</div>
    </div>

    <div id="buttons">

      <button
        id="start"
        class="button"
        v-if="!timer"
        @click="startTimer">
          <i class="far fa-play-circle"></i>
      </button>

      <button
        id="stop"
        class="button"
        v-if="timer"
        @click="stopTimer">
          <i class="far fa-pause-circle"></i>
      </button>

      <button
        id="reset"
        class="button"
        v-if="resetButton"
        @click="resetCurrentTime">
          <i class="fas fa-undo"></i>
      </button>

      <button
        id="forward"
        class="button"
        @click="forwardTimer">
        <i class="fas fa-forward"></i>
      </button>
    </div>

    <div>
      <label> FocusTimerCount: {{focusTimeCount}}</label>
      <label> BreakTimerCount: {{breakTimeCount}}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      timer: null,
      totalTime: 0,
      resetButton: false,
      title: 'Let the countdown begin!!',
      inFocusTime: true,
      inBreakTime: false,
      inLongBreakTime: false,
      focusTimeCount: 1,
      breakTimeCount: 0,
      LongBreakTimeCount: 0,
      styleTimerBackground: 'background-color: #209cee'
    }
  },

  beforeMount () {
    this.totalTime = this.focusTime * 60
    if (this.autoStart) { this.startTimer() }
  },

  methods: {
    startTimer () {
      this.timer = setInterval(() => this.countdown(), 1000)
      this.resetButton = true
    },
    stopTimer () {
      clearInterval(this.timer)
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
        time = this.shortBreak
        this.inFocusTime = false
        this.inLongBreakTime = false
        this.inBreakTime = true
      } else {
        if (this.breakTimeCount > 0 && this.breakTimeCount % 2 === 0) {
          time = this.longBreak
          this.inFocusTime = false
          this.inLongBreakTime = true
          this.inBreakTime = false
        } else {
          time = this.focusTime
          this.inFocusTime = true
          this.inLongBreakTime = false
          this.inBreakTime = false
        }
      }

      this.totalTime = (time * 60)
      clearInterval(this.timer)
      this.timer = null
      this.resetButton = false
      if (this.autoStart) {
        this.startTimer()
      }
    },
    padTime (time) {
      return (time < 10 ? '0' : '') + time
    },
    countdown () {
      if (this.totalTime >= 1) {
        this.totalTime--
      } else {
        this.totalTime = 0
        this.resetTimer()
      }
    },
    forwardTimer () {
      this.totalTime = 0
    },
    resetCurrentTime () {
      this.totalTime = this.getCurrentTimer() * 60
    },
    getCurrentTimer () {
      if (this.inFocusTime) { return this.focusTime }
      if (this.inBreakTime) { return this.shortBreak }
      if (this.inLongBreakTime) { return this.longBreak }
    }
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
      this.styleTimerBackground = 'background-color: #209cee'
      this.focusTimeCount += 1
    },
    inBreakTime (val) {
      if (val === false) { return }
      this.title = 'A little break to breath!'
      this.styleTimerBackground = 'background-color: #fd0000'
      this.breakTimeCount += 1
    },
    inLongBreakTime (val) {
      if (val === false) { return }
      this.title = 'Lets have a long break'
      this.styleTimerBackground = 'background-color: #8b0000'
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

    .button {
      border: none;
      padding: 0;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 3em;
      margin: 4px 5px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
</style>
