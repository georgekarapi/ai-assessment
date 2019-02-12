import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

export class Opportunity {
  title: string;
  location: string;
  photo: string;
  profile: string;
  duration: number;
  organisation: string;

  constructor(title: string,
    location: string,
    photo: string,
    profile: string,
    duration: number,
    organisation: string) {
      this.title = title;
      this.location = location;
      this.photo = photo;
      this.profile = profile;
      this.duration = duration;
      this.organisation = organisation;
    }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  page = 1;
  total_pages = 0;

  opportunities: Opportunity[][] = new Array();

  loadText = 'Loading...';
  endPoint = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities';
  accessToken = '?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    this.addOpportunities(this.page);
  }

  onScroll() {
    console.log('Scrolled');
    this.spinner.show();
    this.addOpportunities(this.page);
  }

  addOpportunities(p?: number) {
    this.getOpportunities(p).then( res => {
      if ( p === 1) {
        this.total_pages = res.paging.total_pages;
        console.log(this.total_pages);
      }
      for (let i = 0; i < res.data.length; i += 3) {
        const opp: Opportunity[] = new Array;
        for (let j = 0; j < 3; j++) {
          if ( i + j >= res.data.length) {
            break;
          }
          const t = new Opportunity(res.data[i + j].title, res.data[i + j].location, res.data[i + j].branch.organisation.cover_photo_urls,
            res.data[i + j].branch.organisation.profile_photo_urls.original,
            res.data[i + j].duration, res.data[i + j].branch.organisation.name);
          opp.push(t);
        }
        this.opportunities.push(opp);
      }
      this.spinner.hide();
      this.page++;
    });
  }
  getOpportunities(p?: number): Promise<any> {
    if (p !== 1) {
      return this.http.get(this.endPoint + this.accessToken + '&page=' + p).toPromise();
    } else {
      return this.http.get(this.endPoint + this.accessToken).toPromise();
    }
  }
}
