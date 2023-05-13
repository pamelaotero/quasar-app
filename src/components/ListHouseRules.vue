<template>
  <q-layout>
    <ul>
      <li v-for="(rule, index) in houseRules" :key="index">{{ rule }}</li>
    </ul>
    <div class="q-pa-md">
      <q-table
        title="House Rules"
        :rows="houseRules"
        :columns="columns"
        row-key="name"
      />
    </div>
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

      columns: [
        {
          name: "id",
          required: true,
          label: "id",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "name",
          label: "name",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "active",
          label: "active",
          field: "active",
          align: "left",
          sortable: true,
        },
        {
          name: "order",
          label: "order",
          field: "order",
          align: "left",
          sortable: true,
        },
      ],
    };
  },
  created() {
    listHouseRules().then((data) => {
      console.log("dataaa🚩", data.data.entities);
      this.houseRules = data.data.entities;
    });
  },
});
</script>
