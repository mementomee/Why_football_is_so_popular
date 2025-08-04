"""
Missing Understat Data Finder
=============================

A focused tool for identifying matches from the Odds dataset that are missing xG data from Understat.
This tool creates a template CSV file for manual data collection from the Understat dataset.

Author: Nazar Petrashchuk
Created for: Portfolio Project

Purpose:
Since the main integration script uses Odds data as the foundation and adds Understat xG data,
this tool identifies exactly which matches need manual xG data collection from Understat.

Note: Understat sometimes has mismatched away team names, but matches can be identified
by date, home team, and match result for manual verification and data extraction.
"""

import pandas as pd
import os
from datetime import datetime
from typing import Dict
import glob

class UnderstatDataFinder:
    """
    Identifies matches from Odds dataset that are missing Understat xG data.
    
    This tool focuses specifically on creating a work template for manual
    data collection, since Understat team matching can be inconsistent.
    """
    
    def __init__(self):
        """Initialize with team mapping for basic matching attempts."""
        self.team_mapping = self._create_team_mapping()
    
    def _create_team_mapping(self) -> Dict[str, str]:
        """Create team name mapping between Understat and Odds data."""
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
    
    def load_integrated_dataset(self, integrated_file_path: str) -> pd.DataFrame:
        """
        Load the integrated dataset from the main merger script.
        
        Args:
            integrated_file_path: Path to the integrated CSV file
            
        Returns:
            DataFrame with integrated data
        """
        print("Loading integrated dataset...")
        
        if not os.path.exists(integrated_file_path):
            raise FileNotFoundError(f"Integrated file not found: {integrated_file_path}")
        
        df = pd.read_csv(integrated_file_path)
        print(f"Loaded {len(df):,} integrated matches")
        
        return df
    
    def find_missing_xg_matches(self, integrated_data: pd.DataFrame) -> pd.DataFrame:
        """
        Identify matches that are missing xG data from Understat.
        
        Args:
            integrated_data: The integrated dataset from main script
            
        Returns:
            DataFrame containing only matches missing xG data
        """
        print("Identifying matches missing xG data...")
        
        # Find matches where xG data is missing (xG1 = 0.0 indicates missing data)
        missing_xg = integrated_data[integrated_data['xG1'] == 0.0].copy()
        
        print(f"Found {len(missing_xg):,} matches missing xG data out of {len(integrated_data):,} total matches")
        print(f"Missing data rate: {(len(missing_xg) / len(integrated_data)) * 100:.1f}%")
        
        return missing_xg
    
    def create_manual_collection_template(self, missing_matches: pd.DataFrame, output_path: str) -> None:
        """
        Create a CSV template for manual xG data collection.
        
        Args:
            missing_matches: DataFrame with matches missing xG data
            output_path: Path to save the template CSV
        """
        print("Creating manual data collection template...")
        
        # Select key columns for identification and create template for manual entry
        template_df = pd.DataFrame()
        
        # Identification columns (from Odds data)
        template_df['Date'] = missing_matches['Date']
        template_df['HomeTeam'] = missing_matches['Team1']
        template_df['AwayTeam'] = missing_matches['Team2']
        template_df['HomeGoals'] = missing_matches['G1']
        template_df['AwayGoals'] = missing_matches['G2']
        template_df['Result'] = missing_matches['R']
        template_df['Index'] = missing_matches['Index']  # For easy reference back to main dataset
        
        # Empty columns for manual xG data entry
        template_df['Home_xG'] = ''  # To be filled manually
        template_df['Away_xG'] = ''  # To be filled manually
        template_df['Home_xpts'] = ''  # To be filled manually
        template_df['Away_xpts'] = ''  # To be filled manually
        
        # Helper columns for manual verification
        template_df['Notes'] = ''  # For any notes during manual collection
        template_df['Understat_Date_Found'] = ''  # Date found in Understat (for verification)
        template_df['Understat_Teams_Found'] = ''  # Team names found in Understat
        
        # Sort by date for easier manual work
        template_df = template_df.sort_values(['Date', 'HomeTeam'])
        
        # Save template
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        template_df.to_csv(output_path, index=False)
        
        print(f"Manual collection template saved to: {output_path}")
        print(f"Template contains {len(template_df)} matches requiring manual xG data collection")
    
    def generate_summary_report(self, integrated_data: pd.DataFrame, missing_matches: pd.DataFrame) -> None:
        """
        Generate a focused summary report for missing data.
        
        Args:
            integrated_data: Full integrated dataset
            missing_matches: Matches missing xG data
        """
        print("\n" + "="*50)
        print("MISSING UNDERSTAT DATA SUMMARY")
        print("="*50)
        
        total_matches = len(integrated_data)
        missing_count = len(missing_matches)
        coverage_rate = ((total_matches - missing_count) / total_matches) * 100
        
        print(f"\nData Coverage Summary:")
        print(f"  Total matches in dataset: {total_matches:,}")
        print(f"  Matches with xG data: {total_matches - missing_count:,}")
        print(f"  Matches missing xG data: {missing_count:,}")
        print(f"  Current xG coverage: {coverage_rate:.1f}%")
        
        # Breakdown by year
        if 'Year' in integrated_data.columns:
            print(f"\nMissing xG Data by Year:")
            missing_matches_with_year = missing_matches.copy()
            if 'Year' not in missing_matches_with_year.columns:
                missing_matches_with_year['Year'] = pd.to_datetime(missing_matches_with_year['Date'], format='%d.%m.%Y').dt.year
            
            year_missing = missing_matches_with_year.groupby('Year').size()
            year_total = integrated_data.groupby('Year').size()
            
            for year in sorted(year_total.index):
                missing_year = year_missing.get(year, 0)
                total_year = year_total[year]
                coverage_year = ((total_year - missing_year) / total_year) * 100
                print(f"  {year}: {missing_year}/{total_year} missing ({coverage_year:.1f}% coverage)")
        
        print(f"\nNext Steps:")
        print(f"  1. Use the generated CSV template for manual data collection")
        print(f"  2. Search Understat data using Date, HomeTeam, and Result as identifiers")
        print(f"  3. Note: Away team names in Understat may not match exactly")
        print(f"  4. Fill in the xG values manually in the template")
        print(f"  5. Update the main integrated dataset with collected values")
    
    def run_missing_data_analysis(self, integrated_file_path: str, output_folder: str) -> None:
        """
        Run the complete missing data analysis and create manual collection template.
        
        Args:
            integrated_file_path: Path to integrated dataset CSV
            output_folder: Output folder for template and reports
        """
        print("Starting missing Understat data analysis...")
        print("="*50)
        
        try:
            # Load integrated dataset
            integrated_data = self.load_integrated_dataset(integrated_file_path)
            
            # Find missing matches
            missing_matches = self.find_missing_xg_matches(integrated_data)
            
            # Create manual collection template
            template_path = os.path.join(output_folder, 'understat_manual_collection_template.csv')
            self.create_manual_collection_template(missing_matches, template_path)
            
            # Generate summary report
            self.generate_summary_report(integrated_data, missing_matches)
            
            print(f"\nAnalysis completed successfully!")
            print(f"Manual collection template saved to: {template_path}")
            
        except Exception as e:
            print(f"\nAnalysis failed: {str(e)}")
            raise


def main():
    """
    Main execution function for missing Understat data analysis.
    """
    # Configuration
    config = {
        'integrated_file': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\integrated_football_analytics_dataset.csv",
        'output_folder': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\missing_data_collection"
    }
    
    # Initialize finder
    finder = UnderstatDataFinder()
    
    # Run analysis
    try:
        finder.run_missing_data_analysis(
            config['integrated_file'],
            config['output_folder']
        )
        
        print(f"\nCheck the output folder for the manual collection template:")
        print(f"{config['output_folder']}")
        
    except Exception as e:
        print(f"\nAnalysis failed: {str(e)}")
        return None


if __name__ == "__main__":
    main()