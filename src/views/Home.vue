<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/logo.png" />

    <h1 class="title">{{ totalImages }} Image List</h1>

    <h2 class="loading" v-if="loading">CARGANDO</h2>
    <h2 class="error" v-else-if="error">{{ error }}</h2>

    <router-link
      v-for="image in images"
      :key="image.id"
      :to="`/image/${image.id}`"
    >
      <lazy-image :src="image.download_url" />
    </router-link>
  </div>
</template>

<script>
  import { ref, onMounted, computed } from "vue";
  import { useStore } from "vuex";
  import checkScroll from "@/use/check-scroll.js";
  import makeRequest from "@/use/make-request.js";
  import LazyImage from "@/components/LazyImage.vue";
  export default {
    name: "Home",
    setup() {
      const store = useStore();
      const currentPage = ref(1);
      const { startRequest, loading, error } = makeRequest();
      const images = computed(() => store.state.images);
      const totalImages = computed(() => images.value.length || 10);

      onMounted(() =>
        checkScroll(async () => {
          currentPage.value++;
          const images = await startRequest(
            `https://picsum.photos/v2/list?limit=10&page=${currentPage.value}`
          );
          store.commit("addImages", images);
        })
      );

      return { loading, error, images, totalImages };
    },
    components: {
      LazyImage,
    },
  };
</script>

<style scoped>
  .loading,
  .error {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    text-align: center;
    margin: 0;
  }

  .loading {
    background-color: black;
    color: gray;
  }

  .error {
    background-color: tomato;
    color: white;
  }
</style>
