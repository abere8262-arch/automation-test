import { error } from "node:console";
import { request } from "node:http";



export class GetToken{
  constructor(request){
    this.request=request;
  }
  async getAuthToken()
   {
      //const clientid='skoruba_identity_admin';
      //const clientsecret='skoruba_admin_client_secret';
      //const basicauth=buffer.form(`${clientid}:${clientsecret}`).toString()
      const start = Date.now();
    
         const response= await this.request.post('https://training-bo.egp.gov.et/auth/connect/token',{
          headers:{
            'content-type':'application/x-www-form-urlencoded'},

        form:{
         'grant_type':'password',
        scope:'openid profile email offline_access erp_api',
        username: 'esku123@gmail.com',
        password:'Pass@123',
        'client_id':'skoruba_identity_admin',
        'client_secret':'skoruba_admin_client_secret'


        }
    });
  const jsonresponse=await response.json();
    const token= await jsonresponse.access_token;
    if(!token)


      

    {
        console.error('the result has no token');

    }
    return token;
  }
  }