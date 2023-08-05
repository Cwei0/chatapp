import os
from PIL import Image
from django.core.exceptions import ValidationError


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 70 or img.height > 70:
                raise ValidationError(
                    f"Maximum size allowed for dimension of the image are 70x70 - size of image you uploaded: {img.size}"
                )


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extension = [".jpeg", ".jpg", ".png", ".gif"]
    if not ext.lower() in valid_extension:
        raise ValidationError("Unsupported file extension")
