const tintColorLight = '#2F9E44';
const tintColorDark = '#40C057';

export default {
  light: {
    primary: '#2F9E44',     // Forest green
    secondary: '#40C057',   // Lime green
    accent: '#94D82D',      // Light green
    background: '#F8F9FA',  // Off white
    text: '#212529',        // Dark gray
    border: '#DEE2E6',      // Light gray
    tint: tintColorLight,
    tabIconDefault: '#6C757D',
    tabIconSelected: tintColorLight,
    error: '#FA5252',       // Red for errors
    success: '#51CF66',     // Green for success
  },
  dark: {
    primary: '#40C057',     // Lime green
    secondary: '#2F9E44',   // Forest green
    accent: '#94D82D',      // Light green
    background: '#212529',  // Dark background
    text: '#F8F9FA',        // Light text
    border: '#495057',      // Gray border
    tint: tintColorDark,
    tabIconDefault: '#ADB5BD',
    tabIconSelected: tintColorDark,
    error: '#FF6B6B',       // Bright red for errors
    success: '#69DB7C',     // Bright green for success
  },
};
