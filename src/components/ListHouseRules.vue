<template>
  <q-layout>
    <ul>
      <li v-for="(rule, index) in houseRules" :key="index">{{ rule }}</li>
    </ul>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { listHouseRules } from "../api/services/ApiServices.js";

export default defineComponent({
  name: "ListHouseRules",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      houseRules: [],
    };
  },
  created() {
    listHouseRules().then((data) => {
      console.log(
        "dataaa🚩",
        data.data.entities.map((entity) => entity.name)
      );
      this.houseRules = data.data.entities.map((entity) => entity.name);
    });
  },
});
</script>
