import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Challenge } from './challenge';
import { ChallengeService } from '../../services/challenge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent {
  challenges: Challenge[] = []
  
  constructor(
    private primengConfig: PrimeNGConfig,
    private service:ChallengeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.service.listChallenges().subscribe(res => {
      this.challenges = res.results;
    });
  }

  redirect(path: string[]) {
    this.router.navigate(path)
  } 
}
