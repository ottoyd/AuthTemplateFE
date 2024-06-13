<template>
  <div class="home-container">
    <h1 v-if="user" class="welcome-message">Welcome, {{ user.name }}</h1>
    <h1 v-else class="loading-message">Loading...</h1>
    <button @click="logoutAct" class="btn-logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['logoutAct']),
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
}

.welcome-message {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.loading-message {
  font-size: 2em;
  margin-bottom: 20px;
  color: #999;
}

.btn-logout {
  padding: 10px 20px;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #c0392b;
}
</style>
