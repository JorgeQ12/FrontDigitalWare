import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultResponse } from '../../../interfaces/resultresponse';
import { GetUsersSession } from '../../../interfaces/getUsersSession';
import { GetMatchByCode } from '../../../interfaces/getMatchByCode';

@Injectable({
  providedIn: 'root'
})
export class SessionDwService {
  private UrlBack = "https://localhost:44368/api/SessionGambling/"

  constructor(private http: HttpClient) { }

  InsertSessionMatches(session: any): Observable<ResultResponse<string>> {
    return this.http.post<ResultResponse<string>>(this.UrlBack + 'InsertSessionMatches', session);
  }

  InsertSessionPerson(sessionPerson: any): Observable<ResultResponse<string>> {
    return this.http.post<ResultResponse<string>>(this.UrlBack + 'InsertSessionPerson', sessionPerson);
  }
  
  UpdateGamblingByPerson(sessionPerson: any): Observable<ResultResponse<string>> {
    return this.http.put<ResultResponse<string>>(this.UrlBack + 'UpdateGamblingByPerson', sessionPerson);
  }

  GetMatchByCode(codeMatch: any): Observable<ResultResponse<GetMatchByCode>> {
    return this.http.post<ResultResponse<GetMatchByCode>>(this.UrlBack + 'GetMatchByCode', codeMatch);
  }

  GetUserByMatch(codeMatch: any): Observable<ResultResponse<GetUsersSession>> {
    return this.http.post<ResultResponse<GetUsersSession>>(this.UrlBack + 'GetUserByMatch', codeMatch);
  }
}
