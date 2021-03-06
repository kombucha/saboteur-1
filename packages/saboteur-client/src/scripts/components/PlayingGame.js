import React from "react";
import gameRules from "saboteur-shared/dist/game";
import Board from "./Board";
import Deck from "./Deck";
import Discard from "./Discard";
import GameBackground from "./GameBackground";

export default ({ slots, game, confirmSelectedCardDestination }) =>
  <div>
    <Board
      slots={slots}
      selectSlot={confirmSelectedCardDestination.bind(
        this,
        gameRules.DESTINATION_TYPES.SLOT
      )}
    />
    <Deck count={game.deck} />
    <Discard
      onDiscard={confirmSelectedCardDestination.bind(
        this,
        gameRules.DESTINATION_TYPES.DISCARD
      )}
    />
    <GameBackground />
  </div>;
