# ⚽ Why Football is So Popular: A Statistical Analysis

> **🌐 [Live Interactive Report](https://mementomee.github.io/Why_football_is_so_popular/)** | **📊 [Power BI Dashboard](https://app.powerbi.com/view?r=eyJrIjoiYTVlMDE3NGYtNDM4Ni00NjgxLWJhOWYtMWMyMjU3ODkwNWI1IiwidCI6IjEzOTA3NTcwLWNiZmUtNDY4Mi1iMDQ3LTQ4MDQwMzIxOThmYyIsImMiOjl9&pageName=ReportSection78b96b3a97c605120ee6)**

**Comprehensive statistical analysis proving why football is the world's most popular sport through its inherent unpredictability**

Using 6 years of Premier League data (2014-2020), this research demonstrates that football's global dominance stems from its perfect balance of predictability and chaos - keeping 4.046 billion fans emotionally invested worldwide.

---

## 🎯 Key Research Findings

### **💡 The Unpredictability Formula**
Football maintains the optimal balance for human emotional investment:
- **70.3%** predictable (skill-based outcomes)
- **29.7%** unpredictable (chaos factor)
- **Perfect ratio** that prevents both boredom and frustration

### **📊 Statistical Breakthroughs**

| Discovery | Finding | Impact |
|-----------|---------|---------|
| **🎲 Chaos vs Logic** | 8.9% gap between xG models and reality | Proves mathematical limits |
| **🏠 Home Advantage** | +35% more goals, +40% more points | Quantifies emotional factors |
| **⚽ Goal Distribution** | 83% of matches decided by 0-2 goals | Explains maximum drama |
| **📈 Market Efficiency** | Bookmakers 70.3% accurate vs xG, 61.4% vs reality | Shows prediction ceiling |
| **🔢 Shot Volume Myth** | Only 50.8% correlation with wins | Debunks common beliefs |

### **🏆 The Leicester Phenomenon**
- **2015/16 season:** Peak unpredictability (0.73 index)
- **5000/1 odds** became reality through statistical chaos
- **Proof of concept:** Even extreme outliers remain possible

---

## 🚀 Project Overview

This multi-platform research project combines data science, web development, and statistical analysis to answer the fundamental question: **Why is football the world's most popular sport?**

### **Research Hypothesis**
Football's unparalleled global popularity (4.046 billion fans) stems from its inherent unpredictability - where underdogs can triumph, favorites can fall, and every match holds genuine uncertainty.

### **Methodology**
- **Dataset:** 2,820 Premier League matches (2014-2020)
- **Sources:** Betting odds + Understat xG data
- **Analysis:** Custom ETL pipeline + Power BI + Statistical modeling
- **Presentation:** Interactive web report + Live dashboard

---

## 📁 Project Structure

```
Why_football_is_so_popular/
├── report/                                    # React web application
│   ├── src/                                  # React components & pages
│   │   ├── pages/
│   │   │   ├── Index.tsx                     # Main report page
│   │   │   └── NotFound.tsx                  # 404 page
│   │   ├── components/                       # Reusable UI components
│   │   └── lib/                             # Utilities and helpers
│   ├── public/                              # Static assets
│   │   ├── 404.html                         # GitHub Pages SPA support
│   │   └── index.html                       # Main HTML template
│   ├── package.json                         # Dependencies & scripts
│   ├── vite.config.ts                       # Build configuration
│   ├── tailwind.config.js                   # Tailwind CSS setup
│   ├── tsconfig.json                        # TypeScript configuration
│   └── README.md                            # Technical documentation
├── Python/                                   # Data processing pipeline
│   ├── Data_Merger.py                       # Main ETL script
│   ├── Missing_Matches.py                   # Data gap analysis
│   ├── Found_Missing_Matches.py             # Automated recovery
│   └── README.md                            # Pipeline documentation
├── PowerBI/                                 # Power BI resources
│   └── DAX_Formulas.md                      # Custom analytics formulas
├── Data/                                    # Raw & processed datasets
│   ├── Odds_EPL_2014-20/                    # Betting odds (6 seasons)
│   ├── understat_2014_20/                   # Expected goals data
│   └── integrated_football_analytics_dataset.csv # Final merged data
├── .github/
│   └── workflows/
│       └── deploy.yml                       # Automated deployment
└── README.md                               # This file
```

**Note:** Some folders (PowerBI/, Data/) may need to be created during initial setup or data collection.

---

## 🛠️ Technology Stack

### **🌐 Web Report (React)**
- **Frontend:** React 18+ + TypeScript 5+
- **Styling:** Tailwind CSS 3+ + shadcn/ui components
- **Build:** Vite 5+ (fast bundling & HMR)
- **Deployment:** GitHub Pages + GitHub Actions

### **🐍 Data Pipeline (Python)**
- **Core:** pandas 1.3.0+ for data manipulation
- **Processing:** Custom ETL with intelligent matching
- **Validation:** Comprehensive quality checks
- **Output:** Power BI-ready integrated dataset

### **📊 Analytics (Power BI)**
- **Visualizations:** Interactive charts & dashboards
- **Calculations:** 20+ custom DAX formulas
- **Models:** Unpredictability indices & efficiency metrics
- **Sharing:** Public dashboard with live data

---

## 🚀 Quick Start

### **1️⃣ View Live Results**
```bash
# Interactive web report
https://mementomee.github.io/Why_football_is_so_popular/

# Power BI dashboard
https://app.powerbi.com/view?r=eyJrIjoiYTVlMDE3NGYtNDM4Ni00NjgxLWJhOWYtMWMyMjU3ODkwNWI1IiwidCI6IjEzOTA3NTcwLWNiZmUtNDY4Mi1iMDQ3LTQ4MDQwMzIxOThmYyIsImMiOjl9&pageName=ReportSection78b96b3a97c605120ee6
```

### **2️⃣ Run Web Report Locally**
```bash
# Clone repository
git clone https://github.com/mementomee/Why_football_is_so_popular.git
cd Why_football_is_so_popular/report

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5173 (Vite default port)
```

### **3️⃣ Run Data Pipeline**
```bash
# Navigate to Python folder
cd Python

# Install dependencies
pip install pandas numpy python-dateutil

# Run ETL pipeline
python Data_Merger.py

# Analyze missing data
python Missing_Matches.py
python Found_Missing_Matches.py
```

---

## 📈 Research Insights

### **🔍 Betting Market Analysis**
- **Goals Prediction Accuracy:** 58.68% (reality) vs 60.75% (xG)
- **Winner Prediction:** 70.3% vs xG models, 61.4% vs reality
- **Technology Evolution:** 2019/20 breakthrough to 68.95% accuracy
- **Unpredictable Teams:** Tottenham (52%), Everton (54%)
- **Predictable Teams:** Man City (67%), Burnley (67%)

### **🏠 Home Advantage Phenomenon**
- **Goal Advantage:** 1.53 vs 1.18 goals per match (+30%)
- **Points Advantage:** 1.61 vs 1.15 points per match (+40%)
- **Seasonal Patterns:** Strongest in February, weakest in August
- **Underlying Factors:** Crowd support, travel fatigue, referee bias

### **⚽ Goal Scoring Patterns**
- **Low Scoring Nature:** Average 2.71 goals per match
- **Tight Margins:** 60% of matches decided by 0-1 goals
- **Drama Factor:** 83% within 0-2 goal difference
- **xG Accuracy:** 99% precision over 6,189 total goals

### **🎲 Unpredictability Index**
- **Average Season:** 0.56 unpredictability
- **Leicester Season (2015/16):** 0.73 (peak chaos)
- **Most Predictable:** 2016/17 (post-Leicester normalization)
- **Formula:** (Actual - Predicted)² across all outcomes

---

## 📊 Key Performance Indicators

### **⚽ Match-Level Metrics**
```
📈 Total Goals: 2.71 average per match
🎯 Expected Goals: 2.68 average (99% accuracy)
🏠 Home Win Rate: 46.2%
✖️ Draw Rate: 25.1% 
🛫 Away Win Rate: 28.7%
```

### **📉 Predictability Metrics**
```
🔮 Bookmaker Accuracy: 61.4% (winners)
📊 xG Model Accuracy: 70.3% (winners)
🎲 Upset Rate: 29.7% (chaos factor)
📈 Goals Market: 58.68% (over/under 2.5)
```

### **🏆 Team Performance**
```
⭐ Best Finishers: Liverpool (+45 goals vs xG)
🎯 Most Efficient: Tottenham (+51 goals vs xG)
📊 Most Predictable: Man City (67% accuracy)
🎲 Most Chaotic: Tottenham (52% accuracy)
```

---

## 🎯 Research Applications

### **📚 Academic Value**
- **Sports Analytics:** Methodology for unpredictability measurement
- **Behavioral Economics:** Fan engagement optimization models
- **Data Science:** ETL pipeline for multi-source integration
- **Statistics:** Prediction accuracy benchmarking

### **🏢 Industry Applications**
- **Broadcasting:** Content scheduling based on unpredictability
- **Betting:** Market efficiency analysis and modeling
- **Sports Management:** Performance evaluation beyond results
- **Marketing:** Fan engagement prediction models

### **🧠 Broader Insights**
- **Entertainment Theory:** Optimal unpredictability ratios
- **Game Design:** Balancing skill and chance elements
- **Investment Analysis:** Market prediction limitations
- **Psychology:** Emotional investment drivers

---

## 📝 Methodology Notes

### **🔬 Data Quality**
- **Coverage:** 2,820 matches (100% of 2014-2020 Premier League)
- **Sources:** Multiple bookmakers + Understat xG data
- **Validation:** Comprehensive ETL pipeline with quality checks
- **Missing Data:** <5% with automated recovery attempts

### **📊 Statistical Approach**
- **Bookmaker Margin:** 5% removed from all odds (0.95 factor)
- **Threshold:** 49.9% probability for prediction accuracy
- **Unpredictability:** Sum of squared prediction errors
- **Team Tiers:** Based on average points per game

### **⚙️ Technical Implementation**
- **ETL Pipeline:** Python with pandas for data processing
- **Analysis:** Power BI with custom DAX formulas
- **Presentation:** React web app with modern UI/UX
- **Deployment:** Automated CI/CD via GitHub Actions

---

## 🎖️ Project Achievements

### **🏆 Research Contributions**
- ✅ **First comprehensive unpredictability analysis** of Premier League
- ✅ **Quantified home advantage** across multiple metrics
- ✅ **Proved xG model accuracy** at scale (6,189 goals)
- ✅ **Demonstrated betting market evolution** over 6 years
- ✅ **Created reusable methodology** for sports analytics

### **💻 Technical Accomplishments**
- ✅ **Complex ETL pipeline** merging heterogeneous data sources
- ✅ **Interactive web report** with modern React architecture
- ✅ **20+ custom DAX formulas** for advanced analytics
- ✅ **Automated deployment** with CI/CD pipeline
- ✅ **Comprehensive documentation** for reproducibility

---

## 🌟 Future Enhancements

### **📊 Data Expansion**
- [ ] Additional leagues (La Liga, Bundesliga, Serie A)
- [ ] Historical data back to 1990s
- [ ] Player-level impact analysis
- [ ] In-play betting market dynamics

### **🤖 Advanced Analytics**
- [ ] Machine learning prediction models
- [ ] Real-time unpredictability scoring
- [ ] Sentiment analysis integration
- [ ] Weather and external factors

### **🌐 Platform Development**
- [ ] Mobile application
- [ ] API for real-time data access
- [ ] Community features and predictions
- [ ] Integration with live sports data

---

## 🤝 Contributing

This research project welcomes contributions in several areas:

### **🔬 Research Extensions**
- Cross-sport unpredictability analysis
- Additional statistical methodologies
- Behavioral analysis of fan engagement
- Expanded data source integration

### **💻 Technical Improvements**
- Performance optimizations
- Additional visualizations
- Mobile responsiveness enhancements
- Accessibility improvements

### **📊 Data Science**
- Alternative prediction models
- Advanced statistical techniques
- Machine learning implementations
- Data quality improvements

**How to contribute:**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-analysis`)
3. Commit changes (`git commit -m 'Add amazing analysis'`)
4. Push to branch (`git push origin feature/amazing-analysis`)
5. Open a Pull Request

---

## 📄 License & Citation

### **License**
This project is released under the MIT License. See `LICENSE` file for details.

### **Citation**
If you use this research in academic work, please cite:
```
Petrashchuk, N. (2024). Why Football is So Popular: A Statistical Analysis of 
Unpredictability in Premier League (2014-2020). GitHub Repository: 
https://github.com/mementomee/Why_football_is_so_popular
```

### **Data Sources**
- **Betting Odds:** Various bookmakers (2014-2020)
- **Expected Goals:** Understat.com
- **Match Results:** Premier League official data

---

## 👨‍💻 Author & Contact

**Nazar Petrashchuk**  
*Data Analyst & Football Analytics Researcher*

### **🔗 Connect:**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nazar-petrashchuk-b781472aa/)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/mementomee)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:petrasuknazar@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/mementomee)

### **📊 Project Links:**
[![Live Report](https://img.shields.io/badge/Live_Report-brightgreen?style=flat&logo=react&logoColor=white)](https://mementomee.github.io/Why_football_is_so_popular/)
[![Power BI](https://img.shields.io/badge/Power_BI_Dashboard-F2C811?style=flat&logo=powerbi&logoColor=black)](https://app.powerbi.com/view?r=eyJrIjoiYTVlMDE3NGYtNDM4Ni00NjgxLWJhOWYtMWMyMjU3ODkwNWI1IiwidCI6IjEzOTA3NTcwLWNiZmUtNDY4Mi1iMDQ3LTQ4MDQwMzIxOThmYyIsImMiOjl9&pageName=ReportSection78b96b3a97c605120ee6)

---

## ⭐ Show Your Support

If this research helped you understand the beautiful unpredictability of football, please:
- ⭐ **Star this repository**
- 🔄 **Share with fellow football fans**
- 💬 **Discuss findings on social media**
- 🤝 **Contribute to further research**

---

> *"Football is the most important of the less important things in the world."*  
> **— Carlo Ancelotti**

**🎯 Proving through data what fans have always known: football's beautiful chaos is its greatest strength.**

---

*📊 Statistical Analysis | ⚽ Football Research | 🌍 Global Popularity Study*  
*Last Updated: August 2025 | Dataset: Premier League 2014-2020 | Matches Analyzed: 2,820*
