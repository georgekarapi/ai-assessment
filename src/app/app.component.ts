import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { load } from '@angular/core/src/render3/instructions';

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
  breakpoint: number;
  loaded: boolean;

  opportunities: Opportunity[] = new Array();

  loadText = 'Loading...';
  endPoint = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities';
  accessToken = '?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.getOpportunities().then( res => {
      res.data.forEach(el => {
        const t = new Opportunity(el.title, el.location, el.branch.organisation.cover_photo_urls,
          el.branch.organisation.profile_photo_urls.original, el.duration, el.branch.organisation.name);
        this.opportunities.push(t);
      });
      this.loaded = !this.loaded;
    });
  }

  getOpportunities(p?: number): Promise<any> {
    if (p) {
      return this.http.get(this.endPoint + this.accessToken + '&page=' + p).toPromise();
    } else {
      return this.http.get(this.endPoint + this.accessToken).toPromise();
    }
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }
}
