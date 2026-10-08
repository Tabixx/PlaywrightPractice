import { test, expect } from '../fixtures';
import { validContact } from '../data/contactData';
import { errors } from '../data/errorMessages';

test.describe('Contact form', () => {
  test('Is visible on the homepage', async ({ contactForm }) => {
    await expect(contactForm.name).toBeVisible();
    await expect(contactForm.submitButton).toBeVisible();
  });

  test.describe('Valid submissions', () => {
    test('Shows a confirmation', async ({ contactForm }) => {
      await contactForm.fillAndSubmit(validContact);
      await contactForm.expectConfirmation();
    });

    test('Accepts all Polish characters', async ({ contactForm }) => {
      await contactForm.fillAndSubmit({
        ...validContact,
        name: 'Żańeta Łukąszęwićź',
        subject: 'Pytanie o średni pokój',
      });
      await contactForm.expectConfirmation();
    });
  });

  test.describe('Accepted boundary values', () => {
    const accepted = [
      { title: 'phone, 11 chars (min)',    override: { phone: '1'.repeat(11) } },
      { title: 'phone, 21 chars (max)',    override: { phone: '1'.repeat(21) } },
      { title: 'subject, 5 chars (min)',   override: { subject: 'a'.repeat(5) } },
      { title: 'subject, 100 chars (max)', override: { subject: 'a'.repeat(100) } },
      { title: 'message, 20 chars (min)',  override: { message: 'a'.repeat(20) } },
      { title: 'message, 2000 chars (max)', override: { message: 'a'.repeat(2000) } },
    ];

    for (const c of accepted) {
      test(`Accepts ${c.title}`, async ({ contactForm }) => {
        await contactForm.fillAndSubmit({ ...validContact, ...c.override });
        await contactForm.expectConfirmation();
      });
    }
  });

  test.describe('Rejected input', () => {
    test('Empty form shows all required-field errors', async ({ contactForm }) => {
      await contactForm.submit();
      await contactForm.expectErrorContaining(errors.name.blank);
      await contactForm.expectErrorContaining(errors.email.blank);
      await contactForm.expectErrorContaining(errors.phone.blank);
      await contactForm.expectErrorContaining(errors.subject.blank);
      await contactForm.expectErrorContaining(errors.message.blank);
    });

    const rejected = [
      { title: 'empty name',            override: { name: '' },                  error: errors.name.blank },
      { title: 'empty email',           override: { email: '' },                 error: errors.email.blank },
      { title: 'malformed email',       override: { email: 'not-an-email' },     error: errors.email.malformed },
      { title: 'empty phone',           override: { phone: '' },                 error: errors.phone.blank },
      { title: 'phone, 10 chars',       override: { phone: '1'.repeat(10) },     error: errors.phone.length },
      { title: 'phone, 22 chars',       override: { phone: '1'.repeat(22) },     error: errors.phone.length },
      { title: 'empty subject',         override: { subject: '' },               error: errors.subject.blank },
      { title: 'subject, 4 chars',      override: { subject: 'a'.repeat(4) },    error: errors.subject.length },
      { title: 'subject, 101 chars',    override: { subject: 'a'.repeat(101) },  error: errors.subject.length },
      { title: 'empty message',         override: { message: '' },               error: errors.message.blank },
      { title: 'message, 19 chars',     override: { message: 'a'.repeat(19) },   error: errors.message.length },
      { title: 'message, 2001 chars',   override: { message: 'a'.repeat(2001) }, error: errors.message.length },
    ];

    for (const c of rejected) {
      test(`Rejects ${c.title}`, async ({ contactForm }) => {
        await contactForm.fillAndSubmit({ ...validContact, ...c.override });
        await contactForm.expectErrorContaining(c.error);
        await expect(contactForm.confirmation).toBeHidden();
      });
    }
  });
});