<template>
  <main-header></main-header>
  <router-view></router-view>
</template>

<script>
import MainHeader from "@/components/layouts/MainHeader.vue";

export default {
  components: { MainHeader },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

html {
  font-family: "Roboto", sans-serif;
}
</style>
