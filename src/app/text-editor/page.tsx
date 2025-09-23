"use client";
import React, { useState } from "react";
import ClientSideCustomEditor from "../components/ck-editor/client-side";
import PreviewContent from "../components/preview-content";
import { PreviewJson } from "../components/preview-html-to-json";

type ViewMode = "preview" | "editor" | "json";
const initialData = `<h2>Welcome to CKEditor 5 Demo 🎉</h2>
<p>This editor is ready to use all features. Try editing below!</p>

<h3>Table Example (with merged columns)</h3>
<table>
  <thead>
    <tr>
      <th colspan="2">Merged Header</th>
      <th>Normal Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Rowspan Cell</td>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
    <tr>
      <td colspan="2">Merged Cell</td>
    </tr>
  </tbody>
</table>

<h3>List, Blockquote, and Code</h3>
<ul>
  <li>Unordered list item</li>
  <li>Another item</li>
</ul>
<ol>
  <li>Ordered list item</li>
  <li>Another ordered item</li>
</ol>
<blockquote>This is a blockquote. You can style it!</blockquote>
<pre><code>console.log('Hello CKEditor!');</code></pre>

<h3>Image Example</h3>
<p><img src="https://ckeditor.com/docs/ckeditor5/latest/assets/img/ckeditor5-sample.png" alt="Sample" /></p>

<h3>Link Example</h3>
<p>Visit <a href="https://ckeditor.com/">CKEditor Homepage</a></p>

<h3>Try all toolbar features above!</h3>
<p>Highlight, font, alignment, emoji, and more are enabled.</p>
`;

const Page = () => {
  const [content, setContent] = useState(initialData);
  const [viewMode, setViewMode] = useState<ViewMode>("editor");

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-5 mt-5">
          <button
            className={`px-4 py-2 text-sm font-medium text-white rounded ${
              viewMode === "editor" ? "bg-blue-700 outline outline-2 outline-solid outline-white" : "bg-blue-600"
            } hover:bg-blue-700`}
            onClick={() => setViewMode("editor")}
          >
            Editor
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium text-white rounded ${
              viewMode === "preview" ? "bg-blue-700 outline outline-2 outline-solid outline-white" : "bg-blue-600"
            } hover:bg-blue-700`}
            onClick={() => setViewMode("preview")}
          >
            Preview
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium text-white rounded ${
              viewMode === "json" ? "bg-blue-700 outline outline-2 outline-solid outline-white" : "bg-blue-600"
            } hover:bg-blue-700`}
            onClick={() => setViewMode("json")}
          >
            JSON
          </button>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
          Save
        </button>
      </div>

      {viewMode === "preview" && <PreviewContent value={content} />}
      {viewMode === "editor" && (
        <ClientSideCustomEditor value={initialData} onChange={setContent} />
      )}
      {viewMode === "json" && <PreviewJson value={content} />}
    </div>
  );
};

export default Page;
