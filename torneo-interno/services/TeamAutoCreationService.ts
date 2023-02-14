interface Player {
  position: number;
  level: number;
}

/**
 * Function that separates a group of players into levelled up groups with similar amount of players, positions and average level.
 *
 * @param players An array of players, where each player has a position (1 to 5) and a level (1 to 5).
 * @returns An array of arrays, where each inner array represents a group of players.
 */
export const autoCreateTeams = (players: Player[]): Player[][] => {
  // First, calculate the average level of all players.
  const n = players.length;
  let averageLevel = 0;
  for (const player of players) {
    averageLevel += player.level;
  }
  averageLevel /= n;

  // Create a 2D array with 5 empty arrays to represent the 5 groups of players.
  const result: Player[][] = [];
  for (let i = 0; i < 5; i++) {
    result.push([]);
  }

  // Group players based on their position.
  for (const player of players) {
    result[player.position - 1].push(player);
  }

  // Sort the groups by their average level.
  result.sort((group1, group2) => {
    const averageLevel1 =
      group1.reduce((sum, player) => sum + player.level, 0) / group1.length;
    const averageLevel2 =
      group2.reduce((sum, player) => sum + player.level, 0) / group2.length;
    return averageLevel1 - averageLevel2;
  });

  // Distribute the players into the groups so that each group has similar number of players, positions, and average level.
  const finalResult: Player[][] = [];
  let currentResultIndex = 0;
  for (const group of result) {
    if (!finalResult[currentResultIndex]) {
      finalResult.push([]);
    }
    for (const player of group) {
      if (finalResult[currentResultIndex].length === n / 5) {
        currentResultIndex++;
        if (!finalResult[currentResultIndex]) {
          finalResult.push([]);
        }
      }
      finalResult[currentResultIndex].push(player);
    }
  }

  return finalResult;
};
