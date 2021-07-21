/**
 * A typewriter for innerText
 *
 * @example
 * 
 * starts after 500ms:
 * <h1 id="About" v-text-typewriter:500>About me</h1>
 * 
 * starts directly:
 * <h1 id="About" v-text-typewriter>About me</h1>
 */
export default [
  "text-typewriter",
  {
    mounted(
      el,
      binding
      //, vnode
    ) {
      const timeout = binding.arg ?? 0;
      var i = 0;
      const txt = el.innerText;
      el.innerText = "";
      function typeWriter() {
        if (i < txt.length) {
          el.innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      }

      setTimeout(typeWriter, timeout);
    },
  },
];
