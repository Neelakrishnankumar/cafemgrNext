'use client';

import { useAppDispatch } from '@/app/redux';
import type { User } from '@/types/user';
import axios from 'axios';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;
    // Make API request

    try{
      var url = `https://cafemgrlapi.beyondexs.com/api/employee/login?EMP_EMAIL=${email}&EMP_PASSWORD=${password}`
      var tokens =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZGY1OWM2MjQ4ZWE3Y2Y5MjExM2M0NWM5YmJjMGE4NTFhNjI3NDdhN2U3MWNlZTFmYWI2NmQzNjFkZTFiOWQ2NDUyY2I1YmU3MTA1NGJkNTgiLCJpYXQiOjE3MjI4NDk3NjguNzIzOTExLCJuYmYiOjE3MjI4NDk3NjguNzIzOTE2LCJleHAiOjE3NTQzODU3NjcuODY3Nzk1LCJzdWIiOiIxMSIsInNjb3BlcyI6W119.LjLzqk_fnDYPK68u9s66iyLZzwIHOTU5VCLU0cKAbtoAZDkig6N3CFE4GdQzy3wsM5zEfQmL7l7WlUIkqc_Je4j10Yg173p_uilOUjXibPhT18-MEn5UX6m-SwTsMy8GVL5OKDuPHgz88LY836MD3NAr8UKjkOdSBZ8XeN_fWMMDjRnMkqE7na9phBEEbKDsH7DcSLeb97IBCnetwtOUlqGpdxz0TZPVG0d4vz7I5EfWnPHJhDJjPCOYBo-WHwr-NvNOQPgcKmuLn5rKVFLOAse7s0ACqCH6RNVusXv_uy37Nh3Q_hk4cTIWeGSc2Fbk0OikzCC5WRTSbzGyEql7G7nVLRuVzPXdoiWwE3tppHtavdcQOW9bY0by6AgoPl3lohIWe1R9lAp-5LEOezxIxIA78Y2bI-dq_uqAHdxtfVKI6UDNqbRow8ssGe_mzzmm_NDHXcUgZb9rz_idfZgACIXmoViZgZSY3gTtQOx7xicE81v4zek0S6oW4Z-OBNNWxrWmhGkedbv4J0gyqWCIc-hX2_1uCmAyW8_87MhFu5gMd95bls-09pZsJVYbnuzLfALnOgbrTuB-IRaFxswQX4elAImtxI-obQ7iGD8u2lw3WOmrWQFI-WlBLBQ-WF2BQ5Q7q5rGN9kRSArwCj33ItV7gWPOuOXDQAtiAaSOGNk';

      const response = await axios.get(url, { headers: { Authorization: `Bearer ${tokens}` } });


    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    if (email !== response.data.user.EMP_EMAIL|| password !== response.data.user.EMP_PASSWORD) {
      return { error: 'Invalid credentials' };
    }

    const token = generateToken();
    localStorage.setItem('email', response.data.user.EMP_EMAIL);
    localStorage.setItem('password', response.data.user.EMP_PASSWORD);

    return response.data.user;
    }catch(err){
      return { error: 'Invalid credentials' }
    }

  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (!email && !password) {
      return { data: null };
    }


    try{
      var url = `https://cafemgrlapi.beyondexs.com/api/employee/login?EMP_EMAIL=${email}&EMP_PASSWORD=${password}`
      var tokens =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZGY1OWM2MjQ4ZWE3Y2Y5MjExM2M0NWM5YmJjMGE4NTFhNjI3NDdhN2U3MWNlZTFmYWI2NmQzNjFkZTFiOWQ2NDUyY2I1YmU3MTA1NGJkNTgiLCJpYXQiOjE3MjI4NDk3NjguNzIzOTExLCJuYmYiOjE3MjI4NDk3NjguNzIzOTE2LCJleHAiOjE3NTQzODU3NjcuODY3Nzk1LCJzdWIiOiIxMSIsInNjb3BlcyI6W119.LjLzqk_fnDYPK68u9s66iyLZzwIHOTU5VCLU0cKAbtoAZDkig6N3CFE4GdQzy3wsM5zEfQmL7l7WlUIkqc_Je4j10Yg173p_uilOUjXibPhT18-MEn5UX6m-SwTsMy8GVL5OKDuPHgz88LY836MD3NAr8UKjkOdSBZ8XeN_fWMMDjRnMkqE7na9phBEEbKDsH7DcSLeb97IBCnetwtOUlqGpdxz0TZPVG0d4vz7I5EfWnPHJhDJjPCOYBo-WHwr-NvNOQPgcKmuLn5rKVFLOAse7s0ACqCH6RNVusXv_uy37Nh3Q_hk4cTIWeGSc2Fbk0OikzCC5WRTSbzGyEql7G7nVLRuVzPXdoiWwE3tppHtavdcQOW9bY0by6AgoPl3lohIWe1R9lAp-5LEOezxIxIA78Y2bI-dq_uqAHdxtfVKI6UDNqbRow8ssGe_mzzmm_NDHXcUgZb9rz_idfZgACIXmoViZgZSY3gTtQOx7xicE81v4zek0S6oW4Z-OBNNWxrWmhGkedbv4J0gyqWCIc-hX2_1uCmAyW8_87MhFu5gMd95bls-09pZsJVYbnuzLfALnOgbrTuB-IRaFxswQX4elAImtxI-obQ7iGD8u2lw3WOmrWQFI-WlBLBQ-WF2BQ5Q7q5rGN9kRSArwCj33ItV7gWPOuOXDQAtiAaSOGNk';

      const response = await axios.get(url, { headers: { Authorization: `Bearer ${tokens}` } });



  
    

    return { data: response.data.user };
    }catch(err){
      return { error: 'Invalid credentials' }
    }

  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('password');
    localStorage.removeItem('email');
   


    // dispatch({ type: LOGOUT })
    return {};
  }
}

export const authClient = new AuthClient();
