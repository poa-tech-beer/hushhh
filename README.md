# POA tech beer secret message App

## TODO

1. Minimal sketch (UX + design) - copy to clipboard, etc.
1. Files (photos) transfer
1. Make 100% serverless (ditch PeerJS) or host own PeerJS server

## Step by Step : how it works

### Part 1 : sender

1. User A opens app index, sees `src/components/MessageSend.js`
1. Writes message
1. Hits "send" button
1. PeerJS `id` is generated and rendered as a link (to be sent using _WhatsApp_)

### Part 2 : receiver

1. User B opens link -> sees `src/components/MessageReceive.js`
1. User B connects to User A using the `id` contained in link - `connection = peer.connect(id)`
1. When connection occurs - `connection.on("open")` the sender is notified - `connection.send()`

### Part 3 : after message is received

1. Sender (user A) sees "receiver has opened your message"
1. Receiver (user B) sees "sender knows you've opened her/his message"
