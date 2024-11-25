/* tslint:disable */
/* eslint-disable */
/**
 * Cats example
 * The cats API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface CheckIns
 */
export interface CheckIns {
    /**
     * 
     * @type {number}
     * @memberof CheckIns
     */
    'id': number;
    /**
     * 
     * @type {Users}
     * @memberof CheckIns
     */
    'user': Users;
    /**
     * 
     * @type {ParkingRoads}
     * @memberof CheckIns
     */
    'parkingRoad': ParkingRoads;
    /**
     * 
     * @type {string}
     * @memberof CheckIns
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof CheckIns
     */
    'updatedAt': string;
}
/**
 * 
 * @export
 * @interface ClosePostRequest
 */
export interface ClosePostRequest {
    /**
     * 道路ID
     * @type {number}
     * @memberof ClosePostRequest
     */
    'parkingRoadId': number;
    /**
     * 閉鎖ステータスID
     * @type {number}
     * @memberof ClosePostRequest
     */
    'closeStatusId': number;
    /**
     * ユーザID
     * @type {number}
     * @memberof ClosePostRequest
     */
    'userId': number;
}
/**
 * 
 * @export
 * @interface CloseStatusLists
 */
export interface CloseStatusLists {
    /**
     * 閉鎖状況のリスト
     * @type {{ [key: string]: any; }}
     * @memberof CloseStatusLists
     */
    'list': { [key: string]: any; };
}
/**
 * 
 * @export
 * @interface CloseStatuses
 */
export interface CloseStatuses {
    /**
     * 
     * @type {number}
     * @memberof CloseStatuses
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof CloseStatuses
     */
    'status': string;
    /**
     * 
     * @type {string}
     * @memberof CloseStatuses
     */
    'statusJpName': string;
    /**
     * 
     * @type {string}
     * @memberof CloseStatuses
     */
    'colorCode': string;
    /**
     * 
     * @type {Array<Closes>}
     * @memberof CloseStatuses
     */
    'close': Array<Closes>;
    /**
     * 
     * @type {string}
     * @memberof CloseStatuses
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof CloseStatuses
     */
    'updatedAt': string;
}
/**
 * 
 * @export
 * @interface Closes
 */
export interface Closes {
    /**
     * 
     * @type {number}
     * @memberof Closes
     */
    'id': number;
    /**
     * 
     * @type {CloseStatuses}
     * @memberof Closes
     */
    'closeStatus': CloseStatuses;
    /**
     * 
     * @type {ParkingRoads}
     * @memberof Closes
     */
    'parkingRoad': ParkingRoads;
    /**
     * 
     * @type {Users}
     * @memberof Closes
     */
    'user': Users;
    /**
     * 
     * @type {string}
     * @memberof Closes
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof Closes
     */
    'updatedAt': string;
}
/**
 * 
 * @export
 * @interface GetCurrentParkingRequest
 */
export interface GetCurrentParkingRequest {
    /**
     * 経度
     * @type {number}
     * @memberof GetCurrentParkingRequest
     */
    'latitude': number;
    /**
     * 緯度
     * @type {number}
     * @memberof GetCurrentParkingRequest
     */
    'longitude': number;
}
/**
 * 
 * @export
 * @interface GetUserHereRequest
 */
export interface GetUserHereRequest {
    /**
     * パーキング道路ID
     * @type {number}
     * @memberof GetUserHereRequest
     */
    'parkingRoadId': number;
}
/**
 * 
 * @export
 * @interface ParkingRoads
 */
export interface ParkingRoads {
    /**
     * 
     * @type {number}
     * @memberof ParkingRoads
     */
    'id': number;
    /**
     * 
     * @type {Parkings}
     * @memberof ParkingRoads
     */
    'parking': Parkings;
    /**
     * 
     * @type {string}
     * @memberof ParkingRoads
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ParkingRoads
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof ParkingRoads
     */
    'updatedAt': string;
    /**
     * 
     * @type {Array<CheckIns>}
     * @memberof ParkingRoads
     */
    'checkIns': Array<CheckIns>;
    /**
     * 
     * @type {Array<Closes>}
     * @memberof ParkingRoads
     */
    'closes': Array<Closes>;
}
/**
 * 
 * @export
 * @interface Parkings
 */
export interface Parkings {
    /**
     * 
     * @type {number}
     * @memberof Parkings
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof Parkings
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof Parkings
     */
    'latitude': number;
    /**
     * 
     * @type {number}
     * @memberof Parkings
     */
    'longitude': number;
    /**
     * 
     * @type {number}
     * @memberof Parkings
     */
    'radius': number;
    /**
     * 
     * @type {Array<ParkingRoads>}
     * @memberof Parkings
     */
    'parkingRoads': Array<ParkingRoads>;
    /**
     * 
     * @type {Array<Closes>}
     * @memberof Parkings
     */
    'close': Array<Closes>;
    /**
     * 
     * @type {string}
     * @memberof Parkings
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof Parkings
     */
    'updatedAt': string;
}
/**
 * 
 * @export
 * @interface PostCheckInRequest
 */
export interface PostCheckInRequest {
    /**
     * 経度
     * @type {number}
     * @memberof PostCheckInRequest
     */
    'latitude': number;
    /**
     * 緯度
     * @type {number}
     * @memberof PostCheckInRequest
     */
    'longitude': number;
    /**
     * ユーザID
     * @type {number}
     * @memberof PostCheckInRequest
     */
    'userId': number;
    /**
     * 道路ID
     * @type {number}
     * @memberof PostCheckInRequest
     */
    'roadId': number;
}
/**
 * 
 * @export
 * @interface Users
 */
export interface Users {
    /**
     * 
     * @type {number}
     * @memberof Users
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof Users
     */
    'screenName': string;
    /**
     * 
     * @type {string}
     * @memberof Users
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof Users
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof Users
     */
    'password': string;
    /**
     * 
     * @type {string}
     * @memberof Users
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof Users
     */
    'updatedAt': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Users
     */
    'checkIns': Array<string>;
    /**
     * 
     * @type {Array<Closes>}
     * @memberof Users
     */
    'close': Array<Closes>;
}

/**
 * CheckInApi - axios parameter creator
 * @export
 */
export const CheckInApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * チェックインする
         * @summary 
         * @param {PostCheckInRequest} postCheckInRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        checkIn: async (postCheckInRequest: PostCheckInRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postCheckInRequest' is not null or undefined
            assertParamExists('checkIn', 'postCheckInRequest', postCheckInRequest)
            const localVarPath = `/api/check-in`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(postCheckInRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 現在地のパーキングの情報を取得する
         * @summary 
         * @param {GetCurrentParkingRequest} getCurrentParkingRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentParking: async (getCurrentParkingRequest: GetCurrentParkingRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'getCurrentParkingRequest' is not null or undefined
            assertParamExists('getCurrentParking', 'getCurrentParkingRequest', getCurrentParkingRequest)
            const localVarPath = `/api/check-in/get-current-parking`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(getCurrentParkingRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * パーキングにいるユーザを取得する
         * @summary 
         * @param {GetUserHereRequest} getUserHereRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserHere: async (getUserHereRequest: GetUserHereRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'getUserHereRequest' is not null or undefined
            assertParamExists('getUserHere', 'getUserHereRequest', getUserHereRequest)
            const localVarPath = `/api/check-in/get-user-here`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(getUserHereRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CheckInApi - functional programming interface
 * @export
 */
export const CheckInApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CheckInApiAxiosParamCreator(configuration)
    return {
        /**
         * チェックインする
         * @summary 
         * @param {PostCheckInRequest} postCheckInRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async checkIn(postCheckInRequest: PostCheckInRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ParkingRoads>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.checkIn(postCheckInRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CheckInApi.checkIn']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 現在地のパーキングの情報を取得する
         * @summary 
         * @param {GetCurrentParkingRequest} getCurrentParkingRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCurrentParking(getCurrentParkingRequest: GetCurrentParkingRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Parkings>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCurrentParking(getCurrentParkingRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CheckInApi.getCurrentParking']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * パーキングにいるユーザを取得する
         * @summary 
         * @param {GetUserHereRequest} getUserHereRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserHere(getUserHereRequest: GetUserHereRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Users>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUserHere(getUserHereRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CheckInApi.getUserHere']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * CheckInApi - factory interface
 * @export
 */
export const CheckInApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CheckInApiFp(configuration)
    return {
        /**
         * チェックインする
         * @summary 
         * @param {PostCheckInRequest} postCheckInRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        checkIn(postCheckInRequest: PostCheckInRequest, options?: RawAxiosRequestConfig): AxiosPromise<ParkingRoads> {
            return localVarFp.checkIn(postCheckInRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 現在地のパーキングの情報を取得する
         * @summary 
         * @param {GetCurrentParkingRequest} getCurrentParkingRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentParking(getCurrentParkingRequest: GetCurrentParkingRequest, options?: RawAxiosRequestConfig): AxiosPromise<Parkings> {
            return localVarFp.getCurrentParking(getCurrentParkingRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * パーキングにいるユーザを取得する
         * @summary 
         * @param {GetUserHereRequest} getUserHereRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserHere(getUserHereRequest: GetUserHereRequest, options?: RawAxiosRequestConfig): AxiosPromise<Array<Users>> {
            return localVarFp.getUserHere(getUserHereRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CheckInApi - object-oriented interface
 * @export
 * @class CheckInApi
 * @extends {BaseAPI}
 */
export class CheckInApi extends BaseAPI {
    /**
     * チェックインする
     * @summary 
     * @param {PostCheckInRequest} postCheckInRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CheckInApi
     */
    public checkIn(postCheckInRequest: PostCheckInRequest, options?: RawAxiosRequestConfig) {
        return CheckInApiFp(this.configuration).checkIn(postCheckInRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 現在地のパーキングの情報を取得する
     * @summary 
     * @param {GetCurrentParkingRequest} getCurrentParkingRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CheckInApi
     */
    public getCurrentParking(getCurrentParkingRequest: GetCurrentParkingRequest, options?: RawAxiosRequestConfig) {
        return CheckInApiFp(this.configuration).getCurrentParking(getCurrentParkingRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * パーキングにいるユーザを取得する
     * @summary 
     * @param {GetUserHereRequest} getUserHereRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CheckInApi
     */
    public getUserHere(getUserHereRequest: GetUserHereRequest, options?: RawAxiosRequestConfig) {
        return CheckInApiFp(this.configuration).getUserHere(getUserHereRequest, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * CloseApi - axios parameter creator
 * @export
 */
export const CloseApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * パーキング道路のリストを取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        paRoadList: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/close/pa-road-list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 閉鎖状況を投稿する
         * @summary 
         * @param {ClosePostRequest} closePostRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        post: async (closePostRequest: ClosePostRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'closePostRequest' is not null or undefined
            assertParamExists('post', 'closePostRequest', closePostRequest)
            const localVarPath = `/api/close`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(closePostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 閉鎖状況を取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        status: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/close/status`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 閉鎖ステータスのリストを取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        statusList: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/close/status-list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CloseApi - functional programming interface
 * @export
 */
export const CloseApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CloseApiAxiosParamCreator(configuration)
    return {
        /**
         * パーキング道路のリストを取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async paRoadList(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ParkingRoads>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.paRoadList(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CloseApi.paRoadList']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 閉鎖状況を投稿する
         * @summary 
         * @param {ClosePostRequest} closePostRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async post(closePostRequest: ClosePostRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Closes>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.post(closePostRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CloseApi.post']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 閉鎖状況を取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async status(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CloseStatusLists>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.status(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CloseApi.status']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 閉鎖ステータスのリストを取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async statusList(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CloseStatuses>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.statusList(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CloseApi.statusList']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * CloseApi - factory interface
 * @export
 */
export const CloseApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CloseApiFp(configuration)
    return {
        /**
         * パーキング道路のリストを取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        paRoadList(options?: RawAxiosRequestConfig): AxiosPromise<Array<ParkingRoads>> {
            return localVarFp.paRoadList(options).then((request) => request(axios, basePath));
        },
        /**
         * 閉鎖状況を投稿する
         * @summary 
         * @param {ClosePostRequest} closePostRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        post(closePostRequest: ClosePostRequest, options?: RawAxiosRequestConfig): AxiosPromise<Closes> {
            return localVarFp.post(closePostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 閉鎖状況を取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        status(options?: RawAxiosRequestConfig): AxiosPromise<CloseStatusLists> {
            return localVarFp.status(options).then((request) => request(axios, basePath));
        },
        /**
         * 閉鎖ステータスのリストを取得する
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        statusList(options?: RawAxiosRequestConfig): AxiosPromise<Array<CloseStatuses>> {
            return localVarFp.statusList(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CloseApi - object-oriented interface
 * @export
 * @class CloseApi
 * @extends {BaseAPI}
 */
export class CloseApi extends BaseAPI {
    /**
     * パーキング道路のリストを取得する
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloseApi
     */
    public paRoadList(options?: RawAxiosRequestConfig) {
        return CloseApiFp(this.configuration).paRoadList(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 閉鎖状況を投稿する
     * @summary 
     * @param {ClosePostRequest} closePostRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloseApi
     */
    public post(closePostRequest: ClosePostRequest, options?: RawAxiosRequestConfig) {
        return CloseApiFp(this.configuration).post(closePostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 閉鎖状況を取得する
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloseApi
     */
    public status(options?: RawAxiosRequestConfig) {
        return CloseApiFp(this.configuration).status(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 閉鎖ステータスのリストを取得する
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CloseApi
     */
    public statusList(options?: RawAxiosRequestConfig) {
        return CloseApiFp(this.configuration).statusList(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        appControllerGetHello: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async appControllerGetHello(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.appControllerGetHello(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.appControllerGetHello']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        appControllerGetHello(options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.appControllerGetHello(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public appControllerGetHello(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).appControllerGetHello(options).then((request) => request(this.axios, this.basePath));
    }
}



