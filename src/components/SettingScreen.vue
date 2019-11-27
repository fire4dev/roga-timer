<template>
    <div>
        <v-navigation-drawer v-model="setScreen" absolute temporary>
        <v-list-item-avatar>
            <v-img style="margin-right:15px;" src="https://cdn-images-1.medium.com/max/1200/1*4JjAXMkZ6iWAtuFaE10-KA.png"></v-img>
            <h3 style="font-family:arial; color:#292929;">Settings</h3>
            <v-btn icon round dark style="color:#222; margin-left:80px;" @click.stop="setScreen = !setScreen" x-small>
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-list-item-avatar>
        <v-divider></v-divider>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
  name: 'SettingScreen'
}
</script>
