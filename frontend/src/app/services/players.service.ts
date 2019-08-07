import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/Player';

interface GetActivePlayers {
  status: string,
  data: Player[]
}

interface AddPlayer {
  status: string,
  userID: number
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  baseUrl = 'http://localhost:62001/api';

  constructor(private http: HttpClient) { }

  async getActivePlayers(): Promise<Player[]> {
    const res = await this.http.get<GetActivePlayers>(`${this.baseUrl}/players`).toPromise();
    return res.data;
  }

  async addPlayer(name: string, userID?: number): Promise<number> {
    const params = `name=${name}` + (userID ? `&userID=${userID}` : '');
    const res = await this.http.get<AddPlayer>(`${this.baseUrl}/players/add?${params}`).toPromise();
    return res.userID;
  }

  async removePlayer(userID: number): Promise<any> {
    return await this.http.delete(`${this.baseUrl}/players/delete?userID=${userID}`).toPromise();
  }
}
