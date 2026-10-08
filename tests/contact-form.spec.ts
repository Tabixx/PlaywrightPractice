import { test, expect } from '../fixtures';
import { validContact } from '../data/contactData';
import { errors } from '../data/errorMessages';

test('Form is visible on the homepage', async ({ contactForm }) => {
    await expect(contactForm.name).toBeVisible();
    await expect(contactForm.submitButton).toBeVisible();
  });

test.describe('Contact form', () => {
  const invalidCases = [
    { title: 'empty name',        override: { name: '' },                    error: /name/i },
    { title: 'empty email',       override: { email: '' },                   error: /email/i },
    { title: 'malformed email',   override: { email: 'not-an-email' },       error: /email/i },
    { title: 'phone too short',   override: { phone: '1234567890' },         error: /phone/i },   // 10 chars
    { title: 'phone too long',    override: { phone: '1'.repeat(23) },       error: /phone/i },
    { title: 'empty subject',     override: { subject: '' },                 error: /subject/i },
    { title: 'message too short', override: { message: 'a'.repeat(19) },     error: /message/i },
    { title: 'message too long',  override: { message: 'a'.repeat(2001) },   error: /message/i },
  ];

  for (const c of invalidCases) {
    test(`Rejects ${c.title}`, async ({ contactForm }) => {
      await contactForm.fillAndSubmit({ ...validContact, ...c.override });
      await contactForm.expectErrorContaining(c.error);
      await expect(contactForm.confirmation).toBeHidden();
    });
  }
    test('Accepts the maximum phone length (21 chars)', async ({ contactForm }) => {
    await contactForm.fillAndSubmit({ ...validContact, phone: '1'.repeat(21) });
    await contactForm.expectConfirmation();
  });

  test('Accepts the maximum message length (2000 chars)', async ({ contactForm }) => {
    await contactForm.fillAndSubmit({ ...validContact, message: 'a'.repeat(2000) });
    await contactForm.expectConfirmation();
  });

  test('Valid message shows a confirmation', async ({ contactForm }) => {
    await contactForm.fillAndSubmit(validContact);
    await contactForm.expectConfirmation();
  });

  test('Empty form shows validation errors', async ({ contactForm }) => {
    await contactForm.submitButton.click();
    await expect(contactForm.errors).toBeVisible();
  });

   test('Accepts the minimum phone length (11 chars)', async ({ contactForm }) => {
    await contactForm.fillAndSubmit({ ...validContact, phone: '1'.repeat(11) });
    await contactForm.expectConfirmation();
  });

  test('Accepts the minimum message length (20 chars)', async ({ contactForm }) => {
    await contactForm.fillAndSubmit({ ...validContact, message: 'a'.repeat(20) });
    await contactForm.expectConfirmation();
  });

  test('Accepts Polish characters', async ({ contactForm }) => {
    await contactForm.fillAndSubmit({
      ...validContact,
      name: 'Żańeta Łukąszęwićź',
      subject: 'Pytanie o średni pokój',
    });
    await contactForm.expectConfirmation();
  });
});