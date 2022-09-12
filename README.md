# PathVisualizer

A react.js app to visualize pathfinding algorithms in action.

## Motivation
I am just playing around with react, and visualizing the pathfinding algorithms seem like and interesting problem.

## How to Run it?
To use the app, run the following commands in your terminal.
1. `npm install`
2. `npm run dev`

This will start the web app at `http://localhost:1234`.

## What will it look like?
![Path finding using bfs](https://media.giphy.com/media/2ae7pgAwKE5j67vajv/giphy.gif)

## For developers
Any algorithm that you may want to visualize must return an array of snapshots of the matrix during different stages of executions.
These snapshot are then used to create the animation in Board.js.
