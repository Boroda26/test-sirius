<template>
   <div>
      <b-button v-b-modal="'modal-' + application.id" @click="setSaveApplication(application)" size="sm"
         variant="primary">
         Редактировать
      </b-button>

      <b-modal :id="'modal-' + application.id" title="Редактирование заявки" hide-footer>
         <b-form v-if="editApplication" @submit.prevent="saveApplication">
            <h4 class="mb-3">
               Заявка №{{ editApplication.id }} от
               {{ new Date(editApplication.createdAt).toLocaleDateString() }}
            </h4>
            <b-form-group label="Имя:">
               <b-form-input v-model="editApplication.name" :state="!editApplication.name ? false : null"
                  required></b-form-input>
               <b-form-invalid-feedback :state="!!editApplication.name">
                  Это обязательное поле
               </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Телефон:">
               <b-form-input v-model="editApplication.tel" :state="!editApplication.tel ? false : null"
                  required></b-form-input>
               <b-form-invalid-feedback :state="!!editApplication.tel">
                  Это обязательное поле
               </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Город:">
               <b-form-input v-model="editApplication.city" :state="!editApplication.city ? false : null"
                  required></b-form-input>
               <b-form-invalid-feedback :state="!!editApplication.city">
                  Это обязательное поле
               </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Статус:">
               <b-form-select v-model="editApplication.status" :options="statuses.filter(status => status.value)"
                  required></b-form-select>
            </b-form-group>
            <b-form-group label="Комментарий:">
               <b-form-input v-model="editApplication.comment" required></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="loading">Сохранить
               <b-spinner v-if="loading" small label="Loading..."></b-spinner>
            </b-button>
         </b-form>
      </b-modal>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
   props: ['application'],
   computed: {
      ...mapGetters({
         statuses: 'applications/statuses'
      })
   },
   data() {
      return {
         editApplication: null,
         loading: false
      }
   },
   methods: {
      setSaveApplication(application) {
         this.editApplication = structuredClone(application)
      },
      async saveApplication() {
         this.loading = true;
         await this.updateApplication(this.editApplication)
         this.$bvModal.hide('modal-' + this.editApplication.id)
         this.loading = false;
      },
      ...mapActions({
         updateApplication: 'applications/updateApplication'
      })
   }
}
</script>