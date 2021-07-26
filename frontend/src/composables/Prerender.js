import { onMounted } from "vue";

export default function() {
  onMounted(() => {
    document.dispatchEvent(new Event("custom-render-trigger"));
  });
}
