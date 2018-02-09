import test from 'ava'
import * as types from '../src/assets/js/game-2048'

const fns = types.default;
const GAME_SIZE = 4;

test('getRange test', t => {
    const start = 10, end = 20;
    t.deepEqual(fns.getRange(start, end), [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 'getRange failed');
});

test('initGivenLengthArr test', t => {
    let arr = fns.initGivenLengthArr(12);
    t.is(arr.length, 12, 'initGivenLengthArr length error');
    t.true(arr.every(value => value === 0), 'initGivenLengthArr value err');
});

test('getRowArr test', t => {
    let arr = fns.getRange(1, 16);
    let row1 = fns.getRowArr(arr, 1);
    let row2 = fns.getRowArr(arr, 2);
    let row3 = fns.getRowArr(arr, 3);
    let row4 = fns.getRowArr(arr, 4);
    t.is(row1.length, GAME_SIZE);
    t.is(row2.length, GAME_SIZE);
    t.is(row3.length, GAME_SIZE);
    t.is(row4.length, GAME_SIZE);
    t.deepEqual(row1, [1, 2, 3, 4]);
    t.deepEqual(row2, [5, 6, 7, 8]);
    t.deepEqual(row3, [9, 10, 11, 12]);
    t.deepEqual(row4, [13, 14, 15, 16])
});

test('getColArr test', t => {
    let arr = fns.getRange(1, 16);
    let col1 = fns.getColArr(arr, 1);
    let col2 = fns.getColArr(arr, 2);
    let col3 = fns.getColArr(arr, 3);
    let col4 = fns.getColArr(arr, 4);
    t.is(col1.length, GAME_SIZE);
    t.is(col2.length, GAME_SIZE);
    t.is(col3.length, GAME_SIZE);
    t.is(col4.length, GAME_SIZE);
    t.deepEqual(col1, [1, 5, 9, 13]);
    t.deepEqual(col2, [2, 6, 10, 14]);
    t.deepEqual(col3, [3, 7, 11, 15]);
    t.deepEqual(col4, [4, 8, 12, 16])
});

test('hasNeighborSameValue test', t => {
    let arr = fns.getRange(1, 4);
    t.false(fns.hasNeighborSameValue(arr));
    arr[1] = 1;
    t.true(fns.hasNeighborSameValue(arr));
});

test('can left/right Move test', t => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.false(fns.canLeftRightMove(arr));
    arr[1] = 1;
    //  1 1  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.true(fns.canLeftRightMove(arr));
    arr[1] = 2;
    arr[13] = 0;
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 0 15 16
    t.true(fns.canLeftRightMove(arr));
});

test('can up/down Move test', t => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.false(fns.canUpDownMove(arr));
    arr[4] = 1;
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.true(fns.canUpDownMove(arr));
    arr[4] = 5;
    arr[13] = 0;
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 0 15 16
    t.true(fns.canUpDownMove(arr));
});

test('combineArr test', t => {
    let arr = [1, 2, 3, 4];
    t.deepEqual(fns.combineArr(arr), [1, 2, 3, 4]);
    arr = [1, 2, 3, 3];
    t.deepEqual(fns.combineArr(arr), [1, 2, 6]);
});

test('completionArr test', t => {
    let arr = [];
    t.deepEqual(fns.completionArr(arr, GAME_SIZE), [0, 0, 0, 0]);
    arr = [1, 2];
    t.deepEqual(fns.completionArr(arr, GAME_SIZE), [1, 2, 0, 0]);
});

test('left Move test', t => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.deepEqual(fns.leftMove(arr), arr);
    arr = [1, 2, 3, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  3
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.deepEqual(fns.leftMove(arr), [1, 2, 6, 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

test('right Move test', t => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.deepEqual(fns.rightMove(arr), arr);
    arr = [1, 2, 3, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  3
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.deepEqual(fns.rightMove(arr), [0, 1, 2, 6, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    arr = [1, 3, 3, 3, 5, 0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 3  3  3
    //  5 0  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.deepEqual(fns.rightMove(arr), [0, 1, 3, 6, 0, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

test('up Move test', t => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.deepEqual(fns.upMove(arr), arr);
    arr = [1, 2, 3, 4, 1, 6, 7, 8, 2, 10, 11, 12,2, 14, 15, 16];
    //  1 2  3  4
    //  1 6  7  8
    //  2 10 11 12
    // 2 14 15 16
    t.deepEqual(fns.upMove(arr), [2, 2, 3, 4, 4, 6, 7, 8, 0, 10, 11, 12, 0, 14, 15, 16]);
});

test('down Move test', t => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  1 2  3  4
    //  5 6  7  8
    //  9 10 11 12
    // 13 14 15 16
    t.deepEqual(fns.downMove(arr), arr);
    arr = [1, 2, 3, 4, 1, 6, 7, 8, 2, 10, 11, 12,2, 14, 15, 16];
    //  1 2  3  4
    //  1 6  7  8
    //  2 10 11 12
    // 2 14 15 16
    t.deepEqual(fns.downMove(arr), [0, 2, 3, 4, 0, 6, 7, 8, 2, 10, 11, 12, 4, 14, 15, 16]);
});
