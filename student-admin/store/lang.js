export const state = () => ({
  locales: [
    {
      name: "Lao",
      value: "la",
      flag: "laos.png",
    },
    {
      name: "English",
      value: "en",
      flag: "english.png",
    },
  ],
  locale: "la",
});
export const getters = {
  locales: (state) => state.locales,
  locale: (state) => state.locale,
};
export const mutations = {
  // set language
  SET_LANG(state, locale) {
    state.locale = locale;
    localStorage.setItem("lang", locale);
  },
};
export const actions = {};
