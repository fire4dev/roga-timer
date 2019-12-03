<template>
    <div class="settings">
        <v-list-item-avatar>
            <v-img style="margin-right:15px;" src="https://cdn-images-1.medium.com/max/1200/1*4JjAXMkZ6iWAtuFaE10-KA.png"></v-img>
            <h3 style="font-family:arial; color:#292929;">Settings</h3>
            <!-- <v-btn icon round dark style="color:#222; margin-left:80px;" @click.stop="setScreen = !setScreen" x-small>
                <v-icon>mdi-close</v-icon>
            </v-btn> -->
        </v-list-item-avatar>
        <v-divider></v-divider>
        <div class="container">
            <div class="inputs">
                <label for="timerMinutes">Focus Minutes</label>
                <input v-model="focusMinutes" maxlength="3" name="timerMinutes" type="text" @keypress="isNumber($event)"><br>
                <label for="timerMinutes">Break Minutes</label>
                <input v-model="breakMinutes" maxlength="3" name="timerMinutes" type="text" @keypress="isNumber($event)"><br>
                <label for="timerMinutes">Long B. Minutes</label>
                <input v-model="longBreakMinutes" maxlength="3" name="timerMinutes" type="text" @keypress="isNumber($event)">
            </div>
            <div class="switches">
                <v-switch v-model="success" id="switch" label="Auto start"></v-switch>
                <v-switch v-model="success" id="switch" style="margin-top:-20px;" label="Activate Buttons Start/Pause"></v-switch>
                <v-switch v-model="success" id="switch" style="margin-top:-20px;" label="12AM Pause Time"></v-switch>
            </div>
        </div>
        <div class="action-btn">
            <div style="margin-right:5px; display:inline-block;">
                <v-btn style="width:20px; height:30px; font-size:12px; font-weight:600;" @click="saveChanges" round color="success">Save</v-btn>
            </div>
            <div style="display:inline-block;">
                <v-btn style="width:20px; height:30px; font-size:12px; font-weight:600;" @click.stop="exitSetting" round color="error">Cancel</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SettingScreen',
  data () {
    return {
      toggleSettings: false,
      focusMinutes: '',
      breakMinutes: '',
      longBreakMinutes: ''
    }
  },
  methods: {
    exitSetting: function () {
      console.log(this.toggleSettings)
    },
    isNumber: function (evt) {
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    saveChanges: function () {
      console.log(this.focusMinutes)
      console.log(this.breakMinutes)
      console.log(this.longBreakMinutes)
    }
  }
}
</script>

<style lang="scss">
  .container {
    .inputs {
      input {
        background:#ebeaea;
        border-radius:4px;
        margin-left:10px;
        width:50px;
        text-align:center;
      }
      input:focus{
        background:rgb(204, 203, 203);
        border: 0 none;
        outline: 0;
        transition-duration:.2s;
      }
    }
    .switches {
      display:inline;
    }
  }
</style>
