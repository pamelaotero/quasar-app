<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header>
      <q-toolbar>
        <q-btn icon="menu" flat></q-btn>
        <q-toolbar-title>Search and Stay - House Rules 🏚️</q-toolbar-title>
      </q-toolbar>
    </q-header> -->
    <ListHouseRules />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ListHouseRules from "src/components/listHouseRules";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    ListHouseRules,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      ListHouseRules,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
