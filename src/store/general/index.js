import axios from "axios";
const endPoint = "https://test-dandan.herokuapp.com/";

const state = {
  user: [],
};
const mutations = {
  USER(state, value) {
    state.user = value;
  },
  BARANG(state, value) {
    state.user = value;
  },
};
const actions = {
  login: ({ commit }, { body, success, failed }) => {
    axios.post(endPoint + "auth/login", body).then(
      (response) => {
        success && success(response);
        commit("USER", response);
      },
      (response) => {
        failed && failed(response);
      }
    );
  },
  register: ({ commit }, { body, success, failed }) => {
    axios.post(endPoint + "auth/register", body).then(
      (response) => {
        success && success(response);
        commit("USER", response);
      },
      (response) => {
        failed && failed(response);
      }
    );
  },
  addBarang: ({ commit }, { body, success, failed }) => {
    axios.post(endPoint + "order", body).then(
      (response) => {
        success && success(response);
        commit("BARANG", response);
      },
      (response) => {
        failed && failed(response);
      }
    );
  },
  getBarang: ({ commit }, { success, failed }) => {
    axios.get(endPoint + "order").then(
      (response) => {
        success && success(response);
        commit("BARANG", response);
      },
      (response) => {
        failed && failed(response);
      }
    );
  },
  delBarang: ({ commit }, { id, success, failed }) => {
    axios.delete(endPoint + "order/" + id).then(
      (response) => {
        success && success(response);
        commit("BARANG", response);
      },
      (response) => {
        failed && failed(response);
      }
    );
  },
  setBarang: ({ commit }, { data, success, failed }) => {
    axios.put(endPoint + "order/" + data.id, data.body).then(
      (response) => {
        success && success(response);
        commit("BARANG", response);
      },
      (response) => {
        failed && failed(response);
      }
    );
  },
};
const getters = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
