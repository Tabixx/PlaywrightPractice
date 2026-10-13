import { test as base } from '@playwright/test';
import { ContactForm } from '../pages/ContactForm';
import { AdminLoginPage } from '../pages/AdminLogin';

type Pages = {
  contactForm: ContactForm;
  adminLogin: AdminLoginPage;
};

export const test = base.extend<Pages>({
  contactForm: async ({ page }, use) => {
    const contactForm = new ContactForm(page);
    await contactForm.goto();
    await use(contactForm);
  },
  adminLogin: async ({ page }, use) => {
    const adminLogin = new AdminLoginPage(page);
    await adminLogin.goto();
    await use(adminLogin);
  },
});

export { expect } from '@playwright/test';