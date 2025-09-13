// NovaChess - Lessons Screen Component
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { HeaderNav } from './HeaderNav';
import { FooterNav } from './FooterNav';
import { LessonsIcon, TargetIcon, ZapIcon, CheckIcon } from './icons/SvgIcons';

const { width } = Dimensions.get('window');

export const LessonsScreen = ({ activeTab, onTabPress, onProfilePress, onNotificationPress, onBack, onAction }) => {
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [lessons] = useState([
    {
      id: 1,
      title: 'How to Move Pieces',
      category: 'basics',
      duration: '5 min',
      completed: true,
      difficulty: 'Beginner',
    },
    {
      id: 2,
      title: 'Basic Checkmate Patterns',
      category: 'basics',
      duration: '10 min',
      completed: true,
      difficulty: 'Beginner',
    },
    {
      id: 3,
      title: 'Opening Principles',
      category: 'openings',
      duration: '15 min',
      completed: false,
      difficulty: 'Intermediate',
    },
    {
      id: 4,
      title: 'Tactical Patterns',
      category: 'tactics',
      duration: '12 min',
      completed: false,
      difficulty: 'Intermediate',
    },
    {
      id: 5,
      title: 'Endgame Fundamentals',
      category: 'endgames',
      duration: '20 min',
      completed: false,
      difficulty: 'Advanced',
    },
  ]);

  const categories = [
    { id: 'basics', name: 'Basics', icon: LessonsIcon },
    { id: 'openings', name: 'Openings', icon: TargetIcon },
    { id: 'tactics', name: 'Tactics', icon: ZapIcon },
    { id: 'endgames', name: 'Endgames', icon: CheckIcon },
  ];

  const handleLessonPress = (lesson) => {
    console.log(`Starting lesson: ${lesson.title}`);
  };

  const handlePuzzlesPress = () => {
    console.log('Navigating to Chess Puzzles');
    if (onAction) {
      onAction('puzzles');
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredLessons = lessons.filter(lesson => lesson.category === selectedCategory);

  return (
    <View style={styles.container}>
      <HeaderNav
        title="Chess Lessons"
        onProfilePress={onProfilePress}
        onNotificationPress={onNotificationPress}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Category Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.selectedCategory,
                  ]}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <IconComponent 
                    size={24} 
                    color={selectedCategory === category.id ? '#e2e8f0' : '#94a3b8'} 
                  />
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText,
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Chess Puzzles Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.puzzlesButton} onPress={handlePuzzlesPress}>
            <View style={styles.puzzlesButtonContent}>
              <TargetIcon size={24} color="#e2e8f0" />
              <View style={styles.puzzlesButtonText}>
                <Text style={styles.puzzlesButtonTitle}>Chess Puzzles</Text>
                <Text style={styles.puzzlesButtonDescription}>
                  Solve tactical puzzles to improve your game
                </Text>
              </View>
              <Text style={styles.puzzlesButtonArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Lessons List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {categories.find(c => c.id === selectedCategory)?.name} Lessons
          </Text>
          {filteredLessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => handleLessonPress(lesson)}
            >
              <View style={styles.lessonHeader}>
                <View style={styles.lessonIcon}>
                  <LessonsIcon size={20} color="#e2e8f0" />
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <View style={styles.lessonMeta}>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                    <Text style={styles.lessonDifficulty}>{lesson.difficulty}</Text>
                  </View>
                </View>
                {lesson.completed && (
                  <View style={styles.completedBadge}>
                    <CheckIcon size={16} color="#10b981" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Progress Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>2</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>3</Text>
              <Text style={styles.progressLabel}>Remaining</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>40%</Text>
              <Text style={styles.progressLabel}>Progress</Text>
            </View>
          </View>
        </View>

        {/* Featured Lesson */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Lesson</Text>
          <TouchableOpacity style={styles.featuredCard}>
            <View style={styles.featuredHeader}>
              <ZapIcon size={28} color="#f59e0b" />
              <Text style={styles.featuredTitle}>Master the Queen's Gambit</Text>
            </View>
            <Text style={styles.featuredDescription}>
              Learn one of the most powerful opening systems in chess
            </Text>
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredDuration}>25 min</Text>
              <Text style={styles.featuredDifficulty}>Advanced</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterNav
        activeTab={activeTab}
        onTabPress={onTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 15,
    marginLeft: 5,
  },
  categoryScroll: {
    marginHorizontal: -5,
  },
  categoryCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  selectedCategory: {
    backgroundColor: '#6b46c1',
    borderColor: '#6b46c1',
    shadowColor: '#6b46c1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#e2e8f0',
  },
  lessonCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 4,
  },
  lessonMeta: {
    flexDirection: 'row',
    gap: 15,
  },
  lessonDuration: {
    fontSize: 14,
    color: '#94a3b8',
  },
  lessonDifficulty: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  completedBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  featuredCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginLeft: 12,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 10,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 15,
  },
  featuredDuration: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
  },
  featuredDifficulty: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  puzzlesButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#6b46c1',
  },
  puzzlesButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  puzzlesButtonText: {
    flex: 1,
    marginLeft: 16,
  },
  puzzlesButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 4,
  },
  puzzlesButtonDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  puzzlesButtonArrow: {
    fontSize: 24,
    color: '#6b46c1',
    fontWeight: 'bold',
  },
});
