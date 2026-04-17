<template>
   <div>
      <SearchApp @update:search="updateSearch" />
      <div v-if="applications.length > 0" :class="{ 'loading': loadingApplications }">

         <table class="table">
            <thead>
               <tr>
                  <th scope="col">ID</th>
                  <th @click="sort('name')" role="button">Имя партнера
                     <b-icon
                        :icon="sortField === 'name' ? (sortDirection === 'asc' ? 'sort-down' : 'sort-up') : 'sort'">
                     </b-icon>
                  </th>
                  <th scope="col">Город</th>
                  <th scope="col">Статус</th>
                  <th @click="sort('createdAt')" role="button">Дата создания
                     <b-icon
                        :icon="sortField === 'createdAt' ? (sortDirection === 'asc' ? 'sort-down' : 'sort-up') : 'sort'">
                     </b-icon>
                  </th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="application in applications" :key="application.id">
                  <th scope="row">{{ application.id }}</th>
                  <td>{{ application.name }}</td>
                  <td>{{ application.city }}</td>
                  <td>{{ application.status }}</td>
                  <td>{{ new Date(application.createdAt).toLocaleDateString() }}</td>
                  <td>
                     <EditApp :application="application" />
                  </td>
               </tr>
            </tbody>
         </table>

         <div class="d-flex justify-content-between align-items-center">
            <b-pagination class="m-0" v-model="pagination.page" :total-rows="20" :per-page="pagination.limit"
               @change="updatePagination($event)"></b-pagination>
            <b-form-select class="w-25" v-model="pagination.limit" :options="[5, 10, 20]" @change="updateLimit()">
            </b-form-select>
         </div>
      </div>

      <div v-if="applications.length === 0 && !loadingApplications" class="text-center p-5">
         <h4 class="text-muted">Нет данных</h4>
      </div>

      <div v-if="loadingApplications && applications.length === 0" class="text-center p-5">
         <b-spinner label="Loading..."></b-spinner>
      </div>
   </div>

</template>

<script>
import SearchApp from './SearchApp.vue';
import EditApp from './EditApp.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
   components: {
      EditApp,
      SearchApp
   },
   data() {
      return {
         //for search
         search: null,
         selectedField: 'name',
         selectedStatus: null,
         //for sort
         sortField: null,
         sortDirection: 'asc',
         //pagination
         pagination: {
            page: 1,
            limit: 10,
         },
      }
   },
   mounted() {
      this.getApplications({ ...this.pagination })
   },
   computed: {
      ...mapGetters({
         applications: 'applications/applications',
         statuses: 'applications/statuses',
         loadingApplications: 'applications/loadingApplications',
      }),
      params() {
         return {
            [this.selectedField]: this.search,
            status: this.selectedStatus,
            sortBy: this.sortField,
            order: this.sortDirection,
            ...this.pagination
         }
      },
   },
   methods: {
      sort(field) {
         this.sortField = field;
         this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
         this.pagination.page = 1;
         this.getApplications(this.params)
      },
      updatePagination(page) {
         this.pagination.page = page;
         this.getApplications(this.params);
      },
      updateSearch(search, selectedField, selectedStatus) {
         this.search = search;
         this.selectedField = selectedField;
         this.selectedStatus = selectedStatus;
         this.pagination.page = 1;
         this.getApplications(this.params);
      },
      updateLimit() {
         this.pagination.page = 1;
         this.getApplications(this.params);
      },
      ...mapActions({
         getApplications: 'applications/getApplications',
      }),
   },
}
</script>

<style scoped>
.loading {
   opacity: 0.5;
}
</style>