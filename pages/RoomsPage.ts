import { Page, Locator, expect } from '@playwright/test';
import { RoomData } from '../data/roomData';

export class RoomsPage {
    readonly page: Page;
    readonly name: Locator;
    readonly type: Locator;
    readonly accessible: Locator;
    readonly price: Locator;
    readonly createButton: Locator;
    readonly errors: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByTestId('roomName');
        this.type = page.locator('#type'); 
        this.accessible = page.locator('#accessible'); 
        this.price = page.locator('#roomPrice');
        this.createButton = page.locator('#createRoom');
        this.errors = page.locator('.alert-danger');
    }

    async goto() {
        await this.page.goto('/admin/rooms');
        await expect(this.createButton).toBeVisible();
    }

    roomListing(name: string): Locator {
        return this.page.getByText(name, { exact: true });
    }

    async createRoom(room: RoomData) {
        await this.name.fill(room.name);
        await this.type.selectOption(room.type);
        await this.accessible.selectOption(room.accessible);
        await this.price.fill(room.price);
        await this.createButton.click();
    }
  
    //deletion??

    async expectRoomListed(name: string) {
        await expect(this.roomListing(name)).toBeVisible();
    }

    async expectRoomNotListed(name: string) {
        await expect(this.roomListing(name)).toBeHidden();
    }

    
}