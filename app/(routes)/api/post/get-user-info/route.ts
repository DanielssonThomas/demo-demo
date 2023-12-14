import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
  const supabase = createClient(cookies());
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const {data: user}: {data: User | null} = await supabase
    .from("User")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (user == null) {
    return new Response(JSON.stringify({message: "Something went wrong"}));
  } else if (user.role == null || user.role == "") {
    return new Response(JSON.stringify({message: "Something went wrong"}));
  }

  return NextResponse.json({data: user.role});
}
