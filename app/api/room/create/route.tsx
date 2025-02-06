import supabase from "@/lib/supabase/serverClient";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");
  const account_id = req.nextUrl.searchParams.get("account_id");

  try {
    const { data: new_room, error } = await supabase
      .from("rooms")
      .insert({
        account_id,
        topic,
      })
      .select("*")
      .single();
    return Response.json({ new_room, error }, { status: 400 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
