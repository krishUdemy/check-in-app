import {gql} from 'apollo-angular'

const GET_CHECKIN = gql`
  query checkIn($bookingCode: String!, $lastName: String!) {
  checkIn(bookingCode: $bookingCode, lastName: $lastName) {
      bookingCode
      lastName
    }
  }
`
export {GET_CHECKIN}

