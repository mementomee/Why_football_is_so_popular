# DAX Formulas for Football Analytics Power BI Dashboard

This document contains all DAX formulas used in the football analytics Power BI dashboard analyzing 2,820 Premier League matches from 2014-2020 seasons. The analysis focuses on betting market efficiency, team performance metrics, and match unpredictability.

## Table of Contents
- [Calculated Columns (Main Table '14-20')](#calculated-columns-main-table-14-20)
  - [Basic Match Metrics](#basic-match-metrics)
  - [Bookmaker Probability Calculations](#bookmaker-probability-calculations)
  - [Betting Accuracy Indicators](#betting-accuracy-indicators)
  - [Performance Differential Metrics](#performance-differential-metrics)
  - [Match Outcome Predictors](#match-outcome-predictors)
  - [Unpredictability Indices](#unpredictability-indices)
  - [Match Analysis Metrics](#match-analysis-metrics)
  - [Temporal Classification](#temporal-classification)
  - [Team Classification](#team-classification)
- [Calculated Tables](#calculated-tables)
- [Measures](#measures)

---

## Calculated Columns (Main Table '14-20')

### Basic Match Metrics

#### TotalG - Total Goals in Match
```dax
TotalG = '14-20'[G1] + '14-20'[G2]
```
**Purpose:** Sum of goals scored by both teams.
- **Use Case:** Over/Under 2.5 goals market analysis

#### TotalXg - Total Expected Goals in Match
```dax
TotalXg = '14-20'[xG1]+'14-20'[xG2]
```
**Purpose:** Sum of expected goals for both teams.
- **Use Case:** Comparing actual vs expected goal totals

---

### Bookmaker Probability Calculations

#### %>2.5 - Probability of Over 2.5 Goals
```dax
%>2.5 = (100/('14-20'[>2,5]/0.95))/100
```
**Purpose:** Converts bookmaker odds to implied probability for over 2.5 goals.
- **Logic:** Removes 5% bookmaker margin (0.95 factor)
- **Formula:** `1 / (Odds / 0.95)`

#### %<2.5 - Probability of Under 2.5 Goals
```dax
%<2.5 = (100/('14-20'[<2,5]/0.95))/100
```
**Purpose:** Converts bookmaker odds to implied probability for under 2.5 goals.

#### %W1 - Home Win Probability
```dax
%W1 = (100/('14-20'[W1]/0.95))/100
```
**Purpose:** Home team win probability from betting odds.

#### %D - Draw Probability
```dax
%D = (100/('14-20'[D]/0.95))/100
```
**Purpose:** Draw probability from betting odds.

#### %W2 - Away Win Probability
```dax
%W2 = (100/('14-20'[W2]/0.95))/100
```
**Purpose:** Away team win probability from betting odds.

---

### Betting Accuracy Indicators

#### OddG - Goals Betting Accuracy (Actual Results)
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
**Purpose:** Binary indicator (1/0) if bookmakers correctly predicted over/under 2.5 goals based on actual results.
- **Threshold:** 49.9% probability required for prediction

#### OddXg - Goals Betting Accuracy (Expected Goals)
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
- **Use Case:** Comparing bookmaker accuracy against mathematical models

#### OddW - Match Winner Betting Accuracy (Actual Results)
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
**Purpose:** Binary indicator if bookmakers correctly predicted the match winner.
- **Note:** Only considers wins, ignores draws

#### OddWXg - Match Winner Betting Accuracy (Expected Goals)
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
**Purpose:** Checks if bookmaker favorite aligns with xG-deserved winner.

---

### Performance Differential Metrics

#### Xg_Dif1 - Home Team Goal vs xG Difference
```dax
Xg_Dif1 = '14-20'[G1]-'14-20'[xG1]
```
**Purpose:** Home team finishing efficiency (goals minus expected goals).
- **Positive:** Outperformed xG (clinical finishing)
- **Negative:** Underperformed xG (poor finishing)

#### Xg_Dif2 - Away Team Goal vs xG Difference
```dax
Xg_Dif2 = '14-20'[G2]-'14-20'[xG2]
```
**Purpose:** Away team finishing efficiency.

#### G_diff_Xg - Total Goals vs Expected Goals Difference
```dax
G_diff_Xg = '14-20'[TotalG]-'14-20'[TotalXg]
```
**Purpose:** How much actual match total differed from expected.

#### xpts_diff1 - Home Team Expected Points Difference
```dax
xpts_diff1 = [pts1]-[xpts1]
```
**Purpose:** Home team actual points minus expected points.

#### xpts_diff2 - Away Team Expected Points Difference
```dax
xpts_diff2 = [pts2]-[xpts2]
```
**Purpose:** Away team actual points minus expected points.

---

### Match Outcome Predictors

#### WinRealisation - Winner Based on Finishing Efficiency
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
**Purpose:** Checks if the team with better finishing efficiency won.

#### WinXg - Winner Based on Expected Goals
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
**Purpose:** Checks if the team with higher xG won.

#### WinSh - Winner Based on Shot Volume
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
**Purpose:** Correlation between shots and match results.

#### WinShT - Winner Based on Shots on Target
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
**Purpose:** Correlation between shot accuracy and results.

---

### Unpredictability Indices

#### Unpredictability_Xg_Index - xG vs Bookmaker Disagreement
```dax
Unpredictability_Xg_Index = 
VAR H = IF(
        '14-20'[xG1] > '14-20'[xG2],
        1,
        0)
VAR A = IF(
        '14-20'[xG1] < '14-20'[xG2],
        1,
        0)
VAR pH = '14-20'[%W1]
VAR pA = '14-20'[%W2]
VAR D = 0
VAR pD = '14-20'[%D]
RETURN (H - pH)^2 + (D - pD)^2 + (A - pA)^2
```
**Purpose:** Measures disagreement between xG predictions and betting market.
- **Higher values:** Greater mismatch between performance and market expectations

#### Unpredictability_Index - Actual vs Bookmaker Predictions
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
**Purpose:** Measures how surprising actual results were vs bookmaker expectations.
- **Higher values:** More unpredictable matches (upsets)

#### Unpredictability_Xg_+-0.5_Index - Conservative xG Predictions
```dax
Unpredictability_Xg_+-0.5_Index = 
VAR H = IF(
        '14-20'[xG1]-0.5 > '14-20'[xG2],
        1,
        0)
VAR A = IF(
        '14-20'[xG1] < '14-20'[xG2]-0.5,
        1,
        0)
VAR pH = '14-20'[%W1]
VAR pA = '14-20'[%W2]
VAR D = IF(
        '14-20'[xG1]-0.5 < '14-20'[xG2] && '14-20'[xG1] > '14-20'[xG2]-0.5,
        1,
        0)
VAR pD = '14-20'[%D]
RETURN (H - pH)^2 + (D - pD)^2 + (A - pA)^2
```
**Purpose:** Modified xG index with 0.5 goal buffer for draws.
- **Logic:** Requires significant xG advantage (>0.5) to predict winner

---

### Match Analysis Metrics

#### Goal_Diff_In_Match - Goal Difference Magnitude
```dax
Goal_Diff_In_Match = IF('14-20'[G1] > '14-20'[G2], '14-20'[G1] - '14-20'[G2], '14-20'[G2] - '14-20'[G1])
```
**Purpose:** Absolute goal difference (margin of victory).

#### Xg_Diff_In_Match - Expected Goal Difference
```dax
Xg_Diff_In_Match = MROUND(
    IF('14-20'[xG1] > '14-20'[xG2], '14-20'[xG1] - '14-20'[xG2], '14-20'[xG2] - '14-20'[xG1]),
    0.5
)
```
**Purpose:** Absolute xG difference, rounded to nearest 0.5.

---

### Temporal Classification

#### Season_month - Football Season Month Mapping
```dax
Season_month = SWITCH(
    TRUE(),
    MONTH([Date]) = 1, 8,  -- January
    MONTH([Date]) = 2, 9,  -- February
    MONTH([Date]) = 3, 10, -- March
     MONTH([Date]) = 4, 11, -- April
     MONTH([Date]) = 5, 12, -- May
     MONTH([Date]) = 6, 1, -- June
     MONTH([Date]) = 7, 2, -- July
     MONTH([Date]) = 8, 3, -- August
     MONTH([Date]) = 9, 4, -- September
     MONTH([Date]) = 10, 5, -- October
     MONTH([Date]) = 11, 6, -- November
     MONTH([Date]) = 12, 7, -- December
    0
)
```
**Purpose:** Maps calendar months to football season progression (3=August start, 12=May end).

#### FootballSeason - Season Label Generator
```dax
FootballSeason = 
VAR CurrentYear = INT([Year])
VAR SeasonMonth = INT([Season_month])
RETURN IF(
    ISBLANK(CurrentYear) || ISBLANK(SeasonMonth) || SeasonMonth = 0 || CurrentYear = 0,
    BLANK(),
    IF(
        SeasonMonth >= 3 && SeasonMonth <= 7,
        (CurrentYear-2000) & "/" & (CurrentYear + 1-2000),
        (CurrentYear - 1-2000) & "/" & (CurrentYear-2000)
    )
)
```
**Purpose:** Creates season labels like "14/15", "15/16" etc.
- **Logic:** August-December = current/next year, January-May = previous/current year

---

### Team Classification

#### Home_Team_Tier - Home Team Quality Classification
```dax
Home_Team_Tier = 
VAR HomeTeamPoints = 
    LOOKUPVALUE(
        Teams[Average_Points],
        Teams[Team], '14-20'[Team1]
    )
RETURN
    SWITCH(
        TRUE(),
        HomeTeamPoints > 1.7, "Tier 1 (Top 6)",
        HomeTeamPoints > 1.25, "Tier 2 (Mid Table)",
        HomeTeamPoints > 1.05, "Tier 3 (Lower Mid)",
        "Tier 4 (Bottom)"
    )
```
**Purpose:** Classifies home team based on average points per game.
- **Tier 1:** >1.7 PPG (Top 6 teams)
- **Tier 2:** 1.25-1.7 PPG (Mid-table)
- **Tier 3:** 1.05-1.25 PPG (Lower mid-table)
- **Tier 4:** <1.05 PPG (Bottom teams)

#### Away_Team_Tier - Away Team Quality Classification
```dax
Away_Team_Tier = 
VAR HomeTeamPoints = 
    LOOKUPVALUE(
        Teams[Average_Points],
        Teams[Team], '14-20'[Team2]
    )
RETURN
    SWITCH(
        TRUE(),
        HomeTeamPoints > 1.7, "Tier 1 (Top 6)",
        HomeTeamPoints > 1.25, "Tier 2 (Mid Table)",
        HomeTeamPoints > 1.05, "Tier 3 (Lower Mid)",
        "Tier 4 (Bottom)"
    )
```
**Purpose:** Same logic as Home_Team_Tier but for away teams.

---

## Calculated Tables

### Teams - Unique Team List
```dax
Teams = UNION(
    DISTINCT(SELECTCOLUMNS('14-20', "Team", '14-20'[Team1])),
    DISTINCT(SELECTCOLUMNS('14-20', "Team", '14-20'[Team2]))
)
```
**Purpose:** Creates a complete list of all teams from both home and away appearances.

### Team_Performance_Full - Unified Team Performance View
```dax
Team_Performance_Full = UNION(
    -- Домашні команди
    SELECTCOLUMNS(
        '14-20',
        "Date", '14-20'[Date],
        "FootballSeason", '14-20'[FootballSeason],
        "Season_month", MONTH('14-20'[Date]),
        "Team1", '14-20'[Team1],
        "Team2", '14-20'[Team2],
        "Home_Away", "Home",
        "G1", '14-20'[G1],
        "G2", '14-20'[G2],
        "S1", '14-20'[S1],
        "S2", '14-20'[S2],
        "ST1", '14-20'[ST1],
        "ST2", '14-20'[ST2],
        "xG1", '14-20'[xG1],
        "xG2", '14-20'[xG2],
        "xpts1", '14-20'[xpts1],
        "xpts2", '14-20'[xpts2],
        "pts1", '14-20'[pts1],
        "pts2", '14-20'[pts2],
        "xpts_diff1", '14-20'[xpts_diff1],
        "xpts_diff2", '14-20'[xpts_diff2],
        "TotalG", '14-20'[TotalG],
        "TotalXg", '14-20'[TotalXg],
        "Xg_Diff1", '14-20'[Xg_Dif1],
        "Xg_Diff2", '14-20'[Xg_Dif2],
        "G_diff_Xg", '14-20'[G_diff_Xg],
        "WinRealisation", '14-20'[WinRealisation],
        "WinXg", '14-20'[WinXg],
        "WinSh", '14-20'[WinSh],
        "WinShT", '14-20'[WinShT],
        "Unpredictability_Xg_Index", '14-20'[Unpredictability_Xg_Index],
        "Unpredictability_Index", '14-20'[Unpredictability_Index],
        "Team_Tier", '14-20'[Home_Team_Tier],
        "Team_Tier_Against", '14-20'[Away_Team_Tier],
        "Index", '14-20'[Index],
        "Result", SWITCH(
            '14-20'[R],
            "H", "Home",
            "A", "Away", 
            "D", "Draw",
            BLANK()
        )
    ),
    -- Виїзні команди (переключені ролі)
    SELECTCOLUMNS(
        '14-20',
        "Date", '14-20'[Date],
        "FootballSeason", '14-20'[FootballSeason],
        "Season_month", MONTH('14-20'[Date]),
        "Team1", '14-20'[Team2],
        "Team2", '14-20'[Team1],
        "Home_Away", "Away",
        "G1", '14-20'[G2],
        "G2", '14-20'[G1],
        "S1", '14-20'[S2],
        "S2", '14-20'[S1],
        "ST1", '14-20'[ST2],
        "ST2", '14-20'[ST1],
        "xG1", '14-20'[xG2],
        "xG2", '14-20'[xG1],
        "xpts1", '14-20'[xpts2],
        "xpts2", '14-20'[xpts1],
        "pts1", '14-20'[pts2],
        "pts2", '14-20'[pts1],
        "xpts_diff1", '14-20'[xpts_diff2],
        "xpts_diff2", '14-20'[xpts_diff1],
        "TotalG", '14-20'[TotalG],
        "TotalXg", '14-20'[TotalXg],
        "Xg_Diff1", '14-20'[Xg_Dif2],
        "Xg_Diff2", '14-20'[Xg_Dif1],
        "G_diff_Xg", '14-20'[G_diff_Xg],
        "WinRealisation", '14-20'[WinRealisation],
        "WinXg", '14-20'[WinXg],
        "WinSh", '14-20'[WinSh],
        "WinShT", '14-20'[WinShT],
        "Unpredictability_Xg_Index", '14-20'[Unpredictability_Xg_Index],
        "Unpredictability_Index", '14-20'[Unpredictability_Index],
        "Team_Tier", '14-20'[Away_Team_Tier],
        "Team_Tier_Against", '14-20'[Home_Team_Tier],
        "Index", '14-20'[Index],
        "Result", SWITCH(
            '14-20'[R],
            "H", "Home",
            "A", "Away", 
            "D", "Draw",
            BLANK()
        )
    )
)
```
**Purpose:** Creates a unified view where each team's performance is normalized (Team1 always = analyzed team).
- **Use Case:** Team-centric analysis regardless of home/away status

### Metric_Parameters - Dynamic Metric Configuration
```dax
Metric_Parameters = DATATABLE(
    "Metric_Name", STRING,
    "Metric_Code", STRING,
    "Metric_Order", INTEGER,
    {
        {"Goals scored", "G1", 1},
        {"Goals conceded", "G2", 2},
        {"Shots", "S1", 3},
        {"Shots received", "S2", 4},
        {"Shots on Target", "ST1", 5},
        {"Shots on Target received", "ST2", 6},
        {"Expected Goals", "xG1", 7},
        {"Expected Goals received", "xG2", 8},
        {"Expected Points", "xpts1", 9},
        {"Points", "pts1", 10},
        {"xPts Difference", "xpts_diff1", 11},
        {"Total Goals in Match", "TotalG", 12},
        {"Total Expected Goals", "TotalXg", 13},
        {"xG Difference", "Xg_Diff1", 14},
        {"xG Difference Against", "Xg_Diff2", 15},
        {"Total xG Difference", "G_diff_Xg", 16},
        {"Unpredictability Index", "Unpredictability_Index", 17},
        {"Unpredictability Xg Index", "Unpredictability_Xg_Index", 18}
    }
)
```
**Purpose:** Parameter table for dynamic metric selection in visualizations.

---

## Measures

### Average_Points_Total - Team's Overall Points Per Game
```dax
Average_Points_Total = 
VAR SelectedTeam = SELECTEDVALUE(Teams[Team])
VAR HomePoints = 
    CALCULATE(
        AVERAGE('14-20'[pts1]),
        '14-20'[Team1] = SelectedTeam
    )
VAR AwayPoints = 
    CALCULATE(
        AVERAGE('14-20'[pts2]),
        '14-20'[Team2] = SelectedTeam
    )
VAR HomeMatches = 
    CALCULATE(
        COUNTROWS('14-20'),
        '14-20'[Team1] = SelectedTeam
    )
VAR AwayMatches = 
    CALCULATE(
        COUNTROWS('14-20'),
        '14-20'[Team2] = SelectedTeam
    )
VAR TotalPoints = (HomePoints * HomeMatches) + (AwayPoints * AwayMatches)
VAR TotalMatches = HomeMatches + AwayMatches
RETURN 
    IF(TotalMatches > 0, DIVIDE(TotalPoints, TotalMatches), BLANK())
```
**Purpose:** Calculates weighted average points per game across all matches (home and away).

### Dynamic_Metric_Value - Parameter-Driven Metric Display
```dax
Dynamic_Metric_Value = 
VAR SelectedMetric = SELECTEDVALUE(Metric_Parameters[Metric_Code])

RETURN
SWITCH(
    SelectedMetric,
    "G1", AVERAGE('Team_Performance_Full'[G1]),
    "G2", AVERAGE('Team_Performance_Full'[G2]),
    "S1", AVERAGE('Team_Performance_Full'[S1]),
    "S2", AVERAGE('Team_Performance_Full'[S2]),
    "ST1", AVERAGE('Team_Performance_Full'[ST1]),
    "ST2", AVERAGE('Team_Performance_Full'[ST2]),
    "xG1", AVERAGE('Team_Performance_Full'[xG1]),
    "xG2", AVERAGE('Team_Performance_Full'[xG2]),
    "xpts1", AVERAGE('Team_Performance_Full'[xpts1]),
    "pts1", AVERAGE('Team_Performance_Full'[pts1]),
    "xpts_diff1", AVERAGE('Team_Performance_Full'[xpts_diff1]),
    "TotalG", AVERAGE('Team_Performance_Full'[TotalG]),
    "TotalXg", AVERAGE('Team_Performance_Full'[TotalXg]),
    "Xg_Diff1", AVERAGE('Team_Performance_Full'[Xg_DiFf1]),
    "Xg_Diff2", AVERAGE('Team_Performance_Full'[Xg_DifF2]),
    "G_diff_Xg", AVERAGE('Team_Performance_Full'[G_diff_Xg]),
    "Unpredictability_Index", AVERAGE('Team_Performance_Full'[Unpredictability_Index]),
    "Unpredictability_Xg_Index", AVERAGE('Team_Performance_Full'[Unpredictability_Xg_Index]),
    BLANK()
)
```
**Purpose:** Dynamic measure that returns different metrics based on parameter selection.
- **Use Case:** Interactive charts with metric selector

---

## Data Model Structure

### Key Relationships
- **'14-20' ↔ Teams:** Via Team1 and Team2 columns
- **Team_Performance_Full ↔ Teams:** Via Team1 column
- **Metric_Parameters:** Standalone parameter table

### Usage Notes
- **Bookmaker Margin:** 5% margin removed from all odds (0.95 factor)
- **Probability Threshold:** 49.9% used for betting accuracy decisions
- **Team Tiers:** Based on average points per game over entire period
- **Unpredictability:** Higher values = more surprising results
- **xG Interpretation:** Positive xG difference = outperformed expectations

### Power BI Applications
- **Visualizations:** Line charts, scatter plots, heatmaps
- **Filters:** Season, team tier, month, unpredictability level
- **KPIs:** Accuracy rates, average metrics, correlation coefficients
- **Parameters:** Dynamic metric selection for comparative analysis

---

*This documentation reflects the actual DAX implementation used in the Premier League analytics dashboard (2014-2020 seasons, 2,820 matches analyzed).*
