# Zombie Apocalypse v4.6.1

An implementation of the Zombie Apocalypse game by Gabriel Kennedy

&nbsp;

## Problem Description

A strange and deadly virus has infected the planet producing mindless zombies.

These zombies now wander the world converting any remaining living creatures they find to zombies as well.

The world is represented by an _n x n_ grid on which zombies and creatures live.
The location of zombies and creatures can be addressed using zero-indexed x-y coordinates. The top left corner of the world is (x: 0, y: 0). The horizontal coordinate is represented by x, and the vertical coordinate is represented by y.

At the beginning of the program, a single zombie awakes and begins to move around the
grid following a sequence of movements. Valid movements are Up, Down, Left, Right. The
movement sequence is represented by a string of single character movements, e.g. RDRU
(Right, Down, Right, Up).

Zombies can move through the edge of the grid, appearing on the directly opposite side. For
a 10x10 grid, a zombie moving left from (0, 4) will move to (9, 4); a zombie moving down
from (3, 9) will move to (3, 0).
Each time a zombie takes a step, the new location should be logged, eg:
zombie 0 moved to (2,3).
If a zombie occupies the same square as a creature, the creature is transformed into another
zombie.

Each time a zombie infects a creature this should be logged, eg:
zombie 0 infected creature at (3,3)
The creatures are aware of the zombie’s presence but are so frightened that they never
move.

Once a zombie has completed a movement, the first newly created zombie moves using
the same sequence as the original zombie, then the second newly created zombie moves,
and so on, in order of infection. Each zombie performs the same sequence of moves.

Once all zombies have completed moving, the final positions of all zombies and creatures should
be output, then the program ends.
Your task is to write a program that runs the above simulation using the following
input parameters:

- dimensions of the grid (N),
- the initial position of the zombie,
- a list of initial positions of the creatures ,
- and a list of moves the zombies will make,

  All inputs, logs and outputs are not limited to a particular format. You can use console, json,
  txt, a user interface, or anything else you would like.

&nbsp;

### Setup

`npm install`

### Run

Please choose your provided inputs within index.ts

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

## Edge Cases

Written to account for edge cases:

- If a Zombie moves to a tile containing multiple creatures, it should convert all creatures.

- if a Zombie spawns on the same tile as a creature, it should convert the creature.

- if a Zombie with no move sequence spawns on the same tile as a creature, should convert the creature

- Creatures or zombies should not be allowed to be given input positions outside of the allowed N dimension grid

&nbsp;
