import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
  const supabase = createClient(cookies());
  const requestData = await request.json();

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
    .select("id, name, role")
    .eq("id", requestData.id)
    .single();

  if (user == null) {
    return NextResponse.json({data: null, error: true}, {status: 301});
  } else {
    return NextResponse.json({data: user}, {status: 200});
  }
}
