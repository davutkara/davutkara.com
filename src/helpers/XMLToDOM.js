export default (XMLStr) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(XMLStr, "application/xml");
  return dom;
};
