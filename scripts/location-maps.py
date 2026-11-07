"""Regenerate generalized locator SVGs from the pinned GeoBoundaries ADM1 input.
Usage: python3 scripts/location-maps.py /path/to/geoBoundaries-CAN-ADM1_simplified.geojson
No network or third-party Python packages required. See docs/ASSETS.md for provenance.
"""
import json
import math
import pathlib
import sys
from xml.sax.saxutils import escape

features = json.loads(pathlib.Path(sys.argv[1]).read_text())['features']
r = math.radians
n = math.log(math.cos(r(49)) / math.cos(r(77))) / math.log(math.tan(math.pi/4+r(77)/2) / math.tan(math.pi/4+r(49)/2))
f = math.cos(r(49)) * math.tan(math.pi/4+r(49)/2)**n / n

def project(p):
    lon, lat = p[:2]
    rho = f / math.tan(math.pi/4+r(lat)/2)**n
    return (rho * math.sin(n*r(lon+95)), -rho * math.cos(n*r(lon+95)))

polygons = {}
for feature in features:
    geometry = feature['geometry']
    rings = geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else [geometry['coordinates']]
    code = feature['properties']['shapeISO'].split('-')[1]
    polygons['QC' if code == 'QB' else code] = [[project(p) for p in polygon[0]] for polygon in rings]
points = [p for rings in polygons.values() for ring in rings for p in ring]
xmin, xmax = min(p[0] for p in points), max(p[0] for p in points)
ymin, ymax = min(p[1] for p in points), max(p[1] for p in points)
scale = min(680/(xmax-xmin), 420/(ymax-ymin))
def pixel(p):
    return ((p[0]-(xmin+xmax)/2)*scale+400, -(p[1]-(ymin+ymax)/2)*scale+250)

def simplify(points, tolerance=0.65):
    if len(points) < 3: return points
    a, b = points[0], points[-1]
    dx, dy = b[0]-a[0], b[1]-a[1]
    def distance(p):
        t = max(0, min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy))) if dx*dx+dy*dy else 0
        return math.hypot(p[0]-a[0]-t*dx, p[1]-a[1]-t*dy)
    index, distance_max = max(enumerate(map(distance, points)), key=lambda x:x[1])
    if distance_max <= tolerance: return [a,b]
    return simplify(points[:index+1], tolerance)[:-1] + simplify(points[index:], tolerance)

paths = {}
for code, rings in polygons.items():
    paths[code] = ''
    for ring in rings:
        pts = [pixel(p) for p in ring]
        area = abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(pts, pts[1:]))) / 2
        if area < 1.2: continue
        pts = simplify(pts)
        if len(pts)<4: continue
        paths[code] += 'M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in pts)+'Z'

locations = {
    'locations': ('CA', 'Canada', None),
    'alberta': ('AB', 'Alberta', None), 'bc': ('BC', 'British Columbia / Colombie-Britannique', None),
    'manitoba': ('MB', 'Manitoba', None), 'nb': ('NB', 'New Brunswick / Nouveau-Brunswick', None),
    'nl': ('NL', 'Newfoundland and Labrador / Terre-Neuve-et-Labrador', None),
    'ns': ('NS', 'Nova Scotia / Nouvelle-Écosse', None), 'ontario': ('ON', 'Ontario', None),
    'pei': ('PE', 'Prince Edward Island / Île-du-Prince-Édouard', None), 'quebec': ('QC', 'Québec', None),
    'saskatchewan': ('SK', 'Saskatchewan', None), 'nwt': ('NT', 'Northwest Territories / Territoires du Nord-Ouest', None),
    'nunavut': ('NU', 'Nunavut', None), 'yukon': ('YT', 'Yukon', None),
    'toronto': ('ON', 'Toronto', (-79.38,43.65)), 'montreal': ('QC', 'Montréal', (-73.57,45.50)),
    'vancouver': ('BC', 'Vancouver', (-123.12,49.28)), 'calgary': ('AB', 'Calgary', (-114.07,51.04)),
}
out = pathlib.Path('public/maps')
out.mkdir(exist_ok=True)
for key, (highlight, name, point) in locations.items():
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-labelledby="title">',
           f'<title id="title">{escape(name)} — geographic locator / repère géographique</title>',
           '<desc>Adapted from Statistics Canada, Canada provincial and territorial boundaries (geoBoundaries CAN ADM1), 2023. This does not constitute an endorsement by Statistics Canada of this product. Generalized for orientation only; city markers are approximate geographic centres, not business premises. https://www.statcan.gc.ca/en/terms-conditions/open-licence</desc>',
           '<rect width="800" height="500" rx="12" fill="#F5F8FB"/>']
    for code, d in paths.items():
        fill = '#D62839' if code==highlight else '#CFDAE7'
        if highlight=='CA': fill='#102B4E'
        svg.append(f'<path d="{d}" fill="{fill}" stroke="#FFFFFF" stroke-width="0.8"/>')
    if point:
        x,y = pixel(project(point))
        svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="10" fill="#FFFFFF" stroke="#102B4E" stroke-width="3"/><circle cx="{x:.1f}" cy="{y:.1f}" r="3" fill="#102B4E"/>')
    svg.append('</svg>')
    (out/f'{key}.svg').write_text(''.join(svg)+'\n')
print(f'Created {len(locations)} generalized locator maps; {sum(p.stat().st_size for p in out.glob("*.svg"))} bytes total.')
