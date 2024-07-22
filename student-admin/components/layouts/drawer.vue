<template>
  <v-navigation-drawer color="transparent" :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $nuxt.$auth.user.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ $nuxt.$auth.user.username }}@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu open-on-hover offset-y :position-y="70" transition="slide-y-transition" bottom rounded>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small>fa fa-caret-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/administrator/change_password">
                <v-list-item-title>change password</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title>logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </template>

    <v-list class="mt-5">
      <!-- <h3 class="text-center">---ຈັດການຂໍ້ມູນພື້ນຖານ---</h3>
      <br> -->
      <template v-for="(item, i) in menus"
        v-if="$nuxt.$auth.user.username == 'admin' || $nuxt.$auth.user.username == 'director'">
        <!--group with subitems-->
        <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon"
          :class="checkURL(item.href)" no-action>


        </v-list-group>

        <!--top-level link-->
        <v-list-item v-else :to="item.href ? item.href : null" ripple="ripple" :disabled="item.disabled"
          :target="item.target" rel="noopener" :key="item.name + item.href" :class="checkURL(item.href)">
          <v-list-item-action>

            <v-icon size="30" v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>

          </v-list-item-action>
          <v-list-item-content>
            <h4>{{ $t(item.title) }}</h4>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>


    <v-list class="mt-0">
      <!-- <h3 class="text-center">---ລົງທະບຽນ---</h3> -->

      <template v-for="(item, i) in registerMenu"
        v-if="$nuxt.$auth.user.username == 'admin' || $nuxt.$auth.user.username == 'director'">
        <!--group with subitems-->
        <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon"
          :class="checkURL(item.href)" no-action>
        </v-list-group>

        <!--top-level link-->
        <v-list-item v-else :to="item.href ? item.href : null" ripple="ripple" :disabled="item.disabled"
          :target="item.target" rel="noopener" :key="item.name + item.href" :class="checkURL(item.href)">
          <v-list-item-action>

            <v-icon size="30" v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>

          </v-list-item-action>
          <v-list-item-content>
            <h4>{{ $t(item.title) }}</h4>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>


    <v-list class="mt-0">
      <!-- <h3 class="text-center">---ປະເມີນຜົນ---</h3> -->

      <template v-for="(item, i) in processMenu"
        v-if="$nuxt.$auth.user.username == 'teacher' || $nuxt.$auth.user.username == 'director'">
        <!--group with subitems-->
        <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon"
          :class="checkURL(item.href)" no-action>
        </v-list-group>

        <!--top-level link-->
        <v-list-item v-else :to="item.href ? item.href : null" ripple="ripple" :disabled="item.disabled"
          :target="item.target" rel="noopener" :key="item.name + item.href" :class="checkURL(item.href)">
          <v-list-item-action>

            <v-icon size="30" v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>

          </v-list-item-action>
          <v-list-item-content>
            <h4>{{ $t(item.title) }}</h4>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>


    <v-list class="mt-0">
      <template v-for="(item, i) in processMenu2" v-if="$nuxt.$auth.user.username == 'student'">
        <!--group with subitems-->
        <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon"
          :class="checkURL(item.href)" no-action>
        </v-list-group>

        <!--top-level link-->
        <v-list-item v-else :to="item.href ? item.href : null" ripple="ripple" :disabled="item.disabled"
          :target="item.target" rel="noopener" :key="item.name + item.href" :class="checkURL(item.href)">
          <v-list-item-action>

            <v-icon size="30" v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>

          </v-list-item-action>
          <v-list-item-content>
            <h4>{{ $t(item.title) }}</h4>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <v-list class="mt-0">
      <template v-for="(item, i) in reportAll" v-if="$nuxt.$auth.user.username == 'admin' || $nuxt.$auth.user.username == 'director'">
        <!--group with subitems-->
        <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon"
          :class="checkURL(item.href)" no-action>
        </v-list-group>

        <!--top-level link-->
        <v-list-item v-else :to="item.href ? item.href : null" ripple="ripple" :disabled="item.disabled"
          :target="item.target" rel="noopener" :key="item.name + item.href" :class="checkURL(item.href)">
          <v-list-item-action>

            <v-icon size="30" v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>

          </v-list-item-action>
          <v-list-item-content>
            <h4>{{ $t(item.title) }}</h4>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import menu from "~/api/dashboard";
export default {
  props: ["miniVariant", "clipped"],
  data() {
    return {
      drawer: true,
      menus: [
        {
          title: "home",
          group: "apps",
          icon: "far fa-home",
          name: "home",
          href: "/",
          policy: [404, 1, 2, 3],
          role: "",
        },
        {
          title: "ຈັດການຂໍ້ມູນນັກຮຽນ",
          group: "apps",
          icon: "mdi mdi-account-school",
          name: "admin",
          href: "/student",
          policy: [404],
          role: "admin",
        },
        {
          title: "ຈັດການຂໍ້ມູນອາຈານ",
          group: "apps",
          icon: "mdi mdi-human-male-board",
          name: "admin",
          href: "/teacher",
          role: "admin",
          policy: [404]
        },
        {
          title: "ຈັດການຂໍ້ມູນຫ້ອງຮຽນ",
          group: "apps",
          icon: "mdi mdi-google-classroom",
          name: "admin",
          href: "/class",
          role: "admin",
          policy: [404]
        },
        {
          title: "ຈັດການຂໍ້ມູນຕາຕະລາງຮຽນ",
          group: "apps",
          icon: "mdi mdi-school",
          name: "admin",
          href: "/learn_table",
          policy: [404],
          role: "admin",
        },
        {
          title: "ຈັດການຜູ້ໃຊ້ລະບົບ",
          group: "apps",
          icon: "mdi mdi-clipboard-account",
          name: "admin",
          href: "/users/manage_user",
          policy: [404],
          role: "admin",
        },

      ],
      registerMenu: [
        {
          title: "ຂໍ້ມູນລົງທະບຽນ",
          group: "apps",
          icon: "mdi mdi-list-box-outline",
          name: "home",
          href: "/register/register_student",
          policy: [404, 1, 2, 3],
          role: "admin",
        },
      ],
      processMenu: [
        {
          title: "ປ້ອນຄະແນນ",
          group: "apps",
          icon: "mdi mdi-counter",
          name: "home",
          href: "/student_score",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },

        {
          title: "ຂໍ້ມູນມື້ຂາດ",
          group: "apps",
          icon: "mdi mdi-close-octagon",
          name: "home",
          href: "/student_absent",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },

      ],
      processMenu2: [
        {
          title: "ບັນທືກມື້ຂາດ",
          group: "apps",
          icon: "mdi mdi-close-octagon",
          name: "home",
          href: "/student_absent",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },
      ],
      reportAll: [
        {
          title: "ລາຍງານຂໍ້ມູນນັກຮຽນ",
          group: "apps",
          icon: "mdi mdi-list-box-outline",
          name: "home",
          href: "/report/student_report",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },
        {
          title: "ລາຍງານຂໍ້ມູນຫ້ອງຮຽນ",
          group: "apps",
          icon: "mdi mdi-list-box-outline",
          name: "home",
          href: "/report/class_report",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },
        {
          title: "ລາຍງານຂໍ້ມູນອາຈານ",
          group: "apps",
          icon: "mdi mdi-list-box-outline",
          name: "home",
          href: "/report/teacher_report",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },
        {
          title: "ລາຍງານຂໍ້ມູນຕາລາງຮຽນ",
          group: "apps",
          icon: "mdi mdi-list-box-outline",
          name: "home",
          href: "/report/schedule_report",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },
        {
          title: "ລາຍງານຈັດອັນດັບທີ",
          group: "apps",
          icon: "mdi mdi-list-box-outline",
          name: "home",
          href: "/report/student_rank",
          policy: [404, 1, 2, 3],
          role: "teacher",
        },
      ]
    };
  },
  computed: {
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      window.location = "/";
    },
    checkURL(item) {
      if (item === this.$route.path) {
        return "btn-active-link";
      }
    },
  },
};
</script>
