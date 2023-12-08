import { Database } from "@/types/supabase";

declare global {
  type ClientEvent = Database["public"]["Tables"]["Event"]["Row"];
  type User = Database["public"]["Tables"]["User"]["Row"];
  type Location = Database["public"]["Tables"]["Location"]["Row"];
}
