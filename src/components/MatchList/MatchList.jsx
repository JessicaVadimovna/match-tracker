// src/components/MatchList.jsx
import React, { useState } from 'react';
import './MatchList.css';

const MatchList = ({ matches, teamIcon, userAvatar }) => {
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'LIVE';
      case 'Finished':
        return 'FINISHED';
      case 'Scheduled':
        return 'Match preparing';
      default:
        return status;
    }
  };

  const toggleExpand = (index) => {
    setExpandedMatchId(expandedMatchId === index ? null : index);
  };

  return (
    <div className="match-list">
      {matches.map((match, index) => {
        const statusLabel = getStatusLabel(match.status);
        const isExpanded = expandedMatchId === index;

        const leftTeam =
          match.homeTeam.name === 'Command №1' ? match.homeTeam : match.awayTeam;
        const rightTeam =
          match.homeTeam.name === 'Command №2' ? match.homeTeam : match.awayTeam;
        const leftScore =
          match.homeTeam.name === 'Command №1' ? match.homeScore : match.awayScore;
        const rightScore =
          match.homeTeam.name === 'Command №2' ? match.homeScore : match.awayScore;

        return (
          <div key={index} className="match-wrapper">
            <div
              className={`match ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleExpand(index)}
            >
              <div className="team team1">
                <img src={teamIcon} alt="Team Icon" className="team-icon" />
                <span>{leftTeam.name}</span>
              </div>
              <div className="score">
                <div className="score-line">
                  <span>{leftScore}</span>
                  <span className="separator">:</span>
                  <span>{rightScore}</span>
                </div>
                {statusLabel && (
                  <div className={`status ${statusLabel.toLowerCase()}`}>
                    {statusLabel}
                  </div>
                )}
              </div>
              <div className="team team2">
                <span>{rightTeam.name}</span>
                <img src={teamIcon} alt="Team Icon" className="team-icon" />
                <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                  {isExpanded ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {isExpanded && (
              <div className="match-details">
                <div className="team-details team1-details">
                  <div className="players-row">
                    {leftTeam.players.map((player, i) => (
                      <div key={i} className="player">
                        <img src={userAvatar} alt="User Avatar" className="player-icon" />
                        <span>{player.username}</span>
                        <span className="kills">Убийств: {player.kills}</span>
                      </div>
                    ))}
                  </div>
                  <div className="stats-row">
                    <span>Points: +{leftTeam.points}</span>
                    <span>Место: {leftTeam.place}</span>
                    <span>Всего убийств: {leftTeam.total_kills}</span>
                  </div>
                </div>
                <div className="team-details team2-details">
                  <div className="players-row">
                    {rightTeam.players.map((player, i) => (
                      <div key={i} className="player">
                        <img src={userAvatar} alt="User Avatar" className="player-icon" />
                        <span>{player.username}</span>
                        <span className="kills">Убийств: {player.kills}</span>
                      </div>
                    ))}
                  </div>
                  <div className="stats-row">
                    <span>Points: +{rightTeam.points}</span>
                    <span>Место: {rightTeam.place}</span>
                    <span>Всего убийств: {rightTeam.total_kills}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;