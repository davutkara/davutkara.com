/**
 * List active class
 * Manage activity of list elements
 * @example
 * <li v-list-class.a.b.c="true">
 */
 export default [
    "list-state",
    {
      /**
       * 
       * @param {Element} el 
       * @param {*} binding 
       */
      beforeMount(
        el,
        binding
        //, binding, vnode
      ) {
        const classList = Object.keys(binding.modifiers);
        if(binding.value) {
          el.classList.add(classList)
        }
        el.addEventListener('click',() => {
          for(const sibling of  el.parentElement.children) 
            sibling.classList.remove(classList);
          el.classList.add(classList);
        })
      },
    },
  ];
  