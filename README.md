# Mode For Me Tinder

This is a Tinder-style application for testing consumer demand for items by independent designers.

## Tech Stack

Node.js, Hapi.js on backend. Redis as a database. SASS on frontent. Tests in Tape.

## Database Structure

Every product is stored in an individual hash, identified by an ID number. These ID numbers are stored in one central set called "products". Each produt hash stores an image and the number of likes.
