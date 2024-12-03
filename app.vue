<template>
  <div>
    <h1>Odoo API Example</h1>
    <div v-if="loading">Loading...</div>
    <ul v-if="partners">
      <li v-for="partner in partners" :key="partner.id">{{ partner.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const partners = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { $odooApi } = useNuxtApp();
    await $odooApi.login('demo', 'demo');
    partners.value = await $odooApi.call("res.partner", "search_read", [], {
      fields: ["id", "name"],
      limit: 10,
    });
  } catch (error) {
    console.error("Error fetching partners:", error);
  } finally {
    loading.value = false;
  }
});
</script>
