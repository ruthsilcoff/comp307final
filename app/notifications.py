from channels.layers import get_channel_layer
from .serializers import DirectMessageSerializer
from .serializers import ChatSerializer


async def notify(serializer_class, instance):
    serializer = serializer_class(instance)
    await get_channel_layer().group_send(
        serializer.group_name(),
        {
            'type': 'notify',
            'content': {
                'type': 'notify',
                'name': instance.__class__.__name__,
                'payload': serializer.data,
            }
        },
    )


async def update(serializer_class, instance):
    serializer = serializer_class(instance)
    await get_channel_layer().group_send(
        serializer.group_name(),
        {
            'type': 'update',
            'content': {
                'type': 'update',
                'name': instance.__class__.__name__,
                'payload': serializer.data,
            }
        },
    )