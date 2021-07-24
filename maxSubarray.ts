const maxSubArray = (nums: number[]): number => {
    let maxSub = nums[0];
    let curSum = 0;

    for(let i = 0; i < nums.length; i++) {
        if (curSum < 0) {
            curSum = 0;
        }

        curSum += nums[i];
        maxSub = Math.max(maxSub, curSum);
    }

    return maxSub;
}

const input = [-2,1,-3,4,-1,2,1,-5,4];
const output = 6;

console.log(maxSubArray(input));
