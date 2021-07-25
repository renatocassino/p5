function containsDuplicate(nums: number[]): boolean {
    const numsObject = new Set();
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (numsObject.has(num)) return true;

        numsObject.add(num);
    }

    return false;
};

const input = [1,2,3,1];

console.log(containsDuplicate(input));
