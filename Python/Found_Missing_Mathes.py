"""
Understat Match Finder
======================

A tool for automatically finding missing matches in the Understat dataset
and attempting to match them with the missing data template.

Author: Nazar Petrashchuk
Created for: Portfolio Project

Purpose:
This tool takes the manual collection template and searches the Understat dataset
to find potential matches based on date, teams, and results. It handles team name
variations and provides match suggestions for verification.

Features:
- Flexible team name matching with fuzzy search
- Date range searching (±1 day) for potential matches
- Result verification for match confirmation
- Confidence scoring for potential matches
- Export of found matches for manual verification
"""

import pandas as pd
import os
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
from difflib import SequenceMatcher
import re

class UnderstatMatchFinder:
    """
    Searches Understat dataset for matches from the missing data template.
    
    Uses flexible matching algorithms to handle team name variations and
    provides confidence scores for potential matches.
    """
    
    def __init__(self):
        """Initialize with team mapping and fuzzy matching settings."""
        self.team_mapping = self._create_team_mapping()
        self.found_matches = []
        self.match_confidence_threshold = 0.7
    
    def _create_team_mapping(self) -> Dict[str, str]:
        """Create comprehensive team name mapping."""
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
    
    def _similarity_score(self, str1: str, str2: str) -> float:
        """
        Calculate similarity score between two strings.
        
        Args:
            str1: First string
            str2: Second string
            
        Returns:
            Similarity score between 0 and 1
        """
        return SequenceMatcher(None, str1.lower(), str2.lower()).ratio()
    
    def _normalize_team_name(self, team_name: str) -> str:
        """
        Normalize team name for better matching.
        
        Args:
            team_name: Original team name
            
        Returns:
            Normalized team name
        """
        # Remove common prefixes/suffixes
        normalized = re.sub(r'\b(FC|AFC|United|City|Town)\b', '', team_name, flags=re.IGNORECASE)
        normalized = normalized.strip()
        
        # Handle common variations
        variations = {
            'Man Utd': 'Manchester United',
            'Man City': 'Manchester City',
            'Spurs': 'Tottenham',
            'Arsenal FC': 'Arsenal',
            'Chelsea FC': 'Chelsea'
        }
        
        return variations.get(normalized, normalized)
    
    def _find_best_team_match(self, target_team: str, available_teams: List[str]) -> Tuple[str, float]:
        """
        Find the best matching team name from available options.
        
        Args:
            target_team: Team name to match
            available_teams: List of available team names
            
        Returns:
            Tuple of (best_match, confidence_score)
        """
        normalized_target = self._normalize_team_name(target_team)
        best_match = ""
        best_score = 0.0
        
        for team in available_teams:
            normalized_team = self._normalize_team_name(team)
            
            # Direct mapping check
            if target_team in self.team_mapping.values():
                reverse_mapping = {v: k for k, v in self.team_mapping.items()}
                if target_team in reverse_mapping:
                    mapped_name = reverse_mapping[target_team]
                    if self._similarity_score(mapped_name, team) > 0.8:
                        return team, 1.0
            
            # Similarity score
            score = self._similarity_score(normalized_target, normalized_team)
            
            # Boost score for exact substring matches
            if normalized_target.lower() in normalized_team.lower() or normalized_team.lower() in normalized_target.lower():
                score += 0.2
            
            if score > best_score:
                best_score = score
                best_match = team
        
        return best_match, min(best_score, 1.0)
    
    def load_missing_template(self, template_path: str) -> pd.DataFrame:
        """
        Load the missing data template file.
        
        Args:
            template_path: Path to the template CSV file
            
        Returns:
            DataFrame with missing matches template
        """
        print("Loading missing data template...")
        
        if not os.path.exists(template_path):
            raise FileNotFoundError(f"Template file not found: {template_path}")
        
        df = pd.read_csv(template_path)
        print(f"Loaded {len(df)} missing matches from template")
        
        return df
    
    def load_understat_data(self, understat_path: str) -> pd.DataFrame:
        """
        Load and prepare Understat dataset.
        
        Args:
            understat_path: Path to Understat CSV file
            
        Returns:
            Processed Understat DataFrame
        """
        print("Loading Understat dataset...")
        
        if not os.path.exists(understat_path):
            raise FileNotFoundError(f"Understat file not found: {understat_path}")
        
        df = pd.read_csv(understat_path)
        
        # Filter for EPL only
        epl_data = df[df['league'] == 'EPL'].copy()
        
        if epl_data.empty:
            raise ValueError("No EPL data found in Understat file")
        
        # Parse dates
        epl_data['date'] = pd.to_datetime(epl_data['date'])
        
        print(f"Loaded {len(epl_data)} Understat records for EPL")
        return epl_data
    
    def search_matches_in_understat(self, missing_template: pd.DataFrame, 
                                   understat_data: pd.DataFrame) -> pd.DataFrame:
        """
        Search for missing matches in Understat dataset.
        
        Args:
            missing_template: Template with missing matches
            understat_data: Understat dataset
            
        Returns:
            DataFrame with found matches and confidence scores
        """
        print("Searching for matches in Understat dataset...")
        
        found_matches = []
        understat_teams = understat_data['team'].unique().tolist()
        
        for idx, missing_match in missing_template.iterrows():
            print(f"Searching for match {idx + 1}/{len(missing_template)}: {missing_match['HomeTeam']} vs {missing_match['AwayTeam']}")
            
            # Parse missing match data
            target_date = pd.to_datetime(missing_match['Date'], format='%d.%m.%Y').date()
            home_team = missing_match['HomeTeam']
            away_team = missing_match['AwayTeam']
            home_goals = missing_match['HomeGoals']
            away_goals = missing_match['AwayGoals']
            
            # Find potential matches in Understat
            potential_matches = self._find_potential_matches(
                understat_data, target_date, home_team, away_team, 
                home_goals, away_goals, understat_teams
            )
            
            if potential_matches:
                best_match = max(potential_matches, key=lambda x: x['confidence'])
                found_matches.append({
                    'Template_Index': missing_match['Index'],
                    'Template_Date': missing_match['Date'],
                    'Template_HomeTeam': home_team,
                    'Template_AwayTeam': away_team,
                    'Template_HomeGoals': home_goals,
                    'Template_AwayGoals': away_goals,
                    'Template_Result': missing_match['Result'],
                    
                    'Found_Date': best_match['date'].strftime('%Y-%m-%d'),
                    'Found_HomeTeam': best_match['home_team'],
                    'Found_AwayTeam': best_match['away_team'],
                    'Found_HomeGoals': best_match['home_goals'],
                    'Found_AwayGoals': best_match['away_goals'],
                    
                    'Home_xG': best_match['home_xG'],
                    'Away_xG': best_match['away_xG'],
                    'Home_xpts': best_match['home_xpts'],
                    'Away_xpts': best_match['away_xpts'],
                    
                    'Match_Confidence': round(best_match['confidence'], 3),
                    'Away_Team_Switched': best_match.get('away_team_switched', False),
                    'Expected_Away_Team': best_match.get('expected_away_team', ''),
                    'Found_Away_Team': best_match.get('found_away_team', ''),
                    'Score_Match': best_match['score_match'],
                    'Notes': best_match.get('note', '')
                })
                
                print(f"  Found potential match with confidence: {best_match['confidence']:.3f}")
            else:
                print(f"  No potential matches found")
        
        if found_matches:
            results_df = pd.DataFrame(found_matches)
            print(f"\nFound {len(results_df)} potential matches")
            print(f"High confidence matches (>0.8): {len(results_df[results_df['Match_Confidence'] > 0.8])}")
            print(f"Medium confidence matches (0.6-0.8): {len(results_df[(results_df['Match_Confidence'] > 0.6) & (results_df['Match_Confidence'] <= 0.8)])}")
            print(f"Low confidence matches (<0.6): {len(results_df[results_df['Match_Confidence'] <= 0.6])}")
            return results_df
        else:
            print("No matches found in Understat dataset")
            return pd.DataFrame()
    
    def _find_potential_matches(self, understat_data: pd.DataFrame, target_date: datetime.date,
                               home_team: str, away_team: str, home_goals: int, away_goals: int,
                               understat_teams: List[str]) -> List[Dict]:
        """
        Find potential matches in Understat for a specific missing match.
        
        Focus on exact date and result matching, with flexible away team matching
        since Understat sometimes has switched away teams.
        
        Args:
            understat_data: Understat dataset
            target_date: Target match date (must be exact)
            home_team: Expected home team (must match)
            away_team: Expected away team (may be switched)
            home_goals: Expected home goals (must match)
            away_goals: Expected away goals (must match)
            understat_teams: List of available teams in Understat
            
        Returns:
            List of potential matches with confidence scores
        """
        potential_matches = []
        
        # Filter by EXACT date only
        date_filtered = understat_data[understat_data['date'].dt.date == target_date]
        
        if date_filtered.empty:
            return potential_matches
        
        # Find best team matches
        home_match, home_confidence = self._find_best_team_match(home_team, understat_teams)
        away_match, away_confidence = self._find_best_team_match(away_team, understat_teams)
        
        # Strategy 1: Look for correct home team with exact result
        home_games = date_filtered[
            (date_filtered['team'] == home_match) & 
            (date_filtered['h_a'] == 'h') &
            (date_filtered['scored'] == home_goals)
        ]
        
        for _, home_game in home_games.iterrows():
            # Find corresponding away game with exact result
            away_games = date_filtered[
                (date_filtered['date'] == home_game['date']) &
                (date_filtered['h_a'] == 'a') &
                (date_filtered['scored'] == away_goals) &
                (date_filtered['missed'] == home_goals)
            ]
            
            for _, away_game in away_games.iterrows():
                # Calculate confidence based on team matching quality
                # Date and score are perfect (required), so focus on teams
                
                # Check if away team matches expected
                away_team_confidence = self._similarity_score(away_game['team'], away_team)
                
                # Overall confidence based on team matching
                overall_confidence = (home_confidence * 0.6) + (away_team_confidence * 0.4)
                
                potential_matches.append({
                    'date': home_game['date'],
                    'home_team': home_game['team'],
                    'away_team': away_game['team'],
                    'home_goals': home_game['scored'],
                    'away_goals': away_game['scored'],
                    'home_xG': home_game['xG'],
                    'away_xG': away_game['xG'],
                    'home_xpts': home_game['xpts'],
                    'away_xpts': away_game['xpts'],
                    'confidence': overall_confidence,
                    'date_diff': 0,  # Always 0 since we require exact date
                    'team_match_quality': overall_confidence,
                    'score_match': True,  # Always True since we require exact result
                    'away_team_switched': away_team_confidence < 0.8,
                    'expected_away_team': away_team,
                    'found_away_team': away_game['team']
                })
        
        # Strategy 2: If no matches found, look for any games on that date with the home team
        # and matching total goals (in case there's a data issue)
        if not potential_matches:
            total_goals = home_goals + away_goals
            
            home_games_alt = date_filtered[
                (date_filtered['team'] == home_match) & 
                (date_filtered['h_a'] == 'h')
            ]
            
            for _, home_game in home_games_alt.iterrows():
                away_games_alt = date_filtered[
                    (date_filtered['date'] == home_game['date']) &
                    (date_filtered['h_a'] == 'a') &
                    (date_filtered['missed'] == home_game['scored'])
                ]
                
                for _, away_game in away_games_alt.iterrows():
                    game_total = home_game['scored'] + away_game['scored']
                    
                    if game_total == total_goals:
                        # Lower confidence since exact score doesn't match
                        overall_confidence = home_confidence * 0.4
                        
                        potential_matches.append({
                            'date': home_game['date'],
                            'home_team': home_game['team'],
                            'away_team': away_game['team'],
                            'home_goals': home_game['scored'],
                            'away_goals': away_game['scored'],
                            'home_xG': home_game['xG'],
                            'away_xG': away_game['xG'],
                            'home_xpts': home_game['xpts'],
                            'away_xpts': away_game['xpts'],
                            'confidence': overall_confidence,
                            'date_diff': 0,
                            'team_match_quality': overall_confidence,
                            'score_match': False,
                            'away_team_switched': True,
                            'expected_away_team': away_team,
                            'found_away_team': away_game['team'],
                            'note': 'Exact score mismatch but total goals match'
                        })
        
        # Sort by confidence
        potential_matches.sort(key=lambda x: x['confidence'], reverse=True)
        
        # Return all matches above threshold (no limit since we're more precise now)
        return [match for match in potential_matches 
                if match['confidence'] >= self.match_confidence_threshold]
    
    def export_found_matches(self, found_matches: pd.DataFrame, output_path: str) -> None:
        """
        Export found matches to CSV for manual verification.
        
        Args:
            found_matches: DataFrame with found matches
            output_path: Output file path
        """
        print("Exporting found matches...")
        
        if found_matches.empty:
            print("No matches to export")
            return
        
        # Sort by confidence (highest first)
        sorted_matches = found_matches.sort_values('Match_Confidence', ascending=False)
        
        # Create output directory if needed
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Export with formatting
        sorted_matches.to_csv(output_path, index=False)
        
        print(f"Exported {len(sorted_matches)} found matches to: {output_path}")
    
    def generate_search_report(self, missing_template: pd.DataFrame, 
                             found_matches: pd.DataFrame) -> None:
        """
        Generate summary report of the search results.
        
        Args:
            missing_template: Original missing matches template
            found_matches: Found matches results
        """
        print("\n" + "="*50)
        print("UNDERSTAT MATCH SEARCH REPORT")
        print("="*50)
        
        total_missing = len(missing_template)
        total_found = len(found_matches)
        find_rate = (total_found / total_missing) * 100 if total_missing > 0 else 0
        
        print(f"\nSearch Summary:")
        print(f"  Total missing matches: {total_missing}")
        print(f"  Exact matches found: {total_found}")
        print(f"  Find rate: {find_rate:.1f}%")
        
        if not found_matches.empty:
            # Exact matches vs potential issues
            exact_matches = len(found_matches[found_matches['Score_Match'] == True])
            switched_away = len(found_matches[found_matches['Away_Team_Switched'] == True])
            
            print(f"\nMatch Quality:")
            print(f"  Exact matches (date, teams, score): {exact_matches}")
            print(f"  Matches with switched away team: {switched_away}")
            
            # Confidence distribution
            high_conf = len(found_matches[found_matches['Match_Confidence'] > 0.8])
            med_conf = len(found_matches[(found_matches['Match_Confidence'] > 0.6) & 
                                       (found_matches['Match_Confidence'] <= 0.8)])
            low_conf = len(found_matches[found_matches['Match_Confidence'] <= 0.6])
            
            print(f"\nConfidence Distribution:")
            print(f"  High confidence (>0.8): {high_conf} matches")
            print(f"  Medium confidence (0.6-0.8): {med_conf} matches")
            print(f"  Low confidence (<0.6): {low_conf} matches")
            
            # Show examples of switched teams
            if switched_away > 0:
                print(f"\nExamples of Switched Away Teams:")
                switched_examples = found_matches[found_matches['Away_Team_Switched'] == True].head(3)
                for _, match in switched_examples.iterrows():
                    print(f"  Expected: {match['Template_HomeTeam']} vs {match['Expected_Away_Team']}")
                    print(f"  Found:    {match['Found_HomeTeam']} vs {match['Found_Away_Team']}")
                    print(f"  Confidence: {match['Match_Confidence']:.3f}")
                    print("")
        
        print(f"\nNext Steps:")
        print(f"  1. Review the exported CSV file with found matches")
        print(f"  2. Focus on exact matches (Score_Match = True) - these are reliable")
        print(f"  3. Check matches with switched away teams - verify manually")
        print(f"  4. Use the xG values from high-confidence matches")
        print(f"  5. For unmatched entries, search manually in Understat by date and home team")
    
    def run_match_search(self, template_path: str, understat_path: str, output_folder: str) -> None:
        """
        Run complete match search workflow.
        
        Args:
            template_path: Path to missing matches template
            understat_path: Path to Understat dataset
            output_folder: Output folder for results
        """
        print("Starting Understat match search...")
        print("="*50)
        
        try:
            # Load data
            missing_template = self.load_missing_template(template_path)
            understat_data = self.load_understat_data(understat_path)
            
            # Search for matches
            found_matches = self.search_matches_in_understat(missing_template, understat_data)
            
            # Export results
            if not found_matches.empty:
                output_path = os.path.join(output_folder, 'found_understat_matches.csv')
                self.export_found_matches(found_matches, output_path)
            
            # Generate report
            self.generate_search_report(missing_template, found_matches)
            
            print(f"\nSearch completed successfully!")
            
        except Exception as e:
            print(f"\nSearch failed: {str(e)}")
            raise


def main():
    """
    Main execution function for Understat match search.
    """
    # Configuration
    config = {
        'template_file': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\missing_data_collection\understat_manual_collection_template.csv",
        'understat_file': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\Data\understat 2014_20\understat_per_game.csv",
        'output_folder': r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\missing_data_collection"
    }
    
    # Initialize finder
    finder = UnderstatMatchFinder()
    
    # Run search
    try:
        finder.run_match_search(
            config['template_file'],
            config['understat_file'],
            config['output_folder']
        )
        
        print(f"\nCheck the output folder for found matches:")
        print(f"{config['output_folder']}")
        
    except Exception as e:
        print(f"\nSearch failed: {str(e)}")
        return None


if __name__ == "__main__":
    main()