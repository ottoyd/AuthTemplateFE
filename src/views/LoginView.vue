<template>
  <div class="login-container">
    <h2>Login</h2>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <br>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <input v-model="username" type="text" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
    <router-link :to="{ name: 'register' }" class="register-link">Register</router-link>

  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['loginAct']),
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password
        });
        this.loginAct(response.data.user);
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.errorMessage = 'Login failed: ' + (error.response && error.response.data.error ? error.response.data.error : error.message);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.register-link {
  display: block;
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.register-link:hover {
  color: #0056b3;
}

.error-message {
  margin-top: 10px;
  padding: 10px;
  color: #fff;
  background-color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 4px;
}
</style>
