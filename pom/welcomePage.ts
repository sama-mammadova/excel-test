import {type Locator, type Page} from '@playwright/test';

export class WelcomePage {
    readonly page: Page;
    readonly createWorkbookButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createWorkbookButton = page.getByTestId('0300');
    }

    async createWorkbook() {
        await this.createWorkbookButton.click();
        await this.page.waitForTimeout(5000);
    }
}