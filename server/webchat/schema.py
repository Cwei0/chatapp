from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializer import MessageSerializer
list_message_docs = extend_schema(
    responses=MessageSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="channel_id",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Id of the Channel"
        )
    ]
)