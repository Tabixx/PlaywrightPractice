import { RoomData } from '../data/roomData';
import { APIRequestContext } from '@playwright/test';

export class RoomsApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    list() {
        return this.request.get('/api/room');
    }

    create(room: RoomData) {
        return this.request.post('/api/room', {
            data: {
                roomName: room.name,
                type: room.type,
                accessible: room.accessible === 'true',
                description: 'Please enter a description for this room',
                image: '',
                roomPrice: room.price,
                features: room.features,
            }
        });
    }

    remove(id:number) {
        return this.request.delete(`/api/room/${id}`);
    }

    async findByName(name: string) {
        const body = await (await this.list()).json();
        return body.rooms.find((r: { roomName: string }) => r.roomName === name); // to be verified
    }

    async findId(name:string): Promise<number> {
        const room = await this.findByName(name);
        if (!room) throw new Error(`Room "${name}" is not in the list`);
        return room.roomid; //to be verified
    }
}