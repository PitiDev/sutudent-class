export default function ({ app, store }) {
  // Server-side
  if (process.server) {
    const locale = app.$cookies.get("lang");
    if (locale) {
      store.commit("SET_LANG", locale);
    } else {
      localStorage.setItem("lang", "la");
    }
  }
}
