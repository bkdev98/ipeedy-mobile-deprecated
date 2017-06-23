import PhoneNumber from 'awesome-phonenumber';

export const interFormat = phone => {
  const pn = new PhoneNumber(phone, 'VN');
  return pn.getNumber('international');
};

export const instanceTypeFormat = phone => {
  // const ayt = PhoneNumber.getAsYouType('VN');
  // ayt.reset(phone);
  // return ayt.number();
  const pn = new PhoneNumber(phone, 'VN');
  return pn.getNumber('national');
};

export const isValidNumber = phone => {
  if (!phone) return false;
  const pn = new PhoneNumber(phone, 'VN');
  return (pn.isValid() && pn.isMobile() && pn.isPossible());
};
