import { Room, Client } from "@colyseus/core";
import { MemoryRoomState } from "./schema/MemoryRoomState";
import { ClientMessages } from "../types/messages";
import { Board } from "../objects/board";
import { MemoryGame } from "../objects/game";

export class MemoryRoom extends Room<MemoryRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new MemoryRoomState());

    const layout = Board.generateLayout(24);
    const board = new Board(layout);
    const game = new MemoryGame(board);

    for(let i=0; i<20; i++) {
      this.state.numbers.push(-1);
    }
    this.onMessage(ClientMessages.SendMessage, (client, message) => {
      
      this.state.numbers.setAt(message.i, board.get(message.i));
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
