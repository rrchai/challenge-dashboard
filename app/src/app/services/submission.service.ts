import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  private base_url = 'http://localhost:8800';

  constructor(private httpClient: HttpClient) {}

  delete_submission(id: string) {
    return this.httpClient.delete<any>(this.base_url + `/submission/${id}`);
  }
}
