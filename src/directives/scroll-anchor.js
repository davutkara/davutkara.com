/**
 * A link auto anchor scroll.
 * 
 * @example
 * <a v-scroll-anchor href="#deneyim">Deneyim</a>
 */
export default [
  "scroll-anchor",
  {
    beforeMount(
      el
      //, binding, vnode
    ) {
      const anchorId = el.getAttribute("href");

      el.addEventListener("click", (e) => {
        e.preventDefault();

        const titleEl = document.querySelector(anchorId);
        const tabsHight = document.getElementById("tabs").clientHeight;
        document.getElementById("text-bar").scrollTo({
          top: titleEl.offsetTop - tabsHight - 16,
          left: titleEl.offsetLeft,
          behavior: "smooth",
        });
      });
    },
  },
];
