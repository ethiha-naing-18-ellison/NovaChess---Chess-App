// NovaChess - Customization Utilities
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CUSTOMIZATION_KEYS = {
  BOARD_THEME: 'board_theme',
  PIECE_STYLE: 'piece_style',
  UI_THEME: 'ui_theme',
  BOARD_SIZE: 'board_size',
  PIECE_COLOR: 'piece_color',
  BACKGROUND_COLOR: 'background_color',
  ACCENT_COLOR: 'accent_color',
  SOUND_ENABLED: 'sound_enabled',
  ANIMATIONS_ENABLED: 'animations_enabled',
};

export const BOARD_THEMES = {
  CLASSIC: {
    id: 'classic',
    name: 'Classic',
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    description: 'Traditional chess board colors'
  },
  MODERN: {
    id: 'modern',
    name: 'Modern',
    lightSquare: '#e8e8e8',
    darkSquare: '#4a4a4a',
    description: 'Clean modern look'
  },
  DARK: {
    id: 'dark',
    name: 'Dark',
    lightSquare: '#3a3a3a',
    darkSquare: '#1a1a1a',
    description: 'Dark theme for night play'
  },
  BLUE: {
    id: 'blue',
    name: 'Ocean Blue',
    lightSquare: '#a8d8ea',
    darkSquare: '#2c5aa0',
    description: 'Calming blue tones'
  },
  GREEN: {
    id: 'green',
    name: 'Forest Green',
    lightSquare: '#c8e6c9',
    darkSquare: '#2e7d32',
    description: 'Natural green colors'
  },
  PURPLE: {
    id: 'purple',
    name: 'Royal Purple',
    lightSquare: '#e1bee7',
    darkSquare: '#6a1b9a',
    description: 'Regal purple theme'
  }
};

export const PIECE_STYLES = {
  CLASSIC: {
    id: 'classic',
    name: 'Classic',
    whiteColor: '#ffffff',
    blackColor: '#000000',
    description: 'Traditional black and white pieces',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  GOLD: {
    id: 'gold',
    name: 'Gold & Silver',
    whiteColor: '#ffd700',
    blackColor: '#c0c0c0',
    description: 'Luxurious gold and silver',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  BLUE: {
    id: 'blue',
    name: 'Blue & Red',
    whiteColor: '#2196f3',
    blackColor: '#f44336',
    description: 'Vibrant blue and red',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  GREEN: {
    id: 'green',
    name: 'Green & Orange',
    whiteColor: '#4caf50',
    blackColor: '#ff9800',
    description: 'Natural green and orange',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  PURPLE: {
    id: 'purple',
    name: 'Purple & Pink',
    whiteColor: '#9c27b0',
    blackColor: '#e91e63',
    description: 'Elegant purple and pink',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  }
};

export const PIECE_TYPES = {
  STAUNTON: {
    id: 'staunton',
    name: 'Staunton',
    description: 'Classic Staunton design',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  REGENCY: {
    id: 'regency',
    name: 'Regency',
    description: 'Elegant Regency style',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  BAROQUE: {
    id: 'baroque',
    name: 'Baroque',
    description: 'Ornate Baroque design',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  NEOCLASSICAL: {
    id: 'neoclassical',
    name: 'Neoclassical',
    description: 'Clean Neoclassical style',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  MODERN: {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary modern design',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  },
  MINIMALIST: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple minimalist style',
    symbols: {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    }
  }
};

export const UI_THEMES = {
  DARK: {
    id: 'dark',
    name: 'Dark Theme',
    backgroundColor: '#0f0f1a',
    cardColor: '#1a1a2e',
    textColor: '#e2e8f0',
    accentColor: '#6b46c1',
    description: 'Dark theme for comfortable viewing'
  },
  LIGHT: {
    id: 'light',
    name: 'Light Theme',
    backgroundColor: '#f8fafc',
    cardColor: '#ffffff',
    textColor: '#1a202c',
    accentColor: '#3b82f6',
    description: 'Light theme for bright environments'
  },
  BLUE: {
    id: 'blue',
    name: 'Blue Theme',
    backgroundColor: '#1e3a8a',
    cardColor: '#1e40af',
    textColor: '#e0e7ff',
    accentColor: '#60a5fa',
    description: 'Professional blue theme'
  },
  GREEN: {
    id: 'green',
    name: 'Green Theme',
    backgroundColor: '#064e3b',
    cardColor: '#065f46',
    textColor: '#d1fae5',
    accentColor: '#10b981',
    description: 'Natural green theme'
  }
};

export const BOARD_SIZES = {
  SMALL: { id: 'small', name: 'Small', size: 40, description: 'Compact for small screens' },
  MEDIUM: { id: 'medium', name: 'Medium', size: 50, description: 'Balanced size' },
  LARGE: { id: 'large', name: 'Large', size: 60, description: 'Large for easy viewing' }
};

// Default customization settings
export const DEFAULT_CUSTOMIZATION = {
  boardTheme: BOARD_THEMES.CLASSIC.id,
  pieceStyle: PIECE_STYLES.CLASSIC.id,
  pieceType: PIECE_TYPES.STAUNTON.id,
  uiTheme: UI_THEMES.DARK.id, // Keep UI theme for internal use
  boardSize: BOARD_SIZES.SMALL.id, // Set to small as default
  soundEnabled: true,
  animationsEnabled: true,
};

// Save customization settings
export const saveCustomization = async (customization) => {
  try {
    await AsyncStorage.setItem('chess_customization', JSON.stringify(customization));
    return true;
  } catch (error) {
    console.error('Error saving customization:', error);
    return false;
  }
};

// Load customization settings
export const loadCustomization = async () => {
  try {
    const saved = await AsyncStorage.getItem('chess_customization');
    if (saved) {
      return { ...DEFAULT_CUSTOMIZATION, ...JSON.parse(saved) };
    }
    return DEFAULT_CUSTOMIZATION;
  } catch (error) {
    console.error('Error loading customization:', error);
    return DEFAULT_CUSTOMIZATION;
  }
};

// Reset to default customization
export const resetCustomization = async () => {
  try {
    await AsyncStorage.removeItem('chess_customization');
    return DEFAULT_CUSTOMIZATION;
  } catch (error) {
    console.error('Error resetting customization:', error);
    return DEFAULT_CUSTOMIZATION;
  }
};

// Get current board colors based on theme
export const getBoardColors = (themeId) => {
  const theme = Object.values(BOARD_THEMES).find(t => t.id === themeId);
  return theme || BOARD_THEMES.CLASSIC;
};

// Get current piece colors based on style
export const getPieceColors = (styleId) => {
  const style = Object.values(PIECE_STYLES).find(s => s.id === styleId);
  return style || PIECE_STYLES.CLASSIC;
};

// Get current UI theme
export const getUITheme = (themeId) => {
  const theme = Object.values(UI_THEMES).find(t => t.id === themeId);
  return theme || UI_THEMES.DARK;
};

// Get current board size
export const getBoardSize = (sizeId) => {
  const size = Object.values(BOARD_SIZES).find(s => s.id === sizeId);
  return size || BOARD_SIZES.MEDIUM;
};

// Get current piece type
export const getPieceType = (typeId) => {
  const type = Object.values(PIECE_TYPES).find(t => t.id === typeId);
  return type || PIECE_TYPES.STAUNTON;
};
