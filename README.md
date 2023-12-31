Flight Check-in Application
## Running client

```
cd client
npm i
ng s -o
```

## Running server

```
cd server
npm i
node index.js
```
## Test data

1. Scenario: check-in success
Mock data has been configured to test success scenarios till 5th January, 2024 till 23:10.
Use the below test data based on the day you test this application.

```
Test day: 2024-01-01
    bookingCode: 'KW3RMU',
    lastName: 'Caldwell Clements'

Test day: 2024-01-02
    bookingCode: 'BL1MVO',
    lastName: 'Jeanette Meadows',

Test day: 2024-01-03
    bookingCode: 'XP4YCP',
    lastName: 'Ezra Monroe',

Test day: 2024-01-04
    bookingCode: 'GY7ZWB',
    lastName: 'Berk Ortiz'

Test day: 2024-01-05
    bookingCode: 'UY5IMW',
    lastName: 'Jermaine Jones',
```

2. Scenario: Check-in not available yet for this flight.

```
Test day: Before September 20, 2024
    bookingCode: 'ZR7PRN',
    lastName: 'Plato Steele',
```

3. Scenario: Sorry online check-in closed for this flight.

```
Test day: Any day
    bookingCode: 'FX3NMY',
    lastName: 'Garrett Reynolds',
```

