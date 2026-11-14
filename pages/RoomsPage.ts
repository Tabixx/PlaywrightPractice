import { Page, Locator, expect } from '@playwright/test';
import { RoomData, Feature } from '../data/roomData';

export class RoomsPage {
    readonly page: Page;
    readonly name: Locator;
    readonly type: Locator;
    readonly accessible: Locator;
    readonly price: Locator;
    readonly createButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByTestId('roomName');
        this.type = page.locator('#type'); 
        this.accessible = page.locator('#accessible'); 
        this.price = page.locator('#roomPrice');
        this.createButton = page.locator('#createRoom');
    }

    async goto() {
        await this.page.goto('/admin/rooms');
        await expect(this.createButton).toBeVisible();
    }

    roomListing(name: string): Locator {
        return this.page.getByText(name, { exact: true });
    }

    roomRow(name: string): Locator {
        return this.page.getByTestId('roomlisting').filter({ hasText: name });
    }

    async createRoom(room: RoomData) {
        await this.name.fill(room.name);
        await this.type.selectOption(room.type);
        await this.accessible.selectOption(room.accessible);
        await this.price.fill(room.price);
        for (const feature of room.features) {
            await this.page.getByRole('checkbox', { name: feature, exact: true }).check();}
        await this.createButton.click();
    }
  
    async deleteRoom(name: string) {
        await this.roomRow(name).locator('.roomDelete').click(); 
    }

    async expectError(message: string | RegExp) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectRoomListed(name: string) {
    await expect(this.roomListing(name)).toBeVisible();
  }

  async expectRoomNotListed(name: string) {
    await expect(this.roomListing(name)).toBeHidden();
  }

  async expectRoomFeatures(name: string, expected: Feature[]) {
    for (const feature of expected) {
      await expect(this.roomRow(name)).toContainText(feature);
    }
  }
}