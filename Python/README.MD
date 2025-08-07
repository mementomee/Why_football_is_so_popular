# 🐍 Football Analytics - Python ETL Pipeline

> **Data processing and integration tools for Premier League analysis (2014-2020)**

This folder contains Python scripts for processing, cleaning, and integrating football data from multiple sources. The pipeline merges betting odds with advanced performance metrics (xG, xPts) to create a unified dataset for statistical analysis.

---

## 📊 Data Pipeline Overview

### **Input Sources:**
- **Betting Odds:** Multiple CSV files with bookmaker data (2014-2020)
- **Understat Data:** Expected Goals (xG) and performance metrics

### **Output:**
- **integrated_football_analytics_dataset.csv** - Unified dataset (2,820 matches)
- **Comprehensive reports** with data coverage analysis
- **Missing data templates** for manual collection

### **Processing Flow:**
```
Betting Odds CSVs → Data_Merger.py → Integrated Dataset
                         ↓
                  Missing_Matches.py → Gap Analysis & Templates
                         ↓
Understat CSV → Found_Missing_Matches.py → Automated Recovery
```

---

## 🗂️ File Structure

```
Python/
├── Data_Merger.py              # Main ETL pipeline
├── Missing_Matches.py          # Missing xG data identification
├── Found_Missing_Matches.py    # Missing data search and recovery
├── README.md                   # This documentation
└── config/                     # Configuration files (if any)
```

---

## 🔧 Core Components

### **1. Data_Merger.py** - Main ETL Pipeline

**Purpose:** Comprehensive data integration tool that merges betting odds with advanced football statistics.

#### **Key Features:**
- **Automated CSV processing** from odds folder
- **Intelligent team name mapping** between data sources
- **Date format standardization** and error handling
- **Advanced lookup system** for data matching
- **Comprehensive validation** and coverage reporting

#### **Class: FootballDataMerger**

```python
class FootballDataMerger:
    """
    A robust data integration tool for combining football betting odds 
    with advanced statistics.
    """
```

#### **Main Methods:**

**`merge_odds_files(odds_folder_path)`**
- Processes all CSV files in the odds directory
- Standardizes column names and data formats
- Handles missing values and data inconsistencies
- Returns consolidated odds DataFrame

**`process_understat_data(understat_file_path)`**
- Loads and cleans Understat xG data
- Standardizes team names and date formats
- Validates data completeness
- Returns processed performance metrics

**`create_understat_lookup(understat_data)`**
- Creates efficient lookup system for data matching
- Handles date and team name variations
- Optimizes for fast data retrieval
- Returns indexed lookup structure

**`format_final_dataset(odds_data, understat_lookup)`**
- Merges betting odds with performance metrics
- Applies data validation rules
- Calculates derived metrics
- Returns final integrated dataset

**`generate_comprehensive_report(final_data)`**
- Analyzes data coverage and quality
- Identifies missing data patterns
- Generates statistical summaries
- Outputs detailed processing report

#### **Usage Example:**

```python
# Initialize merger
merger = FootballDataMerger()

# Execute integration pipeline
result = merger.merge_all_data(
    odds_folder='../Data/Odds EPL 2014-20',
    understat_file='../Data/understat 2014_20/understat_per_game.csv',
    output_file='../integrated_football_analytics_dataset.csv'
)
```

---

### **2. Missing_Matches.py** - Missing xG Data Identification

**Purpose:** Identifies matches in the integrated dataset that are missing xG data and creates templates for manual data collection.

#### **Key Features:**
- **Missing xG detection** (where xG1 = 0.0)
- **Data completeness analysis** with statistics
- **Manual collection templates** generation
- **Missing data patterns** identification

#### **Class: MissingMatchAnalyzer**

```python
class MissingMatchAnalyzer:
    """
    Tool for identifying and managing missing xG data in integrated dataset.
    """
```

#### **Main Methods:**

**`load_integrated_data(integrated_file_path)`**
- Loads the final integrated dataset
- Validates file existence and structure
- Returns integrated DataFrame with all matches

**`find_missing_xg_matches(integrated_data)`**
- Identifies matches where xG data is missing (xG1 = 0.0)
- Calculates missing data statistics and rates
- Returns DataFrame with only missing data matches

**`create_manual_collection_template(missing_matches, output_path)`**
- Creates CSV template for manual xG data collection
- Includes match details (date, teams, result)
- Provides structured format for data entry

**`analyze_missing_patterns(missing_matches)`**
- Analyzes patterns in missing data distribution
- Identifies which teams/seasons have most gaps
- Provides insights for targeted data collection

#### **Usage Example:**

```python
# Initialize analyzer
analyzer = MissingMatchAnalyzer()

# Load integrated dataset
data = analyzer.load_integrated_data('../integrated_dataset.csv')

# Find missing xG matches
missing = analyzer.find_missing_xg_matches(data)

# Create collection template
analyzer.create_manual_collection_template(
    missing, 
    '../missing_data_collection/manual_template.csv'
)
```

---

### **3. Found_Missing_Matches.py** - Missing Data Search and Recovery

**Purpose:** Searches for missing matches in the original Understat dataset and attempts automated recovery.

#### **Key Features:**
- **Missing data identification** in merged dataset
- **Intelligent match searching** in Understat source
- **Fuzzy team name matching** with confidence scoring
- **Template generation** for manual data collection

#### **Class: UnderstatMatchFinder**

```python
class UnderstatMatchFinder:
    """
    Tool for searching and identifying missing matches in Understat data.
    """
```

#### **Main Methods:**

**`load_missing_template(template_path)`**
- Loads template with missing match information
- Validates required columns
- Returns structured missing data

**`search_matches_in_understat(missing_template, understat_data)`**
- Searches for missing matches in Understat dataset
- Uses date and team name matching algorithms
- Scores match confidence levels
- Returns found matches with metadata

**`export_found_matches(found_matches, output_path)`**
- Exports found matches to CSV format
- Includes confidence scores and match details
- Provides recommendations for data validation

**`generate_search_report(missing_template, found_matches)`**
- Analyzes search success rates
- Identifies patterns in missing data
- Provides recommendations for data collection

#### **Usage Example:**

```python
# Initialize finder
finder = UnderstatMatchFinder()

# Run search workflow
finder.run_match_search(
    template_file='../missing_data_collection/template.csv',
    understat_file='../Data/understat_per_game.csv',
    output_folder='../missing_data_collection'
)
```

---

## 🛠️ Technical Implementation

### **Dependencies:**

```python
# Core data processing
pandas >= 1.3.0          # DataFrame operations
numpy >= 1.21.0          # Numerical computations

# Date/time handling
datetime                 # Standard library
dateutil                 # Enhanced date parsing

# File system operations
os                       # File path handling
glob                     # Pattern-based file search

# Type hints (Python 3.6+)
typing                   # Type annotations
```

### **Data Processing Techniques:**

#### **Team Name Normalization:**
```python
def _create_team_mapping(self) -> Dict[str, str]:
    """
    Maps team name variations between data sources.
    Handles common inconsistencies like:
    - "Man City" vs "Manchester City"
    - "Spurs" vs "Tottenham"
    - "Brighton" vs "Brighton & Hove Albion"
    """
```

#### **Date Standardization:**
```python
def _standardize_date_format(self, date_str: str) -> Optional[datetime]:
    """
    Handles multiple date formats:
    - DD/MM/YYYY
    - DD-MM-YYYY  
    - YYYY-MM-DD
    - DD.MM.YYYY
    """
```

#### **Intelligent Matching:**
```python
def _fuzzy_team_match(self, team1: str, team2: str) -> float:
    """
    Returns confidence score (0-1) for team name matching.
    Uses multiple algorithms:
    - Exact match
    - Substring matching
    - Levenshtein distance
    - Custom football name patterns
    """
```

---

## 📈 Data Quality & Validation

### **Coverage Analysis:**
- **Total matches processed:** 2,820
- **Successful integrations:** ~95%
- **Missing data identification:** Automated flagging
- **Quality metrics:** Completeness, consistency, accuracy

### **Validation Rules:**
- **Date range validation:** 2014-2020 seasons only
- **Team name consistency:** Cross-reference validation
- **Numerical bounds:** Realistic value ranges (goals, xG, etc.)
- **Relationship integrity:** Home/away team relationships

### **Error Handling:**
- **Graceful degradation:** Continue processing despite errors
- **Detailed logging:** Track all processing steps
- **Exception reporting:** Capture and report failures
- **Recovery mechanisms:** Retry logic for transient failures

---

## 🚀 Getting Started

### **Prerequisites:**

```bash
# Python version
Python 3.7 or higher

# Install dependencies
pip install pandas numpy python-dateutil

# Or using requirements.txt (if available)
pip install -r requirements.txt
```

### **Configuration:**

**Update file paths in main() functions:**

```python
# Data_Merger.py configuration
config = {
    'odds_folder': r"C:\Path\To\Odds EPL 2014-20",
    'understat_file': r"C:\Path\To\understat_per_game.csv",
    'output_file': r"C:\Path\To\integrated_dataset.csv"
}

# Missing_Matches.py configuration
config = {
    'integrated_file': r"C:\Path\To\integrated_dataset.csv",
    'output_folder': r"C:\Path\To\missing_data_collection"
}

# Found_Missing_Matches.py configuration  
config = {
    'template_file': r"C:\Path\To\missing_template.csv",
    'understat_file': r"C:\Path\To\understat_per_game.csv",
    'output_folder': r"C:\Path\To\missing_data_collection"
}
```

### **Execution:**

```bash
# Run main ETL pipeline
python Data_Merger.py

# Identify missing xG data
python Missing_Matches.py

# Search for missing data in original source
python Found_Missing_Matches.py
```

---

## 📊 Data Schema

### **Input Data Structure:**

#### **Betting Odds CSV Files:**
```
Columns: Date, Team1, Team2, W1, D, W2, >2.5, <2.5, ...
Format: DD/MM/YYYY, Team Names, Decimal Odds
```

#### **Understat CSV:**
```
Columns: date, h_team, a_team, h_goals, a_goals, h_xG, a_xG, ...
Format: YYYY-MM-DD, Standardized Names, Numerical Values
```

### **Output Data Structure:**

#### **Integrated Dataset:**
```
- Match Information: Date, Teams, Venue
- Results: Goals, Result (H/D/A)
- Betting Data: Odds, Implied Probabilities  
- Performance Metrics: xG, Shots, Shots on Target
- Derived Metrics: xG Differences, Overperformance
```

---

## 🐛 Troubleshooting

### **Common Issues:**

#### **FileNotFoundError:**
```python
# Check file paths and ensure files exist
import os
print(os.path.exists(your_file_path))
```

#### **Team Name Mismatches:**
```python
# Review team mapping dictionary
merger = FootballDataMerger()
print(merger.team_mapping)
```

#### **Date Parsing Errors:**
```python
# Check date formats in source files
# Ensure DD/MM/YYYY format for odds data
# Ensure YYYY-MM-DD format for Understat data
```

#### **Memory Issues:**
```python
# For large datasets, process in chunks
chunk_size = 1000
for chunk in pd.read_csv(file, chunksize=chunk_size):
    process_chunk(chunk)
```

### **Performance Optimization:**

#### **Speed Improvements:**
- Use vectorized pandas operations instead of loops
- Implement efficient lookup dictionaries
- Process data in chunks for large files
- Cache frequently accessed data

#### **Memory Management:**
- Delete unused DataFrames explicitly
- Use appropriate data types (int32 vs int64)
- Process files sequentially, not all at once

---

## 📝 Development Guidelines

### **Code Style:**
- **PEP 8 compliance** for Python code formatting
- **Type hints** for function parameters and returns
- **Docstrings** for all classes and methods
- **Meaningful variable names** and comments

### **Error Handling:**
- **Try-catch blocks** for file operations
- **Validation checks** before data processing
- **Informative error messages** for debugging
- **Graceful failure recovery** where possible

### **Testing:**
- **Unit tests** for individual functions
- **Integration tests** for full pipeline
- **Data validation tests** for output quality
- **Edge case testing** for robust operation

---

## 🔄 Data Pipeline Workflow

### **Step 1: Data Integration (Data_Merger.py)**
1. Load all CSV files from odds folder
2. Read Understat performance data
3. Validate file formats and structures
4. Merge datasets and create integrated output

### **Step 2: Missing Data Analysis (Missing_Matches.py)**
1. Load integrated dataset from Step 1
2. Identify matches missing xG data (xG1 = 0.0)
3. Generate missing data statistics and patterns
4. Create manual collection templates

### **Step 3: Automated Recovery (Found_Missing_Matches.py)**
1. Use templates from Step 2
2. Search original Understat dataset for missing matches
3. Apply fuzzy matching algorithms for team names
4. Generate recovery reports with confidence scores

### **Step 4: Data Cleaning**
1. Standardize team names across sources
2. Normalize date formats
3. Handle missing values and outliers
4. Validate data ranges and relationships

### **Step 5: Quality Assurance**
1. Generate comprehensive coverage reports
2. Identify and flag data quality issues
3. Validate final dataset integrity
4. Prepare data for Power BI consumption

---

## 📈 Future Enhancements

### **Planned Improvements:**
- **Automated data refresh** pipeline
- **Additional data sources** integration
- **Machine learning** data validation
- **Real-time processing** capabilities

### **Scalability Considerations:**
- **Database integration** for larger datasets
- **Parallel processing** for performance
- **Cloud deployment** options
- **API interfaces** for data access

---

## 📄 License & Usage

This Python pipeline is part of the football analytics research project. The code is designed for academic and research purposes.

**Dependencies:** pandas, numpy, python-dateutil  
**Python Version:** 3.7+  
**Data Period:** Premier League 2014-2020  
**Output:** Power BI-ready integrated dataset

---

*🐍 Python ETL Pipeline Documentation | Updated August 2025*
