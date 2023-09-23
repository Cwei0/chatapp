from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from .models import Conversation, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        """
        Constructor for WebChatConsumer.

        Initialize the 'channel_id' and 'user' attributes.
        """
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        """
        WebSocket connection handler.

        This method is called when a WebSocket connection is established.

        - Accepts the WebSocket connection.
        - Retrieves the user and channel ID from the URL route.
        - Adds the current channel to the channel group.
        """
        self.accept()
        self.user = User.objects.get(id=1)  # Replace with your user retrieval logic
        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name,
        )

    def receive_json(self, content):
        """
        WebSocket message receive handler.

        This method is called when a WebSocket message is received.

        - Creates a new message in the conversation.
        - Sends the received message to the channel group.
        """
        channel_id = self.channel_id
        sender = self.user
        message = content["newMessage"]

        conversation, _ = Conversation.objects.get_or_create(channel_id=channel_id)
        new_message = Message.objects.create(
            conversation=conversation, content=message, sender=sender
        )
        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_message.id,
                    "sender": new_message.sender.get_username(),
                    "content": new_message.content,
                    "timestamp": new_message.timestamp.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        """
        WebSocket message broadcast handler.

        This method is called when a message is broadcasted to the channel group.
        It sends the message to the connected WebSocket clients.

        Args:
            event (dict): A dictionary containing the event data.
        """
        self.send_json(event)

    def disconnect(self, close_code):
        """
        WebSocket disconnection handler.

        This method is called when a WebSocket connection is closed.

        Args:
            close_code (int): The WebSocket close code.

        Disconnects the channel from the channel group and invokes the parent class's 'disconnect' method.
        """
        async_to_sync(self.channel_layer.group_discard)(
            self.channel_id, self.channel_name
        )
        super().disconnect(close_code)
