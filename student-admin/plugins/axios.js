export default function({ $axios, store, redirect, app }) {
    $axios.onResponse(response => {
      if (response.response && response.status === 200) {
        app.$toast.global.my_error(error.response.data.message.la.message);
      }
    });
    $axios.onError(error => {
      if (error.response && error.response.status === 400) {
        app.$toast.global.my_error(error.response.data.message.la.message);
      }
    });
  }