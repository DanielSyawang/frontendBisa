"use strict";
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
exports.removeStudent = exports.enrollStudent = exports.deleteClass = exports.updateClass = exports.getClassesUserEnrolled = exports.getClassById = exports.createClass = void 0;
var axios = require("axios");
var dotenv = require("dotenv");
dotenv.config();
var BASE_URL = process.env.BASE_URL;
var API_KEY = process.env.ACCESS_TOKEN;
var apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': "Bearer ".concat(API_KEY),
        'Content-Type': 'application/json',
    }
});
var createClass = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.post('/class', request)];
            case 1:
                response = _a.sent();
                console.log('Class created:', response.data);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error creating class:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createClass = createClass;
var getClassById = function (classID) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.get("/class/".concat(classID))];
            case 1:
                response = _a.sent();
                console.log('Class details:', response.data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching class with ID ".concat(classID, ":"), error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClassById = getClassById;
var getClassesUserEnrolled = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.get('/class/enrolled')];
            case 1:
                response = _a.sent();
                console.log('Enrolled classes:', response.data);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Error fetching enrolled classes:', error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClassesUserEnrolled = getClassesUserEnrolled;
var updateClass = function (classID, request) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.put("/class/".concat(classID), request)];
            case 1:
                response = _a.sent();
                console.log('Class updated:', response.data);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error("Error updating class with ID ".concat(classID, ":"), error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateClass = updateClass;
var deleteClass = function (classID) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.delete("/class/".concat(classID))];
            case 1:
                response = _a.sent();
                console.log('Class deleted:', response.data);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error("Error deleting class with ID ".concat(classID, ":"), error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteClass = deleteClass;
var enrollStudent = function (classID, request) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.post("/class/".concat(classID, "/enroll"), request)];
            case 1:
                response = _a.sent();
                console.log('Student enrolled:', response.data);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error("Error enrolling student in class ".concat(classID, ":"), error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.enrollStudent = enrollStudent;
var removeStudent = function (classID, request) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiClient.request({
                        method: 'DELETE',
                        url: "/class/".concat(classID, "/remove"),
                        data: request,
                    })];
            case 1:
                response = _a.sent();
                console.log('Student removed:', response.data);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error("Error removing student from class ".concat(classID, ":"), error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeStudent = removeStudent;
var runApiTests = function () { return __awaiter(void 0, void 0, void 0, function () {
    var newClass, classID, updatedClass, studentID, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                newClass = { className: 'Physics 101', classDescription: 'Basic physics concepts' };
                console.log('Creating class...');
                return [4 /*yield*/, (0, exports.createClass)(newClass)];
            case 1:
                _a.sent();
                classID = 1;
                console.log("Fetching details for class ID: ".concat(classID));
                return [4 /*yield*/, (0, exports.getClassById)(classID)];
            case 2:
                _a.sent();
                // Step 3: Fetch all classes the user is enrolled in
                console.log('Fetching enrolled classes...');
                return [4 /*yield*/, (0, exports.getClassesUserEnrolled)()];
            case 3:
                _a.sent();
                updatedClass = { className: 'Advanced Physics', classDescription: 'In-depth physics concepts' };
                console.log("Updating class ID: ".concat(classID));
                return [4 /*yield*/, (0, exports.updateClass)(classID, updatedClass)];
            case 4:
                _a.sent();
                studentID = 123;
                console.log("Enrolling student ID: ".concat(studentID, " in class ID: ").concat(classID));
                return [4 /*yield*/, (0, exports.enrollStudent)(classID, { studentID: studentID })];
            case 5:
                _a.sent();
                // Step 6: Remove the student from the class
                console.log("Removing student ID: ".concat(studentID, " from class ID: ").concat(classID));
                return [4 /*yield*/, (0, exports.removeStudent)(classID, { studentID: studentID })];
            case 6:
                _a.sent();
                // Step 7: Delete the class
                console.log("Deleting class ID: ".concat(classID));
                return [4 /*yield*/, (0, exports.deleteClass)(classID)];
            case 7:
                _a.sent();
                console.log('All tests completed successfully!');
                return [3 /*break*/, 9];
            case 8:
                error_8 = _a.sent();
                console.error('Error during API testing:', error_8);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
// Run the tests
runApiTests();
