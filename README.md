# Hardhat Reset issue in CI

In this repo, any test that performs a `hardhat_reset` action ends in failure in CI with the following error:

```
<--- Last few GCs --->
[2095:0x62c1840]    23100 ms: Scavenge (reduce) 2046.7 (2082.8) -> 2046.7 (2083.8) MB, 8.1 / 0.0 ms  (average mu = 0.298, current mu = 0.159) allocation failure 
[2095:0x62c1840]    23947 ms: Mark-sweep (reduce) 2047.6 (2083.8) -> 2047.5 (2084.5) MB, 786.2 / 0.0 ms  (+ 309.4 ms in 98 steps since start of marking, biggest step 14.6 ms, walltime since start of marking 1154 ms) (average mu = 0.221, current mu = 0.085
<--- JS stacktrace --->
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
....
```

It is important to remark that locally the test passes successfuly, however in github actions it breaks with the error shown above.

## How to run tests locally

1. Install dependencies
```
yarn 
```

2. Compile contracts
```
yarn compile
```

3. Run tests
```
yarn test
```

The test will succeed locally:


```
  Test Breaks with Reset
    Test
      ✔ Cannot reach in CI due to failure in reset
```

## How to reproduce issue in CI

The error occurs with any PR with any change to force the CI to run. The CI will fail with the error shown above, at the time the hardhat reset is performed.
```
<--- Last few GCs --->
[2095:0x62c1840]    23100 ms: Scavenge (reduce) 2046.7 (2082.8) -> 2046.7 (2083.8) MB, 8.1 / 0.0 ms  (average mu = 0.298, current mu = 0.159) allocation failure 
[2095:0x62c1840]    23947 ms: Mark-sweep (reduce) 2047.6 (2083.8) -> 2047.5 (2084.5) MB, 786.2 / 0.0 ms  (+ 309.4 ms in 98 steps since start of marking, biggest step 14.6 ms, walltime since start of marking 1154 ms) (average mu = 0.221, current mu = 0.085
<--- JS stacktrace --->
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

To reproduce simply rerun the jobs for the open PR#15 (FAIL CI) and see how it fails in Github Actions.


## Important Hint

If you remove `contracts/fuzz/RTokenDiffTesting.sol` from the repo then the test passes, which indicates this could be the issue. The interesting thing is that this contract is not used anywhere in the code but for some reason seems to break something in the HH network. You can see how it works in PR# 14 (SUCCESSFUL CI) where the CI completed successfully.
