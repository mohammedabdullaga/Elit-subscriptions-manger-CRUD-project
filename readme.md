<<<<<<< HEAD
# Subscription Mangement App ( MEN STACK )
A simple MEN  ( MongoDB, Express, Node.js ) for managing subscribers and thier subscriptions

Admin can create , Edit , and Delete subscribers.
subscribers can log in to the app to view their  subscriptions details.

## fetures:
- Admin login/logout
- Create , Read , Update , Delete subscribers.
- subscribers can sighn up and view their subscriptions.
- Role-Based access ( Admin/ subscriber )

## User Stories:
### Admin:
- Log in as admin
- Add a subscriber
- Edit a subscriber
- Delete a subscriber
- srearch for a subscriber
- view all subscripers

## Subscriber:
- sign up with thier mobile Number
- kog in
- View thier own subscribtions

# ERD
! [ERD] (./public/ERD.png)


## Models
### User
- _id
- phone
- role
- password

#### Subscription
- _id
- packageType
- expiryDate
- userId

## Mockup:
! [ERD] (./public/mockup.png)