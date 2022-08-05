<template>
  <div class="login-page">
    <div class="container">
      <label for="input-email">Email:</label>
      <b-input
        id="input-email"
        :state="emailState"
        @keypress.enter="loading ? null : login()"
        v-model="user.email"
        placeholder="Digite seu email"
      />
      <label class="mt-4" for="input-password">Senha:</label>
      <b-input
        id="password"
        :state="passwordState"
        @keypress.enter="loading ? null : login()"
        type="password"
        v-model="user.password"
        placeholder="********"
      />
      <b-button class="mt-5 btn-block" @click="loading ? null : login()">
        <span v-if="!loading">Entrar</span>
        <b-spinner v-else variant="light"></b-spinner>
      </b-button>
    </div>
  </div>
</template>

<script>
// Utils
import errorToast from "~/helpers/errorToast";
import validator from "~/helpers/validator";

export default {
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    emailState() {
      return validator.isEmail(this.user.email);
    },
    passwordState() {
      return validator.isLengthLessOrEqual(this.user.password, 8);
    },
  },
  methods: {
    errorToast,
    async login() {
      if (this.validate()) {
        try {
          this.loading = true;
          await this.$auth.loginWith("local", {
            data: this.user,
          });
        } catch (err) {
          this.loading = false;
          this.errorToast("Usuário ou senha inválido!");
        }
      }
    },
    validate() {
      let next = true;
      if (!this.emailState) {
        this.errorToast("Preencha o email corretamente!");
        next = false;
      }
      if (!this.passwordState) {
        this.errorToast("Preencha a senha corretamente!");
        next = false;
      }
      return next;
    },
  },
};
</script>

<style lang="scss">
.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  .container {
    border-radius: 16px;
    padding: 4rem;
    background-color: #27293d;
  }
}
</style>
