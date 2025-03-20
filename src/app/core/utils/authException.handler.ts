import { AuthError } from '@supabase/supabase-js';

export class AuthExceptionHandler {

  private _authError!: AuthError;

  constructor() { }

  set authError(error: AuthError) {
    this._authError = error;
  }

  get authError(): AuthError {
    return this._authError;
  }

  public errorMessage() {
    return this._authError.message || "Unknown Error";
  }
}
