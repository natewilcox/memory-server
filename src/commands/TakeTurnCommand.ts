import { Command } from "@colyseus/command";
import { MemoryRoom } from "../rooms/MemoryRoom";

type Payload = {
    client: any,
    i: number
};

export class TakeTurnCommand extends Command<MemoryRoom, Payload> {

    async execute({ client, i }: Payload) {

        console.log("TakeTurnCommand executed");

        if(!this.room.isActivePlayer(client.id)) {

            console.log('its not your turn');
            return;
        }

        if(this.room.isVisible(i)) {
            console.log('pick something else');
            return;
        }

        if(this.room.isBlocked()) {
            console.log('input is blocked');
            return;
        }

        const openTileIndex = this.room.getOpenTileAt();
        this.room.showTile(i);

        if(openTileIndex > -1) {
            
            if(this.room.isMatch(openTileIndex, i)) {
                this.room.setTileOwner(i, client.id);
                this.room.setTileOwner(openTileIndex, client.id);
            }
            else {
                this.room.blockInput();
                this.room.setTileState(i, 1);
                this.room.setTileState(openTileIndex, 1);

                this.clock.setTimeout(() => {

                    console.log("hide tiles");
                    this.room.hideTile(i);
                    this.room.hideTile(openTileIndex);
                    this.room.setTileState(i, 0);
                    this.room.setTileState(openTileIndex, 0);

                    this.room.blockInput(false);
                    this.room.nextPlayer();
                }, 500);
            }
        }
    }
}