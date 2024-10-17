import {StyleService} from '@ui-kitten/components';

export const globalStyle = StyleService.create({
  topNavigation: {
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  shadow: {
    shadowColor: 'shadow-color-100',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.27,
    shadowRadius: 8,
    elevation: 10,
  },
});
