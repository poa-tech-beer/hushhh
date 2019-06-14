# POA tech beer secret message App

## Step by Step : how it works

### Part 1 : sender

1. User A opens app index, sees `src/components/MessageSend.js`
1. Writes message
1. Hits "send" button
1. PeerJS `id` is generated and rendered as a link (to be sent using _WhatSapp_)

### Part 2 : receiver

1. User B opens link -> sees `src/components/MessageReceive.js`
1. User B connects to User A using the `id` contained in link - `connection = peer.connect(id)`
1. When connection occurs - `connection.on("open")` the sender is notified - `connection.send()`
