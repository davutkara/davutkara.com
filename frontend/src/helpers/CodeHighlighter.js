import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);

export default (block) => hljs.highlightElement(block);
