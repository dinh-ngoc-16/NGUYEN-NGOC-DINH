2 connection

- socket -> open a connect for FE connect realtime -> for update realtime top 10 score for user

- API -> action for increase score -> check in service when completed action will add score for the user

- config rate limit gateway -> each user can send 10 request for 5 minute -> if auto to much request (>50 in 2 minute) add to block list ip gateway in 12hours
