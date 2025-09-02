import {type Locator, type Page} from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly goToSignInButton: Locator;
    readonly emailInput: Locator;
    readonly nextButton: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly staySignedInYesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.goToSignInButton = page.getByTestId("0100");
        this.emailInput = page.locator("#i0116");
        this.nextButton = page.locator('#idSIButton9');
        this.passwordInput = page.locator('#passwordEntry');
        this.signInButton = page.getByTestId('primaryButton');
        this.staySignedInYesButton = page.getByText('Yes')
    }

    async goto() {
        await this.page.goto('/');
    }

    async signIn(email: string, password: string) {
        await this.goToSignInButton.click();
        await this.emailInput.fill(email);
        await this.nextButton.click();
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.staySignedInYesButton.click();
    }
}