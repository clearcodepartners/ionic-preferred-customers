
import {Camera} from "ionic-native";
import {States} from "./states.interface";
export class Config {
	base_url:string = "https://hub175enc.customerportfolios.com:8443/hub";
	tries:number = 0;
	bluetooth_beacon_uuid:string = "D75B9E80-1182-4D61-A3B4-48D2DE55EFBA";

	api_locations : any = {
		login: ["preferredcustomerprofile", "byemail"],
		update: ["preferredcustomerprofile", "update"],
		add: ["preferredcustomerprofile", "add"]
	};

	picture : any = {

		base : {
			destinationType: Camera.DestinationType.DATA_URL,
			correctOrientation: true,
			targetWidth: 500,
			targetHeight: 500
		},

		take : {
			sourceType: Camera.PictureSourceType.CAMERA,
		},

		upload : {
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		}

	};

	states: States = [
		{
			name: "Alabama",
			abbreviation: "AL"
		},
		{
			name: "Alaska",
			abbreviation: "AK"
		},
		{
			name: "American Samoa",
			abbreviation: "AS"
		},
		{
			name: "Arizona",
			abbreviation: "AZ"
		},
		{
			name: "Arkansas",
			abbreviation: "AR"
		},
		{
			name: "California",
			abbreviation: "CA"
		},
		{
			name: "Colorado",
			abbreviation: "CO"
		},
		{
			name: "Connecticut",
			abbreviation: "CT"
		},
		{
			name: "Delaware",
			abbreviation: "DE"
		},
		{
			name: "District Of Columbia",
			abbreviation: "DC"
		},
		{
			name: "Federated States Of Micronesia",
			abbreviation: "FM"
		},
		{
			name: "Florida",
			abbreviation: "FL"
		},
		{
			name: "Georgia",
			abbreviation: "GA"
		},
		{
			name: "Guam",
			abbreviation: "GU"
		},
		{
			name: "Hawaii",
			abbreviation: "HI"
		},
		{
			name: "Idaho",
			abbreviation: "ID"
		},
		{
			name: "Illinois",
			abbreviation: "IL"
		},
		{
			name: "Indiana",
			abbreviation: "IN"
		},
		{
			name: "Iowa",
			abbreviation: "IA"
		},
		{
			name: "Kansas",
			abbreviation: "KS"
		},
		{
			name: "Kentucky",
			abbreviation: "KY"
		},
		{
			name: "Louisiana",
			abbreviation: "LA"
		},
		{
			name: "Maine",
			abbreviation: "ME"
		},
		{
			name: "Marshall Islands",
			abbreviation: "MH"
		},
		{
			name: "Maryland",
			abbreviation: "MD"
		},
		{
			name: "Massachusetts",
			abbreviation: "MA"
		},
		{
			name: "Michigan",
			abbreviation: "MI"
		},
		{
			name: "Minnesota",
			abbreviation: "MN"
		},
		{
			name: "Mississippi",
			abbreviation: "MS"
		},
		{
			name: "Missouri",
			abbreviation: "MO"
		},
		{
			name: "Montana",
			abbreviation: "MT"
		},
		{
			name: "Nebraska",
			abbreviation: "NE"
		},
		{
			name: "Nevada",
			abbreviation: "NV"
		},
		{
			name: "New Hampshire",
			abbreviation: "NH"
		},
		{
			name: "New Jersey",
			abbreviation: "NJ"
		},
		{
			name: "New Mexico",
			abbreviation: "NM"
		},
		{
			name: "New York",
			abbreviation: "NY"
		},
		{
			name: "North Carolina",
			abbreviation: "NC"
		},
		{
			name: "North Dakota",
			abbreviation: "ND"
		},
		{
			name: "Northern Mariana Islands",
			abbreviation: "MP"
		},
		{
			name: "Ohio",
			abbreviation: "OH"
		},
		{
			name: "Oklahoma",
			abbreviation: "OK"
		},
		{
			name: "Oregon",
			abbreviation: "OR"
		},
		{
			name: "Palau",
			abbreviation: "PW"
		},
		{
			name: "Pennsylvania",
			abbreviation: "PA"
		},
		{
			name: "Puerto Rico",
			abbreviation: "PR"
		},
		{
			name: "Rhode Island",
			abbreviation: "RI"
		},
		{
			name: "South Carolina",
			abbreviation: "SC"
		},
		{
			name: "South Dakota",
			abbreviation: "SD"
		},
		{
			name: "Tennessee",
			abbreviation: "TN"
		},
		{
			name: "Texas",
			abbreviation: "TX"
		},
		{
			name: "Utah",
			abbreviation: "UT"
		},
		{
			name: "Vermont",
			abbreviation: "VT"
		},
		{
			name: "Virgin Islands",
			abbreviation: "VI"
		},
		{
			name: "Virginia",
			abbreviation: "VA"
		},
		{
			name: "Washington",
			abbreviation: "WA"
		},
		{
			name: "West Virginia",
			abbreviation: "WV"
		},
		{
			name: "Wisconsin",
			abbreviation: "WI"
		},
		{
			name: "Wyoming",
			abbreviation: "WY"
		}
	];

	defaultPicture:string = "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";


	/*

		These are just notes.  These can't be used as config options due to how JS handles dates

		date_format:string = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"; // USE d.toISOString()

		birthdate_format:string = "M/d/yyyy"; // (d.getMonth() + 1 ) + '/' + d.getDate() + "/" + d.getFullYear();
	 */
}