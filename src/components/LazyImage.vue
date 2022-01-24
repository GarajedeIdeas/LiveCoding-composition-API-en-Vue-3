<template>
  <div class="placeholder">
    <img ref="element" class="image" :src="srcImage" />
  </div>
</template>

<script>
  import { ref, computed, toRefs, onMounted, onUnmounted } from "vue";
  import useIntersection from "@/use/use-intersection.js";
  export default {
    props: ["src"],
    name: "LazyImage",
    setup(props) {
      const { src } = toRefs(props);
      const element = ref(null);
      const { intersected, startObserver, stopObserver } = useIntersection();
      const srcImage = computed(() => (intersected.value ? src.value : ""));

      onMounted(() => {
        startObserver(element.value);
      });

      onUnmounted(() => stopObserver());

      return { srcImage, element };
    },
  };
</script>

<style scoped>
  .placeholder {
    height: 30rem;
    width: 60rem;
    background-color: lightgray;
    margin: 3rem auto;
  }
  .image {
    height: 30rem;
    width: 60rem;
    object-fit: cover;
  }
</style>
