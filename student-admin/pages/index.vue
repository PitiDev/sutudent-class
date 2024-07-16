<template>
  <div>
    <v-container fluid>
      <h1>ລາຍງານຂໍ້ມູນລະບົບທັງໝົດ</h1>
      <br>
    </v-container>
    <!-- justify="center" align="center" -->
    <v-row class="mb-10">
      <v-col xs="12" sm="4" md="4">
        <v-card class="shadow-me rounded-lg">
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" md="3">
                <v-icon color="#F57C00" size="70">mdi mdi-account-school</v-icon></v-col>
              <v-col cols="12" md="9">
                <h1 class="blue--text"><b>{{ studentCount }}</b></h1>
                <br>
                <h2>ນັກຮຽນທັງໝົດ {{ $nuxt.$auth.user.username }}</h2>
              </v-col>
            </v-row>


          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="4" md="4">
        <v-card class="shadow-me rounded-lg">
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" md="3">
                <v-icon color="#F57C00" size="70">mdi mdi-human-male-board</v-icon></v-col>
              <v-col cols="12" md="9">
                <h1 class="blue--text"><b>{{ teacherCount }}</b></h1>
                <br>
                <h2>ອາຈານທັງໝົດ</h2>
              </v-col>
            </v-row>


          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="4" md="4">
        <v-card class="shadow-me rounded-lg">
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" md="3">
                <v-icon color="#F57C00" size="70">mdi mdi-google-classroom</v-icon></v-col>
              <v-col cols="12" md="9">
                <h1 class="blue--text"><b>{{ classCount }}</b></h1>
                <br>
                <h2>ຫ້ອງຮຽນທັງໝົດ</h2>
              </v-col>
            </v-row>


          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: "Admin",
    };
  },
  data() {
    return {
      studentCount: 0,
      teacherCount: 0,
      classCount: 0
    };
  },
  mounted() {
    this.getStudentCount();
    this.getTeacherCount();
    this.getClassCount();
  },
  methods: {
    async getStudentCount() {
      try {
        const { data } = await this.$axios.get("student_count");
        console.log("studentCount: ", data[0]['count']);
        this.studentCount = data[0]['count'];
      } catch (error) {
        console.log("studentCount error ===>", error);
      }
    },
    async getTeacherCount() {
      try {
        const { data } = await this.$axios.get("teacher_count");
        console.log("teacherCount: ", data[0]['count']);
        this.teacherCount = data[0]['count'];
      } catch (error) {
        console.log("teacherCount error ===>", error);
      }
    },
    async getClassCount() {
      try {
        const { data } = await this.$axios.get("class_count");
        console.log("classCount: ", data[0]['count']);
        this.classCount = data[0]['count'];
      } catch (error) {
        console.log("classCount error ===>", error);
      }
    },
  },
};
</script>
