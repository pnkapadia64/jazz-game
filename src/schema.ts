/**
 * Learn about schemas here:
 * https://jazz.tools/docs/react/schemas/covalues
 */

import {
  Account,
  CoMap,
  Group,
  Profile,
  co,
  CoValue,
  CoFeed,
  CoList,
} from "jazz-tools";

/** The account profile is an app-specific per-user public `CoMap`
 *  where you can store top-level objects for that user */
export class JazzProfile extends Profile {
  /**
   * Learn about CoValue field/item types here:
   * https://jazz.tools/docs/react/schemas/covalues#covalue-fielditem-types
   */
  firstName = co.string;

  // Add public fields here
}

/** The account root is an app-specific per-user private `CoMap`
 *  where you can store top-level objects for that user */
export class AccountRoot extends CoMap {
  dateOfBirth = co.Date;
  highScore = co.number;

  // Add private fields here

  get age() {
    if (!this.dateOfBirth) return null;

    return new Date().getFullYear() - this.dateOfBirth.getFullYear();
  }
}

export class JazzAccount extends Account {
  profile = co.ref(JazzProfile);
  root = co.ref(AccountRoot);

  /** The account migration is run on account creation and on every log-in.
   *  You can use it to set up the account root and any other initial CoValues you need.
   */
  migrate(this: JazzAccount) {
    if (this.root === undefined) {
      const group = Group.create();

      this.root = AccountRoot.create(
        {
          dateOfBirth: new Date("1/1/1990"),
          highScore: 0,
        },
        group
      );
    }
  }
}

export class JazzGame extends CoMap {
  highestScore = co.number;
}

export class Leaderboard extends CoFeed.Of(co.number) {}

export function createLeaderboard() {
  const group = Group.create();
  group.addMember("everyone", "writer"); // everyone can push to the leaderboard
  return Leaderboard.create([], group);
}

export function addScore(leaderboard: Leaderboard, value: number) {
  leaderboard.push(value);
}
