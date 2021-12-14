import { mapActions } from "vuex";

export default {
  name: "Beranda",
  data() {
    return {
      listBarang: [],
      barangState: null,
      hargaState: null,
      isEdit: false,
      header: "Tambah Barang",
      id: "",
      form: {
        barang: "",
        harga: "",
      },
    };
  },
  methods: {
    ...mapActions(["getBarang", "addBarang", "delBarang", "setBarang"]),
    loadBarang() {
      this.getBarang({
        success: (res) => {
          this.listBarang = res.data.content;
        },
        failed: (err) => {
          this.errorMessage(err);
        },
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.hargaState = null;
      this.barangState = null;
      if (this.form.barang === "") {
        this.barangState = valid;
      }
      if (this.form.harga === "") {
        this.hargaState = valid;
      }
      return valid;
    },
    resetModal() {
      this.barangState = null;
      this.hargaState = null;
    },
    modalCancle() {
      this.form = {
        barang: "",
        harga: "",
      };
      this.barangState = null;
      this.hargaState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      const pemilik = JSON.parse(sessionStorage.getItem("DATA"));
      if (!this.isEdit) {
        this.tambahBarang(pemilik.email);
      } else {
        this.editBarangLl(pemilik.email);
        this.$nextTick(() => {
          this.$bvModal.hide("modal-prevent-closing");
        });
      }
    },
    tambahBarang(usr) {
      this.addBarang({
        body: {
          barang: this.form.barang,
          harga: this.form.harga,
          pemilik: usr,
        },
        success: () => {
          this.suksesMessage("Add");
          this.form = {
            barang: "",
            harga: "",
          };
          this.loadBarang();
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
        },
        failed: () => {
          this.form = {
            barang: "",
            harga: "",
          };
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
        },
      });
    },
    deleteBarang(id) {
      this.delBarang({
        id: id,
        success: () => {
          this.errorMessage("Deleted");
          this.loadBarang();
        },
        failed: (err) => {
          this.errorMessage(err);
        },
      });
    },
    editBarang(data) {
      console.log(data);
      this.id = data.id;
      this.form = {
        barang: data.barang,
        harga: data.harga,
      };
      this.isEdit = true;
      this.$nextTick(() => {
        this.$bvModal.show("modal-prevent-closing");
      });
    },
    editBarangLl(usr) {
      this.setBarang({
        data: {
          id: this.id,
          body: {
            barang: this.form.barang,
            harga: this.form.harga,
            pemilik: usr,
          },
        },
        success: () => {
          this.suksesMessage("Update");
          this.isEdit = false;
          this.form = {
            barang: "",
            harga: "",
          };
          this.loadBarang();
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
        },
        failed: (err) => {
          this.errorMessage(err);
          this.form = {
            barang: "",
            harga: "",
          };
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
        },
      });
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
  mounted() {
    this.loadBarang();
  },
};
