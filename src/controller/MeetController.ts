import { Meeting } from '../model/Meet';
import { MeetService } from '../service/MeetService';

export class MeetController {
    constructor(private meetService: MeetService){}


    getAllMeetings(){
        return this.meetService.getAllMeetings();
    }

    createMeeting(title: string, id: string, date: Date) : Meeting {

        return this.meetService.createMeeting(title, id, date)
        //console.log('testing new meeting');
        // console.log('Titel', title)
        // console.log('id', id)
        // console.log('Date', date)
    }

    // deleteMeeting(id: string) : Meeting{
        
    // }

    deleteMeeting(id: string, ) : Meeting {
        return MeetService.deleteMeeting(id)
        //return this.meetService.deleteMeeting(id)
    }
    
}


