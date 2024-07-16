<template>
  <v-container fill-height>
    <v-overlay class="overlay" :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row justify="center" align="center">
      <v-col xs="12" md="6">
        <v-card flat class="rounded-lg">
          <v-row>

            <v-col lg="12" xs="12" md="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card flat class="rounded-lg">
                  <h1 class="font-weight-bold text-center ma-10">ລະບົບລົງທະບຽນັກຮຽນຂອງໂຮງຮຽນມັດທະຍົມສົມບູນນາຂ່າ</h1>

                  <v-card-text>
                    <v-row justify="center" align="center">
                      <v-col lg="8" xs="12" md="12">
                        <v-text-field v-model="form.username" :rules="[(v) => !!v || 'ຊື່ຜູ້ໃຊ້ is required']"
                          label="ຊື່ຜູ້ໃຊ້" outlined flat clearable></v-text-field>
                        <v-text-field v-model="form.password" :rules="[(v) => !!v || 'ລະຫັດຜ່ານ is required']"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'
      " :type="showPassword ? 'text' : 'password'" label="ລະຫັດຜ່ານ" placeholder="*********" solo
                          class="input-login mt-2" @click:append="showPassword = !showPassword" flat
                          outlined></v-text-field>

                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions class="justify-center">
                    <v-btn @click="login()" x-large color="primary" class="px-12 text-capitalize">
                      <b>ເຂົ້າສູ່ລະບົບ</b>
                    </v-btn>
                  </v-card-actions>
                  <br>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authenticated } from "~/utils/auth";
import { login } from "~/controllers/user";
export default {
  middleware: "auth",
  mixins: [login],
  layout: "blank",
  data() {
    return {
      showPassword: false,
      valid: false,
      overlay: false,
      form: {
        username: "director",
        password: "123456",
      },
    }
  },
  methods: {
    async login() {
      try {
        //console.log('xx: ', this.$refs.form.validate());
        if (this.$refs.form.validate() == true) {
          this.overlay = true;
          const { data } = await this.$axios.post("/login", this.form);
          console.log('login: ', data);
          if (data.status) {
            this.overlay = false;
            await this.$toast.success("Successfully", {
              icon: "fa-check-circle",
            });

            this.$auth.setUser(data)
            console.log('this.$auth.loggedIn === ', this.$auth.loggedIn)
            //window.location = "/";
            // this.$router.push('/home')

            // await authenticated(this, data.data, "local");

          } else if (data.code === 404) {
            this.overlay = false;
            this.user_nameErrors = data.data;
            this.passwordErrors = data.message;
            this.$toast.global.my_error(`${data.message}`);
          } else if (data.code === 403) {
            this.overlay = false;
            this.passwordErrors = data.message;
            this.$toast.global.my_error(`${data.message}`);
          } else {
            this.$toast.global.my_error(`${data.message}`);
          }
        }
      } catch (error) {
        this.overlay = false;
        await this.$toast.global.my_error(error);
        console.log("error ===>", error);
      }
    },
  },
};
</script>

<style></style>
