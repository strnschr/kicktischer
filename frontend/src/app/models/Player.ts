export class Player {
    rowID: number;
    name: string;
    joinTime: number
  
    constructor(values: Object = {}) {
      Object.assign(Player, values);
    }
  }
  