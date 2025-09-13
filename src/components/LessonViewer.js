// NovaChess - Lesson Viewer Component
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export const LessonViewer = ({ lesson, onBack, onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentSection < lesson.content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(lesson.id);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete(lesson.id);
    }
  };

  const currentSectionData = lesson.content.sections[currentSection];
  const progress = ((currentSection + 1) / lesson.content.sections.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{lesson.title}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentSection + 1} of {lesson.content.sections.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>{currentSectionData.title}</Text>

        {/* Content */}
        <View style={styles.contentCard}>
          <Text style={styles.contentText}>{currentSectionData.content}</Text>
          
          {/* Placeholder for chess board/diagram */}
          <View style={styles.diagramPlaceholder}>
            <Text style={styles.diagramText}>📊</Text>
            <Text style={styles.diagramLabel}>Interactive Diagram</Text>
            <Text style={styles.diagramSubtext}>{currentSectionData.image}</Text>
          </View>
        </View>

        {/* Lesson Info */}
        <View style={styles.lessonInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{lesson.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Difficulty</Text>
            <Text style={styles.infoValue}>{lesson.difficulty}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Progress</Text>
            <Text style={styles.infoValue}>{Math.round(progress)}%</Text>
          </View>
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentSection === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentSection === 0}
        >
          <Text style={[styles.navButtonText, currentSection === 0 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        {isCompleted ? (
          <TouchableOpacity style={styles.completeButton} onPress={handleFinish}>
            <Text style={styles.completeButtonText}>Complete Lesson</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentSection === lesson.content.sections.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1a1a2e',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#6b46c1',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 60,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a2e',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2a2a3a',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6b46c1',
    borderRadius: 2,
  },
  progressText: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  contentCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  contentText: {
    fontSize: 16,
    color: '#e2e8f0',
    lineHeight: 24,
    marginBottom: 20,
  },
  diagramPlaceholder: {
    backgroundColor: '#2a2a3a',
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6b46c1',
    borderStyle: 'dashed',
  },
  diagramText: {
    fontSize: 48,
    marginBottom: 10,
  },
  diagramLabel: {
    color: '#6b46c1',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  diagramSubtext: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
  },
  lessonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3a',
  },
  navButton: {
    backgroundColor: '#2a2a3a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#1a1a2e',
    opacity: 0.5,
  },
  navButtonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#94a3b8',
  },
  nextButton: {
    backgroundColor: '#6b46c1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LessonViewer;
