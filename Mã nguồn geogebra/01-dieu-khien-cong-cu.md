# 01-dieu-khien-cong-cu.md

Nguồn: GeoGebra (EUPL v1.2). Mã Java đã bỏ bình luận/import để gọn. Chỉ để ĐỌC lấy ý tưởng thuật toán, viết lại bằng JavaScript.

Nội dung: Logic các công cụ 3D khi người dùng bấm chuột (EuclidianController3D), các lệnh 3D, khối đa diện đều, phép biến hình 3D

Danh sách file trong phần này:
- EuclidianController3D.java
- EuclidianController3DCompanion.java
- Hits3D.java
- ConstructionCompanion3D.java
- ConstructionDefaults3D.java
- GeoFactory3D.java
- Kernel3D.java
- MyPoint3D.java
- AlgebraProcessor3D.java
- BasicCommandProcessorFactory3D.java
- CmdAngle3D.java
- CmdAngularBisector3D.java
- CmdArcSector3D.java
- CmdArchimedeanSolid.java
- CmdArea3D.java
- CmdBottom.java
- CmdCircle3D.java
- CmdCircleArcSector3D.java
- CmdCircumcircleArc3D.java
- CmdCircumcircleSector3D.java
- CmdClosestPointRegion.java
- CmdCone.java
- CmdConeInfinite.java
- CmdConic3D.java
- CmdCorner3D.java
- CmdCurveCartesian3D.java
- CmdCylinder.java
- CmdCylinderInfinite.java
- CmdDiameter3D.java
- CmdDilate3D.java
- CmdDistance3D.java
- CmdEllipseHyperbola3D.java
- CmdEnds.java
- CmdFocus3D.java
- CmdHeight.java
- CmdInteriorAngles3D.java
- CmdIntersect3D.java
- CmdIntersectConic.java
- CmdLength3D.java
- CmdLine3D.java
- CmdLineBisector3D.java
- CmdLocus3D.java
- CmdMidpoint3D.java
- CmdMirror3D.java
- CmdOrthogonalLine3D.java
- CmdOrthogonalPlane.java
- CmdOrthogonalVector3D.java
- CmdParabola3D.java
- CmdPlane.java
- CmdPlaneBisector.java
- CmdPoint3D.java
- CmdPointIn3D.java
- CmdPolyLine3D.java
- CmdPolygon3D.java
- CmdPolyhedronConvex.java
- CmdPolyhedronNet.java
- CmdPrism.java
- CmdPyramid.java
- CmdQuadricSide.java
- CmdRay3D.java
- CmdRotate3D.java
- CmdSegment3D.java
- CmdSemicircle3D.java
- CmdSphere3D.java
- CmdTangent3D.java
- CmdTop.java
- CmdTranslate3D.java
- CmdUnitOrthogonalVector3D.java
- CmdUnitVector3D.java
- CmdVertex3D.java
- CmdVertexForce3D.java
- CmdVolume.java
- CommandProcessor3D.java
- ParametricProcessor3D.java
- SpatialCommandProcessorFactory.java
- PlatonicSolid.java
- PlatonicSolidsFactory.java
- MirrorableAtPlane.java
- TransformDilate3D.java
- TransformMirror3D.java
- TransformRotate3D.java
- TransformTranslate3D.java

### FILE: geogebra3D/euclidian3D/EuclidianController3D.java
```java
public abstract class EuclidianController3D extends EuclidianController {
 private double[] xMinMax;
 private double[] yMinMax;
 protected double[] zMinMax;
 protected CoordMatrix4x4 currentPlane = null;
 protected EuclidianView3D view3D; 
 private boolean freePointJustCreated = false;
 protected boolean viewRotationOccurred = false;
 private TextDispatcher3D textDispatcher;
 private boolean dialogOccurred = false;
 private GeoPointND[] pyramidBasis = null;
 private boolean polygonForPyramidBasis = false;
 private int pointMoveMode = GeoPointND.MOVE_MODE_XY;
 protected boolean mouseMoved = false;
 protected AbstractEvent mouseEvent = null;
 public static final double ANGLE_TO_DEGREES = 2 * Math.PI / 360;
 public static final int ANGLE_MAX = 90;
 private EuclidianController3DCompanion companion3D;
 private boolean lastGetNewPointWasExistingPoint = false;
 private GeoElement handledGeo;
 private final Coords startPoint3D = new Coords(0, 0, 0, 1);
 private final Coords startPoint3DxOy = new Coords(0, 0, 0, 1);
 protected Coords translationVec3D = new Coords(4);
 private Coords translateDirection;
 private final Coords scaleAxisVector = new Coords(2);
 private final Coords scaleOrigin = new Coords(2);
 private double scaleOld;
 private double scaleDistanceInPixelsStart;
 private final Coords tmpCoords = new Coords(4);
 private final Coords tmpCoords2 = new Coords(4);
 private final Coords tmpCoordsForOrigin = new Coords(4);
 private final Coords tmpCoordsForDirection = new Coords(4);
 private Hits3D goodHits;
 private final ArrayList<IntersectionCurve> intersectionCurveList = new ArrayList<>();
 private IntersectionCurve resultedIntersectionCurve;
 private GeoPointND singleIntersectionPoint;
 private boolean isModeForCreatingPoint;
 private SchedulerFactory.Scheduler schedulerForMouseExit;
 private ScheduledMouseExit mScheduledMouseExit;
 private final List<GeoElement> hitsForSingleIntersectionPoint;
 private final RotationSpeedHandler rotationSpeedHandler;
 public static class IntersectionCurve {
  protected GeoElement geo1;
  protected GeoElement geo2;
  public Drawable3D drawable;
  public IntersectionCurve(GeoElement geo1, GeoElement geo2, Drawable3D drawable) {
   this.geo1 = geo1;
   this.geo2 = geo2;
   this.drawable = drawable;
  }
 }
 public class ScheduledMouseExit implements Runnable {
  private final AbstractEvent mEvent;
  private volatile boolean mCancelled;
  protected ScheduledMouseExit(AbstractEvent e) {
   mEvent = e;
   mCancelled = false;
  }
  public final void run() {
   runMouseExit();
   getView().repaint();
  }
  public final void cancel() {
   mCancelled = true;
  }
  protected void runMouseExit() {
   if (!mCancelled) {
    wrapMouseExited(mEvent);
   }
  }
 }
 public EuclidianController3D(App app) {
  super(app);
  xMinMax = new double[2];
  yMinMax = new double[2];
  zMinMax = new double[2];
  hitsForSingleIntersectionPoint = new ArrayList<>();
  rotationSpeedHandler = new RotationSpeedHandler();
 }
 protected EuclidianControllerCompanion newCompanion() {
  companion3D = new EuclidianController3DCompanion(this);
  return companion3D;
 }
 public void setView3D(EuclidianView view) {
  this.view3D = (EuclidianView3D) view;
 }
 private double[] getMinMax(double min, double max, double val, double size) {
  double min1 = min + size, max1 = max - size;
  if (!view3D.getSettings().useClippingCube()) {
   double delta = (max - min) / 2;
   min1 -= delta;
   max1 += delta;
  }
  if (val < min1) {
   min1 = val;
  } else if (val > max1) {
   max1 = val;
  }
  return new double[] {min1, max1};
 }
 public void setMovedGeoPoint(GeoPointND geo) {
  ((EuclidianView3D) getView()).setPointDecorations(geo);
  GeoPointND unwrappedPoint = unwrapDynamicCoordinates(geo);
  movedGeoPoint = unwrappedPoint;
  Coords coords = unwrappedPoint.getInhomCoordsInD3();
  double pointSize = movedGeoPoint.getPointSize() * DrawPoint3D.DRAW_POINT_FACTOR;
  double size;
  size = pointSize / view3D.getXscale();
  xMinMax = getMinMax(view3D.getXmin(), view3D.getXmax(), coords.getX(), size);
  size = pointSize / view3D.getYscale();
  yMinMax = getMinMax(view3D.getYmin(), view3D.getYmax(), coords.getX(), size);
  size = pointSize / view3D.getZscale();
  zMinMax = getMinMax(view3D.getZmin(), view3D.getZmax(), coords.getZ(), size);
  updateMovedGeoPointStartValues(coords);
  view3D.setDragCursor();
 }
 public final void updateMovedGeoPointStartValues(Coords coords) {
  getCompanion().updateMovedGeoPointStartValues(coords, movedGeoPoint, getCurrentPlane());
 }
 protected CoordMatrix4x4 getCurrentPlane() {
  if (currentPlane == null) {
   currentPlane = CoordMatrix4x4.identity();
  }
  return currentPlane;
 }
 protected void setCurrentPlane(CoordMatrix4x4 plane) {
  currentPlane = plane;
 }
 protected void movePointOnCurrentPlane(GeoPointND point) {
  if (mouseLoc == null) {
   return;
  }
  view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
  addOffsetForTranslation(tmpCoordsForOrigin);
  view3D.getHittingDirection(tmpCoordsForDirection);
  if (DoubleUtil.isEqual(
    tmpCoordsForDirection.dotproduct(getCurrentPlane().getVz()),
    0.0,
    Kernel.STANDARD_PRECISION)) {
   point.getInhomCoordsInD3().projectLine(tmpCoordsForOrigin, tmpCoordsForDirection, tmpCoords2);
   tmpCoords2.projectPlane(getCurrentPlane(), tmpCoords);
  } else {
   tmpCoordsForOrigin.projectPlaneThruV(getCurrentPlane(), tmpCoordsForDirection, tmpCoords);
  }
  checkXYMinMax(tmpCoords);
  ((EuclidianController3DCompanion) companion).checkPointCapturingXY(tmpCoords);
  point.setCoords(tmpCoords, true);
 }
 protected boolean checkXYMinMax(Coords v) {
  if (view3D.isXREnabled()) {
   return false;
  }
  if (getMoveMode() != MoveMode.POINT) {
   return false;
  }
  boolean changed = false;
  if (v.getX() > xMinMax[1]) {
   v.setX(xMinMax[1]);
   changed = true;
  } else if (v.getX() < xMinMax[0]) {
   v.setX(xMinMax[0]);
   changed = true;
  }
  if (v.getY() > yMinMax[1]) {
   v.setY(yMinMax[1]);
   changed = true;
  } else if (v.getY() < yMinMax[0]) {
   v.setY(yMinMax[0]);
   changed = true;
  }
  return changed;
 }
 protected final void setMouseInformation(GeoPoint3D point) {
  setMouseOrigin(point);
  view3D.getHittingDirection(tmpCoordsForDirection);
  point.setWillingDirection(tmpCoordsForDirection);
  point.setZScale(view3D.getZscale());
 }
 protected final void setMouseOrigin(GeoPoint3D point) {
  getCompanion().setMouseOrigin(point, mouseLoc);
 }
 public void addOffsetForTranslation(Coords o) {
  if (moveMode == MoveMode.POINT_WITH_OFFSET) {
   o.setAdd(o, translationVec3D);
  }
 }
 protected void moveTextStaticRWLocation() {
  view3D.getPickPoint(mouseLoc, tmpCoordsForOrigin);
  view3D.toSceneCoords3D(tmpCoordsForOrigin);
  view3D.getHittingDirection(tmpCoordsForDirection);
  tmpCoordsForOrigin.projectPlaneThruVIfPossible(
    CoordMatrix4x4.IDENTITY, tmpCoordsForDirection, tmpCoords);
  movedGeoText
    .getStartPoint()
    .setCoords(
      tmpCoords.getX() - startPoint3DxOy.getX(),
      tmpCoords.getY() - startPoint3DxOy.getY(),
      1.0);
 }
 protected Hits getRegionHits(Hits hits) {
  return hits.getHits(TestGeo.REGION3D, tempRegionHitsArrayList);
 }
 private GeoPoint3D getNewPointFree(GeoPointND point) {
  GeoPoint3D point3D = (GeoPoint3D) kernel.getManager3D().point3D(0, 0, 0, false);
  point3D.setCoords(point);
  point3D.updateCoords();
  point3D.setLabel(null);
  view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_ALREADY);
  view3D.updateMatrixForCursor3D();
  GeoCursor3D cursor = view3D.getCursor3D();
  cursor.setSource(point3D.getID());
  cursor.setRegion(null);
  cursor.setPath(null);
  cursor.setMoveMode(point3D.getMoveMode());
  if (isModeForCreatingPoint(mode)) {
   freePointJustCreated = true;
  }
  return point3D;
 }
 protected GeoPointND getNewPoint(
   Hits hits,
   boolean onPathPossible,
   boolean inRegionPossible,
   boolean intersectPossible,
   boolean complexPoint) {
  GeoPoint3D point = view3D.getCursor3D();
  GeoPoint3D point3D;
  GeoPointND ret;
  lastGetNewPointWasExistingPoint = false;
  switch (view3D.getCursor3DType()) {
   case EuclidianView3D.PREVIEW_POINT_FREE:
    point3D = getNewPointFree(point);
    ret = point3D;
    pointCreated = point3D;
    break;
   case EuclidianView3D.PREVIEW_POINT_PATH:
    if (onPathPossible) {
     Path path = point.getPath();
     if (path.toGeoElement().isGeoElement3D()
       || (path.toGeoElement().isGeoList()
         && ((GeoList) path.toGeoElement()).containsGeoElement3D())) {
      point3D = (GeoPoint3D) getKernel().getManager3D().point3D(null, path, false);
      point3D.setWillingCoords(point.getCoords());
      view3D.getHittingDirection(tmpCoordsForDirection);
      point3D.setWillingDirection(tmpCoordsForDirection);
      point3D.doPath();
      point3D.setWillingCoordsUndefined();
      point3D.setWillingDirectionUndefined();
      ret = point3D;
      pointCreated = point3D;
     } else {
      Coords coords = point.getCoordsInD2();
      pointCreated =
        createNewPoint2D(null, false, path, coords.getX(), coords.getY(), false, false);
      return pointCreated;
     }
    } else {
     pointCreated = null;
     return null;
    }
    break;
   case EuclidianView3D.PREVIEW_POINT_REGION:
   case EuclidianView3D.PREVIEW_POINT_REGION_AS_PATH:
    if (inRegionPossible) {
     Region region = point.getRegion();
     if (region == getKernel().getXOYPlane()) {
      point3D = getNewPointFree(point);
      ret = point3D;
      pointCreated = point3D;
     } else if (region.isRegion3D()) {
      Coords coords = point.getCoords();
      point3D = (GeoPoint3D)
        getKernel().getManager3D().point3DIn(null, region, coords, true, false);
      point3D.doRegion();
      point3D.setWillingCoordsUndefined();
      point3D.setWillingDirectionUndefined();
      ret = point3D;
      pointCreated = point3D;
     } else {
      Coords coords = point.getCoordsInD2();
      pointCreated =
        createNewPoint2D(null, false, region, coords.getX(), coords.getY(), false, false);
      return pointCreated;
     }
    } else {
     pointCreated = null;
     return null;
    }
    break;
   case EuclidianView3D.PREVIEW_POINT_DEPENDENT:
    if (intersectPossible) {
     GeoPointND intersectionPoint = view3D.getIntersectionPoint();
     intersectionPoint.getParentAlgorithm().addToConstructionList();
     intersectionPoint.setLabel(null);
     pointCreated = intersectionPoint;
     if (intersectionPoint.isGeoElement3D()) {
      point3D = (GeoPoint3D) intersectionPoint;
     } else {
      return intersectionPoint;
     }
    } else {
     point3D = null;
     pointCreated = null;
    }
    return point3D;
   case EuclidianView3D.PREVIEW_POINT_ALREADY:
    GeoPointND firstPoint = (GeoPointND) hits.getFirstHit(TestGeo.GEOPOINTND);
    if (firstPoint == movedGeoPoint) {
     lastGetNewPointWasExistingPoint = true;
     return firstPoint;
    }
    resetMovedGeoPoint();
    return null;
   case EuclidianView3D.PREVIEW_POINT_NONE:
   default:
    pointCreated =
      super.getNewPoint(hits, onPathPossible, inRegionPossible, intersectPossible, false);
    return pointCreated;
  }
  ret.update();
  setMovedGeoPoint(point3D);
  view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_ALREADY);
  view3D.updateMatrixForCursor3D();
  return ret;
 }
 public void createNewPoint(GeoPointND sourcePoint) {
  GeoCursor3D point3D = view3D.getCursor3D();
  point3D.setIsCaptured(false);
  point3D.setCoords(sourcePoint.getCoordsInD3(), false);
  point3D.setPath(sourcePoint.getPath());
  point3D.setRegion(sourcePoint.getRegion());
  if (sourcePoint.isIndependent() || !sourcePoint.isGeoElement3D()) {
   point3D.setMoveNormalDirection(Coords.VZ);
  } else if (sourcePoint.hasRegion()) {
   point3D.setMoveNormalDirection(sourcePoint.getRegionParameters().getNormal());
  }
  view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_ALREADY);
  point3D.setSource(sourcePoint.getID());
  point3D.setMoveMode(sourcePoint.getMoveMode());
  point3D.setPointSize(sourcePoint.getPointSize());
  point3D.setLayer(sourcePoint.getLayer());
 }
 protected void createNewPointIntersection(GeoPointND intersectionPoint) {
  tmpCoords.setInhomCoords(intersectionPoint.getCoordsInD3());
  tmpCoords.setW(1);
  List<Drawable3D> list = view3D.getDrawList3D().getDrawPoints();
  for (Drawable3D d : list) {
   if (d.isVisible()) {
    GeoPointND point = (GeoPointND) d.getGeoElement();
    Coords c = point.getInhomCoordsInD3();
    double dist = view3D.getIntersectionThickness()
      + point.getPointSize() * DrawPoint3D.DRAW_POINT_FACTOR;
    if (DoubleUtil.isEqual(tmpCoords.getX(), c.getX(), dist / view3D.getXscale())
      && DoubleUtil.isEqual(tmpCoords.getY(), c.getY(), dist / view3D.getYscale())
      && DoubleUtil.isEqual(tmpCoords.getZ(), c.getZ(), dist / view3D.getZscale())) {
     createNewPoint(point);
     return;
    }
   }
  }
  GeoCursor3D point3D = view3D.getCursor3D();
  point3D.setIsCaptured(false);
  point3D.setCoords(tmpCoords, false);
  view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_DEPENDENT);
  view3D.setIntersectionPoint(intersectionPoint);
 }
 protected boolean createNewPointInRegionPossible(GeoConicND conic) {
  return conic.getLastHitType() == HitType.ON_FILLING;
 }
 protected GeoPointND getSingleIntersectionPoint(Hits hits) {
  if (hits.isEmpty() || hits.size() < 2) {
   return null;
  }
  if (mouseLoc == null) {
   return null;
  }
  hitsForSingleIntersectionPoint.addAll(hits);
  GeoElement a = hitsForSingleIntersectionPoint.get(0);
  if (a.isGeoLine()) { 
   while (hitsForSingleIntersectionPoint.size() >= 2) {
    if (hitsForSingleIntersectionPoint.get(1).isGeoPlane()
      && AlgoIntersectCS1D2D.getConfigLinePlane(
          (GeoLineND) a, (GeoCoordSys2D) hitsForSingleIntersectionPoint.get(1))
        == ConfigLinePlane.CONTAINED) {
     hitsForSingleIntersectionPoint.remove(1);
    } else {
     break;
    }
   }
  } else if (a.isGeoConic()) { 
   while (hitsForSingleIntersectionPoint.size() >= 2) {
    if (hitsForSingleIntersectionPoint.get(1).isGeoPlane()
      && AlgoIntersectPlanes.isIntersectionContained(
        ((GeoConicND) a).getCoordSys(),
        ((GeoCoordSys2D) hitsForSingleIntersectionPoint.get(1)).getCoordSys())) {
     hitsForSingleIntersectionPoint.remove(1);
    } else {
     break;
    }
   }
  } else if (a.isGeoPolygon()) { 
   while (hitsForSingleIntersectionPoint.size() >= 2) {
    if (hitsForSingleIntersectionPoint.get(1) instanceof GeoCoordSys2D
      && AlgoIntersectPlanes.isIntersectionContained(
        ((GeoPolygon) a).getCoordSys(),
        ((GeoCoordSys2D) hitsForSingleIntersectionPoint.get(1)).getCoordSys())) {
     hitsForSingleIntersectionPoint.remove(1);
    } else {
     break;
    }
   }
  }
  if (hitsForSingleIntersectionPoint.size() < 2) {
   hitsForSingleIntersectionPoint.clear();
   return null;
  }
  GeoElement b = hitsForSingleIntersectionPoint.get(1);
  hitsForSingleIntersectionPoint.clear();
  singleIntersectionPoint = null;
  boolean oldSilentMode = getKernel().isSilentMode();
  kernel.setSilentMode(true);
  if (!a.isGeoElement3D() && !b.isGeoElement3D()) {
   view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
   view3D.getHittingDirection(tmpCoordsForDirection);
   tmpCoordsForOrigin.projectPlaneThruVIfPossible(
     CoordMatrix4x4.IDENTITY, tmpCoordsForDirection, tmpCoords);
   setRwCoords(tmpCoords);
   singleIntersectionPoint = ((EuclidianControllerFor3DCompanion) companion)
     .getSingleIntersectionPointFrom2D(a, b, false);
  }
  else if (a.isGeoLine()) {
   if (b.isGeoLine()) {
    singleIntersectionPoint =
      (GeoPoint3D) getKernel().getManager3D().intersect(null, (GeoLineND) a, (GeoLineND) b);
   } else if (b.isGeoConic()) {
    singleIntersectionPoint = getSingleIntersectionPoint((GeoLineND) a, (GeoConicND) b);
   } else if (b instanceof GeoCoordSys2D) {
    singleIntersectionPoint =
      getSingleIntersectionPoint((GeoLineND) a, (GeoCoordSys2D) b, false);
   } else if (b instanceof GeoQuadric3D) {
    singleIntersectionPoint = getSingleIntersectionPoint((GeoLineND) a, (GeoQuadric3D) b);
   }
  }
  else if (b.isGeoLine()) {
   if (a.isGeoConic()) {
    singleIntersectionPoint = getSingleIntersectionPoint((GeoLineND) b, (GeoConicND) a);
   } else if (a instanceof GeoCoordSys2D) {
    singleIntersectionPoint =
      getSingleIntersectionPoint((GeoLineND) b, (GeoCoordSys2D) a, true);
   } else if (a instanceof GeoQuadric3D) {
    singleIntersectionPoint = getSingleIntersectionPoint((GeoLineND) b, (GeoQuadric3D) a);
   }
  }
  else if (a.isGeoConic() && b.isGeoConic()) {
   view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
   view3D.getHittingDirection(tmpCoordsForDirection);
   singleIntersectionPoint = getKernel()
     .getManager3D()
     .intersectConicsSingle(
       null, (GeoConicND) a, (GeoConicND) b, tmpCoordsForOrigin, tmpCoordsForDirection);
  }
  kernel.setSilentMode(oldSilentMode);
  if (singleIntersectionPoint == null) {
   return null;
  }
  if (singleIntersectionPoint.isDefined()) {
   if (singleIntersectionPoint.isGeoElement3D()) {
    view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
    view3D.getHittingDirection(tmpCoordsForDirection);
    double d = singleIntersectionPoint
        .getCoords()
        .getCoordsLast1()
        .distLine(tmpCoordsForOrigin, tmpCoordsForDirection)
      * view3D.getScale();
    if (d > view3D.getRenderer().getHitting().getThreshold() * 5) {
     return null;
    }
   }
   view3D.setIntersectionThickness(a, b);
   view3D.getCursor3D().setSource(a.getID(), b.getID());
   singleIntersectionPoint.setCartesian3D();
   singleIntersectionPoint.update();
   return singleIntersectionPoint;
  }
  return null;
 }
 private GeoPointND getSingleIntersectionPoint(GeoLineND a, GeoCoordSys2D b, boolean swapInputs) {
  return (GeoPoint3D) getKernel().getManager3D().intersect(null, a, b, swapInputs);
 }
 private GeoPointND getSingleIntersectionPoint(GeoLineND a, GeoQuadric3D b) {
  view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
  view3D.getHittingDirection(tmpCoordsForDirection);
  return getKernel()
    .getManager3D()
    .intersectLineQuadricSingle(null, a, b, tmpCoordsForOrigin, tmpCoordsForDirection);
 }
 private GeoPointND getSingleIntersectionPoint(GeoLineND a, GeoConicND b) {
  view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
  view3D.getHittingDirection(tmpCoordsForDirection);
  return getKernel()
    .getManager3D()
    .intersectLineConicSingle(null, a, b, tmpCoordsForOrigin, tmpCoordsForDirection);
 }
 protected final GeoPoint3D[] getSelectedPoints3D() {
  GeoPoint3D[] selected = getSelectedPointList().toArray(new GeoPoint3D[0]);
  clearSelection(getSelectedPointList());
  return selected;
 }
 protected final GeoCoordSys1D[] getSelectedLines3D() {
  GeoCoordSys1D[] selected = getSelectedLineList().toArray(new GeoCoordSys1D[0]);
  clearSelection(getSelectedLineList());
  return selected;
 }
 protected void circleOrSphere(GeoNumberValue num) {
  GeoPointND[] points = getSelectedPointsND();
  getKernel().getManager3D().sphere(null, points[0], num);
 }
 protected final boolean spherePointRadius(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return false;
  }
  addSelectedPoint(hits, 1, false, selPreview);
  if (selPoints() == 1) {
   getDialogManager()
     .showNumberInputDialogSpherePointRadius(
       app.getLocalization().getMenu(EuclidianConstants.getModeText(mode)),
       getSelectedPointsND()[0],
       this);
   return true;
  }
  return false;
 }
 protected final boolean coneTwoPointsRadius(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return false;
  }
  addSelectedPoint(hits, 2, false, selPreview);
  if (selPoints() == 2) {
   GeoPointND[] points = getSelectedPointsND();
   getDialogManager()
     .showNumberInputDialogConeTwoPointsRadius(
       app.getLocalization().getMenu(EuclidianConstants.getModeText(mode)),
       points[0],
       points[1],
       this);
   return true;
  }
  return false;
 }
 protected final boolean cylinderTwoPointsRadius(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return false;
  }
  addSelectedPoint(hits, 2, false, selPreview);
  if (selPoints() == 2) {
   GeoPointND[] points = getSelectedPointsND();
   getDialogManager()
     .showNumberInputDialogCylinderTwoPointsRadius(
       app.getLocalization().getMenu(EuclidianConstants.getModeText(mode)),
       points[0],
       points[1],
       this);
   return true;
  }
  return false;
 }
 protected final GeoElementND[] archimedeanSolid(Hits hits, Commands name, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  if (addSelectedPoint(hits, 2, false, selPreview) == 0) {
   if (selDirections() == 0) {
    if (selPoints() == 0) {
     TestGeo test;
     switch (name) {
      default:
      case Tetrahedron:
       test = TestGeo.GEOEQUILATERALTRIANGLE;
       break;
      case Cube:
       test = TestGeo.GEOSQUARE;
       break;
      case Octahedron:
       test = TestGeo.GEOEQUILATERALTRIANGLE;
       break;
      case Dodecahedron:
       test = TestGeo.GEOREGULARPENTAGON;
       break;
      case Icosahedron:
       test = TestGeo.GEOEQUILATERALTRIANGLE;
       break;
     }
     addSelectedSpecialPolygon(hits, 1, false, selPreview, test);
    } else if (selPoints() == 1) {
     addSelectedCS2D(hits, 1, false, selPreview);
    }
   }
  }
  if (selPoints() == 2) {
   GeoPointND[] points = getSelectedPointsND();
   GeoDirectionND direction;
   if (selCS2D() == 1) {
    direction = getSelectedCS2D()[0];
    Coords v = direction.getDirectionInD3();
    view3D.getHittingDirection(tmpCoordsForDirection);
    if (v.dotproduct(tmpCoordsForDirection) > 0) { 
     MyDouble a = new MyDouble(kernel);
     a.set(-1);
     GeoVector3D orientation = (GeoVector3D)
       new AlgoUnitVector3D(kernel.getConstruction(), direction, true).getVector();
     ExpressionNode en = new ExpressionNode(kernel, a, Operation.MULTIPLY, orientation);
     direction = new AlgoDependentVector3D(kernel.getConstruction(), en).getVector3D();
    }
    return new GeoElement[] {
     kernel.getManager3D().archimedeanSolid(null, points[0], points[1], direction, name)[0]
    };
   }
   return new GeoElement[] {
    kernel.getManager3D().archimedeanSolid(null, points[0], points[1], name)[0]
   };
  } else if (selPoints() == 0 && selPolygons() == 1) {
   GeoPolygon polygon = getSelectedPolygons()[0];
   view3D.getHittingDirection(tmpCoordsForDirection);
   GeoBoolean isDirect = new GeoBoolean(
     kernel.getConstruction(),
     DoubleUtil.isGreaterEqual(
       0, tmpCoordsForDirection.dotproduct3(polygon.getDirectionInD3())));
   return kernel.getManager3D().archimedeanSolid(null, polygon, isDirect, name);
  }
  return null;
 }
 protected final GeoElement[] polyhedronNet(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  addSelectedGeo(hits.getPolyhedronsIncludingMetaHits(), 1, false, selPreview);
  if (selGeos() == 1) {
   GeoNumeric slider =
     GeoNumeric.setSliderFromDefault(new GeoNumeric(kernel.getConstruction()), false);
   slider.setIntervalMin(0);
   slider.setIntervalMax(1);
   slider.setAutoStep(false);
   slider.setAnimationStep(0.01);
   slider.setValue(1);
   slider.setLabel(null);
   GeoElement polyhedron = getSelectedGeos()[0];
   return new GeoElement[] {
    kernel.getManager3D()
      .polyhedronNet(null, polyhedron, slider, null, null)[0] 
   };
  }
  return null;
 }
 protected final GeoElement[] orthogonalPlane(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  boolean hitPoint = addSelectedPoint(hits, 1, false, selPreview) != 0;
  if (!hitPoint) {
   if (selLines() == 0) {
    addSelectedVector(hits, 1, false, selPreview);
   }
   if (selVectors() == 0) {
    addSelectedLine(hits, 1, false, selPreview);
   }
  }
  if (selPoints() == 1) {
   if (selVectors() == 1) {
    GeoPointND[] points = getSelectedPointsND();
    GeoVectorND[] vectors = getSelectedVectorsND();
    GeoElement[] ret = {null};
    ret[0] =
      (GeoPlane3D) getKernel().getManager3D().orthogonalPlane3D(null, points[0], vectors[0]);
    return ret;
   } else if (selLines() == 1) {
    GeoPointND[] points = getSelectedPointsND();
    GeoLineND[] lines = getSelectedLinesND();
    GeoElement[] ret = {null};
    ret[0] =
      (GeoPlane3D) getKernel().getManager3D().orthogonalPlane3D(null, points[0], lines[0]);
    return ret;
   }
  }
  return null;
 }
 protected final GeoElement[] circleAxisPoint(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  if (addSelectedPoint(hits, 1, false, selPreview) == 0) { 
   addSelectedLine(hits, 1, false, selPreview);
  }
  if (selPoints() == 1 && selLines() == 1) {
   return new GeoElement[] {
    getKernel().getManager3D().circle3D(null, getSelectedLinesND()[0], getSelectedPointsND()[0])
   };
  }
  return null;
 }
 protected final boolean circlePointRadiusDirection(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return false;
  }
  if (addSelectedPoint(hits, 1, false, selPreview) == 0) {
   addSelectedDirection(hits, 1, false, selPreview);
  }
  if (selPoints() == 1 && selDirections() == 1) {
   app.getDialogManager()
     .showNumberInputDialogCirclePointDirectionRadius(
       app.getLocalization().getMenu(EuclidianConstants.getModeText(mode)),
       getSelectedPointsND()[0],
       getSelectedDirections()[0],
       this);
   return true;
  }
  return false;
 }
 protected TextDispatcher3D getTextDispatcher() {
  if (textDispatcher == null) {
   textDispatcher = new TextDispatcher3D(kernel, view3D);
  }
  return textDispatcher;
 }
 protected final boolean volume(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return false;
  }
  addSelectedGeo(hits.getFiniteVolumeIncludingMetaHits(), 1, false, selPreview);
  if (selGeos() == 1) {
   GeoElement hasVolume = getSelectedGeos()[0];
   getTextDispatcher().createVolumeText(hasVolume, mouseLoc);
   return true;
  }
  return false;
 }
 protected final GeoElementND[] planeContaining(Hits hits0, boolean selPreview) {
  Hits hits =
    hits0.keepFirsts(TestGeo.GEOPOINTND, TestGeo.GEOLINEND, TestGeo.GEOCOORDSYS2DNOTPLANE);
  if (hits.isEmpty()) {
   return null;
  }
  if (selPoints() == 0 && selLines() == 0) {
   addSelectedCS2D(hits, 1, false, selPreview);
  }
  if (selCS2D() == 1) {
   GeoCoordSys[] cs = getSelectedCS2D();
   return new GeoElementND[] {getKernel().getManager3D().plane3D(null, (GeoCoordSys2D) cs[0])};
  }
  addSelectedPoint(hits, 3, false, selPreview);
  if (selPoints() == 3) { 
   GeoPointND[] points = getSelectedPointsND();
   return new GeoElement[] {
    getKernel().getManager3D().plane3D(null, points[0], points[1], points[2])
   };
  } else if (selPoints() == 1) { 
   addSelectedLine(hits, 1, false, selPreview);
   if (selLines() == 1) {
    GeoPointND[] points = getSelectedPointsND();
    GeoLineND[] lines = getSelectedLinesND();
    return new GeoElementND[] {getKernel().getManager3D().plane3D(null, points[0], lines[0])};
   }
  } else if (selPoints() == 0) { 
   addSelectedLine(hits, 2, false, selPreview);
   if (selLines() == 2) {
    GeoLineND[] lines = getSelectedLinesND();
    return new GeoElement[] {getKernel().getManager3D().plane3D(null, lines[0], lines[1])};
   }
  }
  return null;
 }
 protected final boolean viewInFrontOf(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return false;
  }
  addSelectedGeo(hits.getTopHits(), 1, false, selPreview);
  if (selGeos() == 1) { 
   GeoElement geo = getSelectedGeos()[0];
   Coords vn = geo.getMainDirection();
   if (vn != null) {
    setRotAnimationForDirection(vn);
   }
  }
  return false;
 }
 private void setRotAnimationForDirection(Coords vn) {
  if (view3D.hasMouse()) {
   if (view3D.isXREnabled()) {
    view3D.setRotAnimationAR(view3D.getCursorNormal());
   } else {
    view3D.setRotAnimation(view3D.getCursorNormal());
   }
  } else { 
   view3D.setClosestRotAnimation(vn, true);
  }
 }
 protected final GeoElementND[] parallelPlane(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  boolean hitPoint = addSelectedPoint(hits, 1, false, selPreview) != 0;
  if (!hitPoint) {
   addSelectedCS2D(hits, 1, false, selPreview);
  }
  if (selPoints() == 1) {
   if (selCS2D() == 1) {
    GeoPointND[] points = getSelectedPointsND();
    GeoCoordSys[] cs = getSelectedCS2D(); 
    return new GeoElementND[] {
     getKernel().getManager3D().plane3D(null, points[0], (GeoCoordSys2D) cs[0])
    };
   }
  }
  return null;
 }
 public void setDialogOccurred() {
  dialogOccurred = true;
 }
 protected final GeoElement[] extrusionOrConify(Hits hits, boolean selPreview) {
  if (dialogOccurred) {
   dialogOccurred = false;
   return null;
  }
  if (!hits.isEmpty()) { 
   addExtrudableElements(hits, selPreview);
  }
  if (selNumberValues() == 1) {
   if (selPolygons() == 1) {
    GeoPolygon[] basis = getSelectedPolygons();
    GeoNumberValue[] height = getSelectedNumberValues();
    if (mode == EuclidianConstants.MODE_EXTRUSION) {
     return new GeoElement[] { 
      getKernel().getManager3D().prism(null, basis[0], height[0])[0]
     };
    }
    return new GeoElement[] { 
     getKernel().getManager3D().pyramid(null, basis[0], height[0])[0]
    };
   } else if (selConics() == 1) {
    GeoConicND[] basis = getSelectedConicsND();
    GeoNumberValue[] height = getSelectedNumberValues();
    if (mode == EuclidianConstants.MODE_EXTRUSION) {
     return new GeoElement[] { 
      getKernel().getManager3D().cylinderLimited(null, basis[0], height[0])[0]
     };
    }
    return new GeoElement[] { 
     getKernel().getManager3D().coneLimited(null, basis[0], height[0])[0]
    };
   }
  }
  return null;
 }
 private void addExtrudableElements(Hits hits, boolean selPreview) {
  int basisAdded = selPolygons() + selConics();
  if (basisAdded == 0) { 
   basisAdded += addSelectedPolygon(hits, 1, false, selPreview);
   if (basisAdded == 0) { 
    basisAdded += addSelectedConic(hits, 1, false, selPreview);
    if (basisAdded == 0) { 
     addSelectedNumberValue(hits, 1, false, selPreview);
    }
   }
  }
 }
 protected final GeoElement[] surfaceOfRevolution(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  addSelectedPath(hits, 1, false, selPreview);
  if (selPaths() == 1 && selNumberValues() == 1) {
   GeoNumberValue angle = getSelectedNumberValues()[0];
   GeoElement surface =
     getKernel().getManager3D().surfaceOfRevolution(getSelectedPaths()[0], angle, null);
   surface.setLabel(null);
   return surface.asArray();
  }
  return null;
 }
 protected boolean draggingOccurredBeforeRelease(boolean notAlreadyStarted) {
  if (notAlreadyStarted && lastGetNewPointWasExistingPoint && draggingOccurredBeforeRelease) {
   return true;
  }
  return super.draggingOccurredBeforeRelease(notAlreadyStarted);
 }
 protected final GeoElement[] pyramidOrPrism(Hits hits, boolean selPreview) {
  polygonForPyramidBasis = false;
  if (hits.isEmpty()) {
   return null;
  }
  if (draggingOccurredBeforeRelease(
    (pyramidBasis == null) && selPoints() == 0 && selPolygons() == 0)) {
   return null;
  }
  if (pyramidBasis == null) { 
   if (selPolygons() == 0) { 
    if (!selPreview
      && selPoints() > 2
      && hits.contains(getSelectedPointList().get(0))) {
     ((DrawPolyhedron3D) view3D.getPreviewDrawable()).previewBasisIsFinished();
     pyramidBasis = getSelectedPointsND();
     cancelSwitchPointMoveModeIfNeeded();
     return null;
    }
    if (addSelectedPoint(hits, GeoPolygon.POLYGON_MAX_POINTS, false, selPreview) != 0
      || (!selPreview
        && !getSelectedPointList().isEmpty()
        && hits.contains(getSelectedPointList().get(0)))) {
     return null; 
    }
   }
   boolean selectionOccurred = false;
   if (selPoints() < 2) { 
    if (addSelectedPolygon(hits, 1, false, selPreview) == 1) {
     polygonForPyramidBasis = true;
     selectionOccurred = true;
    }
   }
   if (!selectionOccurred) {
    addSelectedPoint(hits, 1, false, selPreview);
   }
   if (selPoints() == 1 && selPolygons() == 1) {
    GeoPolygon[] basis = getSelectedPolygons();
    GeoPointND[] points = getSelectedPointsND();
    view3D.disposePreview();
    if (mode == EuclidianConstants.MODE_PYRAMID) {
     return new GeoElement[] {getKernel().getManager3D().pyramid(null, basis[0], points[0])[0]
     };
    } else if (mode == EuclidianConstants.MODE_PRISM) {
     return new GeoElement[] {getKernel().getManager3D().prism(null, basis[0], points[0])[0]};
    }
   }
  } else { 
   addSelectedPoint(hits, 1, false, selPreview);
   if (selPoints() == 1) {
    GeoPointND[] points = new GeoPointND[pyramidBasis.length + 1];
    System.arraycopy(pyramidBasis, 0, points, 0, pyramidBasis.length);
    points[pyramidBasis.length] = getSelectedPointsND()[0];
    view3D.disposePreview();
    if (mode == EuclidianConstants.MODE_PYRAMID) {
     pyramidBasis = null;
     return new GeoElement[] {getKernel().getManager3D().pyramid(null, points)[0]};
    } else if (mode == EuclidianConstants.MODE_PRISM) {
     pyramidBasis = null;
     return new GeoElement[] {getKernel().getManager3D().prism(null, points)[0]};
    }
   }
   return null;
  }
  return null;
 }
 public void wrapMouseReleased(@NonNull AbstractEvent e) {
  boolean longDragOccurred = isDraggingOccurredBeyondThreshold();
  if (!longDragOccurred && !e.isControlDown()) {
   view3D.switchMoveCursor();
  }
  super.wrapMouseReleasedND(e, true);
  if (!longDragOccurred && mode == EuclidianConstants.MODE_MOVE) {
   showDynamicStylebar();
  }
  view3D.enlargeClippingWhenAREnabled();
 }
 protected void processReleaseForMovedGeoPoint(boolean rightClick) {
  ((EuclidianView3D) getView()).setPointDecorations(null);
  if (isModeForMovingPoint(mode)) {
   if (freePointJustCreated) {
    freePointJustCreated = false;
   } else {
    GeoPointND movedPoint = movedGeoPoint;
    if (movedPoint == null) {
     return;
    }
    movePointForRelease(movedPoint, rightClick);
   }
  }
  if (movedGeoPoint instanceof GeoPoint3D) {
   GeoPoint3D movedGeoPoint3D = (GeoPoint3D) movedGeoPoint;
   movedGeoPoint3D.setWillingCoordsUndefined();
   movedGeoPoint3D.setWillingDirectionUndefined();
  }
  super.processReleaseForMovedGeoPoint(rightClick);
 }
 private void movePointForRelease(GeoPointND movedPoint, boolean rightClick) {
  if (!isDraggingOccurredBeyondThreshold() && !rightClick && movedPoint.isIndependent()) {
   if (EuclidianConstants.isMoveOrSelectionMode(mode) && !movedPoint.isGeoElement3D()) {
    Construction cons = kernel.getConstruction();
    GeoPoint3D newGeo = (GeoPoint3D)
      kernel.getManager3D().point3D(movedPoint.getInhomX(), movedPoint.getInhomY(), 0, false);
    try {
     cons.replace(movedPoint.toGeoElement(), newGeo);
    } catch (Exception e) {
     Log.debug(e);
    } finally {
     String newLabel =
       newGeo.isLabelSet() ? newGeo.getLabelSimple() : movedPoint.getLabelSimple();
     GeoElement geo = kernel.lookupLabel(newLabel);
     setMovedGeoPoint((GeoPointND) geo);
     Hits3D hits = view3D.getHits3D();
     hits.init();
     hits.add(geo);
     app.getSelectionManager().clearSelectedGeos(false, false);
     app.getSelectionManager().addSelectedGeo(geo, true, true);
    }
   }
   if (mode == EuclidianConstants.MODE_MOVE || mode == EuclidianConstants.MODE_POINT) {
    switchPointMoveMode();
   } else {
    Hits hits = view3D.getHits();
    if (!hits.isEmpty() && hits.get(0) == movedPoint) {
     switchPointMoveMode();
    }
   }
   ((EuclidianView3D) getView()).getCursor3D().setMoveMode(movedPoint.getMoveMode());
   ((EuclidianView3D) getView()).setDefaultCursorWillBeHitCursor();
  }
 }
 protected void switchPointMoveMode() {
  if (pointMoveMode == GeoPointND.MOVE_MODE_XY) {
   pointMoveMode = GeoPointND.MOVE_MODE_Z;
  } else {
   pointMoveMode = GeoPointND.MOVE_MODE_XY;
  }
 }
 private void cancelSwitchPointMoveModeIfNeeded() {
  if (!draggingOccurredBeforeRelease && movedGeoPoint != null && movedGeoPoint.isIndependent()) {
   switchPointMoveMode();
  }
 }
 private void initPointMoveMode() {
  if (mode == EuclidianConstants.MODE_MOVE) {
   pointMoveMode = GeoPointND.MOVE_MODE_XY;
  } else {
   pointMoveMode = GeoPointND.MOVE_MODE_Z;
  }
 }
 public int getPointMoveMode() {
  return pointMoveMode;
 }
 public void updateInput3D() {
 }
 public void wrapMousePressed(AbstractEvent e) {
  mouseMoved = false;
  view3D.stopScreenTranslateAndScale();
  super.wrapMousePressed(e);
 }
 protected void dispatchMouseDownEvent(AbstractEvent event) {
  Map<String, Object> jsonArgument = createMouseDownEventArgument();
  Coords origin = new Coords(4);
  view3D.getHittingOrigin(event.getPoint(), origin);
  Coords direction = new Coords(4);
  view3D.getHittingDirection(direction);
  double zNear = view3D.getCompanion().getZNearest();
  jsonArgument.put("x", origin.getX() - zNear * direction.getX());
  jsonArgument.put("y", origin.getY() - zNear * direction.getY());
  jsonArgument.put("z", origin.getZ() - zNear * direction.getZ());
  app.dispatchEvent(new Event(EventType.MOUSE_DOWN).setJsonArgument(jsonArgument));
 }
 protected void processMouseMoved(@NonNull AbstractEvent e) {
  view3D.setHasMouse(true);
  setMouseMovedEvent(e);
  mouseMoved = true;
  view3D.repaintView();
 }
 protected void setMouseMovedEvent(AbstractEvent e) {
  mouseEvent = e;
 }
 public void update() {
  processMouseMoved();
 }
 protected void processMouseMoved() {
  if (mouseMoved && view3D.hasMouse()) {
   kernel.getConstruction().setIgnoringNewTypes(true);
   ((EuclidianView3D) getView()).updateCursor3D();
   super.processMouseMoved(mouseEvent);
   kernel.getConstruction().setIgnoringNewTypes(false);
   mouseMoved = false;
  }
 }
 protected Previewable switchPreviewableForInitNewMode(int previewMode) {
  switch (previewMode) {
   case EuclidianConstants.MODE_SPHERE_TWO_POINTS:
    return view3D.createPreviewSphere(getSelectedPointList());
   case EuclidianConstants.MODE_EXTRUSION:
    return view3D.createPreviewExtrusion(getSelectedPolygonList(), getSelectedConicNDList());
   case EuclidianConstants.MODE_SURFACE_OF_REVOLUTION:
    return view3D.createPreviewSurfaceOfRevolution(getSelectedPathList());
   case EuclidianConstants.MODE_CONIFY:
    return view3D.createPreviewConify(getSelectedPolygonList(), getSelectedConicNDList());
   case EuclidianConstants.MODE_PYRAMID:
   case EuclidianConstants.MODE_PRISM:
    return view3D.createPreviewPyramidOrPrism(
      getSelectedPointList(), getSelectedPolygonList(), previewMode);
   case EuclidianConstants.MODE_INTERSECTION_CURVE:
    return null;
   default:
    return super.switchPreviewableForInitNewMode(previewMode);
  }
 }
 protected boolean getSelectables(Hits hits, boolean selPreview) {
  Hits top = hits.getTopHits(1);
  super.getSelectables(top, selPreview);
  GeoPointND point = (GeoPointND) top.getFirstHit(TestGeo.GEOPOINTND);
  if (point != null) {
   view3D.updateCursor3D(hits);
  }
  return false;
 }
 public void processModeLock() {
 }
 protected void processRightPressFor3D(AbstractEvent event) {
  if (viewHasHitsForMouseDragged()) {
   processPressForRotate3D(event == null ? PointerEventType.MOUSE : event.getType());
   return;
  }
  temporaryMode = true;
  oldMode = mode; 
  getView().setMode(EuclidianConstants.MODE_ROTATEVIEW);
  switchModeForMousePressed(event);
 }
 protected void processPressForRotate3D(PointerEventType pointerEventType) {
  if (view3D.isRotAnimated()) {
   view3D.stopAnimation();
   viewRotationOccurred = true;
  }
  startLoc = mouseLoc;
  getView().rememberOrigins();
  ((EuclidianView3D) getView()).setDefaultCursor();
  rotationSpeedHandler.setStart(startLoc.x, pointerEventType);
 }
 protected boolean processRotate3DView() {
  int x = mouseLoc.x;
  rotationSpeedHandler.rotationOccurred(x);
  getView()
    .setCoordSystemFromMouseMove(
      mouseLoc.x - startLoc.x, mouseLoc.y - startLoc.y, MoveMode.ROTATE_VIEW);
  viewRotationOccurred = true;
  getView().repaintView();
  return true;
 }
 protected boolean allowSelectionRectangle() {
  return false;
 }
 protected boolean processReleaseForRotate3D(int x, PointerEventType type) {
  if (temporaryMode) {
   getView().setMode(oldMode, ModeSetter.EXIT_TEMPORARY_MODE);
   temporaryMode = false;
   if (!dontClearSelection) {
    clearSelections();
   }
   dontClearSelection = false;
  }
  if (viewRotationOccurred) {
   viewRotationOccurred = false;
   setViewHits(type);
   ((EuclidianView3D) getView()).updateCursor3D();
   getView().setCursor(EuclidianCursor.HIT);
   app.storeUndoInfo();
   setRotContinueAnimation(x);
   return true;
  }
  return false;
 }
 private void setRotContinueAnimation(int x) {
  rotationSpeedHandler.rotationOccurred(x);
  setRotContinueAnimation();
 }
 protected void setRotContinueAnimation() {
  ((EuclidianView3D) getView())
    .setRotContinueAnimation(
      rotationSpeedHandler.getLastDelay(), rotationSpeedHandler.getSpeed());
 }
 protected boolean switchModeForProcessMode(
   Hits hits,
   boolean isControlDown,
   boolean isShiftDown,
   AsyncOperation<Boolean> callback,
   boolean selectionPreview) {
  boolean changedKernel = false;
  GeoElementND[] ret = null;
  switch (mode) {
   case EuclidianConstants.MODE_INTERSECTION_CURVE:
    ret = intersectionCurve(hits, selectionPreview);
    if (ret != null) { 
     intersectionCurveList.remove(resultedIntersectionCurve);
     view3D.setPreview(null);
    }
    break;
   case EuclidianConstants.MODE_PLANE_THREE_POINTS:
    ret = threePoints(hits, mode, selectionPreview);
    break;
   case EuclidianConstants.MODE_PLANE:
    ret = planeContaining(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_ORTHOGONAL_PLANE:
    ret = orthogonalPlane(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_PARALLEL_PLANE:
    ret = parallelPlane(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_EXTRUSION:
   case EuclidianConstants.MODE_CONIFY:
    ret = extrusionOrConify(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_SURFACE_OF_REVOLUTION:
    ret = surfaceOfRevolution(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_TETRAHEDRON:
    ret = archimedeanSolid(hits, Commands.Tetrahedron, selectionPreview);
    break;
   case EuclidianConstants.MODE_CUBE:
    ret = archimedeanSolid(hits, Commands.Cube, selectionPreview);
    break;
   case EuclidianConstants.MODE_PYRAMID:
   case EuclidianConstants.MODE_PRISM:
    ret = pyramidOrPrism(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_SPHERE_TWO_POINTS:
    ret = circleOrSphere2(hits, mode, selectionPreview);
    break;
   case EuclidianConstants.MODE_SPHERE_POINT_RADIUS:
    changedKernel = spherePointRadius(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_CONE_TWO_POINTS_RADIUS:
    changedKernel = coneTwoPointsRadius(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_CYLINDER_TWO_POINTS_RADIUS:
    changedKernel = cylinderTwoPointsRadius(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_NET:
    ret = polyhedronNet(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_VIEW_IN_FRONT_OF:
    changedKernel = viewInFrontOf(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_CIRCLE_AXIS_POINT:
    ret = circleAxisPoint(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_CIRCLE_POINT_RADIUS_DIRECTION:
    changedKernel = circlePointRadiusDirection(hits, selectionPreview);
    break;
   case EuclidianConstants.MODE_MIRROR_AT_PLANE:
    ret = mirrorAtPlane(hits.getTopHits(), selectionPreview);
    break;
   case EuclidianConstants.MODE_ROTATE_AROUND_LINE:
    ret = rotateAroundLine(hits.getTopHits(), selectionPreview);
    break;
   case EuclidianConstants.MODE_VOLUME:
    changedKernel = volume(hits, selectionPreview);
    break;
   default:
    return super.switchModeForProcessMode(
      hits, isControlDown, isShiftDown, callback, selectionPreview);
  }
  return endOfSwitchModeForProcessMode(
    ret, changedKernel || (ret != null), callback, selectionPreview);
 }
 protected void switchModeForRemovePolygons(Hits hits) {
  switch (mode) {
   case EuclidianConstants.MODE_PARALLEL_PLANE:
    hits.removePolygonsIfNotOnlyCS2D();
    break;
   case EuclidianConstants.MODE_TETRAHEDRON:
   case EuclidianConstants.MODE_CUBE:
   case EuclidianConstants.MODE_PYRAMID:
   case EuclidianConstants.MODE_PRISM:
   case EuclidianConstants.MODE_AREA:
   case EuclidianConstants.MODE_VOLUME:
   case EuclidianConstants.MODE_EXTRUSION:
   case EuclidianConstants.MODE_NET:
   case EuclidianConstants.MODE_CONIFY:
    hits.removeAllPolygonsButOne();
    break;
   case EuclidianConstants.MODE_INTERSECTION_CURVE:
   case EuclidianConstants.MODE_INTERSECT:
    break;
   case EuclidianConstants.MODE_PLANE:
    break;
   case EuclidianConstants.MODE_REGULAR_POLYGON:
    break;
   default:
    super.switchModeForRemovePolygons(hits);
  }
 }
 protected GeoElement[] switchModeForThreePoints(int threePointsMode) {
  if (threePointsMode == EuclidianConstants.MODE_PLANE_THREE_POINTS) {
   GeoPointND[] points = getSelectedPointsND();
   GeoPlane3D ret0 =
     (GeoPlane3D) getKernel().getManager3D().plane3D(null, points[0], points[1], points[2]);
   return new GeoElement[] {ret0};
  }
  return super.switchModeForThreePoints(threePointsMode);
 }
 protected GeoElement[] switchModeForCircleOrSphere2(int sphereNDMode) {
  if (sphereNDMode == EuclidianConstants.MODE_SPHERE_TWO_POINTS) {
   GeoPointND[] points = getSelectedPointsND();
   GeoElement[] ret = {null};
   ret[0] = getKernel().getManager3D().sphere(null, points[0], points[1]);
   return ret;
  }
  return super.switchModeForCircleOrSphere2(sphereNDMode);
 }
 protected void createNewPointForModePoint(Hits hits, boolean complexPoint) {
  createNewPoint(hits, true, true, true, true, false);
 }
 protected GeoPointND createNewPointForModeOther(Hits hits) {
  return createNewPoint(hits, true, true, true, true, false);
 }
 protected void switchModeForMousePressed(AbstractEvent e) {
  Hits hits;
  PointerEventType type = e.getType();
  processPressForRotate3D(type);
  switch (mode) {
   case EuclidianConstants.MODE_PLANE_THREE_POINTS:
   case EuclidianConstants.MODE_SPHERE_TWO_POINTS:
   case EuclidianConstants.MODE_SPHERE_POINT_RADIUS:
   case EuclidianConstants.MODE_CONE_TWO_POINTS_RADIUS:
   case EuclidianConstants.MODE_CYLINDER_TWO_POINTS_RADIUS:
    setViewHits(type);
    hits = getView().getHits();
    hits.removePolygons();
    createNewPoint(hits, true, true, true, true, false);
    break;
   case EuclidianConstants.MODE_ORTHOGONAL_PLANE:
    setViewHits(type);
    hits = getView().getHits();
    hits.removePolygons();
    createNewPoint(hits, false, false, true);
    break;
   case EuclidianConstants.MODE_PLANE:
    setViewHits(type);
    break;
   case EuclidianConstants.MODE_PARALLEL_PLANE:
    setViewHits(type);
    hits = getView().getHits();
    hits.removePolygons();
    createNewPoint(hits, true, false, false, true, false);
    break;
   case EuclidianConstants.MODE_SURFACE_OF_REVOLUTION:
    setViewHits(type);
    hits = getView().getHits();
    surfaceOfRevolution(hits, false);
    view3D.updatePreviewable();
    break;
   case EuclidianConstants.MODE_EXTRUSION:
   case EuclidianConstants.MODE_CONIFY:
    setViewHits(type);
    hits = getView().getHits();
    hits.removeAllPlanes();
    switchModeForRemovePolygons(hits);
    extrusionOrConify(hits, false);
    view3D.updatePreviewable();
    break;
   case EuclidianConstants.MODE_TETRAHEDRON:
   case EuclidianConstants.MODE_CUBE:
    setViewHits(type);
    hits = getView().getHits();
    boolean createPointAnywhere = false;
    if (selCS2D() == 1) {
     createPointAnywhere = true;
    } else {
     if (view3D.getCursor3DType() == EuclidianView3D.PREVIEW_POINT_REGION) {
      Region region = view3D.getCursor3D().getRegion();
      createPointAnywhere =
        (selPoints() == 0 && (!(region instanceof GeoCoordSys2D) || region.isGeoPlane()))
          || !(region instanceof GeoCoordSys2D)
          || region == kernel.getXOYPlane();
     }
    }
    createNewPoint(hits, true, createPointAnywhere, true, true, false);
    break;
   case EuclidianConstants.MODE_PYRAMID:
   case EuclidianConstants.MODE_PRISM:
    setViewHits(type);
    hits = getView().getHits();
    if (selPolygons() == 1 || hits.getPolyCount() == 0) {
     createNewPoint(hits, true, true, true, true, false);
    } else {
     switchModeForRemovePolygons(hits);
     createNewPoint(hits, true, false, false, true, false);
    }
    break;
   case EuclidianConstants.MODE_ROTATEVIEW:
    moveMode = MoveMode.ROTATE_VIEW;
    break;
   case EuclidianConstants.MODE_CIRCLE_AXIS_POINT:
   case EuclidianConstants.MODE_CIRCLE_POINT_RADIUS_DIRECTION:
    setViewHits(type);
    hits = getView().getHits();
    hits.removePolygons();
    if (hits.size() == 0) {
     createNewPoint(hits, false, true, true);
    }
    break;
   case EuclidianConstants.MODE_INTERSECTION_CURVE:
    break;
   case EuclidianConstants.MODE_VOLUME:
    setViewHits(type);
    break;
   case EuclidianConstants.MODE_NET:
    setViewHits(type);
    break;
   case EuclidianConstants.MODE_REGULAR_POLYGON:
    setViewHits(type);
    hits = getView().getHits();
    if (selCS2D() == 1
      || selPoints() == 0
      || (view3D.getCursor3DType() == EuclidianView3D.PREVIEW_POINT_REGION
        && view3D.getCursor3D().getRegion() == kernel.getXOYPlane())
      || (view3D.getCursor3DType() == EuclidianView3D.PREVIEW_POINT_PATH)) {
     createNewPoint(hits, true, true, true, true, false);
    }
    break;
   default:
    super.switchModeForMousePressedND(e);
  }
 }
 protected boolean switchModeForMouseReleased(
   int releaseMode,
   Hits hits,
   boolean changedKernel,
   boolean multipleSelect,
   PointerEventType type,
   boolean runScripts) {
  switch (releaseMode) {
   case EuclidianConstants.MODE_PARALLEL_PLANE:
    return true;
   case EuclidianConstants.MODE_SURFACE_OF_REVOLUTION:
    ((DrawSurfaceOfRevolution) view3D.getPreviewDrawable()).createAngle();
    return true;
   case EuclidianConstants.MODE_EXTRUSION:
    ((DrawExtrusionOrConify3D) view3D.getPreviewDrawable()).createPolyhedron();
    return true;
   case EuclidianConstants.MODE_CONIFY:
    ((DrawExtrusionOrConify3D) view3D.getPreviewDrawable()).createPolyhedron();
    return true;
   case EuclidianConstants.MODE_PYRAMID:
   case EuclidianConstants.MODE_PRISM:
    return changedKernel;
   case EuclidianConstants.MODE_MIRROR_AT_PLANE:
   case EuclidianConstants.MODE_ROTATE_AROUND_LINE:
    return true;
   case EuclidianConstants.MODE_VIEW_IN_FRONT_OF:
    return true;
   default:
    return super.switchModeForMouseReleased(
      releaseMode, hits, changedKernel, multipleSelect, type, runScripts);
  }
 }
 protected Hits addPointCreatedForMouseReleased(Hits hits) {
  hits.add((GeoElement) pointCreated);
  return hits;
 }
 public void showDrawingPadPopup(GPoint mouseLoc1) {
  app.getGuiManager().showDrawingPadPopup3D(getView(), mouseLoc1);
 }
 protected GeoElementND[] intersect(Hits hits0, boolean selPreview) {
  Hits hits = hits0;
  if (hits.isEmpty()) {
   return null;
  }
  if (hits.containsGeoPoint()) {
   hits.clear();
   return null;
  }
  hits.removeHasSegmentsIfSidePresent();
  if (goodHits == null) {
   goodHits = new Hits3D();
  } else {
   goodHits.clear();
  }
  GeoPointND singlePoint;
  if (selGeos() == 0) {
   if (view3D.getCursor3DType() == EuclidianView3D.PREVIEW_POINT_DEPENDENT) {
    singlePoint = singleIntersectionPoint;
   } else {
    singlePoint = getSingleIntersectionPoint(hits);
   }
   if (singlePoint != null) {
    hits.clear();
    hits.add(singlePoint.getParentAlgorithm().getInput()[0]);
    hits.add(singlePoint.getParentAlgorithm().getInput()[1]);
   } else {
    hits.getHits(
      new TestGeo[] {TestGeo.GEOLINEND, TestGeo.GEOCOORDSYS2D, TestGeo.GEOQUADRICND},
      false,
      goodHits);
    hits = hits.getHits(1);
   }
  } else if (selGeos() == 1) {
   if (selCS2D() == 1 || selQuadric() == 1) {
    hits.getHits(new TestGeo[] {TestGeo.GEOCOORDSYS2D, TestGeo.GEOQUADRIC3D}, true, goodHits);
   } else {
    hits.getHits(
      new TestGeo[] {
       TestGeo.GEOLINEND,
       TestGeo.GEOCOORDSYS2D,
       TestGeo.GEOQUADRICND,
       TestGeo.GEOIMPLICITSURFACE
      },
      false,
      goodHits);
   }
   GeoElement selected = getSelectedGeoList().get(0);
   if (selected.isGeoLine()) {
    while (goodHits.size() >= 1) {
     if (goodHits.get(0).isGeoPlane()
       && AlgoIntersectCS1D2D.getConfigLinePlane(
           (GeoLineND) selected, (GeoCoordSys2D) goodHits.get(0))
         == ConfigLinePlane.CONTAINED) {
      goodHits.remove(0);
     } else {
      break;
     }
    }
   } else if (selected.isGeoConic()) {
    while (goodHits.size() >= 1) {
     if (goodHits.get(0).isGeoPlane()
       && AlgoIntersectPlanes.isIntersectionContained(
         ((GeoConicND) selected).getCoordSys(),
         ((GeoCoordSys2D) goodHits.get(0)).getCoordSys())) {
      goodHits.remove(0);
     } else {
      break;
     }
    }
   } else if (selected.isGeoPolygon()) {
    while (goodHits.size() >= 1) {
     if (goodHits.get(0) instanceof GeoCoordSys2D
       && AlgoIntersectPlanes.isIntersectionContained(
         ((GeoPolygon) selected).getCoordSys(),
         ((GeoCoordSys2D) goodHits.get(0)).getCoordSys())) {
      goodHits.remove(0);
     } else {
      break;
     }
    }
   }
   if (goodHits.size() == 0) {
    return null;
   }
   hits.clear();
   hits.add(selected);
   hits.add(goodHits.get(0));
  }
  addSelectedLine(hits, 10, true, selPreview);
  addSelectedConic(hits, 10, true, selPreview);
  addSelectedPlane(hits, 1, true, selPreview);
  addSelectedPolygon(hits, 1, true, selPreview);
  addSelectedQuadric(hits, 1, true, selPreview);
  addSelectedImplicitSurface(hits, 1, true, selPreview);
  if (selLines() >= 2) { 
   GeoLineND[] lines = getSelectedLinesND();
   GeoPointND point = getAlgoDispatcher().intersectLines(null, lines[0], lines[1]);
   checkCoordCartesian3D(point);
   return new GeoElementND[] {point};
  } else if (selLines() == 1) {
   if (selConics() >= 1) { 
    GeoLineND line = getSelectedLinesND()[0];
    GeoConicND conic = getSelectedConicsND()[0];
    GeoPointND[] points = getAlgoDispatcher().intersectLineConic(null, line, conic);
    return new GeoElementND[] {points[0], points[1]};
   } else if (selQuadric() == 1) { 
    GeoLineND line = getSelectedLinesND()[0];
    GeoQuadricND quadric = getSelectedQuadric()[0];
    GeoPointND[] points = getKernel().getManager3D().intersectLineQuadric(null, line, quadric);
    return new GeoElementND[] {points[0], points[1]};
   } else if (selPolygons() == 1) { 
    return getKernel()
      .getManager3D()
      .intersectionPoint(
        new String[] {null}, getSelectedLinesND()[0], getSelectedPolygons()[0]);
   } else if (selPlanes() == 1) { 
    GeoElement[] ret = new GeoElement[1];
    ret[0] = getKernel()
      .getManager3D()
      .intersect(null, getSelectedLinesND()[0], getSelectedPlanes()[0], false);
    return ret;
   } else if (selImplicitSurfaces() == 1) { 
    return getKernel()
      .getAlgoDispatcher()
      .intersectImplicitSurfaceLine(
        null, getSelectedImplicitSurface()[0], getSelectedLinesND()[0]);
   }
  } else if (selConics() >= 2) { 
   GeoConicND[] conics = getSelectedConicsND();
   GeoElementND[] ret = new GeoElement[4];
   GeoPointND[] points =
     getKernel().getAlgoDispatcher().intersectConics(null, conics[0], conics[1]);
   for (int i = 0; i < points.length; i++) {
    checkCoordCartesian3D(points[i]);
    ret[i] = points[i];
   }
   return ret;
  } else if (selConics() >= 1 && selPlanes() == 1) {
   GeoPlaneND plane = getSelectedPlanes()[0];
   GeoConicND conic = getSelectedConicsND()[0];
   GeoPointND[] points = getKernel().getManager3D().intersectPlaneConic(null, plane, conic);
   return new GeoElementND[] {points[0], points[1]};
  } else if (selConics() >= 1 && selQuadric() == 1) {
   GeoQuadricND quadric = getSelectedQuadric()[0];
   GeoConicND conic = getSelectedConicsND()[0];
   GeoPointND[] points = getKernel().getManager3D().intersectConics(null, conic, quadric);
   return new GeoElementND[] {points[0], points[1]};
  } else if (selPolygons() == 1 && selPlanes() == 1) { 
   return getKernel()
     .getManager3D()
     .intersectionPoint(null, getSelectedPlanes()[0], getSelectedPolygons()[0]);
  }
  return null;
 }
 private static void checkCoordCartesian3D(GeoPointND point) {
  if (point.getToStringMode() != Kernel.COORD_CARTESIAN_3D) {
   point.setCartesian3D();
   point.updateRepaint();
  }
 }
 public ArrayList<IntersectionCurve> getIntersectionCurves() {
  return intersectionCurveList;
 }
 protected boolean mouseMovedForIntersectionCurve() {
  return mouseMoved;
 }
 protected GeoElement[] intersectionCurve(Hits hits, boolean selPreview) {
  if (hits == null) {
   resultedGeo = null;
   return null;
  }
  if (hits.isEmpty()) {
   resultedGeo = null;
   return null;
  }
  if (mouseMovedForIntersectionCurve() && view3D.hasMouse2D()) {
   for (int i = 0; i < hits.size(); ++i) {
    for (int j = i + 1; j < hits.size(); ++j) {
     this.createIntersectionCurve(hits.get(i), hits.get(j));
    }
   }
   view3D.getRenderer().pickIntersectionCurves();
   decideIntersection(hits);
  }
  if (goodHits != null) {
   addSelectedPolygon(goodHits, 1, false, selPreview);
   addSelectedPlane(goodHits, 2, true, selPreview);
   addSelectedQuadric(goodHits, 2, true, selPreview);
   addSelectedPolyhedron(goodHits, 1, false, selPreview);
   addSelectedQuadricLimited(goodHits, 1, false, selPreview);
  } else {
   Hits firstSurface = hits.getFirstSurfaceBefore(getSelectedGeoList());
   addSelectedPolygon(firstSurface, 1, false, selPreview);
   addSelectedPlane(firstSurface, 2, false, selPreview);
   addSelectedQuadric(firstSurface, 2, false, selPreview);
   addSelectedPolyhedron(firstSurface, 1, false, selPreview);
   addSelectedQuadricLimited(firstSurface, 1, false, selPreview);
   addSelectedFunction2Var(firstSurface, 1, false, selPreview);
   addSelectedImplicitSurface(firstSurface, 1, false, selPreview);
  }
  if (selPlanes() == 1) {
   if (selQuadric() >= 1) { 
    GeoPlaneND plane = getSelectedPlanes()[0];
    GeoQuadricND quad = getSelectedQuadric()[0];
    GeoElement[] ret = {kernel.getManager3D().intersect(null, plane, quad)};
    if (firstElementDefined(ret)) {
     return ret;
    }
    return null;
   } else if (selPolyhedron() == 1) { 
    GeoElement[] ret = getKernel()
      .getManager3D()
      .intersectRegion(
        new String[] {null},
        getSelectedPlanes()[0],
        getSelectedPolyhedron()[0].toGeoElement(),
        null);
    if (firstElementDefined(ret)) {
     return ret;
    }
    return null;
   } else if (selQuadricLimited() == 1) { 
    GeoElement[] ret = new GeoElement[1];
    ret[0] = kernel
      .getManager3D()
      .intersectQuadricLimited(
        null, getSelectedPlanes()[0], (GeoQuadricND) getSelectedQuadricLimited()[0]);
    if (firstElementDefined(ret)) {
     kernel.getManager3D().corner(null, (GeoConicSection) ret[0]);
     return ret;
    }
    return null;
   } else if (selPolygons() == 1) { 
    GeoPlaneND plane = getSelectedPlanes()[0];
    GeoPolygon poly = getSelectedPolygons()[0];
    GeoElement[] ret =
      getKernel().getManager3D().intersectPath(new String[] {null}, plane, poly);
    if (firstElementDefined(ret)) {
     getKernel().getManager3D().intersectionPoint(new String[] {null}, plane, poly);
     return ret;
    }
    return null;
   } else if (selFunctionsNVar() == 1) { 
    GeoPlaneND plane = getSelectedPlanes()[0];
    GeoFunctionNVar funNVar = getSelectedFunctionsNVar()[0];
    return getKernel().getManager3D().intersectPlaneFunctionNVar(null, plane, funNVar);
   } else if (selImplicitSurfaces() == 1) { 
    Log.debug(selImplicitSurfaces() + "," + selPlanes());
    GeoPlaneND plane = getSelectedPlanes()[0];
    GeoImplicitSurfaceND surface = getSelectedImplicitSurface()[0];
    GeoElement[] ret = getKernel().getManager3D().intersectPlaneImplicitSurface(plane, surface);
    ret[0].setLabel(null);
    return ret;
   }
  } else if (selQuadric() >= 2) {
   GeoQuadricND[] quads = getSelectedQuadric();
   GeoElement[] ret = kernel.getManager3D().intersectAsCircle(null, quads[0], quads[1]);
   if (firstElementDefined(ret)) {
    return ret;
   }
   return null;
  } else if (selPlanes() >= 2) { 
   GeoPlaneND[] planes = getSelectedPlanes();
   return new GeoElement[] {kernel.getManager3D().intersectPlanes(null, planes[0], planes[1])};
  }
  return null;
 }
 private boolean firstElementDefined(GeoElement[] ret) {
  return ret != null && ret.length > 0 && ret[0].isDefined();
 }
 public boolean createIntersectionCurve(GeoElement A, GeoElement B) {
  boolean intersectable = false;
  for (IntersectionCurve intersection : intersectionCurveList) {
   if (intersection.geo1 == getMetaIfJustOne(A) && intersection.geo2 == getMetaIfJustOne(B)
     || intersection.geo1 == getMetaIfJustOne(B) && intersection.geo2 == getMetaIfJustOne(A)) {
    intersection.drawable.setWaitForUpdate();
    return true;
   }
  }
  if (A.isGeoPlane() && B.isGeoPlane()) {
   GeoElement[] ret = new GeoElement[1];
   boolean oldSilentMode = getKernel().isSilentMode();
   getKernel().setSilentMode(true);
   ret[0] = getKernel().getManager3D().intersectPlanes((GeoPlaneND) A, (GeoPlaneND) B);
   getKernel().setSilentMode(oldSilentMode);
   Drawable3D d = new DrawLine3D(view3D, (GeoLineND) ret[0]);
   processIntersectionCurve(A, B, ret[0], d);
   intersectable = true;
  } else if (A.isGeoPlane() && B.isGeoPolygon()) {
   createIntersectionCurvePlanePolygon(A, (GeoPolygon) B);
  } else if (B.isGeoPlane() && A.isGeoPolygon()) {
   createIntersectionCurvePlanePolygon(B, (GeoPolygon) A);
  } else if (A.isGeoPlane() && B.isGeoPolyhedron()) {
   createIntersectionCurvePlanePolyhedron(A, (GeoPolyhedron) B);
  } else if (B.isGeoPlane() && A.isGeoPolyhedron()) {
   createIntersectionCurvePlanePolyhedron(B, (GeoPolyhedron) A);
  } else if (A.isGeoPlane() && B instanceof GeoQuadric3D) {
   intersectable = createIntersectionCurvePlaneQuadric(A, B);
  } else if (B.isGeoPlane() && A instanceof GeoQuadric3D) {
   intersectable = createIntersectionCurvePlaneQuadric(B, A);
  } else if (A.isGeoPlane() && B instanceof GeoQuadric3DLimited) {
   intersectable = createIntersectionCurvePlaneQuadricLimited(A, B);
  } else if (B.isGeoPlane() && A instanceof GeoQuadric3DLimited) {
   intersectable = createIntersectionCurvePlaneQuadricLimited(B, A);
  } else if (A instanceof GeoQuadricND && B instanceof GeoQuadricND) {
   boolean oldSilentMode = getKernel().isSilentMode();
   getKernel().setSilentMode(true); 
   GeoElement ret =
     kernel.getManager3D().intersectAsCircle((GeoQuadricND) A, (GeoQuadricND) B)[0];
   Drawable3D d = new DrawConic3D(view3D, (GeoConic3D) ret);
   getKernel().setSilentMode(oldSilentMode);
   processIntersectionCurve(A, B, ret, d);
   intersectable = true;
  }
  return intersectable;
 }
 private boolean createIntersectionCurvePlanePolygon(GeoElement A, GeoPolygon B) {
  if (B.getMetasLength() == 1) {
   GeoElement polyhedron = B.getMetas()[0];
   if (!polyhedron.isGeoPolyhedron()) { 
    return false;
   }
   createIntersectionCurvePlanePolyhedron(A, (GeoPolyhedron) polyhedron);
   return true;
  }
  boolean oldSilentMode = getKernel().isSilentMode();
  getKernel().setSilentMode(true);
  GeoElement[] ret = kernel.getManager3D().intersectPath((GeoPlaneND) A, B);
  DrawIntersectionCurve3D drawSegments = new DrawIntersectionCurve3D(view3D, ret[0]);
  for (GeoElement geo : ret) {
   DrawSegment3D d = new DrawSegment3D(view3D, (GeoSegmentND) geo);
   drawSegments.add(d);
   processIntersectionCurve(A, B, geo, drawSegments, d);
  }
  getKernel().setSilentMode(oldSilentMode);
  return true;
 }
 private void createIntersectionCurvePlanePolyhedron(GeoElement A, GeoPolyhedron polyhedron) {
  boolean oldSilentMode = getKernel().isSilentMode();
  getKernel().setSilentMode(true);
  GeoElement[] ret = kernel.getManager3D().intersectRegion((GeoPlaneND) A, polyhedron);
  boolean goAhead = true;
  DrawIntersectionCurve3D drawPolygons = new DrawIntersectionCurve3D(view3D, ret[0]);
  for (int i = 0; i < ret.length && goAhead; i++) {
   GeoElement geo = ret[i];
   if (geo instanceof GeoPolygon3D) {
    DrawPolygon3D d = new DrawPolygon3D(view3D, (GeoPolygon3D) geo);
    drawPolygons.add(d);
    processIntersectionCurve(A, polyhedron, geo, drawPolygons, d);
   } else {
    goAhead = false;
   }
  }
  getKernel().setSilentMode(oldSilentMode);
 }
 private boolean createIntersectionCurvePlaneQuadric(GeoElement A, GeoElement B) {
  boolean oldSilentMode = getKernel().isSilentMode();
  getKernel().setSilentMode(true);
  GeoElement ret;
  Drawable3D d;
  GeoQuadricND quad;
  if (B instanceof GeoQuadric3DPart) {
   quad = (GeoQuadric3DLimited) ((GeoQuadric3DPart) B).getMetas()[0];
   if (quad != null) {
    ret = kernel.getManager3D().intersectQuadricLimited((GeoPlaneND) A, quad);
    d = new DrawConicSection3D(view3D, (GeoConicSection) ret);
   } else {
    quad = (GeoQuadricND) B;
    ret = kernel.getManager3D().intersect((GeoPlaneND) A, quad);
    d = new DrawConic3D(view3D, (GeoConicND) ret);
   }
  } else {
   quad = (GeoQuadric3D) B;
   ret = kernel.getManager3D().intersect((GeoPlaneND) A, quad);
   d = new DrawConic3D(view3D, (GeoConicND) ret);
  }
  getKernel().setSilentMode(oldSilentMode);
  processIntersectionCurve(A, quad, ret, d);
  return true;
 }
 private boolean createIntersectionCurvePlaneQuadricLimited(GeoElement A, GeoElement B) {
  boolean oldSilentMode = getKernel().isSilentMode();
  getKernel().setSilentMode(true);
  GeoElement ret =
    kernel.getManager3D().intersectQuadricLimited((GeoPlaneND) A, (GeoQuadric3DLimited) B);
  Drawable3D d = new DrawConicSection3D(view3D, (GeoConicSection) ret);
  getKernel().setSilentMode(oldSilentMode);
  processIntersectionCurve(A, B, ret, d);
  return true;
 }
 private void processIntersectionCurve(
   GeoElement A, GeoElement B, GeoElement intersection, Drawable3D d) {
  intersection.setLineThickness(3);
  intersection.setIsPickable(false);
  GeoElement defIntersectionCurve = null;
  ConstructionDefaults consDef = getKernel().getConstruction().getConstructionDefaults();
  if (consDef != null) {
   defIntersectionCurve =
     consDef.getDefaultGeo(ConstructionDefaults3D.DEFAULT_INTERSECTION_CURVE);
  }
  if (defIntersectionCurve != null) {
   intersection.setObjColor(defIntersectionCurve.getObjectColor());
  } else {
   intersection.setObjColor(ConstructionDefaults.colPolygonG);
  }
  intersectionCurveList.add(new IntersectionCurve(A, B, d));
 }
 private void processIntersectionCurve(
   GeoElement A, GeoElement B, GeoElement intersection, Drawable3D d, Drawable3D child) {
  processIntersectionCurve(A, B, intersection, d);
  child.updateColors();
 }
 private static GeoElement getMetaIfJustOne(GeoElement geo) {
  if (geo instanceof FromMeta) {
   if (geo.getMetasLength() == 1) {
    return ((FromMeta) geo).getMetas()[0];
   }
  }
  return geo;
 }
 private void decideIntersection(Hits hits) {
  resultedGeo = null;
  double zNear = Double.NEGATIVE_INFINITY;
  for (IntersectionCurve intersectionCurve : intersectionCurveList) {
   Drawable3D d = intersectionCurve.drawable;
   if (d.getZPickNear() > zNear) {
    resultedGeo = d.getGeoElement();
    resultedIntersectionCurve = intersectionCurve;
    zNear = d.getZPickNear();
   }
   d.setIntersectionCurveVisibility(false);
  }
  if (resultedGeo == null) {
   view3D.setPreview(null);
   goodHits = null;
   return;
  }
  int i = 0;
  boolean checking = true;
  while (checking && i < hits.size()) {
   GeoElement geo = hits.get(i);
   Drawable3D d = (Drawable3D) view3D.getDrawableND(geo);
   if (d != null) {
    if (d.getZPickNear() < zNear) {
     checking = false;
    } else if (d.getZPickNear() > zNear + 1
      && (!geo.isRegion() || geo.getAlphaValue() > MAX_TRANSPARENT_ALPHA_VALUE)) {
     checking = false;
     resultedGeo = null;
    }
   }
   i++;
  }
  if (resultedGeo == null) {
   view3D.setPreview(null);
   return;
  }
  if (hits.size() == 0) {
   view3D.setPreview(null);
   return;
  }
  if (goodHits == null) {
   goodHits = new Hits3D();
  } else {
   goodHits.clear();
  }
  if (hits.size() < 2 
    || (!(getMetaIfJustOne(hits.get(0)) == resultedIntersectionCurve.geo1
        && getMetaIfJustOne(hits.get(1)) == resultedIntersectionCurve.geo2)
      && !(getMetaIfJustOne(hits.get(0)) == resultedIntersectionCurve.geo2
        && getMetaIfJustOne(hits.get(1)) == resultedIntersectionCurve.geo1))) {
   addToGoodHits(hits.get(0));
   view3D.setPreview(null);
   return;
  }
  addToGoodHits(hits.get(0));
  addToGoodHits(hits.get(1));
  resultedIntersectionCurve.drawable.setIntersectionCurveVisibility(true);
  view3D.setPreview((Previewable) resultedIntersectionCurve.drawable);
 }
 private void addToGoodHits(GeoElement geo) {
  goodHits.add(getMetaIfJustOne(geo));
 }
 public void transformCoords() {
 }
 protected final int addSelectedCS2D(
   Hits hits, int max, boolean addMoreThanOneAllowed, boolean selPreview) {
  return handleAddSelected(
    hits,
    max,
    addMoreThanOneAllowed,
    selection.getSelectedCS2DList(),
    TestGeo.GEOCOORDSYS2D,
    selPreview);
 }
 final int selCS2D() {
  return selection.getSelectedCS2DList().size();
 }
 protected final GeoCoordSys[] getSelectedCS2D() {
  GeoCoordSys[] selected = selection.getSelectedCS2DList().toArray(new GeoCoordSys[0]);
  clearSelection(selection.getSelectedCS2DList());
  return selected;
 }
 protected final int addSelectedPlane(
   Hits hits, int max, boolean addMoreThanOneAllowed, boolean selPreview) {
  return handleAddSelected(
    hits,
    max,
    addMoreThanOneAllowed,
    selection.getSelectedPlaneList(),
    TestGeo.GEOPLANEND,
    selPreview);
 }
 final int selPlanes() {
  return selection.getSelectedPlaneList().size();
 }
 final int selImplicitSurfaces() {
  return getSelectedImplicitSurfaceList().size();
 }
 public final int addSelectedNumberValue(
   Hits hits, int max, boolean addMoreThanOneAllowed, boolean selPreview) {
  return handleAddSelected(
    hits,
    max,
    addMoreThanOneAllowed,
    getSelectedNumberValueList(),
    TestGeo.NUMBERVALUE,
    selPreview);
 }
 final GeoNumberValue[] getSelectedNumberValues() {
  GeoNumberValue[] selected = getSelectedNumberValueList().toArray(new GeoNumberValue[0]);
  clearSelection(getSelectedNumberValueList());
  return selected;
 }
 protected ArrayList<GeoNumberValue> getSelectedNumberValueList() {
  return selection.getSelectedNumberValueList();
 }
 protected final int selNumberValues() {
  return getSelectedNumberValueList().size();
 }
 protected final int addSelectedImplicitSurface(
   Hits hits, int max, boolean addMoreThanOneAllowed, boolean selPreview) {
  return handleAddSelected(
    hits,
    max,
    addMoreThanOneAllowed,
    getSelectedImplicitSurfaceList(),
    TestGeo.GEOIMPLICITSURFACE,
    selPreview);
 }
 protected final GeoImplicitSurfaceND[] getSelectedImplicitSurface() {
  GeoImplicitSurfaceND[] selected =
    getSelectedImplicitSurfaceList().toArray(new GeoImplicitSurfaceND[0]);
  clearSelection(getSelectedImplicitSurfaceList());
  return selected;
 }
 protected ArrayList<GeoImplicitSurfaceND> getSelectedImplicitSurfaceList() {
  return selection.getSelectedImplicitSurfaceList();
 }
 protected final GeoPlaneND[] getSelectedPlanes() {
  GeoPlaneND[] selected = selection.getSelectedPlaneList().toArray(new GeoPlaneND[0]);
  clearSelection(selection.getSelectedPlaneList());
  return selected;
 }
 final int selQuadric() {
  return selection.getSelectedQuadricList().size();
 }
 protected final int addSelectedQuadric(
   Hits hits, int max, boolean addMoreThanOneAllowed, boolean selPreview) {
  return handleAddSelected(
    hits,
    max,
    addMoreThanOneAllowed,
    selection.getSelectedQuadricList(),
    TestGeo.GEOQUADRIC3D,
    selPreview);
 }
 protected final GeoQuadricND[] getSelectedQuadric() {
  GeoQuadricND[] selected = selection.getSelectedQuadricList().toArray(new GeoQuadricND[0]);
  clearSelection(selection.getSelectedQuadricList());
  return selected;
 }
 final int selQuadricLimited() {
  return selection.getSelectedQuadricLimitedList().size();
 }
 protected final int addSelectedQuadricLimited(
   Hits hits, int max, boolean addMoreThanOneAllowed, boolean selPreview) {
  return handleAddSelected(
    hits,
    max,
    addMoreThanOneAllowed,
    selection.getSelectedQuadricLimitedList(),
    TestGeo.GEOQUADRIC3DLIMITED,
    selPreview);
 }
 protected final GeoQuadric3DLimitedInterface[] getSelectedQuadricLimited() {
  GeoQuadric3DLimitedInterface[] selected =
    selection.getSelectedQuadricLimitedList().toArray(new GeoQuadric3DLimitedInterface[0]);
  clearSelection(selection.getSelectedQuadricLimitedList());
  return selected;
 }
 final int selPolyhedron() {
  return selection.getSelectedPolyhedronList().size();
 }
 protected final int addSelectedPolyhedron(
   Hits hits, int max, boolean addMoreThanOneAllowed, boolean selPreview) {
  return handleAddSelected(
    hits,
    max,
    addMoreThanOneAllowed,
    selection.getSelectedPolyhedronList(),
    TestGeo.GEOPOLYHEDRON,
    selPreview);
 }
 protected final GeoPolyhedronInterface[] getSelectedPolyhedron() {
  GeoPolyhedronInterface[] selected =
    selection.getSelectedPolyhedronList().toArray(new GeoPolyhedronInterface[0]);
  clearSelection(selection.getSelectedPolyhedronList());
  return selected;
 }
 protected GeoElement chooseGeo(ArrayList<GeoElement> geos, boolean includeFixed) {
  return chooseGeo(geos, includeFixed, false);
 }
 protected GeoElement chooseGeo(
   ArrayList<GeoElement> geos, boolean includeFixed, boolean includeConstants) {
  if (!geos.isEmpty()) {
   if (!includeConstants && view3D.owns(geos.get(0))) {
    return null;
   }
   GeoElement geo = geos.get(0);
   if (!includeFixed && geo.isLocked()) {
    return null;
   }
   return geo;
  }
  return null;
 }
 private static boolean isModeForMovingPoint(int mode) {
  switch (mode) {
   case EuclidianConstants.MODE_MOVE:
   case EuclidianConstants.MODE_SELECT:
   case EuclidianConstants.MODE_ATTACH_DETACH:
    return true;
   default:
    return isModeForCreatingPoint(mode);
  }
 }
 private static boolean isModeForCreatingPoint(int mode) {
  switch (mode) {
   case EuclidianConstants.MODE_POINT:
   case EuclidianConstants.MODE_POINT_ON_OBJECT:
   case EuclidianConstants.MODE_JOIN:
   case EuclidianConstants.MODE_SEGMENT:
   case EuclidianConstants.MODE_RAY:
   case EuclidianConstants.MODE_VECTOR:
   case EuclidianConstants.MODE_POLYGON:
   case EuclidianConstants.MODE_POLYLINE:
   case EuclidianConstants.MODE_CIRCLE_THREE_POINTS:
   case EuclidianConstants.MODE_CIRCLE_ARC_THREE_POINTS:
   case EuclidianConstants.MODE_PLANE_THREE_POINTS:
   case EuclidianConstants.MODE_SPHERE_TWO_POINTS:
   case EuclidianConstants.MODE_SPHERE_POINT_RADIUS:
   case EuclidianConstants.MODE_CONE_TWO_POINTS_RADIUS:
   case EuclidianConstants.MODE_CYLINDER_TWO_POINTS_RADIUS:
   case EuclidianConstants.MODE_PYRAMID:
   case EuclidianConstants.MODE_PRISM:
    return true;
   default:
    return false;
  }
 }
 public boolean cursor3DVisibleForCurrentMode(int cursorType) {
  if (cursorType == EuclidianView3D.PREVIEW_POINT_ALREADY) {
   switch (mode) {
    case EuclidianConstants.MODE_MOVE:
    case EuclidianConstants.MODE_SELECT:
    case EuclidianConstants.MODE_POINT:
     return true;
    default:
     if (isModeForMovingPoint(mode)) {
      if (movedGeoPoint == null) {
       return false;
      }
      Hits hits = view3D.getHits();
      return !hits.isEmpty() && hits.get(0) == movedGeoPoint;
     }
     return false;
   }
  } else if (cursorType == EuclidianView3D.PREVIEW_POINT_DEPENDENT) {
   switch (mode) {
    case EuclidianConstants.MODE_POINT:
    case EuclidianConstants.MODE_INTERSECT:
    case EuclidianConstants.MODE_JOIN:
    case EuclidianConstants.MODE_SEGMENT:
    case EuclidianConstants.MODE_SEGMENT_FIXED:
    case EuclidianConstants.MODE_RAY:
    case EuclidianConstants.MODE_VECTOR:
    case EuclidianConstants.MODE_POLYGON:
    case EuclidianConstants.MODE_CIRCLE_THREE_POINTS:
    case EuclidianConstants.MODE_SPHERE_POINT_RADIUS:
    case EuclidianConstants.MODE_SPHERE_TWO_POINTS:
    case EuclidianConstants.MODE_CONE_TWO_POINTS_RADIUS:
    case EuclidianConstants.MODE_CYLINDER_TWO_POINTS_RADIUS:
    case EuclidianConstants.MODE_TETRAHEDRON:
    case EuclidianConstants.MODE_CUBE:
    case EuclidianConstants.MODE_PYRAMID:
    case EuclidianConstants.MODE_PRISM:
    case EuclidianConstants.MODE_PLANE_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCLE_ARC_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCUMCIRCLE_ARC_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCLE_SECTOR_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCUMCIRCLE_SECTOR_THREE_POINTS:
    case EuclidianConstants.MODE_ELLIPSE_THREE_POINTS:
    case EuclidianConstants.MODE_CONIC_FIVE_POINTS:
    case EuclidianConstants.MODE_POLYLINE:
     return true;
    case EuclidianConstants.MODE_REGULAR_POLYGON:
     return selPoints() == 0 || selCS2D() == 1;
    default:
     return false;
   }
  } else {
   switch (mode) {
    case EuclidianConstants.MODE_POINT:
    case EuclidianConstants.MODE_POINT_ON_OBJECT:
    case EuclidianConstants.MODE_JOIN:
    case EuclidianConstants.MODE_SEGMENT:
    case EuclidianConstants.MODE_SEGMENT_FIXED:
    case EuclidianConstants.MODE_RAY:
    case EuclidianConstants.MODE_VECTOR:
    case EuclidianConstants.MODE_POLYGON:
    case EuclidianConstants.MODE_POLYLINE:
    case EuclidianConstants.MODE_CIRCLE_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCLE_ARC_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCUMCIRCLE_ARC_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCLE_SECTOR_THREE_POINTS:
    case EuclidianConstants.MODE_CIRCUMCIRCLE_SECTOR_THREE_POINTS:
    case EuclidianConstants.MODE_PLANE_THREE_POINTS:
    case EuclidianConstants.MODE_SPHERE_TWO_POINTS:
    case EuclidianConstants.MODE_SPHERE_POINT_RADIUS:
    case EuclidianConstants.MODE_CONE_TWO_POINTS_RADIUS:
    case EuclidianConstants.MODE_CYLINDER_TWO_POINTS_RADIUS:
    case EuclidianConstants.MODE_ELLIPSE_THREE_POINTS:
    case EuclidianConstants.MODE_CONIC_FIVE_POINTS:
    case EuclidianConstants.MODE_VIEW_IN_FRONT_OF:
     return true;
    case EuclidianConstants.MODE_VECTOR_FROM_POINT:
     Hits hits = view3D.getHits();
     return hits.isEmpty() || !hits.get(0).isGeoVector();
    case EuclidianConstants.MODE_PYRAMID:
    case EuclidianConstants.MODE_PRISM:
     return selPolygons() == 1 || !polygonForPyramidBasis;
    case EuclidianConstants.MODE_TETRAHEDRON:
    case EuclidianConstants.MODE_CUBE:
     GeoPoint3D point = view3D.getCursor3D();
     if (selPoints() == 0) {
      if (point.hasRegion()) {
       GeoElement geo = (GeoElement) point.getRegion();
       return !(geo instanceof GeoCoordSys2D) || geo.isGeoPlane();
      }
      return point.isPointOnPath();
     }
     if (selCS2D() == 1) {
      return true;
     }
     return point.hasRegion()
       && (!(point.getRegion() instanceof GeoCoordSys2D)
         || point.getRegion() == kernel.getXOYPlane());
    case EuclidianConstants.MODE_REGULAR_POLYGON:
     if (selPoints() == 0 || selCS2D() == 1) {
      return true;
     }
     point = view3D.getCursor3D();
     if (point.hasRegion()) {
      return point.getRegion() == kernel.getXOYPlane();
     }
     return point.isPointOnPath();
    default:
     return false;
   }
  }
 }
 public void setHandledGeo(GeoElement geo, GeoElement source) {
  handledGeo = geo;
  setStartPointLocation(source);
  handledGeo.getChangeableParent3D().record(view3D, startPoint3D);
 }
 public void disposeHandledGeo() {
  handledGeo = null;
 }
 protected boolean viewHasHitsForMouseDragged() {
  if (moveMode == MoveMode.POINT
    && (view3D.getCursor3DType() == EuclidianView3D.PREVIEW_POINT_ALREADY
      || view3D.isXREnabled())) {
   return movedGeoPoint != null || getView().getHits().containsGeoPoint();
  }
  Hits hits = getView().getHits();
  return !hits.isEmpty() && hits.get(0) != kernel.getXOYPlane();
 }
 public void wrapMouseDragged(AbstractEvent event, boolean startCapture) {
  if (handledGeo != null) {
   setMouseLocation(event);
   event.release();
   if (updateTranslationVector(handledGeo.getChangeableParent3D())) {
    handledGeo
      .getChangeableParent3D()
      .move(translationVec3D, startPoint3D, view3D.getViewDirection(), null, null, view3D);
    kernel.notifyRepaint();
   }
   return;
  }
  setMouseMovedEvent(event);
  wrapMouseDraggedND(event, startCapture);
 }
 protected boolean updateTranslationVector(ChangeableParent changeableParent) {
  view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
  view3D.getHittingDirection(tmpCoordsForDirection);
  changeableParent
    .getConverter()
    .updateTranslation(
      startPoint3D,
      changeableParent.getDirection(),
      tmpCoordsForOrigin,
      tmpCoordsForDirection,
      translationVec3D);
  return translationVec3D.isDefined();
 }
 public void setStartPointLocation() {
  setStartPointLocation(movedGeoElement);
 }
 public void setStartPointLocation(GeoElement source) {
  updateStartPoint(source);
  super.setStartPointLocation();
 }
 protected void updateStartPoint(GeoElement source) {
  if (mouseLoc == null) {
   return;
  }
  if (source != null) {
   Drawable3D d = (Drawable3D) view3D.getDrawableND(source);
   double distance = d.getPositionOnHitting();
   view3D.getHittingOrigin(mouseLoc, startPoint3D);
   view3D.getHittingDirection(tmpCoordsForDirection);
   startPoint3D.addInsideMul(tmpCoordsForDirection, distance);
  } else {
   view3D.getPickPoint(mouseLoc, startPoint3D);
   view3D.toSceneCoords3D(startPoint3D);
   view3D.getHittingDirection(tmpCoordsForDirection);
  }
  startPoint3D.projectPlaneThruVIfPossible(
    CoordMatrix4x4.IDENTITY, tmpCoordsForDirection, startPoint3DxOy);
 }
 protected void setTranslateStart(GeoElement geo, GeoVectorND vec) {
  super.setTranslateStart(geo, vec);
  startPoint3D.set(view3D.getCursor3D().getInhomCoordsInD3());
  translationVec3D.set(vec.getCoordsInD3());
  if (geo.isGeoPlane()) {
   translateDirection = geo.getMainDirection();
  } else {
   translateDirection = null;
  }
 }
 private void setTranslateFromPointStart(GeoElement geo, GeoPointND point) {
  startPoint3D.set(view3D.getCursor3D().getInhomCoordsInD3());
  translationVec3D.setSub(point.getInhomCoordsInD3(), startPoint3D);
  if (geo.isGeoPlane()) {
   translateDirection = geo.getMainDirection();
   if (point.isGeoElement3D()) {
    ((GeoPoint3D) point).setMoveMode(GeoPointND.MOVE_MODE_Z);
   }
  } else {
   translateDirection = null;
   if (point.isGeoElement3D()) {
    ((GeoPoint3D) point).setMoveMode(GeoPointND.MOVE_MODE_TOOL_DEFAULT);
   }
  }
 }
 public Coords getNormalTranslateDirection() {
  if (translateDirection == null) {
   return Coords.VZ;
  }
  return translateDirection;
 }
 protected void moveVectorNoUpdate() {
  view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
  view3D.getHittingDirection(tmpCoordsForDirection);
  if (translateDirection == null) {
   tmpCoordsForOrigin.projectPlaneThruVIfPossible(
     Coords.VX, Coords.VY, Coords.VZ, startPoint3D, tmpCoordsForDirection, tmpCoords);
  } else {
   startPoint3D.projectNearLine(
     tmpCoordsForOrigin, tmpCoordsForDirection, translateDirection, tmpCoords);
  }
  GeoPointND P = movedGeoVector.getStartPoint();
  if (P == null) {
   tmpCoords.setSub(tmpCoords, startPoint3D);
  } else {
   tmpCoords.setSub(tmpCoords, P.getInhomCoordsInD3());
  }
  tmpCoords.setAdd(tmpCoords, translationVec3D);
  ((EuclidianController3DCompanion) companion).checkPointCapturingXYThenZ(tmpCoords);
  if (movedGeoVector.isGeoElement3D()) {
   ((GeoVector3D) movedGeoVector).setCoords(tmpCoords);
  } else {
   moveVector(tmpCoords.getX(), tmpCoords.getY());
  }
 }
 public void setStartPointLocationWithOrigin(double x, double y) {
  updateStartPoint(null);
  startPoint3DxOy.setX(startPoint3DxOy.getX() - x);
  startPoint3DxOy.setY(startPoint3DxOy.getY() - y);
  super.setStartPointLocationWithOrigin(x, y);
 }
 protected void calcRWcoords() {
  view3D.getPickPoint(mouseLoc, tmpCoordsForOrigin);
  view3D.toSceneCoords3D(tmpCoordsForOrigin);
  setRwCoords(tmpCoordsForOrigin);
 }
 protected void moveDependent() {
  if (isTranslateablePoint()) {
   Coords end = moveDependentPoint();
   doMoveDependent(end);
  }
  if (movedGeoElement.hasChangeableParent3D()) {
   if (updateTranslationVector(movedGeoElement.getChangeableParent3D())) {
    doMoveDependent(startPoint3D);
   }
  }
 }
 private void doMoveDependent(Coords end) {
  view3D.getHittingDirection(tmpCoordsForDirection);
  MoveGeos.moveObjects(translatableGeos, translationVec3D, end, tmpCoordsForDirection, view3D);
  kernel.notifyRepaint();
 }
 private boolean isTranslateablePoint() {
  return translatableGeos.size() > 0 && translatableGeos.get(0) instanceof GeoPointND;
 }
 private Coords moveDependentPoint() {
  GeoPointND g3d = (GeoPointND) translatableGeos.get(0).copy();
  if (g3d.getMoveMode() == GeoPointND.MOVE_MODE_Z
    || (g3d.getMoveMode() == GeoPointND.MOVE_MODE_TOOL_DEFAULT
      && this.getPointMoveMode() == GeoPointND.MOVE_MODE_Z)) { 
   ((EuclidianController3DCompanion) companion).moveAlongZAxis(g3d);
  } else {
   getCurrentPlane().set(g3d.getCoordsInD3(), 4);
   movePointOnCurrentPlane(g3d);
  }
  return g3d.getInhomCoordsInD3();
 }
 protected void handleMovedElementMultiple() {
 }
 protected final void handleMovedElementFree(PointerEventType type) {
  if (handleMovedElementFreePoint()) {
   translateDirection = null;
   return;
  }
  if (handleMovedElementFreePlane()) {
   return;
  }
  handleMovedElementFreeText();
 }
 private boolean handleMovedElementFreePlane() {
  boolean ret = getCompanion().handleMovedElementFreePlane(movedGeoElement);
  if (ret) {
   moveMode = MoveMode.PLANE;
  }
  return ret;
 }
 protected final void handleMovedElementDependent() {
  if (movedGeoElement.isTranslateable()) {
   AlgoElement algo = movedGeoElement.getParentAlgorithm();
   if (algo instanceof AlgoTranslate) {
    GeoElementND in = algo.getInput(1);
    moveTranslationInput(in);
    return;
   }
  }
  translatableGeos = null;
  handleMovedElementDependentWithChangeableParent();
  handleMovedElementDependentInitMode();
  if (movedGeoElement.hasChangeableParent3D()) {
   movedGeoElement.getChangeableParent3D().record(view3D, startPoint3D);
  }
 }
 private void moveTranslationInput(GeoElementND in) {
  if (in instanceof GeoVectorND && in.isIndependent()) {
   movedGeoVector = (GeoVectorND) in;
   moveMode = MoveMode.VECTOR_NO_GRID;
   setTranslateStart(movedGeoElement, movedGeoVector);
  } else {
   GeoPointND pt = MoveGeos.getMovablePointForVector(in);
   if (pt != null) {
    moveMode = MoveMode.POINT_WITH_OFFSET;
    setMovedGeoPoint(pt);
    setTranslateFromPointStart(movedGeoElement, pt);
   }
  }
 }
 protected void movePointWithOffset() {
  if (movedGeoPoint != null) {
   companion.movePoint(null, movedGeoPoint);
  }
 }
 protected final GeoElementND[] orthogonal(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  boolean hitPoint = addSelectedPoint(hits, 1, false, selPreview) != 0;
  if (!hitPoint) {
   if (selCS2D() == 0) {
    addSelectedLine(hits, 1, false, selPreview);
   }
   if (selLines() == 0) {
    addSelectedCS2D(hits, 1, false, selPreview);
   }
  }
  if (selPoints() == 1) {
   if (selCS2D() == 1) {
    GeoPointND[] points = getSelectedPointsND();
    GeoCoordSys[] cs = getSelectedCS2D();
    return new GeoElementND[] {
     getKernel().getManager3D().orthogonalLine3D(null, points[0], (GeoCoordSys2D) cs[0])
    };
   } else if (selLines() == 1) {
    GeoPointND[] points = getSelectedPointsND();
    GeoLineND[] lines = getSelectedLinesND();
    return new GeoElementND[] {
     getKernel().getManager3D().orthogonalLine3D(null, points[0], lines[0], kernel.getSpace())
    };
   }
  }
  return null;
 }
 private GeoElement[] rotateAroundLine(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  int count = 0;
  if (selGeos() == 0) {
   Hits rotAbles = hits.getHits(TestGeo.TRANSFORMABLE, tempArrayList);
   count = addSelectedGeo(rotAbles, 1, false, selPreview);
  }
  if (count == 0) {
   count = addSelectedPolygon(hits, 1, false, selPreview);
  }
  if (count == 0) {
   addSelectedLine(hits, 1, false, selPreview);
  }
  if ((selLines() == 1) && (selGeos() > 0)) {
   GeoElement[] selGeos = getSelectedGeos();
   getDialogManager()
     .showNumberInputDialogRotate(
       localization.getMenu(EuclidianConstants.getModeText(mode)),
       getSelectedPolygons(),
       getSelectedLinesND(),
       selGeos,
       this);
   return null;
  }
  return null;
 }
 public GeoElement[] rotateAroundLine(GeoElement geoRot, GeoNumberValue phi, GeoLineND line) {
  return kernel.getManager3D().rotate3D(null, geoRot, phi, line);
 }
 public boolean viewOrientationForClockwise(boolean clockwise, GeoLineND line) {
  if (line.getDirectionInD3().dotproduct(view3D.getViewDirection()) > 0) {
   return !clockwise;
  }
  return clockwise;
 }
 private GeoElement[] mirrorAtPlane(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return null;
  }
  int count = 0;
  if (selGeos() == 0) {
   Hits mirAbles = hits.getHits(TestGeo.TRANSFORMABLE, tempArrayList);
   count = addSelectedGeo(mirAbles, 1, false, selPreview);
  }
  if (count == 0) {
   addSelectedCS2D(hits, 1, false, selPreview);
  }
  if (selCS2D() == 1) {
   if (selGeos() > 0) {
    GeoElement[] geos = getSelectedGeos();
    GeoCoordSys2D plane = (GeoCoordSys2D) getSelectedCS2D()[0];
    GeoCoordSys2D mirror = plane;
    if (plane.isGeoConic()) { 
     plane = kernel.getManager3D().plane3D(mirror);
    }
    ArrayList<GeoElement> ret = new ArrayList<>();
    for (GeoElement geo : geos) {
     if (geo != mirror && (geo instanceof Transformable || geo.isGeoPolygon())) {
      ret.addAll(Arrays.asList(kernel.getManager3D().mirror3D(null, geo, plane)));
     }
    }
    return ret.toArray(new GeoElement[0]);
   }
  }
  return null;
 }
 protected void showPopupMenuChooseGeo(ArrayList<GeoElement> selectedGeos1, Hits hits) {
  if (app.isUsingFullGui() && app.getGuiManager() != null) {
   app.getGuiManager().showPopupChooseGeo(selectedGeos1, hits, view3D, mouseLoc);
  }
 }
 public void updateOwnDrawablesNow() {
  updateIntersectionCurves();
 }
 protected void updateIntersectionCurves() {
  for (IntersectionCurve intersectionCurve : intersectionCurveList) {
   intersectionCurve.drawable.update();
   intersectionCurve.drawable.updateIntersectionCurveVisibility();
  }
 }
 public boolean modeNeedsKeyboard() {
  return super.modeNeedsKeyboard()
    || getMode() == EuclidianConstants.MODE_SPHERE_POINT_RADIUS
    || getMode() == EuclidianConstants.MODE_CONE_TWO_POINTS_RADIUS
    || getMode() == EuclidianConstants.MODE_CYLINDER_TWO_POINTS_RADIUS
    || getMode() == EuclidianConstants.MODE_CONIFY
    || getMode() == EuclidianConstants.MODE_EXTRUSION
    || getMode() == EuclidianConstants.MODE_CIRCLE_POINT_RADIUS_DIRECTION
    || getMode() == EuclidianConstants.MODE_SPHERE_POINT_RADIUS
    || getMode() == EuclidianConstants.MODE_ROTATE_AROUND_LINE;
 }
 public void setMode(int newMode, ModeSetter ms) {
  if (newMode != EuclidianConstants.MODE_INTERSECTION_CURVE) {
   intersectionCurveList.clear();
  }
  pyramidBasis = null;
  super.setMode(newMode, ms);
  if (!temporaryMode) {
   initPointMoveMode();
   isModeForCreatingPoint = TargetType.isModeForCreatingPoint(mode);
  }
  if (mode == EuclidianConstants.MODE_MOVE
    && (ms == ModeSetter.TOOLBAR || ms == ModeSetter.DOCK_PANEL)) {
   view3D.updateMatrixForCursor3D();
   view3D.mouseEntered();
   scheduleMouseExit();
  }
 }
 public boolean isCurrentModeForCreatingPoint() {
  return isModeForCreatingPoint;
 }
 protected void setDragCursorIfMoveView() {
 }
 public final void processSelectionRectangle(boolean alt, boolean isControlDown, boolean shift) {
 }
 protected void addSelectedPlanesForAngle(Hits hits, boolean selPreview) {
  if (selVectors() == 0) {
   if (selLines() == 0) { 
    addSelectedPlane(hits, 2, false, selPreview);
   } else if (selLines() == 1) { 
    addSelectedPlane(hits, 1, false, selPreview);
   }
  }
 }
 protected GeoAngle createAngle3D() {
  if (selPlanes() == 2) {
   GeoPlaneND[] planes = getSelectedPlanes();
   return kernel.getManager3D().angle3D(null, planes[0], planes[1]);
  }
  if (selPlanes() == 1 && selLines() == 1) {
   GeoLineND[] lines = getSelectedLinesND();
   GeoPlaneND[] planes = getSelectedPlanes();
   return kernel.getManager3D().angle3D(null, lines[0], planes[0]);
  }
  return null;
 }
 public boolean hasInput3D() {
  return false;
 }
 protected Coords getMouseLocRW() {
  return view3D.getCursor3D().getInhomCoordsInD3();
 }
 public static void rotateObject(
   final App app,
   final String rawInput,
   final boolean clockwise,
   final GeoPolygon[] polys,
   final GeoLineND[] lines,
   final GeoElement[] selGeos,
   final EuclidianController3D ec,
   final ErrorHandler eh,
   final AsyncOperation<String> callback) {
  Kernel kernel = app.getKernel();
  final Construction cons = kernel.getConstruction();
  final boolean oldVal = cons.isSuppressLabelsActive();
  cons.setSuppressLabelCreation(true);
  String inputText = rawInput;
  if (ec.viewOrientationForClockwise(clockwise, lines[0])) {
   inputText = "-(" + inputText + ")";
  }
  kernel
    .getAlgebraProcessor()
    .processAlgebraCommandNoExceptionHandling(inputText, false, eh, true, result -> {
     String defaultRotateAngle = Unicode.FORTY_FIVE_DEGREES_STRING;
     cons.setSuppressLabelCreation(oldVal);
     boolean success =
       result != null && result.length > 0 && result[0] instanceof GeoNumberValue;
     if (success) {
      GeoNumberValue num = (GeoNumberValue) result[0];
      if (rawInput.endsWith(Unicode.DEGREE_STRING)) {
       defaultRotateAngle = rawInput;
      }
      if (polys.length == 1) {
       GeoElement[] geos = ec.rotateAroundLine(polys[0], num, lines[0]);
       if (geos != null) {
        app.storeUndoInfoAndStateForModeStarting();
        ec.memorizeJustCreatedGeos(geos);
       }
       if (callback != null) {
        callback.callback(defaultRotateAngle);
       }
       return;
      }
      ArrayList<GeoElement> ret = new ArrayList<>();
      for (GeoElement selGeo : selGeos) {
       if (selGeo != lines[0]) {
        if (selGeo instanceof Transformable) {
         ret.addAll(Arrays.asList(ec.rotateAroundLine(selGeo, num, lines[0])));
        } else if (selGeo.isGeoPolygon()) {
         ret.addAll(Arrays.asList(ec.rotateAroundLine(selGeo, num, lines[0])));
        }
       }
      }
      if (!ret.isEmpty()) {
       app.storeUndoInfoAndStateForModeStarting();
       ec.memorizeJustCreatedGeos(ret);
      }
     } else {
      if (result != null && result.length > 0) {
       eh.showError(Errors.NumberExpected.getError(app.getLocalization()));
      }
     }
     if (callback != null) {
      callback.callback(success ? defaultRotateAngle : null);
     }
    });
 }
 protected GeoElement[] polygon() {
  if (polygonMode == POLYGON_NORMAL) {
   cancelSwitchPointMoveModeIfNeeded();
   view3D.disposePreview();
  }
  return super.polygon();
 }
 protected GeoVectorND createVectorForTranslation() {
  return ((AlgoDispatcher3D) getAlgoDispatcher()).vector3D();
 }
 protected GeoVectorND createVectorForTranslation(String label) {
  return ((AlgoDispatcher3D) getAlgoDispatcher()).vector3D(label);
 }
 protected int getModeForShallMoveView(AbstractEvent event) {
  if (event.isShiftDown() || app.isMiddleClick(event)) {
   return EuclidianConstants.MODE_TRANSLATE_VIEW;
  }
  return EuclidianConstants.MODE_ROTATEVIEW;
 }
 protected boolean hasNoHitsDisablingModeForShallMoveView(Hits hits, AbstractEvent event) {
  if (hits.isEmpty()) {
   return true;
  }
  GeoElement geoLabel = getView().getLabelHitCheckRefresh(mouseLoc, event.getType());
  if (geoLabel != null) {
   return false;
  }
  for (GeoElement geo : hits) {
   if (isDraggable(geo, view3D)) {
    return false;
   }
  }
  return true;
 }
 public static boolean isDraggable(GeoElement geo, EuclidianViewInterfaceSlim view) {
  if (geo.isMoveable(view)) {
   return true;
  }
  if (geo.isTranslateable()) {
   AlgoElement algo = geo.getParentAlgorithm();
   if (algo instanceof AlgoTranslate) {
    return true;
   }
  }
  return geo.hasChangeableCoordParentNumbers() || geo.hasChangeableParent3D();
 }
 protected DrawDropDownList getComboBoxHit() {
  return null;
 }
 protected boolean overComboBox(AbstractEvent event, GeoElement hit) {
  return false;
 }
 public boolean isInputBoxClicked(int x, int y, PointerEventType type) {
  return false;
 }
 public void exitInput3D() {
 }
 public boolean isZSpace() {
  return false;
 }
 public void onPinchPhone(int x, int y, double scaleFactor) {
  view3D.screenTranslateAndScale(x - twoTouchStartX, y - twoTouchStartY, scaleFactor);
 }
 protected void hidePreviewForPhone() {
 }
 public boolean usesTouchGestureArbiter() {
  return false;
 }
 protected void setMoveModeIfAxis(Object hit) {
  MoveMode newMode = null;
  if (hit == kernel.getXAxis()) {
   newMode = MoveMode.X_AXIS;
   scaleAxisVector.set2(view3D.getToScreenMatrix().getVx());
   scaleOld = view3D.getXscale();
  } else if (hit == kernel.getYAxis()) {
   newMode = MoveMode.Y_AXIS;
   scaleAxisVector.set2(view3D.getToScreenMatrix().getVy());
   scaleOld = view3D.getYscale();
  } else if (hit == kernel.getZAxis3D()) {
   newMode = MoveMode.Z_AXIS;
   scaleAxisVector.set2(view3D.getToScreenMatrix().getVz());
   scaleOld = view3D.getZscale();
  }
  if (newMode != null) {
   scaleAxisVector.calcNorm();
   double norm = scaleAxisVector.getNorm();
   if (norm / scaleOld > 0.1) {
    scaleAxisVector.mulInside(1 / norm);
    scaleOrigin.set2(view3D.getToScreenMatrix().getOrigin());
    tmpCoords.setMul(view3D.getToScreenMatrix(), view3D.getCursor3D().getInhomCoordsInD3());
    scaleDistanceInPixelsStart = getDistanceForScale(tmpCoords.getX(), tmpCoords.getY());
    if (Math.abs(scaleDistanceInPixelsStart) > MIN_MOUSE_MOVE_FOR_AXIS_SCALE) {
     moveMode = newMode;
    }
   }
  }
 }
 private double getDistanceForScale(double x, double y) {
  return (x - scaleOrigin.getX()) * scaleAxisVector.getX()
    + (y - scaleOrigin.getY()) * scaleAxisVector.getY();
 }
 protected void scaleXAxis() {
  scaleAxis();
 }
 protected void scaleYAxis() {
  scaleAxis();
 }
 protected void scaleZAxis() {
  scaleAxis();
 }
 private void scaleAxis() {
  GPoint centeredMouse = new GPoint();
  view3D.setCenteredPosition(mouseLoc, centeredMouse);
  double distance = getDistanceForScale(centeredMouse.x, centeredMouse.y);
  if (scaleDistanceInPixelsStart > 0) {
   if (distance < MIN_MOUSE_MOVE_FOR_AXIS_SCALE) {
    distance = MIN_MOUSE_MOVE_FOR_AXIS_SCALE;
   }
  } else {
   if (distance > -MIN_MOUSE_MOVE_FOR_AXIS_SCALE) {
    distance = -MIN_MOUSE_MOVE_FOR_AXIS_SCALE;
   }
  }
  view3D.setCoordSystemFromAxisScale(distance / scaleDistanceInPixelsStart, scaleOld, moveMode);
 }
 public boolean penMode(int mode2) {
  return false;
 }
 protected void setCursorForTranslateView(Hits hits) {
  view3D.setCursorForTranslateView(hits);
 }
 protected void setCursorForTranslateViewNoHit() {
  view3D.setCursorForTranslateViewNoHit();
 }
 public void setViewRotationOccurred(boolean flag) {
  viewRotationOccurred = flag;
 }
 public EuclidianController3DCompanion getCompanion() {
  createCompanionsIfNeeded();
  return companion3D;
 }
 protected void createCompanionsIfNeeded() {
  super.createCompanionsIfNeeded();
  if (companion3D == null) {
   companion3D = (EuclidianController3DCompanion) companion;
  }
 }
 protected boolean modeTriggersUndoOnDragGeo(int mode2) {
  if (mode2 == EuclidianConstants.MODE_PYRAMID || mode2 == EuclidianConstants.MODE_PRISM) {
   return pyramidBasis == null && selPolygons() == 0;
  }
  return super.modeTriggersUndoOnDragGeo(mode2);
 }
 protected void updatePreviewableForMouseDragged() {
 }
 protected void setCursorForProcessMouseMoveHit() {
  setHitCursor();
 }
 protected void snapMoveView() {
  int dx = mouseLoc.x - startLoc.x;
  int dy = mouseLoc.y - startLoc.y;
  view3D.setCoordSystemFromMouseMove(dx, dy, MoveMode.VIEW);
 }
 protected ScheduledMouseExit createScheduledMouseExit(AbstractEvent event) {
  return new ScheduledMouseExit(event);
 }
 public void scheduleMouseExit() {
  scheduleMouseExit(null);
 }
 public void scheduleMouseExit(AbstractEvent event) {
  cancelMouseExit();
  if (!view3D.isXREnabled() || !isCurrentModeForCreatingPoint()) {
   if (schedulerForMouseExit == null) {
    SchedulerFactory factory = SchedulerFactory.getPrototype();
    if (factory != null) {
     schedulerForMouseExit = SchedulerFactory.getPrototype().createScheduler();
    }
   }
   if (schedulerForMouseExit != null) {
    mScheduledMouseExit = createScheduledMouseExit(event);
    schedulerForMouseExit.schedule(
      mScheduledMouseExit, EuclidianView3D.CURSOR_DELAY_IN_MILLISECONDS);
   }
  }
 }
 public void cancelMouseExit() {
  if (schedulerForMouseExit != null) {
   schedulerForMouseExit.cancel();
  }
  if (mScheduledMouseExit != null) {
   mScheduledMouseExit.cancel();
  }
 }
 public void wrapMouseEntered() {
  cancelMouseExit();
  super.wrapMouseEntered();
 }
 public boolean checkTransparencyForSortingDrawables() {
  return !isCreatingPointAR();
 }
 public boolean isCreatingPointAR() {
  return view3D.isXREnabled() && isCurrentModeForCreatingPoint();
 }
 protected boolean regularPolygon(Hits hits, boolean selPreview) {
  if (hits.isEmpty()) {
   return false;
  }
  if (addSelectedPoint(hits, 2, false, selPreview) == 0) {
   if (selPoints() == 1) {
    addSelectedCS2D(hits, 1, false, selPreview);
   }
  }
  if (selPoints() == 2) {
   GeoPointND[] points = getSelectedPointsND();
   GeoDirectionND direction;
   if (selCS2D() == 1) {
    direction = getSelectedCS2D()[0];
   } else {
    direction = view3D.getxOyPlane();
   }
   getDialogManager()
     .showNumberInputDialogRegularPolygon(
       localization.getMenu(EuclidianConstants.getModeText(mode)),
       this,
       points[0],
       points[1],
       (GeoCoordSys2D) direction);
   return true;
  }
  return false;
 }
 protected void setMouseLocToNullIfNeeded() {
 }
 public RotationSpeedHandler getRotationSpeedHandler() {
  return rotationSpeedHandler;
 }
}
```

### FILE: geogebra3D/euclidian3D/EuclidianController3DCompanion.java
```java
public class EuclidianController3DCompanion extends EuclidianControllerFor3DCompanion {
 private EuclidianController3D ec3D;
 private Coords tmpCoords1 = new Coords(4);
 private Coords tmpCoords2 = new Coords(4);
 private Coords tmpCoordsForOrigin = new Coords(4);
 private Coords tmpCoordsForDirection = new Coords(4);
 private Coords captureCoords = Coords.createInhomCoorsInD3();
 private static final double AR_ROUNDING_PRECISION_PERCENTAGE = 10.0 / 100.0;
 public EuclidianController3DCompanion(EuclidianController ec) {
  super(ec);
 }
 protected void setEuclidianController(EuclidianController ec) {
  super.setEuclidianController(ec);
  ec3D = (EuclidianController3D) ec;
 }
 public void movePoint(AbstractEvent event, @NonNull GeoPointND movedPoint) {
  if (movedPoint instanceof GeoPoint3D movedGeoPoint3D) {
   movePoint3D(movedGeoPoint3D);
  } else { 
   ec3D.view3D.getHittingOrigin(ec.mouseLoc, tmpCoordsForOrigin);
   ec3D.view3D.getHittingDirection(tmpCoordsForDirection);
   tmpCoordsForOrigin.projectPlaneThruVIfPossible(
     CoordMatrix4x4.IDENTITY, tmpCoordsForDirection, tmpCoords1, tmpCoords2);
   checkPointCapturingXY(tmpCoords2);
   ec.setRwCoords(tmpCoords2);
   super.movePoint(ec3D.mouseEvent, movedPoint);
   ec3D.view3D.getCursor3D().setCoords(movedPoint.getCoordsInD3(), false);
  }
 }
 private void movePoint3D(GeoPoint3D movedGeoPoint3D) {
  if (movedGeoPoint3D.isPointOnPath()) {
   ec3D.setMouseInformation(movedGeoPoint3D);
   movedGeoPoint3D.doPath();
   Coords coords = movedGeoPoint3D.getInhomCoordsInD(3);
   if (checkPointCapturingXYThenZ(coords)) {
    movedGeoPoint3D.setWillingCoords(coords);
    movedGeoPoint3D.setWillingDirectionUndefined();
    movedGeoPoint3D.doPath();
   }
  } else if (movedGeoPoint3D.hasRegion()) {
   ec3D.setMouseInformation(movedGeoPoint3D);
   hitRegion(movedGeoPoint3D);
   movedGeoPoint3D.doRegion();
   boolean changed = false;
   Coords coords = movedGeoPoint3D.getCoords();
   if (movedGeoPoint3D.getRegion() == ec.getKernel().getXOYPlane()) {
    changed = ec3D.checkXYMinMax(coords);
   }
   if (checkPointCapturingXYThenZ(coords) || changed) {
    movedGeoPoint3D.setWillingCoords(coords);
    movedGeoPoint3D.setWillingDirectionUndefined();
    movedGeoPoint3D.doRegion();
   }
   ec3D.view3D
     .getCursor3D()
     .setMoveNormalDirection(movedGeoPoint3D.getRegionParameters().getNormal());
  } else {
   if (movedGeoPoint3D.getMoveMode() == GeoPointND.MOVE_MODE_Z
     || (movedGeoPoint3D.getMoveMode() == GeoPointND.MOVE_MODE_TOOL_DEFAULT
       && ec3D.getPointMoveMode() == GeoPointND.MOVE_MODE_Z)) { 
    long maxDelay = EuclidianConstants.DRAGGING_DELAY_FOR_MOVING_POINT_ALONG_Z;
    if (!ec.isTemporaryMode() || ec.getElapsedTimeFromLastMousePressed() > maxDelay) {
     moveAlongZAxis(movedGeoPoint3D);
    }
   } else {
    ec3D.movePointOnCurrentPlane(movedGeoPoint3D);
   }
   if (ec.getMoveMode() == MoveMode.POINT) {
    ec3D.view3D.updatePointDecorations();
   }
  }
  ec3D.view3D.getCursor3D().setCoords(movedGeoPoint3D.getCoords(), false);
  ec3D.view3D.updateMatrixForCursor3D();
  movedGeoPoint3D.updateCascade(); 
  if (ec.getView().getPreviewDrawable() != null) {
   ec.getView().updatePreviewable();
  }
 }
 public void moveAlongZAxis(GeoPointND movedGeoPoint3D) {
  ec3D.view3D.getHittingOrigin(ec.mouseLoc, tmpCoordsForOrigin);
  ec3D.addOffsetForTranslation(tmpCoordsForOrigin);
  ec3D.view3D.getHittingDirection(tmpCoordsForDirection);
  movedGeoPoint3D
    .getCoords()
    .projectNearLine(
      tmpCoordsForOrigin,
      tmpCoordsForDirection,
      ec3D.getNormalTranslateDirection(),
      tmpCoords1);
  if (!ec3D.view3D.isXREnabled() && ec.getMoveMode() == MoveMode.POINT) {
   if (tmpCoords1.getZ() > ec3D.zMinMax[1]) {
    tmpCoords1.setZ(ec3D.zMinMax[1]);
   } else if (tmpCoords1.getZ() < ec3D.zMinMax[0]) {
    tmpCoords1.setZ(ec3D.zMinMax[0]);
   }
  }
  switch (ec.getView().getPointCapturingMode()) {
   case EuclidianStyleConstants.POINT_CAPTURING_STICKY_POINTS:
   default:
   case EuclidianStyleConstants.POINT_CAPTURING_AUTOMATIC:
    EuclidianView3D view = (EuclidianView3D) ec.getView();
    if (!view.isGridOrAxesShown() && !view.getShowPlane()) {
     break;
    }
   case EuclidianStyleConstants.POINT_CAPTURING_ON:
   case EuclidianStyleConstants.POINT_CAPTURING_ON_GRID:
    double z0 = tmpCoords1.getZ();
    double gz = ec.getView().getGridDistances(2);
    double z = Kernel.roundToScale(z0, gz);
    if (ec.getView().getPointCapturingMode() == EuclidianStyleConstants.POINT_CAPTURING_ON_GRID
      || Math.abs(z - z0) < gz * ec.getPointCapturingPercentage()) {
     tmpCoords1.setZ(z);
    }
    break;
   case EuclidianStyleConstants.POINT_CAPTURING_OFF:
    break;
  }
  movedGeoPoint3D.setCoords(tmpCoords1, true);
  ec3D.getCurrentPlane().set(movedGeoPoint3D.getCoords(), 4);
 }
 public boolean checkPointCapturingXY(Coords coords) {
  switch (ec.getView().getPointCapturingMode()) {
   case EuclidianStyleConstants.POINT_CAPTURING_STICKY_POINTS:
   case EuclidianStyleConstants.POINT_CAPTURING_AUTOMATIC:
    if (!ec.getView().isGridOrAxesShown()) {
     return false;
    }
   case EuclidianStyleConstants.POINT_CAPTURING_ON:
   case EuclidianStyleConstants.POINT_CAPTURING_ON_GRID:
    double x0 = coords.getX();
    double y0 = coords.getY();
    double gx = ec.getView().getGridDistances(0);
    double gy = ec.getView().getGridDistances(1);
    double x = Kernel.roundToScale(x0, gx);
    double y = Kernel.roundToScale(y0, gy);
    if (ec.getView().getPointCapturingMode() == EuclidianStyleConstants.POINT_CAPTURING_ON_GRID
      || (Math.abs(x - x0) < gx * ec.getPointCapturingPercentage()
        && Math.abs(y - y0) < gy * ec.getPointCapturingPercentage())) {
     boolean changed = false;
     if (!DoubleUtil.isEqual(x, x0)) {
      coords.setX(x);
      changed = true;
     }
     if (!DoubleUtil.isEqual(y, y0)) {
      coords.setY(y);
      changed = true;
     }
     return changed;
    }
    return false;
  }
  return false;
 }
 public boolean checkPointCapturingXYThenZ(Coords coords) {
  switch (ec.getView().getPointCapturingMode()) {
   case EuclidianStyleConstants.POINT_CAPTURING_STICKY_POINTS:
   case EuclidianStyleConstants.POINT_CAPTURING_AUTOMATIC:
    if (!ec.getView().isGridOrAxesShown()) {
     if (specificPointCapturingAutomatic()) {
      return checkPointCapturingZto0(coords);
     }
     return false;
    }
   case EuclidianStyleConstants.POINT_CAPTURING_ON:
   case EuclidianStyleConstants.POINT_CAPTURING_ON_GRID:
    double x0 = coords.getX();
    double y0 = coords.getY();
    double gx = ec.getView().getGridDistances(0);
    double gy = ec.getView().getGridDistances(1);
    double x = Kernel.roundToScale(x0, gx);
    double y = Kernel.roundToScale(y0, gy);
    if (ec.getView().getPointCapturingMode() == EuclidianStyleConstants.POINT_CAPTURING_ON_GRID
      || (Math.abs(x - x0) < gx * ec.getPointCapturingPercentage()
        && Math.abs(y - y0) < gy * ec.getPointCapturingPercentage())) {
     boolean changed = false;
     if (!DoubleUtil.isEqual(x, x0)) {
      coords.setX(x);
      changed = true;
     }
     if (!DoubleUtil.isEqual(y, y0)) {
      coords.setY(y);
      changed = true;
     }
     if (checkPointCapturingZ(coords)) {
      changed = true;
     }
     return changed;
    }
    return checkPointCapturingZ(coords);
  }
  return false;
 }
 protected boolean specificPointCapturingAutomatic() {
  return false;
 }
 private boolean checkPointCapturingZto0(Coords coords) {
  return checkPointCapturingZ(coords, 0);
 }
 private boolean checkPointCapturingZ(Coords coords) {
  return checkPointCapturingZ(coords, coords.getZ());
 }
 private boolean checkPointCapturingZ(Coords coords, double zStick) {
  double z0 = coords.getZ();
  double gz = ec.getView().getGridDistances(2);
  double z = Kernel.roundToScale(zStick, gz);
  if (ec.getView().getPointCapturingMode() == EuclidianStyleConstants.POINT_CAPTURING_ON_GRID
    || Math.abs(z - z0) < gz * ec.getPointCapturingPercentage()) {
   if (!DoubleUtil.isEqual(z, z0)) {
    coords.setZ(z);
    return true;
   }
  }
  return false;
 }
 protected GeoPointND createNewPoint(boolean forPreviewable, boolean complex) {
  if (!forPreviewable) {
   if (ec3D.view3D.getCursor3DType() == EuclidianView3D.PREVIEW_POINT_NONE) {
    return null;
   }
   GeoPoint3D point3D = (GeoPoint3D) ec.getKernel().getManager3D().point3D(0, 0, 0, false);
   CoordMatrix4x4.identity(ec3D.getCurrentPlane());
   ec3D.movePointOnCurrentPlane(point3D);
   point3D.setLabel(null);
   return point3D;
  } else {
   return createPointForPreviewable(complex);
  }
 }
 private GeoPointND createPointForPreviewable(boolean complex) {
  GeoPoint3D point3D;
  if (ec3D.view3D.isXREnabled()
    && !ec3D.view3D.getxOyPlane().isPlateVisible()
    && !ec3D.view3D.getxOyPlane().isGridVisible()) {
   if (ec3D.view3D.getRenderer().getHittingFloorAR(tmpCoords1)) {
    double rounding = DoubleUtil.round125(AR_ROUNDING_PRECISION_PERCENTAGE
      * ec3D.view3D.getRenderer().getHittingDistanceAR()
      / ec3D.view3D.getZscale());
    if (DoubleUtil.isGreater(rounding, 0)) {
     tmpCoords1.setZ(ec3D.view3D
       .getRenderer()
       .checkHittingFloorZ(((int) (tmpCoords1.getZ() / rounding)) * rounding));
    }
    tmpCoords1.setW(1);
    ec3D.view3D.getHittingOrigin(ec.mouseLoc, tmpCoordsForOrigin);
    ec3D.view3D.getHittingDirection(tmpCoordsForDirection);
    tmpCoordsForOrigin.projectPlaneThruVIfPossible(
      Coords.VX, Coords.VY, Coords.VZ, tmpCoords1, tmpCoordsForDirection, tmpCoords2);
    tmpCoords2.setZ(tmpCoords1.getZ());
    point3D = ec3D.view3D.getCursor3D();
    point3D.setCoords(tmpCoords2);
   } else {
    point3D = null;
    ec3D.view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_NONE);
   }
  } else {
   point3D = createNewFreePoint(complex);
  }
  if (point3D == null) {
   return null;
  }
  point3D.setPath(null);
  point3D.setRegion(null);
  ec3D.view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_FREE);
  return point3D;
 }
 protected GeoPointND createNewPoint(boolean forPreviewable, Path path, boolean complex) {
  GeoPoint3D point3D;
  if (!forPreviewable) {
   point3D = (GeoPoint3D) ec.getKernel().getManager3D().point3D(null, path, false);
  } else {
   point3D = ec3D.view3D.getCursor3D();
   ((GeoCursor3D) point3D).setIsCaptured(false);
   point3D.setPath(path);
   point3D.setRegion(null);
   ec3D.view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_PATH);
  }
  ec3D.setMouseInformation(point3D);
  point3D.doPath();
  tmpCoords1.set(point3D.getInhomCoordsInD3());
  if (checkPointCapturingXYThenZ(tmpCoords1)) {
   point3D.setWillingCoords(tmpCoords1);
   point3D.doPath();
   if (point3D instanceof GeoCursor3D) {
    ((GeoCursor3D) point3D).setIsCaptured(true);
   }
  }
  return point3D;
 }
 private void hitRegion(GeoPoint3D point3D) {
  DrawableND d = ec3D.view3D.getDrawableND((GeoElement) point3D.getRegion());
  if (d != null) {
   Hitting hitting = ec3D.view3D.getRenderer().getHitting();
   hitting.setOriginDirectionThreshold(
     point3D.getWillingCoords(), point3D.getWillingDirection(), App.DEFAULT_THRESHOLD);
   ((Drawable3D) d).hit(hitting);
  }
 }
 protected GeoPointND createNewPoint(boolean forPreviewable, Region region, boolean complex) {
  GeoCursor3D point3D = ec3D.view3D.getCursor3D();
  point3D.setIsCaptured(false);
  point3D.setPath(null);
  point3D.setRegion(region);
  ec3D.setMouseInformation(point3D);
  hitRegion(point3D);
  point3D.doRegion();
  point3D.setMoveNormalDirection(point3D.getRegionParameters().getNormal());
  if (region == ec.getKernel().getXOYPlane()) {
   Coords coords = point3D.getInhomCoords();
   GeoPlane3D plane = (GeoPlane3D) region;
   if (!ec3D.view3D.isXREnabled()
     && (coords.getX() < plane.getXmin()
       || coords.getX() > plane.getXmax()
       || coords.getY() < plane.getYmin()
       || coords.getY() > plane.getYmax())) {
    ec3D.view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_NONE);
    return null;
   }
   captureCoords.setValues(coords, 2);
   if (checkPointCapturingXY(captureCoords)) {
    point3D.setCoords(captureCoords, false);
    point3D.setIsCaptured(true);
   }
   ec3D.view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_REGION);
  } else {
   tmpCoords1.set(point3D.getInhomCoordsInD3());
   if (checkPointCapturingXYThenZ(tmpCoords1)) {
    point3D.setWillingCoords(tmpCoords1);
    point3D.doRegion();
    point3D.setIsCaptured(true);
   }
   GeoElement geo = (GeoElement) region;
   if (geo.isGeoQuadric()
     && ((GeoQuadric3D) geo).getType() == GeoQuadricNDConstants.QUADRIC_LINE) {
    ec3D.view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_REGION_AS_PATH);
   } else {
    ec3D.view3D.setCursor3DType(EuclidianView3D.PREVIEW_POINT_REGION);
   }
  }
  if (!forPreviewable) {
   GeoPoint3D ret = (GeoPoint3D) ec.getKernel().getManager3D().point3DIn(null, region, false);
   ret.set(point3D);
   ret.doRegion();
   return ret;
  }
  return point3D;
 }
 protected GeoPoint3D createNewFreePoint(boolean complex) {
  return (GeoPoint3D) createNewPoint(true, ec.getKernel().getXOYPlane(), complex);
 }
 public boolean setCoordsToMouseLoc(GeoPointND loc) {
  loc.setCoords(ec.mouseLoc.x, ec.mouseLoc.y, 1.0);
  return false;
 }
 protected void updateMovedGeoPointStartValues(
   Coords coords, GeoPointND movedGeoPoint, CoordMatrix4x4 currentPlane) {
  if (!movedGeoPoint.isPointOnPath() && !movedGeoPoint.hasRegion()) {
   CoordMatrix4x4.identity(currentPlane);
   currentPlane.set(coords, 4);
  }
 }
 protected boolean handleMovedElementFreePlane(GeoElement movedGeoElement) {
  return false;
 }
 protected void setMouseOrigin(GeoPoint3D point, GPoint mouseLoc) {
  if (mouseLoc == null) {
   return;
  }
  ec3D.view3D.getHittingOrigin(mouseLoc, tmpCoordsForOrigin);
  ec3D.addOffsetForTranslation(tmpCoordsForOrigin);
  point.setWillingCoords(tmpCoordsForOrigin);
 }
 protected EuclidianView3D getView() {
  return (EuclidianView3D) ec.getView();
 }
 public boolean viewOrientationForClockwise(boolean clockwise, CreateGeoForRotate creator) {
  if (creator.getPivot().isGeoPoint()) {
   return super.viewOrientationForClockwise(clockwise, creator);
  }
  return ec3D.viewOrientationForClockwise(clockwise, (GeoLineND) creator.getPivot());
 }
 public GeoElement[] regularPolygon(
   GeoPointND geoPoint1, GeoPointND geoPoint2, GeoNumberValue value, GeoCoordSys2D direction) {
  if (geoPoint1.isGeoElement3D() || geoPoint2.isGeoElement3D()) {
   return ec.getKernel()
     .getManager3D()
     .regularPolygon(
       null,
       geoPoint1,
       geoPoint2,
       value,
       direction == null ? ((EuclidianView3D) ec.getView()).getxOyPlane() : direction);
  }
  return ec.getKernel().getAlgoDispatcher().regularPolygon(null, geoPoint1, geoPoint2, value);
 }
}
```

### FILE: geogebra3D/euclidian3D/Hits3D.java
```java
public class Hits3D extends Hits {
 private static final long serialVersionUID = 1L;
 private TreeSetOfDrawable3D[] hitSet = new TreeSetOfDrawable3D[Drawable3D.DRAW_PICK_ORDER_MAX];
 private TreeSetOfDrawable3D hitsOthers =
   new TreeSetOfDrawable3D(new Drawable3D.DrawableComparator());
 private TreeSetOfDrawable3D hitsLabels =
   new TreeSetOfDrawable3D(new Drawable3D.DrawableComparator());
 private TreeSet<TreeSetOfDrawable3D> hitSetSet = new TreeSet<>(new Drawable3D.SetComparator());
 private Hits topHits = new Hits();
 private ArrayList<Drawable3D> drawables3D = new ArrayList<>();
 private int quadCount;
 private static final class TreeSetOfDrawable3D extends TreeSet<Drawable3D> {
  private static final long serialVersionUID = 1L;
  private TreeSetOfDrawable3D(DrawableComparator drawableComparator) {
   super(drawableComparator);
  }
  private void add(Drawable3D d, double zNear, double zFar) {
   if (contains(d)) {
    if (d.getZPickNear() > zNear) {
     return;
    }
    remove(d);
   }
   d.setZPick(zNear, zFar, false, d.getPositionOnHitting());
   super.add(d);
  }
 }
 public Hits3D() {
  super();
  for (int i = 0; i < Drawable3D.DRAW_PICK_ORDER_MAX; i++) {
   hitSet[i] = new TreeSetOfDrawable3D(new Drawable3D.DrawableComparator());
  }
  quadCount = 0;
 }
 public Hits3D cloneHits() {
  Hits3D ret = (Hits3D) super.cloneHits();
  ret.topHits = this.topHits.cloneHits();
  ret.quadCount = quadCount;
  return ret;
 }
 public boolean add(GeoElement geo) {
  if (geo == null) {
   Log.error("adding null geo");
   return false;
  }
  if (geo instanceof GeoQuadric3D) {
   quadCount++;
  }
  return super.add(geo);
 }
 public void init() {
  super.init();
  for (int i = 0; i < Drawable3D.DRAW_PICK_ORDER_MAX; i++) {
   hitSet[i].clear();
  }
  hitsOthers.clear();
  hitsLabels.clear();
  topHits.init();
 }
 public void init(GeoElement geo) {
  init();
  if (geo != null) {
   add(geo);
   topHits.add(geo);
  }
 }
 public void addDrawable3D(Drawable3D d, PickingType type, double zNear, double zFar) {
  if (type == PickingType.LABEL) {
   if (!d.getGeoElement().isGeoText()) {
    hitsLabels.add(d, zNear, zFar);
   }
  } else { 
   d.setPickingType(type);
  }
  if (d.getPickOrder() < Drawable3D.DRAW_PICK_ORDER_MAX) {
   hitSet[d.getPickOrder()].add(d, zNear, zFar);
  } else {
   hitsOthers.add(d, zNear, zFar);
  }
 }
 public void addDrawable3D(Drawable3D d, PickingType type) {
  if (d.hasRelevantPickingValues()) {
   if (type == PickingType.LABEL) {
    if (!d.getGeoElement().isGeoText()) {
     hitsLabels.add(d);
    }
   } else { 
    d.setPickingType(type);
   }
   if (d.getPickOrder() < Drawable3D.DRAW_PICK_ORDER_MAX) {
    hitSet[d.getPickOrder()].add(d);
   } else {
    hitsOthers.add(d);
   }
  }
 }
 public double sort() {
  hitSetSet.clear();
  for (int i = 0; i < Drawable3D.DRAW_PICK_ORDER_MAX; i++) {
   hitSetSet.add(hitSet[i]);
  }
  double zNear = Double.NaN;
  Iterator<Drawable3D> iter1 = hitSetSet.first().iterator();
  if (iter1.hasNext()) {
   Drawable3D d = iter1.next();
   addToHits(d, topHits);
   zNear = d.getZPickNear();
  }
  while (iter1.hasNext()) {
   addToHits(iter1.next(), topHits);
  }
  drawables3D.clear();
  for (TreeSetOfDrawable3D set : hitSetSet) {
   for (Drawable3D d : set) {
    drawables3D.add(d);
    GeoElement geo = d.getGeoElement();
    addToHits(d, this);
    if (geo.isGeoConic()) {
     if (d.getPickingType() == PickingType.POINT_OR_CURVE) {
      ((GeoConicND) geo).setLastHitType(HitType.ON_BOUNDARY);
     } else { 
      ((GeoConicND) geo).setLastHitType(HitType.ON_FILLING);
     }
    }
   }
  }
  return zNear;
 }
 private void addToHits(Drawable3D d, Hits hits) {
  GeoElement geo = d.getGeoElement();
  hits.add(geo);
 }
 public ArrayList<Drawable3D> getDrawables() {
  return drawables3D;
 }
 public Hits getTopHits() {
  if (topHits.isEmpty()) {
   return cloneHits();
  }
  return topHits;
 }
 public Hits getTopHits(int depth, int geoN) {
  Hits3D ret = new Hits3D();
  int depthCount = 0;
  int geoNCount = 0;
  for (Iterator<TreeSetOfDrawable3D> iterSet = hitSetSet.iterator();
    iterSet.hasNext() && depthCount < depth; ) {
   TreeSetOfDrawable3D set = iterSet.next();
   if (set.size() > 0) {
    depthCount++;
   }
   for (Iterator<Drawable3D> iter = set.iterator(); iter.hasNext() && geoNCount < geoN; ) {
    Drawable3D d = iter.next();
    GeoElement geo = d.getGeoElement();
    ret.add(geo);
    geoNCount++;
   }
  }
  return ret;
 }
 public GeoElement getLabelHit() {
  if (hitsLabels.isEmpty()) {
   return null;
  }
  GeoElement labelGeo = hitsLabels.first().getGeoElement();
  if (labelGeo == topHits.get(0)) {
   return labelGeo;
  }
  return null;
 }
 public void removeAllPolygonsButOne() {
  super.removeAllPolygonsButOne();
  topHits.clear(); 
 }
 public void removeAllPolygonsAndQuadricsButOne() {
  boolean foundTarget = false;
  for (int i = 0; i < size() - 1; ++i) {
   GeoElement geo = get(i);
   if (geo.isGeoPolygon() || geo instanceof GeoQuadric3D || geo.isGeoConic()) {
    if (foundTarget) {
     remove(i);
    }
    foundTarget = true;
   }
  }
 }
 protected Hits createNewHits() {
  return new Hits3D();
 }
 public boolean equals(Object obj) {
  return super.equals(obj); 
 }
 public int hashCode() {
  return super.hashCode();
 }
}
```

### FILE: geogebra3D/kernel3D/ConstructionCompanion3D.java
```java
public class ConstructionCompanion3D extends ConstructionCompanion {
 private GeoAxis3D zAxis3D;
 private GeoPlane3DConstant xOyPlane;
 private GeoSpace space;
 private GeoClippingCube3D clippingCube;
 private String zAxis3DLocalName;
 private String xOyPlaneLocalName;
 private String spaceLocalName;
 public ConstructionCompanion3D(Construction cons) {
  super(cons);
 }
 public void init() {
  super.init();
  zAxis3D = new GeoAxis3D(cons, GeoAxisND.Z_AXIS_3D);
  xOyPlane = new GeoPlane3DConstant(cons, GeoPlane3DConstant.XOY_PLANE);
  space = new GeoSpace(cons);
  clippingCube = new GeoClippingCube3D(cons);
 }
 public GeoAxisND getZAxis() {
  return zAxis3D;
 }
 public GeoDirectionND getXOYPlane() {
  return xOyPlane;
 }
 public GeoDirectionND getSpace() {
  return space;
 }
 public GeoElement getClippingCube() {
  return clippingCube;
 }
 public ConstructionDefaults newConstructionDefaults() {
  return new ConstructionDefaults3D(cons);
 }
 protected void initGeoTables() {
  super.initGeoTables();
  HashMap<String, GeoElement> geoTable = cons.getGeoTable();
  geoTable.put("zAxis", zAxis3D);
  geoTable.put("xOyPlane", xOyPlane);
  geoTable.put("space", space);
  if (zAxis3DLocalName != null) {
   geoTable.put(zAxis3DLocalName, zAxis3D);
   geoTable.put(xOyPlaneLocalName, xOyPlane);
   geoTable.put(spaceLocalName, space);
  }
 }
 public void updateLocalAxesNames() {
  zAxis3DLocalName = cons.updateLocalAxisName(zAxis3D, zAxis3DLocalName, "zAxis");
  xOyPlaneLocalName = cons.updateLocalAxisName(xOyPlane, xOyPlaneLocalName, "xOyPlane");
  spaceLocalName = cons.updateLocalAxisName(space, spaceLocalName, "space");
 }
 public Constants getConstantElement(GeoElement geo) {
  if (geo == zAxis3D) {
   return Constants.Z_AXIS;
  }
  if (geo == xOyPlane) {
   return Constants.XOY_PLANE;
  }
  if (geo == space) {
   return Constants.SPACE;
  }
  return super.getConstantElement(geo);
 }
 public boolean is3D() {
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/ConstructionDefaults3D.java
```java
public class ConstructionDefaults3D extends ConstructionDefaults {
 public static final int DEFAULT_INTERSECTION_CURVE = 3150;
 public static final int DEFAULT_AXIS3D = 3103;
 public static final int DEFAULT_CURVECARTESIAN3D = 3106;
 public static final int DEFAULT_PLANE3D = 3200;
 public static final int DEFAULT_QUADRIC = 3301;
 public static final int DEFAULT_SURFACECARTESIAN3D = 3304;
 public static final int DEFAULT_NET = 3305;
 public static final GColor colCurveCartesian3D = colConic;
 private static final GColor colPlane3D = GColor.DARK_CYAN;
 public static final float DEFAULT_PLANE3D_ALPHA = 0.5f;
 public static final int DEFAULT_PLANE3D_GRID_THICKNESS = 0;
 public static final float DEFAULT_PLANE3D_FADING = 0.10f;
 public static final int DEFAULT_SURFACE_GRID_THICKNESS = 1;
 public static final float DEFAULT_POLYHEDRON_ALPHA = 0.4f;
 public static final GColor colIntersectionCurve = GColor.ORANGE;
 public static final GColor colXAXIS = GColor.RED;
 public static final GColor colYAXIS = GColor.GREEN;
 public static final GColor colZAXIS = GColor.BLUE;
 public ConstructionDefaults3D(Construction cons) {
  super(cons);
 }
 private GColor colPolyhedron() {
  return getColPolygon();
 }
 public void createDefaultGeoElements() {
  cons.setIgnoringNewTypes(true);
  super.createDefaultGeoElements();
  GeoConic3D intersectionCurve = new GeoConic3D(cons);
  intersectionCurve.setLocalVariableLabel("Intersection curve");
  intersectionCurve.setObjColor(colPolygonG);
  intersectionCurve.setAlphaValue(DEFAULT_POLYGON_ALPHA);
  intersectionCurve.setDefaultGeoType(DEFAULT_INTERSECTION_CURVE);
  defaultGeoElements.put(DEFAULT_INTERSECTION_CURVE, intersectionCurve);
  GeoAxis3D axis = new GeoAxis3D(cons);
  axis.setLocalVariableLabel("Axis3D");
  axis.setDefaultGeoType(DEFAULT_AXIS3D);
  defaultGeoElements.put(DEFAULT_AXIS3D, axis);
  GeoCurveCartesian3D curve = new GeoCurveCartesian3D(cons);
  curve.setLocalVariableLabel("Curve3D");
  curve.setObjColor(colCurveCartesian3D);
  curve.setDefaultGeoType(DEFAULT_CURVECARTESIAN3D);
  defaultGeoElements.put(DEFAULT_CURVECARTESIAN3D, curve);
  GeoPlane3D plane = new GeoPlane3D(cons);
  plane.setLocalVariableLabel("Plane3D");
  plane.setObjColor(colPlane3D);
  plane.setAlphaValue(DEFAULT_PLANE3D_ALPHA);
  plane.setLineThickness(DEFAULT_PLANE3D_GRID_THICKNESS);
  plane.setFading(DEFAULT_PLANE3D_FADING);
  plane.setDefaultGeoType(DEFAULT_PLANE3D);
  defaultGeoElements.put(DEFAULT_PLANE3D, plane);
  GeoPolyhedron polyhedron = new GeoPolyhedron(cons, GeoPolyhedron.Type.UNKNOWN);
  polyhedron.setLocalVariableLabel("Polyhedron");
  polyhedron.setObjColor(colPolyhedron());
  polyhedron.setAlphaValue(DEFAULT_POLYHEDRON_ALPHA);
  polyhedron.setDefaultGeoType(DEFAULT_POLYHEDRON);
  defaultGeoElements.put(DEFAULT_POLYHEDRON, polyhedron);
  GeoPolyhedron archimedean = new GeoPolyhedron(cons, GeoPolyhedron.Type.UNKNOWN);
  archimedean.setLocalVariableLabel("Archimedean");
  archimedean.setObjColor(colQuadricAndArchimedeanSolid);
  archimedean.setAlphaValue(DEFAULT_POLYHEDRON_ALPHA);
  archimedean.setDefaultGeoType(DEFAULT_ARCHIMDEAN_SOLID);
  defaultGeoElements.put(DEFAULT_ARCHIMDEAN_SOLID, archimedean);
  GeoPolyhedron pyramid = new GeoPolyhedron(cons, GeoPolyhedron.Type.PYRAMID);
  pyramid.setLocalVariableLabel("Pyramid");
  pyramid.setObjColor(colPyramidAndCone);
  pyramid.setAlphaValue(DEFAULT_POLYHEDRON_ALPHA);
  pyramid.setDefaultGeoType(DEFAULT_PYRAMID_AND_CONE);
  defaultGeoElements.put(DEFAULT_PYRAMID_AND_CONE, pyramid);
  GeoPolyhedron prism = new GeoPolyhedron(cons, GeoPolyhedron.Type.PRISM);
  prism.setLocalVariableLabel("Prism");
  prism.setObjColor(colPrismAndCylinder);
  prism.setAlphaValue(DEFAULT_POLYHEDRON_ALPHA);
  prism.setDefaultGeoType(DEFAULT_PRISM_AND_CYLINDER);
  defaultGeoElements.put(DEFAULT_PRISM_AND_CYLINDER, prism);
  GeoPolyhedronNet polyhedronNet = new GeoPolyhedronNet(cons);
  polyhedronNet.setLocalVariableLabel("Net");
  polyhedronNet.setObjColor(colPolyhedron());
  polyhedronNet.setAlphaValue(DEFAULT_POLYHEDRON_ALPHA);
  polyhedronNet.setDefaultGeoType(DEFAULT_NET);
  defaultGeoElements.put(DEFAULT_NET, polyhedronNet);
  GeoQuadric3D quadric = new GeoQuadric3D(cons);
  quadric.setLocalVariableLabel("Quadric");
  quadric.setObjColor(colQuadricAndArchimedeanSolid);
  quadric.setAlphaValue(DEFAULT_QUADRIC_ALPHA_NEW);
  quadric.setDefaultGeoType(DEFAULT_QUADRIC);
  defaultGeoElements.put(DEFAULT_QUADRIC, quadric);
  GeoSurfaceCartesian3D surface = new GeoSurfaceCartesian3D(cons);
  surface.setLocalVariableLabel("surface");
  surface.setObjColor(colQuadric);
  surface.setAlphaValue(DEFAULT_QUADRIC_ALPHA);
  surface.setLineThickness(DEFAULT_SURFACE_GRID_THICKNESS);
  surface.setDefaultGeoType(DEFAULT_SURFACECARTESIAN3D);
  surface.setAutoColor(true);
  defaultGeoElements.put(DEFAULT_SURFACECARTESIAN3D, surface);
  cons.setIgnoringNewTypes(false);
 }
 public int getDefaultType(GeoElement geo) {
  switch (geo.getGeoClassType()) {
   case POINT3D:
    return getDefaultType(geo, GeoClass.POINT);
   case ANGLE3D:
    return getDefaultType(geo, GeoClass.ANGLE);
   case LINE3D:
    if (((GeoLine3D) geo).isIntersection()) {
     return DEFAULT_INTERSECTION_CURVE;
    }
    return getDefaultType(geo, GeoClass.LINE);
   case SEGMENT3D:
    if (((GeoSegment3D) geo).isIntersection()) {
     return DEFAULT_INTERSECTION_CURVE;
    }
    return getDefaultType(geo, GeoClass.SEGMENT);
   case RAY3D:
    if (((GeoRay3D) geo).isIntersection()) {
     return DEFAULT_INTERSECTION_CURVE;
    }
    return getDefaultType(geo, GeoClass.RAY);
   case AXIS3D:
    return DEFAULT_AXIS3D;
   case VECTOR3D:
    return getDefaultType(geo, GeoClass.VECTOR);
   case CONIC3D:
   case CONICSECTION:
    if (((GeoConic3D) geo).isIntersection()) {
     return DEFAULT_INTERSECTION_CURVE;
    }
    return getDefaultType(geo, GeoClass.CONIC);
   case CURVE_CARTESIAN3D:
    return DEFAULT_CURVECARTESIAN3D;
   case PLANE3D:
    return DEFAULT_PLANE3D;
   case POLYGON3D:
    if (((GeoPolygon3D) geo).isIntersection()) {
     return DEFAULT_INTERSECTION_CURVE;
    }
    return getDefaultType(geo, GeoClass.POLYGON);
   case POLYHEDRON:
    switch (((GeoPolyhedron) geo).getPolyhedronType()) {
     case PYRAMID:
     case TETRAHEDRON:
      return DEFAULT_PYRAMID_AND_CONE;
     case PRISM:
     case CUBE:
      return DEFAULT_PRISM_AND_CYLINDER;
     case OCTAHEDRON:
     case DODECAHEDRON:
     case ICOSAHEDRON:
      return DEFAULT_ARCHIMDEAN_SOLID;
     default:
      return DEFAULT_POLYHEDRON;
    }
   case QUADRIC_LIMITED:
    switch (((GeoQuadricND) geo).getType()) {
     case GeoQuadricNDConstants.QUADRIC_CONE:
      return DEFAULT_PYRAMID_AND_CONE;
     case GeoQuadricNDConstants.QUADRIC_CYLINDER:
      return DEFAULT_PRISM_AND_CYLINDER;
     default:
      return DEFAULT_POLYHEDRON;
    }
   case NET:
    return DEFAULT_NET;
   case QUADRIC:
   case QUADRIC_PART:
    return DEFAULT_QUADRIC;
   case SURFACECARTESIAN:
   case SURFACECARTESIAN3D:
    return DEFAULT_SURFACECARTESIAN3D;
  }
  return super.getDefaultType(geo);
 }
 protected int getDefaultTypeForFunctionNVar(GeoFunctionNVar geo) {
  if (geo.isFun2Var()) {
   return DEFAULT_SURFACECARTESIAN3D;
  }
  return super.getDefaultTypeForFunctionNVar(geo);
 }
}
```

### FILE: geogebra3D/kernel3D/GeoFactory3D.java
```java
public class GeoFactory3D extends GeoFactory {
 public GeoElement createGeoElement(Construction cons1, String type) throws MyError {
  switch (type) {
   case "axis3d":
    return new GeoAxis3D(cons1);
   case "angle3d":
    return new GeoAngle3D(cons1);
   case "conic3d":
    return new GeoConic3D(cons1, new CoordSys(2));
   case "curvecartesian3d":
    return new GeoCurveCartesian3D(cons1);
   case "line3d":
    return new GeoLine3D(cons1);
   case "point3d":
    return new GeoPoint3D(cons1);
   case "polygon3d":
    return new GeoPolygon3D(cons1, null);
   case "plane3d":
    return new GeoPlane3D(cons1);
   case "polyline3d":
    return new GeoPolyLine3D(cons1, null);
   case "polyhedron":
    return new GeoPolyhedron(cons1, GeoPolyhedron.Type.UNKNOWN);
   case "quadric3d":
   case "quadric":
    GeoQuadric3D quadric = new GeoQuadric3D(cons1);
    quadric.showUndefinedInAlgebraView(true);
    return quadric;
   case "quadric3dpart":
    return new GeoQuadric3DPart(cons1);
   case "quadric3dlimited":
    return new GeoQuadric3DLimited(cons1, GeoQuadricNDConstants.QUADRIC_NOT_CLASSIFIED);
   case "ray3d":
    return new GeoRay3D(cons1);
   case "segment3d":
    return new GeoSegment3D(cons1);
   case "surfacecartesian3d":
    return new GeoSurfaceCartesian3D(cons1);
   case "vector3d":
    return new GeoVector3D(cons1);
   default:
    return super.createGeoElement(cons1, type);
  }
 }
 public GeoElement copy3D(GeoElement geo) {
  switch (geo.getGeoClassType()) {
   case POINT:
    return new GeoPoint3D((GeoPointND) geo);
   case VECTOR:
    GeoVector3D v = new GeoVector3D(geo.getConstruction());
    v.set(geo);
    return v;
   case LINE:
   case AXIS:
    GeoElement ret = new GeoLine3D(geo.getConstruction());
    ret.set(geo);
    return ret;
   case SEGMENT:
    ret = new GeoSegment3D(geo.getConstruction());
    ret.set(geo);
    return ret;
   case RAY:
    ret = new GeoRay3D(geo.getConstruction());
    ret.set(geo);
    return ret;
   case POLYGON:
    ret = new GeoPolygon3D(geo.getConstruction());
    ret.set(geo);
    return ret;
   case CONIC:
    return new GeoConic3D((GeoConicND) geo);
   case CONICPART:
    return new GeoConicPart3D((GeoConicPartND) geo);
   case IMPLICIT_POLY:
    return new GeoImplicitCurve3D((GeoImplicitCurve) geo);
   case POLYLINE:
    ret = new GeoPolyLine3D(geo.getConstruction());
    ret.set(geo);
    return ret;
   default:
    return super.copy3D(geo);
  }
 }
 public GeoVectorND newVector(int dimension, Construction cons) {
  if (dimension == 3) {
   return new GeoVector3D(cons);
  }
  return new GeoVector(cons);
 }
 public GeoElement copyInternal3D(Construction cons1, GeoElement geo) {
  switch (geo.getGeoClassType()) {
   case POLYGON:
    GeoPolygon3D poly = new GeoPolygon3D(cons1, null);
    ((GeoPolygon) geo).copyInternal(cons1, poly);
    return poly;
   case CONICPART:
    return new GeoConicPart3D((GeoConicPartND) geo);
   case RAY:
    GeoElement ret =
      new GeoRay3D(geo.getConstruction(), new GeoPoint3D(((GeoRayND) geo).getStartPoint()));
    ret.set(geo);
    return ret;
   case SEGMENT:
    ret = new GeoSegment3D(
      geo.getConstruction(),
      new GeoPoint3D(((GeoSegmentND) geo).getStartPoint()),
      new GeoPoint3D(((GeoSegmentND) geo).getEndPoint()));
    ret.set(geo);
    return ret;
   case POLYLINE:
    ret = new GeoPolyLine3D(cons1);
    ret.set(geo);
    return ret;
   default:
    return super.copyInternal3D(cons1, geo);
  }
 }
 public GeoPointND newPoint(int dimension, Construction cons) {
  return dimension == 3 ? new GeoPoint3D(cons) : new GeoPoint(cons);
 }
 public GeoConicND newConic(int dimension, Construction cons) {
  return dimension == 3 ? new GeoConic3D(cons, new CoordSys(2)) : new GeoConic(cons);
 }
 public GeoCurveCartesianND newCurve(int dim, Construction cons) {
  if (dim == 3) {
   return new GeoCurveCartesian3D(cons);
  }
  return new GeoCurveCartesian(cons);
 }
 public GeoSurfaceCartesianND newSurface(
   Construction cons, ExpressionNode point, FunctionNVar[] fun) {
  if (fun.length == 2) {
   return new GeoSurfaceCartesian2D(cons, point, fun);
  }
  return new GeoSurfaceCartesian3D(cons, point, fun);
 }
 public GeoLocusND<? extends MyPoint> newLocus(int dimension, Construction cons) {
  return dimension == 3 ? new GeoLocus3D(cons) : new GeoLocus(cons);
 }
}
```

### FILE: geogebra3D/kernel3D/Kernel3D.java
```java
public class Kernel3D extends Kernel {
 private double zmin3;
 private double zmax3;
 private double zscale3;
 public Kernel3D(App app, GeoFactory factory) {
  super(app, factory);
 }
 public GeoAxis3D getZAxis3D() {
  return (GeoAxis3D) cons.getZAxis();
 }
 public GeoPlane3DConstant getXOYPlane() {
  return (GeoPlane3DConstant) cons.getXOYPlane();
 }
 public GeoSpace getSpace() {
  return (GeoSpace) cons.getSpace();
 }
 public Manager3DInterface newManager3D(Kernel kernel) {
  return new Manager3D(kernel);
 }
 public boolean isZvarAllowed() {
  return false;
 }
 protected void newConstruction() {
  cons = new Construction(this);
 }
 public MyXMLHandler newMyXMLHandler(Kernel kernel, Construction construction) {
  return new MyXMLHandler3D(kernel, construction);
 }
 public ExpressionNodeEvaluator newExpressionNodeEvaluator(Kernel kernel) {
  return new ExpressionNodeEvaluator3D(app.getLocalization(), kernel);
 }
 public AlgebraProcessor newAlgebraProcessor(Kernel kernel) {
  return new AlgebraProcessor3D(kernel, app.newCommandDispatcher(kernel));
 }
 public TreeSet<GeoElement> getPointSet() {
  TreeSet<GeoElement> t3d = getConstruction().getGeoSetLabelOrder(GeoClass.POINT3D);
  TreeSet<GeoElement> t = super.getPointSet();
  t.addAll(t3d);
  return t;
 }
 public boolean handleCoords(GeoElement geo, Map<String, String> attrs) {
  if (geo instanceof GeoLine3D line) {
   try {
    double ox = Double.parseDouble(attrs.get("ox"));
    double oy = Double.parseDouble(attrs.get("oy"));
    double oz = Double.parseDouble(attrs.get("oz"));
    double ow = Double.parseDouble(attrs.get("ow"));
    double vx = Double.parseDouble(attrs.get("vx"));
    double vy = Double.parseDouble(attrs.get("vy"));
    double vz = Double.parseDouble(attrs.get("vz"));
    double vw = Double.parseDouble(attrs.get("vw"));
    line.setCoord(new Coords(ox, oy, oz, ow), new Coords(vx, vy, vz, vw));
    return true;
   } catch (Exception e) {
    return false;
   }
  }
  if (geo instanceof GeoConic3D conic && geo.isIndependent()) {
   try {
    double ox = Double.parseDouble(attrs.get("ox"));
    double oy = Double.parseDouble(attrs.get("oy"));
    double oz = Double.parseDouble(attrs.get("oz"));
    double ow = Double.parseDouble(attrs.get("ow"));
    double vx = Double.parseDouble(attrs.get("vx"));
    double vy = Double.parseDouble(attrs.get("vy"));
    double vz = Double.parseDouble(attrs.get("vz"));
    double wx = Double.parseDouble(attrs.get("wx"));
    double wy = Double.parseDouble(attrs.get("wy"));
    double wz = Double.parseDouble(attrs.get("wz"));
    CoordSys cs = conic.getCoordSys();
    if (cs == null) {
     cs = new CoordSys(2);
    }
    cs.addPoint(new Coords(ox, oy, oz, ow));
    cs.addVector(new Coords(vx, vy, vz));
    cs.addVector(new Coords(wx, wy, wz));
    cs.makeOrthoMatrix(false, false);
    conic.setCoordSys(cs);
    return true;
   } catch (Exception e) {
    return false;
   }
  }
  if (!(geo instanceof GeoCoords4D coords4D)) {
   return super.handleCoords(geo, attrs);
  }
  if (geo.getParentAlgorithm() != null && !geo.isPointInRegion() && !geo.isPointOnPath()) {
   return true;
  }
  try {
   double x = Double.parseDouble(attrs.get("x"));
   double y = Double.parseDouble(attrs.get("y"));
   double z = Double.parseDouble(attrs.get("z"));
   double w = Double.parseDouble(attrs.get("w"));
   coords4D.setCoords(x, y, z, w);
   return true;
  } catch (Exception e) {
   return false;
  }
 }
 public GeoPlane3D getDefaultPlane() {
  return getXOYPlane();
 }
 public final GeoRayND rayND(String label, GeoPointND P, GeoPointND Q) {
  if (P.isGeoElement3D() || Q.isGeoElement3D()) {
   return getManager3D().ray3D(label, P, Q);
  }
  return super.ray(label, (GeoPoint) P, (GeoPoint) Q);
 }
 public final GeoSegmentND segmentND(String label, GeoPointND P, GeoPointND Q) {
  if (P.isGeoElement3D() || Q.isGeoElement3D()) {
   return getManager3D().segment3D(label, P, Q);
  }
  return super.segment(label, (GeoPoint) P, (GeoPoint) Q);
 }
 public final GeoElement[] polygonND(String[] labels, GeoPointND[] points) {
  boolean is3D = false;
  for (int i = 0; i < points.length && !is3D; i++) {
   if (points[i].isGeoElement3D()) {
    is3D = true;
   }
  }
  if (is3D) {
   return getManager3D().polygon3D(labels, points);
  }
  return super.polygon(labels, points);
 }
 public GeoElement[] polyLineND(String label, GeoPointND[] points) {
  boolean is3D = false;
  for (int i = 0; i < points.length && !is3D; i++) {
   if (points[i].isGeoElement3D()) {
    is3D = true;
   }
  }
  if (is3D) {
   return getManager3D().polyLine3D(label, points);
  }
  return super.polyLine(label, points);
 }
 protected AlgoDispatcher newAlgoDispatcher(Construction cons1) {
  return new AlgoDispatcher3D(cons1);
 }
 public double getZmax(int i) {
  if (i == 2) {
   return zmax3;
  }
  return super.getZmax(i);
 }
 public double getZmin(int i) {
  if (i == 2) {
   return zmin3;
  }
  return super.getZmin(i);
 }
 public double getZscale(int i) {
  if (i == 2) {
   return zscale3;
  }
  return super.getZscale(i);
 }
 public final void setEuclidianView3DBounds(
   int view,
   double xmin,
   double xmax,
   double ymin,
   double ymax,
   double zmin,
   double zmax,
   double xscale,
   double yscale,
   double zscale) {
  prolongGraphicsBoundArrays(3);
  this.xmin[2] = xmin;
  this.xmax[2] = xmax;
  this.ymin[2] = ymin;
  this.ymax[2] = ymax;
  this.zmin3 = zmin;
  this.zmax3 = zmax;
  this.xscale[2] = xscale;
  this.yscale[2] = yscale;
  this.zscale3 = zscale;
  notifyEuclidianViewCE(EVProperty.ZOOM);
 }
 public GeoPointND rigidPolygonPointOnCircle(GeoConicND circle, GeoPointND point1) {
  if (circle.isGeoElement3D()) {
   return getManager3D()
     .point3D(
       null,
       circle,
       point1.getInhomX(),
       point1.getInhomY(),
       point1.getInhomZ(),
       false,
       true);
  }
  return super.rigidPolygonPointOnCircle(circle, point1);
 }
 public GeoElement wrapInVector(GeoPointND pt) {
  if (pt instanceof GeoPoint3D) {
   AlgoVectorPoint3D algo = new AlgoVectorPoint3D(cons, pt);
   cons.removeFromConstructionList(algo);
   return (GeoElement) algo.getVector();
  }
  AlgoVectorPoint algo = new AlgoVectorPoint(cons, pt);
  cons.removeFromConstructionList(algo);
  return (GeoElement) algo.getVector();
 }
 public GeoPointND wrapInPoint(GeoVectorND vec) {
  if (vec instanceof GeoVector3D) {
   AlgoPointVector3D algo = new AlgoPointVector3D(cons, cons.getOrigin(), vec);
   cons.removeFromConstructionList(algo);
   return algo.getQ();
  }
  AlgoPointVector algo = new AlgoPointVector(cons, cons.getOrigin(), vec);
  cons.removeFromConstructionList(algo);
  return algo.getQ();
 }
 public ConstructionCompanion createConstructionCompanion(Construction cons1) {
  return new ConstructionCompanion3D(cons1);
 }
}
```

### FILE: geogebra3D/kernel3D/MyPoint3D.java
```java
public class MyPoint3D extends MyPoint {
 public double z;
 public MyPoint3D(double x, double y, double z, SegmentType segmentType) {
  super(x, y, segmentType);
  this.z = z;
 }
 public MyPoint3D() {
  super();
 }
 public boolean isEqual(double px, double py, double pz) {
  return super.isEqual(px, py) && DoubleUtil.isEqual(z, pz, Kernel.MIN_PRECISION);
 }
 public String toString() {
  return "(" + x + ", " + y + ", " + z + ")";
 }
 public double getZ() {
  return z;
 }
 public void setLocation(double x, double y, double z) {
  setLocation(x, y);
  this.z = z;
 }
 public double distance(GPoint2D q) {
  return Math.sqrt(distanceSq(q));
 }
 public double distanceSq(GPoint2D to) {
  double vx = to.getX() - x;
  double vy = to.getY() - y;
  double vz = to.getZ() - z;
  return vx * vx + vy * vy + vz * vz;
 }
 public boolean isEqual(MyPoint3D point) {
  return isEqual(point.x, point.y, point.z);
 }
 public boolean isFinite() {
  return super.isFinite() && Double.isFinite(z);
 }
 public MyPoint3D barycenter(double t, MyPoint point2, SegmentType type) {
  return new MyPoint3D(
    (1 - t) * x + t * point2.x,
    (1 - t) * y + t * point2.y,
    (1 - t) * z + t * point2.getZ(),
    type);
 }
 public MyPoint copy() {
  return new MyPoint3D(x, y, z, getSegmentType());
 }
}
```

### FILE: geogebra3D/kernel3D/commands/AlgebraProcessor3D.java
```java
public class AlgebraProcessor3D extends AlgebraProcessor {
 public AlgebraProcessor3D(Kernel kernel, CommandDispatcher cd) {
  super(kernel, cd);
 }
 protected GeoElement[] processPointVector3D(
   ExpressionNode n, ExpressionValue evaluate, EvalInfo evalInfo) {
  String label = n.getLabel();
  double[] p = ((Vector3DValue) evaluate).getPointAsDouble();
  int mode = ((Vector3DValue) evaluate).getToStringMode();
  if (evaluate instanceof MyVecNDNode) {
   if (((MyVecNDNode) evaluate).isCASVector()) {
    n.setForceVector();
   }
  }
  GeoElement[] ret = new GeoElement[1];
  boolean isIndependent = n.isConstant();
  if (label != null) {
   if (!(n.isForcedPoint() || n.isForcedVector())) { 
    if (StringUtil.isLowerCase(label.charAt(0))) {
     n.setForceVector();
    } else {
     n.setForcePoint();
    }
   }
  }
  boolean isVector = n.shouldEvaluateToGeoVector();
  if (isIndependent) {
   double x = p[0];
   double y = p[1];
   double z = p[2];
   if (isVector) {
    ret[0] = kernel.getManager3D().vector3D(x, y, z);
   } else {
    ret[0] = kernel.getManager3D().point3D(x, y, z, false).toGeoElement();
   }
   ret[0].setDefinition(n);
  } else {
   if (isVector) {
    ret[0] = kernel.getManager3D().dependentVector3D(n);
   } else {
    ret[0] = kernel.getManager3D().dependentPoint3D(n, true).toGeoElement();
   }
  }
  if (mode == Kernel.COORD_SPHERICAL) {
   ((GeoVec4D) ret[0]).setMode(Kernel.COORD_SPHERICAL);
  }
  if (evalInfo.isLabelOutput()) {
   ret[0].setLabel(label);
  }
  return ret;
 }
 protected void checkNoTermsInZ(Equation equ) {
  if (equ.containsZ()) {
   switch (equ.degree()) {
    case 0:
    case 1:
     equ.setForcePlane();
     break;
    case 2:
     equ.setForceQuadric();
     break;
    default:
     equ.setForceSurface();
     break;
   }
  }
 }
 protected GeoElement[] processLine(Equation equ, ExpressionNode def, EvalInfo info) {
  if (equ.isForcedLine() && !equ.containsFreeFunctionVariable("z")) {
   return super.processLine(equ, def, info);
  }
  if (equ.isForcedPlane() || kernel.isParsingFor3D()) {
   return processPlane(equ, def, info);
  }
  return super.processLine(equ, def, info);
 }
 public GeoElement[] processConic(Equation equ, ExpressionNode def, EvalInfo info) {
  if (equ.isForcedConic()) {
   return super.processConic(equ, def, info);
  }
  if (equ.isForcedQuadric()
    || kernel.getApplication().getActiveEuclidianView().isEuclidianView3D()) {
   return processQuadric(equ, def, info);
  }
  return super.processConic(equ, def, info);
 }
 private GeoElement[] processQuadric(Equation equ, ExpressionNode def, EvalInfo info) {
  GeoQuadric3D quadric;
  String label = equ.getLabel();
  Polynomial lhs = equ.getNormalForm();
  boolean isIndependent = lhs.isConstant(info);
  if (isIndependent) {
   double xx = lhs.getCoeffValue("xx");
   double yy = lhs.getCoeffValue("yy");
   double zz = lhs.getCoeffValue("zz");
   double c = lhs.getCoeffValue("");
   double xy = lhs.getCoeffValue("xy") / 2;
   double xz = lhs.getCoeffValue("xz") / 2;
   double yz = lhs.getCoeffValue("yz") / 2;
   double x = lhs.getCoeffValue("x") / 2;
   double y = lhs.getCoeffValue("y") / 2;
   double z = lhs.getCoeffValue("z") / 2;
   double[] coeffs = {xx, yy, zz, c, xy, xz, yz, x, y, z};
   quadric = new GeoQuadric3D(cons, coeffs);
  } else {
   quadric = (GeoQuadric3D) kernel.getManager3D().dependentQuadric3D(equ);
  }
  quadric.setDefinition(def);
  quadric.showUndefinedInAlgebraView(true);
  if (quadric.getType() == GeoQuadricNDConstants.QUADRIC_SPHERE) {
   quadric.setToSpecificForm();
  } else {
   quadric.setToImplicitForm();
  }
  setEquationLabelAndVisualStyle(quadric, label, info);
  return new GeoElement[] {quadric};
 }
 private GeoElement[] processPlane(Equation equ, ExpressionNode def, EvalInfo info) {
  GeoPlane3D plane;
  String label = equ.getLabel();
  Polynomial lhs = equ.getNormalForm();
  boolean isIndependent = lhs.isConstant(info);
  if (isIndependent) {
   double a = lhs.getCoeffValue("x");
   double b = lhs.getCoeffValue("y");
   double c = lhs.getCoeffValue("z");
   double d = lhs.getCoeffValue("");
   plane = (GeoPlane3D) kernel.getManager3D().plane3D(a, b, c, d);
   plane.setDefinition(def);
  } else {
   plane = (GeoPlane3D) kernel.getManager3D().dependentPlane3D(equ);
  }
  setEquationLabelAndVisualStyle(plane, label, info);
  return array(plane);
 }
 public ParametricProcessor getParamProcessor() {
  if (this.paramProcessor == null) {
   paramProcessor = new ParametricProcessor3D(kernel, this);
  }
  return paramProcessor;
 }
 public GeoElement[] processImplicitPoly(
   Equation equ, ExpressionNode definition, EvalInfo info, ExpressionValue evaluatedDef) {
  if (PreviewFeature.isAvailable(PreviewFeature.IMPLICIT_SURFACES)
    || equ.isForcedQuadric()
    || equ.isForcedPlane()) {
   Polynomial lhs = equ.getNormalForm();
   boolean isIndependent =
     !equ.isFunctionDependent() && lhs.isConstant(info) && !equ.hasVariableDegree();
   if (kernel.getApplication().getActiveEuclidianView().isEuclidianView3D()
     || equ.isForcedSurface()
     || equ.isForcedPlane()
     || equ.isForcedQuadric()) {
    GeoElement geo;
    if (isIndependent) {
     geo = new GeoImplicitSurface(cons, equ);
    } else {
     AlgoElement surfaceAlgo = new AlgoDependentImplicitSurface(cons, equ);
     geo = surfaceAlgo.getOutput(0);
    }
    geo.setDefinition(definition);
    geo.setLabel(equ.getLabel());
    return new GeoElement[] {geo};
   }
  }
  return super.processImplicitPoly(equ, definition, info, evaluatedDef);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/BasicCommandProcessorFactory3D.java
```java
public class BasicCommandProcessorFactory3D extends BasicCommandProcessorFactory {
 public CommandProcessor getProcessor(Commands command, Kernel kernel) {
  switch (command) {
   case Segment:
    return new CmdSegment3D(kernel);
   case Line:
    return new CmdLine3D(kernel);
   case Ray:
    return new CmdRay3D(kernel);
   case Polygon:
    return new CmdPolygon3D(kernel);
   case Area:
    return new CmdArea3D(kernel);
   case Polyline:
   case PolyLine:
    return new CmdPolyLine3D(kernel);
   case Point:
    return new CmdPoint3D(kernel);
   case Midpoint:
   case Center:
    return new CmdMidpoint3D(kernel);
   case Tangent:
    return new CmdTangent3D(kernel);
   case Diameter:
   case ConjugateDiameter:
    return new CmdDiameter3D(kernel);
   case Circle:
    return new CmdCircle3D(kernel);
   case Ellipse:
    return new CmdEllipseHyperbola3D(kernel, GeoConicNDConstants.CONIC_ELLIPSE);
   case Hyperbola:
    return new CmdEllipseHyperbola3D(kernel, GeoConicNDConstants.CONIC_HYPERBOLA);
   case Conic:
    return new CmdConic3D(kernel);
   case CircumcircleSector:
   case CircumcircularSector:
    return new CmdCircumcircleSector3D(kernel);
   case CircumcircleArc:
   case CircumcircularArc:
    return new CmdCircumcircleArc3D(kernel);
   case Arc:
    return new CmdArcSector3D(kernel, GeoConicNDConstants.CONIC_PART_ARC);
   case Sector:
    return new CmdArcSector3D(kernel, GeoConicNDConstants.CONIC_PART_SECTOR);
   case CircleArc:
   case CircularArc:
    return new CmdCircleArcSector3D(kernel, GeoConicNDConstants.CONIC_PART_ARC);
   case CircleSector:
   case CircularSector:
    return new CmdCircleArcSector3D(kernel, GeoConicNDConstants.CONIC_PART_SECTOR);
   case Semicircle:
    return new CmdSemicircle3D(kernel);
   case Parabola:
    return new CmdParabola3D(kernel);
   case Corner:
    return new CmdCorner3D(kernel);
   case Locus:
    return new CmdLocus3D(kernel);
   case Vertex:
    return new CmdVertex3D(kernel);
   case Focus:
    return new CmdFocus3D(kernel);
   case PerpendicularLine:
   case OrthogonalLine:
    return new CmdOrthogonalLine3D(kernel);
   case LineBisector:
   case PerpendicularBisector:
    return new CmdLineBisector3D(kernel);
   case AngleBisector:
   case AngularBisector:
    return new CmdAngularBisector3D(kernel);
   case PerpendicularVector:
   case OrthogonalVector:
    return new CmdOrthogonalVector3D(kernel);
   case UnitPerpendicularVector:
   case UnitOrthogonalVector:
    return new CmdUnitOrthogonalVector3D(kernel);
   case Direction:
    return new CmdUnitVector3D(kernel, false);
   case UnitVector:
    return new CmdUnitVector3D(kernel, true);
   case Curve:
   case CurveCartesian:
    return new CmdCurveCartesian3D(kernel);
   case PointIn:
    return new CmdPointIn3D(kernel);
   case Distance:
    return new CmdDistance3D(kernel);
   case Intersect:
    return new CmdIntersect3D(kernel);
   case Angle:
    return new CmdAngle3D(kernel);
   case InteriorAngles:
    return new CmdInteriorAngles3D(kernel);
   case Translate:
    return new CmdTranslate3D(kernel);
   case Rotate:
    return new CmdRotate3D(kernel);
   case Reflect:
   case Mirror:
    return new CmdMirror3D(kernel);
   case Dilate:
    return new CmdDilate3D(kernel);
   case Length:
    return new CmdLength3D(kernel);
   default:
    return super.getProcessor(command, kernel);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdAngle3D.java
```java
public class CmdAngle3D extends CmdAngle {
 public CmdAngle3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process(Command c, int n, boolean[] ok, EvalInfo info) throws MyError {
  if (n == 4) {
   GeoElement[] arg = resArgs(c, info);
   if ((ok[0] = arg[0].isGeoPoint())
     && (ok[1] = arg[1].isGeoPoint())
     && (ok[2] = arg[2].isGeoPoint())
     && (ok[3] = arg[3] instanceof GeoDirectionND)) {
    if (!arg[0].isGeoElement3D()
      && !arg[1].isGeoElement3D()
      && !arg[2].isGeoElement3D()
      && arg[3] == kernel.getXOYPlane()) { 
     return angle(c.getLabel(), (GeoPointND) arg[0], (GeoPointND) arg[1], (GeoPointND) arg[2]);
    }
    GeoElement[] ret = {
     kernel
       .getManager3D()
       .angle3D(
         c.getLabel(),
         (GeoPointND) arg[0],
         (GeoPointND) arg[1],
         (GeoPointND) arg[2],
         (GeoDirectionND) arg[3])
    };
    return ret;
   }
   throw argErr(c, getBadArg(ok, arg));
  }
  return super.process(c, n, ok, info);
 }
 protected GeoElement[] process2(Command c, GeoElement[] arg, boolean[] ok) {
  if ((ok[0] = arg[0].isGeoLine()) && (ok[1] = arg[1].isGeoPlane())) {
   GeoElement[] ret = {
    kernel.getManager3D().angle3D(c.getLabel(), (GeoLineND) arg[0], (GeoPlane3D) arg[1])
   };
   return ret;
  }
  if ((ok[1] = arg[1].isGeoLine()) && (ok[0] = arg[0].isGeoPlane())) {
   GeoElement[] ret = {
    kernel.getManager3D().angle3D(c.getLabel(), (GeoLineND) arg[1], (GeoPlane3D) arg[0])
   };
   return ret;
  }
  if ((ok[0] = arg[0].isGeoPlane()) && (ok[1] = arg[1].isGeoPlane())) {
   GeoElement[] ret = {
    kernel.getManager3D().angle3D(c.getLabel(), (GeoPlane3D) arg[0], (GeoPlane3D) arg[1])
   };
   return ret;
  }
  if ((ok[0] = arg[0].isGeoPolygon()) && (ok[1] = arg[1] instanceof GeoDirectionND)) {
   if (!arg[0].isGeoElement3D() && arg[1] == kernel.getXOYPlane()) { 
    return super.angle(c.getLabels(), (GeoPolygon) arg[0]);
   }
   GeoElement[] ret = kernel
     .getManager3D()
     .angles3D(c.getLabels(), (GeoPolygon) arg[0], (GeoDirectionND) arg[1]);
   return ret;
  }
  return super.process2(c, arg, ok);
 }
 protected GeoElement[] process3(Command c, GeoElement[] arg, boolean[] ok) {
  if ((ok[0] = arg[0].isGeoLine())
    && (ok[1] = arg[1].isGeoLine())
    && (ok[2] = arg[2] instanceof GeoDirectionND)) {
   if (!arg[0].isGeoElement3D()
     && !arg[1].isGeoElement3D()
     && arg[2] == kernel.getXOYPlane()) { 
    return super.angle(c.getLabel(), (GeoLineND) arg[0], (GeoLineND) arg[1]);
   }
   GeoElement[] ret = {
    kernel
      .getManager3D()
      .angle3D(c.getLabel(), (GeoLineND) arg[0], (GeoLineND) arg[1], (GeoDirectionND) arg[2])
   };
   return ret;
  }
  if ((ok[0] = arg[0].isGeoVector())
    && (ok[1] = arg[1].isGeoVector())
    && (ok[2] = arg[2] instanceof GeoDirectionND)) {
   if (!arg[0].isGeoElement3D()
     && !arg[1].isGeoElement3D()
     && arg[2] == kernel.getXOYPlane()) { 
    return angle(c.getLabel(), (GeoVectorND) arg[0], (GeoVectorND) arg[1]);
   }
   GeoElement[] ret = {
    kernel
      .getManager3D()
      .angle3D(
        c.getLabel(), (GeoVectorND) arg[0], (GeoVectorND) arg[1], (GeoDirectionND) arg[2])
   };
   return ret;
  }
  return super.process3(c, arg, ok);
 }
 protected GeoElement[] angle(String label, GeoPointND p1, GeoPointND p2, GeoPointND p3) {
  if (p1.isGeoElement3D() || p2.isGeoElement3D() || p3.isGeoElement3D()) {
   GeoElement[] ret = {kernel.getManager3D().angle3D(label, p1, p2, p3)};
   return ret;
  }
  return super.angle(label, p1, p2, p3);
 }
 protected GeoElement[] angle(String label, GeoLineND g, GeoLineND h) {
  if (g.isGeoElement3D() || h.isGeoElement3D()) {
   GeoElement[] ret = {kernel.getManager3D().angle3D(label, g, h)};
   return ret;
  }
  return super.angle(label, g, h);
 }
 protected GeoElement[] angle(String label, GeoVectorND v, GeoVectorND w) {
  if (v.isGeoElement3D() || w.isGeoElement3D()) {
   GeoElement[] ret = {kernel.getManager3D().angle3D(label, v, w)};
   return ret;
  }
  return super.angle(label, v, w);
 }
 protected GeoElement[] anglePointOrVector(String label, GeoElement v) {
  if (v.isGeoElement3D()) {
   AlgoAngleElement3D algo;
   if (v.isGeoVector()) {
    algo = new AlgoAngleVector3D(cons, (GeoVector3D) v);
   } else {
    algo = new AlgoAnglePoint3D(cons, (GeoPoint3D) v);
   }
   GeoElement[] ret = {algo.getAngle()};
   ret[0].setLabel(label);
   return ret;
  }
  return super.anglePointOrVector(label, v);
 }
 protected GeoElement[] angle(String label, GeoConicND c) {
  if (c.isGeoElement3D()) {
   AlgoAngleElement3D algo = new AlgoAngleConic3D(cons, (GeoConic3D) c);
   GeoElement[] ret = {algo.getAngle()};
   ret[0].setLabel(label);
   return ret;
  }
  return super.angle(label, c);
 }
 protected GeoElement[] angle(String[] labels, GeoPolygon p) {
  if (p.isGeoElement3D()) {
   return kernel.getManager3D().angles3D(labels, p);
  }
  return super.angle(labels, p);
 }
 protected GeoElement[] angle(String[] labels, GeoPointND p1, GeoPointND p2, GeoNumberValue a) {
  GeoDirectionND direction = kernel.getApplication().getActiveEuclidianView().getDirection();
  if (direction == kernel.getSpace()) { 
   return new GeoElement[0];
  }
  if (direction == kernel.getXOYPlane() ) { 
   if (p1.isGeoElement3D() || p2.isGeoElement3D()) {
    return kernel.getManager3D().angle(labels, p1, p2, a, kernel.getXOYPlane(), true);
   }
   return super.angle(labels, p1, p2, a);
  }
  return kernel.getManager3D().angle(labels, p1, p2, a, direction, true);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdAngularBisector3D.java
```java
public class CmdAngularBisector3D extends CmdAngularBisector {
 public CmdAngularBisector3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process4(GeoElement[] arg, boolean[] ok, Command c) throws MyError {
  if ((ok[0] = arg[0].isGeoPoint())
    && (ok[1] = arg[1].isGeoPoint())
    && (ok[2] = arg[2].isGeoPoint())
    && (ok[3] = arg[3] instanceof GeoDirectionND)) {
   GeoElement[] ret = {
    kernel
      .getManager3D()
      .angularBisector3D(
        c.getLabel(),
        (GeoPointND) arg[0],
        (GeoPointND) arg[1],
        (GeoPointND) arg[2],
        (GeoDirectionND) arg[3])
   };
   return ret;
  }
  throw argErr(c, getBadArg(ok, arg));
 }
 protected GeoElement[] angularBisector(String[] labels, GeoLineND g, GeoLineND h) {
  if (g.isGeoElement3D() || h.isGeoElement3D()) {
   GeoElement[] ret = kernel.getManager3D().angularBisector3D(labels, g, h);
   return ret;
  }
  return super.angularBisector(labels, g, h);
 }
 protected GeoElement angularBisector(String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  if (A.isGeoElement3D() || B.isGeoElement3D() || C.isGeoElement3D()) {
   return kernel.getManager3D().angularBisector3D(label, A, B, C);
  }
  return super.angularBisector(label, A, B, C);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdArcSector3D.java
```java
public class CmdArcSector3D extends CmdArcSector {
 public CmdArcSector3D(Kernel kernel, int type) {
  super(kernel, type);
 }
 protected GeoElement arcSector(
   String label, GeoConicND conic, GeoNumberValue start, GeoNumberValue end) {
  if (conic.isGeoElement3D()) {
   AlgoConicPartConicParameters3D algo =
     new AlgoConicPartConicParameters3D(cons, label, conic, start, end, type);
   return algo.getConicPart();
  }
  return super.arcSector(label, conic, start, end);
 }
 protected GeoElement arcSector(String label, GeoConicND conic, GeoPointND start, GeoPointND end) {
  if (conic.isGeoElement3D() || start.isGeoElement3D() || end.isGeoElement3D()) {
   AlgoConicPartConicPoints3D algo =
     new AlgoConicPartConicPoints3D(cons, label, conic, start, end, type);
   return algo.getConicPart();
  }
  return super.arcSector(label, conic, start, end);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdArchimedeanSolid.java
```java
public class CmdArchimedeanSolid extends CommandProcessor {
 private Commands name;
 public CmdArchimedeanSolid(Kernel kernel, Commands name) {
  super(kernel);
  this.name = name;
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    ok[0] = arg[0].isGeoPolygon();
    if (ok[0]) {
     GeoElement[] ret = kernel
       .getManager3D()
       .archimedeanSolid(
         c.getLabels(),
         (GeoPolygon) arg[0],
         new GeoBoolean(kernel.getConstruction(), true),
         name);
     return ret;
    }
    throw argErr(c, arg[0]);
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1].isGeoPoint())) {
     GeoElement[] ret = kernel
       .getManager3D()
       .archimedeanSolid(c.getLabels(), (GeoPointND) arg[0], (GeoPointND) arg[1], name);
     return ret;
    }
    if ((ok[0] = arg[0].isGeoPolygon()) && (ok[1] = arg[1].isGeoBoolean())) {
     GeoElement[] ret = kernel
       .getManager3D()
       .archimedeanSolid(c.getLabels(), (GeoPolygon) arg[0], (GeoBoolean) arg[1], name);
     return ret;
    }
    for (int i = 0; i < 2; i++) {
     if (!ok[i]) {
      throw argErr(c, arg[i]);
     }
    }
    break;
   case 3:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1].isGeoPoint())) {
     if (arg[2] instanceof GeoDirectionND) {
      GeoElement[] ret = kernel
        .getManager3D()
        .archimedeanSolid(
          c.getLabels(),
          (GeoPointND) arg[0],
          (GeoPointND) arg[1],
          (GeoDirectionND) arg[2],
          name);
      return ret;
     }
     if (arg[2] instanceof GeoPointND) {
      GeoElement[] ret = kernel
        .getManager3D()
        .archimedeanSolid(
          c.getLabels(),
          (GeoPointND) arg[0],
          (GeoPointND) arg[1],
          (GeoPointND) arg[2],
          name);
      return ret;
     }
     ok[2] = false;
    }
    for (int i = 0; i < 3; i++) {
     if (!ok[i]) {
      throw argErr(c, arg[i]);
     }
    }
    break;
  }
  throw argNumErr(c);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdArea3D.java
```java
public class CmdArea3D extends CmdArea {
 public CmdArea3D(Kernel kernel) {
  super(kernel);
 }
 protected AlgoAreaPoints getAlgoAreaPoints(
   Construction cons1, GeoPointND[] points, boolean is3D) {
  if (is3D) {
   return new AlgoAreaPoints3D(cons1, points);
  }
  return new AlgoAreaPoints(cons1, points);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdBottom.java
```java
public class CmdBottom extends CommandProcessor {
 public CmdBottom(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoQuadric3DLimited) {
     GeoElement[] ret = {
      kernel.getManager3D().quadricBottom(c.getLabel(), (GeoQuadric3DLimited) arg[0])
     };
     return ret;
    }
    throw argErr(c, arg[0]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCircle3D.java
```java
public class CmdCircle3D extends CmdCircle {
 public CmdCircle3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process2(Command c, GeoElement[] arg, boolean[] ok) throws MyError {
  if ((ok[0] = arg[0] instanceof GeoLineND) && (ok[1] = arg[1].isGeoPoint())) {
   GeoElement[] ret = {
    kernel.getManager3D().circle3D(c.getLabel(), (GeoLineND) arg[0], (GeoPointND) arg[1])
   };
   return ret;
  }
  return super.process2(c, arg, ok);
 }
 protected GeoElement circle(String label, GeoPointND a, GeoNumberValue v) {
  GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientationNoSpace(kernel, app);
  if (orientation == null) {
   if (a.isGeoElement3D()) {
    orientation = kernel.getXOYPlane();
   } else {
    return super.circle(label, a, v);
   }
  }
  return kernel.getManager3D().circle3D(label, a, v, orientation);
 }
 protected GeoElement circle(String label, GeoPointND a, GeoPointND b) {
  GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientationNoSpace(kernel, app);
  if (orientation == null) {
   if (a.isGeoElement3D() || b.isGeoElement3D()) {
    orientation = kernel.getXOYPlane();
   } else {
    return super.circle(label, a, b);
   }
  }
  return kernel.getManager3D().circle3D(label, a, b, orientation);
 }
 protected GeoElement[] process3(Command c, GeoElement[] arg, boolean[] ok) throws MyError {
  if ((ok[0] = arg[0].isGeoPoint()) && (ok[2] = arg[2] instanceof GeoDirectionND)) {
   if (arg[1] instanceof GeoNumberValue) {
    GeoElement[] ret = {
     kernel
       .getManager3D()
       .circle3D(c.getLabel(), (GeoPointND) arg[0], (GeoNumberValue) arg[1], (GeoDirectionND)
         arg[2])
    };
    return ret;
   } else if (arg[1].isGeoPoint()) {
    GeoElement[] ret = {
     kernel
       .getManager3D()
       .circle3D(
         c.getLabel(), (GeoPointND) arg[0], (GeoPointND) arg[1], (GeoDirectionND) arg[2])
    };
    return ret;
   }
   ok[1] = false;
  }
  return super.process3(c, arg, ok);
 }
 protected GeoElement circle(String label, GeoPointND a, GeoPointND b, GeoPointND c) {
  if (a.isGeoElement3D() || b.isGeoElement3D() || c.isGeoElement3D()) {
   return kernel.getManager3D().circle3D(label, a, b, c);
  }
  return super.circle(label, a, b, c);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCircleArcSector3D.java
```java
public class CmdCircleArcSector3D extends CmdCircleArcSector {
 public CmdCircleArcSector3D(Kernel kernel, int type) {
  super(kernel, type);
 }
 protected GeoElement circleArcSector(
   String label, GeoPointND center, GeoPointND startPoint, GeoPointND endPoint) {
  GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientation(kernel, app);
  if (orientation != null) {
   return (GeoElement) kernel
     .getManager3D()
     .circleArcSector3D(label, center, startPoint, endPoint, orientation, type);
  }
  if (center.isGeoElement3D() || startPoint.isGeoElement3D() || endPoint.isGeoElement3D()) {
   return (GeoElement)
     kernel.getManager3D().circleArcSector3D(label, center, startPoint, endPoint, type);
  }
  return super.circleArcSector(label, center, startPoint, endPoint);
 }
 protected GeoElement[] process4(Command c, GeoElement[] arg, boolean[] ok) throws MyError {
  if ((ok[0] = arg[0].isGeoPoint())
    && (ok[1] = arg[1].isGeoPoint())
    && (ok[2] = arg[2].isGeoPoint())
    && (ok[3] = arg[3] instanceof GeoDirectionND)) {
   GeoElement[] ret = {
    (GeoElement) kernel
      .getManager3D()
      .circleArcSector3D(
        c.getLabel(),
        (GeoPointND) arg[0],
        (GeoPointND) arg[1],
        (GeoPointND) arg[2],
        (GeoDirectionND) arg[3],
        type)
   };
   return ret;
  }
  return null;
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCircumcircleArc3D.java
```java
public class CmdCircumcircleArc3D extends CmdCircumcircleArc {
 public CmdCircumcircleArc3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement getArc(String label, GeoElement A, GeoElement B, GeoElement C) {
  if (A.isGeoElement3D() || B.isGeoElement3D() || C.isGeoElement3D()) {
   return (GeoElement) kernel
     .getManager3D()
     .circumcircleArc3D(label, (GeoPointND) A, (GeoPointND) B, (GeoPointND) C);
  }
  return super.getArc(label, A, B, C);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCircumcircleSector3D.java
```java
public class CmdCircumcircleSector3D extends CmdCircumcircleSector {
 public CmdCircumcircleSector3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement getSector(String label, GeoElement A, GeoElement B, GeoElement C) {
  if (A.isGeoElement3D() || B.isGeoElement3D() || C.isGeoElement3D()) {
   return (GeoElement) kernel
     .getManager3D()
     .circumcircleSector3D(label, (GeoPointND) A, (GeoPointND) B, (GeoPointND) C);
  }
  return super.getSector(label, A, B, C);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdClosestPointRegion.java
```java
public class CmdClosestPointRegion extends CommandProcessor {
 public CmdClosestPointRegion(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isRegion()) && (ok[1] = arg[1].isGeoPoint())) {
     return new GeoElement[] {
      (GeoElement)
        kernel.getManager3D().closestPoint(c.getLabel(), (Region) arg[0], (GeoPointND)
          arg[1])
     };
    }
    if ((ok[1] = arg[1].isRegion()) && (ok[0] = arg[0].isGeoPoint())) {
     return new GeoElement[] {
      (GeoElement)
        kernel.getManager3D().closestPoint(c.getLabel(), (Region) arg[1], (GeoPointND)
          arg[0])
     };
    }
    if (ok[0] && !ok[1]) {
     throw argErr(c, arg[1]);
    }
    throw argErr(c, arg[0]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCone.java
```java
public class CmdCone extends CommandProcessor {
 public CmdCone(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0] instanceof GeoConicND) && (ok[1] = arg[1] instanceof GeoNumberValue)) {
     return kernel
       .getManager3D()
       .coneLimited(c.getLabels(), (GeoConicND) arg[0], (GeoNumberValue) arg[1]);
    }
    if (!ok[0]) {
     throw argErr(arg[0], c);
    }
    throw argErr(arg[1], c);
   case 3:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint())
      && (ok[1] = arg[1].isGeoVector())
      && (ok[2] = arg[2] instanceof GeoNumberValue)) {
     GeoElement[] ret = {
      kernel
        .getManager3D()
        .cone(c.getLabel(), (GeoPointND) arg[0], (GeoVectorND) arg[1], (GeoNumberValue)
          arg[2])
     };
     return ret;
    } else if ((ok[0] = arg[0].isGeoPoint())
      && (ok[1] = arg[1].isGeoPoint())
      && (ok[2] = arg[2] instanceof GeoNumberValue)) {
     return conePointPointRadius(
       c, (GeoPointND) arg[0], (GeoPointND) arg[1], (GeoNumberValue) arg[2]);
    } else if ((ok[0] = arg[0].isGeoPoint())
      && (ok[1] = arg[1] instanceof GeoLineND)
      && (ok[2] = arg[2] instanceof GeoNumberValue)) {
     GeoElement[] ret = {
      kernel
        .getManager3D()
        .cone(
          c.getLabel(), (GeoPointND) arg[0], (GeoLineND) arg[1], (GeoNumberValue) arg[2])
     };
     return ret;
    } else {
     if (!ok[0]) {
      throw argErr(arg[0], c);
     } else if (!ok[1]) {
      throw argErr(arg[1], c);
     } else {
      throw argErr(arg[2], c);
     }
    }
   default:
    throw argNumErr(c);
  }
 }
 protected GeoElement[] conePointPointRadius(
   Command c, GeoPointND p1, GeoPointND p2, GeoNumberValue r) {
  return kernel.getManager3D().coneLimited(c.getLabels(), p1, p2, r);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdConeInfinite.java
```java
public class CmdConeInfinite extends CmdCone {
 public CmdConeInfinite(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] conePointPointRadius(
   Command c, GeoPointND p1, GeoPointND p2, GeoNumberValue r) {
  return new GeoElement[] {kernel.getManager3D().cone(c.getLabel(), p1, p2, r)};
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdConic3D.java
```java
public class CmdConic3D extends CmdConic {
 public CmdConic3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement conic(String label, GeoElement[] arg) {
  GeoPointND[] points = new GeoPointND[5];
  boolean is3D = false;
  for (int i = 0; i < 5; i++) {
   points[i] = (GeoPointND) arg[i];
   if (!is3D && points[i].isGeoElement3D()) {
    is3D = true;
   }
  }
  if (is3D) {
   return kernel.getManager3D().conic3D(label, points);
  }
  return super.conic(label, arg);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCorner3D.java
```java
public class CmdCorner3D extends CmdVertex3D {
 public CmdCorner3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  if (n == 1) {
   arg = resArgs(c, info);
   if (arg[0] instanceof GeoConicSection) {
    return kernel.getManager3D().corner(c.getLabels(), (GeoConicSection) arg[0]);
   }
  }
  return super.process(c, info);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCurveCartesian3D.java
```java
public class CmdCurveCartesian3D extends CmdCurveCartesian {
 public CmdCurveCartesian3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  if (n == 6) {
   GeoElement[] arg = resArgsLocalNumVar(c, 3, 4, 5);
   if ((ok[0] = arg[0] instanceof GeoNumberValue)
     && (ok[1] = arg[1] instanceof GeoNumberValue)
     && (ok[2] = arg[2] instanceof GeoNumberValue)
     && (ok[3] = arg[3].isGeoNumeric())
     && (ok[4] = arg[4] instanceof GeoNumberValue)
     && (ok[5] = arg[5] instanceof GeoNumberValue)) {
    GeoElement[] ret = new GeoElement[1];
    ret[0] = kernel
      .getManager3D()
      .curveCartesian3D(
        (GeoNumberValue) arg[0], (GeoNumberValue) arg[1],
        (GeoNumberValue) arg[2], (GeoNumeric) arg[3],
        (GeoNumberValue) arg[4], (GeoNumberValue) arg[5]);
    ret[0].setLabel(c.getLabel());
    return ret;
   }
   for (int i = 0; i < n; i++) {
    if (!ok[i]) {
     throw argErr(c, arg[i]);
    }
   }
  }
  return super.process(c, info);
 }
 protected AlgoCurveCartesian getCurveAlgo(
   ExpressionNode point, GeoNumberValue[] coords, GeoElement[] arg) {
  if (coords.length == 2) {
   return super.getCurveAlgo(point, coords, arg);
  }
  return new AlgoCurveCartesian3D(
    cons, point, coords, (GeoNumeric) arg[1], (GeoNumberValue) arg[2], (GeoNumberValue) arg[3]);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCylinder.java
```java
public class CmdCylinder extends CommandProcessor {
 public CmdCylinder(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0] instanceof GeoConicND) && (ok[1] = arg[1] instanceof GeoNumberValue)) {
     return kernel
       .getManager3D()
       .cylinderLimited(c.getLabels(), (GeoConicND) arg[0], (GeoNumberValue) arg[1]);
    } else if ((ok[0] = arg[0] instanceof GeoLineND)
      && (ok[1] = arg[1] instanceof GeoNumberValue)) {
     GeoElement[] ret = {
      kernel.getManager3D().cylinder(c.getLabel(), (GeoLineND) arg[0], (GeoNumberValue)
        arg[1])
     };
     return ret;
    }
    if (!ok[0]) {
     throw argErr(arg[0], c);
    }
    throw argErr(arg[1], c);
   case 3:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint())
      && (ok[1] = arg[1].isGeoVector())
      && (ok[2] = arg[2] instanceof GeoNumberValue)) {
     GeoElement[] ret = {
      kernel
        .getManager3D()
        .cylinder(c.getLabel(), (GeoPointND) arg[0], (GeoVectorND) arg[1], (GeoNumberValue)
          arg[2])
     };
     return ret;
    } else if ((ok[0] = arg[0].isGeoPoint())
      && (ok[1] = arg[1].isGeoPoint())
      && (ok[2] = arg[2] instanceof GeoNumberValue)) {
     return cylinderPointPointRadius(
       c, (GeoPointND) arg[0], (GeoPointND) arg[1], (GeoNumberValue) arg[2]);
    } else {
     if (!ok[0]) {
      throw argErr(arg[0], c);
     } else if (!ok[1]) {
      throw argErr(arg[1], c);
     } else {
      throw argErr(arg[2], c);
     }
    }
   default:
    throw argNumErr(c);
  }
 }
 protected GeoElement[] cylinderPointPointRadius(
   Command c, GeoPointND p1, GeoPointND p2, GeoNumberValue r) {
  return kernel.getManager3D().cylinderLimited(c.getLabels(), p1, p2, r);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdCylinderInfinite.java
```java
public class CmdCylinderInfinite extends CmdCylinder {
 public CmdCylinderInfinite(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] cylinderPointPointRadius(
   Command c, GeoPointND p1, GeoPointND p2, GeoNumberValue r) {
  return new GeoElement[] {kernel.getManager3D().cylinder(c.getLabel(), p1, p2, r)};
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdDiameter3D.java
```java
public class CmdDiameter3D extends CmdDiameter {
 public CmdDiameter3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement diameter(String label, GeoLineND l, GeoConicND c) {
  return kernel.getManager3D().diameterLine3D(label, l, c);
 }
 protected GeoElement diameter(String label, GeoVectorND v, GeoConicND c) {
  return kernel.getManager3D().diameterLine3D(label, v, c);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdDilate3D.java
```java
public class CmdDilate3D extends CmdDilate {
 public CmdDilate3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] dilate(
   String label, GeoElement geoDil, GeoNumberValue r, GeoElement point) {
  if (geoDil.isGeoElement3D() || point.isGeoElement3D()) {
   return kernel.getManager3D().dilate3D(label, geoDil, r, (GeoPointND) point);
  }
  return super.dilate(label, geoDil, r, point);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdDistance3D.java
```java
public class CmdDistance3D extends CmdDistance {
 public CmdDistance3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if (arg[0].isGeoElement3D() || arg[1].isGeoElement3D()) {
     if (arg[0].isGeoLine() && arg[1].isGeoLine()) {
      return new GeoElement[] {
       kernel.getAlgoDispatcher().distance(c.getLabel(), (GeoLineND) arg[0], (GeoLineND)
         arg[1])
      };
     }
     if (arg[0].isGeoPoint() && arg[1].isGeoPlane()) {
      return new GeoElement[] {
       kernel.getManager3D().distance(c.getLabel(), (GeoPointND) arg[0], (GeoPlaneND) arg[1])
      };
     }
     if (arg[1].isGeoPoint() && arg[0].isGeoPlane()) {
      return new GeoElement[] {
       kernel.getManager3D().distance(c.getLabel(), (GeoPointND) arg[1], (GeoPlaneND) arg[0])
      };
     }
     if (arg[1].isGeoPlane() && arg[0].isGeoPlane()) {
      return new GeoElement[] {
       kernel.getManager3D().distance(c.getLabel(), (GeoPlaneND) arg[1], (GeoPlaneND) arg[0])
      };
     }
    }
    return super.process(c, info);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdEllipseHyperbola3D.java
```java
public class CmdEllipseHyperbola3D extends CmdEllipseHyperbola {
 public CmdEllipseHyperbola3D(Kernel kernel, final int type) {
  super(kernel, type);
 }
 protected GeoElement ellipse(String label, GeoPointND a, GeoPointND b, GeoPointND c) {
  if (a.isGeoElement3D() || b.isGeoElement3D() || c.isGeoElement3D()) {
   return kernel.getManager3D().ellipseHyperbola3D(label, a, b, c, type);
  }
  return super.ellipse(label, a, b, c);
 }
 protected GeoElement[] process4(Command c, GeoElement[] arg, boolean[] ok) throws MyError {
  if ((ok[0] = arg[0].isGeoPoint())
    && (ok[1] = arg[1].isGeoPoint())
    && (ok[2] = arg[2].isGeoPoint())
    && (ok[3] = arg[3] instanceof GeoDirectionND)) {
   GeoElement[] ret = {
    kernel
      .getManager3D()
      .ellipseHyperbola3D(
        c.getLabel(),
        (GeoPointND) arg[0],
        (GeoPointND) arg[1],
        (GeoPointND) arg[2],
        (GeoDirectionND) arg[3],
        type)
   };
   return ret;
  }
  if ((ok[0] = arg[0].isGeoPoint())
    && (ok[1] = arg[1].isGeoPoint())
    && (ok[2] = arg[2] instanceof GeoNumberValue)
    && (ok[3] = arg[3] instanceof GeoDirectionND)) {
   GeoElement[] ret = {
    ellipseHyperbola(
      c.getLabel(),
      (GeoPointND) arg[0],
      (GeoPointND) arg[1],
      (GeoNumberValue) arg[2],
      (GeoDirectionND) arg[3])
   };
   return ret;
  }
  return null;
 }
 private GeoElement ellipseHyperbola(
   String label, GeoPointND a, GeoPointND b, GeoNumberValue v, GeoDirectionND orientation) {
  if (!a.isGeoElement3D() && !b.isGeoElement3D() && orientation == kernel.getXOYPlane()) {
   return super.ellipseHyperbola(label, a, b, v);
  }
  AlgoConicFociLength3D algo;
  if (type == GeoConicNDConstants.CONIC_HYPERBOLA) {
   algo = new AlgoHyperbolaFociLength3D(kernel.getConstruction(), label, a, b, v, orientation);
  } else { 
   algo = new AlgoEllipseFociLength3D(kernel.getConstruction(), label, a, b, v, orientation);
  }
  return algo.getConic();
 }
 protected GeoElement ellipseHyperbola(
   String label, GeoPointND a, GeoPointND b, GeoNumberValue v) {
  GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientationNoSpace(kernel, app);
  if (orientation == null) {
   if (a.isGeoElement3D() || b.isGeoElement3D()) {
    orientation = kernel.getXOYPlane();
   } else {
    return super.ellipseHyperbola(label, a, b, v);
   }
  }
  return ellipseHyperbola(label, a, b, v, orientation);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdEnds.java
```java
public class CmdEnds extends CommandProcessor {
 public CmdEnds(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoQuadric3DLimited) {
     AlgoQuadricEnds algo =
       new AlgoQuadricEnds(cons, c.getLabels(), (GeoQuadric3DLimited) arg[0]);
     return algo.getSections();
    }
    throw argErr(c, arg[0]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdFocus3D.java
```java
public class CmdFocus3D extends CmdFocus {
 public CmdFocus3D(Kernel kernel) {
  super(kernel);
 }
 protected AlgoFocus newAlgoFocus(Construction cons1, String[] labels, GeoConicND c) {
  if (c.isGeoElement3D()) {
   return new AlgoFocus3D(cons1, labels, c);
  }
  return super.newAlgoFocus(cons1, labels, c);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdHeight.java
```java
public class CmdHeight extends CommandProcessor {
 public CmdHeight(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof HasHeight) {
     return new GeoElement[] {
      kernel.getManager3D().orientedHeight(c.getLabel(), (HasHeight) arg[0])
     };
    }
    throw argErr(c, arg[0]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdInteriorAngles3D.java
```java
public class CmdInteriorAngles3D extends CmdInteriorAngles {
 public CmdInteriorAngles3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process(String[] labels, GeoPolygon poly) {
  if (poly.isGeoElement3D()) {
   return kernel.getManager3D().angles3D(labels, poly, true);
  }
  return super.process(labels, poly);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdIntersect3D.java
```java
public class CmdIntersect3D extends CmdIntersect {
 public CmdIntersect3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if (arg[0].isGeoElement3D() || arg[1].isGeoElement3D()) {
     if ((arg[0] instanceof GeoLineND) && (arg[1] instanceof GeoConicND)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectLineConic(c.getLabels(), (GeoLineND) arg[0], (GeoConicND) arg[1]);
     } else if ((arg[0] instanceof GeoConicND) && (arg[1] instanceof GeoLineND)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectLineConic(c.getLabels(), (GeoLineND) arg[1], (GeoConicND) arg[0]);
     } else if ((arg[0] instanceof GeoPlane3D) && (arg[1] instanceof GeoConicND)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectPlaneConic(c.getLabels(), (GeoCoordSys2D) arg[0], (GeoConicND) arg[1]);
     } else if ((arg[0] instanceof GeoConicND) && (arg[1] instanceof GeoPlane3D)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectPlaneConic(c.getLabels(), (GeoCoordSys2D) arg[1], (GeoConicND) arg[0]);
     } else if ((arg[0] instanceof GeoPlane3D) && (arg[1] instanceof GeoCurveCartesianND)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectPlaneCurve(
          c.getLabels(), (GeoCoordSys2D) arg[0], (GeoCurveCartesianND) arg[1]);
     } else if ((arg[0] instanceof GeoCurveCartesianND) && (arg[1] instanceof GeoPlane3D)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectPlaneCurve(
          c.getLabels(), (GeoCoordSys2D) arg[1], (GeoCurveCartesianND) arg[0]);
     } else if ((arg[0] instanceof GeoPlane3D) && (arg[1] instanceof GeoPolygon)) {
      return kernel
        .getManager3D()
        .intersectionPoint(c.getLabels(), (GeoPlane3D) arg[0], arg[1]);
     } else if ((arg[0] instanceof GeoPolygon) && (arg[1] instanceof GeoPlane3D)) {
      return kernel
        .getManager3D()
        .intersectionPoint(c.getLabels(), (GeoPlane3D) arg[1], arg[0]);
     } else if ((ok[0] = arg[0].isGeoLine()) && (ok[1] = arg[1] instanceof GeoQuadric3D)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectLineQuadric(c.getLabels(), (GeoLineND) arg[0], (GeoQuadric3D) arg[1]);
     } else if ((ok[0] = arg[0] instanceof GeoQuadric3D) && (ok[1] = arg[1].isGeoLine())) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectLineQuadric(c.getLabels(), (GeoLineND) arg[1], (GeoQuadric3D) arg[0]);
     } else if ((arg[0] instanceof GeoConicND)
       && (arg[1].isGeoConic() || arg[1] instanceof GeoQuadric3D)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectConics(c.getLabels(), (GeoConicND) arg[0], (GeoQuadricND) arg[1]);
     } else if ((arg[1] instanceof GeoConicND)
       && (arg[0].isGeoConic() || arg[0] instanceof GeoQuadric3D)) {
      return (GeoElement[]) kernel
        .getManager3D()
        .intersectConics(c.getLabels(), (GeoConicND) arg[1], (GeoQuadricND) arg[0]);
     }
     else if ((arg[0] instanceof GeoLineND && arg[1] instanceof GeoPolygon)
       || (arg[1] instanceof GeoLineND && arg[0] instanceof GeoPolygon)) {
      return kernel
        .getManager3D()
        .intersectionPoint(c.getLabels(), (GeoLineND) arg[0], (GeoPolygon) arg[1]);
     } else if (arg[0].isGeoPolygon()
       && arg[1].isGeoPolygon()
       && (arg[1] instanceof GeoPolygon3D || arg[0] instanceof GeoPolygon3D)) {
      return kernel
        .getManager3D()
        .intersectionPoint(c.getLabels(), (GeoPolygon) arg[0], (GeoPolygon) arg[1]);
     } else if (arg[0] instanceof GeoLineND && arg[1] instanceof GeoCoordSys2D) {
      GeoPoint3D point = (GeoPoint3D) kernel
        .getManager3D()
        .intersect(c.getLabel(), (GeoLineND) arg[0], (GeoCoordSys2D) arg[1], false);
      kernel.setStringMode(point);
      return new GeoElement[] {point};
     } else if (arg[1] instanceof GeoLineND && arg[0] instanceof GeoCoordSys2D) {
      GeoPoint3D point = (GeoPoint3D) kernel
        .getManager3D()
        .intersect(c.getLabel(), (GeoLineND) arg[1], (GeoCoordSys2D) arg[0], true);
      kernel.setStringMode(point);
      return new GeoElement[] {point};
     } else if (arg[0] instanceof GeoLineND && arg[1] instanceof GeoLineND) {
      GeoPoint3D point = (GeoPoint3D)
        kernel.getManager3D().intersect(c.getLabel(), (GeoLineND) arg[0], (GeoLineND)
          arg[1]);
      kernel.setStringMode(point);
      return new GeoElement[] {point};
     }
     if ((arg[0] instanceof GeoPlaneND) && (arg[1] instanceof GeoPlaneND)) {
      GeoElement[] ret = {
       kernel.getManager3D().intersectPlanes(c.getLabel(), (GeoPlaneND) arg[0], (GeoPlaneND)
         arg[1])
      };
      return ret;
     }
     if ((arg[0] instanceof GeoPlaneND) && (arg[1] instanceof GeoQuadric3DLimited)) {
      GeoElement[] ret = {
       kernel
         .getManager3D()
         .intersectQuadricLimited(
           c.getLabel(), (GeoPlaneND) arg[0], (GeoQuadric3DLimited) arg[1])
      };
      return ret;
     } else if ((arg[0] instanceof GeoQuadric3DLimited) && (arg[1] instanceof GeoPlaneND)) {
      GeoElement[] ret = {
       kernel
         .getManager3D()
         .intersectQuadricLimited(
           c.getLabel(), (GeoPlaneND) arg[1], (GeoQuadric3DLimited) arg[0])
      };
      return ret;
     }
     if ((arg[0] instanceof GeoPlaneND) && (arg[1] instanceof GeoQuadricND)) {
      GeoElement[] ret = {
       kernel.getManager3D().intersect(c.getLabel(), (GeoPlaneND) arg[0], (GeoQuadric3D)
         arg[1])
      };
      return ret;
     } else if ((arg[1] instanceof GeoPlaneND) && (arg[0] instanceof GeoQuadricND)) {
      GeoElement[] ret = {
       kernel.getManager3D().intersect(c.getLabel(), (GeoPlaneND) arg[1], (GeoQuadric3D)
         arg[0])
      };
      return ret;
     }
     if ((ok[0] = isQuadric(arg[0])) && (ok[1] = isQuadric(arg[1]))) {
      GeoElement[] ret = kernel
        .getManager3D()
        .intersectAsCircle(c.getLabels(), (GeoQuadricND) arg[0], (GeoQuadricND) arg[1]);
      return ret;
     }
     if ((ok[0] = arg[0].isGeoPlane()) && (ok[1] = arg[1].isGeoPolyhedron())) {
      return kernel
        .getManager3D()
        .intersectRegion(c.getLabels(), (GeoPlane3D) arg[0], arg[1], c.getOutputSizes());
     } else if ((ok[1] = arg[1].isGeoPlane()) && (ok[0] = arg[0].isGeoPolyhedron())) {
      return kernel
        .getManager3D()
        .intersectRegion(c.getLabels(), (GeoPlane3D) arg[1], arg[0], c.getOutputSizes());
     }
     GeoElement ret = CmdIntersectPath.processPlaneSurface(kernel, arg, ok, c.getLabel());
     if (ret != null) {
      return new GeoElement[] {ret};
     }
    }
    return super.process(c, info);
   case 3:
    arg = resArgs(c, info);
    if (arg[0].isGeoElement3D() || arg[1].isGeoElement3D() || arg[2].isGeoElement3D()) {
     if (arg[0].isGeoLine() && arg[1].isGeoConic() && arg[2] instanceof GeoNumberValue) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineConicSingle(
           c.getLabel(), (GeoLineND) arg[0], (GeoConicND) arg[1], (GeoNumberValue)
             arg[2])
      };
      return ret;
     } else if (arg[1].isGeoLine()
       && arg[0].isGeoConic()
       && arg[2] instanceof GeoNumberValue) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineConicSingle(
           c.getLabel(), (GeoLineND) arg[1], (GeoConicND) arg[0], (GeoNumberValue)
             arg[2])
      };
      return ret;
     } else if (arg[0].isGeoLine() && arg[1].isGeoConic() && arg[2].isGeoPoint()) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineConicSingle(
           c.getLabel(), (GeoLineND) arg[0], (GeoConicND) arg[1], (GeoPointND) arg[2])
      };
      return ret;
     } else if (arg[1].isGeoLine() && arg[0].isGeoConic() && arg[2].isGeoPoint()) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineConicSingle(
           c.getLabel(), (GeoLineND) arg[1], (GeoConicND) arg[0], (GeoPointND) arg[2])
      };
      return ret;
     }
     else if (arg[0].isGeoConic()
       && (arg[1].isGeoConic() || arg[1] instanceof GeoQuadric3D)
       && arg[2] instanceof GeoNumberValue) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectConicsSingle(
           c.getLabel(), (GeoConicND) arg[0], (GeoQuadricND) arg[1], (GeoNumberValue)
             arg[2])
      };
      return ret;
     } else if (arg[0].isGeoConic() && arg[1].isGeoConic() && arg[2].isGeoPoint()) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectConicsSingle(
           c.getLabel(), (GeoConicND) arg[0], (GeoConicND) arg[1], (GeoPointND) arg[2])
      };
      return ret;
     }
     else if (arg[0].isGeoLine()
       && arg[1] instanceof GeoQuadric3D
       && arg[2] instanceof GeoNumberValue) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineQuadricSingle(
           c.getLabel(), (GeoLineND) arg[0], (GeoQuadric3D) arg[1], (GeoNumberValue)
             arg[2])
      };
      return ret;
     } else if (arg[1].isGeoLine()
       && arg[0] instanceof GeoQuadric3D
       && arg[2] instanceof GeoNumberValue) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineQuadricSingle(
           c.getLabel(), (GeoLineND) arg[1], (GeoQuadric3D) arg[0], (GeoNumberValue)
             arg[2])
      };
      return ret;
     } else if (arg[0].isGeoLine() && arg[1] instanceof GeoQuadric3D && arg[2].isGeoPoint()) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineQuadricSingle(
           c.getLabel(), (GeoLineND) arg[0], (GeoQuadric3D) arg[1], (GeoPointND) arg[2])
      };
      return ret;
     } else if (arg[1].isGeoLine() && arg[0] instanceof GeoQuadric3D && arg[2].isGeoPoint()) {
      GeoElement[] ret = {
       (GeoElement) kernel
         .getManager3D()
         .intersectLineQuadricSingle(
           c.getLabel(), (GeoLineND) arg[1], (GeoQuadric3D) arg[0], (GeoPointND) arg[2])
      };
      return ret;
     }
    }
   default:
    return super.process(c, info);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdIntersectConic.java
```java
public class CmdIntersectConic extends CommandProcessor {
 public CmdIntersectConic(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = isQuadric(arg[0])) && (ok[1] = isQuadric(arg[1]))) {
     GeoElement[] ret = kernel
       .getManager3D()
       .intersectAsCircle(c.getLabels(), (GeoQuadricND) arg[0], (GeoQuadricND) arg[1]);
     return ret;
    }
    GeoElement ret = CmdIntersectPath.processQuadricPlane(kernel, c, arg, ok);
    if (ret != null) {
     return new GeoElement[] {ret};
    }
    throw argErr(c, getBadArg(ok, arg));
   default:
    throw argNumErr(c);
  }
 }
 protected static boolean isQuadric(GeoElement geo) {
  return geo instanceof GeoQuadric3D || geo instanceof GeoQuadric3DLimited;
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdLength3D.java
```java
public class CmdLength3D extends CmdLength {
 public CmdLength3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement length(String label, GeoVectorND v) {
  if (v.isGeoElement3D()) {
   return kernel.getManager3D().length(label, v);
  }
  return super.length(label, v);
 }
 protected GeoElement length(String label, GeoPointND p) {
  AlgoLengthPoint3D algo = new AlgoLengthPoint3D(cons, label, p);
  return algo.getLength();
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdLine3D.java
```java
public class CmdLine3D extends CmdLine {
 public CmdLine3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  if (n == 2) {
   arg = resArgs(c, info);
   if (arg[0].isGeoElement3D() || arg[1].isGeoElement3D()) {
    GeoElement geo0 = arg[0];
    GeoElement geo1 = arg[1];
    if ((ok[0] = geo0.isGeoPoint()) && (ok[1] = geo1.isGeoPoint())) { 
     GeoElement[] ret = {
      kernel.getManager3D().line3D(c.getLabel(), (GeoPointND) geo0, (GeoPointND) geo1)
     };
     return ret;
    } else if ((ok[0] = geo0.isGeoPoint()) && (ok[1] = geo1.isGeoVector())) { 
     GeoElement[] ret = {
      (GeoElement)
        kernel.getManager3D().line3D(c.getLabel(), (GeoPointND) geo0, (GeoVectorND) geo1)
     };
     return ret;
    } else if ((ok[0] = geo0.isGeoPoint()) && (ok[1] = geo1 instanceof GeoLineND)) { 
     GeoElement[] ret = {
      (GeoElement)
        kernel.getManager3D().line3D(c.getLabel(), (GeoPointND) geo0, (GeoLineND) geo1)
     };
     return ret;
    }
   }
  }
  return super.process(c, info);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdLineBisector3D.java
```java
public class CmdLineBisector3D extends CmdLineBisector {
 public CmdLineBisector3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process2(Command c, GeoElement[] arg, boolean[] ok) throws MyError {
  if ((ok[0] = arg[0].isGeoSegment()) && (ok[1] = arg[1] instanceof GeoDirectionND)) {
   GeoElement[] ret = {
    kernel.getManager3D().lineBisector3D(c.getLabel(), (GeoSegmentND) arg[0], (GeoDirectionND)
      arg[1])
   };
   return ret;
  }
  return super.process2(c, arg, ok);
 }
 protected GeoElement lineBisector(String label, GeoSegmentND segment) {
  GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientationNoSpace(kernel, app);
  if (orientation == null) {
   if (segment.isGeoElement3D()) {
    orientation = kernel.getXOYPlane();
   } else {
    return super.lineBisector(label, segment);
   }
  }
  return kernel.getManager3D().lineBisector3D(label, segment, orientation);
 }
 protected GeoElement lineBisector(String label, GeoPointND a, GeoPointND b) {
  GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientationNoSpace(kernel, app);
  if (orientation == null) {
   if (a.isGeoElement3D() || b.isGeoElement3D()) {
    orientation = kernel.getXOYPlane();
   } else {
    return super.lineBisector(label, a, b);
   }
  }
  return kernel.getManager3D().lineBisector3D(label, a, b, orientation);
 }
 protected GeoElement[] process3(Command c, GeoElement[] arg, boolean[] ok) throws MyError {
  if ((ok[0] = arg[0].isGeoPoint())
    && (ok[1] = arg[1].isGeoPoint())
    && (ok[2] = arg[2] instanceof GeoDirectionND)) {
   GeoElement[] ret = {
    kernel
      .getManager3D()
      .lineBisector3D(
        c.getLabel(), (GeoPointND) arg[0], (GeoPointND) arg[1], (GeoDirectionND) arg[2])
   };
   return ret;
  }
  return null;
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdLocus3D.java
```java
public class CmdLocus3D extends CmdLocus {
 public CmdLocus3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement locus(String label, GeoPointND p1, GeoPointND p2) {
  if (p1.isGeoElement3D() || p2.isGeoElement3D()) {
   return kernel.getManager3D().locus3D(label, p1, p2);
  }
  return super.locus(label, p1, p2);
 }
 protected GeoElement locus(String label, GeoPointND p, GeoNumeric slider) {
  if (p.isGeoElement3D()) {
   return kernel.getManager3D().locus3D(label, p, slider);
  }
  return super.locus(label, p, slider);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdMidpoint3D.java
```java
public class CmdMidpoint3D extends CmdMidpoint {
 public CmdMidpoint3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process1(Command c, GeoElement arg) throws MyError {
  if ((arg instanceof GeoQuadric3D) && !(arg instanceof GeoQuadric3DPart)) {
   GeoElement[] ret = {
    (GeoElement) kernel.getManager3D().centerQuadric(c.getLabel(), (GeoQuadricND) arg)
   };
   return ret;
  }
  return super.process1(c, arg);
 }
 protected GeoElement[] segment(String label, GeoSegmentND segment) {
  if (segment.isGeoElement3D()) {
   GeoElement[] ret = {(GeoElement) kernel.getManager3D().midpoint(label, segment)};
   return ret;
  }
  return super.segment(label, segment);
 }
 protected GeoElement[] conic(String label, GeoConicND conic) {
  if (conic.isGeoElement3D()) {
   GeoElement[] ret = {(GeoElement) kernel.getManager3D().center(label, conic)};
   return ret;
  }
  return super.conic(label, conic);
 }
 protected GeoElement[] twoPoints(String label, GeoPointND p1, GeoPointND p2) {
  if (p1.isGeoElement3D() || p2.isGeoElement3D()) {
   GeoElement[] ret = {(GeoElement) kernel.getManager3D().midpoint(label, p1, p2)};
   return ret;
  }
  return super.twoPoints(label, p1, p2);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdMirror3D.java
```java
public class CmdMirror3D extends CmdMirror {
 public CmdMirror3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process2(String label, GeoElement[] arg, boolean[] ok) {
  GeoElement[] ret;
  if (arg[1] instanceof GeoCoordSys2D && !arg[1].isGeoConic()) { 
   ret = kernel.getManager3D().mirror3D(label, arg[0], (GeoCoordSys2D) arg[1]);
   return ret;
  } else if (arg[0].isGeoElement3D() || arg[1].isGeoElement3D()) { 
   if (arg[0] instanceof Transformable) {
    if (arg[1].isGeoPoint()) {
     ret = kernel.getManager3D().mirror3D(label, arg[0], (GeoPointND) arg[1]);
     return ret;
    }
    if (arg[1].isGeoLine()) {
     ret = kernel.getManager3D().mirror3D(label, arg[0], (GeoLineND) arg[1]);
     return ret;
    }
    ok[1] = false;
   } else {
    ok[0] = false;
   }
  }
  return super.process2(label, arg, ok);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdOrthogonalLine3D.java
```java
public class CmdOrthogonalLine3D extends CmdOrthogonalLine {
 public CmdOrthogonalLine3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process2(Command c, GeoElement[] arg) throws MyError {
  boolean[] ok = new boolean[2];
  if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1] instanceof GeoCoordSys2D)) {
   GeoElement[] ret = {
    (GeoElement) kernel
      .getManager3D()
      .orthogonalLine3D(c.getLabel(), (GeoPointND) arg[0], (GeoCoordSys2D) arg[1])
   };
   return ret;
  } else if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1] instanceof GeoLineND)) {
   GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientation(kernel, app);
   if (orientation != null) {
    GeoElement[] ret = {
     (GeoElement) kernel
       .getManager3D()
       .orthogonalLine3D(c.getLabel(), (GeoPointND) arg[0], (GeoLineND) arg[1], orientation)
    };
    return ret;
   }
   if (arg[0].isGeoElement3D() || arg[1].isGeoElement3D()) {
    GeoElement[] ret = {
     (GeoElement)
       kernel.getManager3D().orthogonalLine3D(c.getLabel(), (GeoPointND) arg[0], (GeoLineND)
         arg[1])
    };
    return ret;
   }
   GeoElement[] ret = {
    getAlgoDispatcher().orthogonalLine(c.getLabel(), (GeoPoint) arg[0], (GeoLine) arg[1])
   };
   return ret;
  } else if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1].isGeoVector())) {
   GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientation(kernel, app);
   if (orientation == null || orientation == kernel.getSpace()) {
    orientation = kernel.getXOYPlane();
   }
   if (arg[0].isGeoElement3D()
     || arg[1].isGeoElement3D()
     || orientation != kernel.getXOYPlane()) {
    GeoElement[] ret = {
     (GeoElement) kernel
       .getManager3D()
       .orthogonalLine3D(
         c.getLabel(), (GeoPointND) arg[0], (GeoVectorND) arg[1], orientation)
    };
    return ret;
   }
   GeoElement[] ret = {
    getAlgoDispatcher().orthogonalLine(c.getLabel(), (GeoPoint) arg[0], (GeoVector) arg[1])
   };
   return ret;
  } else if ((ok[0] = arg[0] instanceof GeoLineND) && (ok[1] = arg[1] instanceof GeoLineND)) {
   GeoElement[] ret = {
    (GeoElement)
      kernel.getManager3D().orthogonalLine3D(c.getLabel(), (GeoLineND) arg[0], (GeoLineND)
        arg[1])
   };
   return ret;
  }
  return super.process2(c, arg);
 }
 public GeoElement[] process3(Command c, EvalInfo info) throws MyError {
  ExpressionValue arg0 = c.getArgument(0).unwrap();
  ExpressionValue arg1 = c.getArgument(1).unwrap();
  ExpressionValue arg2 = c.getArgument(2).unwrap();
  boolean threeD = arg0 instanceof GeoElement3D || arg1 instanceof GeoElement3D;
  if (!threeD && arg0 instanceof GeoPlane3DConstant) {
   c.setArgument(
     2, new GeoDummyVariable(cons, arg2.toString(StringTemplate.defaultTemplate)).wrap());
   return process2(c, resArgs(c, info));
  }
  boolean[] ok = new boolean[3];
  GeoElement[] arg;
  arg = resArgs(c, info);
  if ((ok[0] = arg[0].isGeoPoint())
    && (ok[1] = arg[1] instanceof GeoDirectionND)
    && (ok[2] = (arg[2] instanceof GeoDirectionND)
      && !(arg[1] instanceof GeoSpace)
      && !((arg[1] instanceof GeoCoordSys2D)
        && (arg[2] instanceof GeoCoordSys2D || arg[2] instanceof GeoSpace)))) {
   GeoElement[] ret = {
    (GeoElement) kernel
      .getManager3D()
      .orthogonalLine3D(
        c.getLabel(), (GeoPointND) arg[0], (GeoDirectionND) arg[1], (GeoDirectionND) arg[2])
   };
   return ret;
  }
  throw argErr(c, getBadArg(ok, arg));
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdOrthogonalPlane.java
```java
public class CmdOrthogonalPlane extends CommandProcessor {
 public CmdOrthogonalPlane(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if (arg[0].isGeoPoint()) {
     if (arg[1] instanceof GeoLineND) {
      return new GeoElement[] {
       (GeoElement) kernel
         .getManager3D()
         .orthogonalPlane3D(c.getLabel(), (GeoPointND) arg[0], (GeoLineND) arg[1])
      };
     } else if (arg[1] instanceof GeoVectorND) {
      return new GeoElement[] {
       (GeoElement) kernel
         .getManager3D()
         .orthogonalPlane3D(c.getLabel(), (GeoPointND) arg[0], (GeoVectorND) arg[1])
      };
     } else {
      throw argErr(c, arg[1]);
     }
    }
    throw argErr(c, arg[0]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdOrthogonalVector3D.java
```java
public class CmdOrthogonalVector3D extends CmdOrthogonalVector {
 public CmdOrthogonalVector3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoCoordSys2D) {
     GeoElement[] ret = {
      (GeoElement)
        kernel.getManager3D().orthogonalVector3D(c.getLabel(), (GeoCoordSys2D) arg[0])
     };
     return ret;
    }
    break;
   case 2:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoLineND && arg[1] instanceof GeoDirectionND) {
     GeoElement[] ret = {
      (GeoElement) kernel
        .getManager3D()
        .orthogonalVector3D(c.getLabel(), (GeoLineND) arg[0], (GeoDirectionND) arg[1])
     };
     return ret;
    }
    break;
  }
  return super.process(c, info);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdParabola3D.java
```java
public class CmdParabola3D extends CmdParabola {
 public CmdParabola3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement parabola(String label, GeoPointND a, GeoLineND d) {
  if (a.isGeoElement3D() || d.isGeoElement3D()) {
   return kernel.getManager3D().parabola3D(label, a, d);
  }
  return super.parabola(label, a, d);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPlane.java
```java
public class CmdPlane extends CommandProcessor {
 public CmdPlane(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 1:
    if (c.getArgument(0).unwrap() instanceof Equation) {
     ((Equation) c.getArgument(0).unwrap()).setForcePlane();
    }
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoCoordSys2D) {
     GeoElement[] ret = {
      (GeoElement) kernel.getManager3D().plane3D(c.getLabel(), (GeoCoordSys2D) arg[0])
     };
     return ret;
    }
    throw argErr(c, arg[0]);
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1] instanceof GeoLineND)) {
     GeoElement[] ret = {
      (GeoElement)
        kernel.getManager3D().plane3D(c.getLabel(), (GeoPointND) arg[0], (GeoLineND) arg[1])
     };
     return ret;
    } else if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1] instanceof GeoCoordSys2D)) {
     GeoElement[] ret = {
      (GeoElement)
        kernel.getManager3D().plane3D(c.getLabel(), (GeoPointND) arg[0], (GeoCoordSys2D)
          arg[1])
     };
     return ret;
    } else if ((ok[0] = arg[0].isGeoLine()) && (ok[1] = arg[1].isGeoLine())) {
     GeoElement[] ret = {
      kernel.getManager3D().plane3D(c.getLabel(), (GeoLineND) arg[0], (GeoLineND) arg[1])
     };
     return ret;
    } else {
     if (!ok[0]) {
      throw argErr(c, arg[0]);
     }
     throw argErr(c, arg[1]);
    }
   case 3:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint())
      && (ok[1] = arg[1].isGeoPoint())
      && (ok[2] = arg[2].isGeoPoint())) {
     GeoElement[] ret = {
      kernel
        .getManager3D()
        .plane3D(
          c.getLabel(), (GeoPointND) arg[0], (GeoPointND) arg[1], (GeoPointND) arg[2])
     };
     return ret;
    }
    if ((ok[0] = arg[0].isGeoPoint())
      && (ok[1] = arg[1].isGeoVector())
      && (ok[2] = arg[2].isGeoVector())) {
     ExpressionNode cross =
       new ExpressionNode(kernel, arg[1], Operation.VECTORPRODUCT, arg[2]);
     AlgoDependentVector3D algo = new AlgoDependentVector3D(cons, cross);
     return new GeoElement[] {
      (GeoElement) kernel
        .getManager3D()
        .orthogonalPlane3D(c.getLabel(), (GeoPointND) arg[0], algo.getVector3D())
     };
    }
    if (!ok[0]) {
     throw argErr(c, arg[0]);
    } else if (!ok[1]) {
     throw argErr(c, arg[1]);
    } else {
     throw argErr(c, arg[2]);
    }
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPlaneBisector.java
```java
public class CmdPlaneBisector extends CommandProcessor {
 public CmdPlaneBisector(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoSegmentND) {
     GeoElement[] ret = {
      (GeoElement) kernel.getManager3D().planeBisector(c.getLabel(), (GeoSegmentND) arg[0])
     };
     return ret;
    }
    throw argErr(c, arg[0]);
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1].isGeoPoint())) {
     GeoElement[] ret = {
      (GeoElement)
        kernel.getManager3D().planeBisector(c.getLabel(), (GeoPointND) arg[0], (GeoPointND)
          arg[1])
     };
     return ret;
    }
    if (!ok[0]) {
     throw argErr(c, arg[0]);
    }
    throw argErr(c, arg[1]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPoint3D.java
```java
public class CmdPoint3D extends CmdPoint {
 public CmdPoint3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  if (n == 1) {
   arg = resArgs(c, info);
   GeoElement geo0 = arg[0];
   if (geo0.isGeoElement3D() || (geo0.isGeoList() && ((GeoList) geo0).containsGeoElement3D())) {
    if (geo0.isPath()) {
     GeoElement[] ret = {
      (GeoElement) kernel.getManager3D().point3D(c.getLabel(), (Path) geo0, false)
     };
     return ret;
    }
    if (geo0.isRegion()) {
     GeoElement[] ret = {
      (GeoElement) kernel.getManager3D().point3DIn(c.getLabel(), (Region) arg[0], false)
     };
     return ret;
    }
    throw argErr(c, geo0);
   } else if (geo0.isRegion3D() && !geo0.isPath()) {
    GeoElement[] ret = {
     (GeoElement) kernel.getManager3D().point3DIn(c.getLabel(), (Region) arg[0], false)
    };
    return ret;
   } else if (arg[0].isGeoList() && AlgoPointsFromList.isSupportedList((GeoList) arg[0])) {
    AlgoPointsFromList algo = new AlgoPointsFromList(
      cons, c.getLabels(), !cons.isSuppressLabelsActive(), (GeoList) arg[0]);
    GeoElement[] ret = algo.getOutputPoints().stream()
      .map(GeoPointND::toGeoElement)
      .toArray(GeoElement[]::new);
    return ret;
   }
  }
  return super.process(c, info);
 }
 protected GeoElement point(String label, Path path, GeoNumberValue value) {
  if (path.isGeoElement3D() || (path.isGeoList() && ((GeoList) path).containsGeoElement3D())) {
   return (GeoElement) kernel.getManager3D().point3D(label, path, value);
  }
  return super.point(label, path, value);
 }
 protected GeoPointND point(String label, GeoPointND point, GeoVectorND vector) {
  if (point.isGeoElement3D() || vector.isGeoElement3D()) {
   AlgoPointVector3D algo = new AlgoPointVector3D(cons, point, vector);
   algo.getQ().setLabel(label);
   return algo.getQ();
  }
  return super.point(label, point, vector);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPointIn3D.java
```java
public class CmdPointIn3D extends CmdPointIn {
 public CmdPointIn3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] pointIn(String label, Region region) {
  if (region.isRegion3D()) {
   GeoElement[] ret = {(GeoElement) kernel.getManager3D().point3DIn(label, region, false)};
   return ret;
  }
  return super.pointIn(label, region);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPolyLine3D.java
```java
public class CmdPolyLine3D extends CmdPolyLine {
 public CmdPolyLine3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] polyLine(String label, GeoList pointList) {
  for (int i = 0; i < pointList.size(); i++) {
   if (pointList.get(i).isGeoElement3D()) {
    return kernel.getManager3D().polyLine3D(label, pointList);
   }
  }
  return super.polyLine(label, pointList);
 }
 protected boolean checkIs3D(boolean is3D, GeoElement geo) {
  if (is3D) {
   return true;
  }
  return geo.isGeoElement3D();
 }
 protected GeoElement[] polyLine(String label, GeoPointND[] points, boolean is3D) {
  if (is3D) {
   return kernel.getManager3D().polyLine3D(label, points);
  }
  return kernel.polyLine(label, points);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPolygon3D.java
```java
public class CmdPolygon3D extends CmdPolygon {
 public CmdPolygon3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] process(Command c, int n, GeoElement[] arg) throws MyError {
  if (n == 4) {
   if (arg[0].isGeoPoint()
     && arg[1].isGeoPoint()
     && arg[2] instanceof GeoNumberValue
     && arg[3] instanceof GeoDirectionND) {
    return regularPolygon(
      c.getLabels(),
      (GeoPointND) arg[0],
      (GeoPointND) arg[1],
      (GeoNumberValue) arg[2],
      (GeoDirectionND) arg[3]);
   }
  }
  return super.process(c, n, arg);
 }
 protected boolean checkIs3D(boolean is3D, GeoElement geo) {
  if (is3D) {
   return true;
  }
  return geo.isGeoElement3D();
 }
 protected GeoElement[] polygon(String[] labels, GeoPointND[] points, boolean is3D) {
  if (is3D) {
   return kernel.getManager3D().polygon3D(labels, points);
  }
  return super.polygon(labels, points, is3D);
 }
 protected GeoElement[] regularPolygon(
   String[] labels, GeoPointND A, GeoPointND B, GeoNumberValue n) {
  if (A.isGeoElement3D() || B.isGeoElement3D()) {
   return regularPolygon(labels, A, B, n, kernel.getXOYPlane());
  }
  return super.regularPolygon(labels, A, B, n);
 }
 private GeoElement[] regularPolygon(
   String[] labels, GeoPointND A, GeoPointND B, GeoNumberValue n, GeoDirectionND direction) {
  return kernel.getManager3D().regularPolygon(labels, A, B, n, direction);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPolyhedronConvex.java
```java
public class CmdPolyhedronConvex extends CommandProcessor {
 public CmdPolyhedronConvex(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  if (n < 4) {
   throw argNumErr(c);
  }
  GeoElement[] arg;
  arg = resArgs(c, info);
  for (int i = 0; i < n; i++) {
   if (!arg[i].isGeoPoint()) {
    throw argErr(c, arg[i]);
   }
  }
  return kernel.getManager3D().polyhedronConvex(c.getLabels(), arg);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPolyhedronNet.java
```java
public class CmdPolyhedronNet extends CommandProcessor {
 public CmdPolyhedronNet(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPolyhedron()) && (ok[1] = arg[1].isNumberValue())) {
     return kernel
       .getManager3D()
       .polyhedronNet(c.getLabels(), arg[0], (NumberValue) arg[1], null, null);
    }
    if (!ok[0]) {
     throw argErr(c, arg[0]);
    }
    throw argErr(c, arg[1]);
   case 0:
   case 1:
    throw argNumErr(c);
   default:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPolyhedron())
      && (ok[1] = arg[1].isNumberValue())
      && (ok[2] = arg[2].isGeoPolygon())) {
     GeoSegmentND[] segments = new GeoSegmentND[n - 3];
     for (int i = 3; i < n; i++) {
      if (arg[i].isGeoSegment()) {
       segments[i - 3] = (GeoSegmentND) arg[i];
      } else {
       throw argErr(c, arg[i]);
      }
     }
     return kernel
       .getManager3D()
       .polyhedronNet(
         c.getLabels(), arg[0], (NumberValue) arg[1], (GeoPolygon) arg[2], segments);
    }
    if (!ok[0]) {
     throw argErr(c, arg[0]);
    }
    if (!ok[1]) {
     throw argErr(c, arg[1]);
    }
    throw argErr(c, arg[2]);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPrism.java
```java
public class CmdPrism extends CommandProcessor {
 public CmdPrism(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  arg = resArgs(c, info);
  if (n == 2) {
   if ((ok[0] = arg[0].isGeoPolygon()) && (ok[1] = arg[1].isGeoPoint())) {
    GeoElement[] ret =
      kernel.getManager3D().prism(c.getLabels(), (GeoPolygon) arg[0], (GeoPointND) arg[1]);
    return ret;
   } else if ((ok[0] = arg[0].isGeoPolygon()) && (ok[1] = arg[1] instanceof GeoNumberValue)) {
    GeoElement[] ret = kernel
      .getManager3D()
      .prism(c.getLabels(), (GeoPolygon) arg[0], (GeoNumberValue) arg[1]);
    return ret;
   } else {
    if (!ok[0]) {
     throw argErr(c, arg[0]);
    }
    throw argErr(c, arg[1]);
   }
  } else if (n > 2) {
   GeoPointND[] points = new GeoPointND[n];
   for (int i = 0; i < n; i++) {
    if (!arg[i].isGeoPoint()) {
     throw argErr(c, arg[i]);
    }
    points[i] = (GeoPointND) arg[i];
   }
   GeoElement[] ret = kernel.getManager3D().prism(c.getLabels(), points);
   return ret;
  } else {
   throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdPyramid.java
```java
public class CmdPyramid extends CommandProcessor {
 public CmdPyramid(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  arg = resArgs(c, info);
  if (n == 2) {
   if ((ok[0] = arg[0].isGeoPolygon()) && (ok[1] = arg[1].isGeoPoint())) {
    GeoElement[] ret =
      kernel.getManager3D().pyramid(c.getLabels(), (GeoPolygon) arg[0], (GeoPointND) arg[1]);
    return ret;
   } else if ((ok[0] = arg[0].isGeoPolygon()) && (ok[1] = arg[1] instanceof GeoNumberValue)) {
    GeoElement[] ret = kernel
      .getManager3D()
      .pyramid(c.getLabels(), (GeoPolygon) arg[0], (GeoNumberValue) arg[1]);
    return ret;
   } else {
    if (!ok[0]) {
     throw argErr(c, arg[0]);
    }
    throw argErr(c, arg[1]);
   }
  } else if (n > 2) {
   GeoPointND[] points = new GeoPointND[n];
   for (int i = 0; i < n; i++) {
    if (!arg[i].isGeoPoint()) {
     throw argErr(c, arg[i]);
    }
    points[i] = (GeoPointND) arg[i];
   }
   GeoElement[] ret = kernel.getManager3D().pyramid(c.getLabels(), points);
   return ret;
  } else {
   throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdQuadricSide.java
```java
public class CmdQuadricSide extends CommandProcessor {
 public CmdQuadricSide(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoQuadric3DLimited) {
     return new GeoElement[] {
      kernel.getManager3D().quadricSide(c.getLabel(), (GeoQuadricND) arg[0])
     };
    }
    throw argErr(arg[0], c);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdRay3D.java
```java
public class CmdRay3D extends CmdRay {
 public CmdRay3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement ray(String label, GeoPointND a, GeoPointND b) {
  if (a.isGeoElement3D() || b.isGeoElement3D()) {
   return (GeoElement) kernel.getManager3D().ray3D(label, a, b);
  }
  return super.ray(label, a, b);
 }
 protected GeoElement ray(String label, GeoPointND a, GeoVectorND v) {
  if (a.isGeoElement3D() || v.isGeoElement3D()) {
   AlgoRayPointVector3D algo = new AlgoRayPointVector3D(kernel.getConstruction(), a, v);
   algo.getLine().setLabel(label);
   return algo.getLine();
  }
  return super.ray(label, a, v);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdRotate3D.java
```java
public class CmdRotate3D extends CmdRotate {
 public CmdRotate3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    return super.process2(c, arg, ok);
   case 3:
    arg = resArgs(c, info);
    if ((ok[1] = arg[1] instanceof GeoNumberValue) && (ok[2] = arg[2] instanceof GeoLineND)) {
     return kernel
       .getManager3D()
       .rotate3D(c.getLabel(), arg[0], (GeoNumberValue) arg[1], (GeoLineND) arg[2]);
    }
    return super.process3(c, arg, ok);
   case 4:
    arg = resArgs(c, info);
    if ((ok[1] = arg[1] instanceof GeoNumberValue)
      && (ok[2] = arg[2].isGeoPoint())
      && (ok[3] = arg[3] instanceof GeoDirectionND)) {
     return kernel
       .getManager3D()
       .rotate3D(
         c.getLabel(),
         arg[0],
         (GeoNumberValue) arg[1],
         (GeoPointND) arg[2],
         (GeoDirectionND) arg[3]);
    }
    throw argErr(c, getBadArg(ok, arg));
  }
  return super.process(c, info);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdSegment3D.java
```java
public class CmdSegment3D extends CmdSegment {
 public CmdSegment3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement segment(String label, GeoPointND a, GeoPointND b) {
  if (a.isGeoElement3D() || b.isGeoElement3D()) {
   return (GeoElement) kernel.getManager3D().segment3D(label, a, b);
  }
  return super.segment(label, a, b);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdSemicircle3D.java
```java
public class CmdSemicircle3D extends CmdSemicircle {
 public CmdSemicircle3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement semicircle(String label, GeoPointND A, GeoPointND B) {
  GeoDirectionND orientation = CommandProcessor3D.getCurrentViewOrientationNoSpace(kernel, app);
  if (orientation != null) {
   return (GeoElement) kernel.getManager3D().semicircle3D(label, A, B, orientation);
  }
  if (A.isGeoElement3D() || B.isGeoElement3D()) {
   return (GeoElement) kernel.getManager3D().semicircle3D(label, A, B, kernel.getXOYPlane());
  }
  return super.semicircle(label, A, B);
 }
 protected GeoElement[] process3(Command c, GeoElement[] arg, boolean[] ok) throws MyError {
  if ((ok[0] = arg[0].isGeoPoint())
    && (ok[1] = arg[1].isGeoPoint())
    && (ok[2] = arg[2] instanceof GeoDirectionND)) {
   GeoElement[] ret = {
    (GeoElement) kernel
      .getManager3D()
      .semicircle3D(
        c.getLabel(), (GeoPointND) arg[0], (GeoPointND) arg[1], (GeoDirectionND) arg[2])
   };
   return ret;
  }
  return null;
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdSphere3D.java
```java
public class CmdSphere3D extends CommandProcessor {
 public CmdSphere3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  switch (n) {
   case 2:
    arg = resArgs(c, info);
    if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1] instanceof GeoNumberValue)) {
     GeoElement[] ret = {
      kernel.getManager3D().sphere(c.getLabel(), (GeoPointND) arg[0], (GeoNumberValue) arg[1])
     };
     return ret;
    } else if ((ok[0] = arg[0].isGeoPoint()) && (ok[1] = arg[1].isGeoPoint())) {
     GeoElement[] ret = {
      kernel.getManager3D().sphere(c.getLabel(), (GeoPointND) arg[0], (GeoPointND) arg[1])
     };
     return ret;
    } else {
     if (!ok[0]) {
      throw argErr(c, arg[0]);
     }
     throw argErr(c, arg[1]);
    }
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdTangent3D.java
```java
public class CmdTangent3D extends CmdTangent {
 public CmdTangent3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoElement[] tangent(String[] labels, GeoPointND a, GeoConicND c) {
  return kernel.getManager3D().tangent3D(labels, a, c);
 }
 protected GeoElement[] tangent(String[] labels, GeoLineND l, GeoConicND c) {
  return kernel.getManager3D().tangent3D(labels, l, c);
 }
 protected GeoElement[] tangent(String[] labels, GeoConicND c1, GeoConicND c2) {
  return kernel.getManager3D().commonTangents3D(labels, c1, c2);
 }
 protected GeoElement tangentToCurve(String label, GeoPointND point, GeoCurveCartesianND curve) {
  return kernel.getManager3D().tangent3D(label, point, curve);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdTop.java
```java
public class CmdTop extends CommandProcessor {
 public CmdTop(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoQuadric3DLimited) {
     GeoElement[] ret = {
      kernel.getManager3D().quadricTop(c.getLabel(), (GeoQuadric3DLimited) arg[0])
     };
     return ret;
    }
    throw argErr(c, arg[0]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdTranslate3D.java
```java
public class CmdTranslate3D extends CmdTranslate {
 public CmdTranslate3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info)
   throws MyError, CircularDefinitionException {
  String label = c.getLabel();
  int n = c.getArgumentNumber();
  boolean[] ok = new boolean[n];
  GeoElement[] arg;
  GeoElement[] ret = new GeoElement[1];
  if (n == 2) {
   arg = resArgs(c, info);
   if (arg[0].isGeoElement3D() || arg[1].isGeoElement3D()) {
    if (arg[0].isGeoVector() && arg[1].isGeoPoint()) {
     AlgoTranslateVector algo = getAlgoTranslateVector(label, arg[0], arg[1]);
     ret[0] = (GeoElement) algo.getTranslatedVector();
     return ret;
    }
    ok[0] =
      arg[0] instanceof Translateable || arg[0] instanceof GeoPolygon || arg[0].isGeoList();
    if (ok[0] && (ok[1] = arg[1].isGeoVector())) {
     ret = kernel.getManager3D().translate3D(label, arg[0], (GeoVectorND) arg[1]);
     return ret;
    } else if (ok[0] && (ok[1] = arg[1] instanceof GeoPointND)) {
     AlgoVectorPoint3D algoVP = new AlgoVectorPoint3D(cons, (GeoPointND) arg[1]);
     cons.removeFromConstructionList(algoVP);
     ret = kernel.getManager3D().translate3D(label, arg[0], algoVP.getVector());
     return ret;
    }
    throw argErr(c, getBadArg(ok, arg));
   }
  }
  return super.process(c, info);
 }
 protected AlgoTranslateVector getAlgoTranslateVector(String label, GeoElement v, GeoElement P) {
  if (v.isGeoElement3D()) {
   return new AlgoTranslateVector3D(cons, label, (GeoVector3D) v, (GeoPointND) P);
  }
  return super.getAlgoTranslateVector(label, v, P);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdUnitOrthogonalVector3D.java
```java
public class CmdUnitOrthogonalVector3D extends CmdUnitOrthogonalVector {
 public CmdUnitOrthogonalVector3D(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof GeoCoordSys2D) {
     GeoElement[] ret = {
      (GeoElement)
        kernel.getManager3D().unitOrthogonalVector3D(c.getLabel(), (GeoCoordSys2D) arg[0])
     };
     return ret;
    }
  }
  return super.process(c, info);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdUnitVector3D.java
```java
public class CmdUnitVector3D extends CmdUnitVector {
 public CmdUnitVector3D(Kernel kernel, boolean normalize) {
  super(kernel, normalize);
 }
 protected GeoElement[] processNotLineNotVector(Command c, GeoElement arg) throws MyError {
  if (arg instanceof GeoDirectionND && !(arg instanceof GeoSpace)) {
   AlgoUnitVector3D algo = new AlgoUnitVector3D(cons, (GeoDirectionND) arg, normalize);
   algo.getVector().setLabel(c.getLabel());
   GeoElement[] ret = {(GeoElement) algo.getVector()};
   return ret;
  }
  return super.processNotLineNotVector(c, arg);
 }
 protected AlgoUnitVector algo(GeoLineND line) {
  if (line.isGeoElement3D()) {
   return new AlgoUnitVector3D(cons, line, normalize);
  }
  return super.algo(line);
 }
 protected AlgoUnitVector algo(VectorNDValue v) {
  if (v instanceof GeoPoint3D) {
   return new AlgoUnitVectorPoint3D(cons, (GeoPoint3D) v, normalize);
  }
  if (v.getDimension() == 3) {
   return new AlgoUnitVector3D(cons, (GeoDirectionND) v, normalize);
  }
  return super.algo(v);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdVertex3D.java
```java
public class CmdVertex3D extends CmdVertex {
 public CmdVertex3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoPointND cornerOfDrawingPad(String label, GeoNumberValue number, GeoNumberValue ev) {
  if (!kernel.getLoadingMode() && ev != null && AlgoDrawingPadCorner3D.is3D(ev)) {
   return cornerOfDrawingPad3D(label, number, ev);
  }
  return super.cornerOfDrawingPad(label, number, ev);
 }
 protected GeoPointND cornerOfDrawingPad3D(
   String label, GeoNumberValue number, GeoNumberValue ev) {
  AlgoDrawingPadCorner3D algo = new AlgoDrawingPadCorner3D(cons, label, number, ev);
  return algo.getCorner();
 }
 protected AlgoVertexPolygon newAlgoVertexPolygon(
   Construction cons1, String label, GeoPoly p, GeoNumberValue v) {
  if (p.isGeoElement3D()) {
   return new AlgoVertexPolygon3D(cons1, label, p, v);
  }
  return super.newAlgoVertexPolygon(cons1, label, p, v);
 }
 protected AlgoVertexConic newAlgoVertexConic(
   Construction cons1, String[] labels, GeoConicND conic) {
  if (conic.isGeoElement3D()) {
   return new AlgoVertexConic3D(cons1, labels, conic);
  }
  return super.newAlgoVertexConic(cons1, labels, conic);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdVertexForce3D.java
```java
public class CmdVertexForce3D extends CmdVertex3D {
 public CmdVertexForce3D(Kernel kernel) {
  super(kernel);
 }
 protected GeoPointND cornerOfDrawingPad(String label, GeoNumberValue number, GeoNumberValue ev) {
  return cornerOfDrawingPad3D(label, number, ev);
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CmdVolume.java
```java
public class CmdVolume extends CommandProcessor {
 public CmdVolume(Kernel kernel) {
  super(kernel);
 }
 public GeoElement[] process(Command c, EvalInfo info) throws MyError {
  int n = c.getArgumentNumber();
  GeoElement[] arg;
  switch (n) {
   case 1:
    arg = resArgs(c, info);
    if (arg[0] instanceof HasVolume) {
     return new GeoElement[] {kernel.getManager3D().volume(c.getLabel(), (HasVolume) arg[0])};
    }
    throw argErr(c, arg[0]);
   default:
    throw argNumErr(c);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/commands/CommandProcessor3D.java
```java
public class CommandProcessor3D {
 public static GeoDirectionND getCurrentViewOrientation(Kernel kernelA, App app) {
  return getCurrentViewOrientation(kernelA, app, kernelA.getSpace());
 }
 public static GeoDirectionND getCurrentViewOrientationNoSpace(Kernel kernelA, App app) {
  return getCurrentViewOrientation(kernelA, app, null);
 }
 private static GeoDirectionND getCurrentViewOrientation(
   Kernel kernelA, App app, GeoDirectionND spaceFallback) {
  EuclidianView view = app.getActiveEuclidianView();
  if (!kernelA.isMacroKernel() && !kernelA.getLoadingMode() && view != null) {
   if (view.isDefault2D()) {
    return kernelA.getXOYPlane();
   }
   if (view instanceof EuclidianViewForPlaneInterface) {
    return ((EuclidianViewForPlaneCompanion) view.getCompanion()).getPlane();
   }
   return spaceFallback;
  }
  return null;
 }
}
```

### FILE: geogebra3D/kernel3D/commands/ParametricProcessor3D.java
```java
public class ParametricProcessor3D extends ParametricProcessor {
 public ParametricProcessor3D(Kernel kernel, AlgebraProcessor ap) {
  super(kernel, ap);
 }
 protected GeoElement[] processParametricFunction(
   ExpressionNode exp, ExpressionValue ev, FunctionVariable[] fv, String label, EvalInfo info) {
  Construction cons = kernel.getConstruction();
  if (ev instanceof VectorValue) {
   if (fv.length == 2) {
    GeoElement[] geoElements = processSurface(exp, fv, 2, false);
    geoElements[0].setLabel(label);
    return geoElements;
   }
  }
  if (ev instanceof Vector3DValue && fv.length < 3) {
   if (fv.length == 2) {
    GeoElement[] geoElements = processSurface(exp, fv, 3, false);
    geoElements[0].setLabel(label);
    return geoElements;
   }
   GeoNumeric loc = getLocalVar(exp, fv[0]);
   if (exp.getOperation().isIf()) {
    ExpressionNode exp1 = exp.getRightTree();
    ExpressionNode cx = VectorArithmetic.computeCoord(exp1, 0);
    ExpressionNode cy = VectorArithmetic.computeCoord(exp1, 1);
    ExpressionNode cz = VectorArithmetic.computeCoord(exp1, 2);
    return cartesianCurve(
      cons, label, exp1, loc, new ExpressionNode[] {cx, cy, cz}, exp.getLeftTree());
   }
   ExpressionNode cx = VectorArithmetic.computeCoord(exp, 0);
   ExpressionNode cy = VectorArithmetic.computeCoord(exp, 1);
   ExpressionNode cz = VectorArithmetic.computeCoord(exp, 2);
   ExpressionValue[] coefX = new ExpressionValue[5];
   ExpressionValue[] coefY = new ExpressionValue[5];
   ExpressionValue[] coefZ = new ExpressionValue[5];
   if (ap.getTrigCoeffs(cx, coefX, new ExpressionNode(kernel, 1.0), loc)
     && ap.getTrigCoeffs(cy, coefY, new ExpressionNode(kernel, 1.0), loc)
     && ap.getTrigCoeffs(cz, coefZ, new ExpressionNode(kernel, 1.0), loc)) {
    boolean constant = true;
    for (int i = 0; i < coefX.length; i++) {
     constant = constant
       && expr(coefX[i]).isConstant()
       && expr(coefY[i]).isConstant()
       && expr(coefZ[i]).isConstant();
    }
    if (constant) {
     GeoConic3D conic = new GeoConic3D(kernel.getConstruction());
     updateTrigConic(conic, coefX, coefY, coefZ);
     conic.setToParametricForm(fv[0].getSetVarString());
     conic.setDefinition(buildParamEq(exp, label));
     conic.setLabel(label);
     return new GeoElement[] {conic};
    }
    return dependentConic(cons, exp, coefX, coefY, coefZ, label, fv[0], true);
   }
   for (int i = 0; i < coefX.length; i++) {
    coefX[i] = new ExpressionNode(kernel, 0);
    coefY[i] = new ExpressionNode(kernel, 0);
    coefZ[i] = new ExpressionNode(kernel, 0);
   }
   int degX = ap.getPolyCoeffs(cx, coefX, new ExpressionNode(kernel, 1), loc);
   int degY = ap.getPolyCoeffs(cy, coefY, new ExpressionNode(kernel, 1), loc);
   int degZ = ap.getPolyCoeffs(cz, coefZ, new ExpressionNode(kernel, 1), loc);
   if (degX >= 0 && degY >= 0 && degZ >= 0 && degX < 2 && degY < 2 && degZ < 2) {
    GeoLine3D line;
    if (coefX[0].isConstant()
      && coefY[0].isConstant()
      && coefZ[0].isConstant()
      && coefX[1].isConstant()
      && coefY[1].isConstant()
      && coefZ[1].isConstant()) {
     line = new GeoLine3D(cons);
     line.showUndefinedInAlgebraView(true);
     Coords start = new Coords(new double[] {
      coefX[0].evaluateDouble(), coefY[0].evaluateDouble(), coefZ[0].evaluateDouble()
     });
     Coords v = new Coords(new double[] {
      coefX[1].evaluateDouble(), coefY[1].evaluateDouble(), coefZ[1].evaluateDouble()
     });
     line.setCoord(start, v);
     line.setToParametricForm(fv[0].getSetVarString());
     line.setDefinition(buildParamEq(exp, label));
     setLabelIfNeeded(line, label, info);
    } else {
     line = (GeoLine3D) kernel.getManager3D().line3D(label, coefX, coefY, coefZ);
     line.setToParametricForm(Unicode.lambda_STRING);
    }
    return new GeoElement[] {line};
   }
   if (degX >= 0 && degY >= 0 && degZ >= 0 && degX < 3 && degY < 3 && degZ < 3) {
    boolean constant = true;
    for (int i = 0; i < coefX.length; i++) {
     constant = constant
       && expr(coefX[i]).isConstant()
       && expr(coefY[i]).isConstant()
       && expr(coefZ[i]).isConstant();
    }
    if (constant) {
     GeoConic3D conic = new GeoConic3D(kernel.getConstruction());
     updateParabola(conic, coefX, coefY, coefZ);
     conic.setToParametricForm(fv[0].getSetVarString());
     conic.setDefinition(buildParamEq(exp, label));
     conic.setLabel(label);
     return new GeoElement[] {conic};
    }
    return dependentConic(cons, exp, coefX, coefY, coefZ, label, fv[0], false);
   }
   return cartesianCurve(cons, label, exp, loc, new ExpressionNode[] {cx, cy, cz}, null);
  }
  return super.processParametricFunction(exp, ev, fv, label, info);
 }
 private void setLabelIfNeeded(GeoElement path, String label, EvalInfo info) {
  if (info.isLabelOutput()) {
   path.setLabel(label);
  }
 }
 protected AlgoCurveCartesian makeCurveAlgo(
   Construction cons,
   ExpressionNode wrap,
   GeoNumberValue[] coords,
   GeoNumeric locVar,
   GeoNumberValue from,
   GeoNumberValue to) {
  if (coords.length == 2) {
   return super.makeCurveAlgo(cons, wrap, coords, locVar, from, to);
  }
  return new AlgoCurveCartesian3D(cons, wrap, coords, locVar, from, to);
 }
 private GeoElement[] dependentConic(
   Construction cons,
   ExpressionNode exp,
   ExpressionValue[] coefX,
   ExpressionValue[] coefY,
   ExpressionValue[] coefZ,
   String label,
   FunctionVariable fv0,
   boolean trig) {
  AlgoDependentConic3D ellipseHyperbolaAlgo =
    new AlgoDependentConic3D(cons, buildParamEq(exp, label), coefX, coefY, coefZ, trig);
  ellipseHyperbolaAlgo.getConic3D().setLabel(label);
  ellipseHyperbolaAlgo.getConic3D().setToParametricForm(fv0.getSetVarString());
  return new GeoElement[] {ellipseHyperbolaAlgo.getConic3D()};
 }
 public static void updateTrigConic(
   GeoConic3D conic, ExpressionValue[] coefX, ExpressionValue[] coefY, ExpressionValue[] coefZ) {
  CoordSys cs = new CoordSys(2);
  double mx = eval(coefX[0]), my = eval(coefY[0]), mz = eval(coefZ[0]);
  double xx = 0, xy = 0, yy = 0, det = 0;
  if (coefX[1] != null || coefX[2] != null) {
   double vx = eval(coefX[1]), vy = eval(coefY[1]), vz = eval(coefZ[1]);
   double wx = eval(coefX[2]), wy = eval(coefY[2]), wz = eval(coefZ[2]);
   cs.resetCoordSys();
   cs.addPoint(new Coords(mx, my, mz, 1));
   cs.addVector(new Coords(vx, vy, vz));
   cs.addVector(new Coords(wx, wy, wz));
   cs.makeOrthoMatrix(false, false);
   Coords v = cs.getNormalProjection(new Coords(vx, vy, vz, 0))[1];
   Coords w = cs.getNormalProjection(new Coords(wx, wy, wz, 0))[1];
   yy = v.getX() * v.getX() + w.getX() * w.getX();
   xx = v.getY() * v.getY() + w.getY() * w.getY();
   xy = v.getX() * v.getY() + w.getX() * w.getY();
   det = v.getX() * w.getY() - w.getX() * v.getY();
  } else if (coefX[3] != null || coefX[4] != null) {
   double vx = eval(coefX[3]), vy = eval(coefY[3]), vz = eval(coefZ[3]);
   double wx = eval(coefX[4]), wy = eval(coefY[4]), wz = eval(coefZ[4]);
   cs.resetCoordSys();
   cs.addPoint(new Coords(mx, my, mz, 1));
   cs.addVector(new Coords(vx, vy, vz));
   cs.addVector(new Coords(wx, wy, wz));
   cs.makeOrthoMatrix(false, false);
   Coords v = cs.getNormalProjection(new Coords(vx, vy, vz, 0))[1];
   Coords w = cs.getNormalProjection(new Coords(wx, wy, wz, 0))[1];
   yy = v.getX() * v.getX() - w.getX() * w.getX();
   xx = v.getY() * v.getY() - w.getY() * w.getY();
   xy = v.getX() * v.getY() - w.getX() * w.getY();
   det = v.getX() * w.getY() - w.getX() * v.getY();
  }
  conic.setCoordSys(cs);
  conic.setMatrix(new double[] {xx, yy, -det * det, -xy, 0, 0});
 }
 private static double eval(ExpressionValue ev) {
  if (ev == null) {
   return 0;
  }
  return ev.evaluateDouble();
 }
 public static void updateParabola(
   GeoConic3D conic, ExpressionValue[] coefX, ExpressionValue[] coefY, ExpressionValue[] coefZ) {
  double mx = eval(coefX[0]), my = eval(coefY[0]), mz = eval(coefZ[0]);
  double vx = eval(coefX[1]), vy = eval(coefY[1]), vz = eval(coefZ[1]);
  double wx = eval(coefX[2]), wy = eval(coefY[2]), wz = eval(coefZ[2]);
  CoordSys cs = new CoordSys(2);
  cs.resetCoordSys();
  cs.addPoint(new Coords(mx, my, mz, 1));
  cs.addVector(new Coords(vx, vy, vz));
  cs.addVector(new Coords(wx, wy, wz));
  cs.makeOrthoMatrix(false, false);
  Coords v = cs.getNormalProjection(new Coords(vx, vy, vz, 0))[1];
  Coords w = cs.getNormalProjection(new Coords(wx, wy, wz, 0))[1];
  Kernel kernel = conic.getKernel();
  FunctionVariable px = new FunctionVariable(kernel, "x");
  FunctionVariable py = new FunctionVariable(kernel, "y");
  ExpressionNode t = px.wrap().multiply(w.getY()).subtract(py.wrap().multiply(w.getX()));
  double d = w.getY() * v.getX() - w.getX() * v.getY();
  Equation eq;
  eq = new Equation(
    kernel,
    px.wrap().multiply(d * d * w.getX()).plus(py.wrap().multiply(d * d * w.getY())),
    t.power(2)
      .multiply(w.getX() * w.getX() + w.getY() * w.getY())
      .plus(t.multiply(w.getY() * v.getY() + v.getX() * w.getX()).multiply(d)));
  eq.setForceConic();
  Log.debug("3D proc");
  eq.initEquation();
  Polynomial lhs = eq.getNormalForm();
  double xx = lhs.getCoeffValue("xx");
  double xy = lhs.getCoeffValue("xy");
  double yy = lhs.getCoeffValue("yy");
  double x = lhs.getCoeffValue("x");
  double y = lhs.getCoeffValue("y");
  double cst = lhs.getCoeffValue("");
  Log.debug("3D proc done");
  conic.setCoordSys(cs);
  conic.setMatrix(new double[] {xx, yy, cst, xy / 2, x / 2, y / 2});
 }
}
```

### FILE: geogebra3D/kernel3D/commands/SpatialCommandProcessorFactory.java
```java
public class SpatialCommandProcessorFactory implements CommandProcessorFactory {
 public CommandProcessor getProcessor(Commands command, Kernel kernel) {
  if (!kernel.getApplication().areCommands3DEnabled()) {
   return null;
  }
  switch (command) {
   case Plane:
    return new CmdPlane(kernel);
   case PerpendicularPlane:
   case OrthogonalPlane:
    return new CmdOrthogonalPlane(kernel);
   case PlaneBisector:
    return new CmdPlaneBisector(kernel);
   case Prism:
    return new CmdPrism(kernel);
   case Pyramid:
    return new CmdPyramid(kernel);
   case Tetrahedron:
    return new CmdArchimedeanSolid(kernel, Commands.Tetrahedron);
   case Cube:
    return new CmdArchimedeanSolid(kernel, Commands.Cube);
   case Octahedron:
    return new CmdArchimedeanSolid(kernel, Commands.Octahedron);
   case Dodecahedron:
    return new CmdArchimedeanSolid(kernel, Commands.Dodecahedron);
   case Icosahedron:
    return new CmdArchimedeanSolid(kernel, Commands.Icosahedron);
   case Net:
    return new CmdPolyhedronNet(kernel);
   case Sphere:
    return new CmdSphere3D(kernel);
   case Cone:
    return new CmdCone(kernel);
   case InfiniteCone:
   case ConeInfinite:
    return new CmdConeInfinite(kernel);
   case Cylinder:
    return new CmdCylinder(kernel);
   case InfiniteCylinder:
   case CylinderInfinite:
    return new CmdCylinderInfinite(kernel);
   case Side:
   case QuadricSide:
    return new CmdQuadricSide(kernel);
   case Bottom:
    return new CmdBottom(kernel);
   case Top:
    return new CmdTop(kernel);
   case Ends:
    return new CmdEnds(kernel);
   case Volume:
    return new CmdVolume(kernel);
   case Height:
    return new CmdHeight(kernel);
   case SetViewDirection:
    return new CmdSetViewDirection(kernel);
   case SetSpinSpeed:
    return new CmdSetSpinSpeed(kernel);
   case ClosestPointRegion:
    return new CmdClosestPointRegion(kernel);
   case IntersectCircle:
   case IntersectConic:
    return new CmdIntersectConic(kernel);
   case CornerThreeD:
    return new CmdVertexForce3D(kernel);
   default:
    break;
  }
  return null;
 }
}
```

### FILE: geogebra3D/kernel3D/solid/PlatonicSolid.java
```java
public class PlatonicSolid {
 private int[][] faces;
 private Coords[] coords;
 public void set(Coords[] coords, int[][] faces) {
  this.coords = coords;
  this.faces = faces;
 }
 public int getVertexCount() {
  return coords.length;
 }
 public Coords[] getVertices() {
  return coords;
 }
 public int[][] getFaces() {
  return faces;
 }
}
```

### FILE: geogebra3D/kernel3D/solid/PlatonicSolidsFactory.java
```java
public class PlatonicSolidsFactory {
 private static volatile PlatonicSolid tetrahedron;
 private static volatile PlatonicSolid cube;
 private static volatile PlatonicSolid octahedron;
 private static volatile PlatonicSolid dodecahedron;
 private static volatile PlatonicSolid icosahedron;
 public static PlatonicSolid getTetrahedron() {
  if (tetrahedron == null) {
   PlatonicSolid tetrahedron0 = new PlatonicSolid();
   tetrahedron0.set(
     new Coords[] {
      new Coords(0.0, 0.0, 0.0, 1.0),
      new Coords(1.0, 0.0, 0.0, 1.0),
      new Coords(0.5, 0.8660254037844398, 0.0, 1.0),
      new Coords(0.5, 0.28867513459481, 0.8164965809277199, 1.0)
     },
     new int[][] {{2, 0, 1}, {3, 0, 2}, {1, 0, 3}, {2, 1, 3}});
   tetrahedron = tetrahedron0;
  }
  return tetrahedron;
 }
 public static PlatonicSolid getCube() {
  if (cube == null) {
   PlatonicSolid cube0 = new PlatonicSolid();
   cube0.set(
     new Coords[] {
      new Coords(0.0, 0.0, 0.0, 1.0),
      new Coords(1.0, 0.0, 0.0, 1.0),
      new Coords(1.0, 1.0, 0.0, 1.0),
      new Coords(0.0, 1.0, 0.0, 1.0),
      new Coords(0.0, 0.0, 1.0, 1.0),
      new Coords(1.0, 0.0, 1.0, 1.0),
      new Coords(1.0, 1.0, 1.0, 1.0),
      new Coords(0.0, 1.0, 1.0, 1.0)
     },
     new int[][] {
      {3, 0, 1, 2}, {4, 0, 3, 7}, {1, 0, 4, 5}, {2, 1, 5, 6}, {3, 2, 6, 7}, {4, 7, 6, 5}
     });
   cube = cube0;
  }
  return cube;
 }
 public static PlatonicSolid getOctahedron() {
  if (octahedron == null) {
   PlatonicSolid octahedron0 = new PlatonicSolid();
   octahedron0.set(
     new Coords[] {
      new Coords(0.0, 0.0, 0.0, 1.0),
      new Coords(1.0, 0.0, 0.0, 1.0),
      new Coords(0.5, 0.8660254037844398, 0.0, 1.0),
      new Coords(0.5, -0.28867513459481986, 0.81649658092772, 1.0),
      new Coords(1.0, 0.57735026918962, 0.81649658092772, 1.0),
      new Coords(0.0, 0.57735026918962, 0.81649658092772, 1.0)
     },
     new int[][] {
      {2, 0, 1}, {5, 0, 2}, {3, 0, 5}, {1, 0, 3}, {4, 1, 3}, {2, 1, 4}, {5, 2, 4}, {5, 4, 3}
     });
   octahedron = octahedron0;
  }
  return octahedron;
 }
 public static PlatonicSolid getDodecahedron() {
  if (dodecahedron == null) {
   PlatonicSolid dodecahedron0 = new PlatonicSolid();
   dodecahedron0.set(
     new Coords[] {
      new Coords(0.0, 0.0, 0.0, 1.0),
      new Coords(1.0, 0.0, 0.0, 1.0),
      new Coords(1.3090169943749501, 0.9510565162951601, 0.0, 1.0),
      new Coords(0.5, 1.5388417685876306, 0.0, 1.0),
      new Coords(-0.30901699437495, 0.9510565162951601, 0.0, 1.0),
      new Coords(1.3090169943749501, -0.42532540417601983, 0.85065080835204, 1.0),
      new Coords(
        1.8090169943749501, 1.1135163644116104,
        0.85065080835204, 1.0),
      new Coords(0.5, 2.06457288070676, 0.85065080835204, 1.0),
      new Coords(-0.8090169943749501, 1.1135163644116104, 0.85065080835204, 1.0),
      new Coords(-0.30901699437495, -0.42532540417601983, 0.85065080835204, 1.0),
      new Coords(0.5, -0.6881909602355799, 1.3763819204711698, 1.0),
      new Coords(1.8090169943749501, 0.26286555605956996, 1.37638192047118, 1.0),
      new Coords(1.3090169943749501, 1.8017073246472002, 1.3763819204711698, 1.0),
      new Coords(-0.30901699437495, 1.8017073246472002, 1.3763819204711698, 1.0),
      new Coords(-0.8090169943749501, 0.26286555605956996, 1.3763819204711698, 1.0),
      new Coords(0.5, -0.1624598481164502, 2.22703272882321, 1.0),
      new Coords(
        1.3090169943749501, 0.42532540417602016,
        2.22703272882321, 1.0),
      new Coords(1.0, 1.37638192047117, 2.22703272882321, 1.0),
      new Coords(0.0, 1.37638192047117, 2.22703272882321, 1.0),
      new Coords(-0.30901699437495, 0.42532540417602016, 2.22703272882321, 1.0)
     },
     new int[][] {
      {4, 0, 1, 2, 3},
      {9, 0, 4, 8, 14},
      {1, 0, 9, 10, 5},
      {2, 1, 5, 11, 6},
      {3, 2, 6, 12, 7},
      {4, 3, 7, 13, 8},
      {14, 8, 13, 18, 19},
      {9, 14, 19, 15, 10},
      {5, 10, 15, 16, 11},
      {6, 11, 16, 17, 12},
      {7, 12, 17, 18, 13},
      {19, 18, 17, 16, 15}
     });
   dodecahedron = dodecahedron0;
  }
  return dodecahedron;
 }
 public static PlatonicSolid getIcosahedron() {
  if (icosahedron == null) {
   PlatonicSolid icosahedron0 = new PlatonicSolid();
   icosahedron0.set(
     new Coords[] {
      new Coords(0.0, 0.0, 0.0, 1.0),
      new Coords(1.0, 0.0, 0.0, 1.0),
      new Coords(0.5, 0.8660254037844398, 0.0, 1.0),
      new Coords(0.5, -0.6454972243679103, 0.5773502691896201, 1.0),
      new Coords(1.3090169943749501, 0.7557613140761701, 0.5773502691896302, 1.0),
      new Coords(-0.30901699437495, 0.7557613140761701, 0.5773502691896201, 1.0),
      new Coords(-0.30901699437495, -0.17841104488655019, 0.93417235896271, 1.0),
      new Coords(1.3090169943749501, -0.17841104488655019, 0.9341723589627201, 1.0),
      new Coords(0.5, 1.2228474935575302, 0.93417235896271, 1.0),
      new Coords(0.5, -0.28867513459481986, 1.5115226281523402, 1.0),
      new Coords(1.0, 0.57735026918962, 1.5115226281523402, 1.0),
      new Coords(0.0, 0.57735026918962, 1.5115226281523402, 1.0)
     },
     new int[][] {
      {2, 0, 1},
      {5, 0, 2},
      {6, 0, 5},
      {3, 0, 6},
      {1, 0, 3},
      {7, 1, 3},
      {4, 1, 7},
      {2, 1, 4},
      {8, 2, 4},
      {5, 2, 8},
      {10, 4, 7},
      {8, 4, 10},
      {11, 8, 10},
      {5, 8, 11},
      {9, 10, 7},
      {11, 10, 9},
      {6, 11, 9},
      {5, 11, 6},
      {3, 9, 7},
      {6, 9, 3}
     });
   icosahedron = icosahedron0;
  }
  return icosahedron;
 }
}
```

### FILE: geogebra3D/kernel3D/transform/MirrorableAtPlane.java
```java
public interface MirrorableAtPlane extends Mirrorable {
 void mirror(GeoCoordSys2D plane);
}
```

### FILE: geogebra3D/kernel3D/transform/TransformDilate3D.java
```java
public class TransformDilate3D extends TransformDilate {
 public TransformDilate3D(Construction cons, GeoNumberValue ratio, GeoPointND center) {
  super(cons, ratio, center);
 }
 protected AlgoTransformation getTransformAlgo(GeoElement geo) {
  AlgoTransformation algo = new AlgoDilate3D(cons, geo, ratio, center);
  return algo;
 }
}
```

### FILE: geogebra3D/kernel3D/transform/TransformMirror3D.java
```java
public class TransformMirror3D extends TransformMirror {
 public TransformMirror3D(Construction cons, GeoPointND point) {
  super(cons, (GeoElement) point);
 }
 public TransformMirror3D(Construction cons, GeoLineND line) {
  super(cons, (GeoElement) line);
 }
 public TransformMirror3D(Construction cons, GeoCoordSys2D plane) {
  super(cons, (GeoElement) plane);
 }
 protected AlgoTransformation getTransformAlgo(GeoElement geo) {
  AlgoTransformation algo = null;
  if (mirror.isGeoPoint()) {
   algo = new AlgoMirror3D(cons, geo, (GeoPointND) mirror);
  } else if (mirror.isGeoLine()) {
   algo = new AlgoMirror3D(cons, geo, (GeoLineND) mirror);
  } else if (mirror instanceof GeoCoordSys2D) {
   algo = new AlgoMirror3D(cons, geo, (GeoCoordSys2D) mirror);
  }
  return algo;
 }
}
```

### FILE: geogebra3D/kernel3D/transform/TransformRotate3D.java
```java
public class TransformRotate3D extends TransformRotate {
 private GeoDirectionND orientation;
 private GeoLineND line;
 public TransformRotate3D(
   Construction cons, GeoNumberValue angle, GeoPointND center, GeoDirectionND orientation) {
  super(cons, angle, center);
  this.orientation = orientation;
 }
 public TransformRotate3D(Construction cons, GeoNumberValue angle, GeoLineND line) {
  super(cons, angle);
  this.line = line;
 }
 protected AlgoTransformation getTransformAlgo(GeoElement geo) {
  AlgoTransformation algo;
  if (line == null) {
   algo = new AlgoRotate3DPointOrientation(cons, geo, angle, center, orientation);
  } else {
   algo = new AlgoRotate3DLine(cons, geo, angle, line);
  }
  return algo;
 }
}
```

### FILE: geogebra3D/kernel3D/transform/TransformTranslate3D.java
```java
public class TransformTranslate3D extends Transform {
 private GeoElement transVec;
 public TransformTranslate3D(Construction cons, GeoVectorND transVec) {
  this.transVec = (GeoElement) transVec;
  this.cons = cons;
 }
 protected AlgoTransformation getTransformAlgo(GeoElement geo) {
  AlgoTranslate3D algo = new AlgoTranslate3D(cons, geo, transVec);
  return algo;
 }
}
```
