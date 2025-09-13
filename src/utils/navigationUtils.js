// NovaChess - Navigation Utilities
export const SCREENS = {
  LOADING: 'loading',
  INTRODUCTION: 'introduction',
  AUTH: 'auth',
  HOME: 'home',
  PROFILE: 'profile',
  GAME_SETUP: 'game_setup',
  GAME: 'game',
  PUZZLES: 'puzzles',
  ANALYSIS: 'analysis',
  LESSONS: 'lessons',
  RECENT_GAMES: 'recent_games',
  CUSTOMIZE: 'customize',
  SETTINGS: 'settings',
};

export const NavigationManager = {
  getInitialScreen: () => {
    // In a real app, you might check for stored authentication state
    // For now, always start with loading screen
    return SCREENS.LOADING;
  },

  getNextScreen: (currentScreen) => {
    switch (currentScreen) {
      case SCREENS.LOADING:
        return SCREENS.INTRODUCTION;
      case SCREENS.INTRODUCTION:
        return SCREENS.AUTH;
      case SCREENS.AUTH:
        return SCREENS.HOME;
      default:
        return SCREENS.HOME;
    }
  },

  canGoBack: (currentScreen) => {
    return currentScreen !== SCREENS.LOADING;
  },

  getPreviousScreen: (currentScreen) => {
    switch (currentScreen) {
      case SCREENS.INTRODUCTION:
        return SCREENS.LOADING;
      case SCREENS.AUTH:
        return SCREENS.INTRODUCTION;
      case SCREENS.HOME:
        return SCREENS.AUTH;
      case SCREENS.PROFILE:
        return SCREENS.HOME;
      case SCREENS.GAME_SETUP:
        return SCREENS.HOME;
      case SCREENS.GAME:
        return SCREENS.GAME_SETUP;
      default:
        return null;
    }
  }
};
