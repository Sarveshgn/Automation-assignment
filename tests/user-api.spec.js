import {test, expect} from "@playwright/test"
import { request } from "http"

test('create, get and update user' , async({request})=>{

    //create user
    const createrespone = await request.post('https://reqres.in/api/users',{
        data:{
            "name": "New user",
            "job": "leader"
            }        
    })

    //validating http status code
    expect(createrespone.status()).toBe(201);
    console.log(createrespone.status()===201 ? "Created user successfully" : "User not created");

    //storing user id
    const createData = await createrespone.json();
    const userid = createData.id;
    console.log(createData);

    //Get user details and validate user details
    const getresponse = await request.get(`https://reqres.in/api/users/${userid}`)
    expect.soft(getresponse.status()).toBe(200);
    console.log(getresponse.status()===200 ? "Fetched the user details successfully" : "User details not found");

    const userdata = await getresponse.json();
    console.log(userdata);   
    expect.soft(userdata.name).toBe('New user');
    expect.soft(userdata.job).toBe('leader');
    expect.soft(userdata.id).toBe(userid)

    //Update user's name and validate the same
    const updateresponse = await request.put(`https://reqres.in/api/users/${userid}`,{
        data:{
            "name": "Edited new user",
            "job": "leader"
        }
    })

    expect(updateresponse.status()).toBe(200);
    console.log(updateresponse.status()===200 ? "Updated user name successfully" : "User name not updated");

    const updateddata = await updateresponse.json();
    console.log(updateddata);
    expect(updateddata.name).toBe("Edited new user");
    expect(updateddata.job).toBe("leader");

    //delete create user
    const deleteresponse = await request.delete(`https://reqres.in/api/users/${userid}`);
    expect(deleteresponse.status()).toBe(204);
    console.log(deleteresponse.status()===204 ? "Deleted user successfully" : "User not deleted");

})
