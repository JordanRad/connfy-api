import { PrismaClient, Topic } from '@prisma/client';
import { errorLog, infoLog } from '../logging';

const prisma = new PrismaClient();

export class TopicService {

    /**
     * Create topic
     * */
    public static async createTopic(channelId: number, name: string) {
        try {
            let topic = await prisma.topic.create({
                data: { name: name, channelId: channelId }
            })

            infoLog("Created Topic " + JSON.stringify(topic))

            return topic;

        } catch (err) {
            errorLog(err)
            return undefined
        }
    }


    
}
