import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { ChallengeService } from 'src/app/services/challenge.service';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { SubmissionView } from './submission_view';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent {
  challengeId!: any;
  selectedView!: string;
  views: SubmissionView[] = [];
  viewData$!: Observable<any[]>;
  selectedRows: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private challengeService: ChallengeService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    if (this.route.paramMap) {
      this.route.paramMap
        .pipe(
          switchMap((params) => of(params.get('id'))),
          switchMap((id) => this.challengeService.get_challenge(id!)),
          switchMap((c) =>
            this.challengeService.listSubmissionViews(c.projectId)
          )
        )
        .subscribe((views) => (this.views = views));
    }
  }

  selectTable(event: any) {
    const sub_id = event.value;
    this.viewData$ = this.challengeService.get_view(sub_id);
  }

  confirmDeletion(event: Event) {
    if (this.selectedRows.length > 0) {
      const selectedIds: string[] = this.selectedRows.map((row) => row.id);
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Are you sure that you want to delete '${selectedIds
          .map((id) => `'${id}'`)
          .join(', ')}?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          from(selectedIds)
            .pipe(
              concatMap((id) => this.deleteSubmission(id)),
              catchError((err) => throwError(() => err))
            )
            .subscribe(console.log);
        },
        reject: () => console.log('n'),
      });
    }
  }

  deleteSubmission(id: string) {
    return this.submissionService.delete_submission(id);
  }

  selectQueue(event: any) {}
  // this.service.listSubmissionViews().subscribe(res => {
  //   this.challenges = res.results;
  // });

  // redirect(path: string[]) {
  //   this.router.navigate(path)
  // }
}
