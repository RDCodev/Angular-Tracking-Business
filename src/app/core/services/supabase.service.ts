import { Injectable } from "@angular/core";
import { AuthHandlerException } from "@core/utils/authException.handler";
import { SignUpDTO } from "@features/access/auth/models/sign-up.model";
import { AuthError, AuthSession, createClient, SupabaseClient } from "@supabase/supabase-js";

const NG_APP_SUPABASE_ANON_PUBLIC_KEY = import.meta.env.NG_APP_SUPABASE_ANON_PUBLIC_KEY
const NG_APP_SUPABASE_URL             = import.meta.env.NG_APP_SUPABASE_URL

interface AuthService { }

@Injectable({
  providedIn: 'root',
})
export class SupabaseService implements AuthService{

  private readonly SUPABASE_URL             = NG_APP_SUPABASE_URL;
  private readonly SUPABASE_ANON_PUBLIC_KEY = NG_APP_SUPABASE_ANON_PUBLIC_KEY;

  private _session: AuthSession | null = null;
  private _authHandler = new AuthHandlerException();

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

  public async signInUser(): Promise<string> {
    return "";
  }

  public async signUpUser(signInDTO: SignUpDTO): Promise<string> {

    try {

      const { data, error } = await this.supabase.auth.signUp({ ...signInDTO });

      if (error) throw error;

      return "Register Successfully"

    } catch (error) {

      this._authHandler.authError = (error as AuthError);

      return this._authHandler.notifyErrorToUser();
    }
  }

}