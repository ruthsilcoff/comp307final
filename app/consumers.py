from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .serializers import DirectMessageSerializer


class GenericConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def notify(self, event):
        print('notify')
        await self.send_json(event['content'])

    async def receive_json(self, content, **kwargs):
        if content['type'] == 'subscribe':
            group = str(content['payload']['userID'])
            self.groups.append(group)
            await self.channel_layer.group_add(group, self.channel_name)
