<template>
  <div>
    <q-toolbar-title> House Rules List 🏚️ </q-toolbar-title>
    <q-list bordered>
      <q-item v-for="(rule, index) in houseRules" :key="index">
        <q-item-section>
          <q-item-label>{{ rule.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
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
      console.log("data:🚩", data);
      this.houseRules = data;
    });
  },
});
</script>
