import { test } from '../fixtures';
import { admin } from '../data/credentials';
import { errors } from '../data/errorMessages';
 
test.describe('Admin login', () => {
    test('Valid credentials log in', async ({ adminLogin }) => {
        await adminLogin.login(admin.username, admin.password);
        await adminLogin.expectLoggedIn();
    });

    test('Can logout after logging in', async ({ adminLogin }) => {
        await adminLogin.login(admin.username, admin.password);
        await adminLogin.expectLoggedIn();
        await adminLogin.doLogout();
        await adminLogin.expectLoggedOut();
    });

test.describe('Rejected credentials', () => {
    test('Wrong password', async ({ adminLogin }) => {
        await adminLogin.login(admin.username, 'wroooong');
        await adminLogin.expectLoginError(errors.login.invalid);
        await adminLogin.expectLoggedOut();
    });

    test('Wrong username', async ({ adminLogin}) => {
        await adminLogin.login('mynameisnobody', admin.password);
        await adminLogin.expectLoginError(errors.login.invalid);
        await adminLogin.expectLoggedOut();
    });

    //next to add: empty credentials, singular and both 
    })
});