<template>
    <div>
        <v-list-item-avatar>
            <v-img style="margin-right:15px;" src="https://cdn-images-1.medium.com/max/1200/1*4JjAXMkZ6iWAtuFaE10-KA.png"></v-img>
            <h3 style="font-family:arial; color:#292929;">Settings</h3>
            <!-- <v-btn icon round dark style="color:#222; margin-left:80px;" @click.stop="setScreen = !setScreen" x-small>
                <v-icon>mdi-close</v-icon>
            </v-btn> -->
        </v-list-item-avatar>
        <v-divider></v-divider>
        <div class="container">
            <div>
                <v-switch v-model="success" id="switch" class="autoStart" label="Auto start"></v-switch>
                <v-switch v-model="success" id="switch" class="autoStart" label="Activate Buttons"></v-switch>
                <v-switch v-model="success" id="switch" class="autoStart" label="12AM Pause Time"></v-switch>
            </div>
        </div>
        <div class="action-btn">
            <div style="margin-right:5px; display:inline-block;">
                <v-btn style="width:20px; height:30px; font-size:12px; font-weight:600;" round color="success">Save</v-btn>
            </div>
            <div style="display:inline-block;">
                <v-btn style="width:20px; height:30px; font-size:12px; font-weight:600;" round color="error">Cancel</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SettingScreen'
}
</script>

<style lang="scss">
</style>
