<template>
  <div class="timer" :style="styleTimerBackground">
    <div id = "intro" style = "text-align:center; position:absolute; top:-10px; left:10px;">
      <h3>{{ time_now }}</h3>
      <h3 style="position:relative; bottom:15px;">{{ date_now }}</h3>
    </div>
    <div align='end'>
      <button
        id="forward"
        class="button"
        @click="settingTimer"
        style="font-size:24px;">
        <i class="fas fa-cog"></i>
      </button>
    </div>
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
      <!-- this feature can be activated by user on settings screen -->
      <!-- <button
        id="stop"
        class="button"
        v-if="timer"
        @click="stopTimer">
          <i class="far fa-pause-circle"></i>
      </button> -->

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
import Swal from 'sweetalert2'
window.Swal = Swal

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
      styleTimerBackground: 'background-color: #209cee',
      time_now: '',
      date_now: ''
    }
  },
  created () {
    setInterval(this.getNow, 1000)
  },
  beforeMount () {
    this.totalTime = this.focusTime * 60
  },

  methods: {
    startTimer () {
      this.timer = setInterval(() => this.countdown(), 1000)
      this.resetButton = true
    },
    getNow: function () {
      // get the time and date now
      const today = new Date()
      const hours = today.getHours()
      const minutes = today.getMinutes()
      const seconds = today.getSeconds()
      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
      const time = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      this.date_now = date
      this.time_now = time
    },
    stopTimer () {
      // clearInterval(this.timer) // this feature can be activated by user on settings screen
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
    settingTimer (newFocusTime, newShortBreak, newLongBreak) {
      // add the config screen
      const formValues = Swal.fire({
        title: '<strong style="color:#9e9e9e; font-family:arial;">Settings<strong>',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUhISH///8AAAAeHh4PDw/ExMSLi4sSEhIqKiqAgIAWFhZpaWmkpKQHBwf09PQbGxvq6upDQ0PLy8s3Nzc8PDy4uLiWlpYlJSViYmLr6+uurq74+PjV1dVRUVHk5OQyMjKEhIRLS0ufn5/a2tpXV1djY2N3d3fFxcWRkZFnEeSHAAAEfUlEQVR4nO3be3+qIBwG8ALLxkKyy7qZdvG03v8rPPzQShM8Z8ua7fN8/9oGQx5NFNg6HQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgNfCvVfBvxkwPPVfwyn8XkTx3n0V7wIJnQl7x7e2O/buSjhkftux4X0J5bd+9ZkkErohYUsgYQ0kbAkkrIGELYGENawJuc9sZGGCpqw1mCq0oqS9Dslb4p69uJKl4YTC20ZBVbRPLhXZZhVXa8SzDbucBRYOD5ZWyHrcMdWE6I+XtmZSdjPbbTahtxu5pmh9ZmpwNnPVmJ37xvZ1c70/1FuZLl3lPU+V+tRoQrExxyie1OVIM70ZUkQuI/p6VLHWPz1kJyE7B8tqHdNURNfQN5PvwN5MLEpXsdGETEcJ3pJ5gaApmpjO8ok2Tda6p4GozOIGW12woogefTVMqlUMQXc0V7pKtFHV4vl2TR+GRyX037rddUfyEirgin2YS8QHumv6TqksDHHOUl2U6AIWdLtHpurWjqjTYyYsVbic5s08JCHTn8A3x+OD6Rt0zv1tfqFsNXRP+l5HpdT7+iNL3Vii7GV0LvfFTjSZ0BvdnL7KceQqHylszaXm8+WdTNA6PFmf79kqpceCXrGwyYRi2V27DuzpU/vm0yASOk6+CrOEuuLRrz0wn9RcZjW9KWwyoYz/J+EOCZEQCZHw/yFhCRI6EnJRcH6Z+E0Jub8oSFj2rvObErLyLDA4mZWAdiaUe+r4lxPeTm8PNDtsZ0I2pjfSryZU6fBqFeWz5FYmlPqNP2CdL480Sl4xttPT2w/ZooSFRbU/1Dfv6wnLPD3BWvrtSah2s1Vmdsg/X/c+D2mOHarWJJSldbfI5w0kNDPo9iTsXfPFW7NUeG9CWiN4b0/CbGk0TtNFOsmf1b8soQ7Up4XPyXXh7EEJVaHJJz8t2EJHXL9ffviQhEpsptduPPt56E1puPm4rNffuRJlS8gHcb6gnjXz7Ce+Yp+0lyCzWJQwdSXcZQn7NauJtoTZJsCl1ee/03CzkH9IzGWhxdAP12vPySzl0nqncxixJhxTwuM5w0+8tbEj3Yw7KqHrFAjr4YSn5xEblb1tTxwX0ZaQ1tG76/l5MPuR91I5DXQntlREJzwObTub0zjvGc1CgkV5U7UuYYdtD+PwEuFn3rzFPMp3llRCYaNZhdl0M3sRXMS0//a5mlcj2p8WXnED+bEJR665hZk2meMIcz2tgl02hKokNt+fqh/Va8LoR574Osanc36oh8gJXRTF9tZ94uVeXgYL1j/oucii2i2x6AYJ74jIFj/nHcpjcaM7pH7obklOzvth0puEFROveN95bD5NbG2JZK5oP3LiXo3ThaX0ze7jOx512ZGvCbiquL3neHUXtdhK3f7pzW/i72lqIGFLIGENJGwJJKyBhC2BhDWy/+zibXfvf3aJQduJ+xK+CCR0UOm49xrGrhXMf0Z0/0F9y3wzIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADzMX168mCBPBiPYAAAAAElFTkSuQmCC',
        imageWidth: 100,
        imageHeight: 80,
        html:
          '<div><label style="color:#9c9c9c; font-family:arial; font-size:14px;">Focus Time value </label><input style="height:30px; font-size:16px; width:70px; margin-bottom:-1px;" placeholder="25 min" id="swal-input1" name="focustime" type="number" class="swal2-input"></div>' +
          '<div><label style="color:#9c9c9c; font-family:arial; font-size:14px;">Break Time value </label><input style="height:30px; font-size:16px; width:70px; margin-bottom:-1px;" placeholder="5 min" id="swal-input2" name="breaktime" type="number" class="swal2-input"></div>' +
          '<div><label style="color:#9c9c9c; font-family:arial; font-size:14px;">Long Break Time value </label><input style="height:30px; font-size:16px; width:70px; margin-bottom:-1px;" placeholder="30 min" id="swal-input3" name="longbreaktime" type="number" class="swal2-input"></div>' +
          '<div style="position:relative; top:15px;"><label style="color:#9c9c9c; font-family:arial; font-size:14px;">Auto Start </label><br><select><option id="swal-option1" name="autostart" value="select an option" class="swal1-option">Select an Option</option><option id="swal-option2" name="autostart" value="true" class="swal2-option">True</option><option id="swal-option3" name="autostart" value="false" class="swal2-option">False</option></select></div>',
        focusConfirm: false,
        preConfirm: () => {
          // return [
          //   document.getElementById('swal-input1').value,
          //   document.getElementById('swal-input2').value,
          //   document.getElementById('swal-input3').value
          // ]
          newFocusTime = document.getElementById('swal-input1').value
          newShortBreak = document.getElementById('swal-input2').value
          newLongBreak = document.getElementById('swal-input3').value
          // console.log(newFocusTime)
          // console.log(newShortBreak)
          // console.log(newLongBreak)
          if (formValues) {
            return formValues
          }
        }
      })
    },
    countdownSoundEffect () {
      var sound = new Audio(require('../assets/bip_countdown.mp3'))
      if (this.minutes < 1 && this.seconds <= 5) {
        sound.play()
      }
    },
    padTime (time) {
      return (time < 10 ? '0' : '') + time
    },
    countdown () {
      if (this.totalTime >= 1) {
        this.totalTime--
        this.countdownSoundEffect()
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
  $timer-padding: 2px;

  .timer {
    color: #fff;
    height: calc(100vh - 2px * 2);
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
      background-color: transparent;
      color: #fff;
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
