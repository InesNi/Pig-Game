# Pig-Game

**Project created for Jonas Schmedtmann's 'The Complete JavaScript Course 2023: From Zero to Expert!' Udemy course**

The game is not deployed at this point. In order to play it needs to be hosted on a local server. One way to do this is to use `live-server' package.

## GAME RULES

- 2 players, playing in turns
- The objective of the game is to reach the score of a 100 before the other player.
- On players turn 2 actions can be performed: 'roll dice'(can be done multiple times per turn) and 'hold'.
- When rolling the dice each roll is added to player's current points, unless the roll is a 1
- If a 1 is rolled, player loses current points (accumulated by previous rolls in this turn) without being able to add them to their score, and it is the next players turn.
- When player presses 'hold' the current points (that player accumulated with dice rolls) are added to the players score and it is the next players turn.
