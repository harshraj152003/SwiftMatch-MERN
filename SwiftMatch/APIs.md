# DEVTinder APIs

## authRouter ✅
- POST /signup
- POST /login
- POST /logout

## profileRouter ✅
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter ✅
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- /request/send/:status/:toUserId


- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter ✅
- GET /user/connections
- GET /user/requests/pending
- GET /user/feed - Gets you the profiles