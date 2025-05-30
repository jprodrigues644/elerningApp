<template>
  <v-app>
    <div id="app">
      <Header @toggle-menu="handleToggleMenu" class="header" />
      <Menu v-show="menuVisible" @menu-hover="handleMenuHover" class="menu" />
      <Content class="content" />
      <Footer class="footer" />
     
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/template/Header.vue";
import Menu from "@/components/template/Menu.vue";
import Content from "@/components/template/Content.vue";
import Footer from "@/components/template/Footer.vue";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer },
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    handleToggleMenu(show) {
      this.menuVisible = show;
    },
    handleMenuHover(keepOpen) {
      this.menuVisible = keepOpen;
    }
  }
}
</script>

<style>
/* existing styles */
</style>


<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  height: 100vh;
  display: grid;
  grid-template-rows: 8vh 89vh 3vh;
  grid-template-columns: 20vw 79vw;
  grid-template-areas:
    "header header"
    "menu content"
    "footer footer";
}

.header {
  grid-area: header;
}

.menu {
  grid-area: menu;
}

.content {
  grid-area: content;
}

.footer {
  grid-area: footer;
}

.content-below-header {
  background-color: #fff; /* Light background to test shadow visibility */
}
</style>


