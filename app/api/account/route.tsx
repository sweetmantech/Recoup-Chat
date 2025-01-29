import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;
  const client = getSupabaseServerAdminClient();

  try {
    const { data: found } = await client
      .from("account_emails")
      .select("*")
      .eq("email", email)
      .single();
    if (found) {
      const { data: account } = await client
        .from("accounts")
        .select("*, account_info(*), account_emails(*)")
        .eq("id", found.account_id)
        .single();
      return Response.json(
        {
          data: {
            ...account.account_info[0],
            ...account.account_emails[0],
            ...account,
          },
        },
        { status: 200 },
      );
    }

    const { data: newAccount } = await client
      .from("accounts")
      .insert({
        email,
        timestamp: Date.now(),
        artistIds: [],
      })
      .select("*")
      .single();

    await client.from("credits_usage").insert({
      account_id: newAccount.id,
      remaining_credits: 1,
    });
    return Response.json({ data: newAccount }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
