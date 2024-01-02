import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {PostgrestError} from "@supabase/supabase-js";

export async function POST(request: Request) {
  const supabase = createClient(cookies());
  const reqForm = await request.json();
  const returnMessage = "";
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      {message: "something went wrong", data: null, error: true},
      {status: 301}
    );
  }

  const eventId = reqForm.eventId;
  const userName = reqForm.userName;

  const {error} = await supabase.from("Event").update({demonstrator: userName}).eq("id", eventId);

  return NextResponse.json({error: error, message: returnMessage});
  // return NextResponse.json({message: returnMessage});
}
