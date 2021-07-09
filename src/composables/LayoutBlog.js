import { ref } from "vue";

export const isSidebarShown = ref(false);

export const LayoutBlogSetup = function() {
  const toggleSidebarShown = () => {
    isSidebarShown.value = !isSidebarShown.value;
  };
  return { isSidebarShown, toggleSidebarShown };
};
