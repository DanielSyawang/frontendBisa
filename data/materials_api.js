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
var axios = require("axios");
var dotenv = require("dotenv");
var fs = require("fs");
var path = require("path");
var FormData = require("form-data");
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
var uploadMaterial = function (classId, file, request) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = new FormData();
                formData.append('file', file);
                formData.append('request', JSON.stringify(request));
                return [4 /*yield*/, apiClient.post("/class/".concat(classId, "/material/upload"), formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var getMaterialsByClassId = function (classId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apiClient.get("/materials/class/".concat(classId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var getMaterialById = function (materialId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apiClient.get("/materials/".concat(materialId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var deleteMaterial = function (materialId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apiClient.delete("/materials/".concat(materialId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
var updateMaterial = function (materialId, updatedData) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apiClient.put("/materials/".concat(materialId), updatedData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); };
function testMaterialApi() {
    return __awaiter(this, void 0, void 0, function () {
        var testClassId, materialId, audioPath, fullPath, fileBuffer, fileName, file, uploadRequest, uploadResponse, classMaterials, material, updateData, updatedMaterial, deleteResponse, error_1;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 10, , 11]);
                    console.log('Starting Material API test flow...\n');
                    testClassId = 1;
                    materialId = void 0;
                    // 1. Test Upload Material
                    console.log('1. Testing Material Upload...');
                    audioPath = "../asset/audio/Armed and Ready (feat. Casey Lee Williams).mp3";
                    fullPath = path.resolve(__dirname, audioPath);
                    fileBuffer = fs.readFileSync(fullPath);
                    fileName = path.basename(audioPath);
                    file = new File([fileBuffer], fileName, { type: 'audio/mpeg', lastModified: Date.now() });
                    uploadRequest = {
                        title: "Armed and Ready Audio ".concat(Date.now()),
                        description: 'RWBY soundtrack audio material'
                    };
                    return [4 /*yield*/, uploadMaterial(testClassId, file, uploadRequest)];
                case 1:
                    uploadResponse = _f.sent();
                    materialId = uploadResponse.id;
                    console.log('✓ Material upload successful:', uploadResponse);
                    return [4 /*yield*/, sleep(1000)];
                case 2:
                    _f.sent();
                    // 2. Test Get Materials by Class
                    console.log('\n2. Testing Get Materials by Class...');
                    return [4 /*yield*/, getMaterialsByClassId(testClassId)];
                case 3:
                    classMaterials = _f.sent();
                    console.log('✓ Get materials successful:', classMaterials);
                    return [4 /*yield*/, sleep(1000)];
                case 4:
                    _f.sent();
                    // 3. Test Get Material by ID
                    console.log('\n3. Testing Get Material by ID...');
                    return [4 /*yield*/, getMaterialById(materialId)];
                case 5:
                    material = _f.sent();
                    console.log('✓ Get material successful:', material);
                    return [4 /*yield*/, sleep(1000)];
                case 6:
                    _f.sent();
                    // 4. Test Update Material
                    console.log('\n4. Testing Update Material...');
                    updateData = {
                        title: "Updated Armed and Ready Audio ".concat(Date.now()),
                        description: 'Updated RWBY soundtrack audio material'
                    };
                    return [4 /*yield*/, updateMaterial(materialId, updateData)];
                case 7:
                    updatedMaterial = _f.sent();
                    console.log('✓ Update material successful:', updatedMaterial);
                    return [4 /*yield*/, sleep(1000)];
                case 8:
                    _f.sent();
                    // 5. Test Delete Material
                    console.log('\n5. Testing Delete Material...');
                    return [4 /*yield*/, deleteMaterial(materialId)];
                case 9:
                    deleteResponse = _f.sent();
                    console.log('✓ Delete material successful:', deleteResponse);
                    console.log('\nAll material API tests completed successfully! ✨');
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _f.sent();
                    console.error('\n❌ Error during Material API testing:', {
                        message: error_1.message,
                        response: (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data,
                        status: (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.status,
                        config: {
                            url: (_c = error_1.config) === null || _c === void 0 ? void 0 : _c.url,
                            method: (_d = error_1.config) === null || _d === void 0 ? void 0 : _d.method,
                            headers: (_e = error_1.config) === null || _e === void 0 ? void 0 : _e.headers
                        }
                    });
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
// Helper function for adding delays between requests
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
// Run the tests
testMaterialApi();
