import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;
  const client = getSupabaseServerAdminClient();

  try {
    const { data: found } = await client
      .from("account_emails")
      .select("*, accounts(name)")
      .eq("email", email)
      .single();
    if (found) {
      const { data: account_info } = await client
        .from("account_info")
        .select("image, instruction, organization")
        .eq("account_id", found.account_id)
        .single();
      found.name = found.accounts.name;
      delete found.accounts;
      delete found.id;
      return Response.json(
        {
          data: {
            ...found,
            ...account_info,
          },
        },
        { status: 200 },
      );
    }

    const { data: newAccount } = await client
      .from("accounts")
      .insert({
        name: "",
      })
      .select("*")
      .single();

    await client
      .from("account_emails")
      .insert({
        account_id: newAccount.id,
        email,
      })
      .select("*")
      .single();

    await client.from("credits_usage").insert({
      account_id: newAccount.id,
      remaining_credits: 1,
    });
    return Response.json(
      {
        data: {
          account_id: newAccount.id,
          email,
          image: "",
          instruction: "",
          organization: "",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
