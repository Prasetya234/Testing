<template>
  <div class="container" style="padding-top: 80px">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <h1>Register Here</h1>
        <div class="card px-5 py-5">
          <div class="form-data">
            <div class="forms-inputs mb-4">
              <span>Email</span>
              <input
                autocomplete="off"
                type="text"
                v-model="email"
                :class="{
                  'form-control': true,
                  'is-invalid': !isValidEmail && emailBlured,
                }"
                @blur="emailBlured = true"
              />
              <div class="invalid-feedback">{{ message }}!</div>
            </div>
            <div class="forms-inputs mb-4">
              <span>Password</span>
              <input
                autocomplete="off"
                type="password"
                v-model="password"
                :class="{
                  'form-control': true,
                  'is-invalid': !isValidPass && passwordBlured,
                }"
                @blur="passwordBlured = true"
              />
              <div class="invalid-feedback">Password Harus di isi!</div>
            </div>
            <div class="forms-inputs mb-4">
              <span>Nomor Telepon</span>
              <input
                autocomplete="off"
                type="number"
                v-model="phoneNumber"
                :class="{
                  'form-control': true,
                  'is-invalid': !isValidPhone,
                }"
              />
              <div class="invalid-feedback">Nomor Telepon Harus di isi!</div>
            </div>
            <div class="mb-3">
              <button @click="submit" class="btn btn-dark w-100">
                <div class="d-flex justify-content-center" v-if="isLoading">
                  <div class="spinner-border" role="status"></div>
                </div>
                <span v-else>Register</span>
              </button>
              <p class="text" @click="signUp">Kembali</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/register.js"></script>

<style scoped>
.card {
  border: none;
  height: auto;
}

.text {
  text-align: right;
  padding: 5px 0px 15px 0px;
  font-size: 14px;
  color: rgb(32, 127, 216);
  cursor: pointer;
}

.text:hover {
  text-decoration: underline;
  text-decoration-color: rgb(32, 127, 216);
}
.forms-inputs {
  position: relative;
}

.forms-inputs span {
  position: absolute;
  top: -18px;
  left: 10px;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 15px;
}
.text {
  padding-top: 20px;
  color: blue;
}
.forms-inputs input {
  height: 50px;
  border: 2px solid #eee;
}

.forms-inputs input:focus {
  box-shadow: none;
  outline: none;
  border: 2px solid #000;
}

.btn {
  height: 50px;
}

.success-data {
  display: flex;
  flex-direction: column;
}

.bxs-badge-check {
  font-size: 90px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
