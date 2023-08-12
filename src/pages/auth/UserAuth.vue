<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An occured an error"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <base-dialog :show="isLoading" fixed title="Authenticated...">
      <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <base-card>
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="text" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!isValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </base-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login insted";
      }
    },
  },
  methods: {
    async submitForm() {
      this.isValid = true;
      this.isLoading = true;
      if (
        !this.email.includes("@") ||
        this.email === "" ||
        this.password.length < 6
      ) {
        this.isValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const redirectURL = "/" + (this.$route.query.redirect || "coach");
        this.$router.replace(redirectURL);
      } catch (error) {
        this.error = error.message || "Failed to authenticate, try later...";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode === "login" ? (this.mode = "signup") : (this.mode = "login");
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
