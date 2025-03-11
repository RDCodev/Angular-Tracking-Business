import { inject, Injectable } from "@angular/core";
import { SignUpDTO } from "@features/access/login/models/sign-up.model";
import { AuthSession, createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  static readonly SUPABASE_URL = import.meta.env.NG_APP_SUPABASE_URL;
  static readonly SUPABASE_ANON_PUBLIC_KEY = import.meta.env
    .NG_APP_SUPABASE_ANON_PUBLIC_KEY;

  public _session: AuthSession | null = null;
  public supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      SupabaseService.SUPABASE_URL,
      SupabaseService.SUPABASE_ANON_PUBLIC_KEY
    );
  }

  get session() {
    if (!this._session) {
      this.initSupabaseSession();
    }

    return this._session;
  }

  private async initSupabaseSession() {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();

    this._session = session;
  }

  private async createUser(payload: SignUpDTO) {
    await this.supabase.auth.signUp({
      email: payload.username,
      password: payload.password
    })
  }
}