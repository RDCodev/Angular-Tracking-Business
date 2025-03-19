import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validatePasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => 
{    
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;
    
    if (password.value === confirmPassword.value) return null 

    confirmPassword.setErrors({ passwordMismatch: true });

    return { passwordMismatch: true }
}

