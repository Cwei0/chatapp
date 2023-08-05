from rest_framework.routers import DefaultRouter
from server.views import ServerListViewSet

router = DefaultRouter()
router.register("server/select", ServerListViewSet)

urlpatterns = router.urls
