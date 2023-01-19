/** Represents a keyboard */
class Keeb {
  /**
   * @param {string} name Name of the keyboard
   * @param {number} keyWidth Width of a basic key
   * @param {number} spaceWidth Width of the spaces between keys
   */
  constructor(name, keyWidth, spaceWidth) {
    this.name = name;
    this.keyWidth = keyWidth;
    this.spaceWidth = spaceWidth;
    this.rows = [];
  }

  /**
   * Attempts to locate the key on the keyboard and provide its x, y coordinates if found
   * @param {string} value Character on the key
   * @returns {undefined|Point} x, y coordinates of the key or undefined if not found
   */
  getKeyPoint(value) {
    // Locate the key
    let keyFound = false;
    let xPos, yPos;
    const searchVal = value.toLowerCase();

    for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
      const currentKeys = this.rows[rowIndex].keys;
      for (let keyIndex = 0; keyIndex < currentKeys.length; keyIndex++) {
          if (currentKeys[keyIndex].value === searchVal) {
              xPos = keyIndex;
              yPos = rowIndex;
              keyFound = true;
              break;
          }
      }      
      if (keyFound) {
          break;
      }
    }

    if (!keyFound) {
      return;
    }

    // Convert to x, y
    let x, y;
    x = this.rows[yPos].xStart + (this.keyWidth + this.spaceWidth) * xPos;
    y = (this.keyWidth + this.spaceWidth) * yPos;
    return new KeebPoint(x, y);
  }
}

/** Represents a row of a keyboard */
class KeebRow {
  /**
   * @param {number} xStart X co-ordinate of the first letter or number key in the row
   */
  constructor(xStart) {
    this.xStart = xStart;
    this.keys = [];
  }
  /**
   * Creates a new key and adds it to the end of the row
   * @param {string} value Character displayed on the key
   */
  addKey(value) {
    this.keys.push(new KeebKey(value));
  }
}

/** Represents a key of a keyboard */
class KeebKey {
  /**
   * @param {string} value Character displayed on the key
   */
  constructor(value) {
    this.value = value;
  }
}

/** Represents a 2-D point on a keyboard */
class KeebPoint {
  /**
   *  @property {number} x The X-coordinate.
   *  @property {number} y The Y-coordinate.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Represents a keyboard with QWERTY layout
 * @extends Keeb
 */
class QwertyKeeb extends Keeb {
  constructor() {
    super("QWERTY", 15, 25 / 6);
    this.#buildKeeb();
  }

  #buildKeeb() {
    const xStarts = [this.keyWidth + this.spaceWidth, 27, 38, 43];
    const keebVals = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
    ];
    for (let i = 0; i < keebVals.length; i++) {
      let newRow = new KeebRow(xStarts[i]);
      keebVals[i].forEach((val) => {
        newRow.addKey(val);
      });
      this.rows.push(newRow);
    }
  }
}


export { QwertyKeeb };
