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

// Import separate account systems
import LawyerApp from './LawyerApp';
import LawfirmApp from './LawfirmApp';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [userRole, setUserRole] = useState('USER'); // USER, LAWYER, LAW_FIRM
  const [lawFirmForm, setLawFirmForm] = useState({
    organizationName: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    description: ''
  });
  const [registeredLawyers, setRegisteredLawyers] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllLawyers, setShowAllLawyers] = useState(false);
  const [showSeeAllCategoriesSelection, setShowSeeAllCategoriesSelection] = useState(false);
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
  
  // Law Firm Booking States
  const [showLawFirmAppointmentBooking, setShowLawFirmAppointmentBooking] = useState(false);
  const [showLawFirmReviewBooking, setShowLawFirmReviewBooking] = useState(false);
  const [showLawFirmAppointmentConfirmation, setShowLawFirmAppointmentConfirmation] = useState(false);
  const [lawFirmSelectedDate, setLawFirmSelectedDate] = useState(null);
  const [lawFirmSelectedTimeSlot, setLawFirmSelectedTimeSlot] = useState(null);
  const [lawFirmConsultationType, setLawFirmConsultationType] = useState('online');
  const [lawFirmUserMessage, setLawFirmUserMessage] = useState('');
  const [lawFirmCurrentMonth, setLawFirmCurrentMonth] = useState(new Date().getMonth());
  const [lawFirmCurrentYear, setLawFirmCurrentYear] = useState(new Date().getFullYear());
  const [lawFirmShowMonthPicker, setLawFirmShowMonthPicker] = useState(false);
  const [lawFirmCustomTime, setLawFirmCustomTime] = useState({ hour: '09', minute: '00', period: 'AM' });
  const [lawFirmShowTimePicker, setLawFirmShowTimePicker] = useState(false);
  const [lawFirmExpandedMessage, setLawFirmExpandedMessage] = useState(false);
  
  const [showBookings, setShowBookings] = useState(false);
  const [selectedBookingFilter, setSelectedBookingFilter] = useState('All');
  const [userBookings, setUserBookings] = useState([]);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRatingPage, setShowRatingPage] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullName: 'Katie Syrus',
    email: 'katies@gmail.com',
    phone: '+44 9005628520',
    dateOfBirth: '15/01/1990',
    streetAddress: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    profilePicture: null
  });
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [hasProfileChanges, setHasProfileChanges] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success', // 'success', 'warning', 'confirm'
    title: '',
    message: '',
    buttons: []
  });
  const [showRescheduleBooking, setShowRescheduleBooking] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [rescheduleSelectedDate, setRescheduleSelectedDate] = useState(null);
  const [rescheduleSelectedTimeSlot, setRescheduleSelectedTimeSlot] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [lawyerRatings, setLawyerRatings] = useState({
    'Mathew Bairstow': { rating: 4.4, reviewCount: 127 },
    'Lisa Wales': { rating: 4.8, reviewCount: 95 },
    'Chris Young': { rating: 4.7, reviewCount: 203 },
    'Krisy Yolker': { rating: 4.9, reviewCount: 156 }
  });
  const [showServicesPage, setShowServicesPage] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showViewAllFirms, setShowViewAllFirms] = useState(false);
  const [showLawFirmDetails, setShowLawFirmDetails] = useState(false);
  const [selectedLawFirm, setSelectedLawFirm] = useState(null);
  const [showViewAllLawyers, setShowViewAllLawyers] = useState(false);
  const [homeSliderMode, setHomeSliderMode] = useState('lawyers'); // 'lawyers' or 'lawfirms'
  const [showAllHomeLawFirms, setShowAllHomeLawFirms] = useState(false);

  // Auto-transition from splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Sync edited profile when user profile changes
  useEffect(() => {
    setEditedProfile(userProfile);
    setHasProfileChanges(false);
  }, [userProfile]);

  // Auto-fill law firm form when law firm registration screen is shown
  useEffect(() => {
    if (currentScreen === 'lawFirmRegistration') {
      autoFillLawFirmForm();
    }
  }, [currentScreen]);

  // Custom Modal Helper Function
  const showCustomAlert = (type, title, message, buttons) => {
    setModalConfig({
      type,
      title,
      message,
      buttons
    });
    setShowCustomModal(true);
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

  const handleLawyerSelect = (lawyerName, specialty, rating, avatar, profileImage) => {
    const lawyerData = {
      name: lawyerName,
      specialty: specialty,
      rating: rating,
      avatar: avatar,
      profileImage: profileImage, // Use the actual profile image
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
    handleLawyerSelect(lawyer.name, lawyer.specialty, lawyer.rating, lawyer.avatar, lawyer.profileImage);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleServiceSelect = (serviceName) => {
    setSelectedService(serviceName);
    setShowServicesPage(true);
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
      'MAIL': { family: Ionicons, name: 'mail-outline' },
      'LAWYER': { family: Ionicons, name: 'person-outline' },
      'CLOCK': { family: Ionicons, name: 'time-outline' },
      'LOCK': { family: Ionicons, name: 'lock-closed-outline' },
      'SHIELD': { family: Ionicons, name: 'shield-outline' },
      'LOGOUT': { family: Ionicons, name: 'log-out-outline' },
      'EDIT': { family: Ionicons, name: 'create-outline' },
      'USER_EDIT': { family: Ionicons, name: 'person-add-outline' },
      'HELP': { family: Ionicons, name: 'help-circle-outline' },
      'GOOGLE': { family: Ionicons, name: 'logo-google' },
      'PILL': { family: MaterialCommunityIcons, name: 'pill' },
      'TICKET': { family: MaterialCommunityIcons, name: 'ticket-outline' },
      'CHILD': { family: MaterialCommunityIcons, name: 'baby-face-outline' },
      'ZONE': { family: MaterialCommunityIcons, name: 'map-marker-outline' },
      'PATENT': { family: Ionicons, name: 'bulb-outline' },
      'ARROW_LEFT': { family: Ionicons, name: 'arrow-back-outline' },
      'ARROW_RIGHT': { family: Ionicons, name: 'arrow-forward-outline' },
      'CHEVRON_DOWN': { family: Ionicons, name: 'chevron-down-outline' },
      'CHEVRON_LEFT': { family: Ionicons, name: 'chevron-back-outline' },
      'CHEVRON_RIGHT': { family: Ionicons, name: 'chevron-forward-outline' },
      'DOLLAR': { family: Ionicons, name: 'cash-outline' },
      'PAPERCLIP': { family: Ionicons, name: 'attach-outline' },
      'CHECKMARK': { family: Ionicons, name: 'checkmark-circle' },
      'CALENDAR': { family: Ionicons, name: 'calendar-outline' },
      'CLOSE': { family: Ionicons, name: 'close-outline' },
      'STAR': { family: Ionicons, name: 'star-outline' },
      'FITNESS': { family: Ionicons, name: 'fitness-outline' },
      'BOOK': { family: Ionicons, name: 'book-outline' },
      
      // Additional icons for services
      'CARD': { family: Ionicons, name: 'card-outline' },
      'FLAG': { family: Ionicons, name: 'flag-outline' },
      'PROTECTION': { family: Ionicons, name: 'shield-checkmark-outline' },
      'LICENSE': { family: Ionicons, name: 'id-card-outline' },
      'TEST': { family: Ionicons, name: 'beaker-outline' },
      'BREATH': { family: Ionicons, name: 'medical-outline' },
      'HOME': { family: Ionicons, name: 'home-outline' },
      'MAP': { family: Ionicons, name: 'map-outline' },
      'COURT': { family: Ionicons, name: 'library-outline' }
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

  // All available images for random selection
  const allImages = [
    require('./assets/images/numbered/1.jpg'),
    require('./assets/images/numbered/2.jpg'),
    require('./assets/images/numbered/3.jpg'),
    require('./assets/images/numbered/4.jpg'),
    require('./assets/images/numbered/5.jpg'),
    require('./assets/images/numbered/6.png'),
    require('./assets/images/numbered/7.png'),
    require('./assets/images/numbered/8.png'),
    require('./assets/images/numbered/9.png'),
    require('./assets/images/numbered/10.png')
  ];

  // Shuffle function to randomize images
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get 4 random images for the diamonds
  const randomImages = shuffleArray(allImages).slice(0, 4);

  const onboardingData = [
    {
      title: "Expert Legal Consultation",
      subtitle: "Connect with qualified lawyers and get professional legal advice for all your legal matters.",
      image: randomImages[0]
    },
    {
      title: "Professional Legal Services", 
      subtitle: "Access experienced attorneys specialized in various legal fields to handle your case with expertise.",
      image: randomImages[1]
    },
    {
      title: "Trusted Legal Solutions",
      subtitle: "Join thousands of satisfied clients who found the right legal representation through our platform.",
      image: randomImages[2]
    }
  ];

  const renderOnboardingScreen = () => (
    <View style={styles.onboardingContainer}>
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.skipButton} onPress={() => setCurrentScreen('login')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      
      <View style={styles.onboardingContent}>
        {/* Diamond Image Layout */}
        <View style={styles.diamondImageContainer}>
          <View style={styles.diamondGrid}>
            {/* Top Diamond */}
            <View style={[styles.diamondCard, styles.topDiamond]}>
              <Image 
                source={onboardingData[0].image} 
                style={styles.diamondImage}
                resizeMode="cover"
              />
            </View>
            
            {/* Left Diamond */}
            <View style={[styles.diamondCard, styles.leftDiamond]}>
              <Image 
                source={onboardingData[1].image} 
                style={styles.diamondImage}
                resizeMode="cover"
              />
            </View>
            
            {/* Right Diamond */}
            <View style={[styles.diamondCard, styles.rightDiamond]}>
              <Image 
                source={onboardingData[2].image} 
                style={styles.diamondImage}
                resizeMode="cover"
              />
            </View>
            
            {/* Bottom Diamond */}
            <View style={[styles.diamondCard, styles.bottomDiamond]}>
              <Image 
                source={randomImages[3]} 
                style={styles.diamondImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        
        <View style={styles.onboardingInfo}>
          <Text style={styles.onboardingTitle}>{onboardingData[onboardingIndex].title}</Text>
          <Text style={styles.onboardingSubtitle}>{onboardingData[onboardingIndex].subtitle}</Text>
          
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.dot, 
                  onboardingIndex === index && styles.activeDot
                ]} 
              />
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.onboardingNavigation}>
      <TouchableOpacity 
        style={styles.continueButton} 
          onPress={() => {
            if (onboardingIndex < onboardingData.length - 1) {
              setOnboardingIndex(onboardingIndex + 1);
            } else {
              setCurrentScreen('login');
            }
          }}
        >
          <Text style={styles.continueText}>
            {onboardingIndex < onboardingData.length - 1 ? 'Next' : 'Get Started'}
          </Text>
      </TouchableOpacity>
      </View>
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

        <View style={styles.registerSection}>
          <Text style={styles.registerPrompt}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => setShowRegister(true)}>
            <Text style={styles.registerLink}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const toggleCategory = (categoryName) => {
    if (userRole === 'USER') {
      setSelectedCategories(prev => 
        prev.includes(categoryName) 
          ? prev.filter(cat => cat !== categoryName)
          : [...prev, categoryName]
      );
    } else if (userRole === 'LAWYER') {
      setSelectedServices(prev => 
        prev.includes(categoryName) 
          ? prev.filter(service => service !== categoryName)
          : [...prev, categoryName]
      );
    } else if (userRole === 'LAW_FIRM') {
      // For law firms, selecting a category automatically selects all related services
      if (selectedCategories.includes(categoryName)) {
        // Remove category and all its related services
        setSelectedCategories(prev => prev.filter(cat => cat !== categoryName));
        setSelectedServices(prev => {
          const relatedServices = getServicesForCategory(categoryName);
          return prev.filter(service => !relatedServices.includes(service));
        });
      } else {
        // Add category and all its related services
        setSelectedCategories(prev => [...prev, categoryName]);
        setSelectedServices(prev => {
          const relatedServices = getServicesForCategory(categoryName);
          const newServices = relatedServices.filter(service => !prev.includes(service));
          return [...prev, ...newServices];
        });
      }
    }
  };

  const getServicesForCategory = (categoryName) => {
    const categoryServiceMap = {
      'Property': ['Property Law', 'Real Estate Transactions', 'Landlord-Tenant Disputes', 'Property Development', 'Zoning & Land Use', 'Property Tax Appeals'],
      'Criminal': ['Criminal Defense', 'DUI Defense', 'Traffic Violations', 'White Collar Crime', 'Drug Crimes', 'Assault & Battery'],
      'Tax': ['Tax Law', 'Tax Planning', 'Tax Disputes', 'IRS Audits', 'Tax Appeals', 'Business Taxes'],
      'Family': ['Family Law', 'Divorce', 'Child Custody', 'Child Support', 'Alimony', 'Adoption'],
      'Business': ['Business Formation', 'Contract Law', 'Corporate Governance', 'Mergers & Acquisitions', 'Securities Law', 'Commercial Litigation'],
      'Personal Injury': ['Personal Injury', 'Car Accidents', 'Motorcycle Accidents', 'Truck Accidents', 'Slip & Fall', 'Medical Malpractice'],
      'Immigration': ['Immigration Law', 'Visa Applications', 'Green Card', 'Citizenship', 'Deportation Defense', 'Asylum'],
      'Divorce': ['Divorce', 'Child Custody', 'Child Support', 'Alimony', 'Prenuptial Agreements', 'Domestic Partnerships'],
      'DUI': ['DUI Defense', 'Traffic Violations', 'Criminal Defense', 'License Suspension', 'Field Sobriety Tests', 'Breathalyzer Tests'],
      'Employment': ['Employment Law', 'Discrimination', 'Harassment', 'Wrongful Termination', 'Wage & Hour', 'Workplace Safety'],
      'Real Estate': ['Real Estate Transactions', 'Property Law', 'Commercial Leasing', 'Residential Leasing', 'Property Management', 'Real Estate Litigation'],
      'Contract': ['Contract Law', 'Business Contracts', 'Employment Contracts', 'Service Agreements', 'Contract Disputes', 'Contract Review'],
      
      // Additional categories from See All page
      'Civil Rights': ['Civil Rights Law', 'Discrimination Cases', 'Constitutional Law', 'Voting Rights', 'Religious Freedom', 'Free Speech'],
      'Environmental': ['Environmental Law', 'Environmental Compliance', 'Pollution Control', 'Environmental Impact', 'Waste Management', 'Clean Energy Law'],
      'Bankruptcy': ['Bankruptcy Law', 'Chapter 7 Bankruptcy', 'Chapter 13 Bankruptcy', 'Business Bankruptcy', 'Debt Relief', 'Asset Protection'],
      'Estate Planning': ['Estate Planning', 'Wills & Trusts', 'Probate Law', 'Elder Law', 'Asset Protection', 'Estate Administration'],
      'Intellectual Property': ['Patent Law', 'Trademark Law', 'Copyright Law', 'Trade Secrets', 'IP Litigation', 'Licensing Agreements'],
      'Workers Comp': ['Workers Compensation', 'Workplace Injuries', 'Disability Claims', 'Occupational Diseases', 'Workers Rights', 'Compensation Appeals'],
      'Medical Malpractice': ['Medical Malpractice', 'Hospital Negligence', 'Surgical Errors', 'Misdiagnosis', 'Birth Injuries', 'Nursing Home Abuse'],
      'Securities': ['Securities Law', 'Investment Fraud', 'Stock Market Law', 'SEC Compliance', 'Corporate Finance', 'Investment Disputes'],
      'Patent': ['Patent Applications', 'Patent Prosecution', 'Patent Litigation', 'Patent Strategy', 'Prior Art Search', 'Patent Portfolio Management'],
      'Trademark': ['Trademark Registration', 'Trademark Protection', 'Trademark Disputes', 'Brand Protection', 'Trademark Licensing', 'Domain Name Disputes'],
      'Copyright': ['Copyright Registration', 'Copyright Infringement', 'Digital Rights', 'Entertainment Law', 'Publishing Rights', 'Fair Use Defense'],
      'Corporate': ['Corporate Law', 'Business Formation', 'Corporate Governance', 'Compliance', 'Corporate Transactions', 'Board Advisory'],
      'Insurance': ['Insurance Law', 'Insurance Claims', 'Bad Faith Insurance', 'Insurance Coverage', 'Insurance Disputes', 'Policy Analysis'],
      'Healthcare': ['Healthcare Law', 'Medical Compliance', 'HIPAA Compliance', 'Healthcare Transactions', 'Medical Licensing', 'Healthcare Litigation'],
      'Construction': ['Construction Law', 'Construction Contracts', 'Construction Disputes', 'Mechanic Liens', 'Construction Defects', 'Building Code Compliance'],
      'Entertainment': ['Entertainment Law', 'Media Law', 'Sports Law', 'Contract Negotiations', 'Intellectual Property', 'Talent Representation'],
      'Sports': ['Sports Law', 'Athlete Representation', 'Sports Contracts', 'Sports Litigation', 'League Compliance', 'Endorsement Deals'],
      'Education': ['Education Law', 'School District Law', 'Student Rights', 'Special Education', 'Title IX', 'Academic Freedom']
    };
    return categoryServiceMap[categoryName] || [];
  };

  // Get service objects for home page display
  const getServiceObjectsForCategory = (categoryName) => {
    const categoryServiceMap = {
      'Property': [
        { name: 'Property Law', icon: 'PROPERTY', description: 'Buy/Sell Property' },
        { name: 'Real Estate Transactions', icon: 'HOUSE', description: 'Property Sales' },
        { name: 'Landlord-Tenant Disputes', icon: 'BUILDING', description: 'Rental Issues' },
        { name: 'Property Development', icon: 'TOOLS', description: 'Development Law' },
        { name: 'Zoning & Land Use', icon: 'ZONE', description: 'Land Use Planning' },
        { name: 'Property Tax Appeals', icon: 'TAX', description: 'Tax Issues' }
      ],
      'Criminal': [
        { name: 'Criminal Defense', icon: 'CRIMINAL', description: 'Criminal Cases' },
        { name: 'DUI Defense', icon: 'CAR', description: 'Drunk Driving' },
        { name: 'Traffic Violations', icon: 'TICKET', description: 'Traffic Tickets' },
        { name: 'White Collar Crime', icon: 'BRIEFCASE', description: 'Financial Crimes' },
        { name: 'Drug Crimes', icon: 'PILL', description: 'Drug Offenses' },
        { name: 'Assault & Battery', icon: 'SHIELD', description: 'Violence Cases' }
      ],
      'Tax': [
        { name: 'Tax Law', icon: 'TAX', description: 'Tax Returns' },
        { name: 'Tax Planning', icon: 'CHART', description: 'Tax Strategy' },
        { name: 'Tax Disputes', icon: 'SCALE', description: 'IRS Issues' },
        { name: 'IRS Audits', icon: 'SEARCH', description: 'Audit Defense' },
        { name: 'Tax Appeals', icon: 'COURT', description: 'Appeal Process' },
        { name: 'Business Taxes', icon: 'BUILDING', description: 'Corporate Tax' }
      ],
      'Family': [
        { name: 'Family Law', icon: 'FAMILY', description: 'Family Matters' },
        { name: 'Divorce', icon: 'HEART', description: 'Marriage Dissolution' },
        { name: 'Child Custody', icon: 'CHILD', description: 'Custody Rights' },
        { name: 'Child Support', icon: 'MONEY', description: 'Child Support' },
        { name: 'Alimony', icon: 'MONEY', description: 'Spousal Support' },
        { name: 'Adoption', icon: 'FAMILY', description: 'Adoption Process' }
      ],
      'Business': [
        { name: 'Business Formation', icon: 'BUILDING', description: 'Start a Business' },
        { name: 'Contract Law', icon: 'DOC', description: 'Business Contracts' },
        { name: 'Corporate Governance', icon: 'BUILDING', description: 'Board Management' },
        { name: 'Mergers & Acquisitions', icon: 'HANDSHAKE', description: 'Business Sales' },
        { name: 'Securities Law', icon: 'CHART', description: 'Investment Law' },
        { name: 'Commercial Litigation', icon: 'SCALE', description: 'Business Disputes' }
      ],
      'Personal Injury': [
        { name: 'Personal Injury', icon: 'MEDICAL', description: 'Injury Claims' },
        { name: 'Car Accidents', icon: 'CAR', description: 'Auto Accidents' },
        { name: 'Motorcycle Accidents', icon: 'CAR', description: 'Bike Accidents' },
        { name: 'Truck Accidents', icon: 'CAR', description: 'Truck Crashes' },
        { name: 'Slip & Fall', icon: 'WARNING', description: 'Premises Liability' },
        { name: 'Medical Malpractice', icon: 'MEDICAL', description: 'Medical Errors' }
      ],
      'Immigration': [
        { name: 'Immigration Law', icon: 'GLOBE', description: 'Immigration Matters' },
        { name: 'Visa Applications', icon: 'GLOBE', description: 'Work & Travel Visas' },
        { name: 'Green Card', icon: 'CARD', description: 'Permanent Residency' },
        { name: 'Citizenship', icon: 'FLAG', description: 'Naturalization' },
        { name: 'Deportation Defense', icon: 'SHIELD', description: 'Removal Proceedings' },
        { name: 'Asylum', icon: 'PROTECTION', description: 'Refugee Status' }
      ],
      'Divorce': [
        { name: 'Divorce', icon: 'HEART', description: 'Marriage Dissolution' },
        { name: 'Child Custody', icon: 'CHILD', description: 'Custody Rights' },
        { name: 'Child Support', icon: 'MONEY', description: 'Child Support' },
        { name: 'Alimony', icon: 'MONEY', description: 'Spousal Support' },
        { name: 'Prenuptial Agreements', icon: 'DOC', description: 'Pre-marriage Contract' },
        { name: 'Domestic Partnerships', icon: 'PEOPLE', description: 'Partnership Law' }
      ],
      'DUI': [
        { name: 'DUI Defense', icon: 'CAR', description: 'Drunk Driving Defense' },
        { name: 'Traffic Violations', icon: 'TICKET', description: 'Traffic Tickets' },
        { name: 'Criminal Defense', icon: 'CRIMINAL', description: 'Criminal Cases' },
        { name: 'License Suspension', icon: 'LICENSE', description: 'License Issues' },
        { name: 'Field Sobriety Tests', icon: 'TEST', description: 'Sobriety Testing' },
        { name: 'Breathalyzer Tests', icon: 'BREATH', description: 'BAC Testing' }
      ],
      'Employment': [
        { name: 'Employment Law', icon: 'BRIEFCASE', description: 'Workplace Law' },
        { name: 'Discrimination', icon: 'PEOPLE', description: 'Workplace Discrimination' },
        { name: 'Harassment', icon: 'SHIELD', description: 'Workplace Harassment' },
        { name: 'Wrongful Termination', icon: 'BRIEFCASE', description: 'Unlawful Firing' },
        { name: 'Wage & Hour', icon: 'CLOCK', description: 'Pay Issues' },
        { name: 'Workplace Safety', icon: 'SHIELD', description: 'Safety Violations' }
      ],
      'Real Estate': [
        { name: 'Real Estate Transactions', icon: 'HOUSE', description: 'Property Sales' },
        { name: 'Property Law', icon: 'PROPERTY', description: 'Property Matters' },
        { name: 'Commercial Leasing', icon: 'BUILDING', description: 'Business Leases' },
        { name: 'Residential Leasing', icon: 'HOME', description: 'Rental Properties' },
        { name: 'Property Management', icon: 'SETTINGS', description: 'Property Oversight' },
        { name: 'Real Estate Litigation', icon: 'SCALE', description: 'Property Disputes' }
      ],
      'Contract': [
        { name: 'Contract Law', icon: 'DOC', description: 'Contract Matters' },
        { name: 'Business Contracts', icon: 'BRIEFCASE', description: 'Business Agreements' },
        { name: 'Employment Contracts', icon: 'PEOPLE', description: 'Work Agreements' },
        { name: 'Service Agreements', icon: 'HANDSHAKE', description: 'Service Contracts' },
        { name: 'Contract Disputes', icon: 'SCALE', description: 'Contract Conflicts' },
        { name: 'Contract Review', icon: 'SEARCH', description: 'Contract Analysis' }
      ]
    };
    return categoryServiceMap[categoryName] || [];
  };

  const autoFillLawFirmForm = () => {
    const fullName = `${registerForm.firstName} ${registerForm.lastName}`.trim();
    setLawFirmForm(prev => ({
      ...prev,
      organizationName: fullName || prev.organizationName,
      phone: registerForm.phone || prev.phone,
      email: registerForm.email || prev.email
    }));
  };

  const renderCategoriesScreen = () => {
    const popularCategories = [
      { name: 'Property', icon: 'PROPERTY' },
      { name: 'Criminal', icon: 'CRIMINAL' },
      { name: 'Tax', icon: 'TAX' },
      { name: 'Family', icon: 'FAMILY_LAW' },
      { name: 'Business', icon: 'BUSINESS' },
      { name: 'Personal Injury', icon: 'PERSONAL_INJURY' },
      { name: 'Immigration', icon: 'GLOBE' },
      { name: 'Divorce', icon: 'HEART' },
      { name: 'DUI', icon: 'CAR' },
      { name: 'Employment', icon: 'BRIEFCASE' },
      { name: 'Real Estate', icon: 'HOUSE' },
      { name: 'Contract', icon: 'DOC' }
    ];

    const popularServices = [
      { name: 'Property Law', icon: 'PROPERTY' },
      { name: 'Criminal Defense', icon: 'CRIMINAL' },
      { name: 'Tax Law', icon: 'TAX' },
      { name: 'Family Law', icon: 'FAMILY_LAW' },
      { name: 'Business Formation', icon: 'BUSINESS' },
      { name: 'Personal Injury', icon: 'PERSONAL_INJURY' },
      { name: 'Immigration Law', icon: 'GLOBE' },
      { name: 'Divorce', icon: 'HEART' },
      { name: 'DUI Defense', icon: 'CAR' },
      { name: 'Employment Law', icon: 'BRIEFCASE' },
      { name: 'Real Estate Transactions', icon: 'HOUSE' },
      { name: 'Contract Law', icon: 'DOC' }
    ];

    const currentPopularItems = userRole === 'USER' ? popularCategories : popularServices;


  const addLawyerToDirectory = () => {
    const lawyerData = {
      name: `${registerForm.firstName} ${registerForm.lastName}`.trim() || 'New Lawyer',
      specialty: selectedServices.length > 0 ? selectedServices[0] : 'Legal Professional',
      rating: '5.0',
      avatar: null,
      profileImage: userProfile.profilePicture || require('./assets/images/lawyer/lawyer1.png'),
      phone: registerForm.phone || userProfile.phone,
      email: registerForm.email || userProfile.email,
      services: selectedServices,
      isNewRegistration: true
    };

    setRegisteredLawyers(prev => [lawyerData, ...prev]);
    };

    const handleProceed = () => {
    const selectedItems = userRole === 'USER' ? selectedCategories : selectedServices;
    const itemType = userRole === 'USER' ? 'categories' : 'services';
    
    if (selectedItems.length === 0) {
        showCustomAlert(
          'warning',
        `No ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Selected`,
        `Please select at least one ${itemType.slice(0, -1)} to ${userRole === 'USER' ? 'get personalized lawyer recommendations' : 'connect with potential clients'}.`,
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

    // If user is registering as a lawyer, add them to the directory
    if (userRole === 'LAWYER') {
      addLawyerToDirectory();
      }

      showCustomAlert(
        'success',
      `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Selected!`,
      `Great! You've selected ${selectedItems.length} ${itemType}. ${userRole === 'USER' ? "We'll show you the best lawyers for your needs." : userRole === 'LAWYER' ? "You are now registered as a lawyer and will appear in the directory." : "You can now connect with potential clients."}`,
        [
          {
            text: 'Continue',
            style: 'primary',
            onPress: () => setCurrentScreen('home')
          }
        ]
      );
    };

    const handleSeeAllCategories = () => {
      setShowSeeAllCategoriesSelection(true);
    };

    // Split items into two rows for horizontal slider
    const firstRowItems = currentPopularItems.slice(0, 6);
    const secondRowItems = currentPopularItems.slice(6, 12);

    const renderCategorySlider = (items, rowIndex) => (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categorySliderRow}
        contentContainerStyle={styles.categorySliderContent}
      >
        {items.map((item, index) => {
          const isSelected = userRole === 'USER' 
            ? selectedCategories.includes(item.name)
            : selectedServices.includes(item.name);
          return (
            <TouchableOpacity
              key={`${rowIndex}-${index}`}
              style={[
                styles.categorySliderCard,
                isSelected && styles.activeCategorySliderCard,
                index === 0 && { marginLeft: 12 } // Add left margin to first card
              ]}
              onPress={() => toggleCategory(item.name)}
            >
              <View style={[
                styles.categorySliderIconContainer,
                isSelected && styles.activeCategorySliderIconContainer
              ]}>
                      <ProfessionalIcon 
                        type={item.icon} 
                        size={16} 
                        color={isSelected ? '#ffffff' : '#2E4A6B'} 
                      />
              </View>
              <Text style={[
                styles.categorySliderText,
                isSelected && styles.activeCategorySliderText
              ]}>
                      {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );

    return (
    <View style={styles.categoriesContainer}>
      <StatusBar style="dark" />
      
      <View style={styles.categoriesHeader}>
          <TouchableOpacity onPress={() => setCurrentScreen('login')} style={styles.backButton}>
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Role Selection</Text>
          <View style={styles.headerPlaceholder} />
      </View>

        <ScrollView style={styles.categoriesScrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.categoriesContent}>
            {/* Role Selection Bar */}
            <View style={styles.roleSelectionBar}>
              <TouchableOpacity 
                style={[styles.roleButton, userRole === 'USER' && styles.activeRoleButton]}
                onPress={() => setUserRole('USER')}
              >
                <Text style={[styles.roleButtonText, userRole === 'USER' && styles.activeRoleButtonText]}>
                  USER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.roleButton, userRole === 'LAWYER' && styles.activeRoleButton]}
                onPress={() => setUserRole('LAWYER')}
              >
                <Text style={[styles.roleButtonText, userRole === 'LAWYER' && styles.activeRoleButtonText]}>
                  LAWYER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.roleButton, userRole === 'LAW_FIRM' && styles.activeRoleButton]}
                onPress={() => {
                  setUserRole('LAW_FIRM');
                  setCurrentScreen('lawFirmRegistration');
                }}
              >
                <Text style={[styles.roleButtonText, userRole === 'LAW_FIRM' && styles.activeRoleButtonText]}>
                  LAW FIRM
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.categoriesTitle}>
              {userRole === 'USER' ? 'Choose Categories' : 'Choose Services'}
            </Text>
        <Text style={styles.categoriesSubtitle}>
              {userRole === 'USER' 
                ? 'Select your areas of interest to get personalized lawyer recommendations'
                : 'Select the services you offer to connect with potential clients'
              }
        </Text>

            <View style={styles.categoriesSliderContainer}>
              <View style={styles.categoriesSliderHeader}>
                <Text style={styles.categoriesSliderTitle}>
                  {userRole === 'USER' ? 'Popular Categories' : 'Popular Services'}
                </Text>
                <TouchableOpacity onPress={handleSeeAllCategories}>
                  <Text style={styles.seeAllButton}>See All</Text>
                </TouchableOpacity>
              </View>
              
              {renderCategorySlider(firstRowItems, 0)}
              {renderCategorySlider(secondRowItems, 1)}
            </View>

            <View style={styles.messageSection}>
              <View style={styles.messageSectionHeader}>
                <Text style={styles.messageTitle}>
                  Still Confused? <Text style={styles.optional}>(optional)</Text>
                </Text>
                <Text style={styles.messageSubtitle}>
                  Describe your legal issue and we'll help you find the right lawyer
                </Text>
              </View>
              
              <View style={styles.messageInputSection}>
                <Text style={styles.messageLabel}>Your Message</Text>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Describe your legal situation here..."
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <Text style={styles.messageHint}>
                  Share details about your legal concern to get better recommendations
                </Text>
              </View>
            </View>

            {(userRole === 'USER' ? selectedCategories.length > 0 : selectedServices.length > 0) && (
              <View style={styles.selectedCategoriesInfo}>
                <Text style={styles.selectedCategoriesTitle}>
                  {userRole === 'USER' 
                    ? `Selected Categories (${selectedCategories.length})`
                    : `Selected Services (${selectedServices.length})`
                  }
                </Text>
                <View style={styles.selectedCategoriesList}>
                  {(userRole === 'USER' ? selectedCategories : selectedServices).map((item, index) => (
                    <View key={index} style={styles.selectedCategoryTag}>
                      <Text style={styles.selectedCategoryTagText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.categoriesFooter}>
          <TouchableOpacity 
            style={[
              styles.proceedBtn,
              (userRole === 'USER' ? selectedCategories.length === 0 : selectedServices.length === 0) && styles.proceedBtnDisabled
            ]}
            onPress={handleProceed}
          >
            <Text style={[
              styles.proceedText,
              (userRole === 'USER' ? selectedCategories.length === 0 : selectedServices.length === 0) && styles.proceedTextDisabled
            ]}>
              Continue ({(userRole === 'USER' ? selectedCategories.length : selectedServices.length)} selected)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLawFirmRegistrationScreen = () => {
    const handleLawFirmFieldChange = (field, value) => {
      setLawFirmForm(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleLawFirmProceed = () => {
      if (!lawFirmForm.organizationName.trim()) {
        showCustomAlert(
          'warning',
          'Missing Information',
          'Please enter your organization name.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      if (selectedCategories.length === 0) {
        showCustomAlert(
          'warning',
          'No Categories Selected',
          'Please select at least one category to define your law firm\'s practice areas.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      showCustomAlert(
        'success',
        'Law Firm Registration Complete!',
        `Great! Your law firm "${lawFirmForm.organizationName}" has been registered with ${selectedCategories.length} practice areas and ${selectedServices.length} services.`,
        [
          {
            text: 'Continue',
            style: 'primary',
            onPress: () => setCurrentScreen('home')
          }
        ]
      );
    };

    const popularCategories = [
      { name: 'Property', icon: 'PROPERTY' },
      { name: 'Criminal', icon: 'CRIMINAL' },
      { name: 'Tax', icon: 'TAX' },
      { name: 'Family', icon: 'FAMILY_LAW' },
      { name: 'Business', icon: 'BUSINESS' },
      { name: 'Personal Injury', icon: 'PERSONAL_INJURY' },
      { name: 'Immigration', icon: 'GLOBE' },
      { name: 'Divorce', icon: 'HEART' },
      { name: 'DUI', icon: 'CAR' },
      { name: 'Employment', icon: 'BRIEFCASE' },
      { name: 'Real Estate', icon: 'HOUSE' },
      { name: 'Contract', icon: 'DOC' }
    ];

    const firstRowCategories = popularCategories.slice(0, 6);
    const secondRowCategories = popularCategories.slice(6, 12);

    const renderCategorySlider = (categories, rowIndex) => (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categorySliderRow}
        contentContainerStyle={[styles.categorySliderContent, { paddingLeft: 0 }]} // No extra padding for law firm
      >
        {categories.map((category, index) => {
          const isSelected = selectedCategories.includes(category.name);
          return (
            <TouchableOpacity
              key={`${rowIndex}-${index}`}
              style={[
                styles.categorySliderCard,
                isSelected && styles.activeCategorySliderCard,
                { width: 103}, // Smaller width specifically for Law Firm registration
                index === 0 && { marginLeft: 0 } // No margin for law firm since container has padding
              ]}
              onPress={() => toggleCategory(category.name)}
            >
              <View style={[
                styles.categorySliderIconContainer,
                isSelected && styles.activeCategorySliderIconContainer
              ]}>
                <ProfessionalIcon 
                  type={category.icon} 
                  size={16} 
                  color={isSelected ? '#ffffff' : '#2E4A6B'} 
                />
              </View>
              <Text style={[
                styles.categorySliderText,
                isSelected && styles.activeCategorySliderText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );

    return (
      <View style={styles.categoriesContainer}>
        <StatusBar style="dark" />
        
        <View style={styles.categoriesHeader}>
          <TouchableOpacity onPress={() => setCurrentScreen('login')} style={styles.backButton}>
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Registration</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView style={styles.categoriesScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesContent}>
            {/* Role Selection Bar */}
            <View style={styles.roleSelectionBar}>
              <TouchableOpacity 
                style={[styles.roleButton, userRole === 'USER' && styles.activeRoleButton]}
                onPress={() => {
                  setUserRole('USER');
                  setCurrentScreen('categories');
                }}
              >
                <Text style={[styles.roleButtonText, userRole === 'USER' && styles.activeRoleButtonText]}>
                  USER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.roleButton, userRole === 'LAWYER' && styles.activeRoleButton]}
                onPress={() => {
                  setUserRole('LAWYER');
                  setCurrentScreen('categories');
                }}
              >
                <Text style={[styles.roleButtonText, userRole === 'LAWYER' && styles.activeRoleButtonText]}>
                  LAWYER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.roleButton, userRole === 'LAW_FIRM' && styles.activeRoleButton]}
                onPress={() => setUserRole('LAW_FIRM')}
              >
                <Text style={[styles.roleButtonText, userRole === 'LAW_FIRM' && styles.activeRoleButtonText]}>
                  LAW FIRM
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.categoriesTitle}>Law Firm Registration</Text>
            <Text style={styles.categoriesSubtitle}>
              Complete your organization details and select your practice areas
            </Text>
            {/* Organization Registration Card */}
            <View style={styles.lawFirmRegistrationCard}>
              <View style={styles.lawFirmCardHeader}>
                <View style={styles.lawFirmCardIcon}>
                  <ProfessionalIcon type="BUILDING" size={24} color="#2E4A6B" />
                </View>
                <Text style={styles.lawFirmCardTitle}>Organization Details</Text>
              </View>
              
              <View style={styles.lawFirmForm}>
                <View style={styles.lawFirmFieldContainer}>
                  <Text style={styles.lawFirmFieldLabel}>Organization Name *</Text>
                  <TextInput
                    style={styles.lawFirmInput}
                    value={lawFirmForm.organizationName}
                    onChangeText={(value) => handleLawFirmFieldChange('organizationName', value)}
                    placeholder="Enter your law firm name"
                    placeholderTextColor="#adb5bd"
                  />
                </View>

                <View style={styles.lawFirmFieldContainer}>
                  <Text style={styles.lawFirmFieldLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.lawFirmInput}
                    value={lawFirmForm.phone}
                    onChangeText={(value) => handleLawFirmFieldChange('phone', value)}
                    placeholder="Enter phone number"
                    placeholderTextColor="#adb5bd"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.lawFirmFieldContainer}>
                  <Text style={styles.lawFirmFieldLabel}>Email Address</Text>
                  <TextInput
                    style={styles.lawFirmInput}
                    value={lawFirmForm.email}
                    onChangeText={(value) => handleLawFirmFieldChange('email', value)}
                    placeholder="Enter email address"
                    placeholderTextColor="#adb5bd"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.lawFirmFieldContainer}>
                  <Text style={styles.lawFirmFieldLabel}>Address</Text>
                  <TextInput
                    style={styles.lawFirmInput}
                    value={lawFirmForm.address}
                    onChangeText={(value) => handleLawFirmFieldChange('address', value)}
                    placeholder="Enter office address"
                    placeholderTextColor="#adb5bd"
                    multiline
                    numberOfLines={2}
                  />
                </View>

                <View style={styles.lawFirmFieldContainer}>
                  <Text style={styles.lawFirmFieldLabel}>Website</Text>
                  <TextInput
                    style={styles.lawFirmInput}
                    value={lawFirmForm.website}
                    onChangeText={(value) => handleLawFirmFieldChange('website', value)}
                    placeholder="Enter website URL"
                    placeholderTextColor="#adb5bd"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.lawFirmFieldContainer}>
                  <Text style={styles.lawFirmFieldLabel}>Description</Text>
                  <TextInput
                    style={[styles.lawFirmInput, styles.lawFirmTextArea]}
                    value={lawFirmForm.description}
                    onChangeText={(value) => handleLawFirmFieldChange('description', value)}
                    placeholder="Brief description of your law firm"
                    placeholderTextColor="#adb5bd"
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </View>
            </View>

            {/* Practice Areas Selection */}
            <View style={styles.lawFirmPracticeAreas}>
              <Text style={styles.lawFirmSectionTitle}>Practice Areas</Text>
              <Text style={styles.lawFirmSectionSubtitle}>
                Select your practice areas. Each category includes 6 related services.
              </Text>

              <View style={styles.lawFirmCategoriesSlider}>
                <View style={styles.lawFirmCategoriesSliderHeader}>
                  <Text style={styles.lawFirmCategoriesSliderTitle}>Popular Categories</Text>
                  <TouchableOpacity onPress={() => setShowSeeAllCategoriesSelection(true)}>
                    <Text style={styles.seeAllButton}>See All</Text>
                  </TouchableOpacity>
                </View>
                
                {renderCategorySlider(firstRowCategories, 0)}
                {renderCategorySlider(secondRowCategories, 1)}
              </View>

              {/* Selected Categories and Services Display */}
              {selectedCategories.length > 0 && (
                <View style={styles.lawFirmSelectedInfo}>
                  <Text style={styles.lawFirmSelectedTitle}>
                    Selected Practice Areas ({selectedCategories.length})
                  </Text>
                  <View style={styles.lawFirmSelectedList}>
                    {selectedCategories.map((category, index) => (
                      <View key={index} style={styles.lawFirmSelectedTag}>
                        <Text style={styles.lawFirmSelectedTagText}>{category}</Text>
                        <TouchableOpacity 
                          onPress={() => toggleCategory(category)}
                          style={styles.lawFirmRemoveButton}
                        >
                          <ProfessionalIcon type="CLOSE" size={12} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {selectedServices.length > 0 && (
                <View style={styles.lawFirmSelectedInfo}>
                  <Text style={styles.lawFirmSelectedTitle}>
                    Related Services ({selectedServices.length})
                  </Text>
                  <View style={styles.lawFirmSelectedList}>
                    {selectedServices.map((service, index) => (
                      <View key={index} style={styles.lawFirmServiceTag}>
                        <Text style={styles.lawFirmServiceTagText}>{service}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.categoriesFooter}>
          <TouchableOpacity 
            style={[
              styles.proceedBtn,
              (!lawFirmForm.organizationName.trim() || selectedCategories.length === 0) && styles.proceedBtnDisabled
            ]}
            onPress={handleLawFirmProceed}
          >
            <Text style={[
              styles.proceedText,
              (!lawFirmForm.organizationName.trim() || selectedCategories.length === 0) && styles.proceedTextDisabled
            ]}>
              Complete Registration ({selectedCategories.length} areas, {selectedServices.length} services)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSeeAllCategoriesSelectionScreen = () => {
    const allCategories = [
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
      { name: 'Corporate', icon: 'BUILDING' },
      { name: 'Insurance', icon: 'SHIELD' },
      { name: 'Healthcare', icon: 'MEDICAL' },
      { name: 'Construction', icon: 'TOOLS' },
      { name: 'Entertainment', icon: 'STAR' },
      { name: 'Sports', icon: 'FITNESS' },
      { name: 'Education', icon: 'BOOK' }
    ];

    const allServices = [
      // Property & Real Estate Services
      { name: 'Property Law', icon: 'PROPERTY' },
      { name: 'Real Estate Transactions', icon: 'HOUSE' },
      { name: 'Landlord-Tenant Disputes', icon: 'BUILDING' },
      { name: 'Property Development', icon: 'TOOLS' },
      { name: 'Zoning & Land Use', icon: 'MAP' },
      { name: 'Eminent Domain', icon: 'GOVERNMENT' },
      { name: 'Property Tax Appeals', icon: 'TAX' },
      { name: 'Commercial Leasing', icon: 'BRIEFCASE' },
      { name: 'Residential Leasing', icon: 'HOME' },
      { name: 'Property Management', icon: 'SETTINGS' },
      
      // Criminal Law Services
      { name: 'Criminal Defense', icon: 'CRIMINAL' },
      { name: 'DUI Defense', icon: 'CAR' },
      { name: 'Traffic Violations', icon: 'ROAD' },
      { name: 'White Collar Crime', icon: 'BRIEFCASE' },
      { name: 'Drug Crimes', icon: 'MEDICAL' },
      { name: 'Assault & Battery', icon: 'WARNING' },
      { name: 'Theft & Fraud', icon: 'MONEY' },
      { name: 'Domestic Violence', icon: 'HEART' },
      { name: 'Juvenile Crime', icon: 'CHILD' },
      { name: 'Appeals & Post-Conviction', icon: 'COURT' },
      
      // Family Law Services
      { name: 'Divorce', icon: 'HEART' },
      { name: 'Child Custody', icon: 'CHILD' },
      { name: 'Child Support', icon: 'MONEY' },
      { name: 'Alimony', icon: 'MONEY' },
      { name: 'Adoption', icon: 'FAMILY' },
      { name: 'Prenuptial Agreements', icon: 'DOC' },
      { name: 'Domestic Partnerships', icon: 'PEOPLE' },
      { name: 'Paternity', icon: 'CHILD' },
      { name: 'Guardianship', icon: 'CHILD' },
      { name: 'Elder Law', icon: 'PEOPLE' },
      
      // Business & Corporate Services
      { name: 'Business Formation', icon: 'BUILDING' },
      { name: 'Contract Law', icon: 'DOC' },
      { name: 'Corporate Governance', icon: 'BUILDING' },
      { name: 'Mergers & Acquisitions', icon: 'MERGE' },
      { name: 'Securities Law', icon: 'CHART' },
      { name: 'Commercial Litigation', icon: 'COURT' },
      { name: 'Franchise Law', icon: 'STORE' },
      { name: 'Partnership Agreements', icon: 'PEOPLE' },
      { name: 'Employment Contracts', icon: 'BRIEFCASE' },
      { name: 'Business Disputes', icon: 'COURT' },
      
      // Personal Injury Services
      { name: 'Car Accidents', icon: 'CAR' },
      { name: 'Motorcycle Accidents', icon: 'BIKE' },
      { name: 'Truck Accidents', icon: 'TRUCK' },
      { name: 'Slip & Fall', icon: 'WARNING' },
      { name: 'Medical Malpractice', icon: 'MEDICAL' },
      { name: 'Product Liability', icon: 'PACKAGE' },
      { name: 'Workers Compensation', icon: 'TOOLS' },
      { name: 'Wrongful Death', icon: 'HEART' },
      { name: 'Brain Injuries', icon: 'MEDICAL' },
      { name: 'Spinal Cord Injuries', icon: 'MEDICAL' },
      
      // Immigration Services
      { name: 'Immigration Law', icon: 'GLOBE' },
      { name: 'Visa Applications', icon: 'PASSPORT' },
      { name: 'Green Card', icon: 'CARD' },
      { name: 'Citizenship', icon: 'FLAG' },
      { name: 'Deportation Defense', icon: 'COURT' },
      { name: 'Asylum', icon: 'SAFE' },
      { name: 'Work Permits', icon: 'BRIEFCASE' },
      { name: 'Family Immigration', icon: 'FAMILY' },
      { name: 'Business Immigration', icon: 'BUILDING' },
      { name: 'Student Visas', icon: 'BOOK' },
      
      // Tax Services
      { name: 'Tax Law', icon: 'TAX' },
      { name: 'Tax Planning', icon: 'CALENDAR' },
      { name: 'Tax Disputes', icon: 'COURT' },
      { name: 'IRS Audits', icon: 'SEARCH' },
      { name: 'Tax Appeals', icon: 'COURT' },
      { name: 'Business Taxes', icon: 'BRIEFCASE' },
      { name: 'Estate Tax', icon: 'WILL' },
      { name: 'International Tax', icon: 'GLOBE' },
      { name: 'Tax Compliance', icon: 'CHECK' },
      { name: 'Tax Litigation', icon: 'COURT' },
      
      // Employment Services
      { name: 'Employment Law', icon: 'BRIEFCASE' },
      { name: 'Discrimination', icon: 'PEOPLE' },
      { name: 'Harassment', icon: 'WARNING' },
      { name: 'Wrongful Termination', icon: 'CANCEL' },
      { name: 'Wage & Hour', icon: 'MONEY' },
      { name: 'Workplace Safety', icon: 'SHIELD' },
      { name: 'Labor Relations', icon: 'PEOPLE' },
      { name: 'Non-Compete', icon: 'DOC' },
      { name: 'Severance Agreements', icon: 'DOC' },
      { name: 'Employment Contracts', icon: 'DOC' },
      
      // Intellectual Property Services
      { name: 'Patent Law', icon: 'LIGHTBULB' },
      { name: 'Trademark Law', icon: 'TM' },
      { name: 'Copyright Law', icon: 'COPY' },
      { name: 'Trade Secrets', icon: 'LOCK' },
      { name: 'IP Litigation', icon: 'COURT' },
      { name: 'IP Licensing', icon: 'DOC' },
      { name: 'IP Portfolio Management', icon: 'FOLDER' },
      { name: 'IP Due Diligence', icon: 'SEARCH' },
      { name: 'IP Enforcement', icon: 'SHIELD' },
      { name: 'IP Strategy', icon: 'CHART' },
      
      // Estate Planning Services
      { name: 'Estate Planning', icon: 'WILL' },
      { name: 'Wills & Trusts', icon: 'DOC' },
      { name: 'Probate', icon: 'COURT' },
      { name: 'Estate Administration', icon: 'FOLDER' },
      { name: 'Power of Attorney', icon: 'DOC' },
      { name: 'Living Wills', icon: 'DOC' },
      { name: 'Charitable Giving', icon: 'HEART' },
      { name: 'Asset Protection', icon: 'SHIELD' },
      { name: 'Estate Tax Planning', icon: 'TAX' },
      { name: 'Business Succession', icon: 'BUILDING' },
      
      // Bankruptcy Services
      { name: 'Bankruptcy Law', icon: 'BRIEFCASE' },
      { name: 'Chapter 7', icon: 'DOC' },
      { name: 'Chapter 11', icon: 'DOC' },
      { name: 'Chapter 13', icon: 'DOC' },
      { name: 'Debt Relief', icon: 'MONEY' },
      { name: 'Creditor Rights', icon: 'MONEY' },
      { name: 'Foreclosure Defense', icon: 'HOUSE' },
      { name: 'Debt Negotiation', icon: 'MONEY' },
      { name: 'Credit Repair', icon: 'CARD' },
      { name: 'Business Bankruptcy', icon: 'BUILDING' },
      
      // Environmental Services
      { name: 'Environmental Law', icon: 'LEAF' },
      { name: 'Environmental Compliance', icon: 'CHECK' },
      { name: 'Environmental Litigation', icon: 'COURT' },
      { name: 'Clean Air Act', icon: 'LEAF' },
      { name: 'Clean Water Act', icon: 'WATER' },
      { name: 'CERCLA/Superfund', icon: 'WARNING' },
      { name: 'Environmental Permits', icon: 'DOC' },
      { name: 'Environmental Due Diligence', icon: 'SEARCH' },
      { name: 'Climate Change Law', icon: 'LEAF' },
      { name: 'Renewable Energy', icon: 'LIGHTBULB' },
      
      // Healthcare Services
      { name: 'Healthcare Law', icon: 'MEDICAL' },
      { name: 'HIPAA Compliance', icon: 'SHIELD' },
      { name: 'Medical Licensing', icon: 'DOC' },
      { name: 'Healthcare Contracts', icon: 'DOC' },
      { name: 'Healthcare Litigation', icon: 'COURT' },
      { name: 'Healthcare Fraud', icon: 'WARNING' },
      { name: 'Pharmaceutical Law', icon: 'MEDICAL' },
      { name: 'Telemedicine Law', icon: 'MEDICAL' },
      { name: 'Healthcare Privacy', icon: 'LOCK' },
      { name: 'Healthcare Regulation', icon: 'GOVERNMENT' },
      
      // Technology Services
      { name: 'Technology Law', icon: 'COMPUTER' },
      { name: 'Cybersecurity Law', icon: 'SHIELD' },
      { name: 'Data Privacy', icon: 'LOCK' },
      { name: 'Software Licensing', icon: 'DOC' },
      { name: 'IT Contracts', icon: 'DOC' },
      { name: 'E-commerce Law', icon: 'STORE' },
      { name: 'Social Media Law', icon: 'PEOPLE' },
      { name: 'Cloud Computing', icon: 'CLOUD' },
      { name: 'AI & Machine Learning', icon: 'ROBOT' },
      { name: 'Blockchain Law', icon: 'CHAIN' },
      
      // Entertainment Services
      { name: 'Entertainment Law', icon: 'STAR' },
      { name: 'Music Law', icon: 'MUSIC' },
      { name: 'Film & TV', icon: 'VIDEO' },
      { name: 'Publishing', icon: 'BOOK' },
      { name: 'Sports Law', icon: 'FITNESS' },
      { name: 'Gaming Law', icon: 'GAME' },
      { name: 'Celebrity Rights', icon: 'STAR' },
      { name: 'Entertainment Contracts', icon: 'DOC' },
      { name: 'Royalty Disputes', icon: 'MONEY' },
      { name: 'Entertainment Litigation', icon: 'COURT' },
      
      // Construction Services
      { name: 'Construction Law', icon: 'TOOLS' },
      { name: 'Construction Contracts', icon: 'DOC' },
      { name: 'Construction Defects', icon: 'WARNING' },
      { name: 'Mechanic\'s Liens', icon: 'MONEY' },
      { name: 'Construction Disputes', icon: 'COURT' },
      { name: 'Building Codes', icon: 'GOVERNMENT' },
      { name: 'Construction Safety', icon: 'SHIELD' },
      { name: 'Construction Insurance', icon: 'SHIELD' },
      { name: 'Construction Permits', icon: 'DOC' },
      { name: 'Construction Litigation', icon: 'COURT' },
      
      // Insurance Services
      { name: 'Insurance Law', icon: 'SHIELD' },
      { name: 'Insurance Claims', icon: 'MONEY' },
      { name: 'Insurance Disputes', icon: 'COURT' },
      { name: 'Bad Faith Insurance', icon: 'WARNING' },
      { name: 'Life Insurance', icon: 'HEART' },
      { name: 'Health Insurance', icon: 'MEDICAL' },
      { name: 'Auto Insurance', icon: 'CAR' },
      { name: 'Property Insurance', icon: 'HOUSE' },
      { name: 'Business Insurance', icon: 'BUILDING' },
      { name: 'Insurance Coverage', icon: 'SHIELD' },
      
      // Education Services
      { name: 'Education Law', icon: 'BOOK' },
      { name: 'Student Rights', icon: 'CHILD' },
      { name: 'Special Education', icon: 'CHILD' },
      { name: 'School Discipline', icon: 'WARNING' },
      { name: 'Title IX', icon: 'PEOPLE' },
      { name: 'Education Contracts', icon: 'DOC' },
      { name: 'Education Litigation', icon: 'COURT' },
      { name: 'Higher Education', icon: 'BOOK' },
      { name: 'Education Compliance', icon: 'CHECK' },
      { name: 'Education Policy', icon: 'GOVERNMENT' },
      
      // Government Services
      { name: 'Government Law', icon: 'GOVERNMENT' },
      { name: 'Administrative Law', icon: 'GOVERNMENT' },
      { name: 'Constitutional Law', icon: 'FLAG' },
      { name: 'Civil Rights', icon: 'PEOPLE' },
      { name: 'Voting Rights', icon: 'VOTE' },
      { name: 'Government Contracts', icon: 'DOC' },
      { name: 'Government Compliance', icon: 'CHECK' },
      { name: 'Government Litigation', icon: 'COURT' },
      { name: 'Public Policy', icon: 'GOVERNMENT' },
      { name: 'Regulatory Law', icon: 'GOVERNMENT' },
      
      // International Services
      { name: 'International Law', icon: 'GLOBE' },
      { name: 'International Trade', icon: 'SHIP' },
      { name: 'International Contracts', icon: 'DOC' },
      { name: 'International Disputes', icon: 'COURT' },
      { name: 'International Arbitration', icon: 'COURT' },
      { name: 'International Compliance', icon: 'CHECK' },
      { name: 'International Business', icon: 'BUILDING' },
      { name: 'International Tax', icon: 'TAX' },
      { name: 'International IP', icon: 'LIGHTBULB' },
      { name: 'International Litigation', icon: 'COURT' },
      
      // Aviation Services
      { name: 'Aviation Law', icon: 'PLANE' },
      { name: 'Aircraft Accidents', icon: 'PLANE' },
      { name: 'Aviation Regulation', icon: 'GOVERNMENT' },
      { name: 'Aviation Contracts', icon: 'DOC' },
      { name: 'Aviation Insurance', icon: 'SHIELD' },
      { name: 'Aviation Litigation', icon: 'COURT' },
      { name: 'Airport Law', icon: 'PLANE' },
      { name: 'Aviation Compliance', icon: 'CHECK' },
      { name: 'Aviation Safety', icon: 'SHIELD' },
      { name: 'Aviation Disputes', icon: 'COURT' },
      
      // Maritime Services
      { name: 'Maritime Law', icon: 'SHIP' },
      { name: 'Admiralty Law', icon: 'SHIP' },
      { name: 'Maritime Accidents', icon: 'SHIP' },
      { name: 'Maritime Contracts', icon: 'DOC' },
      { name: 'Maritime Insurance', icon: 'SHIELD' },
      { name: 'Maritime Litigation', icon: 'COURT' },
      { name: 'Cargo Disputes', icon: 'PACKAGE' },
      { name: 'Maritime Regulation', icon: 'GOVERNMENT' },
      { name: 'Maritime Compliance', icon: 'CHECK' },
      { name: 'Maritime Safety', icon: 'SHIELD' }
    ];

    const currentItems = (userRole === 'USER' || userRole === 'LAW_FIRM') ? allCategories : allServices;
    const currentSelections = (userRole === 'USER' || userRole === 'LAW_FIRM') ? selectedCategories : selectedServices;
    const itemType = (userRole === 'USER' || userRole === 'LAW_FIRM') ? 'Categories' : 'Services';
    const itemTypeSingular = (userRole === 'USER' || userRole === 'LAW_FIRM') ? 'Category' : 'Service';

    const handleBackToCategories = () => {
      setShowSeeAllCategoriesSelection(false);
      // For law firms, we stay on the law firm registration screen
      // For users/lawyers, we go back to categories screen
    };

    return (
      <View style={styles.seeAllCategoriesContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.seeAllCategoriesHeader}>
          <TouchableOpacity onPress={handleBackToCategories} style={styles.seeAllBackButton}>
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.seeAllCategoriesTitle}>All {itemType}</Text>
          <View style={styles.seeAllPlaceholder} />
        </View>

        <ScrollView style={styles.seeAllCategoriesScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.seeAllCategoriesContent}>
            <Text style={styles.seeAllSubtitle}>
              Select multiple {itemTypeSingular.toLowerCase()}s that interest you
            </Text>

            {/* Items Grid */}
            <View style={styles.seeAllCategoriesGrid}>
              {currentItems.map((item, index) => {
                const isSelected = currentSelections.includes(item.name);
  return (
              <TouchableOpacity
                key={index}
                style={[
                      styles.seeAllCategoryCard,
                      isSelected && styles.activeSeeAllCategoryCard
                    ]}
                    onPress={() => toggleCategory(item.name)}
                  >
                    <View style={[
                      styles.seeAllCategoryIconContainer,
                      isSelected && styles.activeSeeAllCategoryIconContainer
                    ]}>
                      <ProfessionalIcon 
                        type={item.icon} 
                        size={24} 
                        color={isSelected ? '#ffffff' : '#2E4A6B'} 
                      />
                    </View>
                <Text style={[
                      styles.seeAllCategoryText,
                      isSelected && styles.activeSeeAllCategoryText
                ]}>
                      {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

            {/* Selected Items Display */}
            {currentSelections.length > 0 && (
              <View style={styles.selectedCategoriesInfo}>
                <Text style={styles.selectedCategoriesTitle}>
                  Selected {itemType} ({currentSelections.length})
          </Text>
                <View style={styles.selectedCategoriesList}>
                  {currentSelections.map((item, index) => (
                    <View key={index} style={styles.selectedCategoryTag}>
                      <Text style={styles.selectedCategoryTagText}>{item}</Text>
                      <TouchableOpacity 
                        onPress={() => toggleCategory(item)}
                        style={styles.removeCategoryButton}
                      >
                        <ProfessionalIcon type="CLOSE" size={12} color="#ffffff" />
                      </TouchableOpacity>
        </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.seeAllCategoriesFooter}>
        <TouchableOpacity 
            style={styles.seeAllDoneButton}
            onPress={handleBackToCategories}
        >
            <Text style={styles.seeAllDoneButtonText}>
              Done ({currentSelections.length} selected)
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  };

  const renderAllCategoriesScreen = () => (
    <View style={styles.allCategoriesContainer}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.allCategoriesHeader}>
        <TouchableOpacity onPress={() => setShowAllCategories(false)} style={styles.backButton}>
          <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
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

  const renderCategorySelectionPage = () => {
    const legalAreaData = {
      'Property': { iconType: 'PROPERTY', serviceDesc: 'Property Law Services' },
      'Criminal': { iconType: 'CRIMINAL', serviceDesc: 'Criminal Defense Services' },
      'Tax': { iconType: 'TAX', serviceDesc: 'Tax Law Services' },
      'Family': { iconType: 'FAMILY_LAW', serviceDesc: 'Family Law Services' },
      'Business': { iconType: 'BUSINESS', serviceDesc: 'Business Law Services' },
      'Personal Injury': { iconType: 'PERSONAL_INJURY', serviceDesc: 'Personal Injury Services' },
      'Civil Rights': { iconType: 'PEOPLE', serviceDesc: 'Civil Rights Services' },
      'Immigration': { iconType: 'GLOBE', serviceDesc: 'Immigration Services' },
      'Environmental': { iconType: 'LEAF', serviceDesc: 'Environmental Law Services' },
      'Bankruptcy': { iconType: 'BRIEFCASE', serviceDesc: 'Bankruptcy Services' },
      'Employment': { iconType: 'BRIEFCASE', serviceDesc: 'Employment Law Services' },
      'Real Estate': { iconType: 'HOUSE', serviceDesc: 'Real Estate Services' },
      'Estate Planning': { iconType: 'WILL', serviceDesc: 'Estate Planning Services' },
      'Intellectual Property': { iconType: 'LIGHTBULB', serviceDesc: 'IP Law Services' },
      'Contract': { iconType: 'DOC', serviceDesc: 'Contract Law Services' },
      'Divorce': { iconType: 'HEART', serviceDesc: 'Divorce Services' },
      'DUI': { iconType: 'CAR', serviceDesc: 'DUI Defense Services' },
      'Workers Comp': { iconType: 'TOOLS', serviceDesc: 'Workers Compensation Services' },
      'Medical Malpractice': { iconType: 'MEDICAL', serviceDesc: 'Medical Malpractice Services' },
      'Securities': { iconType: 'CHART', serviceDesc: 'Securities Law Services' },
      'Patent': { iconType: 'LIGHTBULB', serviceDesc: 'Patent Law Services' },
      'Trademark': { iconType: 'TM', serviceDesc: 'Trademark Services' },
      'Copyright': { iconType: 'COPY', serviceDesc: 'Copyright Services' },
      'Corporate': { iconType: 'BUILDING', serviceDesc: 'Corporate Law Services' }
    };

    const currentLegalArea = legalAreaData[newSelectedCategory] || legalAreaData['Property'];

    return (
      <View style={styles.categorySelectionPageWrapper}>
        <StatusBar style="dark" />
        
        <ScrollView style={styles.categorySelectionScrollView} showsVerticalScrollIndicator={false}>
          {/* Page Title Section */}
          <View style={styles.categoryPageTitleSection}>
            <Text style={styles.categoryPageMainTitle}>Category Selected</Text>
            <Text style={styles.categoryPageSubTitle}>Services will update for this category</Text>
          </View>

          {/* Selected Category Display */}
          <View style={styles.selectedCategoryShowcase}>
            <View style={styles.categoryIconCircle}>
              <ProfessionalIcon type={currentLegalArea.iconType} size={60} color="#2E4A6B" />
            </View>
            <Text style={styles.selectedCategoryLabel}>{newSelectedCategory}</Text>
            <Text style={styles.selectedCategoryDescription}>{currentLegalArea.serviceDesc}</Text>
          </View>

          {/* Available Services Section */}
          <View style={styles.availableServicesSection}>
            <Text style={styles.availableServicesHeading}>Available Services:</Text>
            <View style={styles.servicesListContainer}>
              {getServiceObjectsForCategory(newSelectedCategory).slice(0, 3).map((service, index) => (
                <View key={index} style={styles.serviceItemRow}>
                  <ProfessionalIcon type={service.icon} size={24} color="#2E4A6B" />
                  <Text style={styles.serviceItemLabel}>{service.name}</Text>
                </View>
              ))}
              <Text style={styles.moreServicesIndicator}>+3 more services</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={styles.categoryPageActionButtons}>
            <TouchableOpacity 
            style={styles.cancelSelectionButton}
              onPress={cancelCategorySelection}
            >
            <Text style={styles.cancelSelectionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.confirmSelectionButton}
              onPress={confirmCategorySelection}
            >
            <Text style={styles.confirmSelectionButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBookingDetailsScreen = () => {
    const handleReschedule = () => {
      setRescheduleBooking(selectedBooking);
      setRescheduleSelectedDate(null);
      setRescheduleSelectedTimeSlot('');
      setShowRescheduleBooking(true);
    };

    const handleCancel = () => {
      showCustomAlert(
        'confirm',
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
          {/* Lawyer/Law Firm Information Card */}
          <View style={styles.bookingDetailsLawyerCard}>
            <View style={styles.bookingDetailsLawyerContent}>
              <View style={styles.bookingDetailsLawyerAvatar}>
                {/* Handle both lawyer and law firm bookings */}
                {selectedBooking.type === 'lawfirm' ? (
                  selectedBooking.lawFirmImage ? (
                    <Image source={selectedBooking.lawFirmImage} style={styles.bookingDetailsLawyerProfileImage} />
                  ) : (
                    <ProfessionalIcon type="BUILDING" size={40} color="#2E4A6B" />
                  )
                ) : (
                  selectedBooking.lawyerProfileImage ? (
                    <Image source={selectedBooking.lawyerProfileImage} style={styles.bookingDetailsLawyerProfileImage} />
                  ) : (
                    <ProfessionalIcon type="USER" size={40} color="#2E4A6B" />
                  )
                )}
              </View>
              <View style={styles.bookingDetailsLawyerInfo}>
                {/* Display name based on booking type */}
                <Text style={styles.bookingDetailsLawyerName}>
                  {selectedBooking.type === 'lawfirm' ? selectedBooking.lawFirmName : selectedBooking.lawyerName}
                </Text>
                {/* Display specialty/service based on booking type */}
                <Text style={styles.bookingDetailsLawyerSpecialty}>
                  {selectedBooking.type === 'lawfirm' ? 'Professional Legal Services' : selectedBooking.lawyerSpecialty}
                </Text>
                <View style={styles.bookingDetailsLawyerStats}>
                  <View style={styles.bookingDetailsLawyerStat}>
                    <ProfessionalIcon type="STAR" size={16} color="#FFD700" />
                    <Text style={styles.bookingDetailsLawyerStatText}>
                      {selectedBooking.type === 'lawfirm' 
                        ? '4.8' 
                        : (lawyerRatings[selectedBooking.lawyerName]?.rating || '4.4')
                      }
                    </Text>
                  </View>
                  <View style={styles.bookingDetailsLawyerStat}>
                    <ProfessionalIcon type="LOCATION" size={16} color="#2E4A6B" />
                    <Text style={styles.bookingDetailsLawyerStatText}>1.5 km</Text>
                  </View>
                  <View style={styles.bookingDetailsLawyerStat}>
                    <ProfessionalIcon type="DOLLAR" size={16} color="#2E4A6B" />
                    <Text style={styles.bookingDetailsLawyerStatText}>
                      {selectedBooking.type === 'lawfirm' ? '$15/hr' : '$16/hr'}
                    </Text>
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
            style={styles.rateLawyerButton}
            onPress={() => setShowRatingPage(true)}
          >
            <Text style={styles.rateLawyerButtonText}>
              {selectedBooking?.type === 'lawfirm' ? 'Rate Law Firm' : 'Rate Lawyer'}
            </Text>
          </TouchableOpacity>
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
        lawyerProfileImage: require('./assets/images/lawyer/lawyer3.png'),
        date: '30.01.2021',
        time: '10:00-11:00AM',
        status: 'Confirmed'
      },
      {
        id: '2',
        lawyerName: 'Chris Young',
        lawyerSpecialty: 'Property, Criminal',
        lawyerProfileImage: require('./assets/images/lawyer/lawyer2.png'),
        date: '28.01.2021',
        time: '2:00-3:00PM',
        status: 'Pending'
      },
      {
        id: '3',
        lawyerName: 'Krisy Yolker',
        lawyerSpecialty: 'Tax, Civil Rights',
        lawyerProfileImage: require('./assets/images/lawyer/lawyer1.png'),
        date: '25.01.2021',
        time: '11:00-12:00PM',
        status: 'Confirmed'
      },
      {
        id: '4',
        lawyerName: 'Mathew Bairstow',
        lawyerSpecialty: 'Tax, Property',
        lawyerProfileImage: require('./assets/images/lawyer/lawyer4.png'),
        date: '22.01.2021',
        time: '9:00-10:00AM',
        status: 'Confirmed'
      },
      {
        id: '5',
        lawyerName: 'Andrew Clarke',
        lawyerSpecialty: 'Corporate',
        lawyerProfileImage: require('./assets/images/lawyer/lawyer6.png'),
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
        <ScrollView style={styles.bookingsList} showsVerticalScrollIndicator={false} contentContainerStyle={styles.bookingsListContent}>
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
                  {/* Handle both lawyer and law firm bookings */}
                  {booking.type === 'lawfirm' ? (
                    booking.lawFirmImage ? (
                      <Image source={booking.lawFirmImage} style={styles.bookingProfileImage} />
                    ) : (
                      <ProfessionalIcon type="BUILDING" size={24} color="#2E4A6B" />
                    )
                  ) : (
                    booking.lawyerProfileImage ? (
                      <Image source={booking.lawyerProfileImage} style={styles.bookingProfileImage} />
                    ) : (
                      <ProfessionalIcon type="USER" size={24} color="#2E4A6B" />
                    )
                  )}
                </View>
                
                <View style={styles.bookingDetails}>
                  {/* Display name based on booking type */}
                  <Text style={styles.bookingLawyerName}>
                    {booking.type === 'lawfirm' ? booking.lawFirmName : booking.lawyerName}
                  </Text>
                  {/* Display specialty/service based on booking type */}
                  <Text style={styles.bookingSpecialty}>
                    {booking.type === 'lawfirm' ? 'Legal Consultation' : booking.lawyerSpecialty}
                  </Text>
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

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => {
              setShowBookings(false);
              setCurrentScreen('home');
            }}
          >
            <ProfessionalIcon type="HOME" size={24} color="#6c757d" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ProfessionalIcon type="BOOKMARK" size={24} color="#2E4A6B" />
            <Text style={styles.navTextActive}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => {
              setShowBookings(false);
              setShowProfilePage(true);
            }}
          >
            <ProfessionalIcon type="USER" size={24} color="#6c757d" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
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

    const handleViewBookingDetails = () => {
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
      
      // Set the selected booking and show booking details
      setSelectedBooking(newBooking);
      setShowAppointmentConfirmation(false);
      setShowReviewBooking(false);
      setShowAppointmentBooking(false);
      setShowLawyerDetails(false);
      setShowBookingDetails(true);
    };

    return (
      <View style={styles.confirmationOverlay}>
        <View style={styles.confirmationContainer}>
          <StatusBar style="dark" />
          
          {/* Header */}
          <View style={styles.confirmationPageHeader}>
            <TouchableOpacity 
              onPress={handleConfirmAppointment} 
              style={styles.confirmationBackButton}
            >
              <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
            </TouchableOpacity>
            <Text style={styles.confirmationPageTitle}>Booking Confirmed</Text>
            <View style={styles.placeholder} />
          </View>
          
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
              onPress={handleViewBookingDetails}
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
                  <Image source={selectedLawyer.profileImage} style={styles.lawyerInfoProfileImage} />
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

  const renderLawFirmAppointmentBookingScreen = () => {
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
      { id: 'firm_office', label: 'Meet at Law Firm Office', extra: '(Charges 2% Extra)' },
      { id: 'suggest_time', label: 'Suggest your time', extra: '(Charges 4% Extra)' }
    ];

    // Generate calendar days
    const generateCalendarDays = () => {
      const firstDay = new Date(lawFirmCurrentYear, lawFirmCurrentMonth, 1);
      const lastDay = new Date(lawFirmCurrentYear, lawFirmCurrentMonth + 1, 0);
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
        if (lawFirmCurrentMonth === 0) {
          setLawFirmCurrentMonth(11);
          setLawFirmCurrentYear(lawFirmCurrentYear - 1);
        } else {
          setLawFirmCurrentMonth(lawFirmCurrentMonth - 1);
        }
      } else {
        if (lawFirmCurrentMonth === 11) {
          setLawFirmCurrentMonth(0);
          setLawFirmCurrentYear(lawFirmCurrentYear + 1);
        } else {
          setLawFirmCurrentMonth(lawFirmCurrentMonth + 1);
        }
      }
    };

    const handleCustomTimeChange = (type, value) => {
      setLawFirmCustomTime(prev => ({ ...prev, [type]: value }));
    };

    const handleSubmitAppointment = () => {
      if (!lawFirmSelectedDate) {
        Alert.alert('Missing Information', 'Please select a date from the calendar');
        return;
      }
      
      if (!lawFirmSelectedTimeSlot && !lawFirmShowTimePicker) {
        Alert.alert('Missing Information', 'Please select a time slot or choose custom time');
        return;
      }
      
      if (!lawFirmUserMessage.trim()) {
        Alert.alert('Missing Information', 'Please enter your message describing your legal issue');
        return;
      }
      
      setShowLawFirmReviewBooking(true);
    };

    return (
      <View style={styles.appointmentContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.appointmentHeader}>
          <TouchableOpacity 
            onPress={() => setShowLawFirmAppointmentBooking(false)} 
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
                  onPress={() => setLawFirmShowMonthPicker(!lawFirmShowMonthPicker)}
                >
                  <Text style={styles.calendarMonth}>{months[lawFirmCurrentMonth]} {lawFirmCurrentYear}</Text>
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
              {lawFirmShowMonthPicker && (
                <View style={styles.monthYearPicker}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthPicker}>
                    {months.map((month, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.monthOption,
                          lawFirmCurrentMonth === index && styles.selectedMonthOption
                        ]}
                        onPress={() => {
                          setLawFirmCurrentMonth(index);
                          setLawFirmShowMonthPicker(false);
                        }}
                      >
                        <Text style={[
                          styles.monthOptionText,
                          lawFirmCurrentMonth === index && styles.selectedMonthOptionText
                        ]}>
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.yearPicker}>
                    {Array.from({length: 10}, (_, i) => lawFirmCurrentYear - 5 + i).map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.yearOption,
                          lawFirmCurrentYear === year && styles.selectedYearOption
                        ]}
                        onPress={() => {
                          setLawFirmCurrentYear(year);
                          setLawFirmShowMonthPicker(false);
                        }}
                      >
                        <Text style={[
                          styles.yearOptionText,
                          lawFirmCurrentYear === year && styles.selectedYearOptionText
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
                      day && lawFirmSelectedDate === day && styles.selectedCalendarDay
                    ]}
                    onPress={() => day && setLawFirmSelectedDate(day)}
                    disabled={!day}
                  >
                    {day && (
                      <Text style={[
                        styles.calendarDayText,
                        lawFirmSelectedDate === day && styles.selectedCalendarDayText
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
                  setLawFirmShowTimePicker(!lawFirmShowTimePicker);
                  if (lawFirmShowTimePicker) {
                    setLawFirmSelectedTimeSlot(null);
                  }
                }}
              >
                <Text style={styles.customTimeButtonText}>
                  {lawFirmShowTimePicker ? 'Use Preset Times' : 'Custom Time'}
                </Text>
              </TouchableOpacity>
            </View>

            {!lawFirmShowTimePicker ? (
              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.timeSlotButton,
                      lawFirmSelectedTimeSlot === slot.id && styles.selectedTimeSlotButton
                    ]}
                    onPress={() => setLawFirmSelectedTimeSlot(slot.id)}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      lawFirmSelectedTimeSlot === slot.id && styles.selectedTimeSlotText
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
                            lawFirmCustomTime.hour === hour.toString().padStart(2, '0') && styles.selectedTimePickerOption
                          ]}
                          onPress={() => handleCustomTimeChange('hour', hour.toString().padStart(2, '0'))}
                        >
                          <Text style={[
                            styles.timePickerOptionText,
                            lawFirmCustomTime.hour === hour.toString().padStart(2, '0') && styles.selectedTimePickerOptionText
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
                            lawFirmCustomTime.minute === minute && styles.selectedTimePickerOption
                          ]}
                          onPress={() => handleCustomTimeChange('minute', minute)}
                        >
                          <Text style={[
                            styles.timePickerOptionText,
                            lawFirmCustomTime.minute === minute && styles.selectedTimePickerOptionText
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
                            lawFirmCustomTime.period === period && styles.selectedTimePickerOption
                          ]}
                          onPress={() => handleCustomTimeChange('period', period)}
                        >
                          <Text style={[
                            styles.timePickerOptionText,
                            lawFirmCustomTime.period === period && styles.selectedTimePickerOptionText
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
                    Selected Time: {lawFirmCustomTime.hour}:{lawFirmCustomTime.minute} {lawFirmCustomTime.period}
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
                value={lawFirmUserMessage}
                onChangeText={setLawFirmUserMessage}
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
                  onPress={() => setLawFirmConsultationType(type.id)}
                >
                  <View style={styles.radioButtonContainer}>
                    <View style={[
                      styles.radioButton,
                      lawFirmConsultationType === type.id && styles.selectedRadioButton
                    ]}>
                      {lawFirmConsultationType === type.id && (
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

  const renderLawFirmReviewBookingScreen = () => {
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
      { id: 'firm_office', label: 'Meet at Law Firm Office', extra: '(Charges 2% Extra)' },
      { id: 'suggest_time', label: 'Suggest your time', extra: '(Charges 4% Extra)' }
    ];

    const getTimeDisplay = () => {
      if (lawFirmShowTimePicker) {
        return `${lawFirmCustomTime.hour}:${lawFirmCustomTime.minute} ${lawFirmCustomTime.period}`;
      }
      return timeSlots.find(slot => slot.id === lawFirmSelectedTimeSlot)?.label || 'Not selected';
    };

    const getConsultationTypeDisplay = () => {
      return consultationTypes.find(type => type.id === lawFirmConsultationType)?.label || 'Online Consultation';
    };

    const getConsultationAmount = () => {
      const baseAmount = 15.00;
      let extraCharge = 0;
      
      if (lawFirmConsultationType === 'firm_office') {
        extraCharge = baseAmount * 0.02; // 2% extra
      } else if (lawFirmConsultationType === 'suggest_time') {
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
      setShowLawFirmAppointmentConfirmation(true);
    };

    const handleModifyMessage = () => {
      setShowLawFirmReviewBooking(false);
      // Go back to law firm appointment booking page
    };

    const amounts = getConsultationAmount();

    return (
      <View style={styles.reviewBookingContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.reviewBookingHeader}>
          <TouchableOpacity 
            onPress={() => setShowLawFirmReviewBooking(false)} 
            style={styles.reviewBookingBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.reviewBookingTitle}>Review Booking</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.reviewBookingContent} showsVerticalScrollIndicator={false}>
          {/* Law Firm Information Card */}
          <View style={styles.lawyerInfoCard}>
            <View style={styles.lawyerInfoContent}>
              <View style={styles.lawyerInfoAvatar}>
                {selectedLawFirm?.image ? (
                  <Image source={selectedLawFirm.image} style={styles.lawyerInfoProfileImage} />
                ) : (
                  <ProfessionalIcon type="BUILDING" size={40} color="#2E4A6B" />
                )}
              </View>
              <View style={styles.lawyerInfoDetails}>
                <Text style={styles.lawyerInfoName}>{selectedLawFirm?.name}</Text>
                <Text style={styles.lawyerInfoSpecialty}>Professional Legal Services</Text>
                <View style={styles.lawyerInfoStats}>
                  <View style={styles.lawyerInfoStat}>
                    <ProfessionalIcon type="STAR" size={16} color="#FFD700" />
                    <Text style={styles.lawyerInfoStatText}>{selectedLawFirm?.rating}</Text>
                  </View>
                  <View style={styles.lawyerInfoStat}>
                    <ProfessionalIcon type="USER" size={16} color="#2E4A6B" />
                    <Text style={styles.lawyerInfoStatText}>{selectedLawFirm?.lawyers} Lawyers</Text>
                  </View>
                  <View style={styles.lawyerInfoStat}>
                    <ProfessionalIcon type="CHECKMARK" size={16} color="#2E4A6B" />
                    <Text style={styles.lawyerInfoStatText}>15+ Years</Text>
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
              {lawFirmExpandedMessage ? lawFirmUserMessage : lawFirmUserMessage.substring(0, 100) + '...'}
            </Text>
            {lawFirmUserMessage.length > 100 && (
              <TouchableOpacity onPress={() => setLawFirmExpandedMessage(!lawFirmExpandedMessage)}>
                <Text style={styles.expandButton}>
                  {lawFirmExpandedMessage ? 'Show Less' : 'Expand...'}
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
                  {lawFirmSelectedDate.toString().padStart(2, '0')}.{(lawFirmCurrentMonth + 1).toString().padStart(2, '0')}.{lawFirmCurrentYear}
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

  const renderLawFirmAppointmentConfirmationScreen = () => {
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
      if (lawFirmShowTimePicker) {
        return `${lawFirmCustomTime.hour}:${lawFirmCustomTime.minute} ${lawFirmCustomTime.period}`;
      }
      return timeSlots.find(slot => slot.id === lawFirmSelectedTimeSlot)?.label || 'Not selected';
    };

    const handleConfirmAppointment = () => {
      // Save the booking to user's bookings list
      const newBooking = {
        id: Date.now().toString(),
        lawFirmName: selectedLawFirm?.name,
        lawFirmImage: selectedLawFirm?.image,
        date: `${lawFirmSelectedDate.toString().padStart(2, '0')}.${(lawFirmCurrentMonth + 1).toString().padStart(2, '0')}.${lawFirmCurrentYear}`,
        time: getTimeDisplay(),
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
        message: lawFirmUserMessage,
        consultationType: lawFirmConsultationType,
        type: 'lawfirm' // To distinguish from lawyer bookings
      };
      
      setUserBookings(prev => [newBooking, ...prev]);
      
      setShowLawFirmAppointmentConfirmation(false);
      setShowLawFirmReviewBooking(false);
      setShowLawFirmAppointmentBooking(false);
      setShowLawFirmDetails(false);
      setCurrentScreen('home');
    };

    const handleViewBookingDetails = () => {
      // Save the booking to user's bookings list
      const newBooking = {
        id: Date.now().toString(),
        lawFirmName: selectedLawFirm?.name,
        lawFirmImage: selectedLawFirm?.image,
        date: `${lawFirmSelectedDate.toString().padStart(2, '0')}.${(lawFirmCurrentMonth + 1).toString().padStart(2, '0')}.${lawFirmCurrentYear}`,
        time: getTimeDisplay(),
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
        message: lawFirmUserMessage,
        consultationType: lawFirmConsultationType,
        type: 'lawfirm' // To distinguish from lawyer bookings
      };
      
      setUserBookings(prev => [newBooking, ...prev]);
      
      // Set the selected booking and show booking details
      setSelectedBooking(newBooking);
      setShowLawFirmAppointmentConfirmation(false);
      setShowLawFirmReviewBooking(false);
      setShowLawFirmAppointmentBooking(false);
      setShowLawFirmDetails(false);
      setShowBookingDetails(true);
    };

    return (
      <View style={styles.confirmationOverlay}>
        <View style={styles.confirmationContainer}>
          <StatusBar style="dark" />
          
          {/* Header */}
          <View style={styles.confirmationPageHeader}>
            <TouchableOpacity 
              onPress={handleConfirmAppointment} 
              style={styles.confirmationBackButton}
            >
              <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
            </TouchableOpacity>
            <Text style={styles.confirmationPageTitle}>Booking Confirmed</Text>
            <View style={styles.placeholder} />
          </View>
          
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
              Congrats, you have successfully booked the appointment with the law firm, please follow up on time. You can always modify the booking.
            </Text>
            
            {/* Appointment Details */}
            <View style={styles.confirmationDetailsCard}>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Law Firm:</Text>
                <Text style={styles.confirmationDetailValue}>{selectedLawFirm?.name}</Text>
              </View>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Date:</Text>
                <Text style={styles.confirmationDetailValue}>
                  {months[lawFirmCurrentMonth]} {lawFirmSelectedDate}, {lawFirmCurrentYear}
                </Text>
              </View>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Time:</Text>
                <Text style={styles.confirmationDetailValue}>{getTimeDisplay()}</Text>
              </View>
              <View style={styles.confirmationDetailRow}>
                <Text style={styles.confirmationDetailLabel}>Service:</Text>
                <Text style={styles.confirmationDetailValue}>Legal Consultation</Text>
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
              onPress={handleViewBookingDetails}
            >
              <Text style={styles.viewBookingDetailsText}>View Booking Details</Text>
            </TouchableOpacity>
          </View>
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
          <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
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
                <Image source={selectedLawyer.profileImage} style={styles.lawyerDetailProfileImage} />
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
          <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
        </TouchableOpacity>
        <Text style={styles.allLawyersTitle}>All Lawyers</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Lawyers Grid */}
      <ScrollView style={styles.allLawyersScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.allLawyersGrid}>
          {[
            { name: 'Krisy Yolker', specialty: 'Property Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer1.png') },
            { name: 'Chris Young', specialty: 'Criminal Law', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer2.png') },
            { name: 'Lisa Wales', specialty: 'Tax Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer3.png') },
            { name: 'John Smith', specialty: 'Civil Law', rating: '4.6', avatar: null, profileImage: require('./assets/images/lawyer/lawyer4.png') },
            { name: 'Sarah Johnson', specialty: 'Family Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer5.png') },
            { name: 'Michael Chen', specialty: 'Business Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer6.png') },
            { name: 'Emily Rodriguez', specialty: 'Personal Injury', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer7.png') },
            { name: 'David Thompson', specialty: 'Immigration', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer8.png') },
            { name: 'Maria Garcia', specialty: 'Employment Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer9.png') },
            { name: 'Robert Brown', specialty: 'Estate Planning', rating: '4.6', avatar: null, profileImage: require('./assets/images/lawyer/lawyer10.png') },
            { name: 'Jennifer Lee', specialty: 'Real Estate', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer11.png') },
            { name: 'Christopher Davis', specialty: 'Intellectual Property', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer12.png') },
            { name: 'Amanda Taylor', specialty: 'DUI Defense', rating: '4.5', avatar: null, profileImage: require('./assets/images/lawyer/lawyer13.png') },
            { name: 'Kevin Martinez', specialty: 'Medical Malpractice', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer14.png') },
            { name: 'Rachel Anderson', specialty: 'Workers Compensation', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer15.png') },
            { name: 'Daniel Kim', specialty: 'Securities Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer16.png') },
            { name: 'Nicole White', specialty: 'Patent Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer17.png') },
            { name: 'Mark Thompson', specialty: 'Trademark Law', rating: '4.6', avatar: null, profileImage: require('./assets/images/lawyer/lawyer18.png') },
            { name: 'Samantha Clark', specialty: 'Corporate Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer19.png') },
            { name: 'Andrew Lewis', specialty: 'Environmental Law', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer20.png') }
            ].map((lawyer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.allLawyerCard}
                onPress={() => handleLawyerSelect(lawyer.name, lawyer.specialty, lawyer.rating, lawyer.avatar, lawyer.profileImage)}
              >
              <View style={styles.allLawyerAvatar}>
                {lawyer.profileImage ? (
                  <Image source={lawyer.profileImage} style={styles.allLawyerProfileImage} />
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
          <Text style={styles.greeting}>Hi, {userProfile.fullName.split(' ')[0]}</Text>
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

        {/* Lawyers / Law Firms Section */}
        <View style={styles.homeSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWithToggle}>
              <View style={styles.homeToggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.homeToggleButton,
                    homeSliderMode === 'lawyers' && styles.homeToggleButtonActive
                  ]}
                  onPress={() => setHomeSliderMode('lawyers')}
                >
                  <Text style={[
                    styles.homeToggleText,
                    homeSliderMode === 'lawyers' && styles.homeToggleTextActive
                  ]}>
                    Lawyers
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.homeToggleButton,
                    homeSliderMode === 'lawfirms' && styles.homeToggleButtonActive
                  ]}
                  onPress={() => setHomeSliderMode('lawfirms')}
                >
                  <Text style={[
                    styles.homeToggleText,
                    homeSliderMode === 'lawfirms' && styles.homeToggleTextActive
                  ]}>
                    Law Firm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleHomeSeeAll}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.lawyersScroll}
          >
            {homeSliderMode === 'lawyers' ? (
              // Combine registered lawyers with default lawyers
              [
                ...registeredLawyers, // Registered lawyers appear first
                // Default lawyers
                { name: 'Krisy Yolker', specialty: 'Property Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer1.png') },
              { name: 'Chris Young', specialty: 'Criminal Law', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer2.png') },
              { name: 'Lisa Wales', specialty: 'Tax Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer3.png') },
              { name: 'John Smith', specialty: 'Civil Law', rating: '4.6', avatar: null, profileImage: require('./assets/images/lawyer/lawyer4.png') },
              { name: 'Sarah Johnson', specialty: 'Family Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer5.png') },
              { name: 'Michael Chen', specialty: 'Business Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer6.png') },
              { name: 'Emily Rodriguez', specialty: 'Personal Injury', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer7.png') },
              { name: 'David Thompson', specialty: 'Immigration', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer8.png') },
              { name: 'Maria Garcia', specialty: 'Employment Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer9.png') },
              { name: 'Robert Brown', specialty: 'Estate Planning', rating: '4.6', avatar: null, profileImage: require('./assets/images/lawyer/lawyer10.png') },
              { name: 'Jennifer Lee', specialty: 'Real Estate', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer11.png') },
              { name: 'Christopher Davis', specialty: 'Intellectual Property', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer12.png') },
              { name: 'Amanda Taylor', specialty: 'DUI Defense', rating: '4.5', avatar: null, profileImage: require('./assets/images/lawyer/lawyer13.png') },
              { name: 'Kevin Martinez', specialty: 'Medical Malpractice', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer14.png') },
              { name: 'Rachel Anderson', specialty: 'Workers Compensation', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer15.png') },
              { name: 'Daniel Kim', specialty: 'Securities Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer16.png') },
              { name: 'Nicole White', specialty: 'Patent Law', rating: '4.8', avatar: null, profileImage: require('./assets/images/lawyer/lawyer17.png') },
              { name: 'Mark Thompson', specialty: 'Trademark Law', rating: '4.6', avatar: null, profileImage: require('./assets/images/lawyer/lawyer18.png') },
              { name: 'Samantha Clark', specialty: 'Corporate Law', rating: '4.9', avatar: null, profileImage: require('./assets/images/lawyer/lawyer19.png') },
              { name: 'Andrew Lewis', specialty: 'Environmental Law', rating: '4.7', avatar: null, profileImage: require('./assets/images/lawyer/lawyer20.png') }
            ].map((lawyer, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.lawyerCard}
                onPress={() => handleLawyerCardClick(lawyer)}
              >
                <View style={styles.lawyerAvatar}>
                  {lawyer.profileImage ? (
                    <Image source={lawyer.profileImage} style={styles.lawyerProfileImage} />
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
              ))
            ) : (
              // Law Firms Data
              [
                { id: '1', name: 'Johnson & Associates', specialty: 'Corporate Law', rating: '4.8', lawyers: 15, location: '2.1 km', image: require('./assets/images/lawfirm/lawfirm19.png') },
                { id: '2', name: 'Smith Legal Services', specialty: 'Criminal Defense', rating: '4.6', lawyers: 8, location: '1.5 km', image: require('./assets/images/lawfirm/lawfirm20.png') },
                { id: '3', name: 'Williams & Partners', specialty: 'Family Law', rating: '4.9', lawyers: 22, location: '3.2 km', image: require('./assets/images/lawfirm/lawfirm21.png') },
                { id: '4', name: 'Davis Legal Group', specialty: 'Personal Injury', rating: '4.7', lawyers: 12, location: '2.8 km', image: require('./assets/images/lawfirm/lawfirm22.png') },
                { id: '5', name: 'Brown & Co Law Office', specialty: 'Real Estate', rating: '4.5', lawyers: 6, location: '1.9 km', image: require('./assets/images/lawfirm/lawfirm1.png') },
                { id: '6', name: 'Miller Legal Consultants', specialty: 'Business Law', rating: '4.8', lawyers: 18, location: '2.5 km', image: require('./assets/images/lawfirm/lawfirm2.png') },
                { id: '7', name: 'Wilson Law Corporation', specialty: 'Immigration', rating: '4.4', lawyers: 10, location: '3.5 km', image: require('./assets/images/lawfirm/lawfirm3.png') },
                { id: '8', name: 'Anderson Legal Solutions', specialty: 'Tax Law', rating: '4.7', lawyers: 14, location: '2.3 km', image: require('./assets/images/lawfirm/lawfirm4.png') },
                { id: '9', name: 'Taylor & Associates', specialty: 'Employment Law', rating: '4.6', lawyers: 9, location: '1.8 km', image: require('./assets/images/lawfirm/lawfirm5.png') },
                { id: '10', name: 'Roberts Law Firm', specialty: 'Intellectual Property', rating: '4.9', lawyers: 16, location: '1.9 km', image: require('./assets/images/lawfirm/lawfirm6.png') }
              ].map((firm, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.homeLawFirmCard}
                  onPress={() => handleHomeLawFirmClick(firm)}
                >
                  <View style={styles.lawFirmAvatar}>
                    <Image source={firm.image} style={styles.lawFirmProfileImage} />
                  </View>
                  <Text style={styles.lawFirmName}>{firm.name}</Text>
                  <Text style={styles.lawFirmSpecialty}>{firm.specialty}</Text>
                  <View style={styles.lawFirmRating}>
                    <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                    <Text style={styles.ratingText}>{firm.rating}</Text>
                  </View>
                  <Text style={styles.lawFirmLawyers}>{firm.lawyers} lawyers</Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* Services */}
        <View style={styles.homeSection}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            {getServiceObjectsForCategory(selectedCategory).map((service, index) => (
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
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setShowProfilePage(true)}
        >
          <ProfessionalIcon type="USER" size={24} color="#6c757d" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRatingPage = () => {
    // Handle both lawyer and law firm ratings
    const isLawFirm = selectedBooking?.type === 'lawfirm';
    const currentEntity = isLawFirm 
      ? (selectedBooking?.lawFirmName || 'Johnson & Associates Law Firm')
      : (selectedBooking?.lawyerName || 'Mathew Bairstow');
    const currentEntityRating = lawyerRatings[currentEntity] || { 
      rating: isLawFirm ? 4.8 : 4.4, 
      reviewCount: isLawFirm ? 89 : 127 
    };
    
    const handleStarPress = (rating) => {
      setUserRating(rating);
    };

    const handleSubmitReview = () => {
      if (userRating === 0) {
        Alert.alert('Rating Required', 'Please select a star rating before submitting your review.');
        return;
      }
      
      // Update entity's rating (simple average calculation)
      const newReviewCount = currentEntityRating.reviewCount + 1;
      const newRating = ((currentEntityRating.rating * currentEntityRating.reviewCount) + userRating) / newReviewCount;
      
      setLawyerRatings(prev => ({
        ...prev,
        [currentEntity]: {
          rating: Math.round(newRating * 10) / 10, // Round to 1 decimal place
          reviewCount: newReviewCount
        }
      }));
      
      showCustomAlert(
        'success',
        'Review Submitted!',
        'Thank you for your feedback. Your review has been submitted successfully.',
        [
          {
            text: 'OK',
            style: 'primary',
            onPress: () => {
              setShowRatingPage(false);
              setUserRating(0);
              setUserReview('');
            }
          }
        ]
      );
    };

    return (
      <View style={styles.ratingContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.ratingHeader}>
          <TouchableOpacity 
            onPress={() => setShowRatingPage(false)} 
            style={styles.ratingBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.ratingTitle}>Booking Details</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.ratingContent} showsVerticalScrollIndicator={false}>
          {/* Lawyer/Law Firm Information Card */}
          <View style={styles.ratingLawyerCard}>
            <View style={styles.ratingLawyerContent}>
              <View style={styles.ratingLawyerAvatar}>
                {/* Handle both lawyer and law firm images */}
                {isLawFirm ? (
                  selectedBooking?.lawFirmImage ? (
                    <Image source={selectedBooking.lawFirmImage} style={styles.ratingLawyerProfileImage} />
                  ) : (
                    <ProfessionalIcon type="BUILDING" size={40} color="#2E4A6B" />
                  )
                ) : (
                  selectedBooking?.lawyerProfileImage ? (
                    <Image source={selectedBooking.lawyerProfileImage} style={styles.ratingLawyerProfileImage} />
                  ) : (
                    <ProfessionalIcon type="USER" size={40} color="#2E4A6B" />
                  )
                )}
              </View>
              <View style={styles.ratingLawyerInfo}>
                <Text style={styles.ratingLawyerName}>{currentEntity}</Text>
                <Text style={styles.ratingLawyerSpecialty}>
                  {isLawFirm 
                    ? 'Professional Legal Services' 
                    : (selectedBooking?.lawyerSpecialty || 'Tax, Property')
                  }
                </Text>
                <View style={styles.ratingLawyerStats}>
                  <View style={styles.ratingLawyerStat}>
                    <ProfessionalIcon type="STAR" size={16} color="#FFD700" />
                    <Text style={styles.ratingLawyerStatText}>{currentEntityRating.rating}</Text>
                  </View>
                  <View style={styles.ratingLawyerStat}>
                    <ProfessionalIcon type="LOCATION" size={16} color="#2E4A6B" />
                    <Text style={styles.ratingLawyerStatText}>1.5 km</Text>
                  </View>
                  <View style={styles.ratingLawyerStat}>
                    <ProfessionalIcon type="DOLLAR" size={16} color="#2E4A6B" />
                    <Text style={styles.ratingLawyerStatText}>
                      {isLawFirm ? '$15/hr' : '$16/hr'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Consultation Details */}
          <View style={styles.ratingConsultationCard}>
            <Text style={styles.ratingConsultationTitle}>
              {selectedBooking?.consultationType === 'online' ? 'Online Consultation' : 
               selectedBooking?.consultationType === 'lawyer_place' ? 'Meet at Lawyer\'s place' :
               selectedBooking?.consultationType === 'firm_office' ? 'Meet at Law Firm Office' :
               'Suggest your time'}
            </Text>
            <View style={styles.ratingConsultationList}>
              <View style={styles.ratingConsultationRow}>
                <Text style={styles.ratingConsultationLabel}>Date:</Text>
                <Text style={styles.ratingConsultationValue}>{selectedBooking?.date || '19.07.2021'}</Text>
              </View>
              <View style={styles.ratingConsultationRow}>
                <Text style={styles.ratingConsultationLabel}>Time Slot:</Text>
                <Text style={styles.ratingConsultationValue}>{selectedBooking?.time || '10AM - 11AM'}</Text>
              </View>
              <View style={styles.ratingConsultationRow}>
                <Text style={styles.ratingConsultationLabel}>Total:</Text>
                <Text style={styles.ratingConsultationValue}>$15:15</Text>
              </View>
            </View>
          </View>

          {/* Feedback Section */}
          <View style={styles.ratingFeedbackCard}>
            <Text style={styles.ratingFeedbackTitle}>How was the experience?</Text>
            <Text style={styles.ratingFeedbackSubtitle}>Share your valuable feedback to help others</Text>
            
            <Text style={styles.ratingMessageLabel}>Your message</Text>
            <TextInput
              style={styles.ratingMessageInput}
              placeholder="Share your experience..."
              value={userReview}
              onChangeText={setUserReview}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <View style={styles.ratingUploadSection}>
              <Text style={styles.ratingUploadLabel}>Upload Doc</Text>
              <View style={styles.ratingUploadField}>
                <ProfessionalIcon type="PAPERCLIP" size={16} color="#6c757d" />
              </View>
            </View>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingStarsCard}>
            <Text style={styles.ratingStarsTitle}>Rate your experience</Text>
            <View style={styles.ratingStarsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                  style={styles.ratingStarButton}
                >
                  <ProfessionalIcon 
                    type="STAR" 
                    size={32} 
                    color={star <= userRating ? "#FFD700" : "#E0E0E0"} 
                  />
                </TouchableOpacity>
              ))}
            </View>
            {userRating > 0 && (
              <Text style={styles.ratingSelectedText}>
                {userRating} star{userRating > 1 ? 's' : ''} selected
              </Text>
            )}
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.ratingFooter}>
          <TouchableOpacity 
            style={styles.ratingSubmitButton}
            onPress={handleSubmitReview}
          >
            <Text style={styles.ratingSubmitText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderUserProfilePage = () => {
    const handleLogout = () => {
      setShowLogoutConfirmation(true);
    };

    return (
      <View style={styles.userProfilePageContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.userProfilePageHeader}>
          <Text style={styles.userProfilePageTitle}>Profile</Text>
        </View>

        <ScrollView style={styles.userProfilePageContent} showsVerticalScrollIndicator={false}>
          {/* User Info Card */}
          <View style={styles.userProfileInfoCard}>
            <View style={styles.userProfileAvatarContainer}>
              <View style={styles.userProfileAvatar}>
                {userProfile.profilePicture ? (
                  <Image 
                    source={userProfile.profilePicture}
                    style={styles.userProfileAvatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <ProfessionalIcon type="USER" size={40} color="#ffffff" />
                )}
              </View>
            </View>
            <Text style={styles.userProfileName}>{userProfile.fullName}</Text>
            <View style={styles.userProfileContactInfo}>
              <View style={styles.userProfileContactItem}>
                <ProfessionalIcon type="EMAIL" size={20} color="#ffffff" />
                <Text style={styles.userProfileContactText}>{userProfile.email}</Text>
              </View>
              <View style={styles.userProfileContactItem}>
                <ProfessionalIcon type="PHONE" size={20} color="#ffffff" />
                <Text style={styles.userProfileContactText}>{userProfile.phone}</Text>
              </View>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.userProfileMenuSection}>
            <TouchableOpacity 
              style={styles.userProfileMenuItem}
              onPress={() => setShowEditProfile(true)}
            >
              <View style={styles.userProfileMenuItemLeft}>
                <ProfessionalIcon type="EDIT" size={24} color="#2E4A6B" />
                <Text style={styles.userProfileMenuItemText}>Manage Profile</Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.userProfileMenuItem}>
              <View style={styles.userProfileMenuItemLeft}>
                <ProfessionalIcon type="BRIEFCASE" size={24} color="#2E4A6B" />
                <Text style={styles.userProfileMenuItemText}>All Payments</Text>
              </View>
              <View style={styles.userProfileComingSoonBadge}>
                <Text style={styles.userProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.userProfileMenuItem}>
              <View style={styles.userProfileMenuItemLeft}>
                <ProfessionalIcon type="CHECKMARK" size={24} color="#2E4A6B" />
                <Text style={styles.userProfileMenuItemText}>Manage Payment</Text>
              </View>
              <View style={styles.userProfileComingSoonBadge}>
                <Text style={styles.userProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.userProfileMenuItem}>
              <View style={styles.userProfileMenuItemLeft}>
                <ProfessionalIcon type="LOCATION" size={24} color="#2E4A6B" />
                <Text style={styles.userProfileMenuItemText}>Edit Address</Text>
              </View>
              <View style={styles.userProfileComingSoonBadge}>
                <Text style={styles.userProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.userProfileMenuItem}>
              <View style={styles.userProfileMenuItemLeft}>
                <ProfessionalIcon type="SETTINGS" size={24} color="#2E4A6B" />
                <Text style={styles.userProfileMenuItemText}>Settings</Text>
              </View>
              <View style={styles.userProfileComingSoonBadge}>
                <Text style={styles.userProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.userProfileMenuItem} onPress={handleLogout}>
              <View style={styles.userProfileMenuItemLeft}>
                <ProfessionalIcon type="LOGOUT" size={24} color="#2E4A6B" />
                <Text style={styles.userProfileMenuItemText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => setShowProfilePage(false)}
          >
            <ProfessionalIcon type="HOME" size={24} color="#6c757d" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => {
              setShowProfilePage(false);
              setShowBookings(true);
            }}
          >
            <ProfessionalIcon type="BOOKMARK" size={24} color="#6c757d" />
            <Text style={styles.navText}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <ProfessionalIcon type="USER" size={24} color="#2E4A6B" />
            <Text style={styles.navTextActive}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleProfileFieldChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setHasProfileChanges(true);
  };

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setHasProfileChanges(false);
    showCustomAlert(
      'success',
      'Profile Updated!',
      'Your profile information has been saved successfully.',
      [
        {
          text: 'OK',
          style: 'primary',
          onPress: () => setShowEditProfile(false)
        }
      ]
    );
  };

  const handleDiscardProfileChanges = () => {
    if (hasProfileChanges) {
      showCustomAlert(
        'confirm',
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => {
              setEditedProfile(userProfile);
              setHasProfileChanges(false);
              setShowEditProfile(false);
            }
          }
        ]
      );
    } else {
      setShowEditProfile(false);
    }
  };

  const handleChangeProfilePicture = () => {
    showCustomAlert(
      'confirm',
      'Change Profile Picture',
      'Choose how you want to update your profile picture:',
      [
        { 
          text: 'Camera', 
          style: 'primary',
          onPress: () => handleTakePhoto()
        },
        { 
          text: 'Gallery', 
          style: 'primary',
          onPress: () => handleSelectFromGallery()
        },
        { 
          text: 'Remove Photo', 
          style: 'destructive',
          onPress: () => handleRemovePhoto()
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleTakePhoto = () => {
    // Demo implementation - in real app, use expo-image-picker
    const demoImages = [
      require('./assets/images/numbered/1.jpg'),
      require('./assets/images/numbered/3.jpg'),
      require('./assets/images/numbered/5.jpg')
    ];
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    
    setEditedProfile(prev => ({
      ...prev,
      profilePicture: randomImage
    }));
    setHasProfileChanges(true);
    
    showCustomAlert(
      'success',
      'Photo Captured!',
      'Your profile picture has been updated.',
      [{ text: 'OK', style: 'primary' }]
    );
  };

  const handleSelectFromGallery = () => {
    // Demo implementation - in real app, use expo-image-picker
    const demoImages = [
      require('./assets/images/numbered/2.jpg'),
      require('./assets/images/numbered/4.jpg'),
      require('./assets/images/numbered/6.png'),
      require('./assets/images/numbered/8.png')
    ];
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    
    setEditedProfile(prev => ({
      ...prev,
      profilePicture: randomImage
    }));
    setHasProfileChanges(true);
    
    showCustomAlert(
      'success',
      'Photo Selected!',
      'Your profile picture has been updated from gallery.',
      [{ text: 'OK', style: 'primary' }]
    );
  };

  const handleRemovePhoto = () => {
    setEditedProfile(prev => ({
      ...prev,
      profilePicture: null
    }));
    setHasProfileChanges(true);
    
    showCustomAlert(
      'success',
      'Photo Removed!',
      'Your profile picture has been removed.',
      [{ text: 'OK', style: 'primary' }]
    );
  };

  const renderEditProfilePage = () => {

    return (
      <View style={styles.editProfileContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.editProfileHeader}>
          <TouchableOpacity
            onPress={handleDiscardProfileChanges}
            style={styles.editProfileBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.editProfileTitle}>Edit Profile</Text>
          <TouchableOpacity 
            style={[
              styles.editProfileSaveButton,
              !hasProfileChanges && styles.editProfileSaveButtonDisabled
            ]}
            onPress={handleSaveProfile}
            disabled={!hasProfileChanges}
          >
            <Text style={[
              styles.editProfileSaveText,
              !hasProfileChanges && styles.editProfileSaveTextDisabled
            ]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.editProfileContent} showsVerticalScrollIndicator={false}>
          {/* Profile Photo Section */}
          <View style={styles.editProfilePhotoSection}>
            <View style={styles.editProfilePhotoContainer}>
              <View style={styles.editProfileAvatar}>
                {editedProfile.profilePicture ? (
                  <Image 
                    source={editedProfile.profilePicture}
                    style={styles.editProfileAvatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <ProfessionalIcon type="USER" size={32} color="#ffffff" />
                )}
              </View>
            </View>
            <TouchableOpacity 
              style={styles.editProfileChangePhotoButton}
              onPress={handleChangeProfilePicture}
            >
              <ProfessionalIcon type="CHECKMARK" size={14} color="#2E4A6B" />
              <Text style={styles.editProfileChangePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Personal Information */}
          <View style={styles.editProfileSection}>
            <View style={styles.editProfileSectionHeader}>
              <ProfessionalIcon type="USER" size={18} color="#2E4A6B" />
              <Text style={styles.editProfileSectionTitle}>Personal Information</Text>
            </View>
            
            <View style={styles.editProfileFormRow}>
              <View style={styles.editProfileFormField}>
                <Text style={styles.editProfileFieldLabel}>Full Name</Text>
                <TextInput
                  style={styles.editProfileTextInput}
                  value={editedProfile.fullName}
                  onChangeText={(value) => handleProfileFieldChange('fullName', value)}
                  placeholder="Enter full name"
                />
              </View>
              <View style={styles.editProfileFormField}>
                <Text style={styles.editProfileFieldLabel}>Email Address</Text>
                <TextInput
                  style={styles.editProfileTextInput}
                  value={editedProfile.email}
                  onChangeText={(value) => handleProfileFieldChange('email', value)}
                  placeholder="Enter email"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.editProfileFormRow}>
              <View style={styles.editProfileFormField}>
                <Text style={styles.editProfileFieldLabel}>Phone Number</Text>
                <TextInput
                  style={styles.editProfileTextInput}
                  value={editedProfile.phone}
                  onChangeText={(value) => handleProfileFieldChange('phone', value)}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.editProfileFormField}>
                <Text style={styles.editProfileFieldLabel}>Date of Birth</Text>
                <TextInput
                  style={styles.editProfileTextInput}
                  value={editedProfile.dateOfBirth}
                  onChangeText={(value) => handleProfileFieldChange('dateOfBirth', value)}
                  placeholder="DD/MM/YYYY"
                />
              </View>
            </View>
          </View>

          {/* Address Information */}
          <View style={styles.editProfileSection}>
            <View style={styles.editProfileSectionHeader}>
              <ProfessionalIcon type="LOCATION" size={18} color="#2E4A6B" />
              <Text style={styles.editProfileSectionTitle}>Address Information</Text>
            </View>
            
            <View style={styles.editProfileFormField}>
              <Text style={styles.editProfileFieldLabel}>Street Address</Text>
              <TextInput
                style={styles.editProfileTextInput}
                value={editedProfile.streetAddress}
                onChangeText={(value) => handleProfileFieldChange('streetAddress', value)}
                placeholder="Enter street address"
              />
            </View>

            <View style={styles.editProfileFormRow}>
              <View style={styles.editProfileFormField}>
                <Text style={styles.editProfileFieldLabel}>City</Text>
                <TextInput
                  style={styles.editProfileTextInput}
                  value={editedProfile.city}
                  onChangeText={(value) => handleProfileFieldChange('city', value)}
                  placeholder="Enter city"
                />
              </View>
              <View style={styles.editProfileFormField}>
                <Text style={styles.editProfileFieldLabel}>State</Text>
                <TextInput
                  style={styles.editProfileTextInput}
                  value={editedProfile.state}
                  onChangeText={(value) => handleProfileFieldChange('state', value)}
                  placeholder="Enter state"
                />
              </View>
            </View>

            <View style={styles.editProfileFormField}>
              <Text style={styles.editProfileFieldLabel}>ZIP Code</Text>
              <TextInput
                style={styles.editProfileTextInput}
                value={editedProfile.zipCode}
                onChangeText={(value) => handleProfileFieldChange('zipCode', value)}
                placeholder="Enter ZIP code"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Changes Indicator */}
          {hasProfileChanges && (
            <View style={styles.editProfileChangesIndicator}>
              <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
              <Text style={styles.editProfileChangesText}>You have unsaved changes</Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleDiscardProfileChanges}
          >
            <ProfessionalIcon type="HOME" size={24} color="#6c757d" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => {
              handleDiscardProfileChanges();
              setShowBookings(true);
            }}
          >
            <ProfessionalIcon type="BOOKMARK" size={24} color="#6c757d" />
            <Text style={styles.navText}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => {
              handleDiscardProfileChanges();
              setShowProfilePage(true);
            }}
          >
            <ProfessionalIcon type="USER" size={24} color="#2E4A6B" />
            <Text style={styles.navTextActive}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLogoutConfirmationPage = () => {
    const handleConfirmLogout = () => {
      setShowLogoutConfirmation(false);
      setShowProfilePage(false);
      setCurrentScreen('login');
    };

    const handleCancelLogout = () => {
      setShowLogoutConfirmation(false);
    };

    return (
      <View style={styles.logoutConfirmationContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.logoutConfirmationHeader}>
          <TouchableOpacity
            onPress={handleCancelLogout}
            style={styles.logoutConfirmationBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.logoutConfirmationTitle}>Logout</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.logoutConfirmationContent} showsVerticalScrollIndicator={false}>
          {/* Logout Icon */}
          <View style={styles.logoutConfirmationIconContainer}>
            <View style={styles.logoutConfirmationIconCircle}>
              <ProfessionalIcon type="LOGOUT" size={40} color="#2E4A6B" />
            </View>
          </View>

          {/* Confirmation Message */}
          <View style={styles.logoutConfirmationMessageSection}>
            <Text style={styles.logoutConfirmationMainText}>Are you sure you want to logout?</Text>
            <Text style={styles.logoutConfirmationSubText}>
              You will need to sign in again to access your account and bookings.
            </Text>
          </View>

          {/* Account Summary */}
          <View style={styles.logoutConfirmationSummarySection}>
            <Text style={styles.logoutConfirmationSummaryTitle}>Account Summary</Text>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Total Bookings:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>5</Text>
            </View>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Active Consultations:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>2</Text>
            </View>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Member Since:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>Jan 2024</Text>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.logoutConfirmationButtonsSection}>
          <TouchableOpacity
            style={styles.logoutConfirmationCancelButton}
            onPress={handleCancelLogout}
          >
            <Text style={styles.logoutConfirmationCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutConfirmationLogoutButton}
            onPress={handleConfirmLogout}
          >
            <Text style={styles.logoutConfirmationLogoutButtonText}>Yes, Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleCancelLogout}
          >
            <ProfessionalIcon type="HOME" size={24} color="#6c757d" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => {
              setShowLogoutConfirmation(false);
              setShowBookings(true);
            }}
          >
            <ProfessionalIcon type="BOOKMARK" size={24} color="#6c757d" />
            <Text style={styles.navText}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => {
              setShowLogoutConfirmation(false);
              setShowProfilePage(true);
            }}
          >
            <ProfessionalIcon type="USER" size={24} color="#2E4A6B" />
            <Text style={styles.navTextActive}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCustomModal = () => {
    if (!showCustomModal) return null;

    const getModalIcon = () => {
      switch (modalConfig.type) {
        case 'success':
          return <ProfessionalIcon type="CHECKMARK" size={48} color="#28a745" />;
        case 'warning':
          return <ProfessionalIcon type="WARNING" size={48} color="#ffc107" />;
        case 'confirm':
          return <ProfessionalIcon type="HELP" size={48} color="#dc3545" />;
        default:
          return <ProfessionalIcon type="CHECKMARK" size={48} color="#28a745" />;
      }
    };

    const getModalColor = () => {
      switch (modalConfig.type) {
        case 'success':
          return '#28a745';
        case 'warning':
          return '#ffc107';
        case 'confirm':
          return '#dc3545';
        default:
          return '#28a745';
      }
    };

    return (
      <View style={styles.customModalOverlay}>
        <View style={styles.customModalContainer}>
          {/* Modal Icon */}
          <View style={[styles.customModalIconContainer, { backgroundColor: `${getModalColor()}20` }]}>
            {getModalIcon()}
          </View>

          {/* Modal Content */}
          <View style={styles.customModalContent}>
            <Text style={styles.customModalTitle}>{modalConfig.title}</Text>
            <Text style={styles.customModalMessage}>{modalConfig.message}</Text>
          </View>

          {/* Modal Buttons */}
          <View style={styles.customModalButtonsContainer}>
            {modalConfig.buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.customModalButton,
                  button.style === 'destructive' ? styles.customModalButtonDestructive :
                  button.style === 'cancel' ? styles.customModalButtonCancel :
                  styles.customModalButtonPrimary
                ]}
                onPress={() => {
                  setShowCustomModal(false);
                  if (button.onPress) button.onPress();
                }}
              >
                <Text style={[
                  styles.customModalButtonText,
                  button.style === 'destructive' ? styles.customModalButtonTextDestructive :
                  button.style === 'cancel' ? styles.customModalButtonTextCancel :
                  styles.customModalButtonTextPrimary
                ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderRescheduleBookingScreen = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const timeSlots = [
      '9:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM', 
      '11:00 AM - 12:00 PM',
      '2:00 PM - 3:00 PM',
      '3:00 PM - 4:00 PM',
      '4:00 PM - 5:00 PM'
    ];

    const getDaysInMonth = (month, year) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
      return new Date(year, month, 1).getDay();
    };

    const handleDateSelect = (day) => {
      setRescheduleSelectedDate(day);
    };

    const handleTimeSlotSelect = (timeSlot) => {
      setRescheduleSelectedTimeSlot(timeSlot);
    };

    const handleConfirmReschedule = () => {
      if (!rescheduleSelectedDate || !rescheduleSelectedTimeSlot) {
        showCustomAlert(
          'warning',
          'Missing Information',
          'Please select both a new date and time slot for your booking.',
          [
            { text: 'OK', style: 'primary' }
          ]
        );
        return;
      }

      // Update the booking with new date and time
      const updatedBooking = {
        ...rescheduleBooking,
        date: `${rescheduleSelectedDate.toString().padStart(2, '0')}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`,
        time: rescheduleSelectedTimeSlot
      };

      // Update in userBookings array
      setUserBookings(prev => 
        prev.map(booking => 
          booking.id === rescheduleBooking.id 
            ? updatedBooking
            : booking
        )
      );

      // Update selectedBooking if it's the same one
      if (selectedBooking && selectedBooking.id === rescheduleBooking.id) {
        setSelectedBooking(updatedBooking);
      }

      showCustomAlert(
        'success',
        'Booking Rescheduled!',
        'Your booking has been successfully rescheduled. You will receive a confirmation email shortly.',
        [
          {
            text: 'OK',
            style: 'primary',
            onPress: () => {
              setShowRescheduleBooking(false);
              setShowBookingDetails(true);
            }
          }
        ]
      );
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth, currentYear);
      const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
      const days = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<View key={`empty-${i}`} style={styles.calendarDayEmpty} />);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = rescheduleSelectedDate === day;
        const isToday = day === new Date().getDate() && 
                       currentMonth === new Date().getMonth() && 
                       currentYear === new Date().getFullYear();
        
        days.push(
          <TouchableOpacity
            key={day}
            style={[
              styles.calendarDay,
              isSelected && styles.calendarDaySelected,
              isToday && styles.calendarDayToday
            ]}
            onPress={() => handleDateSelect(day)}
          >
            <Text style={[
              styles.calendarDayText,
              isSelected && styles.calendarDayTextSelected,
              isToday && styles.calendarDayTextToday
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        );
      }

      return days;
    };

    return (
      <View style={styles.rescheduleContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.rescheduleHeader}>
          <TouchableOpacity 
            onPress={() => setShowRescheduleBooking(false)}
            style={styles.rescheduleBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.rescheduleTitle}>Reschedule Booking</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.rescheduleContent} showsVerticalScrollIndicator={false}>
          {/* Booking Info */}
          <View style={styles.rescheduleBookingInfo}>
            <Text style={styles.rescheduleBookingTitle}>Current Booking</Text>
            <View style={styles.rescheduleBookingDetails}>
              <Text style={styles.rescheduleBookingLawyer}>{rescheduleBooking?.lawyerName}</Text>
              <Text style={styles.rescheduleBookingCurrent}>
                Current: {rescheduleBooking?.date} at {rescheduleBooking?.time}
              </Text>
            </View>
          </View>

          {/* Calendar Section */}
          <View style={styles.rescheduleCalendarSection}>
            <View style={styles.rescheduleCalendarHeader}>
              <TouchableOpacity onPress={() => handleMonthChange('prev')}>
                <ProfessionalIcon type="ARROW_LEFT" size={20} color="#2E4A6B" />
              </TouchableOpacity>
              <Text style={styles.rescheduleCalendarTitle}>
                {months[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity onPress={() => handleMonthChange('next')}>
                <ProfessionalIcon type="ARROW_RIGHT" size={20} color="#2E4A6B" />
              </TouchableOpacity>
            </View>

            <View style={styles.rescheduleCalendarWeekHeader}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <Text key={day} style={styles.rescheduleCalendarWeekDay}>{day}</Text>
              ))}
            </View>

            <View style={styles.rescheduleCalendarGrid}>
              {renderCalendar()}
            </View>
          </View>

          {/* Time Slots Section */}
          <View style={styles.rescheduleTimeSection}>
            <Text style={styles.rescheduleTimeSectionTitle}>Select New Time</Text>
            <View style={styles.rescheduleTimeSlots}>
              {timeSlots.map((timeSlot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.rescheduleTimeSlot,
                    rescheduleSelectedTimeSlot === timeSlot && styles.rescheduleTimeSlotSelected
                  ]}
                  onPress={() => handleTimeSlotSelect(timeSlot)}
                >
                  <Text style={[
                    styles.rescheduleTimeSlotText,
                    rescheduleSelectedTimeSlot === timeSlot && styles.rescheduleTimeSlotTextSelected
                  ]}>
                    {timeSlot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Selected Info */}
          {(rescheduleSelectedDate || rescheduleSelectedTimeSlot) && (
            <View style={styles.rescheduleSelectedInfo}>
              <Text style={styles.rescheduleSelectedTitle}>New Appointment Details</Text>
              {rescheduleSelectedDate && (
                <Text style={styles.rescheduleSelectedDetail}>
                  Date: {rescheduleSelectedDate} {months[currentMonth]} {currentYear}
                </Text>
              )}
              {rescheduleSelectedTimeSlot && (
                <Text style={styles.rescheduleSelectedDetail}>
                  Time: {rescheduleSelectedTimeSlot}
                </Text>
              )}
            </View>
          )}
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.rescheduleFooter}>
          <TouchableOpacity
            style={[
              styles.rescheduleConfirmButton,
              (!rescheduleSelectedDate || !rescheduleSelectedTimeSlot) && styles.rescheduleConfirmButtonDisabled
            ]}
            onPress={handleConfirmReschedule}
            disabled={!rescheduleSelectedDate || !rescheduleSelectedTimeSlot}
          >
            <Text style={[
              styles.rescheduleConfirmButtonText,
              (!rescheduleSelectedDate || !rescheduleSelectedTimeSlot) && styles.rescheduleConfirmButtonTextDisabled
            ]}>
              Confirm Reschedule
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderServicesPage = () => {
    // Law Firms Data (8-10 firms)
    const lawFirms = [
      {
        id: '1',
        name: 'Johnson & Associates Law Firm',
        specialty: selectedService,
        rating: 4.8,
        lawyers: 15,
        location: '2.1 km away',
        description: 'Leading law firm specializing in corporate and civil law matters.',
        image: require('./assets/images/lawfirm/lawfirm1.png')
      },
      {
        id: '2',
        name: 'Smith Legal Services',
        specialty: selectedService,
        rating: 4.6,
        lawyers: 8,
        location: '1.5 km away',
        description: 'Experienced legal team with decades of combined experience.',
        image: require('./assets/images/lawfirm/lawfirm2.png')
      },
      {
        id: '3',
        name: 'Williams & Partners',
        specialty: selectedService,
        rating: 4.9,
        lawyers: 22,
        location: '3.2 km away',
        description: 'Full-service law firm with expertise across multiple practice areas.',
        image: require('./assets/images/lawfirm/lawfirm3.png')
      },
      {
        id: '4',
        name: 'Davis Legal Group',
        specialty: selectedService,
        rating: 4.7,
        lawyers: 12,
        location: '2.8 km away',
        description: 'Trusted legal advisors serving clients for over 20 years.',
        image: require('./assets/images/lawfirm/lawfirm4.png')
      },
      {
        id: '5',
        name: 'Brown & Co Law Office',
        specialty: selectedService,
        rating: 4.5,
        lawyers: 6,
        location: '1.9 km away',
        description: 'Boutique firm focused on providing personalized legal solutions.',
        image: require('./assets/images/lawfirm/lawfirm5.png')
      },
      {
        id: '6',
        name: 'Miller Legal Consultants',
        specialty: selectedService,
        rating: 4.8,
        lawyers: 18,
        location: '2.5 km away',
        description: 'Innovation-driven legal practice with modern approach.',
        image: require('./assets/images/lawfirm/lawfirm6.png')
      },
      {
        id: '7',
        name: 'Wilson Law Corporation',
        specialty: selectedService,
        rating: 4.4,
        lawyers: 10,
        location: '3.5 km away',
        description: 'Comprehensive legal services with client-first approach.',
        image: require('./assets/images/lawfirm/lawfirm7.png')
      },
      {
        id: '8',
        name: 'Anderson Legal Solutions',
        specialty: selectedService,
        rating: 4.7,
        lawyers: 14,
        location: '2.3 km away',
        description: 'Result-oriented legal professionals with proven track record.',
        image: require('./assets/images/lawfirm/lawfirm8.png')
      },
      {
        id: '9',
        name: 'Taylor & Associates',
        specialty: selectedService,
        rating: 4.6,
        lawyers: 9,
        location: '1.8 km away',
        description: 'Dedicated team providing excellence in legal representation.',
        image: require('./assets/images/lawfirm/lawfirm9.png')
      }
    ];

    // Lawyers Data (5-8 lawyers)
    const serviceLawyers = [
      {
        id: '1',
        name: 'Emily Johnson',
        specialty: selectedService,
        rating: 4.9,
        distance: '1.2 km',
        hourlyRate: '$18/hr',
        experience: '8 years',
        cases: '2.1k Cases',
        successRate: '96% Success',
        profileImage: require('./assets/images/lawyer/lawyer10.png')
      },
      {
        id: '2',
        name: 'Michael Davis',
        specialty: selectedService,
        rating: 4.7,
        distance: '2.0 km',
        hourlyRate: '$22/hr',
        experience: '12 years',
        cases: '3.8k Cases',
        successRate: '94% Success',
        profileImage: require('./assets/images/lawyer/lawyer11.png')
      },
      {
        id: '3',
        name: 'Sarah Wilson',
        specialty: selectedService,
        rating: 4.8,
        distance: '1.5 km',
        hourlyRate: '$20/hr',
        experience: '10 years',
        cases: '2.9k Cases',
        successRate: '98% Success',
        profileImage: require('./assets/images/lawyer/lawyer12.png')
      },
      {
        id: '4',
        name: 'David Brown',
        specialty: selectedService,
        rating: 4.6,
        distance: '2.8 km',
        hourlyRate: '$16/hr',
        experience: '6 years',
        cases: '1.5k Cases',
        successRate: '92% Success',
        profileImage: require('./assets/images/lawyer/lawyer13.png')
      },
      {
        id: '5',
        name: 'Jennifer Taylor',
        specialty: selectedService,
        rating: 4.9,
        distance: '1.7 km',
        hourlyRate: '$25/hr',
        experience: '15 years',
        cases: '4.2k Cases',
        successRate: '99% Success',
        profileImage: require('./assets/images/lawyer/lawyer14.png')
      },
      {
        id: '6',
        name: 'Robert Miller',
        specialty: selectedService,
        rating: 4.5,
        distance: '3.1 km',
        hourlyRate: '$19/hr',
        experience: '9 years',
        cases: '2.7k Cases',
        successRate: '93% Success',
        profileImage: require('./assets/images/lawyer/lawyer15.png')
      },
      {
        id: '7',
        name: 'Lisa Anderson',
        specialty: selectedService,
        rating: 4.8,
        distance: '2.2 km',
        hourlyRate: '$21/hr',
        experience: '11 years',
        cases: '3.3k Cases',
        successRate: '97% Success',
        profileImage: require('./assets/images/lawyer/lawyer16.png')
      }
    ];

    const handleLawyerSelect = (lawyer) => {
      const lawyerData = {
        name: lawyer.name,
        specialty: lawyer.specialty,
        rating: lawyer.rating,
        avatar: lawyer.profileImage,
        profileImage: lawyer.profileImage,
        distance: lawyer.distance,
        hourlyRate: lawyer.hourlyRate,
        cases: lawyer.cases,
        successRate: lawyer.successRate,
        description: 'Experienced legal professional with expertise in ' + lawyer.specialty + '. Committed to providing excellent legal representation and achieving favorable outcomes for clients.',
        reviews: `${Math.floor(lawyer.rating * 50)} Reviews`
      };
      setSelectedLawyer(lawyerData);
      setShowServicesPage(false);
      setShowLawyerDetails(true);
    };

    const handleFirmPress = (firm) => {
      setSelectedLawFirm(firm);
      setShowLawFirmDetails(true);
    };

    return (
      <View style={styles.servicesContainer}>
        <StatusBar style="light" />
        
        {/* Fixed Navigation Header */}
        <View style={styles.servicesNavHeader}>
          <TouchableOpacity 
            onPress={() => setShowServicesPage(false)}
            style={styles.servicesBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.servicesNavTitle}>Service Detail</Text>
          <TouchableOpacity style={styles.servicesFilterButton}>
            <ProfessionalIcon type="SETTINGS" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.servicesScrollContent} showsVerticalScrollIndicator={false}>
          {/* Enhanced Hero Header */}
          <View style={styles.servicesHeroHeader}>
            <View style={styles.servicesHeroBackground}>
              <View style={styles.servicesHeroOverlay} />
              <View style={styles.servicesHeroContent}>
                {/* Service Title */}
                <View style={styles.servicesHeroInfo}>
                  <View style={styles.serviceIconContainer}>
                    <ProfessionalIcon type="SCALE" size={32} color="#ffffff" />
                  </View>
                  <Text style={styles.servicesHeroTitle}>{selectedService}</Text>
                  <Text style={styles.servicesHeroSubtitle}>Legal Services</Text>
                </View>
                
                {/* Stats Row - Absolutely Positioned */}
                <View style={styles.servicesStatsRow}>
                  <View style={styles.serviceStat}>
                    <Text style={styles.serviceStatNumber}>{lawFirms.length}</Text>
                    <Text style={styles.serviceStatLabel}>Law Firms</Text>
                  </View>
                  <View style={styles.serviceStatDivider} />
                  <View style={styles.serviceStat}>
                    <Text style={styles.serviceStatNumber}>{serviceLawyers.length}</Text>
                    <Text style={styles.serviceStatLabel}>Lawyers</Text>
                  </View>
                  <View style={styles.serviceStatDivider} />
                  <View style={styles.serviceStat}>
                    <Text style={styles.serviceStatNumber}>4.8</Text>
                    <Text style={styles.serviceStatLabel}>Avg Rating</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Service Description Card */}
          <View style={styles.serviceDescriptionCard}>
            <View style={styles.serviceDescriptionHeader}>
              <View style={styles.serviceDescriptionIcon}>
                <ProfessionalIcon type="LIGHTBULB" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.serviceDescriptionTitle}>
                About {selectedService} Law
              </Text>
            </View>
            <Text style={styles.serviceDescriptionText}>
              Connect with experienced {selectedService.toLowerCase()} attorneys and law firms. 
              Get professional legal consultation, representation, and expert advice from qualified professionals 
              who specialize in {selectedService.toLowerCase()} law matters.
            </Text>
            <View style={styles.serviceFeatures}>
              <View style={styles.serviceFeature}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.serviceFeatureText}>Expert Legal Advice</Text>
              </View>
              <View style={styles.serviceFeature}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.serviceFeatureText}>Professional Representation</Text>
              </View>
              <View style={styles.serviceFeature}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.serviceFeatureText}>Competitive Rates</Text>
              </View>
            </View>
          </View>

          {/* Enhanced Law Firms Section */}
          <View style={styles.servicesSection}>
            <View style={styles.servicesSectionHeader}>
              <View>
                <Text style={styles.servicesSectionTitle}>Top Law Firms</Text>
                <Text style={styles.servicesSectionSubtitle}>
                  {lawFirms.length} premier firms specializing in {selectedService}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.sectionViewAllButton}
                onPress={() => setShowViewAllFirms(true)}
              >
                <Text style={styles.sectionViewAllText}>View All</Text>
                <ProfessionalIcon type="ARROW_RIGHT" size={16} color="#2E4A6B" />
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lawFirmsScrollView}>
              <View style={styles.lawFirmsHorizontalContainer}>
                {lawFirms.slice(0, 5).map((firm) => (
                  <TouchableOpacity
                    key={firm.id}
                    style={styles.lawFirmCard}
                    onPress={() => handleFirmPress(firm)}
                  >
                    <View style={styles.lawFirmCardHeader}>
                      <View style={styles.lawFirmImageContainer}>
                        <Image source={firm.image} style={styles.lawFirmImage} />
                      </View>
                    </View>
                    <View style={styles.lawFirmCardContent}>
                      <Text style={styles.lawFirmName}>{firm.name}</Text>
                      <Text style={styles.lawFirmSpecialty}>{firm.specialty}</Text>
                      <View style={styles.lawFirmQuickStats}>
                        <View style={styles.lawFirmQuickStat}>
                          <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                          <Text style={styles.lawFirmQuickStatText}>{firm.rating}</Text>
                        </View>
                        <View style={styles.lawFirmQuickStat}>
                          <ProfessionalIcon type="USER" size={14} color="#6c757d" />
                          <Text style={styles.lawFirmQuickStatText}>{firm.lawyers} lawyers</Text>
                        </View>
                        <View style={styles.lawFirmQuickStat}>
                          <ProfessionalIcon type="LOCATION" size={14} color="#6c757d" />
                          <Text style={styles.lawFirmQuickStatText}>{firm.location}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Enhanced Individual Lawyers Section */}
          <View style={styles.servicesSection}>
            <View style={styles.servicesSectionHeader}>
              <View>
                <Text style={styles.servicesSectionTitle}>Expert Lawyers</Text>
                <Text style={styles.servicesSectionSubtitle}>
                  {serviceLawyers.length} experienced attorneys available
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.sectionViewAllButton}
                onPress={() => setShowViewAllLawyers(true)}
              >
                <Text style={styles.sectionViewAllText}>View All</Text>
                <ProfessionalIcon type="ARROW_RIGHT" size={16} color="#2E4A6B" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.lawyersGrid}>
              {serviceLawyers.map((lawyer) => (
                <TouchableOpacity
                  key={lawyer.id}
                  style={styles.serviceLawyerCard}
                  onPress={() => handleLawyerSelect(lawyer)}
                >
                  <View style={styles.serviceLawyerHeader}>
                    <View style={styles.serviceLawyerImageContainer}>
                      <Image source={lawyer.profileImage} style={styles.serviceLawyerImage} />
                    </View>
                    <View style={styles.serviceLawyerRatingContainer}>
                      <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                      <Text style={styles.serviceLawyerRating}>{lawyer.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.serviceLawyerInfo}>
                    <Text style={styles.serviceLawyerName}>{lawyer.name}</Text>
                    <Text style={styles.serviceLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.serviceLawyerExperience}>{lawyer.experience} experience</Text>
                    
                    <View style={styles.serviceLawyerStats}>
                      <View style={styles.serviceLawyerStat}>
                        <ProfessionalIcon type="BRIEFCASE" size={12} color="#2E4A6B" />
                        <Text style={styles.serviceLawyerStatText}>{lawyer.cases}</Text>
                      </View>
                      <View style={styles.serviceLawyerStat}>
                        <ProfessionalIcon type="CHECKMARK" size={12} color="#28a745" />
                        <Text style={styles.serviceLawyerStatText}>{lawyer.successRate}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.serviceLawyerFooter}>
                      <Text style={styles.serviceLawyerRate}>{lawyer.hourlyRate}</Text>
                      <View style={styles.serviceLawyerDistance}>
                        <ProfessionalIcon type="LOCATION" size={12} color="#6c757d" />
                        <Text style={styles.serviceLawyerDistanceText}>{lawyer.distance}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.servicesBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  const renderAllHomeLawFirmsPage = () => {
    // All Available Law Firms Data (comprehensive list - 22 firms total)
    const allHomeLawFirms = [
      { id: '1', name: 'Sterling Legal Associates', specialty: 'Corporate Law', rating: '4.8', lawyers: 15, location: '2.1 km', image: require('./assets/images/lawfirm/lawfirm1.png') },
      { id: '2', name: 'Blackstone Law Group', specialty: 'Criminal Defense', rating: '4.6', lawyers: 8, location: '1.5 km', image: require('./assets/images/lawfirm/lawfirm2.png') },
      { id: '3', name: 'Heritage Legal Partners', specialty: 'Family Law', rating: '4.9', lawyers: 22, location: '3.2 km', image: require('./assets/images/lawfirm/lawfirm3.png') },
      { id: '4', name: 'Phoenix Legal Solutions', specialty: 'Personal Injury', rating: '4.7', lawyers: 12, location: '2.8 km', image: require('./assets/images/lawfirm/lawfirm4.png') },
      { id: '5', name: 'Meridian Law Office', specialty: 'Real Estate', rating: '4.5', lawyers: 6, location: '1.9 km', image: require('./assets/images/lawfirm/lawfirm5.png') },
      { id: '6', name: 'Pinnacle Legal Consultants', specialty: 'Business Law', rating: '4.8', lawyers: 18, location: '2.5 km', image: require('./assets/images/lawfirm/lawfirm6.png') },
      { id: '7', name: 'Horizon Law Corporation', specialty: 'Immigration', rating: '4.4', lawyers: 10, location: '3.5 km', image: require('./assets/images/lawfirm/lawfirm7.png') },
      { id: '8', name: 'Summit Legal Services', specialty: 'Tax Law', rating: '4.7', lawyers: 14, location: '2.3 km', image: require('./assets/images/lawfirm/lawfirm8.png') },
      { id: '9', name: 'Apex Legal Group', specialty: 'Employment Law', rating: '4.6', lawyers: 9, location: '1.8 km', image: require('./assets/images/lawfirm/lawfirm9.png') },
      { id: '10', name: 'Elite Law Firm', specialty: 'Intellectual Property', rating: '4.9', lawyers: 16, location: '1.9 km', image: require('./assets/images/lawfirm/lawfirm10.png') },
      { id: '11', name: 'Premier Legal Associates', specialty: 'Medical Malpractice', rating: '4.8', lawyers: 11, location: '2.7 km', image: require('./assets/images/lawfirm/lawfirm11.png') },
      { id: '12', name: 'Coastal Legal Group', specialty: 'Environmental Law', rating: '4.5', lawyers: 7, location: '3.1 km', image: require('./assets/images/lawfirm/lawfirm12.png') },
      { id: '13', name: 'Metropolitan Law Partners', specialty: 'Bankruptcy Law', rating: '4.7', lawyers: 13, location: '2.4 km', image: require('./assets/images/lawfirm/lawfirm13.png') },
      { id: '14', name: 'Liberty Legal Office', specialty: 'Civil Rights', rating: '4.6', lawyers: 8, location: '2.9 km', image: require('./assets/images/lawfirm/lawfirm14.png') },
      { id: '15', name: 'Capitol Legal Services', specialty: 'Contract Law', rating: '4.8', lawyers: 15, location: '1.6 km', image: require('./assets/images/lawfirm/lawfirm15.png') },
      { id: '16', name: 'Prestige Law Associates', specialty: 'Securities Law', rating: '4.9', lawyers: 19, location: '3.8 km', image: require('./assets/images/lawfirm/lawfirm16.png') },
      { id: '17', name: 'Innovation Legal Group', specialty: 'Patent Law', rating: '4.7', lawyers: 12, location: '2.2 km', image: require('./assets/images/lawfirm/lawfirm17.png') },
      { id: '18', name: 'Harmony Law Partners', specialty: 'Divorce Law', rating: '4.5', lawyers: 9, location: '2.6 km', image: require('./assets/images/lawfirm/lawfirm18.png') },
      { id: '19', name: 'Guardian Legal Corporation', specialty: 'DUI Defense', rating: '4.6', lawyers: 6, location: '1.7 km', image: require('./assets/images/lawfirm/lawfirm19.png') },
      { id: '20', name: 'Cornerstone Legal Solutions', specialty: 'Workers Compensation', rating: '4.8', lawyers: 14, location: '3.3 km', image: require('./assets/images/lawfirm/lawfirm20.png') },
      { id: '21', name: 'Vanguard Law Firm', specialty: 'Construction Law', rating: '4.7', lawyers: 10, location: '2.0 km', image: require('./assets/images/lawfirm/lawfirm21.png') },
      { id: '22', name: 'Nexus Legal Associates', specialty: 'Entertainment Law', rating: '4.9', lawyers: 13, location: '1.4 km', image: require('./assets/images/lawfirm/lawfirm22.png') }
    ];

    const handleAllHomeLawFirmsSelect = (firm) => {
      setSelectedLawFirm(firm);
      setShowAllHomeLawFirms(false);
      setShowLawFirmDetails(true);
    };

    return (
      <View style={styles.allHomeLawFirmsContainer}>
        <StatusBar style="light" />
        
        {/* Fixed Navigation Header */}
        <View style={styles.allHomeLawFirmsNavHeader}>
          <TouchableOpacity 
            onPress={() => setShowAllHomeLawFirms(false)}
            style={styles.servicesBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.servicesNavTitle}>All Law Firms</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        
        <ScrollView style={styles.allHomeLawFirmsScrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Info */}
          <View style={styles.allHomeLawFirmsHeaderInfo}>
            <Text style={styles.allHomeLawFirmsTitle}>All Available Law Firms</Text>
            <Text style={styles.allHomeLawFirmsSubtitle}>{allHomeLawFirms.length} professional law firms available in your area</Text>
          </View>

          {/* All Law Firms Grid */}
          <View style={styles.allHomeLawFirmsGrid}>
            {allHomeLawFirms.map((firm) => (
              <TouchableOpacity
                key={firm.id}
                style={styles.allHomeLawFirmCard}
                onPress={() => handleAllHomeLawFirmsSelect(firm)}
              >
                <View style={styles.allHomeLawFirmImageContainer}>
                  <Image source={firm.image} style={styles.allHomeLawFirmImage} />
                </View>
                <View style={styles.allHomeLawFirmInfo}>
                  <Text style={styles.allHomeLawFirmName}>{firm.name}</Text>
                  <Text style={styles.allHomeLawFirmSpecialty}>{firm.specialty}</Text>
                  <View style={styles.allHomeLawFirmStats}>
                    <View style={styles.allHomeLawFirmStat}>
                      <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                      <Text style={styles.allHomeLawFirmStatText}>{firm.rating}</Text>
                    </View>
                    <View style={styles.allHomeLawFirmStat}>
                      <ProfessionalIcon type="USER" size={14} color="#6c757d" />
                      <Text style={styles.allHomeLawFirmStatText}>{firm.lawyers} lawyers</Text>
                    </View>
                    <View style={styles.allHomeLawFirmStat}>
                      <ProfessionalIcon type="LOCATION" size={14} color="#6c757d" />
                      <Text style={styles.allHomeLawFirmStatText}>{firm.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.allHomeLawFirmsBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  const renderViewAllLawyersPage = () => {
    // Extended Lawyers Data (showing more lawyers for the selected service)
    const allServiceLawyers = [
      {
        id: '1',
        name: 'Emily Johnson',
        specialty: selectedService,
        rating: 4.9,
        distance: '1.2 km',
        hourlyRate: '$18/hr',
        experience: '8 years',
        cases: '2.1k Cases',
        successRate: '96% Success',
        profileImage: require('./assets/images/lawyer/lawyer10.png')
      },
      {
        id: '2',
        name: 'Michael Davis',
        specialty: selectedService,
        rating: 4.7,
        distance: '2.0 km',
        hourlyRate: '$22/hr',
        experience: '12 years',
        cases: '3.8k Cases',
        successRate: '94% Success',
        profileImage: require('./assets/images/lawyer/lawyer11.png')
      },
      {
        id: '3',
        name: 'Sarah Wilson',
        specialty: selectedService,
        rating: 4.8,
        distance: '1.5 km',
        hourlyRate: '$20/hr',
        experience: '10 years',
        cases: '2.9k Cases',
        successRate: '98% Success',
        profileImage: require('./assets/images/lawyer/lawyer12.png')
      },
      {
        id: '4',
        name: 'David Brown',
        specialty: selectedService,
        rating: 4.6,
        distance: '2.8 km',
        hourlyRate: '$19/hr',
        experience: '7 years',
        cases: '1.8k Cases',
        successRate: '92% Success',
        profileImage: require('./assets/images/lawyer/lawyer13.png')
      },
      {
        id: '5',
        name: 'Jennifer Martinez',
        specialty: selectedService,
        rating: 4.9,
        distance: '1.8 km',
        hourlyRate: '$25/hr',
        experience: '15 years',
        cases: '4.2k Cases',
        successRate: '99% Success',
        profileImage: require('./assets/images/lawyer/lawyer14.png')
      },
      {
        id: '6',
        name: 'Robert Thompson',
        specialty: selectedService,
        rating: 4.5,
        distance: '3.1 km',
        hourlyRate: '$17/hr',
        experience: '6 years',
        cases: '1.5k Cases',
        successRate: '90% Success',
        profileImage: require('./assets/images/lawyer/lawyer15.png')
      },
      {
        id: '7',
        name: 'Lisa Anderson',
        specialty: selectedService,
        rating: 4.8,
        distance: '2.2 km',
        hourlyRate: '$21/hr',
        experience: '11 years',
        cases: '3.3k Cases',
        successRate: '97% Success',
        profileImage: require('./assets/images/lawyer/lawyer16.png')
      },
      {
        id: '8',
        name: 'James Wilson',
        specialty: selectedService,
        rating: 4.7,
        distance: '1.9 km',
        hourlyRate: '$23/hr',
        experience: '13 years',
        cases: '3.9k Cases',
        successRate: '95% Success',
        profileImage: require('./assets/images/lawyer/lawyer17.png')
      },
      {
        id: '9',
        name: 'Maria Rodriguez',
        specialty: selectedService,
        rating: 4.9,
        distance: '1.4 km',
        hourlyRate: '$24/hr',
        experience: '14 years',
        cases: '4.1k Cases',
        successRate: '98% Success',
        profileImage: require('./assets/images/lawyer/lawyer18.png')
      },
      {
        id: '10',
        name: 'Thomas Clark',
        specialty: selectedService,
        rating: 4.6,
        distance: '2.5 km',
        hourlyRate: '$20/hr',
        experience: '9 years',
        cases: '2.7k Cases',
        successRate: '93% Success',
        profileImage: require('./assets/images/lawyer/lawyer19.png')
      },
      {
        id: '11',
        name: 'Amanda Lee',
        specialty: selectedService,
        rating: 4.8,
        distance: '1.7 km',
        hourlyRate: '$22/hr',
        experience: '12 years',
        cases: '3.6k Cases',
        successRate: '96% Success',
        profileImage: require('./assets/images/lawyer/lawyer20.png')
      },
      {
        id: '12',
        name: 'Christopher Taylor',
        specialty: selectedService,
        rating: 4.7,
        distance: '2.3 km',
        hourlyRate: '$19/hr',
        experience: '8 years',
        cases: '2.4k Cases',
        successRate: '94% Success',
        profileImage: require('./assets/images/lawyer/lawyer1.png')
      }
    ];

    const handleAllLawyersSelect = (lawyer) => {
      const lawyerData = {
        name: lawyer.name,
        specialty: lawyer.specialty,
        rating: lawyer.rating,
        avatar: lawyer.profileImage,
        profileImage: lawyer.profileImage,
        distance: lawyer.distance,
        hourlyRate: lawyer.hourlyRate,
        cases: lawyer.cases,
        successRate: lawyer.successRate,
        description: 'Experienced legal professional with expertise in ' + lawyer.specialty + '. Committed to providing excellent legal representation and achieving favorable outcomes for clients.',
        reviews: `${Math.floor(lawyer.rating * 50)} Reviews`
      };
      
      // Clear all navigation states first
      setShowViewAllLawyers(false);
      setShowServicesPage(false);
      
      // Set lawyer data and show lawyer details
      setSelectedLawyer(lawyerData);
      setShowLawyerDetails(true);
    };

    return (
      <View style={styles.viewAllLawyersContainer}>
        <StatusBar style="light" />
        
        {/* Fixed Navigation Header */}
        <View style={styles.viewAllLawyersNavHeader}>
          <TouchableOpacity 
            onPress={() => setShowViewAllLawyers(false)}
            style={styles.servicesBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.servicesNavTitle}>All {selectedService} Lawyers</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        
        <ScrollView style={styles.viewAllLawyersScrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Info */}
          <View style={styles.viewAllLawyersHeaderInfo}>
            <Text style={styles.viewAllLawyersTitle}>Expert Lawyers in {selectedService}</Text>
            <Text style={styles.viewAllLawyersSubtitle}>{allServiceLawyers.length} experienced attorneys available in your area</Text>
          </View>

          {/* All Lawyers Grid */}
          <View style={styles.viewAllLawyersGrid}>
            {allServiceLawyers.map((lawyer) => (
              <TouchableOpacity
                key={lawyer.id}
                style={styles.viewAllLawyerCard}
                onPress={() => handleAllLawyersSelect(lawyer)}
              >
                <View style={styles.viewAllLawyerHeader}>
                  <View style={styles.viewAllLawyerImageContainer}>
                    <Image source={lawyer.profileImage} style={styles.viewAllLawyerImage} />
                  </View>
                  <View style={styles.viewAllLawyerRatingContainer}>
                    <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                    <Text style={styles.viewAllLawyerRating}>{lawyer.rating}</Text>
                  </View>
                </View>
                <View style={styles.viewAllLawyerInfo}>
                  <Text style={styles.viewAllLawyerName}>{lawyer.name}</Text>
                  <Text style={styles.viewAllLawyerSpecialty}>{lawyer.specialty}</Text>
                  <Text style={styles.viewAllLawyerExperience}>{lawyer.experience} experience</Text>
                  
                  <View style={styles.viewAllLawyerStats}>
                    <View style={styles.viewAllLawyerStat}>
                      <ProfessionalIcon type="BRIEFCASE" size={12} color="#2E4A6B" />
                      <Text style={styles.viewAllLawyerStatText}>{lawyer.cases}</Text>
                    </View>
                    <View style={styles.viewAllLawyerStat}>
                      <ProfessionalIcon type="CHECKMARK" size={12} color="#28a745" />
                      <Text style={styles.viewAllLawyerStatText}>{lawyer.successRate}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.viewAllLawyerFooter}>
                    <Text style={styles.viewAllLawyerRate}>{lawyer.hourlyRate}</Text>
                    <View style={styles.viewAllLawyerDistance}>
                      <ProfessionalIcon type="LOCATION" size={12} color="#6c757d" />
                      <Text style={styles.viewAllLawyerDistanceText}>{lawyer.distance}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.viewAllLawyersBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  const renderLawFirmDetailsPage = () => {
    if (!selectedLawFirm) return null;

    // Services that the law firm offers
    const firmServices = [
      { name: 'Legal Consultation', icon: 'SCALE', description: 'Professional legal advice and consultation' },
      { name: 'Contract Review', icon: 'DOC', description: 'Comprehensive contract analysis and review' },
      { name: 'Litigation Support', icon: 'BRIEFCASE', description: 'Court representation and legal proceedings' },
      { name: 'Legal Documentation', icon: 'DOC', description: 'Preparation of legal documents and agreements' },
      { name: 'Compliance Advisory', icon: 'CHECKMARK', description: 'Regulatory compliance and advisory services' },
      { name: 'Corporate Law', icon: 'BUILDING', description: 'Business formation and corporate legal matters' }
    ];

    // Lawyers working at this firm
    const firmLawyers = [
      {
        id: '1',
        name: 'Sarah Mitchell',
        specialty: selectedService,
        rating: 4.9,
        experience: '12 years',
        cases: '3.2k Cases',
        successRate: '98% Success',
        hourlyRate: '$25/hr',
        profileImage: require('./assets/images/lawyer/lawyer10.png')
      },
      {
        id: '2',
        name: 'David Chen',
        specialty: selectedService,
        rating: 4.8,
        experience: '8 years',
        cases: '2.1k Cases',
        successRate: '95% Success',
        hourlyRate: '$22/hr',
        profileImage: require('./assets/images/lawyer/lawyer11.png')
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        specialty: selectedService,
        rating: 4.7,
        experience: '10 years',
        cases: '2.8k Cases',
        successRate: '96% Success',
        hourlyRate: '$24/hr',
        profileImage: require('./assets/images/lawyer/lawyer12.png')
      },
      {
        id: '4',
        name: 'Michael Thompson',
        specialty: selectedService,
        rating: 4.6,
        experience: '6 years',
        cases: '1.8k Cases',
        successRate: '94% Success',
        hourlyRate: '$20/hr',
        profileImage: require('./assets/images/lawyer/lawyer13.png')
      }
    ];

    const handleFirmLawyerSelect = (lawyer) => {
      const lawyerData = {
        name: lawyer.name,
        specialty: lawyer.specialty,
        rating: lawyer.rating,
        avatar: lawyer.profileImage,
        profileImage: lawyer.profileImage,
        distance: '1.5 km',
        hourlyRate: lawyer.hourlyRate,
        cases: lawyer.cases,
        successRate: lawyer.successRate,
        description: `Experienced legal professional at ${selectedLawFirm.name} with expertise in ${lawyer.specialty}. Committed to providing excellent legal representation and achieving favorable outcomes for clients.`,
        reviews: `${Math.floor(lawyer.rating * 50)} Reviews`
      };
      
      // Clear all navigation states first
      setShowLawFirmDetails(false);
      setShowServicesPage(false);
      setShowViewAllFirms(false);
      
      // Set lawyer data and show lawyer details
      setSelectedLawyer(lawyerData);
      setShowLawyerDetails(true);
    };

    return (
      <View style={styles.lawFirmDetailsContainer}>
        <StatusBar style="light" />
        
        {/* Fixed Navigation Header */}
        <View style={styles.lawFirmDetailsNavHeader}>
          <TouchableOpacity 
            onPress={() => setShowLawFirmDetails(false)}
            style={styles.lawFirmDetailsBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.lawFirmDetailsNavTitle}>Law Firm Detail</Text>
          <TouchableOpacity style={styles.lawFirmDetailsFilterButton}>
            <ProfessionalIcon type="SETTINGS" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.lawFirmDetailsScrollContent} showsVerticalScrollIndicator={false}>
          {/* Enhanced Hero Header */}
          <View style={styles.lawFirmDetailsHeroHeader}>
            <View style={styles.lawFirmDetailsHeroBackground}>
              <View style={styles.lawFirmDetailsHeroOverlay} />
              <View style={styles.lawFirmDetailsHeroContent}>
                {/* Firm Info */}
                <View style={styles.lawFirmDetailsHeroInfo}>
                  <View style={styles.lawFirmDetailsImageContainer}>
                    <Image source={selectedLawFirm.image} style={styles.lawFirmDetailsHeroImage} />
                  </View>
                  <Text style={styles.lawFirmDetailsHeroTitle}>{selectedLawFirm.name}</Text>
                  <Text style={styles.lawFirmDetailsHeroSubtitle}>Professional Legal Services</Text>
                </View>
                
                {/* Stats Row */}
                <View style={styles.lawFirmDetailsStatsRow}>
                  <View style={styles.lawFirmDetailsStat}>
                    <Text style={styles.lawFirmDetailsStatNumber}>{selectedLawFirm.rating}</Text>
                    <Text style={styles.lawFirmDetailsStatLabel}>Rating</Text>
                  </View>
                  <View style={styles.lawFirmDetailsStatDivider} />
                  <View style={styles.lawFirmDetailsStat}>
                    <Text style={styles.lawFirmDetailsStatNumber}>{selectedLawFirm.lawyers}</Text>
                    <Text style={styles.lawFirmDetailsStatLabel}>Lawyers</Text>
                  </View>
                  <View style={styles.lawFirmDetailsStatDivider} />
                  <View style={styles.lawFirmDetailsStat}>
                    <Text style={styles.lawFirmDetailsStatNumber}>15+</Text>
                    <Text style={styles.lawFirmDetailsStatLabel}>Years</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Firm Description Card */}
          <View style={styles.lawFirmDetailsDescriptionCard}>
            <View style={styles.lawFirmDetailsDescriptionHeader}>
              <View style={styles.lawFirmDetailsDescriptionIcon}>
                <ProfessionalIcon type="LIGHTBULB" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.lawFirmDetailsDescriptionTitle}>
                About {selectedLawFirm.name}
              </Text>
            </View>
            <Text style={styles.lawFirmDetailsDescriptionText}>
              {selectedLawFirm.description} Our experienced team of legal professionals provides comprehensive legal services with a commitment to excellence and client satisfaction. We specialize in {selectedService.toLowerCase()} law and have successfully handled thousands of cases.
            </Text>
            <View style={styles.lawFirmDetailsFeatures}>
              <View style={styles.lawFirmDetailsFeature}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.lawFirmDetailsFeatureText}>Experienced Legal Team</Text>
              </View>
              <View style={styles.lawFirmDetailsFeature}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.lawFirmDetailsFeatureText}>Proven Track Record</Text>
              </View>
              <View style={styles.lawFirmDetailsFeature}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.lawFirmDetailsFeatureText}>Client-Focused Approach</Text>
              </View>
            </View>
          </View>

          {/* Services Section */}
          <View style={styles.lawFirmDetailsSection}>
            <View style={styles.lawFirmDetailsSectionHeader}>
              <View>
                <Text style={styles.lawFirmDetailsSectionTitle}>Our Services</Text>
                <Text style={styles.lawFirmDetailsSectionSubtitle}>
                  Comprehensive legal services we offer
                </Text>
              </View>
            </View>
            
            <View style={styles.lawFirmDetailsServicesGrid}>
              {firmServices.map((service, index) => (
                <View
                  key={index}
                  style={styles.lawFirmDetailsServiceCard}
                >
                  <View style={styles.lawFirmDetailsServiceIconContainer}>
                    <ProfessionalIcon type={service.icon} size={24} color="#2E4A6B" />
                  </View>
                  <View style={styles.lawFirmDetailsServiceInfo}>
                    <Text style={styles.lawFirmDetailsServiceName}>{service.name}</Text>
                    <Text style={styles.lawFirmDetailsServiceDescription}>{service.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Lawyers Section */}
          <View style={styles.lawFirmDetailsSection}>
            <View style={styles.lawFirmDetailsSectionHeader}>
              <View>
                <Text style={styles.lawFirmDetailsSectionTitle}>Our Lawyers</Text>
                <Text style={styles.lawFirmDetailsSectionSubtitle}>
                  Meet our experienced legal professionals
                </Text>
              </View>
            </View>
            
            <View style={styles.lawFirmDetailsLawyersGrid}>
              {firmLawyers.map((lawyer) => (
                <TouchableOpacity
                  key={lawyer.id}
                  style={styles.lawFirmDetailsLawyerCard}
                  onPress={() => handleFirmLawyerSelect(lawyer)}
                >
                  <View style={styles.lawFirmDetailsLawyerHeader}>
                    <View style={styles.lawFirmDetailsLawyerImageContainer}>
                      <Image source={lawyer.profileImage} style={styles.lawFirmDetailsLawyerImage} />
                      <View style={styles.lawFirmDetailsLawyerOnlineIndicator} />
                    </View>
                    <View style={styles.lawFirmDetailsLawyerRatingContainer}>
                      <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                      <Text style={styles.lawFirmDetailsLawyerRating}>{lawyer.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.lawFirmDetailsLawyerInfo}>
                    <Text style={styles.lawFirmDetailsLawyerName}>{lawyer.name}</Text>
                    <Text style={styles.lawFirmDetailsLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.lawFirmDetailsLawyerExperience}>{lawyer.experience} experience</Text>
                    
                    <View style={styles.lawFirmDetailsLawyerStats}>
                      <View style={styles.lawFirmDetailsLawyerStat}>
                        <ProfessionalIcon type="BRIEFCASE" size={12} color="#2E4A6B" />
                        <Text style={styles.lawFirmDetailsLawyerStatText}>{lawyer.cases}</Text>
                      </View>
                      <View style={styles.lawFirmDetailsLawyerStat}>
                        <ProfessionalIcon type="CHECKMARK" size={12} color="#28a745" />
                        <Text style={styles.lawFirmDetailsLawyerStatText}>{lawyer.successRate}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.lawFirmDetailsLawyerFooter}>
                      <Text style={styles.lawFirmDetailsLawyerRate}>{lawyer.hourlyRate}</Text>
                      <TouchableOpacity 
                        style={styles.lawFirmDetailsConsultButton}
                        onPress={() => handleFirmLawyerSelect(lawyer)}
                      >
                        <Text style={styles.lawFirmDetailsConsultButtonText}>Consult</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.lawFirmDetailsBottomSpacing} />
        </ScrollView>
        
        {/* Schedule Appointment Footer */}
        <View style={styles.lawyerDetailsFooter}>
          <TouchableOpacity 
            style={styles.scheduleAppointmentButton}
            onPress={() => setShowLawFirmAppointmentBooking(true)}
          >
            <Text style={styles.scheduleAppointmentText}>Schedule an Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderViewAllFirmsPage = () => {
    // Law Firms Data (showing all firms instead of just 5)
    const lawFirms = [
      {
        id: '1',
        name: 'Johnson & Associates Law Firm',
        specialty: selectedService,
        rating: 4.8,
        lawyers: 15,
        location: '2.1 km away',
        description: 'Leading law firm specializing in corporate and civil law matters.',
        image: require('./assets/images/lawfirm/lawfirm10.png')
      },
      {
        id: '2',
        name: 'Smith Legal Partners',
        specialty: selectedService,
        rating: 4.7,
        lawyers: 12,
        location: '1.8 km away',
        description: 'Experienced legal professionals with expertise in various law fields.',
        image: require('./assets/images/lawfirm/lawfirm11.png')
      },
      {
        id: '3',
        name: 'Davis & Wilson Law Group',
        specialty: selectedService,
        rating: 4.9,
        lawyers: 18,
        location: '3.2 km away',
        description: 'Premier law firm with decades of experience in legal representation.',
        image: require('./assets/images/lawfirm/lawfirm12.png')
      },
      {
        id: '4',
        name: 'Brown Legal Associates',
        specialty: selectedService,
        rating: 4.6,
        lawyers: 10,
        location: '2.5 km away',
        description: 'Dedicated legal team providing comprehensive legal solutions.',
        image: require('./assets/images/lawfirm/lawfirm13.png')
      },
      {
        id: '5',
        name: 'Miller & Thompson LLP',
        specialty: selectedService,
        rating: 4.8,
        lawyers: 22,
        location: '1.5 km away',
        description: 'Full-service law firm with expertise across multiple practice areas.',
        image: require('./assets/images/lawfirm/lawfirm14.png')
      },
      {
        id: '6',
        name: 'Anderson Legal Group',
        specialty: selectedService,
        rating: 4.5,
        lawyers: 8,
        location: '4.1 km away',
        description: 'Boutique law firm specializing in personalized legal services.',
        image: require('./assets/images/lawfirm/lawfirm15.png')
      },
      {
        id: '7',
        name: 'Taylor & Associates',
        specialty: selectedService,
        rating: 4.7,
        lawyers: 14,
        location: '2.8 km away',
        description: 'Trusted legal advisors with a proven track record of success.',
        image: require('./assets/images/lawfirm/lawfirm16.png')
      },
      {
        id: '8',
        name: 'Roberts Law Firm',
        specialty: selectedService,
        rating: 4.9,
        lawyers: 16,
        location: '1.9 km away',
        description: 'Excellence in legal representation with client-focused approach.',
        image: require('./assets/images/lawfirm/lawfirm17.png')
      },
      {
        id: '9',
        name: 'Clark Legal Services',
        specialty: selectedService,
        rating: 4.6,
        lawyers: 11,
        location: '3.5 km away',
        description: 'Comprehensive legal solutions with personalized attention.',
        image: require('./assets/images/lawfirm/lawfirm18.png')
      }
    ];

    const handleFirmPress = (firm) => {
      setSelectedLawFirm(firm);
      setShowViewAllFirms(false);
      setShowLawFirmDetails(true);
    };

    return (
      <View style={styles.viewAllContainer}>
        <StatusBar style="light" />
        
        {/* Fixed Navigation Header */}
        <View style={styles.viewAllNavHeader}>
          <TouchableOpacity 
            onPress={() => setShowViewAllFirms(false)}
            style={styles.servicesBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.servicesNavTitle}>All {selectedService} Law Firms</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        
        <ScrollView style={styles.viewAllScrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Info */}
          <View style={styles.viewAllHeaderInfo}>
            <Text style={styles.viewAllTitle}>Law Firms Specializing in {selectedService}</Text>
            <Text style={styles.viewAllSubtitle}>{lawFirms.length} firms available in your area</Text>
          </View>

          {/* All Law Firms Grid */}
          <View style={styles.viewAllFirmsGrid}>
            {lawFirms.map((firm) => (
              <TouchableOpacity
                key={firm.id}
                style={styles.viewAllFirmCard}
                onPress={() => handleFirmPress(firm)}
              >
                <View style={styles.viewAllFirmImageContainer}>
                  <Image source={firm.image} style={styles.viewAllFirmImage} />
                </View>
                <View style={styles.viewAllFirmInfo}>
                  <Text style={styles.viewAllFirmName}>{firm.name}</Text>
                  <Text style={styles.viewAllFirmSpecialty}>{firm.specialty}</Text>
                  <Text style={styles.viewAllFirmDescription}>{firm.description}</Text>
                  <View style={styles.viewAllFirmStats}>
                    <View style={styles.viewAllFirmStat}>
                      <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                      <Text style={styles.viewAllFirmStatText}>{firm.rating}</Text>
                    </View>
                    <View style={styles.viewAllFirmStat}>
                      <ProfessionalIcon type="USER" size={14} color="#6c757d" />
                      <Text style={styles.viewAllFirmStatText}>{firm.lawyers} lawyers</Text>
                    </View>
                    <View style={styles.viewAllFirmStat}>
                      <ProfessionalIcon type="LOCATION" size={14} color="#6c757d" />
                      <Text style={styles.viewAllFirmStatText}>{firm.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.viewAllBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  const renderRegisterScreen = () => {
    const handleRegisterFieldChange = (field, value) => {
      setRegisterForm(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleRegister = () => {
      // Validate form
      if (!registerForm.firstName.trim()) {
        showCustomAlert(
          'warning',
          'Missing Information',
          'Please enter your first name.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      if (!registerForm.lastName.trim()) {
        showCustomAlert(
          'warning',
          'Missing Information',
          'Please enter your last name.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      if (!registerForm.phone.trim()) {
        showCustomAlert(
          'warning',
          'Missing Information',
          'Please enter your phone number.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      if (!registerForm.email.trim()) {
        showCustomAlert(
          'warning',
          'Missing Information',
          'Please enter your email address.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      if (!registerForm.password.trim()) {
        showCustomAlert(
          'warning',
          'Missing Information',
          'Please enter a password.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        showCustomAlert(
          'warning',
          'Password Mismatch',
          'Passwords do not match. Please try again.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      // Update user profile with registration data
      setUserProfile(prev => ({
        ...prev,
        fullName: `${registerForm.firstName} ${registerForm.lastName}`,
        email: registerForm.email,
        phone: registerForm.phone
      }));

      showCustomAlert(
        'success',
        'Registration Successful!',
        'Welcome to LawGo! Your account has been created successfully.',
        [
          {
            text: 'Continue',
            style: 'primary',
            onPress: () => {
              setShowRegister(false);
              setCurrentScreen('categories');
            }
          }
        ]
      );
    };

    const handleGoogleRegister = () => {
      // Simulate Google registration
      showCustomAlert(
        'success',
        'Google Registration',
        'Google registration will be implemented. For now, continuing with demo account.',
        [
          {
            text: 'Continue',
            style: 'primary',
            onPress: () => {
              setUserProfile(prev => ({
                ...prev,
                fullName: 'John Smith',
                email: 'john.smith@gmail.com',
                phone: '+1 234 567 8900'
              }));
              setShowRegister(false);
              setCurrentScreen('categories');
            }
          }
        ]
      );
    };

    return (
      <View style={styles.registerContainer}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={styles.registerHeader}>
          <TouchableOpacity 
            onPress={() => setShowRegister(false)}
            style={styles.registerBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <View style={styles.registerLogoContainer}>
            <View style={styles.registerScalesIcon}>
              <Text style={styles.registerScalesText}>⚖️</Text>
            </View>
            <Text style={styles.registerAppName}>LawGo</Text>
          </View>
          <View style={styles.registerHeaderPlaceholder} />
        </View>

        <ScrollView style={styles.registerContent} showsVerticalScrollIndicator={false}>
          <View style={styles.registerForm}>
            <Text style={styles.registerTitle}>Create Account</Text>
            <Text style={styles.registerSubtitle}>
              Join LawGo to get access to the best lawyers
            </Text>

            {/* Name Fields */}
            <View style={styles.registerNameRow}>
              <View style={styles.registerNameField}>
                <Text style={styles.registerFieldLabel}>First Name</Text>
                <TextInput
                  style={styles.registerInput}
                  placeholder="John"
                  value={registerForm.firstName}
                  onChangeText={(value) => handleRegisterFieldChange('firstName', value)}
                />
              </View>
              <View style={styles.registerNameField}>
                <Text style={styles.registerFieldLabel}>Last Name</Text>
                <TextInput
                  style={styles.registerInput}
                  placeholder="Doe"
                  value={registerForm.lastName}
                  onChangeText={(value) => handleRegisterFieldChange('lastName', value)}
                />
              </View>
            </View>

            {/* Contact Fields */}
            <View style={styles.registerFieldContainer}>
              <Text style={styles.registerFieldLabel}>Phone Number</Text>
              <TextInput
                style={styles.registerInput}
                placeholder="+1 234 567 8900"
                value={registerForm.phone}
                onChangeText={(value) => handleRegisterFieldChange('phone', value)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.registerFieldContainer}>
              <Text style={styles.registerFieldLabel}>Email Address</Text>
              <TextInput
                style={styles.registerInput}
                placeholder="john.doe@email.com"
                value={registerForm.email}
                onChangeText={(value) => handleRegisterFieldChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Fields */}
            <View style={styles.registerFieldContainer}>
              <Text style={styles.registerFieldLabel}>Password</Text>
              <TextInput
                style={styles.registerInput}
                placeholder="Enter password"
                value={registerForm.password}
                onChangeText={(value) => handleRegisterFieldChange('password', value)}
                secureTextEntry
              />
            </View>

            <View style={styles.registerFieldContainer}>
              <Text style={styles.registerFieldLabel}>Confirm Password</Text>
              <TextInput
                style={styles.registerInput}
                placeholder="Confirm password"
                value={registerForm.confirmPassword}
                onChangeText={(value) => handleRegisterFieldChange('confirmPassword', value)}
                secureTextEntry
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={handleRegister}
            >
              <Text style={styles.registerBtnText}>Create Account</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.registerDivider}>
              <View style={styles.registerDividerLine} />
              <Text style={styles.registerDividerText}>OR</Text>
              <View style={styles.registerDividerLine} />
            </View>

            {/* Google Register Button */}
            <TouchableOpacity 
              style={styles.registerGoogleBtn}
              onPress={handleGoogleRegister}
            >
              <ProfessionalIcon type="GOOGLE" size={20} color="#4285F4" />
              <Text style={styles.registerGoogleBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.registerLoginSection}>
              <Text style={styles.registerLoginPrompt}>Already have an account?</Text>
              <TouchableOpacity onPress={() => setShowRegister(false)}>
                <Text style={styles.registerLoginLink}>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render current screen
  // Main render function
  if (showRegister) {
    return (
      <>
        {renderRegisterScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showRatingPage) {
    return (
      <>
        {renderRatingPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showRescheduleBooking) {
    return (
      <>
        {renderRescheduleBookingScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showAllHomeLawFirms) {
    return (
      <>
        {renderAllHomeLawFirmsPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showViewAllLawyers) {
    return (
      <>
        {renderViewAllLawyersPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  // Law Firm Booking Screens (must be checked BEFORE showLawFirmDetails)
  if (showLawFirmAppointmentConfirmation) {
    return (
      <>
        {renderLawFirmAppointmentConfirmationScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showLawFirmReviewBooking) {
    return (
      <>
        {renderLawFirmReviewBookingScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showLawFirmAppointmentBooking) {
    return (
      <>
        {renderLawFirmAppointmentBookingScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showLawFirmDetails) {
    return (
      <>
        {renderLawFirmDetailsPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showViewAllFirms) {
    return (
      <>
        {renderViewAllFirmsPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showServicesPage) {
    return (
      <>
        {renderServicesPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showEditProfile) {
    return (
      <>
        {renderEditProfilePage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showLogoutConfirmation) {
    return (
      <>
        {renderLogoutConfirmationPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showProfilePage) {
    return (
      <>
        {renderUserProfilePage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showBookingDetails) {
    return (
      <>
        {renderBookingDetailsScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showBookings) {
    return (
      <>
        {renderMyBookingsScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showAppointmentConfirmation) {
    return (
      <>
        {renderAppointmentConfirmationScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showReviewBooking) {
    return (
      <>
        {renderReviewBookingScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showAppointmentBooking) {
    return (
      <>
        {renderAppointmentBookingScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showLawyerDetails) {
    return (
      <>
        {renderLawyerDetailsScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showCategoryConfirmation) {
    return (
      <>
        {renderCategorySelectionPage()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showSeeAllCategoriesSelection) {
    return (
      <>
        {renderSeeAllCategoriesSelectionScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showAllCategories) {
    return (
      <>
        {renderAllCategoriesScreen()}
        {renderCustomModal()}
      </>
    );
  }
  
  if (showAllLawyers) {
    return (
      <>
        {renderAllLawyersScreen()}
        {renderCustomModal()}
      </>
    );
  }

  // Handler functions
  const handleHomeLawFirmClick = (firm) => {
    setSelectedLawFirm(firm);
    setShowLawFirmDetails(true);
  };

  const handleHomeSeeAll = () => {
    if (homeSliderMode === 'lawyers') {
      setShowAllLawyers(true);
    } else {
      setShowAllHomeLawFirms(true);
    }
  };

  const getCurrentScreen = () => {
    // Handle different account types
    if (currentScreen === 'home') {
      switch (userRole) {
        case 'USER':
          return renderHomeScreen(); // Normal user home (existing)
        case 'LAWYER':
          return (
            <LawyerApp 
              userRole={userRole}
              setCurrentScreen={setCurrentScreen}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              showCustomAlert={showCustomAlert}
              ProfessionalIcon={ProfessionalIcon}
              registerForm={registerForm}
              userProfile={userProfile}
            />
          );
        case 'LAW_FIRM':
          return (
            <LawfirmApp 
              userRole={userRole}
              setCurrentScreen={setCurrentScreen}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              showCustomAlert={showCustomAlert}
              ProfessionalIcon={ProfessionalIcon}
              lawFirmForm={lawFirmForm}
              userProfile={userProfile}
            />
          );
        default:
          return renderHomeScreen();
      }
    }

    // Handle other screens normally
  switch (currentScreen) {
    case 'splash':
      return renderSplashScreen();
    case 'onboarding':
      return renderOnboardingScreen();
    case 'login':
      return renderLoginScreen();
    case 'categories':
      return renderCategoriesScreen();
      case 'lawFirmRegistration':
        return renderLawFirmRegistrationScreen();
    default:
      return renderSplashScreen();
  }
  };

  return (
    <>
      {getCurrentScreen()}
      {renderCustomModal()}
    </>
  );
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
    backgroundColor: '#f8f9fa',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#2E4A6B',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skipText: {
    color: '#2E4A6B',
    fontSize: 16,
    fontWeight: '600',
  },
  onboardingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  diamondImageContainer: {
    width: '100%',
    height: 500,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  diamondGrid: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  diamondCard: {
    position: 'absolute',
    width: 220,
    height: 220,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
    transform: [{ rotate: '45deg' }],
  },
  topDiamond: {
    top: 30,
    left: '50%',
    marginLeft: -110,
    zIndex: 1,
  },
  leftDiamond: {
    top: '50%',
    marginTop: -110,
    left: -40,
    zIndex: 2,
  },
  rightDiamond: {
    top: '50%',
    marginTop: -110,
    right: -40,
    zIndex: 2,
  },
  bottomDiamond: {
    bottom: 30,
    left: '50%',
    marginLeft: -130,
    zIndex: 3,
    width: 260,
    height: 260,
    borderRadius: 32,
  },
  diamondImage: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 28,
  },
  onboardingInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  onboardingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 38,
  },
  onboardingSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 280,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#2E4A6B',
  },
  onboardingNavigation: {
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  continueButton: {
    backgroundColor: '#2E4A6B',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
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
  roleSelectionBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeRoleButton: {
    backgroundColor: '#2E4A6B',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8A8A8A',
  },
  activeRoleButtonText: {
    color: '#ffffff',
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 4,
    marginBottom: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  messageSectionHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 8,
  },
  optional: {
    fontWeight: '500',
    color: '#28a745',
    fontSize: 16,
  },
  messageSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  messageInputSection: {
    width: '100%',
  },
  messageLabel: {
    fontSize: 16,
    color: '#2E4A6B',
    marginBottom: 12,
    fontWeight: '600',
  },
  messageInput: {
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 15,
    backgroundColor: '#ffffff',
    minHeight: 120,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    fontFamily: 'System',
    lineHeight: 20,
  },
  messageHint: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
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
  
  // Category Selection Page Styles - Completely New
  categorySelectionPageWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  categorySelectionScrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryPageTitleSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  categoryPageMainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  categoryPageSubTitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  selectedCategoryShowcase: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginBottom: 30,
  },
  categoryIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCategoryLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  selectedCategoryDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  availableServicesSection: {
    marginBottom: 30,
  },
  availableServicesHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
  },
  servicesListContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
  },
  serviceItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  serviceItemLabel: {
    fontSize: 16,
    color: '#2E4A6B',
    marginLeft: 15,
    fontWeight: '500',
  },
  moreServicesIndicator: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  categoryPageActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 15,
  },
  cancelSelectionButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelSelectionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  confirmSelectionButton: {
    flex: 1,
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmSelectionButtonText: {
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
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  lawyerProfileImageContainer: {
    position: 'relative',
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  lawyerProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
    alignSelf: 'center',
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
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  lawyerProfileSpecialty: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 40,
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
  confirmationPageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  confirmationBackButton: {
    padding: 10,
  },
  confirmationPageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    flex: 1,
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
  bookingsListContent: {
    paddingBottom: 100,
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
    gap: 10,
  },
  rateLawyerButton: {
    width: 120,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  rateLawyerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
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
  
  // Rating Page Styles
  ratingContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  ratingHeader: {
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
  ratingBackButton: {
    padding: 10,
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    flex: 1,
  },
  ratingContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Lawyer Card Styles
  ratingLawyerCard: {
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
  ratingLawyerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLawyerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingLawyerProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  ratingLawyerInfo: {
    flex: 1,
  },
  ratingLawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  ratingLawyerSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  ratingLawyerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLawyerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingLawyerStatText: {
    fontSize: 12,
    color: '#2E4A6B',
    marginLeft: 5,
    fontWeight: '600',
  },
  
  // Consultation Card Styles
  ratingConsultationCard: {
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
  ratingConsultationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
  },
  ratingConsultationList: {
    gap: 15,
  },
  ratingConsultationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingConsultationLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  ratingConsultationValue: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  
  // Feedback Card Styles
  ratingFeedbackCard: {
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
  ratingFeedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  ratingFeedbackSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
  },
  ratingMessageLabel: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    marginBottom: 10,
  },
  ratingMessageInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    color: '#2E4A6B',
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  ratingUploadSection: {
    marginBottom: 10,
  },
  ratingUploadLabel: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    marginBottom: 10,
  },
  ratingUploadField: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  // Stars Card Styles
  ratingStarsCard: {
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
  ratingStarsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingStarButton: {
    padding: 5,
    marginHorizontal: 5,
  },
  ratingSelectedText: {
    fontSize: 14,
    color: '#2E4A6B',
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Footer Styles
  ratingFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  ratingSubmitButton: {
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
  ratingSubmitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  // User Profile Page Styles
  userProfilePageContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  userProfilePageHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  userProfilePageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  userProfilePageContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userProfileInfoCard: {
    backgroundColor: '#2E4A6B',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  userProfileAvatarContainer: {
    marginBottom: 20,
  },
  userProfileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  userProfileContactInfo: {
    alignItems: 'center',
    gap: 10,
  },
  userProfileContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userProfileContactText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  userProfileMenuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userProfileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  userProfileMenuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  userProfileMenuItemText: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '500',
  },
  userProfileComingSoonBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  userProfileComingSoonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  
  // Edit Profile Page Styles
  editProfileContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  editProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  editProfileBackButton: {
    padding: 8,
  },
  editProfileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E4A6B',
    flex: 1,
    textAlign: 'center',
  },
  editProfileSaveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  editProfileSaveButtonDisabled: {
    backgroundColor: '#e9ecef',
    shadowOpacity: 0,
    elevation: 0,
  },
  editProfileSaveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  editProfileSaveTextDisabled: {
    color: '#6c757d',
  },
  editProfileContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  editProfilePhotoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginTop: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  editProfilePhotoContainer: {
    marginBottom: 12,
  },
  editProfileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editProfileChangePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  editProfileChangePhotoText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '500',
  },
  editProfileSection: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  editProfileSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  editProfileSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  editProfileFormRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  editProfileFormField: {
    flex: 1,
  },
  editProfileFieldLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  editProfileTextInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#2E4A6B',
    backgroundColor: '#ffffff',
    fontWeight: '500',
  },
  editProfileChangesIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4edda',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#c3e6cb',
  },
  editProfileChangesText: {
    fontSize: 12,
    color: '#155724',
    fontWeight: '600',
  },
  
  // Logout Confirmation Page Styles
  logoutConfirmationContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoutConfirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  logoutConfirmationBackButton: {
    padding: 10,
  },
  logoutConfirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
    textAlign: 'center',
  },
  logoutConfirmationContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoutConfirmationIconContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoutConfirmationIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  logoutConfirmationMessageSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutConfirmationMainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  logoutConfirmationSubText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  logoutConfirmationSummarySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  logoutConfirmationSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutConfirmationSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  logoutConfirmationSummaryLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  logoutConfirmationSummaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  logoutConfirmationButtonsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  logoutConfirmationCancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  logoutConfirmationCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  logoutConfirmationLogoutButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#dc3545',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutConfirmationLogoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  
  // Custom Modal Styles
  customModalOverlay: {
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
  customModalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 32,
    maxWidth: 320,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  customModalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  customModalContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  customModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 8,
  },
  customModalMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  customModalButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  customModalButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customModalButtonPrimary: {
    backgroundColor: '#2E4A6B',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  customModalButtonDestructive: {
    backgroundColor: '#dc3545',
    shadowColor: '#dc3545',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  customModalButtonCancel: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  customModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  customModalButtonTextPrimary: {
    color: '#ffffff',
  },
  customModalButtonTextDestructive: {
    color: '#ffffff',
  },
  customModalButtonTextCancel: {
    color: '#6c757d',
  },
  
  // Reschedule Booking Styles
  rescheduleContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  rescheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  rescheduleBackButton: {
    padding: 10,
  },
  rescheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
    textAlign: 'center',
  },
  rescheduleContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rescheduleBookingInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rescheduleBookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  rescheduleBookingDetails: {
    gap: 4,
  },
  rescheduleBookingLawyer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  rescheduleBookingCurrent: {
    fontSize: 14,
    color: '#6c757d',
  },
  rescheduleCalendarSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rescheduleCalendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rescheduleCalendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  rescheduleCalendarWeekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  rescheduleCalendarWeekDay: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    textAlign: 'center',
    width: 35,
  },
  rescheduleCalendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarDayEmpty: {
    width: 35,
    height: 35,
    marginBottom: 8,
  },
  calendarDaySelected: {
    backgroundColor: '#2E4A6B',
  },
  calendarDayToday: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '500',
  },
  calendarDayTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  calendarDayTextToday: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  rescheduleTimeSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rescheduleTimeSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  rescheduleTimeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  rescheduleTimeSlot: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  rescheduleTimeSlotSelected: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
  },
  rescheduleTimeSlotText: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '500',
    textAlign: 'center',
  },
  rescheduleTimeSlotTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  rescheduleSelectedInfo: {
    backgroundColor: '#d4edda',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c3e6cb',
  },
  rescheduleSelectedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 8,
  },
  rescheduleSelectedDetail: {
    fontSize: 14,
    color: '#155724',
    marginBottom: 4,
  },
  rescheduleFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  rescheduleConfirmButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  rescheduleConfirmButtonDisabled: {
    backgroundColor: '#e9ecef',
    shadowOpacity: 0,
    elevation: 0,
  },
  rescheduleConfirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rescheduleConfirmButtonTextDisabled: {
    color: '#6c757d',
  },
  
  // Login Register Section Styles
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 5,
  },
  registerPrompt: {
    fontSize: 14,
    color: '#6c757d',
  },
  registerLink: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: 'bold',
  },
  
  // Register Screen Styles
  registerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  registerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  registerBackButton: {
    padding: 10,
    width: 44,
  },
  registerLogoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  registerScalesIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  registerScalesText: {
    fontSize: 28,
  },
  registerAppName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    letterSpacing: 1,
  },
  registerHeaderPlaceholder: {
    width: 44,
  },
  registerContent: {
    flex: 1,
  },
  registerForm: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  registerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 8,
  },
  registerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  registerNameRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  registerNameField: {
    flex: 1,
  },
  registerFieldContainer: {
    marginBottom: 20,
  },
  registerFieldLabel: {
    fontSize: 14,
    color: '#2E4A6B',
    marginBottom: 8,
    fontWeight: '600',
  },
  registerInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2E4A6B',
    backgroundColor: '#f8f9fa',
  },
  registerBtn: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  registerDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e9ecef',
  },
  registerDividerText: {
    fontSize: 14,
    color: '#6c757d',
    paddingHorizontal: 15,
    fontWeight: '500',
  },
  registerGoogleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 30,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  registerGoogleBtnText: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  registerLoginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  registerLoginPrompt: {
    fontSize: 14,
    color: '#6c757d',
  },
  registerLoginLink: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: 'bold',
  },
  
  // Updated Categories Screen Styles
  categoriesScrollView: {
    flex: 1,
  },
  categoriesBackButton: {
    padding: 8,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    flex: 1,
    maxWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeCategoryCard: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
    shadowColor: '#2E4A6B',
    shadowOpacity: 0.3,
    elevation: 6,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeCategoryIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryCardText: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  activeCategoryCardText: {
    color: '#ffffff',
  },
  selectedCategoriesInfo: {
    backgroundColor: '#d4edda',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#c3e6cb',
  },
  selectedCategoriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 12,
  },
  selectedCategoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedCategoryTag: {
    backgroundColor: '#28a745',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectedCategoryTagText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  categoriesFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  proceedBtnDisabled: {
    backgroundColor: '#e9ecef',
    shadowOpacity: 0,
    elevation: 0,
  },
  proceedTextDisabled: {
    color: '#6c757d',
  },
  
  // Categories Slider Styles
  categoriesSliderContainer: {
    marginBottom: 30,
  },
  categoriesSliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoriesSliderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  categorySliderRow: {
    marginBottom: 15,
  },
  categorySliderContent: {
    paddingLeft: 8,
    paddingRight: 20,
  },
  categorySliderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeCategorySliderCard: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
    shadowColor: '#2E4A6B',
    shadowOpacity: 0.3,
    elevation: 6,
  },
  categorySliderIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  activeCategorySliderIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categorySliderText: {
    fontSize: 10,
    color: '#2E4A6B',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 12,
  },
  activeCategorySliderText: {
    color: '#ffffff',
  },
  
  // Law Firm Registration Screen Styles
  lawFirmContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  lawFirmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  lawFirmBackButton: {
    padding: 8,
  },
  lawFirmHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
    textAlign: 'center',
  },
  lawFirmHeaderPlaceholder: {
    width: 40,
  },
  lawFirmScrollView: {
    flex: 1,
  },
  lawFirmContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lawFirmRegistrationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  lawFirmCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  lawFirmCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lawFirmCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  lawFirmForm: {
    gap: 16,
  },
  lawFirmFieldContainer: {
    marginBottom: 16,
  },
  lawFirmFieldLabel: {
    fontSize: 14,
    color: '#2E4A6B',
    marginBottom: 8,
    fontWeight: '600',
  },
  lawFirmInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2E4A6B',
    backgroundColor: '#f8f9fa',
  },
  lawFirmTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  lawFirmPracticeAreas: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  lawFirmSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  lawFirmSectionSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
    lineHeight: 20,
  },
  lawFirmCategoriesSlider: {
    marginBottom: 20,
  },
  lawFirmCategoriesSliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lawFirmCategoriesSliderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  lawFirmSelectedInfo: {
    marginBottom: 16,
  },
  lawFirmSelectedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  lawFirmSelectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  lawFirmSelectedTag: {
    backgroundColor: '#2E4A6B',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lawFirmSelectedTagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  lawFirmRemoveButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawFirmServiceTag: {
    backgroundColor: '#e9ecef',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lawFirmServiceTagText: {
    color: '#6c757d',
    fontSize: 11,
    fontWeight: '500',
  },
  lawFirmFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  lawFirmProceedBtn: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lawFirmProceedBtnDisabled: {
    backgroundColor: '#adb5bd',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  lawFirmProceedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lawFirmProceedTextDisabled: {
    color: '#6c757d',
  },
  
  // See All Categories Selection Screen Styles
  seeAllCategoriesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  seeAllCategoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  seeAllBackButton: {
    padding: 8,
  },
  seeAllCategoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
    textAlign: 'center',
  },
  seeAllPlaceholder: {
    width: 40,
  },
  seeAllCategoriesScroll: {
    flex: 1,
  },
  seeAllCategoriesContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  seeAllSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  seeAllCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  seeAllCategoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 12,
  },
  activeSeeAllCategoryCard: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
    shadowColor: '#2E4A6B',
    shadowOpacity: 0.3,
    elevation: 6,
  },
  seeAllCategoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  activeSeeAllCategoryIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  seeAllCategoryText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  activeSeeAllCategoryText: {
    color: '#ffffff',
  },
  removeCategoryButton: {
    marginLeft: 8,
    padding: 2,
  },
  seeAllCategoriesFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  seeAllDoneButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  seeAllDoneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  
  // Profile Avatar Image Styles
  userProfileAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  editProfileAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },

  // Enhanced Services Page Styles
  servicesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Hero Header Styles
  servicesHeroHeader: {
    height: 320,
    position: 'relative',
    overflow: 'hidden',
  },
  servicesHeroBackground: {
    flex: 1,
    backgroundColor: '#2E4A6B',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  servicesHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  servicesHeroContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 80,
    justifyContent: 'flex-start',
  },
  servicesNavHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#2E4A6B',
    zIndex: 1000,
    elevation: 5,
  },
  servicesNavTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  servicesBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  servicesFilterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  servicesHeroInfo: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  servicesHeroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  servicesHeroSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  servicesStatsRow: {
    position: 'absolute',
    bottom: 20,
    left: '7.5%',
    right: '7.5%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  serviceStat: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  serviceStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  serviceStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  serviceStatDivider: {
    width: 1,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 18,
    borderRadius: 0.5,
  },
  
  // Content Styles
  servicesScrollContent: {
    flex: 1,
  },
  serviceDescriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  serviceDescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceDescriptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceDescriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
    lineHeight: 28,
  },
  serviceDescriptionText: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'left',
  },
  serviceFeatures: {
    gap: 16,
  },
  serviceFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  serviceFeatureText: {
    fontSize: 15,
    color: '#2E4A6B',
    marginLeft: 12,
    fontWeight: '600',
    flex: 1,
  },
  
  // Section Styles
  servicesSection: {
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  servicesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  servicesSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  servicesSectionSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    fontWeight: '500',
  },
  sectionViewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f0f7ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e3f2fd',
    minWidth: 70,
    maxWidth: 80,
    marginTop: 4,
      marginRight: 15,
  },
  sectionViewAllText: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '700',
    marginRight: 4,
  },
  
  // Law Firms Styles
  lawFirmsScrollView: {
    marginHorizontal: -20,
    paddingVertical: 4,
  },
  lawFirmsHorizontalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingRight: 30,
    gap: 16,
  },
  lawFirmCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 178,
    height: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
    marginVertical: 4,
  },
  lawFirmCardHeader: {
    position: 'relative',
    height: 100,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  lawFirmImageContainer: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawFirmImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lawFirmRatingBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
    minWidth: 35,
    justifyContent: 'center',
  },
  lawFirmRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginLeft: 3,
  },
  lawFirmCardContent: {
    padding: 16,
    alignItems: 'center',
    height: 180,
    justifyContent: 'flex-start',
  },
  lawFirmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 20,
    numberOfLines: 2,
    flexShrink: 1,
  },
  lawFirmSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 14,
    textAlign: 'center',
    fontWeight: '500',
    flexShrink: 1,
  },
  lawFirmQuickStats: {
    gap: 6,
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  lawFirmQuickStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flexShrink: 1,
  },
  lawFirmQuickStatText: {
    fontSize: 13,
    color: '#6c757d',
    marginLeft: 6,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'center',
  },
  
  // Enhanced Lawyer Card Styles
  lawyersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
    paddingHorizontal: 4,
  },
  serviceLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    width: '47%',
    minHeight: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  serviceLawyerHeader: {
    alignItems: 'center',
    marginBottom: 18,
    position: 'relative',
    width: '100%',
  },
  serviceLawyerImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceLawyerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  serviceLawyerOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#28a745',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  serviceLawyerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#f57c00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceLawyerRating: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#f57c00',
    marginLeft: 4,
  },
  serviceLawyerInfo: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  serviceLawyerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
    textAlign: 'center',
    lineHeight: 18,
  },
  serviceLawyerSpecialty: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
  serviceLawyerExperience: {
    fontSize: 11,
    color: '#28a745',
    marginBottom: 12,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#f0fff4',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  serviceLawyerStats: {
    width: '100%',
    gap: 6,
    marginBottom: 12,
  },
  serviceLawyerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
  },
  serviceLawyerStatText: {
    fontSize: 10,
    color: '#6c757d',
    marginLeft: 4,
    fontWeight: '600',
  },
  serviceLawyerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f7ff',
    marginTop: 'auto',
  },
  serviceLawyerRate: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: 'bold',
  },
  serviceLawyerDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceLawyerDistanceText: {
    fontSize: 11,
    color: '#6c757d',
    marginLeft: 4,
    fontWeight: '600',
  },
  servicesBottomSpacing: {
    height: 50,
  },

  // View All Firms Page Styles
  viewAllContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllNavHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#2E4A6B',
    zIndex: 1000,
    elevation: 5,
  },
  headerPlaceholder: {
    width: 48,
    height: 48,
  },
  viewAllScrollContent: {
    flex: 1,
  },
  viewAllHeaderInfo: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  viewAllTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
    textAlign: 'center',
  },
  viewAllSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
  viewAllFirmsGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  viewAllFirmCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 12,
  },
  viewAllFirmImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewAllFirmImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewAllFirmInfo: {
    flex: 1,
  },
  viewAllFirmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
    lineHeight: 20,
  },
  viewAllFirmSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 6,
    fontWeight: '500',
  },
  viewAllFirmDescription: {
    fontSize: 13,
    color: '#6c757d',
    lineHeight: 18,
    marginBottom: 10,
  },
  viewAllFirmStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  viewAllFirmStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllFirmStatText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
    fontWeight: '600',
  },
  viewAllBottomSpacing: {
    height: 40,
  },

  // Law Firm Details Page Styles
  lawFirmDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawFirmDetailsNavHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#2E4A6B',
    zIndex: 1000,
    elevation: 5,
  },
  lawFirmDetailsNavTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  lawFirmDetailsBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawFirmDetailsFilterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawFirmDetailsScrollContent: {
    flex: 1,
  },
  lawFirmDetailsHeroHeader: {
    height: 320,
    position: 'relative',
    overflow: 'hidden',
  },
  lawFirmDetailsHeroBackground: {
    flex: 1,
    backgroundColor: '#2E4A6B',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  lawFirmDetailsHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  lawFirmDetailsHeroContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 80,
    justifyContent: 'flex-start',
  },
  lawFirmDetailsHeroInfo: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  lawFirmDetailsImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  lawFirmDetailsHeroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    resizeMode: 'cover',
  },
  lawFirmDetailsHeroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  lawFirmDetailsHeroSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  lawFirmDetailsStatsRow: {
    position: 'absolute',
    bottom: 20,
    left: '7.5%',
    right: '7.5%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  lawFirmDetailsStat: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  lawFirmDetailsStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  lawFirmDetailsStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  lawFirmDetailsStatDivider: {
    width: 1,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 18,
    borderRadius: 0.5,
  },
  lawFirmDetailsDescriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: -15,
    marginBottom: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  lawFirmDetailsDescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  lawFirmDetailsDescriptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lawFirmDetailsDescriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
    lineHeight: 28,
  },
  lawFirmDetailsDescriptionText: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'left',
  },
  lawFirmDetailsFeatures: {
    gap: 16,
  },
  lawFirmDetailsFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  lawFirmDetailsFeatureText: {
    fontSize: 15,
    color: '#2E4A6B',
    marginLeft: 12,
    fontWeight: '600',
    flex: 1,
  },
  lawFirmDetailsSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  lawFirmDetailsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  lawFirmDetailsSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 6,
    lineHeight: 28,
  },
  lawFirmDetailsSectionSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    fontWeight: '500',
    lineHeight: 20,
  },
  lawFirmDetailsServicesGrid: {
    gap: 16,
  },
  lawFirmDetailsServiceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 8,
  },
  lawFirmDetailsServiceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lawFirmDetailsServiceInfo: {
    flex: 1,
  },
  lawFirmDetailsServiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
    lineHeight: 20,
  },
  lawFirmDetailsServiceDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 18,
  },
  lawFirmDetailsLawyersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  lawFirmDetailsLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 8,
  },
  lawFirmDetailsLawyerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lawFirmDetailsLawyerImageContainer: {
    position: 'relative',
  },
  lawFirmDetailsLawyerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  lawFirmDetailsLawyerOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28a745',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  lawFirmDetailsLawyerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lawFirmDetailsLawyerRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#856404',
    marginLeft: 4,
  },
  lawFirmDetailsLawyerInfo: {
    flex: 1,
  },
  lawFirmDetailsLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
    lineHeight: 20,
  },
  lawFirmDetailsLawyerSpecialty: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 4,
    fontWeight: '500',
  },
  lawFirmDetailsLawyerExperience: {
    fontSize: 12,
    color: '#28a745',
    marginBottom: 10,
    fontWeight: '600',
  },
  lawFirmDetailsLawyerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  lawFirmDetailsLawyerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flex: 0.48,
  },
  lawFirmDetailsLawyerStatText: {
    fontSize: 10,
    color: '#6c757d',
    marginLeft: 4,
    fontWeight: '600',
  },
  lawFirmDetailsLawyerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lawFirmDetailsLawyerRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  lawFirmDetailsConsultButton: {
    backgroundColor: '#2E4A6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  lawFirmDetailsConsultButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lawFirmDetailsBottomSpacing: {
    height: 50,
  },

  // View All Lawyers Page Styles
  viewAllLawyersContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllLawyersNavHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#2E4A6B',
    zIndex: 1000,
    elevation: 5,
  },
  viewAllLawyersScrollContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllLawyersHeaderInfo: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  viewAllLawyersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  viewAllLawyersSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 22,
  },
  viewAllLawyersGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  viewAllLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '47%',
    minHeight: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  viewAllLawyerHeader: {
    alignItems: 'center',
    marginBottom: 18,
    position: 'relative',
    width: '100%',
  },
  viewAllLawyerImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewAllLawyerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewAllLawyerOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#28a745',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  viewAllLawyerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  viewAllLawyerRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f57c00',
    marginLeft: 4,
  },
  viewAllLawyerInfo: {
    alignItems: 'center',
    width: '100%',
  },
  viewAllLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 20,
  },
  viewAllLawyerSpecialty: {
    fontSize: 13,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 18,
  },
  viewAllLawyerExperience: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  viewAllLawyerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  viewAllLawyerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  viewAllLawyerStatText: {
    fontSize: 11,
    color: '#6c757d',
    fontWeight: '500',
    marginLeft: 4,
    textAlign: 'center',
  },
  viewAllLawyerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  viewAllLawyerRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  viewAllLawyerDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllLawyerDistanceText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
  },
  viewAllLawyersBottomSpacing: {
    height: 40,
  },

  // Home Toggle Styles
  sectionTitleWithToggle: {
    alignItems: 'center',
  },
  homeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f5',
    borderRadius: 20,
    padding: 4,
    marginTop: 8,
  },
  homeToggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  homeToggleButtonActive: {
    backgroundColor: '#2E4A6B',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  homeToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  homeToggleTextActive: {
    color: '#ffffff',
  },

  // Law Firm Card Styles for Home
  homeLawFirmCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawFirmAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lawFirmProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lawFirmName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  lawFirmSpecialty: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  lawFirmRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  lawFirmLawyers: {
    fontSize: 11,
    color: '#28a745',
    fontWeight: '600',
    textAlign: 'center',
  },

  // All Home Law Firms Page Styles
  allHomeLawFirmsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  allHomeLawFirmsNavHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#2E4A6B',
    zIndex: 1000,
    elevation: 5,
  },
  allHomeLawFirmsScrollContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  allHomeLawFirmsHeaderInfo: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  allHomeLawFirmsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  allHomeLawFirmsSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 22,
  },
  allHomeLawFirmsGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  allHomeLawFirmCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '47%',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  allHomeLawFirmImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  allHomeLawFirmImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  allHomeLawFirmInfo: {
    alignItems: 'center',
    width: '100%',
  },
  allHomeLawFirmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 20,
  },
  allHomeLawFirmSpecialty: {
    fontSize: 13,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  allHomeLawFirmStats: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  allHomeLawFirmStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allHomeLawFirmStatText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
    marginLeft: 4,
    textAlign: 'center',
  },
  allHomeLawFirmsBottomSpacing: {
    height: 40,
  },
});
