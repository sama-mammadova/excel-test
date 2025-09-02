import {test, expect} from '@playwright/test';
import {SignInPage} from "../pom/signInPage";
import {WorkbookPage} from "../pom/workbookPage";
import {WelcomePage} from "../pom/welcomePage";
import {config} from 'dotenv'

config()

test('test', async ({page}) => {
    const signInPage = new SignInPage(page)
    await signInPage.goto()
    await signInPage.signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD)

    const welcomePage = new WelcomePage(page)
    await welcomePage.createWorkbook()

    const workbookPage = new WorkbookPage(page);
    await workbookPage.insertFunction('TODAY')

    let csvContent = await workbookPage.downloadAsCSV()
    let today = new Date();

    const formattedDate = today.toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'});
    expect(csvContent.trim()).toEqual(formattedDate)
});


