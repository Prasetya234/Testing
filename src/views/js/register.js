import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      phoneNumber: "",
      emailBlured: false,
      isValidEmail: true,
      isValidPhone: true,
      isValidPass: true,
      valid: false,
      isLoading: false,
      password: "",
      message: "",
      passwordBlured: false,
    };
  },
  methods: {
    ...mapActions(["register"]),
    validate() {
      this.emailBlured = true;
      this.passwordBlured = true;
      if (
        this.validEmail(this.email) &&
        this.validPassword(this.password) &&
        this.validPhone(this.phoneNumber)
      ) {
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
    validPhone(phone) {
      if (phone === "") {
        return false;
      } else {
        return true;
      }
    },
    submit() {
      this.isValidEmail = this.validEmail(this.email);
      this.isValidPass = this.validPassword(this.password);
      this.isValidPhone = this.validPhone(this.phoneNumber);
      this.validate();
      if (this.valid) {
        this.isLoading = true;
        this.register({
          body: {
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
          },
          success: (res) => {
            this.isLoading = false;
            this.suksesMessage("Welcome " + res.data.content.email);
            setTimeout(() => {
              const toStr = JSON.stringify(res.data.content);
              sessionStorage.setItem("DATA", toStr);
              window.location.reload();
            }, 3000);
          },
          failed: () => {
            this.isLoading = false;
            this.errorMessage("Email already exists");
          },
        });
      }
    },
    signUp() {
      this.$router.push("/login");
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
