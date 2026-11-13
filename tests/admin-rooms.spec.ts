import { test, expect } from '../fixtures';
import { newRoom } from '../data/roomData';

test.use({ storageState: '.auth/admin.json' });

test.describe('Admin rooms', () => {
    test('Created room appears in the list', async ({ roomsPage }) => {
        const room = newRoom();
        await roomsPage.createRoom(room);
        await roomsPage.expectRoomListed(room.name);
    });

// test('Deleted room disappears from the list', async ({ roomsPage }) => {
//     const room = newRoom();
//     await roomsPage.createRoom(room);
//     await roomsPage.expectRoomListed(room.name);
//     await roomsPage.deleteRoom(room.name);
//     await roomsPage.expectRoomNotListed(room.name);
// });

    test('Empty form shows validation errors', async ({ roomsPage }) => {
        await roomsPage.createButton.click();
        await expect(roomsPage.errors).toBeVisible();
    });
})