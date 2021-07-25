```js
const data = {
    grapes: 1000,
};
```

The hash data.grapes, the grapes will be changed to a hash, like MD5.

grapes = 15a8de26589689d0fa41acee04d25b8a

This hash will be changed to an index of memory to get the valus in O(1).

Insert: O(1)
Lookup: O(1)
Delete: O(1)
Search: O(1)

# Dispertion table

https://www.cs.usfca.edu/~galles/visualization/OpenHash.html

Is possible to exist some colision if the dispertion table are small.
When have a colision the assintotic is O(n/k), where k is the number of elements in the same hash.

Examples in hashTable.ts file.

All data save a list of buckets with name and value. When have a collision, just add a new value in array.

https://en.wikipedia.org/wiki/Hash_table#Collision_resolution

Pros:

Fast Lookups * (Good collision resolution needed)
Fast inserts
Flexible Keys

Cons:

Unordered
Slow key iteration
