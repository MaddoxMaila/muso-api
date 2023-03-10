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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var runtime_1 = require("@prisma/client/runtime");
var DatabaseSingleton_1 = __importDefault(require("../prisma/DatabaseSingleton"));
var Track_1 = __importDefault(require("./Track"));
var Playlist = /** @class */ (function () {
    function Playlist() {
        this.db = DatabaseSingleton_1["default"].getDb();
    }
    Playlist.prototype.createPlaylist = function (playlist) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.playlist.create({
                                data: playlist
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Playlist.prototype.addTrackToPlaylist = function (playlistTrack) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.playlistTracks.create({
                                data: playlistTrack
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        if (e_2 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Playlist.prototype.deletePlaylist = function (playlistId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.playlist["delete"]({
                                where: { id: playlistId }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        if (e_3 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Playlist.prototype.getPlaylists = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.playlist.findMany({
                                where: { userId: userId }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        if (e_4 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Playlist.prototype.getPlaylistTracks = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var playlist, playlistWithTracks, _i, _a, ptrack, t, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.db.playlist.findFirst({
                                where: { id: ids.playlistId, userId: ids.userId },
                                include: { playlistTracks: true }
                            })];
                    case 1:
                        playlist = _b.sent();
                        if (playlist === null)
                            return [2 /*return*/, []];
                        playlistWithTracks = { name: playlist.name, id: playlist.id, created_at: playlist.created_at, playlistTracks: [] };
                        _i = 0, _a = playlist.playlistTracks;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        ptrack = _a[_i];
                        return [4 /*yield*/, this.db.track.findFirst({ where: { id: ptrack.trackId }, include: { likedTracks: true } })];
                    case 3:
                        t = _b.sent();
                        if (!t)
                            return [2 /*return*/];
                        playlistWithTracks.playlistTracks.push(Track_1["default"].getInstance().addLikedFieldToTrack(t));
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, playlistWithTracks];
                    case 6:
                        e_5 = _b.sent();
                        if (e_5 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Playlist.prototype.deletePlaylistTrack = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // To Implement!
                }
                catch (e) {
                    if (e instanceof runtime_1.PrismaClientValidationError)
                        return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    return Playlist;
}());
var PlaylistSingleton = /** @class */ (function () {
    function PlaylistSingleton() {
        PlaylistSingleton.playlist = new Playlist();
    }
    PlaylistSingleton.playlistInstance = function () {
        if (!PlaylistSingleton.playlist)
            new PlaylistSingleton();
        return PlaylistSingleton.playlist;
    };
    return PlaylistSingleton;
}());
exports["default"] = PlaylistSingleton;
//# sourceMappingURL=Playlist.js.map