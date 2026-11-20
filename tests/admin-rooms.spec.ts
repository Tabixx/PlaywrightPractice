import { test, expect } from '../fixtures';
import { newRoom, features } from '../data/roomData';
import { errors } from '../data/errorMessages';

test.use({ storageState: '.auth/admin.json' });

test.describe('Admin rooms', () => {
    test('Created room appears in the list', async ({ roomsPage }) => {
        const room = newRoom();
        await roomsPage.createRoom(room);
        await roomsPage.expectRoomListed(room.name);
    });

    

test.describe('Room Types', () => {
    for (const type of ['Single', 'Twin', 'Double', 'Family', 'Suite'] as const) {
        test(`can create a ${type} room`, async ({ roomsPage }) => {
            const room = newRoom({ type });
            await roomsPage.createRoom(room);
            await roomsPage.expectRoomListed(room.name); 
        });
    }
});

test.describe('features', () => {
    for (const feature of features) {
        test(`Room with ${feature}`, async ({ roomsPage }) => {
            const room = newRoom({ features: [feature] });
            await roomsPage.createRoom(room);
            await roomsPage.expectRoomListed(room.name);
            await roomsPage.expectRoomFeatures(room.name, [feature]);
        });
    }
        test('Room with all features', async ({ roomsPage }) => {
            const room = newRoom({ features: [...features] });
            await roomsPage.createRoom(room);
            await roomsPage.expectRoomListed(room.name);
            await roomsPage.expectRoomFeatures(room.name, [...features]);
        });
});

test.describe('Rejected input', () => {
    test('No name', async ({ roomsPage }) => {
      await roomsPage.createRoom(newRoom({ name: '' }));
      await roomsPage.expectError(errors.room.nameBlank);
    });

    test('No price', async ({ roomsPage }) => {
      const room = newRoom({ price: '' });
      await roomsPage.createRoom(room);
      await roomsPage.expectError(errors.room.priceBlank);
      await roomsPage.expectRoomNotListed(room.name);
    });

    test('No name and no price', async ({ roomsPage }) => {
      await roomsPage.createRoom(newRoom({ name: '', price: '' }));
      await roomsPage.expectError(errors.room.priceBlank);
    });

    test('Long room name stays inside its column', async ({ roomsPage }) => {
        test.fail(true, 'Known issue: long room names overflow into the Type column');

    const room = newRoom({ name: `${newRoom().name}-longnametest111122223333` });
    await roomsPage.createRoom(room);
    await roomsPage.expectRoomListed(room.name);

    const overflows = await roomsPage
      .roomListing(room.name)
      .evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(overflows).toBe(false);
  });

  });

  test.describe('Deleting [known bug: DELETE returns 500]', () => {
    const knownBug = 'Known site bug: DELETE room request returns 500 Internal Server Error';
    test('Deleted room disappears from the list', async ({ roomsPage }) => {
        test.fail(true, knownBug);
      const room = newRoom();
      await roomsPage.createRoom(room);
      await roomsPage.expectRoomListed(room.name);

      await roomsPage.deleteRoom(room.name);
      await roomsPage.expectRoomNotListed(room.name);
    });

    test('Deletion persists after reloading the page', async ({ roomsPage }) => {
        test.fail(true, knownBug);
      const room = newRoom();
      await roomsPage.createRoom(room);
      await roomsPage.expectRoomListed(room.name);

      await roomsPage.deleteRoom(room.name);
      await roomsPage.goto();
      await roomsPage.expectRoomNotListed(room.name);
    });

    test('Deleting one room leaves another untouched', async ({ roomsPage }) => {
        test.fail(true, knownBug);
      const kept = newRoom();
      const removed = newRoom();

      await roomsPage.createRoom(kept);
      await roomsPage.expectRoomListed(kept.name);
      await roomsPage.createRoom(removed);
      await roomsPage.expectRoomListed(removed.name);

      await roomsPage.deleteRoom(removed.name);
      await roomsPage.expectRoomNotListed(removed.name);
      await roomsPage.expectRoomListed(kept.name);
    });
  });
});
