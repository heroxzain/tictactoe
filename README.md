# tictactoe
## My Idea:
now if ignoring the comments then is it correct? should I move to UI and layout now? Also, I should maintain three different UI states. 
### UI State One:
* First is initial state where use will see dashboard, he can choose to play immediately without looking at dashboard and he can also choose to enter data (userName and symbol) and then proceed. On Dashboard there will be header, theme, userInput button which will pop dialogue, switch between single player and two player (which works instantly), and then start game button. 
### UI State Two:
* Then the second UI state is right after the user begin the game. Whether he plays it instantly or with start button, whether he chooses single player or not (default I'll keep two player), this UI state will show on dashboard the header, theme, active player name, a big symbol of X or O of him, and the restart button on bottom. On clicking the restart button the UI will move to the initial state. 
### UI State Three:
* The third UI state is game end. There the user will see the header, theme, winner name, winner symbol (but in different color) and the new game button. This UI is similar to the second UI state. Just the colors and text is changed. This will also redirect to the initial UI state on clicking on gameboard or on clicking on the button. 

## AI Written:
TIC TAC TOE — UI STATE BLUEPRINT

STATE 1 — SETUP / INITIAL
Purpose: Player decides how to start the game.

Dashboard shows:

* Header (Tic Tac Toe)
* Theme toggle
* Player setup button (opens dialog for name + symbol)
* Mode switch (Single Player / Two Player) — updates instantly
* Start Game button

Behavior:

* User may skip setup and start immediately
* Default mode: Two Player
* Starting the game moves to STATE 2

---

STATE 2 — GAME IN PROGRESS
Purpose: Show turn info and allow gameplay.

Dashboard shows:

* Header
* Theme toggle
* Active player name
* Large symbol showing whose turn it is (X or O)
* Restart button at bottom

Behavior:

* Restart returns to STATE 1
* Game continues until win or tie
* When game ends → move to STATE 3

---

STATE 3 — GAME END SCREEN
Purpose: Show winner and allow new match.

Dashboard shows:

* Header
* Theme toggle
* Winner name
* Winner symbol (highlighted color)
* New Game button

Behavior:

* Clicking New Game returns to STATE 1
* Clicking gameboard also returns to STATE 1

---

CORE RULE:
Only ONE state visible at a time.
Switching states replaces dashboard content, not the whole page.

STATE FLOW:
Initial → Playing → End → Initial
