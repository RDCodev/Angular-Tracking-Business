import { inject, Injectable } from "@angular/core";
import { SignUpDTO } from "@features/access/login/models/sign-up.model";
import { AuthSession, createClient, SupabaseClient } from "@supabase/supabase-js";

const NG_APP_SUPABASE_ANON_PUBLIC_KEY = import.meta.env.NG_APP_SUPABASE_ANON_PUBLIC_KEY
const NG_APP_SUPABASE_URL             = import.meta.env.NG_APP_SUPABASE_URL

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private readonly SUPABASE_URL             = NG_APP_SUPABASE_URL;
  private readonly SUPABASE_ANON_PUBLIC_KEY = NG_APP_SUPABASE_ANON_PUBLIC_KEY;

  private _session: AuthSession | null = null;

  public supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_ANON_PUBLIC_KEY);
  }

  get session() {

    if (!this._session) this.initSupabaseSession();

    return this._session;
  }

  private async initSupabaseSession() {

    const { 
      data: { session }, 
      error 
    } = await this.supabase.auth.getSession();

    this._session = session;
  }

  public async createUser(signInDTO: SignUpDTO) {
    const { 
      data: { session, user }, 
      error 
    } = await this.supabase.auth.signUp({ ...signInDTO });

    this._session = session;
  }
}