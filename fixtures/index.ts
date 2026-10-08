import { test as base } from '@playwright/test';
import { ContactForm } from '../pages/ContactForm';

type Pages = {
  contactForm: ContactForm;
};

export const test = base.extend<Pages>({
  contactForm: async ({ page }, use) => {
    const contactForm = new ContactForm(page);
    await contactForm.goto();
    await use(contactForm);
  },
});

export { expect } from '@playwright/test';