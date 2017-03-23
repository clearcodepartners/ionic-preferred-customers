export interface Customer {
	preferredCustomerProfileId: number;
	customerDimId:              number;
	firstName:                  string|null;
	lastName:                   string|null;
	phoneNumber:                string|null;
	emailAddress:               string|null;
	birthdate:                  number|null;
	addressLine1:               string|null;
	addressLine2:               string|null;
	city:                       string|null;
	state:                      string|null;
	zipCode:                    string|null;
	country:                    string|null;
	profilePicture:             string|null;
	createDate:                 number;
	updateDate:                 number;
	promoCode:                  string|null;
}
