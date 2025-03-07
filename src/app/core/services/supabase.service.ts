import { Injectable } from "@angular/core";
import { AuthSession, createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable({
    providedIn: "root"
})
export class SupabaseService {

  static readonly SUPABASE_URL 				= import.meta.env.NG_APP_SUPABASE_URL;
  static readonly SUPABASE_PUBLIC_KEY = import.meta.env.NG_APP_SUPABASE_PUBLIC_KEY;

  public _session: AuthSession | null = null;

  private supabase!: SupabaseClient;

  constructor() { 
		this.initializeSession();
	}

  private initializeSession() {
    this.supabase = createClient(SupabaseService.SUPABASE_URL, SupabaseService.SUPABASE_PUBLIC_KEY);
  }

	get session() {
		this.supabase.auth.getSession().then(({ data }) => {
			this._session = data.session;
		})

		return this._session;
	}
}