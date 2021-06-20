import { Channel, Invite, Topic } from '@prisma/client';
import { ChannelService } from '../service/ChannelService';
import express from 'express';
import { infoLog } from '../logging';
const router = express.Router();

router.get("/:id", async (req,res)=>{
    let channelId: number = parseInt(req.params.id)

    let channel: Channel | null =
        await ChannelService.getChannel(channelId)


    if (channel == null) {
        return res.sendStatus(404)
    }

    return res.json(channel);
})
router.post("/", async (req, res) => {
    let channelName: string = req.body.name;

    let createdChannel: Channel | undefined =
        await ChannelService.createChannel(channelName)


    if (createdChannel == undefined) {
        return res.sendStatus(409)
    }

    return res.json(createdChannel);
})
router.post("/:id/addTopic/:name", async (req, res) => {
    let channelId: number = parseInt(req.params.id)
    let topicName:string = req.params.name

    let createdTopic: Topic | undefined =
        await ChannelService.addTopic(channelId,topicName)

    if (createdTopic == undefined) {
        return res.sendStatus(409)
    }

    return res.json(createdTopic);
})
export default router;
