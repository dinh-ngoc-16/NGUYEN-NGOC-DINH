# system score of users

## Description

Design a system to handle request of users and prevent malicious users

# Technology

- Microservice
- Gateway
- Socket (real time connection)
- REST API
- JWT

# Implement

- Auth service:

1.  building a service for handle authentication, define a couple secret key and public key to generate and verify a JWT when login using resource.

- Gateway:

1. config authentication in gateway with publickey. set rate limit for each IP and add block IP if receive to much request from this IP.
2. if need 30s to completed a action. I suggest each IP should not send over 30 request in 2min and if over 100 request in 2min that IP will be block in 8 hours.

- Score service:

1. building connection socket for FE can show live top 10 score update
2. building a REST API for user to action for add score.
