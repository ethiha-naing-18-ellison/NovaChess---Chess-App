// NovaChess - Move History Component
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { chessStyles } from '../styles/chessStyles.js';

export const MoveHistory = ({ moveHistory }) => {
  const renderMoves = () => {
    if (!moveHistory || moveHistory.length === 0) {
      return (
        <Text style={chessStyles.moveItem}>No moves yet</Text>
      );
    }

    return moveHistory.map((move, index) => (
      <Text key={index} style={chessStyles.moveItem}>
        {index + 1}. {move.notation}
      </Text>
    ));
  };

  return (
    <View style={chessStyles.moveHistory}>
      <Text style={chessStyles.moveHistoryTitle}>Move History</Text>
      <ScrollView showsVerticalScrollIndicator={true}>
        {renderMoves()}
      </ScrollView>
    </View>
  );
};
