/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { index, query }
    const { index, query } = body;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTIC_URL}/docs/_search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `ApiKey ${process.env.NEXT_PUBLIC_ELASTIC_API_KEY!}`,
        },
        body: JSON.stringify(query),
      }
    );

    const data = await res.json();
    return NextResponse.json(
      data?.hits?.hits.map((hit: any) => ({
        id: hit._id,
        ...hit._source,
      })),
      { status: res.status }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
