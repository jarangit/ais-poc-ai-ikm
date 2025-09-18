/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { resource } from "./resource";
import { AzureOpenAI } from "openai";

type similarityMetric = "cosine" | "euclidean" | "dot_product";

const {
  AS_NAMESPACE,
  AS_DB_CONNECTION,
  AS_TOKEN,
  AS_ENDPOINT,
  OPENAI_API_KEY,
} = process.env;

if (!AS_DB_CONNECTION) {
  throw new Error("AS_DB_CONNECTION environment variable must be defined");
}

const openai = new AzureOpenAI({
  apiKey: OPENAI_API_KEY,
  endpoint: "https://openai-mya-az-auea-dev-001.openai.azure.com/",
  apiVersion: "2023-05-15",
});
const db_data = resource;
const client = new DataAPIClient(AS_TOKEN);
if (!AS_ENDPOINT || !AS_NAMESPACE) {
  throw new Error(
    "AS_ENDPOINT and AS_NAMESPACE environment variables must be defined"
  );
}
const db = client.db(AS_ENDPOINT, { keyspace: AS_NAMESPACE });

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400,
  chunkOverlap: 100,
});

const createCollection = async (similarity: similarityMetric) => {
  await db.createCollection(AS_DB_CONNECTION, {
    vector: {
      dimension: 1536,
      metric: similarity,
    },
  });
};

const loadSampleData = async () => {
  const collection = db.collection(AS_DB_CONNECTION);
  for (const url of db_data) {
    const content: any = await scrapperPage(url);
    const chunks = await splitter.splitText(content);
    console.log("🚀 ~ loadSampleData ~ chunks:", chunks);
    for (const chunk of chunks) {
      const embedding = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: chunk,
        encoding_format: "float",
      });
      const vector = embedding.data[0].embedding;
      const res = await collection.insertOne({
        $vector: vector,
        text: chunk,
      });
      console.log(res);
    }
  }
};

const scrapperPage = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: { headless: "new" },
    gotoOptions: { waitUntil: "domcontentloaded" },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => {
        return document.body.innerText; // เปลี่ยนจาก innerHTML เป็น innerText
      });
      await browser.close();
      return result;
    },
  });
  return await loader.scrape();
};

createCollection("cosine").then(() => loadSampleData());
