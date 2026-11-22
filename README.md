[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/huahhhas/tiny-stack-vm-01-run-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/huahhhas/tiny-stack-vm-01-run-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)

# Tiny stack VM

A tiny stack virtual machine for [tiny-stack-vm-01-run-20261122 on make.fun](https://make.fun/bounty/tiny-stack-vm-01-run-20261122) ($100 USDC prize).

`main.ts` (Node 22, no dependencies) reads `MAKEFUN_INPUT_DIR` (default `/input`) and `MAKEFUN_OUTPUT_DIR` (default `/output`), runs each instance's `program.bin` with its `input.bin` on the 32-bit wrapping stack ISA from the kit's `ISA.md` — 256-value stack, 64-deep call stack, 256 words of memory, traps with exit codes 2–11, 1,000,000-step and 65,536-byte output limits — and writes `<id>/stdout.bin` plus `<id>/exit.txt` for all 40 instances.

Practice set: 40/40 exact stdout, 40/40 exact exit (score 1,000,000), deterministic across runs, ~0.3s for the full set.
