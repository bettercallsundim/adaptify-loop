import { createClient } from "./supabase/client";
import { createClient as createClientServer } from "./supabase/server";

export async function getUserServer() {
  try {
    const supabase = await createClientServer();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return null;
    }
    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getUserClient() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return null;
    }
    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
