import { test, expect , request as apirequest} from '@playwright/test';
import { GetToken } from '../Packages/apilogin';
import { get, request } from 'node:http';
import { getActiveResourcesInfo } from 'node:process';
import { join } from 'node:path';
import { constants } from 'node:buffer';
import console from 'node:console';
import { json } from 'node:stream/consumers';
//import { request } from 'node:http';
//import { join } from 'node:path';
//import { buffer } from 'node:stream/consumers';
let token,tokenManager;
test.beforeAll(async({request})=>{
    //tokenManager = await new GetToken(request);
   // token= await tokenManager.getAuthToken(request);
    //console.log(token);



});

test('api user info', async ({ request }) => {
  const access_token = new GetToken(request);
  await access_token.getAuthToken(request);
  console.log('token is:', access_token);
  const response = await request.get('https://training-bo.egp.gov.et/auth/connect/userinfo', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      //accept:'application/json, text/plain, */*',
    }


  }
  );
  // expect(response).toBeOK();
  //const jsonresponse=await response.json();
  console.log('the resalt ia:', response);
  const jsonresolt = await response.json();
  console.log('json response is:', jsonresolt);
}
);
test("login api", async ({ request }) => {

  //const clientid='skoruba_identity_admin';
  //const clientsecret='skoruba_admin_client_secret';
  //const basicauth=buffer.form(`${clientid}:${clientsecret}`).toString()
  const start = Date.now();

  const response = await request.post(
    'https://training-bo.egp.gov.et/auth/connect/token',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',


        connection: 'keep-alive',
        cookie: 'idsrv.session=3jDuWNvIYkXZCX8vZbG7zQ; .AspNetCore.Identity.Application=CfDJ8HWPejbsY5VDmGb6SN5DqEjcypQZk0-B3BZGiT1ckJiISvYV0CWp_K2DIZKEji3yPynuMEDbAJkHu2ytPAyDhx2E9jKWPHCTbUYSaQwXHZXyCmIf1KUFTQ29nrdlh4EsQTOJ2T6KOkQ4N-fA4JuxNh6fiP5YqxCvVPdkEdjoXncfSUV9MF6cKB6xES3SZT3w-82ZB_h8fg9mevmtjVDXz1nxj3Qs3H_7XjgBUp0ktOxdQSo5z_qPZts8B-WwsDSpk0aXUUWB0Pu2tyl1FoCxWkW7dMcQGg1ocVL6_0DFPJBLTQqwsgNQBsAfIq0hGQ9aGsCHuDuSSvnmblhuHG3wBx_RNSr6DXmLp6FRekwjBFsSruPPe0vIBJ-p8okNgq31eq4xEZPfRIkgoJMjFyflv3Mvm0UZy-QimbMi3c5HEBm8SHIp_4K5YA2EV28xuy9P3CZEkzzrrn4IuB1VYqKK_cssvyM1ZeqwrhWk0csoTYK3SFO7QXG97AGwVgSeRnIXxCv9w9TL4cNJG7s9U0KZNHZKvPQ2YyekIgGGhTjUrfYbL_uwM7yIPjfYHGt3deR8N0IgW-jxyIOM08OIoGdaFzyJUFouS7EUXIV6rkEz2cLOP8CvpmtJfceHEhCMyKYZcHFLGxOu1dDn_VG_TpsnT05b8eSVDcsbDOf4cWtZhc6s2AfK8J9VdmCwzI6M_hF1gl36cZ6oi8D36PwylgqTA-lFbgQ_hc-Z7CX8njCqZnpQV-wmVA4e_AlXucw0wO4s4bPF2eiSieaDrCTa6QVbbceukFmqctky8nxosiMMHJRV0_v7MfnaaPBxtlYzwwAYLJ9HpmEW38kWiDxZQ1gB_5oAUq3SdWbOuMS6HNHnVA5bCPA5Xb342Q2H5VLiyKPfNOntiaD8mXM38gJUAf122jtFaDDbB03hEqUQSrsB0-y6; cf_clearance=d2yDEVsf4g_roUxxUyIxc22XVUQehDxCrLIvV4BE5_E-1764759680-1.2.1.1-i2lDyUxej0KQGJrEGnQ7mqO0y5QVvb57NGco5aq49b9I3kRi.Rfkt07EPDOHt5o_0hyOgTJVINzQoQM7jg2I_WHlleSbwSglIyF.J60nPHojEWQRex4PNCi0YiBDgtC5P8frXR7wWsEI2ExtJLNbn.Q3eFS.bOE_LnwNHx2v4QDarAbXOHeIedmw4LP7GRl8781Aalqpxc.e6kX4TvBaVcdePb0M2CPS7LnJBFTFrgQ; cfz_zaraz-analytics=%7B%22_cfa_clientId%22%3A%7B%22v%22%3A%2248738172973237310%22%2C%22e%22%3A1793857308810%7D%2C%22_cfa_sId%22%3A%7B%22v%22%3A%2213855776532246900%22%2C%22e%22%3A1764769251856%7D%7D',


      },
      form: {
        scope: 'openid profile email offline_access erp_api',
        client_id: 'skoruba_identity_admin',
        client_secret: 'skoruba_admin_client_secret',

        grant_type: 'password',
        username: 'esku123@gmail.com',
        password: 'Pass@123'
      }
    }
  );

  // Check status
  //await expect(response).toBeOK();
  //await expect(response).toBe(200);
  console.log(response.status());
  console.log(response.statusText());

  const jsonresponse = await response.json();
  const cookeis = response.headers()['set-cookie'];
  console.log(cookeis);
  /*
   expect(jsonresponse).toHaveProperty('access_token');
   console.log(jsonresponse.expires_in);
    expect(typeof jsonresponse.access_token).toBe('string');
    expect(typeof jsonresponse).toBe('object');
  console.log(jsonresponse);
  */
  const accestoken = jsonresponse.access_token;

  const end = Date.now
  //console.log('the token is:'+accestoken);

  /*expect(end-start).toBeLessThan(3000);
   const headers=response.headers();
   console.log(headers['content-type']);
 */

  //console.log('token of tis test is :',accestoken);


});
test('set procurment technical team', async ({ request }) => {

  //const token = await getToken(request);

  const response = await request.post(
    'https://training-bo.egp.gov.et/bo-gw/tendering-int/api/packages/set-procurement-technical-team',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',


      },
      data:
        [
          {
            "packageId": "23b7f90c-ac47-47be-a1c7-bf8d727e330f",
            "personnelId": "fe35a22a-7f1f-4b35-a916-07c13d6cd272",
            "personnelName": "mati mati",
            "status": "Accepted",
            "isTeamLead": false,
            "position": "Member"
          },
          {
            "packageId": "23b7f90c-ac47-47be-a1c7-bf8d727e330f",
            "personnelId": "7fcaf721-2394-48c0-84dc-a168e5a3f3a7",
            "personnelName": "Robi Robi",
            "status": "Accepted",
            "isTeamLead": false,
            "position": "Member"
          },
          {
            "packageId": "23b7f90c-ac47-47be-a1c7-bf8d727e330f",
            "personnelId": "580ee147-f15a-4db5-a708-f0f60235d4e6",
            "personnelName": "esku esku",
            "status": "Accepted",
            "isTeamLead": true,
            "position": "Member"
          }
        ]

    }

  );

  console.log('STATUS:', response.status());
  //console.log(await response.text());
  const data = await response.json();
  console.log(data);

});

test('create packages api test', async ({ request }) => {

  //const token = await getToken(request);

  const response = await request.post(
    'https://training-bo.egp.gov.et/bo-gw/tendering-int/api/packages/create-package-v2',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },

      data: {
        name: "loth for incoterm 4",
        description: "loth for incoterm 4",
        procurementNumber: "GNA-ICB-G-0158-2017-BID-Limited",
        procurementLanguage: "en",

        lotsInPackage: [
          {
            lotId: "736d3596-a33f-4189-bc30-5307a0b19704",
            lotName: "loth for incoterm 4",
            lotDescription: "loth for incoterm 4",
            auctionRequired: false,
            lotReferenceNumber: "GNA-ICB-G-0158-2017-BID-Limited-05-12-2025",
            status: "configuration"
          }
        ]
      }
    }
  );

  console.log('STATUS:', response.status());

  const text = await response.text();



  console.log('RESPONSE:', text);

  //pect(response).toBeOK();
});
test('get num of initiation', async ({ request }) => {
  const token = await getToken(request);
  const response = await request.get('https://training-bo.egp.gov.et/bo-gw/tendering-int/api/packages/get-package-v2/84f026a2-9dcd-45e4-b45d-1b7b51239ea9', {
    headers: {
      //Authorization:'Bearer ${token}',
      //accept:'application/json, text/plain, */*'


    }
  })
    ;

  console.log('the states is:', response.status());
  const jsonresponse = await response.json();
  console.log(jsonresponse);
});
test('xya', async ({ request }) => {
 // const token = await getToken(request);
  const response = await request.post('https://training-bo.egp.gov.et/bo-gw/approval-workflow/api/approval-workflow-designs/save-approval-workflow-design', {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'

    },
    data:

    {
      "key": "initiationWorkflow",
      "objectId": "5a12db94-5c24-4cff-bbc5-36c8f4d7151a",
      "approvers": [
        {
          "approverType": "Role",
          "approvalMethod": "Anyone",
          "name": {

            "en": "Procurement Unit Head"
          },
          "userId": "3f115bce-a968-4bcb-8390-125167a30e57",
          "key": "procurement-unit-head",
          "isConditional": false,
          "isSystemApprover": false,
          "order": 1,

        }
      ]
    }
  });
  console.log('the states ia', response.status());
  const data = await response.json();
  console.log(data);
});

test('en.json', async ({ request }) => {
//const cookie=await getaccesscookie(request);
  
  const response = await request.get('https://training-bo.egp.gov.et/tendering/assets/config/app-setting.json',{
    headers:{
      cookie:'cf_clearance=d2yDEVsf4g_roUxxUyIxc22XVUQehDxCrLIvV4BE5_E-1764759680-1.2.1.1-i2lDyUxej0KQGJrEGnQ7mqO0y5QVvb57NGco5aq49b9I3kRi.Rfkt07EPDOHt5o_0hyOgTJVINzQoQM7jg2I_WHlleSbwSglIyF.J60nPHojEWQRex4PNCi0YiBDgtC5P8frXR7wWsEI2ExtJLNbn.Q3eFS.bOE_LnwNHx2v4QDarAbXOHeIedmw4LP7GRl8781Aalqpxc.e6kX4TvBaVcdePb0M2CPS7LnJBFTFrgQ; cfz_zaraz-analytics=%7B%22_cfa_clientId%22%3A%7B%22v%22%3A%2248738172973237310%22%2C%22e%22%3A1793857308810%7D%2C%22_cfa_sId%22%3A%7B%22v%22%3A%2213855776532246900%22%2C%22e%22%3A1764769251856%7D%7D',

      

    }
  });
  console.log('the states is', response.status());
  const jsonresponse = await response.json();
  console.log(JSON.stringify(jsonresponse,null,2));
});
test('select SBD', async ({ request }) => {
//
  //const token = await getToken(request);
  
  const response = await request.post('https://training-bo.egp.gov.et/bo-gw/tendering-int/api/packages/update-package-spd-v2', {
   headers:{
    Authorization:`Bearer ${token}`
   },
    data:

    {
    "spdIiiiid": "677609d8-5ef6-4681-82e4-b80fe25c64cf",
    "spdName": "Standard Bidding Document (SBD) For Procurement of Goods and Related Services For International Competitive Biddings (ICB)",
    "governingLaw": "The Federal Republic of Ethiopia",
    "id": "ff00b9ee-ad0d-4e8f-9744-3c7dc57f1d23"
}
  });

  console.log('the states is', response.status());
  //console.log('the states is',response);
   const jsonresponse =await response.json();

  console.log(JSON.stringify(jsonresponse, null, 2));
});
test('get responsiveness evaluation', async ({ request }) => {
   tokenManager = await new GetToken(request);
   token= await tokenManager.getAuthToken(request);

  const response = await request.get('https://training-bo.egp.gov.et/bo-gw/tendering/api/bidder-assessments/get-bidders-for-assessment-v3?tenderId=e911ff5c-dc37-4bce-85a2-132746a2744b&itemId=00000000-0000-0000-0000-000000000000&skip=0&top=10&locale=en&filter%5B0%5D%5B0%5D.field=status&filter%5B0%5D%5B0%5D.operator==&filter%5B0%5D%5B0%5D.value=302&filter%5B0%5D%5B1%5D.field=status&filter%5B0%5D%5B1%5D.operator==&filter%5B0%5D%5B1%5D.value=304&filter%5B0%5D%5B2%5D.field=status&filter%5B0%5D%5B2%5D.operator==&filter%5B0%5D%5B2%5D.value=314',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
  );
 const jsonresponse =await response.json();

  console.log(JSON.stringify(jsonresponse, null, 2));
});
test('creat pr lot',async({request})=>{
  const response= await request.post('https://training-bo.egp.gov.et/bo-gw/purchase-requisition/api/lots/create-lot',{
    headers:{
      Authorization:`Bearer ${token}`
    },
    data:
    {
    "name": {
        "am": "የተሽከርካሪ ግዥ",
        "en": "Procurement of Vehicle"
    },
    "description": {
        "en": "etgdftgg",
        "am": "dsfsdrfh"
    },
    "budgetYearName": {
        "id": "8e5e4fc4-64f6-4fd9-a08a-69f5914b7e57",
        "name": {
            "am": "ET-FY-2018",
            "en": "ET-FY-2018"
        },
        "startDate": "2025-07-08T00:00:00",
        "endDate": "2026-07-07T00:00:00",
        "budgetYearName": "2018",
        "status": "Current"
    },
    "referenceNo": "43r5we",
    "procurementUnitId": "a7efcfb4-3913-434f-a062-f739eaf0ee0f",
    "items": [
        {
            "id": "3592b2e6-3769-4440-9bb1-1382abfcbf44",
            "allocatedQuantity": 1,
            "contractNumber": null
        },
        {
            "id": "8c2ba85e-f048-4c13-b73f-b7b5ef9093f6",
            "allocatedQuantity": 1,
            "contractNumber": null
        },
        {
            "id": "169b27d1-60da-40a3-b56b-e82b64c0d9b6",
            "allocatedQuantity": 1,
            "contractNumber": null
        },
        {
            "id": "ba481840-0c7a-416f-8b3e-43ee88c89176",
            "allocatedQuantity": 1,
            "contractNumber": null
        }
    ],
    "budgetYearId": "8e5e4fc4-64f6-4fd9-a08a-69f5914b7e57",
    "contractNumber": null,
    "contractInfo": null
}
  });
  const jsonresponse=await response.json();
  console.log(jsonresponse);
});
test('registered personal list', async ({request})=>{
  const response= await request.get('https://training-bo.egp.gov.et/bo-gw/registration/api/personnel/get-all?skip=0&top=10&locale=en&orderBy%5B0%5D.field=timestamp&orderBy%5B0%5D.direction=desc',{
    headers:{
      Authorization: `Bearer ${token}`,
      //'content-type': 'application/json; charset=utf-8'
    }
  })
  console.log(response.status());
 // const jsonresponse= await response.json();
  //console.log(jsonresponse);
});
test('get procurment unit',async({request})=>{
  const response= await request.get('https://training-bo.egp.gov.et/bo-gw/registration/api/procurement-units/get-procurement-units?skip=0&top=10&locale=en',{
    headers:{
      Authorization:`Bearer ${token}`,
      'content-type':'application/json; charset=utf-8'
    }

  });
console.log('Status Code:', response.status());
console.log('Error Details:', await response.text());
  const jsonresponse= await response.json();
  console.log(jsonresponse);
});
test('get tender list at evaluation progress',async({request})=>{
  const response=await request.get('https://training-bo.egp.gov.et/bo-gw/tendering/api/bid-openings/evaluations?skip=0&top=10&locale=en&orderBy%5B0%5D.field=timestamp&orderBy%5B0%5D.direction=desc',{
    headers:{
      'x-personnel-id':'7dd106be-3ac3-4ce6-9f53-16f7b45665e9',

      Authorization:`Bearer ${token}`
    }
  })
  //console.log(token);

  console.log('response states is'+response.status());
  console.log(await response.text());
  //jsonresponse=await response.json();
  //console.log(JSON.stringify(jsonresponse,null, 2));
})
