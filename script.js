// DOM Elements
const allCircles= document.querySelectorAll('.cell:not(.row-top)');
const topCircles = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');





// kollomen

const column0 = [allCircles[35], allCircles[28], allCircles[21], allCircles[14], allCircles[7], allCircles[0], allCircles[0]];
const column1 = [allCircles[36], allCircles[29], allCircles[22], allCircles[15], allCircles[8], allCircles[1], allCircles[1]];
const column2 = [allCircles[37], allCircles[30], allCircles[23], allCircles[16], allCircles[9], allCircles[2], allCircles[2]];
const column3 = [allCircles[38], allCircles[31], allCircles[24], allCircles[17], allCircles[10], allCircles[3], allCircles[3]];
const column4 = [allCircles[39], allCircles[32], allCircles[25], allCircles[18], allCircles[11], allCircles[4], allCircles[4]];
const column5 = [allCircles[40], allCircles[33], allCircles[26], allCircles[19], allCircles[12], allCircles[5], allCircles[5]];
const column6 = [allCircles[41], allCircles[34], allCircles[27], allCircles[20], allCircles[13], allCircles[6], allCircles[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];








// rij
const topRow = [allCircles[0], allCircles[1], allCircles[2], allCircles[3], allCircles[4], allCircles[5], allCircles[6]];
const row0 = [allCircles[0], allCircles[1], allCircles[2], allCircles[3], allCircles[4], allCircles[5], allCircles[6]];
const row1 = [allCircles[7], allCircles[8], allCircles[9], allCircles[10], allCircles[11], allCircles[12], allCircles[13]];
const row2 = [allCircles[14], allCircles[15], allCircles[16], allCircles[17], allCircles[18], allCircles[19], allCircles[20]];
const row3 = [allCircles[21], allCircles[22], allCircles[23], allCircles[24], allCircles[25], allCircles[26], allCircles[27]];
const row4 = [allCircles[28], allCircles[29], allCircles[30], allCircles[31], allCircles[32], allCircles[33], allCircles[34]];
const row5 = [allCircles[35], allCircles[36], allCircles[37], allCircles[38], allCircles[39], allCircles[40], allCircles[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];



let gameIsLive = true;
let yellowIsNext = true;


// Functions
const getClassListArray = (cell) => {
    const classList = cell.classList;
    return [...classList];
};

const getCellLocation = (cell) => {
    const classList = getClassListArray(cell);

    const rowClass = classList.find(className => className.includes('row'));
    const colClass = classList.find(className => className.includes('col'));
    const rowIndex = rowClass[4];
    const colIndex = colClass[4];
    const rowNumber = parseInt(rowIndex, 10);
    const colNumber = parseInt(colIndex, 10);

    return [rowNumber, colNumber];
};

const getFirstOpenCellForColumn = (colIndex) => {
    const column = columns[colIndex];
    const columnWithoutTop = column.slice(0, 6);

    for (const cell of columnWithoutTop) {
        const classList = getClassListArray(cell);
        if (!classList.includes('yellow') && !classList.includes('red')) {
            return cell;
        }
    }

    return null;
};

const clearColorFromTop = (colIndex) => {
    const topCell = topCells[colIndex];
    topCell.classList.remove('yellow');
    topCell.classList.remove('red');
};

const getCircleKleur = (cell) => {
    const classList = getClassListArray(cell);
    if (classList.includes('yellow')) return 'yellow';
    if (classList.includes('red')) return 'red';
    return null;
};

const checkWinningCells = (cells) => {
    if (cells.length < 4) return false;

    gameIsLive = false;
    for (const cell of cells) {
        cell.classList.add('win');
    }
    statusSpan.textContent = `${yellowIsNext ? 'Yellow' : 'Red'} has won!`
    return true;
};

const checkSpelStatus = (cell) => {
    const color = getCircleKleur(cell);
    if (!color) return;
    const [rowIndex, colIndex] = getCellLocation(cell);
    let winningCells = [cell];
    let rowToCheck = rowIndex;
    let colToCheck = colIndex - 1;
    while (colToCheck >= 0) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            colToCheck--;
        } else {
            break;
        }
    }
    colToCheck = colIndex + 1;
    while (colToCheck <= 6) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            colToCheck++;
        } else {
            break;
        }
    }
    let isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;


    winningCells = [cell];
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex;
    while (rowToCheck >= 0) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            rowToCheck--;
        } else {
            break;
        }
    }
    rowToCheck = rowIndex + 1;
    while (rowToCheck <= 5) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            rowToCheck++;
        } else {
            break;
        }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;


    winningCells = [cell];
    rowToCheck = rowIndex + 1;
    colToCheck = colIndex - 1;
    while (colToCheck >= 0 && rowToCheck <= 5) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            rowToCheck++;
            colToCheck--;
        } else {
            break;
        }
    }
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex + 1;
    while (colToCheck <= 6 && rowToCheck >= 0) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            rowToCheck--;
            colToCheck++;
        } else {
            break;
        }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;


    winningCells = [cell];
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex - 1;
    while (colToCheck >= 0 && rowToCheck >= 0) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            rowToCheck--;
            colToCheck--;
        } else {
            break;
        }
    }
    rowToCheck = rowIndex + 1;
    colToCheck = colIndex + 1;
    while (colToCheck <= 6 && rowToCheck <= 5) {
        const cellToCheck = rows[rowToCheck][colToCheck];
        if (getCircleKleur(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            rowToCheck++;
            colToCheck++;
        } else {
            break;
        }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    const rowsWithoutTop = rows.slice(0, 6);
    for (const row of rowsWithoutTop) {
        for (const cell of row) {
            const classList = getClassListArray(cell);
            if (!classList.includes('yellow') && !classList.includes('red')) {
                return;
            }
        }
    }

    gameIsLive = false;
    statusSpan.textContent = "Game is a tie!";
};



const handleCellMouseOver = (e) => {
    if (!gameIsLive) return;
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell);

    const topCell = topCells[colIndex];
    topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
};

const handleCellMouseOut = (e) => {
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell);
    clearColorFromTop(colIndex);
};

const handleCellClick = (e) => {
    if (!gameIsLive) return;
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell);

    const openCell = getFirstOpenCellForColumn(colIndex);

    if (!openCell) return;

    openCell.classList.add(yellowIsNext ? 'yellow' : 'red');
    checkSpelStatus(openCell);

    yellowIsNext = !yellowIsNext;
    clearColorFromTop(colIndex);
    if (gameIsLive) {
        const topCell = topCells[colIndex];
        topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
    }
};




//  Event Listeners
for (const row of rows) {
    for (const cell of row) {
        cell.addEventListener('mouseover', handleCellMouseOver);
        cell.addEventListener('mouseout', handleCellMouseOut);
        cell.addEventListener('click', handleCellClick);
    }
}

resetButton.addEventListener('click', () => {
    for (const row of rows) {
        for (const cell of row) {
            cell.classList.remove('red');
            cell.classList.remove('yellow');
            cell.classList.remove('win');
        }
    }
    gameIsLive = true;
    yellowIsNext = true;
    statusSpan.textContent = '';
});