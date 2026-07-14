import { test, expect } from '@playwright/test';
import { Getnewtoken } from '../packages/ORapilogin';
import { request } from 'node:http';

let token;

test.beforeEach(async ({ request }) => {

  token = await Getnewtoken(request);

});

test('log in token test', async ({ request }) => {

  try {

    const response = await request.get(
      'http://213.55.73.249/auth/connect/userinfo',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Status validation
    expect(response.status()).toBe(200);
    console.log('the response states is'+response.status());

    // JSON response
    const jsonresponse = await response.json();

    console.log(JSON.stringify(jsonresponse, null, 2));

  } catch (err) {

    console.log('Error message is:', err.message);

  }

});


test('reuse login token', async ({ request }) => {
//const token=await getnewtoken(request);
  const response = await request.get(
    'http://213.55.73.249/auth/connect/userinfo',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log('Status:', response.status());

  const data = await response.json();
  console.log(JSON.stringify(data,null,2));
 //expect(response.status()).toBe(200);
  //expect(response.statusText()).toBe('ok');

  expect(response.ok()).toBeTruthy();

});
test('update pr lot', async ({ request }) => {
     const token=await getnewtoken(request);

  
    const response = await request.put('http://213.55.73.249/bo-gw/purchase-requisition/api/lots/update-lot/3ada76c1-8d1b-4c5d-a0e4-484b7da9a86a', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {

            name: {
                am: "የጽዳት እቃዎች ግዥ",
                en: "Procurement of Sanitary Items"
            },
            description: {
                en: "Procurement of Sanitary Items\n",
                am: "Procurement of Sanitary Items\n"
            },
            budgetYearName: {
                id: "8e5e4fc4-64f6-4fd9-a08a-69f5914b7e57",
                name: {
                    am: "ET-FY-2018",
                    en: "ET-FY-2018"
                },
                status: "Current",
                endDate: "2026-07-07T00:00:00",
                startDate: "2025-07-08T00:00:00",
                budgetYearName: "2018"
            },
            referenceNo: "abede2",
            procurementUnitId: "0cd5f3bb-b226-4064-aa29-5505ddf7e491",
            items: [
                {
                    id: "6358fcb3-fdb6-4223-bfba-eff51fbcb246",
                    allocatedQuantity: 122
                },
                {
                    id: "7c33f0e7-159c-4ba1-b5b9-80d95fdb1df3",
                    allocatedQuantity: 21
                }
            ],
            id: "3ada76c1-8d1b-4c5d-a0e4-484b7da9a86a",
            budgetYearId: "8e5e4fc4-64f6-4fd9-a08a-69f5914b7e57"
        }


    });
    const jsonresponse = await response.json();
    const x=JSON.stringify(jsonresponse,null,5);
    console.log(x);
});
test('update pr lot mechanism', async ({ request }) => {
 
   // const token=await getnewtoken(request);
    const response = await request.put('http://213.55.73.249/bo-gw/purchase-requisition/api/lots/update-lot-procurement-mechanism/3ada76c1-8d1b-4c5d-a0e4-484b7da9a86a', {
         headers: {
            Authorization: `Bearer ${token}`
        },
       
        data:
        {
            "lotId": "3ada76c1-8d1b-4c5d-a0e4-484b7da9a86a",
            "procurementMechanism": {
                "procurementCategory": "Goods",
                "marketType": "National",
                "procurementType": "Bidding",
                "procurementTool": "RequestForBid",
                "procurementMethod": "Limited",
                "procurementModality": "Buying",
                "contractingMethod": "StandardContract",
                "mainProcurementMethod": "OpenBidding",
                "isExtension": false,
                "contractReference": {},
                "isAuctionable": false,
                "compliances": [],
                "procurementStage": "SingleStage",
                "complexity": "NonComplex",
                "applicableRule": {
                    "id": "fr6df296-2edf-498a-8a67-ff9e0a7a6712",
                    "code": "Oromia National Regional State",
                    "name": {
                        "en": "Oromia National Regional State"
                    }
                }
            }
        }
    });
    const jsonresponse = await response.json();
    console.log(jsonresponse);

});

test('save schedule for framwork plan',async({request})=>{
    const acces_token=await getnewtoken(request);
    
  const sevresponse=await request.post('/bo-gw/egp-planning/api/plan/save-schedule',{
    headers:{
        Authorization: `Bearer ${acces_token}`
    },
    data:
    {
    "planId": "d86df039-aa32-465e-8519-959cfe824302",
    "schedules": [
        {
            "id": "2d770f59-8000-4039-b5eb-65f4f8444cad",
            "planId": "d86df039-aa32-465e-8519-959cfe824302",
            "dueDate": "2026-04-05T00:00:00",
            "leadTime": 7,
            "scheduleType": "consolidation"
        },
        {
            "id": "018a740c-2a55-4de7-9fc5-2e5d9b3a5a0e",
            "planId": "d86df039-aa32-465e-8519-959cfe824302",
            "dueDate": "2026-04-15T00:00:00",
            "leadTime": 5,
            "scheduleType": "consolidationApproval"
        },
        {
            "id": "acec5331-951a-4081-97f4-ae04e00dfba2",
            "planId": "d86df039-aa32-465e-8519-959cfe824302",
            "dueDate": "2026-04-25T00:00:00",
            "leadTime": 10,
            "scheduleType": "lotPreparation"
        },
        {
            "id": "e142abb5-1384-4eb6-9c77-9d9b12a7fdea",
            "planId": "d86df039-aa32-465e-8519-959cfe824302",
            "dueDate": "2026-05-05T00:00:00",
            "leadTime": 10,
            "scheduleType": "planApproval"
        },
        {
            "id": "8b848b0c-c9fb-4605-a352-97a17fdc203a",
            "planId": "d86df039-aa32-465e-8519-959cfe824302",
            "dueDate": "2026-05-15T00:00:00",
            "leadTime": 10,
            "scheduleType": "publication"
        }
    ]
}
  });
  const jsonresponse=await sevresponse.json();
  //console.log(JSON.stringify(jsonresponse,null,2));
  const schema= GenerateSchema.json('user',jsonresponse);
  console.log(JSON.stringify(schema,null,2));



expect(typeof jsonresponse[0].scheduleType).toBe('string');
});

test('add award teams',async({request})=>{
    const response= await request.post('http://213.55.73.249/bo-gw/contract-management/api/awards/add-award-teams',{
        headers:{
            Authorization:`Bearer ${token}`

        },
        data:
        {
    "awardId": "5e9ebf40-81d4-4066-a94f-8a40ee29dfe9",
    "awardTeams": [
        {
            "personnelId": "4909941f-3acc-4146-8f17-a4b51283f90f",
            "personnelName": {
                "am": "asse2  mo",
                "en": "asse2  mo"
            },
            "email": "asse2@gmail.com",
            "isTeamLead": true,
            "role": "Member",
            "isActive": true,
            "timeStamp": "2026-03-26T11:12:04.369Z"
        },
        {
            "personnelId": "08a501af-1a07-4929-a116-0f7b9b804c01",
            "personnelName": {
                "am": "asse3  no",
                "en": "asse3  no"
            },
            "email": "asse3@gmail.com",
            "isTeamLead": false,
            "role": "Member",
            "isActive": true,
            "timeStamp": "2026-03-26T11:12:04.369Z"
        },
        {
            "personnelId": "22c4b195-dda0-47fc-a610-3bc51e2a0c86",
            "personnelName": {
                "am": "asse1  hh",
                "en": "asse1  h"
            },
            "email": "asse1@gmail.com",
            "isTeamLead": false,
            "role": "Member",
            "isActive": true,
            "timeStamp": "2026-03-26T11:12:04.369Z"
        },
        {
            "personnelId": "e4f44b5c-3961-4255-80f2-b74fc1727075",
            "personnelName": {
                "am": "asse4  mulu",
                "en": "asse4  mulu"
            },
            "email": "asse4@gmail.com",
            "isTeamLead": false,
            "role": "Member",
            "isActive": true,
            "timeStamp": "2026-03-26T11:12:04.369Z"
        }
    ]
}
    });

    const jsonresponse=await response.json();

    //console.log(JSON.stringify(jsonresponse,null,2));
    //const schema=GenerateSchema.json(jsonresponse);
    console.log(JSON.stringify(jsonresponse,null,2));
   // console.log(schema);
});
test('get tender at evaluation complin',async({request})=>{
    const response=await request.get('http://213.55.73.249/bo-gw/tendering/api/tender-administrations/get-tenders-with-stream-v2?skip=0&top=10&locale=en&filter%5B0%5D%5B0%5D.field=currentMilestone&filter%5B0%5D%5B0%5D.operator=%3E=&filter%5B0%5D%5B0%5D.value=300',{
        headers:{Authorization: `Bearer ${token}`}

})
console.log(response.status());
const jsonresponse= await response.json();
console.log(jsonresponse);
});
test('get complen',async({request})=>{
    const response= await request.get('http://213.55.73.249/bo-gw/complaint/api/complaints/get-complaints?skip=0&top=10&filter%5B0%5D%5B0%5D.field=objectId&filter%5B0%5D%5B0%5D.value=e47a2bf4-b72b-46cd-8e1d-3dc534f1eedc&filter%5B0%5D%5B0%5D.operator==',{
        headers:{
            Authorization: `Bearer ${token}`,
            "content-type":'application/json; charset=utf-8'
        }

    })
    console.log(response.status())
    const jsonresponse= await response.json();
    console.log(JSON.stringify(jsonresponse,null,3));

})
test('save planer units',async({request})=>{
    const response=await request.post('http://213.55.73.249/bo-gw/egp-planning/api/plan/update/c01576b5-b417-4a2a-82e5-ec69bdee2904',{
        headers:{
            Authorization: `Bearer ${token}`,
            "content-type":'application/json; charset=utf-8'
        },
    data:
           {
    "planId": "c01576b5-b417-4a2a-82e5-ec69bdee2904",
    "plannerUnits": [
        {
            "supervisors": [
                {
                    "id": "a437152d-6e86-40bf-bb88-0aa99f32643e",
                    "planId": "c01576b5-b417-4a2a-82e5-ec69bdee2904",
                    "plannerUnitId": "41d21828-5422-4c3f-8ace-4824a47144a4",
                    "personnelId": "4909941f-3acc-4146-8f17-a4b51283f90f",
                    "personnelName": {
                        "am": "asse2 mo",
                        "en": "asse2 mo"
                    },
                    "level": null
                }
            ],
            "id": "41d21828-5422-4c3f-8ace-4824a47144a4",
            "unitId": "d9c84f70-a8eb-4ebb-83be-ffd145746609",
            "unitName": {
                "am": "hr department",
                "en": "hr department"
            },
            "planId": "c01576b5-b417-4a2a-82e5-ec69bdee2904",
            "status": "NA",
            "onRevision": false,
            "expand": false
        },
        {
            "supervisors": [
                {
                    "id": "57133577-4b74-4e6b-b163-e2781ba0d4ff",
                    "planId": "c01576b5-b417-4a2a-82e5-ec69bdee2904",
                    "plannerUnitId": "2fa8fea2-4376-4076-b4d7-ed69f1de9b3b",
                    "personnelId": "08a501af-1a07-4929-a116-0f7b9b804c01",
                    "personnelName": {
                        "am": "asse3 no",
                        "en": "asse3 no"
                    },
                    "level": null
                }
            ],
            "id": "2fa8fea2-4376-4076-b4d7-ed69f1de9b3b",
            "unitId": "6626a1bd-63e9-401c-9bee-469216db78ce",
            "unitName": {
                "am": "Ministry of Education 23",
                "en": "Ministry of Education 23"
            },
            "planId": "c01576b5-b417-4a2a-82e5-ec69bdee2904",
            "status": "NA",
            "onRevision": false,
            "expand": false
        },
        {
            "supervisors": [
                {
                    "id": "c88cf945-84a7-4b25-8788-a99969f9e07f",
                    "planId": "c01576b5-b417-4a2a-82e5-ec69bdee2904",
                    "plannerUnitId": "17dd9d66-9c80-4622-8907-46c02dce5dfa",
                    "personnelId": "08a501af-1a07-4929-a116-0f7b9b804c01",
                    "personnelName": {
                        "am": "asse3 no",
                        "en": "asse3 no"
                    },
                    "level": null
                }
            ],
            "id": "17dd9d66-9c80-4622-8907-46c02dce5dfa",
            "unitId": "695e24e6-38ec-408b-9c07-b6f770e0bee0",
            "unitName": {
                "am": "Finance and procurement directorate",
                "en": "Finance and procurement directorate"
            },
            "planId": "c01576b5-b417-4a2a-82e5-ec69bdee2904",
            "status": "NA",
            "onRevision": false,
            "expand": false
        }
    ]
}
    })
   console.log('Status:', response.status());

const responseText = await response.text();

console.log(responseText);
})
test('submit need',async({request})=>{
    const response= await request.post("https://training-bo.egp.gov.et/bo-gw/egp-planning/api/consolidated-needs/submit-needs",{
        headers:{
            Authorization: `Bearer ${token}`
        },
        data:{
            
    "id": "7d56fba9-8a81-42a7-bb1e-2d76dd8a3855",
    "planningUnitId": "00000000-0000-0000-0000-000000000000",
    "planId": "cb4fb83b-c73b-4c84-9271-2310122c55e1",
    "status": "draft",
    "prevousStatus": null,
    "onRevision": false,
    "revisionCount": 4,
    "upcomingRevisionCount": 0,
    "isPublished": false,
    "timestamp": "0001-01-01T00:00:00"
}
        
    })
    console.log(response.status());
    const jsonresponse= await response.json();
    console.log(jsonresponse);
  
    

})