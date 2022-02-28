# Zombie Apocalypse v4.6.1

An implementation of the Zombie Apocalypse game by Gabriel Kennedy

&nbsp;

### Setup

`npm install`

### Run

`npm start`

### Test

Unit tests implemented with jest

`npm test`

&nbsp;

# Class Structure Overview

### Entity

Zombie and Creature are subclasses of Entity, which holds info such as position, and contains methods to update these fields.

### Grid

The grid class holds the list of generated Entities, and contains methods to move Zombies in the grid, and get any relevant info.

&nbsp;

# Notes

## Retrospect

Initially I wrote Grid#performGridMoveIteration to be iterative, but then upon realising that new zombies would be required to move immediately, it seemed more apt to go with the recursive solution.

I spent some time figuring out why I was getting unexpected output (I overlooked the problem text `the top left corner of the world is (x: 0, y: 0)`, and assumed bottom left was the origin)

&nbsp;

## Assumptions

I made the assumption that a Zombie moves one command, and then the next zombie moves. It seemed possible that each zombie could perform all of its moves before the next zombie would move.

&nbsp;

## Next time

I ran a bit low on time during this project, so I only included some core tests to ensure proper functionality, and to give an idea of how I would write tests for this application.

&nbsp;

## Conclusion

Overall, I found this to be a fun, pretty straightforward task.
