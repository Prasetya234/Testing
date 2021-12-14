import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      emailBlured: false,
      isValidEmail: true,
      isValidPass: true,
      valid: false,
      isLoading: false,
      password: "",
      message: "",
      passwordBlured: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    validate() {
      this.emailBlured = true;
      this.passwordBlured = true;
      if (this.validEmail(this.email) && this.validPassword(this.password)) {
        this.valid = true;
      }
    },
    validEmail(mail) {
      if (mail === "") {
        this.message = "Email Harus di isi";
      } else {
        this.message = "Format Email Tidak Benar";
      }
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      if (re.test(mail.toLowerCase())) {
        return true;
      }
    },
    validPassword(pass) {
      if (pass === "") {
        return false;
      } else {
        return true;
      }
    },
    signUp() {
      this.$router.push("/register");
    },
    submit() {
      this.isValidEmail = this.validEmail(this.email);
      this.isValidPass = this.validPassword(this.password);
      this.validate();
      if (this.valid) {
        this.isLoading = true;
        this.login({
          body: {
            email: this.email,
            password: this.password,
          },
          success: (res) => {
            console.log(res);
            this.isLoading = false;
            this.suksesMessage("Welcome " + res.data.content.email);
            const toStr = JSON.stringify(res.data.content);
            setTimeout(() => {
              sessionStorage.setItem("DATA", toStr);
              window.location.reload();
            }, 3000);
          },
          failed: () => {
            this.isLoading = false;
            this.errorMessage("Email Or Password not found");
          },
        });
      }
    },
    errorMessage(msg) {
      return this.$toasted.show(msg, {
        position: "top-center",
        type: "error",
        duration: 4000,
        theme: "bubble",
        singleton: true,
      });
    },
    suksesMessage(msg) {
      this.$toasted.show(msg, {
        position: "top-center",
        type: "success",
        duration: 4000,
        theme: "bubble",
        singleton: true,
      });
    },
  },
};
