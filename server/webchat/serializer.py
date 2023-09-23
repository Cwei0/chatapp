from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Message

class MessageSerializer(ModelSerializer):
    """
    Serializer for the Message model.

    This serializer is used to convert Message model instances into JSON format.

    Fields:
        - `sender` -- Represents the sender's username as a string.

    Attributes:
        - `model (Message)` : The Message model class.
        - `fields (str)` : A string indicating that all fields from the model should be included.

    """
    # StringRelatedField is used to represent the 'sender' field as a string (username) in the serialized data.
    sender = StringRelatedField()

    class Meta:
        model = Message
        # The 'Meta' class provides metadata options for the serializer.
        # In this case, we specify the 'Message' model to be serialized.
        fields = "__all__"
        # '__all__' indicates that all fields in the 'Message' model should be included in the serialized data.
