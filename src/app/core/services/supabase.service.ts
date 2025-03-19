import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const NG_APP_SUPABASE_ANON_PUBLIC_KEY = import.meta.env.NG_APP_SUPABASE_ANON_PUBLIC_KEY
const NG_APP_SUPABASE_URL             = import.meta.env.NG_APP_SUPABASE_URL

@Injectable({
  providedIn: 'root',
})
export class SupabaseService  {

  private readonly SUPABASE_URL             = NG_APP_SUPABASE_URL;
  private readonly SUPABASE_ANON_PUBLIC_KEY = NG_APP_SUPABASE_ANON_PUBLIC_KEY;

  public supabase!: SupabaseClient;

  constructor() {
    this.initClient();
  }

  private initClient() {
    this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_ANON_PUBLIC_KEY) || null;
  }

}