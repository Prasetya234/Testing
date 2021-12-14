export default {
  name: "home",
  methods: {
    logOut() {
      sessionStorage.removeItem("DATA");
      this.suksesMessage("LogOut");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
