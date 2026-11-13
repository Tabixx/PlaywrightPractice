import { test as base } from '@playwright/test';
import { ContactForm } from '../pages/ContactForm';
import { AdminLoginPage } from '../pages/AdminLogin';
import { RoomsPage } from '../pages/RoomsPage';

type Pages = {
  contactForm: ContactForm;
  adminLogin: AdminLoginPage;
  roomsPage: RoomsPage;
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
  roomsPage: async ({ page }, use) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();
    await use(roomsPage);
  },
});

export { expect } from '@playwright/test';