# What

This is a little script that tries to simulate different outcomes for F1 Fantasy and help you pick the best team.

# How

It generates a bunch of possible different qualifying grids as well as the final race position. This is based on a `pace` map, whereby the more pace difference, the less chance a driver has of finishing ahead of a faster driver.
It generates all possible team compositions given the available budget.
For each quali grid and race finishing position combo, it assigns the respective points to each team.
Across all the top 100 scoring teams in each quali-race combo, it finds out the most frequent teams and the ones that have the best average score, provided they show up at least 5 times


# Setup

Clone this repo and then run

```
npm install
```

This was done in node `v14.9.0`. Make sure you have a compatible version. Recommend using `nvm` for node version managing



# How to use

Go to the root directory and run 

```
node --stack-size=24000 main.js
```

The 24000 should be high enough to calculate everything, but if you get a stack call error, just increase it.


# Customize it

There are three command line options you can pass:

```
node --stack-size=20000 main.js --iterations=100 --TD=PER --budget=100
```

- Iterations is how many quali-race grid combos you want. Default is 100. Keep in mind increasing this can dramatically slow down calculations. **This code is not optimized**  
- Budget is the available budget to build teams. Default is 100
- TD is your turbo driver. Bear in mind they will heavy skew your results, so try to pick a decent choice. I suggest `PER`. If not specified it will just ignore turbo points.

## Changing base data

In the `data/data.js` file there's a `pace` object specifying the relative pace for drivers and constructors.
The fastest drivers get 0, the slower a driver/car the bigger that value is.

For example:  
- `HAM` is the fastest driver so we give him a `0.0`
- `BOT` is a bit slower, so we give him `0.2` (I think of it as 2 tenths slower, but that's not necessarily the interpretation here. It's just a value to indicate how much slower)

- `MER` is fastest constructor so they get a `0.0` too

- `VER` is as fast as `HAM` so we give him `0.0` as well

- `RBR` however, is a bit slower, so they get `0.1`

That makes means the following:

`HAM` + `MER` = 0.0   
`VER` + `RBR` = 0.1   
`BOT` + `MER` = 0.2   

So there's a higher chance `VER` will beat `BOT` in most samples.   
Try to adjust the values to however you see fit.

# Further improvements and comments

This does not take MD, streaks or fastest lap into considerations. Nor does it generate grid with `DSQ`s or `DNF`s.   
I might include some of those features at some point but this is a good first set so far and I think useful enough.

My next thought is to actually create a UI before tacking those issues
