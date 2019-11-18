<template>
  <div class="timer">
    <h2 class="title">{{title}}</h2>

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
        @click="resetTimer">
          <i class="fas fa-undo"></i>
      </button>
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
      inFocusTime: true
    }
  },

  beforeMount () {
    this.totalTime = this.focusTime * 60
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
      const time = this.inFocusTime ? this.shortBreak : this.focusTime
      this.inFocusTime = !this.inFocusTime
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
  }
}
</script>

<style lang="scss">
  $timer-padding: 80px;
  $bg-primary: #209cee;

  .timer {
    background-color: $bg-primary;
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
      background-color: $bg-primary;
      border: none;
      color: white;
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
