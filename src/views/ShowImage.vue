<template>
  <img
    v-if="image"
    class="image"
    :src="image.download_url"
    :alt="`By ${image.author}`"
  />
</template>

<script>
  import { toRefs, computed, watch, watchEffect } from "vue";
  import { checkImagesLoaded } from "@/store";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  export default {
    name: "ShowImage",
    props: ["id"],
    setup(props) {
      const store = useStore();
      const router = useRouter();
      const { id } = toRefs(props);
      const image = computed(() => store.getters.getImage(id.value));

      //   watch("id", () => !image.value && router.push("/"), {
      //     immediate: true,
      //   });

      watchEffect(() => {
        !image.value && router.push("/");
      });

      return { image };
    },
    beforeRouteEnter(to, from, next) {
      checkImagesLoaded.then(() => next());
    },
  };
</script>
<style scoped>
  .image {
    width: 100%;
    max-width: 75vw;
  }
</style>
