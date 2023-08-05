from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Server, Channel


class ChannelSerializer(ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(ModelSerializer):
    """
    Serializer for the Server model.

    This serializer is used to convert Server model instances to JSON representations.

    Attributes:
        num_members (SerializerMethodField): A custom field that calculates and includes
                                             the number of members in the server.

    """

    num_members = SerializerMethodField()
    channel_server = ChannelSerializer(many=True)

    class Meta:
        model = Server
        exclude = ['members']

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop("num_members", None)
        return data