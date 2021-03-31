
export function getDistanceBetweenPoints(
  x2, y2, x1, y1
) {
  return (Math.sqrt(
    ((x1 - x2) * (x1 - x2))
    + ((y1 - y2) * (y1 - y2))
  ));
}
