from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from .models import Conversation, Message
from .serializer import MessageSerializer
from rest_framework.response import Response
from .schema import list_message_docs

# Create your views here.
class MessageViewSet(ViewSet):
    """
    ViewSet for retrieving a list of messages related to a conversation.

    This viewset allows you to retrieve a list of messages associated with a specific conversation
    identified by the 'channel_id' query parameter.

    Methods:
     - `list(request)` -- Retrieve a list of messages for a conversation and return serialized data.
    """
    @list_message_docs
    def list(self, request):
        # Retrieve the 'channel_id' from the query parameters.
        channel_id = request.query_params.get("channel_id")

        try:
            # Retrieve the conversation with the specified 'channel_id'.
            conversation = Conversation.objects.get(channel_id=channel_id)

            # Query all messages related to the conversation.
            messages = Message.objects.filter(conversation=conversation)

            # Serialize the messages.
            serializer = MessageSerializer(messages, many=True)

            # Return the serialized data as a response.
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response([])
            
