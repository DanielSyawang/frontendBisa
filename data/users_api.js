"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.refreshToken = exports.login = exports.signUp = void 0;
var axios = require("axios");
var dotenv = require("dotenv");
dotenv.config();
// API Client Configuration
var BASE_URL = process.env.BASE_URL || 'http://localhost:9876';
var API_KEY = process.env.ACCESS_TOKEN;
var apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Request interceptor to add auth token when needed
apiClient.interceptors.request.use(function (config) {
    var newConfig = __assign({}, config);
    newConfig.headers = newConfig.headers || {};
    // Only add Authorization header if API_KEY exists or if it's provided in the request
    var token = newConfig.headers.Authorization || API_KEY;
    if (token) {
        newConfig.headers.Authorization = token.startsWith('Bearer ') ? token : "Bearer ".concat(token);
    }
    return newConfig;
});
// API Functions
var signUp = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.post('/users/signup', data)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_1 = _a.sent();
                console.error('Error during signup:', error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var login = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.post('/users/login', data)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _a.sent();
                console.error('Error during login:', error_2);
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var refreshToken = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.post('/users/refresh', data, {
                        headers: {
                            Authorization: "Bearer ".concat(data.token)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_3 = _a.sent();
                console.error('Error during token refresh:', error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.refreshToken = refreshToken;
var getUserById = function (id, tokens) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.get("/users/".concat(id), {
                        headers: {
                            Authorization: "Bearer ".concat(tokens.accessToken)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_4 = _a.sent();
                console.error('Error fetching user:', error_4);
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var updateUser = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.put("/users/".concat(req.id), req.data, {
                        headers: {
                            Authorization: "Bearer ".concat(req.accessToken)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_5 = _a.sent();
                console.error('Error updating user:', error_5);
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (id, tokens) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.delete("/users/".concat(id), {
                        headers: {
                            Authorization: "Bearer ".concat(tokens.accessToken)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.status];
            case 2:
                error_6 = _a.sent();
                console.error('Error deleting user:', error_6);
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function testApiFlow() {
    return __awaiter(this, void 0, void 0, function () {
        var signUpData, newUser, loginData, loginResponse, userId, userDetails, updateData, updatedUser, deleteResponse, error_7;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 10, , 11]);
                    console.log('Starting API test flow...\n');
                    // 1. Sign Up
                    console.log('1. Testing Sign Up...');
                    signUpData = {
                        email: "test".concat(Date.now(), "@example.com"), // Unique email
                        username: "testuser".concat(Date.now()),
                        password: 'Password123!',
                        role: 'teacher'
                    };
                    return [4 /*yield*/, (0, exports.signUp)(signUpData)];
                case 1:
                    newUser = _f.sent();
                    console.log('✓ Sign Up successful:', newUser);
                    return [4 /*yield*/, sleep(1000)];
                case 2:
                    _f.sent();
                    // 2. Login
                    console.log('\n2. Testing Login...');
                    loginData = {
                        email: signUpData.email,
                        password: signUpData.password,
                        role: signUpData.role
                    };
                    return [4 /*yield*/, (0, exports.login)(loginData)];
                case 3:
                    loginResponse = _f.sent();
                    console.log('✓ Login successful:', loginResponse);
                    return [4 /*yield*/, sleep(1000)];
                case 4:
                    _f.sent();
                    // 3. Refresh Token
                    // console.log('\n3. Testing Token Refresh...');
                    // const refreshResponse = await refreshToken({ token: loginResponse.refreshToken });
                    // console.log('✓ Token refresh successful:', refreshResponse);
                    // await sleep(1000);
                    // 4. Get User
                    console.log('\n4. Testing Get User...');
                    userId = newUser.id;
                    return [4 /*yield*/, (0, exports.getUserById)(userId, loginResponse)];
                case 5:
                    userDetails = _f.sent();
                    console.log('✓ Get user successful:', userDetails);
                    return [4 /*yield*/, sleep(1000)];
                case 6:
                    _f.sent();
                    // 5. Update User
                    console.log('\n5. Testing Update User...');
                    updateData = {
                        id: userId,
                        data: {
                            email: "updated".concat(Date.now(), "@example.com"),
                            password: 'NewPassword123!',
                            role: 'teacher'
                        },
                        accessToken: loginResponse.accessToken
                    };
                    return [4 /*yield*/, (0, exports.updateUser)(updateData)];
                case 7:
                    updatedUser = _f.sent();
                    console.log('✓ Update user successful:', updatedUser);
                    return [4 /*yield*/, sleep(1000)];
                case 8:
                    _f.sent();
                    // 6. Delete User
                    console.log('\n6. Testing Delete User...');
                    return [4 /*yield*/, (0, exports.deleteUser)(userId, loginResponse)];
                case 9:
                    deleteResponse = _f.sent();
                    console.log('✓ Delete user successful, status:', deleteResponse);
                    console.log('\nAll tests completed successfully! ✨');
                    return [3 /*break*/, 11];
                case 10:
                    error_7 = _f.sent();
                    console.error('\n❌ Error during API testing:', {
                        message: error_7.message,
                        response: (_a = error_7.response) === null || _a === void 0 ? void 0 : _a.data,
                        status: (_b = error_7.response) === null || _b === void 0 ? void 0 : _b.status,
                        config: {
                            url: (_c = error_7.config) === null || _c === void 0 ? void 0 : _c.url,
                            method: (_d = error_7.config) === null || _d === void 0 ? void 0 : _d.method,
                            headers: (_e = error_7.config) === null || _e === void 0 ? void 0 : _e.headers
                        }
                    });
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
// Run the tests
console.log('API Test Runner');
console.log('==============');
testApiFlow();
