import { inject, Injectable, signal } from "@angular/core";
import { SupabaseService } from "@core/services/supabase.service";
import { AuthExceptionHandler } from "@core/utils/authException.handler";
import { AuthError, AuthSession } from "@supabase/supabase-js";
import { SignUpDTO } from "../models/sign-up.model";
import { SignInDTO } from "../models/sign-in.model";

export interface KhumoxAuthentication {
  initSession : () => void;
  signInUser  : (dto: SignInDTO) => Promise<string>;
  signUpUser  : (dto: SignUpDTO) => Promise<string>;
}

const GenericAuthError = new AuthError("Unknown Error", 500, "unknown_error");

abstract class Authentication  { 

  private _session!: AuthSession;
  private _authException!: AuthExceptionHandler;

  constructor() {
    this._authException = new AuthExceptionHandler();
  }

  get session() {
    if (!this._session) this.initSession();

    return this._session;
  }

  set session(_session: AuthSession) {
    this._session = _session;
  }

  get authException() {
    return this._authException;
  }

  public setAuthError(authError: AuthError) {
    this.authException.authError = this.authException && authError || null;
  }

  abstract initSession(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Authentication implements KhumoxAuthentication {

  private readonly supabase = inject(SupabaseService);

  public authError = signal<AuthError | null>(null);

  constructor() { super() }
  
  public override async initSession(): Promise<void> {

    const { supabase } = this.supabase;
    
    const { data: { session }, error } = await supabase.auth.getSession();

    if (session) {
      this.session = session; return;
    }

    error instanceof AuthError && this.setAuthError(error as AuthError);

    throw error || GenericAuthError
  }
  
  public async signInUser({ email, password }: SignInDTO): Promise<string> {
    
    const { supabase } = this.supabase;

    const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
      email, 
      password
    });

    if (session || user) return "Successfully!";

    error instanceof AuthError && this.setAuthError(error as AuthError);

    throw this.authException.errorMessage();
  }

  public async signUpUser({ email, password, ...data }: SignUpDTO): Promise<string> {

    const { supabase } = this.supabase;
      
    const { data: { session, user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data }
    });

    if (session || user) return "Successfully!";
    
    error instanceof AuthError && this.setAuthError(error as AuthError);

    throw this.authException.errorMessage();
  };
}