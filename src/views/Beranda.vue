<template>
  <div>
    <div class="content" style="padding-top: 60px">
      <!-- Modal -->
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        :title="header"
        hide-header-close
        @show="resetModal"
        @hidden="modalCancle"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Barang"
            label-for="barang-input"
            invalid-feedback="Barang is required"
            :state="barangState"
          >
            <b-form-input
              id="barang-input"
              v-model="form.barang"
              :state="barangState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Harga"
            label-for="harga-input"
            invalid-feedback="Harga is required"
            :state="hargaState"
          >
            <b-form-input
              id="harga-input"
              type="number"
              v-model="form.harga"
              :state="hargaState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
      <!-- End -->
      <div class="container card">
        <div class="row mt-3 mb-3">
          <div class="col-10">
            <h2>Order</h2>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-success"
              v-b-modal.modal-prevent-closing
            >
              Tambah Barang
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Tangal Dibuat</th>
                <th scope="col">Harga</th>
                <th scope="col">Pemilik</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in listBarang" :key="index">
                <th scope="row">{{ data.id }}</th>
                <td>{{ data.barang }}</td>
                <td>{{ data.createAt }}</td>
                <td>
                  {{
                    "Rp. " +
                    data.harga.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                  }}
                </td>
                <td>{{ data.pemilik }}</td>
                <td>
                  <button @click="editBarang(data)" class="btn btn-secondary">
                    Edit
                  </button>
                  &nbsp;
                  <button @click="deleteBarang(data.id)" class="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p
            style="text-align: center; padding-top: 10px; font-size: 25px"
            v-if="listBarang.length === 0"
          >
            Kosong
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/beranda.js"></script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
