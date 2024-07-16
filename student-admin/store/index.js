export const state = () => ({
  per_page: 30,
});

export const getters = {
  // getter for per_page
  per_page: (state) => state.per_page,
};

export const mutations = {
  //  make the mutations for receive new value from payload
  SET_PAGE(state, payload) {
    state.per_page = payload;
  },
};

export const actions = {
  async fetch({ commit }, payload) {
    try {
      const { data } = await this.$axios.$get(`${payload.pagination}`);
      await commit(payload.commit, data);
    } catch (error) {
      console.error(error);
    }
  },
};

export const strict = false;
