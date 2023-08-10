<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a coach</router-link></h1>
      <ul>
        <li><router-link to="/coach">All coaches</router-link></li>
        <li><router-link to="/requests">Requests</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  background-color: rgb(164, 95, 230);
  padding: 20px;
}

header a {
  padding: 0.75rem 1.5rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  display: flex;
  flex-direction: row;
  gap: 10px;
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
