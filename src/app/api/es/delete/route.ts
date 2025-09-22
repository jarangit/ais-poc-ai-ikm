/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { index, query }
    const { index, query } = body;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTIC_URL}/docs/_doc/${query.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `ApiKey ${process.env.NEXT_PUBLIC_ELASTIC_API_KEY!}`,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
