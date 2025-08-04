# DAX Formulas for Football Analytics

This document contains all DAX formulas created for the football analytics Power BI dashboard. These formulas analyze betting odds accuracy, team performance metrics, and match unpredictability using integrated football data from 2014-2020.

## Table of Contents
- [Basic Match Metrics](#basic-match-metrics)
- [Bookmaker Probability Calculations](#bookmaker-probability-calculations)
- [Betting Accuracy Indicators](#betting-accuracy-indicators)
- [Performance Differential Metrics](#performance-differential-metrics)
- [Match Outcome Predictions](#match-outcome-predictions)
- [Unpredictability Indices](#unpredictability-indices)
- [Match Differential Metrics](#match-differential-metrics)

---

## Basic Match Metrics

### TotalG - Total Goals in Match
```dax
TotalG = '14-20'[G1] + '14-20'[G2]
```
**Purpose:** Calculates the total number of goals scored in a match by both teams.
- `G1`: Home team goals
- `G2`: Away team goals
- **Use Case:** Analysis of goal-scoring patterns and over/under betting market accuracy

### TotalXg - Total Expected Goals in Match
```dax
TotalXg = '14-20'[xG1] + '14-20'[xG2]
```
**Purpose:** Calculates the total expected goals (xG) for both teams in a match.
- `xG1`: Home team expected goals
- `xG2`: Away team expected goals
- **Use Case:** Comparing actual goals vs expected goals to identify overperformance/underperformance

---

## Bookmaker Probability Calculations

### %>2.5 - Probability of Over 2.5 Goals
```dax
%>2.5 = (100/('14-20'[>2,5]/0.95))/100
```
**Purpose:** Converts bookmaker odds to implied probability for over 2.5 goals market.
- Takes bookmaker average odds for over 2.5 goals
- Removes 5% bookmaker margin (0.95 factor)
- Converts to percentage probability
- **Formula Logic:** `Probability = 1 / (Odds / Margin Adjustment)`

### %<2.5 - Probability of Under 2.5 Goals
```dax
%<2.5 = (100/('14-20'[<2,5]/0.95))/100
```
**Purpose:** Converts bookmaker odds to implied probability for under 2.5 goals market.
- Same logic as %>2.5 but for under 2.5 goals
- **Use Case:** Analyzing bookmaker accuracy in total goals predictions

### %W1 - Home Win Probability
```dax
%W1 = (100/('14-20'[W1]/0.95))/100
```
**Purpose:** Converts home win odds to implied probability.
- `W1`: Average bookmaker odds for home win
- **Use Case:** Comparing predicted vs actual home win rates

### %D - Draw Probability
```dax
%D = (100/('14-20'[D]/0.95))/100
```
**Purpose:** Converts draw odds to implied probability.
- `D`: Average bookmaker odds for draw
- **Use Case:** Analyzing draw prediction accuracy

### %W2 - Away Win Probability
```dax
%W2 = (100/('14-20'[W2]/0.95))/100
```
**Purpose:** Converts away win odds to implied probability.
- `W2`: Average bookmaker odds for away win
- **Use Case:** Comparing predicted vs actual away win rates

---

## Betting Accuracy Indicators

### OddG - Goals Betting Accuracy (Actual)
```dax
OddG = IF(
    '14-20'[TotalG] > 2.5,
    IF(
        '14-20'[%>2.5] > 49.9/100,
        1,
        0
    ),
    IF(
        '14-20'[%<2.5] > 49.9/100,
        1,
        0
    )
)
```
**Purpose:** Determines if bookmakers correctly predicted the over/under 2.5 goals outcome.
- **Logic:** 
  - If actual goals > 2.5 AND bookmaker probability for over 2.5 > 49.9%, then correct (1)
  - If actual goals ≤ 2.5 AND bookmaker probability for under 2.5 > 49.9%, then correct (1)
  - Otherwise incorrect (0)
- **Use Case:** Measuring bookmaker accuracy in goals markets

### OddXg - Goals Betting Accuracy (Expected)
```dax
OddXg = IF(
    '14-20'[TotalXg] > 2.5,
    IF(
        '14-20'[%>2.5] > 49.9/100,
        1,
        0
    ),
    IF(
        '14-20'[%<2.5] > 49.9/100,
        1,
        0
    )
)
```
**Purpose:** Same as OddG but uses expected goals instead of actual goals.
- **Use Case:** Comparing bookmaker predictions against xG-based expectations

### OddW - Match Result Betting Accuracy (Actual)
```dax
OddW = IF(
    '14-20'[G1] > '14-20'[G2],
    IF(
        '14-20'[%W1] > '14-20'[%W2],
        1,
        0
    ),
    IF(
        '14-20'[%W2] > '14-20'[%W1],
        1,
        0
    )
)
```
**Purpose:** Determines if bookmakers correctly predicted the match winner based on actual results.
- **Logic:** Compares actual winner with bookmaker favorite (higher probability)
- **Note:** Does not account for draws
- **Use Case:** Measuring bookmaker accuracy in match result predictions

### OddWXg - Match Result Betting Accuracy (Expected)
```dax
OddWXg = IF(
    '14-20'[xG1] > '14-20'[xG2],
    IF(
        '14-20'[%W1] > '14-20'[%W2],
        1,
        0
    ),
    IF(
        '14-20'[%W2] > '14-20'[%W1],
        1,
        0
    )
)
```
**Purpose:** Same as OddW but uses expected goals to determine the "deserved" winner.
- **Use Case:** Analyzing if bookmaker predictions align with underlying performance metrics

---

## Performance Differential Metrics

### Xg_Dif1 - Home Team Goal vs xG Difference
```dax
Xg_Dif1 = '14-20'[G1] - '14-20'[xG1]
```
**Purpose:** Measures how much the home team outperformed or underperformed their expected goals.
- **Positive values:** Team scored more than expected (clinical finishing)
- **Negative values:** Team scored less than expected (poor finishing)

### Xg_Dif2 - Away Team Goal vs xG Difference
```dax
Xg_Dif2 = '14-20'[G2] - '14-20'[xG2]
```
**Purpose:** Measures how much the away team outperformed or underperformed their expected goals.
- **Use Case:** Identifying teams with consistently good/poor finishing

---

## Match Outcome Predictions

### WinRealisation - Winner Based on Goal Overperformance
```dax
WinRealisation = IF(
    '14-20'[Xg_Dif1] > '14-20'[Xg_Dif2],
    IF(
        '14-20'[R] = "H",
        1,
        0
    ),
    IF(
        '14-20'[R] = "A",
        1,
        0
    )
)
```
**Purpose:** Checks if the team that better converted their chances won the match.
- **Logic:** Team with higher xG overperformance should win
- **Use Case:** Analyzing the relationship between clinical finishing and match outcomes

### WinXg - Winner Based on Expected Goals
```dax
WinXg = IF(
    '14-20'[xG1] > '14-20'[xG2],
    IF(
        '14-20'[R] = "H",
        1,
        0
    ),
    IF(
        '14-20'[R] = "A",
        1,
        0
    )
)
```
**Purpose:** Checks if the team with higher xG won the match.
- **Use Case:** Measuring how often the "deserving" team (based on chances created) actually wins

### WinSh - Winner Based on Total Shots
```dax
WinSh = IF(
    '14-20'[S1] > '14-20'[S2],
    IF(
        '14-20'[R] = "H",
        1,
        0
    ),
    IF(
        '14-20'[R] = "A",
        1,
        0
    )
)
```
**Purpose:** Checks if the team with more shots won the match.
- **Use Case:** Analyzing the correlation between shot volume and match results

### WinShT - Winner Based on Shots on Target
```dax
WinShT = IF(
    '14-20'[ST1] > '14-20'[ST2],
    IF(
        '14-20'[R] = "H",
        1,
        0
    ),
    IF(
        '14-20'[R] = "A",
        1,
        0
    )
)
```
**Purpose:** Checks if the team with more shots on target won the match.
- **Use Case:** Analyzing the relationship between shot accuracy and match outcomes

---

## Unpredictability Indices

### Unpredictability_Xg_Index - xG vs Bookmaker Predictions
```dax
Unpredictability_Xg_Index = 
VAR H = IF('14-20'[xG1] > '14-20'[xG2], 1, 0)
VAR A = IF('14-20'[xG1] < '14-20'[xG2], 1, 0)
VAR pH = '14-20'[%W1]
VAR pA = '14-20'[%W2]
VAR D = 0
VAR pD = '14-20'[%D]
RETURN (H - pH)^2 + (D - pD)^2 + (A - pA)^2
```
**Purpose:** Measures how much the xG-predicted outcome differs from bookmaker predictions.
- **Formula:** Sum of squared differences between xG-based predictions and bookmaker probabilities
- **Higher values:** Greater disagreement between xG and betting markets
- **Use Case:** Identifying matches where performance metrics disagree with market expectations

### Unpredictability_Index - Actual vs Bookmaker Predictions
```dax
Unpredictability_Index = 
VAR H = IF('14-20'[R] = "H", 1, 0)
VAR D = IF('14-20'[R] = "D", 1, 0)
VAR A = IF('14-20'[R] = "A", 1, 0)
VAR pH = '14-20'[%W1]
VAR pD = '14-20'[%D]
VAR pA = '14-20'[%W2]
RETURN (H - pH)^2 + (D - pD)^2 + (A - pA)^2
```
**Purpose:** Measures how unpredictable the actual match result was compared to bookmaker expectations.
- **Higher values:** More surprising results (upsets)
- **Use Case:** Identifying the most unpredictable matches and analyzing upset patterns

### Unpredictability_Xg2_Index - Modified xG vs Bookmaker Predictions
```dax
Unpredictability_Xg2_Index = 
VAR H = IF('14-20'[xG1]-0.5 > '14-20'[xG2], 1, 0)
VAR A = IF('14-20'[xG1] < '14-20'[xG2]-0.5, 1, 0)
VAR pH = '14-20'[%W1]
VAR pA = '14-20'[%W2]
VAR D = IF('14-20'[xG1]-0.5 < '14-20'[xG2] && '14-20'[xG1] > '14-20'[xG2]-0.5, 1, 0)
VAR pD = '14-20'[%D]
RETURN (H - pH)^2 + (D - pD)^2 + (A - pA)^2
```
**Purpose:** Modified version of xG unpredictability with 0.5 goal buffer for draws.
- **Logic:** Requires 0.5+ xG difference to predict a winner, otherwise predicts draw
- **Use Case:** More conservative xG-based predictions that account for small xG differences

---

## Match Differential Metrics

### Goal_Diff_In_Match - Goal Difference Magnitude
```dax
Goal_Diff_In_Match = IF(
    '14-20'[G1] > '14-20'[G2], 
    '14-20'[G1] - '14-20'[G2], 
    '14-20'[G2] - '14-20'[G1]
)
```
**Purpose:** Calculates the absolute goal difference in each match.
- **Values:** 0 (draw), 1 (one-goal difference), 2+ (multi-goal difference)
- **Use Case:** Analyzing match competitiveness and margin of victory patterns

### Xg_Diff_In_Match - Expected Goal Difference Magnitude
```dax
Xg_Diff_In_Match = MROUND(
    IF('14-20'[xG1] > '14-20'[xG2], 
       '14-20'[xG1] - '14-20'[xG2], 
       '14-20'[xG2] - '14-20'[xG1]),
    0.5
)
```
**Purpose:** Calculates the absolute xG difference in each match, rounded to nearest 0.5.
- **MROUND function:** Rounds to nearest 0.5 for easier categorization
- **Use Case:** Comparing actual goal differences with expected goal differences to identify close vs dominant performances

---

## Usage Notes

### Data Source
All formulas reference the `'14-20'` table containing integrated football data from 2014-2020 seasons.

### Key Assumptions
- **Bookmaker Margin:** 5% margin removed from odds (0.95 factor)
- **Probability Threshold:** 49.9% used as decision boundary for betting accuracy
- **xG Interpretation:** Higher xG indicates better attacking performance

### Recommended Applications
1. **Betting Market Analysis:** Use OddG, OddW, OddXg, OddWXg for accuracy studies
2. **Team Performance:** Use Xg_Dif metrics and Win indicators for team analysis
3. **Match Unpredictability:** Use Unpredictability indices for upset identification
4. **Market Efficiency:** Compare actual outcomes with xG predictions and bookmaker odds

### Power BI Implementation
These formulas are designed as calculated columns in Power BI and can be used in:
- **Visualizations:** Charts, tables, and cards
- **Filters:** Slicing data by accuracy indicators
- **Measures:** Aggregating accuracy rates and average indices
- **Relationships:** Connecting to team and season dimension tables