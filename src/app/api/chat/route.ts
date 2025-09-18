import "dotenv/config";
import OpenAI from "openai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { AzureOpenAI } from "openai";

const {
  AS_NAMESPACE,
  AS_DB_CONNECTION,
  AS_TOKEN,
  AS_ENDPOINT,
  OPENAI_API_KEY,
  OPENAI_API_URL,
} = process.env;

const openai = new AzureOpenAI({
  apiKey: OPENAI_API_KEY,
  endpoint: "https://openai-mya-az-auea-dev-001.openai.azure.com/",
  apiVersion: "2023-05-15",
});
const client = new DataAPIClient(AS_TOKEN);
if (!AS_ENDPOINT || !AS_NAMESPACE) {
  throw new Error(
    "AS_ENDPOINT and AS_NAMESPACE environment variables must be defined"
  );
}
const db = client.db(AS_ENDPOINT, { keyspace: AS_NAMESPACE });

export async function POST(request: Request) {
  let docContext = "";
  try {
    const { msg } = await request.json();
    const latestMsg = msg[msg.length - 1]?.content;
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: latestMsg,
      encoding_format: "float",
    });

    try {
      if (!AS_DB_CONNECTION) {
        throw new Error(
          "AS_DB_CONNECTION environment variable must be defined"
        );
      }
      const collection = await db.collection(AS_DB_CONNECTION);
      const cursor = collection.find(
        {},
        {
          sort: {
            $vector: embedding.data[0].embedding,
          },
          limit: 10,
        }
      );
      const documents = await cursor.toArray();
      const docsMap = documents.map((doc) => doc.text);
      docContext = docsMap.join("\n\n");
    } catch (innerError) {
      console.error("Error in inner try block:", innerError);
      docContext = "Error retrieving context from database.";
    }

    const template = {
      role: "system",
      content: `You are a helpful assistant. Use the following context to answer the question. If you don't know, say you don't know.\n\nContext:\n${docContext}`,
    };
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [template, ...msg],
      stream: true,
    });

    let result = "";
    for await (const chunk of response) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        result += content;
      }
    }

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }); // End of inner try block
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
  }
}
