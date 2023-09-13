from rest_framework.routers import DefaultRouter
from server.views import ServerListViewSet, CategoryListViewSet

router = DefaultRouter()
router.register("server/select", ServerListViewSet)
router.register("server/category", CategoryListViewSet)

urlpatterns = router.urls
