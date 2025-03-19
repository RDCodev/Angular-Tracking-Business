import { inject, Injectable } from "@angular/core";
import { SupabaseService } from "@core/services/supabase.service";
import { AuthExceptionHandler } from "@core/utils/authException.handler";
import { AuthSession } from "@supabase/supabase-js";

export interface KhumoxAuthentication {
  initSession : () => void;
  signInUser  : () => Promise<string>;
  signUpUser  : () => Promise<string>;
}

abstract class Authentication  { 

  protected _session!: AuthSession;
  protected _authException!: AuthExceptionHandler;

  constructor() {
    this._authException = new AuthExceptionHandler();
  }

  get session() {

    if (!this._session) this.initSession();

    return this._session;
  }

  abstract initSession(): void;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Authentication implements KhumoxAuthentication {

  private readonly supabase = inject(SupabaseService);

  public initSession() {

  }
  
  public async signInUser(): Promise<string> {
    return "";
  }

  public async signUpUser(): Promise<string> {
    return "";
  };
}