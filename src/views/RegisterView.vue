<template>
  <div class="register-container">
    <h2>Register</h2>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <br>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <div class="form-group">
        <label for="passwordCon">Confirm Password</label>
        <input id="passwordCon" v-model="passwordCon" type="password" required />
      </div>
      <button type="submit" class="btn">Register</button>
      <router-link :to="{ name: 'login' }" class="login-link">Already have an account? Log in</router-link>
    </form>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      username: '',
      password: '',
      passwordCon: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.passwordCon) {
          this.errorMessage = 'Passwords do not match';
          this.clearMessages();
          return;
        }
        const response = await axios.post('http://localhost:3000/auth/register', {
          name: this.name,
          username: this.username,
          password: this.password
        });
        console.log(response);
        this.successMessage = 'Registration successful!';
        // Clear the form
        this.name = '';
        this.username = '';
        this.password = '';
        this.passwordCon = '';
        this.clearMessages();
      } catch (error) {
        this.errorMessage = 'Registration failed: ' + (error.response && error.response.data.error ? error.response.data.error : error.message);
        this.clearMessages();
      }
    },
    clearMessages() {
      setTimeout(() => {
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
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

.error-message {
  margin-top: 10px;
  padding: 10px;
  color: #fff;
  background-color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 4px;
}

.success-message {
  margin-top: 10px;
  padding: 10px;
  color: #fff;
  background-color: #2ecc71;
  border: 1px solid #2ecc71;
  border-radius: 4px;
}
</style>
