<template>
  <q-layout>
    <div class="q-pa-md pt-50">
      <q-btn color="primary" label="CREATE NEW RULE" icon="add" />
      <q-table
        title="House Rules"
        :rows="houseRules"
        :columns="columns"
        row-key="name"
        rows-per-page-label="10"
      >
        <template v-slot:body-cell-edit="props">
          <q-td :props="props">
            <q-btn label="EDIT" @click="openEditModal(props.row)" icon="edit" />
            <div class="my-table-details">{{ props.row.details }}</div>
          </q-td>
        </template>
        <template v-slot:body-cell-delete="props">
          <q-td :props="props">
            <q-btn
              label="DELETE"
              @click="deleteHouseRules(props.row.id)"
              icon="delete"
            />
            <div class="my-table-details">{{ props.row.details }}</div>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- ACTION: EDIT -->
    <q-dialog v-model="showModal" style="min-height: 100vh">
      <q-card class="msb-card-dialog">
        <q-card-section> Update Rule ✏️ </q-card-section>
        <q-card-section>
          <q-input label="Name" v-model="editData.name" />
          <q-input label="Active" v-model="editData.active" />
          <q-input label="Order" v-model="editData.order" />
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Save"
            color="primary"
            @click="updateHouseRule(editData.id, editData)"
          />
          <q-btn label="Close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import {
  listHouseRules,
  updateHouseRules,
  deleteHouseRules,
} from "../api/services/ApiServices.js";

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
          name: "edit",
          label: "EDIT",
          field: "edit",
          align: "right",
        },
        {
          name: "delete",
          label: "DELETE",
          field: "delete",
          align: "right",
        },
      ],

      editData: {},
      showModal: false,
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
      this.refreshTable();
    },

    async deleteHouseRules(id) {
      await deleteHouseRules(id);
      this.houseRules = this.houseRules.filter((rule) => rule.id !== id);
      this.refreshTable();
    },

    refreshTable() {
      listHouseRules().then((data) => {
        this.houseRules = data.data.entities;
      });
    },

    openEditModal(row) {
      this.editData = row;
      console.log("showModal", this.showModal);
      this.showModal = true;
      console.log("modal aberta:", this.showModal);
    },
  },
});
</script>
