from channels.layers import get_channel_layer
from .serializers import DirectMessageSerializer


async def notify(serializer_class, instance):
    serializer = serializer_class(instance)
    await get_channel_layer().group_send(
        serializer.group_name(),
        {
            'type': 'notify',
            'content': {
                'type': 'direct_message',
                'payload': serializer.data,
            }
        },
    )
