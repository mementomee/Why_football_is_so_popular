import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-dark">
        <div className="container mx-auto px-6 text-center">
          {/* Main Title with 3D Effect */}
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider text-primary mb-6"
            style={{ 
              textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)' 
            }}
          >
            FOOTBALL
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-semibold mb-12 max-w-4xl mx-auto leading-tight">
            Why it is so popular and interesting from a statistical perspective
          </p>
          
          {/* GitHub Repository Link */}
          <div className="flex flex-col items-center gap-4 mb-16">
            <a
              href="https://app.powerbi.com/view?r=eyJrIjoiYTVlMDE3NGYtNDM4Ni00NjgxLWJhOWYtMWMyMjU3ODkwNWI1IiwidCI6IjEzOTA3NTcwLWNiZmUtNDY4Mi1iMDQ3LTQ4MDQwMzIxOThmYyIsImMiOjl9&pageName=ReportSection78b96b3a97c605120ee6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30 group"
            >
              <span className="animate-pulse">📊</span>
              <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">Interactive Power BI Dashboard</span>
              <svg className="w-4 h-4 text-white group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a
              href="https://github.com/mementomee/Why_football_is_so_popular"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30 group"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">View Source Code</span>
              <svg className="w-4 h-4 text-white group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          
          {/* Plan Section */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <h2 
              className="text-4xl md:text-6xl font-black text-primary mb-12 tracking-wider"
              style={{ 
                textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)' 
              }}
            >
              DISCUSSION PLAN
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('intro')}>
                <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-lg font-bold text-black group-hover:scale-110 transition-transform">
                  1
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-cyan-400 transition-colors">
                  Introduction. Why Football?
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('goal-analysis')}>
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                  2
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-red-500 transition-colors">
                  Goal Performance
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('team-metrics')}>
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                  3
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-purple-500 transition-colors">
                  Team metrics
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('betting-analysis')}>
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-lg font-bold text-black group-hover:scale-110 transition-transform">
                  4
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-yellow-400 transition-colors">
                  Efficiency of bookmakers
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('correlation')}>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                  5
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-green-500 transition-colors">
                  Correlation with Win
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('unpredictability')}>
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                  6
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-blue-500 transition-colors">
                  Unpredictability Index
                </span>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('goal-difference')}>
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                  7
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-orange-500 transition-colors">
                  Goal Difference
                </span>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('conclusion')}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                  8
                </div>
                <span className="text-lg md:text-xl text-white font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all">
                  Conclusion
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Content Sections */}
      <main className="relative z-10">
        {/* Introduction Section */}
        <section id="intro" className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <Card className="bg-black/50 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-5xl md:text-7xl font-black text-white mb-6 tracking-wider"
                  style={{ 
                    textShadow: '4px 4px 8px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)' 
                  }}
                >
                  INTRODUCTION. WHY FOOTBALL?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="mb-8 text-center">
                  <p className="text-2xl font-bold text-cyan-400 mb-4">
                    The numbers speak for themselves: 4.046 billion fans worldwide.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    Football is not just the most popular sport on the planet - it outsells its closest competitor (cricket) by almost double! But what lies behind these staggering numbers?
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-6">🌍 A global phenomenon</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Between 1930 and 2020, football has gathered an audience that exceeds the population of the entire Asia. This is not just a statistic - it is evidence of a unique cultural phenomenon that unites continents, languages and generations.
                    </p>
                    
                    <h4 className="text-xl font-bold text-yellow-400 mt-8 mb-4">🎯 Reasons for unprecedented popularity:</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <span className="text-2xl mt-1">🎯</span>
                        <div>
                          <h5 className="font-bold text-white mb-2">Universal simplicity</h5>
                          <p className="text-gray-300">Football is the only sport among the top 10 that requires only a ball. There is no expensive equipment, complicated rules, or special grounds. This explains its spread from the favelas of Brazil to the streets of London.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <span className="text-2xl mt-1">🌍</span>
                        <div>
                          <h5 className="font-bold text-white mb-2">Global unification</h5>
                          <p className="text-gray-300">When 2.5 billion people watch the World Cup final at the same time, football becomes a language that does not require translation. It breaks down barriers between cultures, classes and countries.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <span className="text-2xl mt-1">🧠</span>
                        <div>
                          <h5 className="font-bold text-white mb-2">Multidimensional experience</h5>
                          <p className="text-gray-300">Football uniquely combines philosophy (from Cruyff's "total football" to Guardiola's "tiki-taka"), tactics (a live chessboard), business ($700+ billion industry), medicine, and technology.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <span className="text-2xl mt-1">📺</span>
                        <div>
                          <h5 className="font-bold text-white mb-2">Perfect entertainment product</h5>
                          <p className="text-gray-300">90 minutes of drama where every minute can change the outcome. Unlike high-performance sports, every goal in football is an event that causes an emotional explosion in millions of viewers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-red-500 mb-4">📊 WHAT IS FOOTBALL STATISTICS?</h3>
                    <div className="bg-gradient-to-br from-red-500/10 to-purple-500/10 p-6 rounded-xl border border-red-500/20">
                      <p className="text-lg font-semibold text-red-400 mb-4 italic">
                        "Football statistics is an attempt by mathematics to explain poetry."
                      </p>
                      <p className="text-gray-300">
                        While numbers will never tell the whole story of a match, they can shed light on what actually happened on the field.
                      </p>
                    </div>
                    
                    <div className="space-y-4 text-gray-300">
                      <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-lg">
                        "There are so many variables in football, and it's simply impossible to explain everything through numbers. But you can explain the context with data and draw qualitative conclusions based on it."
                      </blockquote>
                      
                      <p className="text-lg leading-relaxed">
                        Football statistics do not claim to be an oracle - they are a tool for understanding the context. When Leicester won the Premier League in 2016, statistics did not predict this miracle, but explained how it happened.
                      </p>
                      
                      <p className="text-lg leading-relaxed">
                        That's why football is a great place to learn big data analysis - it combines mathematical rigor with human passion, offering millions of variables in each match while making every goal a statistically significant event.
                      </p>
                      
                      <div className="mt-8">
                        <h4 className="text-lg font-bold text-green-500 mb-4">Key Football Metrics:</h4>
                        <div className="flex flex-wrap gap-3">
                          <Badge className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30 px-4 py-2">xG</Badge>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-4 py-2">xA</Badge>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">XPTS</Badge>
                          <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 px-4 py-2">PPD</Badge>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">Shots</Badge>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">Possession</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <div className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 p-6 rounded-xl border border-cyan-400/30">
                    <p className="text-xl font-bold text-cyan-400 mb-2">Statistical confirmation of the phenomenon</p>
                    <p className="text-gray-300">
                      Why is it that football has gathered 4 billion fans, not cricket or hockey? The answer lies in its unique unpredictability - the very quality that we will analyze in this study using 6 seasons of the Premier League as an example.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Goal Analysis Section */}
        <section id="goal-analysis" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-wider"
                  style={{ textShadow: 'var(--text-shadow-3d)' }}
                >
                  GOAL PERFORMANCE ANALYSIS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-12">
                {/* Key Insight */}
                <div className="text-center mb-8">
                  <p className="text-2xl font-bold text-football-cyan mb-4">
                    💎 Key insight: Reality and mathematics in football coincide with an accuracy of 99% - but in this 1% discrepancy lies all the magic of the game.
                  </p>
                </div>

                {/* Main Numbers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-football-cyan/10 p-8 rounded-xl text-center border border-football-cyan/30">
                    <div className="text-lg font-bold text-football-cyan mb-4">🎯 MODEL ACCURACY</div>
                    <div className="text-3xl font-bold text-football-cyan mb-2">2.71</div>
                    <div className="text-sm text-muted-foreground mb-1">real goals</div>
                    <div className="text-3xl font-bold text-football-cyan mb-2">2.68</div>
                    <div className="text-sm text-muted-foreground mb-1">expected goals</div>
                    <div className="text-lg font-semibold text-football-cyan">99% accuracy for 6189 goals</div>
                  </div>
                  
                  <div className="bg-football-red/10 p-8 rounded-xl text-center border border-football-red/30">
                    <div className="text-lg font-bold text-football-red mb-4">🏠 HOME ADVANTAGE</div>
                    <div className="text-3xl font-bold text-football-red mb-2">1.53 vs 1.18</div>
                    <div className="text-sm text-muted-foreground mb-1">goals</div>
                    <div className="text-3xl font-bold text-football-red mb-2">1.61 vs 1.15</div>
                    <div className="text-sm text-muted-foreground mb-1">points</div>
                    <div className="text-lg font-semibold text-football-red">+35% home advantage</div>
                  </div>
                  
                  <div className="bg-football-green/10 p-8 rounded-xl text-center border border-football-green/30">
                    <div className="text-lg font-bold text-football-green mb-4">⚽ TOP FINISHERS</div>
                    <div className="text-lg font-bold text-football-green mb-2">Liverpool: +45 goals to xG</div>
                    <div className="text-lg font-bold text-football-green mb-2">Man City: +28 goals to xG</div>
                    <div className="text-lg font-bold text-football-green mb-2">Tottenham: +51 goals to xG</div>
                    <div className="text-lg font-bold text-football-green">Chelsea: +30 goals to xG</div>
                  </div>
                </div>

                {/* What is xG */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-football-purple">🧮 What is xG (Expected Goals)?</h3>
                  <div className="bg-football-purple/10 p-8 rounded-xl border border-football-purple/30">
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      xG is the probability of scoring a goal from a specific position, calculated based on:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📍</span>
                          <span>Kicking position (distance, angle)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🦵</span>
                          <span>Body parts (foot, head)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">⚡</span>
                          <span>Type of attack (open play, free kick, counterattack)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">👥</span>
                          <span>Number of defenders in the vicinity</span>
                        </div>
                      </div>
                      <div className="bg-football-cyan/10 p-4 rounded-lg">
                        <h4 className="font-bold text-football-cyan mb-2">Examples:</h4>
                        <p className="text-sm text-muted-foreground">Penalty kick = 0.76 xG</p>
                        <p className="text-sm text-muted-foreground">Shot from center of penalty box = 0.35 xG</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Advantage */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-football-green">🏠 The phenomenon of home advantage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-football-green/10 p-6 rounded-xl border border-football-green/30">
                      <h4 className="text-xl font-bold text-football-green mb-4">Statistical facts:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• +30% more goals at home</li>
                        <li>• +40% more points at home</li>
                        <li>• +0.04 xG advantage for home teams</li>
                      </ul>
                    </div>
                    <div className="bg-football-red/10 p-6 rounded-xl border border-football-red/30">
                      <h4 className="text-xl font-bold text-football-red mb-4">Reasons for home advantage:</h4>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>🎺 Fan support → +10% to motivation</li>
                        <li>🏟️ Familiar environment → -5% to stress</li>
                        <li>✈️ No travel → +8% to freshness</li>
                        <li>🧠 Psychological attitude → more attacking play</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Seasonal Trends */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-football-blue">📈 Seasonal trends: a calendar of emotions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-football-blue/10 rounded-xl border border-football-blue/30">
                      <thead>
                        <tr className="border-b border-football-blue/20">
                          <th className="p-4 text-left text-football-blue">Month</th>
                          <th className="p-4 text-left text-football-blue">Average goals</th>
                          <th className="p-4 text-left text-football-blue">Home advantage</th>
                          <th className="p-4 text-left text-football-blue">Features</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-football-blue/10">
                          <td className="p-4">August</td>
                          <td className="p-4">2.45</td>
                          <td className="p-4">Minimum</td>
                          <td className="p-4">🔄 Getting into the season</td>
                        </tr>
                        <tr className="border-b border-football-blue/10">
                          <td className="p-4">September</td>
                          <td className="p-4">2.89</td>
                          <td className="p-4">Maximum</td>
                          <td className="p-4">🚀 Peak form</td>
                        </tr>
                        <tr className="border-b border-football-blue/10">
                          <td className="p-4">October-January</td>
                          <td className="p-4">2.65</td>
                          <td className="p-4">Stable</td>
                          <td className="p-4">⚖️ Regularity</td>
                        </tr>
                        <tr className="border-b border-football-blue/10">
                          <td className="p-4">February</td>
                          <td className="p-4">2.78</td>
                          <td className="p-4">Anomaly</td>
                          <td className="p-4">❄️ Winter factor</td>
                        </tr>
                        <tr>
                          <td className="p-4">May</td>
                          <td className="p-4">2.95</td>
                          <td className="p-4">High</td>
                          <td className="p-4">🏆 Struggle for goals</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-football-yellow/10 p-6 rounded-xl border border-football-yellow/30">
                      <h4 className="text-lg font-bold text-football-yellow mb-4">🎯 Explanation of trends:</h4>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>• <strong>August:</strong> Teams are still "playing out" after summer break</li>
                        <li>• <strong>September:</strong> Optimal form without accumulated fatigue</li>
                        <li>• <strong>February:</strong> Unexplained anomaly - requires further investigation</li>
                        <li>• <strong>May:</strong> Maximum stakes + accumulated fatigue = more goals</li>
                      </ul>
                    </div>
                    <div className="bg-football-orange/10 p-6 rounded-xl border border-football-orange/30">
                      <h4 className="text-lg font-bold text-football-orange mb-4">🏆 Team patterns & Top clubs vs the rest:</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        These same teams are in the top 4 in terms of average points per period - proof that 
                        class directly affects chance realization. When filtering only top 6 vs each other: 
                        May matches become the least productive due to maximum importance of each point.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Metrics Section */}
        <section id="team-metrics" className="py-20 bg-gradient-card">
          <div className="container mx-auto px-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-wider"
                  style={{ textShadow: 'var(--text-shadow-3d)' }}
                >
                  TEAM METRICS
                </CardTitle>
                <div className="text-center">
                  <p className="text-2xl font-bold text-football-cyan mb-2">
                    🚀 The revolution in action: In 6 years, the EPL has transformed from a league of brute force to a league of smart tactics
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-12">
                {/* Key Transformations */}
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-football-purple">📊 Key transformations (2014-2020)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-football-cyan/10 p-8 rounded-xl border border-football-cyan/30">
                      <h4 className="text-xl font-bold text-football-cyan mb-4">🎯 QUALITY vs QUANTITY</h4>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="text-football-red">📉 Shots: -0.5 per match</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-football-green">📈 Shots on target: +0.3 per match</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-football-blue">📈 xG per match: +0.4</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 italic">Fewer shots, but more accurate</p>
                    </div>
                    
                    <div className="bg-football-yellow/10 p-8 rounded-xl border border-football-yellow/30">
                      <h4 className="text-xl font-bold text-football-yellow mb-4">💰 FINANCIAL REVOLUTION</h4>
                      <div className="space-y-3 text-sm">
                        <div>🏆 Top 6: Dominance → Competition</div>
                        <div>🔄 Tier-2: Strengthening with TV money</div>
                        <div>📉 Newcomers: Hopeless backlog</div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 italic">Money has changed the balance of power</p>
                    </div>
                    
                    <div className="bg-football-green/10 p-8 rounded-xl border border-football-green/30">
                      <h4 className="text-xl font-bold text-football-green mb-4">📈 TACTICAL EVOLUTION</h4>
                      <div className="space-y-3 text-sm">
                        <div>📊 More analytics</div>
                        <div>🧠 Fewer instincts</div>
                        <div>⚽ Controlled football</div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 italic">From chaos to system</p>
                    </div>
                  </div>
                </div>

                {/* Tactical Laboratory */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-football-blue">🔬 Tactical laboratory</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-football-red/10 p-6 rounded-xl border border-football-red/30">
                      <h4 className="text-xl font-bold text-football-red mb-4">Before the revolution (2014-2016):</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>⚽ 13.2 match shots</div>
                        <div>🎯 4.1 shots on target</div>
                        <div>📊 2.28 xG average</div>
                        <div>🎲 More chaos, less predictability</div>
                      </div>
                    </div>
                    <div className="bg-football-green/10 p-6 rounded-xl border border-football-green/30">
                      <h4 className="text-xl font-bold text-football-green mb-4">After the revolution (2018-2020):</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>⚽ 12.7 shots per match (-4%)</div>
                        <div>🎯 4.4 shots on target (+7%)</div>
                        <div>📊 2.68 xG average (+17%)</div>
                        <div>🧠 More control, better moments</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regression Examples */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-football-purple">📈 The phenomenon of regression to the mean</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-football-blue/10 p-6 rounded-xl border border-football-blue/30">
                      <h4 className="text-xl font-bold text-football-blue mb-4">🎢 Leicester City:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 2015/16: Champions (81 points)</li>
                        <li>• 2016/17: 12th place (44 points)</li>
                        <li>• The team didn't get worse, it just got back to normal</li>
                      </ul>
                    </div>
                    <div className="bg-football-red/10 p-6 rounded-xl border border-football-red/30">
                      <h4 className="text-xl font-bold text-football-red mb-4">⚽ Chelsea Mourinho/Conte:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Overperformance with championship 14/15</li>
                        <li>• Terrible failure 15/16 despite decent play quality</li>
                        <li>• Again championship with overperformance</li>
                        <li>• Football reminded us of statistical justice</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="bg-gradient-to-r from-football-purple/5 to-football-blue/5 p-8 rounded-xl border border-football-purple/30">
                  <h3 className="text-2xl font-bold text-football-purple mb-6">💎 Main conclusion</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The EPL has become a laboratory for the future of football, where money, tactics and 
                    technology have created the most competitive league in the history of the sport. 
                    The transformation from brute force to smart football is not just a trend, but a new reality that will shape the future of the game.
                    </p>
                </div>

                {/* Dashboard */}
                <div className="w-full flex justify-center bg-background/50 rounded-xl p-6">
                  <iframe 
                    title="Football Dashboard" 
                    width="1000" 
                    height="600" 
                    src="https://app.powerbi.com/view?r=eyJrIjoiYTVlMDE3NGYtNDM4Ni00NjgxLWJhOWYtMWMyMjU3ODkwNWI1IiwidCI6IjEzOTA3NTcwLWNiZmUtNDY4Mi1iMDQ3LTQ4MDQwMzIxOThmYyIsImMiOjl9&pageName=ReportSection78b96b3a97c605120ee6" 
                    frameBorder="0" 
                    allowFullScreen
                    className="rounded-lg shadow-card border border-border max-w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Betting Analysis Section */}
        <section id="betting-analysis" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-wider"
                  style={{ textShadow: 'var(--text-shadow-3d)' }}
                >
                  BETTING MARKET EFFICIENCY
                </CardTitle>
                <div className="text-center">
                  <p className="text-2xl font-bold text-football-cyan mb-4">
                    🎯 A revolutionary discovery: Bookmakers are better at predicting math than the chaos of football. The 8.9% difference between xG and reality is the price of unpredictability.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-12">
                {/* Forecast Accuracy */}
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-football-cyan">📊 Forecast accuracy: numbers that shock</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-football-purple/10 p-8 rounded-xl border border-football-purple/30">
                      <h4 className="text-xl font-bold text-football-purple mb-4">🏆 MATCH WINNERS</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>🤖 xG model:</span>
                          <span className="font-bold text-football-green">70.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🌟 Reality:</span>
                          <span className="font-bold text-football-red">61.4%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>📊 Difference:</span>
                          <span className="font-bold text-football-yellow">8.9% (price of chaos)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-football-blue/10 p-8 rounded-xl border border-football-blue/30">
                      <h4 className="text-xl font-bold text-football-blue mb-4">⚽ TOTAL GOALS</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>🤖 xG model:</span>
                          <span className="font-bold text-football-green">60.75%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🌟 Reality:</span>
                          <span className="font-bold text-football-red">58.68%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>📊 Variance:</span>
                          <span className="font-bold text-football-green">2.07% (minimum)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why So Low */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-football-red">🤔 Why 58-60% is a PHENOMENALLY small percentage?</h3>
                  
                  <div className="bg-football-red/10 p-8 rounded-xl border border-football-red/30">
                    <h4 className="text-xl font-bold text-football-red mb-4">📈 Comparison with other sports:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-football-red/20">
                            <th className="p-3 text-left text-football-red">Sport</th>
                            <th className="p-3 text-left text-football-red">Prediction Accuracy</th>
                            <th className="p-3 text-left text-football-red">Why such difference?</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground text-sm">
                          <tr className="border-b border-football-red/10">
                            <td className="p-3">🏀 Basketball</td>
                            <td className="p-3">68-72%</td>
                            <td className="p-3">~200 points per game = more stability</td>
                          </tr>
                          <tr className="border-b border-football-red/10">
                            <td className="p-3">🎾 Tennis</td>
                            <td className="p-3">65-69%</td>
                            <td className="p-3">Individual sport = less variables</td>
                          </tr>
                          <tr className="border-b border-football-red/10">
                            <td className="p-3">⚽ Football</td>
                            <td className="p-3">58-61%</td>
                            <td className="p-3">~3 goals per game = maximum variability</td>
                          </tr>
                          <tr>
                            <td className="p-3">🏈 NFL</td>
                            <td className="p-3">63-67%</td>
                            <td className="p-3">More points + stats</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-football-yellow/10 p-6 rounded-xl border border-football-yellow/30">
                      <h4 className="text-lg font-bold text-football-yellow mb-4">💡 Why football is the most difficult to predict:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Low scoring → every goal changes everything</li>
                        <li>• 👥 22 players → millions of interaction combinations</li>
                        <li>• 🎲 Accidents → ricochets, referee mistakes</li>
                        <li>• ⚡ 90 minutes → long enough to lose concentration</li>
                      </ul>
                    </div>
                    <div className="bg-football-green/10 p-6 rounded-xl border border-football-green/30">
                      <h4 className="text-lg font-bold text-football-green mb-4">🚀 Technological breakthrough of 2019/20:</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        2014/15: 55.3% accuracy → 2019/20: 68.95% 🔥 BREAKTHROUGH!
                      </p>
                      <p className="text-xs text-muted-foreground">
                        AI and machine learning, real-time player analysis, social networks for team mood
                      </p>
                    </div>
                  </div>
                </div>

                {/* Most Predictable vs Chaotic */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-football-purple">🏆 Most predictable vs most chaotic teams</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-football-green/10 p-6 rounded-xl border border-football-green/30">
                      <h4 className="text-xl font-bold text-football-green mb-4">🎯 THE MOST PREDICTABLE</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>1. Man City:</span>
                          <span className="font-bold text-football-green">67%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">(Stable dominance)</p>
                        <div className="flex justify-between">
                          <span>2. Burnley:</span>
                          <span className="font-bold text-football-green">67%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">(Predictable tactics)</p>
                      </div>
                    </div>
                    <div className="bg-football-red/10 p-6 rounded-xl border border-football-red/30">
                      <h4 className="text-xl font-bold text-football-red mb-4">🎲 THE MOST CHAOTIC</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>1. Tottenham:</span>
                          <span className="font-bold text-football-red">52%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">("Lads, it's Tottenham")</p>
                        <div className="flex justify-between">
                          <span>2. Everton:</span>
                          <span className="font-bold text-football-red">54%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">(Form inconsistency)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leicester Phenomenon */}
                <div className="bg-gradient-to-r from-football-blue/5 to-football-purple/5 p-8 rounded-xl border border-football-blue/30">
                  <h3 className="text-2xl font-bold text-football-blue mb-6">🔍 Phenomenon of the 2015/16 season</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-football-red mb-4">📉 The year the math gave up:</h4>
                      <p className="text-lg font-bold text-football-red mb-3">Prediction accuracy: 55.26% - the worst ever!</p>
                      <h5 className="font-semibold text-football-yellow mb-2">The reasons:</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Leicester: with 5000/1 odds to win the title</li>
                        <li>• Chelsea: from champions to 10th place</li>
                        <li>• Liverpool and Manchester United: unexpected failures</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-football-green mb-4">💎 Key takeaway:</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Bookmakers are getting smarter, but football remains unpredictable. 
                        That 8.9% difference between logic and chaos is the soul of the most 
                        beautiful game in the world.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Performance Metrics Correlation Section */}
        <section id="correlation" className="py-20 bg-gradient-card">
          <div className="container mx-auto px-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-wider"
                  style={{ textShadow: 'var(--text-shadow-3d)' }}
                >
                  PERFORMANCE METRICS CORRELATION
                </CardTitle>
                <div className="text-center">
                  <p className="text-2xl font-bold text-football-cyan mb-4">
                    💡 A shocking discovery: The number of shots predicts victory no better than a coin flip.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-12">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-football-green mb-6">🎯 Metrics ranking: who is the real king of predictions?</h3>
                  
                  <div className="bg-gradient-to-r from-football-purple/5 to-football-cyan/5 p-8 rounded-xl border border-football-purple/30">
                    <h4 className="text-2xl font-bold text-football-yellow mb-6">🏆 TOP 5 PREDICTORS OF VICTORY:</h4>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="py-3 px-4 text-football-cyan font-bold">Rank</th>
                            <th className="py-3 px-4 text-football-cyan font-bold">Metric</th>
                            <th className="py-3 px-4 text-football-cyan font-bold">Correlation</th>
                            <th className="py-3 px-4 text-football-cyan font-bold">Explanation</th>
                            <th className="py-3 px-4 text-football-cyan font-bold">Practicality</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/20">
                            <td className="py-3 px-4">🥇</td>
                            <td className="py-3 px-4 font-semibold">Moment realization</td>
                            <td className="py-3 px-4 text-football-green font-bold">62.5%</td>
                            <td className="py-3 px-4">Accuracy &gt; quantity</td>
                            <td className="py-3 px-4">⭐⭐⭐⭐⭐</td>
                          </tr>
                          <tr className="border-b border-border/20">
                            <td className="py-3 px-4">🥈</td>
                            <td className="py-3 px-4 font-semibold">xG (Expected Goals)</td>
                            <td className="py-3 px-4 text-football-blue font-bold">60.6%</td>
                            <td className="py-3 px-4">Quality vs chaos</td>
                            <td className="py-3 px-4">⭐⭐⭐⭐</td>
                          </tr>
                          <tr className="border-b border-border/20">
                            <td className="py-3 px-4">🥉</td>
                            <td className="py-3 px-4 font-semibold">Shots on target</td>
                            <td className="py-3 px-4 text-football-purple font-bold">58.2%</td>
                            <td className="py-3 px-4">Specific threat</td>
                            <td className="py-3 px-4">⭐⭐⭐</td>
                          </tr>
                          <tr className="border-b border-border/20">
                            <td className="py-3 px-4">5️⃣</td>
                            <td className="py-3 px-4 font-semibold">Number of shots</td>
                            <td className="py-3 px-4 text-football-red font-bold">50.8%</td>
                            <td className="py-3 px-4">Almost random</td>
                            <td className="py-3 px-4">⭐</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-football-cyan mb-4">🔍 What does correlation mean in simple terms?</h3>
                    
                    <div className="bg-football-blue/10 p-6 rounded-xl border border-football-blue/30">
                      <h4 className="text-lg font-bold text-football-blue mb-4">Correlation is the relationship between two things:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                        <div>
                          <p><strong>100%</strong> = Always together (not possible in football)</p>
                          <p><strong>75%+</strong> = Strong connection</p>
                          <p><strong>50%</strong> = Like a coin flip</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-football-yellow mb-2">Examples from life:</h5>
                          <p>• <strong>Height vs. Weight</strong>: ~70% (taller people are often heavier)</p>
                          <p>• <strong>Education vs. Income</strong>: ~65% (education usually = more money)</p>
                          <p>• <strong>Shooting ↔ Winning</strong>: 50.8% (almost a fluke!)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-football-red mb-4">⚡ The paradox of hits: why more ≠ better</h3>
                    
                    <div className="bg-football-red/10 p-6 rounded-xl border border-football-red/30">
                      <h4 className="text-lg font-bold text-football-red mb-4">🎯 Why kicks are deceptive:</h4>
                      <div className="bg-background/50 p-4 rounded-lg">
                        <h5 className="font-bold mb-3">Scenario: Team A vs Team B</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="bg-football-red/20 p-3 rounded">
                            <p><strong>Team A:</strong> 20 shots, on goal 5, xG 2.2, 2 goals, <span className="text-football-red font-bold">loss 2-3</span></p>
                          </div>
                          <div className="bg-football-green/20 p-3 rounded">
                            <p><strong>Team B:</strong> 8 shots, 5 in the box, xG 1.9, 3 goals, <span className="text-football-green font-bold">win 3-2</span></p>
                          </div>
                        </div>
                        <p className="mt-3 text-center font-semibold">Who played better? Shot statistics says A, score says B.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-football-purple mb-4">🧠 Top 6 vs Others: different rules of the game</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-football-yellow/10 p-6 rounded-xl border border-football-yellow/30">
                        <h4 className="text-xl font-bold text-football-yellow mb-4">👑 TOP 6 TEAMS</h4>
                        <div className="space-y-2 text-muted-foreground">
                          <p><strong>Most important metric:</strong> xG (65.3%)</p>
                          <p><strong>Why:</strong> Consistently create a lot of chances</p>
                          <p><strong>Strategy:</strong> Volume + quality. Top teams can&apos;t rely on such a fickle thing as realization.</p>
                        </div>
                      </div>
                      
                      <div className="bg-football-orange/10 p-6 rounded-xl border border-football-orange/30">
                        <h4 className="text-xl font-bold text-football-orange mb-4">⚔️ REMAINING TEAMS</h4>
                        <div className="space-y-2 text-muted-foreground">
                          <p><strong>Most important metric:</strong> Realization</p>
                          <p><strong>Why:</strong> Few moments → every one counts</p>
                          <p><strong>Strategy:</strong> Efficiency &gt; volume</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-football-green mb-4">🎯 Revolutionary insights</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-football-purple/10 p-6 rounded-xl border border-football-purple/30">
                        <h4 className="text-lg font-bold text-football-purple mb-3">For commenters:</h4>
                        <p className="text-muted-foreground">Stop saying &quot;the team that shoots more wins&quot; - it&apos;s not true 49.2% of the time!</p>
                      </div>
                      
                      <div className="bg-football-cyan/10 p-6 rounded-xl border border-football-cyan/30">
                        <h4 className="text-lg font-bold text-football-cyan mb-3">For fans:</h4>
                        <p className="text-muted-foreground">Don&apos;t be upset by the statistics of shots - look at the quality of the chances.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-football-cyan/10 to-football-green/10 p-8 rounded-2xl border border-football-cyan/30 text-center">
                    <h3 className="text-2xl font-bold text-football-cyan mb-4">💎 The main conclusion:</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                      In football, quantity is not the main thing. What matters is the quality of chances and their realization. 
                      That&apos;s why xG has revolutionized game analysis, and shot statistics have become a historical artifact.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Match Unpredictability Analysis Section */}
        <section id="unpredictability" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-wider"
                  style={{ textShadow: 'var(--text-shadow-3d)' }}
                >
                  MATCH UNPREDICTABILITY ANALYSIS
                </CardTitle>
                <div className="text-center">
                  <p className="text-2xl font-bold text-football-cyan mb-4">
                    🎲 The formula of football magic: Why does a match with an unpredictability index of 0.78 leave you breathless and 0.25 leave you falling asleep on the couch?
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-12">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-football-purple mb-6">🧮 The unpredictability index: the math of emotions</h3>
                  
                  <div className="bg-gradient-to-r from-football-purple/5 to-football-blue/5 p-8 rounded-xl border border-football-purple/30">
                    <h4 className="text-xl font-bold text-football-blue mb-4">📐 Formula (simplified):</h4>
                    <div className="bg-background/50 p-4 rounded-lg mb-4">
                      <p className="text-lg font-mono text-center">Unpredictability = How much the outcome differs from the expected one</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <p className="text-muted-foreground">If bookmakers gave:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                          <li>70% for the favorite to win, and the underdog lost</li>
                          <li>The index will be HIGH (match sensation!)</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">If the bookmakers gave:</p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                          <li>51% on the victory, and it happened</li>
                          <li>The index will be LOW (boring match)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="text-lg font-bold text-football-yellow mb-3">🎯 Emotion scale:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-football-red/20 p-3 rounded">🔥 <strong>0.8-1.0</strong> = THE SENSATION OF THE CENTURY</div>
                        <div className="bg-football-orange/20 p-3 rounded">⚡ <strong>0.6-0.8</strong> = Wow, I didn't expect it!</div>
                        <div className="bg-football-yellow/20 p-3 rounded">😐 <strong>0.4-0.6</strong> = An ordinary match</div>
                        <div className="bg-football-blue/20 p-3 rounded">😴 <strong>0.0-0.4</strong> = Predictable and boring</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-football-orange mb-4">📊 Season 2015/16: the maths added up</h3>
                    
                    <div className="bg-football-orange/10 p-6 rounded-xl border border-football-orange/30">
                      <h4 className="text-xl font-bold text-football-orange mb-4">🦊 The Leicester phenomenon in numbers:</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-background/50 p-4 rounded-lg">
                          <h5 className="font-bold text-football-green mb-3">AVERAGE INDEX OF THE SEASON</h5>
                          <div className="space-y-2 text-muted-foreground">
                            <p>🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL in general: <strong>0.62</strong></p>
                            <p>🦊 Leicester City: <strong>0.62</strong></p>
                          </div>
                        </div>
                        <div className="bg-background/50 p-4 rounded-lg">
                          <h5 className="font-bold text-football-red mb-3">OTHER TEAMS</h5>
                          <div className="space-y-2 text-muted-foreground">
                            <p>🔴 Liverpool: <strong>0.67</strong> (!)</p>
                            <p>🔵 Chelsea: <strong>0.72</strong> (!)</p>
                            <p>⚒️ West Ham: <strong>0.78</strong> (!!)</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-football-yellow/20 p-4 rounded-lg">
                        <h5 className="font-bold text-football-yellow mb-2">💡 Leicester's paradox:</h5>
                        <p className="text-muted-foreground">
                          The champions had a <strong>LOWER</strong> unpredictability index than Liverpool, Chelsea and West Ham! 
                          Why? Because bookmakers started betting on them after Christmas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-football-red mb-4">🎭 Anatomy of football emotions</h3>
                    
                    <div className="bg-football-red/10 p-6 rounded-xl border border-football-red/30">
                      <h4 className="text-xl font-bold text-football-red mb-4">🧠 The psychology of unpredictability:</h4>
                      
                      <div className="space-y-6">
                        <div className="bg-background/50 p-4 rounded-lg">
                          <h5 className="font-bold text-football-blue mb-3">Index 0.2-0.3 (Boredom):</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                            <div>😴 "Of course, City won 3-0"</div>
                            <div>😑 "You could have not watched it"</div>
                            <div>📱 Switch to your phone in the 60th minute</div>
                          </div>
                        </div>

                        <div className="bg-background/50 p-4 rounded-lg">
                          <h5 className="font-bold text-football-orange mb-3">Index 0.7-0.8 (Admiration):</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                            <div>🤯 "No way!"</div>
                            <div>🗣️ You call a friend: &quot;Do you see what&apos;s happening?&quot;</div>
                            <div>📺 You don&apos;t get up from the couch until the final whistle</div>
                          </div>
                        </div>

                        <div className="bg-background/50 p-4 rounded-lg">
                          <h5 className="font-bold text-football-red mb-3">Index 0.9+ (Historical moment):</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                            <div>🤯 You&apos;re speechless</div>
                            <div>📱 Posting to all social networks</div>
                            <div>💭 You remember this match in 10 years</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-football-green mb-4">📈 Unpredictability trends by season</h3>
                    
                    <div className="bg-football-green/10 p-6 rounded-xl border border-football-green/30">
                      <h4 className="text-xl font-bold text-football-green mb-4">🗓️ Dynamics of chaos:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-background/50 p-3 rounded">
                          <div className="font-bold">2014/15</div>
                          <div className="text-football-cyan">0.57</div>
                          <div className="text-xs text-muted-foreground">(steady start)</div>
                        </div>
                        <div className="bg-football-orange/30 p-3 rounded">
                          <div className="font-bold">2015/16</div>
                          <div className="text-football-orange font-bold">0.62</div>
                          <div className="text-xs text-muted-foreground">(LEICESTER'S YEAR!)</div>
                        </div>
                        <div className="bg-background/50 p-3 rounded">
                          <div className="font-bold">2016/17</div>
                          <div className="text-football-blue">0.53</div>
                          <div className="text-xs text-muted-foreground">(return of order)</div>
                        </div>
                        <div className="bg-background/50 p-3 rounded">
                          <div className="font-bold">2017/18</div>
                          <div className="text-football-purple">0.56</div>
                          <div className="text-xs text-muted-foreground">(new normal)</div>
                        </div>
                        <div className="bg-background/50 p-3 rounded">
                          <div className="font-bold">2018/19</div>
                          <div className="text-football-green">0.52</div>
                          <div className="text-xs text-muted-foreground">(increased competition)</div>
                        </div>
                        <div className="bg-background/50 p-3 rounded">
                          <div className="font-bold">2019/20</div>
                          <div className="text-football-red">0.58</div>
                          <div className="text-xs text-muted-foreground">(COVID = chaos)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-football-cyan mb-4">🎯 Interactive unpredictability calculator</h3>
                    
                    <div className="bg-football-cyan/10 p-6 rounded-xl border border-football-cyan/30">
                      <h4 className="text-xl font-bold text-football-cyan mb-4">🔧 Calculate it yourself:</h4>
                      <div className="bg-background/50 p-4 rounded-lg font-mono text-sm">
                        <div className="text-muted-foreground mb-2">// Example: Liverpool (53%) vs Norwich (21%), draw (26%)</div>
                        <div className="text-muted-foreground mb-2">// Result: 0-2 for Norwich</div>
                        <div className="space-y-1">
                          <div>Expected: H=53%, D=26%, A=21%</div>
                          <div>Actual: H=0%, D=0%, A=100%</div>
                          <div className="mt-2">Index = (0-0.53)² + (0-0.26)² + (1-0.21)²</div>
                          <div>= 0.28 + 0.07 + 0.62</div>
                          <div className="text-football-red font-bold">= 0.97</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-football-yellow mb-4">💎 Why unpredictability = popularity</h3>
                    
                    <div className="bg-football-yellow/10 p-6 rounded-xl border border-football-yellow/30">
                      <h4 className="text-xl font-bold text-football-yellow mb-4">🧬 The biology of cheering:</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-background/50 p-4 rounded-lg">
                          <h5 className="font-bold text-football-blue mb-3">Low unpredictability:</h5>
                          <div className="space-y-2 text-muted-foreground">
                            <p>🧠 Brain: "Boring, everything is clear"</p>
                            <p>💉 Dopamine: minimal release</p>
                            <p>⏰ Attention: dissipates after 20 minutes</p>
                          </div>
                        </div>
                        
                        <div className="bg-background/50 p-4 rounded-lg">
                          <h5 className="font-bold text-football-red mb-3">High unpredictability:</h5>
                          <div className="space-y-2 text-muted-foreground">
                            <p>🧠 Brain: "What's going to happen next?"</p>
                            <p>💉 Dopamine: maximum release</p>
                            <p>⏰ Attention: chained to the screen for 90+ minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-football-blue/10 to-football-purple/10 p-8 rounded-2xl border border-football-blue/30 text-center">
                    <h3 className="text-2xl font-bold text-football-blue mb-4">🎲 The main conclusion:</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                      Unpredictability is the secret formula of football magic. That&apos;s why we fall in love with a game where the underdog can beat the favorite. 
                      Math explains emotions, and emotions make football the most popular sport in the world.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Goal Difference Analysis Section */}
        <section id="goal-difference" className="py-20 bg-gradient-card">
          <div className="container mx-auto px-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-wider"
                  style={{ textShadow: 'var(--text-shadow-3d)' }}
                >
                  GOAL DIFFERENCE ANALYSIS
                </CardTitle>
                <div className="text-center">
                  <p className="text-2xl font-bold text-football-cyan mb-4">
                    ⚽ The secret of drama: Why do 60% of soccer matches keep you on your toes until the last minute? It's all about the math of small numbers.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-12">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-football-orange mb-6">🎯 Anatomy of a football drama</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-football-green/10 p-6 rounded-xl border border-football-green/30">
                      <h4 className="text-xl font-bold text-football-green mb-4">📊 REAL RESULTS</h4>
                      <div className="space-y-3 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>🤝 Draw or ±1 goal:</span>
                          <span className="font-bold text-football-green">60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🎭 Draw or ±1-2 goals:</span>
                          <span className="font-bold text-football-green">83%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>💥 Defeats (±3+ goals):</span>
                          <span className="font-bold text-football-red">17%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-football-cyan/10 p-6 rounded-xl border border-football-cyan/30">
                      <h4 className="text-xl font-bold text-football-cyan mb-4">🔮 MATH EXPECTATIONS (xG)</h4>
                      <div className="space-y-3 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>📈 Difference xG 0-1:</span>
                          <span className="font-bold text-football-cyan">66%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>📈 Difference xG 0-2:</span>
                          <span className="font-bold text-football-cyan">91%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>📈 Large differences xG:</span>
                          <span className="font-bold text-football-red">9%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-football-purple mb-4">🎲 Why football is a game of millimeters</h3>
                    
                    <div className="bg-football-purple/10 p-6 rounded-xl border border-football-purple/30">
                      <h4 className="text-xl font-bold text-football-purple mb-4">🔍 Comparison with other sports:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-border/30">
                              <th className="py-3 px-4 text-football-cyan font-bold">Sport</th>
                              <th className="py-3 px-4 text-football-cyan font-bold">Average difference</th>
                              <th className="py-3 px-4 text-football-cyan font-bold">Matches ±1-2 points</th>
                              <th className="py-3 px-4 text-football-cyan font-bold">Drama factor</th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-b border-border/20">
                              <td className="py-3 px-4">🏀 Basketball</td>
                              <td className="py-3 px-4">12-15 points</td>
                              <td className="py-3 px-4">23%</td>
                              <td className="py-3 px-4">⭐⭐</td>
                            </tr>
                            <tr className="border-b border-border/20">
                              <td className="py-3 px-4">🏈 NFL</td>
                              <td className="py-3 px-4">14-17 points</td>
                              <td className="py-3 px-4">31%</td>
                              <td className="py-3 px-4">⭐⭐⭐</td>
                            </tr>
                            <tr className="border-b border-border/20">
                              <td className="py-3 px-4">🎾 Tennis</td>
                              <td className="py-3 px-4">2-3 sets</td>
                              <td className="py-3 px-4">45%</td>
                              <td className="py-3 px-4">⭐⭐⭐⭐</td>
                            </tr>
                            <tr className="border-b border-border/20">
                              <td className="py-3 px-4 font-bold text-football-orange">⚽ Football</td>
                              <td className="py-3 px-4 font-bold text-football-orange">1-2 goals</td>
                              <td className="py-3 px-4 font-bold text-football-orange">83%</td>
                              <td className="py-3 px-4 font-bold text-football-orange">⭐⭐⭐⭐⭐</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-football-orange/10 to-football-red/10 p-8 rounded-2xl border border-football-orange/30 text-center">
                    <h3 className="text-2xl font-bold text-football-orange mb-4">💡 Conclusion:</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                      Football is the only sport where <strong className="text-football-orange">83%</strong> of matches are decided by a minimal difference. 
                      This makes every match a potential drama!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Strategic Insights */}
        <section id="insights" className="py-20 bg-gradient-card">
          <div className="container mx-auto px-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="text-center pb-8">
                <CardTitle 
                  className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-wider"
                  style={{ textShadow: 'var(--text-shadow-3d)' }}
                >
                  💡 CONCLUSION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-12">
                {/* Key Insight */}
                <div className="text-center mb-12">
                  <div className="bg-gradient-to-r from-football-cyan/20 to-football-blue/20 p-8 rounded-2xl border border-football-cyan/30 max-w-5xl mx-auto">
                    <p className="text-2xl font-bold text-primary mb-4">
                      Football is the only sport where <strong className="text-football-cyan">83%</strong> of matches are decided by a minimal difference. 
                      This makes every match a potential drama!
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Our study of 2,820 Premier League matches uncovered the mathematical formula behind why 
                      4 billion people can't tear themselves away from their screens every weekend.
                    </p>
                  </div>
                </div>

                {/* Main Discovery */}
                <div className="mb-12">
                  <h4 className="text-3xl font-bold text-primary mb-8 text-center">🎯 Main Discovery: The Anatomy of Football Magic</h4>

                  <div className="bg-football-purple/10 p-8 rounded-xl border border-football-purple/30 mb-8">
                    <h5 className="text-2xl font-bold text-football-purple mb-6">🔢 The Mathematics of Unpredictability:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-xl">✅</span>
                          <span className="text-lg">83% of matches are decided by a minimal difference</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-xl">✅</span>
                          <span className="text-lg">60% of results cannot be predicted</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-xl">✅</span>
                          <span className="text-lg">1 goal can change the fate of a season</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-xl">✅</span>
                          <span className="text-lg">Every 90 minutes - a potential drama</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-football-purple mt-6 text-center">
                      This combination of small numbers and big emotions is what makes football unique among all sports.
                    </p>
                  </div>
                </div>

                {/* Future Predictions */}
                <div className="mb-12">
                  <h4 className="text-3xl font-bold text-primary mb-8 text-center">🔮 Future Predictions: The Future of Football Analytics</h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-football-blue/10 p-8 rounded-xl border border-football-blue/30">
                      <h5 className="text-2xl font-bold text-football-blue mb-6">🚀 Long-Term Changes (2026-2035):</h5>
                      <div className="space-y-4">
                        <p className="text-lg font-bold text-football-cyan mb-4">A revolution in football:</p>
                        <div className="space-y-3 text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="text-football-blue">🤖</span>
                            <span>AI referees for offside (99.9% accuracy)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-football-blue">🏃‍♂️</span>
                            <span>Biometric monitoring of all players</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-football-blue">🧠</span>
                            <span>Neural networks will predict tactical decisions</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-football-blue">👁️</span>
                            <span>Computer vision for automatic calculation of all metrics</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-football-blue">🥽</span>
                            <span>VR training based on opponents' big data</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-football-blue">🔮</span>
                            <span>Predictive injury models with 85%+ accuracy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-football-green/10 p-8 rounded-xl border border-football-green/30">
                      <h5 className="text-2xl font-bold text-football-green mb-6">🎭 Cultural Phenomenon:</h5>
                      <p className="text-lg text-muted-foreground mb-4">
                        Football has become a universal language of emotions, and our research explains why:
                      </p>
                      <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-start gap-3">
                          <span className="text-football-green mt-1">•</span>
                          <span>Low scoring = high value of each event</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-football-green mt-1">•</span>
                          <span>Unpredictability = constant tension</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-football-green mt-1">•</span>
                          <span>Globalization = shared experiences of billions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mb-12">
                  <h4 className="text-3xl font-bold text-primary mb-8 text-center">📞 Call-to-Action: Join the Revolution</h4>

                  <div className="bg-gradient-to-r from-football-yellow/10 to-football-orange/10 p-8 rounded-xl border border-football-yellow/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="text-xl font-bold text-football-yellow mb-4">Next Steps:</h5>
                        <ol className="space-y-3 text-muted-foreground">
                          <li className="flex items-start gap-3">
                            <span className="text-football-yellow font-bold">1.</span>
                            <span>
                            Explore my{' '}
                            <a
                              href="https://github.com/mementomee/Why_football_is_so_popular"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-football-cyan hover:text-football-blue transition-colors duration-300 font-bold underline decoration-2 underline-offset-4 hover:decoration-football-blue"
                            > 
                              GitHub repository
                            </a>
                            {' '}for the complete code
                          </span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-football-yellow font-bold">2.</span>
                            <span>Repeat the analysis on other leagues (Bundesliga, La Liga)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-football-yellow font-bold">3.</span>
                            <span>Expand the research to other sports</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-football-yellow font-bold">4.</span>
                            <span>Publish your findings</span>
                          </li>
                        </ol>
                      </div>
                      
                      <div>
                        <h5 className="text-xl font-bold text-football-orange mb-4">Potential Research Directions:</h5>
                        <ul className="space-y-3 text-muted-foreground">
                          <li className="flex items-start gap-3">
                            <span className="text-football-orange">•</span>
                            <span>Cultural analysis of sports unpredictability</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-football-orange">•</span>
                            <span>Impact of technology on prediction accuracy</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-football-orange">•</span>
                            <span>Emotional impact of unpredictability on viewers</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Chord */}
                <div className="text-center space-y-8">
                  <div className="bg-gradient-to-r from-football-cyan/10 to-football-red/10 p-8 rounded-2xl border border-football-cyan/30">
                    <h4 className="text-3xl font-bold text-primary mb-6">🎊 Final Chord</h4>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-6">
                      Our research has shown that <strong className="text-football-cyan">unpredictability is not a bug in football, it's a feature.</strong> 
                      And while mathematicians try to tame it, billions of fans continue to fall in love 
                      with this beautiful chaos.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <blockquote className="text-3xl md:text-4xl font-bold text-football-yellow italic mb-4">
                      "FOOTBALL IS THE MOST IMPORTANT OF THE LESS IMPORTANT THINGS IN THE WORLD"
                    </blockquote>
                    <cite className="text-xl text-muted-foreground">- Carlo Ancelotti</cite>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-background via-card to-background text-white py-12 border-t border-border">
        <div className="container mx-auto px-6">
          {/* Author Section */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-football-cyan to-football-yellow inline-block text-transparent bg-clip-text">
              <h3 className="text-3xl font-black mb-2 text-primary tracking-wider" style={{ textShadow: 'var(--text-shadow-3d)' }}>
                NAZAR PETRASHCHUK
              </h3>
            </div>
            <p className="text-foreground/90 text-lg mb-1 font-semibold">Data Analyst</p>
            <p className="text-muted-foreground text-sm">Research on the popularity of football from a statistical perspective</p>
          </div>

          {/* Contact Links */}
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            <a 
              href="mailto:petrasuknazar@gmail.com" 
              className="flex items-center gap-2 bg-card/50 hover:bg-football-cyan/20 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-border"
            >
              <span>📧</span>
              <span className="text-sm font-medium text-foreground">Email</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/nazar-petrashchuk-b781472aa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-card/50 hover:bg-football-cyan/20 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-border"
            >
              <span>💼</span>
              <span className="text-sm font-medium text-foreground">LinkedIn</span>
            </a>
            <a 
              href="https://github.com/mementomee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-card/50 hover:bg-football-cyan/20 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-border"
            >
              <span>💻</span>
              <span className="text-sm font-medium text-foreground">GitHub</span>
            </a>
            <a 
              href="https://t.me/mementomee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-card/50 hover:bg-football-cyan/20 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-border"
            >
              <span>💬</span>
              <span className="text-sm font-medium text-foreground">Telegram</span>
            </a>
          </div>

          {/* Back to Top Button */}
          <div className="text-center">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-football-cyan/20 text-football-cyan hover:bg-football-cyan/30 border border-football-cyan/30 px-6 py-2"
            >
              ↑ Back to top
            </Button>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-muted-foreground text-sm">
              © 2024 Football Analytics Research • Feb 20, 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;