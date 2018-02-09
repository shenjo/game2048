const TOTAL_ROW = 4, TOTAL_COL = 4;
const curry = (fn) => {
    const arity = fn.length;
    let curriedFn = (...args) => {
        if (args.length >= arity) {
            return fn.apply(null, args);
        } else {
            return (...anotherArgs) => {
                return curriedFn.apply(null, args.concat(anotherArgs))
            };
        }
    };
    return curriedFn;
};

const filter = curry((f, arr) => {
    return arr.filter(f);
});

/**
 * return start to end e.g. getRange(3,5) => [3,4,5]
 */
const getRange = (start, end) => {
    return [...new Array(end - start + 1)].map(() => start++)
};

/**
 * 初始化数组
 */
function initGivenLengthArr(count) {
    return [...new Array(count)].map(() => 0)
}

/**
 * 提取给定的列数组
 */
const getRowArr = ((TOTAL_ROW) => {
    return (givenArr, rowNum) => {
        return filter((item, index) => index >= (rowNum - 1) * TOTAL_ROW && index < rowNum * TOTAL_ROW)(givenArr)
    }
})(TOTAL_ROW, TOTAL_COL)

/**
 * 提取给定的列数组
 */
const getColArr = ((TOTAL_COL) => {
    return (givenArr, colNum) => {
        return filter((item, index) => index % TOTAL_COL === (colNum - 1))(givenArr)
    }
})(TOTAL_COL);

/**
 * 给定数组是否有相邻且值相同的
 */
const hasNeighborSameValue = givenArr => {
    let has = false;
    for (let i = 0, len = givenArr.length - 1; i < len;) {
        if (givenArr[i++] === givenArr[i]) {
            has = true;
            break;
        }
    }
    return has;
};

/**
 * 判断当前状态是否能左右移
 */
const canLeftRightMove = (givenArr) => {
    return getRange(1, TOTAL_ROW).some(row => {
        let rowArr = getRowArr(givenArr, row).filter(value => value !== 0);
        return rowArr.length < TOTAL_COL || hasNeighborSameValue(rowArr);
    })
};

/**
 * 判断当前状态是否能上下移
 */
const canUpDownMove = (givenArr) => {
    return getRange(1, TOTAL_COL).some(col => {
        let colArr = getColArr(givenArr, col).filter(value => value !== 0);
        return colArr.length < TOTAL_COL || hasNeighborSameValue(colArr);
    })
};

/**
 * 向左移动
 */
const leftMove = givenArr => {
    let result = [];
    getRange(1, TOTAL_ROW).forEach(row => {
        result = result.concat(completionArr(combineArr(getRowArr(givenArr, row).filter(value => value !== 0)),TOTAL_ROW));
    });
    return result;
};

/**
 * 向右移动
 */
const rightMove = givenArr => {
    let result = [];
    getRange(1, TOTAL_ROW).forEach(row => {
        result = result.concat(completionArr(combineArr(getRowArr(givenArr, row).filter(value => value !== 0).reverse()),TOTAL_ROW).reverse());
    });
    return result;
};

/**
 * 向上移动
 */
const upMove = givenArr => {
    let result = [];
    getRange(1, TOTAL_COL).forEach(col => {
        completionArr(combineArr(getColArr(givenArr, col).filter(value => value !== 0)),TOTAL_ROW).forEach((val, index) => {
            result[index * TOTAL_ROW + col - 1] = val;
        });
    });
    return result;
};

/**
 * 向下移动
 */
const downMove = givenArr => {
    let result = [];
    getRange(1, TOTAL_COL).forEach(col => {
        completionArr(combineArr(getColArr(givenArr, col).filter(value => value !== 0).reverse()),TOTAL_ROW).reverse().forEach((val, index) => {
            result[index * TOTAL_ROW + col - 1] = val;
        })
    });
    return result;
};

const combineArr = givenArr => {
    let result = [];
    for (let i = 0, len = givenArr.length; i < len;) {
        if (i !== len - 1 && givenArr[i] === givenArr[i+1]) {
            result.push(givenArr[i] + givenArr[i + 1]);
            i += 2;
        } else {
            result.push(givenArr[i]);
            i++;
        }
    }
    return result;
};

const completionArr = (givenArr, length) => {
    return givenArr.concat(initGivenLengthArr(length - givenArr.length));
};

export default {
    getRange,
    initGivenLengthArr,
    getRowArr,
    getColArr,
    hasNeighborSameValue,
    canLeftRightMove,
    canUpDownMove,
    combineArr,
    completionArr,
    leftMove,
    rightMove,
    upMove,
    downMove
}









