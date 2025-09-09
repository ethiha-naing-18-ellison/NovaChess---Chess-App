import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { 
  MaterialIcons, 
  Feather, 
  FontAwesome5, 
  Ionicons, 
  AntDesign, 
  MaterialCommunityIcons,
  Entypo
} from '@expo/vector-icons';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['Property', 'Bankruptcy']);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllLawyers, setShowAllLawyers] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Property');
  const [showCategoryConfirmation, setShowCategoryConfirmation] = useState(false);
  const [newSelectedCategory, setNewSelectedCategory] = useState('');
  const [showLawyerDetails, setShowLawyerDetails] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showAppointmentBooking, setShowAppointmentBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [consultationType, setConsultationType] = useState('online');
  const [userMessage, setUserMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [customTime, setCustomTime] = useState({ hour: '09', minute: '00', period: 'AM' });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showReviewBooking, setShowReviewBooking] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState(false);
  const [showAppointmentConfirmation, setShowAppointmentConfirmation] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [selectedBookingFilter, setSelectedBookingFilter] = useState('All');
  const [userBookings, setUserBookings] = useState([]);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Auto-transition from splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Toggle category selection
  const toggleCategory = (categoryName) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const handleSeeAllCategories = () => {
    setShowAllCategories(true);
  };

  const handleSeeAllLawyers = () => {
    setShowAllLawyers(true);
  };

  const handleCategorySelect = (categoryName) => {
    setNewSelectedCategory(categoryName);
    setShowAllCategories(false); // Close the "See All" screen
    setShowCategoryConfirmation(true); // Show beautiful confirmation screen
  };

  const confirmCategorySelection = () => {
    setSelectedCategory(newSelectedCategory);
    setShowCategoryConfirmation(false);
  };

  const cancelCategorySelection = () => {
    setShowCategoryConfirmation(false);
  };

  const handleLawyerSelect = (lawyerName, specialty, rating, avatar) => {
    const lawyerData = {
      name: lawyerName,
      specialty: specialty,
      rating: rating,
      avatar: avatar,
      profileImage: null, // No uploaded profile image, will show vector icon
      distance: '1.0 km',
      hourlyRate: '$15/hr',
      cases: '3.6k Cases',
      successRate: '97% Success Rate',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit doloremque totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      reviews: '295 Reviews'
    };
    setSelectedLawyer(lawyerData);
    setShowLawyerDetails(true);
  };

  const handleLawyerCardClick = (lawyer) => {
    handleLawyerSelect(lawyer.name, lawyer.specialty, lawyer.rating, lawyer.avatar);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleServiceSelect = (serviceName) => {
    Alert.alert('Service Selected', `You selected: ${serviceName}\nCategory: ${selectedCategory}`, [{ text: 'OK' }]);
  };

  // Service data based on selected category
  const getServicesForCategory = (category) => {
    const services = {
      'Property': [
        { name: 'Property Purchase', icon: 'HOUSE', description: 'Buy/Sell Property' },
        { name: 'Lease Agreement', icon: 'DOC', description: 'Rental Contracts' },
        { name: 'Property Disputes', icon: 'SCALE', description: 'Property Conflicts' },
        { name: 'Estate Planning', icon: 'WILL', description: 'Will & Trust' },
        { name: 'Property Tax', icon: 'TAX', description: 'Tax Issues' },
        { name: 'Zoning Issues', icon: 'ZONE', description: 'Land Use' }
      ],
      'Criminal': [
        { name: 'DUI Defense', icon: 'CAR', description: 'Drunk Driving' },
        { name: 'Theft Cases', icon: 'LOCK', description: 'Theft Defense' },
        { name: 'Assault Defense', icon: 'SHIELD', description: 'Violence Cases' },
        { name: 'Drug Offenses', icon: 'PILL', description: 'Drug Crimes' },
        { name: 'Traffic Violations', icon: 'TICKET', description: 'Traffic Tickets' },
        { name: 'White Collar Crime', icon: 'BRIEFCASE', description: 'Financial Crimes' }
      ],
      'Tax': [
        { name: 'Tax Filing', icon: 'FILE', description: 'Tax Returns' },
        { name: 'Tax Disputes', icon: 'SCALE', description: 'IRS Issues' },
        { name: 'Business Tax', icon: 'BUILDING', description: 'Corporate Tax' },
        { name: 'Estate Tax', icon: 'WILL', description: 'Inheritance Tax' },
        { name: 'Tax Planning', icon: 'CHART', description: 'Tax Strategy' },
        { name: 'Audit Defense', icon: 'SEARCH', description: 'IRS Audits' }
      ],
      'Family': [
        { name: 'Divorce', icon: 'HEART', description: 'Marriage Dissolution' },
        { name: 'Child Custody', icon: 'CHILD', description: 'Custody Rights' },
        { name: 'Adoption', icon: 'FAMILY', description: 'Adoption Process' },
        { name: 'Alimony', icon: 'MONEY', description: 'Spousal Support' },
        { name: 'Prenuptial Agreement', icon: 'RING', description: 'Pre-marriage Contract' },
        { name: 'Domestic Violence', icon: 'SHIELD', description: 'Protection Orders' }
      ],
      'Business': [
        { name: 'Business Formation', icon: 'BUILDING', description: 'Start a Business' },
        { name: 'Contract Review', icon: 'DOC', description: 'Business Contracts' },
        { name: 'Employment Law', icon: 'PEOPLE', description: 'HR Issues' },
        { name: 'Intellectual Property', icon: 'LIGHTBULB', description: 'IP Protection' },
        { name: 'Mergers & Acquisitions', icon: 'HANDSHAKE', description: 'Business Sales' },
        { name: 'Corporate Compliance', icon: 'CHART', description: 'Legal Compliance' }
      ],
      'Personal Injury': [
        { name: 'Car Accidents', icon: 'CAR', description: 'Auto Accidents' },
        { name: 'Medical Malpractice', icon: 'MEDICAL', description: 'Medical Errors' },
        { name: 'Workplace Injuries', icon: 'TOOLS', description: 'Workers Comp' },
        { name: 'Slip & Fall', icon: 'WARNING', description: 'Premises Liability' },
        { name: 'Product Liability', icon: 'PACKAGE', description: 'Defective Products' },
        { name: 'Wrongful Death', icon: 'CROSS', description: 'Fatal Accidents' }
      ]
    };
    return services[category] || services['Property'];
  };

  // Professional Icon Component - Vector Icons System
  const ProfessionalIcon = ({ type, size = 24, color = '#2E4A6B' }) => {
    const iconConfig = {
      // Header & Navigation
      'BELL': { family: Ionicons, name: 'notifications-outline' },
      'SETTINGS': { family: Ionicons, name: 'settings-outline' },
      'SEARCH': { family: Ionicons, name: 'search-outline' },
      'HOME': { family: Ionicons, name: 'home-outline' },
      'BOOKMARK': { family: Ionicons, name: 'bookmark-outline' },
      'USER': { family: Ionicons, name: 'person-outline' },
      
      // Categories
      'PROPERTY': { family: Ionicons, name: 'home-outline' },
      'HOUSE': { family: Ionicons, name: 'home-outline' },
      'CRIMINAL': { family: MaterialCommunityIcons, name: 'gavel' },
      'SCALE': { family: MaterialCommunityIcons, name: 'scale-balance' },
      'TAX': { family: MaterialIcons, name: 'attach-money' },
      'FAMILY_LAW': { family: Ionicons, name: 'people-outline' },
      'FAMILY': { family: Ionicons, name: 'people-outline' },
      'PEOPLE': { family: Ionicons, name: 'people-outline' },
      'BUSINESS': { family: Ionicons, name: 'business-outline' },
      'BUILDING': { family: Ionicons, name: 'business-outline' },
      'PERSONAL_INJURY': { family: Ionicons, name: 'medical-outline' },
      'MEDICAL': { family: Ionicons, name: 'medical-outline' },
      'GLOBE': { family: Ionicons, name: 'globe-outline' },
      'LEAF': { family: Ionicons, name: 'leaf-outline' },
      'BRIEFCASE': { family: Ionicons, name: 'briefcase-outline' },
      'WILL': { family: Ionicons, name: 'document-text-outline' },
      'DOC': { family: Ionicons, name: 'document-text-outline' },
      'FILE': { family: Ionicons, name: 'folder-outline' },
      'LIGHTBULB': { family: Ionicons, name: 'bulb-outline' },
      'HEART': { family: Ionicons, name: 'heart-dislike-outline' },
      'CAR': { family: Ionicons, name: 'car-outline' },
      'TOOLS': { family: Ionicons, name: 'construct-outline' },
      'CHART': { family: Ionicons, name: 'trending-up-outline' },
      'TM': { family: MaterialCommunityIcons, name: 'trademark' },
      'COPY': { family: MaterialCommunityIcons, name: 'copyright' },
      
      // Services & Misc
      'MONEY': { family: Ionicons, name: 'cash-outline' },
      'RING': { family: MaterialCommunityIcons, name: 'ring' },
      'HANDSHAKE': { family: MaterialCommunityIcons, name: 'handshake-outline' },
      'WARNING': { family: Ionicons, name: 'warning-outline' },
      'PACKAGE': { family: Ionicons, name: 'cube-outline' },
      'CROSS': { family: Ionicons, name: 'add-outline' },
      'STAR': { family: Ionicons, name: 'star-outline' },
      'LOCATION': { family: Ionicons, name: 'location-outline' },
      'PHONE': { family: Ionicons, name: 'call-outline' },
      'CALL': { family: Ionicons, name: 'call-outline' },
      'MESSAGE': { family: Ionicons, name: 'chatbubble-outline' },
      'EMAIL': { family: Ionicons, name: 'mail-outline' },
      'LAWYER': { family: Ionicons, name: 'person-outline' },
      'CLOCK': { family: Ionicons, name: 'time-outline' },
      'LOCK': { family: Ionicons, name: 'lock-closed-outline' },
      'SHIELD': { family: Ionicons, name: 'shield-outline' },
      'PILL': { family: MaterialCommunityIcons, name: 'pill' },
      'TICKET': { family: MaterialCommunityIcons, name: 'ticket-outline' },
      'CHILD': { family: MaterialCommunityIcons, name: 'baby-face-outline' },
      'ZONE': { family: MaterialCommunityIcons, name: 'map-marker-outline' },
      'PATENT': { family: Ionicons, name: 'bulb-outline' },
      'ARROW_LEFT': { family: Ionicons, name: 'arrow-back-outline' },
      'CHEVRON_DOWN': { family: Ionicons, name: 'chevron-down-outline' },
      'CHEVRON_LEFT': { family: Ionicons, name: 'chevron-back-outline' },
      'CHEVRON_RIGHT': { family: Ionicons, name: 'chevron-forward-outline' },
      'DOLLAR': { family: Ionicons, name: 'cash-outline' },
      'PAPERCLIP': { family: Ionicons, name: 'attach-outline' },
      'CHECKMARK': { family: Ionicons, name: 'checkmark-circle' },
      'CALENDAR': { family: Ionicons, name: 'calendar-outline' }
    };

    const config = iconConfig[type];
    if (!config) {
      // Fallback to a generic icon
      return <Ionicons name="help-circle-outline" size={size} color={color} />;
    }

    const IconComponent = config.family;
    return <IconComponent name={config.name} size={size} color={color} />;
  };

  const renderSplashScreen = () => (
    <View style={styles.splashContainer}>
      <StatusBar style="dark" />
      <View style={styles.logoContainer}>
        <View style={styles.scalesIcon}>
          <Text style={styles.scalesText}>⚖️</Text>
        </View>
        <Text style={styles.appName}>LawGo</Text>
        <Text style={styles.tagline}>ON DEMAND LAWYER APP</Text>
      </View>
    </View>
  );

  const onboardingData = [
    {
      title: "Best Legal Expertise",
      subtitle: "Any city. Any Court. Any time",
      image: "LAWYER"
    },
    {
      title: "24/7 Legal Support",
      subtitle: "Get help whenever you need it",
      image: "CLOCK"
    },
    {
      title: "Trusted by Thousands",
      subtitle: "Join our community of satisfied clients",
      image: "STAR"
    }
  ];

  const renderOnboardingScreen = () => (
    <View style={styles.onboardingContainer}>
      <StatusBar style="light" />
      <TouchableOpacity style={styles.skipButton} onPress={() => setCurrentScreen('login')}>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>
      
      <View style={styles.onboardingContent}>
        <View style={styles.imageContainer}>
          <ProfessionalIcon type={onboardingData[onboardingIndex].image} size={80} color="#ffffff" />
        </View>
        
        <View style={styles.onboardingInfo}>
          <Text style={styles.onboardingTitle}>Best Legal Expertise</Text>
          <Text style={styles.onboardingSubtitle}>Any city. Any Court. Any time</Text>
          
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.continueButton} 
        onPress={() => setCurrentScreen('login')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoginScreen = () => (
    <View style={styles.loginContainer}>
      <StatusBar style="dark" />
      
      <View style={styles.loginHeader}>
        <View style={styles.loginLogoContainer}>
          <View style={styles.loginScalesIcon}>
            <Text style={styles.loginScalesText}>⚖️</Text>
          </View>
        </View>
        <Text style={styles.loginAppName}>LawGo</Text>
        <Text style={styles.loginTagline}>ON DEMAND LAWYER APP</Text>
      </View>

      <View style={styles.loginForm}>
        <Text style={styles.loginTitle}>Login or Register</Text>
        <Text style={styles.loginSubtitle}>
          Enter your phone no. or email & submit OTP{'\n'}to get the best of the app
        </Text>

        <TextInput
          style={styles.emailInput}
          placeholder="Email ID or Phone number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity 
          style={styles.continueBtn}
          onPress={() => setCurrentScreen('categories')}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>
        <Text style={styles.socialText}>You can also connect using</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialBtn, styles.facebookBtn]}>
            <Text style={styles.socialBtnText}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]}>
            <Text style={styles.socialBtnText}>G</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCategoriesScreen = () => (
    <View style={styles.categoriesContainer}>
      <StatusBar style="dark" />
      
      <View style={styles.categoriesHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('login')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Success!', 'Categories selected successfully!')}>
          <Text style={styles.skipLink}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContent}>
        <Text style={styles.categoriesTitle}>Choose Category</Text>
        <Text style={styles.categoriesSubtitle}>
          Please select categories for best searched results{'\n'}for you
        </Text>

        <View style={styles.categoriesGrid}>
          {[
            'Property', 'Criminal', 'Tax', 'Civil Rights',
            'Immigration', 'Environmental', 'Bankruptcy', 'Family',
            'Corporate', 'Others'
          ].map((categoryName, index) => {
            const isSelected = selectedCategories.includes(categoryName);
  return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryBtn,
                  isSelected && styles.activeCategoryBtn
                ]}
                onPress={() => toggleCategory(categoryName)}
              >
                <Text style={[
                  styles.categoryText,
                  isSelected && styles.activeCategoryText
                ]}>
                  {categoryName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.messageSection}>
          <Text style={styles.messageTitle}>Still Confused? <Text style={styles.optional}>(optional)</Text></Text>
          <Text style={styles.messageSubtitle}>
            Share your issue and write us to get the best{'\n'}lawyers out there
          </Text>
          
          <Text style={styles.messageLabel}>Your Message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="I have been looking for|"
            multiline={true}
          />
        </View>

        <TouchableOpacity 
          style={styles.proceedBtn}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAllCategoriesScreen = () => (
    <View style={styles.allCategoriesContainer}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.allCategoriesHeader}>
        <TouchableOpacity onPress={() => setShowAllCategories(false)} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.allCategoriesTitle}>All Categories</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Categories Grid */}
      <ScrollView style={styles.allCategoriesScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.allCategoriesGrid}>
            {[
              { name: 'Property', icon: 'PROPERTY' },
              { name: 'Criminal', icon: 'CRIMINAL' },
              { name: 'Tax', icon: 'TAX' },
              { name: 'Family', icon: 'FAMILY_LAW' },
              { name: 'Business', icon: 'BUSINESS' },
              { name: 'Personal Injury', icon: 'PERSONAL_INJURY' },
              { name: 'Civil Rights', icon: 'PEOPLE' },
              { name: 'Immigration', icon: 'GLOBE' },
              { name: 'Environmental', icon: 'LEAF' },
              { name: 'Bankruptcy', icon: 'BRIEFCASE' },
              { name: 'Employment', icon: 'BRIEFCASE' },
              { name: 'Real Estate', icon: 'HOUSE' },
              { name: 'Estate Planning', icon: 'WILL' },
              { name: 'Intellectual Property', icon: 'LIGHTBULB' },
              { name: 'Contract', icon: 'DOC' },
              { name: 'Divorce', icon: 'HEART' },
              { name: 'DUI', icon: 'CAR' },
              { name: 'Workers Comp', icon: 'TOOLS' },
              { name: 'Medical Malpractice', icon: 'MEDICAL' },
              { name: 'Securities', icon: 'CHART' },
              { name: 'Patent', icon: 'LIGHTBULB' },
              { name: 'Trademark', icon: 'TM' },
              { name: 'Copyright', icon: 'COPY' },
              { name: 'Corporate', icon: 'BUILDING' }
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.allCategoryCard,
                  selectedCategory === category.name && styles.selectedAllCategoryCard
                ]}
                onPress={() => handleCategorySelect(category.name)}
              >
                <ProfessionalIcon 
                  type={category.icon} 
                  size={32} 
                  color={selectedCategory === category.name ? '#ffffff' : '#2E4A6B'} 
                />
                <Text style={[
                  styles.allCategoryName,
                  selectedCategory === category.name && styles.selectedAllCategoryName
                ]}>
                  {category.name}
                </Text>
                {selectedCategory === category.name && (
                  <Text style={styles.selectedIndicator}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderCategoryConfirmationScreen = () => {
    const categoryData = {
      'Property': { icon: 'PROPERTY', description: 'Property Law Services' },
      'Criminal': { icon: 'CRIMINAL', description: 'Criminal Defense Services' },
      'Tax': { icon: 'TAX', description: 'Tax Law Services' },
      'Family': { icon: 'FAMILY_LAW', description: 'Family Law Services' },
      'Business': { icon: 'BUSINESS', description: 'Business Law Services' },
      'Personal Injury': { icon: 'PERSONAL_INJURY', description: 'Personal Injury Services' },
      'Civil Rights': { icon: 'PEOPLE', description: 'Civil Rights Services' },
      'Immigration': { icon: 'GLOBE', description: 'Immigration Services' },
      'Environmental': { icon: 'LEAF', description: 'Environmental Law Services' },
      'Bankruptcy': { icon: 'BRIEFCASE', description: 'Bankruptcy Services' },
      'Employment': { icon: 'BRIEFCASE', description: 'Employment Law Services' },
      'Real Estate': { icon: 'HOUSE', description: 'Real Estate Services' },
      'Estate Planning': { icon: 'WILL', description: 'Estate Planning Services' },
      'Intellectual Property': { icon: 'LIGHTBULB', description: 'IP Law Services' },
      'Contract': { icon: 'DOC', description: 'Contract Law Services' },
      'Divorce': { icon: 'HEART', description: 'Divorce Services' },
      'DUI': { icon: 'CAR', description: 'DUI Defense Services' },
      'Workers Comp': { icon: 'TOOLS', description: 'Workers Compensation Services' },
      'Medical Malpractice': { icon: 'MEDICAL', description: 'Medical Malpractice Services' },
      'Securities': { icon: 'CHART', description: 'Securities Law Services' },
      'Patent': { icon: 'LIGHTBULB', description: 'Patent Law Services' },
      'Trademark': { icon: 'TM', description: 'Trademark Services' },
      'Copyright': { icon: 'COPY', description: 'Copyright Services' },
      'Corporate': { icon: 'BUILDING', description: 'Corporate Law Services' }
    };

    const selectedCategoryData = categoryData[newSelectedCategory] || categoryData['Property'];

    return (
      <View style={styles.confirmationContainer}>
        <StatusBar style="dark" />
        
        {/* Background Overlay */}
        <View style={styles.confirmationOverlay} />
        
        {/* Confirmation Card */}
        <View style={styles.confirmationCard}>
          {/* Header */}
          <View style={styles.confirmationHeader}>
            <Text style={styles.confirmationTitle}>Category Selected</Text>
            <Text style={styles.confirmationSubtitle}>Services will update for this category</Text>
          </View>

          {/* Category Display */}
          <View style={styles.confirmationCategoryDisplay}>
            <View style={styles.confirmationCategoryIcon}>
              <ProfessionalIcon type={selectedCategoryData.icon} size={40} color="#2E4A6B" />
            </View>
            <Text style={styles.confirmationCategoryName}>{newSelectedCategory}</Text>
            <Text style={styles.confirmationCategoryDescription}>{selectedCategoryData.description}</Text>
          </View>

          {/* Services Preview */}
          <View style={styles.confirmationServicesPreview}>
            <Text style={styles.confirmationServicesTitle}>Available Services:</Text>
            <View style={styles.confirmationServicesList}>
              {getServicesForCategory(newSelectedCategory).slice(0, 3).map((service, index) => (
                <View key={index} style={styles.confirmationServiceItem}>
                  <ProfessionalIcon type={service.icon} size={20} color="#2E4A6B" />
                  <Text style={styles.confirmationServiceName}>{service.name}</Text>
                </View>
              ))}
              <Text style={styles.confirmationMoreServices}>+3 more services</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.confirmationButtons}>
            <TouchableOpacity 
              style={styles.confirmationCancelButton}
              onPress={cancelCategorySelection}
            >
              <Text style={styles.confirmationCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmationConfirmButton}
              onPress={confirmCategorySelection}
            >
              <Text style={styles.confirmationConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderBookingDetailsScreen = () => {
    const handleReschedule = () => {
      Alert.alert('Reschedule', 'Reschedule functionality will be implemented');
    };

    const handleCancel = () => {
      Alert.alert(
        'Cancel Booking',
        'Are you sure you want to cancel this booking?',
        [
          { text: 'No', style: 'cancel' },
          { 
            text: 'Yes', 
            style: 'destructive',
            onPress: () => {
              // Update booking status to cancelled
              setUserBookings(prev => 
                prev.map(booking => 
                  booking.id === selectedBooking.id 
                    ? { ...booking, status: 'Cancelled' }
                    : booking
                )
              );
              setShowBookingDetails(false);
              setShowBookings(true);
            }
          }
        ]
      );
    };

    if (!selectedBooking) return null;

    return (
      <View style={styles.bookingDetailsContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.bookingDetailsHeader}>
          <TouchableOpacity 
            onPress={() => setShowBookingDetails(false)} 
            style={styles.bookingDetailsBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.bookingDetailsTitle}>Booking Details</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.bookingDetailsContent} showsVerticalScrollIndicator={false}>
          {/* Lawyer Information Card */}
          <View style={styles.bookingDetailsLawyerCard}>
            <View style={styles.bookingDetailsLawyerContent}>
              <View style={styles.bookingDetailsLawyerAvatar}>
                {selectedBooking.lawyerProfileImage ? (
                  <Image source={{ uri: selectedBooking.lawyerProfileImage }} style={styles.bookingDetailsLawyerProfileImage} />
                ) : (
                  <ProfessionalIcon type="USER" size={40} color="#2E4A6B" />
                )}
              </View>
              <View style={styles.bookingDetailsLawyerInfo}>
                <Text style={styles.bookingDetailsLawyerName}>{selectedBooking.lawyerName}</Text>
                <Text style={styles.bookingDetailsLawyerSpecialty}>{selectedBooking.lawyerSpecialty}</Text>
                <View style={styles.bookingDetailsLawyerStats}>
                  <View style={styles.bookingDetailsLawyerStat}>
                    <ProfessionalIcon type="STAR" size={16} color="#FFD700" />
                    <Text style={styles.bookingDetailsLawyerStatText}>4.4</Text>
                  </View>
                  <View style={styles.bookingDetailsLawyerStat}>
                    <ProfessionalIcon type="LOCATION" size={16} color="#2E4A6B" />
                    <Text style={styles.bookingDetailsLawyerStatText}>1.5 km</Text>
                  </View>
                  <View style={styles.bookingDetailsLawyerStat}>
                    <ProfessionalIcon type="DOLLAR" size={16} color="#2E4A6B" />
                    <Text style={styles.bookingDetailsLawyerStatText}>$16/hr</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Your Message Section */}
          <View style={styles.bookingDetailsMessageCard}>
            <Text style={styles.bookingDetailsMessageTitle}>Your Message</Text>
            <Text style={styles.bookingDetailsMessageText}>
              {selectedBooking.message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </Text>
            <TouchableOpacity onPress={() => setExpandedMessage(!expandedMessage)}>
              <Text style={styles.bookingDetailsExpandButton}>
                {expandedMessage ? 'Show Less' : 'Expand...'}
              </Text>
            </TouchableOpacity>
            <View style={styles.bookingDetailsAttachmentInfo}>
              <ProfessionalIcon type="PAPERCLIP" size={16} color="#6c757d" />
              <Text style={styles.bookingDetailsAttachmentText}>FIR.doc</Text>
            </View>
          </View>

          {/* Consultation Details */}
          <View style={styles.bookingDetailsConsultationCard}>
            <Text style={styles.bookingDetailsConsultationTitle}>
              {selectedBooking.consultationType === 'online' ? 'Online Consultation' : 
               selectedBooking.consultationType === 'lawyer_place' ? 'Meet at Lawyer\'s place' : 
               'Suggest your time'}
            </Text>
            <View style={styles.bookingDetailsConsultationList}>
              <View style={styles.bookingDetailsConsultationRow}>
                <Text style={styles.bookingDetailsConsultationLabel}>Date:</Text>
                <Text style={styles.bookingDetailsConsultationValue}>{selectedBooking.date}</Text>
              </View>
              <View style={styles.bookingDetailsConsultationRow}>
                <Text style={styles.bookingDetailsConsultationLabel}>Time Slot:</Text>
                <Text style={styles.bookingDetailsConsultationValue}>{selectedBooking.time}</Text>
              </View>
              <View style={styles.bookingDetailsConsultationRow}>
                <Text style={styles.bookingDetailsConsultationLabel}>Amount:</Text>
                <Text style={styles.bookingDetailsConsultationValue}>$15:00</Text>
              </View>
              <View style={styles.bookingDetailsConsultationRow}>
                <Text style={styles.bookingDetailsConsultationLabel}>GST:</Text>
                <Text style={styles.bookingDetailsConsultationValue}>$0:15</Text>
              </View>
              <View style={styles.bookingDetailsConsultationRow}>
                <Text style={styles.bookingDetailsConsultationLabel}>Total:</Text>
                <Text style={styles.bookingDetailsConsultationValue}>$15:15</Text>
              </View>
              <View style={styles.bookingDetailsConsultationRow}>
                <Text style={styles.bookingDetailsConsultationLabel}>Status:</Text>
                <View style={styles.bookingDetailsStatusContainer}>
                  <ProfessionalIcon type="CHECKMARK" size={16} color="#4CAF50" />
                  <Text style={styles.bookingDetailsStatusText}>Paid</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.bookingDetailsFooter}>
          <TouchableOpacity 
            style={styles.rescheduleButton}
            onPress={handleReschedule}
          >
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMyBookingsScreen = () => {
    const bookingFilters = ['All', 'Upcoming', 'Previous', 'Confirmed'];
    
    // Sample bookings data (in a real app, this would come from a database)
    const sampleBookings = [
      {
        id: '1',
        lawyerName: 'Lisa Wales',
        lawyerSpecialty: 'Criminal, Tax',
        lawyerProfileImage: null,
        date: '30.01.2021',
        time: '10:00-11:00AM',
        status: 'Confirmed'
      },
      {
        id: '2',
        lawyerName: 'Chris Young',
        lawyerSpecialty: 'Property, Criminal',
        lawyerProfileImage: null,
        date: '28.01.2021',
        time: '2:00-3:00PM',
        status: 'Pending'
      },
      {
        id: '3',
        lawyerName: 'Krisy Yolker',
        lawyerSpecialty: 'Tax, Civil Rights',
        lawyerProfileImage: null,
        date: '25.01.2021',
        time: '11:00-12:00PM',
        status: 'Confirmed'
      },
      {
        id: '4',
        lawyerName: 'Mathew Bairstow',
        lawyerSpecialty: 'Tax, Property',
        lawyerProfileImage: null,
        date: '22.01.2021',
        time: '9:00-10:00AM',
        status: 'Confirmed'
      },
      {
        id: '5',
        lawyerName: 'Andrew Clarke',
        lawyerSpecialty: 'Corporate',
        lawyerProfileImage: null,
        date: '20.01.2021',
        time: '3:00-4:00PM',
        status: 'Cancelled'
      }
    ];

    // Combine user bookings with sample bookings
    const allBookings = [...userBookings, ...sampleBookings];

    const getFilteredBookings = () => {
      switch (selectedBookingFilter) {
        case 'Upcoming':
          return allBookings.filter(booking => booking.status === 'Pending' || booking.status === 'Confirmed');
        case 'Previous':
          return allBookings.filter(booking => booking.status === 'Cancelled');
        case 'Confirmed':
          return allBookings.filter(booking => booking.status === 'Confirmed');
        default:
          return allBookings;
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'Confirmed':
          return '#4CAF50';
        case 'Pending':
          return '#FF9800';
        case 'Cancelled':
          return '#F44336';
        default:
          return '#6c757d';
      }
    };

    const filteredBookings = getFilteredBookings();

    return (
      <View style={styles.bookingsContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.bookingsHeader}>
          <TouchableOpacity 
            onPress={() => {
              setShowBookings(false);
              setCurrentScreen('home');
            }} 
            style={styles.bookingsBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.bookingsTitle}>My Bookings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Filter Tabs */}
        <View style={styles.bookingsFilterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookingsFilterScroll}>
            {bookingFilters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.bookingFilterTab,
                  selectedBookingFilter === filter && styles.selectedBookingFilterTab
                ]}
                onPress={() => setSelectedBookingFilter(filter)}
              >
                <Text style={[
                  styles.bookingFilterText,
                  selectedBookingFilter === filter && styles.selectedBookingFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bookings List */}
        <ScrollView style={styles.bookingsList} showsVerticalScrollIndicator={false}>
          {filteredBookings.map((booking) => (
            <TouchableOpacity 
              key={booking.id} 
              style={styles.bookingCard}
              onPress={() => {
                setSelectedBooking(booking);
                setShowBookingDetails(true);
              }}
            >
              <View style={styles.bookingContent}>
                <View style={styles.bookingAvatar}>
                  {booking.lawyerProfileImage ? (
                    <Image source={{ uri: booking.lawyerProfileImage }} style={styles.bookingProfileImage} />
                  ) : (
                    <ProfessionalIcon type="USER" size={24} color="#2E4A6B" />
                  )}
                </View>
                
                <View style={styles.bookingDetails}>
                  <Text style={styles.bookingLawyerName}>{booking.lawyerName}</Text>
                  <Text style={styles.bookingSpecialty}>{booking.lawyerSpecialty}</Text>
                  <View style={styles.bookingDateTime}>
                    <ProfessionalIcon type="CALENDAR" size={16} color="#6c757d" />
                    <Text style={styles.bookingDateTimeText}>{booking.date}, {booking.time}</Text>
                  </View>
                </View>
                
                <View style={[styles.bookingStatus, { backgroundColor: getStatusColor(booking.status) }]}>
                  <Text style={styles.bookingStatusText}>{booking.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderAppointmentConfirmationScreen = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const timeSlots = [
      { id: '9-10', label: '9AM - 10AM' },
      { id: '10-11', label: '10AM - 11AM' },
      { id: '11-12', label: '11AM - 12PM' },
      { id: '2-3', label: '2PM - 3PM' },
      { id: '3-4', label: '3PM - 4PM' },
      { id: '4-5', label: '4PM - 5PM' }
    ];

    const getTimeDisplay = () => {
      if (showTimePicker) {
        return `${customTime.hour}:${customTime.minute} ${customTime.period}`;
      }
      return timeSlots.find(slot => slot.id === selectedTimeSlot)?.label || 'Not selected';
    };

    const handleConfirmAppointment = () => {
      // Save the booking to user's bookings list
      const newBooking = {
        id: Date.now().toString(),
        lawyerName: selectedLawyer?.name,
        lawyerSpecialty: selectedLawyer?.specialty,
        lawyerProfileImage: selectedLawyer?.profileImage,
        date: `${selectedDate.toString().padStart(2, '0')}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`,
        time: getTimeDisplay(),
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
        message: userMessage,
        consultationType: consultationType
      };
      
      setUserBookings(prev => [newBooking, ...prev]);
      
      setShowAppointmentConfirmation(false);
      setShowReviewBooking(false);
      setShowAppointmentBooking(false);
      setShowLawyerDetails(false);
      setCurrentScreen('home');
    };

    return (
      <View style={styles.confirmationOverlay}>
        <View style={styles.confirmationContainer}>
          <StatusBar style="dark" />
          
          {/* Success Icon */}
          <View style={styles.confirmationIconContainer}>
            <View style={styles.confirmationIcon}>
              <ProfessionalIcon type="CHECKMARK" size={40} color="#4CAF50" />
            </View>
          </View>

          {/* Confirmation Content */}
          <View style={styles.confirmationContent}>
            <Text style={styles.confirmationTitle}>Congratulations!</Text>
            <Text style={styles.confirmationSubtitle}>
              Congrats, you have successfully booked the appointment, please follow up on time. You can always modify the booking.
            </Text>
            
            {/* Appointment Details */}
            <View style={styles.confirmationDetailsCard}>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Lawyer:</Text>
                <Text style={styles.confirmationDetailValue}>{selectedLawyer?.name}</Text>
              </View>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Date:</Text>
                <Text style={styles.confirmationDetailValue}>
                  {months[currentMonth]} {selectedDate}, {currentYear}
                </Text>
              </View>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Time:</Text>
                <Text style={styles.confirmationDetailValue}>{getTimeDisplay()}</Text>
              </View>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Specialty:</Text>
                <Text style={styles.confirmationDetailValue}>{selectedLawyer?.specialty}</Text>
              </View>
            </View>

            {/* Success Message */}
            <Text style={styles.confirmationMessage}>
              You will receive a confirmation email shortly. Please arrive 10 minutes before your scheduled time.
            </Text>
          </View>

          {/* LawGo Logo */}
          <View style={styles.confirmationLogoContainer}>
            <View style={styles.confirmationLogo}>
              <Text style={styles.confirmationLogoText}>⚖️</Text>
            </View>
          </View>

          {/* Footer Actions */}
          <View style={styles.confirmationFooter}>
            <TouchableOpacity onPress={handleConfirmAppointment}>
              <Text style={styles.goToHomeLink}>Go to Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.viewBookingDetailsButton}
              onPress={handleConfirmAppointment}
            >
              <Text style={styles.viewBookingDetailsText}>View Booking Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderReviewBookingScreen = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const timeSlots = [
      { id: '9-10', label: '9AM - 10AM' },
      { id: '10-11', label: '10AM - 11AM' },
      { id: '11-12', label: '11AM - 12PM' },
      { id: '2-3', label: '2PM - 3PM' },
      { id: '3-4', label: '3PM - 4PM' },
      { id: '4-5', label: '4PM - 5PM' }
    ];

    const consultationTypes = [
      { id: 'online', label: 'Online Consultation', extra: '' },
      { id: 'lawyer_place', label: 'Meet at Lawyer\'s place', extra: '(Charges 2% Extra)' },
      { id: 'suggest_time', label: 'Suggest your time', extra: '(Charges 4% Extra)' }
    ];

    const getTimeDisplay = () => {
      if (showTimePicker) {
        return `${customTime.hour}:${customTime.minute} ${customTime.period}`;
      }
      return timeSlots.find(slot => slot.id === selectedTimeSlot)?.label || 'Not selected';
    };

    const getConsultationTypeDisplay = () => {
      return consultationTypes.find(type => type.id === consultationType)?.label || 'Online Consultation';
    };

    const getConsultationAmount = () => {
      const baseAmount = 15.00;
      let extraCharge = 0;
      
      if (consultationType === 'lawyer_place') {
        extraCharge = baseAmount * 0.02; // 2% extra
      } else if (consultationType === 'suggest_time') {
        extraCharge = baseAmount * 0.04; // 4% extra
      }
      
      return {
        base: baseAmount,
        extra: extraCharge,
        gst: (baseAmount + extraCharge) * 0.1, // 10% GST
        total: baseAmount + extraCharge + ((baseAmount + extraCharge) * 0.1)
      };
    };

    const handleFinalProceed = () => {
      setShowAppointmentConfirmation(true);
    };

    const handleModifyMessage = () => {
      setShowReviewBooking(false);
      // Go back to appointment booking page
    };

    const amounts = getConsultationAmount();

    return (
      <View style={styles.reviewBookingContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.reviewBookingHeader}>
          <TouchableOpacity 
            onPress={() => setShowReviewBooking(false)} 
            style={styles.reviewBookingBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.reviewBookingTitle}>Review Booking</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.reviewBookingContent} showsVerticalScrollIndicator={false}>
          {/* Lawyer Information Card */}
          <View style={styles.lawyerInfoCard}>
            <View style={styles.lawyerInfoContent}>
              <View style={styles.lawyerInfoAvatar}>
                {selectedLawyer?.profileImage ? (
                  <Image source={{ uri: selectedLawyer.profileImage }} style={styles.lawyerInfoProfileImage} />
                ) : (
                  <ProfessionalIcon type="USER" size={40} color="#2E4A6B" />
                )}
              </View>
              <View style={styles.lawyerInfoDetails}>
                <Text style={styles.lawyerInfoName}>{selectedLawyer?.name}</Text>
                <Text style={styles.lawyerInfoSpecialty}>{selectedLawyer?.specialty}</Text>
                <View style={styles.lawyerInfoStats}>
                  <View style={styles.lawyerInfoStat}>
                    <ProfessionalIcon type="STAR" size={16} color="#FFD700" />
                    <Text style={styles.lawyerInfoStatText}>{selectedLawyer?.rating}</Text>
                  </View>
                  <View style={styles.lawyerInfoStat}>
                    <ProfessionalIcon type="LOCATION" size={16} color="#2E4A6B" />
                    <Text style={styles.lawyerInfoStatText}>{selectedLawyer?.distance}</Text>
                  </View>
                  <View style={styles.lawyerInfoStat}>
                    <ProfessionalIcon type="DOLLAR" size={16} color="#2E4A6B" />
                    <Text style={styles.lawyerInfoStatText}>{selectedLawyer?.hourlyRate}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Your Message Section */}
          <View style={styles.messageReviewCard}>
            <View style={styles.messageReviewHeader}>
              <Text style={styles.messageReviewTitle}>Your Message</Text>
              <TouchableOpacity onPress={handleModifyMessage}>
                <Text style={styles.modifyButton}>Modify</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.messageReviewText}>
              {expandedMessage ? userMessage : userMessage.substring(0, 100) + '...'}
            </Text>
            {userMessage.length > 100 && (
              <TouchableOpacity onPress={() => setExpandedMessage(!expandedMessage)}>
                <Text style={styles.expandButton}>
                  {expandedMessage ? 'Show Less' : 'Expand...'}
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.attachmentInfo}>
              <ProfessionalIcon type="PAPERCLIP" size={16} color="#6c757d" />
              <Text style={styles.attachmentText}>FIR.doc</Text>
            </View>
          </View>

          {/* Consultation Details */}
          <View style={styles.consultationDetailsCard}>
            <Text style={styles.consultationDetailsTitle}>{getConsultationTypeDisplay()}</Text>
            <View style={styles.consultationDetailsList}>
              <View style={styles.consultationDetailRow}>
                <Text style={styles.consultationDetailLabel}>Date:</Text>
                <Text style={styles.consultationDetailValue}>
                  {selectedDate.toString().padStart(2, '0')}.{(currentMonth + 1).toString().padStart(2, '0')}.{currentYear}
                </Text>
              </View>
              <View style={styles.consultationDetailRow}>
                <Text style={styles.consultationDetailLabel}>Time Slot:</Text>
                <Text style={styles.consultationDetailValue}>{getTimeDisplay()}</Text>
              </View>
              <View style={styles.consultationDetailRow}>
                <Text style={styles.consultationDetailLabel}>Amount:</Text>
                <Text style={styles.consultationDetailValue}>${amounts.base.toFixed(2)}</Text>
              </View>
              {amounts.extra > 0 && (
                <View style={styles.consultationDetailRow}>
                  <Text style={styles.consultationDetailLabel}>Extra Charge:</Text>
                  <Text style={styles.consultationDetailValue}>${amounts.extra.toFixed(2)}</Text>
                </View>
              )}
              <View style={styles.consultationDetailRow}>
                <Text style={styles.consultationDetailLabel}>GST:</Text>
                <Text style={styles.consultationDetailValue}>${amounts.gst.toFixed(2)}</Text>
              </View>
              <View style={[styles.consultationDetailRow, styles.totalAmountRow]}>
                <Text style={styles.totalAmountLabel}>Total Amount:</Text>
                <Text style={styles.totalAmountValue}>${amounts.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Proceed Button */}
        <View style={styles.reviewBookingFooter}>
          <TouchableOpacity 
            style={styles.finalProceedButton}
            onPress={handleFinalProceed}
          >
            <Text style={styles.finalProceedText}>Submit Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderAppointmentBookingScreen = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const timeSlots = [
      { id: '9-10', label: '9AM - 10AM' },
      { id: '10-11', label: '10AM - 11AM' },
      { id: '11-12', label: '11AM - 12PM' },
      { id: '2-3', label: '2PM - 3PM' },
      { id: '3-4', label: '3PM - 4PM' },
      { id: '4-5', label: '4PM - 5PM' }
    ];

    const consultationTypes = [
      { id: 'online', label: 'Online Consultation', extra: '' },
      { id: 'lawyer_place', label: 'Meet at Lawyer\'s place', extra: '(Charges 2% Extra)' },
      { id: 'suggest_time', label: 'Suggest your time', extra: '(Charges 4% Extra)' }
    ];

    // Generate calendar days
    const generateCalendarDays = () => {
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
      }
      
      return days;
    };

    const handleMonthChange = (direction) => {
      if (direction === 'prev') {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
      } else {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
      }
    };

    const handleCustomTimeChange = (type, value) => {
      setCustomTime(prev => ({ ...prev, [type]: value }));
    };

    const handleSubmitAppointment = () => {
      if (!selectedDate) {
        Alert.alert('Missing Information', 'Please select a date from the calendar');
        return;
      }
      
      if (!selectedTimeSlot && !showTimePicker) {
        Alert.alert('Missing Information', 'Please select a time slot or choose custom time');
        return;
      }
      
      if (!userMessage.trim()) {
        Alert.alert('Missing Information', 'Please enter your message describing your legal issue');
        return;
      }
      
      setShowReviewBooking(true);
    };

    return (
      <View style={styles.appointmentContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.appointmentHeader}>
          <TouchableOpacity 
            onPress={() => setShowAppointmentBooking(false)} 
            style={styles.appointmentBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.appointmentTitle}>Select Date, Time</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.appointmentContent} showsVerticalScrollIndicator={false}>
          {/* Date Selection */}
          <View style={styles.appointmentSection}>
            <Text style={styles.appointmentSectionTitle}>Select Date</Text>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity 
                  style={styles.navButton}
                  onPress={() => handleMonthChange('prev')}
                >
                  <ProfessionalIcon type="CHEVRON_LEFT" size={20} color="#2E4A6B" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.monthYearContainer}
                  onPress={() => setShowMonthPicker(!showMonthPicker)}
                >
                  <Text style={styles.calendarMonth}>{months[currentMonth]} {currentYear}</Text>
                  <ProfessionalIcon type="CHEVRON_DOWN" size={16} color="#2E4A6B" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.navButton}
                  onPress={() => handleMonthChange('next')}
                >
                  <ProfessionalIcon type="CHEVRON_RIGHT" size={20} color="#2E4A6B" />
                </TouchableOpacity>
              </View>

              {/* Month/Year Picker */}
              {showMonthPicker && (
                <View style={styles.monthYearPicker}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthPicker}>
                    {months.map((month, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.monthOption,
                          currentMonth === index && styles.selectedMonthOption
                        ]}
                        onPress={() => {
                          setCurrentMonth(index);
                          setShowMonthPicker(false);
                        }}
                      >
                        <Text style={[
                          styles.monthOptionText,
                          currentMonth === index && styles.selectedMonthOptionText
                        ]}>
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.yearPicker}>
                    {Array.from({length: 10}, (_, i) => currentYear - 5 + i).map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.yearOption,
                          currentYear === year && styles.selectedYearOption
                        ]}
                        onPress={() => {
                          setCurrentYear(year);
                          setShowMonthPicker(false);
                        }}
                      >
                        <Text style={[
                          styles.yearOptionText,
                          currentYear === year && styles.selectedYearOptionText
                        ]}>
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
              
              <View style={styles.calendarWeekdays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <Text key={index} style={styles.weekdayText}>{day}</Text>
                ))}
              </View>
              
              <View style={styles.calendarGrid}>
                {generateCalendarDays().map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDay,
                      day && selectedDate === day && styles.selectedCalendarDay
                    ]}
                    onPress={() => day && setSelectedDate(day)}
                    disabled={!day}
                  >
                    {day && (
                      <Text style={[
                        styles.calendarDayText,
                        selectedDate === day && styles.selectedCalendarDayText
                      ]}>
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Time Slot Selection */}
          <View style={styles.appointmentSection}>
            <View style={styles.timeSelectionHeader}>
              <Text style={styles.appointmentSectionTitle}>Select Time Slot</Text>
              <TouchableOpacity 
                style={styles.customTimeButton}
                onPress={() => {
                  setShowTimePicker(!showTimePicker);
                  if (showTimePicker) {
                    setSelectedTimeSlot(null);
                  }
                }}
              >
                <Text style={styles.customTimeButtonText}>
                  {showTimePicker ? 'Use Preset Times' : 'Custom Time'}
                </Text>
              </TouchableOpacity>
            </View>

            {!showTimePicker ? (
              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.timeSlotButton,
                      selectedTimeSlot === slot.id && styles.selectedTimeSlotButton
                    ]}
                    onPress={() => setSelectedTimeSlot(slot.id)}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      selectedTimeSlot === slot.id && styles.selectedTimeSlotText
                    ]}>
                      {slot.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.customTimeContainer}>
                <View style={styles.timePickerRow}>
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Hour</Text>
                    <ScrollView style={styles.timePickerScroll} showsVerticalScrollIndicator={false}>
                      {Array.from({length: 12}, (_, i) => i + 1).map((hour) => (
                        <TouchableOpacity
                          key={hour}
                          style={[
                            styles.timePickerOption,
                            customTime.hour === hour.toString().padStart(2, '0') && styles.selectedTimePickerOption
                          ]}
                          onPress={() => handleCustomTimeChange('hour', hour.toString().padStart(2, '0'))}
                        >
                          <Text style={[
                            styles.timePickerOptionText,
                            customTime.hour === hour.toString().padStart(2, '0') && styles.selectedTimePickerOptionText
                          ]}>
                            {hour}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Minute</Text>
                    <ScrollView style={styles.timePickerScroll} showsVerticalScrollIndicator={false}>
                      {['00', '15', '30', '45'].map((minute) => (
                        <TouchableOpacity
                          key={minute}
                          style={[
                            styles.timePickerOption,
                            customTime.minute === minute && styles.selectedTimePickerOption
                          ]}
                          onPress={() => handleCustomTimeChange('minute', minute)}
                        >
                          <Text style={[
                            styles.timePickerOptionText,
                            customTime.minute === minute && styles.selectedTimePickerOptionText
                          ]}>
                            {minute}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Period</Text>
                    <ScrollView style={styles.timePickerScroll} showsVerticalScrollIndicator={false}>
                      {['AM', 'PM'].map((period) => (
                        <TouchableOpacity
                          key={period}
                          style={[
                            styles.timePickerOption,
                            customTime.period === period && styles.selectedTimePickerOption
                          ]}
                          onPress={() => handleCustomTimeChange('period', period)}
                        >
                          <Text style={[
                            styles.timePickerOptionText,
                            customTime.period === period && styles.selectedTimePickerOptionText
                          ]}>
                            {period}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
                
                <View style={styles.selectedTimeDisplay}>
                  <Text style={styles.selectedTimeText}>
                    Selected Time: {customTime.hour}:{customTime.minute} {customTime.period}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Provide Details */}
          <View style={styles.appointmentSection}>
            <Text style={styles.appointmentSectionTitle}>Provide Details</Text>
            <Text style={styles.detailsInstruction}>
              Please provide minimum input of your issue and write the problem you are facing, send relevant documents if any for best consultation.
            </Text>
            <View style={styles.messageInputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Your Message"
                value={userMessage}
                onChangeText={setUserMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Consultation Type */}
          <View style={styles.appointmentSection}>
            <Text style={styles.appointmentSectionTitle}>Consultation Type</Text>
            <View style={styles.consultationTypesContainer}>
              {consultationTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.consultationTypeRow}
                  onPress={() => setConsultationType(type.id)}
                >
                  <View style={styles.radioButtonContainer}>
                    <View style={[
                      styles.radioButton,
                      consultationType === type.id && styles.selectedRadioButton
                    ]}>
                      {consultationType === type.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </View>
                  <View style={styles.consultationTypeTextContainer}>
                    <Text style={styles.consultationTypeLabel}>{type.label}</Text>
                    {type.extra && (
                      <Text style={styles.consultationTypeExtra}>{type.extra}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.appointmentFooter}>
          <TouchableOpacity 
            style={styles.submitAppointmentButton}
            onPress={handleSubmitAppointment}
          >
            <Text style={styles.submitAppointmentText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLawyerDetailsScreen = () => (
    <View style={styles.lawyerDetailsContainer}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.lawyerDetailsHeader}>
        <TouchableOpacity onPress={() => setShowLawyerDetails(false)} style={styles.lawyerDetailsBackButton}>
          <Text style={styles.lawyerDetailsBackIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.lawyerDetailsTitle}>Lawyer Details</Text>
        <TouchableOpacity style={styles.lawyerDetailsFavorite}>
          <ProfessionalIcon type="HEART" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.lawyerDetailsScroll} showsVerticalScrollIndicator={false}>
        {/* Hero Profile Section */}
        <View style={styles.lawyerHeroSection}>
          <View style={styles.lawyerProfileImageContainer}>
            <View style={styles.lawyerProfileImage}>
              {selectedLawyer?.profileImage ? (
                <Image source={{ uri: selectedLawyer.profileImage }} style={styles.lawyerDetailProfileImage} />
              ) : (
                <ProfessionalIcon type="USER" size={60} color="#ffffff" />
              )}
            </View>
          </View>
          <Text style={styles.lawyerProfileName}>{selectedLawyer?.name}</Text>
          <Text style={styles.lawyerProfileSpecialty}>{selectedLawyer?.specialty}</Text>
          
          {/* Quick Stats */}
          <View style={styles.lawyerQuickStats}>
            <View style={styles.lawyerQuickStat}>
              <Text style={styles.lawyerQuickStatValue}>{selectedLawyer?.rating}</Text>
              <Text style={styles.lawyerQuickStatLabel}>Rating</Text>
            </View>
            <View style={styles.lawyerQuickStat}>
              <Text style={styles.lawyerQuickStatValue}>{selectedLawyer?.distance}</Text>
              <Text style={styles.lawyerQuickStatLabel}>Distance</Text>
            </View>
            <View style={styles.lawyerQuickStat}>
              <Text style={styles.lawyerQuickStatValue}>{selectedLawyer?.hourlyRate}</Text>
              <Text style={styles.lawyerQuickStatLabel}>Rate</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.lawyerAboutSection}>
          <Text style={styles.lawyerSectionTitle}>About</Text>
          <View style={styles.lawyerAboutStats}>
            <View style={styles.lawyerAboutStat}>
              <View style={styles.lawyerAboutStatIcon}>
                <ProfessionalIcon type="BRIEFCASE" size={24} color="#ffffff" />
              </View>
              <View style={styles.lawyerAboutStatContent}>
                <Text style={styles.lawyerAboutStatValue}>{selectedLawyer?.cases}</Text>
                <Text style={styles.lawyerAboutStatLabel}>Cases Handled</Text>
              </View>
            </View>
            <View style={styles.lawyerAboutStat}>
              <View style={styles.lawyerAboutStatIcon}>
                <ProfessionalIcon type="STAR" size={24} color="#ffffff" />
              </View>
              <View style={styles.lawyerAboutStatContent}>
                <Text style={styles.lawyerAboutStatValue}>{selectedLawyer?.successRate}</Text>
                <Text style={styles.lawyerAboutStatLabel}>Success Rate</Text>
              </View>
            </View>
          </View>
          <Text style={styles.lawyerAboutDescription}>{selectedLawyer?.description}</Text>
          <TouchableOpacity style={styles.lawyerReadMoreButton}>
            <Text style={styles.lawyerReadMoreText}>Read More</Text>
            <Text style={styles.lawyerReadMoreIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View style={styles.lawyerReviewsSection}>
          <View style={styles.lawyerReviewsHeader}>
            <View>
              <Text style={styles.lawyerSectionTitle}>Reviews & Success Stories</Text>
              <View style={styles.lawyerReviewsSubtitle}>
                <Text style={styles.lawyerReviewsSubtitleText}>{selectedLawyer?.rating} </Text>
                <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                <Text style={styles.lawyerReviewsSubtitleText}> based on {selectedLawyer?.reviews}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.lawyerViewAllButton}>
              <Text style={styles.lawyerViewAllText}>View All</Text>
              <Text style={styles.lawyerViewAllIcon}>→</Text>
            </TouchableOpacity>
          </View>
          
          {/* Sample Review */}
          <View style={styles.lawyerSampleReview}>
            <View style={styles.lawyerReviewHeader}>
              <View style={styles.lawyerReviewerAvatar}>
                <ProfessionalIcon type="USER" size={20} color="#ffffff" />
              </View>
              <View style={styles.lawyerReviewInfo}>
                <Text style={styles.lawyerReviewerName}>Sarah Johnson</Text>
                <View style={styles.lawyerReviewRatingContainer}>
                  {[1,2,3,4,5].map((star, index) => (
                    <ProfessionalIcon key={index} type="STAR" size={12} color="#FFD700" />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.lawyerReviewText}>
              "Excellent service! {selectedLawyer?.name} helped me with my case and got great results. Highly recommended!"
            </Text>
          </View>
        </View>

        {/* Contact Options */}
        <View style={styles.lawyerContactSection}>
          <Text style={styles.lawyerSectionTitle}>Contact Options</Text>
          <View style={styles.lawyerContactOptions}>
            <TouchableOpacity style={styles.lawyerContactOption}>
              <ProfessionalIcon type="PHONE" size={24} color="#2E4A6B" />
              <Text style={styles.lawyerContactText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lawyerContactOption}>
              <ProfessionalIcon type="MESSAGE" size={24} color="#2E4A6B" />
              <Text style={styles.lawyerContactText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lawyerContactOption}>
              <ProfessionalIcon type="EMAIL" size={24} color="#2E4A6B" />
              <Text style={styles.lawyerContactText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.lawyerDetailsFooter}>
        <TouchableOpacity 
          style={styles.scheduleAppointmentButton}
          onPress={() => setShowAppointmentBooking(true)}
        >
          <Text style={styles.scheduleAppointmentText}>Schedule an Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAllLawyersScreen = () => (
    <View style={styles.allLawyersContainer}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.allLawyersHeader}>
        <TouchableOpacity onPress={() => setShowAllLawyers(false)} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.allLawyersTitle}>All Lawyers</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Lawyers Grid */}
      <ScrollView style={styles.allLawyersScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.allLawyersGrid}>
          {[
            { name: 'Krisy Yolker', specialty: 'Property Law', rating: '4.9', avatar: null, profileImage: null },
            { name: 'Chris Young', specialty: 'Criminal Law', rating: '4.7', avatar: null, profileImage: null },
            { name: 'Lisa Wales', specialty: 'Tax Law', rating: '4.8', avatar: null, profileImage: null },
            { name: 'John Smith', specialty: 'Civil Law', rating: '4.6', avatar: null, profileImage: null },
            { name: 'Sarah Johnson', specialty: 'Family Law', rating: '4.9', avatar: null, profileImage: null },
            { name: 'Michael Chen', specialty: 'Business Law', rating: '4.8', avatar: null, profileImage: null },
            { name: 'Emily Rodriguez', specialty: 'Personal Injury', rating: '4.7', avatar: null, profileImage: null },
            { name: 'David Thompson', specialty: 'Immigration', rating: '4.9', avatar: null, profileImage: null },
            { name: 'Maria Garcia', specialty: 'Employment Law', rating: '4.8', avatar: null, profileImage: null },
            { name: 'Robert Brown', specialty: 'Estate Planning', rating: '4.6', avatar: null, profileImage: null },
            { name: 'Jennifer Lee', specialty: 'Real Estate', rating: '4.8', avatar: null, profileImage: null },
            { name: 'Christopher Davis', specialty: 'Intellectual Property', rating: '4.9', avatar: null, profileImage: null },
            { name: 'Amanda Taylor', specialty: 'DUI Defense', rating: '4.5', avatar: null, profileImage: null },
            { name: 'Kevin Martinez', specialty: 'Medical Malpractice', rating: '4.8', avatar: null, profileImage: null },
            { name: 'Rachel Anderson', specialty: 'Workers Compensation', rating: '4.7', avatar: null, profileImage: null },
            { name: 'Daniel Kim', specialty: 'Securities Law', rating: '4.9', avatar: null, profileImage: null },
            { name: 'Nicole White', specialty: 'Patent Law', rating: '4.8', avatar: null, profileImage: null },
            { name: 'Mark Thompson', specialty: 'Trademark Law', rating: '4.6', avatar: null, profileImage: null },
            { name: 'Samantha Clark', specialty: 'Corporate Law', rating: '4.9', avatar: null, profileImage: null },
            { name: 'Andrew Lewis', specialty: 'Environmental Law', rating: '4.7', avatar: null, profileImage: null }
            ].map((lawyer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.allLawyerCard}
                onPress={() => handleLawyerSelect(lawyer.name, lawyer.specialty, lawyer.rating, lawyer.avatar)}
              >
              <View style={styles.allLawyerAvatar}>
                {lawyer.profileImage ? (
                  <Image source={{ uri: lawyer.profileImage }} style={styles.allLawyerProfileImage} />
                ) : (
                  <ProfessionalIcon type="USER" size={24} color="#2E4A6B" />
                )}
              </View>
              <Text style={styles.allLawyerName}>{lawyer.name}</Text>
              <Text style={styles.allLawyerSpecialty}>{lawyer.specialty}</Text>
              <View style={styles.allLawyerRating}>
                <Text style={styles.allStars}>⭐⭐⭐⭐⭐</Text>
                <Text style={styles.allRatingText}>{lawyer.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderHomeScreen = () => (
    <View style={styles.homeContainer}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.homeHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hi, User</Text>
          <Text style={styles.headerSubtitle}>Find the right lawyer for your needs</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <ProfessionalIcon type="BELL" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <ProfessionalIcon type="SETTINGS" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.homeContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <ProfessionalIcon type="SEARCH" size={20} color="#6c757d" />
            <Text style={styles.searchPlaceholder}>Search lawyers, categories...</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.homeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={handleSeeAllCategories}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {[
              { name: 'Property', icon: 'PROPERTY' },
              { name: 'Criminal', icon: 'CRIMINAL' },
              { name: 'Tax', icon: 'TAX' },
              { name: 'Family', icon: 'FAMILY_LAW' },
              { name: 'Business', icon: 'BUSINESS' },
              { name: 'Personal Injury', icon: 'PERSONAL_INJURY' },
              { name: 'Civil Rights', icon: 'PEOPLE' },
              { name: 'Immigration', icon: 'GLOBE' },
              { name: 'Environmental', icon: 'LEAF' },
              { name: 'Bankruptcy', icon: 'BRIEFCASE' },
              { name: 'Employment', icon: 'BRIEFCASE' },
              { name: 'Real Estate', icon: 'HOUSE' },
              { name: 'Estate Planning', icon: 'WILL' },
              { name: 'Intellectual Property', icon: 'LIGHTBULB' },
              { name: 'Contract', icon: 'DOC' },
              { name: 'Divorce', icon: 'HEART' },
              { name: 'DUI', icon: 'CAR' },
              { name: 'Workers Comp', icon: 'TOOLS' },
              { name: 'Medical Malpractice', icon: 'MEDICAL' },
              { name: 'Securities', icon: 'CHART' },
              { name: 'Patent', icon: 'LIGHTBULB' },
              { name: 'Trademark', icon: 'TM' },
              { name: 'Copyright', icon: 'COPY' },
              { name: 'Corporate', icon: 'BUILDING' }
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.homeCategoryCard,
                  selectedCategory === category.name && styles.selectedHomeCategoryCard
                ]}
                onPress={() => handleCategoryClick(category.name)}
              >
                <ProfessionalIcon type={category.icon} size={24} color={selectedCategory === category.name ? '#ffffff' : '#2E4A6B'} />
                <Text style={[
                  styles.homeCategoryName,
                  selectedCategory === category.name && styles.selectedHomeCategoryName
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Lawyers */}
        <View style={styles.homeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Lawyers</Text>
            <TouchableOpacity onPress={handleSeeAllLawyers}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.lawyersScroll}
          >
            {[
              { name: 'Krisy Yolker', specialty: 'Property Law', rating: '4.9', avatar: null, profileImage: null },
              { name: 'Chris Young', specialty: 'Criminal Law', rating: '4.7', avatar: null, profileImage: null },
              { name: 'Lisa Wales', specialty: 'Tax Law', rating: '4.8', avatar: null, profileImage: null },
              { name: 'John Smith', specialty: 'Civil Law', rating: '4.6', avatar: null, profileImage: null },
              { name: 'Sarah Johnson', specialty: 'Family Law', rating: '4.9', avatar: null, profileImage: null },
              { name: 'Michael Chen', specialty: 'Business Law', rating: '4.8', avatar: null, profileImage: null },
              { name: 'Emily Rodriguez', specialty: 'Personal Injury', rating: '4.7', avatar: null, profileImage: null },
              { name: 'David Thompson', specialty: 'Immigration', rating: '4.9', avatar: null, profileImage: null },
              { name: 'Maria Garcia', specialty: 'Employment Law', rating: '4.8', avatar: null, profileImage: null },
              { name: 'Robert Brown', specialty: 'Estate Planning', rating: '4.6', avatar: null, profileImage: null },
              { name: 'Jennifer Lee', specialty: 'Real Estate', rating: '4.8', avatar: null, profileImage: null },
              { name: 'Christopher Davis', specialty: 'Intellectual Property', rating: '4.9', avatar: null, profileImage: null },
              { name: 'Amanda Taylor', specialty: 'DUI Defense', rating: '4.5', avatar: null, profileImage: null },
              { name: 'Kevin Martinez', specialty: 'Medical Malpractice', rating: '4.8', avatar: null, profileImage: null },
              { name: 'Rachel Anderson', specialty: 'Workers Compensation', rating: '4.7', avatar: null, profileImage: null },
              { name: 'Daniel Kim', specialty: 'Securities Law', rating: '4.9', avatar: null, profileImage: null },
              { name: 'Nicole White', specialty: 'Patent Law', rating: '4.8', avatar: null, profileImage: null },
              { name: 'Mark Thompson', specialty: 'Trademark Law', rating: '4.6', avatar: null, profileImage: null },
              { name: 'Samantha Clark', specialty: 'Corporate Law', rating: '4.9', avatar: null, profileImage: null },
              { name: 'Andrew Lewis', specialty: 'Environmental Law', rating: '4.7', avatar: null, profileImage: null }
            ].map((lawyer, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.lawyerCard}
                onPress={() => handleLawyerCardClick(lawyer)}
              >
                <View style={styles.lawyerAvatar}>
                  {lawyer.profileImage ? (
                    <Image source={{ uri: lawyer.profileImage }} style={styles.lawyerProfileImage} />
                  ) : (
                    <ProfessionalIcon type="USER" size={30} color="#2E4A6B" />
                  )}
                </View>
                <Text style={styles.lawyerName}>{lawyer.name}</Text>
                <Text style={styles.lawyerSpecialty}>{lawyer.specialty}</Text>
                <View style={styles.lawyerRating}>
                  <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                  <Text style={styles.ratingText}>{lawyer.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services */}
        <View style={styles.homeSection}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            {getServicesForCategory(selectedCategory).map((service, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.serviceCard}
                onPress={() => handleServiceSelect(service.name)}
              >
                <ProfessionalIcon type={service.icon} size={32} color="#2E4A6B" />
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.serviceSubtitle}>{service.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <ProfessionalIcon type="HOME" size={24} color="#2E4A6B" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setShowBookings(true)}
        >
          <ProfessionalIcon type="BOOKMARK" size={24} color="#6c757d" />
          <Text style={styles.navText}>Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <ProfessionalIcon type="USER" size={24} color="#6c757d" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render current screen
  // Main render function
  if (showBookingDetails) {
    return renderBookingDetailsScreen();
  }
  
  if (showBookings) {
    return renderMyBookingsScreen();
  }
  
  if (showAppointmentConfirmation) {
    return renderAppointmentConfirmationScreen();
  }
  
  if (showReviewBooking) {
    return renderReviewBookingScreen();
  }
  
  if (showAppointmentBooking) {
    return renderAppointmentBookingScreen();
  }
  
  if (showLawyerDetails) {
    return renderLawyerDetailsScreen();
  }
  
  if (showCategoryConfirmation) {
    return renderCategoryConfirmationScreen();
  }
  
  if (showAllCategories) {
    return renderAllCategoriesScreen();
  }
  
  if (showAllLawyers) {
    return renderAllLawyersScreen();
  }

  switch (currentScreen) {
    case 'splash':
      return renderSplashScreen();
    case 'onboarding':
      return renderOnboardingScreen();
    case 'login':
      return renderLoginScreen();
    case 'categories':
      return renderCategoriesScreen();
    case 'home':
      return renderHomeScreen();
    default:
      return renderSplashScreen();
  }
}

const styles = StyleSheet.create({
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  scalesIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  scalesText: {
    fontSize: 60,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#8A8A8A',
    letterSpacing: 1,
  },

  // Onboarding Screen Styles
  onboardingContainer: {
    flex: 1,
    backgroundColor: '#2E4A6B',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  onboardingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  onboardingImage: {
    fontSize: 80,
  },
  onboardingInfo: {
    alignItems: 'center',
  },
  onboardingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  onboardingSubtitle: {
    fontSize: 16,
    color: '#B8C5D1',
    textAlign: 'center',
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ffffff',
  },
  continueButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: 40,
    marginBottom: 60,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueText: {
    color: '#2E4A6B',
    fontSize: 16,
    fontWeight: '600',
  },

  // Login Screen Styles
  loginContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loginHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  loginLogoContainer: {
    marginBottom: 20,
  },
  loginScalesIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  loginScalesText: {
    fontSize: 40,
  },
  loginAppName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  loginTagline: {
    fontSize: 14,
    color: '#8A8A8A',
    letterSpacing: 1,
  },
  loginForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 15,
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
  },
  continueBtn: {
    backgroundColor: '#2E4A6B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  continueBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#8A8A8A',
    marginBottom: 15,
    fontSize: 14,
  },
  socialText: {
    textAlign: 'center',
    color: '#8A8A8A',
    marginBottom: 20,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookBtn: {
    backgroundColor: '#4267B2',
  },
  googleBtn: {
    backgroundColor: '#DB4437',
  },
  socialBtnText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Categories Screen Styles
  categoriesContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#2E4A6B',
  },
  skipLink: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  categoriesContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoriesSubtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: '30%',
    alignItems: 'center',
  },
  activeCategoryBtn: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
  },
  categoryText: {
    fontSize: 14,
    color: '#8A8A8A',
  },
  activeCategoryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  messageSection: {
    marginBottom: 30,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  optional: {
    fontWeight: 'normal',
    color: '#8A8A8A',
  },
  messageSubtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  messageLabel: {
    fontSize: 16,
    color: '#2E4A6B',
    marginBottom: 10,
    fontWeight: '600',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  proceedBtn: {
    backgroundColor: '#2E4A6B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  proceedText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Home Screen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  homeHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#B8C5D1',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 10,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    fontSize: 18,
  },
  homeContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#8A8A8A',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  homeSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAll: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  
  // All Categories Screen Styles
  allCategoriesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  allCategoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#2E4A6B',
    fontWeight: 'bold',
  },
  allCategoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  placeholder: {
    width: 44,
  },
  allCategoriesScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  allCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  allCategoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '30%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  allCategoryIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  allCategoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E4A6B',
    textAlign: 'center',
  },
  selectedAllCategoryCard: {
    backgroundColor: '#2E4A6B',
    borderWidth: 2,
    borderColor: '#2E4A6B',
  },
  selectedAllCategoryName: {
    color: '#ffffff',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  
  // All Lawyers Screen Styles
  allLawyersContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  allLawyersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  allLawyersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  allLawyersScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  allLawyersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  allLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  allLawyerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  allLawyerAvatarText: {
    fontSize: 24,
  },
  allLawyerProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  allLawyerName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 5,
  },
  allLawyerSpecialty: {
    fontSize: 10,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 8,
  },
  allLawyerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allStars: {
    fontSize: 10,
    marginRight: 5,
  },
  allRatingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  
  // Category Confirmation Screen Styles
  confirmationContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  confirmationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  confirmationHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  confirmationCategoryDisplay: {
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
  },
  confirmationCategoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  confirmationCategoryIconText: {
    fontSize: 40,
  },
  confirmationCategoryName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  confirmationCategoryDescription: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  confirmationServicesPreview: {
    marginBottom: 25,
  },
  confirmationServicesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  confirmationServicesList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  confirmationServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmationServiceIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },
  confirmationServiceName: {
    fontSize: 14,
    color: '#2E4A6B',
    flex: 1,
  },
  confirmationMoreServices: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  confirmationCancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  confirmationCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  confirmationConfirmButton: {
    flex: 1,
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmationConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  
  // Lawyer Details Screen Styles - Redesigned
  lawyerDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  lawyerDetailsBackButton: {
    padding: 10,
  },
  lawyerDetailsBackIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  lawyerDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lawyerDetailsFavorite: {
    padding: 10,
  },
  lawyerDetailsFavoriteIcon: {
    fontSize: 24,
  },
  lawyerDetailsScroll: {
    flex: 1,
  },
  
  // Hero Section
  lawyerHeroSection: {
    backgroundColor: '#2E4A6B',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  lawyerProfileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  lawyerProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lawyerProfileAvatar: {
    fontSize: 60,
  },
  lawyerDetailProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  lawyerOnlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  lawyerProfileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  lawyerProfileSpecialty: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 25,
    textAlign: 'center',
  },
  lawyerQuickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  lawyerQuickStat: {
    alignItems: 'center',
  },
  lawyerQuickStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawyerQuickStatLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  
  // About Section
  lawyerAboutSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  lawyerSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
  },
  lawyerAboutStats: {
    marginBottom: 20,
  },
  lawyerAboutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  lawyerAboutStatIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  lawyerAboutStatIconText: {
    fontSize: 24,
  },
  lawyerAboutStatContent: {
    flex: 1,
  },
  lawyerAboutStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 2,
  },
  lawyerAboutStatLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  lawyerAboutDescription: {
    fontSize: 15,
    color: '#2E4A6B',
    lineHeight: 22,
    marginBottom: 15,
  },
  lawyerReadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  lawyerReadMoreText: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
    marginRight: 5,
  },
  lawyerReadMoreIcon: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: 'bold',
  },
  
  // Reviews Section
  lawyerReviewsSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  lawyerReviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lawyerReviewsSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  lawyerViewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4A6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  lawyerViewAllText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 5,
  },
  lawyerViewAllIcon: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  lawyerSampleReview: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  lawyerReviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lawyerReviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lawyerReviewerAvatarText: {
    fontSize: 20,
    color: '#ffffff',
  },
  lawyerReviewInfo: {
    flex: 1,
  },
  lawyerReviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 2,
  },
  lawyerReviewRating: {
    fontSize: 14,
  },
  lawyerReviewRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawyerReviewsSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  lawyerReviewsSubtitleText: {
    fontSize: 14,
    color: '#6c757d',
  },
  lawyerReviewText: {
    fontSize: 14,
    color: '#2E4A6B',
    lineHeight: 20,
  },
  
  // Contact Section
  lawyerContactSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  lawyerContactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lawyerContactOption: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    minWidth: 80,
  },
  lawyerContactIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  lawyerContactText: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  
  // Footer
  lawyerDetailsFooter: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  scheduleAppointmentButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scheduleAppointmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  // Appointment Booking Screen Styles
  appointmentContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  appointmentBackButton: {
    padding: 10,
  },
  appointmentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  appointmentContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appointmentSection: {
    marginTop: 25,
    marginBottom: 20,
  },
  appointmentSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  
  // Calendar Styles
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  calendarMonth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginRight: 8,
  },
  monthYearPicker: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  monthPicker: {
    marginBottom: 10,
  },
  yearPicker: {
    marginBottom: 5,
  },
  monthOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  selectedMonthOption: {
    backgroundColor: '#2E4A6B',
  },
  monthOptionText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  selectedMonthOptionText: {
    color: '#ffffff',
  },
  yearOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  selectedYearOption: {
    backgroundColor: '#2E4A6B',
  },
  yearOptionText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  selectedYearOptionText: {
    color: '#ffffff',
  },
  calendarWeekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  selectedCalendarDay: {
    backgroundColor: '#2E4A6B',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  selectedCalendarDayText: {
    color: '#ffffff',
  },
  navButton: {
    padding: 10,
  },
  
  // Time Slots Styles
  timeSelectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  customTimeButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E4A6B',
  },
  customTimeButtonText: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlotButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedTimeSlotButton: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  selectedTimeSlotText: {
    color: '#ffffff',
  },
  
  // Custom Time Picker Styles
  customTimeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  timePickerColumn: {
    alignItems: 'center',
    flex: 1,
  },
  timePickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 10,
  },
  timePickerScroll: {
    height: 120,
    width: 60,
  },
  timePickerOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  selectedTimePickerOption: {
    backgroundColor: '#2E4A6B',
  },
  timePickerOptionText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  selectedTimePickerOptionText: {
    color: '#ffffff',
  },
  selectedTimeDisplay: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  selectedTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  
  // Details Section Styles
  detailsInstruction: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 15,
  },
  messageInputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  messageInput: {
    padding: 15,
    fontSize: 16,
    color: '#2E4A6B',
    minHeight: 100,
  },
  
  // Consultation Type Styles
  consultationTypesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultationTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  radioButtonContainer: {
    marginRight: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: '#2E4A6B',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E4A6B',
  },
  consultationTypeTextContainer: {
    flex: 1,
  },
  consultationTypeLabel: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  consultationTypeExtra: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  
  // Footer Styles
  appointmentFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  submitAppointmentButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitAppointmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  // Review Booking Screen Styles
  reviewBookingContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  reviewBookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  reviewBookingBackButton: {
    padding: 10,
  },
  reviewBookingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  reviewBookingContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  reviewBookingFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  
  // Lawyer Info Card Styles
  lawyerInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawyerInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawyerInfoAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  lawyerInfoProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  lawyerInfoDetails: {
    flex: 1,
  },
  lawyerInfoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  lawyerInfoSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  lawyerInfoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawyerInfoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  lawyerInfoStatText: {
    fontSize: 12,
    color: '#2E4A6B',
    marginLeft: 5,
    fontWeight: '600',
  },
  
  // Message Review Card Styles
  messageReviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageReviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  messageReviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  modifyButton: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  messageReviewText: {
    fontSize: 14,
    color: '#2E4A6B',
    lineHeight: 20,
    marginBottom: 10,
  },
  expandButton: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    marginBottom: 15,
  },
  attachmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 5,
  },
  
  // Consultation Details Card Styles
  consultationDetailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consultationDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
  },
  consultationDetailsList: {
    gap: 15,
  },
  consultationDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  consultationDetailLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  consultationDetailValue: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  totalAmountRow: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 15,
    marginTop: 5,
  },
  totalAmountLabel: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: 'bold',
  },
  totalAmountValue: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: 'bold',
  },
  
  // Final Proceed Button Styles
  finalProceedButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  finalProceedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  // Appointment Confirmation Screen Styles
  confirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  confirmationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  confirmationIconContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  confirmationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationContent: {
    alignItems: 'center',
    marginBottom: 25,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 25,
  },
  confirmationDetailsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  confirmationDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmationDetailLabel: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '600',
  },
  confirmationDetailValue: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  confirmationMessage: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
  },
  confirmationLogoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  confirmationLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  confirmationLogoText: {
    fontSize: 40,
  },
  confirmationFooter: {
    alignItems: 'center',
    gap: 15,
  },
  goToHomeLink: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  viewBookingDetailsButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  viewBookingDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  // My Bookings Screen Styles
  bookingsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  bookingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  bookingsBackButton: {
    padding: 10,
  },
  bookingsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    flex: 1,
  },
  bookingsFilterContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  bookingsFilterScroll: {
    paddingHorizontal: 20,
  },
  bookingFilterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedBookingFilterTab: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
  },
  bookingFilterText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '600',
  },
  selectedBookingFilterText: {
    color: '#ffffff',
  },
  bookingsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  bookingAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  bookingProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bookingDetails: {
    flex: 1,
  },
  bookingLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  bookingSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  bookingDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDateTimeText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 5,
  },
  bookingStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  bookingStatusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  
  // Booking Details Screen Styles
  bookingDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  bookingDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  bookingDetailsBackButton: {
    padding: 10,
  },
  bookingDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  bookingDetailsContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Lawyer Card Styles
  bookingDetailsLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingDetailsLawyerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDetailsLawyerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  bookingDetailsLawyerProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  bookingDetailsLawyerInfo: {
    flex: 1,
  },
  bookingDetailsLawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  bookingDetailsLawyerSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  bookingDetailsLawyerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDetailsLawyerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  bookingDetailsLawyerStatText: {
    fontSize: 12,
    color: '#2E4A6B',
    marginLeft: 5,
    fontWeight: '600',
  },
  
  // Message Card Styles
  bookingDetailsMessageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingDetailsMessageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  bookingDetailsMessageText: {
    fontSize: 14,
    color: '#2E4A6B',
    lineHeight: 20,
    marginBottom: 10,
  },
  bookingDetailsExpandButton: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    marginBottom: 15,
  },
  bookingDetailsAttachmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDetailsAttachmentText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 5,
  },
  
  // Consultation Card Styles
  bookingDetailsConsultationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingDetailsConsultationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
  },
  bookingDetailsConsultationList: {
    gap: 15,
  },
  bookingDetailsConsultationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDetailsConsultationLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  bookingDetailsConsultationValue: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  bookingDetailsStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDetailsStatusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  
  // Footer Action Buttons
  bookingDetailsFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 15,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  rescheduleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  categoriesScroll: {
    paddingVertical: 5,
  },
  homeCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  homeCategoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginRight: 15,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedHomeCategoryCard: {
    backgroundColor: '#2E4A6B',
  },
  homeCategoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  homeCategoryName: {
    fontSize: 12,
    color: '#2E4A6B',
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedHomeCategoryName: {
    color: '#ffffff',
  },
  lawyersScroll: {
    paddingVertical: 5,
  },
  lawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    width: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawyerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  lawyerAvatarText: {
    fontSize: 30,
  },
  lawyerProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  lawyerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 5,
  },
  lawyerSpecialty: {
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
    marginBottom: 8,
  },
  lawyerRating: {
    alignItems: 'center',
  },
  stars: {
    fontSize: 10,
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 5,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
  },
  bottomNav: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#8A8A8A',
    marginBottom: 5,
  },
  navIconActive: {
    fontSize: 20,
    color: '#2E4A6B',
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  navTextActive: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '600',
  },
});
