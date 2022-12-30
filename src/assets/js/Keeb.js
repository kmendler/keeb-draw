/** Represents a keyboard */
class Keeb {
  rows = [];
  /**
   * @param {string} name Name of the keyboard
   * @param {number} key_width Width of a basic key
   * @param {number} space_width Width of the spaces between keys
   */
  constructor(name, key_width, space_width) {
    this.name = name;
    this.key_width = key_width;
    this.space_width = space_width;
  }

  /**
   * Attempts to locate the key on the keyboard and provide its x, y coordinates if found
   * @param {string} value Character on the key
   * @returns {undefined|Point} x, y coordinates of the key or undefined if not found
   */
  getKeyPoint(value) {
    // Locate the key
    let x_pos, y_pos;
    let keyFound = false;
    let searchVal = value.toLowerCase();
    searchLoop: for (let row_i = 0; row_i < this.rows.length; row_i++) {
      let currentKeys = this.rows[row_i].keys;
      for (let key_i = 0; key_i < currentKeys.length; key_i++) {
        if (currentKeys[key_i].value === searchVal) {
          x_pos = key_i;
          y_pos = row_i;
          keyFound = true;
          break searchLoop;
        }
      }
    }

    if (!keyFound) {
      return;
    }

    // Convert to x, y
    let x, y;
    x = this.rows[y_pos].x_start + (this.key_width + this.space_width) * x_pos;
    y = (this.key_width + this.space_width) * y_pos;
    return new KeebPoint(x, y);
  }
}

/** Represents a row of a keyboard */
class KeebRow {
  keys = [];
  /**
   * @param {number} x_start X co-ordinate of the first letter or number key in the row
   */
  constructor(x_start) {
    this.x_start = x_start;
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
    const x_starts = [this.key_width + this.space_width, 27, 38, 43];
    const keebVals = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
    ];
    for (let i = 0; i < keebVals.length; i++) {
      let newRow = new KeebRow(x_starts[i]);
      keebVals[i].forEach((val) => newRow.addKey(val));
      this.rows.push(newRow);
    }
  }
}

// Main
const qwertyKeeb = new QwertyKeeb();
console.log(qwertyKeeb);
console.log(qwertyKeeb.getKeyPoint("1"));
console.log(qwertyKeeb.getKeyPoint("l"));
console.log(qwertyKeeb.getKeyPoint(";"));
