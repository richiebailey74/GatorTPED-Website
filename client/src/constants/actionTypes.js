//these action types are exported as consts so when they are used in certain points in the website that if there is an incorrect spelling,-
//-then an error will throw (essentially a safety net to prevent bugs occurring in this regard)

export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const FETCH_ALL = 'FETCH_ALL';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';