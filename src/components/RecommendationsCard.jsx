import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

function RecommendationsCard({ userPrefs, weatherData }) {
  const [aiRecommendations, setAiRecommendations] = useState([]);

  useEffect(() => {
    if (userPrefs && weatherData) {
      fetchRecommendations(userPrefs, weatherData);
    }
  }, [userPrefs, weatherData]);

  const fetchRecommendations = async (userPrefs, weatherData) => {
    try {
      const res = await fetch("http://localhost:3000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userPrefs, weather: weatherData })
      });
      const data = await res.json();
      setAiRecommendations(parseRecommendations(data.recommendations));
    } catch (err) {
      console.error("Erreur IA:", err);
    }
  };

  const parseRecommendations = (rawText) => {
    const recommendations = rawText.split("\n\n").filter(Boolean).map((block, index) => {
      const lines = block.split("\n");
      return {
        id: index,
        icon: lines[0].match(/^\p{Emoji}/u)?.[0] || "✨",
        title: lines[0].replace(/^\p{Emoji}\s*/u, ""),
        description: lines[1] || "",
        confidence: lines[2]?.match(/\d+/)?.[0] || "90"
      };
    });
    return recommendations;
  };

  return (
    <div className="recommendations-card">
      <div className="recommendations-header">
        <Sparkles className="recommendations-icon" />
        <h2 className="recommendations-title">Recommandations IA</h2>
      </div>

      <div className="recommendations-list">
        {aiRecommendations.slice(0, 2).map((rec) => (
          <div key={rec.id} className="recommendation-item">
            <div className="recommendation-content">
              <div className="recommendation-emoji">{rec.icon}</div>
              <div className="recommendation-text">
                <h3 className="recommendation-title">{rec.title}</h3>
                <p className="recommendation-description">{rec.description}</p>
                <div className="recommendation-footer">
                  <div className="confidence-indicator">
                    <div className="confidence-dot"></div>
                    <span className="confidence-text">{rec.confidence}% sûr</span>
                  </div>
                  <ChevronRight className="recommendation-arrow" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationsCard;
