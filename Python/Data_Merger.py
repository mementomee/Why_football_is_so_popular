"""
Football Data Integration Tool
============================

A comprehensive tool for merging betting odds data with advanced football statistics (xG, xPts).
Designed for football analytics and predictive modeling projects.

Author: Nazar Petrashchuk
Created for: Football Analytics Portfolio Project
Data Sources: 
- Betting odds from multiple bookmakers (2014-2020)
- Expected Goals (xG) data from Understat
- Premier League match statistics

Features:
- Automated CSV file processing from odds folder
- Intelligent team name mapping between data sources  
- Date format standardization and error handling
- Advanced lookup system for data matching
- Comprehensive data validation and coverage reporting
"""

import pandas as pd
import os
from datetime import datetime
import glob
from typing import Dict, List, Tuple, Optional

class FootballDataMerger:
    """
    A robust data integration tool for combining football betting odds with advanced statistics.
    
    This class handles the complex process of merging heterogeneous football data sources,
    with built-in error handling, data validation, and comprehensive reporting.
    """
    
    def __init__(self):
        """Initialize the FootballDataMerger with team mapping configuration."""
        self.team_mapping = self._create_team_mapping()
        self.processed_files = []
        self.merge_statistics = {}
    
    def _create_team_mapping(self) -> Dict[str, str]:
        """
        Create comprehensive team name mapping between different data sources.
        
        Returns:
            Dict mapping Understat team names to Odds data team names
        """
        return {
            'Arsenal': 'Arsenal',
            'Aston Villa': 'Aston Villa',
            'Bournemouth': 'Bournemouth',
            'Brighton': 'Brighton',
            'Brighton and Hove Albion': 'Brighton',
            'Burnley': 'Burnley',
            'Cardiff': 'Cardiff',
            'Cardiff City': 'Cardiff',
            'Chelsea': 'Chelsea',
            'Crystal Palace': 'Crystal Palace',
            'Everton': 'Everton',
            'Fulham': 'Fulham',
            'Huddersfield': 'Huddersfield',
            'Huddersfield Town': 'Huddersfield',
            'Hull': 'Hull',
            'Hull City': 'Hull',
            'Leicester': 'Leicester',
            'Leicester City': 'Leicester',
            'Liverpool': 'Liverpool',
            'Manchester City': 'Man City',
            'Manchester United': 'Man United',
            'Middlesbrough': 'Middlesbrough',
            'Newcastle United': 'Newcastle',
            'Norwich': 'Norwich',
            'Norwich City': 'Norwich',
            'QPR': 'QPR',
            'Queens Park Rangers': 'QPR',
            'Sheffield United': 'Sheffield United',
            'Southampton': 'Southampton',
            'Stoke': 'Stoke',
            'Stoke City': 'Stoke',
            'Sunderland': 'Sunderland',
            'Swansea': 'Swansea',
            'Swansea City': 'Swansea',
            'Tottenham': 'Tottenham',
            'Tottenham Hotspur': 'Tottenham',
            'Watford': 'Watford',
            'West Bromwich Albion': 'West Brom',
            'West Brom': 'West Brom',
            'West Ham': 'West Ham',
            'West Ham United': 'West Ham',
            'Wolverhampton Wanderers': 'Wolves',
            'Wolves': 'Wolves'
        }

    def merge_odds_files(self, odds_folder_path: str) -> pd.DataFrame:
        """
        Consolidate all CSV files from the odds directory into a single DataFrame.
        
        Args:
            odds_folder_path: Path to directory containing odds CSV files
            
        Returns:
            Combined DataFrame with all odds data and season information
            
        Raises:
            FileNotFoundError: If odds folder doesn't exist
            ValueError: If no valid CSV files found
        """
        if not os.path.exists(odds_folder_path):
            raise FileNotFoundError(f"Odds folder not found: {odds_folder_path}")
        
        csv_files = glob.glob(os.path.join(odds_folder_path, "*.csv"))
        
        if not csv_files:
            raise ValueError(f"No CSV files found in {odds_folder_path}")
        
        all_odds_data = []
        
        print(f"Processing {len(csv_files)} odds files...")
        
        for file in csv_files:
            try:
                print(f"  Processing: {os.path.basename(file)}")
                df = pd.read_csv(file, encoding='utf-8')
                
                # Basic data validation
                if df.empty:
                    print(f"    Warning: {file} is empty, skipping...")
                    continue
                
                if 'Date' not in df.columns:
                    print(f"    Warning: {file} missing Date column, skipping...")
                    continue
                
                # Show sample dates from this file for debugging
                sample_dates = df['Date'].head(3).tolist()
                print(f"    Sample dates: {sample_dates}")
                
                # Extract season from filename
                season = os.path.basename(file).replace('.csv', '')
                df['Season'] = season
                
                print(f"    Loaded {len(df)} records from {season}")
                
                all_odds_data.append(df)
                self.processed_files.append(os.path.basename(file))
                
            except UnicodeDecodeError:
                try:
                    # Try different encoding
                    df = pd.read_csv(file, encoding='latin-1')
                    season = os.path.basename(file).replace('.csv', '')
                    df['Season'] = season
                    all_odds_data.append(df)
                    self.processed_files.append(os.path.basename(file))
                    print(f"    Processed with latin-1 encoding")
                except Exception as e:
                    print(f"    Warning: Could not process {file}: {str(e)}")
                    continue
            except Exception as e:
                print(f"    Warning: Could not process {file}: {str(e)}")
                continue
        
        if not all_odds_data:
            raise ValueError("No valid odds data could be loaded")
        
        # Combine all data
        combined_odds = pd.concat(all_odds_data, ignore_index=True)
        
        # Data quality check
        print(f"Loaded {len(combined_odds):,} total match records")
        
        return self._process_odds_data(combined_odds)
    
    def _process_odds_data(self, combined_odds: pd.DataFrame) -> pd.DataFrame:
        """
        Process and standardize odds data with robust date handling.
        
        Args:
            combined_odds: Raw combined odds DataFrame
            
        Returns:
            Processed DataFrame with standardized columns and dates
        """
        # Define required columns with fallbacks
        essential_columns = [
            'Date', 'HomeTeam', 'AwayTeam', 'FTHG', 'FTAG', 'FTR',
            'HS', 'AS', 'HST', 'AST', 'Season'
        ]
        
        odds_columns = [
            'B365H', 'B365D', 'B365A',  # Bet365 odds
            'BbAvH', 'BbAvD', 'BbAvA',  # Average bookmaker odds
            'BbAv>2.5', 'BbAv<2.5'      # Total goals odds
        ]
        
        # Filter available columns
        all_desired_columns = essential_columns + odds_columns
        available_columns = [col for col in all_desired_columns if col in combined_odds.columns]
        
        print(f"Using {len(available_columns)}/{len(all_desired_columns)} available columns")
        
        combined_odds = combined_odds[available_columns].copy()
        
        # Robust date parsing with multiple format attempts
        combined_odds['Date'] = self._parse_dates(combined_odds['Date'])
        
        # Remove rows with invalid dates
        initial_count = len(combined_odds)
        combined_odds = combined_odds.dropna(subset=['Date'])
        final_count = len(combined_odds)
        
        if initial_count > final_count:
            print(f"  Removed {initial_count - final_count} rows with invalid dates")
        
        # Create match index for joining (odds data is the foundation)
        combined_odds['match_index'] = (
            combined_odds['Date'].dt.strftime('%Y-%m-%d') + '_' +
            combined_odds['HomeTeam'].astype(str) + '_vs_' + combined_odds['AwayTeam'].astype(str)
        )
        
        return combined_odds
    
    def _parse_dates(self, date_series: pd.Series) -> pd.Series:
        """
        Robust date parsing with multiple format attempts and intelligent year handling.
        
        Args:
            date_series: Series containing date strings in various formats
            
        Returns:
            Series with standardized datetime objects
        """
        print("Parsing dates with multiple format attempts...")
        
        # First, clean the data - remove any NaN or non-string values
        date_series_clean = date_series.dropna().astype(str)
        
        # Show sample of raw dates for debugging
        print(f"  Sample raw dates: {date_series_clean.head(5).tolist()}")
        
        # Try multiple strategies for date parsing
        parsed_dates = None
        successful_method = None
        
        # Strategy 1: Try specific formats with both 2-digit and 4-digit years
        formats_to_try = [
            '%d/%m/%y',     # 16/08/14
            '%d/%m/%Y',     # 16/08/2014
            '%d-%m-%y',     # 16-08-14
            '%d-%m-%Y',     # 16-08-2014
            '%Y-%m-%d',     # 2014-08-16
            '%m/%d/%y',     # 08/16/14 (US format)
            '%m/%d/%Y',     # 08/16/2014 (US format)
            '%Y/%m/%d',     # 2014/08/16
            '%d.%m.%y',     # 16.08.14
            '%d.%m.%Y'      # 16.08.2014
        ]
        
        for date_format in formats_to_try:
            try:
                # Test with a small sample first
                test_sample = date_series_clean.head(50)
                test_result = pd.to_datetime(test_sample, format=date_format, errors='raise')
                
                # If test passes, parse all dates
                parsed_dates = pd.to_datetime(date_series, format=date_format, errors='coerce')
                successful_method = f"Format: {date_format}"
                print(f"  Successfully parsed dates using format: {date_format}")
                break
                
            except (ValueError, TypeError) as e:
                continue
        
        # Strategy 2: If no single format worked, try flexible parsing
        if parsed_dates is None or parsed_dates.isna().sum() > len(parsed_dates) * 0.5:
            print("  Trying flexible date parsing...")
            try:
                parsed_dates = pd.to_datetime(date_series, dayfirst=True, errors='coerce')
                successful_method = "Flexible parsing (dayfirst=True)"
                print("  Used flexible date parsing")
            except Exception:
                try:
                    parsed_dates = pd.to_datetime(date_series, errors='coerce')
                    successful_method = "Standard flexible parsing"
                    print("  Used standard flexible parsing")
                except Exception as e:
                    print(f"  All date parsing methods failed: {str(e)}")
                    raise ValueError("Could not parse dates in any recognized format")
        
        # Strategy 3: Handle 2-digit years that might be interpreted incorrectly
        if parsed_dates is not None:
            # Check if we have dates in wrong century (like 2014 being parsed as 2114)
            future_dates = parsed_dates[parsed_dates > pd.Timestamp('2030-01-01')]
            if len(future_dates) > 0:
                print(f"  Correcting {len(future_dates)} dates with wrong century...")
                # Subtract 100 years from dates that are too far in the future
                mask = parsed_dates > pd.Timestamp('2030-01-01')
                parsed_dates.loc[mask] = parsed_dates.loc[mask] - pd.DateOffset(years=100)
        
        # Validate results
        if parsed_dates is not None:
            failed_conversions = parsed_dates.isna().sum()
            success_rate = ((len(parsed_dates) - failed_conversions) / len(parsed_dates)) * 100
            
            print(f"  Parsing success rate: {success_rate:.1f}%")
            
            if failed_conversions > 0:
                print(f"  Warning: {failed_conversions} dates could not be parsed")
                # Show examples of failed dates
                failed_mask = parsed_dates.isna()
                if failed_mask.any():
                    failed_examples = date_series[failed_mask].head(5).tolist()
                    print(f"  Examples of failed dates: {failed_examples}")
            
            # Show date range for validation
            valid_dates = parsed_dates.dropna()
            if len(valid_dates) > 0:
                print(f"  Date range: {valid_dates.min().date()} to {valid_dates.max().date()}")
                
                # Check for unrealistic dates
                too_old = valid_dates < pd.Timestamp('2010-01-01')
                too_new = valid_dates > pd.Timestamp('2025-01-01')
                
                if too_old.any():
                    print(f"  Warning: {too_old.sum()} dates are before 2010")
                if too_new.any():
                    print(f"  Warning: {too_new.sum()} dates are after 2025")
        
        return parsed_dates

    def process_understat_data(self, understat_file_path: str) -> pd.DataFrame:
        """
        Process Understat xG data for integration with odds data.
        
        Args:
            understat_file_path: Path to Understat CSV file
            
        Returns:
            Processed DataFrame with EPL data only and mapped team names
            
        Raises:
            FileNotFoundError: If Understat file doesn't exist
            ValueError: If no EPL data found
        """
        if not os.path.exists(understat_file_path):
            raise FileNotFoundError(f"Understat file not found: {understat_file_path}")
        
        print("Processing Understat xG data...")
        
        df = pd.read_csv(understat_file_path)
        
        # Filter for Premier League only
        epl_data = df[df['league'] == 'EPL'].copy()
        
        if epl_data.empty:
            raise ValueError("No EPL data found in Understat file")
        
        # Parse dates
        epl_data['date'] = pd.to_datetime(epl_data['date'])
        
        # Apply team name mapping
        epl_data['team_mapped'] = epl_data['team'].map(self.team_mapping).fillna(epl_data['team'])
        
        print(f"Processed {len(epl_data):,} Understat records")
        print(f"Date range: {epl_data['date'].min().date()} to {epl_data['date'].max().date()}")
        
        return epl_data

    def create_understat_lookup(self, understat_data: pd.DataFrame) -> Dict[str, Dict]:
        """
        Create optimized lookup table for fast Understat data retrieval.
        
        Args:
            understat_data: Processed Understat DataFrame
            
        Returns:
            Dictionary mapping match keys to xG statistics
        """
        print("Building Understat lookup table...")
        
        # Separate home and away games
        home_games = understat_data[understat_data['h_a'] == 'h'].copy()
        away_games = understat_data[understat_data['h_a'] == 'a'].copy()
        
        understat_lookup = {}
        matches_processed = 0
        
        for _, home_row in home_games.iterrows():
            # Find corresponding away game by matching scores and date
            away_match = away_games[
                (away_games['date'] == home_row['date']) &
                (away_games['scored'] == home_row['missed']) &
                (away_games['missed'] == home_row['scored'])
            ]
            
            if not away_match.empty:
                away_row = away_match.iloc[0]
                
                # Create multiple lookup keys for flexible matching
                date_str = home_row['date'].strftime('%Y-%m-%d')
                
                match_data = {
                    'home_xG': home_row['xG'],
                    'away_xG': away_row['xG'],
                    'home_xGA': home_row['xGA'],
                    'away_xGA': away_row['xGA'],
                    'home_npxG': home_row['npxG'],
                    'away_npxG': away_row['npxG'],
                    'home_xpts': home_row['xpts'],
                    'away_xpts': away_row['xpts'],
                    'year': home_row['year']
                }
                
                # Create primary and alternative keys for robust matching
                keys = [
                    f"{date_str}_{home_row['team_mapped']}_vs_{away_row['team_mapped']}",
                    f"{(home_row['date'] + pd.Timedelta(days=1)).strftime('%Y-%m-%d')}_{home_row['team_mapped']}_vs_{away_row['team_mapped']}",
                    f"{(home_row['date'] - pd.Timedelta(days=1)).strftime('%Y-%m-%d')}_{home_row['team_mapped']}_vs_{away_row['team_mapped']}"
                ]
                
                for key in keys:
                    understat_lookup[key] = match_data
                
                matches_processed += 1
        
        print(f"Created lookup table with {len(understat_lookup):,} keys from {matches_processed:,} matches")
        
        return understat_lookup

    def format_final_dataset(self, odds_data: pd.DataFrame, understat_lookup: Dict[str, Dict]) -> pd.DataFrame:
        """
        Create final formatted dataset optimized for football analytics.
        
        Args:
            odds_data: Processed odds DataFrame (primary data source)
            understat_lookup: Lookup dictionary for xG data
            
        Returns:
            Final formatted DataFrame ready for analysis
        """
        print("Creating final analytics dataset...")
        
        final_df = pd.DataFrame()
        
        # Core match information
        final_df['Date'] = odds_data['Date'].dt.strftime('%d.%m.%Y')
        final_df['Team1'] = odds_data['HomeTeam']  # Home team
        final_df['Team2'] = odds_data['AwayTeam']  # Away team
        final_df['G1'] = odds_data['FTHG'].fillna(0).astype(int)  # Home goals
        final_df['G2'] = odds_data['FTAG'].fillna(0).astype(int)  # Away goals
        final_df['R'] = odds_data['FTR'].fillna('D')  # Result (H/D/A)
        
        # Match statistics
        final_df['S1'] = odds_data['HS'].fillna(0).round(2)   # Home shots
        final_df['S2'] = odds_data['AS'].fillna(0).round(2)   # Away shots
        final_df['ST1'] = odds_data['HST'].fillna(0).round(2) # Home shots on target
        final_df['ST2'] = odds_data['AST'].fillna(0).round(2) # Away shots on target
        
        # Betting market odds
        final_df['W1'] = odds_data['BbAvH'].fillna(0).round(2)    # Home win odds
        final_df['D'] = odds_data['BbAvD'].fillna(0).round(2)     # Draw odds
        final_df['W2'] = odds_data['BbAvA'].fillna(0).round(2)    # Away win odds
        final_df['>2.5'] = odds_data['BbAv>2.5'].fillna(0).round(2) # Over 2.5 goals
        final_df['<2.5'] = odds_data['BbAv<2.5'].fillna(0).round(2) # Under 2.5 goals
        
        # Unique identifier
        final_df['Index'] = range(1, len(final_df) + 1)
        
        # Integrate xG data using lookup
        xg_stats = self._integrate_xg_data(odds_data, understat_lookup)
        
        final_df['xG1'] = xg_stats['xg1']      # Home expected goals
        final_df['xG2'] = xg_stats['xg2']      # Away expected goals
        final_df['xpts1'] = xg_stats['xpts1']  # Home expected points
        final_df['xpts2'] = xg_stats['xpts2']  # Away expected points
        
        # Calculate actual points
        final_df['pts1'] = odds_data['FTR'].map({'H': 3, 'D': 1, 'A': 0}).fillna(0).astype(int)
        final_df['pts2'] = odds_data['FTR'].map({'H': 0, 'D': 1, 'A': 3}).fillna(0).astype(int)
        
        # Performance differential metrics
        final_df['xpts_diff1'] = (final_df['xpts1'] - final_df['pts1']).round(2)
        final_df['xpts_diff2'] = (final_df['xpts2'] - final_df['pts2']).round(2)
        
        return final_df
    
    def _integrate_xg_data(self, odds_data: pd.DataFrame, understat_lookup: Dict[str, Dict]) -> Dict[str, List]:
        """
        Integrate xG data from lookup table with match data.
        
        Args:
            odds_data: Main odds DataFrame
            understat_lookup: xG data lookup dictionary
            
        Returns:
            Dictionary containing xG statistics lists
        """
        xg_stats = {
            'xg1': [],
            'xg2': [],
            'xpts1': [],
            'xpts2': []
        }
        
        matches_found = 0
        
        for _, row in odds_data.iterrows():
            match_key = row['match_index']
            
            if match_key in understat_lookup:
                match_data = understat_lookup[match_key]
                xg_stats['xg1'].append(round(match_data['home_xG'], 2))
                xg_stats['xg2'].append(round(match_data['away_xG'], 2))
                xg_stats['xpts1'].append(round(match_data['home_xpts'], 2))
                xg_stats['xpts2'].append(round(match_data['away_xpts'], 2))
                matches_found += 1
            else:
                # Default values for unmatched records
                xg_stats['xg1'].append(0.0)
                xg_stats['xg2'].append(0.0)
                xg_stats['xpts1'].append(0.0)
                xg_stats['xpts2'].append(0.0)
        
        match_rate = (matches_found / len(odds_data)) * 100
        print(f"Successfully matched {matches_found:,}/{len(odds_data):,} matches ({match_rate:.1f}% coverage)")
        
        self.merge_statistics['total_matches'] = len(odds_data)
        self.merge_statistics['matched_xg'] = matches_found
        self.merge_statistics['coverage_rate'] = match_rate
        
        return xg_stats

    def generate_comprehensive_report(self, final_data: pd.DataFrame) -> None:
        """
        Generate detailed analysis report of the merged dataset.
        
        Args:
            final_data: Final merged DataFrame
        """
        print("\n" + "="*60)
        print("COMPREHENSIVE DATA INTEGRATION REPORT")
        print("="*60)
        
        # Dataset overview
        print(f"\nDataset Overview:")
        print(f"   Total matches: {len(final_data):,}")
        print(f"   Total columns: {len(final_data.columns)}")
        print(f"   Files processed: {len(self.processed_files)}")
        
        # Data quality metrics
        matches_with_xg = len(final_data[final_data['xG1'] > 0])
        coverage_rate = (matches_with_xg / len(final_data)) * 100
        
        print(f"\nData Quality Metrics:")
        print(f"   xG data coverage: {matches_with_xg:,}/{len(final_data):,} ({coverage_rate:.1f}%)")
        print(f"   Complete records: {len(final_data.dropna()):,}")
        print(f"   Missing data rate: {(final_data.isnull().sum().sum() / (len(final_data) * len(final_data.columns)) * 100):.1f}%")
        
        # Temporal analysis
        final_data['Year'] = pd.to_datetime(final_data['Date'], format='%d.%m.%Y').dt.year
        year_stats = final_data.groupby('Year').agg({
            'xG1': lambda x: (x > 0).sum(),
            'Date': 'count'
        }).rename(columns={'Date': 'Total', 'xG1': 'WithXG'})
        year_stats['Coverage%'] = (year_stats['WithXG'] / year_stats['Total'] * 100).round(1)
        
        print(f"\nCoverage by Year:")
        for year, stats in year_stats.iterrows():
            print(f"   {year}: {stats['WithXG']:,}/{stats['Total']:,} matches ({stats['Coverage%']:.1f}%)")
        
        # Key statistics
        print(f"\nKey Statistics:")
        print(f"   Average goals per match: {final_data[['G1', 'G2']].sum(axis=1).mean():.2f}")
        print(f"   Average xG per match: {final_data[['xG1', 'xG2']].sum(axis=1).mean():.2f}")
        print(f"   Home win rate: {(final_data['R'] == 'H').mean()*100:.1f}%")
        print(f"   Draw rate: {(final_data['R'] == 'D').mean()*100:.1f}%")
        print(f"   Away win rate: {(final_data['R'] == 'A').mean()*100:.1f}%")
        
        print(f"\nColumn Structure:")
        print(f"   {final_data.columns.tolist()}")

    def merge_all_data(self, odds_folder_path: str, understat_file_path: str, output_path: str) -> pd.DataFrame:
        """
        Main orchestration method for complete data integration pipeline.
        
        Args:
            odds_folder_path: Path to folder containing odds CSV files
            understat_file_path: Path to Understat CSV file
            output_path: Path for output CSV file
            
        Returns:
            Final integrated DataFrame
            
        Raises:
            Exception: If any step in the pipeline fails
        """
        try:
            print("Starting Football Data Integration Pipeline...")
            print("="*60)
            
            # Step 1: Process odds data (primary source)
            print("\nStep 1: Processing betting odds data...")
            odds_data = self.merge_odds_files(odds_folder_path)
            
            # Step 2: Process Understat data
            print("\nStep 2: Processing Understat xG data...")
            understat_data = self.process_understat_data(understat_file_path)
            
            # Step 3: Create lookup system
            print("\nStep 3: Creating intelligent lookup system...")
            understat_lookup = self.create_understat_lookup(understat_data)
            
            # Step 4: Generate final dataset
            print("\nStep 4: Creating final analytics dataset...")
            final_data = self.format_final_dataset(odds_data, understat_lookup)
            
            # Step 5: Save results
            print("\nStep 5: Saving integrated dataset...")
            final_data.to_csv(output_path, index=False)
            print(f"Dataset saved successfully to: {output_path}")
            
            # Step 6: Generate comprehensive report
            self.generate_comprehensive_report(final_data)
            
            return final_data
            
        except Exception as e:
            print(f"\nPipeline failed: {str(e)}")
            raise


def main():
    """
    Main execution function with example usage.
    Demonstrates the complete data integration workflow.
    """
    # Configuration - Update these paths for your environment
    config = {
        'odds_folder': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\Data\Odds EPL 2014-20",
        'understat_file': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\Data\understat 2014_20\understat_per_game.csv",
        'output_file': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\integrated_football_analytics_dataset.csv"
    }
    
    # Initialize merger
    merger = FootballDataMerger()
    
    # Execute integration pipeline
    try:
        result = merger.merge_all_data(
            config['odds_folder'],
            config['understat_file'],
            config['output_file']
        )
        
        print("\nIntegration completed successfully!")
        print(f"Final dataset ready for analysis with {len(result):,} matches")
        
        # Display sample data
        print("\nSample of integrated data:")
        print(result.head(3).to_string())
        
    except Exception as e:
        print(f"\nIntegration failed: {str(e)}")
        return None


if __name__ == "__main__":
    main()