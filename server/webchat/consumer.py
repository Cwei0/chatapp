from channels.generic.websocket import WebsocketConsumer

class MyConsumer(WebsocketConsumer):
    groups=["broadcast"]

    def connect(self):
        self.accept()

    def receive(self, text_data=None, bytes_data=None):
        self.send(text_data="Hello World")
        self.close()

    def disconnect(self, code):
        return super().disconnect(code)