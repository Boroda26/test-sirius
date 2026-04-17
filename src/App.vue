<template>
  <div class="container my-5">
    <h2 class="mb-4">Список заявок партнеров</h2>
    <TableApp />
  </div>
</template>

<script>
import TableApp from './components/TableApp.vue'

export default {
  components: {
    TableApp
  },
}
</script>