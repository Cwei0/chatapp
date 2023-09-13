from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    StringRelatedField,
)
from .models import Server, Channel, Category


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
    category = StringRelatedField()

    class Meta:
        model = Server
        exclude = ["members"]

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


class CategorySerializer(ModelSerializer):
    """
    Serializer for the Category model.

    This serializer is used to convert Category model instances to JSON representations.

    Attributes:
        model (Category): The Category model class.
        fields (str): A string indicating that all fields from the model should be included.

    """

    class Meta:
        model = Category
        fields = "__all__"

# The CategorySerializer class is responsible for serializing Category model instances.
# It inherits from ModelSerializer, which simplifies the process of converting models to JSON.

# In the Meta class, we specify that this serializer is associated with the Category model,
# and we want to include all fields in the serialized output using 'fields = "__all__"'.