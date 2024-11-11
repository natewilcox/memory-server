import { Command } from "@colyseus/command";
import { MemoryRoom } from "../rooms/MemoryRoom";

type Payload = {
    client: any
};

export class RestartCommand extends Command<MemoryRoom, Payload> {

    async execute({ client }: Payload) {

        console.log("RestartCommand executed");
    }
}