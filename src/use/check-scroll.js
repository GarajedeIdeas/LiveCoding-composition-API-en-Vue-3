export default function (fn) {
  window.addEventListener("scroll", () => {
    document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight && fn();
  });
}
