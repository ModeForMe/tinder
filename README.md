# Mode For Me Tinder

This is a Tinder-style application for testing consumer demand for items by independent designers.

## Tech Stack

Node.js, Hapi.js on backend. Redis as a database. SASS on frontent. Tests in Tape.

## Run It
1. `git clone` the repo
2. `npm i`
3. `npm run watch` and `npm run dev`

## Deploy
`npm run build` and `npm start`

## Database Structure

Every product is stored in an individual hash, identified by an ID number. These ID numbers are stored in one central set called "products". Each product hash stores an image, designer and the number of likes.

#### Sample DB data

Product hash:
- key: 1
- designer: Michelle Garrett
- image: [url]
- likes: 0

Products set:
- 1
- 2
- 3
- 4
- 5
- 6
