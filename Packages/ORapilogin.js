import { error } from "node:console";

export async function getnewtoken(request) {

    const loginResponse = await request.post(
    'http://213.55.73.249/auth/connect/token',
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'password',
        scope: 'openid profile email offline_access erp_api',
        username: 'ase2@gmail.com',
        password: 'P@ssw0rd',
        client_id: 'skoruba_identity_admin',
        client_secret: 'skoruba_admin_client_secret'
      }
    }
  );
    const jsonresponse=await loginResponse.json();
    const token= await jsonresponse.access_token;
    if(!token)

    {
        console.error('the result hs no token');

    }
    return token;
  
}