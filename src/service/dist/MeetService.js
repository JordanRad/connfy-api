"use strict";
exports.__esModule = true;
exports.MeetService = void 0;
var client_1 = require("@prisma/client");
var uuid_1 = require("uuid");
var prisma = new client_1.PrismaClient();
var MeetService = /** @class */ (function () {
    function MeetService() {
        this.meetings = [];
    }
    // Get All Meetings from the database
    MeetService.prototype.getAllMeetings = function () {
        return this.meetings;
    };
    // public static async getAllMeetings(id: number, userId: number) {
    //     try {
    //         const meetings = await prisma.meeting.findMany({
    //             where: { id: id, userId: userId }
    //         })
    //         return meetings != null ? meetings : []
    //     } catch (err) {
    //         return(err)
    //     }
    // }
    // Create a new meeting
    MeetService.prototype.createMeeting = function (title, id, date) {
        var meeting = {
            //uuid generates automatuc a unique id for the meeting
            id: uuid_1.v4(),
            title: title,
            noteId: '',
            usersId: '',
            date: date
        };
        this.meetings.push(meeting);
        return meeting;
    };
    // Delete a meeting from the database
    MeetService.prototype.deleteMeeting = function (id) {
        try {
            var deleteMeeting = prisma.meeting["delete"]({
                where: { id: id }
            });
            return deleteMeeting;
        }
        catch (err) {
            return (err);
        }
    };
    return MeetService;
}());
exports.MeetService = MeetService;
