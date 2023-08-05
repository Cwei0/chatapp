from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from .models import Server
from .serializer import ServerSerializer
from django.db.models import Count


# Create your views here.
class ServerListViewSet(ViewSet):
    """
    ViewSet for handling Server-related operations.

    Attributes:
        queryset (QuerySet): QuerySet containing all Server objects.

    """

    # Querying all the Servers from the database
    queryset = Server.objects.all()

    # Handler for the HTTP GET request with query parameters
    def list(self, request):
        """
        Handler for the HTTP GET request with query parameters.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: A serialized Response containing a list of Server objects.

        Raises:
            AuthenticationFailed: If the request is trying to filter by user or server id
                                  without proper authentication.
            ValidationError: If the provided server id is not found or is not a valid integer.

        Notes:
            The following query parameters can be used to filter the server list:
            - `category`: Filter servers by category name.
            - `qty`: Limit the number of servers returned.
            - `by_user`: Filter servers owned by the authenticated user. Requires authentication.
            - `by_serverid`: Filter server by a specific server id.
            - `with_num_members`: Annotate the queryset with the number of members for each server.

        """

        # Extract query parameters from the request
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server_id = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # Check if the request is trying to filter by user or server id without authentication
        if by_user or by_server_id and not request.user.is_authenticated:
            raise AuthenticationFailed()

        # Filter queryset by category if provided
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filter queryset by user's servers if by_user is True
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(members=user_id)

        # Annotate queryset with the number of members in each server if with_num_members is True
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("members"))

        # Limit the queryset to a certain number of results if qty is provided
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Filter queryset by server id if provided
        if by_server_id:
            try:
                self.queryset = self.queryset.filter(id=by_server_id)
                # If the server with the given id does not exist, raise a ValidationError
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_server_id} not found"
                    )
            except ValueError:
                # If the provided server id is not a valid integer, raise a ValidationError
                raise ValidationError(detail=f"Server value error")

        # Serialize the queryset and return the response
        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data)
