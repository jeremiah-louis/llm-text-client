import Wetrocloud from "wetro-sdk";
import { NextResponse } from 'next/server';

// Initialize the Wetrocloud client
const client = new Wetrocloud({
  apiKey: process.env.WETRO_API_KEY || "",
});

export default async function POST(req: Request) {
  const { collection_id, resource, resource_type } = await req.json();

  try {
    const response = await client.insertResource({
      collection_id,
      resource,
      type: resource_type,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error inserting resource:", error);
    return NextResponse.json({ error: "Failed to insert resource" });
  }
};
