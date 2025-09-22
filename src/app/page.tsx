"use client";
import React, { useEffect } from "react";
import ChatPage from "./components/chat";
import UploadPage from "./components/upload-page";
import ListDocs from "./components/tempates/list-docs";
import { esService } from "@/service/es/es-api";

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = React.useState<any[]>([]);
  const getList = async () => {
    const r = await fetch("/api/es/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        index: "docs", // ชื่อ index
        query: { query: { match_all: {} } },
      }),
    });
    const data = await r.json();
    setData(data);
  };

  const onDelete = async (id: string) => {
    await fetch("/api/es/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        index: "docs", // ชื่อ index
        query: { id },
      }),
    });
    getList();
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <ListDocs docs={data} _onDelete={onDelete} />
    </div>
  );
};

export default Home;
