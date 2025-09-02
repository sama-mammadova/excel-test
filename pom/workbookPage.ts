import {expect, type FrameLocator, type Locator, type Page} from '@playwright/test';
import {text} from "stream/consumers";

export class WorkbookPage {
    readonly page: Page;
    readonly workbookIframe: FrameLocator;
    readonly addFunctionButton: Locator;
    readonly functionSearchBox: Locator;
    readonly insertButton: Locator;
    readonly fileButton: Locator;
    readonly exportButton: Locator;
    readonly downloadAsCSVButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.workbookIframe = page.locator('iframe[name="WacFrame_Excel_0"]').contentFrame();
        this.addFunctionButton = this.workbookIframe.getByRole('button', {name: 'insert function'});
        this.functionSearchBox = this.workbookIframe.getByRole('searchbox', {name: 'Search for a function'});
        this.insertButton = this.workbookIframe.getByRole('button', {name: 'Insert'});
        this.fileButton = this.workbookIframe.getByRole('button', {name: 'File'});
        this.exportButton = this.workbookIframe.getByText('Export');
        this.downloadAsCSVButton = this.workbookIframe.getByText('Download as CSV', {exact: true});
    }

    async insertFunction(functionName: string) {
        await expect(this.addFunctionButton).toBeVisible()
        await this.addFunctionButton.click();
        await this.functionSearchBox.click();
        await this.functionSearchBox.fill(functionName);
        let searchResult = this.workbookIframe.getByRole('gridcell', {name: functionName});
        await searchResult.click();
        await this.insertButton.click();
    }

    async downloadAsCSV(): Promise<string> {
        await this.fileButton.click();
        await this.exportButton.click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadAsCSVButton.click();
        const download = await downloadPromise;
        const stream = await download.createReadStream();
        return await text(stream);
    }
}