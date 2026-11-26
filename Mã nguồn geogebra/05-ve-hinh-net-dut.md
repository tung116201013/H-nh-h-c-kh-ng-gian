# 05-ve-hinh-net-dut.md

Nguồn: GeoGebra (EUPL v1.2). Mã Java đã bỏ bình luận/import để gọn. Chỉ để ĐỌC lấy ý tưởng thuật toán, viết lại bằng JavaScript.

Nội dung: Phần vẽ: đa diện, đa giác, đoạn thẳng, mặt phẳng, cách xử lý nét đứt/nét liền (Drawable3D...)

Danh sách file trong phần này:
- DrawExtrusionOrConify3D.java
- DrawPlane3D.java
- DrawPolygon3D.java
- DrawPolyhedron3D.java
- DrawSegment3D.java
- Drawable3D.java

### FILE: geogebra3D/euclidian3D/draw/DrawExtrusionOrConify3D.java
```java
public abstract sealed class DrawExtrusionOrConify3D extends Drawable3DSurfaces
  implements Previewable permits DrawConify3D, DrawExtrusion3D {
 private ArrayList<GeoPolygon> selectedPolygons;
 private ArrayList<GeoConicND> selectedConics;
 protected ExtrusionComputer extrusionComputer;
 private GeoNumeric height;
 private GeoElement basis;
 private CreatePolyhedronCallback callback;
 protected void drawSurfaceGeometry(Renderer renderer) {
 }
 public void drawGeometry(Renderer renderer) {
 }
 public void drawGeometryHiding(Renderer renderer) {
 }
 public void drawGeometryHidden(Renderer renderer) {
 }
 public void drawOutline(Renderer renderer) {
 }
 public int getPickOrder() {
  return DRAW_PICK_ORDER_SURFACE;
 }
 public void addToDrawable3DLists(Drawable3DLists lists) {
  addToDrawable3DLists(lists, DRAW_TYPE_CLOSED_SURFACES_CURVED);
 }
 public void removeFromDrawable3DLists(Drawable3DLists lists) {
  removeFromDrawable3DLists(lists, DRAW_TYPE_CLOSED_SURFACES_CURVED);
 }
 protected boolean updateForItSelf() {
  return true;
 }
 public DrawExtrusionOrConify3D(
   EuclidianView3D a_view3D,
   ArrayList<GeoPolygon> selectedPolygons,
   ArrayList<GeoConicND> selectedConics) {
  super(a_view3D);
  this.selectedPolygons = selectedPolygons;
  this.selectedConics = selectedConics;
  updatePreview();
 }
 public void updateMousePos(double xRW, double yRW) {
 }
 protected abstract AlgoForExtrusion getAlgo(GeoPolygon extBasis, GeoNumeric extHeight);
 protected abstract AlgoForExtrusion getAlgo(GeoConicND extBasis, GeoNumeric extHeight);
 public void updatePreview() {
  if (extrusionComputer == null) {
   if (selectedPolygons.size() == 1) {
    basis = selectedPolygons.get(0);
    height = new GeoNumeric(getView3D().getKernel().getConstruction(), 0.0001);
    extrusionComputer = new ExtrusionComputer(getAlgo((GeoPolygon) basis, height));
   } else if (selectedConics.size() == 1) {
    basis = selectedConics.get(0);
    height = new GeoNumeric(getView3D().getKernel().getConstruction(), 0.0001);
    extrusionComputer = new ExtrusionComputer(getAlgo((GeoConicND) basis, height));
   }
   if (extrusionComputer != null) {
    extrusionComputer.getAlgo().removeOutputFromAlgebraView();
    extrusionComputer.getAlgo().removeOutputFromPicking();
    extrusionComputer.getAlgo().setOutputPointsEuclidianVisible(false);
    extrusionComputer.getAlgo().notifyUpdateOutputPoints();
    ((EuclidianController3D) getView3D().getEuclidianController())
      .setHandledGeo(extrusionComputer.getAlgo().getGeoToHandle(), basis);
    extrusionComputer.getAlgo().setOutputOtherEuclidianVisible(true);
    extrusionComputer.getAlgo().notifyUpdateOutputOther();
   }
  }
 }
 public void disposePreview() {
  super.disposePreview();
  ((EuclidianController3D) getView3D().getEuclidianController()).disposeHandledGeo();
  if (extrusionComputer != null) {
   extrusionComputer.getAlgo().remove();
   extrusionComputer = null;
  }
 }
 public void createPolyhedron() {
  ((EuclidianController3D) getView3D().getEuclidianController()).disposeHandledGeo();
  if (extrusionComputer != null) {
   Hits hits = new Hits();
   if (!extrusionComputer.getWasComputedByDragging(getView3D().isXREnabled())) {
    App app = getView3D().getApplication();
    if (callback == null) {
     callback = new CreatePolyhedronCallback();
    }
    callback.set(basis, getView3D(), extrusionComputer);
    app.getDialogManager()
      .showNumberInputDialog(
        extrusionComputer.getAlgo().getOutput(0).translatedTypeString(),
        app.getLocalization().getMenu("Altitude"),
        "",
        basis.getMainDirection().dotproduct(getView3D().getViewDirection()) > 0,
        app.getLocalization().getMenu("PositiveValuesFollowTheView"),
        callback);
   } else {
    hits.add(height);
    getView3D().getEuclidianController3D().addSelectedNumberValue(hits, 1, false, false);
   }
   if (extrusionComputer != null) {
    extrusionComputer.getAlgo().remove();
    extrusionComputer = null;
   }
  }
 }
 static class CreatePolyhedronCallback implements AsyncOperation<GeoNumberValue> {
  private GeoElement basis;
  private EuclidianView3D view;
  private ExtrusionComputer extrusionComputer;
  void set(GeoElement basis, EuclidianView3D view, ExtrusionComputer extrusionComputer) {
   this.basis = basis;
   this.view = view;
   this.extrusionComputer = extrusionComputer;
  }
  public void callback(GeoNumberValue obj) {
   GeoNumberValue num = obj;
   if (extrusionComputer != null) {
    extrusionComputer.getAlgo().remove();
    extrusionComputer = null;
   }
   GeoElement ret;
   if (basis.isGeoPolygon()) {
    if (view.getEuclidianController().getMode() == EuclidianConstants.MODE_EXTRUSION) {
     ret = basis.getKernel().getManager3D().prism(null, (GeoPolygon) basis, num)[0];
    } else {
     ret = basis.getKernel().getManager3D().pyramid(null, (GeoPolygon) basis, num)[0];
    }
   } else { 
    if (view.getEuclidianController().getMode() == EuclidianConstants.MODE_EXTRUSION) {
     ret = basis.getKernel().getManager3D().cylinderLimited(null, (GeoConicND) basis, num)[0];
    } else {
     ret = basis.getKernel().getManager3D().coneLimited(null, (GeoConicND) basis, num)[0];
    }
   }
   view.getEuclidianController().setDialogOccurred();
   view.getApplication().getSelectionManager().clearLists();
   view.getApplication().getSelectionManager().clearSelectedGeos(false, false);
   view.getApplication().getSelectionManager().addSelectedGeo(ret, true, true);
   view.disposePreview();
   view.getApplication().storeUndoInfo();
  }
 }
}
```

### FILE: geogebra3D/euclidian3D/draw/DrawPlane3D.java
```java
public class DrawPlane3D extends Drawable3DSurfaces {
 private static final double INV_SQRT_2 = 1 / Math.sqrt(2);
 private int gridIndex = -1;
 private int gridOutlineIndex = -1;
 private final double[] minmaxXFinal = new double[2];
 private final double[] minmaxYFinal = new double[2];
 protected boolean viewDirectionIsParallel;
 private final Coords boundsMin = new Coords(3);
 private final Coords boundsMax = new Coords(3);
 private final Coords tmpCoords1 = Coords.createInhomCoorsInD3();
 private final Coords tmpCoords2 = Coords.createInhomCoorsInD3();
 private Coords vn = new Coords(3);
 public DrawPlane3D(EuclidianView3D a_view3D, GeoPlane3D a_plane3D) {
  this(a_view3D, a_plane3D, null);
 }
 public void setWaitForReset() {
  gridIndex = -1;
  gridOutlineIndex = -1;
  super.setWaitForReset();
 }
 public DrawPlane3D(EuclidianView3D a_view3D, GeoPlane3D a_plane3D, GeoElement geo2) {
  super(a_view3D);
  init(a_plane3D, geo2);
  setMinMax();
 }
 protected void init(GeoElement a_plane3D, GeoElement geo2) {
  super.init(a_plane3D);
 }
 public void drawGeometry(Renderer renderer) {
  drawPlate(renderer);
 }
 protected void drawSurfaceGeometry(Renderer renderer) {
  drawGeometry(renderer);
 }
 protected void drawPlate(Renderer renderer) {
  if (getPlane().isPlateVisible()) {
   renderer.getRendererImpl().setLayer(getLayer());
   renderer.getGeometryManager().draw(getSurfaceIndex());
   renderer.getRendererImpl().setLayer(Renderer.LAYER_DEFAULT);
  }
 }
 public int getLayer() {
  return super.getLayer() + Renderer.LAYER_PLANE_SHIFT;
 }
 public void drawGeometryHiding(Renderer renderer) {
  drawPlate(renderer);
 }
 public void drawOutline(Renderer renderer) {
  if (!isGridVisible()) {
   return;
  }
  if (!viewDirectionIsParallel) {
   renderer.getTextures().setDashFromLineType(getGeoElement().getLineType());
   renderer.getGeometryManager().draw(gridIndex);
  }
 }
 public void drawGeometryHidden(Renderer renderer) {
  if (!isVisible()) {
   return;
  }
  if (!isGridVisible()) {
   return;
  }
  if (viewDirectionIsParallel) {
   renderer.getRendererImpl().setDashTexture(Textures.DASH_LONG);
   renderer.getGeometryManager().draw(gridOutlineIndex);
  } else {
   setLineTextureHidden(renderer);
   renderer.getGeometryManager().draw(gridIndex);
  }
 }
 protected boolean isGridVisible() {
  return getPlane().isGridVisible() || viewDirectionIsParallel;
 }
 protected boolean updateForItSelf() {
  getPlane().setGridCorners(minmaxXFinal[0], minmaxYFinal[0], minmaxXFinal[1], minmaxYFinal[1]);
  if (isGridVisible()) {
   updateGridDistances();
  }
  return updateGeometry();
 }
 private void updateGridDistances() {
  CoordMatrix drawingMatrix = getPlane().getCoordSys().getDrawingMatrix();
  getPlane()
    .setGridDistances(
      getView3D().getGridDistances(getMaxLengthIndex(drawingMatrix.getVx())),
      getView3D().getGridDistances(getMaxLengthIndex(drawingMatrix.getVy())));
 }
 private static int getMaxLengthIndex(Coords v) {
  int ret = 0;
  double max = Math.abs(v.getX());
  double l = Math.abs(v.getY());
  if (l > max) {
   max = l;
   ret = 1;
  }
  l = Math.abs(v.getZ());
  if (l > max) {
   ret = 2;
  }
  return ret;
 }
 protected int getGridThickness() {
  return getGeoElement().getLineThickness();
 }
 protected boolean updateGeometry() {
  Renderer renderer = getView3D().getRenderer();
  GeoPlane3D geo = getPlane();
  float xmin1 = (float) geo.getXmin(), xmax1 = (float) geo.getXmax();
  float ymin1 = (float) geo.getYmin(), ymax1 = (float) geo.getYmax();
  updateBounds(xmin1, xmax1, ymin1, ymax1);
  setPackSurface();
  PlotterSurface surface = renderer.getGeometryManager().getSurface();
  surface.start(geo, getReusableSurfaceIndex());
  surface.setU(xmin1, xmax1);
  surface.setNbU(2);
  surface.setV(ymin1, ymax1);
  surface.setNbV(2);
  float xdelta1 = xmax1 - xmin1;
  float ydelta1 = ymax1 - ymin1;
  if (!getView3D().useClippingCube()) {
   float fading;
   fading = xdelta1 * geo.getFading();
   surface.setUFading(fading, fading);
   fading = ydelta1 * geo.getFading();
   surface.setVFading(fading, fading);
  }
  surface.draw(shouldBePackedForManager());
  setSurfaceIndex(surface.end());
  endPacking();
  CoordSys coordsys = geo.getCoordSys();
  if (shouldBePackedForManager()) {
   setPackCurve();
   PlotterBrush brush = renderer.getGeometryManager().getBrush();
   brush.start(getReusableGeometryIndex());
   if (viewDirectionIsParallel) {
    int t = getGridThickness();
    float scale = (float) getView3D().getScale();
    float thickness = brush.setThickness(t == 0 ? 1 : t, (float) getView3D().getScale());
    thickness = thickness / scale;
    brush.setPlainTexture();
    coordsys.getPointForDrawing(xmin1, ymax1 - thickness, tmpCoords1);
    coordsys.getPointForDrawing(xmax1, ymax1 - thickness, tmpCoords2);
    brush.segment(tmpCoords1, tmpCoords2);
    coordsys.getPointForDrawing(xmin1, ymin1 + thickness, tmpCoords1);
    coordsys.getPointForDrawing(xmax1, ymin1 + thickness, tmpCoords2);
    brush.segment(tmpCoords1, tmpCoords2);
    coordsys.getPointForDrawing(xmin1 + thickness, ymin1, tmpCoords1);
    coordsys.getPointForDrawing(xmin1 + thickness, ymax1, tmpCoords2);
    brush.segment(tmpCoords1, tmpCoords2);
    coordsys.getPointForDrawing(xmax1 - thickness, ymin1, tmpCoords1);
    coordsys.getPointForDrawing(xmax1 - thickness, ymax1, tmpCoords2);
    brush.segment(tmpCoords1, tmpCoords2);
   } else {
    brush.setThickness(getGridThickness(), (float) getView3D().getScale());
    double dx = geo.getGridXd();
    double dy;
    if (Double.isNaN(dx)) {
     dx = getView3D().getNumbersDistance();
     dy = dx;
    } else {
     dy = geo.getGridYd();
    }
    brush.setAffineTexture((0f - xmin1) / ydelta1, 0.25f);
    int i0 = (int) (ymin1 / dy);
    if (ymin1 > 0) {
     i0++;
    }
    for (int i = i0; i <= ymax1 / dy; i++) {
     coordsys.getPointForDrawing(xmin1, i * dy, tmpCoords1);
     coordsys.getPointForDrawing(xmax1, i * dy, tmpCoords2);
     brush.segment(tmpCoords1, tmpCoords2);
    }
    brush.setAffineTexture((0f - ymin1) / xdelta1, 0.25f);
    i0 = (int) (xmin1 / dx);
    if (xmin1 > 0) {
     i0++;
    }
    for (int i = i0; i <= xmax1 / dx; i++) {
     coordsys.getPointForDrawing(i * dx, ymin1, tmpCoords1);
     coordsys.getPointForDrawing(i * dx, ymax1, tmpCoords2);
     brush.segment(tmpCoords1, tmpCoords2);
    }
   }
   setGeometryIndex(brush.end());
   endPacking();
  } else if (isGridVisible()) {
   PlotterBrush brush = renderer.getGeometryManager().getBrush();
   if (hasTrace()) {
    brush.start(-1);
   } else {
    brush.start(gridIndex);
   }
   removeGeometryIndex(gridIndex);
   final float thickness =
     brush.setThickness(getGridThickness(), (float) getView3D().getScale());
   brush.setColor(getGeoElement().getObjectColor());
   double dx = geo.getGridXd();
   double dy;
   if (Double.isNaN(dx)) {
    dx = getView3D().getNumbersDistance();
    dy = dx;
   } else {
    dy = geo.getGridYd();
   }
   brush.setAffineTexture((0f - xmin1) / ydelta1, 0.25f);
   int i0 = (int) (ymin1 / dy);
   if (ymin1 > 0) {
    i0++;
   }
   Coords start = new Coords(4);
   Coords end = new Coords(4);
   for (int i = i0; i <= ymax1 / dy; i++) {
    brush.segment(
      coordsys.getPointForDrawing(xmin1, i * dy, start),
      coordsys.getPointForDrawing(xmax1, i * dy, end));
   }
   brush.setAffineTexture((0f - ymin1) / xdelta1, 0.25f);
   i0 = (int) (xmin1 / dx);
   if (xmin1 > 0) {
    i0++;
   }
   for (int i = i0; i <= xmax1 / dx; i++) {
    brush.segment(
      coordsys.getPointForDrawing(i * dx, ymin1, start),
      coordsys.getPointForDrawing(i * dx, ymax1, end));
   }
   gridIndex = brush.end();
   brush.start(gridOutlineIndex);
   removeGeometryIndex(gridOutlineIndex);
   boolean showClippingCube = getView3D().showClippingCube();
   if (showClippingCube) {
    brush.setAffineTexture((0f - xmin1) / ydelta1, 0.25f);
   } else {
    brush.setPlainTexture();
   }
   brush.segment(
     coordsys.getPointForDrawing(xmin1, ymax1 - thickness, start),
     coordsys.getPointForDrawing(xmax1, ymax1 - thickness, end));
   brush.segment(
     coordsys.getPointForDrawing(xmin1, ymin1 + thickness, start),
     coordsys.getPointForDrawing(xmax1, ymin1 + thickness, end));
   if (showClippingCube) {
    brush.setAffineTexture((0f - ymin1) / xdelta1, 0.25f);
   }
   brush.segment(
     coordsys.getPointForDrawing(xmin1 + thickness, ymin1, start),
     coordsys.getPointForDrawing(xmin1 + thickness, ymax1, end));
   brush.segment(
     coordsys.getPointForDrawing(xmax1 - thickness, ymin1, start),
     coordsys.getPointForDrawing(xmax1 - thickness, ymax1, end));
   gridOutlineIndex = brush.end();
  }
  return true;
 }
 protected void updateBounds(double xmin, double xmax, double ymin, double ymax) {
  GeoPlane3D geo = getPlane();
  CoordSys coordsys = geo.getCoordSys();
  boundsMin.setZ(Double.POSITIVE_INFINITY);
  boundsMax.setZ(Double.NEGATIVE_INFINITY);
  updateZMinMax(coordsys, xmin, ymin);
  updateZMinMax(coordsys, xmin, ymax);
  updateZMinMax(coordsys, xmax, ymax);
  updateZMinMax(coordsys, xmax, ymin);
  boundsMin.setX(xmin);
  boundsMax.setX(xmax);
  boundsMin.setY(ymin);
  boundsMax.setY(ymax);
 }
 private void updateZMinMax(CoordSys coordsys, double x, double y) {
  coordsys.getPointForDrawing(x, y, tmpCoords1);
  double z = tmpCoords1.getZ();
  if (z < boundsMin.getZ()) {
   boundsMin.setZ(z);
  }
  if (z > boundsMax.getZ()) {
   boundsMax.setZ(z);
  }
 }
 public void enlargeBounds(Coords min, Coords max, boolean dontExtend) {
  if (!Double.isNaN(boundsMin.getX())) {
   if (dontExtend) {
    reduceBounds(boundsMin, boundsMax);
   }
   enlargeBounds(min, max, boundsMin, boundsMax);
  }
 }
 protected void updateForView() {
  if (getView3D().viewChanged()) {
   if (!getView3D().viewChangedByTranslate()
     && !getView3D().viewChangedByZoom()) { 
    boolean oldViewDirectionIsParallel = viewDirectionIsParallel;
    checkViewDirectionIsParallel();
    if (oldViewDirectionIsParallel != viewDirectionIsParallel) {
     setWaitForUpdate(false);
    }
    return;
   }
   setWaitForUpdate();
  }
 }
 public void setWaitForUpdate() {
  setWaitForUpdate(true);
 }
 private void setWaitForUpdate(boolean checkViewDirection) {
  super.setWaitForUpdate();
  setMinMax();
  if (checkViewDirection) {
   checkViewDirectionIsParallel();
  }
 }
 protected void setMinMax() {
  if (!getGeoElement().isDefined()) {
   return;
  }
  if (getView3D().isXREnabled() || getView3D().isUnity()) {
   setMinMax(getView3D().getClippingCubeDrawable().getVerticesLarge());
  } else if (getView3D().useClippingCube() || !getView3D().getSettings().hasSameScales()) {
   setMinMax(getView3D().getClippingCubeDrawable().getVertices());
  } else { 
   setMinMax(getView3D().getCenter(), getView3D().getFrustumInteriorRadius());
  }
 }
 protected GeoPlane3D getPlane() {
  return (GeoPlane3D) getGeoElement();
 }
 private void setMinMax(Coords[] v) {
  GeoPlane3D geo = getPlane();
  CoordMatrix m = geo.getCoordSys().getDrawingMatrix();
  Coords vz = m.getVz();
  if (!getView3D().scaleAndNormalizeNormalXYZ(vz, vn)) {
   vn = vz;
  }
  tmpCoords2.set(v[0]);
  tmpCoords2.projectPlaneThruVInPlaneCoords(m, vn, tmpCoords1);
  minmaxXFinal[0] = tmpCoords1.getX();
  minmaxYFinal[0] = tmpCoords1.getY();
  minmaxXFinal[1] = tmpCoords1.getX();
  minmaxYFinal[1] = tmpCoords1.getY();
  for (int i = 1; i < v.length; i++) {
   enlargeMinMax(v[i], m, vn);
  }
 }
 private void enlargeMinMax(Coords v, CoordMatrix m, Coords vnCoords) {
  tmpCoords2.set(v);
  tmpCoords2.projectPlaneThruVInPlaneCoords(m, vnCoords, tmpCoords1);
  double x = tmpCoords1.getX();
  if (x < minmaxXFinal[0]) {
   minmaxXFinal[0] = x;
  } else if (x > minmaxXFinal[1]) {
   minmaxXFinal[1] = x;
  }
  double y = tmpCoords1.getY();
  if (y < minmaxYFinal[0]) {
   minmaxYFinal[0] = y;
  } else if (y > minmaxYFinal[1]) {
   minmaxYFinal[1] = y;
  }
 }
 private void setMinMax(Coords origin, double radius) {
  GeoPlane3D geo = getPlane();
  CoordMatrix m = geo.getCoordSys().getDrawingMatrix();
  origin.projectPlaneInPlaneCoords(m, tmpCoords1);
  double a = radius * INV_SQRT_2;
  minmaxXFinal[0] = tmpCoords1.getX() - a;
  minmaxYFinal[0] = tmpCoords1.getY() - a;
  minmaxXFinal[1] = tmpCoords1.getX() + a;
  minmaxYFinal[1] = tmpCoords1.getY() + a;
 }
 public int getPickOrder() {
  return DRAW_PICK_ORDER_SURFACE;
 }
 public void addToDrawable3DLists(Drawable3DLists lists) {
  addToDrawable3DLists(lists, DRAW_TYPE_CURVES);
  super.addToDrawable3DLists(lists);
 }
 public void removeFromDrawable3DLists(Drawable3DLists lists) {
  removeFromDrawable3DLists(lists, DRAW_TYPE_CURVES);
  super.removeFromDrawable3DLists(lists);
 }
 protected void checkViewDirectionIsParallel() {
  viewDirectionIsParallel = getView3D().showPlaneOutlineIfNeeded()
    && DoubleUtil.isZero(
      getPlane().getCoordSys().getEquationVector().dotproduct(getView3D().getEyePosition()));
 }
 public void setWaitForUpdateVisualStyle(GProperty prop) {
  super.setWaitForUpdateVisualStyle(prop);
  if (prop == GProperty.COLOR || prop == GProperty.HIGHLIGHT) {
   setWaitForUpdateColor();
  } else if (prop == GProperty.VISIBLE) {
   setWaitForUpdateVisibility();
  } else {
   setWaitForUpdate();
  }
 }
 public boolean hit(Hitting hitting) {
  return hit(hitting, tmpCoords1, tmpCoords2);
 }
 public boolean hit(Hitting hitting, Coords globalCoords, Coords inPlaneCoords) {
  if (waitForReset) { 
   return false;
  }
  if (getGeoElement().getAlphaValue() < EuclidianController.MIN_VISIBLE_ALPHA_VALUE) {
   return false;
  }
  GeoPlane3D plane = getPlane();
  hitting
    .getOrigin()
    .projectPlaneThruVIfPossible(
      plane.getCoordSys().getDrawingMatrix(),
      hitting.getDirection(),
      globalCoords,
      inPlaneCoords);
  if (!hitting.isInsideClipping(globalCoords)) {
   return false;
  }
  double x = inPlaneCoords.getX();
  if (x < plane.getXmin()) {
   return false;
  }
  if (x > plane.getXmax()) {
   return false;
  }
  double y = inPlaneCoords.getY();
  if (y < plane.getYmin()) {
   return false;
  }
  if (y > plane.getYmax()) {
   return false;
  }
  double parameterOnHitting = inPlaneCoords.getZ();
  setZPick(
    parameterOnHitting, parameterOnHitting, hitting.discardPositiveHits(), -parameterOnHitting);
  return true;
 }
 public void exportToPrinter3D(ExportToPrinter3D exportToPrinter3D, boolean exportSurface) {
  if (isVisible()) {
   if (exportSurface) {
    exportToPrinter3D.exportSurface(this, true, false);
   } else {
    if (isGridVisible()) {
     exportToPrinter3D.exportCurve(this, Export3DType.CURVE);
    }
   }
  }
 }
}
```

### FILE: geogebra3D/euclidian3D/draw/DrawPolygon3D.java
```java
public class DrawPolygon3D extends Drawable3DSurfaces implements Previewable {
 private int surfaceDrawTypeAdded;
 private boolean curvesAdded;
 private Coords[] vertices = new Coords[0];
 private ArrayList<GeoPointND> selectedPoints;
 private ArrayList<DrawSegment3D> segments;
 private ArrayList<ArrayList<GeoPointND>> segmentsPoints;
 private boolean isPreview = false;
 private Coords project;
 private Coords globalCoords;
 private Coords inPlaneCoords;
 private double[] parameters = new double[2];
 private Coords boundsMin = new Coords(3);
 private Coords boundsMax = new Coords(3);
 private GeoPoint3D hittingPointForOutline;
 public DrawPolygon3D(EuclidianView3D a_view3D, GeoPolygon polygon) {
  super(a_view3D, polygon);
  setPickingType(PickingType.SURFACE);
 }
 public void drawGeometry(Renderer renderer) {
  renderer.getRendererImpl().setLayer(getLayer());
  renderer.getGeometryManager().draw(getGeometryIndex());
  renderer.getRendererImpl().setLayer(Renderer.LAYER_DEFAULT);
 }
 public void drawOutline(Renderer renderer) {
  if (isVisible()) {
   setHighlightingColor();
   renderer.getTextures().setDashFromLineType(getGeoElement().getLineType());
   drawGeometry(renderer);
  }
  drawTracesOutline(renderer, false);
 }
 public void drawGeometryHiding(Renderer renderer) {
  drawSurfaceGeometry(renderer);
 }
 public void drawGeometryHidden(Renderer renderer) {
  drawGeometry(renderer);
 }
 protected void drawGeometryForPicking(Renderer renderer, PickingType type) {
  if (type == PickingType.POINT_OR_CURVE) {
   drawGeometry(renderer);
  } else {
   if (getAlpha() > 0) { 
    drawSurfaceGeometry(renderer);
   }
  }
 }
 protected void drawSurfaceGeometry(Renderer renderer) {
  renderer.getRendererImpl().setLayer(getLayer());
  renderer.getGeometryManager().draw(getSurfaceIndex());
  renderer.getRendererImpl().setLayer(Renderer.LAYER_DEFAULT);
 }
 public int getPickOrder() {
  return DRAW_PICK_ORDER_SURFACE; 
 }
 public void addToDrawable3DLists(Drawable3DLists lists) {
  if (((GeoPolygon) getGeoElement()).isPartOfClosedSurface()) {
   surfaceDrawTypeAdded = DRAW_TYPE_CLOSED_SURFACES_NOT_CURVED;
  } else {
   surfaceDrawTypeAdded = DRAW_TYPE_SURFACES;
  }
  addToDrawable3DLists(lists, surfaceDrawTypeAdded);
  if (!((GeoPolygon) getGeoElement()).wasInitLabelsCalled()) { 
   addToDrawable3DLists(lists, DRAW_TYPE_CURVES);
   curvesAdded = true;
  } else {
   curvesAdded = false;
  }
 }
 public void removeFromDrawable3DLists(Drawable3DLists lists) {
  removeFromDrawable3DLists(lists, surfaceDrawTypeAdded);
  if (curvesAdded) {
   removeFromDrawable3DLists(lists, DRAW_TYPE_CURVES);
  }
 }
 public boolean addedFromClosedSurface() {
  return surfaceDrawTypeAdded == DRAW_TYPE_CLOSED_SURFACES_NOT_CURVED;
 }
 private void updateVertices(GeoPolygon polygon, int pointLength) {
  if (vertices.length < pointLength) {
   vertices = new Coords[pointLength];
   for (int i = 0; i < pointLength; i++) {
    vertices[i] = new Coords(3);
   }
  }
  for (int i = 0; i < pointLength; i++) {
   vertices[i].setValues(polygon.getPoint3D(i), 3);
  }
  if (pointLength > 0) {
   boundsMin.setValues(vertices[0], 3);
   boundsMax.setValues(vertices[0], 3);
   for (int i = 1; i < pointLength; i++) {
    enlargeBounds(boundsMin, boundsMax, vertices[i]);
   }
  }
 }
 public void enlargeBounds(Coords min, Coords max, boolean dontExtend) {
  enlargeBounds(min, max, boundsMin, boundsMax);
 }
 protected boolean updateForItSelf() {
  GeoPolygon polygon = (GeoPolygon) getGeoElement();
  int pointLength = polygon.getPointsLength();
  if (pointLength < 2) { 
   setSurfaceIndex(-1);
   return true;
  }
  try {
   updateVertices(polygon, pointLength);
  } catch (Exception e) {
   setSurfaceIndex(-1);
   return true;
  }
  Renderer renderer = getView3D().getRenderer();
  if (!isPreview && !polygon.wasInitLabelsCalled()) { 
   updateOutline(renderer, vertices, pointLength);
  }
  if (pointLength < 3) { 
   setSurfaceIndex(-1);
   return true;
  }
  int index = renderer.getGeometryManager().startPolygons(this);
  drawPolygon(renderer, polygon, vertices, pointLength);
  renderer.getGeometryManager().endPolygons(this);
  setSurfaceIndex(index);
  return true;
 }
 public static void drawPolygon(
   Renderer renderer, GeoPolygon polygon, Coords[] vertices, int verticesLength) {
  Coords n = polygon.getMainDirection();
  PolygonTriangulation pt = polygon.getPolygonTriangulation();
  pt.clear();
  try {
   if (pt.updatePoints() > 2) {
    Convexity convexity = pt.checkIsConvex();
    if (convexity != Convexity.NOT) {
     drawConvex(renderer, polygon, n, vertices, verticesLength, convexity);
    } else {
     pt.setIntersections();
     pt.triangulate();
     pt.setCompleteVertices(vertices, polygon.getCoordSys(), verticesLength);
     drawFans(renderer, polygon, n, vertices, verticesLength);
    }
   }
  } catch (Exception e) {
   Log.debug(e.getMessage());
   Log.debug(e);
  }
 }
 private static void drawConvex(
   Renderer renderer,
   GeoPolygon polygon,
   Coords n,
   Coords[] vertices,
   int verticesLength,
   Convexity convexity) {
  boolean reverse = polygon.getReverseNormalForDrawing() ^ (convexity == Convexity.CLOCKWISE);
  renderer.getGeometryManager().drawPolygonConvex(n, vertices, verticesLength, reverse);
 }
 private static void drawFans(
   Renderer renderer, GeoPolygon polygon, Coords n, Coords[] vertices, int verticesLength) {
  PolygonTriangulation pt = polygon.getPolygonTriangulation();
  Coords[] verticesWithIntersections = pt.getCompleteVertices(vertices, verticesLength);
  renderer
    .getGeometryManager()
    .drawTriangleFans(
      n, verticesWithIntersections, pt.getMaxPointIndex(), pt.getTriangleFans());
 }
 private void updateOutline(Renderer renderer, Coords[] outlineVertices, int length) {
  setPackCurve(false);
  int thickness = getGeoElement().getLineThickness();
  if (thickness == 0) {
   setGeometryIndex(-1);
  } else {
   PlotterBrush brush = renderer.getGeometryManager().getBrush();
   brush.start(getReusableGeometryIndex());
   brush.setThickness(thickness, (float) getView3D().getScale());
   for (int i = 0; i < length - 1; i++) {
    brush.setAffineTexture(0.5f, 0.25f);
    brush.segment(outlineVertices[i], outlineVertices[i + 1]);
   }
   brush.setAffineTexture(0.5f, 0.25f);
   brush.segment(outlineVertices[length - 1], outlineVertices[0]);
   setGeometryIndex(brush.end());
  }
  endPacking();
 }
 protected void updateForView() {
  if (getView3D().viewChangedByZoom()) {
   Renderer renderer = getView3D().getRenderer();
   GeoPolygon polygon = (GeoPolygon) getGeoElement();
   int verticesLength = polygon.getPointsLength();
   if (!((GeoPolygon) getGeoElement()).wasInitLabelsCalled()) {
    if (vertices != null && vertices.length >= verticesLength) {
     updateOutline(renderer, vertices, verticesLength);
    }
   }
   try {
    PolygonTriangulation pt = polygon.getPolygonTriangulation();
    if (pt.getMaxPointIndex() > 2) {
     int index = renderer.getGeometryManager().startPolygons(this);
     Coords n = polygon.getMainDirection();
     Convexity convexity = pt.checkIsConvex();
     if (convexity != Convexity.NOT) {
      drawConvex(renderer, polygon, n, vertices, verticesLength, convexity);
     } else {
      drawFans(renderer, polygon, n, vertices, verticesLength);
     }
     renderer.getGeometryManager().endPolygons(this);
     setSurfaceIndex(index);
    }
   } catch (Exception e) {
    Log.debug(e.getMessage());
    Log.debug(e);
    endPacking();
   }
  }
 }
 protected boolean willNeedUpdateOnVisibleAgain() {
  return getView3D().viewChangedByZoom();
 }
 public DrawPolygon3D(EuclidianView3D a_view3D, ArrayList<GeoPointND> selectedPoints) {
  super(a_view3D);
  Kernel3D kernel = getView3D().getKernel();
  setGeoElement(new GeoPolygon3D(kernel.getConstruction(), null));
  getGeoElement().setIsPickable(false);
  this.selectedPoints = selectedPoints;
  segments = new ArrayList<>();
  segmentsPoints = new ArrayList<>();
  setPickingType(PickingType.SURFACE);
  isPreview = true;
  updatePreview();
 }
 public void updateMousePos(double xRW, double yRW) {
 }
 public void updatePreview() {
  if (segmentsPoints == null) {
   setWaitForUpdate();
   return;
  }
  Iterator<ArrayList<GeoPointND>> spi = segmentsPoints.iterator();
  Iterator<GeoPointND> i = selectedPoints.iterator();
  GeoPointND point = null; 
  ArrayList<GeoPointND> sp = null; 
  while (i.hasNext() && spi.hasNext()) {
   point = i.next();
   if (sp != null) {
    sp.add(point); 
   }
   sp = spi.next();
   sp.clear();
   sp.add(point); 
  }
  while (spi.hasNext()) {
   sp = spi.next();
   sp.clear();
  }
  while (i.hasNext()) {
   if (sp != null && point != null) {
    sp.add(point); 
   }
   sp = new ArrayList<>();
   segmentsPoints.add(sp);
   point = i.next();
   sp.add(point);
   DrawSegment3D s = new DrawSegment3D(getView3D(), sp);
   s.getGeoElement().setVisualStyle(getGeoElement());
   segments.add(s);
   getView3D().addToDrawable3DLists(s);
  }
  for (Iterator<DrawSegment3D> s = segments.iterator(); s.hasNext(); ) {
   s.next().updatePreview();
  }
  if (selectedPoints.size() < 2) {
   getGeoElement().setEuclidianVisible(false);
   return;
  }
  getGeoElement().setEuclidianVisible(true);
  GeoPointND[] points = new GeoPointND[selectedPoints.size() + 1];
  int index = 0;
  for (GeoPointND selectedPoint : selectedPoints) {
   points[index] = selectedPoint;
   index++;
  }
  points[index] = getView3D().getCursor3D();
  ((GeoPolygon3D) getGeoElement()).setPoints(points, null, false);
  ((GeoPolygon3D) getGeoElement()).updateCoordSys();
  if (getGeoElement().isDefined()) {
   setWaitForUpdate();
  }
 }
 public void disposePreview() {
  updatePreview();
  super.disposePreview();
  if (segments != null) {
   for (DrawSegment3D s : segments) {
    s.disposePreview();
   }
  }
  if (segmentsPoints != null) {
   segmentsPoints.clear();
  }
 }
 public boolean doHighlighting() {
  if (getGeoElement().getMetasLength() > 0) {
   for (GeoElement meta : ((FromMeta) getGeoElement()).getMetas()) {
    if (meta != null && meta.doHighlighting()) {
     return true;
    }
   }
  }
  return super.doHighlighting();
 }
 public boolean hit(Hitting hitting) {
  if (waitForReset) { 
   return false;
  }
  if (getGeoElement().getAlphaValue() < EuclidianController.MIN_VISIBLE_ALPHA_VALUE) {
   return false;
  }
  GeoPolygon poly = (GeoPolygon) getGeoElement();
  if (poly.getCoordSys() == null) {
   return false;
  }
  if (globalCoords == null) {
   globalCoords = new Coords(4);
   inPlaneCoords = new Coords(4);
  }
  hitting
    .getOrigin()
    .projectPlaneThruVIfPossible(
      poly.getCoordSys().getMatrixOrthonormal(),
      hitting.getDirection(),
      globalCoords,
      inPlaneCoords);
  if (!hitting.isInsideClipping(globalCoords)) {
   return false;
  }
  boolean ret = false;
  if (poly.isInRegion(inPlaneCoords.getX(), inPlaneCoords.getY())) {
   double parameterOnHitting = inPlaneCoords.getZ();
   setZPick(
     parameterOnHitting,
     parameterOnHitting,
     hitting.discardPositiveHits(),
     -parameterOnHitting);
   setPickingType(PickingType.SURFACE);
   ret = true;
  }
  if (!poly.wasInitLabelsCalled()) {
   if (hittingPointForOutline == null) {
    hittingPointForOutline = new GeoPoint3D(poly.getConstruction());
   }
   hittingPointForOutline.setCoords(globalCoords);
   poly.pointChanged(hittingPointForOutline);
   Coords p3d = hittingPointForOutline.getInhomCoordsInD3();
   if (hitting.isInsideClipping(p3d)) {
    if (project == null) {
     project = Coords.createInhomCoorsInD3();
    }
    p3d.projectLine(
      hitting.getOrigin(),
      hitting.getDirection(),
      project,
      parameters); 
    double d = getView3D().getScaledDistance(p3d, project);
    if (d <= poly.getLineThickness() + hitting.getThreshold()) {
     double z = -parameters[0];
     double dz = poly.getLineThickness() / getView3D().getScale();
     setZPick(z + dz, z - dz, hitting.discardPositiveHits(), parameters[0]);
     setPickingType(PickingType.POINT_OR_CURVE);
     return true;
    }
   }
  }
  return ret;
 }
 public void exportToPrinter3D(ExportToPrinter3D exportToPrinter3D, boolean exportSurface) {
  if (isVisible()) {
   GeoPolygon geo = (GeoPolygon) getGeoElement();
   if (exportSurface) {
    exportToPrinter3D.export(geo, vertices, null, geo.getAlphaValue());
   } else {
    if (!geo.wasInitLabelsCalled()) {
     exportToPrinter3D.exportCurve(
       getGeometryIndex(), Export3DType.CURVE, geo.getGeoClassType().toString(), geo);
    }
   }
  }
 }
 public void export(Geometry3DGetterManager manager, boolean exportSurface) {
  if (isVisible()) {
   GeoPolygon geo = (GeoPolygon) getGeoElement();
   manager.export(
     geo, getSurfaceIndex(), geo.getObjectColor(), geo.getAlphaValue(), GeometryType.SURFACE);
   if (!geo.wasInitLabelsCalled()) {
    manager.export(geo, getGeometryIndex(), GColor.BLACK, 1, GeometryType.CURVE);
   }
  }
 }
 public void setWaitForUpdateVisualStyle(GProperty prop) {
  super.setWaitForUpdateVisualStyle(prop);
  if (prop == GProperty.LINE_STYLE) {
   setWaitForUpdate();
  } else {
   if (prop == GProperty.COLOR) {
    setWaitForUpdateColor();
   } else if (prop == GProperty.HIGHLIGHT) {
    setWaitForUpdateColor();
    EuclidianView3D view3D = getView3D();
    updateSegmentHighlighting((GeoPolygon) getGeoElement(), view3D);
   } else if (prop == GProperty.VISIBLE) {
    setWaitForUpdateVisibility();
   }
  }
 }
 protected static void updateSegmentHighlighting(HasSegments p, EuclidianView3D view3D) {
  for (GeoSegmentND seg : p.getSegments()) {
   if (seg != null) {
    view3D.updateHighlight(seg);
   }
  }
 }
}
```

### FILE: geogebra3D/euclidian3D/draw/DrawPolyhedron3D.java
```java
public class DrawPolyhedron3D extends Drawable3DSurfaces implements Previewable {
 private DrawPolygon3D drawPolygon3D;
 private Coords[] vertices = new Coords[0];
 private ArrayList<GeoPointND> selectedPoints;
 private ArrayList<GeoPolygon> selectedPolygons;
 private int previewMode;
 private boolean previewBasisIsFinished = false;
 private AlgoPolyhedronPoints previewAlgo;
 private Coords globalCoords;
 private Coords inPlaneCoords;
 private Coords boundsMin = new Coords(3);
 private Coords boundsMax = new Coords(3);
 public DrawPolyhedron3D(EuclidianView3D a_view3D, GeoPolyhedron poly) {
  super(a_view3D, poly);
  boundsMin.setPositiveInfinity();
  boundsMax.setNegativeInfinity();
 }
 public DrawPolyhedron3D(
   EuclidianView3D a_view3D,
   ArrayList<GeoPointND> selectedPoints,
   ArrayList<GeoPolygon> selectedPolygons,
   int mode) {
  super(a_view3D);
  drawPolygon3D = new DrawPolygon3D(a_view3D, selectedPoints);
  this.selectedPoints = selectedPoints;
  this.selectedPolygons = selectedPolygons;
  previewMode = mode;
  boundsMin.setPositiveInfinity();
  boundsMax.setNegativeInfinity();
 }
 public void drawGeometry(Renderer renderer) {
  renderer.getRendererImpl().setLayer(getLayer());
  renderer.getGeometryManager().draw(getGeometryIndex());
  renderer.getRendererImpl().setLayer(Renderer.LAYER_DEFAULT);
 }
 public void drawOutline(Renderer renderer) {
  if (isVisible()) {
   setHighlightingColor();
   renderer.getTextures().setDashFromLineType(getGeoElement().getLineType());
   drawGeometry(renderer);
  }
  drawTracesOutline(renderer, false);
 }
 public void drawGeometryHiding(Renderer renderer) {
  drawSurfaceGeometry(renderer);
 }
 public void drawGeometryHidden(Renderer renderer) {
  drawGeometry(renderer);
 }
 protected void drawGeometryForPicking(Renderer renderer, PickingType type) {
  if (type == PickingType.POINT_OR_CURVE) {
   drawGeometry(renderer);
  } else {
   if (getAlpha() > 0) { 
    drawSurfaceGeometry(renderer);
   }
  }
 }
 protected void drawSurfaceGeometry(Renderer renderer) {
  renderer.getRendererImpl().setLayer(getLayer());
  renderer.getGeometryManager().draw(getSurfaceIndex());
  renderer.getRendererImpl().setLayer(Renderer.LAYER_DEFAULT);
 }
 public int getPickOrder() {
  return DRAW_PICK_ORDER_SURFACE;
 }
 public void addToDrawable3DLists(Drawable3DLists lists) {
  addToDrawable3DLists(lists, DRAW_TYPE_CLOSED_SURFACES_NOT_CURVED);
  addToDrawable3DLists(lists, DRAW_TYPE_CURVES);
 }
 public void removeFromDrawable3DLists(Drawable3DLists lists) {
  removeFromDrawable3DLists(lists, DRAW_TYPE_CLOSED_SURFACES_NOT_CURVED);
  removeFromDrawable3DLists(lists, DRAW_TYPE_CURVES);
 }
 protected boolean updateForItSelf() {
  if (((GeoPolyhedron) getGeoElement()).getChildrenLabelsSet() && !createdByDrawList()) {
   return true;
  }
  boundsMin.setPositiveInfinity();
  boundsMax.setNegativeInfinity();
  Renderer renderer = getView3D().getRenderer();
  updateOutline(renderer);
  updateSurface(renderer);
  return true;
 }
 private void updateSurface(Renderer renderer) {
  int index = renderer.getGeometryManager().startPolygons(this);
  for (GeoPolygon p : ((GeoPolyhedron) getGeoElement()).getPolygonsLinked()) {
   drawPolygon(renderer, p);
  }
  for (GeoPolygon p : ((GeoPolyhedron) getGeoElement()).getPolygons()) {
   drawPolygon(renderer, p);
  }
  renderer.getGeometryManager().endPolygons(this);
  setSurfaceIndex(index);
 }
 private void updateOutline(Renderer renderer) {
  setPackCurve(false);
  GeoPolyhedron poly = (GeoPolyhedron) getGeoElement();
  int thickness = poly.getLineThickness();
  if (thickness == 0) {
   setGeometryIndex(-1);
  } else {
   PlotterBrush brush = renderer.getGeometryManager().getBrush();
   brush.start(getReusableGeometryIndex());
   brush.setThickness(thickness, (float) getView3D().getScale());
   for (GeoPolygon p : ((GeoPolyhedron) getGeoElement()).getPolygonsLinked()) {
    if (p.isEuclidianVisible() && !p.isLabelSet()) {
     for (GeoSegmentND seg : p.getSegments()) {
      drawSegment(brush, seg);
     }
    }
   }
   for (GeoSegmentND seg : poly.getSegments()) {
    drawSegment(brush, seg);
   }
   setGeometryIndex(brush.end());
  }
  endPacking();
 }
 private void drawSegment(PlotterBrush brush, GeoSegmentND seg) {
  if (!seg.isEuclidianVisible() || seg.isLabelSet()) {
   return;
  }
  brush.setAffineTexture(0.5f, 0.25f);
  Coords p1 = seg.getStartInhomCoords();
  Coords p2 = seg.getEndInhomCoords();
  enlargeBounds(boundsMin, boundsMax, p1);
  enlargeBounds(boundsMin, boundsMax, p2);
  brush.segment(p1, p2);
 }
 private void drawPolygon(Renderer renderer, GeoPolygon polygon) {
  if (!polygon.isEuclidianVisible() || polygon.isLabelSet()) {
   return;
  }
  int pointLength = polygon.getPointsLength();
  if (pointLength < 3) { 
   return;
  }
  if (vertices.length < pointLength) {
   vertices = new Coords[pointLength];
   for (int i = 0; i < pointLength; i++) {
    vertices[i] = new Coords(3);
   }
  }
  for (int i = 0; i < pointLength; i++) {
   vertices[i].setValues(polygon.getPoint3D(i), 3);
   enlargeBounds(boundsMin, boundsMax, vertices[i]);
  }
  DrawPolygon3D.drawPolygon(renderer, polygon, vertices, polygon.getPointsLength());
 }
 protected void updateForView() {
  if (((GeoPolyhedron) getGeoElement()).getChildrenLabelsSet() && !createdByDrawList()) {
   return;
  }
  if (getView3D().viewChangedByZoom()) {
   boundsMin.setPositiveInfinity();
   boundsMax.setNegativeInfinity();
   Renderer renderer = getView3D().getRenderer();
   updateOutline(renderer);
   updateSurface(renderer);
   recordTrace();
  }
 }
 protected boolean willNeedUpdateOnVisibleAgain() {
  return getView3D().viewChangedByZoom();
 }
 public void updatePreview() {
  if (previewBasisIsFinished) {
   getView3D().getCursor3D().updateCascade();
   return;
  }
  if (selectedPolygons.size() == 1) {
   previewBasisIsFinished = true;
   Construction cons = getView3D().getKernel().getConstruction();
   switch (previewMode) {
    default:
    case EuclidianConstants.MODE_PYRAMID:
     previewAlgo = new AlgoPolyhedronPointsPyramid(
       cons, null, selectedPolygons.get(0), getView3D().getCursor3D());
     break;
    case EuclidianConstants.MODE_PRISM:
     previewAlgo = new AlgoPolyhedronPointsPrism(
       cons, null, selectedPolygons.get(0), getView3D().getCursor3D());
     break;
   }
   previewAlgo.removeOutputFromAlgebraView();
   previewAlgo.removeOutputFromPicking();
   previewAlgo.setOutputPointsEuclidianVisible(false);
   previewAlgo.notifyUpdateOutputPoints();
   previewAlgo.setOutputOtherEuclidianVisible(true);
   previewAlgo.notifyUpdateOutputOther();
  } else {
   drawPolygon3D.updatePreview();
  }
 }
 public void disposePreview() {
  super.disposePreview();
  if (previewBasisIsFinished) {
   previewBasisIsFinished = false;
   if (previewAlgo != null) {
    previewAlgo.remove();
    previewAlgo = null;
   }
  } else {
   drawPolygon3D.disposePreview();
  }
 }
 public void updateMousePos(double x, double y) {
 }
 public void previewBasisIsFinished() {
  previewBasisIsFinished = true;
  drawPolygon3D.disposePreview();
  GeoPointND[] points = new GeoPointND[selectedPoints.size() + 1];
  for (int i = 0; i < selectedPoints.size(); i++) {
   points[i] = selectedPoints.get(i);
  }
  points[selectedPoints.size()] = getView3D().getCursor3D();
  Construction cons = getView3D().getKernel().getConstruction();
  switch (previewMode) {
   default:
   case EuclidianConstants.MODE_PYRAMID:
    previewAlgo = new AlgoPolyhedronPointsPyramid(cons, null, points);
    break;
   case EuclidianConstants.MODE_PRISM:
    previewAlgo = new AlgoPolyhedronPointsPrism(cons, null, points);
    break;
  }
  previewAlgo.removeOutputFromAlgebraView();
  previewAlgo.removeOutputFromPicking();
  previewAlgo.setOutputPointsEuclidianVisible(false);
  previewAlgo.notifyUpdateOutputPoints();
  previewAlgo.setOutputOtherEuclidianVisible(true);
  previewAlgo.notifyUpdateOutputOther();
 }
 public boolean hit(Hitting hitting) {
  if (waitForReset) { 
   return false;
  }
  if (globalCoords == null) {
   globalCoords = new Coords(4);
   inPlaneCoords = new Coords(4);
  }
  double d = Double.NaN;
  for (GeoPolygon p : ((GeoPolyhedron) getGeoElement()).getPolygonsLinked()) {
   d = hitPolygon(d, hitting, p, globalCoords, inPlaneCoords);
  }
  for (GeoPolygon p : ((GeoPolyhedron) getGeoElement()).getPolygons()) {
   d = hitPolygon(d, hitting, p, globalCoords, inPlaneCoords);
  }
  if (!Double.isNaN(d)) {
   setZPick(d, d, hitting.discardPositiveHits(), -d);
   setPickingType(PickingType.SURFACE);
   return true;
  }
  return false;
 }
 private static double hitPolygon(
   double currentDistance,
   Hitting hitting,
   GeoPolygon polygon,
   Coords globalCoords,
   Coords inPlaneCoords) {
  if (!polygon.isEuclidianVisible() || polygon.isLabelSet()) {
   return currentDistance;
  }
  hitting
    .getOrigin()
    .projectPlaneThruVIfPossible(
      polygon.getCoordSys().getMatrixOrthonormal(),
      hitting.getDirection(),
      globalCoords,
      inPlaneCoords);
  if (!hitting.isInsideClipping(globalCoords)) {
   return currentDistance;
  }
  if (polygon.isInRegion(inPlaneCoords.getX(), inPlaneCoords.getY())) {
   double parameterOnHitting = inPlaneCoords.getZ();
   if (parameterOnHitting < currentDistance) { 
    return currentDistance;
   }
   return parameterOnHitting;
  }
  return currentDistance;
 }
 public void exportToPrinter3D(ExportToPrinter3D exportToPrinter3D, boolean exportSurface) {
  if (isVisible()) {
   if (exportSurface) {
    for (GeoPolygon p : ((GeoPolyhedron) getGeoElement()).getPolygonsLinked()) {
     exportToPrinter3D(exportToPrinter3D, p);
    }
    for (GeoPolygon p : ((GeoPolyhedron) getGeoElement()).getPolygons()) {
     exportToPrinter3D(exportToPrinter3D, p);
    }
   } else {
    exportToPrinter3D.exportCurve(
      getGeometryIndex(), Export3DType.CURVE, "SEGMENT", getGeoElement());
   }
  }
 }
 private void exportToPrinter3D(ExportToPrinter3D exportToPrinter3D, GeoPolygon polygon) {
  if (!polygon.isEuclidianVisible() || polygon.isLabelSet()) {
   return;
  }
  int pointLength = polygon.getPointsLength();
  if (pointLength < 3) { 
   return;
  }
  if (vertices.length < pointLength) {
   vertices = new Coords[pointLength];
   for (int i = 0; i < pointLength; i++) {
    vertices[i] = new Coords(3);
   }
  }
  for (int i = 0; i < pointLength; i++) {
   vertices[i].setValues(polygon.getPoint3D(i), 3);
  }
  exportToPrinter3D.export(
    polygon, vertices, getGeoElement().getObjectColor(), getGeoElement().getAlphaValue());
 }
 public void setWaitForUpdateVisualStyle(GProperty prop) {
  super.setWaitForUpdateVisualStyle(prop);
  if (prop == GProperty.LINE_STYLE) {
   setWaitForUpdate();
  } else {
   if (prop == GProperty.COLOR) {
    setWaitForUpdateColor();
   } else if (prop == GProperty.HIGHLIGHT) {
    setWaitForUpdateColor();
    GeoPolyhedron poly = (GeoPolyhedron) getGeoElement();
    EuclidianView3D view3D = getView3D();
    for (GeoPolygon p : poly.getPolygons()) {
     if (p.isLabelSet()) {
      view3D.updateHighlight(p);
      DrawPolygon3D.updateSegmentHighlighting(p, view3D);
     }
    }
    DrawPolygon3D.updateSegmentHighlighting(poly, view3D);
   } else if (prop == GProperty.VISIBLE) {
    setWaitForUpdateVisibility();
   }
  }
 }
 public boolean addedFromClosedSurface() {
  return true;
 }
 public void enlargeBounds(Coords min, Coords max, boolean dontExtend) {
  if (!Double.isNaN(boundsMin.getX())) {
   enlargeBounds(min, max, boundsMin, boundsMax);
  }
 }
}
```

### FILE: geogebra3D/euclidian3D/draw/DrawSegment3D.java
```java
public class DrawSegment3D extends DrawCoordSys1D {
 private Coords boundsMin = new Coords(3);
 private Coords boundsMax = new Coords(3);
 private double radius = 0;
 public DrawSegment3D(EuclidianView3D a_view3D, GeoSegmentND segment) {
  super(a_view3D, (GeoElement) segment);
  setDrawMinMax(0, 1);
 }
 public boolean doHighlighting() {
  GeoElement meta = ((GeoSegmentND) getGeoElement()).getMetas()[0];
  if (meta != null && meta.doHighlighting()) {
   return true;
  }
  return super.doHighlighting();
 }
 protected void updateForView() {
  if (getView3D().viewChangedByZoom()) {
   updateForItSelf();
  }
 }
 public DrawSegment3D(EuclidianView3D a_view3D, ArrayList<GeoPointND> selectedPoints) {
  super(a_view3D, selectedPoints, new GeoSegment3D(a_view3D.getKernel().getConstruction()));
  setDrawMinMax(0, 1);
 }
 protected Coords[] calcPoints() {
  GeoSegmentND seg = (GeoSegmentND) getGeoElement();
  return new Coords[] {seg.getStartInhomCoords(), seg.getEndInhomCoords()};
 }
 protected void setStartEndPoints(Coords p1, Coords p2) {
  super.setStartEndPoints(p1, p2);
  radius = getLineThickness() * PlotterBrush.LINE3D_THICKNESS / getView3D().getScale();
  for (int i = 1; i <= 3; i++) {
   if (p1.get(i) < p2.get(i)) {
    boundsMin.set(i, p1.get(i));
    boundsMax.set(i, p2.get(i));
   } else {
    boundsMin.set(i, p2.get(i));
    boundsMax.set(i, p1.get(i));
   }
  }
 }
 public void enlargeBounds(Coords min, Coords max, boolean dontExtend) {
  if (dontExtend) {
   enlargeBounds(min, max, boundsMin, boundsMax);
  } else {
   enlargeBounds(min, max, boundsMin, boundsMax, radius);
  }
 }
}
```

### FILE: geogebra3D/euclidian3D/draw/Drawable3D.java
```java
public abstract class Drawable3D extends DrawableND implements CaptionFactory {
 protected static final float PICKED_DILATATION = 1.3f;
 protected static final float POINT_ON_PATH_DILATATION = 1.01f;
 protected static final float GRID3D_THICKNESS = 0.005f;
 protected static final int NOT_REUSABLE_INDEX = -1;
 private static final int ALPHA_MIN_HIGHLIGHTING = 64;
 private static final int LIGHT_COLOR = 3 * 127;
 protected static final double COLOR_SHIFT_SURFACE = 0.75; 
 protected static final double COLOR_SHIFT_CURVES = 0.75; 
 protected static final double COLOR_SHIFT_POINTS = 0.86; 
 protected static final double COLOR_SHIFT_NONE = 0;
 public static final GColor DARKEST_ADDITIVE_COLOR = GColor.newColor(50, 50, 50);
 private EuclidianView3D m_view3D;
 private boolean waitForUpdate;
 private boolean waitForUpdateVisualStyle = true;
 private boolean waitForUpdateColor = false;
 private boolean waitForUpdateVisibility = false;
 protected boolean geometriesSetVisible;
 private boolean labelWaitForUpdate;
 protected boolean waitForReset;
 private int geomIndex = -1;
 private int surfaceIndex = -1;
 private GeoElement geo;
 protected DrawLabel3D label;
 private double zPickFar;
 private double zPickNear;
 private double positionOnHitting;
 private boolean relevantPickingValues;
 protected GColor[] color = new GColor[] {GColor.BLACK, GColor.BLACK};
 protected GColor[] surfaceColor = new GColor[] {GColor.BLACK, GColor.BLACK};
 private GColor tmpColor2;
 protected Trace trace;
 private PickingType lastPickingType = PickingType.POINT_OR_CURVE;
 private int alpha = 255;
 protected LinkedList<Integer> tracesPackingBuffer;
 public static final int DRAW_PICK_ORDER_MAX = 4;
 public static final int DRAW_PICK_ORDER_POINT = 0;
 public static final int DRAW_PICK_ORDER_TEXT = 1;
 public static final int DRAW_PICK_ORDER_PATH = 2;
 public static final int DRAW_PICK_ORDER_SURFACE = 3;
 public static final int DRAW_TYPE_DEFAULT = 0;
 public static final int DRAW_TYPE_POINTS = DRAW_TYPE_DEFAULT + 1;
 public static final int DRAW_TYPE_CURVES = DRAW_TYPE_POINTS + 1;
 public static final int DRAW_TYPE_CLIPPED_CURVES = DRAW_TYPE_CURVES + 1;
 public static final int DRAW_TYPE_SURFACES = DRAW_TYPE_CLIPPED_CURVES + 1;
 public static final int DRAW_TYPE_CLOSED_SURFACES_NOT_CURVED = DRAW_TYPE_SURFACES + 1;
 public static final int DRAW_TYPE_CLOSED_SURFACES_CURVED =
   DRAW_TYPE_CLOSED_SURFACES_NOT_CURVED + 1;
 public static final int DRAW_TYPE_CLIPPED_SURFACES = DRAW_TYPE_CLOSED_SURFACES_CURVED + 1;
 public static final int DRAW_TYPE_TEXTS = DRAW_TYPE_CLIPPED_SURFACES + 1;
 public static final int DRAW_TYPE_LISTS = DRAW_TYPE_TEXTS + 1;
 public static final int DRAW_TYPE_MAX = DRAW_TYPE_LISTS + 1;
 protected boolean intersectionCurveVisibility;
 private @Nullable Caption3D caption = null;
 private GGraphics2D updateLabelGraphics;
 public Drawable3D(EuclidianView3D view3D) {
  setView3D(view3D);
  label = newDrawLabel3D(view3D);
  relevantPickingValues = false;
 }
 protected DrawLabel3D newDrawLabel3D(EuclidianView3D view3D) {
  return new DrawLabel3D(view3D, this);
 }
 public Drawable3D(EuclidianView3D a_view3D, GeoElement a_geo) {
  this(a_view3D);
  init(a_geo);
 }
 protected void init(GeoElement geoElement) {
  setGeoElement(geoElement);
  waitForUpdate = true;
  caption = new Caption3D(geo, this);
 }
 protected void updateForViewNotVisible() {
 }
 public void update() {
  clearTraceForViewChanged();
  if (isVisible()) {
   if (waitForUpdateVisualStyle || waitForUpdate) {
    updateColors();
    setLabelWaitForUpdate();
    waitForUpdateVisualStyle = false;
   }
   updateForViewVisible();
   if (waitForUpdate) {
    if (updateForItSelf()) {
     recordTrace();
     waitForUpdate = false;
     waitForUpdateColor = false;
     waitForUpdateVisibility = false;
     geometriesSetVisible = true;
    } else {
     getView3D().waitForNewRepaint();
    }
    setLabelWaitForUpdate(); 
   }
   if (waitForUpdateColor) {
    updateGeometriesColor();
    setLabelWaitForUpdate();
    waitForUpdateColor = false;
    waitForUpdateVisibility = false;
   } else if (waitForUpdateVisibility) {
    updateGeometriesVisibility();
    waitForUpdateVisibility = false;
   }
   if (isLabelVisible()) {
    getView3D().getRenderer().getGeometryManager().endPacking();
    if (labelWaitForUpdate) {
     updateLabel();
     updateLabelPosition();
     labelWaitForUpdate = false;
    } else if (getView3D().viewChanged()) {
     updateLabelPosition();
    }
   }
  } else {
   updateForViewNotVisible();
  }
  waitForReset = false;
 }
 protected final boolean hasTrace() {
  if (createdByDrawList()) {
   return ((Drawable3D) getDrawListCreator()).hasTrace();
  }
  if (getGeoElement() == null) {
   return false;
  }
  if (!getGeoElement().isTraceable()) {
   return false;
  }
  return ((Traceable) getGeoElement()).getTrace();
 }
 protected final boolean hasRecordedTrace() {
  if (shouldBePackedForManager()) {
   return tracesPackingBuffer != null && !tracesPackingBuffer.isEmpty();
  }
  return trace != null && !trace.isEmpty();
 }
 protected void updateLabel() {
  if (caption != null) {
   caption.update();
   if (updateLabelGraphics == null) {
    updateLabelGraphics =
      AwtFactory.getPrototype().newBufferedImage(1, 1, 1).createGraphics();
   }
   label.update(
     caption,
     getView3D().getFontPoint(),
     getLabelPosition(),
     getLabelOffsetX(),
     -getLabelOffsetY(),
     0,
     updateLabelGraphics);
  }
 }
 protected void updateLabelPosition() {
  label.updatePosition(getView3D().getRenderer());
 }
 protected float getLabelOffsetX() {
  return getGeoElement().labelOffsetX;
 }
 protected float getLabelOffsetY() {
  return getGeoElement().labelOffsetY;
 }
 protected void updateForViewVisible() {
  updateForView();
 }
 protected abstract void updateForView();
 protected abstract boolean updateForItSelf();
 public void updateForHitting() {
  updateForItSelf();
 }
 public void setWaitForUpdate() {
  waitForUpdate = true;
 }
 public final boolean waitForUpdate() {
  return waitForUpdate;
 }
 public final void setLabelWaitForUpdate() {
  labelWaitForUpdate = true;
 }
 public void setLabelWaitForReset() {
  label.setWaitForReset();
  setLabelWaitForUpdate();
 }
 public void setWaitForReset() {
  geomIndex = -1;
  surfaceIndex = -1;
  waitForReset = true;
  label.setWaitForReset();
  setLabelWaitForUpdate();
  setWaitForUpdate();
 }
 public void setWaitForUpdateVisualStyle(GProperty prop) {
  waitForUpdateVisualStyle = true;
 }
 protected void setWaitForUpdateColor() {
  waitForUpdateColor = true;
 }
 protected void updateGeometriesColor() {
 }
 protected void updateGeometriesColor(boolean updateSurface) {
  updateColors();
  getView3D()
    .getRenderer()
    .getGeometryManager()
    .updateColorAndLayer(getColor(), Renderer.LAYER_DEFAULT, getGeometryIndex());
  if (updateSurface) {
   getView3D()
     .getRenderer()
     .getGeometryManager()
     .updateColorAndLayer(getSurfaceColor(), getLayer(), getSurfaceIndex());
  }
  if (!isVisible()) {
   setGeometriesVisibility(false);
  }
 }
 protected void setWaitForUpdateVisibility() {
  waitForUpdateVisibility = true;
 }
 protected void updateGeometriesVisibility() {
 }
 protected void setGeometriesVisibility(boolean visible) {
 }
 protected void setGeometriesVisibilityWithSurface(boolean visible) {
  getView3D()
    .getRenderer()
    .getGeometryManager()
    .updateVisibility(visible, getSurfaceIndex(), getSurfaceColor().getAlpha(), getLayer());
  setGeometriesVisibilityNoSurface(visible);
 }
 protected void setGeometriesVisibilityNoSurface(boolean visible) {
  getView3D()
    .getRenderer()
    .getGeometryManager()
    .updateVisibility(visible, getGeometryIndex(), 255, Renderer.LAYER_DEFAULT);
  geometriesSetVisible = visible;
 }
 protected void removeGeometryIndex(int index) {
  if (!waitForReset) {
   if (!hasTrace()) {
    doRemoveGeometryIndex(index);
   }
  }
 }
 protected void doRemoveGeometryIndex(int index) {
  getView3D().getRenderer().getGeometryManager().remove(index);
 }
 protected void setGeometryIndex(int index) {
  removeGeometryIndex(geomIndex);
  geomIndex = index;
 }
 protected void setGeometryIndexNotVisible() {
  setGeometryIndex(NOT_REUSABLE_INDEX);
 }
 public final int getGeometryIndex() {
  return geomIndex;
 }
 protected int getReusableGeometryIndex() {
  if (hasTrace()) {
   return NOT_REUSABLE_INDEX;
  }
  return getGeometryIndex();
 }
 protected final void setSurfaceIndex(int index) {
  removeGeometryIndex(surfaceIndex);
  surfaceIndex = index;
 }
 protected void setSurfaceIndexNotVisible() {
  setSurfaceIndex(NOT_REUSABLE_INDEX);
 }
 public final int getSurfaceIndex() {
  return surfaceIndex;
 }
 public int getReusableSurfaceIndex() {
  if (hasTrace()) {
   return NOT_REUSABLE_INDEX;
  }
  return getSurfaceIndex();
 }
 public Coords getLabelPosition() {
  return getGeoElement().getLabelPosition();
 }
 protected EuclidianView3D getView3D() {
  return m_view3D;
 }
 protected void setView3D(EuclidianView3D a_view3D) {
  m_view3D = a_view3D;
 }
 public boolean isVisible() {
  boolean visible;
  if (createdByDrawList()) {
   visible = isCreatedByDrawListVisible() && ((Drawable3D) getDrawListCreator()).isVisible();
  } else {
   visible = true;
  }
  return visible && hasGeoElementVisible();
 }
 protected boolean hasGeoElementVisible() {
  return getGeoElement().hasDrawable3D()
    && getGeoElement().isEuclidianVisible()
    && getGeoElement().isDefined();
 }
 public int getLayer() {
  if (createdByDrawList()) {
   return ((Drawable3D) getDrawListCreator()).getLayer();
  }
  return getGeoElement().getLayer();
 }
 public abstract void drawGeometry(Renderer renderer);
 public abstract void drawGeometryHidden(Renderer renderer);
 public abstract void drawOutline(Renderer renderer);
 public abstract void drawNotTransparentSurface(Renderer renderer);
 public void drawHidden(Renderer renderer) {
  if (isVisible()
    && getGeoElement().getLineTypeHidden() != EuclidianStyleConstants.LINE_TYPE_HIDDEN_NONE) {
   setHighlightingColor();
   setLineTextureHidden(renderer);
   drawGeometryHidden(renderer);
  }
 }
 public void exportToPrinter3D(ExportToPrinter3D exportToPrinter3D, boolean exportSurface) {
 }
 public void export(Geometry3DGetterManager manager, boolean exportSurface) {
 }
 protected void setLineTextureHidden(Renderer renderer) {
  if (getGeoElement().getLineTypeHidden()
    == EuclidianStyleConstants.LINE_TYPE_HIDDEN_AS_NOT_HIDDEN) {
   renderer.getTextures().setDashFromLineType(getGeoElement().getLineType());
  } else {
   renderer.getTextures().setDashFromLineTypeHidden(getGeoElement().getLineType());
  }
 }
 public abstract void drawTransp(Renderer renderer);
 public abstract void drawHiding(Renderer renderer);
 public Drawable3D drawForPicking(Renderer renderer, boolean intersection, PickingType type) {
  if (!isVisible()) {
   return null;
  }
  if (intersection) { 
   drawGeometryForPickingIntersection(renderer);
  } else {
   if (!getGeoElement().isPickable()) {
    return null;
   }
   drawGeometryForPicking(renderer, type);
  }
  return getDrawablePicked();
 }
 protected Drawable3D getDrawablePicked() {
  return getDrawablePicked(this);
 }
 protected Drawable3D getDrawablePicked(Drawable3D drawableSource) {
  if (createdByDrawList()) { 
   return ((Drawable3D) getDrawListCreator()).getDrawablePicked(drawableSource);
  }
  return this;
 }
 protected void drawGeometryForPicking(Renderer renderer, PickingType type) {
  drawGeometry(renderer);
 }
 protected void drawGeometryForPickingIntersection(Renderer renderer) {
  drawGeometryForPicking(renderer, PickingType.POINT_OR_CURVE);
 }
 public void drawLabel(Renderer renderer) {
  drawLabel(renderer, false);
 }
 public boolean drawLabelForPicking(Renderer renderer) {
  return drawLabel(renderer, true);
 }
 private boolean drawLabel(Renderer renderer, boolean forPicking) {
  if (forPicking && !getGeoElement().isPickable()) {
   return false;
  }
  if (!isLabelVisible()) {
   return false;
  }
  label.draw(renderer, forPicking);
  return true;
 }
 protected boolean isLabelVisible() {
  return getGeoElement() != null && isVisible() && getGeoElement().isLabelVisible();
 }
 public abstract int getPickOrder();
 public abstract boolean isTransparent();
 public boolean hasRelevantPickingValues() {
  return relevantPickingValues;
 }
 public int comparePickingTo(Drawable3D d, boolean checkPickOrder) {
  if (hasRelevantPickingValues() && !d.hasRelevantPickingValues()) {
   return -1;
  }
  if (!hasRelevantPickingValues() && d.hasRelevantPickingValues()) {
   return 1;
  }
  if (getView3D().getEuclidianController().checkTransparencyForSortingDrawables()) {
   if (!this.isTransparent() && d.isTransparent()) {
    if (checkPickOrder && this.getPickOrder() < d.getPickOrder()) {
     return -1;
    }
   } else if (this.isTransparent() && !d.isTransparent()) {
    if (checkPickOrder && this.getPickOrder() > d.getPickOrder()) {
     return 1;
    }
   }
  }
  if (this.getPickOrder() == d.getPickOrder()) {
   GeoElement thisGeo = this.getGeoElement();
   GeoElement otherGeo = d.getGeoElement();
   if (thisGeo.isSelected() && !otherGeo.isSelected()) {
    return -1;
   }
   if (!thisGeo.isSelected() && otherGeo.isSelected()) {
    return 1;
   }
  }
  if (DoubleUtil.isRatioEqualTo1(this.zPickNear, d.zPickNear)) {
   GeoElement geo1 = this.getGeoElement();
   GeoElement geo2 = d.getGeoElement();
   if (geo1 == geo2) {
    return 0;
   }
   if (geo1.isGeoPoint() && !geo2.isGeoPoint()) {
    return -1;
   }
   if (!geo1.isGeoPoint() && geo2.isGeoPoint()) {
    return 1;
   }
   if (geo1.isGeoPoint() && geo2.isGeoPoint()) {
    boolean thisDraggable = EuclidianController3D.isDraggable(geo1, getView3D());
    boolean otherDraggable = EuclidianController3D.isDraggable(geo2, getView3D());
    if (thisDraggable && !otherDraggable) {
     return -1;
    }
    if (!thisDraggable && otherDraggable) {
     return 1;
    }
   }
   if (geo1.getConstructionIndex() > geo2.getConstructionIndex()) {
    return -1;
   }
   if (geo1.getConstructionIndex() < geo2.getConstructionIndex()) {
    return 1;
   }
  }
  if (this.zPickFar <= d.zPickNear && d.zPickFar <= this.zPickNear) {
   if (checkPickOrder) {
    if (this.getPickOrder() < d.getPickOrder()) {
     return -1;
    }
    if (this.getPickOrder() > d.getPickOrder()) {
     return 1;
    }
   }
   GeoElement geo1 = this.getGeoElement();
   GeoElement geo2 = d.getGeoElement();
   if (geo1.isGeoPoint() && geo2.isGeoPoint()) {
    if (geo1.isPointOnPath() && !geo2.isPointOnPath()) {
     return -1;
    }
    if (!geo1.isPointOnPath() && geo2.isPointOnPath()) {
     return 1;
    }
    if (geo1.isMoveable() && geo1.isChildOf(geo2)) {
     return -1;
    }
    if (geo2.isMoveable() && geo2.isChildOf(geo1)) {
     return 1;
    }
   } else {
    if (!geo1.isGeoPlane() && geo2.isGeoPlane()) {
     return -1;
    }
    if (geo1.isGeoPlane() && !geo2.isGeoPlane()) {
     return 1;
    }
   }
  }
  if (this.zPickNear > d.zPickNear) {
   return -1;
  }
  if (this.zPickNear < d.zPickNear) {
   return 1;
  }
  return 0;
 }
 public static final class DrawableComparator implements Comparator<Drawable3D> {
  public int compare(Drawable3D d1, Drawable3D d2) {
   return d1.comparePickingTo(d2, false);
  }
 }
 public static final class SetComparator implements Comparator<TreeSet<Drawable3D>> {
  public int compare(TreeSet<Drawable3D> set1, TreeSet<Drawable3D> set2) {
   if (set1.isEmpty()) {
    return 1;
   }
   if (set2.isEmpty()) {
    return -1;
   }
   Drawable3D d1 = set1.first();
   Drawable3D d2 = set2.first();
   return d1.comparePickingTo(d2, true);
  }
 }
 public boolean doHighlighting() {
  if (getView3D().getEuclidianController().getMoveMode() != MoveMode.NONE) {
   return false;
  }
  if (getGeoElement().doHighlighting()) {
   return true;
  }
  if (createdByDrawList()) {
   return ((Drawable3D) getDrawListCreator()).doHighlighting();
  }
  return false;
 }
 protected final void setHighlightingColor() {
  setDrawingColor(getColor());
 }
 public final GColor getColor() {
  if (doHighlighting()) {
   return color[1];
  }
  return color[0];
 }
 protected void setDrawingColor(GColor color) {
  getView3D().getRenderer().setColor(color);
 }
 protected void setSurfaceHighlightingColor() {
  setDrawingColor(getSurfaceColor());
 }
 public GColor getSurfaceColor() {
  if (doHighlighting()) {
   return surfaceColor[1];
  }
  return surfaceColor[0];
 }
 public void updateColors() {
  setColors(getObjectColorForOutline(), alpha, color);
 }
 protected void setColorsOutlined() {
  setColors(getObjectColorForOutline(), 255, color); 
  setColors(getObjectColorForSurface(), alpha, surfaceColor);
 }
 protected GColor getObjectColorForOutline() {
  return getGeoElement().getObjectColor();
 }
 private GColor getObjectColorForSurface() {
  return getGeoElement().getObjectColor();
 }
 private void setColors(GColor sourceColor, int alpha, GColor[] color) {
  GColor c = sourceColor.deriveWithAlpha(alpha);
  if (getView3D().isGrayScaled()) {
   color[0] = c.createGrayScale();
  } else if (getView3D().isAdditiveDisplay() && c.isDarkerThan(DARKEST_ADDITIVE_COLOR)) {
   color[0] = DARKEST_ADDITIVE_COLOR.deriveWithAlpha(c.getAlpha());
  } else {
   color[0] = c;
  }
  int r = color[0].getRed();
  int g = color[0].getGreen();
  int b = color[0].getBlue();
  int d = r + g + b;
  double distance;
  if (d > LIGHT_COLOR) { 
   distance = Math.sqrt(r * r + g * g + b * b); 
   tmpColor2 = GColor.BLACK;
  } else { 
   r = 255 - r;
   g = 255 - g;
   b = 255 - b;
   distance = Math.sqrt(r * r + g * g + b * b); 
   tmpColor2 = GColor.WHITE;
  }
  double s = 255 * getColorShift() / distance;
  int a = color[0].getAlpha();
  if (a > 0 && a < ALPHA_MIN_HIGHLIGHTING) {
   a = ALPHA_MIN_HIGHLIGHTING;
  }
  color[1] = GColor.mixColors(color[0], tmpColor2, s, a);
 }
 protected void setAlpha(int alpha) {
  this.alpha = alpha;
 }
 protected int getAlpha() {
  return alpha;
 }
 protected void updateAlpha() {
  int a = (int) (255 * (1 - Math.pow(1 - getGeoElement().getAlphaValue(), 1. / 3.)));
  if (a < 0) {
   a = 0;
  } else if (a > 255) {
   a = 255;
  }
  setAlpha(a);
 }
 protected boolean hasTransparentAlpha() {
  return getAlpha() > 0 && getAlpha() < 255;
 }
 protected abstract double getColorShift();
 public GeoElement getGeoElement() {
  return geo;
 }
 public void setGeoElement(GeoElement a_geo) {
  this.geo = a_geo;
 }
 public abstract void addToDrawable3DLists(Drawable3DLists lists);
 protected void addToDrawable3DLists(Drawable3DLists lists, int type) {
  lists.getList(type).add(this);
 }
 public abstract void removeFromDrawable3DLists(Drawable3DLists lists);
 protected void removeFromDrawable3DLists(Drawable3DLists lists, int type) {
  lists.getList(type).remove(this);
 }
 public void removeFromGL() {
  doRemoveGeometryIndex(getGeometryIndex());
  doRemoveGeometryIndex(getSurfaceIndex());
  label.removeFromGL();
  if (shouldBePackedForManager()) {
   if (tracesPackingBuffer != null) {
    for (int index : tracesPackingBuffer) {
     doRemoveGeometryIndex(index);
    }
    tracesPackingBuffer.clear();
   }
  }
 }
 protected void removePreviewFromGL() {
  removeFromGL();
  geomIndex = NOT_REUSABLE_INDEX;
  surfaceIndex = NOT_REUSABLE_INDEX;
 }
 public void disposePreview() {
  getView3D().remove(this);
 }
 public void drawPreview(GGraphics2D g2) {
 }
 public final void setPickingType(PickingType type) {
  lastPickingType = type;
 }
 public final PickingType getPickingType() {
  return lastPickingType;
 }
 protected Trace getTrace() {
  if (trace == null) {
   trace = new Trace();
  }
  return trace;
 }
 protected void recordTrace() {
  if (!hasTrace()) {
   return;
  }
  getTrace().record(this);
 }
 protected TraceIndex newTraceIndex() {
  return new TraceIndex(geomIndex, surfaceIndex);
 }
 protected void drawTracesOutline(Renderer renderer, boolean hidden) {
  if (trace == null) {
   return;
  }
  if (hidden) {
   setLineTextureHidden(renderer);
  } else {
   renderer.getTextures().setDashFromLineType(getGeoElement().getLineType());
  }
  for (Entry<TraceSettings, ArrayList<TraceIndex>> settings : trace.entrySet()) {
   ArrayList<TraceIndex> indices = settings.getValue();
   setDrawingColor(settings.getKey().getColor());
   for (TraceIndex index : indices) {
    drawGeom(renderer, index);
   }
  }
 }
 protected void drawGeom(Renderer renderer, TraceIndex index) {
  renderer.getGeometryManager().draw(index.geom);
 }
 protected void drawSurface(Renderer renderer, TraceIndex index) {
  renderer.getGeometryManager().draw(index.surface);
 }
 protected void drawTracesTranspSurface(Renderer renderer) {
  if (trace == null) {
   return;
  }
  for (Entry<TraceSettings, ArrayList<TraceIndex>> settings : trace.entrySet()) {
   ArrayList<TraceIndex> indices = settings.getValue();
   TraceSettings key = settings.getKey();
   double a = key.getAlpha();
   if (a > 0 && a < 1) {
    setDrawingColor(key.getColor());
    for (TraceIndex index : indices) {
     drawSurface(renderer, index);
    }
   }
  }
 }
 protected void drawTracesHidingSurface(Renderer renderer) {
  if (trace == null) {
   return;
  }
  for (Entry<TraceSettings, ArrayList<TraceIndex>> settings : trace.entrySet()) {
   ArrayList<TraceIndex> indices = settings.getValue();
   double a = settings.getKey().getAlpha();
   if (a > 0 && a < 1) {
    for (TraceIndex index : indices) {
     drawSurface(renderer, index);
    }
   }
  }
 }
 protected void drawTracesNotTranspSurface(Renderer renderer) {
  if (trace == null) {
   return;
  }
  for (Entry<TraceSettings, ArrayList<TraceIndex>> settings : trace.entrySet()) {
   ArrayList<TraceIndex> indices = settings.getValue();
   TraceSettings key = settings.getKey();
   double a = key.getAlpha();
   if (a >= 1) {
    setDrawingColor(key.getColor());
    for (TraceIndex index : indices) {
     drawSurface(renderer, index);
    }
   }
  }
 }
 protected final void clearTraceForViewChanged() {
  if (getView3D().viewChangedByZoom() || getView3D().viewChangedByTranslate()) {
   clearTraceForViewChangedByZoomOrTranslate();
  }
 }
 protected void clearTraceForViewChangedByZoomOrTranslate() {
  if (trace != null) {
   for (ArrayList<TraceIndex> indices : trace.values()) {
    for (TraceIndex index : indices) {
     doRemoveGeometryIndex(index.geom);
     doRemoveGeometryIndex(index.surface);
    }
   }
   trace.clear();
  }
 }
 public final void setZPick(
   double zNear, double zFar, boolean discardPositive, double positionOnHitting) {
  if (needsDiscardZPick(discardPositive, zNear, zFar)) {
   resetZPick();
  } else {
   setZPickValue(zNear, zFar);
  }
  this.positionOnHitting = positionOnHitting;
 }
 protected boolean needsDiscardZPick(boolean discardPositive, double zNear, double zFar) {
  return discardPositive && (zNear > 0 || zFar > 0);
 }
 protected void setZPickValue(double zNear, double zFar) {
  zPickNear = zNear;
  zPickFar = zFar;
  relevantPickingValues = !Double.isInfinite(zPickNear)
    && !Double.isInfinite(zPickFar)
    && !Double.isNaN(zPickNear)
    && !Double.isNaN(zPickFar);
 }
 protected void setPositionOnHitting(double positionOnHitting) {
  this.positionOnHitting = positionOnHitting;
 }
 protected void resetZPick() {
  zPickNear = Double.NEGATIVE_INFINITY;
  zPickFar = Double.NEGATIVE_INFINITY;
  relevantPickingValues = false;
 }
 public double getPositionOnHitting() {
  return positionOnHitting;
 }
 public final double getZPickNear() {
  return zPickNear;
 }
 public final double getZPickFar() {
  return zPickFar;
 }
 public boolean hit(Hitting hitting) {
  return false;
 }
 public boolean hitForList(Hitting hitting) {
  if (hasGeoElementVisible() && getGeoElement().isPickable()) {
   return hit(hitting);
  }
  return false;
 }
 public final void hitIfVisibleAndPickable(Hitting hitting, Hits3D hits) {
  if (isVisible() && getGeoElement().isPickable()) {
   if (hitLabel(hitting, hits)) {
    return; 
   }
   if (hit(hitting)) {
    hits.addDrawable3D(this, getPickingType());
   }
  }
 }
 protected boolean hitLabel(Hitting hitting, Hits3D hits) {
  if (isLabelVisible() && hitting.hitLabel(label)) {
   setZPick(
     label.getDrawZ(), label.getDrawZ(), hitting.discardPositiveHits(), -label.getDrawZ());
   hits.addDrawable3D(this, PickingType.LABEL);
   return true;
  }
  return false;
 }
 public boolean hasPickableLabel() {
  return true;
 }
 public void enlargeBounds(Coords min, Coords max, boolean dontExtend) {
 }
 protected static void enlargeBounds(Coords min, Coords max, Coords boundsMin, Coords boundsMax) {
  for (int i = 0; i < 3; i++) {
   if (min.val[i] > boundsMin.val[i]) {
    min.val[i] = boundsMin.val[i];
   }
   if (max.val[i] < boundsMax.val[i]) {
    max.val[i] = boundsMax.val[i];
   }
  }
 }
 protected static void enlargeBounds(
   Coords min, Coords max, Coords boundsMin, Coords boundsMax, double radius) {
  for (int i = 0; i < 3; i++) {
   if (min.val[i] > boundsMin.val[i] - radius) {
    min.val[i] = boundsMin.val[i] - radius;
   }
   if (max.val[i] < boundsMax.val[i] + radius) {
    max.val[i] = boundsMax.val[i] + radius;
   }
  }
 }
 public static void enlargeBounds(Coords min, Coords max, Coords coords) {
  for (int i = 0; i < 3; i++) {
   if (min.val[i] > coords.val[i]) {
    min.val[i] = coords.val[i];
   }
   if (max.val[i] < coords.val[i]) {
    max.val[i] = coords.val[i];
   }
  }
 }
 protected void reduceBounds(Coords boundsMin, Coords boundsMax) {
  Coords[] vertices = getView3D().getClippingCubeDrawable().getVertices();
  Coords min = vertices[0];
  Coords max = vertices[7];
  for (int i = 0; i < 3; i++) {
   if (boundsMin.val[i] < min.val[i]) {
    boundsMin.val[i] = min.val[i];
   }
   if (boundsMax.val[i] > max.val[i]) {
    boundsMax.val[i] = max.val[i];
   }
  }
 }
 protected static void enlargeBoundsToDiagonal(
   Coords min, Coords max, Coords center, Coords v1, Coords v2, double r1, double r2) {
  for (int i = 0; i < 3; i++) {
   double add = Math.abs(v1.val[i] * r1 + v2.val[i] * r2);
   double sub = Math.abs(v1.val[i] * r1 - v2.val[i] * r2);
   double v = Math.max(add, sub);
   double cMin = center.val[i] - v;
   double cMax = center.val[i] + v;
   if (min.val[i] > cMin) {
    min.val[i] = cMin;
   }
   if (max.val[i] < cMax) {
    max.val[i] = cMax;
   }
  }
 }
 public boolean isTracing() {
  return false;
 }
 public void addLastTrace() {
  if (!shouldBePackedForManager()) {
   getTrace().addLastTraceIndex();
  }
 }
 public boolean shouldBePacked() {
  return false;
 }
 public boolean addedFromClosedSurface() {
  return false;
 }
 protected final boolean shouldBePackedForManager() {
  return getView3D().getRenderer().getGeometryManager().packBuffers() && shouldBePacked();
 }
 protected int addToTracesPackingBuffer(int index) {
  if (hasTrace()) {
   if (index != NOT_REUSABLE_INDEX) {
    if (tracesPackingBuffer == null) {
     tracesPackingBuffer = new LinkedList<>();
    }
    tracesPackingBuffer.add(index);
   }
   return NOT_REUSABLE_INDEX;
  }
  return index;
 }
 public void setIntersectionCurveVisibility(boolean visible) {
  intersectionCurveVisibility = visible;
 }
 public void updateIntersectionCurveVisibility() {
  setGeometriesVisibility(intersectionCurveVisibility);
 }
 protected void setPackCurve() {
  setPackCurve(false);
 }
 protected final void setPackCurve(boolean clipped) {
  getView3D().getRenderer().getGeometryManager().setPackCurve(this, clipped);
 }
 public int getLineType() {
  return getGeoElement().getLineType();
 }
 public int getLineTypeHidden() {
  return getGeoElement().getLineTypeHidden();
 }
 protected void setPackSurface(boolean clipped) {
  getView3D().getRenderer().getGeometryManager().setPackSurface(this, clipped);
 }
 protected void setPackSurface() {
  setPackSurface(false);
 }
 protected void endPacking() {
  getView3D().getRenderer().getGeometryManager().endPacking();
 }
 public boolean is3D() {
  return true;
 }
 public DrawableND createDrawableND(GeoElement subGeo) {
  return m_view3D.newDrawable(subGeo);
 }
 public void setPartialHitClip(GRectangle rect) {
 }
 public GRectangle getPartialHitClip() {
  return null;
 }
 public CaptionText createStaticCaption3D(GeoElement geo) {
  return new StaticCaption3D(geo, m_view3D);
 }
}
```
