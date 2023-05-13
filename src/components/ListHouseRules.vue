<template>
  <q-toolbar-title> House Rules List 🏚️ </q-toolbar-title>
</template>

<script>
import { defineComponent } from "vue";
import { getHouseRules } from "../api/services/ApiServices.js";

export default defineComponent({
  name: "ListHouseRules",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  created() {
    getHouseRules().then((data) => {
      console.log(data);
    });
  },
});
</script>
