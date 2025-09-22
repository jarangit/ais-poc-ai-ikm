"use client";
import React, { useRef } from "react";
import ClientSideCustomEditor from "../components/ck-editor/client-side";

type Props = {};

const Page = (props: Props) => {
  const editorRef = useRef(null);
  return (
    <div>
      <ClientSideCustomEditor />
    </div>
  );
};

export default Page;
