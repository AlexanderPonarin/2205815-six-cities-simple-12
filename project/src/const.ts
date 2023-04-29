enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

const emptyPersonalData = {
  'avatarUrl': '',
  'email': '',
  'id': 0,
  'isPro': true,
  'name': '',
  'token': ''
};

const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const SORT_OPTIONS: string[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

const TIMEOUT_SHOW_ERROR = 2000;

export {AuthorizationStatus, CITIES, SORT_OPTIONS, TIMEOUT_SHOW_ERROR, emptyPersonalData};
