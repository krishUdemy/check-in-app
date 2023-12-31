const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLError,
} = require('graphql');

const Bookings = [
  {
    bookingCode: 'LT7RCI',
    lastName: 'Perry Chase',
    travelDate: '2024-01-01T20:10:10',
  },
  {
    bookingCode: 'KW3RMU',
    lastName: 'Caldwell Clements',
    travelDate: '2024-01-02T23:34:34',
  },
  {
    bookingCode: 'BL1MVO',
    lastName: 'Jeanette Meadows',
    travelDate: '2024-01-03T20:11:56',
  },
  {
    bookingCode: 'XP4YCP',
    lastName: 'Ezra Monroe',
    travelDate: '2024-01-04T21:46:39',
  },
  {
    bookingCode: 'GY7ZWB',
    lastName: 'Berk Ortiz',
    travelDate: '2024-01-05T22:36:41',
  },
  {
    bookingCode: 'FX3NMY',
    lastName: 'Garrett Reynolds',
    travelDate: '2023-12-30T03:42:04',
  },
  {
    bookingCode: 'UY5IMW',
    lastName: 'Jermaine Jones',
    travelDate: '2024-02-25T10:11:18',
  },
  {
    bookingCode: 'ZR7PRN',
    lastName: 'Plato Steele',
    travelDate: '2024-09-20T08:15:04',
  },
  {
    bookingCode: 'AE4UFC',
    lastName: 'Karleigh Jennings',
    travelDate: '2024-11-20T05:17:55',
  },
  {
    bookingCode: 'JG5QTP',
    lastName: 'Kerry Powell',
    travelDate: '2024-05-21T02:49:31',
  },
  {
    bookingCode: 'BK5YWR',
    lastName: 'Juliet Gardner',
    travelDate: '2024-01-01T10:00:44',
  },
  {
    bookingCode: 'FB4UNI',
    lastName: 'Fulton Jones',
    travelDate: '2024-08-22T04:57:35',
  },
  {
    bookingCode: 'XF9CGN',
    lastName: 'Christian Tanner',
    travelDate: '2024-01-13T02:51:13',
  },
  {
    bookingCode: 'KC4BLA',
    lastName: 'Kirestin Leon',
    travelDate: '2023-12-31T07:59:38',
  },
  {
    bookingCode: 'BK4JCB',
    lastName: 'Ralph Dunn',
    travelDate: '2023-08-22T02:47:23',
  },
  {
    bookingCode: 'WM2PRP',
    lastName: 'Jenna Hunt',
    travelDate: '2024-09-17T08:52:04',
  },
  {
    bookingCode: 'QT7MFR',
    lastName: 'Melvin Stevenson',
    travelDate: '2023-11-27T05:50:20',
  },
  {
    bookingCode: 'RV2PPE',
    lastName: 'Jerry Jackson',
    travelDate: '2024-03-15T02:56:46',
  },
  {
    bookingCode: 'VY6MCX',
    lastName: 'Murphy Riddle',
    travelDate: '2024-07-25T11:05:57',
  },
  {
    bookingCode: 'YS2YSR',
    lastName: 'Ali Miles',
    travelDate: '2024-01-01T17:00:10',
  }
];

const CheckInType = new GraphQLObjectType({
  name: 'CheckIn',
  fields: () => ({
    bookingCode: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    travelDate: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    checkIn: {
      type: CheckInType,
      args: {
        bookingCode: {
          type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString),
        },
      }, 
      resolve: (root, args) => {
        const booking = Bookings.find(
          (booking) => booking.bookingCode === args.bookingCode
        );
      
        if (!booking) {
          throw new GraphQLError('Invalid booking code.', { extensions: { code: 9001 } });
        }
      
        if (booking.lastName !== args.lastName) {
          throw new GraphQLError('Family name is invalid.', { extensions: { code: 9002 } });
        }
      
        const travelDate = new Date(booking.travelDate);
        const queryDate = new Date();
        const timeGap = travelDate.getTime() - queryDate.getTime();
        const oneDay = 24 * 60 * 60 * 1000;
      
        if (timeGap > 0 && timeGap < oneDay) {
          // throw new GraphQLError('Check-in success.', { extensions: { code: 200 } });
          return booking
        } else if (timeGap >= oneDay) {
          throw new GraphQLError('Check-in not available yet for this flight.', { extensions: { code: 9003 } });
        } else {
          throw new GraphQLError('Sorry online check-in closed for this flight.', { extensions: { code: 9004 } });
        }
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

const app = express();

app.use(cors());

app.use(
  '/newapp/checkin',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
