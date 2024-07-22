//const BASE_URL='http://127.0.0.1:8000/api/v1';
const BASE_URL = 'https://muson-ninjas-server-production.up.railway.app/api/v1';
export const SIGN_UP_URL=`${BASE_URL}/users/signup`;
export const LOGIN_URL=`${BASE_URL}/users/login`;
export const PLAYLIST_URL = `${BASE_URL}/playlist`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/users/sendResetTokenForUser`;
export const VALIDATE_ACCESS_CODE_URL= `${BASE_URL}/users/validatePasswordAccessCode`;
export const RESET_PASSWORD_URl= `${BASE_URL}/users/resetPasswordWithCode`;