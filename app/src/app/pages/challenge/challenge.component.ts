import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChallengeService } from 'src/app/services/challenge.service';
import { MenuItem } from 'primeng/api';
import { SubmissionView } from './submission_view';

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

  constructor(
    private service: ChallengeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.primengConfig.ripple = true;
    if (this.route.paramMap) {
      this.route.paramMap
        .pipe(
          switchMap((params) => of(params.get('id'))),
          switchMap((id) => this.service.get_challenge(id!)),
          switchMap((c) => this.service.listSubmissionViews(c.projectId))
        )
        .subscribe((views) => (this.views = views));
    }
  }

  onClick(event: any) {
    const sub_id = event.value;
    this.viewData$ = this.service.get_view(sub_id);
  }
  // this.service.listSubmissionViews().subscribe(res => {
  //   this.challenges = res.results;
  // });

  // redirect(path: string[]) {
  //   this.router.navigate(path)
  // }
}
