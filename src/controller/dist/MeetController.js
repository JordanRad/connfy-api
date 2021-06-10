"use strict";
exports.__esModule = true;
exports.MeetController = void 0;
var MeetService_1 = require("../service/MeetService");
var MeetController = /** @class */ (function () {
    function MeetController(meetService) {
        this.meetService = meetService;
    }
    MeetController.prototype.getAllMeetings = function () {
        return this.meetService.getAllMeetings();
    };
    MeetController.prototype.createMeeting = function (title, id, date) {
        return this.meetService.createMeeting(title, id, date);
        //console.log('testing new meeting');
        // console.log('Titel', title)
        // console.log('id', id)
        // console.log('Date', date)
    };
    // deleteMeeting(id: string) : Meeting{
    // }
    MeetController.prototype.deleteMeeting = function (id) {
        return MeetService_1.MeetService.deleteMeeting(id);
        //return this.meetService.deleteMeeting(id)
    };
    return MeetController;
}());
exports.MeetController = MeetController;
