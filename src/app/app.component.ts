import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal/edit-modal.component';

export class Opportunity {
  description: string;
  location: string;
  photo: string;
  profile: string;
  duration: number;
  organisation: string;

  constructor(description: string,
    location: string,
    photo: string,
    profile: string,
    duration: number,
    organisation: string) {
      this.description = description;
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

  opportunities: Opportunity[] = new Array();

  loadText = 'Loading...';
  endPoint = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities';
  accessToken = '?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private modalService: NgbModal) { }
  ngOnInit() {
    this.spinner.show();
    this.addOpportunities(this.page);
  }

  onScroll() {
    console.log('Scrolled');
    this.spinner.show();
    this.addOpportunities(this.page);
  }

  setInfo(t: number) {
    const modalRef = this.modalService.open(EditModalComponent);

    modalRef.componentInstance.info = {'description': this.opportunities[t].description,
    'organisation': this.opportunities[t].organisation};

    modalRef.componentInstance.data.subscribe((rec) => {
      this.opportunities[t].description = rec.description;
      this.opportunities[t].organisation = rec.organisation;
      modalRef.close();
    });
  }

  addOpportunities(p?: number) {
    this.getOpportunities(p).then( res => {
      if ( p === 1) {
        this.total_pages = res.paging.total_pages;
        console.log(this.total_pages);
      }
      for (let i = 0; i < res.data.length; i++) {
        const t = new Opportunity(res.data[i].title, res.data[i].location, res.data[i].branch.organisation.cover_photo_urls,
            res.data[i].branch.organisation.profile_photo_urls.original,
            res.data[i].duration, res.data[i].branch.organisation.name);
        this.opportunities.push(t);
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
