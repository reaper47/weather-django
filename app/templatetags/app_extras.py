import json
from decimal import Decimal

from django import template
from django.utils.html import mark_safe

register = template.Library()


@register.filter
def heat_index_found(x):
    return ' + '.join(x.replace('heat-index', 'Heat Index').split('-')).title()


@register.filter
def heat_index_not_found(x):
    return ' + '.join(x.split('-')).title()


@register.filter
def adjust_live_tile_id(x):
    return '-'.join(x[1].split(' ')).lower()


@register.filter
def tojson(value):
    return mark_safe(json.dumps(value, default=default))


@register.filter
def title_replace(x):
    return x.title().replace('-', ' ')


def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)
