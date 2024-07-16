<template>
  <v-app dark>

    <app-drawer :miniVariant="miniVariant" :clipped="clipped" :mini-variant-width="miniVariantWidth" ref="drawer" />

    <v-app-bar color="transparent" elevation="0" flat :clipped-left="clipped" fixed app height="72">
      <v-app-bar-nav-icon @click.stop="$refs.drawer.drawer = !$refs.drawer.drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon> mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }} </v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <v-spacer />

      <!-- <v-menu offset-y transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-4" text v-bind="attrs" v-on="on">
            <v-img max-width="25" width="25" height="25" :src="locale === 'la'
              ? require(`~/assets/language/laos.png`)
              : require(`~/assets/language/english.png`)
              " />

            <v-icon class="pl-2">fal fa-angle-down</v-icon>
          </v-btn>
        </template>
        <v-card width="200">
          <v-list dense>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in locales" :key="i" @click="changeLang(item.value)">
                <v-list-item-icon>
                  <v-img max-width="20" width="20" height="20" :src="require(`~/assets/language/${item.flag}`)" />
                </v-list-item-icon>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu> -->

      <v-switch v-model="darkMode" hide-details inset></v-switch>
    </v-app-bar>
    <v-main class="bg-main">
      <transition name="page" mode="out-in">
        <v-card elevation="0" class="ma-2 rounded-xxl">
          <v-card-text>
            <nuxt />
          </v-card-text>
        </v-card>
      </transition>

    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "~/components/layouts/drawer";
import json from "~/api/items.json";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    AppDrawer,
  },
  data: () => ({
    selectedItem: 1,
    darkMode: null,
    miniVariantWidth: 200,
    miniVariant: false,
    NavbarItem: json.navbar,
    clipped: false,
  }),
  watch: {
    darkMode(value) {
      this.$vuetify.theme.dark = value;
      localStorage.setItem("darkMode", value);
    },
  },
  created() {
    const thems = localStorage.getItem("darkMode");
    if (thems !== undefined && thems === "true") {
      this.darkMode = true;
      this.$vuetify.theme.dark = true;
    } else {
      this.darkMode = false;
      this.$vuetify.theme.dark = false;
    }
  },
  computed: {
    ...mapGetters({
      locale: "lang/locale",
      locales: "lang/locales",
    }),
  },
  methods: {
    ...mapMutations({
      SET_LANG: "lang/SET_LANG",
    }),
    async logout() { },
    changeLang(value) {
      this.SET_LANG(value);
      this.$i18n.locale = value;
    },
  },
};
</script>
