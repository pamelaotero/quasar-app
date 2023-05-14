<template>
  <q-layout>
    <div class="q-pa-md pt-50">
      <div>
        <q-input v-model="filterID" label="Search by Rule ID">
          <q-btn @click="filterRuleById(filterID)" icon="search" />
        </q-input>
      </div>
      <q-btn
        @click="openModalCreate()"
        color="primary"
        label="CREATE NEW RULE"
        icon="add"
      />
      <q-btn @click="refreshTable()" label="CLEAN FILTER" />
      <q-table
        v-if="!loading"
        title="House Rules"
        :rows="houseRules"
        :columns="columns"
        row-key="name"
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

      <q-spinner
        size="50px"
        color="primary"
        class="justify-center q-mt-md"
        v-if="loading"
      />

      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="current_page"
          color="grey-8"
          :max="total_pages"
          :input="true"
          :min="1"
          :no-ripple="true"
        />
      </div>
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

    <!-- ACTION: CREATE -->
    <q-dialog v-model="showModalCreate" style="min-height: 100vh">
      <q-card class="msb-card- dialog">
        <q-card-section> Create Rule ➕ </q-card-section>
        <q-card-section>
          <q-input label="Name" v-model="createData.name" />
          <q-input label="Active" v-model="createData.active" />
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Save"
            color="primary"
            @click="createNewHouseRule(createData)"
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
  createHouseRules,
  filterRuleById,
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
      createData: {},
      showModal: false,
      showModalCreate: false,
      total: null,
      coun: null,
      per_page: null,
      current_page: null,
      total_pages: null,
      linkNext: null,
      linkPrev: null,
      filterID: null,
      loading: false,
    };
  },
  created() {
    this.loadHouseRules();
    listHouseRules().then((data) => {
      this.houseRules = data.data.entities;
      this.total = data.data.pagination.total;
      this.count = data.data.pagination.count;
      this.per_page = data.data.pagination.per_page;
      this.current_page = data.data.pagination.current_page;
      this.total_pages = data.data.pagination.total_pages;
      this.linkNext = data.data.pagination.links.next;
      this.linkPrev = data.data.pagination.links.prev;
    });
  },

  methods: {
    async loadHouseRules() {
      try {
        this.loading = true;

        const { data } = await listHouseRules({
          page: this.page,
          per_page: this.perPage,
        });
        this.houseRules = data.data.pagination;
        this.$store.commit("setPagination", data.data.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

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

    async createNewHouseRule(houseRuleData) {
      const obj = { name: houseRuleData.name, active: houseRuleData.active };
      const newObj = {
        house_rules: {
          name: obj.name.toString(),
          active: parseInt(obj.active),
        },
      };
      const response = await createHouseRules(JSON.stringify(newObj));
      this.houseRules.push(response);
      this.refreshTable();
    },

    async deleteHouseRules(id) {
      await deleteHouseRules(id);
      this.houseRules = this.houseRules.filter((rule) => rule.id !== id);
      this.refreshTable();
    },

    async filterRuleById(id) {
      await filterRuleById(id);
      this.houseRules = this.houseRules.filter((rule) => rule.id == id);

      if (!id) {
        this.refreshTable();
      }
    },

    refreshTable() {
      listHouseRules().then((data) => {
        this.houseRules = data.data.entities;
      });
    },

    openModalCreate() {
      this.showModalCreate = true;
    },

    openEditModal(row) {
      this.editData = row;
      this.showModal = true;
    },
  },
});
</script>
