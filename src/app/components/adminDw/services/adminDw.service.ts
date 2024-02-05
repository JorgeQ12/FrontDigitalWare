import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultResponse } from '../../../interfaces/resultresponse';
import { Teams } from '../../../interfaces/teams';
import { HttpClient } from '@angular/common/http';
import { MatchesDTO } from '../../../class/matchesDTO';
import { GetmatchesDTO } from '../../../class/getmatchesDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminDwService {
  private UrlBack = "https://localhost:44368/api/AdminGambling/"

  constructor(private http: HttpClient) { }

  GetTeams(): Observable<ResultResponse<Teams>> {
    return this.http.get<ResultResponse<Teams>>(this.UrlBack + 'GetTeams');
  }

  GetMatches(): Observable<ResultResponse<GetmatchesDTO>> {
    return this.http.get<ResultResponse<GetmatchesDTO>>(this.UrlBack + 'GetMatches');
  }

  InsertMatches(match: MatchesDTO): Observable<ResultResponse<string>> {
    return this.http.post<ResultResponse<string>>(this.UrlBack + 'InsertMatches', match);
  }

  UpdateMatches(update: any): Observable<ResultResponse<string>> {
    return this.http.put<ResultResponse<string>>(this.UrlBack + 'UpdateMatches', update);
  }

  DisabledMatchById(update: any): Observable<ResultResponse<string>> {
    return this.http.put<ResultResponse<string>>(this.UrlBack + 'DisabledMatchById', update);
  }
}
