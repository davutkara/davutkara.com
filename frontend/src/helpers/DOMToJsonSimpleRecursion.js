export default function domToJsonSimpleRecursion(dom) {
  return dom.children && dom.children.length
    ? Array.from(dom.children).reduce((acc, child) => {
        const childJson = domToJsonSimpleRecursion(child);

        // single
        if (!acc[child.tagName]) acc[child.tagName] = childJson;
        else if (Array.isArray(acc[child.tagName])) // array push
          acc[child.tagName].push(childJson);
        else acc[child.tagName] = [acc[child.tagName], childJson]; // make array

        return acc;
      }, {})
    : dom.textContent;
}
