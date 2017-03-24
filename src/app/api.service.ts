import {Headers, Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {LoggerService} from "./logger.service";
import "rxjs/add/operator/map";

import {Config} from "./config";

@Injectable()
export class ApiService {
	public error: string | null = null;

	constructor(public http: Http, public log: LoggerService, public config: Config) {}

	_buildUrl(...segments) {
		let url = this.config.base_url;
		for (let segment of segments) url += `/${segment}`;
		return url;
	};

	_buildParams(params = {}) {

		let url = '?';
		let i = 0;
		for (let param in params) {
			if (i != 0) url += "&";
			url += `${param}=${params[param]}`;
			i++;
		}
		return url;
	};

	_getHeaders() {
		return new Headers({
			'Content-Type': 'application/json',
			// 'x-access-token' : this.token
		});
	}

	_get(...segments) {
		return this.http.get(
			this._buildUrl(...segments),
			{headers: this._getHeaders()})
			.map(response => response.json());
	}

	_post(data = {}, ...segments) {
		return this.http.post(
			this._buildUrl(...segments),
			JSON.stringify(data),
			{headers: this._getHeaders()})
			.map(response => response.json());
	}

	_put(data = {}, ...segments) {
		return this.http.put(
			this._buildUrl(...segments),
			JSON.stringify(data),
			{headers: this._getHeaders()})
			.map(response => response.json());
	}

	_delete(...segments) {
		return this.http.delete(
			this._buildUrl(...segments),
			{headers: this._getHeaders()});
	}

	/*

	 API Access Methods

	 Create these as needed for specific instances

	 */

	get(params = {}, ...segments) {
		return this._get(...segments, this._buildParams(params));
	}

	put(data = {}, ...segments) {
		return this._put(data, ...segments);
	}

	put_params(data = {}, params = {}, ...segments) {
		return this._put(data, ...segments, this._buildParams(params));
	}

}
