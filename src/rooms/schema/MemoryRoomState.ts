import { ArraySchema, Schema, type } from "@colyseus/schema";

export class MemoryRoomState extends Schema {

  @type("string") 
  mySynchronizedProperty: string = "Hello world";

  @type([ "number" ]) 
  numbers = new ArraySchema<number>();
}
