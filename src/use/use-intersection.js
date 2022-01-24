import { reactive, toRef } from "vue";
export default function () {
  const data = reactive({
    observer: null,
    intersected: false,
  });

  function startObserver(element) {
    data.observer = new IntersectionObserver(
      (entries) => {
        const image = entries[0];
        if (image.isIntersecting) {
          data.intersected = true;
          stopObserver();
        }
      },
      {
        rootMargin: "50px",
      }
    );
    data.observer.observe(element);
  }

  function stopObserver() {
    data.observer.disconnect();
  }

  return { intersected: toRef(data, 'intersected'), startObserver, stopObserver}
}
