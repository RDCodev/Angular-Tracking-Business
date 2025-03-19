import { AuthError } from '@supabase/supabase-js';

export type SupabaseErrorCodes = Partial<Record<Extract<AuthError["code"], String>, string>>;

export const authMessagesError: SupabaseErrorCodes = {
  "email_exists"          : "Email already register",
  "email_address_invalid" : "Email not exists",
  "invalid_credentials"   : "Invalid Credentials",
  "user_already_exists"   : "User already register",
  "user_not_found"        : "User not found"
};

export class AuthHandlerException {

  private _authError!: AuthError;

  constructor() {}

  set authError(error: AuthError) {
    this._authError = error;
  }

  get authError(): AuthError {
    return this._authError;
  }

  public notifyErrorToUser() {
    return this.authError.code && authMessagesError[this.authError.code] || "Unknown Error";
  }

  public messageError() {
    return this.authError && this.authError.message;
  }
}
