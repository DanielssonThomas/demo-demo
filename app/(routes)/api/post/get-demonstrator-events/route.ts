import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {PostgrestError} from "@supabase/supabase-js";

export async function POST(request: Request) {
  const supabase = createClient(cookies());
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      {message: "something went wrong", data: null, error: true},
      {status: 301}
    );
  }

  const {data: user}: {data: User | null} = await supabase
    .from("User")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (user == null) {
    return NextResponse.json({data: null, error: true}, {status: 301});
  }

  const {data: data}: {data: TableClientEvent[] | null} = await supabase
    .from("Event")
    .select("*, Location (*)")
    .eq("demonstrator_id", user.id);

  if (data == null) {
    return NextResponse.json({data: null, error: true}, {status: 301});
  } else {
    return NextResponse.json({data: data}, {status: 200});
  }
}
