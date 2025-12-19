// Font configuration for the CoreWallet app using Inter font family
import { Platform } from 'react-native';

// export const Fonts = {
//   Poppins: {
//     Regular: 'Poppins-Regular',
//     Medium: 'Poppins-Medium',
//     SemiBold: 'Poppins-SemiBold',
//     Bold: 'Poppins-Bold',
//   },
// };

// Android uses filename, iOS uses PostScript name
export const Fonts = {
  Poppins: {
    Regular: Platform.select({ ios: 'Inter18pt-Regular', android: 'Inter-Regular' }),
    Medium: Platform.select({ ios: 'Inter18pt-Medium', android: 'Inter-Medium' }),
    SemiBold: Platform.select({ ios: 'Inter24pt-SemiBold', android: 'Inter-SemiBold' }),
    Bold: Platform.select({ ios: 'Inter18pt-Bold', android: 'Inter-Bold' }),
  },
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

export const FontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};


