import { Page, Locator, expect } from '@playwright/test';

export type ContactData = {
  name: string; email: string; phone: string; subject: string; message: string;
};

export class ContactForm {
  readonly page: Page;
  readonly name: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly subject: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;
  readonly errors: Locator;
  readonly confirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.locator('#name');
    this.email = page.locator('#email');
    this.phone = page.locator('#phone');
    this.subject = page.locator('#subject');
    this.message = page.locator('#description');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.errors = page.locator('.alert');
    this.confirmation = page.getByText(/Thanks for getting in touch/);
  }

  async goto() {
    await this.page.goto('/');
  }

    async fill(data: ContactData) {
    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.phone.fill(data.phone);
    await this.subject.fill(data.subject);
    await this.message.fill(data.message);
  }

  async submit() {
    await this.submitButton.click();
  }

  async fillAndSubmit(data: ContactData) {
    await this.fill(data);
    await this.submit();
  }

  async expectErrorContaining(text: string | RegExp) {
    await expect(this.errors).toContainText(text);
  }

  async expectConfirmation() {
    await expect(this.confirmation).toBeVisible();
  }
}