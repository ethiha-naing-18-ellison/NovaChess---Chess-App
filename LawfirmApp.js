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

// LAW FIRM ACCOUNT SYSTEM
// This is completely separate from the normal USER and LAWYER account systems
// Law firms have different home page, profile, management features, and lawyer roster management

const LawfirmApp = ({ 
  userRole, 
  setCurrentScreen, 
  selectedCategories,
  setSelectedCategories,
  selectedServices, 
  setSelectedServices,
  showCustomAlert,
  ProfessionalIcon,
  lawFirmForm,
  userProfile
}) => {
  // User profile images array (for clients/users and lawyers in the firm)
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

  // Lawyer profile images array
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
    require('./assets/images/lawyer/lawyer20.png'),
  ];

  // Law firm specific state
  const [lawfirmCurrentScreen, setLawfirmCurrentScreen] = useState('home');
  
  // Profile management state
  const [showManageProfile, setShowManageProfile] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  
  // Lawyer management states
  const [showLawyerRoster, setShowLawyerRoster] = useState(false);
  const [showAddLawyer, setShowAddLawyer] = useState(false);
  const [showLawyerDetails, setShowLawyerDetails] = useState(false);
  const [showChooseLawyer, setShowChooseLawyer] = useState(false);
  const [showRemoveLawyerConfirmation, setShowRemoveLawyerConfirmation] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [lawyerToRemove, setLawyerToRemove] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Client management states
  const [showClientManagement, setShowClientManagement] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Case management states
  const [showCaseManagement, setShowCaseManagement] = useState(false);
  // Financial management states
  const [showFinancialReports, setShowFinancialReports] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showAssignLawyer, setShowAssignLawyer] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeAppointmentTab, setActiveAppointmentTab] = useState('pending');
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showReassignLawyer, setShowReassignLawyer] = useState(false);
  
  // Case management states
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showBilling, setShowBilling] = useState(false);
  const [showEditCase, setShowEditCase] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showReassignCaseLawyer, setShowReassignCaseLawyer] = useState(false);
  
  // Home page slider states
  const [homeSliderMode, setHomeSliderMode] = useState('lawyers'); // 'lawyers' or 'lawfirms'
  const [showAllHomeLawyers, setShowAllHomeLawyers] = useState(false);
  const [showAllHomeLawFirms, setShowAllHomeLawFirms] = useState(false);
  const [showLawFirmDetails, setShowLawFirmDetails] = useState(false);
  const [selectedLawFirm, setSelectedLawFirm] = useState(null);
  
  // Lawyer page tabs
  const [lawyerPageTab, setLawyerPageTab] = useState('roster'); // 'roster' or 'requests'
  const [lawyerRequests, setLawyerRequests] = useState([
    {
      id: '1',
      name: 'Jennifer Martinez',
      email: 'jennifer.martinez@email.com',
      phone: '+1 (555) 987-6543',
      specialty: 'Immigration Law',
      experience: '8 years',
      education: 'Stanford Law School, J.D.',
      barAdmission: 'State Bar of California',
      requestDate: '2024-01-15',
      status: 'pending',
      image: 15,
      coverLetter: 'I am writing to express my strong interest in joining your esteemed law firm. With 8 years of experience in Immigration Law, I believe I can contribute significantly to your team.',
      resume: 'Available upon request',
      references: ['Judge Sarah Wilson', 'Attorney Michael Chen', 'Prof. David Rodriguez']
    },
    {
      id: '2', 
      name: 'Robert Thompson',
      email: 'robert.thompson@email.com',
      phone: '+1 (555) 456-7890',
      specialty: 'Corporate Law',
      experience: '12 years',
      education: 'Harvard Law School, J.D.',
      barAdmission: 'State Bar of New York',
      requestDate: '2024-01-18',
      status: 'pending',
      image: 16,
      coverLetter: 'I am excited about the opportunity to bring my extensive corporate law experience to your firm. My track record includes successful mergers and acquisitions worth over $500M.',
      resume: 'Available upon request',
      references: ['CEO Amanda Johnson', 'Partner Lisa Chang', 'Judge Robert Davis']
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com', 
      phone: '+1 (555) 234-5678',
      specialty: 'Family Law',
      experience: '6 years',
      education: 'UCLA School of Law, J.D.',
      barAdmission: 'State Bar of California',
      requestDate: '2024-01-20',
      status: 'pending',
      image: 17,
      coverLetter: 'With a passion for family law and a commitment to helping families navigate difficult times, I would be honored to join your team and contribute to your excellent reputation.',
      resume: 'Available upon request',
      references: ['Judge Patricia Lee', 'Attorney Carlos Mendez', 'Social Worker Jane Smith']
    }
  ]);
  
  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'appointment',
      title: 'New Appointment Request',
      message: 'Sarah Johnson has requested an appointment for Contract Review',
      time: '2 hours ago',
      read: false,
      data: { appointmentId: 'apt_001', clientName: 'Sarah Johnson' }
    },
    {
      id: '2',
      type: 'lawyer_request',
      title: 'New Lawyer Application',
      message: 'Jennifer Martinez has applied to join your law firm',
      time: '1 day ago',
      read: false,
      data: { requestId: '1', lawyerName: 'Jennifer Martinez' }
    },
    {
      id: '3',
      type: 'case_update',
      title: 'Case Status Updated',
      message: 'Johnson vs. Smith case has been updated to 85% complete',
      time: '2 days ago',
      read: true,
      data: { caseId: 'case_001', caseTitle: 'Johnson vs. Smith' }
    },
    {
      id: '4',
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Michael Davis has been confirmed for tomorrow',
      time: '3 days ago',
      read: true,
      data: { appointmentId: 'apt_002', clientName: 'Michael Davis' }
    }
  ]);
  
  const [newActivity, setNewActivity] = useState({
    type: 'note',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    billableHours: 0,
    status: 'completed'
  });

  // Create law firm profile from registration data
  const [lawfirmProfile, setLawfirmProfile] = useState({
    name: lawFirmForm?.organizationName || 'Law Firm Name',
    phone: lawFirmForm?.phone || 'Not provided',
    email: lawFirmForm?.email || 'Not provided',
    address: lawFirmForm?.address || 'Address not provided',
    website: lawFirmForm?.website || 'Website not provided',
    description: lawFirmForm?.description || 'Professional law firm providing comprehensive legal services.',
    practiceAreas: selectedCategories || [],
    services: selectedServices || [],
    establishedYear: new Date().getFullYear(),
    totalLawyers: 0,
    totalCases: 0,
    totalClients: 0,
    rating: 5.0,
    profileImage: require('./assets/images/lawfirm/lawfirm1.png'),
    verified: false,
    status: 'Active'
  });

  // Initialize editedProfile when lawfirmProfile changes
  useEffect(() => {
    setEditedProfile(lawfirmProfile);
  }, [lawfirmProfile]);

  // Get services for a specific category
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

  // All available categories
  const allCategories = [
    'Property', 'Criminal', 'Tax', 'Family', 'Business', 'Personal Injury', 'Civil Rights',
    'Immigration', 'Environmental', 'Bankruptcy', 'Employment', 'Real Estate', 'Estate Planning',
    'Intellectual Property', 'Contract', 'Divorce', 'DUI', 'Workers Comp', 'Medical Malpractice',
    'Securities', 'Patent', 'Trademark', 'Copyright', 'Corporate', 'Insurance', 'Healthcare',
    'Construction', 'Entertainment', 'Sports', 'Education'
  ];

  // Handle category toggle in edit mode
  const handleCategoryToggle = (categoryName) => {
    const currentCategories = editedProfile?.practiceAreas || [];
    let newCategories;
    
    if (currentCategories.includes(categoryName)) {
      // Remove category
      newCategories = currentCategories.filter(cat => cat !== categoryName);
    } else {
      // Add category
      newCategories = [...currentCategories, categoryName];
    }

    // Update categories
    setEditedProfile(prev => ({ ...prev, practiceAreas: newCategories }));

    // Auto-update services based on new categories
    const allServices = [];
    newCategories.forEach(category => {
      const categoryServices = getServicesForCategory(category);
      categoryServices.forEach(service => {
        if (!allServices.includes(service)) {
          allServices.push(service);
        }
      });
    });

    // Update services
    setEditedProfile(prev => ({ ...prev, services: allServices }));
  };

  // Handle profile save
  const handleSaveProfile = () => {
    if (editedProfile) {
      setLawfirmProfile(editedProfile);
    }
    setEditMode(false);
    showCustomAlert(
      'success',
      'Firm Profile Updated',
      'Your law firm profile has been successfully updated.',
      [{ text: 'OK', style: 'primary' }]
    );
  };

  // Law firm statistics
  const [lawfirmStats, setLawfirmStats] = useState({
    totalRevenue: '$125,000',
    monthlyRevenue: '$15,000',
    activeCases: 23,
    completedCases: 45,
    totalLawyers: 8,
    totalClients: 67,
    averageRating: 4.8,
    pendingPayments: '$8,500'
  });

  // Sample lawyers data for the firm
  const [firmLawyers, setFirmLawyers] = useState([
    {
      id: 1,
      name: 'Sarah Mitchell',
      specialty: 'Corporate Law',
      experience: '8 years',
      rating: 4.9,
      cases: 45,
      status: 'Active',
      image: lawyerImages[0],
      phone: '+1 (555) 123-4567',
      email: 'sarah.mitchell@lawfirm.com',
      hourlyRate: '$350/hour',
      description: 'Experienced corporate lawyer specializing in mergers, acquisitions, and business law. Proven track record of successful high-value transactions.',
      education: 'Harvard Law School, JD',
      barAdmission: 'New York State Bar',
      successRate: '94%'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Criminal Defense',
      experience: '12 years',
      rating: 4.8,
      cases: 67,
      status: 'Active',
      image: lawyerImages[1],
      phone: '+1 (555) 234-5678',
      email: 'michael.chen@lawfirm.com',
      hourlyRate: '$400/hour',
      description: 'Dedicated criminal defense attorney with extensive trial experience. Known for aggressive defense strategies and favorable outcomes.',
      education: 'Stanford Law School, JD',
      barAdmission: 'California State Bar',
      successRate: '89%'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialty: 'Family Law',
      experience: '6 years',
      rating: 4.7,
      cases: 34,
      status: 'Active',
      image: lawyerImages[2],
      phone: '+1 (555) 345-6789',
      email: 'emily.rodriguez@lawfirm.com',
      hourlyRate: '$300/hour',
      description: 'Compassionate family law attorney focused on divorce, child custody, and domestic relations. Committed to protecting families.',
      education: 'UCLA School of Law, JD',
      barAdmission: 'California State Bar',
      successRate: '91%'
    },
    {
      id: 4,
      name: 'David Thompson',
      specialty: 'Personal Injury',
      experience: '10 years',
      rating: 4.6,
      cases: 52,
      status: 'Active',
      image: lawyerImages[3],
      phone: '+1 (555) 456-7890',
      email: 'david.thompson@lawfirm.com',
      hourlyRate: '$325/hour',
      description: 'Personal injury specialist with a strong record of securing substantial settlements and verdicts for injured clients.',
      education: 'Georgetown University Law Center, JD',
      barAdmission: 'District of Columbia Bar',
      successRate: '87%'
    },
    {
      id: 5,
      name: 'Jennifer Park',
      specialty: 'Intellectual Property',
      experience: '9 years',
      rating: 4.8,
      cases: 38,
      status: 'Active',
      image: lawyerImages[4],
      phone: '+1 (555) 567-8901',
      email: 'jennifer.park@lawfirm.com',
      hourlyRate: '$375/hour',
      description: 'IP attorney specializing in patent prosecution, trademark registration, and intellectual property litigation.',
      education: 'MIT & Harvard Law School, JD',
      barAdmission: 'Massachusetts State Bar',
      successRate: '93%'
    },
    {
      id: 6,
      name: 'Robert Wilson',
      specialty: 'Real Estate Law',
      experience: '15 years',
      rating: 4.9,
      cases: 78,
      status: 'Active',
      image: lawyerImages[5],
      phone: '+1 (555) 678-9012',
      email: 'robert.wilson@lawfirm.com',
      hourlyRate: '$360/hour',
      description: 'Senior real estate attorney handling commercial and residential transactions, zoning issues, and property disputes.',
      education: 'Columbia Law School, JD',
      barAdmission: 'New York State Bar',
      successRate: '96%'
    },
    {
      id: 7,
      name: 'Lisa Chang',
      specialty: 'Employment Law',
      experience: '7 years',
      rating: 4.5,
      cases: 29,
      status: 'Active',
      image: lawyerImages[6],
      phone: '+1 (555) 789-0123',
      email: 'lisa.chang@lawfirm.com',
      hourlyRate: '$290/hour',
      description: 'Employment law attorney representing both employers and employees in workplace disputes and compliance matters.',
      education: 'University of Chicago Law School, JD',
      barAdmission: 'Illinois State Bar',
      successRate: '88%'
    },
    {
      id: 8,
      name: 'James Martinez',
      specialty: 'Tax Law',
      experience: '11 years',
      rating: 4.7,
      cases: 41,
      status: 'Active',
      image: lawyerImages[7],
      phone: '+1 (555) 890-1234',
      email: 'james.martinez@lawfirm.com',
      hourlyRate: '$340/hour',
      description: 'Tax attorney with expertise in corporate tax planning, IRS disputes, and international tax compliance.',
      education: 'NYU School of Law, JD',
      barAdmission: 'New York State Bar',
      successRate: '92%'
    }
  ]);

  // All available lawyers database for adding to firm
  const allAvailableLawyers = [
    {
      id: 101,
      name: 'Alexander Thompson',
      specialty: 'Business Law',
      experience: '14 years',
      rating: 4.9,
      cases: 89,
      image: lawyerImages[8],
      phone: '+1 (555) 111-2222',
      email: 'alexander.thompson@legal.com',
      hourlyRate: '$450/hour',
      description: 'Senior business law attorney with expertise in corporate governance and commercial transactions.',
      education: 'Yale Law School, JD',
      barAdmission: 'Connecticut State Bar',
      successRate: '97%',
      available: true
    },
    {
      id: 102,
      name: 'Maria Gonzalez',
      specialty: 'Immigration Law',
      experience: '9 years',
      rating: 4.7,
      cases: 56,
      image: lawyerImages[9],
      phone: '+1 (555) 222-3333',
      email: 'maria.gonzalez@legal.com',
      hourlyRate: '$320/hour',
      description: 'Immigration attorney specializing in visa applications, green cards, and deportation defense.',
      education: 'University of Miami School of Law, JD',
      barAdmission: 'Florida State Bar',
      successRate: '91%',
      available: true
    },
    {
      id: 103,
      name: 'Kevin O\'Connor',
      specialty: 'Environmental Law',
      experience: '11 years',
      rating: 4.6,
      cases: 43,
      image: lawyerImages[10],
      phone: '+1 (555) 333-4444',
      email: 'kevin.oconnor@legal.com',
      hourlyRate: '$380/hour',
      description: 'Environmental law specialist focusing on regulatory compliance and environmental litigation.',
      education: 'UC Berkeley School of Law, JD',
      barAdmission: 'California State Bar',
      successRate: '89%',
      available: true
    },
    {
      id: 104,
      name: 'Rachel Kim',
      specialty: 'Healthcare Law',
      experience: '8 years',
      rating: 4.8,
      cases: 37,
      image: lawyerImages[11],
      phone: '+1 (555) 444-5555',
      email: 'rachel.kim@legal.com',
      hourlyRate: '$365/hour',
      description: 'Healthcare attorney with expertise in medical compliance, HIPAA, and healthcare transactions.',
      education: 'Johns Hopkins & Georgetown Law, JD',
      barAdmission: 'Maryland State Bar',
      successRate: '93%',
      available: true
    },
    {
      id: 105,
      name: 'Thomas Anderson',
      specialty: 'Bankruptcy Law',
      experience: '13 years',
      rating: 4.5,
      cases: 64,
      image: lawyerImages[12],
      phone: '+1 (555) 555-6666',
      email: 'thomas.anderson@legal.com',
      hourlyRate: '$310/hour',
      description: 'Bankruptcy attorney helping individuals and businesses navigate financial restructuring.',
      education: 'University of Pennsylvania Law School, JD',
      barAdmission: 'Pennsylvania State Bar',
      successRate: '86%',
      available: true
    },
    {
      id: 106,
      name: 'Diana Foster',
      specialty: 'Securities Law',
      experience: '10 years',
      rating: 4.9,
      cases: 48,
      image: lawyerImages[13],
      phone: '+1 (555) 666-7777',
      email: 'diana.foster@legal.com',
      hourlyRate: '$420/hour',
      description: 'Securities law expert specializing in SEC compliance, IPOs, and investment fund regulations.',
      education: 'Northwestern University School of Law, JD',
      barAdmission: 'Illinois State Bar',
      successRate: '95%',
      available: true
    },
    {
      id: 107,
      name: 'Marcus Johnson',
      specialty: 'Sports Law',
      experience: '7 years',
      rating: 4.4,
      cases: 31,
      image: lawyerImages[14],
      phone: '+1 (555) 777-8888',
      email: 'marcus.johnson@legal.com',
      hourlyRate: '$295/hour',
      description: 'Sports attorney representing athletes, teams, and sports organizations in contract negotiations.',
      education: 'Duke University School of Law, JD',
      barAdmission: 'North Carolina State Bar',
      successRate: '84%',
      available: true
    },
    {
      id: 108,
      name: 'Sophie Laurent',
      specialty: 'Entertainment Law',
      experience: '6 years',
      rating: 4.6,
      cases: 28,
      image: lawyerImages[15],
      phone: '+1 (555) 888-9999',
      email: 'sophie.laurent@legal.com',
      hourlyRate: '$350/hour',
      description: 'Entertainment lawyer working with artists, producers, and media companies on contracts and IP.',
      education: 'USC Gould School of Law, JD',
      barAdmission: 'California State Bar',
      successRate: '88%',
      available: true
    },
    {
      id: 109,
      name: 'Nathan Brooks',
      specialty: 'Construction Law',
      experience: '12 years',
      rating: 4.7,
      cases: 55,
      image: lawyerImages[16],
      phone: '+1 (555) 999-0000',
      email: 'nathan.brooks@legal.com',
      hourlyRate: '$335/hour',
      description: 'Construction law attorney handling contracts, disputes, and regulatory compliance for builders.',
      education: 'University of Texas School of Law, JD',
      barAdmission: 'Texas State Bar',
      successRate: '90%',
      available: true
    },
    {
      id: 110,
      name: 'Isabella Martinez',
      specialty: 'Elder Law',
      experience: '9 years',
      rating: 4.5,
      cases: 42,
      image: lawyerImages[17],
      phone: '+1 (555) 000-1111',
      email: 'isabella.martinez@legal.com',
      hourlyRate: '$285/hour',
      description: 'Elder law attorney focusing on estate planning, guardianship, and senior citizen rights.',
      education: 'Boston University School of Law, JD',
      barAdmission: 'Massachusetts State Bar',
      successRate: '87%',
      available: true
    }
  ];

  // Sample cases data - comprehensive data defined later

  // Sample appointment requests data
  const [appointmentRequests, setAppointmentRequests] = useState([
    {
      id: 1,
      clientName: 'John Anderson',
      clientEmail: 'john.anderson@email.com',
      clientPhone: '+1 (555) 123-4567',
      clientImage: userImages[0],
      appointmentType: 'Initial Consultation',
      legalArea: 'Corporate Law',
      preferredDate: '2024-03-15',
      preferredTime: '10:00 AM',
      alternativeDate: '2024-03-16',
      alternativeTime: '2:00 PM',
      description: 'Need legal advice regarding business incorporation and partnership agreements. Looking to establish a new technology startup.',
      urgency: 'Medium',
      estimatedDuration: '1 hour',
      status: 'pending',
      requestDate: '2024-03-10',
      assignedLawyer: null
    },
    {
      id: 2,
      clientName: 'Sarah Williams',
      clientEmail: 'sarah.williams@email.com',
      clientPhone: '+1 (555) 234-5678',
      clientImage: userImages[1],
      appointmentType: 'Legal Consultation',
      legalArea: 'Family Law',
      preferredDate: '2024-03-14',
      preferredTime: '2:00 PM',
      alternativeDate: '2024-03-15',
      alternativeTime: '11:00 AM',
      description: 'Seeking guidance on divorce proceedings and child custody arrangements. Need immediate legal support.',
      urgency: 'High',
      estimatedDuration: '1.5 hours',
      status: 'pending',
      requestDate: '2024-03-09',
      assignedLawyer: null
    },
    {
      id: 3,
      clientName: 'Michael Chen',
      clientEmail: 'michael.chen@email.com',
      clientPhone: '+1 (555) 345-6789',
      clientImage: userImages[2],
      appointmentType: 'Contract Review',
      legalArea: 'Business Law',
      preferredDate: '2024-03-18',
      preferredTime: '3:00 PM',
      alternativeDate: '2024-03-19',
      alternativeTime: '10:00 AM',
      description: 'Need legal review of employment contracts and non-disclosure agreements for my company.',
      urgency: 'Medium',
      estimatedDuration: '45 minutes',
      status: 'pending',
      requestDate: '2024-03-11',
      assignedLawyer: null
    },
    {
      id: 4,
      clientName: 'Emily Rodriguez',
      clientEmail: 'emily.rodriguez@email.com',
      clientPhone: '+1 (555) 456-7890',
      clientImage: userImages[3],
      appointmentType: 'Legal Advice',
      legalArea: 'Personal Injury',
      preferredDate: '2024-03-16',
      preferredTime: '9:00 AM',
      alternativeDate: '2024-03-17',
      alternativeTime: '1:00 PM',
      description: 'Injured in a car accident and need legal representation. Looking for advice on insurance claims.',
      urgency: 'High',
      estimatedDuration: '1 hour',
      status: 'pending',
      requestDate: '2024-03-08',
      assignedLawyer: null
    },
    {
      id: 5,
      clientName: 'David Thompson',
      clientEmail: 'david.thompson@email.com',
      clientPhone: '+1 (555) 567-8901',
      clientImage: userImages[4],
      appointmentType: 'Property Consultation',
      legalArea: 'Real Estate Law',
      preferredDate: '2024-03-20',
      preferredTime: '11:00 AM',
      alternativeDate: '2024-03-21',
      alternativeTime: '3:00 PM',
      description: 'Planning to purchase commercial property and need legal guidance on contracts and due diligence.',
      urgency: 'Low',
      estimatedDuration: '1.5 hours',
      status: 'pending',
      requestDate: '2024-03-12',
      assignedLawyer: null
    }
  ]);

  // Law Firm Cases Data
  const [firmCases, setFirmCases] = useState([
    {
      id: 1,
      caseNumber: 'LF-2024-001',
      clientName: 'John Anderson',
      clientEmail: 'john.anderson@email.com',
      clientPhone: '+1 (555) 123-4567',
      clientImage: userImages[0],
      caseType: 'Corporate Merger',
      status: 'Active',
      priority: 'High',
      nextHearing: '2024-03-15',
      lastActivity: '2 hours ago',
      progress: 75,
      description: 'Complex corporate merger involving multiple subsidiaries and international regulations.',
      documents: 24,
      billableHours: 156,
      totalFees: '45,000',
      assignedLawyer: {
        id: 1,
        name: 'Sarah Mitchell',
        specialty: 'Corporate Law',
        image: lawyerImages[0],
        email: 'sarah.mitchell@lawfirm.com'
      }
    },
    {
      id: 2,
      caseNumber: 'LF-2024-002',
      clientName: 'Maria Rodriguez',
      clientEmail: 'maria.rodriguez@email.com',
      clientPhone: '+1 (555) 234-5678',
      clientImage: userImages[1],
      caseType: 'Personal Injury',
      status: 'Active',
      priority: 'Medium',
      nextHearing: '2024-03-20',
      lastActivity: '1 day ago',
      progress: 45,
      description: 'Motor vehicle accident case with significant medical expenses and lost wages.',
      documents: 18,
      billableHours: 89,
      totalFees: '28,500',
      assignedLawyer: {
        id: 3,
        name: 'David Wilson',
        specialty: 'Personal Injury Law',
        image: lawyerImages[2],
        email: 'david.wilson@lawfirm.com'
      }
    },
    {
      id: 3,
      caseNumber: 'LF-2024-003',
      clientName: 'TechStart Inc.',
      clientEmail: 'legal@techstart.com',
      clientPhone: '+1 (555) 345-6789',
      clientImage: userImages[2],
      caseType: 'Intellectual Property',
      status: 'Pending',
      priority: 'High',
      nextHearing: '2024-03-12',
      lastActivity: '3 hours ago',
      progress: 30,
      description: 'Patent application and trademark protection for innovative software solutions.',
      documents: 15,
      billableHours: 67,
      totalFees: '22,000',
      assignedLawyer: {
        id: 2,
        name: 'Michael Chen',
        specialty: 'Intellectual Property Law',
        image: lawyerImages[1],
        email: 'michael.chen@lawfirm.com'
      }
    },
    {
      id: 4,
      caseNumber: 'LF-2024-004',
      clientName: 'Jennifer Smith',
      clientEmail: 'jennifer.smith@email.com',
      clientPhone: '+1 (555) 456-7890',
      clientImage: userImages[3],
      caseType: 'Family Law',
      status: 'Active',
      priority: 'Medium',
      nextHearing: '2024-03-18',
      lastActivity: '5 hours ago',
      progress: 60,
      description: 'Divorce proceedings with child custody arrangements and asset division.',
      documents: 22,
      billableHours: 134,
      totalFees: '18,750',
      assignedLawyer: {
        id: 4,
        name: 'Emily Johnson',
        specialty: 'Family Law',
        image: lawyerImages[3],
        email: 'emily.johnson@lawfirm.com'
      }
    },
    {
      id: 5,
      caseNumber: 'LF-2024-005',
      clientName: 'Robert Thompson',
      clientEmail: 'robert.thompson@email.com',
      clientPhone: '+1 (555) 567-8901',
      clientImage: userImages[4],
      caseType: 'Real Estate',
      status: 'Completed',
      priority: 'Low',
      nextHearing: null,
      lastActivity: '1 week ago',
      progress: 100,
      description: 'Commercial property acquisition with complex zoning and environmental considerations.',
      documents: 31,
      billableHours: 98,
      totalFees: '35,200',
      assignedLawyer: {
        id: 5,
        name: 'James Anderson',
        specialty: 'Real Estate Law',
        image: lawyerImages[4],
        email: 'james.anderson@lawfirm.com'
      }
    },
    {
      id: 6,
      caseNumber: 'LF-2024-006',
      clientName: 'Global Enterprises',
      clientEmail: 'legal@globalent.com',
      clientPhone: '+1 (555) 678-9012',
      clientImage: userImages[5],
      caseType: 'Employment Law',
      status: 'Active',
      priority: 'High',
      nextHearing: '2024-03-14',
      lastActivity: '4 hours ago',
      progress: 85,
      description: 'Class action employment lawsuit involving wage and hour violations.',
      documents: 47,
      billableHours: 203,
      totalFees: '67,800',
      assignedLawyer: {
        id: 6,
        name: 'Lisa Davis',
        specialty: 'Employment Law',
        image: lawyerImages[5],
        email: 'lisa.davis@lawfirm.com'
      }
    },
    {
      id: 7,
      caseNumber: 'LF-2024-007',
      clientName: 'Alex Martinez',
      clientEmail: 'alex.martinez@email.com',
      clientPhone: '+1 (555) 789-0123',
      clientImage: userImages[6],
      caseType: 'Criminal Defense',
      status: 'On Hold',
      priority: 'Medium',
      nextHearing: '2024-03-25',
      lastActivity: '2 days ago',
      progress: 25,
      description: 'White-collar criminal defense case involving financial fraud allegations.',
      documents: 12,
      billableHours: 45,
      totalFees: '15,000',
      assignedLawyer: {
        id: 7,
        name: 'Christopher Brown',
        specialty: 'Criminal Defense',
        image: lawyerImages[6],
        email: 'christopher.brown@lawfirm.com'
      }
    },
    {
      id: 8,
      caseNumber: 'LF-2024-008',
      clientName: 'Healthcare Plus',
      clientEmail: 'legal@healthcareplus.com',
      clientPhone: '+1 (555) 890-1234',
      clientImage: userImages[7],
      caseType: 'Healthcare Law',
      status: 'Active',
      priority: 'Medium',
      nextHearing: '2024-03-22',
      lastActivity: '6 hours ago',
      progress: 55,
      description: 'Healthcare compliance and regulatory issues with HIPAA violations.',
      documents: 19,
      billableHours: 112,
      totalFees: '31,500',
      assignedLawyer: {
        id: 8,
        name: 'Amanda Wilson',
        specialty: 'Healthcare Law',
        image: lawyerImages[7],
        email: 'amanda.wilson@lawfirm.com'
      }
    }
  ]);

  // Sample clients data
  const [firmClients, setFirmClients] = useState([
    {
      id: 1,
      name: 'TechCorp Industries',
      type: 'Corporate',
      contactPerson: 'Robert Johnson',
      phone: '+1 (555) 111-2222',
      email: 'contact@techcorp.com',
      address: '123 Business Ave, New York, NY',
      totalCases: 3,
      totalValue: '$150,000',
      status: 'Active',
      image: userImages[0]
    },
    {
      id: 2,
      name: 'John Smith',
      type: 'Individual',
      contactPerson: 'John Smith',
      phone: '+1 (555) 333-4444',
      email: 'john.smith@email.com',
      address: '456 Main St, Brooklyn, NY',
      totalCases: 1,
      totalValue: '$25,000',
      status: 'Active',
      image: userImages[1]
    }
  ]);

  // Handler functions
  const handleLawyerSelect = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowLawyerDetails(true);
  };

  const handleRemoveLawyer = (lawyer) => {
    setLawyerToRemove(lawyer);
    setShowRemoveLawyerConfirmation(true);
  };

  const confirmRemoveLawyer = () => {
    if (lawyerToRemove) {
      setFirmLawyers(prev => prev.filter(lawyer => lawyer.id !== lawyerToRemove.id));
      setShowRemoveLawyerConfirmation(false);
      setLawyerToRemove(null);
      
      showCustomAlert(
        'success',
        'Lawyer Removed Successfully',
        `${lawyerToRemove.name} has been removed from your law firm.`,
        [{ text: 'OK', style: 'primary' }]
      );
    }
  };

  const cancelRemoveLawyer = () => {
    setShowRemoveLawyerConfirmation(false);
    setLawyerToRemove(null);
  };

  // Handler functions for lawyer requests
  const handleAcceptLawyerRequest = (request) => {
    // Add lawyer to firm
    const newLawyer = {
      id: request.id,
      name: request.name,
      email: request.email,
      phone: request.phone,
      specialty: request.specialty,
      experience: request.experience,
      education: request.education,
      barAdmission: request.barAdmission,
      image: lawyerImages[request.image % lawyerImages.length],
      status: 'Active',
      rating: '4.8',
      cases: '0',
      successRate: '100%',
      hourlyRate: '$150/hr'
    };

    setFirmLawyers([...firmLawyers, newLawyer]);
    
    // Remove from requests
    setLawyerRequests(lawyerRequests.filter(req => req.id !== request.id));
    
    showCustomAlert(
      'success',
      'Lawyer Accepted',
      `${request.name} has been successfully added to your firm.`,
      [{ text: 'OK', style: 'primary' }]
    );
  };

  const handleRejectLawyerRequest = (request) => {
    showCustomAlert(
      'warning',
      'Reject Application',
      `Are you sure you want to reject ${request.name}'s application?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reject', 
          style: 'destructive',
          onPress: () => {
            setLawyerRequests(lawyerRequests.filter(req => req.id !== request.id));
            showCustomAlert(
              'info',
              'Application Rejected',
              `${request.name}'s application has been rejected.`,
              [{ text: 'OK', style: 'primary' }]
            );
          }
        }
      ]
    );
  };

  const handleViewLawyerRequest = (request) => {
    // Create detailed lawyer data for viewing
    const lawyerData = {
      name: request.name,
      specialty: request.specialty,
      rating: '4.8',
      experience: request.experience,
      cases: 'New Applicant',
      successRate: 'N/A',
      hourlyRate: 'To be determined',
      profileImage: lawyerImages[request.image % lawyerImages.length],
      distance: 'Remote Application',
      description: request.coverLetter,
      reviews: 'New Applicant',
      phone: request.phone,
      email: request.email,
      education: request.education,
      barAdmission: request.barAdmission
    };
    
    setSelectedLawyer(lawyerData);
    setShowLawyerDetails(true);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCaseDetails(true);
  };

  const handleAppointmentAccept = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAssignLawyer(true);
  };

  const handleAppointmentDecline = (appointmentId) => {
    setAppointmentRequests(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: 'declined', declinedDate: new Date().toISOString().split('T')[0] }
          : appointment
      )
    );
    
    showCustomAlert(
      'success',
      'Appointment Declined',
      'The appointment request has been declined.',
      [{ text: 'OK', style: 'primary' }]
    );
  };

  const handleAssignLawyerToAppointment = (lawyer) => {
    if (selectedAppointment) {
      // Update appointment with assigned lawyer and change status to accepted
      setAppointmentRequests(prev => 
        prev.map(appointment => 
          appointment.id === selectedAppointment.id 
            ? { ...appointment, assignedLawyer: lawyer, status: 'accepted' }
            : appointment
        )
      );

      setShowAssignLawyer(false);
      setShowReassignLawyer(false);
      setSelectedAppointment(null);
      setShowAppointmentDetails(false);
      
      showCustomAlert(
        'success',
        'Appointment Accepted',
        `Appointment has been accepted and assigned to ${lawyer.name}.`,
        [{ text: 'OK', style: 'primary' }]
      );
    }
  };

  const handleReassignLawyer = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReassignLawyer(true);
  };

  const handleReacceptAppointment = (appointment) => {
    setAppointmentRequests(prev => 
      prev.map(app => 
        app.id === appointment.id 
          ? { ...app, status: 'pending', declinedDate: undefined }
          : app
      )
    );

    showCustomAlert(
      'success',
      'Appointment Re-opened',
      'The appointment has been moved back to pending status. You can now accept and assign a lawyer.',
      [{ text: 'OK', style: 'primary' }]
    );

    setShowAppointmentDetails(false);
    setActiveAppointmentTab('pending');
  };

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  // Render law firm home screen
  const renderLawfirmHomeScreen = () => (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Enhanced Header with Gradient */}
      <View style={styles.homeHeader}>
        <View style={styles.homeHeaderContent}>
          <View style={styles.homeHeaderLeft}>
            <Image source={lawfirmProfile.profileImage} style={styles.homeHeaderLogo} />
            <View style={styles.homeHeaderText}>
              <Text style={styles.homeHeaderFirmName}>{lawfirmProfile.name}</Text>
              <Text style={styles.homeHeaderWelcome}>Dashboard Overview</Text>
          </View>
        </View>
        <View style={styles.homeHeaderActions}>
        <TouchableOpacity 
            style={styles.homeHeaderActionButton}
            onPress={() => setShowNotifications(true)}
          >
            <MaterialIcons name="notifications" size={24} color="#ffffff" />
            {notifications.filter(n => !n.read).length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {notifications.filter(n => !n.read).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.homeHeaderActionButton}
            onPress={() => setShowSettings(true)}
        >
            <MaterialIcons name="settings" size={24} color="#ffffff" />
        </TouchableOpacity>
        </View>
        </View>
      </View>

      <ScrollView style={styles.homeContent} showsVerticalScrollIndicator={false}>
        {/* Hero Stats Section */}
        <View style={styles.homeHeroSection}>
          <Text style={styles.homeHeroTitle}>Firm Performance</Text>
          <Text style={styles.homeHeroSubtitle}>Your law firm at a glance</Text>
          
          <View style={styles.homeStatsGrid}>
            <View style={[styles.homeStatCard, styles.homeStatCardPrimary]}>
              <View style={styles.homeStatIconContainer}>
                <MaterialIcons name="people" size={22} color="#2E4A6B" />
            </View>
              <View style={styles.homeStatContent}>
                <Text style={styles.homeStatNumber}>{lawfirmStats.totalLawyers}</Text>
                <Text style={styles.homeStatLabel}>Lawyers</Text>
            </View>
            </View>
            
            <View style={[styles.homeStatCard, styles.homeStatCardSecondary]}>
              <View style={styles.homeStatIconContainer}>
                <MaterialIcons name="folder" size={22} color="#2E4A6B" />
            </View>
              <View style={styles.homeStatContent}>
                <Text style={styles.homeStatNumber}>{lawfirmStats.activeCases}</Text>
                <Text style={styles.homeStatLabel}>Active Cases</Text>
          </View>
        </View>

            <View style={[styles.homeStatCard, styles.homeStatCardAccent]}>
              <View style={styles.homeStatIconContainer}>
                <MaterialIcons name="group" size={22} color="#2E4A6B" />
              </View>
              <View style={styles.homeStatContent}>
                <Text style={styles.homeStatNumber}>{firmClients.length}</Text>
                <Text style={styles.homeStatLabel}>Clients</Text>
              </View>
            </View>
            
            <View style={[styles.homeStatCard, styles.homeStatCardSuccess]}>
              <View style={styles.homeStatIconContainer}>
                <MaterialIcons name="attach-money" size={22} color="#2E4A6B" />
              </View>
              <View style={styles.homeStatContent}>
                <Text style={styles.homeStatNumber}>{lawfirmStats.monthlyRevenue}</Text>
                <Text style={styles.homeStatLabel}>Monthly Revenue</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.homeQuickActionsSection}>
          <View style={styles.homeSectionHeader}>
            <Text style={styles.homeSectionTitle}>Quick Actions</Text>
            <Text style={styles.homeSectionSubtitle}>Manage your firm efficiently</Text>
          </View>
          
          <View style={styles.homeQuickActionsGrid}>
            <TouchableOpacity 
              style={styles.homeQuickActionCard}
              onPress={() => setShowLawyerRoster(true)}
            >
              <View style={[styles.homeQuickActionIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialIcons name="people" size={24} color="#1976D2" />
              </View>
              <Text style={styles.homeQuickActionTitle}>Manage Lawyers</Text>
              <Text style={styles.homeQuickActionSubtitle}>View and manage your legal team</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.homeQuickActionCard}
              onPress={() => setShowCaseManagement(true)}
            >
              <View style={[styles.homeQuickActionIcon, { backgroundColor: '#F3E5F5' }]}>
                <MaterialIcons name="folder" size={24} color="#7B1FA2" />
              </View>
              <Text style={styles.homeQuickActionTitle}>Case Management</Text>
              <Text style={styles.homeQuickActionSubtitle}>Track and manage legal cases</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.homeQuickActionCard}
              onPress={() => setShowClientManagement(true)}
            >
              <View style={[styles.homeQuickActionIcon, { backgroundColor: '#E8F5E8' }]}>
                <MaterialIcons name="group" size={24} color="#388E3C" />
              </View>
              <Text style={styles.homeQuickActionTitle}>Client Management</Text>
              <Text style={styles.homeQuickActionSubtitle}>Manage client relationships</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.homeQuickActionCard}
              onPress={() => setShowAppointments(true)}
            >
              <View style={[styles.homeQuickActionIcon, { backgroundColor: '#E8F5E8' }]}>
                <MaterialIcons name="event" size={24} color="#388E3C" />
              </View>
              <Text style={styles.homeQuickActionTitle}>Appointments</Text>
              <Text style={styles.homeQuickActionSubtitle}>Manage appointment requests</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lawyers / Law Firms Slider Section */}
        <View style={styles.homeSliderSection}>
          <View style={styles.homeSectionHeader}>
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
                    Law Firms
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.homeViewAllButton}
              onPress={handleHomeSeeAll}
            >
              <Text style={styles.homeViewAllText}>View All</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#2E4A6B" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.homeSliderScroll}
          >
            {homeSliderMode === 'lawyers' ? (
              // Lawyers from the firm
              firmLawyers.map((lawyer, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.homeLawyerCard}
                  onPress={() => handleHomeLawyerClick(lawyer)}
                >
                  <View style={styles.homeLawyerAvatar}>
                    <Image 
                      source={lawyerImages[lawyer.image % lawyerImages.length]} 
                      style={styles.homeLawyerProfileImage} 
                    />
                  </View>
                  <Text style={styles.homeLawyerName}>{lawyer.name}</Text>
                  <Text style={styles.homeLawyerSpecialty}>{lawyer.specialty}</Text>
                  <View style={styles.homeLawyerRating}>
                    <Text style={styles.homeStars}>⭐⭐⭐⭐⭐</Text>
                    <Text style={styles.homeRatingText}>{lawyer.rating}</Text>
                  </View>
                  <Text style={styles.homeLawyerExperience}>{lawyer.experience}</Text>
                </TouchableOpacity>
              ))
            ) : (
              // External Law Firms Data
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
                  <View style={styles.homeLawFirmAvatar}>
                    <Image source={firm.image} style={styles.homeLawFirmProfileImage} />
                  </View>
                  <Text style={styles.homeLawFirmName}>{firm.name}</Text>
                  <Text style={styles.homeLawFirmSpecialty}>{firm.specialty}</Text>
                  <View style={styles.homeLawFirmRating}>
                    <Text style={styles.homeStars}>⭐⭐⭐⭐⭐</Text>
                    <Text style={styles.homeRatingText}>{firm.rating}</Text>
                  </View>
                  <Text style={styles.homeLawFirmLawyers}>{firm.lawyers} lawyers</Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* Recent Cases Section */}
        <View style={styles.homeRecentCasesSection}>
          <View style={styles.homeSectionHeader}>
            <View>
              <Text style={styles.homeSectionTitle}>Recent Cases</Text>
              <Text style={styles.homeSectionSubtitle}>Latest case activities</Text>
            </View>
            <TouchableOpacity 
              style={styles.homeViewAllButton}
              onPress={() => setShowCaseManagement(true)}
            >
              <Text style={styles.homeViewAllText}>View All</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#2E4A6B" />
            </TouchableOpacity>
          </View>
          
          {firmCases.slice(0, 3).map((caseItem, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.homeCaseCard}
              onPress={() => handleCaseSelect(caseItem)}
            >
              <View style={styles.homeCaseCardHeader}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation(); // Prevent case selection
                    // Create client object from case data
                    const clientFromCase = {
                      id: caseItem.id + '_client',
                      name: caseItem.clientName,
                      type: 'Individual', // Default, could be enhanced
                      contactPerson: caseItem.clientName,
                      phone: caseItem.clientPhone,
                      email: caseItem.clientEmail,
                      address: 'Address not provided',
                      totalCases: 1, // Could be calculated
                      totalValue: caseItem.caseValue || '$0',
                      status: 'Active',
                      image: caseItem.clientImage
                    };
                    setSelectedClient(clientFromCase);
                    setShowClientDetails(true);
                  }}
                >
                  <Image source={caseItem.clientImage} style={styles.homeCaseClientImage} />
                </TouchableOpacity>
                <View style={styles.homeCaseHeaderInfo}>
                  <Text style={styles.homeCaseTitle}>{caseItem.caseNumber} - {caseItem.caseType}</Text>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation(); // Prevent case selection
                      // Create client object from case data
                      const clientFromCase = {
                        id: caseItem.id + '_client',
                        name: caseItem.clientName,
                        type: 'Individual', // Default, could be enhanced
                        contactPerson: caseItem.clientName,
                        phone: caseItem.clientPhone,
                        email: caseItem.clientEmail,
                        address: 'Address not provided',
                        totalCases: 1, // Could be calculated
                        totalValue: caseItem.caseValue || '$0',
                        status: 'Active',
                        image: caseItem.clientImage
                      };
                      setSelectedClient(clientFromCase);
                      setShowClientDetails(true);
                    }}
                  >
                    <Text style={styles.homeCaseClient}>Client: {caseItem.clientName}</Text>
                  </TouchableOpacity>
                </View>
                <View style={[
                  styles.homeCaseStatusBadge, 
                  { backgroundColor: caseItem.status === 'Active' ? '#E8F5E8' : '#FFF3E0' }
                ]}>
                  <Text style={[
                    styles.homeCaseStatusText, 
                    { color: caseItem.status === 'Active' ? '#2E7D32' : '#F57C00' }
                  ]}>
                      {caseItem.status}
                    </Text>
                  </View>
              </View>
              
              <View style={styles.homeCaseCardBody}>
                <View style={styles.homeCaseDetail}>
                  <MaterialIcons name="person" size={16} color="#666" />
                  <Text style={styles.homeCaseDetailText}>Lawyer: {caseItem.assignedLawyer.name}</Text>
                </View>
                <View style={styles.homeCaseDetail}>
                  <MaterialIcons name="attach-money" size={16} color="#666" />
                  <Text style={styles.homeCaseDetailText}>${caseItem.totalFees}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.homeBottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'home' && styles.activeNavItem]}
          onPress={() => setLawfirmCurrentScreen('home')}
        >
          <MaterialIcons name="home" size={24} color={lawfirmCurrentScreen === 'home' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'lawyers' && styles.activeNavItem]}
          onPress={() => {
            setLawfirmCurrentScreen('lawyers');
            setShowLawyerRoster(true);
          }}
        >
          <MaterialIcons name="settings" size={24} color={lawfirmCurrentScreen === 'lawyers' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'lawyers' && styles.activeNavText]}>Management</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'cases' && styles.activeNavItem]}
          onPress={() => {
            setLawfirmCurrentScreen('cases');
            setShowCaseManagement(true);
          }}
        >
          <MaterialIcons name="folder" size={24} color={lawfirmCurrentScreen === 'cases' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'cases' && styles.activeNavText]}>Cases</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'appointments' && styles.activeNavItem]}
          onPress={() => {
            setLawfirmCurrentScreen('appointments');
            setShowAppointments(true);
          }}
        >
          <MaterialIcons name="event" size={24} color={lawfirmCurrentScreen === 'appointments' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'appointments' && styles.activeNavText]}>Appointments</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'profile' && styles.activeNavItem]}
          onPress={() => setLawfirmCurrentScreen('profile')}
        >
          <MaterialIcons name="person" size={24} color={lawfirmCurrentScreen === 'profile' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Lawyer Roster Screen with proper navigation
  const renderLawyerRosterScreen = () => (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => {
          setShowLawyerRoster(false);
          setLawfirmCurrentScreen('home');
        }}>
          <MaterialIcons name="arrow-back" size={24} color="#2E4A6B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Management</Text>
        <TouchableOpacity onPress={() => setShowChooseLawyer(true)}>
          <MaterialIcons name="add" size={24} color="#2E4A6B" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.lawyerTabContainer}>
              <TouchableOpacity 
          style={[
            styles.lawyerTab,
            lawyerPageTab === 'roster' && styles.lawyerTabActive
          ]}
          onPress={() => setLawyerPageTab('roster')}
        >
          <Text style={[
            styles.lawyerTabText,
            lawyerPageTab === 'roster' && styles.lawyerTabTextActive
          ]}>
            Lawyer Roster
          </Text>
          {lawyerPageTab === 'roster' && <View style={styles.lawyerTabIndicator} />}
              </TouchableOpacity>
              <TouchableOpacity 
          style={[
            styles.lawyerTab,
            lawyerPageTab === 'requests' && styles.lawyerTabActive
          ]}
          onPress={() => setLawyerPageTab('requests')}
        >
          <Text style={[
            styles.lawyerTabText,
            lawyerPageTab === 'requests' && styles.lawyerTabTextActive
          ]}>
            Lawyer Requests
          </Text>
          {lawyerRequests.length > 0 && (
            <View style={styles.lawyerRequestBadgeCorner}>
              <Text style={styles.lawyerRequestBadgeText}>{lawyerRequests.length}</Text>
            </View>
          )}
          {lawyerPageTab === 'requests' && <View style={styles.lawyerTabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.lawyerTab,
            lawyerPageTab === 'clients' && styles.lawyerTabActive
          ]}
          onPress={() => setLawyerPageTab('clients')}
        >
          <Text style={[
            styles.lawyerTabText,
            lawyerPageTab === 'clients' && styles.lawyerTabTextActive
          ]}>
            Client Roster
          </Text>
          {lawyerPageTab === 'clients' && <View style={styles.lawyerTabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {lawyerPageTab === 'roster' ? renderLawyerRosterContent() : 
       lawyerPageTab === 'requests' ? renderLawyerRequestsContent() : 
       renderClientRosterContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'home' && styles.activeNavItem]}
          onPress={() => {
            setShowLawyerRoster(false);
            setLawfirmCurrentScreen('home');
          }}
        >
          <MaterialIcons name="home" size={24} color={lawfirmCurrentScreen === 'home' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'lawyers' && styles.activeNavItem]}
          onPress={() => setLawfirmCurrentScreen('lawyers')}
        >
          <MaterialIcons name="settings" size={24} color={lawfirmCurrentScreen === 'lawyers' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'lawyers' && styles.activeNavText]}>Management</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'cases' && styles.activeNavItem]}
          onPress={() => {
            setShowLawyerRoster(false);
            setLawfirmCurrentScreen('cases');
            setShowCaseManagement(true);
          }}
        >
          <MaterialIcons name="folder" size={24} color={lawfirmCurrentScreen === 'cases' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'cases' && styles.activeNavText]}>Cases</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'appointments' && styles.activeNavItem]}
          onPress={() => {
            setShowLawyerRoster(false);
            setLawfirmCurrentScreen('appointments');
            setShowAppointments(true);
          }}
        >
          <MaterialIcons name="event" size={24} color={lawfirmCurrentScreen === 'appointments' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'appointments' && styles.activeNavText]}>Appointments</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'profile' && styles.activeNavItem]}
          onPress={() => {
            setShowLawyerRoster(false);
            setLawfirmCurrentScreen('profile');
          }}
        >
          <MaterialIcons name="person" size={24} color={lawfirmCurrentScreen === 'profile' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLawyerRosterContent = () => (
    <ScrollView style={[styles.content, styles.tabContent]}>
      {firmLawyers.length === 0 ? (
        <View style={styles.emptyLawyerRoster}>
          <MaterialIcons name="people-outline" size={64} color="#ccc" />
          <Text style={styles.emptyLawyerRosterTitle}>No Lawyers in Firm</Text>
          <Text style={styles.emptyLawyerRosterSubtitle}>
            Tap the + button above to add lawyers to your firm
          </Text>
        </View>
      ) : (
        firmLawyers.map((lawyer, index) => (
          <View key={index} style={styles.lawyerCardContainer}>
            <TouchableOpacity 
              style={styles.lawyerCard}
              onPress={() => handleLawyerSelect(lawyer)}
            >
              <Image source={lawyer.image} style={styles.lawyerImage} />
              <View style={styles.lawyerInfo}>
                <Text style={styles.lawyerName}>{lawyer.name}</Text>
                <Text style={styles.lawyerSpecialty}>{lawyer.specialty}</Text>
                <Text style={styles.lawyerExperience}>{lawyer.experience} experience</Text>
                <View style={styles.lawyerStats}>
                  <Text style={styles.lawyerRating}>⭐ {lawyer.rating}</Text>
                  <Text style={styles.lawyerCases}>{lawyer.cases} cases</Text>
                  <Text style={styles.lawyerRate}>{lawyer.hourlyRate}</Text>
                </View>
              </View>
              <View style={[styles.statusIndicator, { backgroundColor: lawyer.status === 'Active' ? '#4CAF50' : '#FF9800' }]} />
            </TouchableOpacity>
            
            {/* Remove Button */}
            <TouchableOpacity 
              style={styles.removeLawyerButton}
              onPress={() => handleRemoveLawyer(lawyer)}
            >
              <MaterialIcons name="remove-circle" size={24} color="#dc3545" />
              <Text style={styles.removeLawyerButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );

  const renderLawyerRequestsContent = () => (
    <ScrollView style={[styles.content, styles.tabContent]}>
      {lawyerRequests.length === 0 ? (
        <View style={styles.emptyLawyerRoster}>
          <MaterialIcons name="inbox" size={64} color="#ccc" />
          <Text style={styles.emptyLawyerRosterTitle}>No Pending Requests</Text>
          <Text style={styles.emptyLawyerRosterSubtitle}>
            All lawyer applications will appear here for review
          </Text>
        </View>
      ) : (
        lawyerRequests.map((request, index) => (
          <View key={index} style={styles.lawyerRequestCard}>
            <View style={styles.lawyerRequestHeader}>
              <View style={styles.lawyerRequestImageContainer}>
                <Image 
                  source={lawyerImages[request.image % lawyerImages.length]} 
                  style={styles.lawyerRequestImage} 
                />
              </View>
              <View style={styles.lawyerRequestInfo}>
                <Text style={styles.lawyerRequestName}>{request.name}</Text>
                <Text style={styles.lawyerRequestSpecialty}>{request.specialty}</Text>
                <Text style={styles.lawyerRequestExperience}>{request.experience} experience</Text>
              </View>
              <View style={styles.lawyerRequestStatus}>
                <View style={styles.lawyerRequestStatusBadge}>
                  <Text style={styles.lawyerRequestStatusText}>Pending</Text>
                </View>
                <Text style={styles.lawyerRequestDate}>
                  {new Date(request.requestDate).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View style={styles.lawyerRequestDetails}>
              <View style={styles.lawyerRequestDetailRow}>
                <MaterialIcons name="email" size={16} color="#666" />
                <Text style={styles.lawyerRequestDetailText}>{request.email}</Text>
              </View>
              <View style={styles.lawyerRequestDetailRow}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={styles.lawyerRequestDetailText}>{request.phone}</Text>
              </View>
              <View style={styles.lawyerRequestDetailRow}>
                <MaterialIcons name="school" size={16} color="#666" />
                <Text style={styles.lawyerRequestDetailText}>{request.education}</Text>
              </View>
              <View style={styles.lawyerRequestDetailRow}>
                <MaterialIcons name="gavel" size={16} color="#666" />
                <Text style={styles.lawyerRequestDetailText}>{request.barAdmission}</Text>
              </View>
            </View>

            <View style={styles.lawyerRequestCoverLetter}>
              <Text style={styles.lawyerRequestCoverLetterTitle}>Cover Letter</Text>
              <Text style={styles.lawyerRequestCoverLetterText} numberOfLines={3}>
                {request.coverLetter}
              </Text>
            </View>

            <View style={styles.lawyerRequestActions}>
              <TouchableOpacity 
                style={styles.lawyerRequestRejectButton}
                onPress={() => handleRejectLawyerRequest(request)}
              >
                <MaterialIcons name="close" size={20} color="#dc3545" />
                <Text style={styles.lawyerRequestRejectText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.lawyerRequestViewButton}
                onPress={() => handleViewLawyerRequest(request)}
              >
                <MaterialIcons name="visibility" size={20} color="#2E4A6B" />
                <Text style={styles.lawyerRequestViewText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.lawyerRequestAcceptButton}
                onPress={() => handleAcceptLawyerRequest(request)}
              >
                <MaterialIcons name="check" size={20} color="#ffffff" />
                <Text style={styles.lawyerRequestAcceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

  const renderClientRosterContent = () => (
    <ScrollView style={[styles.content, styles.tabContent]}>
      {firmClients.length === 0 ? (
        <View style={styles.emptyLawyerRoster}>
          <MaterialIcons name="people-outline" size={64} color="#ccc" />
          <Text style={styles.emptyLawyerRosterTitle}>No Clients Yet</Text>
          <Text style={styles.emptyLawyerRosterSubtitle}>
            Your firm's clients will appear here once they are added
          </Text>
        </View>
      ) : (
        firmClients.map((client, index) => (
          <View key={index} style={styles.clientCard}>
            <View style={styles.clientCardHeader}>
              <View style={styles.clientImageContainer}>
                <Image source={client.image} style={styles.clientImage} />
              </View>
              <View style={styles.clientInfo}>
                <View style={styles.clientNameRow}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <View style={[styles.clientStatusBadge, 
                    client.status === 'Active' ? styles.clientStatusActive : styles.clientStatusInactive
                  ]}>
                    <Text style={[styles.clientStatusText,
                      client.status === 'Active' ? styles.clientStatusTextActive : styles.clientStatusTextInactive
                    ]}>
                      {client.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.clientType}>{client.type} Client</Text>
                <Text style={styles.clientContact}>{client.contactPerson}</Text>
              </View>
            </View>

            <View style={styles.clientDetails}>
              <View style={styles.clientDetailRow}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={styles.clientDetailText}>{client.phone}</Text>
              </View>
              <View style={styles.clientDetailRow}>
                <MaterialIcons name="email" size={16} color="#666" />
                <Text style={styles.clientDetailText}>{client.email}</Text>
              </View>
              <View style={styles.clientDetailRow}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.clientDetailText}>{client.address}</Text>
              </View>
            </View>

            <View style={styles.clientStats}>
              <View style={styles.clientStatItem}>
                <Text style={styles.clientStatNumber}>{client.totalCases}</Text>
                <Text style={styles.clientStatLabel}>Cases</Text>
              </View>
              <View style={styles.clientStatItem}>
                <Text style={styles.clientStatNumber}>{client.totalValue}</Text>
                <Text style={styles.clientStatLabel}>Total Value</Text>
              </View>
              <TouchableOpacity 
                style={styles.clientViewButton}
                onPress={() => {
                  setSelectedClient(client);
                  setShowClientDetails(true);
                }}
              >
                <MaterialIcons name="visibility" size={20} color="#2E4A6B" />
                <Text style={styles.clientViewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

  // Client Details Screen (similar to User Details in LawyerApp.js)
  const renderClientDetailsScreen = () => {
    if (!selectedClient) return null;

    return (
      <View style={styles.clientDetailsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.clientDetailsHeader}>
          <TouchableOpacity 
            style={styles.clientDetailsBackButton}
            onPress={() => setShowClientDetails(false)}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.clientDetailsTitle}>Client Profile</Text>
          <View style={styles.clientDetailsPlaceholder} />
        </View>

        <ScrollView style={styles.clientDetailsScrollContent} showsVerticalScrollIndicator={false}>
          {/* Client Hero Section */}
          <View style={styles.clientDetailsHeroSection}>
            <View style={styles.clientDetailsHeroBackground}>
              <View style={styles.clientDetailsHeroOverlay} />
              <View style={styles.clientDetailsHeroContent}>
                <View style={styles.clientDetailsHeroInfo}>
                  <View style={styles.clientDetailsImageContainer}>
                    <Image source={selectedClient.image} style={styles.clientDetailsHeroImage} />
                  </View>
                  <Text style={styles.clientDetailsHeroTitle}>{selectedClient.name}</Text>
                  <Text style={styles.clientDetailsHeroSubtitle}>{selectedClient.type} Client</Text>
                  <View style={styles.clientDetailsStatsRow}>
                    <View style={styles.clientDetailsStat}>
                      <Text style={styles.clientDetailsStatNumber}>{selectedClient.totalCases}</Text>
                      <Text style={styles.clientDetailsStatLabel}>Cases</Text>
                    </View>
                    <View style={styles.clientDetailsStatDivider} />
                    <View style={styles.clientDetailsStat}>
                      <Text style={styles.clientDetailsStatNumber}>{selectedClient.totalValue}</Text>
                      <Text style={styles.clientDetailsStatLabel}>Total Value</Text>
                    </View>
                    <View style={styles.clientDetailsStatDivider} />
                    <View style={styles.clientDetailsStat}>
                      <Text style={styles.clientDetailsStatNumber}>{selectedClient.status}</Text>
                      <Text style={styles.clientDetailsStatLabel}>Status</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.clientDetailsContactCard}>
            <View style={styles.clientDetailsContactHeader}>
              <View style={styles.clientDetailsContactIcon}>
                <MaterialIcons name="phone" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.clientDetailsContactTitle}>Contact Information</Text>
            </View>
            <View style={styles.clientDetailsContactInfo}>
              <View style={styles.clientDetailsContactItem}>
                <MaterialIcons name="person" size={16} color="#6c757d" />
                <Text style={styles.clientDetailsContactText}>{selectedClient.contactPerson}</Text>
              </View>
              <View style={styles.clientDetailsContactItem}>
                <MaterialIcons name="email" size={16} color="#6c757d" />
                <Text style={styles.clientDetailsContactText}>{selectedClient.email}</Text>
              </View>
              <View style={styles.clientDetailsContactItem}>
                <MaterialIcons name="phone" size={16} color="#6c757d" />
                <Text style={styles.clientDetailsContactText}>{selectedClient.phone}</Text>
              </View>
              <View style={styles.clientDetailsContactItem}>
                <MaterialIcons name="location-on" size={16} color="#6c757d" />
                <Text style={styles.clientDetailsContactText}>{selectedClient.address}</Text>
              </View>
            </View>
          </View>

          {/* Client Type & Business Info */}
          <View style={styles.clientDetailsBusinessCard}>
            <View style={styles.clientDetailsBusinessHeader}>
              <View style={styles.clientDetailsBusinessIcon}>
                <MaterialIcons name="business" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.clientDetailsBusinessTitle}>Business Information</Text>
            </View>
            <View style={styles.clientDetailsBusinessInfo}>
              <View style={styles.clientDetailsBusinessItem}>
                <Text style={styles.clientDetailsBusinessLabel}>Client Type:</Text>
                <Text style={styles.clientDetailsBusinessValue}>{selectedClient.type}</Text>
              </View>
              <View style={styles.clientDetailsBusinessItem}>
                <Text style={styles.clientDetailsBusinessLabel}>Primary Contact:</Text>
                <Text style={styles.clientDetailsBusinessValue}>{selectedClient.contactPerson}</Text>
              </View>
              <View style={styles.clientDetailsBusinessItem}>
                <Text style={styles.clientDetailsBusinessLabel}>Account Status:</Text>
                <View style={[styles.clientDetailsStatusBadge, 
                  selectedClient.status === 'Active' ? styles.clientDetailsStatusActive : styles.clientDetailsStatusInactive
                ]}>
                  <Text style={[styles.clientDetailsStatusText,
                    selectedClient.status === 'Active' ? styles.clientDetailsStatusTextActive : styles.clientDetailsStatusTextInactive
                  ]}>
                    {selectedClient.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Case Summary */}
          <View style={styles.clientDetailsCasesCard}>
            <View style={styles.clientDetailsCasesHeader}>
              <View style={styles.clientDetailsCasesIcon}>
                <MaterialIcons name="folder" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.clientDetailsCasesTitle}>Case Summary</Text>
            </View>
            <View style={styles.clientDetailsCasesInfo}>
              <View style={styles.clientDetailsCasesStats}>
                <View style={styles.clientDetailsCasesStat}>
                  <Text style={styles.clientDetailsCasesStatNumber}>{selectedClient.totalCases}</Text>
                  <Text style={styles.clientDetailsCasesStatLabel}>Total Cases</Text>
                </View>
                <View style={styles.clientDetailsCasesStat}>
                  <Text style={styles.clientDetailsCasesStatNumber}>{selectedClient.totalValue}</Text>
                  <Text style={styles.clientDetailsCasesStatLabel}>Total Value</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.clientDetailsActionsCard}>
            <View style={styles.clientDetailsActionsHeader}>
              <View style={styles.clientDetailsActionsIcon}>
                <MaterialIcons name="settings" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.clientDetailsActionsTitle}>Quick Actions</Text>
            </View>
            <View style={styles.clientDetailsActionsGrid}>
              <TouchableOpacity style={styles.clientDetailsActionButton}>
                <MaterialIcons name="add" size={24} color="#2E4A6B" />
                <Text style={styles.clientDetailsActionText}>New Case</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.clientDetailsActionButton}>
                <MaterialIcons name="event" size={24} color="#2E4A6B" />
                <Text style={styles.clientDetailsActionText}>Schedule Meeting</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.clientDetailsActionButton}>
                <MaterialIcons name="email" size={24} color="#2E4A6B" />
                <Text style={styles.clientDetailsActionText}>Send Email</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.clientDetailsActionButton}>
                <MaterialIcons name="receipt" size={24} color="#2E4A6B" />
                <Text style={styles.clientDetailsActionText}>Generate Invoice</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Bottom Spacing */}
          <View style={styles.clientDetailsBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Lawyer Detail Screen (based on App.js implementation)
  const renderLawyerDetailScreen = () => {
    if (!selectedLawyer) return null;

    return (
      <View style={styles.lawyerDetailContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.lawyerDetailHeader}>
          <TouchableOpacity 
            style={styles.lawyerDetailBackButton}
            onPress={() => setShowLawyerDetails(false)}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
          <Text style={styles.lawyerDetailTitle}>Lawyer Profile</Text>
          <TouchableOpacity style={styles.lawyerDetailFavorite}>
            <MaterialIcons name="favorite-border" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

        <ScrollView style={styles.lawyerDetailScroll} showsVerticalScrollIndicator={false}>
          {/* Hero Profile Section */}
          <View style={styles.lawyerDetailHeroSection}>
            <View style={styles.lawyerDetailProfileImageContainer}>
              <Image source={selectedLawyer.profileImage} style={styles.lawyerDetailProfileImage} />
        </View>
            <Text style={styles.lawyerDetailProfileName}>{selectedLawyer.name}</Text>
            <Text style={styles.lawyerDetailProfileSpecialty}>{selectedLawyer.specialty}</Text>
            
            {/* Quick Stats */}
            <View style={styles.lawyerDetailQuickStats}>
              <View style={styles.lawyerDetailQuickStat}>
                <Text style={styles.lawyerDetailQuickStatValue}>{selectedLawyer.rating}</Text>
                <Text style={styles.lawyerDetailQuickStatLabel}>Rating</Text>
          </View>
              <View style={styles.lawyerDetailQuickStat}>
                <Text style={styles.lawyerDetailQuickStatValue}>{selectedLawyer.cases}</Text>
                <Text style={styles.lawyerDetailQuickStatLabel}>Cases</Text>
          </View>
              <View style={styles.lawyerDetailQuickStat}>
                <Text style={styles.lawyerDetailQuickStatValue}>{selectedLawyer.hourlyRate}</Text>
                <Text style={styles.lawyerDetailQuickStatLabel}>Rate</Text>
          </View>
          </View>
        </View>

          {/* About Section */}
          <View style={styles.lawyerDetailSection}>
            <Text style={styles.lawyerDetailSectionTitle}>About</Text>
            <Text style={styles.lawyerDetailSectionText}>{selectedLawyer.description}</Text>
          </View>

          {/* Experience & Education */}
          <View style={styles.lawyerDetailSection}>
            <Text style={styles.lawyerDetailSectionTitle}>Professional Information</Text>
            
            <View style={styles.lawyerDetailInfoRow}>
              <MaterialIcons name="school" size={20} color="#2E4A6B" />
              <View style={styles.lawyerDetailInfoContent}>
                <Text style={styles.lawyerDetailInfoLabel}>Education</Text>
                <Text style={styles.lawyerDetailInfoValue}>{selectedLawyer.education}</Text>
              </View>
            </View>

            <View style={styles.lawyerDetailInfoRow}>
              <MaterialIcons name="gavel" size={20} color="#2E4A6B" />
              <View style={styles.lawyerDetailInfoContent}>
                <Text style={styles.lawyerDetailInfoLabel}>Bar Admission</Text>
                <Text style={styles.lawyerDetailInfoValue}>{selectedLawyer.barAdmission}</Text>
              </View>
            </View>

            <View style={styles.lawyerDetailInfoRow}>
              <MaterialIcons name="work" size={20} color="#2E4A6B" />
              <View style={styles.lawyerDetailInfoContent}>
                <Text style={styles.lawyerDetailInfoLabel}>Experience</Text>
                <Text style={styles.lawyerDetailInfoValue}>{selectedLawyer.experience}</Text>
              </View>
            </View>

            <View style={styles.lawyerDetailInfoRow}>
              <MaterialIcons name="trending-up" size={20} color="#2E4A6B" />
              <View style={styles.lawyerDetailInfoContent}>
                <Text style={styles.lawyerDetailInfoLabel}>Success Rate</Text>
                <Text style={styles.lawyerDetailInfoValue}>{selectedLawyer.successRate}</Text>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.lawyerDetailSection}>
            <Text style={styles.lawyerDetailSectionTitle}>Contact Information</Text>
            
            <View style={styles.lawyerDetailInfoRow}>
              <MaterialIcons name="phone" size={20} color="#2E4A6B" />
              <View style={styles.lawyerDetailInfoContent}>
                <Text style={styles.lawyerDetailInfoLabel}>Phone</Text>
                <Text style={styles.lawyerDetailInfoValue}>{selectedLawyer.phone}</Text>
              </View>
            </View>

            <View style={styles.lawyerDetailInfoRow}>
              <MaterialIcons name="email" size={20} color="#2E4A6B" />
              <View style={styles.lawyerDetailInfoContent}>
                <Text style={styles.lawyerDetailInfoLabel}>Email</Text>
                <Text style={styles.lawyerDetailInfoValue}>{selectedLawyer.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.lawyerDetailBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Choose Lawyer Screen
  const renderChooseLawyerScreen = () => {
    // Filter lawyers based on search query
    const filteredLawyers = allAvailableLawyers.filter(lawyer => {
      const searchLower = searchQuery.toLowerCase();
      return (
        lawyer.name.toLowerCase().includes(searchLower) ||
        lawyer.email.toLowerCase().includes(searchLower) ||
        lawyer.phone.includes(searchQuery) ||
        lawyer.specialty.toLowerCase().includes(searchLower)
      );
    });

    const handleAddLawyerToFirm = (lawyer) => {
      // Check if lawyer is already in firm
      const isAlreadyInFirm = firmLawyers.some(firmLawyer => firmLawyer.id === lawyer.id);
      
      if (isAlreadyInFirm) {
        showCustomAlert(
          'warning',
          'Lawyer Already Added',
          'This lawyer is already part of your firm.',
          [{ text: 'OK', style: 'primary' }]
        );
        return;
      }

      // Add lawyer to firm
      const newLawyer = {
        ...lawyer,
        status: 'Active'
      };
      
      setFirmLawyers(prev => [...prev, newLawyer]);
      setShowChooseLawyer(false);
      
      showCustomAlert(
        'success',
        'Lawyer Added Successfully',
        `${lawyer.name} has been added to your law firm.`,
        [{ text: 'OK', style: 'primary' }]
      );
    };

    return (
      <View style={styles.chooseLawyerContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.chooseLawyerHeader}>
          <TouchableOpacity 
            style={styles.chooseLawyerBackButton}
            onPress={() => {
              setShowChooseLawyer(false);
              setSearchQuery('');
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
          <Text style={styles.chooseLawyerTitle}>Choose Lawyer</Text>
          <View style={styles.chooseLawyerPlaceholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.chooseLawyerSearchContainer}>
          <View style={styles.chooseLawyerSearchBar}>
            <MaterialIcons name="search" size={20} color="#666" />
            <TextInput
              style={styles.chooseLawyerSearchInput}
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="clear" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView style={styles.chooseLawyerContent}>
          {filteredLawyers.length === 0 ? (
            <View style={styles.chooseLawyerNoResults}>
              <MaterialIcons name="search-off" size={48} color="#ccc" />
              <Text style={styles.chooseLawyerNoResultsText}>No lawyers found</Text>
              <Text style={styles.chooseLawyerNoResultsSubtext}>
                Try adjusting your search criteria
              </Text>
            </View>
          ) : (
            filteredLawyers.map((lawyer, index) => {
              const isAlreadyInFirm = firmLawyers.some(firmLawyer => firmLawyer.id === lawyer.id);
              
              return (
                <View key={lawyer.id} style={styles.chooseLawyerCard}>
                  <TouchableOpacity 
                    style={styles.chooseLawyerCardContent}
                    onPress={() => {
                      setSelectedLawyer(lawyer);
                      setShowLawyerDetails(true);
                    }}
                  >
                    <Image source={lawyer.image} style={styles.chooseLawyerImage} />
                    <View style={styles.chooseLawyerInfo}>
                      <Text style={styles.chooseLawyerName}>{lawyer.name}</Text>
                      <Text style={styles.chooseLawyerSpecialty}>{lawyer.specialty}</Text>
                      <Text style={styles.chooseLawyerExperience}>{lawyer.experience} experience</Text>
                      <View style={styles.chooseLawyerStats}>
                        <Text style={styles.chooseLawyerRating}>⭐ {lawyer.rating}</Text>
                        <Text style={styles.chooseLawyerCases}>{lawyer.cases} cases</Text>
                        <Text style={styles.chooseLawyerRate}>{lawyer.hourlyRate}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.chooseLawyerAddButton,
                      isAlreadyInFirm && styles.chooseLawyerAddButtonDisabled
                    ]}
                    onPress={() => handleAddLawyerToFirm(lawyer)}
                    disabled={isAlreadyInFirm}
                  >
                    <MaterialIcons 
                      name={isAlreadyInFirm ? "check" : "add"} 
                      size={20} 
                      color={isAlreadyInFirm ? "#666" : "#ffffff"} 
                    />
                    <Text style={[
                      styles.chooseLawyerAddButtonText,
                      isAlreadyInFirm && styles.chooseLawyerAddButtonTextDisabled
                    ]}>
                      {isAlreadyInFirm ? "Added" : "Add"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
          
          <View style={styles.chooseLawyerBottomSpacing} />
      </ScrollView>
    </View>
  );
  };

  // Remove Lawyer Confirmation Screen
  const renderRemoveLawyerConfirmationScreen = () => {
    if (!lawyerToRemove) return null;

    return (
      <View style={styles.removeLawyerConfirmationContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.removeLawyerConfirmationHeader}>
          <TouchableOpacity 
            style={styles.removeLawyerConfirmationBackButton}
            onPress={cancelRemoveLawyer}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.removeLawyerConfirmationTitle}>Remove Lawyer</Text>
          <View style={styles.removeLawyerConfirmationPlaceholder} />
        </View>

        <ScrollView style={styles.removeLawyerConfirmationContent}>
          {/* Warning Section */}
          <View style={styles.removeLawyerWarningSection}>
            <View style={styles.removeLawyerWarningIcon}>
              <MaterialIcons name="warning" size={48} color="#dc3545" />
            </View>
            <Text style={styles.removeLawyerWarningTitle}>Confirm Removal</Text>
            <Text style={styles.removeLawyerWarningText}>
              Are you sure you want to remove this lawyer from your firm? This action cannot be undone.
            </Text>
          </View>

          {/* Lawyer Information Card */}
          <View style={styles.removeLawyerInfoCard}>
            <View style={styles.removeLawyerInfoHeader}>
              <Image source={lawyerToRemove.image} style={styles.removeLawyerInfoImage} />
              <View style={styles.removeLawyerInfoDetails}>
                <Text style={styles.removeLawyerInfoName}>{lawyerToRemove.name}</Text>
                <Text style={styles.removeLawyerInfoSpecialty}>{lawyerToRemove.specialty}</Text>
                <Text style={styles.removeLawyerInfoExperience}>{lawyerToRemove.experience} experience</Text>
              </View>
            </View>
            
            <View style={styles.removeLawyerInfoStats}>
              <View style={styles.removeLawyerInfoStat}>
                <Text style={styles.removeLawyerInfoStatValue}>⭐ {lawyerToRemove.rating}</Text>
                <Text style={styles.removeLawyerInfoStatLabel}>Rating</Text>
              </View>
              <View style={styles.removeLawyerInfoStat}>
                <Text style={styles.removeLawyerInfoStatValue}>{lawyerToRemove.cases}</Text>
                <Text style={styles.removeLawyerInfoStatLabel}>Cases</Text>
              </View>
              <View style={styles.removeLawyerInfoStat}>
                <Text style={styles.removeLawyerInfoStatValue}>{lawyerToRemove.hourlyRate}</Text>
                <Text style={styles.removeLawyerInfoStatLabel}>Rate</Text>
              </View>
            </View>
          </View>

          {/* Impact Notice */}
          <View style={styles.removeLawyerImpactSection}>
            <Text style={styles.removeLawyerImpactTitle}>What happens when you remove this lawyer:</Text>
            <View style={styles.removeLawyerImpactItem}>
              <MaterialIcons name="info" size={20} color="#666" />
              <Text style={styles.removeLawyerImpactText}>
                They will no longer appear in your firm's lawyer roster
              </Text>
            </View>
            <View style={styles.removeLawyerImpactItem}>
              <MaterialIcons name="info" size={20} color="#666" />
              <Text style={styles.removeLawyerImpactText}>
                Their active cases may need to be reassigned
              </Text>
            </View>
            <View style={styles.removeLawyerImpactItem}>
              <MaterialIcons name="info" size={20} color="#666" />
              <Text style={styles.removeLawyerImpactText}>
                You can add them back later from the available lawyers list
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.removeLawyerConfirmationActions}>
          <TouchableOpacity 
            style={styles.removeLawyerCancelButton}
            onPress={cancelRemoveLawyer}
          >
            <Text style={styles.removeLawyerCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.removeLawyerConfirmButton}
            onPress={confirmRemoveLawyer}
          >
            <MaterialIcons name="remove-circle" size={20} color="#ffffff" />
            <Text style={styles.removeLawyerConfirmButtonText}>Remove Lawyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Appointments Management Screen
  const renderAppointmentsScreen = () => {
    const allAppointments = appointmentRequests;
    const pendingAppointments = appointmentRequests.filter(appointment => appointment.status === 'pending');
    const acceptedAppointments = appointmentRequests.filter(appointment => appointment.status === 'accepted');
    const declinedAppointments = appointmentRequests.filter(appointment => appointment.status === 'declined');

    // Get current appointments based on active tab
    const getCurrentAppointments = () => {
      switch (activeAppointmentTab) {
        case 'all':
          return allAppointments;
        case 'pending':
          return pendingAppointments;
        case 'accepted':
          return acceptedAppointments;
        case 'declined':
          return declinedAppointments;
        default:
          return pendingAppointments;
      }
    };

    const currentAppointments = getCurrentAppointments();

    const renderAppointmentCard = (appointment, showActions = false) => (
      <TouchableOpacity 
        key={appointment.id} 
        style={[
          styles.appointmentCard,
          appointment.status === 'accepted' && styles.appointmentCardAccepted,
          appointment.status === 'declined' && styles.appointmentCardDeclined
        ]}
        onPress={() => handleViewAppointmentDetails(appointment)}
        activeOpacity={0.7}
      >
        <View style={styles.appointmentCardHeader}>
          <Image source={appointment.clientImage} style={styles.appointmentClientImage} />
          <View style={styles.appointmentClientInfo}>
            <Text style={styles.appointmentClientName}>{appointment.clientName}</Text>
            <Text style={styles.appointmentType}>{appointment.appointmentType}</Text>
            <Text style={styles.appointmentLegalArea}>{appointment.legalArea}</Text>
            {appointment.status === 'accepted' && appointment.assignedLawyer && (
              <Text style={styles.appointmentAssignedLawyer}>
                Assigned to: {appointment.assignedLawyer.name}
              </Text>
            )}
            {appointment.status === 'declined' && (
              <Text style={styles.appointmentDeclinedText}>
                Declined on: {appointment.declinedDate}
              </Text>
            )}
          </View>
          
          {/* Status Badge */}
          {appointment.status === 'pending' && (
            <View style={[
              styles.appointmentUrgencyBadge,
              { backgroundColor: appointment.urgency === 'High' ? '#ffebee' : 
                                appointment.urgency === 'Medium' ? '#fff3e0' : '#f3e5f5' }
            ]}>
              <Text style={[
                styles.appointmentUrgencyText,
                { color: appointment.urgency === 'High' ? '#c62828' : 
                        appointment.urgency === 'Medium' ? '#ef6c00' : '#7b1fa2' }
              ]}>
                {appointment.urgency}
              </Text>
            </View>
          )}
          
          {appointment.status === 'accepted' && (
            <View style={styles.appointmentStatusBadge}>
              <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.appointmentStatusText}>Accepted</Text>
            </View>
          )}
          
          {appointment.status === 'declined' && (
            <View style={[styles.appointmentStatusBadge, styles.appointmentStatusBadgeDeclined]}>
              <MaterialIcons name="cancel" size={16} color="#dc3545" />
              <Text style={[styles.appointmentStatusText, styles.appointmentStatusTextDeclined]}>Declined</Text>
            </View>
          )}
        </View>

        <View style={styles.appointmentDetails}>
          <View style={styles.appointmentDetailRow}>
            <MaterialIcons name="event" size={16} color="#666" />
            <Text style={styles.appointmentDetailText}>
              Preferred: {appointment.preferredDate} at {appointment.preferredTime}
            </Text>
          </View>
          <View style={styles.appointmentDetailRow}>
            <MaterialIcons name="schedule" size={16} color="#666" />
            <Text style={styles.appointmentDetailText}>
              Duration: {appointment.estimatedDuration}
            </Text>
          </View>
          <View style={styles.appointmentDetailRow}>
            <MaterialIcons name="phone" size={16} color="#666" />
            <Text style={styles.appointmentDetailText}>{appointment.clientPhone}</Text>
          </View>
        </View>

        {activeAppointmentTab === 'all' || activeAppointmentTab === 'pending' ? (
          <View style={styles.appointmentDescription}>
            <Text style={styles.appointmentDescriptionTitle}>Description:</Text>
            <Text style={styles.appointmentDescriptionText}>{appointment.description}</Text>
          </View>
        ) : null}

        {/* Actions for pending appointments */}
        {showActions && appointment.status === 'pending' && (
          <View style={styles.appointmentActions}>
            <TouchableOpacity 
              style={styles.appointmentDeclineButton}
              onPress={() => handleAppointmentDecline(appointment.id)}
            >
              <MaterialIcons name="close" size={18} color="#dc3545" />
              <Text style={styles.appointmentDeclineButtonText}>Decline</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.appointmentAcceptButton}
              onPress={() => handleAppointmentAccept(appointment)}
            >
              <MaterialIcons name="check" size={18} color="#ffffff" />
              <Text style={styles.appointmentAcceptButtonText}>Accept & Assign</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );

    return (
      <View style={styles.appointmentsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.appointmentsHeader}>
          <TouchableOpacity 
            style={styles.appointmentsBackButton}
            onPress={() => {
              setShowAppointments(false);
              setLawfirmCurrentScreen('home');
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.appointmentsTitle}>Appointments</Text>
          <View style={styles.appointmentsHeaderActions}>
            <TouchableOpacity 
              style={styles.appointmentsActionButton}
              onPress={() => setShowNotifications(true)}
            >
              <MaterialIcons name="notifications" size={24} color="#ffffff" />
              {notifications.filter(n => !n.read).length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notifications.filter(n => !n.read).length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.appointmentsActionButton}
              onPress={() => setShowSettings(true)}
            >
              <MaterialIcons name="settings" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.appointmentTabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.appointmentTabsContent}
          >
            <TouchableOpacity 
              style={[
                styles.appointmentTab,
                activeAppointmentTab === 'pending' && styles.appointmentTabActive
              ]}
              onPress={() => setActiveAppointmentTab('pending')}
            >
              <Text style={[
                styles.appointmentTabText,
                activeAppointmentTab === 'pending' && styles.appointmentTabTextActive
              ]}>
                Pending
              </Text>
              {pendingAppointments.length > 0 && (
                <View style={styles.appointmentTabBadge}>
                  <Text style={styles.appointmentTabBadgeText}>{pendingAppointments.length}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.appointmentTab,
                activeAppointmentTab === 'accepted' && styles.appointmentTabActive
              ]}
              onPress={() => setActiveAppointmentTab('accepted')}
            >
              <Text style={[
                styles.appointmentTabText,
                activeAppointmentTab === 'accepted' && styles.appointmentTabTextActive
              ]}>
                Accepted
              </Text>
              {acceptedAppointments.length > 0 && (
                <View style={[styles.appointmentTabBadge, styles.appointmentTabBadgeAccepted]}>
                  <Text style={styles.appointmentTabBadgeText}>{acceptedAppointments.length}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.appointmentTab,
                activeAppointmentTab === 'declined' && styles.appointmentTabActive
              ]}
              onPress={() => setActiveAppointmentTab('declined')}
            >
              <Text style={[
                styles.appointmentTabText,
                activeAppointmentTab === 'declined' && styles.appointmentTabTextActive
              ]}>
                Declined
              </Text>
              {declinedAppointments.length > 0 && (
                <View style={[styles.appointmentTabBadge, styles.appointmentTabBadgeDeclined]}>
                  <Text style={styles.appointmentTabBadgeText}>{declinedAppointments.length}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.appointmentTab,
                activeAppointmentTab === 'all' && styles.appointmentTabActive
              ]}
              onPress={() => setActiveAppointmentTab('all')}
            >
              <Text style={[
                styles.appointmentTabText,
                activeAppointmentTab === 'all' && styles.appointmentTabTextActive
              ]}>
                All
              </Text>
              <View style={[styles.appointmentTabBadge, styles.appointmentTabBadgeAll]}>
                <Text style={styles.appointmentTabBadgeText}>{allAppointments.length}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <ScrollView style={styles.appointmentsContent}>
          {/* Current Tab Content */}
          {currentAppointments.length > 0 ? (
            <>
              <View style={styles.appointmentsSectionHeader}>
                <Text style={styles.appointmentsSectionTitle}>
                  {activeAppointmentTab === 'all' ? 'All Appointments' :
                   activeAppointmentTab === 'pending' ? 'Pending Requests' :
                   activeAppointmentTab === 'accepted' ? 'Accepted Appointments' :
                   'Declined Appointments'}
                </Text>
                <Text style={styles.appointmentsSectionSubtitle}>
                  {currentAppointments.length} appointment{currentAppointments.length !== 1 ? 's' : ''} 
                  {activeAppointmentTab === 'pending' && ' awaiting your response'}
                  {activeAppointmentTab === 'accepted' && ' scheduled'}
                  {activeAppointmentTab === 'declined' && ' declined'}
                </Text>
              </View>

              {currentAppointments.map((appointment) => 
                renderAppointmentCard(appointment, activeAppointmentTab === 'pending' || activeAppointmentTab === 'all')
              )}
            </>
          ) : (
            <View style={styles.appointmentsEmptyState}>
              <MaterialIcons 
                name={
                  activeAppointmentTab === 'pending' ? 'event-note' :
                  activeAppointmentTab === 'accepted' ? 'event-available' :
                  activeAppointmentTab === 'declined' ? 'event-busy' :
                  'event'
                } 
                size={64} 
                color="#ccc" 
              />
              <Text style={styles.appointmentsEmptyTitle}>
                {activeAppointmentTab === 'pending' && 'No Pending Appointments'}
                {activeAppointmentTab === 'accepted' && 'No Accepted Appointments'}
                {activeAppointmentTab === 'declined' && 'No Declined Appointments'}
                {activeAppointmentTab === 'all' && 'No Appointments'}
              </Text>
              <Text style={styles.appointmentsEmptySubtitle}>
                {activeAppointmentTab === 'pending' && 'New appointment requests will appear here'}
                {activeAppointmentTab === 'accepted' && 'Accepted appointments will appear here'}
                {activeAppointmentTab === 'declined' && 'Declined appointments will appear here'}
                {activeAppointmentTab === 'all' && 'All appointment requests will appear here'}
              </Text>
            </View>
          )}

          <View style={styles.appointmentsBottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'home' && styles.activeNavItem]}
            onPress={() => {
              setShowAppointments(false);
              setLawfirmCurrentScreen('home');
            }}
          >
            <MaterialIcons name="home" size={24} color={lawfirmCurrentScreen === 'home' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'home' && styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'lawyers' && styles.activeNavItem]}
            onPress={() => {
              setShowAppointments(false);
              setLawfirmCurrentScreen('lawyers');
              setShowLawyerRoster(true);
            }}
          >
            <MaterialIcons name="people" size={24} color={lawfirmCurrentScreen === 'lawyers' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'lawyers' && styles.activeNavText]}>Lawyers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'cases' && styles.activeNavItem]}
            onPress={() => {
              setShowAppointments(false);
              setLawfirmCurrentScreen('cases');
              setShowCaseManagement(true);
            }}
          >
            <MaterialIcons name="folder" size={24} color={lawfirmCurrentScreen === 'cases' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'cases' && styles.activeNavText]}>Cases</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'appointments' && styles.activeNavItem]}
            onPress={() => setLawfirmCurrentScreen('appointments')}
          >
            <MaterialIcons name="event" size={24} color={lawfirmCurrentScreen === 'appointments' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'appointments' && styles.activeNavText]}>Appointments</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'profile' && styles.activeNavItem]}
            onPress={() => {
              setShowAppointments(false);
              setLawfirmCurrentScreen('profile');
            }}
          >
            <MaterialIcons name="person" size={24} color={lawfirmCurrentScreen === 'profile' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'profile' && styles.activeNavText]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Appointment Details Screen
  const renderAppointmentDetailsScreen = () => {
    if (!selectedAppointment) return null;

    return (
      <View style={styles.appointmentDetailsContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.appointmentDetailsHeader}>
          <TouchableOpacity 
            style={styles.appointmentDetailsBackButton}
            onPress={() => setShowAppointmentDetails(false)}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.appointmentDetailsTitle}>Appointment Details</Text>
          <View style={styles.appointmentDetailsHeaderSpace} />
        </View>

        <ScrollView style={styles.appointmentDetailsContent}>
          {/* Client Information Card */}
          <View style={styles.appointmentDetailsCard}>
            <View style={styles.appointmentDetailsCardHeader}>
              <MaterialIcons name="person" size={24} color="#2E4A6B" />
              <Text style={styles.appointmentDetailsCardTitle}>Client Information</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.appointmentDetailsClientInfo}
              onPress={() => {
                // Create client object from appointment data
                const clientFromAppointment = {
                  id: selectedAppointment.id + '_client',
                  name: selectedAppointment.clientName,
                  type: 'Individual', // Default, could be enhanced
                  contactPerson: selectedAppointment.clientName,
                  phone: selectedAppointment.clientPhone,
                  email: selectedAppointment.clientEmail || 'No email provided',
                  address: 'Address not provided',
                  totalCases: 1, // Could be calculated
                  totalValue: '$0', // Default
                  status: 'Active',
                  image: selectedAppointment.clientImage
                };
                setSelectedClient(clientFromAppointment);
                setShowClientDetails(true);
              }}
            >
              <Image source={selectedAppointment.clientImage} style={styles.appointmentDetailsClientImage} />
              <View style={styles.appointmentDetailsClientDetails}>
                <Text style={styles.appointmentDetailsClientName}>{selectedAppointment.clientName}</Text>
                <Text style={styles.appointmentDetailsClientPhone}>{selectedAppointment.clientPhone}</Text>
                <Text style={styles.appointmentDetailsClientEmail}>{selectedAppointment.clientEmail || 'No email provided'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Appointment Information Card */}
          <View style={styles.appointmentDetailsCard}>
            <View style={styles.appointmentDetailsCardHeader}>
              <MaterialIcons name="event" size={24} color="#2E4A6B" />
              <Text style={styles.appointmentDetailsCardTitle}>Appointment Information</Text>
            </View>
            
            <View style={styles.appointmentDetailsInfo}>
              <View style={styles.appointmentDetailsInfoRow}>
                <Text style={styles.appointmentDetailsInfoLabel}>Type:</Text>
                <Text style={styles.appointmentDetailsInfoValue}>{selectedAppointment.appointmentType}</Text>
              </View>
              <View style={styles.appointmentDetailsInfoRow}>
                <Text style={styles.appointmentDetailsInfoLabel}>Legal Area:</Text>
                <Text style={styles.appointmentDetailsInfoValue}>{selectedAppointment.legalArea}</Text>
              </View>
              <View style={styles.appointmentDetailsInfoRow}>
                <Text style={styles.appointmentDetailsInfoLabel}>Preferred Date:</Text>
                <Text style={styles.appointmentDetailsInfoValue}>{selectedAppointment.preferredDate}</Text>
              </View>
              <View style={styles.appointmentDetailsInfoRow}>
                <Text style={styles.appointmentDetailsInfoLabel}>Preferred Time:</Text>
                <Text style={styles.appointmentDetailsInfoValue}>{selectedAppointment.preferredTime}</Text>
              </View>
              <View style={styles.appointmentDetailsInfoRow}>
                <Text style={styles.appointmentDetailsInfoLabel}>Duration:</Text>
                <Text style={styles.appointmentDetailsInfoValue}>{selectedAppointment.estimatedDuration}</Text>
              </View>
              <View style={styles.appointmentDetailsInfoRow}>
                <Text style={styles.appointmentDetailsInfoLabel}>Urgency:</Text>
                <View style={[
                  styles.appointmentDetailsUrgencyBadge,
                  { backgroundColor: selectedAppointment.urgency === 'High' ? '#ffebee' : 
                                    selectedAppointment.urgency === 'Medium' ? '#fff3e0' : '#f3e5f5' }
                ]}>
                  <Text style={[
                    styles.appointmentDetailsUrgencyText,
                    { color: selectedAppointment.urgency === 'High' ? '#c62828' : 
                            selectedAppointment.urgency === 'Medium' ? '#ef6c00' : '#7b1fa2' }
                  ]}>
                    {selectedAppointment.urgency}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Status Information Card */}
          <View style={styles.appointmentDetailsCard}>
            <View style={styles.appointmentDetailsCardHeader}>
              <MaterialIcons 
                name={
                  selectedAppointment.status === 'pending' ? 'schedule' :
                  selectedAppointment.status === 'accepted' ? 'check-circle' : 'cancel'
                } 
                size={24} 
                color={
                  selectedAppointment.status === 'pending' ? '#FFA726' :
                  selectedAppointment.status === 'accepted' ? '#4CAF50' : '#dc3545'
                } 
              />
              <Text style={styles.appointmentDetailsCardTitle}>Status Information</Text>
            </View>
            
            <View style={styles.appointmentDetailsStatusInfo}>
              <View style={styles.appointmentDetailsInfoRow}>
                <Text style={styles.appointmentDetailsInfoLabel}>Current Status:</Text>
                <View style={[
                  styles.appointmentDetailsStatusBadge,
                  { backgroundColor: 
                    selectedAppointment.status === 'pending' ? '#fff3e0' :
                    selectedAppointment.status === 'accepted' ? '#E8F5E8' : '#ffebee'
                  }
                ]}>
                  <Text style={[
                    styles.appointmentDetailsStatusText,
                    { color: 
                      selectedAppointment.status === 'pending' ? '#ef6c00' :
                      selectedAppointment.status === 'accepted' ? '#4CAF50' : '#dc3545'
                    }
                  ]}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              {selectedAppointment.status === 'accepted' && selectedAppointment.assignedLawyer && (
                <>
                  <View style={styles.appointmentDetailsAssignedLawyerHeader}>
                    <Text style={styles.appointmentDetailsInfoLabel}>Assigned Lawyer:</Text>
                  </View>
                  <View style={styles.appointmentDetailsLawyerCard}>
                    <Image source={selectedAppointment.assignedLawyer.image} style={styles.appointmentDetailsLawyerImage} />
                    <View style={styles.appointmentDetailsLawyerInfo}>
                      <Text style={styles.appointmentDetailsLawyerName}>{selectedAppointment.assignedLawyer.name}</Text>
                      <Text style={styles.appointmentDetailsLawyerSpecialty}>{selectedAppointment.assignedLawyer.specialty}</Text>
                      <Text style={styles.appointmentDetailsLawyerExperience}>{selectedAppointment.assignedLawyer.experience} experience</Text>
                      <Text style={styles.appointmentDetailsLawyerEmail}>{selectedAppointment.assignedLawyer.email}</Text>
                      <View style={styles.appointmentDetailsLawyerStats}>
                        <View style={styles.appointmentDetailsLawyerStatItem}>
                          <MaterialIcons name="star" size={16} color="#4CAF50" />
                          <Text style={styles.appointmentDetailsLawyerStatText}>{selectedAppointment.assignedLawyer.rating}</Text>
                        </View>
                        <View style={styles.appointmentDetailsLawyerStatItem}>
                          <MaterialIcons name="gavel" size={16} color="#2E4A6B" />
                          <Text style={styles.appointmentDetailsLawyerStatText}>{selectedAppointment.assignedLawyer.cases} cases</Text>
                        </View>
                        <View style={styles.appointmentDetailsLawyerStatItem}>
                          <MaterialIcons name="trending-up" size={16} color="#4CAF50" />
                          <Text style={styles.appointmentDetailsLawyerStatText}>{selectedAppointment.assignedLawyer.successRate}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              )}
              
              {selectedAppointment.status === 'declined' && selectedAppointment.declinedDate && (
                <View style={styles.appointmentDetailsInfoRow}>
                  <Text style={styles.appointmentDetailsInfoLabel}>Declined On:</Text>
                  <Text style={styles.appointmentDetailsInfoValue}>{selectedAppointment.declinedDate}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Description Card */}
          <View style={styles.appointmentDetailsCard}>
            <View style={styles.appointmentDetailsCardHeader}>
              <MaterialIcons name="description" size={24} color="#2E4A6B" />
              <Text style={styles.appointmentDetailsCardTitle}>Description</Text>
            </View>
            
            <Text style={styles.appointmentDetailsDescription}>
              {selectedAppointment.description}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.appointmentDetailsActions}>
            {selectedAppointment.status === 'pending' && (
              <>
                <TouchableOpacity 
                  style={styles.appointmentDetailsDeclineButton}
                  onPress={() => {
                    handleAppointmentDecline(selectedAppointment.id);
                    setShowAppointmentDetails(false);
                  }}
                >
                  <MaterialIcons name="close" size={20} color="#dc3545" />
                  <Text style={styles.appointmentDetailsDeclineButtonText}>Decline</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.appointmentDetailsAcceptButton}
                  onPress={() => {
                    setShowAppointmentDetails(false);
                    handleAppointmentAccept(selectedAppointment);
                  }}
                >
                  <MaterialIcons name="check" size={20} color="#ffffff" />
                  <Text style={styles.appointmentDetailsAcceptButtonText}>Accept & Assign</Text>
                </TouchableOpacity>
              </>
            )}
            
            {selectedAppointment.status === 'accepted' && (
              <TouchableOpacity 
                style={styles.appointmentDetailsReassignButton}
                onPress={() => {
                  setShowAppointmentDetails(false);
                  handleReassignLawyer(selectedAppointment);
                }}
              >
                <MaterialIcons name="swap-horiz" size={20} color="#2E4A6B" />
                <Text style={styles.appointmentDetailsReassignButtonText}>Reassign Lawyer</Text>
              </TouchableOpacity>
            )}
            
            {selectedAppointment.status === 'declined' && (
              <TouchableOpacity 
                style={styles.appointmentDetailsReacceptButton}
                onPress={() => handleReacceptAppointment(selectedAppointment)}
              >
                <MaterialIcons name="refresh" size={20} color="#4CAF50" />
                <Text style={styles.appointmentDetailsReacceptButtonText}>Re-open Appointment</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.appointmentDetailsBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Reassign Lawyer Screen (similar to Assign Lawyer Screen)
  const renderReassignLawyerScreen = () => {
    if (!selectedAppointment) return null;

    const compatibleLawyers = firmLawyers.filter(lawyer => 
      lawyer.specialty.toLowerCase().includes(selectedAppointment.legalArea.toLowerCase()) ||
      selectedAppointment.legalArea.toLowerCase().includes(lawyer.specialty.toLowerCase())
    );
    
    const otherLawyers = firmLawyers.filter(lawyer => 
      !compatibleLawyers.some(compatible => compatible.id === lawyer.id)
    );

    return (
      <View style={styles.assignLawyerContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.assignLawyerHeader}>
          <TouchableOpacity 
            style={styles.assignLawyerBackButton}
            onPress={() => {
              setShowReassignLawyer(false);
              setShowAppointmentDetails(true);
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.assignLawyerTitle}>Reassign Lawyer</Text>
          <View style={styles.assignLawyerHeaderSpace} />
        </View>

        <ScrollView style={styles.assignLawyerContent}>
          {/* Appointment Summary */}
          <View style={styles.assignLawyerSummary}>
            <Text style={styles.assignLawyerSummaryTitle}>Reassigning Appointment</Text>
            <View style={styles.assignLawyerSummaryInfo}>
              <Text style={styles.assignLawyerSummaryText}>
                Client: <Text style={styles.assignLawyerSummaryBold}>{selectedAppointment.clientName}</Text>
              </Text>
              <Text style={styles.assignLawyerSummaryText}>
                Type: <Text style={styles.assignLawyerSummaryBold}>{selectedAppointment.appointmentType}</Text>
              </Text>
              <Text style={styles.assignLawyerSummaryText}>
                Legal Area: <Text style={styles.assignLawyerSummaryBold}>{selectedAppointment.legalArea}</Text>
              </Text>
              <Text style={styles.assignLawyerSummaryText}>
                Currently Assigned: <Text style={styles.assignLawyerSummaryBold}>{selectedAppointment.assignedLawyer?.name}</Text>
              </Text>
            </View>
          </View>

          {/* Compatible Lawyers */}
          {compatibleLawyers.length > 0 && (
            <>
              <View style={styles.assignLawyerSection}>
                <Text style={styles.assignLawyerSectionTitle}>Recommended Lawyers</Text>
                <Text style={styles.assignLawyerSectionSubtitle}>
                  Lawyers with experience in {selectedAppointment.legalArea}
                </Text>
              </View>

              {compatibleLawyers.map((lawyer, index) => (
                <TouchableOpacity 
                  key={lawyer.id}
                  style={[
                    styles.assignLawyerCard,
                    selectedAppointment.assignedLawyer?.id === lawyer.id && styles.assignLawyerCardCurrent
                  ]}
                  onPress={() => handleAssignLawyerToAppointment(lawyer)}
                >
                  <Image source={lawyer.image} style={styles.assignLawyerImage} />
                  <View style={styles.assignLawyerInfo}>
                    <View style={styles.assignLawyerNameRow}>
                      <Text style={styles.assignLawyerName}>{lawyer.name}</Text>
                      <MaterialIcons name="star" size={16} color="#4CAF50" />
                      {selectedAppointment.assignedLawyer?.id === lawyer.id && (
                        <Text style={styles.assignLawyerCurrentText}>(Current)</Text>
                      )}
                    </View>
                    <Text style={styles.assignLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.assignLawyerExperience}>{lawyer.experience} experience</Text>
                    <View style={styles.assignLawyerStats}>
                      <Text style={styles.assignLawyerRating}>⭐ {lawyer.rating}</Text>
                      <Text style={styles.assignLawyerCases}>{lawyer.cases} cases</Text>
                      <Text style={styles.assignLawyerSuccessRate}>{lawyer.successRate} success</Text>
                    </View>
                  </View>
                  <View style={styles.assignLawyerSelectButton}>
                    <MaterialIcons name="arrow-forward" size={20} color="#2E4A6B" />
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Other Available Lawyers */}
          {otherLawyers.length > 0 && (
            <>
              <View style={styles.assignLawyerSection}>
                <Text style={styles.assignLawyerSectionTitle}>Other Available Lawyers</Text>
                <Text style={styles.assignLawyerSectionSubtitle}>
                  All other lawyers in your firm
                </Text>
              </View>

              {otherLawyers.map((lawyer, index) => (
                <TouchableOpacity 
                  key={lawyer.id}
                  style={styles.assignLawyerCard}
                  onPress={() => handleAssignLawyerToAppointment(lawyer)}
                >
                  <Image source={lawyer.image} style={styles.assignLawyerImage} />
                  <View style={styles.assignLawyerInfo}>
                    <Text style={styles.assignLawyerName}>{lawyer.name}</Text>
                    <Text style={styles.assignLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.assignLawyerExperience}>{lawyer.experience} experience</Text>
                    <View style={styles.assignLawyerStats}>
                      <Text style={styles.assignLawyerRating}>⭐ {lawyer.rating}</Text>
                      <Text style={styles.assignLawyerCases}>{lawyer.cases} cases</Text>
                      <Text style={styles.assignLawyerSuccessRate}>{lawyer.successRate} success</Text>
                    </View>
                  </View>
                  <View style={styles.assignLawyerSelectButton}>
                    <MaterialIcons name="arrow-forward" size={20} color="#2E4A6B" />
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          <View style={styles.assignLawyerBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Assign Lawyer Screen
  const renderAssignLawyerScreen = () => {
    if (!selectedAppointment) return null;

    // Filter lawyers based on legal area compatibility
    const compatibleLawyers = firmLawyers.filter(lawyer => 
      lawyer.specialty.toLowerCase().includes(selectedAppointment.legalArea.toLowerCase()) ||
      selectedAppointment.legalArea.toLowerCase().includes(lawyer.specialty.toLowerCase()) ||
      lawyer.specialty === 'Business Law' || // Business lawyers are versatile
      lawyer.specialty === 'Corporate Law'   // Corporate lawyers are versatile
    );

    const otherLawyers = firmLawyers.filter(lawyer => !compatibleLawyers.includes(lawyer));

    return (
      <View style={styles.assignLawyerContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.assignLawyerHeader}>
          <TouchableOpacity 
            style={styles.assignLawyerBackButton}
            onPress={() => {
              setShowAssignLawyer(false);
              setSelectedAppointment(null);
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.assignLawyerTitle}>Assign Lawyer</Text>
          <View style={styles.assignLawyerPlaceholder} />
        </View>

        <ScrollView style={styles.assignLawyerContent}>
          {/* Appointment Summary */}
          <View style={styles.assignLawyerAppointmentCard}>
            <View style={styles.assignLawyerAppointmentHeader}>
              <Image source={selectedAppointment.clientImage} style={styles.assignLawyerClientImage} />
              <View style={styles.assignLawyerAppointmentInfo}>
                <Text style={styles.assignLawyerClientName}>{selectedAppointment.clientName}</Text>
                <Text style={styles.assignLawyerAppointmentType}>{selectedAppointment.appointmentType}</Text>
                <Text style={styles.assignLawyerLegalArea}>{selectedAppointment.legalArea}</Text>
              </View>
            </View>
            <Text style={styles.assignLawyerAppointmentDate}>
              {selectedAppointment.preferredDate} at {selectedAppointment.preferredTime}
            </Text>
          </View>

          {/* Recommended Lawyers */}
          {compatibleLawyers.length > 0 && (
            <>
              <View style={styles.assignLawyerSectionHeader}>
                <MaterialIcons name="star" size={20} color="#4CAF50" />
                <Text style={styles.assignLawyerSectionTitle}>Recommended Lawyers</Text>
                <Text style={styles.assignLawyerSectionSubtitle}>
                  Specialized in {selectedAppointment.legalArea}
                </Text>
              </View>

              {compatibleLawyers.map((lawyer, index) => (
                <TouchableOpacity 
                  key={lawyer.id}
                  style={[styles.assignLawyerCard, styles.assignLawyerCardRecommended]}
                  onPress={() => handleAssignLawyerToAppointment(lawyer)}
                >
                  <Image source={lawyer.image} style={styles.assignLawyerImage} />
                  <View style={styles.assignLawyerInfo}>
                    <View style={styles.assignLawyerNameRow}>
                      <Text style={styles.assignLawyerName}>{lawyer.name}</Text>
                      <MaterialIcons name="star" size={16} color="#4CAF50" />
                    </View>
                    <Text style={styles.assignLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.assignLawyerExperience}>{lawyer.experience} experience</Text>
                    <View style={styles.assignLawyerStats}>
                      <Text style={styles.assignLawyerRating}>⭐ {lawyer.rating}</Text>
                      <Text style={styles.assignLawyerCases}>{lawyer.cases} cases</Text>
                      <Text style={styles.assignLawyerSuccessRate}>{lawyer.successRate} success</Text>
                    </View>
                  </View>
                  <View style={styles.assignLawyerSelectButton}>
                    <MaterialIcons name="arrow-forward" size={20} color="#4CAF50" />
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Other Available Lawyers */}
          {otherLawyers.length > 0 && (
            <>
              <View style={styles.assignLawyerSectionHeader}>
                <MaterialIcons name="people" size={20} color="#666" />
                <Text style={styles.assignLawyerSectionTitle}>Other Available Lawyers</Text>
                <Text style={styles.assignLawyerSectionSubtitle}>
                  All firm lawyers
                </Text>
              </View>

              {otherLawyers.map((lawyer, index) => (
                <TouchableOpacity 
                  key={lawyer.id}
                  style={styles.assignLawyerCard}
                  onPress={() => handleAssignLawyerToAppointment(lawyer)}
                >
                  <Image source={lawyer.image} style={styles.assignLawyerImage} />
                  <View style={styles.assignLawyerInfo}>
                    <Text style={styles.assignLawyerName}>{lawyer.name}</Text>
                    <Text style={styles.assignLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.assignLawyerExperience}>{lawyer.experience} experience</Text>
                    <View style={styles.assignLawyerStats}>
                      <Text style={styles.assignLawyerRating}>⭐ {lawyer.rating}</Text>
                      <Text style={styles.assignLawyerCases}>{lawyer.cases} cases</Text>
                      <Text style={styles.assignLawyerSuccessRate}>{lawyer.successRate} success</Text>
                    </View>
                  </View>
                  <View style={styles.assignLawyerSelectButton}>
                    <MaterialIcons name="arrow-forward" size={20} color="#2E4A6B" />
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          <View style={styles.assignLawyerBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Law Firm Profile Screen (like LawyerApp profile page)
  const renderLawfirmProfileScreen = () => {
    const handleLogout = () => {
      setShowLogoutConfirmation(true);
    };

    return (
      <View style={styles.lawfirmProfileContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.lawfirmProfileHeader}>
          <View style={styles.lawfirmProfileHeaderRow}>
          <TouchableOpacity 
              style={styles.lawfirmProfileBackButton}
              onPress={() => setLawfirmCurrentScreen('home')}
          >
              <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
            <View style={styles.lawfirmProfileTitleContainer}>
              <Text style={styles.lawfirmProfileTitle}>Profile</Text>
            </View>
            <View style={styles.headerButtonsRow}>
              <TouchableOpacity 
                style={styles.headerNotificationButton}
                onPress={() => setShowNotifications(true)}
              >
                <MaterialIcons name="notifications" size={20} color="#ffffff" />
                {notifications.filter(n => !n.read).length > 0 && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {notifications.filter(n => !n.read).length}
                    </Text>
                </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.lawfirmProfileSettingsButton}
                onPress={() => setShowSettings(true)}
              >
                <MaterialIcons name="settings" size={24} color="#ffffff" />
        </TouchableOpacity>
            </View>
          </View>
      </View>

        <ScrollView style={styles.lawfirmProfileContent} showsVerticalScrollIndicator={false}>
          {/* Law Firm Info Card */}
          <View style={styles.lawfirmProfileInfoCard}>
            <View style={styles.lawfirmProfileAvatarContainer}>
              <Image source={lawfirmProfile.profileImage} style={styles.lawfirmProfileAvatar} />
            </View>
            <Text style={styles.lawfirmProfileName}>{lawfirmProfile.name}</Text>
            <Text style={styles.lawfirmProfileSubtitle}>{lawfirmProfile.practiceAreas.join(', ')}</Text>
            <View style={styles.lawfirmProfileStatsRow}>
              <View style={styles.lawfirmProfileStatItem}>
                <Text style={styles.lawfirmProfileStatNumber}>{lawfirmStats.totalLawyers}</Text>
                <Text style={styles.lawfirmProfileStatLabel}>Lawyers</Text>
              </View>
              <View style={styles.lawfirmProfileStatItem}>
                <Text style={styles.lawfirmProfileStatNumber}>{lawfirmStats.activeCases}</Text>
                <Text style={styles.lawfirmProfileStatLabel}>Cases</Text>
              </View>
              <View style={styles.lawfirmProfileStatItem}>
                <Text style={styles.lawfirmProfileStatNumber}>{firmClients.length}</Text>
                <Text style={styles.lawfirmProfileStatLabel}>Clients</Text>
              </View>
            </View>
        </View>

          {/* Profile Menu Items */}
          <View style={styles.lawfirmProfileMenuCard}>
          <TouchableOpacity 
              style={styles.lawfirmProfileMenuItem}
              onPress={() => setShowManageProfile(true)}
            >
              <View style={styles.lawfirmProfileMenuItemLeft}>
                <MaterialIcons name="edit" size={24} color="#2E4A6B" />
                <Text style={styles.lawfirmProfileMenuItemText}>Manage Profile</Text>
          </View>
              <MaterialIcons name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawfirmProfileMenuItem}>
              <View style={styles.lawfirmProfileMenuItemLeft}>
                <MaterialIcons name="payment" size={24} color="#2E4A6B" />
                <Text style={styles.lawfirmProfileMenuItemText}>All Payments</Text>
          </View>
              <View style={styles.lawfirmProfileComingSoonBadge}>
                <Text style={styles.lawfirmProfileComingSoonText}>Coming Soon</Text>
          </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.lawfirmProfileMenuItem}
              onPress={() => setShowFinancialReports(true)}
            >
              <View style={styles.lawfirmProfileMenuItemLeft}>
                <MaterialIcons name="assessment" size={24} color="#2E4A6B" />
                <Text style={styles.lawfirmProfileMenuItemText}>Financial Reports</Text>
          </View>
              <MaterialIcons name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawfirmProfileMenuItem}>
              <View style={styles.lawfirmProfileMenuItemLeft}>
                <MaterialIcons name="security" size={24} color="#2E4A6B" />
                <Text style={styles.lawfirmProfileMenuItemText}>Security Settings</Text>
        </View>
              <View style={styles.lawfirmProfileComingSoonBadge}>
                <Text style={styles.lawfirmProfileComingSoonText}>Coming Soon</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lawfirmProfileMenuItem}>
              <View style={styles.lawfirmProfileMenuItemLeft}>
                <MaterialIcons name="help" size={24} color="#2E4A6B" />
                <Text style={styles.lawfirmProfileMenuItemText}>Help & Support</Text>
              </View>
              <View style={styles.lawfirmProfileComingSoonBadge}>
                <Text style={styles.lawfirmProfileComingSoonText}>Coming Soon</Text>
              </View>
        </TouchableOpacity>

            <TouchableOpacity style={styles.lawfirmProfileMenuItem} onPress={handleLogout}>
              <View style={styles.lawfirmProfileMenuItemLeft}>
                <MaterialIcons name="logout" size={24} color="#2E4A6B" />
                <Text style={styles.lawfirmProfileMenuItemText}>Logout</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          </View>
      </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'home' && styles.activeNavItem]}
            onPress={() => setLawfirmCurrentScreen('home')}
          >
            <MaterialIcons name="home" size={24} color={lawfirmCurrentScreen === 'home' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'home' && styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'lawyers' && styles.activeNavItem]}
            onPress={() => {
              setLawfirmCurrentScreen('lawyers');
              setShowLawyerRoster(true);
            }}
          >
            <MaterialIcons name="people" size={24} color={lawfirmCurrentScreen === 'lawyers' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'lawyers' && styles.activeNavText]}>Lawyers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'cases' && styles.activeNavItem]}
            onPress={() => {
              setLawfirmCurrentScreen('cases');
              setShowCaseManagement(true);
            }}
          >
            <MaterialIcons name="folder" size={24} color={lawfirmCurrentScreen === 'cases' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'cases' && styles.activeNavText]}>Cases</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'appointments' && styles.activeNavItem]}
            onPress={() => {
              setLawfirmCurrentScreen('appointments');
              setShowAppointments(true);
            }}
          >
            <MaterialIcons name="event" size={24} color={lawfirmCurrentScreen === 'appointments' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'appointments' && styles.activeNavText]}>Appointments</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'profile' && styles.activeNavItem]}
            onPress={() => setLawfirmCurrentScreen('profile')}
          >
            <MaterialIcons name="person" size={24} color={lawfirmCurrentScreen === 'profile' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'profile' && styles.activeNavText]}>Profile</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
  };

  const renderManageProfileScreen = () => (
    <View style={styles.lawFirmDetailsContainer}>
      <StatusBar style="light" />
      
      {/* Fixed Navigation Header */}
      <View style={styles.lawFirmDetailsNavHeader}>
          <TouchableOpacity 
          onPress={() => setShowManageProfile(false)}
          style={styles.lawFirmDetailsBackButton}
          >
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        <Text style={styles.lawFirmDetailsNavTitle}>Manage Profile</Text>
          <TouchableOpacity 
          style={styles.lawFirmDetailsFilterButton}
            onPress={() => {
            if (editMode) {
              handleSaveProfile();
            } else {
              setEditMode(true);
            }
          }}
        >
          <MaterialIcons name={editMode ? "save" : "edit"} size={20} color="#ffffff" />
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
                  <Image source={lawfirmProfile.profileImage} style={styles.lawFirmDetailsHeroImage} />
                </View>
                {editMode ? (
                  <TextInput
                    style={[styles.editProfileTextInput, { 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      textAlign: 'center',
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#2E4A6B',
                      marginBottom: 8
                    }]}
                    value={editedProfile?.name || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, name: text }))}
                    placeholder="Enter firm name"
                  />
                ) : (
                  <Text style={styles.lawFirmDetailsHeroTitle}>{lawfirmProfile.name}</Text>
                )}
                <Text style={styles.lawFirmDetailsHeroSubtitle}>Professional Legal Services</Text>
              </View>
              
              {/* Stats Row */}
              <View style={styles.lawFirmDetailsStatsRow}>
                <View style={styles.lawFirmDetailsStat}>
                  <Text style={styles.lawFirmDetailsStatNumber}>{lawfirmStats.totalLawyers}</Text>
                  <Text style={styles.lawFirmDetailsStatLabel}>Lawyers</Text>
                </View>
                <View style={styles.lawFirmDetailsStatDivider} />
                <View style={styles.lawFirmDetailsStat}>
                  <Text style={styles.lawFirmDetailsStatNumber}>{lawfirmStats.activeCases}</Text>
                  <Text style={styles.lawFirmDetailsStatLabel}>Cases</Text>
                </View>
                <View style={styles.lawFirmDetailsStatDivider} />
                <View style={styles.lawFirmDetailsStat}>
                  <Text style={styles.lawFirmDetailsStatNumber}>{firmClients.length}</Text>
                  <Text style={styles.lawFirmDetailsStatLabel}>Clients</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Firm Description Card */}
        <View style={styles.lawFirmDetailsDescriptionCard}>
          <View style={styles.lawFirmDetailsDescriptionHeader}>
            <View style={styles.lawFirmDetailsDescriptionIcon}>
              <MaterialIcons name="lightbulb-outline" size={24} color="#2E4A6B" />
            </View>
            <Text style={styles.lawFirmDetailsDescriptionTitle}>
              About {lawfirmProfile.name}
            </Text>
          </View>
          {editMode ? (
            <TextInput
              style={[styles.editProfileTextInput, { 
                minHeight: 80,
                textAlignVertical: 'top',
                marginBottom: 20
              }]}
              value={editedProfile?.description || ''}
              onChangeText={(text) => setEditedProfile(prev => ({ ...prev, description: text }))}
              placeholder="Enter firm description"
              multiline
            />
          ) : (
            <Text style={styles.lawFirmDetailsDescriptionText}>
              {lawfirmProfile.description} Our experienced team of legal professionals provides comprehensive legal services with a commitment to excellence and client satisfaction. We specialize in {lawfirmProfile.practiceAreas.join(', ').toLowerCase()} law and have successfully handled thousands of cases.
            </Text>
          )}
          <View style={styles.lawFirmDetailsFeatures}>
            <View style={styles.lawFirmDetailsFeature}>
              <MaterialIcons name="check-circle" size={16} color="#28a745" />
              <Text style={styles.lawFirmDetailsFeatureText}>Experienced Legal Team</Text>
            </View>
            <View style={styles.lawFirmDetailsFeature}>
              <MaterialIcons name="check-circle" size={16} color="#28a745" />
              <Text style={styles.lawFirmDetailsFeatureText}>Proven Track Record</Text>
            </View>
            <View style={styles.lawFirmDetailsFeature}>
              <MaterialIcons name="check-circle" size={16} color="#28a745" />
              <Text style={styles.lawFirmDetailsFeatureText}>Client-Focused Approach</Text>
            </View>
          </View>
        </View>

        {/* Contact Information Section */}
        <View style={styles.lawFirmDetailsSection}>
          <View style={styles.lawFirmDetailsSectionHeader}>
            <View>
              <Text style={styles.lawFirmDetailsSectionTitle}>Contact Information</Text>
              <Text style={styles.lawFirmDetailsSectionSubtitle}>
                Get in touch with our law firm
              </Text>
            </View>
          </View>
          
          <View style={styles.lawFirmDetailsContactGrid}>
            <View style={styles.lawFirmDetailsContactCard}>
              <View style={styles.lawFirmDetailsContactIconContainer}>
                <MaterialIcons name="phone" size={24} color="#2E4A6B" />
              </View>
              <View style={styles.lawFirmDetailsContactInfo}>
                <Text style={styles.lawFirmDetailsContactLabel}>Phone</Text>
                {editMode ? (
                  <TextInput
                    style={styles.editProfileTextInput}
                    value={editedProfile?.phone || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, phone: text }))}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <Text style={styles.lawFirmDetailsContactValue}>{lawfirmProfile.phone}</Text>
                )}
              </View>
            </View>

            <View style={styles.lawFirmDetailsContactCard}>
              <View style={styles.lawFirmDetailsContactIconContainer}>
                <MaterialIcons name="email" size={24} color="#2E4A6B" />
              </View>
              <View style={styles.lawFirmDetailsContactInfo}>
                <Text style={styles.lawFirmDetailsContactLabel}>Email</Text>
                {editMode ? (
                  <TextInput
                    style={styles.editProfileTextInput}
                    value={editedProfile?.email || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, email: text }))}
                    placeholder="Enter email address"
                    keyboardType="email-address"
                  />
                ) : (
                  <Text style={styles.lawFirmDetailsContactValue}>{lawfirmProfile.email}</Text>
                )}
              </View>
            </View>

            <View style={styles.lawFirmDetailsContactCard}>
              <View style={styles.lawFirmDetailsContactIconContainer}>
                <MaterialIcons name="location-on" size={24} color="#2E4A6B" />
              </View>
              <View style={styles.lawFirmDetailsContactInfo}>
                <Text style={styles.lawFirmDetailsContactLabel}>Address</Text>
                {editMode ? (
                  <TextInput
                    style={[styles.editProfileTextInput, { minHeight: 40 }]}
                    value={editedProfile?.address || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, address: text }))}
                    placeholder="Enter address"
                    multiline
                  />
                ) : (
                  <Text style={styles.lawFirmDetailsContactValue}>{lawfirmProfile.address}</Text>
                )}
              </View>
            </View>

            <View style={styles.lawFirmDetailsContactCard}>
              <View style={styles.lawFirmDetailsContactIconContainer}>
                <MaterialIcons name="web" size={24} color="#2E4A6B" />
              </View>
              <View style={styles.lawFirmDetailsContactInfo}>
                <Text style={styles.lawFirmDetailsContactLabel}>Website</Text>
                {editMode ? (
                  <TextInput
                    style={styles.editProfileTextInput}
                    value={editedProfile?.website || ''}
                    onChangeText={(text) => setEditedProfile(prev => ({ ...prev, website: text }))}
                    placeholder="Enter website URL"
                  />
                ) : (
                  <Text style={styles.lawFirmDetailsContactValue}>{lawfirmProfile.website}</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Practice Areas Section */}
        <View style={styles.lawFirmDetailsSection}>
          <View style={styles.lawFirmDetailsSectionHeader}>
            <View>
              <Text style={styles.lawFirmDetailsSectionTitle}>Practice Areas</Text>
              <Text style={styles.lawFirmDetailsSectionSubtitle}>
                {editMode ? 'Select your areas of legal expertise' : 'Our areas of legal expertise'}
              </Text>
            </View>
          </View>
          
          {editMode ? (
            <View style={styles.categorySelectionGrid}>
              {allCategories.map((category, index) => {
                const isSelected = editedProfile?.practiceAreas?.includes(category) || false;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categorySelectionCard,
                      isSelected && styles.categorySelectionCardSelected
                    ]}
                    onPress={() => handleCategoryToggle(category)}
                  >
                    <View style={[
                      styles.categorySelectionIconContainer,
                      isSelected && styles.categorySelectionIconContainerSelected
                    ]}>
                      <MaterialIcons 
                        name="gavel" 
                        size={16} 
                        color={isSelected ? '#ffffff' : '#2E4A6B'} 
                      />
                    </View>
                    <Text style={[
                      styles.categorySelectionName,
                      isSelected && styles.categorySelectionNameSelected
                    ]}>
                      {category}
                    </Text>
                    {isSelected && (
                      <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View style={styles.lawFirmDetailsPracticeGrid}>
              {lawfirmProfile.practiceAreas.map((area, index) => (
                <View key={index} style={styles.lawFirmDetailsPracticeCard}>
                  <View style={styles.lawFirmDetailsPracticeIconContainer}>
                    <MaterialIcons name="gavel" size={20} color="#2E4A6B" />
                  </View>
                  <Text style={styles.lawFirmDetailsPracticeName}>{area}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Services Section */}
        <View style={styles.lawFirmDetailsSection}>
          <View style={styles.lawFirmDetailsSectionHeader}>
            <View>
              <Text style={styles.lawFirmDetailsSectionTitle}>Our Services</Text>
              <Text style={styles.lawFirmDetailsSectionSubtitle}>
                {editMode ? 'Services automatically updated based on practice areas' : 'Comprehensive legal services we offer'}
              </Text>
            </View>
          </View>
          
          {editMode && (
            <View style={styles.servicesUpdateNotice}>
              <MaterialIcons name="info" size={16} color="#2196F3" />
              <Text style={styles.servicesUpdateNoticeText}>
                Services are automatically updated when you change practice areas
              </Text>
            </View>
          )}
          
          <View style={styles.lawFirmDetailsServicesGrid}>
            {(editMode ? editedProfile?.services || [] : lawfirmProfile.services).slice(0, editMode ? 12 : 6).map((service, index) => (
              <View key={index} style={[
                styles.lawFirmDetailsServiceCard,
                editMode && styles.lawFirmDetailsServiceCardEdit
              ]}>
                <View style={styles.lawFirmDetailsServiceIconContainer}>
                  <MaterialIcons name="work" size={24} color="#2E4A6B" />
                </View>
                <View style={styles.lawFirmDetailsServiceInfo}>
                  <Text style={styles.lawFirmDetailsServiceName}>{service}</Text>
                  <Text style={styles.lawFirmDetailsServiceDescription}>
                    Professional {service.toLowerCase()} services
                  </Text>
                </View>
                {editMode && (
                  <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                )}
              </View>
            ))}
          </View>
          
          {(editMode ? editedProfile?.services?.length : lawfirmProfile.services.length) > (editMode ? 12 : 6) && (
            <View style={styles.servicesMoreIndicator}>
              <Text style={styles.servicesMoreText}>
                +{(editMode ? editedProfile?.services?.length : lawfirmProfile.services.length) - (editMode ? 12 : 6)} more services
              </Text>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.lawFirmDetailsBottomSpacing} />
      </ScrollView>
    </View>
  );

  // Logout Confirmation Screen (matching App.js and LawyerApp.js structure)
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
            <MaterialIcons name="arrow-back" size={24} color="#2E4A6B" />
          </TouchableOpacity>
          <Text style={styles.logoutConfirmationTitle}>Logout</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.logoutConfirmationContent} showsVerticalScrollIndicator={false}>
          {/* Logout Icon */}
          <View style={styles.logoutConfirmationIconContainer}>
            <View style={styles.logoutConfirmationIconCircle}>
              <MaterialIcons name="logout" size={40} color="#2E4A6B" />
            </View>
          </View>

          {/* Confirmation Message */}
          <View style={styles.logoutConfirmationMessageSection}>
            <Text style={styles.logoutConfirmationMainText}>Are you sure you want to logout?</Text>
            <Text style={styles.logoutConfirmationSubText}>
              You will be logged out from your law firm account and will need to sign in again to access your dashboard.
            </Text>
          </View>

          {/* Law Firm Summary */}
          <View style={styles.logoutConfirmationSummarySection}>
            <Text style={styles.logoutConfirmationSummaryTitle}>Firm Summary</Text>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Total Lawyers:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{lawfirmStats.totalLawyers}</Text>
            </View>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Active Cases:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{lawfirmStats.activeCases}</Text>
            </View>
            
            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Total Clients:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{firmClients.length}</Text>
            </View>

            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Monthly Revenue:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>{lawfirmStats.monthlyRevenue}</Text>
            </View>

            <View style={styles.logoutConfirmationSummaryItem}>
              <Text style={styles.logoutConfirmationSummaryLabel}>Firm Rating:</Text>
              <Text style={styles.logoutConfirmationSummaryValue}>⭐ {lawfirmStats.averageRating}</Text>
            </View>
          </View>

          {/* Firm Profile Info */}
          <View style={styles.logoutConfirmationProfileSection}>
            <View style={styles.logoutConfirmationProfileHeader}>
              <Image source={lawfirmProfile.profileImage} style={styles.logoutConfirmationProfileImage} />
              <View style={styles.logoutConfirmationProfileInfo}>
                <Text style={styles.logoutConfirmationProfileName}>{lawfirmProfile.name}</Text>
                <Text style={styles.logoutConfirmationProfileEmail}>{lawfirmProfile.email}</Text>
                <Text style={styles.logoutConfirmationProfileAreas}>{lawfirmProfile.practiceAreas.join(', ')}</Text>
              </View>
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

  // Case Management Screen with proper navigation
  const renderCaseManagementScreen = () => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return '#28a745';
        case 'Pending': return '#ffc107';
        case 'Completed': return '#6c757d';
        case 'On Hold': return '#dc3545';
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

    const handleCaseClick = (caseItem) => {
      setSelectedCase(caseItem);
      setShowCaseDetails(true);
    };

    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.lawfirmCasesHeader}>
          <TouchableOpacity 
            style={styles.lawfirmCasesBackButton}
            onPress={() => {
              setShowCaseManagement(false);
              setLawfirmCurrentScreen('home');
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.lawfirmCasesTitle}>Case Management</Text>
          <TouchableOpacity style={styles.lawfirmCasesAddButton}>
            <MaterialIcons name="add" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.lawfirmCasesStats}>
          <View style={styles.lawfirmCaseStatCard}>
            <Text style={styles.lawfirmCaseStatNumber}>{firmCases.length}</Text>
            <Text style={styles.lawfirmCaseStatLabel}>Total Cases</Text>
          </View>
          <View style={styles.lawfirmCaseStatCard}>
            <Text style={styles.lawfirmCaseStatNumber}>{firmCases.filter(c => c.status === 'Active').length}</Text>
            <Text style={styles.lawfirmCaseStatLabel}>Active</Text>
          </View>
          <View style={styles.lawfirmCaseStatCard}>
            <Text style={styles.lawfirmCaseStatNumber}>{firmCases.filter(c => c.status === 'Completed').length}</Text>
            <Text style={styles.lawfirmCaseStatLabel}>Completed</Text>
          </View>
          <View style={styles.lawfirmCaseStatCard}>
            <Text style={styles.lawfirmCaseStatNumber}>{firmCases.filter(c => c.priority === 'High').length}</Text>
            <Text style={styles.lawfirmCaseStatLabel}>High Priority</Text>
          </View>
        </View>

        {/* Cases List */}
        <ScrollView style={styles.lawfirmCasesContent} showsVerticalScrollIndicator={false}>
          {firmCases.map((caseItem) => (
            <TouchableOpacity
              key={caseItem.id}
              style={styles.lawfirmCaseCard}
              onPress={() => handleCaseClick(caseItem)}
              activeOpacity={0.7}
            >
              {/* Case Header */}
              <View style={styles.lawfirmCaseCardHeader}>
                <View style={styles.lawfirmCaseCardHeaderLeft}>
                  <Text style={styles.lawfirmCaseNumber}>{caseItem.caseNumber}</Text>
                  <View style={styles.lawfirmCaseBadges}>
                    <View style={[styles.lawfirmStatusBadge, { backgroundColor: getStatusColor(caseItem.status) }]}>
                      <Text style={styles.lawfirmStatusBadgeText}>{caseItem.status}</Text>
                    </View>
                    <View style={[styles.lawfirmPriorityBadge, { backgroundColor: getPriorityColor(caseItem.priority) }]}>
                      <Text style={styles.lawfirmPriorityBadgeText}>{caseItem.priority}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.lawfirmCaseOptionsButton}>
                  <MaterialIcons name="more-vert" size={20} color="#6c757d" />
                </TouchableOpacity>
              </View>

              {/* Client Information */}
              <TouchableOpacity 
                style={styles.lawfirmCaseClientInfo}
                onPress={() => {
                  // Create client object from case data
                  const clientFromCase = {
                    id: caseItem.id + '_client',
                    name: caseItem.clientName,
                    type: 'Individual', // Default, could be enhanced
                    contactPerson: caseItem.clientName,
                    phone: caseItem.clientPhone,
                    email: caseItem.clientEmail,
                    address: 'Address not provided',
                    totalCases: 1, // Could be calculated
                    totalValue: caseItem.caseValue || '$0',
                    status: 'Active',
                    image: caseItem.clientImage
                  };
                  setSelectedClient(clientFromCase);
                  setShowClientDetails(true);
                }}
              >
                <Image source={caseItem.clientImage} style={styles.lawfirmCaseClientImage} />
                <View style={styles.lawfirmCaseClientDetails}>
                  <Text style={styles.lawfirmCaseClientName}>{caseItem.clientName}</Text>
                  <Text style={styles.lawfirmCaseClientEmail}>{caseItem.clientEmail}</Text>
                  <Text style={styles.lawfirmCaseClientPhone}>{caseItem.clientPhone}</Text>
                </View>
              </TouchableOpacity>

              {/* Case Type and Description */}
              <View style={styles.lawfirmCaseInfo}>
                <Text style={styles.lawfirmCaseType}>{caseItem.caseType}</Text>
                <Text style={styles.lawfirmCaseDescription}>{caseItem.description}</Text>
              </View>

              {/* Assigned Lawyer */}
              <View style={styles.lawfirmCaseAssignedLawyer}>
                <MaterialIcons name="person" size={16} color="#2E4A6B" />
                <Text style={styles.lawfirmCaseAssignedLawyerLabel}>Assigned Lawyer:</Text>
                <View style={styles.lawfirmCaseAssignedLawyerInfo}>
                  <Image source={caseItem.assignedLawyer.image} style={styles.lawfirmCaseAssignedLawyerImage} />
                  <View style={styles.lawfirmCaseAssignedLawyerDetails}>
                    <Text style={styles.lawfirmCaseAssignedLawyerName}>{caseItem.assignedLawyer.name}</Text>
                    <Text style={styles.lawfirmCaseAssignedLawyerSpecialty}>{caseItem.assignedLawyer.specialty}</Text>
                  </View>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.lawfirmCaseProgressSection}>
                <View style={styles.lawfirmCaseProgressHeader}>
                  <Text style={styles.lawfirmCaseProgressLabel}>Progress</Text>
                  <Text style={styles.lawfirmCaseProgressPercent}>{caseItem.progress}%</Text>
                </View>
                <View style={styles.lawfirmCaseProgressBarContainer}>
                  <View 
                    style={[
                      styles.lawfirmCaseProgressBar, 
                      { width: `${caseItem.progress}%` }
                    ]} 
                  />
                </View>
              </View>

              {/* Case Stats */}
              <View style={styles.lawfirmCaseStatsRow}>
                <View style={styles.lawfirmCaseStat}>
                  <MaterialIcons name="event" size={16} color="#6c757d" />
                  <Text style={styles.lawfirmCaseStatText}>
                    {caseItem.nextHearing ? `Next: ${caseItem.nextHearing}` : 'No hearings'}
                  </Text>
                </View>
                <View style={styles.lawfirmCaseStat}>
                  <MaterialIcons name="description" size={16} color="#6c757d" />
                  <Text style={styles.lawfirmCaseStatText}>{caseItem.documents} docs</Text>
                </View>
                <View style={styles.lawfirmCaseStat}>
                  <MaterialIcons name="schedule" size={16} color="#6c757d" />
                  <Text style={styles.lawfirmCaseStatText}>{caseItem.billableHours}h</Text>
                </View>
                <View style={styles.lawfirmCaseStat}>
                  <MaterialIcons name="attach-money" size={16} color="#6c757d" />
                  <Text style={styles.lawfirmCaseStatText}>${caseItem.totalFees}</Text>
                </View>
              </View>

              {/* Last Activity */}
              <View style={styles.lawfirmCaseLastActivity}>
                <MaterialIcons name="update" size={14} color="#6c757d" />
                <Text style={styles.lawfirmCaseLastActivityText}>Last updated: {caseItem.lastActivity}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.lawfirmCasesBottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'home' && styles.activeNavItem]}
            onPress={() => {
              setShowCaseManagement(false);
              setLawfirmCurrentScreen('home');
            }}
          >
            <MaterialIcons name="home" size={24} color={lawfirmCurrentScreen === 'home' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'home' && styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'lawyers' && styles.activeNavItem]}
            onPress={() => {
              setShowCaseManagement(false);
              setLawfirmCurrentScreen('lawyers');
              setShowLawyerRoster(true);
            }}
          >
            <MaterialIcons name="people" size={24} color={lawfirmCurrentScreen === 'lawyers' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'lawyers' && styles.activeNavText]}>Lawyers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'cases' && styles.activeNavItem]}
            onPress={() => setLawfirmCurrentScreen('cases')}
          >
            <MaterialIcons name="folder" size={24} color={lawfirmCurrentScreen === 'cases' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'cases' && styles.activeNavText]}>Cases</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'appointments' && styles.activeNavItem]}
            onPress={() => {
              setShowCaseManagement(false);
              setLawfirmCurrentScreen('appointments');
              setShowAppointments(true);
            }}
          >
            <MaterialIcons name="event" size={24} color={lawfirmCurrentScreen === 'appointments' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'appointments' && styles.activeNavText]}>Appointments</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, lawfirmCurrentScreen === 'profile' && styles.activeNavItem]}
            onPress={() => {
              setShowCaseManagement(false);
              setLawfirmCurrentScreen('profile');
            }}
          >
            <MaterialIcons name="person" size={24} color={lawfirmCurrentScreen === 'profile' ? '#2E4A6B' : '#666'} />
            <Text style={[styles.navText, lawfirmCurrentScreen === 'profile' && styles.activeNavText]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Case Details Screen - Enhanced version based on LawyerApp.js
  const renderCaseDetailsScreen = () => {
    if (!selectedCase) return null;

    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return '#28a745';
        case 'Pending': return '#ffc107';
        case 'Completed': return '#6c757d';
        case 'On Hold': return '#dc3545';
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
            onPress={() => {
              setShowCaseDetails(false);
              setSelectedCase(null);
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.caseDetailsHeaderCenter}>
            <Text style={styles.caseDetailsTitle}>Case Details</Text>
            <Text style={styles.caseDetailsSubtitle}>{selectedCase.caseNumber}</Text>
          </View>
          <TouchableOpacity style={styles.caseDetailsOptionsButton}>
            <MaterialIcons name="more-vert" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.caseDetailsContent} showsVerticalScrollIndicator={false}>
          {/* Case Overview Card */}
          <View style={styles.caseOverviewCard}>
            <View style={styles.caseOverviewHeader}>
              <View style={styles.caseOverviewLeft}>
                <TouchableOpacity 
                  style={styles.caseDetailsClientInfo}
                  onPress={() => {
                    // Create client object from case data
                    const clientFromCase = {
                      id: selectedCase.id + '_client',
                      name: selectedCase.clientName,
                      type: 'Individual', // Default, could be enhanced
                      contactPerson: selectedCase.clientName,
                      phone: selectedCase.clientPhone,
                      email: selectedCase.clientEmail,
                      address: 'Address not provided',
                      totalCases: 1, // Could be calculated
                      totalValue: selectedCase.caseValue || '$0',
                      status: 'Active',
                      image: selectedCase.clientImage
                    };
                    setSelectedClient(clientFromCase);
                    setShowClientDetails(true);
                  }}
                >
                  <View style={styles.caseDetailsClientAvatar}>
                    <Image source={selectedCase.clientImage} style={styles.caseDetailsClientImage} />
                  </View>
                  <View style={styles.caseDetailsClientDetails}>
                    <Text style={styles.caseOverviewClient}>{selectedCase.clientName}</Text>
                    <Text style={styles.caseOverviewType}>{selectedCase.caseType}</Text>
                    <Text style={styles.caseOverviewContact}>{selectedCase.clientEmail}</Text>
                    <Text style={styles.caseOverviewContact}>{selectedCase.clientPhone}</Text>
                  </View>
                </TouchableOpacity>
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

          {/* Assigned Lawyer Section - Law Firm Specific */}
          <View style={styles.caseAssignedLawyerSection}>
            <Text style={styles.caseAssignedLawyerSectionTitle}>Assigned Lawyer</Text>
            
            <View style={styles.assignedLawyerCard}>
              <Image source={selectedCase.assignedLawyer.image} style={styles.assignedLawyerImage} />
              <View style={styles.assignedLawyerInfo}>
                <Text style={styles.assignedLawyerName}>{selectedCase.assignedLawyer.name}</Text>
                <Text style={styles.assignedLawyerSpecialty}>{selectedCase.assignedLawyer.specialty}</Text>
                <Text style={styles.assignedLawyerEmail}>{selectedCase.assignedLawyer.email}</Text>
                <View style={styles.assignedLawyerActions}>
                  <TouchableOpacity 
                    style={styles.assignedLawyerActionButton}
                    onPress={() => {
                      console.log('Contact lawyer button pressed for:', selectedCase.assignedLawyer.name);
                      showCustomAlert(
                        'info',
                        'Contact Lawyer',
                        `Contact ${selectedCase.assignedLawyer.name} at ${selectedCase.assignedLawyer.email}`,
                        [{ text: 'OK', style: 'primary' }]
                      );
                    }}
                  >
                    <MaterialIcons name="email" size={16} color="#2E4A6B" />
                    <Text style={styles.assignedLawyerActionText}>Contact</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.assignedLawyerActionButton}
                    onPress={() => {
                      console.log('Reassign lawyer button pressed for case:', selectedCase.caseNumber);
                      setShowCaseDetails(false);
                      setShowReassignCaseLawyer(true);
                    }}
                  >
                    <MaterialIcons name="swap-horiz" size={16} color="#2E4A6B" />
                    <Text style={styles.assignedLawyerActionText}>Reassign</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Key Information */}
          <View style={styles.caseInfoSection}>
            <Text style={styles.caseInfoSectionTitle}>Key Information</Text>
            
            <View style={styles.caseInfoGrid}>
              <View style={styles.caseInfoItem}>
                <MaterialIcons name="event" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Next Hearing</Text>
                  <Text style={styles.caseInfoItemValue}>
                    {selectedCase.nextHearing || 'No scheduled hearings'}
                  </Text>
                </View>
              </View>

              <View style={styles.caseInfoItem}>
                <MaterialIcons name="description" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Documents</Text>
                  <Text style={styles.caseInfoItemValue}>{selectedCase.documents} files</Text>
                </View>
              </View>

              <View style={styles.caseInfoItem}>
                <MaterialIcons name="schedule" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Billable Hours</Text>
                  <Text style={styles.caseInfoItemValue}>{selectedCase.billableHours}h</Text>
                </View>
              </View>

              <View style={styles.caseInfoItem}>
                <MaterialIcons name="update" size={20} color="#2E4A6B" />
                <View style={styles.caseInfoItemContent}>
                  <Text style={styles.caseInfoItemLabel}>Last Activity</Text>
                  <Text style={styles.caseInfoItemValue}>{selectedCase.lastActivity}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Financial Information */}
          <View style={styles.caseFinancialSection}>
            <Text style={styles.caseFinancialSectionTitle}>Financial Summary</Text>
            
            <View style={styles.financialStatsRow}>
              <View style={styles.financialStat}>
                <View style={styles.financialStatIcon}>
                  <MaterialIcons name="schedule" size={24} color="#ffffff" />
                </View>
                <View style={styles.financialStatContent}>
                  <Text style={styles.financialStatValue}>{selectedCase.billableHours}h</Text>
                  <Text style={styles.financialStatLabel}>Billable Hours</Text>
                </View>
              </View>

              <View style={styles.financialStat}>
                <View style={styles.financialStatIcon}>
                  <MaterialIcons name="attach-money" size={24} color="#ffffff" />
                </View>
                <View style={styles.financialStatContent}>
                  <Text style={styles.financialStatValue}>${selectedCase.totalFees}</Text>
                  <Text style={styles.financialStatLabel}>Total Fees</Text>
                </View>
              </View>
            </View>
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
            <MaterialIcons name="edit" size={20} color="#2E4A6B" />
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
            <MaterialIcons name="add" size={20} color="#ffffff" />
            <Text style={styles.caseActionButtonPrimaryText}>Add Activity</Text>
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
      // Update the case in the firmCases array
      const updatedCases = firmCases.map(caseItem => 
        caseItem.id === editingCase.id ? editingCase : caseItem
      );
      setFirmCases(updatedCases);
      
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
        case 'Medium': return '#ffc107';
        case 'Low': return '#28a745';
        default: return '#6c757d';
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
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
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

          {/* Case Status & Progress */}
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
            <Text style={styles.editSectionTitle}>Court Information</Text>
            
            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Next Hearing</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.nextHearing}
                onChangeText={(text) => setEditingCase({...editingCase, nextHearing: text})}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Total Fees</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.totalFees}
                onChangeText={(text) => setEditingCase({...editingCase, totalFees: text})}
                placeholder="Enter total fees"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Billable Hours</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.billableHours?.toString() || '0'}
                onChangeText={(text) => setEditingCase({...editingCase, billableHours: parseInt(text) || 0})}
                placeholder="Enter billable hours"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Client Information */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>Client Information</Text>
            
            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Client Email</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.clientEmail}
                onChangeText={(text) => setEditingCase({...editingCase, clientEmail: text})}
                placeholder="Enter client email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Client Phone</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.clientPhone}
                onChangeText={(text) => setEditingCase({...editingCase, clientPhone: text})}
                placeholder="Enter client phone"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Assigned Lawyer */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>Assigned Lawyer</Text>
            
            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Lawyer Name</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.assignedLawyer?.name || ''}
                onChangeText={(text) => setEditingCase({
                  ...editingCase, 
                  assignedLawyer: {...editingCase.assignedLawyer, name: text}
                })}
                placeholder="Enter lawyer name"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Lawyer Email</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.assignedLawyer?.email || ''}
                onChangeText={(text) => setEditingCase({
                  ...editingCase, 
                  assignedLawyer: {...editingCase.assignedLawyer, email: text}
                })}
                placeholder="Enter lawyer email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.editField}>
              <Text style={styles.editFieldLabel}>Specialty</Text>
              <TextInput
                style={styles.editFieldInput}
                value={editingCase.assignedLawyer?.specialty || ''}
                onChangeText={(text) => setEditingCase({
                  ...editingCase, 
                  assignedLawyer: {...editingCase.assignedLawyer, specialty: text}
                })}
                placeholder="Enter specialty"
              />
            </View>
          </View>

          <View style={styles.editBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Add Activity Screen (matching LawyerApp.js structure)
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

      // Create activity entry (matching LawyerApp.js format)
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
      const updatedCases = firmCases.map(caseItem => 
        caseItem.id === selectedCase.id ? updatedCase : caseItem
      );
      setFirmCases(updatedCases);
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
        case 'note': return 'edit';
        case 'call': return 'phone';
        case 'meeting': return 'group';
        case 'research': return 'search';
        case 'document': return 'description';
        case 'court': return 'gavel';
        case 'milestone': return 'star';
        default: return 'add';
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
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
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
                { type: 'note', label: 'Note', icon: 'edit' },
                { type: 'call', label: 'Phone Call', icon: 'phone' },
                { type: 'meeting', label: 'Meeting', icon: 'group' },
                { type: 'research', label: 'Research', icon: 'search' },
                { type: 'document', label: 'Document', icon: 'description' },
                { type: 'court', label: 'Court Work', icon: 'gavel' },
                { type: 'milestone', label: 'Milestone', icon: 'star' }
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
                  <MaterialIcons 
                    name={activityType.icon} 
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
                  <MaterialIcons name={getActivityTypeIcon(newActivity.type)} size={16} color="#ffffff" />
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

  // Reassign Case Lawyer Screen (matching the proper assign lawyer layout)
  const renderReassignCaseLawyerScreen = () => {
    if (!selectedCase) return null;

    const handleReassignLawyer = (lawyer) => {
      // Update the case with new assigned lawyer
      const updatedCase = {
        ...selectedCase,
        assignedLawyer: {
          id: lawyer.id,
          name: lawyer.name,
          email: lawyer.email,
          specialty: lawyer.specialty,
          image: lawyer.image
        }
      };

      // Update cases array
      const updatedCases = firmCases.map(caseItem => 
        caseItem.id === selectedCase.id ? updatedCase : caseItem
      );
      setFirmCases(updatedCases);
      setSelectedCase(updatedCase);

      // Close reassign screen and go back to case details
      setShowReassignCaseLawyer(false);
      setShowCaseDetails(true);
      
      showCustomAlert(
        'success',
        'Lawyer Reassigned',
        `Case ${selectedCase.caseNumber} has been successfully reassigned to ${lawyer.name}.`,
        [{ text: 'OK', style: 'primary' }]
      );
    };

    // Filter lawyers to exclude current assigned lawyer
    const availableLawyers = firmLawyers.filter(lawyer => lawyer.id !== selectedCase.assignedLawyer?.id);

    // Separate lawyers based on case type compatibility
    const compatibleLawyers = availableLawyers.filter(lawyer => 
      lawyer.specialty.toLowerCase().includes(selectedCase.caseType.toLowerCase()) ||
      selectedCase.caseType.toLowerCase().includes(lawyer.specialty.toLowerCase()) ||
      lawyer.specialty === 'Business Law' || // Business lawyers are versatile
      lawyer.specialty === 'Corporate Law'   // Corporate lawyers are versatile
    );

    const otherLawyers = availableLawyers.filter(lawyer => !compatibleLawyers.includes(lawyer));

    return (
      <View style={styles.assignLawyerContainer}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.assignLawyerHeader}>
          <TouchableOpacity 
            style={styles.assignLawyerBackButton}
            onPress={() => {
              setShowReassignCaseLawyer(false);
              setShowCaseDetails(true);
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.assignLawyerTitle}>Reassign Lawyer</Text>
          <View style={styles.assignLawyerPlaceholder} />
        </View>

        <ScrollView style={styles.assignLawyerContent}>
          {/* Case Summary Card */}
          <View style={styles.assignLawyerAppointmentCard}>
            <View style={styles.assignLawyerAppointmentHeader}>
              <Image 
                source={userImages[selectedCase.clientImage % userImages.length]} 
                style={styles.assignLawyerClientImage} 
              />
              <View style={styles.assignLawyerAppointmentInfo}>
                <Text style={styles.assignLawyerClientName}>{selectedCase.clientName}</Text>
                <Text style={styles.assignLawyerAppointmentType}>Case: {selectedCase.caseNumber}</Text>
                <Text style={styles.assignLawyerLegalArea}>{selectedCase.caseType}</Text>
              </View>
            </View>
            <View style={styles.caseReassignCurrentLawyer}>
              <Text style={styles.caseReassignCurrentLawyerLabel}>Currently assigned to:</Text>
              <Text style={styles.caseReassignCurrentLawyerName}>{selectedCase.assignedLawyer?.name}</Text>
            </View>
          </View>

          {/* Recommended Lawyers */}
          {compatibleLawyers.length > 0 && (
            <>
              <View style={styles.assignLawyerSectionHeader}>
                <MaterialIcons name="star" size={20} color="#4CAF50" />
                <Text style={styles.assignLawyerSectionTitle}>Recommended Lawyers</Text>
                <Text style={styles.assignLawyerSectionSubtitle}>
                  Specialized in {selectedCase.caseType}
                </Text>
              </View>

              {compatibleLawyers.map((lawyer, index) => (
                <TouchableOpacity 
                  key={lawyer.id}
                  style={[styles.assignLawyerCard, styles.assignLawyerCardRecommended]}
                  onPress={() => handleReassignLawyer(lawyer)}
                >
                  <Image 
                    source={lawyerImages[lawyer.image % lawyerImages.length]} 
                    style={styles.assignLawyerImage} 
                  />
                  <View style={styles.assignLawyerInfo}>
                    <View style={styles.assignLawyerNameRow}>
                      <Text style={styles.assignLawyerName}>{lawyer.name}</Text>
                      <MaterialIcons name="star" size={16} color="#4CAF50" />
                    </View>
                    <Text style={styles.assignLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.assignLawyerExperience}>{lawyer.experience} experience</Text>
                    <View style={styles.assignLawyerStats}>
                      <Text style={styles.assignLawyerRating}>⭐ {lawyer.rating}</Text>
                      <Text style={styles.assignLawyerCases}>{lawyer.cases} cases</Text>
                      <Text style={styles.assignLawyerSuccessRate}>{lawyer.successRate} success</Text>
                    </View>
                  </View>
                  <View style={styles.assignLawyerSelectButton}>
                    <MaterialIcons name="arrow-forward" size={20} color="#4CAF50" />
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Other Available Lawyers */}
          {otherLawyers.length > 0 && (
            <>
              <View style={styles.assignLawyerSectionHeader}>
                <MaterialIcons name="people" size={20} color="#666" />
                <Text style={styles.assignLawyerSectionTitle}>Other Available Lawyers</Text>
                <Text style={styles.assignLawyerSectionSubtitle}>
                  All firm lawyers
                </Text>
              </View>

              {otherLawyers.map((lawyer, index) => (
                <TouchableOpacity 
                  key={lawyer.id}
                  style={styles.assignLawyerCard}
                  onPress={() => handleReassignLawyer(lawyer)}
                >
                  <Image 
                    source={lawyerImages[lawyer.image % lawyerImages.length]} 
                    style={styles.assignLawyerImage} 
                  />
                  <View style={styles.assignLawyerInfo}>
                    <Text style={styles.assignLawyerName}>{lawyer.name}</Text>
                    <Text style={styles.assignLawyerSpecialty}>{lawyer.specialty}</Text>
                    <Text style={styles.assignLawyerExperience}>{lawyer.experience} experience</Text>
                    <View style={styles.assignLawyerStats}>
                      <Text style={styles.assignLawyerRating}>⭐ {lawyer.rating}</Text>
                      <Text style={styles.assignLawyerCases}>{lawyer.cases} cases</Text>
                      <Text style={styles.assignLawyerSuccessRate}>{lawyer.successRate} success</Text>
                    </View>
                  </View>
                  <View style={styles.assignLawyerSelectButton}>
                    <MaterialIcons name="arrow-forward" size={20} color="#2E4A6B" />
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          <View style={styles.assignLawyerBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // Handler functions for home slider
  const handleHomeLawyerClick = (lawyer) => {
    const lawyerData = {
      name: lawyer.name,
      specialty: lawyer.specialty,
      rating: lawyer.rating,
      experience: lawyer.experience,
      cases: lawyer.cases,
      successRate: lawyer.successRate,
      hourlyRate: lawyer.hourlyRate,
      profileImage: lawyerImages[lawyer.image % lawyerImages.length],
      distance: '0.5 km', // Since they work at the same firm
      description: `Experienced legal professional at our firm with expertise in ${lawyer.specialty}. Committed to providing excellent legal representation and achieving favorable outcomes for clients.`,
      reviews: `${Math.floor(lawyer.rating * 50)} Reviews`,
      phone: lawyer.phone || '+1 (555) 123-4567',
      email: lawyer.email || `${lawyer.name.toLowerCase().replace(' ', '.')}@lawfirm.com`,
      education: lawyer.education || 'Harvard Law School, J.D.',
      barAdmission: lawyer.barAdmission || 'State Bar of California'
    };
    
    setSelectedLawyer(lawyerData);
    setShowLawyerDetails(true);
  };

  const handleHomeLawFirmClick = (firm) => {
    setSelectedLawFirm(firm);
    setShowLawFirmDetails(true);
  };

  const handleHomeSeeAll = () => {
    if (homeSliderMode === 'lawyers') {
      setShowAllHomeLawyers(true);
    } else {
      setShowAllHomeLawFirms(true);
    }
  };

  // Law Firm Details Screen (adapted from App.js)
  const renderLawFirmDetailsScreen = () => {
    if (!selectedLawFirm) return null;

    // Services that the law firm offers
    const firmServices = [
      { name: 'Legal Consultation', icon: 'account-balance', description: 'Professional legal advice and consultation' },
      { name: 'Contract Review', icon: 'description', description: 'Comprehensive contract analysis and review' },
      { name: 'Litigation Support', icon: 'gavel', description: 'Court representation and legal proceedings' },
      { name: 'Legal Documentation', icon: 'description', description: 'Preparation of legal documents and agreements' },
      { name: 'Compliance Advisory', icon: 'verified', description: 'Regulatory compliance and advisory services' },
      { name: 'Corporate Law', icon: 'business', description: 'Business formation and corporate legal matters' }
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
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.lawFirmDetailsNavTitle}>Law Firm Detail</Text>
          <TouchableOpacity style={styles.lawFirmDetailsFilterButton}>
            <MaterialIcons name="more-vert" size={20} color="#ffffff" />
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
                <MaterialIcons name="lightbulb" size={24} color="#2E4A6B" />
              </View>
              <Text style={styles.lawFirmDetailsDescriptionTitle}>
                About {selectedLawFirm.name}
              </Text>
            </View>
            <Text style={styles.lawFirmDetailsDescriptionText}>
              {selectedLawFirm.name} is a leading law firm specializing in {selectedLawFirm.specialty}. Our experienced team of legal professionals provides comprehensive legal services with a commitment to excellence and client satisfaction. We have successfully handled thousands of cases with outstanding results.
            </Text>
            <View style={styles.lawFirmDetailsFeatures}>
              <View style={styles.lawFirmDetailsFeature}>
                <MaterialIcons name="check-circle" size={16} color="#28a745" />
                <Text style={styles.lawFirmDetailsFeatureText}>Experienced Legal Team</Text>
              </View>
              <View style={styles.lawFirmDetailsFeature}>
                <MaterialIcons name="check-circle" size={16} color="#28a745" />
                <Text style={styles.lawFirmDetailsFeatureText}>Proven Track Record</Text>
              </View>
              <View style={styles.lawFirmDetailsFeature}>
                <MaterialIcons name="check-circle" size={16} color="#28a745" />
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
                    <MaterialIcons name={service.icon} size={24} color="#2E4A6B" />
                  </View>
                  <View style={styles.lawFirmDetailsServiceInfo}>
                    <Text style={styles.lawFirmDetailsServiceName}>{service.name}</Text>
                    <Text style={styles.lawFirmDetailsServiceDescription}>{service.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.lawFirmDetailsBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // All Home Lawyers Screen
  const renderAllHomeLawyersScreen = () => {
    return (
      <View style={styles.viewAllContainer}>
        <StatusBar style="light" />
        
        <View style={styles.viewAllHeader}>
          <TouchableOpacity 
            onPress={() => setShowAllHomeLawyers(false)}
            style={styles.viewAllBackButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.viewAllTitle}>All Lawyers</Text>
          <View style={styles.viewAllPlaceholder} />
        </View>

        <ScrollView style={styles.viewAllContent}>
          <View style={styles.viewAllGrid}>
            {firmLawyers.map((lawyer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.viewAllLawyerCard}
                onPress={() => {
                  setShowAllHomeLawyers(false);
                  handleHomeLawyerClick(lawyer);
                }}
              >
                <View style={styles.viewAllLawyerImageContainer}>
                  <Image
                    source={lawyerImages[lawyer.image % lawyerImages.length]}
                    style={styles.viewAllLawyerImage}
                  />
                </View>
                <View style={styles.viewAllLawyerInfo}>
                  <Text style={styles.viewAllLawyerName}>{lawyer.name}</Text>
                  <Text style={styles.viewAllLawyerSpecialty}>{lawyer.specialty}</Text>
                  <Text style={styles.viewAllLawyerExperience}>{lawyer.experience} experience</Text>
                  <View style={styles.viewAllLawyerStats}>
                    <View style={styles.viewAllLawyerStat}>
                      <MaterialIcons name="star" size={14} color="#ffc107" />
                      <Text style={styles.viewAllLawyerStatText}>{lawyer.rating}</Text>
                    </View>
                    <View style={styles.viewAllLawyerStat}>
                      <MaterialIcons name="work" size={14} color="#666" />
                      <Text style={styles.viewAllLawyerStatText}>{lawyer.cases} cases</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.viewAllBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  // All Home Law Firms Screen
  const renderAllHomeLawFirmsScreen = () => {
    const externalFirms = [
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
    ];

    return (
      <View style={styles.viewAllContainer}>
        <StatusBar style="light" />
        
        <View style={styles.viewAllHeader}>
          <TouchableOpacity 
            onPress={() => setShowAllHomeLawFirms(false)}
            style={styles.viewAllBackButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.viewAllTitle}>All Law Firms</Text>
          <View style={styles.viewAllPlaceholder} />
        </View>

        <ScrollView style={styles.viewAllContent}>
          <View style={styles.viewAllGrid}>
            {externalFirms.map((firm, index) => (
              <TouchableOpacity
                key={index}
                style={styles.viewAllFirmCard}
                onPress={() => {
                  setShowAllHomeLawFirms(false);
                  handleHomeLawFirmClick(firm);
                }}
              >
                <View style={styles.viewAllFirmImageContainer}>
                  <Image source={firm.image} style={styles.viewAllFirmImage} />
                </View>
                <View style={styles.viewAllFirmInfo}>
                  <Text style={styles.viewAllFirmName}>{firm.name}</Text>
                  <Text style={styles.viewAllFirmSpecialty}>{firm.specialty}</Text>
                  <Text style={styles.viewAllFirmDescription}>{firm.location} away</Text>
                  <View style={styles.viewAllFirmStats}>
                    <View style={styles.viewAllFirmStat}>
                      <MaterialIcons name="star" size={14} color="#ffc107" />
                      <Text style={styles.viewAllFirmStatText}>{firm.rating}</Text>
                    </View>
                    <View style={styles.viewAllFirmStat}>
                      <MaterialIcons name="people" size={14} color="#666" />
                      <Text style={styles.viewAllFirmStatText}>{firm.lawyers} lawyers</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.viewAllBottomSpacing} />
        </ScrollView>
      </View>
    );
  };

  const renderClientManagementScreen = () => (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => {
          setShowClientManagement(false);
          setLawfirmCurrentScreen('home');
        }}>
          <MaterialIcons name="arrow-back" size={24} color="#2E4A6B" />
      </TouchableOpacity>
        <Text style={styles.screenTitle}>Client Management</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.placeholderContent}>
          <MaterialIcons name="group" size={80} color="#2E4A6B" />
          <Text style={styles.placeholderTitle}>Client Management</Text>
          <Text style={styles.placeholderText}>
            Manage all your law firm's clients, track their cases, and maintain client relationships.
          </Text>
        </View>
      </ScrollView>
    </View>
  );

  const renderFinancialReportsScreen = () => (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => {
          setShowFinancialReports(false);
          setLawfirmCurrentScreen('profile');
        }}>
          <MaterialIcons name="arrow-back" size={24} color="#2E4A6B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Financial Reports</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Financial Overview Cards */}
        <View style={styles.financialOverviewSection}>
          <Text style={styles.sectionTitle}>Financial Overview</Text>
          <View style={styles.financialStatsGrid}>
            <View style={styles.financialStatCard}>
              <MaterialIcons name="trending-up" size={24} color="#4CAF50" />
              <Text style={styles.financialStatNumber}>$45,280</Text>
              <Text style={styles.financialStatLabel}>Total Revenue</Text>
              <Text style={styles.financialStatPeriod}>This Month</Text>
            </View>
            
            <View style={styles.financialStatCard}>
              <MaterialIcons name="account-balance-wallet" size={24} color="#2E4A6B" />
              <Text style={styles.financialStatNumber}>$38,120</Text>
              <Text style={styles.financialStatLabel}>Collected</Text>
              <Text style={styles.financialStatPeriod}>This Month</Text>
            </View>
            
            <View style={styles.financialStatCard}>
              <MaterialIcons name="schedule" size={24} color="#FF9800" />
              <Text style={styles.financialStatNumber}>$7,160</Text>
              <Text style={styles.financialStatLabel}>Pending</Text>
              <Text style={styles.financialStatPeriod}>Outstanding</Text>
            </View>
            
            <View style={styles.financialStatCard}>
              <MaterialIcons name="bar-chart" size={24} color="#7B1FA2" />
              <Text style={styles.financialStatNumber}>84.2%</Text>
              <Text style={styles.financialStatLabel}>Collection Rate</Text>
              <Text style={styles.financialStatPeriod}>This Month</Text>
            </View>
          </View>
        </View>

        {/* Revenue Breakdown */}
        <View style={styles.financialSection}>
          <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
          <View style={styles.financialCard}>
            <View style={styles.revenueItem}>
              <View style={styles.revenueItemLeft}>
                <View style={[styles.revenueColorDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.revenueItemLabel}>Consultation Fees</Text>
              </View>
              <Text style={styles.revenueItemAmount}>$18,500</Text>
            </View>
            
            <View style={styles.revenueItem}>
              <View style={styles.revenueItemLeft}>
                <View style={[styles.revenueColorDot, { backgroundColor: '#2E4A6B' }]} />
                <Text style={styles.revenueItemLabel}>Retainer Fees</Text>
              </View>
              <Text style={styles.revenueItemAmount}>$15,200</Text>
            </View>
            
            <View style={styles.revenueItem}>
              <View style={styles.revenueItemLeft}>
                <View style={[styles.revenueColorDot, { backgroundColor: '#FF9800' }]} />
                <Text style={styles.revenueItemLabel}>Court Representations</Text>
              </View>
              <Text style={styles.revenueItemAmount}>$8,300</Text>
            </View>
            
            <View style={styles.revenueItem}>
              <View style={styles.revenueItemLeft}>
                <View style={[styles.revenueColorDot, { backgroundColor: '#7B1FA2' }]} />
                <Text style={styles.revenueItemLabel}>Document Preparation</Text>
              </View>
              <Text style={styles.revenueItemAmount}>$3,280</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.financialSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.financialCard}>
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: '#E8F5E8' }]}>
                  <MaterialIcons name="add" size={16} color="#4CAF50" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>Payment Received</Text>
                  <Text style={styles.transactionSubtitle}>Johnson vs. Smith Case</Text>
                  <Text style={styles.transactionDate}>Dec 10, 2024</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>+$2,500</Text>
            </View>
            
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: '#E8F5E8' }]}>
                  <MaterialIcons name="add" size={16} color="#4CAF50" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>Consultation Fee</Text>
                  <Text style={styles.transactionSubtitle}>Maria Rodriguez</Text>
                  <Text style={styles.transactionDate}>Dec 9, 2024</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>+$350</Text>
            </View>
            
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialIcons name="schedule" size={16} color="#FF9800" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>Pending Invoice</Text>
                  <Text style={styles.transactionSubtitle}>Corporate Legal Services</Text>
                  <Text style={styles.transactionDate}>Dec 8, 2024</Text>
                </View>
              </View>
              <Text style={styles.transactionAmountPending}>$1,800</Text>
            </View>
            
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: '#E8F5E8' }]}>
                  <MaterialIcons name="add" size={16} color="#4CAF50" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>Retainer Payment</Text>
                  <Text style={styles.transactionSubtitle}>Thompson Family Trust</Text>
                  <Text style={styles.transactionDate}>Dec 7, 2024</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>+$5,000</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.financialSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.financialActionsGrid}>
            <TouchableOpacity style={styles.financialActionCard}>
              <MaterialIcons name="receipt" size={28} color="#2E4A6B" />
              <Text style={styles.financialActionLabel}>Generate Invoice</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.financialActionCard}>
              <MaterialIcons name="file-download" size={28} color="#2E4A6B" />
              <Text style={styles.financialActionLabel}>Export Report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.financialActionCard}>
              <MaterialIcons name="payment" size={28} color="#2E4A6B" />
              <Text style={styles.financialActionLabel}>Payment History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.financialActionCard}>
              <MaterialIcons name="settings" size={28} color="#2E4A6B" />
              <Text style={styles.financialActionLabel}>Billing Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'home' && styles.activeNavItem]}
          onPress={() => {
            setShowFinancialReports(false);
            setLawfirmCurrentScreen('home');
          }}
        >
          <MaterialIcons name="home" size={24} color={lawfirmCurrentScreen === 'home' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'lawyers' && styles.activeNavItem]}
          onPress={() => {
            setShowFinancialReports(false);
            setLawfirmCurrentScreen('lawyers');
            setShowLawyerRoster(true);
          }}
        >
          <MaterialIcons name="settings" size={24} color={lawfirmCurrentScreen === 'lawyers' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'lawyers' && styles.activeNavText]}>Management</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'cases' && styles.activeNavItem]}
          onPress={() => {
            setShowFinancialReports(false);
            setLawfirmCurrentScreen('cases');
            setShowCaseManagement(true);
          }}
        >
          <MaterialIcons name="folder" size={24} color={lawfirmCurrentScreen === 'cases' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'cases' && styles.activeNavText]}>Cases</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'appointments' && styles.activeNavItem]}
          onPress={() => setLawfirmCurrentScreen('appointments')}
        >
          <MaterialIcons name="event" size={24} color={lawfirmCurrentScreen === 'appointments' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'appointments' && styles.activeNavText]}>Appointments</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, lawfirmCurrentScreen === 'profile' && styles.activeNavItem]}
          onPress={() => {
            setShowFinancialReports(false);
            setLawfirmCurrentScreen('profile');
          }}
        >
          <MaterialIcons name="person" size={24} color={lawfirmCurrentScreen === 'profile' ? '#2E4A6B' : '#666'} />
          <Text style={[styles.navText, lawfirmCurrentScreen === 'profile' && styles.activeNavText]}>Profile</Text>
      </TouchableOpacity>
      </View>
    </View>
  );

  // Helper functions for notifications
  const getNotificationIconName = (type) => {
    switch (type) {
      case 'appointment':
        return 'event';
      case 'lawyer_request':
        return 'person-add';
      case 'case_update':
        return 'folder';
      default:
        return 'notifications';
    }
  };

  const getNotificationIconColor = (type) => {
    switch (type) {
      case 'appointment':
        return '#4CAF50';
      case 'lawyer_request':
        return '#2E4A6B';
      case 'case_update':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    
    // Navigate to related screen
    setShowNotifications(false);
    
    switch (notification.type) {
      case 'appointment':
        setShowAppointments(true);
        setLawfirmCurrentScreen('appointments');
        break;
      case 'lawyer_request':
        setLawyerPageTab('requests');
        setShowLawyerRoster(true);
        setLawfirmCurrentScreen('lawyers');
        break;
      case 'case_update':
        setShowCaseManagement(true);
        setLawfirmCurrentScreen('cases');
        break;
      default:
        break;
    }
  };

  // Notifications Screen
  const renderNotificationsScreen = () => (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.notificationsHeader}>
        <TouchableOpacity 
          onPress={() => setShowNotifications(false)}
          style={styles.notificationsBackButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.notificationsTitle}>Notifications</Text>
        <TouchableOpacity 
          onPress={() => {
            const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
            setNotifications(updatedNotifications);
          }}
          style={styles.notificationsMarkAllButton}
        >
          <Text style={styles.notificationsMarkAllText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationsContent}>
        {notifications.length === 0 ? (
          <View style={styles.emptyNotifications}>
            <MaterialIcons name="notifications-none" size={64} color="#ccc" />
            <Text style={styles.emptyNotificationsTitle}>No Notifications</Text>
            <Text style={styles.emptyNotificationsSubtitle}>
              You'll see notifications about appointments and lawyer requests here
            </Text>
          </View>
        ) : (
          notifications.map((notification, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.notificationCard,
                !notification.read && styles.notificationCardUnread
              ]}
              onPress={() => handleNotificationClick(notification)}
            >
              <View style={styles.notificationCardHeader}>
                <View style={[
                  styles.notificationIcon,
                  { backgroundColor: getNotificationIconColor(notification.type) }
                ]}>
                  <MaterialIcons 
                    name={getNotificationIconName(notification.type)} 
                    size={20} 
                    color="#ffffff" 
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                {!notification.read && (
                  <View style={styles.notificationUnreadDot} />
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );

  // Settings Screen
  const renderSettingsScreen = () => (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.settingsHeader}>
        <TouchableOpacity 
          onPress={() => setShowSettings(false)}
          style={styles.settingsBackButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.settingsTitle}>Settings</Text>
        <View style={styles.settingsPlaceholder} />
      </View>

      <ScrollView style={styles.settingsContent}>
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>General</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <MaterialIcons name="person" size={24} color="#2E4A6B" />
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemTitle}>Account Settings</Text>
              <Text style={styles.settingsItemSubtitle}>Manage your account information</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <MaterialIcons name="notifications" size={24} color="#2E4A6B" />
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemTitle}>Notification Preferences</Text>
              <Text style={styles.settingsItemSubtitle}>Configure your notification settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <MaterialIcons name="security" size={24} color="#2E4A6B" />
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemTitle}>Privacy & Security</Text>
              <Text style={styles.settingsItemSubtitle}>Manage privacy and security options</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <MaterialIcons name="help" size={24} color="#2E4A6B" />
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemTitle}>Help & Support</Text>
              <Text style={styles.settingsItemSubtitle}>Get help and contact support</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <MaterialIcons name="info" size={24} color="#2E4A6B" />
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemTitle}>About</Text>
              <Text style={styles.settingsItemSubtitle}>App version and information</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // Main screen router for Law Firm App
  const renderCurrentLawfirmScreen = () => {
    // Handle overlay screens first
    if (showNotifications) return renderNotificationsScreen();
    if (showSettings) return renderSettingsScreen();
    if (showLogoutConfirmation) return renderLogoutConfirmationScreen();
    if (showManageProfile) return renderManageProfileScreen();
    if (showRemoveLawyerConfirmation) return renderRemoveLawyerConfirmationScreen();
    if (showAssignLawyer) return renderAssignLawyerScreen();
    if (showReassignLawyer) return renderReassignLawyerScreen();
    if (showReassignCaseLawyer) return renderReassignCaseLawyerScreen();
    if (showAppointmentDetails) return renderAppointmentDetailsScreen();
    if (showEditCase) return renderEditCaseScreen();
    if (showAddActivity) return renderAddActivityScreen();
    if (showCaseDetails) return renderCaseDetailsScreen();
    if (showLawFirmDetails) return renderLawFirmDetailsScreen();
    if (showAllHomeLawyers) return renderAllHomeLawyersScreen();
    if (showAllHomeLawFirms) return renderAllHomeLawFirmsScreen();
    if (showLawyerDetails) return renderLawyerDetailScreen();
    if (showClientDetails) return renderClientDetailsScreen();
    if (showChooseLawyer) return renderChooseLawyerScreen();
    if (showAppointments) return renderAppointmentsScreen();
    if (showLawyerRoster) return renderLawyerRosterScreen();
    if (showCaseManagement) return renderCaseManagementScreen();
    if (showClientManagement) return renderClientManagementScreen();
    if (showFinancialReports) return renderFinancialReportsScreen();

    // Handle main navigation screens
    switch (lawfirmCurrentScreen) {
      case 'home':
    return renderLawfirmHomeScreen();
      case 'lawyers':
        setShowLawyerRoster(true);
        return renderLawyerRosterScreen();
      case 'cases':
        setShowCaseManagement(true);
        return renderCaseManagementScreen();
      case 'appointments':
        setShowAppointments(true);
        return renderAppointmentsScreen();
      case 'profile':
        return renderLawfirmProfileScreen();
      default:
        return renderLawfirmHomeScreen();
    }
  };

  return renderCurrentLawfirmScreen();
};

// Styles for the LawfirmApp component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firmLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  firmName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  firmSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingTop: 20,
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quickActionsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
    marginTop: 8,
    textAlign: 'center',
  },
  recentCasesContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    color: '#2E4A6B',
    fontSize: 14,
    fontWeight: '600',
  },
  caseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  clientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  caseInfo: {
    flex: 1,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  caseClient: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  caseLawyer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  caseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  caseValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#2E4A6B',
  },
  navText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  activeNavText: {
    color: '#2E4A6B',
    fontWeight: '600',
  },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  lawyerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  lawyerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  lawyerInfo: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawyerSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  lawyerExperience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  lawyerStats: {
    flexDirection: 'row',
    gap: 10,
  },
  lawyerRating: {
    fontSize: 12,
    color: '#666',
  },
  lawyerCases: {
    fontSize: 12,
    color: '#666',
  },
  lawyerRate: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  profileDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  profileDetails: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  editButton: {
    backgroundColor: '#2E4A6B',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#2E4A6B',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    color: '#2E4A6B',
    fontSize: 16,
    padding: 10,
  },

  // Placeholder Content Styles
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Law Firm Profile Screen Styles
  lawfirmProfileContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawfirmProfileHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  lawfirmProfileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  lawfirmProfileBackButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawfirmProfileTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lawfirmProfileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerNotificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lawfirmProfileSettingsButton: {
    padding: 8,
  },
  lawfirmProfileContent: {
    flex: 1,
  },
  lawfirmProfileInfoCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 10,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lawfirmProfileAvatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  lawfirmProfileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  lawfirmProfileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
    textAlign: 'center',
  },
  lawfirmProfileSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  lawfirmProfileStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  lawfirmProfileStatItem: {
    alignItems: 'center',
  },
  lawfirmProfileStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawfirmProfileStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  lawfirmProfileMenuCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lawfirmProfileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  lawfirmProfileMenuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lawfirmProfileMenuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    fontWeight: '500',
  },
  lawfirmProfileComingSoonBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lawfirmProfileComingSoonText: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '600',
  },

  // Edit Profile Input Styles
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

  // Category Selection Styles
  categorySelectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categorySelectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minWidth: 120,
  },
  categorySelectionCardSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2E4A6B',
  },
  categorySelectionIconContainer: {
    marginRight: 6,
  },
  categorySelectionIconContainerSelected: {
    backgroundColor: '#2E4A6B',
    borderRadius: 10,
    padding: 2,
  },
  categorySelectionName: {
    fontSize: 13,
    color: '#2E4A6B',
    fontWeight: '600',
    flex: 1,
  },
  categorySelectionNameSelected: {
    color: '#2E4A6B',
    fontWeight: 'bold',
  },

  // Services Update Notice Styles
  servicesUpdateNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  servicesUpdateNoticeText: {
    fontSize: 13,
    color: '#1976D2',
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  lawFirmDetailsServiceCardEdit: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8E9',
  },
  servicesMoreIndicator: {
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  servicesMoreText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },

  // Enhanced Home Page Styles
  homeHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  homeHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  homeHeaderLogo: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  homeHeaderText: {
    flex: 1,
  },
  homeHeaderFirmName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  homeHeaderWelcome: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  homeHeaderSettingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  homeHeroSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    marginTop: 25,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  homeHeroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  homeHeroSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    fontWeight: '500',
  },
  homeStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  homeStatCard: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  homeStatCardPrimary: {
    backgroundColor: '#ffffff',
  },
  homeStatCardSecondary: {
    backgroundColor: '#ffffff',
  },
  homeStatCardAccent: {
    backgroundColor: '#ffffff',
  },
  homeStatCardSuccess: {
    backgroundColor: '#ffffff',
  },
  homeStatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  homeStatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  homeStatNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E4A6B',
    marginBottom: 4,
    lineHeight: 22,
  },
  homeStatLabel: {
    fontSize: 11,
    color: '#6c757d',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    lineHeight: 14,
  },
  homeQuickActionsSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    marginTop: 10,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  homeSectionHeader: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 3,
  },
  homeSectionSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  homeQuickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  homeQuickActionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  homeQuickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  homeQuickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
    textAlign: 'center',
  },
  homeQuickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
  },
  homeRecentCasesSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    marginTop: 10,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  homeViewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  homeViewAllText: {
    color: '#2E4A6B',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5,
  },
  homeCaseCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  homeCaseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  homeCaseClientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  homeCaseHeaderInfo: {
    flex: 1,
  },
  homeCaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 3,
  },
  homeCaseClient: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  homeCaseStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  homeCaseStatusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  homeCaseCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  homeCaseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  homeCaseDetailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  homeBottomSpacing: {
    height: 20,
  },

  // Lawyer Detail Screen Styles
  lawyerDetailContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lawyerDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  lawyerDetailBackButton: {
    padding: 10,
  },
  lawyerDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lawyerDetailFavorite: {
    padding: 10,
  },
  lawyerDetailScroll: {
    flex: 1,
  },
  lawyerDetailHeroSection: {
    backgroundColor: '#2E4A6B',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawyerDetailProfileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lawyerDetailProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lawyerDetailProfileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  lawyerDetailProfileSpecialty: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    textAlign: 'center',
  },
  lawyerDetailQuickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  lawyerDetailQuickStat: {
    alignItems: 'center',
  },
  lawyerDetailQuickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  lawyerDetailQuickStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
  },
  lawyerDetailSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lawyerDetailSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  lawyerDetailSectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  lawyerDetailInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lawyerDetailInfoContent: {
    marginLeft: 16,
    flex: 1,
  },
  lawyerDetailInfoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  lawyerDetailInfoValue: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
    lineHeight: 22,
  },
  lawyerDetailBottomSpacing: {
    height: 30,
  },

  // Choose Lawyer Screen Styles
  chooseLawyerContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  chooseLawyerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  chooseLawyerBackButton: {
    padding: 10,
  },
  chooseLawyerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chooseLawyerPlaceholder: {
    width: 40,
  },
  chooseLawyerSearchContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  chooseLawyerSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  chooseLawyerSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2E4A6B',
    marginLeft: 10,
  },
  chooseLawyerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chooseLawyerNoResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  chooseLawyerNoResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  chooseLawyerNoResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  chooseLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  chooseLawyerCardContent: {
    flexDirection: 'row',
    padding: 15,
  },
  chooseLawyerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  chooseLawyerInfo: {
    flex: 1,
  },
  chooseLawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  chooseLawyerSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  chooseLawyerExperience: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  chooseLawyerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chooseLawyerRating: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '600',
  },
  chooseLawyerCases: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  chooseLawyerRate: {
    fontSize: 12,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  chooseLawyerAddButton: {
    backgroundColor: '#2E4A6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  chooseLawyerAddButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  chooseLawyerAddButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  chooseLawyerAddButtonTextDisabled: {
    color: '#666',
  },
  chooseLawyerBottomSpacing: {
    height: 30,
  },

  // Lawyer Roster Enhancement Styles
  lawyerCardContainer: {
    marginBottom: 15,
  },
  emptyLawyerRoster: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyLawyerRosterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyLawyerRosterSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  removeLawyerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  removeLawyerButtonText: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Remove Lawyer Confirmation Screen Styles
  removeLawyerConfirmationContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  removeLawyerConfirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#dc3545',
  },
  removeLawyerConfirmationBackButton: {
    padding: 10,
  },
  removeLawyerConfirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  removeLawyerConfirmationPlaceholder: {
    width: 40,
  },
  removeLawyerConfirmationContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  removeLawyerWarningSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  removeLawyerWarningIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  removeLawyerWarningTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 15,
    textAlign: 'center',
  },
  removeLawyerWarningText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  removeLawyerInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  removeLawyerInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  removeLawyerInfoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 3,
    borderColor: '#e9ecef',
  },
  removeLawyerInfoDetails: {
    flex: 1,
  },
  removeLawyerInfoName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  removeLawyerInfoSpecialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  removeLawyerInfoExperience: {
    fontSize: 14,
    color: '#999',
  },
  removeLawyerInfoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  removeLawyerInfoStat: {
    alignItems: 'center',
  },
  removeLawyerInfoStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  removeLawyerInfoStatLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  removeLawyerImpactSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  removeLawyerImpactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
  },
  removeLawyerImpactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  removeLawyerImpactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  removeLawyerConfirmationActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 15,
  },
  removeLawyerCancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  removeLawyerCancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  removeLawyerConfirmButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  removeLawyerConfirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Appointments Management Screen Styles
  appointmentsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appointmentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  appointmentsBackButton: {
    padding: 10,
  },
  appointmentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appointmentsHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentsBadge: {
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  appointmentsBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentsContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appointmentsSectionHeader: {
    marginTop: 25,
    marginBottom: 15,
  },
  appointmentsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 5,
  },
  appointmentsSectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
  },
  appointmentCardAccepted: {
    borderLeftColor: '#4CAF50',
  },
  appointmentCardDeclined: {
    borderLeftColor: '#dc3545',
    opacity: 0.8,
  },
  appointmentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  appointmentClientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  appointmentClientInfo: {
    flex: 1,
  },
  appointmentClientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 3,
  },
  appointmentType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  appointmentLegalArea: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  appointmentAssignedLawyer: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  appointmentDeclinedText: {
    fontSize: 14,
    color: '#dc3545',
    fontWeight: '600',
  },
  appointmentUrgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appointmentUrgencyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  appointmentStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appointmentStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 5,
  },
  appointmentStatusBadgeDeclined: {
    backgroundColor: '#ffebee',
  },
  appointmentStatusTextDeclined: {
    color: '#dc3545',
  },
  appointmentDetails: {
    marginBottom: 15,
  },
  appointmentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  appointmentDescription: {
    marginBottom: 20,
  },
  appointmentDescriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  appointmentDescriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  appointmentDeclineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dc3545',
    borderRadius: 10,
    paddingVertical: 12,
  },
  appointmentDeclineButtonText: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  appointmentAcceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
  },
  appointmentAcceptButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  appointmentsEmptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  appointmentsEmptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  appointmentsEmptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  appointmentsBottomSpacing: {
    height: 30,
  },

  // Appointment Tabs Styles
  appointmentTabsContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 8,
  },
  appointmentTabsContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  appointmentTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginRight: 8,
  },
  appointmentTabActive: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
  },
  appointmentTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  appointmentTabTextActive: {
    color: '#ffffff',
  },
  appointmentTabBadge: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  appointmentTabBadgeAccepted: {
    backgroundColor: '#4CAF50',
  },
  appointmentTabBadgeDeclined: {
    backgroundColor: '#dc3545',
  },
  appointmentTabBadgeAll: {
    backgroundColor: '#2E4A6B',
  },
  appointmentTabBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Appointment Details Screen Styles
  appointmentDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appointmentDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
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
    marginHorizontal: 20,
  },
  appointmentDetailsHeaderSpace: {
    width: 40,
  },
  appointmentDetailsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  appointmentDetailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentDetailsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  appointmentDetailsCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginLeft: 10,
  },
  appointmentDetailsClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDetailsClientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  appointmentDetailsClientDetails: {
    flex: 1,
  },
  appointmentDetailsClientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  appointmentDetailsClientPhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  appointmentDetailsClientEmail: {
    fontSize: 16,
    color: '#666',
  },
  appointmentDetailsInfo: {
    gap: 12,
  },
  appointmentDetailsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentDetailsInfoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    flex: 1,
  },
  appointmentDetailsInfoValue: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  appointmentDetailsUrgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  appointmentDetailsUrgencyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  appointmentDetailsStatusInfo: {
    gap: 12,
  },
  appointmentDetailsStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  appointmentDetailsStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  appointmentDetailsDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  appointmentDetailsActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  appointmentDetailsDeclineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 8,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentDetailsDeclineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
  },
  appointmentDetailsAcceptButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 8,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentDetailsAcceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  appointmentDetailsReassignButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#2E4A6B',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 8,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentDetailsReassignButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  appointmentDetailsReacceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 8,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentDetailsReacceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  appointmentDetailsBottomSpacing: {
    height: 30,
  },

  // Law Firm Cases Screen Styles
  lawfirmCasesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  lawfirmCasesBackButton: {
    padding: 8,
  },
  lawfirmCasesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  lawfirmCasesAddButton: {
    padding: 8,
  },
  lawfirmCasesStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    gap: 10,
  },
  lawfirmCaseStatCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  lawfirmCaseStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawfirmCaseStatLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
  lawfirmCasesContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#f8f9fa',
  },
  lawfirmCaseCard: {
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
  lawfirmCaseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lawfirmCaseCardHeaderLeft: {
    flex: 1,
  },
  lawfirmCaseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  lawfirmCaseBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  lawfirmStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lawfirmStatusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  lawfirmPriorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lawfirmPriorityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  lawfirmCaseOptionsButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawfirmCaseClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  lawfirmCaseClientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  lawfirmCaseClientDetails: {
    flex: 1,
  },
  lawfirmCaseClientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 2,
  },
  lawfirmCaseClientEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 1,
  },
  lawfirmCaseClientPhone: {
    fontSize: 14,
    color: '#666',
  },
  lawfirmCaseInfo: {
    marginBottom: 15,
  },
  lawfirmCaseType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 6,
  },
  lawfirmCaseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lawfirmCaseAssignedLawyer: {
    marginBottom: 15,
  },
  lawfirmCaseAssignedLawyerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 8,
    marginLeft: 6,
  },
  lawfirmCaseAssignedLawyerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 12,
  },
  lawfirmCaseAssignedLawyerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  lawfirmCaseAssignedLawyerDetails: {
    flex: 1,
  },
  lawfirmCaseAssignedLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 2,
  },
  lawfirmCaseAssignedLawyerSpecialty: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  lawfirmCaseProgressSection: {
    marginBottom: 15,
  },
  lawfirmCaseProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lawfirmCaseProgressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  lawfirmCaseProgressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },
  lawfirmCaseProgressBarContainer: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  lawfirmCaseProgressBar: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: 3,
  },
  lawfirmCaseStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  lawfirmCaseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lawfirmCaseStatText: {
    fontSize: 13,
    color: '#6c757d',
  },
  lawfirmCaseLastActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  lawfirmCaseLastActivityText: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  lawfirmCasesBottomSpacing: {
    height: 30,
  },

  // Enhanced Case Details Screen Styles (based on LawyerApp.js)
  caseDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  caseDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  caseDetailsBackButton: {
    padding: 8,
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
    padding: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  caseOverviewLeft: {
    flex: 1,
  },
  caseDetailsClientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caseDetailsClientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  caseOverviewType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 2,
  },
  caseOverviewContact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  caseOverviewBadges: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadgeLarge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusBadgeLargeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  priorityBadgeLarge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priorityBadgeLargeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  caseOverviewDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  caseProgressSection: {
    marginTop: 4,
  },
  caseProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseProgressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
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
  
  // Assigned Lawyer Section - Law Firm Specific
  caseAssignedLawyerSection: {
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
  caseAssignedLawyerSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  assignedLawyerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  assignedLawyerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  assignedLawyerInfo: {
    flex: 1,
  },
  assignedLawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  assignedLawyerSpecialty: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 4,
  },
  assignedLawyerEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  assignedLawyerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  assignedLawyerActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#2E4A6B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  assignedLawyerActionText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },

  // Case Info Section
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

  // Financial Section
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

  // Action Buttons
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
  caseDetailsBottomSpacing: {
    height: 100,
  },
  appointmentDetailsAssignedLawyerHeader: {
    marginTop: 8,
    marginBottom: 12,
  },
  appointmentDetailsLawyerCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  appointmentDetailsLawyerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  appointmentDetailsLawyerInfo: {
    flex: 1,
  },
  appointmentDetailsLawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  appointmentDetailsLawyerSpecialty: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 3,
  },
  appointmentDetailsLawyerExperience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  appointmentDetailsLawyerEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  appointmentDetailsLawyerStats: {
    flexDirection: 'row',
    gap: 15,
  },
  appointmentDetailsLawyerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  appointmentDetailsLawyerStatText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },

  // Assign Lawyer Screen Styles
  assignLawyerContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  assignLawyerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#4CAF50',
  },
  assignLawyerBackButton: {
    padding: 10,
  },
  assignLawyerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  assignLawyerPlaceholder: {
    width: 40,
  },
  assignLawyerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  assignLawyerAppointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  assignLawyerAppointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  assignLawyerClientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  assignLawyerAppointmentInfo: {
    flex: 1,
  },
  assignLawyerClientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 3,
  },
  assignLawyerAppointmentType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  assignLawyerLegalArea: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  assignLawyerAppointmentDate: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  assignLawyerSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  assignLawyerSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginLeft: 8,
    marginBottom: 2,
  },
  assignLawyerSectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 28,
    marginTop: -15,
  },
  assignLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  assignLawyerCardRecommended: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    backgroundColor: '#f8fff8',
  },
  assignLawyerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  assignLawyerInfo: {
    flex: 1,
  },
  assignLawyerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  assignLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginRight: 8,
  },
  assignLawyerCurrentText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 8,
  },
  assignLawyerCardCurrent: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  assignLawyerSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  assignLawyerExperience: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  assignLawyerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignLawyerRating: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '600',
  },
  assignLawyerCases: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  assignLawyerSuccessRate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  assignLawyerSelectButton: {
    padding: 10,
  },
  assignLawyerBottomSpacing: {
    height: 30,
  },

  // Case Reassign Specific Styles
  caseReassignCurrentLawyer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  caseReassignCurrentLawyerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  caseReassignCurrentLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
  },

  // Logout Confirmation Screen Styles (matching App.js structure)
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
  placeholder: {
    width: 40,
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
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  logoutConfirmationSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 15,
    textAlign: 'center',
  },
  logoutConfirmationSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
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
  logoutConfirmationProfileSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutConfirmationProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutConfirmationProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  logoutConfirmationProfileInfo: {
    flex: 1,
  },
  logoutConfirmationProfileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  logoutConfirmationProfileEmail: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  logoutConfirmationProfileAreas: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
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

  // Law Firm Details Layout Styles (matching App.js and LawyerApp.js)
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
    backgroundColor: '#ffffff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
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
    lineHeight: 28,
  },
  lawFirmDetailsHeroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  lawFirmDetailsStatsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  lawFirmDetailsStat: {
    alignItems: 'center',
    flex: 1,
  },
  lawFirmDetailsStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawFirmDetailsStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  lawFirmDetailsStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  lawFirmDetailsDescriptionCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -40,
    marginBottom: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    zIndex: 10,
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
    backgroundColor: '#E3F2FD',
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
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  lawFirmDetailsFeatures: {
    gap: 12,
  },
  lawFirmDetailsFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawFirmDetailsFeatureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  lawFirmDetailsSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  lawFirmDetailsSectionHeader: {
    marginBottom: 20,
  },
  lawFirmDetailsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawFirmDetailsSectionSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lawFirmDetailsContactGrid: {
    gap: 16,
  },
  lawFirmDetailsContactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  lawFirmDetailsContactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lawFirmDetailsContactInfo: {
    flex: 1,
  },
  lawFirmDetailsContactLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lawFirmDetailsContactValue: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '500',
  },
  lawFirmDetailsPracticeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  lawFirmDetailsPracticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  lawFirmDetailsPracticeIconContainer: {
    marginRight: 8,
  },
  lawFirmDetailsPracticeName: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  lawFirmDetailsServicesGrid: {
    gap: 16,
  },
  lawFirmDetailsServiceCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  lawFirmDetailsServiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lawFirmDetailsServiceInfo: {
    flex: 1,
  },
  lawFirmDetailsServiceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawFirmDetailsServiceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  lawFirmDetailsBottomSpacing: {
    height: 40,
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
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
  },
  editField: {
    marginBottom: 16,
  },
  editFieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  editFieldInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#495057',
    backgroundColor: '#ffffff',
  },
  editFieldTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  editFieldRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  editStatusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  editStatusButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },

  // Status & Progress Styles (from LawyerApp.js)
  statusButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  statusButtonTextActive: {
    color: '#ffffff',
  },
  progressSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  progressButton: {
    backgroundColor: '#2E4A6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarEditContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBarEdit: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFillEdit: {
    height: '100%',
    backgroundColor: '#2E4A6B',
    borderRadius: 4,
  },
  progressPercentEdit: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E4A6B',
    marginTop: 4,
  },
  quickProgressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  quickProgressButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  quickProgressButtonActive: {
    backgroundColor: '#2E4A6B',
    borderColor: '#2E4A6B',
  },
  quickProgressButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  quickProgressButtonTextActive: {
    color: '#ffffff',
  },
  priorityButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  priorityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  priorityButtonTextActive: {
    color: '#ffffff',
  },
  editBottomSpacing: {
    height: 100,
  },

  // Add Activity Screen Styles (matching LawyerApp.js)
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
    flex: 1,
    minWidth: '30%',
    maxWidth: '32%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  activityTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
    marginTop: 8,
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
    gap: 10,
  },
  activityFieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  activityFieldInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#495057',
    backgroundColor: '#ffffff',
  },
  activityFieldTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  activityStatusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    marginRight: 8,
  },
  activityStatusButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  activityStatusButtonTextActive: {
    color: '#ffffff',
  },
  activityPreviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activityPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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

  // Home Slider Section Styles
  homeSliderSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitleWithToggle: {
    flex: 1,
  },
  homeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    padding: 4,
  },
  homeToggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
  },
  homeToggleButtonActive: {
    backgroundColor: '#2E4A6B',
  },
  homeToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  homeToggleTextActive: {
    color: '#ffffff',
  },
  homeSliderScroll: {
    marginTop: 16,
  },
  homeLawyerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  homeLawyerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homeLawyerProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  homeLawyerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 4,
  },
  homeLawyerSpecialty: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 6,
  },
  homeLawyerRating: {
    alignItems: 'center',
    marginBottom: 4,
  },
  homeStars: {
    fontSize: 10,
    marginBottom: 2,
  },
  homeRatingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2E4A6B',
  },
  homeLawyerExperience: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  homeLawFirmCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  homeLawFirmAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homeLawFirmProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  homeLawFirmName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A6B',
    textAlign: 'center',
    marginBottom: 4,
  },
  homeLawFirmSpecialty: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 6,
  },
  homeLawFirmRating: {
    alignItems: 'center',
    marginBottom: 4,
  },
  homeLawFirmLawyers: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },

  // Law Firm Details Screen Styles
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawFirmDetailsFilterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawFirmDetailsScrollContent: {
    flex: 1,
  },
  lawFirmDetailsHeroHeader: {
    height: 280,
    backgroundColor: '#2E4A6B',
  },
  lawFirmDetailsHeroBackground: {
    flex: 1,
    position: 'relative',
  },
  lawFirmDetailsHeroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 74, 107, 0.7)',
  },
  lawFirmDetailsHeroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 1,
  },
  lawFirmDetailsHeroInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  lawFirmDetailsImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: 16,
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
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  lawFirmDetailsStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawFirmDetailsStat: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lawFirmDetailsStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  lawFirmDetailsStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  lawFirmDetailsStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  lawFirmDetailsDescriptionCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 2,
  },
  lawFirmDetailsDescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lawFirmDetailsDescriptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lawFirmDetailsDescriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  lawFirmDetailsDescriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
    marginBottom: 20,
  },
  lawFirmDetailsFeatures: {
    gap: 12,
  },
  lawFirmDetailsFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawFirmDetailsFeatureText: {
    fontSize: 14,
    color: '#495057',
    marginLeft: 12,
    fontWeight: '500',
  },
  lawFirmDetailsSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  lawFirmDetailsSectionHeader: {
    marginBottom: 20,
  },
  lawFirmDetailsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawFirmDetailsSectionSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  lawFirmDetailsServicesGrid: {
    gap: 16,
  },
  lawFirmDetailsServiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  lawFirmDetailsServiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lawFirmDetailsServiceInfo: {
    flex: 1,
  },
  lawFirmDetailsServiceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawFirmDetailsServiceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  lawFirmDetailsBottomSpacing: {
    height: 40,
  },

  // View All Screens Styles
  viewAllContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  viewAllHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  viewAllBackButton: {
    padding: 10,
  },
  viewAllTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  viewAllPlaceholder: {
    width: 40,
  },
  viewAllContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  viewAllGrid: {
    gap: 16,
  },
  viewAllLawyerCard: {
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
  },
  viewAllLawyerImageContainer: {
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
  viewAllLawyerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewAllLawyerInfo: {
    flex: 1,
  },
  viewAllLawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  viewAllLawyerSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 6,
    fontWeight: '500',
  },
  viewAllLawyerExperience: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 8,
  },
  viewAllLawyerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  viewAllLawyerStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllLawyerStatText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
    fontWeight: '600',
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
    marginBottom: 8,
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

  // Lawyer Tab Styles
  lawyerTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#e9ecef',
    overflow: 'visible',
  },
  lawyerTab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
    marginHorizontal: 2,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  lawyerTabActive: {
    backgroundColor: '#2E4A6B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  lawyerTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  lawyerTabTextActive: {
    color: '#ffffff',
  },
  lawyerTabIndicator: {
    display: 'none',
  },
  lawyerRequestBadge: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawyerRequestBadgeCorner: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  lawyerRequestBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Lawyer Request Card Styles
  lawyerRequestCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4A6B',
  },
  lawyerRequestHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lawyerRequestImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lawyerRequestImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lawyerRequestInfo: {
    flex: 1,
  },
  lawyerRequestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  lawyerRequestSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontWeight: '500',
  },
  lawyerRequestExperience: {
    fontSize: 13,
    color: '#666',
  },
  lawyerRequestStatus: {
    alignItems: 'flex-end',
  },
  lawyerRequestStatusBadge: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 4,
  },
  lawyerRequestStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F57C00',
  },
  lawyerRequestDate: {
    fontSize: 11,
    color: '#999',
  },
  lawyerRequestDetails: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  lawyerRequestDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lawyerRequestDetailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  lawyerRequestCoverLetter: {
    marginBottom: 20,
  },
  lawyerRequestCoverLetterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  lawyerRequestCoverLetterText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  lawyerRequestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  lawyerRequestRejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#dc3545',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  lawyerRequestRejectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc3545',
    marginLeft: 6,
  },
  lawyerRequestViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#2E4A6B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  lawyerRequestViewText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E4A6B',
    marginLeft: 6,
  },
  lawyerRequestAcceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4A6B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  lawyerRequestAcceptText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },

  // Header Action Styles
  homeHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeHeaderActionButton: {
    padding: 8,
    marginLeft: 8,
    position: 'relative',
  },
  appointmentsActionButton: {
    padding: 8,
    marginRight: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Notifications Screen Styles
  notificationsHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  notificationsMarkAllButton: {
    padding: 8,
  },
  notificationsMarkAllText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationsContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  emptyNotifications: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyNotificationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyNotificationsSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#2E4A6B',
  },
  notificationCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationUnreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E4A6B',
    marginLeft: 12,
    marginTop: 4,
  },

  // Settings Screen Styles
  settingsHeader: {
    backgroundColor: '#2E4A6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsBackButton: {
    padding: 8,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  settingsPlaceholder: {
    width: 40,
  },
  settingsContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  settingsSection: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsItemContent: {
    flex: 1,
    marginLeft: 16,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  // Financial Reports Styles
  financialOverviewSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    marginBottom: 10,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  financialSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  financialStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  financialStatCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  financialStatNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E4A6B',
    marginTop: 8,
    marginBottom: 4,
  },
  financialStatLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  financialStatPeriod: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  financialCard: {
    backgroundColor: '#ffffff',
  },
  revenueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  revenueItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  revenueColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  revenueItemLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  revenueItemAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E4A6B',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  transactionAmountPending: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF9800',
  },
  financialActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  financialActionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  financialActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E4A6B',
    textAlign: 'center',
    marginTop: 8,
  },

  // Client Roster Styles
  clientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  clientCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  clientImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  clientInfo: {
    flex: 1,
  },
  clientNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  clientStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  clientStatusActive: {
    backgroundColor: '#E8F5E8',
  },
  clientStatusInactive: {
    backgroundColor: '#FFF3E0',
  },
  clientStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  clientStatusTextActive: {
    color: '#4CAF50',
  },
  clientStatusTextInactive: {
    color: '#FF9800',
  },
  clientType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  clientContact: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '500',
  },
  clientDetails: {
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  clientDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  clientDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  clientStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  clientStatItem: {
    alignItems: 'center',
  },
  clientStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 4,
  },
  clientStatLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  clientViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  clientViewButtonText: {
    fontSize: 14,
    color: '#2E4A6B',
    fontWeight: '600',
    marginLeft: 6,
  },

  // Client Details Screen Styles (similar to User Details in LawyerApp.js)
  clientDetailsContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  clientDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2E4A6B',
  },
  clientDetailsBackButton: {
    padding: 10,
  },
  clientDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  clientDetailsPlaceholder: {
    width: 40,
    height: 40,
  },
  clientDetailsScrollContent: {
    flex: 1,
  },

  // Client Hero Section
  clientDetailsHeroSection: {
    marginBottom: 20,
  },
  clientDetailsHeroBackground: {
    backgroundColor: '#2E4A6B',
    position: 'relative',
  },
  clientDetailsHeroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 74, 107, 0.8)',
  },
  clientDetailsHeroContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  clientDetailsHeroInfo: {
    alignItems: 'center',
  },
  clientDetailsImageContainer: {
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
  clientDetailsHeroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  clientDetailsHeroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  clientDetailsHeroSubtitle: {
    fontSize: 18,
    color: '#e8f4f8',
    marginBottom: 20,
    textAlign: 'center',
  },
  clientDetailsStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientDetailsStat: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  clientDetailsStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  clientDetailsStatLabel: {
    fontSize: 14,
    color: '#e8f4f8',
    marginTop: 4,
  },
  clientDetailsStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e8f4f8',
  },

  // Contact Information Section
  clientDetailsContactCard: {
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
  clientDetailsContactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientDetailsContactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientDetailsContactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  clientDetailsContactInfo: {
    gap: 12,
  },
  clientDetailsContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  clientDetailsContactText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },

  // Business Information Section
  clientDetailsBusinessCard: {
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
  clientDetailsBusinessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientDetailsBusinessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientDetailsBusinessTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  clientDetailsBusinessInfo: {
    gap: 16,
  },
  clientDetailsBusinessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clientDetailsBusinessLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  clientDetailsBusinessValue: {
    fontSize: 16,
    color: '#2E4A6B',
    fontWeight: '600',
  },
  clientDetailsStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  clientDetailsStatusActive: {
    backgroundColor: '#E8F5E8',
  },
  clientDetailsStatusInactive: {
    backgroundColor: '#FFF3E0',
  },
  clientDetailsStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  clientDetailsStatusTextActive: {
    color: '#4CAF50',
  },
  clientDetailsStatusTextInactive: {
    color: '#FF9800',
  },

  // Cases Section
  clientDetailsCasesCard: {
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
  clientDetailsCasesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientDetailsCasesIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientDetailsCasesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  clientDetailsCasesInfo: {
    alignItems: 'center',
  },
  clientDetailsCasesStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  clientDetailsCasesStat: {
    alignItems: 'center',
  },
  clientDetailsCasesStatNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E4A6B',
    marginBottom: 8,
  },
  clientDetailsCasesStatLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  // Quick Actions Section
  clientDetailsActionsCard: {
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
  clientDetailsActionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientDetailsActionsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientDetailsActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A6B',
    flex: 1,
  },
  clientDetailsActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  clientDetailsActionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  clientDetailsActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E4A6B',
    textAlign: 'center',
    marginTop: 8,
  },
  clientDetailsBottomSpacing: {
    height: 40,
  },
});

export default LawfirmApp;
