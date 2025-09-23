"use client";
import React, { useState } from "react";
import ClientSideCustomEditor from "../components/ck-editor/client-side";
import PreviewContent from "../components/preview-content";
import { PreviewJson } from "../components/preview-html-to-json";
import { mockEditorData } from "@/mock/editor";

type ViewMode = "preview" | "editor" | "json";
const initialData = mockEditorData;

const Page = () => {
  const [content, setContent] = useState(initialData);
  const [viewMode, setViewMode] = useState<ViewMode>("editor");

  const onSave = () => {
    console.log("Saving content:", content);
  };

  return (
    <div>
      <div className="flex justify-between my-4 items-center ">
        <div className="flex gap-2 ">
          <button
            className={`px-4 py-2 text-sm font-medium text-blue-600 border-blue-600 border-2 rounded ${
              viewMode === "editor"
                ? "bg-blue-600  outline-solid text-white"
                : "bg-white text-blue-600"
            } hover:bg-blue-300`}
            onClick={() => setViewMode("editor")}
          >
            Editor
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium text-blue-600 border-blue-600 border-2 rounded ${
              viewMode === "preview"
                ? "bg-blue-600  outline-solid text-white"
                : "bg-white text-blue-600"
            } hover:bg-blue-300`}
            onClick={() => setViewMode("preview")}
          >
            Preview
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium text-blue-600 border-blue-600 border-2 rounded ${
              viewMode === "json"
                ? "bg-blue-600  outline-solid text-white"
                : "bg-white text-blue-600"
            } hover:bg-blue-300`}
            onClick={() => setViewMode("json")}
          >
            JSON
          </button>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 h-fit"
          onClick={onSave}
        >
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
