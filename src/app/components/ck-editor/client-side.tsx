// components/client-side-custom-editor.js
"use client"; // Required only in App Router.

import dynamic from "next/dynamic";

export type ClientSideCustomEditorProps = {
  value?: string;
  onChange: (val: string) => void;
};
const ClientSideCustomEditor = dynamic(() => import("./ck-editor"), {
  ssr: false,
});

export default function ClientSideCustomEditorWrapper(props: ClientSideCustomEditorProps) {
  return <ClientSideCustomEditor {...props} />;
}
