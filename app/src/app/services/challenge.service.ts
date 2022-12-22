import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private base_url = 'http://localhost:8800';

  constructor(private httpClient: HttpClient) {}

  listChallenges() {
    return this.httpClient.get<any>(this.base_url + '/user/challenges');
  }

  get_challenge(id: string) {
    return this.httpClient.get<any>(this.base_url + `/challenge/${id}`);
  }

  listSubmissionViews(projectId: string) {
    return this.httpClient.get<any>(
      this.base_url + `/challenge/${projectId}/views`
    );
  }

  get_view(sub_id: string) {
    return this.httpClient.get<any>(this.base_url + `/view/${sub_id}`);
  }
}
