from rest_framework.routers import DefaultRouter
from server.views import ServerListViewSet, CategoryListViewSet
from webchat.views import MessageViewSet

router = DefaultRouter()
router.register("server/select", ServerListViewSet)
router.register("server/category", CategoryListViewSet)
router.register("messages", MessageViewSet, basename="message")

urlpatterns = router.urls
