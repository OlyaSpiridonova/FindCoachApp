<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a coach</router-link></h1>
      <ul>
        <li><router-link to="/coach">All coaches</router-link></li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else><router-link to="/auth">Login</router-link></li>
        <li v-if="isLoggedIn" @click="logout">
          <base-button>Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
  },
};
</script>

<style scoped>
header {
  background-color: rgb(164, 95, 230);
  padding: 20px;
}

header a {
  padding: 0.75rem 1.5rem;
  @media (max-width: 779px) {
    padding: 0.5rem;
  }
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 779px) {
    flex-direction: column;
  }
}

ul {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  padding: 0;
  @media (max-width: 779px) {
    gap: 0 5px;
  }
}

li {
  list-style-type: none;
}

h1 a {
  color: white;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
  color: #fab1ee;
}

a {
  font-weight: 600;
  text-decoration: none;
}
</style>
