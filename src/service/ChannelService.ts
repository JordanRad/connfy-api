import { PrismaClient } from '@prisma/client';
import { Channel, channel } from 'diagnostic_channel';
import { errorLog, infoLog } from '../logging';
import { MeetingService } from './MeetingService';

const prisma = new PrismaClient();

export class ChannelService {

    /**
     * Create channel
     * */
    public static async createChannel(name: string) {
        try {
            let createdChannel = await prisma.channel.create({
                data: { name: name }
            })

            infoLog("Created Channel " + JSON.stringify(createdChannel))

            return createdChannel;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    /**
     * Add topic to channel
     * */
    public static async addTopic(channelId: number, topicName: string) {
        try {
            let createdTopic = await prisma.topic.create({
                data:{name:topicName,channelId:channelId}
            })
            
            infoLog("Added topic to a channel " + JSON.stringify(createdTopic))
            return createdTopic

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }

    /**
     * Get channel's details
     */
    public static async getChannel(channelId:number) {
        try {
            let channel = await prisma.channel.findUnique({
                where:{id:channelId},
                include:{meetings:true,topics:true}
            })

        
            infoLog("Get Channel " + JSON.stringify(channel))

            return channel;

        } catch (err) {
            errorLog(err)
            return null
        }
    }


}
