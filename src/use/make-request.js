import { ref } from "vue";
export default function () {
  const loading = ref(false);
  const error = ref(null);
  async function startRequest(url) {
    try {
      const request = await fetch(url);
      return await request.json();
    } catch (error) {
      error.value = error.toString();
    } finally {
      loading.vale = false;
    }
  }
  return { loading, error, startRequest };
}
