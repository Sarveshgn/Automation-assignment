import{test,expect} from "@playwright/test"
const fs =require('fs')

test('Validating book details', async({page})=>{

    //navigating to the page
    await page.goto("https://demoqa.com", { waitUntil: 'domcontentloaded' });

    //login
    await page.click("//h5[text()='Book Store Application']");
    await page.click("#login");
    await page.fill("#userName","AutoTesting");
    await page.fill("#password","Test@1234");
    await page.click('#login');
    // await page.waitForTimeout(1000);

    //validating user name 
    await expect(page.locator("#userName-value")).toHaveText("AutoTesting");
    console.log(`Loged in successfully`)

    // logout button visibility after login
    const islogoutvisible = await page.isVisible("#submit");
    console.log(islogoutvisible? "Logout is visible" : "Logout is not visible")
    await page.waitForTimeout(1000);

    //click on book store and search for book "Learning JavaScript Design Patterns"
    //await page.locator('#gotoStore').click();
    const reqbookTitle = "Learning JavaScript Design Patterns"
    await page.fill("#searchBox", reqbookTitle);
    await page.waitForTimeout(2000);

    // Validate the search result to contain the book
    await expect(page.locator('//a[@href="/books?book=9781449331818"]')).toHaveText(reqbookTitle);

    //storing the book details
    const title = await page.textContent('//a[@href="/books?book=9781449331818"]')
    const author = await page.textContent('(//div[contains(@style,"width: 100px")])[5]');
    const publisher = await page.textContent('(//div[contains(@style,"width: 100px")])[6]');
    const txtcontent = `Title:${title}\n Author:${author} \n Publisher:${publisher}`;

    //printing the book details
    console.log(`Title of the book is "${title}"`)
    console.log(`Author of the "${title}" book is "${author}" `);
    console.log(`Publisher of the "${title}" book is "${publisher}" `);

    //saving the book details in the file
    fs.writeFileSync('./files/bookDetails.txt', txtcontent);

    //logout
    await page.click('#submit');
    console.log("Logout successfully");
    
})