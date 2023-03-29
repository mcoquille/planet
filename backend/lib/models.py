import dataclasses
from typing import Optional
from shapely import Polygon, MultiPolygon

@dataclasses.dataclass(frozen=True)
class Figure:
    org_id: int
    figure: Polygon or MultiPolygon
    id: Optional[int] = None
