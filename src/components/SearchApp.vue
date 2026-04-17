<template>
   <div class="row mb-3 no-gutters">
      <div class="col-6 pr-2">
         <b-form-input v-model.trim="search" debounce="500" placeholder="Поиск" @update="updateSearch()"></b-form-input>
      </div>
      <div class="col">
         <b-form-select v-model="selectedField" :options="searchField" @change="updateSearch()">
         </b-form-select>
      </div>
      <div class="col-2">
      </div>
      <div class="col-2 d-flex align-items-center">
         <label class="mb-0 mr-2">Статус</label>
         <b-form-select v-model="selectedStatus" :options="statuses" @change="updateSearch()">
         </b-form-select>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   data() {
      return {
         search: null,
         selectedField: 'name',
         selectedStatus: null,
         searchField: [
            {
               text: 'По имени',
               value: 'name'
            },
            {
               text: 'По городу',
               value: 'city'
            }
         ],

      }
   },
   computed: {
      ...mapGetters({
         statuses: 'applications/statuses'
      })
   },
   methods: {
      updateSearch() {
         this.$emit('update:search', this.search, this.selectedField, this.selectedStatus);
      }
   }
}
</script>