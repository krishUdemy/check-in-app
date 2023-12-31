import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CHECKIN } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  constructor(private apollo: Apollo) {}

  getCheckInDetails(bookingCode: any, lastName: any) {
    return this.apollo.query({
      query: GET_CHECKIN,
      variables: {
        bookingCode,
        lastName,
      },
    });
  }
}
