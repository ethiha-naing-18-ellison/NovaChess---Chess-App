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

// LAWYER ACCOUNT SYSTEM
// This is completely separate from the normal USER account system
// Lawyers have different home page, profile, bookmarks, and features

const LawyerApp = ({ 
  userRole, 
  setCurrentScreen, 
  selectedServices, 
  setSelectedServices,
  showCustomAlert,
  ProfessionalIcon,
  registerForm,
  userProfile
}) => {
  // User profile images array (for clients/users in appointments, cases, etc.)
  const userImages = [
    require('./assets/images/user/user1.png'),
    require('./assets/images/user/user2.png'),
    require('./assets/images/user/user3.png'),
    require('./assets/images/user/user4.png'),
    require('./assets/images/user/user5.png'),
    require('./assets/images/user/user6.png'),
    require('./assets/images/user/user7.png'),
    require('./assets/images/user/user8.png'),
    require('./assets/images/user/user9.png'),
    require('./assets/images/user/user10.png'),
  ];

  // Lawyer-specific state
  const [lawyerCurrentScreen, setLawyerCurrentScreen] = useState('home');
  
  // Profile management state - MUST be at top level to follow Rules of Hooks
  const [showManageProfile, setShowManageProfile] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  
  // Create lawyer profile from actual registration data
  const [lawyerProfile, setLawyerProfile] = useState({
    name: registerForm?.firstName && registerForm?.lastName 
      ? `${registerForm.firstName} ${registerForm.lastName}`.trim() 
      : userProfile?.fullName || 'Katie Syrus',
    actualName: registerForm?.firstName && registerForm?.lastName 
      ? `${registerForm.firstName} ${registerForm.lastName}`.trim() 
      : userProfile?.fullName || 'Katie Syrus',
    specialty: selectedServices && selectedServices.length > 0 
      ? `${selectedServices[0]} Lawyer` 
      : 'Legal Professional',
    experience: 'New Lawyer', // Can be updated in profile later
    rating: 5.0, // New lawyer starts with 5.0
    cases: 0, // New lawyer starts with 0 cases
    clients: 0, // New lawyer starts with 0 clients
    phone: registerForm?.phone || userProfile?.phone || 'Not provided',
    email: registerForm?.email || userProfile?.email || 'Not provided',
    address: userProfile?.streetAddress ? 
      `${userProfile.streetAddress}, ${userProfile.city}, ${userProfile.state} ${userProfile.zipCode}` : 
      'Address not provided',
    bio: `Professional ${selectedServices && selectedServices.length > 0 ? selectedServices[0] : 'legal'} attorney ready to help with your legal needs.`,
    profileImage: userProfile?.profilePicture || require('./assets/images/lawyer/lawyer1.png'),
    verified: false, // New lawyers start unverified
    availability: 'Available',
    consultationFee: '$150/hour' // Default rate for new lawyers
  });

  // Initialize editedProfile when lawyerProfile changes
  useEffect(() => {
    setEditedProfile(lawyerProfile);
  }, [lawyerProfile]);

  // Handle profile save - MUST be at top level
  const handleSaveProfile = () => {
    if (editedProfile) {
      setLawyerProfile(editedProfile);
    }
    setEditMode(false);
    showCustomAlert(
      'success',
      'Profile Updated',
      'Your profile has been successfully updated.',
      [{ text: 'OK', style: 'primary' }]
    );
  };

  const [lawyerStats, setLawyerStats] = useState({
    totalEarnings: '$45,230',
    monthlyEarnings: '$8,500',
    pendingPayments: '$2,100',
    completedCases: 156,
    activeCases: 12,
    clientReviews: 4.9,
    responseTime: '< 2 hours'
  });

  const [activeClients, setActiveClients] = useState([
    {
      id: 1,
      name: 'John Smith',
      case: 'DUI Defense',
      status: 'Active',
      lastContact: '2 hours ago',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      case: 'Traffic Violation',
      status: 'Pending',
      lastContact: '1 day ago',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Robert Davis',
      case: 'Criminal Defense',
      status: 'Active',
      lastContact: '30 minutes ago',
      priority: 'High'
    }
  ]);

  const [lawyerBookmarks, setLawyerBookmarks] = useState([
    {
      id: 1,
      type: 'Legal Resource',
      title: 'Criminal Law Updates 2024',
      description: 'Latest changes in criminal defense procedures',
      category: 'Criminal Law'
    },
    {
      id: 2,
      type: 'Client',
      title: 'High Priority Client',
      description: 'John Smith - DUI case deadline approaching',
      category: 'Active Cases'
    }
  ]);

  // Cases data
  const [lawyerCases, setLawyerCases] = useState([
    {
      id: 1,
      caseNumber: 'CR-2024-001',
      clientName: 'John Smith',
      clientImage: userImages[5], // user6.png
      clientCategories: ['Criminal Defense', 'DUI Defense'],
      clientServices: ['Legal Consultation', 'Court Representation', 'Case Analysis'],
      clientDescription: 'DUI case with multiple charges, preparing for trial. Need experienced representation.',
      clientAge: 45,
      clientOccupation: 'Sales Manager',
      clientEmail: 'john.smith@email.com',
      clientPhone: '+1 555-0111',
      clientAddress: '123 Main St, New York, NY 10001',
      caseType: 'DUI Defense',
      status: 'Active',
      priority: 'High',
      nextHearing: '2024-01-15',
      lastActivity: '2 hours ago',
      progress: 75,
      description: 'DUI case with multiple charges, preparing for trial',
      documents: 12,
      billableHours: 45.5,
      totalFees: '$6,825',
      courtLocation: 'Superior Court - Downtown',
      prosecutor: 'DA Sarah Johnson',
      charges: ['DUI', 'Reckless Driving', 'Open Container'],
      dateCreated: '2023-11-20'
    },
    {
      id: 2,
      caseNumber: 'TR-2024-002',
      clientName: 'Mary Johnson',
      clientImage: userImages[6], // user7.png
      clientCategories: ['Traffic Violation Defense', 'License Issues'],
      clientServices: ['Legal Consultation', 'Court Representation', 'License Restoration'],
      clientDescription: 'Multiple speeding tickets and license suspension issues. Need comprehensive legal strategy.',
      clientAge: 34,
      clientOccupation: 'Marketing Director',
      clientEmail: 'mary.johnson@email.com',
      clientPhone: '+1 555-0222',
      clientAddress: '456 Oak Ave, Brooklyn, NY 11201',
      caseType: 'Traffic Violation',
      status: 'Pending',
      priority: 'Medium',
      nextHearing: '2024-01-22',
      lastActivity: '1 day ago',
      progress: 30,
      description: 'Speeding ticket defense, negotiating with prosecutor',
      documents: 5,
      billableHours: 8.5,
      totalFees: '$1,275',
      courtLocation: 'Municipal Court',
      prosecutor: 'City Attorney Mike Davis',
      charges: ['Excessive Speed', 'Lane Violation'],
      dateCreated: '2023-12-05'
    },
    {
      id: 3,
      caseNumber: 'CR-2024-003',
      clientName: 'Robert Davis',
      clientImage: userImages[7], // user8.png
      clientCategories: ['Criminal Defense', 'Assault Defense'],
      clientServices: ['Legal Consultation', 'Criminal Defense', 'Court Representation'],
      clientDescription: 'Assault charges defense, gathering witness statements and preparing case strategy.',
      clientAge: 29,
      clientOccupation: 'Construction Worker',
      clientEmail: 'robert.davis@email.com',
      clientPhone: '+1 555-0333',
      clientAddress: '789 Pine St, Manhattan, NY 10016',
      caseType: 'Criminal Defense',
      status: 'Active',
      priority: 'High',
      nextHearing: '2024-01-18',
      lastActivity: '30 minutes ago',
      progress: 60,
      description: 'Assault charges defense, gathering witness statements',
      documents: 18,
      billableHours: 32.0,
      totalFees: '$4,800',
      courtLocation: 'District Court',
      prosecutor: 'ADA Jennifer Wilson',
      charges: ['Assault 3rd Degree', 'Disorderly Conduct'],
      dateCreated: '2023-10-15'
    },
    {
      id: 4,
      caseNumber: 'CR-2024-004',
      clientName: 'Lisa Chen',
      clientImage: userImages[8], // user9.png
      clientCategories: ['White Collar Crime', 'Fraud Defense'],
      clientServices: ['Legal Consultation', 'Criminal Defense', 'Plea Negotiation'],
      clientDescription: 'White collar fraud case successfully resolved with plea agreement. Complex financial matters.',
      clientAge: 38,
      clientOccupation: 'Financial Analyst',
      clientEmail: 'lisa.chen@email.com',
      clientPhone: '+1 555-0444',
      clientAddress: '321 Elm St, Queens, NY 11375',
      caseType: 'White Collar Crime',
      status: 'Completed',
      priority: 'Medium',
      nextHearing: null,
      lastActivity: '1 week ago',
      progress: 100,
      description: 'Fraud case successfully resolved with plea agreement',
      documents: 25,
      billableHours: 67.5,
      totalFees: '$10,125',
      courtLocation: 'Federal Court',
      prosecutor: 'US Attorney Tom Rodriguez',
      charges: ['Wire Fraud', 'Money Laundering'],
      dateCreated: '2023-08-10'
    }
  ]);

  const [casesFilter, setCasesFilter] = useState('All');
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [showEditCase, setShowEditCase] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'note',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    billableHours: 0,
    status: 'completed'
  });

  // Schedule data
  const [lawyerSchedule, setLawyerSchedule] = useState([
    {
      id: 1,
      title: 'Court Hearing - John Smith',
      type: 'court',
      caseNumber: 'CR-2024-001',
      date: '2024-01-15',
      time: '09:00 AM',
      duration: '2 hours',
      location: 'Superior Court - Downtown',
      description: 'DUI case hearing, final arguments',
      status: 'confirmed',
      clientName: 'John Smith',
      clientImage: userImages[5], // user6.png
      priority: 'high'
    },
    {
      id: 2,
      title: 'Client Consultation - Mary Johnson',
      type: 'consultation',
      caseNumber: 'TR-2024-002',
      date: '2024-01-15',
      time: '02:00 PM',
      duration: '1 hour',
      location: 'Office',
      description: 'Traffic violation case discussion',
      status: 'confirmed',
      clientName: 'Mary Johnson',
      clientImage: userImages[6], // user7.png
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Document Review',
      type: 'task',
      caseNumber: 'CR-2024-003',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '3 hours',
      location: 'Office',
      description: 'Review evidence for Robert Davis case',
      status: 'pending',
      clientName: 'Robert Davis',
      clientImage: userImages[7], // user8.png
      priority: 'high'
    },
    {
      id: 4,
      title: 'Deposition - Lisa Chen',
      type: 'deposition',
      caseNumber: 'CR-2024-004',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: '4 hours',
      location: 'Law Office Building',
      description: 'Client deposition for fraud case',
      status: 'confirmed',
      clientName: 'Lisa Chen',
      clientImage: userImages[8], // user9.png
      priority: 'high'
    },
    {
      id: 5,
      title: 'Team Meeting',
      type: 'meeting',
      caseNumber: null,
      date: '2024-01-18',
      time: '03:00 PM',
      duration: '1 hour',
      location: 'Conference Room',
      description: 'Weekly case review meeting',
      status: 'confirmed',
      clientName: null,
      clientImage: null,
      priority: 'medium'
    }
  ]);

  const [scheduleFilter, setScheduleFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All Dates');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Appointments data - requests from normal users (matching actual booking system)
  const [lawyerAppointments, setLawyerAppointments] = useState([
    {
      id: 1,
      clientName: 'Alex Johnson',
      clientEmail: 'alex.johnson@email.com',
      clientPhone: '+1 555-0123',
      clientAddress: '123 Main St, New York, NY 10001',
      clientImage: userImages[0], // user1.png
      clientCategories: ['Criminal Defense', 'DUI Defense'],
      clientServices: ['Legal Consultation', 'Court Representation', 'Case Analysis'],
      clientDescription: 'Facing DUI charges and need experienced legal representation. Looking for a lawyer who specializes in criminal defense with a strong track record in DUI cases.',
      clientAge: 32,
      clientOccupation: 'Software Engineer',
      requestedDate: '2024-01-20',
      requestedTime: '10:00 AM',
      consultationType: 'online', // online, lawyer_place, suggest_time
      userMessage: 'Need legal advice regarding DUI charges. First-time offense, looking for guidance on next steps and what to expect in court.',
      status: 'pending',
      requestedAt: '2024-01-12 09:30 AM',
      lawyerSpecialty: 'Criminal Defense',
      estimatedFee: '$150',
      previousClient: false
    },
    {
      id: 2,
      clientName: 'Sarah Martinez',
      clientEmail: 'sarah.martinez@email.com',
      clientPhone: '+1 555-0456',
      clientAddress: '456 Oak Ave, Brooklyn, NY 11201',
      clientImage: userImages[1], // user2.png
      clientCategories: ['Traffic Violation Defense', 'License Issues'],
      clientServices: ['Legal Consultation', 'Court Representation', 'License Restoration'],
      clientDescription: 'Multiple speeding tickets threatening license suspension. Need legal help to negotiate with prosecutors and prevent license loss.',
      clientAge: 28,
      clientOccupation: 'Marketing Manager',
      requestedDate: '2024-01-22',
      requestedTime: '02:00 PM',
      consultationType: 'lawyer_place',
      userMessage: 'Multiple speeding tickets and license suspension issues. Need comprehensive legal strategy to handle these violations and prevent license loss.',
      status: 'pending',
      requestedAt: '2024-01-11 02:15 PM',
      lawyerSpecialty: 'Traffic Violation Defense',
      estimatedFee: '$306', // $300 + 2% extra for lawyer_place
      previousClient: true
    },
    {
      id: 3,
      clientName: 'Michael Chen',
      clientEmail: 'michael.chen@email.com',
      clientPhone: '+1 555-0789',
      clientAddress: '789 Pine St, Manhattan, NY 10016',
      clientImage: userImages[2], // user3.png
      clientCategories: ['Criminal Defense', 'Assault Defense'],
      clientServices: ['Legal Consultation', 'Criminal Defense', 'Court Representation'],
      clientDescription: 'Facing assault charges and need immediate legal representation. Looking for experienced criminal defense attorney.',
      clientAge: 35,
      clientOccupation: 'Business Owner',
      requestedDate: '2024-01-25',
      requestedTime: '11:00 AM',
      consultationType: 'suggest_time',
      userMessage: 'Facing assault charges, need immediate legal representation and court preparation. This is urgent as my court date is approaching soon.',
      status: 'pending',
      requestedAt: '2024-01-10 11:45 AM',
      lawyerSpecialty: 'Criminal Defense',
      estimatedFee: '$208', // $200 + 4% extra for suggest_time
      previousClient: false
    },
    {
      id: 4,
      clientName: 'Emily Davis',
      clientEmail: 'emily.davis@email.com',
      clientPhone: '+1 555-0321',
      clientAddress: '321 Elm St, Queens, NY 11375',
      clientImage: userImages[3], // user4.png
      clientCategories: ['General Legal', 'Legal Advice'],
      clientServices: ['Legal Consultation', 'Document Review', 'Legal Advice'],
      clientDescription: 'Need general legal advice for various minor legal matters. Quick consultation preferred to understand my options.',
      clientAge: 29,
      clientOccupation: 'Teacher',
      requestedDate: '2024-01-18',
      requestedTime: '03:30 PM',
      consultationType: 'online',
      userMessage: 'General legal advice needed for minor legal matter. Quick consultation preferred to understand my options.',
      status: 'accepted',
      requestedAt: '2024-01-09 04:20 PM',
      lawyerSpecialty: 'General Legal',
      estimatedFee: '$100',
      previousClient: false
    },
    {
      id: 5,
      clientName: 'David Wilson',
      clientEmail: 'david.wilson@email.com',
      clientPhone: '+1 555-0654',
      clientAddress: '654 Cedar Rd, Bronx, NY 10451',
      clientImage: userImages[4], // user5.png
      clientCategories: ['Criminal Defense', 'Drug Defense'],
      clientServices: ['Legal Consultation', 'Criminal Defense', 'Court Representation'],
      clientDescription: 'Drug possession charges requiring experienced criminal defense attorney. Need legal representation for upcoming court date.',
      clientAge: 26,
      clientOccupation: 'Freelance Designer',
      requestedDate: '2024-01-15',
      requestedTime: '09:00 AM',
      consultationType: 'lawyer_place',
      userMessage: 'Drug possession charges, need legal representation for upcoming court date. Looking for experienced criminal defense attorney.',
      status: 'rejected',
      requestedAt: '2024-01-08 10:30 AM',
      lawyerSpecialty: 'Criminal Defense',
      estimatedFee: '$178.50', // $175 + 2% extra for lawyer_place
      previousClient: false
    }
  ]);

  const [appointmentsFilter, setAppointmentsFilter] = useState('All');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllLawFirms, setShowAllLawFirms] = useState(false);
  const [showLawFirmDetails, setShowLawFirmDetails] = useState(false);
  const [selectedLawFirm, setSelectedLawFirm] = useState(null);
  const [showAllFirmLawyers, setShowAllFirmLawyers] = useState(false);
  const [showLawyerDetails, setShowLawyerDetails] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [connectedLawyers, setConnectedLawyers] = useState(new Set());
  const [showReferClientModal, setShowReferClientModal] = useState(false);
  const [joinedOrganizations, setJoinedOrganizations] = useState(new Set());
  const [pendingJoinRequests, setPendingJoinRequests] = useState(new Set());
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Law Firm click handlers
  const handleLawFirmClick = (firm) => {
    setSelectedLawFirm(firm);
    setShowLawFirmDetails(true);
  };

  const handleAllLawFirmsSelect = (firm) => {
    setSelectedLawFirm(firm);
    setShowAllLawFirms(false);
    setShowLawFirmDetails(true);
  };

  const handleViewAllFirmLawyers = () => {
    setShowAllFirmLawyers(true);
  };

  const handleLawyerSelect = (lawyer) => {
    const lawyerData = {
      name: lawyer.name,
      specialty: lawyer.specialty,
      rating: lawyer.rating,
      profileImage: lawyer.profileImage,
      distance: '1.5 km',
      hourlyRate: lawyer.hourlyRate || '$25/hr',
      cases: lawyer.cases || '150+ Cases',
      successRate: lawyer.successRate || '95% Success',
      description: `Experienced legal professional specializing in ${lawyer.specialty}. Committed to providing excellent legal representation and achieving favorable outcomes for clients.`,
      reviews: `${Math.floor(lawyer.rating * 50)} Reviews`
    };
    
    setSelectedLawyer(lawyerData);
    setShowLawyerDetails(true);
  };

  const handleConnectLawyer = () => {
    if (!selectedLawyer) return;
    
    const lawyerId = selectedLawyer.name; // Using name as unique identifier
    const newConnectedLawyers = new Set(connectedLawyers);
    
    if (connectedLawyers.has(lawyerId)) {
      // Already connected - disconnect
      newConnectedLawyers.delete(lawyerId);
      showCustomAlert('success', 'Disconnected', `You have disconnected from ${selectedLawyer.name}`, [
        { text: 'OK', onPress: () => {} }
      ]);
    } else {
      // Not connected - connect
      newConnectedLawyers.add(lawyerId);
      showCustomAlert('success', 'Connected!', `You are now connected with ${selectedLawyer.name}. You can now collaborate and share professional insights.`, [
        { text: 'OK', onPress: () => {} }
      ]);
    }
    
    setConnectedLawyers(newConnectedLawyers);
  };

  const handleReferClient = () => {
    if (!selectedLawyer) return;
    setShowReferClientModal(true);
  };

  const handleConfirmReferral = () => {
    if (!selectedLawyer) return;
    
    setShowReferClientModal(false);
    showCustomAlert('success', 'Client Referred!', `You have successfully referred a client to ${selectedLawyer.name}. They will be notified about the referral.`, [
      { text: 'OK', onPress: () => {} }
    ]);
  };

  const handleUserProfileClick = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleJoinOrganization = () => {
    if (!selectedLawFirm) return;
    
    const firmId = selectedLawFirm.id;
    const newPendingRequests = new Set(pendingJoinRequests);
    const newJoinedOrganizations = new Set(joinedOrganizations);
    
    if (joinedOrganizations.has(firmId)) {
      // Already joined - leave organization
      newJoinedOrganizations.delete(firmId);
      newPendingRequests.delete(firmId);
      showCustomAlert('info', 'Left Organization', `You have left ${selectedLawFirm.name}. Your access to organization resources has been removed.`, [
        { text: 'OK', onPress: () => {} }
      ]);
      setJoinedOrganizations(newJoinedOrganizations);
      setPendingJoinRequests(newPendingRequests);
    } else if (pendingJoinRequests.has(firmId)) {
      // Already requested - cancel request
      newPendingRequests.delete(firmId);
      showCustomAlert('info', 'Request Cancelled', `Your join request to ${selectedLawFirm.name} has been cancelled.`, [
        { text: 'OK', onPress: () => {} }
      ]);
      setPendingJoinRequests(newPendingRequests);
    } else {
      // Not joined and no pending request - submit join request
      newPendingRequests.add(firmId);
      showCustomAlert('success', 'Request Submitted!', `Your request to join ${selectedLawFirm.name} has been submitted. You will be notified once it's reviewed by the organization administrators.`, [
        { text: 'OK', onPress: () => {} }
      ]);
      setPendingJoinRequests(newPendingRequests);
      
      // Simulate approval after 3 seconds (for demo purposes)
      setTimeout(() => {
        const currentPending = new Set(pendingJoinRequests);
        const currentJoined = new Set(joinedOrganizations);
        
        if (currentPending.has(firmId)) {
          currentPending.delete(firmId);
          currentJoined.add(firmId);
          
          setPendingJoinRequests(currentPending);
          setJoinedOrganizations(currentJoined);
          
          showCustomAlert('success', 'Welcome to the Team!', `Congratulations! Your request to join ${selectedLawFirm.name} has been approved. You now have access to organization resources and collaboration tools.`, [
            { text: 'Great!', onPress: () => {} }
          ]);
        }
      }, 3000);
    }
  };

  // Law Firm Organizations Data
  const [lawFirmOrganizations] = useState([
    {
      id: 1,
      name: 'Smith & Associates Legal',
      specialty: 'Corporate Law',
      rating: 4.9,
      lawyers: 15,
      location: 'New York, NY',
      image: require('./assets/images/lawfirm/lawfirm1.png'),
      established: '1995',
      cases: 450
    },
    {
      id: 2,
      name: 'Johnson Criminal Defense',
      specialty: 'Criminal Law',
      rating: 4.8,
      lawyers: 8,
      location: 'Los Angeles, CA',
      image: require('./assets/images/lawfirm/lawfirm2.png'),
      established: '2001',
      cases: 320
    },
    {
      id: 3,
      name: 'Williams Family Law Group',
      specialty: 'Family Law',
      rating: 4.7,
      lawyers: 12,
      location: 'Chicago, IL',
      image: require('./assets/images/lawfirm/lawfirm3.png'),
      established: '1988',
      cases: 280
    },
    {
      id: 4,
      name: 'Brown Immigration Services',
      specialty: 'Immigration Law',
      rating: 4.9,
      lawyers: 10,
      location: 'Miami, FL',
      image: require('./assets/images/lawfirm/lawfirm4.png'),
      established: '2005',
      cases: 195
    },
    {
      id: 5,
      name: 'Davis Personal Injury',
      specialty: 'Personal Injury',
      rating: 4.8,
      lawyers: 18,
      location: 'Houston, TX',
      image: require('./assets/images/lawfirm/lawfirm5.png'),
      established: '1992',
      cases: 380
    },
    {
      id: 6,
      name: 'Miller Real Estate Law',
      specialty: 'Real Estate Law',
      rating: 4.6,
      lawyers: 7,
      location: 'Phoenix, AZ',
      image: require('./assets/images/lawfirm/lawfirm6.png'),
      established: '2010',
      cases: 150
    },
    {
      id: 7,
      name: 'Wilson Tax & Business',
      specialty: 'Tax Law',
      rating: 4.9,
      lawyers: 14,
      location: 'Philadelphia, PA',
      image: require('./assets/images/lawfirm/lawfirm7.png'),
      established: '1985',
      cases: 420
    },
    {
      id: 8,
      name: 'Moore Employment Law',
      specialty: 'Employment Law',
      rating: 4.7,
      lawyers: 9,
      location: 'San Antonio, TX',
      image: require('./assets/images/lawfirm/lawfirm8.png'),
      established: '2008',
      cases: 240
    },
    {
      id: 9,
      name: 'Taylor Intellectual Property',
      specialty: 'IP Law',
      rating: 4.8,
      lawyers: 11,
      location: 'San Diego, CA',
      image: require('./assets/images/lawfirm/lawfirm9.png'),
      established: '2003',
      cases: 310
    },
    {
      id: 10,
      name: 'Anderson Environmental Law',
      specialty: 'Environmental Law',
      rating: 4.6,
      lawyers: 6,
      location: 'Dallas, TX',
      image: require('./assets/images/lawfirm/lawfirm10.png'),
      established: '2012',
      cases: 125
    },
    {
      id: 11,
      name: 'Thomas Bankruptcy Solutions',
      specialty: 'Bankruptcy Law',
      rating: 4.7,
      lawyers: 8,
      location: 'San Jose, CA',
      image: require('./assets/images/lawfirm/lawfirm11.png'),
      established: '2000',
      cases: 180
    },
    {
      id: 12,
      name: 'Jackson Medical Malpractice',
      specialty: 'Medical Law',
      rating: 4.9,
      lawyers: 13,
      location: 'Austin, TX',
      image: require('./assets/images/lawfirm/lawfirm12.png'),
      established: '1990',
      cases: 290
    },
    {
      id: 13,
      name: 'White Securities Law',
      specialty: 'Securities Law',
      rating: 4.8,
      lawyers: 16,
      location: 'Jacksonville, FL',
      image: require('./assets/images/lawfirm/lawfirm13.png'),
      established: '1998',
      cases: 350
    },
    {
      id: 14,
      name: 'Harris Contract Law',
      specialty: 'Contract Law',
      rating: 4.7,
      lawyers: 10,
      location: 'Fort Worth, TX',
      image: require('./assets/images/lawfirm/lawfirm14.png'),
      established: '2007',
      cases: 220
    },
    {
      id: 15,
      name: 'Martin Elder Law',
      specialty: 'Elder Law',
      rating: 4.6,
      lawyers: 5,
      location: 'Columbus, OH',
      image: require('./assets/images/lawfirm/lawfirm15.png'),
      established: '2015',
      cases: 95
    },
    {
      id: 16,
      name: 'Thompson Maritime Law',
      specialty: 'Maritime Law',
      rating: 4.8,
      lawyers: 7,
      location: 'Charlotte, NC',
      image: require('./assets/images/lawfirm/lawfirm16.png'),
      established: '2002',
      cases: 160
    },
    {
      id: 17,
      name: 'Garcia Construction Law',
      specialty: 'Construction Law',
      rating: 4.7,
      lawyers: 12,
      location: 'San Francisco, CA',
      image: require('./assets/images/lawfirm/lawfirm17.png'),
      established: '1995',
      cases: 275
    },
    {
      id: 18,
      name: 'Rodriguez Sports Law',
      specialty: 'Sports Law',
      rating: 4.9,
      lawyers: 8,
      location: 'Indianapolis, IN',
      image: require('./assets/images/lawfirm/lawfirm18.png'),
      established: '2009',
      cases: 140
    },
    {
      id: 19,
      name: 'Lewis Entertainment Law',
      specialty: 'Entertainment Law',
      rating: 4.8,
      lawyers: 11,
      location: 'Seattle, WA',
      image: require('./assets/images/lawfirm/lawfirm19.png'),
      established: '2006',
      cases: 200
    },
    {
      id: 20,
      name: 'Lee International Trade',
      specialty: 'Trade Law',
      rating: 4.7,
      lawyers: 14,
      location: 'Denver, CO',
      image: require('./assets/images/lawfirm/lawfirm20.png'),
      established: '1993',
      cases: 330
    },
    {
      id: 21,
      name: 'Walker Privacy Law',
      specialty: 'Privacy Law',
      rating: 4.9,
      lawyers: 9,
      location: 'Washington, DC',
      image: require('./assets/images/lawfirm/lawfirm21.png'),
      established: '2011',
      cases: 185
    },
    {
      id: 22,
      name: 'Hall Cyber Security Law',
      specialty: 'Cyber Law',
      rating: 4.8,
      lawyers: 13,
      location: 'Boston, MA',
      image: require('./assets/images/lawfirm/lawfirm22.png'),
      established: '2013',
      cases: 210
    }
  ]);

  // Lawyer Home Screen
  const renderLawyerHomeScreen = () => (
    <View style={styles.lawyerHomeContainer}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.lawyerHomeHeader}>
        <View style={styles.lawyerHeaderContent}>
          <View style={styles.lawyerHeaderLeft}>
            <Image source={lawyerProfile.profileImage} style={styles.lawyerHeaderImage} />
            <View style={styles.lawyerHeaderInfo}>
              <Text style={styles.lawyerHeaderGreeting}>Good Morning</Text>
              <Text style={styles.lawyerHeaderName}>{lawyerProfile.name}</Text>
              <Text style={styles.lawyerHeaderSpecialty}>{lawyerProfile.specialty}</Text>
            </View>
          </View>
          <View style={styles.headerButtonsRow}>
            <TouchableOpacity 
              style={styles.lawyerNotificationButton}
              onPress={() => setShowNotifications(true)}
            >
              <ProfessionalIcon type="BELL" size={24} color="#ffffff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerSettingsButton}>
              <ProfessionalIcon type="SETTINGS" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.lawyerHomeContent} showsVerticalScrollIndicator={false}>
        {/* Quick Stats Cards */}
        <View style={styles.lawyerStatsContainer}>
          <View style={styles.lawyerStatsRow}>
            <View style={styles.lawyerStatCard}>
              <ProfessionalIcon type="MONEY" size={24} color="#28a745" />
              <Text style={styles.statValue}>{lawyerStats.monthlyEarnings}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
            <View style={styles.lawyerStatCard}>
              <ProfessionalIcon type="BRIEFCASE" size={24} color="#2E4A6B" />
              <Text style={styles.statValue}>{lawyerStats.activeCases}</Text>
              <Text style={styles.statLabel}>Active Cases</Text>
            </View>
          </View>
          <View style={styles.lawyerStatsRow}>
            <View style={styles.lawyerStatCard}>
              <ProfessionalIcon type="STAR" size={24} color="#f57c00" />
              <Text style={styles.statValue}>{lawyerStats.clientReviews}</Text>
              <Text style={styles.statLabel}>Client Rating</Text>
            </View>
            <View style={styles.lawyerStatCard}>
              <ProfessionalIcon type="CLOCK" size={24} color="#6c757d" />
              <Text style={styles.statValue}>{lawyerStats.responseTime}</Text>
              <Text style={styles.statLabel}>Response Time</Text>
            </View>
          </View>
        </View>

        {/* Law Firm Organizations */}
        <View style={styles.lawyerSection}>
          <View style={styles.lawyerSectionHeader}>
            <View style={styles.lawFirmSectionTitleContainer}>
              <ProfessionalIcon type="BRIEFCASE" size={20} color="#2E4A6B" />
              <Text style={styles.lawyerSectionTitle}>Law Firm Organizations</Text>
            </View>
            <TouchableOpacity onPress={() => setShowAllLawFirms(true)} style={styles.viewAllButton}>
              <Text style={styles.lawyerSeeAll}>View All</Text>
              <ProfessionalIcon type="CHEVRON_RIGHT" size={16} color="#2E4A6B" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lawyerLawFirmsScroll}>
            {lawFirmOrganizations.slice(0, 8).map((firm) => (
              <TouchableOpacity 
                key={firm.id} 
                style={styles.lawyerLawFirmCard}
                onPress={() => handleLawFirmClick(firm)}
              >
                <View style={styles.lawFirmAvatar}>
                  <Image source={firm.image} style={styles.lawFirmProfileImage} />
                </View>
                  <Text style={styles.lawFirmName} numberOfLines={2}>{firm.name}</Text>
                  <Text style={styles.lawFirmSpecialty}>{firm.specialty}</Text>
                    <View style={styles.lawFirmRating}>
                  <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                  <Text style={styles.ratingText}>{firm.rating}</Text>
                    </View>
                <Text style={styles.lawFirmLawyers}>{firm.lawyers} lawyers</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.lawyerSection}>
          <View style={styles.lawyerSectionHeader}>
            <View style={styles.quickActionSectionTitleContainer}>
              <ProfessionalIcon type="FLASH" size={20} color="#2E4A6B" />
              <Text style={styles.lawyerSectionTitle}>Quick Actions</Text>
            </View>
          </View>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => setLawyerCurrentScreen('profile')}
            >
              <ProfessionalIcon type="USER_EDIT" size={32} color="#2E4A6B" />
              <Text style={styles.quickActionText}>Manage Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => setLawyerCurrentScreen('schedule')}
            >
              <ProfessionalIcon type="CALENDAR" size={32} color="#2E4A6B" />
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => setLawyerCurrentScreen('cases')}
            >
              <ProfessionalIcon type="BRIEFCASE" size={32} color="#2E4A6B" />
              <Text style={styles.quickActionText}>My Cases</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => setShowNotifications(true)}
            >
              <ProfessionalIcon type="BELL" size={32} color="#2E4A6B" />
              <Text style={styles.quickActionText}>Notifications</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lawyerBottomSpacing} />
      </ScrollView>

        {/* Lawyer Bottom Navigation */}
        <View style={styles.lawyerBottomNav}>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('home')}>
            <ProfessionalIcon type="HOME" size={24} color={lawyerCurrentScreen === 'home' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'home' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('cases')}>
            <ProfessionalIcon type="BRIEFCASE" size={24} color={lawyerCurrentScreen === 'cases' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'cases' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Cases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('schedule')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'schedule' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'schedule' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('appointments')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'appointments' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'appointments' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('profile')}>
            <ProfessionalIcon type="USER" size={24} color={lawyerCurrentScreen === 'profile' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'profile' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Profile</Text>
          </TouchableOpacity>
        </View>
    </View>
  );

  // Simple Lawyer Profile Screen (like USER profile page)
  const renderLawyerProfileScreen = () => {
    const handleLogout = () => {
      setShowLogoutConfirmation(true);
    };

    return (
      <View style={styles.lawyerProfileContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.lawyerProfileHeader}>
          <View style={styles.lawyerProfileHeaderRow}>
            <TouchableOpacity 
              style={styles.lawyerProfileBackButton}
              onPress={() => setLawyerCurrentScreen('home')}
            >
              <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.lawyerProfileTitleContainer}>
              <Text style={styles.lawyerProfileTitle}>Profile</Text>
            </View>
            <View style={styles.headerButtonsRow}>
              <TouchableOpacity 
                style={styles.headerNotificationButton}
                onPress={() => setShowNotifications(true)}
              >
                <ProfessionalIcon type="BELL" size={20} color="#ffffff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.lawyerProfileSettingsButton}>
                <ProfessionalIcon type="SETTINGS" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.lawyerProfileContent} showsVerticalScrollIndicator={false}>
          {/* Lawyer Info Card */}
          <View style={styles.lawyerProfileInfoCard}>
            <View style={styles.lawyerProfileAvatarContainer}>
              <Image 
                source={lawyerProfile.profileImage}
                style={styles.lawyerProfileAvatarImage}
                resizeMode="cover"
              />
            </View>
            
            <Text style={styles.lawyerProfileNameLarge}>{lawyerProfile.name || 'Katie Syrus'}</Text>
            <Text style={styles.lawyerProfileRole}>{lawyerProfile.specialty || 'Legal Professional'}</Text>
            
            <View style={styles.lawyerProfileContactInfo}>
              <View style={styles.lawyerProfileContactItem}>
                <ProfessionalIcon type="EMAIL" size={20} color="#ffffff" />
                <Text style={styles.lawyerProfileContactText}>{lawyerProfile.email}</Text>
              </View>
              <View style={styles.lawyerProfileContactItem}>
                <ProfessionalIcon type="PHONE" size={20} color="#ffffff" />
                <Text style={styles.lawyerProfileContactText}>{lawyerProfile.phone}</Text>
              </View>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.lawyerProfileMenuSection}>
            <TouchableOpacity 
              style={styles.lawyerProfileMenuItem}
              onPress={() => setShowManageProfile(true)}
            >
              <View style={styles.lawyerProfileMenuItemLeft}>
                <ProfessionalIcon type="EDIT" size={24} color="#2E4A6B" />
                <Text style={styles.lawyerProfileMenuItemText}>Manage Profile</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawyerProfileMenuItem}>
              <View style={styles.lawyerProfileMenuItemLeft}>
                <ProfessionalIcon type="BRIEFCASE" size={24} color="#2E4A6B" />
                <Text style={styles.lawyerProfileMenuItemText}>All Payments</Text>
              </View>
              <View style={styles.lawyerProfileComingSoonBadge}>
                <Text style={styles.lawyerProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawyerProfileMenuItem}>
              <View style={styles.lawyerProfileMenuItemLeft}>
                <ProfessionalIcon type="CHECKMARK" size={24} color="#2E4A6B" />
                <Text style={styles.lawyerProfileMenuItemText}>Manage Payment</Text>
              </View>
              <View style={styles.lawyerProfileComingSoonBadge}>
                <Text style={styles.lawyerProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawyerProfileMenuItem}>
              <View style={styles.lawyerProfileMenuItemLeft}>
                <ProfessionalIcon type="LOCATION" size={24} color="#2E4A6B" />
                <Text style={styles.lawyerProfileMenuItemText}>Edit Address</Text>
              </View>
              <View style={styles.lawyerProfileComingSoonBadge}>
                <Text style={styles.lawyerProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawyerProfileMenuItem}>
              <View style={styles.lawyerProfileMenuItemLeft}>
                <ProfessionalIcon type="SETTINGS" size={24} color="#2E4A6B" />
                <Text style={styles.lawyerProfileMenuItemText}>Settings</Text>
              </View>
              <View style={styles.lawyerProfileComingSoonBadge}>
                <Text style={styles.lawyerProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawyerProfileMenuItem} onPress={handleLogout}>
              <View style={styles.lawyerProfileMenuItemLeft}>
                <ProfessionalIcon type="LOGOUT" size={24} color="#2E4A6B" />
                <Text style={styles.lawyerProfileMenuItemText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.lawyerBottomNav}>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('home')}>
            <ProfessionalIcon type="HOME" size={24} color={lawyerCurrentScreen === 'home' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'home' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('cases')}>
            <ProfessionalIcon type="BRIEFCASE" size={24} color={lawyerCurrentScreen === 'cases' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'cases' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Cases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('schedule')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'schedule' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'schedule' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('appointments')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'appointments' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'appointments' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('profile')}>
            <ProfessionalIcon type="USER" size={24} color={lawyerCurrentScreen === 'profile' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'profile' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Manage Profile Screen (detailed editable profile)
  const renderManageProfileScreen = () => {
    return (
      <View style={styles.lawyerDetailsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.lawyerDetailsHeader}>
          <TouchableOpacity onPress={() => setShowManageProfile(false)} style={styles.lawyerDetailsBackButton}>
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.lawyerDetailsTitle}>Manage Profile</Text>
          <TouchableOpacity 
            style={[
              styles.manageProfileSaveButton,
              !editMode && styles.manageProfileSaveButtonDisabled
            ]}
            onPress={() => {
              if (editMode) {
                handleSaveProfile();
              } else {
                setEditMode(true);
              }
            }}
          >
            <Text style={[
              styles.manageProfileSaveText,
              !editMode && styles.manageProfileSaveTextDisabled
            ]}>
              {editMode ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.lawyerDetailsScroll} showsVerticalScrollIndicator={false}>
          {/* Hero Profile Section */}
          <View style={styles.lawyerHeroSection}>
            <View style={styles.lawyerProfileImageContainer}>
              <Image source={lawyerProfile.profileImage} style={styles.lawyerDetailProfileImage} />
              {lawyerProfile.verified && (
                <View style={styles.verifiedBadge}>
                  <ProfessionalIcon type="CHECKMARK" size={16} color="#FFFFFF" />
                </View>
              )}
            </View>
            
            {editMode ? (
              <TextInput
                style={styles.editableProfileName}
                value={editedProfile?.name || ''}
                onChangeText={(text) => setEditedProfile({...(editedProfile || {}), name: text})}
                placeholder="Full Name"
              />
            ) : (
              <Text style={styles.lawyerProfileNameLarge}>{lawyerProfile.name || 'Katie Syrus'}</Text>
            )}
            
            {editMode ? (
              <TextInput
                style={styles.editableProfileSpecialty}
                value={editedProfile?.specialty || ''}
                onChangeText={(text) => setEditedProfile({...(editedProfile || {}), specialty: text})}
                placeholder="Specialty"
              />
            ) : (
              <Text style={styles.lawyerProfileSpecialty}>{lawyerProfile.specialty}</Text>
            )}
            
            {/* Quick Stats */}
            <View style={styles.lawyerQuickStats}>
              <View style={styles.lawyerQuickStat}>
                <Text style={styles.lawyerQuickStatValue}>{lawyerProfile.rating}</Text>
                <Text style={styles.lawyerQuickStatLabel}>Rating</Text>
              </View>
              <View style={styles.lawyerQuickStat}>
                <Text style={styles.lawyerQuickStatValue}>{lawyerProfile.cases}</Text>
                <Text style={styles.lawyerQuickStatLabel}>Cases</Text>
              </View>
              <View style={styles.lawyerQuickStat}>
                <Text style={styles.lawyerQuickStatValue}>{lawyerProfile.clients}</Text>
                <Text style={styles.lawyerQuickStatLabel}>Clients</Text>
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
                  <Text style={styles.lawyerAboutStatValue}>{lawyerProfile.cases}</Text>
                  <Text style={styles.lawyerAboutStatLabel}>Cases Handled</Text>
                </View>
              </View>
              <View style={styles.lawyerAboutStat}>
                <View style={styles.lawyerAboutStatIcon}>
                  <ProfessionalIcon type="STAR" size={24} color="#ffffff" />
                </View>
                <View style={styles.lawyerAboutStatContent}>
                  <Text style={styles.lawyerAboutStatValue}>{lawyerProfile.rating}</Text>
                  <Text style={styles.lawyerAboutStatLabel}>Rating</Text>
                </View>
              </View>
            </View>
            
            {editMode ? (
              <TextInput
                style={styles.editableBio}
                value={editedProfile?.bio || ''}
                onChangeText={(text) => setEditedProfile({...(editedProfile || {}), bio: text})}
                placeholder="Tell us about yourself and your expertise..."
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.lawyerAboutDescription}>{lawyerProfile.bio}</Text>
            )}
            
            {!editMode && (
              <TouchableOpacity style={styles.lawyerReadMoreButton}>
                <Text style={styles.lawyerReadMoreText}>Read More</Text>
                <Text style={styles.lawyerReadMoreIcon}>→</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Contact Information Section */}
          <View style={styles.lawyerContactSection}>
            <Text style={styles.lawyerSectionTitle}>Contact Information</Text>
            
            <View style={styles.contactInfoContainer}>
              <View style={styles.contactInfoRow}>
                <ProfessionalIcon type="PHONE" size={24} color="#2E4A6B" />
                {editMode ? (
                  <TextInput
                    style={styles.editableContactText}
                    value={editedProfile?.phone || ''}
                    onChangeText={(text) => setEditedProfile({...(editedProfile || {}), phone: text})}
                    placeholder="Phone Number"
                  />
                ) : (
                  <Text style={styles.contactInfoText}>{lawyerProfile.phone}</Text>
                )}
              </View>
              
              <View style={styles.contactInfoRow}>
                <ProfessionalIcon type="EMAIL" size={24} color="#2E4A6B" />
                {editMode ? (
                  <TextInput
                    style={styles.editableContactText}
                    value={editedProfile?.email || ''}
                    onChangeText={(text) => setEditedProfile({...(editedProfile || {}), email: text})}
                    placeholder="Email Address"
                  />
                ) : (
                  <Text style={styles.contactInfoText}>{lawyerProfile.email}</Text>
                )}
              </View>
              
              <View style={styles.contactInfoRow}>
                <ProfessionalIcon type="LOCATION" size={24} color="#2E4A6B" />
                {editMode ? (
                  <TextInput
                    style={styles.editableContactText}
                    value={editedProfile?.address || ''}
                    onChangeText={(text) => setEditedProfile({...(editedProfile || {}), address: text})}
                    placeholder="Office Address"
                  />
                ) : (
                  <Text style={styles.contactInfoText}>{lawyerProfile.address}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Professional Details Section */}
          <View style={styles.professionalSection}>
            <Text style={styles.lawyerSectionTitle}>Professional Details</Text>
            
            <View style={styles.professionalInfoContainer}>
              <View style={styles.contactInfoRow}>
                <ProfessionalIcon type="DOLLAR" size={24} color="#2E4A6B" />
                {editMode ? (
                  <TextInput
                    style={styles.editableContactText}
                    value={editedProfile?.consultationFee || ''}
                    onChangeText={(text) => setEditedProfile({...(editedProfile || {}), consultationFee: text})}
                    placeholder="Consultation Fee (e.g., $150/hour)"
                  />
                ) : (
                  <Text style={styles.contactInfoText}>Consultation Fee: {lawyerProfile.consultationFee}</Text>
                )}
              </View>
              
              <View style={styles.contactInfoRow}>
                <ProfessionalIcon type="CLOCK" size={24} color="#2E4A6B" />
                {editMode ? (
                  <TextInput
                    style={styles.editableContactText}
                    value={editedProfile?.availability || ''}
                    onChangeText={(text) => setEditedProfile({...(editedProfile || {}), availability: text})}
                    placeholder="Availability (e.g., Available, Busy)"
                  />
                ) : (
                  <Text style={styles.contactInfoText}>Availability: {lawyerProfile.availability}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Services Section */}
          <View style={styles.servicesSection}>
            <Text style={styles.lawyerSectionTitle}>Services Offered</Text>
            <View style={styles.servicesGrid}>
              {selectedServices && selectedServices.length > 0 && selectedServices.map((service, index) => (
                <View key={index} style={styles.serviceTag}>
                  <Text style={styles.serviceTagText}>{service}</Text>
                </View>
              ))}
              {(!selectedServices || selectedServices.length === 0) && (
                <Text style={styles.noServicesText}>No services selected</Text>
              )}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Action Bar */}
        {editMode && (
          <View style={styles.lawyerDetailsFooter}>
            <TouchableOpacity 
              style={styles.saveProfileButton}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveProfileText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // Logout Confirmation Screen (same design as USER logout page)
  const renderLogoutConfirmationScreen = () => {
    const handleConfirmLogout = () => {
      setShowLogoutConfirmation(false);
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
              You will need to sign in again to access your lawyer account and manage your profile.
            </Text>
          </View>

          {/* Account Summary */}
          <View style={styles.logoutConfirmationSummarySection}>
            <Text style={styles.logoutConfirmationSummaryTitle}>Account Summary</Text>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Total Cases:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{lawyerProfile.cases}</Text>
            </View>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Active Clients:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{lawyerProfile.clients}</Text>
            </View>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Rating:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{lawyerProfile.rating} ⭐</Text>
            </View>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Services:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{selectedServices?.length || 0}</Text>
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
      </View>
    );
  };

  // Modern Cases Screen
  const renderLawyerCasesScreen = () => {
    const filteredCases = casesFilter === 'All' 
      ? lawyerCases 
      : lawyerCases.filter(caseItem => caseItem.status === casesFilter);

    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return '#28a745';
        case 'Pending': return '#ffc107';
        case 'Completed': return '#6c757d';
        default: return '#2E4A6B';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'High': return '#dc3545';
        case 'Medium': return '#fd7e14';
        case 'Low': return '#20c997';
        default: return '#6c757d';
      }
    };

    return (
      <View style={styles.lawyerCasesContainer}>
        <StatusBar style="light" />
        
        {/* Modern Header */}
        <View style={styles.lawyerCasesHeader}>
          <View style={styles.lawyerCasesHeaderContent}>
            <View style={styles.lawyerCasesHeaderLeft}>
              <Text style={styles.lawyerCasesTitle}>My Cases</Text>
              <Text style={styles.lawyerCasesSubtitle}>{filteredCases.length} cases</Text>
            </View>
            <View style={styles.headerButtonsRow}>
              <TouchableOpacity 
                style={styles.headerNotificationButton}
                onPress={() => setShowNotifications(true)}
              >
                <ProfessionalIcon type="BELL" size={20} color="#ffffff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerSettingsButton}>
                <ProfessionalIcon type="SETTINGS" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Modern Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabsContainer}>
            {['All', 'Active', 'Pending', 'Completed'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  casesFilter === filter && styles.filterTabActive
                ]}
                onPress={() => setCasesFilter(filter)}
              >
                <Text style={[
                  styles.filterTabText,
                  casesFilter === filter && styles.filterTabTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Cases List */}
        <ScrollView style={styles.lawyerCasesContent} showsVerticalScrollIndicator={false}>
          {filteredCases.map((caseItem) => (
            <TouchableOpacity
              key={caseItem.id}
              style={styles.modernCaseCard}
              onPress={() => {
                setSelectedCase(caseItem);
                setShowCaseDetails(true);
              }}
            >
              {/* Case Header */}
              <View style={styles.caseCardHeader}>
                <View style={styles.caseCardHeaderLeft}>
                  <Text style={styles.caseNumber}>{caseItem.caseNumber}</Text>
                  <View style={styles.caseBadges}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(caseItem.status) }]}>
                      <Text style={styles.statusBadgeText}>{caseItem.status}</Text>
                    </View>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(caseItem.priority) }]}>
                      <Text style={styles.priorityBadgeText}>{caseItem.priority}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.caseOptionsButton}>
                  <ProfessionalIcon type="MORE_VERTICAL" size={20} color="#6c757d" />
                </TouchableOpacity>
              </View>

              {/* Case Info */}
              <View style={styles.caseCardContent}>
                <View style={styles.caseClientInfo}>
                  <TouchableOpacity 
                    style={styles.caseClientAvatar}
                    onPress={() => handleUserProfileClick(caseItem)}
                  >
                    {caseItem.clientImage && <Image source={caseItem.clientImage} style={styles.caseClientImage} />}
                  </TouchableOpacity>
                  <View style={styles.caseClientDetails}>
                    <Text style={styles.clientName}>{caseItem.clientName}</Text>
                    <Text style={styles.caseType}>{caseItem.caseType}</Text>
                  </View>
                </View>
                <Text style={styles.caseDescription}>{caseItem.description}</Text>

                {/* Progress Bar */}
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.progressPercent}>{caseItem.progress}%</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { width: `${caseItem.progress}%` }
                      ]} 
                    />
                  </View>
                </View>

                {/* Case Stats */}
                <View style={styles.caseStatsRow}>
                  <View style={styles.caseStat}>
                    <ProfessionalIcon type="CALENDAR" size={16} color="#6c757d" />
                    <Text style={styles.caseStatText}>
                      {caseItem.nextHearing ? `Next: ${caseItem.nextHearing}` : 'No hearings'}
                    </Text>
                  </View>
                  <View style={styles.caseStat}>
                    <ProfessionalIcon type="DOCUMENT" size={16} color="#6c757d" />
                    <Text style={styles.caseStatText}>{caseItem.documents} docs</Text>
                  </View>
                  <View style={styles.caseStat}>
                    <ProfessionalIcon type="CLOCK" size={16} color="#6c757d" />
                    <Text style={styles.caseStatText}>{caseItem.billableHours}h</Text>
                  </View>
                  <View style={styles.caseStat}>
                    <ProfessionalIcon type="DOLLAR" size={16} color="#28a745" />
                    <Text style={styles.caseStatValue}>{caseItem.totalFees}</Text>
                  </View>
                </View>

                {/* Last Activity */}
                <View style={styles.lastActivityRow}>
                  <Text style={styles.lastActivityText}>Last activity: {caseItem.lastActivity}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.casesBottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.lawyerBottomNav}>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('home')}>
            <ProfessionalIcon type="HOME" size={24} color={lawyerCurrentScreen === 'home' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'home' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('cases')}>
            <ProfessionalIcon type="BRIEFCASE" size={24} color={lawyerCurrentScreen === 'cases' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'cases' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Cases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('schedule')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'schedule' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'schedule' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('appointments')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'appointments' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'appointments' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('profile')}>
            <ProfessionalIcon type="USER" size={24} color={lawyerCurrentScreen === 'profile' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'profile' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Case Details Screen
  const renderCaseDetailsScreen = () => {
    if (!selectedCase) return null;

    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return '#28a745';
        case 'Pending': return '#ffc107';
        case 'Completed': return '#6c757d';
        default: return '#2E4A6B';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'High': return '#dc3545';
        case 'Medium': return '#fd7e14';
        case 'Low': return '#20c997';
        default: return '#6c757d';
      }
    };

    return (
      <View style={styles.caseDetailsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.caseDetailsHeader}>
          <TouchableOpacity 
            style={styles.caseDetailsBackButton}
            onPress={() => setShowCaseDetails(false)}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.caseDetailsHeaderCenter}>
            <Text style={styles.caseDetailsTitle}>Case Details</Text>
            <Text style={styles.caseDetailsSubtitle}>{selectedCase.caseNumber}</Text>
          </View>
          <TouchableOpacity style={styles.caseDetailsOptionsButton}>
            <ProfessionalIcon type="MORE_VERTICAL" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.caseDetailsContent} showsVerticalScrollIndicator={false}>
          {/* Case Overview Card */}
          <View style={styles.caseOverviewCard}>
            <View style={styles.caseOverviewHeader}>
              <View style={styles.caseOverviewLeft}>
                <View style={styles.caseDetailsClientInfo}>
                  <TouchableOpacity 
                    style={styles.caseDetailsClientAvatar}
                    onPress={() => handleUserProfileClick(selectedCase)}
                  >
                    {selectedCase.clientImage && <Image source={selectedCase.clientImage} style={styles.caseDetailsClientImage} />}
                  </TouchableOpacity>
                  <View style={styles.caseDetailsClientDetails}>
                    <Text style={styles.caseOverviewClient}>{selectedCase.clientName}</Text>
                    <Text style={styles.caseOverviewType}>{selectedCase.caseType}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.caseOverviewBadges}>
                <View style={[styles.statusBadgeLarge, { backgroundColor: getStatusColor(selectedCase.status) }]}>
                  <Text style={styles.statusBadgeLargeText}>{selectedCase.status}</Text>
                </View>
                <View style={[styles.priorityBadgeLarge, { backgroundColor: getPriorityColor(selectedCase.priority) }]}>
                  <Text style={styles.priorityBadgeLargeText}>{selectedCase.priority} Priority</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.caseOverviewDescription}>{selectedCase.description}</Text>
            
            {/* Progress Section */}
            <View style={styles.caseProgressSection}>
              <View style={styles.caseProgressHeader}>
                <Text style={styles.caseProgressLabel}>Case Progress</Text>
                <Text style={styles.caseProgressPercent}>{selectedCase.progress}%</Text>
              </View>
              <View style={styles.caseProgressBarContainer}>
                <View 
                  style={[
                    styles.caseProgressBar, 
                    { width: `${selectedCase.progress}%` }
                  ]} 
                />
              </View>
            </View>
          </View>

          {/* Key Information */}
          <View style={styles.caseInfoSection}>
            <Text style={styles.caseInfoSectionTitle}>Key Information</Text>
            
            <View style={styles.caseInfoGrid}>
              <View style={styles.caseInfoItem}>
                <ProfessionalIcon type="CALENDAR" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Next Hearing</Text>
                  <Text style={styles.caseInfoItemValue}>
                    {selectedCase.nextHearing || 'No scheduled hearings'}
                  </Text>
                </View>
              </View>

              <View style={styles.caseInfoItem}>
                <ProfessionalIcon type="LOCATION" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Court Location</Text>
                  <Text style={styles.caseInfoItemValue}>{selectedCase.courtLocation}</Text>
                </View>
              </View>

              <View style={styles.caseInfoItem}>
                <ProfessionalIcon type="USER" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Prosecutor</Text>
                  <Text style={styles.caseInfoItemValue}>{selectedCase.prosecutor}</Text>
                </View>
              </View>

              <View style={styles.caseInfoItem}>
                <ProfessionalIcon type="DOCUMENT" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Documents</Text>
                  <Text style={styles.caseInfoItemValue}>{selectedCase.documents} files</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Charges Section */}
          <View style={styles.caseChargesSection}>
            <Text style={styles.caseChargesSectionTitle}>Charges</Text>
            <View style={styles.chargesGrid}>
              {selectedCase.charges.map((charge, index) => (
                <View key={index} style={styles.chargeTag}>
                  <Text style={styles.chargeTagText}>{charge}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Financial Information */}
          <View style={styles.caseFinancialSection}>
            <Text style={styles.caseFinancialSectionTitle}>Financial Summary</Text>
            
            <View style={styles.financialStatsRow}>
              <View style={styles.financialStat}>
                <View style={styles.financialStatIcon}>
                  <ProfessionalIcon type="CLOCK" size={24} color="#ffffff" />
                </View>
                <View style={styles.financialStatContent}>
                  <Text style={styles.financialStatValue}>{selectedCase.billableHours}h</Text>
                  <Text style={styles.financialStatLabel}>Billable Hours</Text>
                </View>
              </View>

              <View style={styles.financialStat}>
                <View style={styles.financialStatIcon}>
                  <ProfessionalIcon type="DOLLAR" size={24} color="#ffffff" />
                </View>
                <View style={styles.financialStatContent}>
                  <Text style={styles.financialStatValue}>{selectedCase.totalFees}</Text>
                  <Text style={styles.financialStatLabel}>Total Fees</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Case Timeline */}
          <View style={styles.caseTimelineSection}>
            <Text style={styles.caseTimelineSectionTitle}>Case Timeline</Text>
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <ProfessionalIcon type="PLUS" size={16} color="#ffffff" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Case Created</Text>
                <Text style={styles.timelineDate}>{selectedCase.dateCreated}</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <ProfessionalIcon type="CLOCK" size={16} color="#ffffff" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Last Activity</Text>
                <Text style={styles.timelineDate}>{selectedCase.lastActivity}</Text>
              </View>
            </View>

            {selectedCase.nextHearing && (
              <View style={styles.timelineItem}>
                <View style={styles.timelineIcon}>
                  <ProfessionalIcon type="CALENDAR" size={16} color="#ffffff" />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Next Hearing</Text>
                  <Text style={styles.timelineDate}>{selectedCase.nextHearing}</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.caseDetailsBottomSpacing} />
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.caseDetailsActions}>
          <TouchableOpacity 
            style={styles.caseActionButton}
            onPress={() => {
              console.log('Edit Case button pressed!');
              console.log('Selected Case:', selectedCase);
              if (selectedCase) {
                setEditingCase({...selectedCase});
                setShowCaseDetails(false); // Close case details first
                setShowEditCase(true);
                console.log('Edit Case screen should now show');
              } else {
                showCustomAlert(
                  'error',
                  'Error',
                  'No case selected. Please try again.',
                  [{ text: 'OK', style: 'primary' }]
                );
              }
            }}
          >
            <ProfessionalIcon type="EDIT" size={20} color="#2E4A6B" />
            <Text style={styles.caseActionButtonText}>Edit Case</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.caseActionButtonPrimary}
            onPress={() => {
              console.log('Add Activity button pressed!');
              // Reset new activity form
              setNewActivity({
                type: 'note',
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                billableHours: 0,
                status: 'completed'
              });
              setShowCaseDetails(false);
              setShowAddActivity(true);
            }}
          >
            <ProfessionalIcon type="PLUS" size={20} color="#ffffff" />
            <Text style={styles.caseActionButtonPrimaryText}>Add Activity</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Modern Schedule Screen
  const renderLawyerScheduleScreen = () => {
    // Filter by type first
    let typeFilteredSchedule = scheduleFilter === 'All' 
      ? lawyerSchedule 
      : lawyerSchedule.filter(item => item.type === scheduleFilter.toLowerCase());

    // Then filter by date if a specific date is selected
    const filteredSchedule = selectedDate === 'All Dates' 
      ? typeFilteredSchedule 
      : typeFilteredSchedule.filter(item => item.date === selectedDate);

    const todaySchedule = lawyerSchedule.filter(item => item.date === new Date().toISOString().split('T')[0]);
    
    // Get available dates from schedule for picker
    const availableDates = ['All Dates', ...new Set(lawyerSchedule.map(item => item.date))].sort();

    const getTypeColor = (type) => {
      switch (type) {
        case 'court': return '#dc3545';
        case 'consultation': return '#007bff';
        case 'deposition': return '#fd7e14';
        case 'task': return '#28a745';
        case 'meeting': return '#6f42c1';
        default: return '#2E4A6B';
      }
    };

    const getTypeIcon = (type) => {
      switch (type) {
        case 'court': return 'BRIEFCASE';
        case 'consultation': return 'USER';
        case 'deposition': return 'DOCUMENT';
        case 'task': return 'CHECKMARK';
        case 'meeting': return 'USERS';
        default: return 'CALENDAR';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return '#dc3545';
        case 'medium': return '#fd7e14';
        case 'low': return '#28a745';
        default: return '#6c757d';
      }
    };

    return (
      <View style={styles.lawyerScheduleContainer}>
        <StatusBar style="light" />
        
        {/* Modern Header */}
        <View style={styles.lawyerScheduleHeader}>
          <View style={styles.lawyerScheduleHeaderContent}>
            <View style={styles.lawyerScheduleHeaderLeft}>
              <Text style={styles.lawyerScheduleTitle}>My Schedule</Text>
              <Text style={styles.lawyerScheduleSubtitle}>{todaySchedule.length} appointments today</Text>
            </View>
            <View style={styles.headerButtonsRow}>
              <TouchableOpacity 
                style={styles.headerNotificationButton}
                onPress={() => setShowNotifications(true)}
              >
                <ProfessionalIcon type="BELL" size={20} color="#ffffff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerSettingsButton}>
                <ProfessionalIcon type="SETTINGS" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Selector */}
          <View style={styles.dateSelector}>
            <TouchableOpacity 
              style={styles.dateSelectorButton}
              onPress={() => setShowDatePicker(!showDatePicker)}
            >
              <ProfessionalIcon type="CALENDAR" size={18} color="#ffffff" />
              <Text style={styles.dateSelectorText}>{selectedDate}</Text>
              <ProfessionalIcon type={showDatePicker ? "CHEVRON_UP" : "CHEVRON_DOWN"} size={16} color="#ffffff" />
            </TouchableOpacity>
            
            {/* Date Picker Dropdown */}
            {showDatePicker && (
              <View style={styles.datePickerDropdown}>
                <ScrollView style={styles.datePickerScroll} nestedScrollEnabled={true}>
                  {availableDates.map((date, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.datePickerItem,
                        selectedDate === date && styles.datePickerItemSelected
                      ]}
                      onPress={() => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={[
                        styles.datePickerItemText,
                        selectedDate === date && styles.datePickerItemTextSelected
                      ]}>
                        {date}
                      </Text>
                      {selectedDate === date && (
                        <ProfessionalIcon type="CHECKMARK" size={16} color="#2E4A6B" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scheduleFilterTabsContainer}>
            {['All', 'Court', 'Consultation', 'Task', 'Meeting'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.scheduleFilterTab,
                  scheduleFilter === filter && styles.scheduleFilterTabActive
                ]}
                onPress={() => setScheduleFilter(filter)}
              >
                <Text style={[
                  styles.scheduleFilterTabText,
                  scheduleFilter === filter && styles.scheduleFilterTabTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Schedule Content */}
        <ScrollView style={styles.lawyerScheduleContent} showsVerticalScrollIndicator={false}>
          {/* Today's Schedule */}
          <View style={styles.todaySection}>
            <Text style={styles.todaySectionTitle}>Today's Schedule</Text>
            {todaySchedule.length > 0 ? (
              todaySchedule.map((item) => (
                <TouchableOpacity key={item.id} style={styles.todayScheduleCard}>
                  <View style={styles.scheduleTimeColumn}>
                    <Text style={styles.scheduleTime}>{item.time}</Text>
                    <Text style={styles.scheduleDuration}>{item.duration}</Text>
                  </View>
                  
                  <View style={[styles.scheduleTypeIndicator, { backgroundColor: getTypeColor(item.type) }]} />
                  
                  <View style={styles.scheduleContentColumn}>
                    <View style={styles.scheduleHeader}>
                      <Text style={styles.scheduleTitle}>{item.title}</Text>
                      <View style={[styles.schedulePriorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                        <Text style={styles.schedulePriorityText}>{item.priority}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.scheduleDescription}>{item.description}</Text>
                    
                    <View style={styles.scheduleMetaRow}>
                      <View style={styles.scheduleMetaItem}>
                        <ProfessionalIcon type="LOCATION" size={14} color="#6c757d" />
                        <Text style={styles.scheduleMetaText}>{item.location}</Text>
                      </View>
                      {item.caseNumber && (
                        <View style={styles.scheduleMetaItem}>
                          <ProfessionalIcon type="DOCUMENT" size={14} color="#6c757d" />
                          <Text style={styles.scheduleMetaText}>{item.caseNumber}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyScheduleCard}>
                <ProfessionalIcon type="CALENDAR" size={48} color="#6c757d" />
                <Text style={styles.emptyScheduleText}>No appointments today</Text>
                <Text style={styles.emptyScheduleSubtext}>Your schedule is clear for today</Text>
              </View>
            )}
          </View>

          {/* All Schedule Items */}
          <View style={styles.upcomingSection}>
            <Text style={styles.upcomingSectionTitle}>
              {selectedDate === 'All Dates' ? 'All Schedule Items' : `Schedule for ${selectedDate}`} 
              ({filteredSchedule.length} items)
            </Text>
            {filteredSchedule.map((item) => (
              <TouchableOpacity key={item.id} style={styles.upcomingScheduleCard}>
                <View style={styles.upcomingScheduleLeft}>
                  <View style={[styles.upcomingTypeIcon, { backgroundColor: getTypeColor(item.type) }]}>
                    <ProfessionalIcon type={getTypeIcon(item.type)} size={20} color="#ffffff" />
                  </View>
                  
                  <View style={styles.upcomingScheduleInfo}>
                    <Text style={styles.upcomingScheduleTitle}>{item.title}</Text>
                    {item.clientName && item.clientImage && (
                      <View style={styles.scheduleClientInfo}>
                        <View style={styles.scheduleClientAvatar}>
                          {item.clientImage && <Image source={item.clientImage} style={styles.scheduleClientImage} />}
                        </View>
                        <Text style={styles.scheduleClientName}>{item.clientName}</Text>
                      </View>
                    )}
                    <Text style={styles.upcomingScheduleDescription}>{item.description}</Text>
                    
                    <View style={styles.upcomingScheduleMetaRow}>
                      <Text style={styles.upcomingScheduleDate}>{item.date}</Text>
                      <Text style={styles.upcomingScheduleTime}>{item.time}</Text>
                      <Text style={styles.upcomingScheduleLocation}>{item.location}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.upcomingScheduleRight}>
                  <View style={[styles.upcomingPriorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                    <Text style={styles.upcomingPriorityText}>{item.priority}</Text>
                  </View>
                  <TouchableOpacity style={styles.scheduleOptionsButton}>
                    <ProfessionalIcon type="MORE_VERTICAL" size={16} color="#6c757d" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.scheduleBottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.lawyerBottomNav}>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('home')}>
            <ProfessionalIcon type="HOME" size={24} color={lawyerCurrentScreen === 'home' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'home' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('cases')}>
            <ProfessionalIcon type="BRIEFCASE" size={24} color={lawyerCurrentScreen === 'cases' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'cases' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Cases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('schedule')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'schedule' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'schedule' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('appointments')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'appointments' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'appointments' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('profile')}>
            <ProfessionalIcon type="USER" size={24} color={lawyerCurrentScreen === 'profile' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'profile' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Edit Case Screen
  const renderEditCaseScreen = () => {
    console.log('renderEditCaseScreen called with editingCase:', editingCase);
    if (!editingCase) {
      console.log('No editingCase, returning null');
      return null;
    }

    const handleSaveCase = () => {
      // Update the case in the lawyerCases array
      const updatedCases = lawyerCases.map(caseItem => 
        caseItem.id === editingCase.id ? editingCase : caseItem
      );
      setLawyerCases(updatedCases);
      
      // Update selectedCase if it's the same case
      if (selectedCase && selectedCase.id === editingCase.id) {
        setSelectedCase(editingCase);
      }
      
      // Close edit screen and show success
      setShowEditCase(false);
      showCustomAlert(
        'success',
        'Case Updated',
        `Case ${editingCase.caseNumber} has been successfully updated.`,
        [{ text: 'OK', style: 'primary' }]
      );
    };

    const handleAddActivity = () => {
      const newActivity = `New activity added on ${new Date().toLocaleDateString()}`;
      const updatedDescription = editingCase.description + '\n\n' + newActivity;
      setEditingCase({
        ...editingCase,
        description: updatedDescription,
        lastActivity: 'Just now'
      });
      
      showCustomAlert(
        'success',
        'Activity Added',
        'New activity has been added to the case.',
        [{ text: 'OK', style: 'primary' }]
      );
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return '#28a745';
        case 'Pending': return '#ffc107';
        case 'Completed': return '#6c757d';
        default: return '#2E4A6B';
      }
    };

    return (
      <View style={styles.editCaseContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.editCaseHeader}>
          <TouchableOpacity 
            style={styles.editCaseBackButton}
            onPress={() => setShowEditCase(false)}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.editCaseHeaderCenter}>
            <Text style={styles.editCaseTitle}>Edit Case</Text>
            <Text style={styles.editCaseSubtitle}>{editingCase.caseNumber}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editCaseSaveButton}
            onPress={handleSaveCase}
          >
            <Text style={styles.editCaseSaveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.editCaseContent} showsVerticalScrollIndicator={false}>
          {/* Basic Information */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>Basic Information</Text>
            
            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Client Name</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.clientName}
                onChangeText={(text) => setEditingCase({...editingCase, clientName: text})}
                placeholder="Enter client name"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Case Type</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.caseType}
                onChangeText={(text) => setEditingCase({...editingCase, caseType: text})}
                placeholder="Enter case type"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Description</Text>
              <TextInput
                style={[styles.editFieldInput, styles.editFieldTextArea]}
                value={editingCase.description}
                onChangeText={(text) => setEditingCase({...editingCase, description: text})}
                placeholder="Enter case description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Case Status */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>Case Status & Progress</Text>
            
            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Status</Text>
              <View style={styles.statusButtonsContainer}>
                {['Active', 'Pending', 'Completed'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusButton,
                      editingCase.status === status && {
                        backgroundColor: getStatusColor(status),
                        borderColor: getStatusColor(status)
                      }
                    ]}
                    onPress={() => setEditingCase({...editingCase, status})}
                  >
                    <Text style={[
                      styles.statusButtonText,
                      editingCase.status === status && styles.statusButtonTextActive
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Progress: {editingCase.progress}%</Text>
              <View style={styles.progressSliderContainer}>
                <TouchableOpacity 
                  style={styles.progressButton}
                  onPress={() => setEditingCase({...editingCase, progress: Math.max(0, editingCase.progress - 10)})}
                >
                  <Text style={styles.progressButtonText}>-10%</Text>
                </TouchableOpacity>
                
                <View style={styles.progressBarEditContainer}>
                  <View style={styles.progressBarEdit}>
                    <View 
                      style={[
                        styles.progressBarFillEdit, 
                        { width: `${editingCase.progress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressPercentEdit}>{editingCase.progress}%</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.progressButton}
                  onPress={() => setEditingCase({...editingCase, progress: Math.min(100, editingCase.progress + 10)})}
                >
                  <Text style={styles.progressButtonText}>+10%</Text>
                </TouchableOpacity>
              </View>
              
              {/* Quick Progress Buttons */}
              <View style={styles.quickProgressContainer}>
                {[25, 50, 75, 100].map((percent) => (
                  <TouchableOpacity
                    key={percent}
                    style={[
                      styles.quickProgressButton,
                      editingCase.progress === percent && styles.quickProgressButtonActive
                    ]}
                    onPress={() => setEditingCase({...editingCase, progress: percent})}
                  >
                    <Text style={[
                      styles.quickProgressButtonText,
                      editingCase.progress === percent && styles.quickProgressButtonTextActive
                    ]}>
                      {percent}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Priority</Text>
              <View style={styles.priorityButtonsContainer}>
                {['Low', 'Medium', 'High'].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      editingCase.priority === priority && {
                        backgroundColor: priority === 'High' ? '#dc3545' : priority === 'Medium' ? '#fd7e14' : '#20c997'
                      }
                    ]}
                    onPress={() => setEditingCase({...editingCase, priority})}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      editingCase.priority === priority && styles.priorityButtonTextActive
                    ]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Court Information */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>Court & Legal Details</Text>
            
            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Next Hearing Date</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.nextHearing || ''}
                onChangeText={(text) => setEditingCase({...editingCase, nextHearing: text})}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Court Location</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.courtLocation}
                onChangeText={(text) => setEditingCase({...editingCase, courtLocation: text})}
                placeholder="Enter court location"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Prosecutor</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.prosecutor}
                onChangeText={(text) => setEditingCase({...editingCase, prosecutor: text})}
                placeholder="Enter prosecutor name"
              />
            </View>
          </View>

          {/* Financial Information */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>Financial Details</Text>
            
            <View style={styles.editFieldRow}>
              <View style={[styles.editField, {flex: 1, marginRight: 10}]}>
                <Text style={styles.editFieldLabel}>Billable Hours</Text>
                <TextInput
                  style={styles.editFieldInput}
                  value={editingCase.billableHours?.toString()}
                  onChangeText={(text) => setEditingCase({...editingCase, billableHours: parseFloat(text) || 0})}
                  placeholder="0.0"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={[styles.editField, {flex: 1, marginLeft: 10}]}>
                <Text style={styles.editFieldLabel}>Total Fees</Text>
                <TextInput
                  style={styles.editFieldInput}
                  value={editingCase.totalFees}
                  onChangeText={(text) => setEditingCase({...editingCase, totalFees: text})}
                  placeholder="$0"
                />
              </View>
            </View>
          </View>

          {/* Activities Section */}
          <View style={styles.editSection}>
            <View style={styles.activitiesSectionHeader}>
              <Text style={styles.editSectionTitle}>Case Activities</Text>
              <TouchableOpacity 
                style={styles.addActivityButtonSmall}
                onPress={handleAddActivity}
              >
                <ProfessionalIcon type="PLUS" size={16} color="#ffffff" />
                <Text style={styles.addActivityButtonSmallText}>Add Activity</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.activitiesContainer}>
              <Text style={styles.activitiesDescription}>
                {editingCase.description}
              </Text>
              <Text style={styles.lastActivityText}>
                Last updated: {editingCase.lastActivity}
              </Text>
            </View>
          </View>

          <View style={styles.editCaseBottomSpacing} />
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.editCaseActions}>
          <TouchableOpacity 
            style={styles.editCaseCancelButton}
            onPress={() => setShowEditCase(false)}
          >
            <Text style={styles.editCaseCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editCaseSaveButtonBottom}
            onPress={handleSaveCase}
          >
            <Text style={styles.editCaseSaveButtonBottomText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Add Activity Screen
  const renderAddActivityScreen = () => {
    if (!selectedCase) return null;

    const handleSaveActivity = () => {
      if (!newActivity.title.trim()) {
        showCustomAlert(
          'error',
          'Validation Error',
          'Please enter an activity title.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      // Create activity entry
      const activityEntry = `\n\n[${newActivity.date} ${newActivity.time}] ${newActivity.type.toUpperCase()}: ${newActivity.title}`;
      const detailsEntry = newActivity.description ? `\nDetails: ${newActivity.description}` : '';
      const hoursEntry = newActivity.billableHours > 0 ? `\nBillable Hours: ${newActivity.billableHours}h` : '';
      const statusEntry = `\nStatus: ${newActivity.status}`;
      
      const fullActivityEntry = activityEntry + detailsEntry + hoursEntry + statusEntry;

      // Update the case
      const updatedCase = {
        ...selectedCase,
        description: selectedCase.description + fullActivityEntry,
        lastActivity: 'Just now',
        billableHours: selectedCase.billableHours + parseFloat(newActivity.billableHours || 0),
        // Auto-update progress based on activity type
        progress: newActivity.type === 'milestone' ? Math.min(100, selectedCase.progress + 25) : selectedCase.progress
      };

      // Update cases array
      const updatedCases = lawyerCases.map(caseItem => 
        caseItem.id === selectedCase.id ? updatedCase : caseItem
      );
      setLawyerCases(updatedCases);
      setSelectedCase(updatedCase);

      // Close activity screen and go back to case details
      setShowAddActivity(false);
      setShowCaseDetails(true);
      
      showCustomAlert(
        'success',
        'Activity Added',
        `${newActivity.type.charAt(0).toUpperCase() + newActivity.type.slice(1)} activity has been added to case ${selectedCase.caseNumber}.`,
        [{ text: 'OK', style: 'primary' }]
      );
    };

    const getActivityTypeColor = (type) => {
      switch (type) {
        case 'note': return '#007bff';
        case 'call': return '#28a745';
        case 'meeting': return '#fd7e14';
        case 'research': return '#6f42c1';
        case 'document': return '#20c997';
        case 'court': return '#dc3545';
        case 'milestone': return '#ffc107';
        default: return '#2E4A6B';
      }
    };

    const getActivityTypeIcon = (type) => {
      switch (type) {
        case 'note': return 'EDIT';
        case 'call': return 'PHONE';
        case 'meeting': return 'USERS';
        case 'research': return 'SEARCH';
        case 'document': return 'DOCUMENT';
        case 'court': return 'BRIEFCASE';
        case 'milestone': return 'STAR';
        default: return 'PLUS';
      }
    };

    return (
      <View style={styles.addActivityContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.addActivityHeader}>
          <TouchableOpacity 
            style={styles.addActivityBackButton}
            onPress={() => {
              setShowAddActivity(false);
              setShowCaseDetails(true);
            }}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.addActivityHeaderCenter}>
            <Text style={styles.addActivityTitle}>Add Activity</Text>
            <Text style={styles.addActivitySubtitle}>{selectedCase.caseNumber}</Text>
          </View>
          <TouchableOpacity 
            style={styles.addActivitySaveButton}
            onPress={handleSaveActivity}
          >
            <Text style={styles.addActivitySaveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.addActivityContent} showsVerticalScrollIndicator={false}>
          {/* Activity Type Selection */}
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>Activity Type</Text>
            <View style={styles.activityTypesGrid}>
              {[
                { type: 'note', label: 'Note', icon: 'EDIT' },
                { type: 'call', label: 'Phone Call', icon: 'PHONE' },
                { type: 'meeting', label: 'Meeting', icon: 'USERS' },
                { type: 'research', label: 'Research', icon: 'SEARCH' },
                { type: 'document', label: 'Document', icon: 'DOCUMENT' },
                { type: 'court', label: 'Court Work', icon: 'BRIEFCASE' },
                { type: 'milestone', label: 'Milestone', icon: 'STAR' }
              ].map((activityType) => (
                <TouchableOpacity
                  key={activityType.type}
                  style={[
                    styles.activityTypeCard,
                    newActivity.type === activityType.type && {
                      backgroundColor: getActivityTypeColor(activityType.type),
                      borderColor: getActivityTypeColor(activityType.type)
                    }
                  ]}
                  onPress={() => setNewActivity({...newActivity, type: activityType.type})}
                >
                  <ProfessionalIcon 
                    type={activityType.icon} 
                    size={24} 
                    color={newActivity.type === activityType.type ? '#ffffff' : getActivityTypeColor(activityType.type)} 
                  />
                  <Text style={[
                    styles.activityTypeText,
                    newActivity.type === activityType.type && styles.activityTypeTextActive
                  ]}>
                    {activityType.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Activity Details */}
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>Activity Details</Text>
            
            <View style={styles.activityField}>
              <Text style={styles.activityFieldLabel}>Title *</Text>
              <TextInput
                style={styles.activityFieldInput}
                value={newActivity.title}
                onChangeText={(text) => setNewActivity({...newActivity, title: text})}
                placeholder="Enter activity title"
              />
            </View>

            <View style={styles.activityField}>
              <Text style={styles.activityFieldLabel}>Description</Text>
              <TextInput
                style={[styles.activityFieldInput, styles.activityFieldTextArea]}
                value={newActivity.description}
                onChangeText={(text) => setNewActivity({...newActivity, description: text})}
                placeholder="Enter activity description (optional)"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Date & Time */}
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>Date & Time</Text>
            
            <View style={styles.activityFieldRow}>
              <View style={[styles.activityField, {flex: 1, marginRight: 10}]}>
                <Text style={styles.activityFieldLabel}>Date</Text>
                <TextInput
                  style={styles.activityFieldInput}
                  value={newActivity.date}
                  onChangeText={(text) => setNewActivity({...newActivity, date: text})}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              
              <View style={[styles.activityField, {flex: 1, marginLeft: 10}]}>
                <Text style={styles.activityFieldLabel}>Time</Text>
                <TextInput
                  style={styles.activityFieldInput}
                  value={newActivity.time}
                  onChangeText={(text) => setNewActivity({...newActivity, time: text})}
                  placeholder="HH:MM"
                />
              </View>
            </View>
          </View>

          {/* Billing & Status */}
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>Billing & Status</Text>
            
            <View style={styles.activityField}>
              <Text style={styles.activityFieldLabel}>Billable Hours</Text>
              <TextInput
                style={styles.activityFieldInput}
                value={newActivity.billableHours?.toString()}
                onChangeText={(text) => setNewActivity({...newActivity, billableHours: parseFloat(text) || 0})}
                placeholder="0.0"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.activityField}>
              <Text style={styles.activityFieldLabel}>Status</Text>
              <View style={styles.statusButtonsContainer}>
                {['completed', 'pending', 'in-progress'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.activityStatusButton,
                      newActivity.status === status && {
                        backgroundColor: status === 'completed' ? '#28a745' : status === 'pending' ? '#ffc107' : '#007bff'
                      }
                    ]}
                    onPress={() => setNewActivity({...newActivity, status})}
                  >
                    <Text style={[
                      styles.activityStatusButtonText,
                      newActivity.status === status && styles.activityStatusButtonTextActive
                    ]}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Activity Preview */}
          <View style={styles.activitySection}>
            <Text style={styles.activitySectionTitle}>Preview</Text>
            <View style={styles.activityPreviewCard}>
              <View style={styles.activityPreviewHeader}>
                <View style={[styles.activityPreviewIcon, { backgroundColor: getActivityTypeColor(newActivity.type) }]}>
                  <ProfessionalIcon type={getActivityTypeIcon(newActivity.type)} size={16} color="#ffffff" />
                </View>
                <View style={styles.activityPreviewInfo}>
                  <Text style={styles.activityPreviewTitle}>
                    {newActivity.title || 'Activity Title'}
                  </Text>
                  <Text style={styles.activityPreviewMeta}>
                    {newActivity.date} at {newActivity.time} • {newActivity.billableHours}h billable
                  </Text>
                </View>
              </View>
              {newActivity.description && (
                <Text style={styles.activityPreviewDescription}>
                  {newActivity.description}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.addActivityBottomSpacing} />
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.addActivityActions}>
          <TouchableOpacity 
            style={styles.addActivityCancelButton}
            onPress={() => {
              setShowAddActivity(false);
              setShowCaseDetails(true);
            }}
          >
            <Text style={styles.addActivityCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addActivitySaveButtonBottom}
            onPress={handleSaveActivity}
          >
            <Text style={styles.addActivitySaveButtonBottomText}>Add Activity</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Modern Appointments Screen
  const renderLawyerAppointmentsScreen = () => {
    const filteredAppointments = appointmentsFilter === 'All' 
      ? lawyerAppointments 
      : lawyerAppointments.filter(appointment => appointment.status === appointmentsFilter.toLowerCase());

    const pendingCount = lawyerAppointments.filter(apt => apt.status === 'pending').length;

    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return '#ffc107';
        case 'accepted': return '#28a745';
        case 'rejected': return '#dc3545';
        default: return '#2E4A6B';
      }
    };

    const getUrgencyColor = (urgency) => {
      switch (urgency) {
        case 'High': return '#dc3545';
        case 'Medium': return '#fd7e14';
        case 'Low': return '#28a745';
        default: return '#6c757d';
      }
    };

    return (
      <View style={styles.lawyerAppointmentsContainer}>
        <StatusBar style="light" />
        
        {/* Modern Header */}
        <View style={styles.lawyerAppointmentsHeader}>
          <View style={styles.lawyerAppointmentsHeaderContent}>
            <View style={styles.lawyerAppointmentsHeaderLeft}>
              <Text style={styles.lawyerAppointmentsTitle}>Appointments</Text>
              <Text style={styles.lawyerAppointmentsSubtitle}>{pendingCount} pending requests</Text>
            </View>
            <View style={styles.headerButtonsRow}>
              <TouchableOpacity 
                style={styles.headerNotificationButton}
                onPress={() => setShowNotifications(true)}
              >
                <ProfessionalIcon type="BELL" size={20} color="#ffffff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>{pendingCount}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerSettingsButton}>
                <ProfessionalIcon type="SETTINGS" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.appointmentFilterTabsContainer}>
            {['All', 'Pending', 'Accepted', 'Rejected'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.appointmentFilterTab,
                  appointmentsFilter === filter && styles.appointmentFilterTabActive
                ]}
                onPress={() => setAppointmentsFilter(filter)}
              >
                <Text style={[
                  styles.appointmentFilterTabText,
                  appointmentsFilter === filter && styles.appointmentFilterTabTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Appointments List */}
        <ScrollView style={styles.lawyerAppointmentsContent} showsVerticalScrollIndicator={false}>
          {filteredAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.modernAppointmentCard}
              onPress={() => {
                setSelectedAppointment(appointment);
                setShowAppointmentDetails(true);
              }}
            >
              {/* Appointment Header */}
              <View style={styles.appointmentCardHeader}>
                <View style={styles.appointmentCardHeaderLeft}>
                  <View style={styles.appointmentClientInfo}>
                    <TouchableOpacity 
                      style={styles.appointmentClientAvatar}
                      onPress={() => handleUserProfileClick(appointment)}
                    >
                      {appointment.clientImage && <Image source={appointment.clientImage} style={styles.appointmentClientImage} />}
                    </TouchableOpacity>
                    <View style={styles.appointmentClientDetails}>
                      <Text style={styles.appointmentClientName}>{appointment.clientName}</Text>
                      <View style={styles.appointmentBadges}>
                        <View style={[styles.appointmentStatusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
                          <Text style={styles.appointmentStatusBadgeText}>{appointment.status.toUpperCase()}</Text>
                        </View>
                        <View style={[styles.appointmentUrgencyBadge, { backgroundColor: '#2E4A6B' }]}>
                          <Text style={styles.appointmentUrgencyBadgeText}>
                            {appointment.consultationType === 'online' ? 'ONLINE' : 
                             appointment.consultationType === 'lawyer_place' ? 'OFFICE' : 
                             'CUSTOM'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.appointmentOptionsButton}>
                  <ProfessionalIcon type="MORE_VERTICAL" size={20} color="#6c757d" />
                </TouchableOpacity>
              </View>

              {/* Appointment Info */}
              <View style={styles.appointmentCardContent}>
                <Text style={styles.appointmentServiceType}>{appointment.lawyerSpecialty}</Text>
                <Text style={styles.appointmentDescription} numberOfLines={2}>
                  {appointment.userMessage}
                </Text>

                {/* Appointment Details Row */}
                <View style={styles.appointmentDetailsRow}>
                  <View style={styles.appointmentDetail}>
                    <ProfessionalIcon type="CALENDAR" size={16} color="#6c757d" />
                    <Text style={styles.appointmentDetailText}>
                      {appointment.requestedDate}
                    </Text>
                  </View>
                  <View style={styles.appointmentDetail}>
                    <ProfessionalIcon type="CLOCK" size={16} color="#6c757d" />
                    <Text style={styles.appointmentDetailText}>
                      {appointment.requestedTime}
                    </Text>
                  </View>
                  <View style={styles.appointmentDetail}>
                    <ProfessionalIcon type="DOLLAR" size={16} color="#28a745" />
                    <Text style={styles.appointmentDetailValue}>{appointment.estimatedFee}</Text>
                  </View>
                </View>

                {/* Meeting Type & Contact Row */}
                <View style={styles.appointmentClientRow}>
                  <View style={styles.appointmentClientDetail}>
                    <ProfessionalIcon type={appointment.consultationType === 'online' ? 'MONITOR' : appointment.consultationType === 'lawyer_place' ? 'BRIEFCASE' : 'CLOCK'} size={14} color="#6c757d" />
                    <Text style={styles.appointmentClientDetailText}>
                      {appointment.consultationType === 'online' ? 'Online Meeting' : 
                       appointment.consultationType === 'lawyer_place' ? 'At Lawyer\'s Office' : 
                       'Custom Time'}
                    </Text>
                  </View>
                  <View style={styles.appointmentClientDetail}>
                    <ProfessionalIcon type="PHONE" size={14} color="#6c757d" />
                    <Text style={styles.appointmentClientDetailText}>{appointment.clientPhone}</Text>
                  </View>
                </View>

                {/* Request Time */}
                <View style={styles.appointmentRequestTimeRow}>
                  <Text style={styles.appointmentRequestTimeText}>
                    Requested: {appointment.requestedAt}
                  </Text>
                  {appointment.previousClient && (
                    <View style={styles.returningClientBadge}>
                      <Text style={styles.returningClientText}>Returning Client</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {filteredAppointments.length === 0 && (
            <View style={styles.emptyAppointmentsCard}>
              <ProfessionalIcon type="CALENDAR" size={48} color="#6c757d" />
              <Text style={styles.emptyAppointmentsText}>No {appointmentsFilter.toLowerCase()} appointments</Text>
              <Text style={styles.emptyAppointmentsSubtext}>
                {appointmentsFilter === 'All' ? 'You have no appointment requests yet' : `No ${appointmentsFilter.toLowerCase()} appointments found`}
              </Text>
            </View>
          )}

          <View style={styles.appointmentsBottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.lawyerBottomNav}>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('home')}>
            <ProfessionalIcon type="HOME" size={24} color={lawyerCurrentScreen === 'home' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'home' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('cases')}>
            <ProfessionalIcon type="BRIEFCASE" size={24} color={lawyerCurrentScreen === 'cases' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'cases' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Cases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('schedule')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'schedule' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'schedule' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('appointments')}>
            <ProfessionalIcon type="CALENDAR" size={24} color={lawyerCurrentScreen === 'appointments' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'appointments' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lawyerNavItem} onPress={() => setLawyerCurrentScreen('profile')}>
            <ProfessionalIcon type="USER" size={24} color={lawyerCurrentScreen === 'profile' ? '#2E4A6B' : '#8A8A8A'} />
            <Text style={[styles.lawyerNavText, lawyerCurrentScreen === 'profile' ? styles.lawyerNavTextActive : styles.lawyerNavTextInactive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Appointment Details Screen
  const renderAppointmentDetailsScreen = () => {
    const handleAppointmentAction = (action) => {
      const updatedAppointments = lawyerAppointments.map(apt => 
        apt.id === selectedAppointment.id ? { ...apt, status: action } : apt
      );
      setLawyerAppointments(updatedAppointments);
      setSelectedAppointment({ ...selectedAppointment, status: action });

      // If accepted, add to schedule and create a case
      if (action === 'accepted') {
        // Add to schedule
        const newScheduleItem = {
          id: Date.now(),
          title: `${selectedAppointment.lawyerSpecialty} - ${selectedAppointment.clientName}`,
          time: selectedAppointment.requestedTime,
          date: selectedAppointment.requestedDate,
          type: 'appointment',
          location: selectedAppointment.consultationType === 'online' ? 'Online Meeting' : 
                   selectedAppointment.consultationType === 'lawyer_place' ? 'At Lawyer\'s Office' : 
                   'Custom Location',
          client: selectedAppointment.clientName,
          phone: selectedAppointment.clientPhone,
          email: selectedAppointment.clientEmail,
          description: selectedAppointment.userMessage,
          fee: selectedAppointment.estimatedFee,
          status: 'scheduled',
          consultationType: selectedAppointment.consultationType
        };

        // Add to cases
        const newCase = {
          id: Date.now() + 1,
          caseNumber: `CR-${new Date().getFullYear()}-${String(lawyerCases.length + 1).padStart(3, '0')}`,
          clientName: selectedAppointment.clientName,
          caseType: selectedAppointment.lawyerSpecialty,
          status: 'Active',
          priority: 'Medium',
          nextHearing: selectedAppointment.requestedDate,
          lastActivity: 'Just now',
          progress: 0,
          description: `Initial consultation: ${selectedAppointment.userMessage}`,
          documents: 0,
          billableHours: 0,
          totalFees: selectedAppointment.estimatedFee,
          courtLocation: 'TBD',
          prosecutor: 'TBD',
          charges: [selectedAppointment.lawyerSpecialty],
          dateCreated: new Date().toISOString().split('T')[0]
        };

        setLawyerSchedule(prev => [...prev, newScheduleItem]);
        setLawyerCases(prev => [...prev, newCase]);
      }

      setShowAppointmentDetails(false);
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return '#ffc107';
        case 'accepted': return '#28a745';
        case 'rejected': return '#dc3545';
        default: return '#2E4A6B';
      }
    };

    const getUrgencyColor = (urgency) => {
      switch (urgency) {
        case 'High': return '#dc3545';
        case 'Medium': return '#fd7e14';
        case 'Low': return '#28a745';
        default: return '#6c757d';
      }
    };

    return (
      <View style={styles.appointmentDetailsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.appointmentDetailsHeader}>
          <TouchableOpacity 
            style={styles.appointmentDetailsBackButton}
            onPress={() => setShowAppointmentDetails(false)}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.appointmentDetailsTitle}>Appointment Details</Text>
          <TouchableOpacity style={styles.appointmentDetailsOptionsButton}>
            <ProfessionalIcon type="MORE_VERTICAL" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.appointmentDetailsContent} showsVerticalScrollIndicator={false}>
          {/* Client Info Card */}
          <View style={styles.appointmentDetailsCard}>
            <View style={styles.appointmentDetailsCardHeader}>
              <TouchableOpacity 
                style={styles.clientAvatar}
                onPress={() => handleUserProfileClick(selectedAppointment)}
              >
                {selectedAppointment.clientImage && <Image source={selectedAppointment.clientImage} style={styles.appointmentDetailsClientImage} />}
              </TouchableOpacity>
              <View style={styles.clientInfo}>
                <Text style={styles.clientNameLarge}>{selectedAppointment.clientName}</Text>
                <Text style={styles.clientSpecialty}>{selectedAppointment.lawyerSpecialty}</Text>
                <View style={styles.clientBadges}>
                  <View style={[styles.appointmentStatusBadgeLarge, { backgroundColor: getStatusColor(selectedAppointment.status) }]}>
                    <Text style={styles.appointmentStatusBadgeTextLarge}>{selectedAppointment.status.toUpperCase()}</Text>
                  </View>
                  {selectedAppointment.previousClient && (
                    <View style={styles.returningClientBadgeLarge}>
                      <Text style={styles.returningClientTextLarge}>Returning Client</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Legal Issue Details Card */}
          <View style={styles.appointmentDetailsCard}>
            <Text style={styles.appointmentDetailsCardTitle}>Legal Issue Description</Text>
            <View style={styles.serviceDetailsRow}>
              <ProfessionalIcon type="BRIEFCASE" size={20} color="#2E4A6B" />
              <Text style={styles.serviceDetailsText}>{selectedAppointment.lawyerSpecialty}</Text>
            </View>
            <Text style={styles.serviceDescription}>{selectedAppointment.userMessage}</Text>
          </View>

          {/* Schedule Details Card */}
          <View style={styles.appointmentDetailsCard}>
            <Text style={styles.appointmentDetailsCardTitle}>Schedule Information</Text>
            <View style={styles.scheduleDetailsGrid}>
              <View style={styles.scheduleDetailItem}>
                <ProfessionalIcon type="CALENDAR" size={18} color="#6c757d" />
                <Text style={styles.scheduleDetailLabel}>Date</Text>
                <Text style={styles.scheduleDetailValue}>{selectedAppointment.requestedDate}</Text>
              </View>
              <View style={styles.scheduleDetailItem}>
                <ProfessionalIcon type="CLOCK" size={18} color="#6c757d" />
                <Text style={styles.scheduleDetailLabel}>Time</Text>
                <Text style={styles.scheduleDetailValue}>{selectedAppointment.requestedTime}</Text>
              </View>
              <View style={styles.scheduleDetailItem}>
                <ProfessionalIcon type={selectedAppointment.consultationType === 'online' ? 'MONITOR' : selectedAppointment.consultationType === 'lawyer_place' ? 'BRIEFCASE' : 'CLOCK'} size={18} color="#6c757d" />
                <Text style={styles.scheduleDetailLabel}>Meeting Type</Text>
                <Text style={styles.scheduleDetailValue}>
                  {selectedAppointment.consultationType === 'online' ? 'Online Meeting' : 
                   selectedAppointment.consultationType === 'lawyer_place' ? 'At Lawyer\'s Office' : 
                   'Custom Time'}
                </Text>
              </View>
              <View style={styles.scheduleDetailItem}>
                <ProfessionalIcon type="LOCATION" size={18} color="#6c757d" />
                <Text style={styles.scheduleDetailLabel}>Client Address</Text>
                <Text style={styles.scheduleDetailValue}>{selectedAppointment.clientAddress}</Text>
              </View>
            </View>
          </View>

          {/* Contact Details Card */}
          <View style={styles.appointmentDetailsCard}>
            <Text style={styles.appointmentDetailsCardTitle}>Contact Information</Text>
            <TouchableOpacity style={styles.contactDetailRow}>
              <ProfessionalIcon type="PHONE" size={20} color="#2E4A6B" />
              <Text style={styles.contactDetailText}>{selectedAppointment.clientPhone}</Text>
              <ProfessionalIcon type="PHONE" size={16} color="#28a745" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactDetailRow}>
              <ProfessionalIcon type="MAIL" size={20} color="#2E4A6B" />
              <Text style={styles.contactDetailText}>{selectedAppointment.clientEmail}</Text>
              <ProfessionalIcon type="MAIL" size={16} color="#28a745" />
            </TouchableOpacity>
          </View>

          {/* Financial Details Card */}
          <View style={styles.appointmentDetailsCard}>
            <Text style={styles.appointmentDetailsCardTitle}>Financial Information</Text>
            <View style={styles.financialDetailsRow}>
              <Text style={styles.financialLabel}>Consultation Fee</Text>
              <Text style={styles.financialValue}>{selectedAppointment.estimatedFee}</Text>
            </View>
            <View style={styles.financialDetailsRow}>
              <Text style={styles.financialLabel}>Legal Specialty</Text>
              <Text style={styles.financialText}>{selectedAppointment.lawyerSpecialty}</Text>
            </View>
            {selectedAppointment.consultationType !== 'online' && (
              <View style={styles.financialDetailsRow}>
                <Text style={styles.financialLabel}>Extra Charges</Text>
                <Text style={styles.financialText}>
                  {selectedAppointment.consultationType === 'lawyer_place' ? '+2% for office visit' : '+4% for custom time'}
                </Text>
              </View>
            )}
          </View>

          {/* Request Timeline Card */}
          <View style={styles.appointmentDetailsCard}>
            <Text style={styles.appointmentDetailsCardTitle}>Request Timeline</Text>
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <ProfessionalIcon type="CLOCK" size={16} color="#ffffff" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Request Submitted</Text>
                <Text style={styles.timelineTime}>{selectedAppointment.requestedAt}</Text>
              </View>
            </View>
          </View>

          <View style={styles.appointmentDetailsBottomSpacing} />
        </ScrollView>

        {/* Action Buttons */}
        {selectedAppointment.status === 'pending' && (
          <View style={styles.appointmentActionsContainer}>
            <TouchableOpacity 
              style={styles.appointmentRejectButton}
              onPress={() => handleAppointmentAction('rejected')}
            >
              <ProfessionalIcon type="X" size={20} color="#ffffff" />
              <Text style={styles.appointmentRejectButtonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.appointmentAcceptButton}
              onPress={() => handleAppointmentAction('accepted')}
            >
              <ProfessionalIcon type="CHECKMARK" size={20} color="#ffffff" />
              <Text style={styles.appointmentAcceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // Modern Notifications Screen
  const renderNotificationsScreen = () => {
    // Generate notifications based on current data
    const generateNotifications = () => {
      const notifications = [];
      const today = new Date().toISOString().split('T')[0];
      
      // Today's schedule notifications
      const todaySchedule = lawyerSchedule.filter(item => item.date === today);
      todaySchedule.forEach(item => {
        notifications.push({
          id: `schedule-${item.id}`,
          type: 'schedule',
          title: 'Upcoming Appointment Today',
          message: `${item.title} at ${item.time}`,
          time: '2 hours ago',
          icon: 'CALENDAR',
          color: '#007bff',
          priority: 'high',
          relatedData: {
            scheduleId: item.id,
            date: item.date
          }
        });
      });

      // Pending appointments notifications
      const pendingAppointments = lawyerAppointments.filter(apt => apt.status === 'pending');
      pendingAppointments.forEach((apt, index) => {
        if (index < 3) { // Show only first 3 pending
          notifications.push({
            id: `appointment-${apt.id}`,
            type: 'appointment',
            title: 'New Appointment Request',
            message: `${apt.clientName} requested ${apt.lawyerSpecialty} consultation`,
            time: getTimeAgo(apt.requestedAt),
            icon: 'USER',
            color: '#ffc107',
            priority: 'medium',
            relatedData: {
              appointmentId: apt.id
            }
          });
        }
      });

      // Case updates notifications
      const recentCases = lawyerCases.filter(caseItem => caseItem.lastActivity === 'Just now' || caseItem.progress > 90);
      recentCases.forEach((caseItem, index) => {
        if (index < 2) { // Show only 2 recent cases
          notifications.push({
            id: `case-${caseItem.id}`,
            type: 'case',
            title: caseItem.progress > 90 ? 'Case Near Completion' : 'Case Activity Update',
            message: `${caseItem.clientName} - ${caseItem.caseType} (${caseItem.progress}% complete)`,
            time: '1 hour ago',
            icon: 'BRIEFCASE',
            color: '#28a745',
            priority: caseItem.progress > 90 ? 'high' : 'low',
            relatedData: {
              caseId: caseItem.id
            }
          });
        }
      });

      // System notifications
      notifications.push({
        id: 'system-1',
        type: 'system',
        title: 'Weekly Report Ready',
        message: 'Your weekly performance report is available for review',
        time: '1 day ago',
        icon: 'BAR_CHART',
        color: '#6f42c1',
        priority: 'low'
      });

      return notifications.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    };

    const getTimeAgo = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      return `${Math.floor(diffInHours / 24)} days ago`;
    };

    const notifications = generateNotifications();

    const handleNotificationPress = (notification) => {
      setShowNotifications(false);
      
      switch (notification.type) {
        case 'schedule':
          // Navigate to Schedule page with specific date
          const scheduleDate = notification.relatedData?.date;
          if (scheduleDate) {
            setSelectedDate(scheduleDate);
          }
          setLawyerCurrentScreen('schedule');
          break;
          
        case 'appointment':
          // Navigate to Appointments page and show specific appointment details
          const appointmentId = notification.relatedData?.appointmentId;
          if (appointmentId) {
            const appointment = lawyerAppointments.find(apt => apt.id === appointmentId);
            if (appointment) {
              setSelectedAppointment(appointment);
              setShowAppointmentDetails(true);
            }
          }
          setLawyerCurrentScreen('appointments');
          break;
          
        case 'case':
          // Navigate to Cases page and show specific case details
          const caseId = notification.relatedData?.caseId;
          if (caseId) {
            const caseItem = lawyerCases.find(c => c.id === caseId);
            if (caseItem) {
              setSelectedCase(caseItem);
              setShowCaseDetails(true);
            }
          }
          setLawyerCurrentScreen('cases');
          break;
          
        case 'system':
          // Navigate to Profile page for system notifications
          setLawyerCurrentScreen('profile');
          break;
          
        default:
          // Default to home page
          setLawyerCurrentScreen('home');
          break;
      }
    };

    return (
      <View style={styles.notificationsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.notificationsHeader}>
          <TouchableOpacity 
            style={styles.notificationsBackButton}
            onPress={() => setShowNotifications(false)}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.notificationsTitle}>Notifications</Text>
          <TouchableOpacity style={styles.notificationsSettingsButton}>
            <ProfessionalIcon type="SETTINGS" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.notificationsContent} showsVerticalScrollIndicator={false}>
          {/* Notifications Summary */}
          <View style={styles.notificationsSummary}>
            <Text style={styles.notificationsSummaryTitle}>You have {notifications.length} notifications</Text>
            <Text style={styles.notificationsSummarySubtitle}>
              {notifications.filter(n => n.priority === 'high').length} high priority items
            </Text>
          </View>

          {/* Notifications List */}
          {notifications.map((notification) => (
            <TouchableOpacity 
              key={notification.id} 
              style={styles.notificationCard}
              onPress={() => handleNotificationPress(notification)}
            >
              <View style={styles.notificationCardContent}>
                <View style={[styles.notificationIcon, { backgroundColor: notification.color }]}>
                  <ProfessionalIcon type={notification.icon} size={20} color="#ffffff" />
                </View>
                
                <View style={styles.notificationTextContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <View style={styles.notificationFooter}>
                    <View style={[styles.notificationTypeBadge, { backgroundColor: notification.color }]}>
                      <Text style={styles.notificationTypeBadgeText}>
                        {notification.type.toUpperCase()}
                      </Text>
                    </View>
                    {notification.priority === 'high' && (
                      <View style={styles.notificationPriorityBadge}>
                        <Text style={styles.notificationPriorityText}>HIGH</Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <View style={styles.notificationArrow}>
                  <ProfessionalIcon type="CHEVRON_RIGHT" size={16} color="#6c757d" />
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {notifications.length === 0 && (
            <View style={styles.emptyNotificationsCard}>
              <ProfessionalIcon type="BELL" size={48} color="#6c757d" />
              <Text style={styles.emptyNotificationsText}>No notifications</Text>
              <Text style={styles.emptyNotificationsSubtext}>You're all caught up!</Text>
            </View>
          )}

          <View style={styles.notificationsBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // View All Law Firms Screen
  const renderViewAllLawFirmsScreen = () => {
    return (
      <View style={styles.viewAllLawFirmsContainer}>
        <StatusBar style="light" />
        
        {/* Fixed Navigation Header */}
        <View style={styles.viewAllLawFirmsNavHeader}>
          <TouchableOpacity 
            onPress={() => setShowAllLawFirms(false)}
            style={styles.viewAllLawFirmsBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.viewAllLawFirmsTitle}>All Law Firms</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        
        <ScrollView style={styles.viewAllLawFirmsScrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Info */}
          <View style={styles.viewAllLawFirmsHeaderInfo}>
            <Text style={styles.viewAllLawFirmsPageTitle}>All Available Law Firms</Text>
            <Text style={styles.viewAllLawFirmsSubtitle}>{lawFirmOrganizations.length} professional law firms available in your network</Text>
          </View>

          {/* All Law Firms Grid */}
          <View style={styles.viewAllLawFirmsGrid}>
            {lawFirmOrganizations.map((firm) => (
              <TouchableOpacity
                key={firm.id}
                style={styles.viewAllLawFirmCard}
                onPress={() => handleAllLawFirmsSelect(firm)}
              >
                <View style={styles.viewAllLawFirmImageContainer}>
                  <Image source={firm.image} style={styles.viewAllLawFirmImage} />
                </View>
                <View style={styles.viewAllLawFirmInfo}>
                  <Text style={styles.viewAllLawFirmName}>{firm.name}</Text>
                  <Text style={styles.viewAllLawFirmSpecialty}>{firm.specialty}</Text>
                  <View style={styles.viewAllLawFirmStats}>
                    <View style={styles.viewAllLawFirmStat}>
                      <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                      <Text style={styles.viewAllLawFirmStatText}>{firm.rating}</Text>
                    </View>
                    <View style={styles.viewAllLawFirmStat}>
                      <ProfessionalIcon type="USER" size={14} color="#6c757d" />
                      <Text style={styles.viewAllLawFirmStatText}>{firm.lawyers} lawyers</Text>
                    </View>
                    <View style={styles.viewAllLawFirmStat}>
                      <ProfessionalIcon type="LOCATION" size={14} color="#6c757d" />
                      <Text style={styles.viewAllLawFirmStatText}>{firm.location}</Text>
                    </View>
                  </View>
                </View>
          </TouchableOpacity>
            ))}
        </View>

          {/* Bottom Spacing */}
          <View style={styles.viewAllLawFirmsBottomSpacing} />
        </ScrollView>
              </View>
    );
  };

  // Law Firm Details Screen
  const renderLawFirmDetailsScreen = () => {
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
          <Text style={styles.lawFirmDetailsNavTitle}>Law Firm Details</Text>
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
              {selectedLawFirm.name} is a leading law firm specializing in {selectedLawFirm.specialty}. With over 15 years of experience and a team of {selectedLawFirm.lawyers} dedicated lawyers, we provide comprehensive legal services to individuals and businesses. Our commitment to excellence and client satisfaction has earned us a {selectedLawFirm.rating} star rating.
                </Text>
              </View>

          {/* Services Section */}
          <View style={styles.lawFirmDetailsServicesCard}>
            <View style={styles.lawFirmDetailsServicesHeader}>
              <View style={styles.lawFirmDetailsServicesIcon}>
                <ProfessionalIcon type="BRIEFCASE" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.lawFirmDetailsServicesTitle}>Our Services</Text>
            </View>
            <View style={styles.lawFirmDetailsServicesGrid}>
              {firmServices.map((service, index) => (
                <View key={index} style={styles.lawFirmDetailsServiceItem}>
                  <View style={styles.lawFirmDetailsServiceIcon}>
                    <ProfessionalIcon type={service.icon} size={20} color="#2E4A6B" />
                  </View>
                  <View style={styles.lawFirmDetailsServiceContent}>
                    <Text style={styles.lawFirmDetailsServiceName}>{service.name}</Text>
                    <Text style={styles.lawFirmDetailsServiceDescription}>{service.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Our Lawyers Section */}
          <View style={styles.lawFirmDetailsLawyersCard}>
            <View style={styles.lawFirmDetailsLawyersHeader}>
              <View style={styles.lawFirmDetailsLawyersHeaderLeft}>
                <View style={styles.lawFirmDetailsLawyersIcon}>
                  <ProfessionalIcon type="USER" size={24} color="#2E4A6B" />
                </View>
                <Text style={styles.lawFirmDetailsLawyersTitle}>Our Lawyers ({selectedLawFirm.lawyers})</Text>
              </View>
              <TouchableOpacity 
                style={styles.lawFirmDetailsViewAllButton}
                onPress={handleViewAllFirmLawyers}
              >
                <Text style={styles.lawFirmDetailsViewAllText}>View All</Text>
                <ProfessionalIcon type="CHEVRON_RIGHT" size={16} color="#2E4A6B" />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lawFirmDetailsLawyersScroll}>
              {Array.from({ length: Math.min(selectedLawFirm.lawyers, 8) }, (_, index) => {
                const lawyerNames = [
                  'Sarah Mitchell', 'David Chen', 'Emily Rodriguez', 'Michael Thompson',
                  'Jennifer Lee', 'Robert Brown', 'Maria Garcia', 'Christopher Davis',
                  'Amanda Taylor', 'Kevin Martinez', 'Rachel Anderson', 'Daniel Kim',
                  'Nicole White', 'Mark Wilson', 'Samantha Clark', 'Andrew Lewis',
                  'Lisa Johnson', 'James Miller', 'Jessica Davis', 'Ryan Taylor'
                ];
                const specialties = [
                  'Corporate Law', 'Criminal Defense', 'Family Law', 'Personal Injury',
                  'Real Estate', 'Immigration', 'Tax Law', 'Employment Law',
                  'Intellectual Property', 'Medical Malpractice', 'Bankruptcy Law',
                  'Civil Rights', 'Contract Law', 'Securities Law', 'Patent Law'
                ];
                const ratings = [4.9, 4.8, 4.7, 4.6, 4.8, 4.9, 4.7, 4.8];
                const lawyerImages = [
                  require('./assets/images/lawyer/lawyer1.png'),
                  require('./assets/images/lawyer/lawyer2.png'),
                  require('./assets/images/lawyer/lawyer3.png'),
                  require('./assets/images/lawyer/lawyer4.png'),
                  require('./assets/images/lawyer/lawyer5.png'),
                  require('./assets/images/lawyer/lawyer6.png'),
                  require('./assets/images/lawyer/lawyer7.png'),
                  require('./assets/images/lawyer/lawyer8.png'),
                  require('./assets/images/lawyer/lawyer9.png'),
                  require('./assets/images/lawyer/lawyer10.png'),
                  require('./assets/images/lawyer/lawyer11.png'),
                  require('./assets/images/lawyer/lawyer12.png'),
                  require('./assets/images/lawyer/lawyer13.png'),
                  require('./assets/images/lawyer/lawyer14.png'),
                  require('./assets/images/lawyer/lawyer15.png'),
                  require('./assets/images/lawyer/lawyer16.png'),
                  require('./assets/images/lawyer/lawyer17.png'),
                  require('./assets/images/lawyer/lawyer18.png'),
                  require('./assets/images/lawyer/lawyer19.png'),
                  require('./assets/images/lawyer/lawyer20.png')
                ];
                
                const lawyer = {
                  id: index + 1,
                  name: lawyerNames[index % lawyerNames.length],
                  specialty: specialties[index % specialties.length],
                  rating: ratings[index % ratings.length],
                  profileImage: lawyerImages[index % lawyerImages.length]
                };
                
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.lawFirmDetailsLawyerCard}
                    onPress={() => handleLawyerSelect(lawyer)}
                  >
                    <View style={styles.lawFirmDetailsLawyerAvatar}>
                      <Image source={lawyer.profileImage} style={styles.lawFirmDetailsLawyerImage} />
                    </View>
                    <Text style={styles.lawFirmDetailsLawyerName} numberOfLines={2}>{lawyer.name}</Text>
                    <Text style={styles.lawFirmDetailsLawyerSpecialty}>{lawyer.specialty}</Text>
                    <View style={styles.lawFirmDetailsLawyerRating}>
                      <Text style={styles.lawFirmDetailsStars}>⭐⭐⭐⭐⭐</Text>
                      <Text style={styles.lawFirmDetailsRatingText}>{lawyer.rating}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
                  </View>
                  
          {/* Contact Information */}
          <View style={styles.lawFirmDetailsContactCard}>
            <View style={styles.lawFirmDetailsContactHeader}>
              <View style={styles.lawFirmDetailsContactIcon}>
                <ProfessionalIcon type="PHONE" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.lawFirmDetailsContactTitle}>Contact Information</Text>
            </View>
            <View style={styles.lawFirmDetailsContactInfo}>
              <View style={styles.lawFirmDetailsContactItem}>
                <ProfessionalIcon type="LOCATION" size={16} color="#6c757d" />
                <Text style={styles.lawFirmDetailsContactText}>{selectedLawFirm.location}</Text>
              </View>
              <View style={styles.lawFirmDetailsContactItem}>
                <ProfessionalIcon type="PHONE" size={16} color="#6c757d" />
                <Text style={styles.lawFirmDetailsContactText}>+1 (555) 123-4567</Text>
              </View>
              <View style={styles.lawFirmDetailsContactItem}>
                <ProfessionalIcon type="MAIL" size={16} color="#6c757d" />
                <Text style={styles.lawFirmDetailsContactText}>contact@{selectedLawFirm.name.toLowerCase().replace(/\s+/g, '')}.com</Text>
              </View>
            </View>
                  </View>

          {/* Join Organization Button */}
          <View style={styles.lawFirmDetailsJoinSection}>
            <TouchableOpacity 
              style={[
                styles.joinOrganizationButton,
                joinedOrganizations.has(selectedLawFirm?.id) && styles.joinedOrganizationButton,
                pendingJoinRequests.has(selectedLawFirm?.id) && styles.pendingJoinButton
              ]}
              onPress={handleJoinOrganization}
            >
              <ProfessionalIcon 
                type={
                  joinedOrganizations.has(selectedLawFirm?.id) ? "CHECKMARK" :
                  pendingJoinRequests.has(selectedLawFirm?.id) ? "CLOCK" : "PLUS"
                } 
                size={20} 
                color="#ffffff" 
              />
              <Text style={styles.joinOrganizationButtonText}>
                {joinedOrganizations.has(selectedLawFirm?.id) ? "Member" :
                 pendingJoinRequests.has(selectedLawFirm?.id) ? "Request Pending" : "Join Organization"}
              </Text>
            </TouchableOpacity>
          </View>
                  
          {/* Bottom Spacing */}
          <View style={styles.lawFirmDetailsBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // View All Firm Lawyers Screen
  const renderViewAllFirmLawyersScreen = () => {
    if (!selectedLawFirm) return null;

    // Generate all lawyers for this firm
    const generateFirmLawyers = () => {
      const lawyerNames = [
        'Sarah Mitchell', 'David Chen', 'Emily Rodriguez', 'Michael Thompson',
        'Jennifer Lee', 'Robert Brown', 'Maria Garcia', 'Christopher Davis',
        'Amanda Taylor', 'Kevin Martinez', 'Rachel Anderson', 'Daniel Kim',
        'Nicole White', 'Mark Wilson', 'Samantha Clark', 'Andrew Lewis',
        'Lisa Johnson', 'James Miller', 'Jessica Davis', 'Ryan Taylor',
        'Michael Johnson', 'Sarah Williams', 'David Brown', 'Emily Davis',
        'Christopher Wilson', 'Amanda Moore', 'Kevin Taylor', 'Rachel Jackson'
      ];
      const specialties = [
        'Corporate Law', 'Criminal Defense', 'Family Law', 'Personal Injury',
        'Real Estate', 'Immigration', 'Tax Law', 'Employment Law',
        'Intellectual Property', 'Medical Malpractice', 'Bankruptcy Law',
        'Civil Rights', 'Contract Law', 'Securities Law', 'Patent Law'
      ];
      const ratings = [4.9, 4.8, 4.7, 4.6, 4.8, 4.9, 4.7, 4.8, 4.5, 4.9];
      const experiences = ['5 years', '8 years', '12 years', '6 years', '10 years', '15 years', '7 years', '9 years'];
      const lawyerImages = [
        require('./assets/images/lawyer/lawyer1.png'),
        require('./assets/images/lawyer/lawyer2.png'),
        require('./assets/images/lawyer/lawyer3.png'),
        require('./assets/images/lawyer/lawyer4.png'),
        require('./assets/images/lawyer/lawyer5.png'),
        require('./assets/images/lawyer/lawyer6.png'),
        require('./assets/images/lawyer/lawyer7.png'),
        require('./assets/images/lawyer/lawyer8.png'),
        require('./assets/images/lawyer/lawyer9.png'),
        require('./assets/images/lawyer/lawyer10.png'),
        require('./assets/images/lawyer/lawyer11.png'),
        require('./assets/images/lawyer/lawyer12.png'),
        require('./assets/images/lawyer/lawyer13.png'),
        require('./assets/images/lawyer/lawyer14.png'),
        require('./assets/images/lawyer/lawyer15.png'),
        require('./assets/images/lawyer/lawyer16.png'),
        require('./assets/images/lawyer/lawyer17.png'),
        require('./assets/images/lawyer/lawyer18.png'),
        require('./assets/images/lawyer/lawyer19.png'),
        require('./assets/images/lawyer/lawyer20.png')
      ];

      return Array.from({ length: selectedLawFirm.lawyers }, (_, index) => ({
        id: index + 1,
        name: lawyerNames[index % lawyerNames.length],
        specialty: specialties[index % specialties.length],
        rating: ratings[index % ratings.length],
        experience: experiences[index % experiences.length],
        profileImage: lawyerImages[index % lawyerImages.length],
        hourlyRate: `$${20 + (index % 10) * 3}/hr`,
        cases: `${100 + (index % 20) * 50} Cases`,
        successRate: `${90 + (index % 8)}% Success`
      }));
    };

    const firmLawyers = generateFirmLawyers();

    return (
      <View style={styles.viewAllFirmLawyersContainer}>
        <StatusBar style="light" />
        
        {/* Fixed Navigation Header */}
        <View style={styles.viewAllFirmLawyersNavHeader}>
          <TouchableOpacity 
            onPress={() => setShowAllFirmLawyers(false)}
            style={styles.viewAllFirmLawyersBackButton}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
                  </TouchableOpacity>
          <Text style={styles.viewAllFirmLawyersTitle}>All Lawyers</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        
        <ScrollView style={styles.viewAllFirmLawyersScrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Info */}
          <View style={styles.viewAllFirmLawyersHeaderInfo}>
            <Text style={styles.viewAllFirmLawyersPageTitle}>Lawyers at {selectedLawFirm.name}</Text>
            <Text style={styles.viewAllFirmLawyersSubtitle}>{firmLawyers.length} experienced lawyers ready to help you</Text>
          </View>

          {/* All Lawyers Grid */}
          <View style={styles.viewAllFirmLawyersGrid}>
            {firmLawyers.map((lawyer) => (
              <TouchableOpacity
                key={lawyer.id}
                style={styles.viewAllFirmLawyerCard}
                onPress={() => handleLawyerSelect(lawyer)}
              >
                <View style={styles.viewAllFirmLawyerImageContainer}>
                  <Image source={lawyer.profileImage} style={styles.viewAllFirmLawyerImage} />
                </View>
                <View style={styles.viewAllFirmLawyerInfo}>
                  <Text style={styles.viewAllFirmLawyerName}>{lawyer.name}</Text>
                  <Text style={styles.viewAllFirmLawyerSpecialty}>{lawyer.specialty}</Text>
                  <View style={styles.viewAllFirmLawyerStats}>
                    <View style={styles.viewAllFirmLawyerStat}>
                      <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                      <Text style={styles.viewAllFirmLawyerStatText}>{lawyer.rating}</Text>
                    </View>
                    <View style={styles.viewAllFirmLawyerStat}>
                      <ProfessionalIcon type="BRIEFCASE" size={14} color="#6c757d" />
                      <Text style={styles.viewAllFirmLawyerStatText}>{lawyer.experience}</Text>
                    </View>
                    <View style={styles.viewAllFirmLawyerStat}>
                      <ProfessionalIcon type="DOLLAR" size={14} color="#6c757d" />
                      <Text style={styles.viewAllFirmLawyerStatText}>{lawyer.hourlyRate}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
                  </View>
                  
          {/* Bottom Spacing */}
          <View style={styles.viewAllFirmLawyersBottomSpacing} />
        </ScrollView>
                  </View>
    );
  };

  // Lawyer Details Screen (similar to App.js)
  const renderLawyerDetailsScreen = () => {
    if (!selectedLawyer) return null;

    return (
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
          <View style={styles.lawyerProfessionalActions}>
            <TouchableOpacity 
              style={[
                styles.connectButton, 
                connectedLawyers.has(selectedLawyer?.name) && styles.connectedButton
              ]}
              onPress={handleConnectLawyer}
            >
              <ProfessionalIcon 
                type={connectedLawyers.has(selectedLawyer?.name) ? "CHECKMARK" : "USER"} 
                size={20} 
                color="#ffffff" 
              />
              <Text style={styles.connectButtonText}>
                {connectedLawyers.has(selectedLawyer?.name) ? "Connected" : "Connect"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.referButton}
              onPress={handleReferClient}
            >
              <ProfessionalIcon type="SHARE" size={20} color="#2E4A6B" />
              <Text style={styles.referButtonText}>Refer Client</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // User Details Screen
  const renderUserDetailsScreen = () => {
    if (!selectedUser) return null;

    return (
      <View style={styles.userDetailsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.userDetailsHeader}>
          <TouchableOpacity 
            style={styles.userDetailsBackButton}
            onPress={() => setShowUserDetails(false)}
          >
            <ProfessionalIcon type="ARROW_LEFT" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.userDetailsTitle}>User Profile</Text>
          <View style={styles.userDetailsPlaceholder} />
        </View>

        <ScrollView style={styles.userDetailsScrollContent} showsVerticalScrollIndicator={false}>
          {/* User Hero Section */}
          <View style={styles.userDetailsHeroSection}>
            <View style={styles.userDetailsHeroBackground}>
              <View style={styles.userDetailsHeroOverlay} />
              <View style={styles.userDetailsHeroContent}>
                <View style={styles.userDetailsHeroInfo}>
                  <View style={styles.userDetailsImageContainer}>
                    <Image source={selectedUser.clientImage} style={styles.userDetailsHeroImage} />
                  </View>
                  <Text style={styles.userDetailsHeroTitle}>{selectedUser.clientName}</Text>
                  <Text style={styles.userDetailsHeroSubtitle}>{selectedUser.clientOccupation}</Text>
                  <View style={styles.userDetailsStatsRow}>
                    <View style={styles.userDetailsStat}>
                      <Text style={styles.userDetailsStatNumber}>{selectedUser.clientAge}</Text>
                      <Text style={styles.userDetailsStatLabel}>Age</Text>
                    </View>
                    <View style={styles.userDetailsStatDivider} />
                    <View style={styles.userDetailsStat}>
                      <Text style={styles.userDetailsStatNumber}>{selectedUser.clientCategories?.length || 0}</Text>
                      <Text style={styles.userDetailsStatLabel}>Categories</Text>
                    </View>
                    <View style={styles.userDetailsStatDivider} />
                    <View style={styles.userDetailsStat}>
                      <Text style={styles.userDetailsStatNumber}>{selectedUser.clientServices?.length || 0}</Text>
                      <Text style={styles.userDetailsStatLabel}>Services</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Categories Section */}
          <View style={styles.userDetailsCategoriesCard}>
            <View style={styles.userDetailsCategoriesHeader}>
              <View style={styles.userDetailsCategoriesIcon}>
                <ProfessionalIcon type="TAG" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.userDetailsCategoriesTitle}>Legal Categories</Text>
            </View>
            <View style={styles.userDetailsCategoriesGrid}>
              {selectedUser.clientCategories?.map((category, index) => (
                <View key={index} style={styles.userDetailsCategoryItem}>
                  <View style={styles.userDetailsCategoryIcon}>
                    <ProfessionalIcon type="BRIEFCASE" size={20} color="#2E4A6B" />
                  </View>
                  <Text style={styles.userDetailsCategoryName}>{category}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Services Section */}
          <View style={styles.userDetailsServicesCard}>
            <View style={styles.userDetailsServicesHeader}>
              <View style={styles.userDetailsServicesIcon}>
                <ProfessionalIcon type="SETTINGS" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.userDetailsServicesTitle}>Required Services</Text>
            </View>
            <View style={styles.userDetailsServicesGrid}>
              {selectedUser.clientServices?.map((service, index) => (
                <View key={index} style={styles.userDetailsServiceItem}>
                  <View style={styles.userDetailsServiceIcon}>
                    <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                  </View>
                  <View style={styles.userDetailsServiceContent}>
                    <Text style={styles.userDetailsServiceName}>{service}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.userDetailsDescriptionCard}>
            <View style={styles.userDetailsDescriptionHeader}>
              <View style={styles.userDetailsDescriptionIcon}>
                <ProfessionalIcon type="DOCUMENT" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.userDetailsDescriptionTitle}>Case Description</Text>
            </View>
            <Text style={styles.userDetailsDescriptionText}>
              {selectedUser.clientDescription || selectedUser.userMessage}
            </Text>
          </View>

          {/* Contact Information */}
          <View style={styles.userDetailsContactCard}>
            <View style={styles.userDetailsContactHeader}>
              <View style={styles.userDetailsContactIcon}>
                <ProfessionalIcon type="PHONE" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.userDetailsContactTitle}>Contact Information</Text>
            </View>
            <View style={styles.userDetailsContactInfo}>
              <View style={styles.userDetailsContactItem}>
                <ProfessionalIcon type="MAIL" size={16} color="#6c757d" />
                <Text style={styles.userDetailsContactText}>{selectedUser.clientEmail}</Text>
              </View>
              <View style={styles.userDetailsContactItem}>
                <ProfessionalIcon type="PHONE" size={16} color="#6c757d" />
                <Text style={styles.userDetailsContactText}>{selectedUser.clientPhone}</Text>
              </View>
              <View style={styles.userDetailsContactItem}>
                <ProfessionalIcon type="LOCATION" size={16} color="#6c757d" />
                <Text style={styles.userDetailsContactText}>{selectedUser.clientAddress}</Text>
              </View>
            </View>
          </View>
          
          {/* Bottom Spacing */}
          <View style={styles.userDetailsBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Refer Client Modal
  const renderReferClientModal = () => {
    if (!showReferClientModal || !selectedLawyer) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.referClientModal}>
          <View style={styles.referClientModalHeader}>
            <Text style={styles.referClientModalTitle}>Refer Client</Text>
            <TouchableOpacity 
              onPress={() => setShowReferClientModal(false)}
              style={styles.modalCloseButton}
            >
              <ProfessionalIcon type="CLOSE" size={24} color="#6c757d" />
            </TouchableOpacity>
          </View>

          <View style={styles.referClientModalContent}>
            <View style={styles.referToLawyerInfo}>
              <View style={styles.referToLawyerAvatar}>
                <Image source={selectedLawyer.profileImage} style={styles.referToLawyerImage} />
              </View>
              <View style={styles.referToLawyerDetails}>
                <Text style={styles.referToLawyerName}>{selectedLawyer.name}</Text>
                <Text style={styles.referToLawyerSpecialty}>{selectedLawyer.specialty}</Text>
                <View style={styles.referToLawyerRating}>
                  <ProfessionalIcon type="STAR" size={14} color="#FFD700" />
                  <Text style={styles.referToLawyerRatingText}>{selectedLawyer.rating}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.referClientDescription}>
              You are about to refer a client to {selectedLawyer.name}. This will:
            </Text>

            <View style={styles.referClientBenefits}>
              <View style={styles.referClientBenefit}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.referClientBenefitText}>Notify {selectedLawyer.name} about the referral</Text>
              </View>
              <View style={styles.referClientBenefit}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.referClientBenefitText}>Share client's case details securely</Text>
              </View>
              <View style={styles.referClientBenefit}>
                <ProfessionalIcon type="CHECKMARK" size={16} color="#28a745" />
                <Text style={styles.referClientBenefitText}>Maintain professional referral record</Text>
              </View>
            </View>
          </View>

          <View style={styles.referClientModalActions}>
            <TouchableOpacity 
              style={styles.cancelReferralButton}
              onPress={() => setShowReferClientModal(false)}
            >
              <Text style={styles.cancelReferralButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmReferralButton}
              onPress={handleConfirmReferral}
            >
              <Text style={styles.confirmReferralButtonText}>Confirm Referral</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Screen routing for Lawyer App
  const renderCurrentLawyerScreen = () => {
    console.log('renderCurrentLawyerScreen called');
    console.log('showEditCase:', showEditCase);
    console.log('showCaseDetails:', showCaseDetails);
    console.log('showManageProfile:', showManageProfile);
    console.log('showLogoutConfirmation:', showLogoutConfirmation);
    
    // Handle overlay screens first
    if (showLogoutConfirmation) {
      console.log('Showing logout confirmation');
      return renderLogoutConfirmationScreen();
    }
    
    if (showManageProfile) {
      console.log('Showing manage profile');
      return renderManageProfileScreen();
    }
    
    if (showCaseDetails) {
      console.log('Showing case details');
      return renderCaseDetailsScreen();
    }

    if (showUserDetails) {
      return renderUserDetailsScreen();
    }

    if (showLawyerDetails) {
      return renderLawyerDetailsScreen();
    }

    if (showAllFirmLawyers) {
      return renderViewAllFirmLawyersScreen();
    }

    if (showLawFirmDetails) {
      return renderLawFirmDetailsScreen();
    }

    if (showAllLawFirms) {
      return renderViewAllLawFirmsScreen();
    }

    if (showNotifications) {
      return renderNotificationsScreen();
    }

    if (showAppointmentDetails) {
      return renderAppointmentDetailsScreen();
    }

    if (showEditCase) {
      console.log('showEditCase is true, rendering edit case screen');
      return renderEditCaseScreen();
    }
    
    if (showAddActivity) {
      console.log('showAddActivity is true, rendering add activity screen');
      return renderAddActivityScreen();
    }

    // Handle main navigation screens
    switch (lawyerCurrentScreen) {
      case 'home':
        return renderLawyerHomeScreen();
      case 'profile':
        return renderLawyerProfileScreen();
      case 'cases':
        return renderLawyerCasesScreen();
      case 'schedule':
        return renderLawyerScheduleScreen();
      case 'appointments':
        return renderLawyerAppointmentsScreen();
      default:
        return renderLawyerHomeScreen();
    }
  };

  // Return the appropriate screen based on current lawyer view
  return (
    <>
      {renderCurrentLawyerScreen()}
      {renderReferClientModal()}
    </>
  );
};

const styles = StyleSheet.create({
  // Lawyer Details/Profile Screen Styles (from App.js Lawyer Details template)
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
  lawyerDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lawyerDetailsFavorite: {
    padding: 10,
  },
  manageProfileSaveButton: {
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
  manageProfileSaveButtonDisabled: {
    backgroundColor: '#e9ecef',
    shadowOpacity: 0,
    elevation: 0,
  },
  manageProfileSaveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  manageProfileSaveTextDisabled: {
    color: '#6c757d',
  },
  lawyerDetailsScroll: {
    flex: 1,
  },
  lawyerHeroSection: {
    backgroundColor: '#2E4A6B',
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawyerProfileImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
  lawyerDetailProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  lawyerProfileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  lawyerProfileSpecialty: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 25,
  },
  lawyerQuickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  lawyerQuickStat: {
    alignItems: 'center',
  },
  lawyerQuickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  lawyerQuickStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  lawyerAboutSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
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
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawyerReadMoreText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    marginRight: 5,
  },
  lawyerReadMoreIcon: {
    fontSize: 14,
    color: '#2E4A6B',
  },
  lawyerContactSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  contactInfoContainer: {
    marginTop: 10,
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  contactInfoText: {
    fontSize: 15,
    color: '#2E4A6B',
    marginLeft: 15,
    flex: 1,
  },
  professionalSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  professionalInfoContainer: {
    marginTop: 10,
  },
  servicesSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  lawyerDetailsFooter: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  saveProfileButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  saveProfileText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Editable field styles
  editableProfileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editableProfileSpecialty: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editableBio: {
    fontSize: 15,
    color: '#2E4A6B',
    lineHeight: 22,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  editableContactText: {
    fontSize: 15,
    color: '#2E4A6B',
    marginLeft: 15,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 5,
  },
  
  // Verification and status badges
  verifiedBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#28a745',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#28a745',
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  // Simple Lawyer Profile Screen Styles (like USER profile page)
  lawyerProfileContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerProfileHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  lawyerProfileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  lawyerProfileBackButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawyerProfileSettingsButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawyerProfileTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lawyerProfileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  lawyerProfileContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  lawyerProfileInfoCard: {
    backgroundColor: '#2E4A6B',
    borderRadius: 25,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  lawyerProfileAvatarContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  lawyerProfileAvatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  lawyerProfileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    width: '100%',
  },
  lawyerProfileNameLarge: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  lawyerProfileRole: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '600',
  },
  lawyerProfileContactInfo: {
    alignItems: 'center',
    width: '100%',
  },
  lawyerProfileContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  lawyerProfileContactText: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 15,
    fontWeight: '500',
  },
  lawyerProfileMenuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 100, // Space for bottom navigation
  },
  lawyerProfileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  lawyerProfileMenuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lawyerProfileMenuItemText: {
    fontSize: 16,
    color: '#2E4A6B',
    marginLeft: 15,
    fontWeight: '500',
  },
  lawyerProfileComingSoonBadge: {
    backgroundColor: '#ffc107',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  lawyerProfileComingSoonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  // Logout Confirmation Screen Styles
  logoutConfirmationContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  logoutConfirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  logoutConfirmationBackButton: {
    padding: 10,
  },
  logoutConfirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  placeholder: {
    width: 44, // Same width as back button for centering
  },
  logoutConfirmationContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoutConfirmationIconContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  logoutConfirmationIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutConfirmationMessageSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
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
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutConfirmationSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  logoutConfirmationSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  logoutConfirmationSummaryLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  logoutConfirmationSummaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  logoutConfirmationButtonsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 15,
  },
  logoutConfirmationCancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2E4A6B',
  },
  logoutConfirmationCancelButtonText: {
    color: '#2E4A6B',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutConfirmationLogoutButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutConfirmationLogoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Lawyer Home Screen Styles
  lawyerHomeContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerHomeHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  lawyerHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lawyerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lawyerHeaderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  lawyerHeaderInfo: {
    flex: 1,
  },
  lawyerHeaderGreeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  lawyerHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  lawyerHeaderSpecialty: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerNotificationButton: {
    position: 'relative',
    padding: 8,
  },
  headerSettingsButton: {
    padding: 8,
  },
  lawyerNotificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lawyerHomeContent: {
    flex: 1,
  },
  lawyerStatsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  lawyerStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  lawyerStatCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  lawyerSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  lawyerSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    minHeight: 40, // Ensure consistent height
  },
  lawyerSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    lineHeight: 22, // Consistent line height for better alignment
  },
  lawyerSeeAll: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  lawyerClientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 15,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clientCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientInitials: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highPriority: {
    backgroundColor: '#ffebee',
  },
  mediumPriority: {
    backgroundColor: '#fff3e0',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#d32f2f',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  clientCase: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  clientStatus: {
    fontSize: 12,
    color: '#28a745',
    marginBottom: 4,
  },
  clientLastContact: {
    fontSize: 11,
    color: '#8A8A8A',
    marginBottom: 12,
  },
  contactClientButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  contactClientText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '47%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  lawyerBottomSpacing: {
    height: 20,
  },
  lawyerBottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  lawyerNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  lawyerNavText: {
    fontSize: 12,
    color: '#2E4A6B',
    marginTop: 4,
    fontWeight: '600',
  },
  lawyerNavTextInactive: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 4,
  },

  // Lawyer Profile Screen Styles
  lawyerProfileContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerProfileHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
  },
  lawyerProfileHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lawyerProfileBackButton: {
    padding: 8,
  },
  lawyerProfileHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lawyerProfileEditButton: {
    padding: 8,
  },
  lawyerProfileContent: {
    flex: 1,
  },
  lawyerProfileCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  lawyerProfileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  lawyerProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#28a745',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  lawyerProfileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
    textAlign: 'center',
  },
  lawyerProfileSpecialty: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 4,
    textAlign: 'center',
  },
  lawyerProfileExperience: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
    marginBottom: 20,
  },
  lawyerProfileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  profileStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  profileStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  profileStatLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  profileStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e9ecef',
    marginHorizontal: 20,
  },
  lawyerInfoSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawyerInfoSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  lawyerInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lawyerInfoText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 12,
    flex: 1,
  },
  lawyerBioText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  noServicesText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },

  // Modern Cases Screen Styles
  lawyerCasesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerCasesHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  lawyerCasesHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  lawyerCasesHeaderLeft: {
    flex: 1,
  },
  lawyerCasesTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawyerCasesSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  addCaseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  filterTabsContainer: {
    marginTop: 10,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  filterTabActive: {
    backgroundColor: '#ffffff',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  filterTabTextActive: {
    color: '#2E4A6B',
  },
  lawyerCasesContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modernCaseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4A6B',
  },
  caseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  caseCardHeaderLeft: {
    flex: 1,
  },
  caseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  caseBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  caseOptionsButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseCardContent: {
    gap: 12,
  },
  caseClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  caseClientAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caseClientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  caseClientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  caseType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  caseDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  progressSection: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: 3,
  },
  caseStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 4,
  },
  caseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  caseStatText: {
    fontSize: 13,
    color: '#6c757d',
  },
  caseStatValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#28a745',
  },
  lastActivityRow: {
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
    paddingTop: 12,
    marginTop: 4,
  },
  lastActivityText: {
    fontSize: 12,
    color: '#8A8A8A',
    fontStyle: 'italic',
  },
  casesBottomSpacing: {
    height: 100,
  },

  // Case Details Screen Styles
  caseDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  caseDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E4A6B',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  caseDetailsBackButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseDetailsHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  caseDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  caseDetailsSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  caseDetailsOptionsButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseDetailsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  caseOverviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  caseOverviewHeader: {
    marginBottom: 16,
  },
  caseOverviewLeft: {
    marginBottom: 12,
  },
  caseDetailsClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caseDetailsClientAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  caseDetailsClientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  caseDetailsClientDetails: {
    flex: 1,
  },
  caseOverviewClient: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  caseOverviewType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
  },
  caseOverviewBadges: {
    flexDirection: 'row',
    gap: 12,
  },
  statusBadgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  statusBadgeLargeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  priorityBadgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  priorityBadgeLargeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  caseOverviewDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    marginBottom: 20,
  },
  caseProgressSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
  },
  caseProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caseProgressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  caseProgressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  caseProgressBarContainer: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  caseProgressBar: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
  caseInfoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  caseInfoSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  caseInfoGrid: {
    gap: 16,
  },
  caseInfoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  caseInfoItemContent: {
    flex: 1,
  },
  caseInfoItemLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  caseInfoItemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  caseChargesSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  caseChargesSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  chargesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chargeTag: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chargeTagText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '600',
  },
  caseFinancialSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  caseFinancialSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  financialStatsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  financialStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  financialStatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  financialStatContent: {
    flex: 1,
  },
  financialStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 2,
  },
  financialStatLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  caseTimelineSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  caseTimelineSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 14,
    color: '#6c757d',
  },
  caseDetailsBottomSpacing: {
    height: 100,
  },
  caseDetailsActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 12,
  },
  caseActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#2E4A6B',
    gap: 8,
  },
  caseActionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  caseActionButtonPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2E4A6B',
    gap: 8,
  },
  caseActionButtonPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Modern Schedule Screen Styles
  lawyerScheduleContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerScheduleHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  lawyerScheduleHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  lawyerScheduleHeaderLeft: {
    flex: 1,
  },
  lawyerScheduleTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawyerScheduleSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  addAppointmentButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  dateSelector: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1000,
  },
  dateSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  dateSelectorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  datePickerDropdown: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: 200,
    zIndex: 1000,
  },
  datePickerScroll: {
    maxHeight: 200,
  },
  datePickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  datePickerItemSelected: {
    backgroundColor: '#f8f9fa',
  },
  datePickerItemText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  datePickerItemTextSelected: {
    color: '#2E4A6B',
    fontWeight: '600',
  },
  scheduleFilterTabsContainer: {
    marginTop: 10,
  },
  scheduleFilterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  scheduleFilterTabActive: {
    backgroundColor: '#ffffff',
  },
  scheduleFilterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  scheduleFilterTabTextActive: {
    color: '#2E4A6B',
  },
  lawyerScheduleContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  todaySection: {
    marginBottom: 30,
  },
  todaySectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  todayScheduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleTimeColumn: {
    width: 80,
    alignItems: 'center',
    marginRight: 16,
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  scheduleDuration: {
    fontSize: 12,
    color: '#6c757d',
  },
  scheduleTypeIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 16,
    alignSelf: 'stretch',
  },
  scheduleContentColumn: {
    flex: 1,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
    marginRight: 12,
  },
  schedulePriorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  schedulePriorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  scheduleDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
    lineHeight: 20,
  },
  scheduleMetaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  scheduleMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scheduleMetaText: {
    fontSize: 12,
    color: '#6c757d',
  },
  emptyScheduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyScheduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyScheduleSubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  upcomingSection: {
    marginBottom: 30,
  },
  upcomingSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  upcomingScheduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  upcomingScheduleLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  upcomingTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingScheduleInfo: {
    flex: 1,
  },
  upcomingScheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  scheduleClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  scheduleClientAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleClientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scheduleClientName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  upcomingScheduleDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  upcomingScheduleMetaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  upcomingScheduleDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  upcomingScheduleTime: {
    fontSize: 12,
    color: '#6c757d',
  },
  upcomingScheduleLocation: {
    fontSize: 12,
    color: '#6c757d',
  },
  upcomingScheduleRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  upcomingPriorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingPriorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  scheduleOptionsButton: {
    padding: 8,
  },
  scheduleBottomSpacing: {
    height: 100,
  },

  // Edit Case Screen Styles
  editCaseContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  editCaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E4A6B',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  editCaseBackButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editCaseHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  editCaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  editCaseSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  editCaseSaveButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editCaseSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  editCaseContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  editSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  editSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 20,
  },
  editField: {
    marginBottom: 16,
  },
  editFieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  editFieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  editFieldInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2E4A6B',
    backgroundColor: '#f8f9fa',
  },
  editFieldTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  statusButtonTextActive: {
    color: '#ffffff',
  },
  progressSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  progressButton: {
    backgroundColor: '#2E4A6B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  progressButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressBarEditContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBarEdit: {
    width: '100%',
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFillEdit: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
  progressPercentEdit: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  quickProgressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  quickProgressButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  quickProgressButtonActive: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
  },
  quickProgressButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
  },
  quickProgressButtonTextActive: {
    color: '#ffffff',
  },
  priorityButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  priorityButtonTextActive: {
    color: '#ffffff',
  },
  activitiesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addActivityButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  addActivityButtonSmallText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  activitiesContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  activitiesDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 8,
  },
  lastActivityText: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  editCaseBottomSpacing: {
    height: 100,
  },
  editCaseActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 12,
  },
  editCaseCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#6c757d',
    alignItems: 'center',
  },
  editCaseCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  editCaseSaveButtonBottom: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
  },
  editCaseSaveButtonBottomText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Appointments Styles
  lawyerAppointmentsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerAppointmentsHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  lawyerAppointmentsHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  lawyerAppointmentsHeaderLeft: {
    flex: 1,
  },
  lawyerAppointmentsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawyerAppointmentsSubtitle: {
    fontSize: 16,
    color: '#B8C5D1',
    fontWeight: '500',
  },
  appointmentNotificationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  appointmentBadgeCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#dc3545',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  appointmentBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentFilterTabsContainer: {
    marginTop: 10,
  },
  appointmentFilterTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    minWidth: 80,
    alignItems: 'center',
  },
  appointmentFilterTabActive: {
    backgroundColor: '#ffffff',
  },
  appointmentFilterTabText: {
    color: '#B8C5D1',
    fontSize: 16,
    fontWeight: '600',
  },
  appointmentFilterTabTextActive: {
    color: '#2E4A6B',
  },
  lawyerAppointmentsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modernAppointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appointmentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  appointmentCardHeaderLeft: {
    flex: 1,
  },
  appointmentClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentClientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentClientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  appointmentClientDetails: {
    flex: 1,
  },
  appointmentClientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  appointmentBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  appointmentStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  appointmentStatusBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentUrgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  appointmentUrgencyBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentOptionsButton: {
    padding: 8,
  },
  appointmentCardContent: {
    gap: 12,
  },
  appointmentServiceType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  appointmentDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 22,
  },
  appointmentDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
    marginTop: 8,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  appointmentDetailText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  appointmentDetailValue: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
  },
  appointmentClientRow: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 8,
  },
  appointmentClientDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  appointmentClientDetailText: {
    fontSize: 13,
    color: '#6c757d',
    flex: 1,
  },
  appointmentRequestTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
  },
  appointmentRequestTimeText: {
    fontSize: 13,
    color: '#8A8A8A',
    fontStyle: 'italic',
  },
  returningClientBadge: {
    backgroundColor: '#e7f3ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  returningClientText: {
    color: '#0066cc',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyAppointmentsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyAppointmentsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyAppointmentsSubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  appointmentsBottomSpacing: {
    height: 100,
  },

  // Notifications Styles
  notificationsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  notificationsHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationsBackButton: {
    padding: 8,
  },
  notificationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  notificationsSettingsButton: {
    padding: 8,
  },
  notificationsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationsSummary: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationsSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  notificationsSummarySubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationCardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationTextContent: {
    flex: 1,
  },
  notificationArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#8A8A8A',
    fontWeight: '500',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  notificationTypeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notificationPriorityBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  notificationPriorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  emptyNotificationsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyNotificationsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyNotificationsSubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  notificationsBottomSpacing: {
    height: 100,
  },

  // Law Firms Styles
  lawFirmSectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1, // Take remaining space
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(46, 74, 107, 0.1)',
    borderRadius: 20,
    height: 36, // Fixed height for consistent alignment
  },
  quickActionSectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lawyerLawFirmsScroll: {
    paddingLeft: 7,
    paddingVertical: 8,
  },
  lawyerLawFirmCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 173,
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
  stars: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  lawFirmLawyers: {
    fontSize: 11,
    color: '#28a745',
    fontWeight: '600',
    textAlign: 'center',
  },

  // View All Law Firms Styles
  viewAllLawFirmsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllLawFirmsNavHeader: {
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
  viewAllLawFirmsBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllLawFirmsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  headerPlaceholder: {
    width: 48,
  },
  viewAllLawFirmsScrollContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllLawFirmsHeaderInfo: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  viewAllLawFirmsPageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  viewAllLawFirmsSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 22,
  },
  viewAllLawFirmsGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  viewAllLawFirmCard: {
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
  viewAllLawFirmImageContainer: {
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
  viewAllLawFirmImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewAllLawFirmInfo: {
    flex: 1,
  },
  viewAllLawFirmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
    lineHeight: 20,
  },
  viewAllLawFirmSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
    fontWeight: '500',
  },
  viewAllLawFirmStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  viewAllLawFirmStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllLawFirmStatText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
    fontWeight: '600',
  },
  viewAllLawFirmsBottomSpacing: {
    height: 100,
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawFirmDetailsFilterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawFirmDetailsScrollContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawFirmDetailsHeroHeader: {
    backgroundColor: '#2E4A6B',
    paddingBottom: 40,
  },
  lawFirmDetailsHeroBackground: {
    position: 'relative',
  },
  lawFirmDetailsHeroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 74, 107, 0.8)',
  },
  lawFirmDetailsHeroContent: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: 'center',
  },
  lawFirmDetailsHeroInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  lawFirmDetailsImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lawFirmDetailsHeroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lawFirmDetailsHeroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  lawFirmDetailsHeroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  lawFirmDetailsStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  lawFirmDetailsStat: {
    alignItems: 'center',
    flex: 1,
  },
  lawFirmDetailsStatNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawFirmDetailsStatLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  lawFirmDetailsStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  lawFirmDetailsDescriptionCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lawFirmDetailsDescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lawFirmDetailsDescriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 74, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lawFirmDetailsDescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  lawFirmDetailsDescriptionText: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  lawFirmDetailsServicesCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lawFirmDetailsServicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  lawFirmDetailsServicesIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 74, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lawFirmDetailsServicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  lawFirmDetailsServicesGrid: {
    gap: 16,
  },
  lawFirmDetailsServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4A6B',
  },
  lawFirmDetailsServiceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawFirmDetailsServiceContent: {
    flex: 1,
  },
  lawFirmDetailsServiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawFirmDetailsServiceDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  lawFirmDetailsContactCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lawFirmDetailsContactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lawFirmDetailsContactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 74, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lawFirmDetailsContactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  lawFirmDetailsContactInfo: {
    gap: 12,
  },
  lawFirmDetailsContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  lawFirmDetailsContactText: {
    fontSize: 16,
    color: '#6c757d',
    marginLeft: 12,
    flex: 1,
  },
  lawFirmDetailsBottomSpacing: {
    height: 40,
  },

  // Join Organization Button Styles
  lawFirmDetailsJoinSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  joinOrganizationButton: {
    backgroundColor: '#2E4A6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  joinedOrganizationButton: {
    backgroundColor: '#28a745',
  },
  pendingJoinButton: {
    backgroundColor: '#ffc107',
  },
  joinOrganizationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  
  // Law Firm Details Lawyers Section Styles
  lawFirmDetailsLawyersCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lawFirmDetailsLawyersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  lawFirmDetailsLawyersHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lawFirmDetailsLawyersIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 74, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lawFirmDetailsLawyersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  lawFirmDetailsViewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(46, 74, 107, 0.1)',
    borderRadius: 20,
  },
  lawFirmDetailsViewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  lawFirmDetailsLawyersScroll: {
    paddingLeft: 0,
    paddingVertical: 8,
  },
  lawFirmDetailsLawyerCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 155,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(46, 74, 107, 0.08)',
  },
  lawFirmDetailsLawyerAvatar: {
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
  lawFirmDetailsLawyerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lawFirmDetailsLawyerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  lawFirmDetailsLawyerSpecialty: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  lawFirmDetailsLawyerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  lawFirmDetailsStars: {
    fontSize: 12,
    marginRight: 4,
  },
  lawFirmDetailsRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },

  // View All Firm Lawyers Page Styles
  viewAllFirmLawyersContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllFirmLawyersNavHeader: {
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
  viewAllFirmLawyersBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllFirmLawyersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  viewAllFirmLawyersScrollContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllFirmLawyersHeaderInfo: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  viewAllFirmLawyersPageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  viewAllFirmLawyersSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 22,
  },
  viewAllFirmLawyersGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  viewAllFirmLawyerCard: {
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
  viewAllFirmLawyerImageContainer: {
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
  viewAllFirmLawyerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewAllFirmLawyerInfo: {
    flex: 1,
  },
  viewAllFirmLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
    lineHeight: 20,
  },
  viewAllFirmLawyerSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
    fontWeight: '500',
  },
  viewAllFirmLawyerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  viewAllFirmLawyerStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllFirmLawyerStatText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
    fontWeight: '600',
  },
  viewAllFirmLawyersBottomSpacing: {
    height: 40,
  },

  // Lawyer Details Screen Styles (from App.js)
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
  lawyerDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lawyerDetailsFavorite: {
    padding: 10,
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
  lawyerDetailProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  lawyerProfileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  lawyerProfileSpecialty: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 30,
  },
  lawyerQuickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  lawyerQuickStat: {
    alignItems: 'center',
    flex: 1,
  },
  lawyerQuickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawyerQuickStatLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },

  // About Section
  lawyerAboutSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lawyerSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  lawyerAboutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lawyerAboutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  lawyerAboutStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    fontSize: 12,
    color: '#6c757d',
  },
  lawyerAboutDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    marginBottom: 16,
  },
  lawyerReadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  lawyerReadMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginRight: 8,
  },
  lawyerReadMoreIcon: {
    fontSize: 16,
    color: '#2E4A6B',
  },

  // Reviews Section
  lawyerReviewsSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lawyerReviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  lawyerReviewsSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  lawyerReviewsSubtitleText: {
    fontSize: 14,
    color: '#6c757d',
  },
  lawyerViewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(46, 74, 107, 0.1)',
    borderRadius: 20,
  },
  lawyerViewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
    marginRight: 4,
  },
  lawyerViewAllIcon: {
    fontSize: 14,
    color: '#2E4A6B',
  },
  lawyerSampleReview: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4A6B',
  },
  lawyerReviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  lawyerReviewInfo: {
    flex: 1,
  },
  lawyerReviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawyerReviewRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawyerReviewText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // Contact Section
  lawyerContactSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lawyerContactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  lawyerContactOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46, 74, 107, 0.1)',
  },
  lawyerContactText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
    marginTop: 8,
  },

  // Footer
  lawyerDetailsFooter: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  lawyerProfessionalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  connectButton: {
    flex: 1,
    backgroundColor: '#2E4A6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  referButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#2E4A6B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  referButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  connectedButton: {
    backgroundColor: '#28a745',
  },

  // Refer Client Modal Styles
  modalOverlay: {
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
  referClientModal: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
    maxWidth: 400,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  referClientModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  referClientModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  modalCloseButton: {
    padding: 8,
  },
  referClientModalContent: {
    padding: 24,
  },
  referToLawyerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  referToLawyerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 12,
  },
  referToLawyerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  referToLawyerDetails: {
    flex: 1,
  },
  referToLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  referToLawyerSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  referToLawyerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referToLawyerRatingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginLeft: 4,
  },
  referClientDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 22,
    marginBottom: 16,
  },
  referClientBenefits: {
    marginBottom: 8,
  },
  referClientBenefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  referClientBenefitText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  referClientModalActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  cancelReferralButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelReferralButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  confirmReferralButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#2E4A6B',
    shadowColor: '#2E4A6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmReferralButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // User Details Screen Styles (similar to Lawyer Details)
  userDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  userDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  userDetailsBackButton: {
    padding: 10,
  },
  userDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetailsPlaceholder: {
    width: 40,
    height: 40,
  },
  userDetailsScrollContent: {
    flex: 1,
  },

  // User Hero Section
  userDetailsHeroSection: {
    marginBottom: 20,
  },
  userDetailsHeroBackground: {
    backgroundColor: '#2E4A6B',
    position: 'relative',
  },
  userDetailsHeroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 74, 107, 0.8)',
  },
  userDetailsHeroContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  userDetailsHeroInfo: {
    alignItems: 'center',
  },
  userDetailsImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  userDetailsHeroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userDetailsHeroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  userDetailsHeroSubtitle: {
    fontSize: 18,
    color: '#e8f4f8',
    marginBottom: 20,
    textAlign: 'center',
  },
  userDetailsStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetailsStat: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userDetailsStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetailsStatLabel: {
    fontSize: 14,
    color: '#e8f4f8',
    marginTop: 4,
  },
  userDetailsStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e8f4f8',
  },

  // Categories Section
  userDetailsCategoriesCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  userDetailsCategoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetailsCategoriesIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetailsCategoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  userDetailsCategoriesGrid: {
    gap: 12,
  },
  userDetailsCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4A6B',
  },
  userDetailsCategoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetailsCategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    flex: 1,
  },

  // Services Section
  userDetailsServicesCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  userDetailsServicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetailsServicesIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetailsServicesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  userDetailsServicesGrid: {
    gap: 8,
  },
  userDetailsServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  userDetailsServiceIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e8f8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetailsServiceContent: {
    flex: 1,
  },
  userDetailsServiceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
  },

  // Description Section
  userDetailsDescriptionCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  userDetailsDescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetailsDescriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetailsDescriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  userDetailsDescriptionText: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },

  // Contact Section
  userDetailsContactCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  userDetailsContactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetailsContactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetailsContactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  userDetailsContactInfo: {
    gap: 16,
  },
  userDetailsContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetailsContactText: {
    fontSize: 16,
    color: '#6c757d',
    marginLeft: 12,
    flex: 1,
  },
  userDetailsBottomSpacing: {
    height: 40,
  },

  // Appointment Details Styles
  appointmentDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appointmentDetailsHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentDetailsBackButton: {
    padding: 8,
  },
  appointmentDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  appointmentDetailsOptionsButton: {
    padding: 8,
  },
  appointmentDetailsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  appointmentDetailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentDetailsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E4A6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appointmentDetailsClientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  clientAvatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  clientInfo: {
    flex: 1,
  },
  clientNameLarge: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  clientSpecialty: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  clientBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  appointmentStatusBadgeLarge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  appointmentStatusBadgeTextLarge: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  returningClientBadgeLarge: {
    backgroundColor: '#e7f3ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  returningClientTextLarge: {
    color: '#0066cc',
    fontSize: 13,
    fontWeight: '600',
  },
  appointmentDetailsCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  serviceDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  serviceDetailsText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    marginTop: 8,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  scheduleDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  scheduleDetailItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  scheduleDetailLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
    marginBottom: 4,
  },
  scheduleDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  contactDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
    gap: 16,
  },
  contactDetailText: {
    flex: 1,
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  financialDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  financialLabel: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  financialValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  financialText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E4A6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 14,
    color: '#6c757d',
  },
  appointmentDetailsBottomSpacing: {
    height: 120,
  },
  appointmentActionsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
  },
  appointmentRejectButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  appointmentRejectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentAcceptButton: {
    flex: 1,
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  appointmentAcceptButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Add Activity Screen Styles
  addActivityContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  addActivityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E4A6B',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  addActivityBackButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addActivityHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  addActivityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addActivitySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  addActivitySaveButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addActivitySaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  addActivityContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  activitySection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activitySectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  activityTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityTypeCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activityTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    textAlign: 'center',
  },
  activityTypeTextActive: {
    color: '#ffffff',
  },
  activityField: {
    marginBottom: 16,
  },
  activityFieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityFieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  activityFieldInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2E4A6B',
    backgroundColor: '#f8f9fa',
  },
  activityFieldTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  activityStatusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activityStatusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  activityStatusButtonTextActive: {
    color: '#ffffff',
  },
  activityPreviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4A6B',
  },
  activityPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityPreviewIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityPreviewInfo: {
    flex: 1,
  },
  activityPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  activityPreviewMeta: {
    fontSize: 12,
    color: '#6c757d',
  },
  activityPreviewDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginTop: 8,
  },
  addActivityBottomSpacing: {
    height: 100,
  },
  addActivityActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 12,
  },
  addActivityCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#6c757d',
    alignItems: 'center',
  },
  addActivityCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  addActivitySaveButtonBottom: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2E4A6B',
    alignItems: 'center',
  },
  addActivitySaveButtonBottomText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default LawyerApp;
