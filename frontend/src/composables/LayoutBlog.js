import { ref } from "vue";

export const isSidebarShown = ref(window.innerWidth > 800);

export const LayoutBlogSetup = function() {
  const toggleSidebarShown = () => {
    isSidebarShown.value = !isSidebarShown.value;
  };
  return { isSidebarShown, toggleSidebarShown };
};
