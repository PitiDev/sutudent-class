const authenticated = async (props, data, type) => {
  try {
    await props.$auth.setToken(type, "Bearer " + data);
    await props.$auth.setRefreshToken(type, "Bearer " + data);
    await props.$axios.setHeader("Authorization", "Bearer " + data);
    await props.$auth.ctx.app.$axios.setHeader(
      "Authorization",
      "Bearer " + data
    );
    console.log('authenticated: ', data);
    await fetchUser(props);
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = async (props) => {
  try {
    const { data } = await props.$axios.get("/me");
    if (data.status) {
      console.log("data me: ", data.data);
      await props.$auth.setUser(data.data);
      window.location = "/";
      await props.$router.push("/");
        if (data.data.status === 1) {
          await props.$router.push("/administrator");
        } else {
          await props.$router.push("/dashboard");
        }
    }
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (props, token, strategy) => {
  try {
    const { data } = await props.$axios.post("/api/auth/refresh");
    console.log("data success ====> ", data);
    // if (data.status) {
    //     console.log("refreshToken ===>", data);
    //     await authenticated(props, data.access_token, strategy);
    // } else {
    //     console.log("refreshToken error ===>", data);
    // }
  } catch (error) {
    await props.$auth.logout();
    console.log("refreshToken error ===>", error);
  }
};
export { authenticated, fetchUser, refreshToken };
