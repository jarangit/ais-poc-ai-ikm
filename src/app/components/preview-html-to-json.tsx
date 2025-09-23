// แปลง HTML string เป็น JSON (DOM tree)
function htmlToJson(html: string) {
  if (typeof window === "undefined") return {};
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  function nodeToJson(node: Node): any {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }
    const el = node as Element;
    return {
      tag: el.tagName.toLowerCase(),
      attrs: Array.from(el.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {} as Record<string, string>),
      children: Array.from(el.childNodes)
        .map(nodeToJson)
        .filter((c) => c !== null && c !== ""),
    };
  }
  // return children of <body>
  return Array.from(doc.body.childNodes).map(nodeToJson);
}

export const PreviewJson = ({ value }: { value: string }) => {
  const json = typeof window !== "undefined" ? htmlToJson(value) : {};
  return (
    <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
      {JSON.stringify(json, null, 2)}
    </pre>
  );
};
