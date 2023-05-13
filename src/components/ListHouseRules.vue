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
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn>EDIT</q-btn>
            <div class="my-table-details">
              {{ props.row.details }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-layout>
</template>

<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
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
          label: "ID",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "name",
          label: "NAME",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "active",
          label: "STATUS",
          field: "active",
          align: "left",
          sortable: true,
        },
        {
          name: "order",
          label: "ORDER",
          field: "order",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "ACTION",
          field: "action",
          align: "right",
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

  methods: {
    async updateHouseRule(id, updatedData) {
      const response = await updateHouseRules(id, updatedData);
      const updatedRuleIndex = this.houseRules.findIndex(
        (rule) => rule.id === id
      );
      if (updatedRuleIndex !== -1) {
        this.houseRules.splice(updatedRuleIndex, 1, response);
      }
    },
    editRow(row) {
      console.log("Editing row:", row);
      // Chame sua função de atualização aqui
    },
  },
});
</script>
