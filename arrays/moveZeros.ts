/**
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
 */

function moveZeroes(nums: number[]): void {
    let pivot = 1;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            while(pivot < nums.length) {
                if (nums[pivot] !== 0) {
                    nums[i] = nums[pivot];
                    nums[pivot] = 0;
                    break;
                }
                pivot++;
            }
        }

        pivot++;
    }
}

function moveZeroes2(nums: number[]): void {
    debugger;
    let insertPos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[insertPos] = nums[i];
            insertPos++;
        }
    }

    while(insertPos < nums.length) {
        nums[insertPos] = 0;
        insertPos++;
    }
}

let fakeInput = [];
for(let i = 0; i < 100000000; i++) {
    fakeInput.push(Math.floor(Math.random() * 10));
}

let input = [...fakeInput];
let p1 = performance.now();
moveZeroes(input);
console.log(`${performance.now() - p1} milliseconds`);
console.log(input);

input = [...fakeInput];
p1 = performance.now();
moveZeroes2(input);
console.log(`${performance.now() - p1} milliseconds`);
console.log(input);
