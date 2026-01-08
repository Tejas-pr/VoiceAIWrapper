"""
Simple CORS middleware to handle cross-origin requests.
"""
from django.conf import settings
from django.http import JsonResponse


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Handle preflight OPTIONS requests
        if request.method == 'OPTIONS':
            response = JsonResponse({})
            self._add_cors_headers(response, request)
            return response

        response = self.get_response(request)
        self._add_cors_headers(response, request)
        return response

    def _add_cors_headers(self, response, request):
        origin = request.META.get('HTTP_ORIGIN', '')
        allowed_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', [])
        
        if origin in allowed_origins:
            response['Access-Control-Allow-Origin'] = origin
            response['Access-Control-Allow-Credentials'] = 'true'
        
        if request.method == 'OPTIONS':
            allowed_methods = getattr(settings, 'CORS_ALLOW_METHODS', ['GET', 'POST', 'OPTIONS'])
            allowed_headers = getattr(settings, 'CORS_ALLOW_HEADERS', ['content-type', 'authorization'])
            
            response['Access-Control-Allow-Methods'] = ', '.join(allowed_methods)
            response['Access-Control-Allow-Headers'] = ', '.join(allowed_headers)
            response['Access-Control-Max-Age'] = '86400'

