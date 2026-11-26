# 02-thuat-toan-phan1.md

Nguồn: GeoGebra (EUPL v1.2). Mã Java đã bỏ bình luận/import để gọn. Chỉ để ĐỌC lấy ý tưởng thuật toán, viết lại bằng JavaScript.

Nội dung: Toàn bộ thuật toán 3D (Algo*): dựng chóp/lăng trụ/nón/trụ/cầu, mặt phẳng, giao tuyến, thiết diện, khoảng cách, góc, đối xứng, quay

Danh sách file trong phần này:
- AlgoAngleConic3D.java
- AlgoAngleElement3D.java
- AlgoAngleLinePlane.java
- AlgoAngleLines3D.java
- AlgoAngleLines3DOrientation.java
- AlgoAnglePlanes.java
- AlgoAnglePoint3D.java
- AlgoAnglePoints3D.java
- AlgoAnglePoints3DOrientation.java
- AlgoAnglePolygon3D.java
- AlgoAnglePolygon3DOrientation.java
- AlgoAngleVector3D.java
- AlgoAngleVectors3D.java
- AlgoAngleVectors3DOrientation.java
- AlgoAngularBisectorLines3D.java
- AlgoAngularBisectorPoints3D.java
- AlgoAngularBisectorPoints3DOrientation.java
- AlgoArchimedeanSolid.java
- AlgoArchimedeanSolidThreePoints.java
- AlgoAreaPoints3D.java
- AlgoAxes3D.java
- AlgoAxis3D.java
- AlgoCenterConic3D.java
- AlgoCenterQuadric.java
- AlgoCircle3DAxisPoint.java
- AlgoCircle3DCenterPointPoint.java
- AlgoCircle3DPointDirection.java
- AlgoCircle3DPointPointDirection.java
- AlgoCircle3DPointRadiusDirection.java
- AlgoCircle3DThreePoints.java
- AlgoClosestPoint3D.java
- AlgoClosestPointLines3D.java
- AlgoClosestPointToRegion3D.java
- AlgoCommonTangents3D.java
- AlgoConeInfinitePointPointNumber.java
- AlgoConeInfinitePointVectorNumber.java
- AlgoConePointLineAngle.java
- AlgoConicFivePoints3D.java
- AlgoConicFociLength3D.java
- AlgoConicPartCircle3D.java
- AlgoConicPartCircle3DOrientation.java
- AlgoConicPartCircumcircle3D.java
- AlgoConicPartConicParameters3D.java
- AlgoConicPartConicPoints3D.java
- AlgoCornerConicSection.java
- AlgoCurveCartesian3D.java
- AlgoCylinderAxisRadius.java
- AlgoCylinderInfinitePointPointNumber.java
- AlgoCylinderInfinitePointVectorNumber.java
- AlgoDependentConic3D.java
- AlgoDependentPlane3D.java
- AlgoDependentPoint3D.java
- AlgoDependentQuadric3D.java
- AlgoDependentVector3D.java
- AlgoDiameterLine3D.java
- AlgoDiameterVector3D.java
- AlgoDifferencePolygons3D.java
- AlgoDilate3D.java
- AlgoDispatcher3D.java
- AlgoDistanceLines3D.java
- AlgoDistancePlanes.java
- AlgoDistancePointPlane3D.java
- AlgoDrawingPadCorner3D.java
- AlgoElement3D.java
- AlgoEllipseFociLength3D.java
- AlgoEllipseHyperbolaFociPoint3D.java
- AlgoEllipseHyperbolaFociPoint3DOriented.java
- AlgoFocus3D.java
- AlgoForExtrusion.java
- AlgoFunctionNVarND.java
- AlgoHyperbolaFociLength3D.java
- AlgoIntersect3D.java
- AlgoIntersectCS1D1D.java
- AlgoIntersectCS1D2D.java
- AlgoIntersectConic3D.java
- AlgoIntersectConics3D.java
- AlgoIntersectCoordSys.java
- AlgoIntersectLineConic3D.java
- AlgoIntersectLineIncludedConic3D.java
- AlgoIntersectLinePolygon3D.java
- AlgoIntersectLineQuadric3D.java
- AlgoIntersectPathLinePolygon3D.java
- AlgoIntersectPathPlanePolygon3D.java
- AlgoIntersectPathPolygons3D.java
- AlgoIntersectPlaneConic.java
- AlgoIntersectPlaneCurve.java
- AlgoIntersectPlanePolygon.java
- AlgoIntersectPlanePolyhedron.java
- AlgoIntersectPlaneQuadric.java
- AlgoIntersectPlaneQuadricLimited.java
- AlgoIntersectPlaneQuadricPart.java
- AlgoIntersectPlanes.java
- AlgoIntersectPolygons3D.java
- AlgoIntersectQuadricsAsCircle.java
- AlgoIntersectRegionPlanePolyhedron.java
- AlgoIntersectSingle3D.java
- AlgoJoinPoints3D.java
- AlgoLengthPoint3D.java
- AlgoLengthVector3D.java
- AlgoLineBisectorSegmentDirection3D.java
- AlgoLineBisectorTwoPointsDirection3D.java
- AlgoLinePoint.java
- AlgoLinePointLine3D.java
- AlgoLinePointVector3D.java
- AlgoLocus3D.java
- AlgoLocusSlider3D.java
- AlgoMidpoint3D.java
- AlgoMidpointSegment3D.java
- AlgoMirror3D.java
- AlgoOrientedHeight.java
- AlgoOrtho.java
- AlgoOrthoLineLine.java
- AlgoOrthoLineLineLine.java
- AlgoOrthoLinePointDirectionDirection.java
- AlgoOrthoLinePointLine3D.java
- AlgoOrthoLinePointPlane.java
- AlgoOrthoPlane.java
- AlgoOrthoPlaneBisectorPointPoint.java
- AlgoOrthoPlaneBisectorSegment.java
- AlgoOrthoPlanePoint.java
- AlgoOrthoPlanePointLine.java
- AlgoOrthoPlanePointVector.java
- AlgoOrthoVectorLineDirection.java
- AlgoOrthoVectorPlane.java
- AlgoParabolaPointLine3D.java
- AlgoPlaneCS2D.java
- AlgoPlaneThreePoints.java
- AlgoPlaneThroughPoint.java
- AlgoPlaneThroughPointAndLine.java
- AlgoPlaneThroughPointAndPlane.java
- AlgoPlaneTwoLines.java
- AlgoPoint3DInRegion.java
- AlgoPoint3DOnPath.java
- AlgoPointVector3D.java
- AlgoPolarLine3D.java
- AlgoPolarPoint3D.java
- AlgoPolyLine3D.java
- AlgoPolygon3D.java
- AlgoPolygon3DDirection.java
- AlgoPolygonOperations3D.java
- AlgoPolygonRegular3D.java
- AlgoPolyhedron.java
- AlgoPolyhedronConvex.java
- AlgoPolyhedronNet.java
- AlgoPolyhedronNetConvex.java
- AlgoPolyhedronNetPrism.java
- AlgoPolyhedronNetPyramid.java
- AlgoPolyhedronPoints.java

### FILE: geogebra3D/kernel3D/algos/AlgoAngleConic3D.java
```java
public class AlgoAngleConic3D extends AlgoAngleElement3D {
 private Coords o;
 public AlgoAngleConic3D(Construction cons, GeoConic3D vec) {
  super(cons, vec);
 }
 protected final Coords getVectorCoords() {
  Coords v = ((GeoConic3D) vec).getEigenvec3D(0).copyVector();
  return v;
 }
 protected final Coords getOrigin() {
  return o;
 }
 protected final void setOrigin() {
  o = ((GeoConic3D) vec).getMidpoint3D();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngleElement3D.java
```java
public abstract class AlgoAngleElement3D extends AlgoAngleVectorND {
 private Coords vn;
 private Coords v2;
 public AlgoAngleElement3D(Construction cons, GeoElement vec) {
  super(cons, vec);
 }
 protected final GeoAngle newGeoAngle(Construction cons1) {
  GeoAngle ret = new GeoAngle3D(cons1);
  ret.setDrawableNoSlider();
  return ret;
 }
 protected abstract Coords getVectorCoords();
 protected abstract Coords getOrigin();
 protected abstract void setOrigin();
 public final void compute() {
  v2 = getVectorCoords();
  v2.calcNorm();
  double l2 = v2.getNorm();
  double c = v2.getX() / l2; 
  getAngle().setValue(AlgoAnglePoints3D.acos(c));
  vn = AlgoAnglePoints3D.forceNormalVector(Coords.VX, v2);
  setOrigin();
 }
 public Coords getVn() {
  return vn;
 }
 public boolean getCoordsInD3(Coords[] drawCoords) {
  if (!getOrigin().isDefined()) {
   return false;
  }
  drawCoords[0] = getOrigin();
  drawCoords[1] = Coords.VX;
  drawCoords[2] = v2;
  return true;
 }
 public boolean updateDrawInfo(double[] m, double[] firstVec, DrawAngle drawable) {
  if (vec.isGeoVector()) {
   if (!getOrigin().isDefined()) {
    return false;
   }
   if (!drawable.inView(getOrigin())) {
    return false;
   }
  }
  if (!drawable.inView(v2)) {
   return false;
  }
  m[0] = getOrigin().get()[0];
  m[1] = getOrigin().get()[1];
  firstVec[0] = 1;
  firstVec[1] = 0;
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngleLinePlane.java
```java
public class AlgoAngleLinePlane extends AlgoAngle implements DrawInformationAlgo {
 private GeoLineND g; 
 private GeoPlane3D p; 
 private GeoAngle angle; 
 private Coords vn;
 private Coords o;
 private Coords v1;
 private Coords v2;
 private Coords tmpCoords;
 AlgoAngleLinePlane(Construction cons, GeoLineND g, GeoPlane3D p) {
  super(cons);
  this.g = g;
  this.p = p;
  angle = newGeoAngle(cons);
  setInputOutput(); 
  compute();
 }
 protected final GeoAngle newGeoAngle(Construction cons1) {
  GeoAngle ret = new GeoAngle3D(cons1);
  ret.setDrawableNoSlider();
  return ret;
 }
 private AlgoAngleLinePlane(GeoLineND g, GeoPlane3D p) {
  super(((GeoElement) g).getConstruction(), false);
  this.g = g;
  this.p = p;
  initCoords();
  computeAngleAndUpdateCoordinates();
 }
 public AlgoAngleLinePlane(Construction cons, String label, GeoLineND g, GeoPlane3D p) {
  this(cons, g, p);
  angle.setLabel(label);
 }
 public AlgoAngleLinePlane copy() {
  return new AlgoAngleLinePlane(g.copy(), p.copy());
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) g;
  input[1] = p;
  setOnlyOutput(angle);
  setDependencies(); 
 }
 public GeoAngle getAngle() {
  return angle;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("AngleBetweenAB", g.getLabel(tpl), p.getLabel(tpl));
 }
 protected void initCoords() {
  o = new Coords(4);
  v1 = new Coords(4);
  vn = new Coords(4);
  tmpCoords = new Coords(3);
 }
 public final void compute() {
  getAngle().setValue(computeAngleAndUpdateCoordinates());
 }
 private double computeAngleAndUpdateCoordinates() {
  Coords o2 = g.getStartInhomCoords();
  v2 = g.getDirectionInD3();
  CoordMatrix4x4 pMat = p.getCoordSys().getMatrixOrthonormal();
  o2.projectPlaneThruV(pMat, v2, o);
  if (!o.isDefined()) { 
   return 0;
  }
  Coords vx = pMat.getVx();
  Coords vy = pMat.getVy();
  v1.setAdd3(v1.setMul3(vx, v2.dotproduct(vx)), tmpCoords.setMul3(vy, v2.dotproduct(vy)));
  if (v1.isZero()) { 
   v1.set3(vx);
   vn.setMul3(vy, -1);
   return Math.PI / 2;
  }
  v1.calcNorm();
  double l1 = v1.getNorm();
  v2.calcNorm();
  double l2 = v2.getNorm();
  double c = v1.dotproduct(v2) / (l1 * l2); 
  vn.setCrossProduct4(v2, v1);
  vn.normalize();
  return AlgoAnglePoints3D.acos(c);
 }
 public boolean updateDrawInfo(double[] m, double[] firstVec, DrawAngle drawable) {
  if (drawable == null) { 
   return false;
  }
  if (!o.isDefined()) {
   return false;
  }
  Coords ov = drawable.getCoordsInView(o);
  if (!drawable.inView(ov)) {
   return false;
  }
  m[0] = ov.get()[0];
  m[1] = ov.get()[1];
  Coords v1v = drawable.getCoordsInView(v2);
  if (!drawable.inView(v1v)) {
   return false;
  }
  Coords v2v = drawable.getCoordsInView(v1);
  if (!drawable.inView(v2v)) {
   return false;
  }
  firstVec[0] = v1v.get()[0];
  firstVec[1] = v1v.get()[1];
  return true;
 }
 public Coords getVn() {
  return vn;
 }
 public boolean getCoordsInD3(Coords[] drawCoords) {
  if (!o.isDefined()) {
   return false;
  }
  drawCoords[0] = o;
  drawCoords[1] = v2;
  drawCoords[2] = v1;
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngleLines3D.java
```java
public class AlgoAngleLines3D extends AlgoAngleLinesND {
 protected Coords vn;
 private Coords o;
 private Coords v1;
 private Coords v2;
 AlgoAngleLines3D(Construction cons, GeoLineND g, GeoLineND h, GeoDirectionND orientation) {
  super(cons, g, h, orientation);
 }
 AlgoAngleLines3D(Construction cons, GeoLineND g, GeoLineND h) {
  this(cons, g, h, null);
 }
 protected GeoAngle newGeoAngle(Construction cons1) {
  GeoAngle ret = new GeoAngle3D(cons1);
  ret.setDrawableNoSlider();
  return ret;
 }
 public void compute() {
  o = Coords.UNDEFINED; 
  if (!getg().isDefined() || !geth().isDefined()) {
   getAngle().setUndefined();
   return;
  }
  Coords o1 = getg().getStartInhomCoords();
  v1 = getg().getDirectionInD3();
  Coords o2 = geth().getStartInhomCoords();
  v2 = geth().getDirectionInD3();
  vn = v1.crossProduct4(v2);
  if (!vn.isDefined() || vn.isZero()) { 
   if (!getg().isGeoRay()
     || !geth().isGeoRay()
     || DoubleUtil.isGreaterEqual(v1.dotproduct(v2), 0)) {
    getAngle().setValue(0);
    return;
   }
   getAngle().setValue(Math.PI);
   if (o1.equalsForKernel(o2)) { 
    o = o1.copyVector();
    v1.completeOrthonormal(vn);
   } else {
    o = Coords.UNDEFINED; 
    return;
   }
  } else { 
   Coords[] points = CoordMatrixUtil.nearestPointsFromTwoLines(o1, v1, o2, v2);
   if (!points[0].equalsForKernel(points[1])) { 
    getAngle().setUndefined();
    return;
   }
   o = points[0];
   vn.normalize();
  }
  v1.calcNorm();
  double l1 = v1.getNorm();
  v2.calcNorm();
  double l2 = v2.getNorm();
  double c = v1.dotproduct(v2) / (l1 * l2); 
  getAngle().setValue(AlgoAnglePoints3D.acos(c));
 }
 public boolean updateDrawInfo(double[] m, double[] firstVec, DrawAngle drawable) {
  if (drawable == null) { 
   return false;
  }
  if (!o.isDefined()) {
   return false;
  }
  Coords ov = drawable.getCoordsInView(o);
  if (!drawable.inView(ov)) {
   return false;
  }
  m[0] = ov.get()[0];
  m[1] = ov.get()[1];
  Coords v1v = drawable.getCoordsInView(v1);
  if (!drawable.inView(v1v)) {
   return false;
  }
  Coords v2v = drawable.getCoordsInView(v2);
  if (!drawable.inView(v2v)) {
   return false;
  }
  firstVec[0] = v1v.get()[0];
  firstVec[1] = v1v.get()[1];
  return true;
 }
 public Coords getVn() {
  return vn;
 }
 public boolean getCoordsInD3(Coords[] drawCoords) {
  if (!o.isDefined()) {
   return false;
  }
  drawCoords[0] = o;
  drawCoords[1] = v1;
  drawCoords[2] = v2;
  return true;
 }
 private AlgoAngleLines3D(GeoLineND g, GeoLineND h) {
  super(g, h);
 }
 public AlgoAngleLines3D copy() {
  AlgoAngleLines3D copy = new AlgoAngleLines3D(g.copy(), h.copy());
  copy.o = o.copy();
  copy.v1 = v1.copy();
  copy.v2 = v2.copy();
  copy.vn = vn.copy();
  return copy;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngleLines3DOrientation.java
```java
public class AlgoAngleLines3DOrientation extends AlgoAngleLines3D {
 private GeoDirectionND orientation;
 AlgoAngleLines3DOrientation(
   Construction cons, GeoLineND g, GeoLineND h, GeoDirectionND orientation) {
  super(cons, g, h, orientation);
 }
 protected void setInput(GeoLineND g, GeoLineND h, GeoDirectionND orientation) {
  super.setInput(g, h, orientation);
  this.orientation = orientation;
 }
 protected GeoAngle newGeoAngle(Construction cons1) {
  return GeoAngle3D.newAngle3DWithDefaultInterval(cons1);
 }
 public void compute() {
  super.compute();
  if (orientation == kernel.getSpace()) { 
   return;
  }
  if (!getAngle().isDefined() || DoubleUtil.isZero(getAngle().getValue())) {
   return;
  }
  checkOrientation(vn, orientation, getAngle(), false);
 }
 public String toString(StringTemplate tpl) {
  return getLoc().getPlain("AngleBetweenAB", getg().getLabel(tpl), geth().getLabel(tpl));
 }
 protected void setInputOutput() {
  input = new GeoElement[3];
  input[0] = (GeoElement) getg();
  input[1] = (GeoElement) geth();
  input[2] = (GeoElement) orientation;
  setOnlyOutput(getAngle());
  setDependencies(); 
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAnglePlanes.java
```java
public class AlgoAnglePlanes extends AlgoAngle implements DrawInformationAlgo {
 private GeoPlane3D p; 
 private GeoPlane3D q; 
 private GeoAngle angle; 
 private Coords vn;
 private Coords o;
 private Coords v1;
 private Coords v2;
 AlgoAnglePlanes(Construction cons, GeoPlane3D p, GeoPlane3D q) {
  super(cons);
  this.p = p;
  this.q = q;
  angle = newGeoAngle(cons);
  setInputOutput(); 
  compute();
 }
 protected final GeoAngle newGeoAngle(Construction cons1) {
  GeoAngle ret = new GeoAngle3D(cons1);
  ret.setDrawableNoSlider();
  return ret;
 }
 private AlgoAnglePlanes(GeoPlane3D p, GeoPlane3D q) {
  super(p.getConstruction(), false);
  this.p = p;
  this.q = q;
  initCoords();
  computeAngleAndUpdateCoordinates();
 }
 public AlgoAnglePlanes copy() {
  return new AlgoAnglePlanes(p.copy(), q.copy());
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = p;
  input[1] = q;
  setOnlyOutput(angle);
  setDependencies(); 
 }
 public GeoAngle getAngle() {
  return angle;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("AngleBetweenAB", p.getLabel(tpl), q.getLabel(tpl));
 }
 protected void initCoords() {
  o = new Coords(4);
 }
 public final void compute() {
  getAngle().setValue(computeAngleAndUpdateCoordinates());
 }
 private double computeAngleAndUpdateCoordinates() {
  Coords vn1 = p.getDirectionInD3();
  Coords vn2 = q.getDirectionInD3();
  vn = vn1.crossProduct4(vn2).normalize();
  if (vn.isZero()) { 
   o = Coords.UNDEFINED;
   return 0;
  }
  v2 = vn1.crossProduct4(vn);
  v1 = vn2.crossProduct4(vn);
  p.getCoordSys()
    .getMatrixOrthonormal()
    .getOrigin()
    .projectPlaneThruV(q.getCoordSys().getMatrixOrthonormal(), v2, o);
  return AlgoAnglePoints3D.acos(vn1.dotproduct(vn2));
 }
 public boolean updateDrawInfo(double[] m, double[] firstVec, DrawAngle drawable) {
  return false;
 }
 public Coords getVn() {
  return vn;
 }
 public boolean getCoordsInD3(Coords[] drawCoords) {
  if (!o.isDefined()) {
   return false;
  }
  drawCoords[0] = o;
  drawCoords[1] = v2;
  drawCoords[2] = v1;
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAnglePoint3D.java
```java
public class AlgoAnglePoint3D extends AlgoAngleElement3D {
 public AlgoAnglePoint3D(Construction cons, GeoPoint3D vec) {
  super(cons, vec);
 }
 protected final Coords getVectorCoords() {
  Coords v = ((GeoPoint3D) vec).getCoordsInD3().copyVector();
  v.setW(0);
  return v;
 }
 protected final Coords getOrigin() {
  return Coords.O;
 }
 protected final void setOrigin() {
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAnglePoints3D.java
```java
public class AlgoAnglePoints3D extends AlgoAnglePointsND {
 protected Coords center;
 protected Coords v1;
 protected Coords v2;
 protected Coords vn;
 AlgoAnglePoints3D(Construction cons, GeoPointND A, GeoPointND B, GeoPointND C) {
  this(cons, A, B, C, null);
 }
 AlgoAnglePoints3D(
   Construction cons, GeoPointND A, GeoPointND B, GeoPointND C, GeoDirectionND orientation) {
  super(cons, A, B, C, orientation);
 }
 AlgoAnglePoints3D(Construction cons) {
  super(cons);
 }
 protected GeoAngle newGeoAngle(Construction cons1) {
  GeoAngle ret = new GeoAngle3D(cons);
  ret.setDrawableNoSlider();
  return ret;
 }
 public void compute() {
  center = getB().getInhomCoordsInD3();
  v1 = getA().getInhomCoordsInD3().sub(center);
  v2 = getC().getInhomCoordsInD3().sub(center);
  v1.calcNorm();
  double l1 = v1.getNorm();
  v2.calcNorm();
  double l2 = v2.getNorm();
  if (DoubleUtil.isZero(l1) || DoubleUtil.isZero(l2)) {
   getAngle().setUndefined();
   return;
  }
  double c = v1.dotproduct(v2) / (l1 * l2); 
  getAngle().setValue(acos(c));
  setForceNormalVector();
 }
 protected void setForceNormalVector() {
  vn = forceNormalVector(v1, v2);
 }
 public Coords getVn() {
  return vn;
 }
 public boolean getCoordsInD3(Coords[] drawCoords) {
  drawCoords[0].set(center);
  drawCoords[1].set(v1);
  drawCoords[2].set(v2);
  return true;
 }
 protected static double acos(double c) {
  if (DoubleUtil.isEqual(c, 1) && c > 1) {
   return 0;
  }
  if (DoubleUtil.isEqual(c, -1) && c < -1) {
   return Math.PI;
  }
  return Math.acos(c);
 }
 protected static Coords forceNormalVector(Coords v1, Coords v2) {
  Coords vn = v1.crossProduct4(v2);
  if (vn.isZero()) { 
   vn = crossXorY(v1);
  }
  vn.normalize();
  return vn;
 }
 protected static Coords crossXorY(Coords v1) {
  Coords vn = v1.crossProduct4(Coords.VX);
  if (vn.isZero()) {
   vn = v1.crossProduct4(Coords.VY);
  }
  return vn;
 }
 private AlgoAnglePoints3D(
   GeoPointND A, GeoPointND B, GeoPointND C, Coords center, Coords v1, Coords v2, Coords vn) {
  super(A, B, C);
  this.center = center;
  this.v1 = v1;
  this.v2 = v2;
  this.vn = vn;
 }
 public AlgoAnglePoints3D copy() {
  return new AlgoAnglePoints3D(
    getA().copy(),
    getB().copy(),
    getC().copy(),
    center.copyVector(),
    v1.copyVector(),
    v2.copyVector(),
    vn.copyVector());
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAnglePoints3DOrientation.java
```java
public class AlgoAnglePoints3DOrientation extends AlgoAnglePoints3D {
 private GeoDirectionND orientation;
 private boolean isReversed;
 AlgoAnglePoints3DOrientation(
   Construction cons, GeoPointND A, GeoPointND B, GeoPointND C, GeoDirectionND orientation) {
  super(cons, A, B, C, orientation);
 }
 public AlgoAnglePoints3DOrientation(
   Construction cons, GeoDirectionND orientation, boolean isReversed) {
  super(cons);
  this.orientation = orientation;
  this.isReversed = isReversed;
 }
 protected void setInput(GeoPointND A, GeoPointND B, GeoPointND C, GeoDirectionND orientation) {
  super.setInput(A, B, C, orientation);
  this.orientation = orientation;
 }
 protected GeoAngle newGeoAngle(Construction cons1) {
  return GeoAngle3D.newAngle3DWithDefaultInterval(cons1);
 }
 protected void setInputOutput() {
  input = new GeoElement[4];
  input[0] = (GeoElement) getA();
  input[1] = (GeoElement) getB();
  input[2] = (GeoElement) getC();
  input[3] = (GeoElement) orientation;
  setOnlyOutput(getAngle());
  setDependencies(); 
 }
 public void compute() {
  super.compute();
  if (orientation == kernel.getSpace()) { 
   return;
  }
  if (!getAngle().isDefined() || DoubleUtil.isZero(getAngle().getValue())) {
   return;
  }
  checkOrientation(vn, orientation, getAngle(), isReversed);
 }
 protected void setForceNormalVector() {
  vn = v1.crossProduct4(v2);
  if (vn.isZero()) { 
   if (orientation == kernel.getSpace()) { 
    vn = crossXorY(v1);
   } else {
    vn = orientation.getDirectionInD3().copyVector();
   }
  }
  vn.normalize();
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "AngleBetweenABC",
      getA().getLabel(tpl),
      getB().getLabel(tpl),
      getC().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAnglePolygon3D.java
```java
public class AlgoAnglePolygon3D extends AlgoAnglePolygonND {
 public AlgoAnglePolygon3D(Construction cons, String[] labels, GeoPolygon poly) {
  this(cons, labels, poly, false);
 }
 public AlgoAnglePolygon3D(
   Construction cons, String[] labels, GeoPolygon poly, boolean internalAngle) {
  this(cons, labels, poly, null, internalAngle);
 }
 public AlgoAnglePolygon3D(
   Construction cons,
   String[] labels,
   GeoPolygon poly,
   GeoDirectionND orientation,
   boolean internalAngle) {
  super(cons, labels, poly, orientation, internalAngle);
 }
 protected AlgoAnglePointsND newAlgoAnglePoints(Construction cons1) {
  return new AlgoAnglePoints3DOrientation(cons1, getPolygon(), getPolygon().hasReverseNormal());
 }
 protected final GeoAngle newGeoAngle(Construction cons1) {
  return GeoAngle3D.newAngle3DWithDefaultInterval(cons1);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAnglePolygon3DOrientation.java
```java
public class AlgoAnglePolygon3DOrientation extends AlgoAnglePolygon3D {
 private GeoDirectionND orientation;
 public AlgoAnglePolygon3DOrientation(
   Construction cons, String[] labels, GeoPolygon poly, GeoDirectionND orientation) {
  super(cons, labels, poly, orientation, false);
 }
 protected AlgoAnglePointsND newAlgoAnglePoints(Construction cons1) {
  return new AlgoAnglePoints3DOrientation(cons1, orientation, false);
 }
 protected void setPolyAndOrientation(GeoPolygon p, GeoDirectionND orientation) {
  super.setPolyAndOrientation(p, orientation);
  this.orientation = orientation;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = poly;
  input[1] = (GeoElement) orientation;
  setDependencies();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngleVector3D.java
```java
public class AlgoAngleVector3D extends AlgoAngleElement3D {
 private Coords o;
 public AlgoAngleVector3D(Construction cons, GeoVector3D vec) {
  super(cons, vec);
 }
 protected final Coords getVectorCoords() {
  return ((GeoVector3D) vec).getCoordsInD3().copyVector();
 }
 protected final Coords getOrigin() {
  return o;
 }
 protected final void setOrigin() {
  GeoPointND start = getStartPoint((GeoVector3D) vec);
  if (centerIsNotDrawable(start)) {
   o = Coords.UNDEFINED;
  } else {
   o = start.getInhomCoordsInD3();
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngleVectors3D.java
```java
public class AlgoAngleVectors3D extends AlgoAngleVectorsND {
 protected Coords vn;
 private Coords o;
 private Coords v1;
 private Coords v2;
 AlgoAngleVectors3D(Construction cons, GeoVectorND v, GeoVectorND w) {
  this(cons, v, w, null);
 }
 AlgoAngleVectors3D(Construction cons, GeoVectorND v, GeoVectorND w, GeoDirectionND orientation) {
  super(cons, v, w, orientation);
 }
 protected GeoAngle newGeoAngle(Construction cons1) {
  GeoAngle ret = new GeoAngle3D(cons1);
  ret.setDrawableNoSlider();
  return ret;
 }
 public void compute() {
  v1 = getv().getCoordsInD3();
  v2 = getw().getCoordsInD3();
  v1.calcNorm();
  double l1 = v1.getNorm();
  v2.calcNorm();
  double l2 = v2.getNorm();
  double c = v1.dotproduct(v2) / (l1 * l2); 
  getAngle().setValue(AlgoAnglePoints3D.acos(c));
  vn = AlgoAnglePoints3D.forceNormalVector(v1, v2);
  GeoPointND start = getStartPoint(getv());
  if (centerIsNotDrawable(start)) {
   o = Coords.UNDEFINED;
  } else {
   o = start.getInhomCoordsInD3();
  }
 }
 public Coords getVn() {
  return vn;
 }
 public boolean getCoordsInD3(Coords[] drawCoords) {
  if (!o.isDefined()) {
   return false;
  }
  drawCoords[0] = o;
  drawCoords[1] = v1;
  drawCoords[2] = v2;
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngleVectors3DOrientation.java
```java
public class AlgoAngleVectors3DOrientation extends AlgoAngleVectors3D {
 private GeoDirectionND orientation;
 AlgoAngleVectors3DOrientation(
   Construction cons, GeoVectorND v, GeoVectorND w, GeoDirectionND orientation) {
  super(cons, v, w, orientation);
 }
 protected void setInput(GeoVectorND v, GeoVectorND w, GeoDirectionND orientation) {
  super.setInput(v, w, orientation);
  this.orientation = orientation;
 }
 protected GeoAngle newGeoAngle(Construction cons1) {
  return GeoAngle3D.newAngle3DWithDefaultInterval(cons1);
 }
 protected void setInputOutput() {
  input = new GeoElement[3];
  input[0] = (GeoElement) getv();
  input[1] = (GeoElement) getw();
  input[2] = (GeoElement) orientation;
  setOnlyOutput(getAngle());
  setDependencies(); 
 }
 public void compute() {
  super.compute();
  if (orientation == kernel.getSpace()) { 
   return;
  }
  if (!getAngle().isDefined() || DoubleUtil.isZero(getAngle().getValue())) {
   return;
  }
  checkOrientation(vn, orientation, getAngle(), false);
 }
 public String toString(StringTemplate tpl) {
  return getLoc().getPlain("AngleBetweenAB", getv().getLabel(tpl), getw().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngularBisectorLines3D.java
```java
public class AlgoAngularBisectorLines3D extends AlgoElement {
 private GeoLineND g; 
 private GeoLineND h; 
 private GeoLine3D[] bisector; 
 private GeoVector[] wv; 
 private GeoPoint3D B; 
 private Coords vn = new Coords(3);
 private Coords tmpCoords = new Coords(3);
 private Coords d1 = new Coords(3);
 private Coords d2 = new Coords(3);
 public AlgoAngularBisectorLines3D(Construction cons, String[] labels, GeoLineND g, GeoLineND h) {
  this(cons, g, h);
  LabelManager.setLabels(labels, bisector);
 }
 public Commands getClassName() {
  return Commands.AngularBisector;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_ANGULAR_BISECTOR;
 }
 AlgoAngularBisectorLines3D(Construction cons, GeoLineND g, GeoLineND h) {
  super(cons);
  this.g = g;
  this.h = h;
  bisector = new GeoLine3D[2];
  bisector[0] = new GeoLine3D(cons);
  bisector[1] = new GeoLine3D(cons);
  setInputOutput(); 
  wv = new GeoVector[2];
  wv[0] = new GeoVector(cons);
  wv[0].setCoords(0, 0, 0);
  wv[1] = new GeoVector(cons);
  wv[1].setCoords(0, 0, 0);
  B = new GeoPoint3D(cons);
  bisector[0].setStartPoint(B);
  bisector[1].setStartPoint(B);
  compute();
 }
 public void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) g;
  input[1] = (GeoElement) h;
  super.setOutput(bisector);
  setDependencies(); 
 }
 public GeoLine3D[] getLines() {
  return bisector;
 }
 private GeoLineND getg() {
  return g;
 }
 private GeoLineND geth() {
  return h;
 }
 public final void compute() {
  if (!getg().isDefined() || !geth().isDefined()) {
   bisector[0].setUndefined();
   bisector[1].setUndefined();
   return;
  }
  Coords o1 = getg().getStartInhomCoords();
  Coords v1 = getg().getDirectionInD3();
  Coords o2 = geth().getStartInhomCoords();
  Coords v2 = geth().getDirectionInD3();
  vn.setCrossProduct3(v1, v2);
  vn.normalize();
  if (!vn.isDefined()) { 
   bisector[0].setCoord(tmpCoords.setAdd3(o1, o2).mulInside3(0.5), v1);
   bisector[1].setUndefined();
  } else { 
   Coords[] points = CoordMatrixUtil.nearestPointsFromTwoLines(o1, v1, o2, v2);
   if (!points[0].equalsForKernel(points[1])) { 
    bisector[0].setUndefined();
    bisector[1].setUndefined();
   } else {
    d1.set3(v1);
    d1.normalize();
    d2.set3(v2);
    d2.normalize();
    bisector[0].setCoord(points[0], tmpCoords.setAdd3(d1, d2));
    bisector[1].setCoord(points[0], tmpCoords.setSub3(d1, d2));
   }
  }
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("AngleBisectorOfAB", g.getLabel(tpl), h.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngularBisectorPoints3D.java
```java
public class AlgoAngularBisectorPoints3D extends AlgoElement3D {
 private GeoPointND A;
 private GeoPointND B;
 private GeoPointND C;
 private GeoLine3D bisector;
 private Coords o = new Coords(3);
 private Coords d = new Coords(3);
 private Coords v1 = new Coords(3);
 public AlgoAngularBisectorPoints3D(
   Construction cons, String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  this(cons, label, A, B, C, null);
 }
 protected AlgoAngularBisectorPoints3D(
   Construction cons,
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoPointND C,
   GeoDirectionND orientation) {
  super(cons);
  this.A = A;
  this.B = B;
  this.C = C;
  bisector = new GeoLine3D(cons);
  bisector.setStartPoint(B);
  setInput(orientation); 
  setOutput(); 
  compute();
  bisector.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.AngularBisector;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_ANGULAR_BISECTOR;
 }
 protected void setInput(GeoDirectionND orientation) {
  input = new GeoElement[3];
  input[0] = (GeoElement) A;
  input[1] = (GeoElement) B;
  input[2] = (GeoElement) C;
 }
 private void setOutput() {
  setOnlyOutput(bisector);
  setDependencies(); 
 }
 public GeoLine3D getLine() {
  return bisector;
 }
 protected GeoPointND getA() {
  return A;
 }
 protected GeoPointND getB() {
  return B;
 }
 protected GeoPointND getC() {
  return C;
 }
 public final void compute() {
  boolean infiniteB = B.isInfinite();
  if (infiniteB) {
   o.setAdd3(A.getInhomCoordsInD3(), C.getInhomCoordsInD3()).mulInside3(0.5);
   d.set3(B.getCoordsInD3());
   bisector.setCoord(o, d);
  }
  else {
   o.set3(B.getInhomCoordsInD3());
   v1.setSub3(A.getInhomCoordsInD3(), o);
   v1.normalize();
   d.setSub3(C.getInhomCoordsInD3(), o);
   d.normalize();
   d.setAdd3(v1, d);
   setCoordFromFiniteB(o, d, v1);
  }
 }
 protected void setCoordFromFiniteB(Coords o, Coords d, Coords v1) {
  bisector.setCoord(o, d);
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("AngleBisectorOfABC", A.getLabel(tpl), B.getLabel(tpl), C.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAngularBisectorPoints3DOrientation.java
```java
public class AlgoAngularBisectorPoints3DOrientation extends AlgoAngularBisectorPoints3D {
 private GeoDirectionND orientation;
 public AlgoAngularBisectorPoints3DOrientation(
   Construction cons,
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoPointND C,
   GeoDirectionND orientation) {
  super(cons, label, A, B, C, orientation);
 }
 protected void setInput(GeoDirectionND orientation) {
  this.orientation = orientation;
  input = new GeoElement[4];
  input[0] = (GeoElement) getA();
  input[1] = (GeoElement) getB();
  input[2] = (GeoElement) getC();
  input[3] = (GeoElement) orientation;
 }
 public final String toString(StringTemplate tpl) {
  if (orientation == kernel.getSpace()) {
   return getLoc()
     .getPlain(
       "AngleBisectorOfABCInSpace",
       getA().getLabel(tpl),
       getB().getLabel(tpl),
       getC().getLabel(tpl),
       orientation.getLabel(tpl));
  }
  if (orientation instanceof GeoCoordSys2D) {
   return getLoc()
     .getPlain(
       "AngleBisectorOfABCParallelToD",
       getA().getLabel(tpl),
       getB().getLabel(tpl),
       getC().getLabel(tpl),
       orientation.getLabel(tpl));
  }
  return getLoc()
    .getPlain(
      "AngleBisectorOfABCPerpendicularToD",
      getA().getLabel(tpl),
      getB().getLabel(tpl),
      getC().getLabel(tpl),
      orientation.getLabel(tpl));
 }
 protected void setCoordFromFiniteB(Coords o, Coords d, Coords v1) {
  Coords vn = orientation.getDirectionInD3();
  if (vn == null) { 
   super.setCoordFromFiniteB(o, d, v1);
   return;
  }
  if (d.isZero()) { 
   Coords d1 = vn.crossProduct4(v1);
   super.setCoordFromFiniteB(o, d1, v1);
  } else { 
   if (DoubleUtil.isZero(vn.dotproduct(d))) {
    super.setCoordFromFiniteB(o, d, v1);
   } else {
    getLine().setUndefined();
   }
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoArchimedeanSolid.java
```java
public class AlgoArchimedeanSolid extends AlgoPolyhedron {
 private OutputHandler<GeoPolygon3D> outputPolygons;
 private OutputHandler<GeoSegment3D> outputSegments;
 private GeoPointND A;
 private GeoPointND B;
 private GeoDirectionND v;
 private GeoPolygon polygon;
 private GeoBoolean isDirectGeo;
 private int inputPointsCount;
 private final CoordMatrix4x4 matrix;
 private Coords[] coords;
 private final Commands name;
 private final PlatonicSolid solidDescription;
 private double volumeFactor;
 private double heightFactor;
 private double areaFactor;
 private final Coords tmpCoords = Coords.createInhomCoorsInD3();
 private boolean polyhedronIsDummy;
 private final Coords o = Coords.createInhomCoorsInD3();
 private final Coords v1 = new Coords(4);
 private final Coords v1l = new Coords(4);
 private final Coords v2 = new Coords(4);
 private final Coords v2l = new Coords(4);
 private final Coords v3 = new Coords(4);
 private final Coords v3l = new Coords(4);
 private final Coords vn = new Coords(4);
 private boolean wasDirect;
 public AlgoArchimedeanSolid(
   Construction c,
   String[] labels,
   GeoPointND A,
   GeoPointND B,
   GeoDirectionND v,
   Commands name) {
  this(c, name);
  this.A = A;
  this.B = B;
  this.v = v;
  inputPointsCount = 2;
  initInputOutput(labels, (GeoElement) A, (GeoElement) B, (GeoElement) v);
 }
 public AlgoArchimedeanSolid(
   Construction c, String[] labels, GeoPolygon poly, GeoBoolean isDirect, Commands name) {
  this(c, name);
  this.polygon = poly;
  this.isDirectGeo = isDirect;
  switch (name) {
   default: 
   case Tetrahedron:
    inputPointsCount = 3;
    break;
   case Cube:
    inputPointsCount = 4;
    break;
   case Dodecahedron:
    inputPointsCount = 5;
    break;
  }
  initInputOutput(labels, poly, isDirect);
 }
 private AlgoArchimedeanSolid(Construction c, Commands name) {
  super(c);
  this.name = name;
  init();
  solidDescription = computeSolidDescription(name);
  setVolumeAreaAndHeightFactors();
  matrix = new CoordMatrix4x4();
 }
 public static PlatonicSolid computeSolidDescription(Commands name) {
  switch (name) {
   default:
   case Tetrahedron:
    return PlatonicSolidsFactory.getTetrahedron();
   case Cube:
    return PlatonicSolidsFactory.getCube();
   case Octahedron:
    return PlatonicSolidsFactory.getOctahedron();
   case Dodecahedron:
    return PlatonicSolidsFactory.getDodecahedron();
   case Icosahedron:
    return PlatonicSolidsFactory.getIcosahedron();
  }
 }
 protected GeoPolyhedron.Type getPolyhedronType() {
  return getPolyhedronType(name);
 }
 public static GeoPolyhedron.Type getPolyhedronType(Commands name) {
  switch (name) {
   default:
   case Tetrahedron:
    return GeoPolyhedron.Type.TETRAHEDRON;
   case Cube:
    return GeoPolyhedron.Type.CUBE;
   case Octahedron:
    return GeoPolyhedron.Type.OCTAHEDRON;
   case Dodecahedron:
    return GeoPolyhedron.Type.DODECAHEDRON;
   case Icosahedron:
    return GeoPolyhedron.Type.ICOSAHEDRON;
  }
 }
 private void initInputOutput(String[] labels, GeoElement... elements) {
  setInput(elements);
  addAlgoToInput();
  createPolyhedron();
  if (polyhedronIsDummy) {
   setUndefined();
  } else {
   computeSolid();
  }
  polyhedron.createFaces();
  initIsDirect();
  setOutput();
  setLabels(labels);
  update();
 }
 protected GeoPointND getA() {
  if (polygon == null) {
   return A;
  }
  return getPolygonPoint(0);
 }
 protected GeoPointND getB() {
  if (polygon == null) {
   return B;
  }
  return getPolygonPoint(1);
 }
 private Coords getDirection() {
  if (polygon == null) {
   return v.getDirectionInD3();
  }
  return polygon.getDirectionInD3();
 }
 private void setInput(GeoElement... elements) {
  input = elements;
 }
 protected void createOutputSegments() {
  outputSegments = createOutputSegmentsHandler();
 }
 protected void createOutputPolygons() {
  outputPolygons = createOutputPolygonsHandler();
 }
 protected void updateOutput() {
  outputPolygons.addOutput(polyhedron.getFaces3D(), false, false);
  outputSegments.addOutput(polyhedron.getSegments3D(), false, true);
 }
 protected void createPolyhedron() {
  int vertexCount = solidDescription.getVertexCount();
  outputPoints.augmentOutputSize(vertexCount - inputPointsCount, false);
  if (getPolyhedron().allLabelsAreSet()) {
   outputPoints.setLabels(null);
  }
  coords = solidDescription.getVertices();
  GeoPointND[] points = new GeoPointND[vertexCount];
  if (polygon == null) {
   points[0] = getA();
   points[1] = getB();
   polyhedronIsDummy = false;
  } else {
   if (polygon.isDefined() && polygon.getPointsLength() == inputPointsCount) {
    for (int i = 0; i < inputPointsCount; i++) {
     points[i] = getPolygonPoint(i);
    }
    polyhedronIsDummy = false;
   } else {
    for (int i = 0; i < inputPointsCount; i++) {
     points[i] = new DummyGeoPoint3D(cons, i);
    }
    polyhedronIsDummy = true;
   }
  }
  for (int i = inputPointsCount; i < vertexCount; i++) {
   GeoPoint3D point = outputPoints.getElement(i - inputPointsCount);
   points[i] = point;
   point.setCoords(coords[i]);
   polyhedron.addPointCreated(point);
  }
  int[][] faces = solidDescription.getFaces();
  int firstPoly;
  if (polygon == null) {
   firstPoly = 0;
  } else {
   polyhedron.addPolygonLinked(polygon);
   firstPoly = 1;
  }
  for (int i = firstPoly; i < faces.length; i++) {
   polyhedron.startNewFace();
   for (int j = 0; j < faces[i].length; j++) {
    polyhedron.addPointToCurrentFace(points[faces[i][j]]);
   }
   polyhedron.endCurrentFace();
  }
 }
 private GeoPointND getPolygonPoint(int i) {
  return polygon.getPointND(i);
 }
 private void setPolyhedronNotDummyIfPossible() {
  if (polygon.isDefined() && polygon.getPointsLength() == inputPointsCount) {
   polyhedron.replaceDummies(polygon.getPointsND(), polygon.getSegments());
   polyhedronIsDummy = false;
  }
 }
 public void compute() {
  if (polyhedronIsDummy) {
   setPolyhedronNotDummyIfPossible();
  }
  if (!polyhedronIsDummy) {
   computeSolid();
  }
 }
 private void computeSolid() {
  polyhedron.setDefined();
  if (polygon != null
    && (!polygon.isDefined() || polygon.getPointsLength() != inputPointsCount)) {
   setUndefined();
   return;
  }
  o.set3(getA().getInhomCoordsInD3());
  v1l.setSub3(getB().getInhomCoordsInD3(), o);
  if (v1l.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   setUndefined();
   return;
  }
  v1l.calcNorm();
  double dist = v1l.getNorm();
  v1.setMul3(v1l, 1 / dist);
  Coords vnd;
  if (polygon == null) {
   vnd = getDirection();
   if (vnd.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
    setUndefined();
    return;
   }
   if (!DoubleUtil.isZero(vnd.dotproduct(v1))) {
    setUndefined();
    return;
   }
  } else {
   v2.setSub3(getPolygonPoint(2).getInhomCoordsInD3(), o);
   vn.setCrossProduct3(v1, v2);
   if (vn.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
    setUndefined();
    return;
   }
   vn.normalize();
   vnd = vn;
  }
  v2.setCrossProduct3(vnd, v1);
  v2.normalize();
  v3.setCrossProduct3(v1, v2);
  v2l.setMul3(v2, dist);
  if (isDirect()) {
   v3l.setMul3(v3, dist);
  } else {
   v3l.setMul3(v3, -dist);
  }
  matrix.setOrigin(o);
  matrix.setVx(v1l);
  matrix.setVy(v2l);
  matrix.setVz(v3l);
  if (polygon != null) {
   for (int i = 2; i < inputPointsCount; i++) {
    tmpCoords.setMul3(matrix, coords[i]);
    if (!tmpCoords.equalsForKernel3(getPolygonPoint(i).getInhomCoordsInD3())) {
     setUndefined();
     return;
    }
   }
  }
  for (int i = 0; i < coords.length - inputPointsCount; i++) {
   outputPoints.getElement(i).setCoords(matrix.mul(coords[i + inputPointsCount]), true);
  }
  polyhedron.setVolume(dist * dist * dist * volumeFactor);
  polyhedron.setArea(dist * dist * areaFactor);
  polyhedron.setOrientedHeight(dist * heightFactor);
 }
 private void setVolumeAreaAndHeightFactors() {
  switch (name) {
   default:
   case Tetrahedron:
    volumeFactor = Math.sqrt(2) / 12;
    heightFactor = Math.sqrt(2. / 3.);
    areaFactor = Math.sqrt(3);
    break;
   case Cube:
    volumeFactor = 1;
    heightFactor = 1;
    areaFactor = 6;
    break;
   case Octahedron:
    volumeFactor = Math.sqrt(2) / 3;
    heightFactor = Math.sqrt(2. / 3.);
    areaFactor = 2 * Math.sqrt(3);
    break;
   case Dodecahedron:
    volumeFactor = (15 + 7 * Math.sqrt(5)) / 4;
    heightFactor = Math.sqrt(2.5 + 1.1 * Math.sqrt(5));
    areaFactor = 3 * Math.sqrt(25 + 10 * Math.sqrt(5));
    break;
   case Icosahedron:
    volumeFactor = (15 + 5 * Math.sqrt(5)) / 12;
    heightFactor = (3 + Math.sqrt(5)) / (2 * Math.sqrt(3));
    areaFactor = 5 * Math.sqrt(3);
    break;
  }
 }
 private void setUndefined() {
  polyhedron.setUndefined();
  for (int i = 0; i < outputPoints.size(); i++) {
   outputPoints.getElement(i).setUndefined();
  }
 }
 protected void updateDependentGeos() {
  super.updateDependentGeos();
  outputPoints.update();
  if (!getPolyhedron().allLabelsAreSet()) {
   outputSegments.updateParentAlgorithm();
   outputPolygons.updateParentAlgorithm();
  }
 }
 public Commands getClassName() {
  return name;
 }
 protected final boolean isFirstInputPointVisible() {
  return true;
 }
 protected final boolean isFirstInputPointLabelVisible() {
  return true;
 }
 private boolean computeIsDirect() {
  if (polygon == null) {
   return true;
  }
  return polygon.hasReverseNormal() ^ isDirectGeo.getBoolean();
 }
 private boolean isDirect() {
  boolean ret = computeIsDirect();
  if (wasDirect != ret) {
   polyhedron.setReverseNormals(ret);
   wasDirect = ret;
  }
  return ret;
 }
 private void initIsDirect() {
  wasDirect = computeIsDirect();
  polyhedron.setReverseNormals(wasDirect);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoArchimedeanSolidThreePoints.java
```java
public class AlgoArchimedeanSolidThreePoints extends AlgoPolyhedron {
 private OutputHandler<GeoPolygon3D> outputPolygons;
 private OutputHandler<GeoSegment3D> outputSegments;
 private final GeoPointND A;
 private final GeoPointND B;
 private final GeoPointND C;
 private final CoordMatrix4x4 matrix;
 private Coords[] coords;
 private final Commands name;
 private final PlatonicSolid solidDescription;
 private final Coords v1l = new Coords(4);
 private final Coords v2l = new Coords(4);
 private final Coords vnl = new Coords(4);
 private final Coords tmpCoords = new Coords(4);
 private double volumeFactor;
 private double heightFactor;
 private double areaFactor;
 public AlgoArchimedeanSolidThreePoints(
   Construction c, String[] labels, GeoPointND A, GeoPointND B, GeoPointND C, Commands name) {
  super(c);
  this.name = name;
  init();
  solidDescription = AlgoArchimedeanSolid.computeSolidDescription(name);
  setVolumeAreaAndHeightFactors();
  this.A = A;
  this.B = B;
  this.C = C;
  matrix = new CoordMatrix4x4();
  createPolyhedron();
  compute();
  setInput();
  addAlgoToInput();
  polyhedron.createFaces();
  polyhedron.setReverseNormals();
  setOutput();
  setLabels(labels);
  update();
 }
 protected GeoPolyhedron.Type getPolyhedronType() {
  return AlgoArchimedeanSolid.getPolyhedronType(name);
 }
 private void setInput() {
  input = new GeoElement[3];
  input[0] = (GeoElement) A;
  input[1] = (GeoElement) B;
  input[2] = (GeoElement) C;
 }
 protected void createOutputSegments() {
  outputSegments = createOutputSegmentsHandler();
 }
 protected void createOutputPolygons() {
  outputPolygons = createOutputPolygonsHandler();
 }
 protected void updateOutput() {
  outputPolygons.addOutput(polyhedron.getFaces3D(), false, false);
  outputSegments.addOutput(polyhedron.getSegments3D(), false, true);
 }
 protected void createPolyhedron() {
  int vertexCount = solidDescription.getVertexCount();
  outputPoints.augmentOutputSize(vertexCount - 3, false);
  if (getPolyhedron().allLabelsAreSet()) {
   outputPoints.setLabels(null);
  }
  coords = solidDescription.getVertices();
  GeoPointND[] points = new GeoPointND[vertexCount];
  points[0] = A;
  points[1] = B;
  points[2] = C;
  for (int i = 3; i < vertexCount; i++) {
   GeoPoint3D point = outputPoints.getElement(i - 3);
   points[i] = point;
   point.setCoords(coords[i]);
   polyhedron.addPointCreated(point);
  }
  int[][] faces = solidDescription.getFaces();
  for (int i = 0; i < faces.length; i++) {
   polyhedron.startNewFace();
   for (int j = 0; j < faces[i].length; j++) {
    polyhedron.addPointToCurrentFace(points[faces[i][j]]);
   }
   polyhedron.endCurrentFace();
  }
 }
 public void compute() {
  polyhedron.setDefined();
  Coords o = A.getInhomCoordsInD3();
  Coords cB = B.getInhomCoordsInD3();
  v1l.setSub(cB, o);
  if (v1l.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   setUndefined();
   return;
  }
  Coords cC = C.getInhomCoordsInD3();
  v2l.setSub(cC, cB); 
  if (v2l.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   setUndefined();
   return;
  }
  vnl.setCrossProduct4(v1l, v2l);
  if (vnl.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   setUndefined();
   return;
  }
  v1l.calcNorm();
  double l = v1l.getNorm();
  vnl.normalize();
  v2l.setCrossProduct4(vnl, v1l);
  vnl.mulInside3(l);
  matrix.setOrigin(o);
  matrix.setVx(v1l);
  matrix.setVy(v2l);
  matrix.setVz(vnl);
  if (!cC.equalsForKernel(tmpCoords.setMul(matrix, coords[2]), kernel.getStandardPrecision())) {
   setUndefined();
   return;
  }
  for (int i = 0; i < coords.length - 3; i++) {
   outputPoints.getElement(i).setCoords(tmpCoords.setMul(matrix, coords[i + 3]), true);
  }
  polyhedron.setVolume(l * l * l * volumeFactor);
  polyhedron.setArea(l * l * areaFactor);
  polyhedron.setOrientedHeight(l * heightFactor);
 }
 private void setVolumeAreaAndHeightFactors() {
  switch (name) {
   default:
   case Tetrahedron:
    volumeFactor = Math.sqrt(2) / 12;
    heightFactor = Math.sqrt(2. / 3.);
    areaFactor = Math.sqrt(3);
    break;
   case Cube:
    volumeFactor = 1;
    heightFactor = 1;
    areaFactor = 6;
    break;
   case Octahedron:
    volumeFactor = Math.sqrt(2) / 3;
    heightFactor = Math.sqrt(2. / 3.);
    areaFactor = 2 * Math.sqrt(3);
    break;
   case Dodecahedron:
    volumeFactor = (15 + 7 * Math.sqrt(5)) / 4;
    heightFactor = Math.sqrt(2.5 + 1.1 * Math.sqrt(5));
    areaFactor = 3 * Math.sqrt(25 + 10 * Math.sqrt(5));
    break;
   case Icosahedron:
    volumeFactor = (15 + 5 * Math.sqrt(5)) / 12;
    heightFactor = (3 + Math.sqrt(5)) / (2 * Math.sqrt(3));
    areaFactor = 5 * Math.sqrt(3);
    break;
  }
 }
 private void setUndefined() {
  polyhedron.setUndefined();
  for (int i = 0; i < outputPoints.size(); i++) {
   outputPoints.getElement(i).setUndefined();
  }
 }
 protected void updateDependentGeos() {
  super.updateDependentGeos();
  outputPoints.update();
  if (!getPolyhedron().allLabelsAreSet()) {
   outputSegments.updateParentAlgorithm();
   outputPolygons.updateParentAlgorithm();
  }
 }
 public Commands getClassName() {
  return name;
 }
 protected final boolean isFirstInputPointVisible() {
  return true;
 }
 protected final boolean isFirstInputPointLabelVisible() {
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAreaPoints3D.java
```java
public class AlgoAreaPoints3D extends AlgoAreaPoints {
 private CoordSys coordSys;
 private GeoPoint[] points2D;
 private double[] tmpCoords;
 public AlgoAreaPoints3D(Construction cons, GeoPointND[] P) {
  super(cons, P);
 }
 protected void createOutput(Construction cons1) {
  super.createOutput(cons1);
  coordSys = new CoordSys(2);
  points2D = new GeoPoint[P.length];
  for (int i = 0; i < P.length; i++) {
   points2D[i] = new GeoPoint(cons1, true);
  }
 }
 protected void initCoords() {
  tmpCoords = new double[4];
 }
 public final void compute() {
  if (GeoPolygon3D.updateCoordSys(
    coordSys, P, points2D, tmpCoords, kernel.getStandardPrecision())) {
   area.setValue(Math.abs(AlgoPolygon.calcAreaWithSign(points2D)));
  } else {
   area.setUndefined();
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAxes3D.java
```java
public class AlgoAxes3D extends AlgoAxesQuadricND {
 private Coords midpoint;
 public AlgoAxes3D(Construction cons, String[] labels, GeoQuadricND c) {
  super(cons, labels, c);
 }
 protected void createInput() {
  int d = c.getDimension();
  axes = new GeoLine3D[d];
  for (int i = 0; i < d; i++) {
   axes[i] = new GeoLine3D(cons);
  }
 }
 public final void compute() {
  midpoint = c.getMidpoint3D();
  super.compute();
 }
 protected void setAxisCoords(int i) {
  GeoLine3D axis = (GeoLine3D) axes[i];
  axis.setCoord(midpoint, c.getEigenvec3D(i));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoAxis3D.java
```java
public class AlgoAxis3D extends AlgoAxis {
 private GeoLine3D axis; 
 public AlgoAxis3D(Construction cons, String label, GeoConicND c, int axisId) {
  super(cons, c, axisId);
  axis = new GeoLine3D(cons);
  finishSetup(label);
 }
 public final void compute() {
  axis.setCoord(getConic().getMidpoint3D(), getConic().getEigenvec3D(axisId));
  P.setCoords(getConic().getMidpoint3D(), false);
 }
 public GeoLineND getAxis() {
  return axis;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCenterConic3D.java
```java
public class AlgoCenterConic3D extends AlgoCenterConic {
 public AlgoCenterConic3D(Construction cons, String label, GeoConicND c) {
  super(cons, label, c);
 }
 public GeoPointND newGeoPoint(Construction cons1) {
  return new GeoPoint3D(cons1);
 }
 protected void setCoords(double x, double y) {
  ((GeoPoint3D) midpoint).setCoords(((GeoConicND) c).getCoordSys().getPoint(x, y));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCenterQuadric.java
```java
public class AlgoCenterQuadric extends AlgoCenterQuadricND {
 public AlgoCenterQuadric(Construction cons, String label, GeoQuadric3D c) {
  super(cons, c);
  midpoint.setLabel(label);
 }
 public GeoPointND newGeoPoint(Construction cons1) {
  return new GeoPoint3D(cons1);
 }
 protected void setCoords() {
  switch (c.type) {
   case GeoQuadricNDConstants.QUADRIC_SINGLE_POINT:
   case GeoQuadricNDConstants.QUADRIC_INTERSECTING_LINES:
   case GeoQuadricNDConstants.QUADRIC_ELLIPSOID:
   case GeoQuadricNDConstants.QUADRIC_SPHERE:
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLOID:
   case GeoQuadricNDConstants.QUADRIC_CONE:
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLOID_ONE_SHEET:
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLOID_TWO_SHEETS:
    ((GeoPoint3D) midpoint).setCoords(c.getMidpoint3D());
    break;
   default:
    midpoint.setUndefined();
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCircle3DAxisPoint.java
```java
public class AlgoCircle3DAxisPoint extends AlgoElement3D {
 private GeoLineND axis; 
 private GeoPointND point; 
 private GeoConic3D circle; 
 private CoordSys coordsys;
 private Coords center = Coords.createInhomCoorsInD3();
 private static final Coords O = new Coords(0, 0);
 public AlgoCircle3DAxisPoint(Construction cons, String label, GeoLineND axis, GeoPointND point) {
  super(cons);
  this.axis = axis;
  this.point = point;
  circle = new GeoConic3D(cons);
  coordsys = new CoordSys(2);
  circle.setCoordSys(coordsys);
  setInputOutput(
    new GeoElement[] {(GeoElement) axis, (GeoElement) point}, new GeoElement[] {circle});
  compute();
  circle.setLabel(label);
 }
 public GeoConic3D getCircle() {
  return circle;
 }
 public final void compute() {
  Coords p = point.getInhomCoordsInD3();
  Coords o = axis.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords d = axis.getDirectionInD3();
  p.projectLine(o, d, center, null);
  Coords v1 = p.sub(center);
  setCircle(circle, coordsys, center, v1, d);
 }
 public static void setCircle(
   GeoConicND conic, CoordSys coordsys, Coords center, Coords v1, Coords d) {
  coordsys.resetCoordSys();
  coordsys.addPoint(center);
  coordsys.addVector(v1);
  coordsys.addVector(d.crossProduct(v1));
  coordsys.makeOrthoMatrix(false, false);
  v1.calcNorm();
  conic.setDefined();
  conic.setSphereND(O, v1.getNorm());
 }
 public Commands getClassName() {
  return Commands.Circle;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("CircleOfAxisAThroughB", axis.getLabel(tpl), point.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCircle3DCenterPointPoint.java
```java
public class AlgoCircle3DCenterPointPoint extends AlgoCircle3DPointDirection {
 public AlgoCircle3DCenterPointPoint(
   Construction cons, GeoPointND center, GeoPointND pointThrough, GeoPointND forAxis) {
  super(cons, center, pointThrough, forAxis);
 }
 protected final double getRadius() {
  GeoPointND pointThrough = (GeoPointND) getSecondInput();
  Coords radius = pointThrough.getInhomCoordsInD3().sub(getCenter().getInhomCoordsInD3());
  radius.calcNorm();
  return radius.getNorm();
 }
 protected final boolean setCoordSys() {
  coordsys.resetCoordSys();
  coordsys.addPoint(point.getInhomCoordsInD3());
  coordsys.addPoint(((GeoPointND) secondInput).getInhomCoordsInD3());
  coordsys.addPoint(((GeoPointND) forAxis).getInhomCoordsInD3());
  coordsys.makeOrthoMatrix(false, false);
  return true;
 }
 public Commands getClassName() {
  return Commands.Circle;
 }
 protected final String getCommandString() {
  return "CircleWithCenterAThroughBParallelToABC";
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCircle3DPointDirection.java
```java
public abstract class AlgoCircle3DPointDirection extends AlgoElement3D {
 protected GeoPointND point; 
 protected GeoElementND secondInput; 
 protected GeoElementND forAxis; 
 private GeoConic3D circle; 
 protected CoordSys coordsys;
 protected AlgoCircle3DPointDirection(
   Construction cons, GeoPointND point, GeoElementND secondInput, GeoElementND forAxis) {
  super(cons);
  this.point = point;
  this.forAxis = forAxis;
  this.secondInput = secondInput;
  circle = new GeoConic3D(cons);
  coordsys = new CoordSys(2);
  circle.setCoordSys(coordsys);
  setInputOutput(
    new GeoElement[] {(GeoElement) point, (GeoElement) secondInput, (GeoElement) forAxis},
    new GeoElement[] {circle});
  compute();
 }
 public GeoConic3D getCircle() {
  return circle;
 }
 public final void compute() {
  if (setCoordSys()) {
   circle.setDefined();
   circle.setSphereND(new Coords(0, 0), getRadius());
  } else {
   circle.setUndefined();
  }
 }
 protected boolean setCoordSys() {
  coordsys.resetCoordSys();
  coordsys.addPoint(point.getInhomCoordsInD3());
  Coords[] v = ((GeoDirectionND) forAxis).getDirectionInD3().completeOrthonormal();
  coordsys.addVector(v[0]);
  coordsys.addVector(v[1]);
  coordsys.makeOrthoMatrix(false, false);
  return true;
 }
 protected abstract double getRadius();
 protected GeoPointND getCenter() {
  return point;
 }
 protected Coords getDirection() {
  return ((GeoDirectionND) forAxis).getDirectionInD3();
 }
 protected GeoElementND getSecondInput() {
  return secondInput;
 }
 protected GeoElementND getForAxis() {
  return forAxis;
 }
 public Commands getClassName() {
  return Commands.Circle;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      getCommandString(),
      point.getLabel(tpl),
      secondInput.getLabel(tpl),
      forAxis.getLabel(tpl));
 }
 protected abstract String getCommandString();
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCircle3DPointPointDirection.java
```java
public class AlgoCircle3DPointPointDirection extends AlgoCircle3DPointDirection {
 public AlgoCircle3DPointPointDirection(
   Construction cons, GeoPointND point, GeoPointND pointThrough, GeoDirectionND forAxis) {
  super(cons, point, pointThrough, forAxis);
 }
 protected final double getRadius() {
  GeoPointND pointThrough = (GeoPointND) getSecondInput();
  Coords radius = pointThrough.getInhomCoordsInD3().sub(getCenter().getInhomCoordsInD3());
  if (!DoubleUtil.isZero(getDirection().dotproduct(radius))) {
   return Double.NaN;
  }
  radius.calcNorm();
  return radius.getNorm();
 }
 public Commands getClassName() {
  return Commands.Circle;
 }
 protected final String getCommandString() {
  if (getForAxis() instanceof GeoCoordSys2D) {
   return "CircleWithCenterAThroughBParallelToC";
  }
  return "CircleWithCenterAThroughBAxisParallelToC";
 }
 protected final boolean setCoordSys() {
  if (((GeoDirectionND) getForAxis()).getDirectionInD3() == null) { 
   return false;
  }
  return super.setCoordSys();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCircle3DPointRadiusDirection.java
```java
public class AlgoCircle3DPointRadiusDirection extends AlgoCircle3DPointDirection {
 public AlgoCircle3DPointRadiusDirection(
   Construction cons, GeoPointND point, GeoNumberValue radius, GeoDirectionND forAxis) {
  super(cons, point, radius, forAxis);
 }
 protected final double getRadius() {
  return getSecondInput().evaluateDouble();
 }
 public Commands getClassName() {
  return Commands.Circle;
 }
 protected final String getCommandString() {
  if (getForAxis() instanceof GeoCoordSys2D) {
   return "CircleWithCenterARadiusBParallelToC";
  }
  return "CircleWithCenterAandRadiusBAxisParallelToC";
 }
 protected final boolean setCoordSys() {
  if (((GeoDirectionND) getForAxis()).getDirectionInD3() == null) { 
   return false;
  }
  return super.setCoordSys();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCircle3DThreePoints.java
```java
public class AlgoCircle3DThreePoints extends AlgoCircleThreePoints {
 private CoordSys coordSys;
 private GeoPoint[] points2D;
 private GeoPointND[] points;
 public AlgoCircle3DThreePoints(Construction cons, GeoPointND A, GeoPointND B, GeoPointND C) {
  super(cons, A, B, C);
 }
 protected void setPoints(GeoPointND A, GeoPointND B, GeoPointND C) {
  points = new GeoPointND[3];
  points[0] = A;
  points[1] = B;
  points[2] = C;
  coordSys = new CoordSys(2);
  points2D = new GeoPoint[3];
  for (int i = 0; i < 3; i++) {
   points2D[i] = new GeoPoint(getConstruction());
  }
  super.setPoints(points2D[0], points2D[1], points2D[2]);
 }
 public GeoPoint getPoint2D(int i) {
  return points2D[i];
 }
 protected void createCircle() {
  circle = new GeoConic3D(cons, coordSys);
 }
 protected void setInput() {
  input = new GeoElement[3];
  for (int i = 0; i < 3; i++) {
   input[i] = (GeoElement) points[i];
  }
 }
 protected void setOutput() {
  setOnlyOutput(circle);
 }
 public void compute() {
  coordSys.resetCoordSys();
  for (int i = 0; i < 3; i++) {
   coordSys.addPoint(points[i].getInhomCoordsInD3());
  }
  if (!coordSys.isMadeCoordSys()) {
   coordSys.completeCoordSys2D();
  }
  coordSys.makeOrthoMatrix(false, false);
  for (int i = 0; i < 3; i++) {
   Coords[] project = coordSys.getNormalProjection(points[i].getInhomCoordsInD3());
   points2D[i].setCoords(project[1].getX(), project[1].getY(), project[1].getW());
  }
  super.compute();
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "CircleThroughABC",
      points[0].getLabel(tpl),
      points[1].getLabel(tpl),
      points[2].getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoClosestPoint3D.java
```java
public class AlgoClosestPoint3D extends AlgoClosestPoint {
 public AlgoClosestPoint3D(Construction c, Path path, GeoPointND point) {
  super(c, path, point);
 }
 protected void createOutputPoint(Construction cons1, Path path) {
  P = new GeoPoint3D(cons1);
  P.setPath(path);
 }
 public Commands getClassName() {
  return Commands.ClosestPoint;
 }
 protected void setCoords() {
  P.setCoords(point.getCoordsInD3(), false);
 }
 protected void addIncidence() {
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoClosestPointLines3D.java
```java
public class AlgoClosestPointLines3D extends AlgoElement3D {
 private GeoLineND g3D;
 private GeoLineND h3D;
 private GeoPoint3D geoPointOnG;
 public AlgoClosestPointLines3D(Construction c, String label, GeoLineND g3D, GeoLineND h3D) {
  super(c);
  this.g3D = g3D;
  this.h3D = h3D;
  geoPointOnG = new GeoPoint3D(c);
  setInputOutput(); 
  compute();
  geoPointOnG.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.ClosestPoint;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) g3D;
  input[1] = (GeoElement) h3D;
  setOnlyOutput(geoPointOnG);
  setDependencies(); 
 }
 GeoLineND getg() {
  return g3D;
 }
 GeoLineND geth() {
  return h3D;
 }
 public GeoPoint3D getPoint() {
  return geoPointOnG;
 }
 public void compute() {
  if (!g3D.isDefined() || !h3D.isDefined()) {
   geoPointOnG.setUndefined();
   return;
  }
  Coords[] points = CoordMatrixUtil.nearestPointsFromTwoLines(
    g3D.getStartInhomCoords(), g3D.getDirectionInD3(),
    h3D.getStartInhomCoords(), h3D.getDirectionInD3());
  geoPointOnG.setCoords(points[0], false);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoClosestPointToRegion3D.java
```java
public class AlgoClosestPointToRegion3D extends AlgoElement3D implements FixedPathRegionAlgo {
 private Region r;
 private GeoPointND P;
 private GeoPointND geoPointOnRegion;
 public AlgoClosestPointToRegion3D(Construction c, String label, Region r, GeoPointND P) {
  super(c);
  this.r = r;
  this.P = P;
  if (r.isGeoElement3D()) {
   geoPointOnRegion = new GeoPoint3D(c);
  } else {
   geoPointOnRegion = new GeoPoint(c);
  }
  geoPointOnRegion.setRegion(r);
  setInputOutput(); 
  compute();
  geoPointOnRegion.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.ClosestPointRegion;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) r;
  input[1] = (GeoElement) P;
  setOnlyOutput(geoPointOnRegion);
  setDependencies(); 
 }
 Region getInputRegion() {
  return r;
 }
 GeoPointND getInputPoint() {
  return P;
 }
 public GeoPointND getOutputPoint() {
  return geoPointOnRegion;
 }
 public void compute() {
  if (input[0].isDefined() && P.isDefined()) {
   geoPointOnRegion.setCoords(P.getInhomCoordsInD3(), false);
   r.pointChangedForRegion(geoPointOnRegion);
   geoPointOnRegion.updateCoords();
  } else {
   geoPointOnRegion.setUndefined();
  }
 }
 public boolean isChangeable(GeoElementND out) {
  return false;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCommonTangents3D.java
```java
public class AlgoCommonTangents3D extends AlgoCommonTangentsND {
 private GeoLine3D[] tangents;
 private GeoConic tg;
 private GeoConic c2d;
 private GeoConic d2d;
 private GeoLine3D currentTangent;
 private AlgoIntersectConics algoIntersect;
 private GeoLine polar;
 public AlgoCommonTangents3D(Construction cons, String[] labels, GeoConicND c, GeoConicND d) {
  super(cons);
  this.c = c;
  this.d = d;
  tg = new GeoConic(cons);
  c2d = new GeoConic(cons);
  d2d = new GeoConic(cons);
  currentTangent = new GeoLine3D(cons);
  tangents = new GeoLine3D[4];
  for (int i = 0; i < 4; i++) {
   tangents[i] = new GeoLine3D(cons);
  }
  setInputOutput();
  compute();
  LabelManager.setLabels(labels, getOutput());
 }
 public void initForNearToRelationship() {
  algoIntersect.initForNearToRelationship();
 }
 protected void setInputOutput() {
  input = new GeoElement[] {c.toGeoElement(), d.toGeoElement()};
  setOutputLength(4);
  for (int i = 0; i < 4; i++) {
   setOutput(i, tangents[i]);
  }
  setDependencies();
 }
 public void compute() {
  AlgoIntersectConics3D.transformConics(c, d, c2d, d2d);
  CoordMatrix nm = c2d.getSymmetricMatrix()
    .mul(d2d.getSymmetricMatrix().inverse())
    .mul(c2d.getSymmetricMatrix());
  tg.setMatrix(nm);
  tg.update();
  if (algoIntersect == null) {
   algoIntersect = new AlgoIntersectConics(cons, tg, c2d);
  }
  algoIntersect.compute();
  int inner = 0;
  int outer = 0;
  for (int i = 0; i < 4; i++) {
   tangents[i].setUndefined();
  }
  Coords cross = c.getCoordSys().getNormal().crossProduct(d.getCoordSys().getNormal());
  if (!cross.equalsForKernel(0, Kernel.MIN_PRECISION)) {
   return;
  }
  for (int i = 0; i < 4; i++) {
   polarLine((GeoPoint) algoIntersect.getOutput(i));
   if (isInner(polar)) {
    tangents[2 + inner].set(currentTangent);
    inner++;
   } else if (outer < 2) {
    tangents[outer].set(currentTangent);
    outer++;
   }
  }
 }
 private void polarLine(GeoPoint output) {
  polar = new GeoLine(cons);
  c2d.polarLine(output, polar);
  if (!DoubleUtil.isZero(polar.x)) {
   currentTangent.setCoord(
     c.getCoordSys().getPoint(-polar.z / polar.x, 0),
     c.getCoordSys().getVector(-polar.y, polar.x));
  } else {
   currentTangent.setCoord(
     c.getCoordSys().getPoint(0, -polar.z / polar.y),
     c.getCoordSys().getVector(-polar.y, polar.x));
  }
 }
 private boolean isInner(GeoLine currentTangent2) {
  Coords c0 = currentTangent2.getCoords();
  c2d.classifyConic(false);
  d2d.classifyConic(false);
  double sgnC = c2d.getMidpoint().dotproduct(c0);
  double sgnD = d2d.getMidpoint().dotproduct(c0);
  return sgnC * sgnD < 0;
 }
 public GeoPointND getTangentPoint(GeoElement geo, GeoLine line) {
  if (geo == c) {
   return line.getStartPoint();
  }
  GeoPoint ret = new GeoPoint(cons);
  d.polarPoint(line, ret);
  return ret;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConeInfinitePointPointNumber.java
```java
public class AlgoConeInfinitePointPointNumber extends AlgoQuadricPointPointNumber {
 public AlgoConeInfinitePointPointNumber(
   Construction c,
   String label,
   GeoPointND origin,
   GeoPointND secondPoint,
   GeoNumberValue angle) {
  super(c, label, origin, secondPoint, angle, new AlgoQuadricComputerCone());
 }
 protected final String getPlainName() {
  return "InfiniteConePointsABNumberC";
 }
 public Commands getClassName() {
  return Commands.ConeInfinite;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConeInfinitePointVectorNumber.java
```java
public class AlgoConeInfinitePointVectorNumber extends AlgoQuadricPointVectorNumber {
 public AlgoConeInfinitePointVectorNumber(
   Construction c,
   String label,
   GeoPointND origin,
   GeoVectorND direction,
   GeoNumberValue angle) {
  super(c, label, origin, direction, angle, new AlgoQuadricComputerCone());
 }
 protected final String getPlainName() {
  return "InfiniteConePointAVectorBNumberC";
 }
 public Commands getClassName() {
  return Commands.ConeInfinite;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConePointLineAngle.java
```java
public class AlgoConePointLineAngle extends AlgoQuadricPointNumber {
 public AlgoConePointLineAngle(
   Construction c, String label, GeoPointND origin, GeoLineND axis, GeoNumberValue angle) {
  super(c, label, origin, axis, angle, new AlgoQuadricComputerCone());
 }
 protected Coords getDirection() {
  GeoLineND axis = (GeoLineND) getSecondInput();
  return axis.getPointInD(3, 1)
    .getInhomCoordsInSameDimension()
    .sub(axis.getPointInD(3, 0).getInhomCoordsInSameDimension());
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      getPlainName(),
      getOrigin().getLabel(tpl),
      getSecondInput().getLabel(tpl),
      getNumber().getLabel(tpl));
 }
 protected final String getPlainName() {
  return "ConeWithCenterAAxisParallelToBAngleC";
 }
 public Commands getClassName() {
  return Commands.ConeInfinite;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConicFivePoints3D.java
```java
public class AlgoConicFivePoints3D extends AlgoConicFivePoints {
 private GeoPointND[] inputP;
 private double[] tmpCoords;
 public AlgoConicFivePoints3D(Construction cons, GeoPointND[] pts) {
  super(cons, pts);
 }
 protected void setInputPoints() {
  input = new GeoElement[5];
  for (int i = 0; i < 5; i++) {
   input[i] = (GeoElement) inputP[i];
  }
 }
 protected GeoPoint[] createPoints2D(GeoPointND[] inputPoints) {
  this.inputP = inputPoints;
  GeoPoint[] ret = new GeoPoint[5];
  for (int i = 0; i < 5; i++) {
   ret[i] = new GeoPoint(cons);
  }
  return ret;
 }
 protected GeoConicND newGeoConic(Construction cons0) {
  GeoConic3D ret = new GeoConic3D(cons0);
  ret.setCoordSys(new CoordSys(2));
  return ret;
 }
 protected void initCoords() {
  tmpCoords = new double[4];
 }
 public final void compute() {
  CoordSys cs = conic.getCoordSys();
  if (GeoPolygon3D.updateCoordSys(cs, inputP, P, tmpCoords, Kernel.STANDARD_PRECISION)) {
   conic.setDefined();
   super.compute();
  } else {
   conic.setUndefined();
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConicFociLength3D.java
```java
public abstract class AlgoConicFociLength3D extends AlgoConicFociLengthND {
 protected GeoDirectionND orientation;
 private GeoPoint A2d;
 private GeoPoint B2d;
 private Coords project;
 protected AlgoConicFociLength3D(
   Construction cons,
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoNumberValue a,
   GeoDirectionND orientation) {
  super(cons, label, A, B, a, orientation);
 }
 protected void setOrientation(GeoDirectionND orientation) {
  this.orientation = orientation;
 }
 protected GeoConicND newGeoConic(Construction cons0) {
  GeoConic3D ret = new GeoConic3D(cons0);
  ret.setCoordSys(new CoordSys(2));
  return ret;
 }
 protected void setInput() {
  input = new GeoElement[4];
  input[0] = (GeoElement) A;
  input[1] = (GeoElement) B;
  input[2] = ageo;
  input[3] = (GeoElement) orientation;
 }
 protected void setInputOutput() {
  super.setInputOutput();
  A2d = new GeoPoint(cons);
  B2d = new GeoPoint(cons);
 }
 protected GeoPoint getA2d() {
  return A2d;
 }
 protected GeoPoint getB2d() {
  return B2d;
 }
 public void compute() {
  if (orientation == kernel.getSpace()) {
   conic.setUndefined();
   return;
  }
  Coords vn = orientation.getDirectionInD3();
  if (vn.isZero()) {
   conic.setUndefined();
   return;
  }
  CoordSys cs = conic.getCoordSys();
  cs.resetCoordSys();
  Coords Ac = A.getInhomCoordsInD3();
  Coords Bc = B.getInhomCoordsInD3();
  Coords d1 = Bc.sub(Ac);
  if (!DoubleUtil.isZero(d1.dotproduct(vn))) {
   conic.setUndefined();
   return;
  }
  cs.addPoint(Ac);
  cs.addVector(d1);
  cs.addVector(vn.crossProduct4(d1));
  if (!cs.makeOrthoMatrix(false, false)) {
   conic.setUndefined();
   return;
  }
  CoordMatrix4x4 matrix = cs.getMatrixOrthonormal();
  Ac.projectPlaneInPlaneCoords(matrix, project);
  A2d.setCoords(project.getX(), project.getY(), project.getW());
  Bc.projectPlaneInPlaneCoords(matrix, project);
  B2d.setCoords(project.getX(), project.getY(), project.getW());
  super.compute();
 }
 protected void initCoords() {
  project = new Coords(4);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConicPartCircle3D.java
```java
public class AlgoConicPartCircle3D extends AlgoConicPart {
 private GeoPointND center;
 private GeoPointND startPoint;
 private GeoPointND endPoint;
 private PathParameter paramP;
 private PathParameter paramQ;
 private Coords p2d;
 public AlgoConicPartCircle3D(
   Construction cons,
   String label,
   GeoPointND center,
   GeoPointND startPoint,
   GeoPointND endPoint,
   int type) {
  this(cons, label, center, startPoint, endPoint, null, type);
 }
 public AlgoConicPartCircle3D(
   Construction cons,
   String label,
   GeoPointND center,
   GeoPointND startPoint,
   GeoPointND endPoint,
   GeoDirectionND orientation,
   int type) {
  this(cons, center, startPoint, endPoint, orientation, type);
  conicPart.setLabel(label);
 }
 private AlgoConicPartCircle3D(
   Construction cons,
   GeoPointND center,
   GeoPointND startPoint,
   GeoPointND endPoint,
   GeoDirectionND orientation,
   int type) {
  super(cons, type);
  this.center = center;
  this.startPoint = startPoint;
  this.endPoint = endPoint;
  AlgoCircle3DCenterPointPoint algo =
    new AlgoCircle3DCenterPointPoint(cons, center, startPoint, endPoint);
  cons.removeFromConstructionList(algo);
  conic = algo.getCircle();
  setOrientation(orientation);
  paramP = new PathParameter();
  paramQ = new PathParameter();
  conicPart = new GeoConicPart3D(cons, type);
  conicPart.addPointOnConic(startPoint);
  setInputOutput(); 
  initCoords();
  compute();
  setIncidence();
 }
 protected void initCoords() {
  p2d = new Coords(4);
 }
 protected void setOrientation(GeoDirectionND orientation) {
 }
 private void setIncidence() {
  startPoint.addIncidence(conicPart, false);
 }
 public GeoPointND getStartPoint() {
  return startPoint;
 }
 public GeoPointND getEndPoint() {
  return endPoint;
 }
 public GeoPointND getCenter() {
  return center;
 }
 public Commands getClassName() {
  if (type == GeoConicNDConstants.CONIC_PART_ARC) {
   return Commands.CircleArc;
  }
  return Commands.CircleSector;
 }
 public int getRelatedModeID() {
  if (type == GeoConicNDConstants.CONIC_PART_ARC) {
   return EuclidianConstants.MODE_CIRCLE_ARC_THREE_POINTS;
  }
  return EuclidianConstants.MODE_CIRCLE_SECTOR_THREE_POINTS;
 }
 protected void setInputOutput() {
  setInput();
  setOnlyOutput(conicPart);
  setDependencies();
 }
 protected void setInput() {
  setInput(3);
 }
 protected void setInput(int n) {
  input = new GeoElement[n];
  input[0] = (GeoElement) center;
  input[1] = (GeoElement) startPoint;
  input[2] = (GeoElement) endPoint;
 }
 protected void semiCircle(Coords center1, Coords v1) {
  conicPart.setUndefined();
 }
 public final void compute() {
  CoordSys cs = conic.getCoordSys();
  if (!cs.isDefined()) {
   Coords centerCoords = center.getInhomCoordsInD3();
   Coords startCoords = startPoint.getInhomCoordsInD3();
   Coords v1 = startCoords.sub(centerCoords);
   Coords v2 = endPoint.getInhomCoordsInD3().sub(centerCoords);
   if (DoubleUtil.isGreater(0, v1.dotproduct(v2))) {
    semiCircle(centerCoords, v1);
    return;
   }
   GeoConic3D.setSinglePoint((GeoConic3D) conicPart, startCoords);
   ((GeoConicPart3D) conicPart).setParametersToSinglePoint();
   conicPart.setType(GeoConicNDConstants.CONIC_SINGLE_POINT);
   return;
  }
  startPoint.getInhomCoordsInD3().projectPlaneInPlaneCoords(cs.getMatrixOrthonormal(), p2d);
  p2d.setZ(1);
  conic.pointChanged(p2d, paramP);
  endPoint.getInhomCoordsInD3().projectPlaneInPlaneCoords(cs.getMatrixOrthonormal(), p2d);
  p2d.setZ(1);
  conic.pointChanged(p2d, paramQ);
  setConicPart(paramP.t, paramQ.t);
 }
 protected void setConicPart(double start, double end) {
  conicPart.set(conic);
  ((GeoConicPartND) conicPart).setParameters(start, end, getPositiveOrientation());
 }
 protected boolean getPositiveOrientation() {
  return true;
 }
 public GeoConicPart3D getConicPart() {
  return (GeoConicPart3D) super.getConicPart();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConicPartCircle3DOrientation.java
```java
public class AlgoConicPartCircle3DOrientation extends AlgoConicPartCircle3D {
 private GeoDirectionND orientation;
 public AlgoConicPartCircle3DOrientation(
   Construction cons,
   String label,
   GeoPointND center,
   GeoPointND startPoint,
   GeoPointND endPoint,
   GeoDirectionND orientation,
   int type) {
  super(cons, label, center, startPoint, endPoint, orientation, type);
 }
 protected void setOrientation(GeoDirectionND orientation) {
  this.orientation = orientation;
 }
 protected boolean getPositiveOrientation() {
  Coords d = orientation.getDirectionInD3();
  if (d == null) {
   return true;
  }
  return conic.getMainDirection().dotproduct(d) >= 0;
 }
 protected void setInput() {
  setInput(4);
  input[3] = (GeoElement) orientation;
 }
 protected void semiCircle(Coords center, Coords v1) {
  Coords d = orientation.getDirectionInD3();
  if (d == null) {
   conicPart.setUndefined();
  } else {
   conicPart.setDefined();
   AlgoCircle3DAxisPoint.setCircle(conic, conic.getCoordSys(), center, v1, d);
   setConicPart(0, Math.PI);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConicPartCircumcircle3D.java
```java
public class AlgoConicPartCircumcircle3D extends AlgoConicPartCircumcircleND {
 private AlgoCircle3DThreePoints algo;
 public AlgoConicPartCircumcircle3D(
   Construction cons, String label, GeoPointND A, GeoPointND B, GeoPointND C, int type) {
  super(cons, label, A, B, C, type);
 }
 protected AlgoCircleThreePoints getAlgo() {
  algo = new AlgoCircle3DThreePoints(cons, A, B, C);
  return algo;
 }
 protected GeoConicPart3D createConicPart(Construction cons0, int type0) {
  return new GeoConicPart3D(cons0, type0);
 }
 protected void computeSinglePoint() {
  GeoConic3D.setSinglePoint((GeoConic3D) conicPart, A.getInhomCoordsInD(3));
  super.computeSinglePoint();
 }
 public final GeoPoint getA() {
  return algo.getPoint2D(0);
 }
 public final GeoPoint getB() {
  return algo.getPoint2D(1);
 }
 public final GeoPoint getC() {
  return algo.getPoint2D(2);
 }
 public GeoConicPart3D getConicPart() {
  return (GeoConicPart3D) super.getConicPart();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConicPartConicParameters3D.java
```java
public class AlgoConicPartConicParameters3D extends AlgoConicPartConicParameters {
 public AlgoConicPartConicParameters3D(
   Construction cons,
   String label,
   GeoConicND circle,
   GeoNumberValue startParameter,
   GeoNumberValue endParameter,
   int type) {
  super(cons, label, circle, startParameter, endParameter, type);
 }
 protected GeoConicND newGeoConicPart(Construction cons1, int type1) {
  return new GeoConicPart3D(cons1, type1);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoConicPartConicPoints3D.java
```java
public class AlgoConicPartConicPoints3D extends AlgoConicPartConicPointsND {
 private PathParameter paramP;
 private PathParameter paramQ;
 private Coords p2d;
 public AlgoConicPartConicPoints3D(
   Construction cons,
   String label,
   GeoConicND circle,
   GeoPointND startPoint,
   GeoPointND endPoint,
   int type) {
  super(cons, label, circle, startPoint, endPoint, type);
 }
 protected void setTempValues() {
  paramP = new PathParameter();
  paramQ = new PathParameter();
 }
 protected GeoConicND newGeoConicPart(Construction cons1, int type1) {
  if (conic.isGeoElement3D()) {
   return new GeoConicPart3D(cons1, type1);
  }
  return super.newGeoConicPart(cons1, type1);
 }
 protected void computeParameters() {
  CoordSys cs = conic.getCoordSys();
  startPoint.getInhomCoordsInD3().projectPlaneInPlaneCoords(cs.getMatrixOrthonormal(), p2d);
  p2d.setZ(1);
  conic.pointChangedUnlimited(p2d, paramP);
  endPoint.getInhomCoordsInD3().projectPlaneInPlaneCoords(cs.getMatrixOrthonormal(), p2d);
  p2d.setZ(1);
  conic.pointChangedUnlimited(p2d, paramQ);
 }
 protected void initCoords() {
  p2d = new Coords(4);
 }
 protected double getStartParameter() {
  return paramP.t;
 }
 protected double getEndParameter() {
  return paramQ.t;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCornerConicSection.java
```java
public class AlgoCornerConicSection extends AlgoElement3D {
 private GeoConicSection conic;
 private OutputHandler<GeoElement> outputPoints; 
 private AlgoIntersectPlaneQuadricLimited algoParent;
 public AlgoCornerConicSection(Construction c, String[] labels, GeoConicSection conic) {
  super(c);
  this.conic = conic;
  algoParent = (AlgoIntersectPlaneQuadricLimited) conic.getParentAlgorithm();
  outputPoints = createOutputPoints();
  setInputOutput(); 
  compute();
  setLabels(labels);
  compute();
 }
 private OutputHandler<GeoElement> createOutputPoints() {
  return new OutputHandler<>(() -> {
   GeoPoint3D p = new GeoPoint3D(cons);
   p.setCoords(0, 0, 0, 1);
   p.setUndefined();
   p.setParentAlgorithm(this);
   return p;
  });
 }
 public void compute() {
  if (!conic.isDefined() || conic.getType() == GeoConicNDConstants.CONIC_EMPTY) {
   for (int index = 0; index < outputPoints.size(); index++) {
    outputPoints.getElement(index).setUndefined();
   }
   return;
  }
  setPoint(0, algoParent.getBottomPoint(0));
  setPoint(1, algoParent.getBottomPoint(1));
  setPoint(2, algoParent.getTopPoint(0));
  setPoint(3, algoParent.getTopPoint(1));
 }
 private void setPoint(int index, GeoPoint3D p) {
  if (!p.isDefined()) {
   if (outputPoints.size() > index) {
    outputPoints.getElement(index).setUndefined();
   }
   return;
  }
  if (outputPoints.size() <= index) {
   outputPoints.adjustOutputSize(index + 1, false);
  }
  GeoPointND point = (GeoPointND) outputPoints.getElement(index);
  point.setCoords(p.getCoords(), false);
 }
 public Commands getClassName() {
  return Commands.Corner;
 }
 private void setLabels(String[] labels) {
  if (labels != null
    && labels.length == 1
    && outputPoints.size() > 1
    && labels[0] != null
    && !labels[0].equals("")) {
   outputPoints.setIndexLabels(labels[0]);
  } else {
   outputPoints.setLabels(labels);
  }
 }
 protected void setInputOutput() {
  input = new GeoElement[1];
  input[0] = conic;
  setDependencies(); 
 }
 public GeoPoint3D[] getCorners() {
  GeoPoint3D[] ret = new GeoPoint3D[outputPoints.size()];
  outputPoints.getOutput(ret);
  return ret;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCurveCartesian3D.java
```java
public class AlgoCurveCartesian3D extends AlgoCurveCartesian {
 public AlgoCurveCartesian3D(
   Construction cons,
   ExpressionNode point,
   GeoNumberValue[] coords,
   GeoNumeric localVar,
   GeoNumberValue from,
   GeoNumberValue to) {
  super(cons, point, coords, localVar, from, to);
 }
 protected GeoCurveCartesianND createCurve(
   Construction cons1, Function[] fun, ExpressionNode point) {
  return new GeoCurveCartesian3D(cons1, fun, point);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCylinderAxisRadius.java
```java
public class AlgoCylinderAxisRadius extends AlgoQuadric {
 private GeoLineND axis;
 public AlgoCylinderAxisRadius(Construction c, String label, GeoLineND axis, GeoNumberValue r) {
  super(c, axis, r, new AlgoQuadricComputerCylinder());
  this.axis = axis;
  setInputOutput(
    new GeoElement[] {(GeoElement) axis, (GeoElement) r}, new GeoElement[] {getQuadric()});
  compute();
  getQuadric().setLabel(label);
 }
 public void compute() {
  if (!axis.isDefined()) {
   getQuadric().setUndefined();
   return;
  }
  Coords o = axis.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords d = axis.getPointInD(3, 1).sub(o);
  if (d.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   getQuadric().setUndefined();
   return;
  }
  double r = getComputer().getNumber(getNumber().getDouble());
  if (Double.isNaN(r)) {
   getQuadric().setUndefined();
   return;
  }
  d.normalize();
  getQuadric().setDefined();
  getQuadric().setCylinder(o, d, null, r, r);
 }
 protected Coords getDirection() {
  return axis.getPointInD(3, 1)
    .getInhomCoordsInSameDimension()
    .sub(axis.getPointInD(3, 0).getInhomCoordsInSameDimension());
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("CylinderWithAxisARadiusB", axis.getLabel(tpl), getNumber().getLabel(tpl));
 }
 public Commands getClassName() {
  return Commands.CylinderInfinite;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCylinderInfinitePointPointNumber.java
```java
public class AlgoCylinderInfinitePointPointNumber extends AlgoQuadricPointPointNumber {
 public AlgoCylinderInfinitePointPointNumber(
   Construction c,
   String label,
   GeoPointND origin,
   GeoPointND secondPoint,
   GeoNumberValue radius) {
  super(c, label, origin, secondPoint, radius, new AlgoQuadricComputerCylinder());
 }
 protected final String getPlainName() {
  return "InfiniteCylinderPointsABNumberC";
 }
 public Commands getClassName() {
  return Commands.CylinderInfinite;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoCylinderInfinitePointVectorNumber.java
```java
public class AlgoCylinderInfinitePointVectorNumber extends AlgoQuadricPointVectorNumber {
 public AlgoCylinderInfinitePointVectorNumber(
   Construction c,
   String label,
   GeoPointND origin,
   GeoVectorND direction,
   GeoNumberValue radius) {
  super(c, label, origin, direction, radius, new AlgoQuadricComputerCylinder());
 }
 protected final String getPlainName() {
  return "InfiniteCylinderPointAVectorBNumberC";
 }
 public Commands getClassName() {
  return Commands.CylinderInfinite;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDependentConic3D.java
```java
public class AlgoDependentConic3D extends AlgoElement3D {
 private GeoConic3D conic; 
 private ExpressionValue[] coeffX;
 private ExpressionValue[] coeffY;
 private ExpressionValue[] coeffZ;
 private boolean trig;
 public AlgoDependentConic3D(
   Construction cons,
   ExpressionNode root,
   ExpressionValue[] coeffX,
   ExpressionValue[] coeffY,
   ExpressionValue[] coeffZ,
   boolean trig) {
  super(cons);
  conic = new GeoConic3D(cons);
  conic.setDefinition(root);
  this.coeffX = coeffX;
  this.coeffY = coeffY;
  this.coeffZ = coeffZ;
  this.trig = trig;
  setInputOutput(); 
  compute();
 }
 public Algos getClassName() {
  return Algos.Expression;
 }
 protected void setInputOutput() {
  setInputFrom(((Equation) conic.getDefinition().unwrap()).getRHS());
  setOnlyOutput(conic);
  setDependencies(); 
 }
 public GeoConic3D getConic3D() {
  return conic;
 }
 public ExpressionNode getExpressionNode() {
  return conic.getDefinition();
 }
 public final void compute() {
  try {
   ExpressionNode def = conic.getDefinition();
   if (trig) {
    ParametricProcessor3D.updateTrigConic(conic, coeffX, coeffY, coeffZ);
   } else {
    ParametricProcessor3D.updateParabola(conic, coeffX, coeffY, coeffZ);
   }
   conic.setDefinition(def);
  } catch (Exception e) {
   Log.debug(e);
   conic.setUndefined();
  }
 }
 public final String toString(StringTemplate tpl) {
  return conic.getDefinition().toString(tpl);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDependentPlane3D.java
```java
public class AlgoDependentPlane3D extends AlgoElement3D {
 private Equation equation;
 private ExpressionValue[] ev = new ExpressionValue[4]; 
 private GeoPlane3D p; 
 private ExpressionNode lhs0z = null;
 public AlgoDependentPlane3D(Construction cons, Equation equ) {
  super(cons, false); 
  equation = equ;
  Polynomial lhs = equ.getNormalForm();
  ev[0] = lhs.getCoefficient("x");
  ev[1] = lhs.getCoefficient("y");
  ev[2] = lhs.getCoefficient("z");
  ev[3] = lhs.getConstantCoefficient();
  for (int i = 0; i < 4; i++) {
   if (!ev[i].any(Inspecting::isDynamicGeoElement)) {
    ev[i] = ev[i].evaluate(StringTemplate.defaultTemplate);
   }
   ExpressionValue eval = ev[i].evaluate(StringTemplate.defaultTemplate);
   ((NumberValue) eval).getDouble();
  }
  cons.addToConstructionList(this, false);
  p = new GeoPlane3D(cons);
  setInputOutput(); 
  compute();
 }
 public Algos getClassName() {
  return Algos.Expression;
 }
 protected void setInputOutput() {
  input = equation.getGeoElementVariables(SymbolicMode.NONE);
  setOnlyOutput(p);
  setDependencies(); 
 }
 public GeoPlane3D getPlane() {
  return p;
 }
 public final void compute() {
  try {
   ExpressionNode exp = p.getDefinition();
   p.setEquation(
     ev[0].evaluateDouble(),
     ev[1].evaluateDouble(),
     ev[2].evaluateDouble(),
     ev[3].evaluateDouble());
   p.setDefinition(exp);
  } catch (Throwable e) {
   p.setUndefined();
  }
 }
 public final String toString(StringTemplate tpl) {
  if (p.getDefinition() != null) {
   return p.getDefinition().toString(tpl);
  }
  if (p.isLabelSet() || equation.containsZ()) {
   return equation.toString(tpl);
  }
  if (lhs0z == null) {
   ExpressionNode lhs = equation.getLHS();
   FunctionVariable z = new FunctionVariable(kernel, "z");
   lhs0z = new ExpressionNode(
     kernel,
     lhs,
     Operation.PLUS,
     new ExpressionNode(kernel, new ExpressionNode(kernel, 0), Operation.MULTIPLY, z));
  }
  return equation.toString(tpl, lhs0z);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDependentPoint3D.java
```java
public class AlgoDependentPoint3D extends AlgoElement3D implements DependentAlgo {
 private GeoPoint3D P; 
 private double[] temp;
 public AlgoDependentPoint3D(Construction cons, ExpressionNode root, boolean addToConsList) {
  super(cons, addToConsList);
  P = new GeoPoint3D(cons);
  P.setDefinition(root);
  setInputOutput(); 
  compute();
 }
 public Algos getClassName() {
  return Algos.Expression;
 }
 protected void setInputOutput() {
  setInputFrom(P.getDefinition());
  setOnlyOutput(P);
  setDependencies(); 
 }
 public GeoPoint3D getPoint3D() {
  return P;
 }
 public ExpressionNode getExpression() {
  return P.getDefinition();
 }
 public final void compute() {
  try {
   temp = ((Vector3DValue) P.getDefinition().evaluate(StringTemplate.defaultTemplate))
     .getPointAsDouble();
   if (Double.isInfinite(temp[0]) || Double.isInfinite(temp[1]) || Double.isInfinite(temp[2])) {
    P.setUndefined();
   } else {
    ExpressionNode def = P.getDefinition();
    P.setCoords(temp[0], temp[1], temp[2], 1.0);
    P.setDefinition(def);
   }
  } catch (Exception e) {
   P.setUndefined();
  }
 }
 public final String toString(StringTemplate tpl) {
  return P.getDefinition().toString(tpl);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDependentQuadric3D.java
```java
public class AlgoDependentQuadric3D extends AlgoElement3D {
 private Equation equation;
 private ExpressionValue[] ev = new ExpressionValue[10]; 
 private GeoQuadric3D quadric; 
 private double[] coeffs;
 public AlgoDependentQuadric3D(Construction cons, Equation equ) {
  super(cons, false); 
  equation = equ;
  Polynomial lhs = equ.getNormalForm();
  ev[0] = lhs.getCoefficient("xx");
  ev[1] = lhs.getCoefficient("yy");
  ev[2] = lhs.getCoefficient("zz");
  ev[3] = lhs.getConstantCoefficient();
  ev[4] = lhs.getCoefficient("xy");
  ev[5] = lhs.getCoefficient("xz");
  ev[6] = lhs.getCoefficient("yz");
  ev[7] = lhs.getCoefficient("x");
  ev[8] = lhs.getCoefficient("y");
  ev[9] = lhs.getCoefficient("z");
  coeffs = new double[10];
  for (int i = 0; i < 10; i++) {
   if (!ev[i].any(Inspecting::isDynamicGeoElement)) {
    ev[i] = ev[i].evaluate(StringTemplate.defaultTemplate);
   }
   ExpressionValue eval = ev[i].evaluate(StringTemplate.defaultTemplate);
   ((NumberValue) eval).getDouble();
  }
  cons.addToConstructionList(this, false);
  quadric = new GeoQuadric3D(cons);
  setInputOutput(); 
  compute();
 }
 public Algos getClassName() {
  return Algos.Expression;
 }
 protected void setInputOutput() {
  input = equation.getGeoElementVariables(SymbolicMode.NONE);
  setOnlyOutput(quadric);
  setDependencies(); 
 }
 public GeoQuadric3D getQuadric() {
  return quadric;
 }
 public final void compute() {
  for (int i = 0; i < 4; i++) {
   coeffs[i] = ev[i].evaluateDouble();
  }
  for (int i = 4; i < 10; i++) {
   coeffs[i] = ev[i].evaluateDouble() / 2;
  }
  if (!Arrays.equals(coeffs, quadric.getFlatMatrix())) {
   quadric.setMatrix(coeffs);
  }
 }
 public final String toString(StringTemplate tpl) {
  return equation.toString(tpl);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDependentVector3D.java
```java
public class AlgoDependentVector3D extends AlgoElement3D implements DependentAlgo {
 private GeoVector3D vec; 
 private double[] temp;
 public AlgoDependentVector3D(Construction cons, String label, ExpressionNode root) {
  this(cons, root);
  vec.setLabel(label);
 }
 public AlgoDependentVector3D(Construction cons, ExpressionNode root) {
  super(cons);
  vec = new GeoVector3D(cons);
  vec.setDefinition(root);
  setInputOutput(); 
  compute();
 }
 public Algos getClassName() {
  return Algos.Expression;
 }
 protected void setInputOutput() {
  setInputFrom(vec.getDefinition());
  setOnlyOutput(vec);
  setDependencies(); 
 }
 public GeoVector3D getVector3D() {
  return vec;
 }
 public final void compute() {
  ExpressionNode def = vec.getDefinition();
  try {
   temp = ((Vector3DValue) vec.getDefinition().evaluate(StringTemplate.defaultTemplate))
     .getPointAsDouble();
   vec.setCoords(temp);
  } catch (Exception e) {
   vec.setUndefined();
  }
  vec.setDefinition(def);
 }
 public final String toString(StringTemplate tpl) {
  return vec.getDefinition().toString(tpl);
 }
 public ExpressionNode getExpression() {
  return vec.getDefinition();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDiameterLine3D.java
```java
public class AlgoDiameterLine3D extends AlgoDiameterLineND {
 private Coords direction;
 private Coords direction3D;
 private GeoLine diameter2D;
 private double[] diameterCoords;
 private Coords diameterOrigin;
 private Coords diameterDirection;
 public AlgoDiameterLine3D(Construction cons, String label, GeoConicND c, GeoLineND g) {
  super(cons, label, c, g);
 }
 protected void createOutput(Construction cons1) {
  diameter = new GeoLine3D(cons1);
  diameter2D = new GeoLine(cons1);
  diameterCoords = new double[3];
 }
 public final void compute() {
  direction3D = g.getDirectionInD3();
  direction = c.getCoordSys().getNormalProjection(direction3D)[1];
  if (!DoubleUtil.isZero(direction.getZ())) {
   diameter.setUndefined();
   return;
  }
  c.diameterLine(direction.getX(), direction.getY(), diameter2D);
  diameter2D.getCoords(diameterCoords);
  diameterDirection = c.getCoordSys().getVector(-diameterCoords[1], diameterCoords[0]);
  if (DoubleUtil.isZero(diameterCoords[0])) {
   diameterOrigin = c.getCoordSys().getPoint(0, -diameterCoords[2] / diameterCoords[1]);
  } else {
   diameterOrigin = c.getCoordSys().getPoint(-diameterCoords[2] / diameterCoords[0], 0);
  }
  ((GeoLine3D) diameter).setCoord(diameterOrigin, diameterDirection);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDiameterVector3D.java
```java
public class AlgoDiameterVector3D extends AlgoDiameterVectorND {
 private Coords direction;
 private GeoLine diameter2D;
 private double[] diameterCoords;
 private Coords diameterOrigin;
 private Coords diameterDirection;
 public AlgoDiameterVector3D(Construction cons, String label, GeoConicND c, GeoVectorND v) {
  super(cons, label, c, v);
 }
 protected void createOutput(Construction cons1) {
  diameter = new GeoLine3D(cons1);
  diameter2D = new GeoLine(cons1);
  diameterCoords = new double[3];
 }
 public final void compute() {
  direction = c.getCoordSys().getNormalProjection(v.getCoordsInD3())[1];
  if (!DoubleUtil.isZero(direction.getZ())) {
   diameter.setUndefined();
   return;
  }
  c.diameterLine(direction.getX(), direction.getY(), diameter2D);
  diameter2D.getCoords(diameterCoords);
  diameterDirection = c.getCoordSys().getVector(-diameterCoords[1], diameterCoords[0]);
  if (DoubleUtil.isZero(diameterCoords[0])) {
   diameterOrigin = c.getCoordSys().getPoint(0, -diameterCoords[2] / diameterCoords[1]);
  } else {
   diameterOrigin = c.getCoordSys().getPoint(-diameterCoords[2] / diameterCoords[0], 0);
  }
  ((GeoLine3D) diameter).setCoord(diameterOrigin, diameterDirection);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDifferencePolygons3D.java
```java
public class AlgoDifferencePolygons3D extends AlgoPolygonOperations3D {
 private GeoBoolean exclusive = null;
 private boolean threeArgs = false;
 public AlgoDifferencePolygons3D(
   Construction cons,
   String[] labels,
   GeoPolygon inPoly0,
   GeoPolygon inPoly1,
   GeoBoolean exclusive) {
  super(cons, labels, inPoly0, inPoly1, AlgoPolygonDifference.getOp(exclusive));
  this.exclusive = exclusive;
  this.threeArgs = true;
  initialize(null);
 }
 public AlgoDifferencePolygons3D(
   Construction cons, String[] labels, GeoPolygon inPoly0, GeoPolygon inPoly1) {
  super(cons, labels, inPoly0, inPoly1, PolyOperation.DIFFERENCE);
  initialize(null);
 }
 public AlgoDifferencePolygons3D(
   Construction cons,
   String[] labels,
   GeoPolygon3D inPoly0,
   GeoPolygon3D inPoly1,
   int[] outputSizes) {
  super(cons, labels, inPoly0, inPoly1, PolyOperation.DIFFERENCE);
  initialize(outputSizes);
 }
 protected void compute(boolean useLabels) {
  this.operationType = AlgoPolygonDifference.getOp(exclusive);
  super.compute(useLabels);
 }
 protected void setInputOutput() {
  if (this.threeArgs) {
   input = new GeoElement[3];
   input[0] = this.inPoly0;
   input[1] = this.inPoly1;
   input[2] = this.exclusive;
  } else {
   input = new GeoElement[2];
   input[0] = inPoly0;
   input[1] = inPoly1;
  }
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
  cons.addToAlgorithmList(this);
  setDependencies();
 }
 public GetCommand getClassName() {
  return Commands.Difference;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDilate3D.java
```java
public class AlgoDilate3D extends AlgoDilate {
 public AlgoDilate3D(Construction cons, GeoElement A, GeoNumberValue r, GeoPointND S) {
  super(cons, A, r, S);
 }
 protected GeoElement copy(GeoElement geo) {
  return kernel.copy3D(geo);
 }
 protected GeoElement getResultTemplate(GeoElement geo) {
  if (geo instanceof GeoFunction || geo instanceof GeoCurveCartesian) {
   return new GeoCurveCartesian3D(cons);
  }
  return super.getResultTemplate(geo);
 }
 protected GeoElement copyInternal(Construction cons1, GeoElement geo) {
  return kernel.copyInternal3D(cons1, geo);
 }
 protected void setOutGeo() {
  if (inGeo instanceof GeoFunction ) {
   AlgoTransformation3D.toGeoCurveCartesian(
     kernel, (GeoFunction) inGeo, (GeoCurveCartesian3D) outGeo);
  } else {
   super.setOutGeo();
  }
 }
 protected Coords getPointCoords() {
  return S.getInhomCoordsInD3();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDispatcher3D.java
```java
public class AlgoDispatcher3D extends AlgoDispatcher {
 private Coords tmpCoords;
 public AlgoDispatcher3D(Construction cons) {
  super(cons);
 }
 public AlgoClosestPoint getNewAlgoClosestPoint(Construction cons2, Path path, GeoPointND point) {
  if (path.isGeoElement3D() || point.isGeoElement3D()) {
   return new AlgoClosestPoint3D(cons2, path, point);
  }
  return super.getNewAlgoClosestPoint(cons2, path, point);
 }
 public GeoNumeric distance(String label, GeoLineND g, GeoLineND h) {
  if (g.isGeoElement3D() || h.isGeoElement3D()) {
   AlgoDistanceLines3D algo = new AlgoDistanceLines3D(cons, g, h);
   algo.getDistance().setLabel(label);
   return algo.getDistance();
  }
  return super.distance(label, g, h);
 }
 public GeoPointND intersectLines(String label, GeoLineND g, GeoLineND h) {
  if (g.isGeoElement3D() || h.isGeoElement3D()) {
   return (GeoPointND) getManager3D().intersect(label, g, h);
  }
  return super.intersectLines(label, g, h);
 }
 protected GeoVectorND createVector(String label, GeoPointND P) {
  if (P.isGeoElement3D()) {
   AlgoVectorPoint3D algo = new AlgoVectorPoint3D(cons, label, P);
   return algo.getVector();
  }
  return super.createVector(label, P);
 }
 public GeoPointND[] intersectConics(String[] labels, GeoConicND a, GeoConicND b) {
  if (a.isGeoElement3D() || b.isGeoElement3D()) {
   return getManager3D().intersectConics(labels, a, b);
  }
  return super.intersectConics(labels, a, b);
 }
 public GeoPointND[] intersectLineConic(String[] labels, GeoLineND g, GeoConicND c) {
  if (g.isGeoElement3D() || c.isGeoElement3D()) {
   return getManager3D().intersectLineConic(null, g, c);
  }
  return super.intersectLineConic(labels, g, c);
 }
 private Manager3DInterface getManager3D() {
  return cons.getKernel().getManager3D();
 }
 public AlgoVertexPolygon newAlgoVertexPolygon(Construction cons1, String[] labels, GeoPoly p) {
  if (p.isGeoElement3D()) {
   return new AlgoVertexPolygon3D(cons1, labels, p);
  }
  return super.newAlgoVertexPolygon(cons1, labels, p);
 }
 protected GeoElement[] segmentFixed(
   String pointLabel, String segmentLabel, GeoPointND A, GeoNumberValue n) {
  Kernel kernel = cons.getKernel();
  GeoDirectionND orientation =
    CommandProcessor3D.getCurrentViewOrientation(kernel, cons.getApplication());
  if (orientation == kernel.getSpace()) { 
   return segmentFixedSphere(pointLabel, segmentLabel, A, n);
  }
  if (A.isGeoElement3D()) {
   if (orientation == null) { 
    return segmentFixedSphere(pointLabel, segmentLabel, A, n);
   }
   AlgoCircle3DPointRadiusDirection algoCircle =
     new AlgoCircle3DPointRadiusDirection(cons, A, n, orientation);
   cons.removeFromConstructionList(algoCircle);
   Coords coords = A.getInhomCoordsInD3();
   if (orientation instanceof GeoCoordSys2D) {
    CoordSys cs = ((GeoCoordSys2D) orientation).getCoordSys();
    Coords project = cs.getNormalProjection(coords)[1];
    coords = cs.getPoint(project.getX() + n.getDouble(), project.getY());
   } else {
    coords = coords.copyVector();
    coords.setX(coords.getX() + n.getDouble());
   }
   AlgoPoint3DOnPath algoPoint = new AlgoPoint3DOnPath(
     cons, algoCircle.getCircle(), coords.getX(), coords.getY(), coords.getZ());
   algoPoint.getP().setLabel(pointLabel);
   GeoElement[] ret = {
    (GeoElement) getManager3D().segment3D(segmentLabel, A, algoPoint.getP()),
    (GeoElement) algoPoint.getP()
   };
   return ret;
  }
  return super.segmentFixed(pointLabel, segmentLabel, A, n);
 }
 private GeoElement[] segmentFixedSphere(
   String pointLabel, String segmentLabel, GeoPointND A, GeoNumberValue n) {
  AlgoSpherePointRadius algoSphere = new AlgoSpherePointRadius(cons, A, n);
  cons.removeFromConstructionList(algoSphere);
  Coords coords = A.getInhomCoordsInD3();
  if (tmpCoords == null) {
   tmpCoords = Coords.createInhomCoorsInD3();
  } else {
   tmpCoords.setW(1.0);
  }
  tmpCoords.setX(coords.getX() + n.getDouble());
  tmpCoords.setY(coords.getY());
  tmpCoords.setZ(coords.getZ());
  AlgoPoint3DInRegion algoPoint =
    new AlgoPoint3DInRegion(cons, pointLabel, algoSphere.getSphere(), tmpCoords);
  GeoElement[] ret = {
   (GeoElement) getManager3D().segment3D(segmentLabel, A, algoPoint.getP()), algoPoint.getP()
  };
  return ret;
 }
 public final GeoElement[] polygon(String[] labels, GeoPointND[] P) {
  for (int i = 0; i < P.length; i++) {
   if (P[i].isGeoElement3D()) {
    return getManager3D().polygon3D(labels, P);
   }
  }
  return super.polygon(labels, P);
 }
 public final GeoConicND circle(String label, GeoPointND M, GeoNumberValue r) {
  if (M.isGeoElement3D()) {
   return getManager3D().circle3D(label, M, r);
  }
  return super.circle(label, M, r);
 }
 public GeoPointND pointIn(
   String label,
   Region region,
   Coords coords,
   boolean addToConstruction,
   boolean complexCoord,
   boolean coords2D) {
  if (region.isRegion3D()) {
   return getManager3D().point3DIn(label, region, coords, addToConstruction, coords2D);
  }
  return super.pointIn(label, region, coords, addToConstruction, complexCoord, coords2D);
 }
 public GeoPointND point(
   String label,
   Path path,
   Coords coords,
   boolean addToConstruction,
   boolean complexCoord,
   boolean coords2D) {
  if (path.isGeoElement3D()) {
   return getManager3D()
     .point3D(
       label,
       path,
       coords.getX(),
       coords.getY(),
       coords.getZ(),
       addToConstruction,
       coords2D);
  }
  return super.point(label, path, coords, addToConstruction, complexCoord, coords2D);
 }
 protected GeoPointND copyFreePoint(GeoPointND point, EuclidianViewInterfaceCommon view) {
  if (point.isGeoElement3D()) {
   double xOffset = 0, yOffset = 0;
   if (!view.isEuclidianView3D()) {
    xOffset = DETACH_OFFSET * view.getInvXscale();
    yOffset = DETACH_OFFSET * view.getInvYscale();
   }
   GeoPointND ret = getManager3D()
     .point3D(
       point.getInhomX() + xOffset,
       point.getInhomY() + yOffset,
       point.getInhomZ(),
       point.getToStringMode() == Kernel.COORD_CARTESIAN);
   ret.setLabel(null);
   return ret;
  }
  return super.copyFreePoint(point, view);
 }
 public GeoVectorND vector3D(String label) {
  GeoVectorND ret = (GeoVectorND) getManager3D().vector3D(0, 0, 0);
  ret.setLabel(label);
  return ret;
 }
 public GeoVectorND vector3D() {
  GeoVector3D v = new GeoVector3D(cons);
  v.setCoords(0, 0, 0, 0);
  v.setMode(Kernel.COORD_CARTESIAN_3D);
  return v;
 }
 public GeoElement[] translateND(String label, GeoElementND geoTrans, GeoVectorND v) {
  return getManager3D().translate3D(label, geoTrans, v);
 }
 protected GeoElement locusNoCheck(String label, GeoPointND Q, GeoNumeric P) {
  if (Q.isGeoElement3D()) {
   return getManager3D().locus3D(label, Q, P);
  }
  return super.locusNoCheck(label, Q, P);
 }
 public GeoElement[] intersectImplicitSurfaceLine(
   String[] labels, GeoImplicitSurfaceND surf, GeoElementND line) {
  AlgoIntersectImplicitSurface algo = new AlgoIntersectImplicitSurface(cons, labels, surf, line);
  GeoElement[] out = algo.getIntersectionPoints();
  algo.setLabels(labels);
  return out;
 }
 public final GeoElement[] polygon(String[] labels, GeoList pointList) {
  AlgoPolygon algo;
  if (pointList.getElementType() == GeoClass.POINT3D) {
   algo = new AlgoPolygon3D(cons, labels, null, pointList);
  } else {
   algo = new AlgoPolygon(cons, labels, pointList);
  }
  return algo.getOutput();
 }
 public AlgoAxesQuadricND axesConic(GeoQuadricND c, String[] labels) {
  if (c.isGeoElement3D()) {
   return new AlgoAxes3D(cons, labels, c);
  }
  return super.axesConic(c, labels);
 }
 public AlgoAxis axis(String label, GeoConicND conic, int axisId) {
  if (conic instanceof GeoConic3D) {
   return new AlgoAxis3D(cons, label, conic, axisId);
  }
  return super.axis(label, conic, axisId);
 }
 public GeoElement polarLine(String label, GeoPointND P, GeoConicND c) {
  if (P.isGeoElement3D() || c.isGeoElement3D()) {
   AlgoPolarLine3D algo = new AlgoPolarLine3D(cons, label, c, P);
   return (GeoElement) algo.getLine();
  }
  return super.polarLine(label, P, c);
 }
 public GeoElement polarPoint(String label, GeoLineND line, GeoConicND c) {
  if (line.isGeoElement3D() || c.isGeoElement3D()) {
   AlgoPolarPoint3D algo = new AlgoPolarPoint3D(cons, label, c, line);
   return (GeoElement) algo.getPoint();
  }
  return super.polarPoint(label, line, c);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDistanceLines3D.java
```java
public class AlgoDistanceLines3D extends AlgoElement3D {
 private GeoLineND g3D;
 private GeoLineND h3D;
 private GeoNumeric dist;
 public AlgoDistanceLines3D(Construction c, GeoLineND g3D, GeoLineND h3D) {
  super(c);
  this.g3D = g3D;
  this.h3D = h3D;
  dist = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
 }
 public Commands getClassName() {
  return Commands.Distance;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) g3D;
  input[1] = (GeoElement) h3D;
  setOnlyOutput(dist);
  setDependencies(); 
 }
 GeoLineND getg() {
  return g3D;
 }
 GeoLineND geth() {
  return h3D;
 }
 public GeoNumeric getDistance() {
  return dist;
 }
 public void compute() {
  if (!g3D.isDefined() || !h3D.isDefined()) {
   dist.setUndefined();
   return;
  }
  if (g3D instanceof GeoLine) {
   dist.setValue(h3D.distance(g3D));
  } else {
   dist.setValue(g3D.distance(h3D));
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDistancePlanes.java
```java
public class AlgoDistancePlanes extends AlgoElement3D {
 private GeoPlaneND g3D;
 private GeoPlaneND h3D;
 private GeoNumeric dist;
 public AlgoDistancePlanes(Construction c, GeoPlaneND g3D, GeoPlaneND h3D) {
  super(c);
  this.g3D = g3D;
  this.h3D = h3D;
  dist = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
 }
 public Commands getClassName() {
  return Commands.Distance;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) g3D;
  input[1] = (GeoElement) h3D;
  setOnlyOutput(dist);
  setDependencies(); 
 }
 public GeoNumeric getDistance() {
  return dist;
 }
 public void compute() {
  if (!g3D.isDefined() || !h3D.isDefined()) {
   dist.setUndefined();
   return;
  }
  dist.setValue(Math.abs(g3D.distanceWithSign(h3D)));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDistancePointPlane3D.java
```java
public class AlgoDistancePointPlane3D extends AlgoElement3D {
 private GeoPointND point;
 private GeoPlane3D plane;
 private GeoNumeric dist;
 public AlgoDistancePointPlane3D(Construction c, GeoPointND point, GeoPlaneND plane) {
  super(c);
  this.point = point;
  this.plane = (GeoPlane3D) plane;
  dist = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
 }
 public Commands getClassName() {
  return Commands.Distance;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) point;
  input[1] = plane;
  setOnlyOutput(dist);
  setDependencies(); 
 }
 public GeoNumeric getDistance() {
  return dist;
 }
 public void compute() {
  if (!point.isDefined() || !plane.isDefined()) {
   dist.setUndefined();
   return;
  }
  dist.setValue(plane.distance(point));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoDrawingPadCorner3D.java
```java
public class AlgoDrawingPadCorner3D extends AlgoDrawingPadCorner {
 public AlgoDrawingPadCorner3D(
   Construction cons, String label, GeoNumberValue number, GeoNumberValue evNum) {
  super(cons, label, number, evNum, 9);
 }
 protected GeoPointND newGeoPoint(Construction cons1) {
  return new GeoPoint3D(cons1);
 }
 public static boolean is3D(NumberValue nv) {
  return DoubleUtil.isEqual(nv.getDouble(), -1);
 }
 public final void compute() {
  App app = cons.getApplication();
  if (evNum != null && is3D(evNum)) {
   if (!app.isEuclidianView3Dinited() || !corner.isGeoElement3D()) {
    corner.setUndefined();
    return;
   }
   EuclidianView3DInterface ev = app.getEuclidianView3D();
   switch ((int) number.getDouble()) {
    case 1:
     corner.setCoords(ev.getXmin(), ev.getYmin(), ev.getZmin(), 1.0);
     break;
    case 2:
     corner.setCoords(ev.getXmax(), ev.getYmin(), ev.getZmin(), 1.0);
     break;
    case 3:
     corner.setCoords(ev.getXmax(), ev.getYmax(), ev.getZmin(), 1.0);
     break;
    case 4:
     corner.setCoords(ev.getXmin(), ev.getYmax(), ev.getZmin(), 1.0);
     break;
    case 5:
     corner.setCoords(ev.getXmin(), ev.getYmin(), ev.getZmax(), 1.0);
     break;
    case 6:
     corner.setCoords(ev.getXmax(), ev.getYmin(), ev.getZmax(), 1.0);
     break;
    case 7:
     corner.setCoords(ev.getXmax(), ev.getYmax(), ev.getZmax(), 1.0);
     break;
    case 8:
     corner.setCoords(ev.getXmin(), ev.getYmax(), ev.getZmax(), 1.0);
     break;
    case 9: 
     corner.setCoords(ev.getWidth(), ev.getHeight(), 1.0);
     break;
    case 10: 
     corner.setCoords(app.getWidth(), app.getHeight(), 1.0);
     break;
    case CORNER_VIEW_DIRECTION: 
     Coords eye = ev.getEyePosition();
     corner.setCoords(eye.getX(), eye.getY(), eye.getZ(), 1.0);
     break;
    case CORNER_SCREEN_RIGHT: 
     Coords vx = ev.getToSceneMatrix().getVx();
     corner.setCoords(vx.getX(), vx.getY(), vx.getZ(), 1.0);
     break;
    case CORNER_AXES_SCALE:
     corner.setCoords(ev.getXscale(), ev.getYscale(), ev.getZscale(), 1.0);
     break;
    default:
     corner.setUndefined();
     break;
   }
  } else { 
   super.compute();
  }
 }
 public String getDefinitionName(StringTemplate tpl) {
  if (tpl.getStringType() == StringType.GEOGEBRA_XML) {
   return Commands.CornerThreeD.name();
  }
  return super.getDefinitionName(tpl);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoElement3D.java
```java
public abstract class AlgoElement3D extends AlgoElement {
 public AlgoElement3D(Construction c) {
  this(c, true);
 }
 public AlgoElement3D(Construction c, boolean addToConstructionList) {
  super(c, addToConstructionList);
 }
 protected void setInputOutput(GeoElement[] a_input, GeoElement[] a_output) {
  input = a_input;
  setOutput(a_output);
  setInputOutput(true);
 }
 protected void setInputOutput(
   GeoElement[] input, GeoElement[] efficientInput, GeoElement singleOutput) {
  this.input = input;
  this.setOnlyOutput(singleOutput);
  setEfficientDependencies(input, efficientInput);
 }
 protected void setInputOutput() {
  setInputOutput(true);
 }
 protected void setInputOutput(boolean setDependencies) {
  if (setDependencies) {
   setDependencies();
  }
  compute();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoEllipseFociLength3D.java
```java
public class AlgoEllipseFociLength3D extends AlgoConicFociLength3D {
 public AlgoEllipseFociLength3D(
   Construction cons,
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoNumberValue a,
   GeoDirectionND orientation) {
  super(cons, label, A, B, a, orientation);
 }
 public Commands getClassName() {
  return Commands.Ellipse;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_ELLIPSE_THREE_POINTS;
 }
 public final String toString(StringTemplate tpl) {
  if (orientation instanceof GeoCoordSys2D) {
   return getLoc()
     .getPlain(
       conic.isHyperbola()
         ? "HyperbolaWithFociABandFirstAxisLengthCParallelToD"
         : "EllipseWithFociABandFirstAxisLengthCParallelToD",
       A.getLabel(tpl),
       B.getLabel(tpl),
       a.toGeoElement().getLabel(tpl),
       orientation.getLabel(tpl));
  }
  return getLoc()
    .getPlain(
      conic.isHyperbola()
        ? "HyperbolaWithFociABandFirstAxisLengthCPerpendicularToD"
        : "EllipseWithFociABandFirstAxisLengthCPerpendicularToD",
      A.getLabel(tpl),
      B.getLabel(tpl),
      a.toGeoElement().getLabel(tpl),
      orientation.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoEllipseHyperbolaFociPoint3D.java
```java
public class AlgoEllipseHyperbolaFociPoint3D extends AlgoEllipseHyperbolaFociPointND {
 private GeoPoint A2d;
 private GeoPoint B2d;
 private GeoPoint C2d;
 private Coords project;
 public AlgoEllipseHyperbolaFociPoint3D(
   Construction cons,
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoPointND C,
   GeoDirectionND orientation,
   final int type) {
  super(cons, label, A, B, C, orientation, type);
 }
 public AlgoEllipseHyperbolaFociPoint3D(
   Construction cons, String label, GeoPointND A, GeoPointND B, GeoPointND C, final int type) {
  this(cons, label, A, B, C, null, type);
 }
 protected GeoConicND newGeoConic(Construction cons1) {
  GeoConic3D ret = new GeoConic3D(cons1);
  ret.setCoordSys(new CoordSys(2));
  return ret;
 }
 protected void setInputOutput() {
  super.setInputOutput();
  A2d = new GeoPoint(cons);
  B2d = new GeoPoint(cons);
  C2d = new GeoPoint(cons);
 }
 protected GeoPoint getA2d() {
  return A2d;
 }
 protected GeoPoint getB2d() {
  return B2d;
 }
 protected GeoPoint getC2d() {
  return C2d;
 }
 protected boolean setCoordSys(CoordSys cs, Coords Ac, Coords Bc, Coords Cc) {
  cs.addPoint(Ac);
  cs.addPoint(Bc);
  cs.addPoint(Cc);
  return cs.makeOrthoMatrix(false, false);
 }
 public void compute() {
  CoordSys cs = conic.getCoordSys();
  cs.resetCoordSys();
  Coords Ac = getFocus1().getInhomCoordsInD3();
  Coords Bc = getFocus2().getInhomCoordsInD3();
  Coords Cc = getConicPoint().getInhomCoordsInD3();
  if (!setCoordSys(cs, Ac, Bc, Cc)) {
   conic.setUndefined();
   return;
  }
  CoordMatrix4x4 matrix = cs.getMatrixOrthonormal();
  Ac.projectPlaneInPlaneCoords(matrix, project);
  A2d.setCoords(project.getX(), project.getY(), project.getW());
  Bc.projectPlaneInPlaneCoords(matrix, project);
  B2d.setCoords(project.getX(), project.getY(), project.getW());
  Cc.projectPlaneInPlaneCoords(matrix, project);
  C2d.setCoords(project.getX(), project.getY(), project.getW());
  super.compute();
 }
 protected void initCoords() {
  project = new Coords(4);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoEllipseHyperbolaFociPoint3DOriented.java
```java
public class AlgoEllipseHyperbolaFociPoint3DOriented extends AlgoEllipseHyperbolaFociPoint3D {
 private GeoDirectionND orientation;
 public AlgoEllipseHyperbolaFociPoint3DOriented(
   Construction cons,
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoPointND C,
   GeoDirectionND orientation,
   final int type) {
  super(cons, label, A, B, C, orientation, type);
 }
 protected void setOrientation(GeoDirectionND orientation) {
  this.orientation = orientation;
 }
 protected void setInput() {
  input = new GeoElement[4];
  input[0] = (GeoElement) getFocus1();
  input[1] = (GeoElement) getFocus2();
  input[2] = (GeoElement) getConicPoint();
  input[3] = (GeoElement) orientation;
 }
 protected boolean setCoordSys(CoordSys cs, Coords Ac, Coords Bc, Coords Cc) {
  Coords vn = orientation.getDirectionInD3();
  if (vn.isZero()) {
   return false;
  }
  Coords d1 = Bc.sub(Ac);
  if (!DoubleUtil.isZero(d1.dotproduct(vn))) {
   return false;
  }
  if (!DoubleUtil.isZero(Cc.sub(Ac).dotproduct(vn))) {
   return false;
  }
  cs.addPoint(Ac);
  cs.addVector(d1);
  cs.addVector(vn.crossProduct4(d1));
  return cs.makeOrthoMatrix(false, false);
 }
 public String toString(StringTemplate tpl) {
  if (orientation instanceof GeoCoordSys2D) {
   if (type == GeoConicNDConstants.CONIC_HYPERBOLA) {
    return getLoc()
      .getPlain(
        "HyperbolaWithFociABPassingThroughCParallelToD",
        getFocus1().getLabel(tpl),
        getFocus2().getLabel(tpl),
        getConicPoint().getLabel(tpl),
        orientation.getLabel(tpl));
   }
   return getLoc()
     .getPlain(
       "EllipseWithFociABPassingThroughCParallelToD",
       getFocus1().getLabel(tpl),
       getFocus2().getLabel(tpl),
       getConicPoint().getLabel(tpl),
       orientation.getLabel(tpl));
  }
  if (type == GeoConicNDConstants.CONIC_HYPERBOLA) {
   return getLoc()
     .getPlain(
       "HyperbolaWithFociABPassingThroughCPerpendicularToD",
       getFocus1().getLabel(tpl),
       getFocus2().getLabel(tpl),
       getConicPoint().getLabel(tpl),
       orientation.getLabel(tpl));
  }
  return getLoc()
    .getPlain(
      "EllipseWithFociABPassingThroughCPerpendicularToD",
      getFocus1().getLabel(tpl),
      getFocus2().getLabel(tpl),
      getConicPoint().getLabel(tpl),
      orientation.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoFocus3D.java
```java
public class AlgoFocus3D extends AlgoFocus {
 public AlgoFocus3D(Construction cons, String[] labels, GeoConicND c) {
  super(cons, labels, c);
 }
 protected void createFocus(Construction cons1) {
  focus = new GeoPoint3D[2];
  for (int i = 0; i < focus.length; i++) {
   focus[i] = new GeoPoint3D(cons1);
  }
 }
 protected void setCoords(int i, double x, double y) {
  ((GeoPoint3D) focus[i]).setCoords(c.getCoordSys().getPoint(x, y));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoForExtrusion.java
```java
public interface AlgoForExtrusion {
 void compute();
 void remove();
 GeoElement getOutput(int i);
 void setExtrusionComputer(ExtrusionComputer extrusionComputer);
 void removeOutputFromAlgebraView();
 void removeOutputFromPicking();
 void setOutputPointsEuclidianVisible(boolean b);
 void notifyUpdateOutputPoints();
 GeoElement getGeoToHandle();
 void setOutputOtherEuclidianVisible(boolean b);
 void notifyUpdateOutputOther();
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoFunctionNVarND.java
```java
public class AlgoFunctionNVarND extends AlgoElement3D {
 protected GeoFunctionNVar inputFunction;
 protected GeoFunctionNVar function;
 protected NumberValue[] from;
 protected NumberValue[] to;
 private AlgoFunctionNVarND(Construction cons, NumberValue[] from, NumberValue[] to) {
  super(cons);
  this.from = from;
  this.to = to;
 }
 public AlgoFunctionNVarND(
   Construction cons,
   String label,
   GeoNumberValue[] coords,
   GeoNumeric[] localVar,
   GeoNumberValue[] from,
   GeoNumberValue[] to) {
  this(cons, from, to);
  FunctionVariable[] funVar = new FunctionVariable[localVar.length];
  for (int i = 0; i < localVar.length; i++) {
   String varStr = localVar[i].getLabel(StringTemplate.defaultTemplate);
   funVar[i] = new FunctionVariable(kernel, varStr);
  }
  ExpressionNode[] exp = new ExpressionNode[coords.length];
  FunctionNVar[] fun = new FunctionNVar[coords.length];
  for (int i = 0; i < coords.length; i++) {
   exp[i] = kernel.convertNumberValueToExpressionNode(coords[i].toGeoElement());
   for (int j = 0; j < localVar.length; j++) {
    exp[i] = exp[i].replace(localVar[j], funVar[j]).wrap();
   }
   fun[i] = new FunctionNVar(exp[i], funVar);
  }
  function = new GeoFunctionNVar(cons, fun[0]);
  setInputOutput(coords, localVar);
  compute();
  function.setLabel(label);
 }
 public AlgoFunctionNVarND(
   Construction cons,
   String label,
   GeoFunctionNVar f,
   GeoNumberValue[] from,
   GeoNumberValue[] to) {
  this(cons, from, to);
  inputFunction = f;
  function = inputFunction.copy();
  setInputOutput((GeoNumberValue[]) null, null);
  compute();
  function.setLabel(label);
 }
 private void setInputOutput(GeoNumberValue[] coords, GeoNumeric[] localVar) {
  int inputLength = from.length + to.length;
  if (coords != null) {
   inputLength += coords.length;
  } else {
   inputLength += 1; 
  }
  if (localVar != null) {
   inputLength += localVar.length;
  }
  GeoElement[] inputElements = new GeoElement[inputLength];
  int index = 0;
  if (coords != null) {
   for (int i = 0; i < coords.length; i++) {
    inputElements[index] = (GeoElement) coords[i];
    index++;
   }
  } else {
   inputElements[index] = inputFunction;
   index++;
  }
  for (int i = 0; i < from.length; i++) {
   if (localVar != null) {
    inputElements[index] = localVar[i];
    index++;
   }
   inputElements[index] = (GeoElement) from[i];
   index++;
   inputElements[index] = (GeoElement) to[i];
   index++;
  }
  super.setInputOutput(inputElements, new GeoElement[] {function});
 }
 public GeoFunctionNVar getFunction() {
  return function;
 }
 public void compute() {
  if (inputFunction != null) {
   function.set(inputFunction);
  }
  function.setInterval(getDouble(from), getDouble(to));
 }
 private static double[] getDouble(NumberValue[] values) {
  double[] ret = new double[values.length];
  for (int i = 0; i < values.length; i++) {
   ret[i] = values[i].getDouble();
  }
  return ret;
 }
 public Commands getClassName() {
  return Commands.Function;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoHyperbolaFociLength3D.java
```java
public class AlgoHyperbolaFociLength3D extends AlgoConicFociLength3D {
 public AlgoHyperbolaFociLength3D(
   Construction cons,
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoNumberValue a,
   GeoDirectionND orientation) {
  super(cons, label, A, B, a, orientation);
 }
 public Commands getClassName() {
  return Commands.Hyperbola;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_HYPERBOLA_THREE_POINTS;
 }
 public final String toString(StringTemplate tpl) {
  if (orientation instanceof GeoCoordSys2D) {
   return getLoc()
     .getPlain(
       conic.isEllipse() || conic.isCircle()
         ? "EllipseWithFociABandFirstAxisLengthCParallelToD"
         : "HyperbolaWithFociABandFirstAxisLengthCParallelToD",
       A.getLabel(tpl),
       B.getLabel(tpl),
       a.toGeoElement().getLabel(tpl),
       orientation.getLabel(tpl));
  }
  return getLoc()
    .getPlain(
      conic.isEllipse() || conic.isCircle()
        ? "EllipseWithFociABandFirstAxisLengthCPerpendicularToD"
        : "HyperbolaWithFociABandFirstAxisLengthCPerpendicularToD",
      A.getLabel(tpl),
      B.getLabel(tpl),
      a.toGeoElement().getLabel(tpl),
      orientation.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersect3D.java
```java
public abstract class AlgoIntersect3D extends AlgoIntersectND {
 public AlgoIntersect3D(Construction c) {
  super(c);
 }
 protected void avoidDoubleTangentPoint() {
  GeoPoint3D[] points = getIntersectionPoints();
  if (!points[1].isLabelSet() && points[0].isEqual(points[1])) {
   points[1].setUndefined();
  }
 }
 int getClosestPointIndex(double xRW, double yRW, CoordMatrix mat) {
  GeoPoint3D[] P = getIntersectionPoints();
  double x, y, lengthSqr, mindist = Double.POSITIVE_INFINITY;
  int minIndex = 0;
  for (int i = 0; i < P.length; i++) {
   Coords toScreenCoords;
   if (mat == null) {
    toScreenCoords = P[i].getInhomCoords();
   } else {
    toScreenCoords = mat.mul(P[i].getCoords().getCoordsLast1()).getInhomCoords();
   }
   x = toScreenCoords.getX() - xRW;
   y = toScreenCoords.getY() - yRW;
   lengthSqr = x * x + y * y;
   if (lengthSqr < mindist) {
    mindist = lengthSqr;
    minIndex = i;
   }
  }
  return minIndex;
 }
 int getClosestPointIndex(Coords origin, Coords direction) {
  GeoPoint3D[] P = getIntersectionPoints();
  double dist, mindist = Double.POSITIVE_INFINITY;
  int minIndex = 0;
  for (int i = 0; i < P.length; i++) {
   dist = P[i].getInhomCoords().distLine(origin, direction);
   if (dist < mindist) {
    mindist = dist;
    minIndex = i;
   }
  }
  return minIndex;
 }
 public abstract GeoPoint3D[] getIntersectionPoints();
 protected abstract GeoPoint3D[] getLastDefinedIntersectionPoints();
 int getClosestPointIndex(GeoPointND refPoint) {
  Coords refInhom = refPoint.getInhomCoordsInD3();
  GeoPoint3D[] P = getIntersectionPoints();
  double x, y, z, lengthSqr, mindist = Double.POSITIVE_INFINITY;
  int minIndex = 0;
  for (int i = 0; i < P.length; i++) {
   Coords PInhom = P[i].getInhomCoordsInD3();
   x = PInhom.getX() - refInhom.getX();
   y = PInhom.getY() - refInhom.getY();
   z = PInhom.getZ() - refInhom.getZ();
   lengthSqr = x * x + y * y + z * z;
   if (DoubleUtil.isGreater(mindist, lengthSqr)) {
    mindist = lengthSqr;
    minIndex = i;
   }
  }
  return minIndex;
 }
 protected void setCoords(GeoPointND destination, GeoPointND source) {
  ((GeoPoint3D) destination).setCoords(((GeoPoint3D) source).getCoords());
 }
 public abstract void compute();
 public abstract void initForNearToRelationship();
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectCS1D1D.java
```java
public class AlgoIntersectCS1D1D extends AlgoIntersectCoordSys {
 public AlgoIntersectCS1D1D(Construction cons, String label, GeoLineND cs1, GeoLineND cs2) {
  super(cons, label, cs1, cs2, false);
 }
 public void compute() {
  if (!outputIsDefined()) {
   return;
  }
  GeoLineND line1 = (GeoLineND) getCS1();
  GeoLineND line2 = (GeoLineND) getCS2();
  Coords o1 = line1.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords d1 = line1.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o1);
  Coords o2 = line2.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords d2 = line2.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o2);
  Coords[] project = CoordMatrixUtil.nearestPointsFromTwoLines(o1, d1, o2, d2);
  GeoPoint3D p = (GeoPoint3D) getIntersection();
  if (Double.isNaN(project[2].get(1))) { 
   if (getCS1().isGeoSegment()
     || getCS1().isGeoRay()
     || getCS2().isGeoSegment()
     || getCS2().isGeoRay()) {
    p.setUndefined();
   } else { 
    p.setCoords(project[0]);
    p.updateCoords();
   }
  } else if (project[0].equalsForKernel(project[1], Kernel.STANDARD_PRECISION)) {
   double t1 = project[2].get(1); 
   double t2 = project[2].get(2); 
   if (t1 > line1.getMinParameter() - Kernel.STANDARD_PRECISION
     && t1 < line1.getMaxParameter() + Kernel.STANDARD_PRECISION
     && t2 > line2.getMinParameter() - Kernel.STANDARD_PRECISION
     && t2 < line2.getMaxParameter() + Kernel.STANDARD_PRECISION) {
    p.setCoords(project[0]);
   } else {
    p.setUndefined();
   }
  } else {
   p.setUndefined();
  }
 }
 public final Commands getClassName() {
  return Commands.Intersect;
 }
 protected String getIntersectionTypeString() {
  return "IntersectionPointOfAB";
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectCS1D2D.java
```java
public class AlgoIntersectCS1D2D extends AlgoIntersectCoordSys {
 public AlgoIntersectCS1D2D(
   Construction cons, String label, GeoLineND cs1, GeoCoordSys2D cs2, boolean swapInputs) {
  super(cons, label, cs1, cs2, swapInputs);
 }
 public void compute() {
  GeoLineND line = (GeoLineND) getCS1();
  GeoCoordSys2D cs2D = (GeoCoordSys2D) getCS2();
  Coords o = line.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords d = line.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o);
  Coords globalCoords = new Coords(4);
  Coords inPlaneCoords = new Coords(4);
  o.projectPlaneThruV(cs2D.getCoordSys().getMatrixOrthonormal(), d, globalCoords, inPlaneCoords);
  GeoPoint3D p = (GeoPoint3D) getIntersection();
  if (-inPlaneCoords.get(3) > line.getMinParameter() - Kernel.MAX_PRECISION
    && -inPlaneCoords.get(3) < line.getMaxParameter() + Kernel.MAX_PRECISION
    && cs2D.isInRegion(inPlaneCoords.get(1), inPlaneCoords.get(2))) {
   p.setCoords(globalCoords);
  } else {
   p.setUndefined();
  }
 }
 public enum ConfigLinePlane {
  GENERAL,
  PARALLEL,
  CONTAINED
 }
 public static ConfigLinePlane getConfigLinePlane(GeoLineND line, GeoCoordSys2D plane) {
  if (DoubleUtil.isZero(line.getDirectionInD3().dotproduct(plane.getDirectionInD3()))) {
   if (DoubleUtil.isZero(line.getPointInD(3, 0)
     .getInhomCoordsInSameDimension()
     .sub(plane.getCoordSys().getOrigin())
     .dotproduct(plane.getDirectionInD3()))) {
    return ConfigLinePlane.CONTAINED;
   }
   return ConfigLinePlane.PARALLEL;
  }
  return ConfigLinePlane.GENERAL;
 }
 public static Coords getIntersectLinePlane(
   GeoLineND line, GeoCoordSys2D cs2D, Coords globalCoords, Coords inPlaneCoords) {
  Coords o = line.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords d = line.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o);
  o.projectPlaneThruV(cs2D.getCoordSys().getMatrixOrthonormal(), d, globalCoords, inPlaneCoords);
  if (line.respectLimitedPath(-inPlaneCoords.get(3))
    && cs2D.isInRegion(inPlaneCoords.get(1), inPlaneCoords.get(2))) {
   return globalCoords;
  }
  return null;
 }
 protected String getIntersectionTypeString() {
  return "IntersectionPointOfAB";
 }
 public final Commands getClassName() {
  return Commands.Intersect;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectConic3D.java
```java
public abstract class AlgoIntersectConic3D extends AlgoIntersect3D {
 protected GeoElement firstGeo; 
 protected GeoConicND c; 
 protected GeoPoint3D[] P; 
 private GeoPoint3D[] D;
 private GeoLine g2d;
 private GeoPoint[] points2d;
 private Coords p2d;
 private Coords tmpCoords;
 AlgoIntersectConic3D(Construction cons) {
  super(cons);
  p2d = new Coords(3);
  g2d = new GeoLine(cons);
  points2d = new GeoPoint[2];
  for (int i = 0; i < 2; i++) {
   points2d[i] = new GeoPoint(cons);
  }
 }
 AlgoIntersectConic3D(Construction cons, GeoElement firstGeo, GeoConicND c) {
  this(cons);
  this.firstGeo = firstGeo;
  this.c = c;
  P = new GeoPoint3D[2];
  D = new GeoPoint3D[2];
  for (int i = 0; i < 2; i++) {
   P[i] = new GeoPoint3D(cons);
   D[i] = new GeoPoint3D(cons);
  }
  setInputOutput(); 
  compute();
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = firstGeo;
  input[1] = c;
  setOutput(P);
  noUndefinedPointsInAlgebraView();
  setDependencies(); 
 }
 public final GeoPoint3D[] getIntersectionPoints() {
  return P;
 }
 protected GeoPoint3D[] getLastDefinedIntersectionPoints() {
  return D;
 }
 GeoConicND getConic() {
  return c;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("IntersectionPointOfAB", c.getLabel(tpl), firstGeo.getLabel(tpl));
 }
 protected abstract Coords getFirstGeoStartInhomCoords();
 protected abstract Coords getFirstGeoDirectionInD3();
 protected abstract boolean getFirstGeoRespectLimitedPath(Coords p);
 public void compute() {
  intersect(c, P);
 }
 protected final void intersect(GeoConicND conic, GeoPoint3D[] pts) {
  CoordSys cs = conic.getCoordSys();
  Coords o = getFirstGeoStartInhomCoords();
  Coords d = getFirstGeoDirectionInD3();
  Coords dp = cs.getNormalProjection(d)[1];
  if (!DoubleUtil.isZero(dp.getZ())) { 
   Coords globalCoords = new Coords(4);
   Coords inPlaneCoords = new Coords(4);
   o.projectPlaneThruV(cs.getMatrixOrthonormal(), d, globalCoords, inPlaneCoords);
   p2d.setX(inPlaneCoords.getX());
   p2d.setY(inPlaneCoords.getY());
   p2d.setZ(inPlaneCoords.getW());
   if (conic.isOnFullConic(p2d, Kernel.MIN_PRECISION)
     && getFirstGeoRespectLimitedPath(globalCoords)) {
    pts[0].setCoords(globalCoords, false);
   } else {
    setPointsUndefined();
   }
  } else { 
   Coords op = cs.getNormalProjection(o)[1];
   if (!DoubleUtil.isZero(op.getZ())) { 
    setPointsUndefined(); 
   } else { 
    g2d.setCoords(dp.getY(), -dp.getX(), -dp.getY() * op.getX() + dp.getX() * op.getY());
    intersectLineIncluded(conic, pts, cs, g2d);
   }
  }
 }
 protected void intersectLineIncluded(
   GeoConicND conic, GeoPoint3D[] points, CoordSys cs, GeoLine g) {
  AlgoIntersectLineConic.intersectLineConic(g, conic, points2d, Kernel.STANDARD_PRECISION);
  points[0].setCoords(cs.getPoint(points2d[0].x, points2d[0].y), false);
  checkIsOnFirstGeo(points[0]);
  checkIsOnConicPart(conic, points2d[0], points[0]);
  points[1].setCoords(cs.getPoint(points2d[1].x, points2d[1].y), false);
  checkIsOnFirstGeo(points[1]);
  checkIsOnConicPart(conic, points2d[1], points[1]);
 }
 private void checkIsOnConicPart(GeoConicND conic, GeoPoint point, GeoPoint3D p3d) {
  if (conic.isGeoConicPart()) {
   if (!p3d.isDefined()) {
    return;
   }
   if (tmpCoords == null) {
    tmpCoords = new Coords(3);
    tmpCoords.setZ(1);
   }
   tmpCoords.setX(point.x);
   tmpCoords.setY(point.y);
   if (!((GeoConicPartND) conic).getParameters().isOnPath(tmpCoords)) {
    p3d.setUndefined();
   }
  }
 }
 protected abstract void checkIsOnFirstGeo(GeoPoint3D p);
 private void setPointsUndefined() {
  for (int i = 0; i < 2; i++) {
   P[i].setUndefined();
  }
 }
 public final void initForNearToRelationship() {
 }
 protected GeoElement getFirstGeo() {
  return firstGeo;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectConics3D.java
```java
public class AlgoIntersectConics3D extends AlgoIntersect3D {
 private GeoConicND A;
 private GeoQuadricND B; 
 private GeoPoint3D[] P; 
 private GeoPoint3D[] D; 
 private GeoLine l2d;
 private GeoConic A2d;
 private GeoConic B2d;
 private GeoPoint[] points2d;
 private AlgoIntersectConics algo2d;
 private AlgoIntersectPlaneQuadric algoPlane;
 private static final CoordMatrix AUGMENT_DIM =
   new CoordMatrix(4, 3, new double[] {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1});
 private static final CoordMatrix REDUCE_DIM = AUGMENT_DIM.transposeCopy();
 AlgoIntersectConics3D(Construction cons, String label, GeoConicND A, GeoConicND B) {
  this(cons, A, B);
  LabelManager.setLabels(label, P);
 }
 AlgoIntersectConics3D(Construction cons, String[] labels, GeoConicND A, GeoConicND B) {
  this(cons, A, B);
  LabelManager.setLabels(labels, P);
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_INTERSECT;
 }
 AlgoIntersectConics3D(Construction cons) {
  super(cons);
  l2d = new GeoLine(cons);
  A2d = new GeoConic(cons);
  B2d = new GeoConic(cons);
  algo2d = new AlgoIntersectConics(cons, false);
  points2d = new GeoPoint[4];
 }
 AlgoIntersectConics3D(Construction cons, GeoConicND A, GeoQuadricND B) {
  this(cons);
  P = new GeoPoint3D[4];
  D = new GeoPoint3D[4];
  for (int i = 0; i < 4; i++) {
   P[i] = new GeoPoint3D(cons);
   D[i] = new GeoPoint3D(cons);
   points2d[i] = new GeoPoint(cons);
  }
  this.A = A;
  this.B = B;
  setInputOutput(); 
  compute();
 }
 public void setInputOutput() {
  input = new GeoElement[2];
  input[0] = A;
  input[1] = B;
  setOutput(P);
  noUndefinedPointsInAlgebraView();
  setDependencies(); 
 }
 public final GeoPoint3D[] getIntersectionPoints() {
  return P;
 }
 protected GeoPoint3D[] getLastDefinedIntersectionPoints() {
  return D;
 }
 protected void setCoords(GeoPointND destination, GeoPointND source) {
  destination.setCoords(source.getCoordsInD3(), false);
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("IntersectionPointOfAB", A.getLabel(tpl), B.getLabel(tpl));
 }
 public void compute() {
  if (B.isGeoConic()) {
   intersectConics3D(A, (GeoConicND) B, P);
  } else {
   if (algoPlane == null) {
    algoPlane = new AlgoIntersectPlaneQuadric(cons, A, B, false);
   }
   algoPlane.compute();
   intersectSamePlane(A, algoPlane.getConic(), P);
  }
 }
 public final void intersectConics3D(GeoConicND cA, GeoConicND cB, GeoPoint3D[] pts) {
  if (!cA.isDefined() || !cB.isDefined()) {
   setPointsUndefined(pts);
   return;
  }
  CoordSys csA = cA.getCoordSys();
  CoordSys csB = cB.getCoordSys();
  Coords cross = csA.getNormal().crossProduct(csB.getNormal());
  if (!cross.equalsForKernel(0, Kernel.MIN_PRECISION)) { 
   Coords[] intersection = CoordMatrixUtil.intersectPlanes(
     cA.getCoordSys().getMatrixOrthonormal(), cB.getCoordSys().getMatrixOrthonormal());
   Coords op = csA.getNormalProjection(intersection[0])[1];
   Coords dp = csA.getNormalProjection(intersection[1])[1];
   l2d.setCoords(dp.getY(), -dp.getX(), -dp.getY() * op.getX() + dp.getX() * op.getY());
   AlgoIntersectLineConic.intersectLineConic(l2d, cA, points2d, Kernel.STANDARD_PRECISION);
   pts[0].setCoords(csA.getPoint(points2d[0].x, points2d[0].y), false);
   checkIsOnConic(cB, pts[0]);
   pts[1].setCoords(csA.getPoint(points2d[1].x, points2d[1].y), false);
   checkIsOnConic(cB, pts[1]);
   if (!pts[0].isDefined() && pts[1].isDefined()) {
    pts[0].setCoords(pts[1].getCoords(), false);
    pts[1].setUndefined();
   }
   pts[2].setUndefined();
   pts[3].setUndefined();
  } else { 
   Coords op = csA.getNormalProjection(csB.getOrigin())[1];
   if (!DoubleUtil.isZero(op.getZ())) { 
    setPointsUndefined(pts); 
   } else { 
    intersectSamePlane(cA, cB, pts);
   }
  }
 }
 private void intersectSamePlane(GeoConicND cA, GeoConicND cB, GeoPoint3D[] pts) {
  transformConics(cA, cB, A2d, B2d);
  algo2d.intersectConics(A2d, B2d, points2d);
  setPointsUndefined(pts);
  for (int i = 0; i < 4; i++) {
   pts[i].setCoords(cA.getCoordSys().getPoint(points2d[i].x, points2d[i].y), false);
  }
 }
 public static void transformConics(GeoConicND A, GeoConicND B, GeoConic A2d, GeoConic B2d) {
  CoordSys csA = A.getCoordSys();
  CoordSys csB = B.getCoordSys();
  CoordMatrix BtoA = REDUCE_DIM
    .mul(csB.getMatrixOrthonormal().inverse().mul(csA.getMatrixOrthonormal()))
    .mul(AUGMENT_DIM);
  CoordMatrix sB = B.getSymmetricMatrix();
  CoordMatrix sBinA = BtoA.transposeCopy().mul(sB).mul(BtoA);
  A2d.setMatrix(A.getMatrix());
  B2d.setMatrix(sBinA);
 }
 private static void checkIsOnConic(GeoConicND B, GeoPoint3D p) {
  if (!p.isDefined()) {
   return;
  }
  Coords pp = B.getCoordSys().getNormalProjection(p.getCoords())[1];
  Coords pp2d = new Coords(3);
  pp2d.setX(pp.getX());
  pp2d.setY(pp.getY());
  pp2d.setZ(pp.getW());
  if (!B.isOnFullConic(pp2d, Kernel.MIN_PRECISION)) {
   p.setUndefined();
  }
 }
 private static void setPointsUndefined(GeoPoint3D[] P) {
  for (int i = 0; i < 4; i++) {
   P[i].setUndefined();
  }
 }
 public final void initForNearToRelationship() {
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectCoordSys.java
```java
public abstract class AlgoIntersectCoordSys extends AlgoElement3D {
 private GeoElementND cs1;
 private GeoElementND cs2;
 private GeoElement3D intersection;
 AlgoIntersectCoordSys(
   Construction cons, String label, GeoElementND cs1, GeoElementND cs2, boolean swapInputs) {
  this(cons, cs1, cs2, swapInputs);
  intersection.setLabel(label);
 }
 AlgoIntersectCoordSys(Construction cons, GeoElementND cs1, GeoElementND cs2, boolean swapInputs) {
  super(cons);
  this.cs1 = cs1;
  this.cs2 = cs2;
  intersection = createIntersection(cons);
  setInputOutput(
    swapInputs
      ? new GeoElement[] {(GeoElement) cs2, (GeoElement) cs1}
      : new GeoElement[] {(GeoElement) cs1, (GeoElement) cs2},
    new GeoElement[] {intersection});
 }
 protected GeoElement3D createIntersection(Construction cons1) {
  return new GeoPoint3D(cons1);
 }
 GeoElementND getCS1() {
  return cs1;
 }
 GeoElementND getCS2() {
  return cs2;
 }
 public GeoElement3D getIntersection() {
  return intersection;
 }
 protected boolean outputIsDefined() {
  if (!cs1.isDefined() || !cs2.isDefined()) {
   intersection.setUndefined();
   return false;
  }
  return true;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(getIntersectionTypeString(), getCS1().getLabel(tpl), getCS2().getLabel(tpl));
 }
 protected abstract String getIntersectionTypeString();
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectLineConic3D.java
```java
public class AlgoIntersectLineConic3D extends AlgoIntersectConic3D {
 AlgoIntersectLineConic3D(Construction cons, String label, GeoLineND g, GeoConicND c) {
  this(cons, g, c);
  LabelManager.setLabels(label, P);
 }
 AlgoIntersectLineConic3D(Construction cons, String[] labels, GeoLineND g, GeoConicND c) {
  this(cons, g, c);
  LabelManager.setLabels(labels, P);
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_INTERSECT;
 }
 AlgoIntersectLineConic3D(Construction cons, GeoLineND g, GeoConicND c) {
  super(cons, (GeoElement) g, c);
 }
 GeoLineND getLine() {
  return (GeoLineND) getFirstGeo();
 }
 protected Coords getFirstGeoStartInhomCoords() {
  return getLine().getStartInhomCoords();
 }
 protected Coords getFirstGeoDirectionInD3() {
  return getLine().getDirectionInD3();
 }
 protected boolean getFirstGeoRespectLimitedPath(Coords p) {
  return getLine().respectLimitedPath(p, Kernel.STANDARD_PRECISION);
 }
 protected void checkIsOnFirstGeo(GeoPoint3D p) {
  if (!p.isDefined()) {
   return;
  }
  if (!getLine().respectLimitedPath(p.getCoords(), Kernel.MIN_PRECISION)) {
   p.setUndefined();
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectLineIncludedConic3D.java
```java
public class AlgoIntersectLineIncludedConic3D extends AlgoIntersectConic3D {
 public Commands getClassName() {
  return Commands.Intersect;
 }
 AlgoIntersectLineIncludedConic3D(Construction cons, GeoLine g, GeoConicND c) {
  super(cons, g, c);
 }
 public void compute() {
  intersectLineIncluded(c, P, c.getCoordSys(), getLine());
 }
 GeoLine getLine() {
  return (GeoLine) getFirstGeo();
 }
 protected Coords getFirstGeoStartInhomCoords() {
  return getLine().getStartInhomCoords();
 }
 protected Coords getFirstGeoDirectionInD3() {
  return getLine().getDirectionInD3();
 }
 protected boolean getFirstGeoRespectLimitedPath(Coords p) {
  return true;
 }
 protected void checkIsOnFirstGeo(GeoPoint3D p) {
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectLinePolygon3D.java
```java
public class AlgoIntersectLinePolygon3D extends AlgoElement3D {
 protected HasSegments p;
 protected GeoLineND g;
 protected OutputHandler<GeoElement> outputPoints; 
 private TreeMap<Double, Coords> newCoords;
 protected Coords o1;
 protected Coords d1;
 public AlgoIntersectLinePolygon3D(
   Construction c, String[] labels, GeoElementND g, HasSegments p) {
  super(c);
  outputPoints = createOutputPoints();
  setFirstInput(g);
  this.p = p;
  newCoords = new TreeMap<>(Kernel.doubleComparator(Kernel.STANDARD_PRECISION));
  compute();
  setInputOutput(); 
  setLabels(labels);
  update();
 }
 protected void setFirstInput(GeoElementND geo) {
  this.g = (GeoLineND) geo;
 }
 protected GeoElement getFirstInput() {
  return (GeoElement) g;
 }
 protected OutputHandler<GeoElement> createOutputPoints() {
  return new OutputHandler<>(() -> {
   GeoPoint3D p1 = new GeoPoint3D(cons);
   p1.setCoords(0, 0, 0, 1);
   p1.setParentAlgorithm(this);
   return p1;
  });
 }
 protected OutputHandler<GeoElement> createOutputSegments() {
  return new OutputHandler<>(() -> {
   GeoPoint3D aS = new GeoPoint3D(cons);
   aS.setCoords(0, 0, 0, 1);
   GeoPoint3D aE = new GeoPoint3D(cons);
   aE.setCoords(0, 0, 0, 1);
   GeoSegment3D a = new GeoSegment3D(cons, aS, aE);
   a.setParentAlgorithm(this);
   return a;
  });
 }
 protected void setIntersectionLine() {
  o1 = g.getPointInD(3, 0).getInhomCoordsInSameDimension();
  d1 = g.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o1);
 }
 protected void intersectionsCoords(
   HasSegments hasSegments, TreeMap<Double, Coords> paramToCoords) {
  GeoPolygon p1 = (GeoPolygon) hasSegments;
  switch (AlgoIntersectCS1D2D.getConfigLinePlane(g, p1)) {
   case GENERAL: 
    intersectionsCoordsGeneral(p1, paramToCoords);
    break;
   case CONTAINED: 
    intersectionsCoordsContained(p1, paramToCoords);
    break;
   case PARALLEL: 
    break;
  }
 }
 protected void intersectionsCoordsContained(
   HasSegments poly, TreeMap<Double, Coords> paramToCoords) {
  setIntersectionLine();
  for (int i = 0; i < poly.getSegments().length; i++) {
   GeoSegmentND seg = poly.getSegments()[i];
   Coords o2 = seg.getPointInD(3, 0).getInhomCoordsInSameDimension();
   Coords d2 = seg.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o2);
   Coords[] project = CoordMatrixUtil.nearestPointsFromTwoLines(o1, d1, o2, d2);
   if (project != null && project[0].equalsForKernel(project[1], Kernel.STANDARD_PRECISION)) {
    double t1 = project[2].get(1); 
    double t2 = project[2].get(2); 
    if (checkParameter(t1) && seg.respectLimitedPath(t2)) {
     paramToCoords.put(t1, project[0]);
    }
   }
  }
 }
 protected void intersectionsCoordsGeneral(
   GeoPolygon poly, TreeMap<Double, Coords> paramToCoords) {
  Coords globalCoords = new Coords(4);
  Coords inPlaneCoords = new Coords(4);
  Coords singlePoint =
    AlgoIntersectCS1D2D.getIntersectLinePlane(g, poly, globalCoords, inPlaneCoords);
  if (singlePoint != null) {
   paramToCoords.put(0d, singlePoint);
  }
 }
 protected boolean checkParameter(double t1) {
  return g.respectLimitedPath(t1);
 }
 public void compute() {
  newCoords.clear();
  int index = 0;
  if (((GeoElement) p).isDefined() && getFirstInput().isDefined()) {
   intersectionsCoords(p, newCoords);
   outputPoints.adjustOutputSize(newCoords.size());
   for (Coords coords : newCoords.values()) {
    GeoPointND point = (GeoPointND) outputPoints.getElement(index);
    point.setCoords(coords, false);
    point.updateCoords();
    index++;
   }
  }
  for (; index < outputPoints.size(); index++) {
   outputPoints.getElement(index).setUndefined();
  }
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
 protected void setLabels(String[] labels) {
  if (labels != null
    && labels.length == 1
    && outputPoints.size() > 1
    && labels[0] != null
    && !labels[0].equals("")) {
   outputPoints.setIndexLabels(labels[0]);
  } else {
   outputPoints.setLabels(labels);
  }
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = getFirstInput();
  input[1] = (GeoElement) p;
  setDependencies(); 
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectLineQuadric3D.java
```java
public class AlgoIntersectLineQuadric3D extends AlgoIntersect3D {
 public static final int INTERSECTION_PRODUCING_LINE = 1;
 public static final int INTERSECTION_ASYMPTOTIC_LINE = 2;
 public static final int INTERSECTION_MEETING_LINE = 3;
 public static final int INTERSECTION_TANGENT_LINE = 4;
 public static final int INTERSECTION_SECANT_LINE = 5;
 public static final int INTERSECTION_PASSING_LINE = 6;
 private GeoLineND g; 
 private GeoQuadricND q; 
 private GeoPoint3D[] D; 
 protected GeoPoint3D[] P;
 protected GeoPoint3D[] Q;
 private int intersectionType;
 private boolean permuted;
 AlgoIntersectLineQuadric3D(Construction cons, String label, GeoLineND g, GeoQuadric3D q) {
  this(cons, g, q);
  LabelManager.setLabels(label, P); 
 }
 AlgoIntersectLineQuadric3D(Construction cons, String[] labels, GeoLineND g, GeoQuadric3D q) {
  this(cons, g, q);
  LabelManager.setLabels(labels, P); 
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_INTERSECT;
 }
 AlgoIntersectLineQuadric3D(Construction cons, GeoLineND g, GeoQuadricND q) {
  super(cons);
  this.g = g;
  this.q = q;
  P = new GeoPoint3D[2];
  Q = new GeoPoint3D[2];
  D = new GeoPoint3D[2];
  for (int i = 0; i < 2; i++) {
   P[i] = new GeoPoint3D(cons);
   Q[i] = new GeoPoint3D(cons);
   D[i] = new GeoPoint3D(cons);
  }
  initForNearToRelationship();
  computeNoPermutation();
  if (cons.getApplication().fileVersionBefore(5, 0, 281, 0)) {
   permuted = false;
  } else {
   if (Q[1].isDefined() && !Q[0].isDefined()) {
    permuted = true;
   } else {
    permuted = false;
   }
  }
  setPermutation();
  setInputOutput(); 
 }
 public void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) g;
  input[1] = q;
  setOutput(P);
  noUndefinedPointsInAlgebraView();
  setDependencies(); 
 }
 public final GeoPoint3D[] getIntersectionPoints() {
  return P;
 }
 protected GeoPoint3D[] getLastDefinedIntersectionPoints() {
  return D;
 }
 GeoLineND getLine() {
  return g;
 }
 GeoQuadricND getQuadric() {
  return q;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("IntersectionPointOfAB", q.getLabel(tpl), g.getLabel(tpl));
 }
 public void compute() {
  computeNoPermutation();
  setPermutation();
 }
 private void computeNoPermutation() {
  double[] m = q.getFlatMatrix();
  double v1 = g.getDirectionInD3().getX();
  double v2 = g.getDirectionInD3().getY();
  double v3 = g.getDirectionInD3().getZ();
  double Sv1 = m[0] * v1 + m[4] * v2 + m[5] * v3;
  double Sv2 = m[4] * v1 + m[1] * v2 + m[6] * v3;
  double Sv3 = m[5] * v1 + m[6] * v2 + m[2] * v3;
  double p1 = g.getStartInhomCoords().getX();
  double p2 = g.getStartInhomCoords().getY();
  double p3 = g.getStartInhomCoords().getZ();
  double u = v1 * Sv1 + v2 * Sv2 + v3 * Sv3;
  double b = g.getStartInhomCoords().getX() * Sv1
    + g.getStartInhomCoords().getY() * Sv2
    + g.getStartInhomCoords().getZ() * Sv3
    + m[7] * v1
    + m[8] * v2
    + m[9] * v3;
  double w = p1 * (m[0] * p1 + m[4] * p2 + m[5] * p3 + m[7])
    + p2 * (m[4] * p1 + m[1] * p2 + m[6] * p3 + m[8])
    + p3 * (m[5] * p1 + m[6] * p2 + m[2] * p3 + m[9])
    + m[7] * p1
    + m[8] * p2
    + m[9] * p3
    + m[3];
  if (DoubleUtil.isZero(u)) { 
   if (DoubleUtil.isZero(b)) { 
    if (DoubleUtil.isZero(w)) { 
     Q[0].setUndefined();
     Q[1].setUndefined();
     intersectionType = INTERSECTION_PRODUCING_LINE;
    } else { 
     Q[0].setUndefined();
     Q[1].setUndefined();
     intersectionType = INTERSECTION_ASYMPTOTIC_LINE;
    }
   } else { 
    double t0 = -w / (2.0 * b);
    if (b < 0) {
     Q[0].setCoords(g.getPointInD(3, t0));
     Q[1].setUndefined();
    } else { 
     Q[0].setUndefined();
     Q[1].setCoords(g.getPointInD(3, t0));
    }
    intersectionType = INTERSECTION_MEETING_LINE;
   }
  } else { 
   double dis = b * b - u * w;
   if (DoubleUtil.isZero(dis)) { 
    double t1 = -b / u;
    Q[0].setCoords(g.getPointInD(3, t1));
    Q[1].setCoords(Q[0].getCoords());
    intersectionType = INTERSECTION_TANGENT_LINE;
   } else if (dis > 0) { 
    dis = Math.sqrt(dis);
    boolean swap = b < 0.0;
    if (swap) {
     dis = -dis;
    }
    double n = -(b + dis);
    double t1 = swap ? w / n : n / u;
    double t2 = swap ? n / u : w / n;
    Q[0].setCoords(g.getPointInD(3, t1));
    Q[1].setCoords(g.getPointInD(3, t2));
    intersectionType = INTERSECTION_SECANT_LINE;
   } else { 
    Q[0].setUndefined();
    Q[1].setUndefined();
    intersectionType = INTERSECTION_PASSING_LINE;
   }
  }
  for (int i = 0; i < 2; i++) {
   checkIsOnLine(Q[i]);
  }
 }
 private void setPermutation() {
  if (permuted) {
   P[0].setCoordsFromPoint(Q[1]);
   P[1].setCoordsFromPoint(Q[0]);
  } else {
   P[0].setCoordsFromPoint(Q[0]);
   P[1].setCoordsFromPoint(Q[1]);
  }
 }
 private void checkIsOnLine(GeoPoint3D p) {
  if (!p.isDefined()) {
   return;
  }
  if (!g.respectLimitedPath(p.getCoords(), Kernel.MIN_PRECISION)) {
   p.setUndefined();
  }
 }
 public int getIntersectionType() {
  return intersectionType;
 }
 public final void initForNearToRelationship() {
 }
 protected GeoElement getOutputForCmdXML(int i) {
  if (permuted) {
   if (P[0].isDefined()) {
    if (P[1].isDefined()) {
     return P[1 - i];
    }
    return super.getOutputForCmdXML(i);
   }
   if (P[1].isDefined()) {
    return P[1 - i];
   }
   if (P[1].isLabelSet()) {
    return P[1 - i];
   }
   return super.getOutputForCmdXML(i);
  }
  if (!P[0].isDefined() && P[1].isDefined()) {
   return P[1 - i];
  }
  return super.getOutputForCmdXML(i);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPathLinePolygon3D.java
```java
public class AlgoIntersectPathLinePolygon3D extends AlgoIntersectPathLinePolygon {
 public AlgoIntersectPathLinePolygon3D(
   Construction c, String[] labels, GeoElement geo, GeoElement p) {
  super(c, labels, geo, p);
 }
 public AlgoIntersectPathLinePolygon3D(Construction c, GeoElement geo, GeoElement p) {
  super(c, geo, p);
 }
 public AlgoIntersectPathLinePolygon3D(Construction c) {
  super(c);
 }
 protected OutputHandler<GeoElement> createOutputSegments() {
  return new OutputHandler<>(() -> {
   GeoSegment3D a = new GeoSegment3D(cons);
   GeoPoint3D aS = new GeoPoint3D(cons);
   aS.setCoords(0, 0, 0, 1);
   GeoPoint3D aE = new GeoPoint3D(cons);
   aE.setCoords(0, 0, 0, 1);
   a.setPoints(aS, aE);
   a.setParentAlgorithm(this);
   setSegmentVisualProperties(a);
   return a;
  });
 }
 protected void addCoords(double parameter, Coords coords, GeoElementND geo) {
  newCoords.put(parameter, coords.copyVector());
 }
 protected void addStartEndPoints() {
  if (g instanceof GeoSegmentND) {
   newCoords.put(0.0, g.getStartInhomCoords());
   newCoords.put(1.0, g.getEndInhomCoords());
  } else if (g instanceof GeoRayND) {
   newCoords.put(0d, g.getStartInhomCoords());
  }
 }
 protected boolean checkMidpoint(GeoPolygon poly, Coords a, Coords b) {
  Coords midpoint = poly.getNormalProjection(a.copy().addInside(b).mulInside(0.5))[1];
  return poly.isInRegion(midpoint.getX(), midpoint.getY());
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPathPlanePolygon3D.java
```java
public class AlgoIntersectPathPlanePolygon3D extends AlgoIntersectPathLinePolygon3D {
 protected GeoPlane3D plane;
 public AlgoIntersectPathPlanePolygon3D(
   Construction c, String[] labels, GeoPlane3D plane, GeoElement p) {
  super(c, labels, plane, p);
 }
 public AlgoIntersectPathPlanePolygon3D(Construction c, GeoPlane3D plane, GeoElement p) {
  super(c, plane, p);
 }
 public AlgoIntersectPathPlanePolygon3D(Construction c) {
  super(c);
 }
 protected void setFirstInput(GeoElement geo) {
  this.plane = (GeoPlane3D) geo;
 }
 protected GeoElement getFirstInput() {
  return plane;
 }
 protected void addStartEndPoints() {
 }
 protected void setIntersectionLine() {
  Coords[] intersection = CoordMatrixUtil.intersectPlanes(
    plane.getCoordSys().getMatrixOrthonormal(), p.getCoordSys().getMatrixOrthonormal());
  o1 = intersection[0];
  d1 = intersection[1];
 }
 protected boolean checkParameter(double t1) {
  return true; 
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPathPolygons3D.java
```java
public class AlgoIntersectPathPolygons3D extends AlgoPolygonOperations3D {
 public AlgoIntersectPathPolygons3D(
   Construction cons, String[] labels, GeoPoly inPoly0, GeoPoly inPoly1) {
  super(cons, labels, inPoly0, inPoly1, PolyOperation.INTERSECTION);
  initialize(null);
 }
 public GetCommand getClassName() {
  return Commands.IntersectPath;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlaneConic.java
```java
public class AlgoIntersectPlaneConic extends AlgoIntersectConic3D {
 private Coords[] intersection;
 public AlgoIntersectPlaneConic(Construction cons, GeoCoordSys2D plane, GeoConicND c) {
  super(cons, (GeoElement) plane, c);
 }
 public AlgoIntersectPlaneConic(Construction cons) {
  super(cons);
 }
 public void compute() {
  intersect((GeoCoordSys2D) getFirstGeo(), c, P);
 }
 public final void intersect(GeoCoordSys2D plane, GeoConicND conic, GeoPoint3D[] points) {
  intersection = CoordMatrixUtil.intersectPlanes(
    plane.getCoordSys().getMatrixOrthonormal(), conic.getCoordSys().getMatrixOrthonormal());
  super.intersect(conic, points);
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
 protected Coords getFirstGeoStartInhomCoords() {
  return intersection[0];
 }
 protected Coords getFirstGeoDirectionInD3() {
  return intersection[1];
 }
 protected boolean getFirstGeoRespectLimitedPath(Coords p) {
  return true;
 }
 protected void checkIsOnFirstGeo(GeoPoint3D p) {
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlaneCurve.java
```java
public class AlgoIntersectPlaneCurve extends AlgoIntersectCoordSysCurve {
 private final GeoCoordSys2D plane;
 public AlgoIntersectPlaneCurve(
   Construction cons, GeoCoordSys2D plane, GeoCurveCartesianND c, String[] labels) {
  super(cons);
  outputPoints = createOutputPoints(true);
  this.plane = plane;
  this.curve = c;
  compute();
  setInputOutput(); 
  outputPoints.setLabelsMulti(labels);
  update();
 }
 public void compute() {
  Coords coeffs = plane.getCoordSys().getEquationVector();
  FunctionVariable fv = curve.getFun(0).getFunctionVariable();
  ExpressionNode enx;
  if (DoubleUtil.isZero(coeffs.getW())) {
   enx = new ExpressionNode(kernel, 0);
   for (int i = 0; i < curve.getDimension(); i++) {
    enx = enx.plus(curve.getFun(i).getExpression().multiply(coeffs.get(i + 1)));
   }
  } else {
   enx = new ExpressionNode(kernel, 1);
   for (int i = 0; i < curve.getDimension(); i++) {
    enx = enx.plus(curve.getFun(i).getExpression().multiply(coeffs.get(i + 1) / coeffs.getW()));
   }
  }
  findIntersections(enx, fv);
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = plane.toGeoElement();
  input[1] = curve;
  setDependencies();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlanePolygon.java
```java
public class AlgoIntersectPlanePolygon extends AlgoIntersectLinePolygon3D {
 private GeoPlane3D plane;
 public AlgoIntersectPlanePolygon(
   Construction c, String[] labels, GeoPlane3D plane, GeoPolygon p) {
  super(c, labels, plane, p);
 }
 protected void setFirstInput(GeoElementND geo) {
  this.plane = (GeoPlane3D) geo;
 }
 protected GeoElement getFirstInput() {
  return plane;
 }
 protected void setIntersectionLine() {
  Coords[] intersection = CoordMatrixUtil.intersectPlanes(
    plane.getCoordSys().getMatrixOrthonormal(),
    ((GeoPolygon) p).getCoordSys().getMatrixOrthonormal());
  o1 = intersection[0];
  d1 = intersection[1];
 }
 protected void intersectionsCoords(HasSegments poly, TreeMap<Double, Coords> newCoords) {
  intersectionsCoordsContained(poly, newCoords);
 }
 protected boolean checkParameter(double t1) {
  return true;
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlanePolyhedron.java
```java
public class AlgoIntersectPlanePolyhedron extends AlgoIntersectLinePolygon3D {
 private GeoPlane3D plane;
 public AlgoIntersectPlanePolyhedron(
   Construction c, String[] labels, GeoPlane3D plane, GeoPolyhedron p) {
  super(c, labels, plane, p);
 }
 protected void setFirstInput(GeoElementND geo) {
  this.plane = (GeoPlane3D) geo;
 }
 protected GeoElement getFirstInput() {
  return plane;
 }
 protected void setIntersectionLine() {
 }
 protected void intersectionsCoords(HasSegments poly, TreeMap<Double, Coords> newCoords) {
  for (int i = 0; i < poly.getSegments().length; i++) {
   GeoSegmentND seg = poly.getSegments()[i];
   Coords coords = intersectionCoords(seg);
   if (coords != null) {
    newCoords.put((double) i, coords);
   }
  }
 }
 private Coords intersectionCoords(GeoSegmentND seg) {
  Coords o = seg.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords d = seg.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o);
  Coords globalCoords = new Coords(4);
  Coords inPlaneCoords = new Coords(4);
  o.projectPlaneThruV(plane.getCoordSys().getMatrixOrthonormal(), d, globalCoords, inPlaneCoords);
  if (!DoubleUtil.isZero(globalCoords.getW()) && seg.respectLimitedPath(-inPlaneCoords.get(3))) {
   return globalCoords;
  }
  return null;
 }
 protected boolean checkParameter(double t1) {
  return true;
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlaneQuadric.java
```java
public class AlgoIntersectPlaneQuadric extends AlgoElement3D {
 protected GeoCoordSys2D plane;
 protected GeoQuadricND quadric;
 protected GeoConic3D conic;
 private CoordMatrix cm = new CoordMatrix(3, 3);
 private CoordMatrix tmpMatrix = new CoordMatrix(3, 4);
 private CoordMatrix parametricMatrix;
 AlgoIntersectPlaneQuadric(
   Construction cons, GeoCoordSys2D plane, GeoQuadricND quadric, boolean addToCons) {
  super(cons, addToCons);
  this.plane = plane;
  this.quadric = quadric;
  conic = newConic(cons);
  if (addToCons) {
   end();
  }
 }
 AlgoIntersectPlaneQuadric(Construction cons, GeoCoordSys2D plane, GeoQuadricND quadric) {
  this(cons, plane, quadric, true);
 }
 protected void end() {
  setInputOutput(new GeoElement[] {plane.toGeoElement(), quadric}, new GeoElement[] {conic});
 }
 protected GeoConic3D newConic(Construction cons1) {
  return new GeoConic3D(cons1, true);
 }
 public GeoConic3D getConic() {
  return conic;
 }
 public void compute() {
  conic.setCoordSys(plane.getCoordSys());
  if (!quadric.isDefined() || !plane.isDefined()) {
   conic.setUndefined();
   return;
  }
  intersectPlaneQuadric(plane, quadric, conic);
 }
 private void intersectPlaneQuadric(
   GeoCoordSys2D inputPlane, GeoQuadricND inputQuad, GeoConic3D outputConic) {
  if (parametricMatrix == null) {
   parametricMatrix = new CoordMatrix(4, 3);
  }
  CoordMatrix qm = inputQuad.getSymmetricMatrix();
  CoordMatrix pm = inputPlane.getCoordSys().getParametricMatrix(parametricMatrix);
  cm.setMul(tmpMatrix.setMulT1(pm, qm), pm);
  outputConic.setCoordSys(inputPlane.getCoordSys());
  outputConic.setMatrix(cm);
 }
 public Commands getClassName() {
  return Commands.IntersectPath;
 }
 public final String toString(StringTemplate tpl) {
  StringBuilder sb = new StringBuilder();
  sb.append(
    getLoc().getPlain("IntersectionCurveOfAB", plane.getLabel(tpl), quadric.getLabel(tpl)));
  return sb.toString();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlaneQuadricLimited.java
```java
public class AlgoIntersectPlaneQuadricLimited extends AlgoIntersectPlaneQuadric {
 private AlgoIntersectPlaneConic algoBottom;
 private AlgoIntersectPlaneConic algoTop;
 private GeoPoint3D[] bottomP;
 private GeoPoint3D[] topP;
 private Coords tmpCoords;
 AlgoIntersectPlaneQuadricLimited(Construction cons, GeoPlane3D plane, GeoQuadricND quadric) {
  super(cons, plane, quadric);
 }
 AlgoIntersectPlaneQuadricLimited(
   Construction cons, String label, GeoPlane3D plane, GeoQuadricND quadric) {
  this(cons, plane, quadric);
  conic.setLabel(label);
 }
 protected GeoConic3D newConic(Construction cons1) {
  return new GeoConicSection(cons1, true);
 }
 protected void end() {
  algoBottom = new AlgoIntersectPlaneConic(cons);
  algoTop = new AlgoIntersectPlaneConic(cons);
  cons.removeFromConstructionList(algoBottom);
  cons.removeFromConstructionList(algoTop);
  bottomP = new GeoPoint3D[2];
  for (int i = 0; i < 2; i++) {
   bottomP[i] = new GeoPoint3D(cons);
  }
  topP = new GeoPoint3D[2];
  for (int i = 0; i < 2; i++) {
   topP[i] = new GeoPoint3D(cons);
  }
  super.end();
 }
 protected GeoConicND getBottom() {
  return ((GeoQuadric3DLimited) quadric).getBottom();
 }
 protected GeoConicND getTop() {
  return ((GeoQuadric3DLimited) quadric).getTop();
 }
 protected GeoQuadric3DPart getSide() {
  return ((GeoQuadric3DLimited) quadric).getSide();
 }
 @SuppressWarnings("PMD.AvoidDeeplyNestedIfStmts")
 public void compute() {
  super.compute();
  double[] bottomParameters = setPartPoints(algoBottom, getBottom(), bottomP);
  double[] topParameters = setPartPoints(algoTop, getTop(), topP);
  switch (conic.getType()) {
   case GeoConicNDConstants.CONIC_CIRCLE:
   case GeoConicNDConstants.CONIC_ELLIPSE:
    if (Double.isNaN(bottomParameters[0])) {
     bottomParameters[0] = topParameters[0];
     bottomParameters[1] = topParameters[1];
     topParameters[0] = Double.NaN;
    }
    if (DoubleUtil.isEqual(topParameters[0], topParameters[1])) {
     topParameters[0] = Double.NaN;
    }
    if (Double.isNaN(topParameters[0])) {
     if (!Double.isNaN(bottomParameters[0])) {
      if (DoubleUtil.isEqual(bottomParameters[0], bottomParameters[1])) {
       if (planeOutsideAxis()) { 
        setSinglePoint(bottomP[0], topP[0]);
       } else { 
        bottomParameters[0] = Double.NaN;
       }
      } else {
       double midParameter = (bottomParameters[0] + bottomParameters[1]) / 2;
       PathParameter pp = new PathParameter(midParameter);
       Coords P = new Coords(3);
       conic.pathChangedWithoutCheck(P, pp, false);
       P = conic.getPoint(P.getX(), P.getY(), new Coords(4));
       if (getSide().isInRegion(P)) {
        topParameters[0] = midParameter;
       } else {
        topParameters[0] = midParameter + Math.PI;
        if (midParameter < 0) {
         topParameters[0] = midParameter + Math.PI;
        } else {
         topParameters[0] = midParameter - Math.PI;
        }
       }
       topParameters[1] = topParameters[0];
      }
     } else { 
      if (planeOutsideAxis()) {
       conic.setUndefined();
       return;
      }
     }
    }
    break;
   case GeoConicNDConstants.CONIC_HYPERBOLA:
   case GeoConicNDConstants.CONIC_PARABOLA:
    if (Double.isNaN(bottomParameters[0])) {
     if (Double.isNaN(topParameters[0])) { 
      conic.setUndefined();
     } else if (DoubleUtil.isEqual(topParameters[0], topParameters[1])) { 
      setSinglePoint(topP[0], topP[1]);
     }
    } else if (DoubleUtil.isEqual(bottomParameters[0], bottomParameters[1])) { 
     setSinglePoint(bottomP[0], bottomP[1]);
    }
    break;
   default:
    break;
  }
  GeoConicSection cp = (GeoConicSection) conic;
  cp.setParameters(bottomParameters[0], bottomParameters[1], topParameters[0], topParameters[1]);
 }
 protected double getBottomParameter() {
  return ((GeoQuadric3DLimited) quadric).getBottomParameter();
 }
 protected double getTopParameter() {
  return ((GeoQuadric3DLimited) quadric).getTopParameter();
 }
 private boolean planeOutsideAxis() {
  if (tmpCoords == null) {
   tmpCoords = new Coords(4);
  }
  quadric
    .getMidpoint3D()
    .projectPlaneThruVInPlaneCoords(
      plane.getCoordSys().getMatrixOrthonormal(), quadric.getEigenvec3D(2), tmpCoords);
  double parameter = -tmpCoords.getZ();
  double min = getBottomParameter();
  double max = getTopParameter();
  if (min > max) {
   double m = min;
   min = max;
   max = m;
  }
  if (DoubleUtil.isGreater(min, parameter)) {
   return !DoubleUtil.isEpsilonToX(min - parameter, max - min);
  }
  if (DoubleUtil.isGreater(parameter, max)) {
   return !DoubleUtil.isEpsilonToX(parameter - max, max - min);
  }
  return false;
 }
 private void setSinglePoint(GeoPointND p1, GeoPointND p2) {
  if (p1.isDefined()) {
   conic.setSinglePoint(p1);
  } else {
   conic.setSinglePoint(p2);
  }
 }
 private double[] setPartPoints(AlgoIntersectPlaneConic algo, GeoConicND c, GeoPoint3D[] points) {
  if (!c.isDefined() || c.getType() == GeoConicNDConstants.CONIC_EMPTY) {
   return new double[] {Double.NaN, Double.NaN};
  }
  algo.intersect(plane, c, points);
  if (!points[0].isDefined()) {
   return new double[] {Double.NaN, Double.NaN};
  }
  Coords c0 = points[0].getCoordsInD2(conic.getCoordSys());
  Coords c1 = points[1].getCoordsInD2(conic.getCoordSys());
  double[] ret = new double[2];
  if (c0.equalsForKernel(c1) && conic.getType() == GeoConicNDConstants.CONIC_INTERSECTING_LINES) {
   PathParameter pp = new PathParameter();
   conic.lines[0].doPointChanged(c0, pp);
   ret[0] = PathNormalizer.inverseInfFunction(pp.getT());
   conic.lines[1].doPointChanged(c1, pp);
   ret[1] = PathNormalizer.inverseInfFunction(pp.getT()) + 2;
  } else {
   PathParameter pp = new PathParameter();
   conic.pointChanged(c0, pp, false);
   ret[0] = pp.getT();
   conic.pointChanged(c1, pp, false);
   ret[1] = pp.getT();
  }
  return ret;
 }
 public GeoPoint3D getBottomPoint(int index) {
  return bottomP[index];
 }
 public GeoPoint3D getTopPoint(int index) {
  return topP[index];
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlaneQuadricPart.java
```java
public class AlgoIntersectPlaneQuadricPart extends AlgoIntersectPlaneQuadricLimited {
 private GeoConicND bottom;
 private GeoConicND top;
 private AlgoQuadricEnds algoEnds = null;
 public AlgoIntersectPlaneQuadricPart(Construction cons, GeoPlane3D plane, GeoQuadricND quadric) {
  super(cons, plane, quadric);
 }
 protected void end() {
  if (quadric.getParentAlgorithm() instanceof AlgoQuadricSide) {
   GeoQuadric3DLimited parent =
     ((AlgoQuadricSide) quadric.getParentAlgorithm()).getInputQuadric();
   bottom = parent.getBottom();
   top = parent.getTop();
  } else {
   algoEnds = new AlgoQuadricEnds(cons, quadric);
   cons.removeFromConstructionList(algoEnds);
   bottom = algoEnds.getSection1();
   top = algoEnds.getSection2();
  }
  super.end();
 }
 public void compute() {
  if (algoEnds != null) {
   algoEnds.compute();
  }
  super.compute();
 }
 protected GeoConicND getBottom() {
  return bottom;
 }
 protected GeoConicND getTop() {
  return top;
 }
 protected GeoQuadric3DPart getSide() {
  return (GeoQuadric3DPart) quadric;
 }
 protected double getBottomParameter() {
  return ((GeoQuadric3DPart) quadric).getBottomParameter();
 }
 protected double getTopParameter() {
  return ((GeoQuadric3DPart) quadric).getTopParameter();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPlanes.java
```java
public class AlgoIntersectPlanes extends AlgoIntersectCoordSys implements HasShortSyntax {
 public static final int RESULTCATEGORY_NA = -1;
 public static final int RESULTCATEGORY_GENERAL = 1;
 public static final int RESULTCATEGORY_PARALLEL = 2;
 public static final int RESULTCATEGORY_CONTAINED = 3;
 private boolean shortSyntax = false;
 private Coords o;
 private Coords vn;
 private Coords vnn;
 private Coords vn1;
 private Coords vn2;
 public AlgoIntersectPlanes(Construction cons, String label, GeoPlaneND cs1, GeoPlaneND cs2) {
  super(cons, label, cs1, cs2, false);
 }
 public AlgoIntersectPlanes(Construction cons, GeoPlaneND cs1, GeoPlaneND cs2) {
  super(cons, cs1, cs2, false);
 }
 protected GeoElement3D createIntersection(Construction cons1) {
  GeoLine3D ret = new GeoLine3D(cons1, true);
  o = new Coords(0, 0, 0, 1);
  vn = new Coords(0, 0, 0, 0);
  vnn = new Coords(0, 0, 0, 0);
  vn1 = new Coords(0, 0, 0, 0);
  vn2 = new Coords(0, 0, 0, 0);
  return ret;
 }
 public void compute() {
  CoordSys p1 = ((GeoPlane3D) getCS1()).getCoordSys();
  CoordSys p2 = ((GeoPlane3D) getCS2()).getCoordSys();
  Coords v1 = p1.getEquationVector();
  Coords v2 = p2.getEquationVector();
  vn.setCrossProduct4(v1, v2);
  if (vn.isZero()) {
   getIntersection().setUndefined();
   return;
  }
  vnn.set3(vn);
  vnn.setW(0);
  vnn.normalize();
  vn1.setCrossProduct4(v1, vnn);
  vn1.normalize();
  vn2.setCrossProduct4(v2, vnn);
  vn2.normalize();
  o.setW(1);
  Coords o1 = p1.getOrigin();
  Coords o2 = p2.getOrigin();
  o2.projectPlane(vnn, vn1, vn2, o1, o);
  GeoLine3D l = (GeoLine3D) getIntersection();
  l.setCoord(o, vn);
 }
 public static boolean isIntersectionContained(CoordSys cs1, CoordSys cs2) {
  return getConfigPlanePlane(cs1, cs2) == RESULTCATEGORY_CONTAINED;
 }
 private static int getConfigPlanePlane(CoordSys cs1, CoordSys cs2) {
  if (cs1.getDimension() != 2 || cs2.getDimension() != 2) {
   return RESULTCATEGORY_NA;
  }
  if (cs1.getNormal().crossProduct(cs2.getNormal()).isZero()) {
   if (DoubleUtil.isZero(cs2.getOrigin().sub(cs1.getOrigin()).dotproduct(cs1.getNormal()))) {
    return RESULTCATEGORY_CONTAINED;
   }
   return RESULTCATEGORY_PARALLEL;
  }
  return RESULTCATEGORY_GENERAL;
 }
 protected String getIntersectionTypeString() {
  return "IntersectionLineOfAB";
 }
 public final Commands getClassName() {
  return Commands.IntersectPath;
 }
 public final String getDefinition(StringTemplate tpl) {
  if (shortSyntax) {
   return "(" + getCS1().getLabel(tpl) + "," + getCS2().getLabel(tpl) + ")";
  }
  return super.getDefinition(tpl);
 }
 public void setShortSyntax(boolean shortSyntax) {
  this.shortSyntax = shortSyntax;
 }
 protected boolean hasExpXML(String cmdName) {
  return shortSyntax;
 }
 public final String toExpString(StringTemplate tpl) {
  return getDefinition(tpl);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectPolygons3D.java
```java
public class AlgoIntersectPolygons3D extends AlgoElement3D {
 protected GeoPolygon polyA;
 protected GeoPolygon polyB;
 protected OutputHandler<GeoElement> outputPoints;
 protected ArrayList<Coords> intersectingCoords;
 private GeoSegmentND[] segA;
 private GeoSegmentND[] segB;
 public AlgoIntersectPolygons3D(
   Construction c, String[] labels, GeoPolygon polyA, GeoPolygon polyB) {
  super(c);
  this.polyA = polyA;
  this.polyB = polyB;
  this.outputPoints = createOutputPoints();
  segA = polyA.getSegments();
  segB = polyB.getSegments();
  this.intersectingCoords = new ArrayList<>();
  compute();
  setInputOutput();
  outputPoints.setLabelsMulti(labels);
  update();
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = this.polyA;
  input[1] = this.polyB;
  setDependencies();
 }
 protected OutputHandler<GeoElement> createOutputPoints() {
  return new OutputHandler<>(() -> {
   GeoPoint3D p = new GeoPoint3D(cons);
   p.setCoords(0, 0, 0, 1);
   p.setParentAlgorithm(this);
   return p;
  });
 }
 public void compute() {
  this.intersectingCoords.clear();
  Coords o1, d1, o2, d2;
  Coords[] project;
  for (int i = 0; i < segA.length; i++) {
   o1 = segA[i].getPointInD(3, 0).getInhomCoordsInSameDimension();
   d1 = segA[i].getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o1);
   for (int k = 0; k < segB.length; k++) {
    o2 = segB[k].getPointInD(3, 0).getInhomCoordsInSameDimension();
    d2 = segB[k].getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o2);
    project = CoordMatrixUtil.nearestPointsFromTwoLines(o1, d1, o2, d2);
    if (project != null
      && !Double.isNaN(project[2].get(1))
      && project[0].equalsForKernel(project[1], Kernel.STANDARD_PRECISION)) {
     double t1 = project[2].get(1); 
     double t2 = project[2].get(2); 
     if (t1 > segA[i].getMinParameter() - Kernel.STANDARD_PRECISION
       && t1 < segA[i].getMaxParameter() + Kernel.STANDARD_PRECISION
       && t2 > segB[k].getMinParameter() - Kernel.STANDARD_PRECISION
       && t2 < segB[k].getMaxParameter() + Kernel.STANDARD_PRECISION) {
      intersectingCoords.add(new Coords(project[0]));
     }
    }
   }
  }
  this.outputPoints.adjustOutputSize(
    this.intersectingCoords.size() > 0 ? this.intersectingCoords.size() : 1);
  int index = 0;
  for (; index < this.intersectingCoords.size(); index++) {
   Coords coords = this.intersectingCoords.get(index);
   GeoPoint3D point = (GeoPoint3D) this.outputPoints.getElement(index);
   point.setCoords(coords);
   point.updateCoords();
  }
  for (; index < this.outputPoints.size(); index++) {
   this.outputPoints.getElement(index).setUndefined();
  }
  outputPoints.updateLabels();
 }
 public GetCommand getClassName() {
  return Commands.Intersect;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectQuadricsAsCircle.java
```java
public class AlgoIntersectQuadricsAsCircle extends AlgoElement3D {
 private GeoQuadricND quadric1;
 private GeoQuadricND quadric2;
 protected GeoConic3D circle;
 private Coords o = new Coords(3);
 private Coords v = new Coords(3);
 private Coords vn1 = new Coords(3);
 private Coords vn2 = new Coords(3);
 AlgoIntersectQuadricsAsCircle(
   Construction cons, String[] labels, GeoQuadricND quadric1, GeoQuadricND quadric2) {
  this(cons, quadric1, quadric2);
  if (labels != null && labels.length > 0) {
   circle.setLabel(labels[0]);
  } else {
   circle.setLabel(null);
  }
 }
 AlgoIntersectQuadricsAsCircle(Construction cons, GeoQuadricND quadric1, GeoQuadricND quadric2) {
  super(cons);
  this.quadric1 = quadric1;
  this.quadric2 = quadric2;
  circle = new GeoConic3D(cons, true);
  circle.setCoordSys(new CoordSys(2));
  setInputOutput(new GeoElement[] {quadric1, quadric2}, new GeoElement[] {circle});
  compute();
 }
 public GeoConic3D getConic() {
  return circle;
 }
 public void compute() {
  if (!quadric1.isDefined() || !quadric2.isDefined()) {
   circle.setUndefined();
   return;
  }
  circle.setDefined();
  if (quadric1.getType() == GeoQuadricNDConstants.QUADRIC_SPHERE
    && quadric2.getType() == GeoQuadricNDConstants.QUADRIC_SPHERE) {
   Coords o1 = quadric1.getMidpoint3D();
   double r1 = quadric1.getHalfAxis(0);
   Coords o2 = quadric2.getMidpoint3D();
   double r2 = quadric2.getHalfAxis(0);
   if (o1.equalsForKernel(o2)) {
    if (DoubleUtil.isZero(r1) && DoubleUtil.isZero(r2)) {
     GeoConic3D.setSinglePoint(circle, o1);
     return;
    }
    if (DoubleUtil.isEqual(r1, r2)) {
     circle.setUndefined();
     return;
    }
    circle.empty();
    return;
   }
   v.setSub3(o2, o1);
   v.calcNorm();
   double d = v.getNorm();
   if (DoubleUtil.isGreater(d, r1 + r2)) {
    circle.empty();
    return;
   }
   v.mulInside3(1 / d);
   double x = (d + (r1 * r1 - r2 * r2) / d) / 2;
   o.setAdd3(o1, o.setMul(v, x));
   v.completeOrthonormal3(vn1, vn2);
   CoordSys coordSys = circle.getCoordSys();
   coordSys.resetCoordSys();
   coordSys.addPoint(o);
   coordSys.addVector(vn1);
   coordSys.addVector(vn2);
   coordSys.makeOrthoMatrix(false, false);
   circle.setSphereND(new Coords(0, 0), Math.sqrt(r1 * r1 - x * x));
   return;
  }
  circle.setUndefined();
 }
 public Commands getClassName() {
  return Commands.IntersectConic;
 }
 public final String toString(StringTemplate tpl) {
  StringBuilder sb = new StringBuilder();
  sb.append(getLoc()
    .getPlain("IntersectionCircleOfAB", quadric1.getLabel(tpl), quadric2.getLabel(tpl)));
  return sb.toString();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectRegionPlanePolyhedron.java
```java
public class AlgoIntersectRegionPlanePolyhedron extends AlgoIntersectPathPlanePolygon3D {
 private GeoPolyhedron polyhedron;
 private OutputHandler<GeoPolygon3D> outputPolygons;
 private OutputHandler<GeoPoint3D> outputPoints;
 protected OutputHandler<GeoSegment3D> outputSegmentsPolyhedron;
 private boolean hasLabels = false;
 private TreeSet<Coords> polyhedronVertices;
 private TreeMap<GeoElementND, TreeSet<GeoPolygon>> parentToPolygons;
 private VerticesList verticesList;
 private ArrayList<Vertices> polyhedronFaces;
 private TreeSet<Vertices> checkVerticesList;
 private ArrayList<Segment> segmentCoords;
 private TreeMap<GeoPolygon, ArrayList<Segment>> newCoordsList;
 private int removeSegmentCoordsIndex;
 private GeoPolygon removeSegmentCoordsPolygon;
 protected TreeSet<CoordsWithParent> newCoords3D;
 public static final Comparator<Coords> COORDS_COMPARATOR = (o1, o) -> {
  if (o1.val.length < o.val.length) {
   return -1;
  }
  if (o1.val.length > o.val.length) {
   return 1;
  }
  for (int i = 0; i < o1.val.length; i++) {
   if (DoubleUtil.isGreater(o.val[i], o1.val[i])) {
    return -1;
   }
   if (DoubleUtil.isGreater(o1.val[i], o.val[i])) {
    return 1;
   }
  }
  return 0;
 };
 private static final class CoordsWithParent extends Coords
   implements Comparable<CoordsWithParent> {
  private final GeoElementND parent;
  private final Double parameter;
  private CoordsWithParent(Double parameter, Coords v, GeoElementND parent) {
   super(v);
   this.parent = parent;
   this.parameter = parameter;
  }
  public int compareTo(CoordsWithParent o) {
   if (DoubleUtil.isGreater(parameter, o.parameter)) {
    return 1;
   }
   if (DoubleUtil.isGreater(o.parameter, parameter)) {
    return -1;
   }
   return compareParentTo(o);
  }
  public boolean equals(Object o) {
   if (o instanceof CoordsWithParent) {
    return compareTo((CoordsWithParent) o) == 0;
   }
   return false;
  }
  public int hashCode() {
   return DoubleUtil.hashCode(parameter) ^ parent.hashCode();
  }
  private int compareParentTo(CoordsWithParent o) {
   return parent.toGeoElement().compareTo(o.parent.toGeoElement());
  }
 }
 private TreeSet<GeoPolygon> getPolygons(CoordsWithParent coords) {
  return parentToPolygons.get(coords.parent);
 }
 private static final class Segment {
  private final CoordsWithParent p1;
  private final CoordsWithParent p2;
  private Segment(CoordsWithParent p1, CoordsWithParent p2) {
   this.p1 = p1;
   this.p2 = p2;
  }
 }
 @SuppressWarnings("serial")
 private static class Vertices extends ArrayList<Coords> implements Comparable<Vertices> {
  private int lowest = -1;
  private short direction = 0;
  private int current;
  protected Vertices() {
  }
  public boolean add(Coords e) {
   if (lowest == -1) { 
    lowest = 0; 
   } else {
    if (COORDS_COMPARATOR.compare(e, get(lowest)) < 0) {
     lowest = size();
    }
   }
   return super.add(e);
  }
  private void setDirection() {
   int n1 = lowest - 1;
   int n2 = lowest + 1;
   if (n1 < 0) {
    n1 = size() - 1;
   } else if (n2 >= size()) {
    n2 = 0;
   }
   if (COORDS_COMPARATOR.compare(get(n1), get(n2)) < 0) {
    direction = -1;
   } else {
    direction = 1;
   }
  }
  private Coords next() {
   current += direction;
   if (current >= size()) {
    current = 0;
   } else if (current < 0) {
    current = size() - 1;
   }
   return get(current);
  }
  private void start() {
   current = lowest;
  }
  public int compareTo(Vertices o) {
   if (this.size() < o.size()) {
    return -1;
   }
   if (o.size() < this.size()) {
    return 1;
   }
   if (COORDS_COMPARATOR.compare(get(lowest), o.get(o.lowest)) < 0) {
    return -1;
   }
   if (COORDS_COMPARATOR.compare(get(lowest), o.get(o.lowest)) > 0) {
    return 1;
   }
   start();
   o.start();
   int visited = 0;
   while (visited < size()) {
    Coords thisCoords = next();
    Coords oCoords = o.next();
    if (COORDS_COMPARATOR.compare(thisCoords, oCoords) < 0) {
     return -1;
    }
    if (COORDS_COMPARATOR.compare(thisCoords, oCoords) > 0) {
     return 1;
    }
    visited++;
   }
   return 0;
  }
  public boolean equals(Object obj) {
   return super.equals(obj); 
  }
  public int hashCode() {
   return super.hashCode();
  }
 }
 public AlgoIntersectRegionPlanePolyhedron(Construction c, GeoPlane3D plane, GeoPolyhedron p) {
  this(c, plane, p, false);
 }
 private AlgoIntersectRegionPlanePolyhedron(
   Construction c, GeoPlane3D plane, GeoPolyhedron p, boolean hasLabels) {
  super(c);
  this.hasLabels = hasLabels;
  setFirstInput(plane);
  setSecondInput(p);
  createOutput();
  setInputOutput(); 
 }
 public AlgoIntersectRegionPlanePolyhedron(
   Construction c, String[] labels, GeoPlane3D plane, GeoPolyhedron p, int[] outputSizes) {
  this(c, plane, p, labels != null);
  if (labels == null) {
   outputPolygons.setLabels(null);
   outputPoints.setLabels(null);
   outputSegmentsPolyhedron.setLabels(null);
  } else {
   int labelsLength = labels.length;
   if (labelsLength > 1) {
    if (outputSizes != null) {
     outputPolygons.adjustOutputSize(outputSizes[0], false);
     outputPoints.adjustOutputSize(outputSizes[1], false);
     outputSegmentsPolyhedron.adjustOutputSize(outputSizes[2], false);
     int i1 = 0;
     int i2 = 0;
     while (i1 < outputSizes[0]) {
      outputPolygons.getElement(i1).setLabel(labels[i2]);
      i1++;
      i2++;
     }
     i1 = 0;
     while (i1 < outputSizes[1]) {
      outputPoints.getElement(i1).setLabel(labels[i2]);
      i1++;
      i2++;
     }
     i1 = 0;
     while (i1 < outputSizes[2]) {
      outputSegmentsPolyhedron.getElement(i1).setLabel(labels[i2]);
      i1++;
      i2++;
     }
    } else {
     outputPolygons.setLabels(null);
     outputSegmentsPolyhedron.setLabels(null);
     outputPoints.setLabels(null);
    }
   } else if (labelsLength == 1) {
    outputPolygons.setIndexLabels(labels[0]);
   }
  }
  update();
 }
 protected void setSecondInput(GeoElement geo) {
  this.polyhedron = (GeoPolyhedron) geo;
 }
 protected GeoElement getSecondInput() {
  return polyhedron;
 }
 protected void addCoords(double parameter, Coords coords, GeoElementND parent) {
  Coords c = coords.copyVector();
  newCoords3D.add(new CoordsWithParent(parameter, c, parent));
  if (parent instanceof GeoPointND) {
   polyhedronVertices.add(c);
  }
 }
 protected void setNewCoords() {
  if (newCoordsList == null) {
   newCoordsList = new TreeMap<>();
  } else {
   newCoordsList.clear();
  }
  if (parentToPolygons == null) {
   parentToPolygons = new TreeMap<>();
  } else {
   parentToPolygons.clear();
  }
  if (polyhedronVertices == null) {
   polyhedronVertices = new TreeSet<>(COORDS_COMPARATOR);
  } else {
   polyhedronVertices.clear();
  }
  for (GeoPolygon polygon : polyhedron.getPolygons()) {
   p = polygon;
   setNewCoordsList();
  }
  for (GeoPolygon polygon : polyhedron.getPolygonsLinked()) {
   p = polygon;
   setNewCoordsList();
  }
 }
 private void setNewCoordsList() {
  if (!p.isDefined()) {
   return;
  }
  setIntersectionLine();
  if (d1.isZero() && !DoubleUtil.isZero(o1.getW())) {
   GeoPointND[] points = p.getPointsND();
   Vertices vertices = new Vertices();
   for (GeoPointND point : points) {
    vertices.add(point.getInhomCoordsInD3());
   }
   vertices.setDirection();
   polyhedronFaces.add(vertices);
  } else { 
   if (newCoords3D == null) {
    newCoords3D = new TreeSet<>();
   } else {
    newCoords3D.clear();
   }
   intersectionsCoords(p);
   addPolygonPoints();
   if (newCoords3D.size() > 1) { 
    segmentCoords = getSegmentsCoords();
    if (segmentCoords.size() > 0) {
     newCoordsList.put(p, segmentCoords);
    }
   }
  }
 }
 private ArrayList<Segment> getSegmentsCoords() {
  ArrayList<Segment> ret = new ArrayList<>();
  Iterator<CoordsWithParent> it = newCoords3D.iterator();
  CoordsWithParent b = it.next();
  CoordsWithParent startSegment = null;
  CoordsWithParent endSegment = null;
  while (it.hasNext()) {
   CoordsWithParent a = b;
   b = it.next();
   if (checkMidpoint(p, a, b)) {
    if (startSegment == null) {
     startSegment = a; 
    }
    endSegment = b; 
   } else {
    if (startSegment != null) { 
     addSegment(startSegment, endSegment, ret);
     startSegment = null;
    }
   }
  }
  if (startSegment != null) {
   addSegment(startSegment, endSegment, ret);
  }
  return ret;
 }
 private void addSegment(
   CoordsWithParent startSegment, CoordsWithParent endSegment, ArrayList<Segment> segmentList) {
  segmentList.add(new Segment(startSegment, endSegment));
  addParentToPolygons(startSegment.parent);
  addParentToPolygons(endSegment.parent);
 }
 private void addParentToPolygons(GeoElementND parent) {
  TreeSet<GeoPolygon> polygons = parentToPolygons.get(parent);
  if (polygons == null) {
   polygons = new TreeSet<>();
   parentToPolygons.put(parent, polygons);
  }
  polygons.add(p);
 }
 @SuppressWarnings("serial")
 private static class VerticesList extends ArrayList<ArrayList<Coords>> {
  protected int cumulateSize = 0;
  protected VerticesList() {
  }
  public boolean add(ArrayList<Coords> vertices) {
   cumulateSize += vertices.size();
   return super.add(vertices);
  }
  public void clear() {
   cumulateSize = 0;
   super.clear();
  }
  public boolean equals(Object obj) {
   return super.equals(obj); 
  }
  public int hashCode() {
   return super.hashCode();
  }
 }
 private CoordsWithParent nextVertex(
   GeoPolygon p2, CoordsWithParent startPoint, GeoElementND oldPoint) {
  segmentCoords = newCoordsList.get(p2);
  CoordsWithParent a;
  CoordsWithParent b = null;
  boolean notFound = true;
  int i;
  for (i = 0; i < segmentCoords.size() && notFound; i++) {
   Segment segment = segmentCoords.get(i);
   a = segment.p1;
   if (a.parent == startPoint.parent) {
    b = segment.p2;
    if (b.parent != oldPoint) { 
     notFound = false;
    }
   } else {
    b = a;
    a = segment.p2;
    if (a.parent == startPoint.parent) {
     if (b.parent != oldPoint) { 
      notFound = false;
     }
    }
   }
  }
  if (notFound) {
   b = null;
  } else {
   removeSegmentCoordsIndex = i - 1;
   removeSegmentCoordsPolygon = p2;
  }
  return b;
 }
 private void removeSegmentCoords() {
  removeSegmentCoords(removeSegmentCoordsIndex, removeSegmentCoordsPolygon);
 }
 private void removeSegmentCoords(int index, GeoPolygon p2) {
  segmentCoords.remove(index);
  if (segmentCoords.size() == 0) {
   newCoordsList.remove(p2);
  }
 }
 private CoordsWithParent nextVertex(
   CoordsWithParent startPoint, GeoElementND oldParent, GeoElementND firstParent) {
  CoordsWithParent b;
  CoordsWithParent bFirstPoint = null;
  GeoPolygon pFirstPoint = null;
  int indexFirstPoint = 0;
  if (newCoordsList.containsKey(p)) {
   b = nextVertex(p, startPoint, oldParent);
   if (b != null) {
    if (b.parent == firstParent) { 
     bFirstPoint = b;
     pFirstPoint = p;
     indexFirstPoint = removeSegmentCoordsIndex;
    } else {
     removeSegmentCoords();
     return b;
    }
   }
  }
  TreeSet<GeoPolygon> polySet = getPolygons(startPoint);
  Iterator<GeoPolygon> it = polySet.iterator();
  GeoPolygon p2;
  while (it.hasNext()) {
   p2 = it.next();
   if (p2 != p && newCoordsList.containsKey(p2)) {
    b = nextVertex(p2, startPoint, oldParent);
    if (b != null) { 
     if (b.parent == firstParent) { 
      bFirstPoint = b;
      pFirstPoint = p2;
      indexFirstPoint = removeSegmentCoordsIndex;
     } else { 
      p = p2;
      removeSegmentCoords();
      return b;
     }
    }
   }
  }
  if (bFirstPoint != null) {
   removeSegmentCoords(indexFirstPoint, pFirstPoint);
   p = pFirstPoint;
   return bFirstPoint;
  }
  return null;
 }
 private Vertices addVertices() {
  Vertices vertices = new Vertices();
  segmentCoords = newCoordsList.get(p);
  if (segmentCoords.isEmpty()) {
   newCoordsList.remove(p);
   return null;
  }
  CoordsWithParent firstPoint = segmentCoords.get(0).p1;
  CoordsWithParent startPoint = segmentCoords.get(0).p2;
  removeSegmentCoords(0, p);
  vertices.add(firstPoint);
  GeoElementND oldParent = null;
  while (startPoint.parent != firstPoint.parent) {
   vertices.add(startPoint);
   CoordsWithParent c = nextVertex(startPoint, oldParent, firstPoint.parent);
   if (c == null) {
    return null;
   }
   oldParent = startPoint.parent;
   startPoint = c;
  }
  return vertices;
 }
 private void addPolyhedronVerticesToOutput(
   int indexPolygon0, int indexPoint0, int indexSegment0) {
  int indexPolygon = indexPolygon0;
  int indexSegment = indexSegment0;
  int indexPoint = indexPoint0;
  for (Coords coords : polyhedronVertices) {
   GeoPolygon outputPoly = outputPolygons.getElement(indexPolygon);
   GeoPoint3D point = outputPoints.getElement(indexPoint);
   point.setCoords(coords);
   GeoSegment3D seg = outputSegmentsPolyhedron.getElement(indexSegment);
   seg.modifyInputPolyAndPoints(outputPoly, point, point);
   outputPoly.setPoints(new GeoPoint3D[] {point, point}, null, false); 
   outputPoly.setSegments(new GeoSegment3D[] {seg, seg});
   outputPoly.calcArea();
   indexPolygon++;
   indexPoint++;
   indexSegment++;
  }
 }
 private void addToVerticesList(Vertices vertices) {
  verticesList.add(vertices);
  if (polyhedronVertices.size() > 0) {
   for (Coords coords : vertices) {
    polyhedronVertices.remove(coords);
   }
  }
 }
 private void updateLabels(OutputHandler<?> outputHandler) {
  if (this.hasLabels) {
   outputHandler.updateLabels();
  }
 }
 public void compute() {
  if (verticesList == null) {
   verticesList = new VerticesList();
  } else {
   verticesList.clear();
  }
  if (checkVerticesList == null) {
   checkVerticesList = new TreeSet<>();
  } else {
   checkVerticesList.clear();
  }
  if (polyhedronFaces == null) {
   polyhedronFaces = new ArrayList<>();
  } else {
   polyhedronFaces.clear();
  }
  setNewCoords();
  if (newCoordsList.size() == 0 && polyhedronFaces.size() == 0) { 
   outputPolygons.adjustOutputSize(polyhedronVertices.size(), false);
   outputPoints.adjustOutputSize(polyhedronVertices.size(), false);
   outputSegmentsPolyhedron.adjustOutputSize(polyhedronVertices.size(), false);
   addPolyhedronVerticesToOutput(0, 0, 0);
  } else {
   while (newCoordsList.size() != 0) {
    p = newCoordsList.firstKey();
    Vertices vertices = addVertices();
    if (vertices != null) { 
     vertices.setDirection();
     if (checkVerticesList.add(vertices)) {
      addToVerticesList(vertices);
     }
    }
   }
   for (Vertices vertices : polyhedronFaces) {
    if (checkVerticesList.add(vertices)) {
     addToVerticesList(vertices);
    }
   }
   outputPoints.adjustOutputSize(verticesList.cumulateSize + polyhedronVertices.size(), false);
   int segmentIndex = 0;
   for (ArrayList<Coords> vertices : verticesList) {
    int length = vertices.size();
    for (int i = 0; i < length; i++) {
     GeoPoint3D point = outputPoints.getElement(segmentIndex);
     point.setCoords(vertices.get(i));
     segmentIndex++;
    }
   }
   outputPolygons.adjustOutputSize(verticesList.size() + polyhedronVertices.size(), false);
   GeoPoint3D[] points = new GeoPoint3D[verticesList.cumulateSize];
   points = outputPoints.getOutput(points);
   outputSegmentsPolyhedron.adjustOutputSize(
     verticesList.cumulateSize + polyhedronVertices.size(), false);
   int pointIndex = 0;
   int polygonIndex = 0;
   segmentIndex = 0;
   for (ArrayList<Coords> vertices : verticesList) {
    int length = vertices.size();
    GeoPolygon outputPoly = outputPolygons.getElement(polygonIndex);
    GeoPoint3D[] polyPoints = new GeoPoint3D[length];
    GeoSegment3D[] polySegments = new GeoSegment3D[length];
    for (int i = 0; i < length; i++) {
     outputSegmentsPolyhedron
       .getElement(segmentIndex)
       .modifyInputPolyAndPoints(
         outputPoly, points[pointIndex + i], points[pointIndex + (i + 1) % length]);
     polyPoints[i] = points[pointIndex + i];
     polySegments[i] = outputSegmentsPolyhedron.getElement(segmentIndex);
     segmentIndex++;
    }
    outputPoly.setPoints(polyPoints, null, false); 
    outputPoly.setSegments(polySegments);
    outputPoly.calcArea();
    pointIndex += length;
    polygonIndex++;
   }
   addPolyhedronVerticesToOutput(polygonIndex, pointIndex, segmentIndex);
  }
  updateLabels(outputPoints);
  updateLabels(outputPolygons);
  updateLabels(outputSegmentsPolyhedron);
  hasLabels = false;
 }
 protected boolean checkParameter(double t1) {
  return true; 
 }
 public final Commands getClassName() {
  return Commands.IntersectPath;
 }
 private void createOutput() {
  outputPolygons = new OutputHandler<>(() -> {
   GeoPolygon3D p1 = new GeoPolygon3D(cons, true);
   p1.setParentAlgorithm(this);
   if (outputPolygons.size() > 0) {
    p1.setAllVisualProperties(outputPolygons.getElement(0), false);
   }
   p1.setViewFlags(getFirstInput().getViewSet());
   p1.setVisibleInView3D(getFirstInput());
   p1.setVisibleInViewForPlane(getFirstInput());
   p1.setNotFixedPointsLength(true);
   p1.setOrthoNormalRegionCS();
   if (hasLabels) {
    p1.setInitLabelsCalled(true);
   }
   return p1;
  });
  outputPolygons.adjustOutputSize(1, false);
  outputPoints = new OutputHandler<>(() -> {
   GeoPoint3D newPoint = new GeoPoint3D(cons);
   newPoint.setCoords(0, 0, 0, 1);
   newPoint.setParentAlgorithm(this);
   newPoint.setAuxiliaryObject(true);
   newPoint.setViewFlags(getFirstInput().getViewSet());
   newPoint.setVisibleInView3D(getFirstInput());
   newPoint.setVisibleInViewForPlane(getFirstInput());
   int size = outputPoints.size();
   if (size > 0) { 
    boolean visible = false;
    boolean labelVisible = false;
    for (int i = 0; i < size && !visible && !labelVisible; i++) {
     visible = visible || outputPoints.getElement(i).isEuclidianVisible();
     labelVisible = labelVisible || outputPoints.getElement(i).getLabelVisible();
    }
    newPoint.setEuclidianVisible(visible);
    if (!visible) { 
     newPoint.dontSetEuclidianVisibleBySetParentAlgorithm();
    }
    newPoint.setLabelVisible(labelVisible);
   }
   if (outputPolygons.size() > 0) {
    GeoPolygon polygon = outputPolygons.getElement(0);
    if (polygon.getShowObjectCondition() != null) {
     try {
      newPoint.setShowObjectCondition(polygon.getShowObjectCondition());
     } catch (Exception ignored) {
     }
    }
   }
   return newPoint;
  });
  outputPoints.adjustOutputSize(1, false);
  outputSegmentsPolyhedron = 
    new OutputHandler<>(() -> {
     GeoSegment3D segment = (GeoSegment3D) outputPolygons
       .getElement(0)
       .createSegment(cons, outputPoints.getElement(0), outputPoints.getElement(0), true);
     segment.setAuxiliaryObject(true);
     segment.setViewFlags(getFirstInput().getViewSet());
     segment.setVisibleInView3D(getFirstInput());
     segment.setVisibleInViewForPlane(getFirstInput());
     return segment;
    });
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = getFirstInput();
  input[1] = getSecondInput();
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
  cons.addToAlgorithmList(this);
 }
 protected void getCmdOutputXML(XMLStringBuilder sb, StringTemplate tpl) {
  String sizes =
    outputPolygons.size() + "," + outputPoints.size() + "," + outputSegmentsPolyhedron.size();
  sb.startTag("outputSizes").attr("val", sizes).endTag();
  super.getCmdOutputXML(sb, tpl);
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "IntersectionOfAandB",
      getFirstInput().getLabel(tpl),
      getSecondInput().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoIntersectSingle3D.java
```java
public class AlgoIntersectSingle3D extends AlgoIntersect3D {
 private AlgoIntersect3D algo;
 private int index; 
 private GeoPointND refPoint;
 private GeoPoint3D point;
 private GeoPoint3D[] parentOutput;
 AlgoIntersectSingle3D(String label, AlgoIntersect3D algo, GeoPointND refPoint) {
  super(algo.getConstruction());
  this.algo = algo;
  algo.addUser(); 
  this.refPoint = refPoint;
  point = new GeoPoint3D(algo.getConstruction());
  setInputOutput();
  initForNearToRelationship();
  compute();
  point.setLabel(label);
 }
 AlgoIntersectSingle3D(String label, AlgoIntersect3D algo, int index0) {
  super(algo.getConstruction());
  this.algo = algo;
  algo.addUser(); 
  if (index0 < 0) {
   this.index = 0;
  } else {
   this.index = index0;
  }
  point = new GeoPoint3D(algo.getConstruction());
  setInputOutput();
  initForNearToRelationship();
  compute();
  point.setLabel(label);
 }
 protected boolean showUndefinedPointsInAlgebraView() {
  return true;
 }
 public Commands getClassName() {
  return Commands.Intersect;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_INTERSECT;
 }
 public void setInputOutput() {
  if (refPoint == null) {
   input = new GeoElement[3];
   input[0] = algo.getInput()[0];
   input[1] = algo.getInput()[1];
   input[2] = new GeoNumeric(cons, index + 1);
  } else {
   input = new GeoElement[3];
   input[0] = algo.getInput()[0];
   input[1] = algo.getInput()[1];
   input[2] = (GeoElement) refPoint;
  }
  setOnlyOutput(point);
  setDependencies(); 
 }
 public GeoPoint3D getPoint() {
  return point;
 }
 public GeoPoint3D[] getIntersectionPoints() {
  return (GeoPoint3D[]) getOutput();
 }
 protected GeoPoint3D[] getLastDefinedIntersectionPoints() {
  return null;
 }
 public boolean isNearToAlgorithm() {
  return true;
 }
 public final void initForNearToRelationship() {
  parentOutput = algo.getIntersectionPoints();
  algo.initForNearToRelationship();
  algo.setIntersectionPoint(index, point);
  algo.compute();
 }
 public void compute() {
  parentOutput = algo.getIntersectionPoints();
  if (refPoint != null) {
   if (refPoint.isDefined()) {
    index = algo.getClosestPointIndex(refPoint);
   }
  }
  if (input[0].isDefined() && input[1].isDefined() && index < parentOutput.length) {
   point.setCoords(parentOutput[index].getCoords());
  } else {
   point.setUndefined();
  }
 }
 public void remove() {
  super.remove();
  algo.removeUser(); 
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoJoinPoints3D.java
```java
public class AlgoJoinPoints3D extends AlgoElement3D implements AlgoJoinPointsSegmentInterface {
 private GeoPointND P;
 private GeoPointND Q;
 private GeoElement poly;
 protected GeoCoordSys1D cs;
 protected GeoClass geoClassType;
 public AlgoJoinPoints3D(
   Construction cons, String label, GeoPointND P, GeoPointND Q, GeoClass geoClassType) {
  this(cons, label, P, Q, null, geoClassType);
 }
 AlgoJoinPoints3D(
   Construction cons,
   String label,
   GeoPointND P,
   GeoPointND Q,
   GeoElement poly,
   GeoClass geoClassType) {
  this(cons, P, Q, poly, geoClassType);
  cs.setLabel(label);
 }
 public AlgoJoinPoints3D(
   Construction cons, GeoPointND P, GeoPointND Q, GeoElement poly, GeoClass geoClassType) {
  super(cons);
  if (poly != null) {
   setUpdateAfterAlgo(poly.getParentAlgorithm());
  }
  this.P = P;
  this.Q = Q;
  this.poly = poly;
  this.geoClassType = geoClassType;
  switch (geoClassType) {
   case SEGMENT3D:
    cs = new GeoSegment3D(cons, P, Q);
    if (poly != null) {
     ((GeoSegment3D) cs).setFromMeta(poly);
    }
    break;
   case LINE3D:
    cs = new GeoLine3D(cons, P, Q);
    break;
   case RAY3D:
    cs = new GeoRay3D(cons, P, Q);
    break;
   default:
    cs = null;
  }
  setInputOutput();
  compute();
 }
 protected void setInputOutput() {
  if (poly == null) {
   setInputOutput(new GeoElement[] {(GeoElement) P, (GeoElement) Q}, new GeoElement[] {cs});
  } else {
   setInputOutput(
     new GeoElement[] {(GeoElement) P, (GeoElement) Q, poly},
     new GeoElement[] {(GeoElement) P, (GeoElement) Q},
     cs);
  }
 }
 public GeoPointND getP() {
  return P;
 }
 public GeoPointND getQ() {
  return Q;
 }
 public GeoCoordSys1D getCS() {
  return cs;
 }
 public void compute() {
  if (poly != null) {
   if (!poly.isDefined()) {
    cs.setUndefined();
   }
  }
  if ((P.isDefined() || P.isInfinite()) && (Q.isDefined() || Q.isInfinite())) {
   cs.setCoord(P, Q);
  } else {
   cs.setUndefined();
  }
 }
 public void remove() {
  if (removed) {
   return;
  }
  super.remove();
  if (poly != null) {
   poly.remove();
  }
 }
 public void modifyInputPoints(GeoPointND A, GeoPointND B) {
  if ((P == A && Q == B) || (Q == A && P == B)) {
   return;
  }
  for (int i = 0; i < input.length; i++) {
   input[i].removeAlgorithm(this);
  }
  P = A;
  Q = B;
  cs.setCoord(P, Q);
  setInputOutput();
  compute();
 }
 public void modifyInputPolyAndPoints(GeoElement p, GeoPointND A, GeoPointND B) {
  if ((p == poly && P == A && Q == B) || (Q == A && P == B)) {
   return;
  }
  for (int i = 0; i < input.length; i++) {
   input[i].removeAlgorithm(this);
  }
  poly = p;
  P = A;
  Q = B;
  cs.setCoord(P, Q);
  setInputOutput();
  compute();
 }
 public Commands getClassName() {
  switch (geoClassType) {
   case SEGMENT3D:
    return Commands.Segment;
   case LINE3D:
    return Commands.Line;
   case RAY3D:
    return Commands.Ray;
  }
  return null;
 }
 public final String toString(StringTemplate tpl) {
  StringBuilder sb = new StringBuilder();
  switch (geoClassType) {
   case SEGMENT3D:
    sb.append(getLoc().getPlain("SegmentAB", P.getLabel(tpl), Q.getLabel(tpl)));
    break;
   default:
   case LINE3D:
    sb.append(getLoc().getPlain("LineAB", P.getLabel(tpl), Q.getLabel(tpl)));
    break;
   case RAY3D:
    sb.append(getLoc().getPlain("RayThroughAB", P.getLabel(tpl), Q.getLabel(tpl)));
    break;
  }
  return sb.toString();
 }
 public GeoElement getPoly() {
  return poly;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLengthPoint3D.java
```java
public class AlgoLengthPoint3D extends AlgoElement {
 private GeoPointND p; 
 private GeoNumeric num; 
 public AlgoLengthPoint3D(Construction cons, String label, GeoPointND p) {
  super(cons);
  this.p = p;
  num = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
  num.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.Length;
 }
 protected void setInputOutput() {
  input = new GeoElement[1];
  input[0] = (GeoElement) p;
  setOnlyOutput(num);
  setDependencies(); 
 }
 public GeoNumeric getLength() {
  return num;
 }
 public final void compute() {
  Coords coords = p.getInhomCoordsInD3();
  num.setValue(MyMath.length(coords.getX(), coords.getY(), coords.getZ()));
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("LengthOfA", p.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLengthVector3D.java
```java
public class AlgoLengthVector3D extends AlgoElement {
 private GeoVectorND v; 
 private GeoNumeric num; 
 AlgoLengthVector3D(Construction cons, String label, GeoVectorND v) {
  super(cons);
  this.v = v;
  num = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
  num.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.Length;
 }
 protected void setInputOutput() {
  input = new GeoElement[1];
  input[0] = (GeoElement) v;
  setOnlyOutput(num);
  setDependencies(); 
 }
 GeoNumeric getLength() {
  return num;
 }
 public final void compute() {
  Coords coords = v.getDirectionInD3();
  coords.calcNorm();
  num.setValue(coords.getNorm());
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("LengthOfA", v.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLineBisectorSegmentDirection3D.java
```java
public class AlgoLineBisectorSegmentDirection3D extends AlgoElement3D {
 private GeoSegmentND segment; 
 private GeoDirectionND direction; 
 private GeoLine3D line; 
 private Coords d = new Coords(3);
 private Coords midpoint = new Coords(3);
 public AlgoLineBisectorSegmentDirection3D(
   Construction cons, String label, GeoSegmentND segment, GeoDirectionND direction) {
  super(cons);
  this.segment = segment;
  this.direction = direction;
  line = new GeoLine3D(cons);
  setInputOutput(
    new GeoElement[] {(GeoElement) segment, (GeoElement) direction}, new GeoElement[] {line});
  compute();
  line.setLabel(label);
 }
 public GeoLine3D getLine() {
  return line;
 }
 public Commands getClassName() {
  return Commands.LineBisector;
 }
 public void compute() {
  if (direction == kernel.getSpace()) {
   line.setUndefined();
   return;
  }
  d.setCrossProduct3(segment.getDirectionInD3(), direction.getDirectionInD3());
  if (d.isZero()) {
   line.setUndefined();
  } else {
   midpoint
     .setAdd(segment.getStartInhomCoords(), segment.getEndInhomCoords())
     .mulInside3(0.5);
   line.setCoord(midpoint, d);
  }
 }
 public String toString(StringTemplate tpl) {
  if (direction instanceof GeoCoordSys2D) {
   return getLoc()
     .getPlain("LineBisectorOfAParallelToB", segment.getLabel(tpl), direction.getLabel(tpl));
  }
  return getLoc()
    .getPlain(
      "LineBisectorOfAPerpendicularToB", segment.getLabel(tpl), direction.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLineBisectorTwoPointsDirection3D.java
```java
public class AlgoLineBisectorTwoPointsDirection3D extends AlgoElement3D {
 private GeoPointND a;
 private GeoPointND b;
 private GeoDirectionND direction;
 private GeoLine3D line; 
 private Coords d = new Coords(3);
 private Coords d1 = new Coords(3);
 private Coords midpoint = new Coords(3);
 public AlgoLineBisectorTwoPointsDirection3D(
   Construction cons, String label, GeoPointND a, GeoPointND b, GeoDirectionND direction) {
  super(cons);
  this.a = a;
  this.b = b;
  this.direction = direction;
  line = new GeoLine3D(cons);
  setInputOutput(
    new GeoElement[] {(GeoElement) a, (GeoElement) b, (GeoElement) direction},
    new GeoElement[] {line});
  compute();
  line.setLabel(label);
 }
 public GeoLine3D getLine() {
  return line;
 }
 public Commands getClassName() {
  return Commands.LineBisector;
 }
 public void compute() {
  if (direction == kernel.getSpace()) {
   line.setUndefined();
   return;
  }
  Coords ca = a.getInhomCoordsInD3();
  Coords cb = b.getInhomCoordsInD3();
  d1.setSub3(cb, ca);
  d.setCrossProduct3(d1, direction.getDirectionInD3());
  if (d.isZero()) {
   line.setUndefined();
  } else {
   midpoint.setAdd3(ca, cb).mulInside3(0.5);
   line.setCoord(midpoint, d);
  }
 }
 public String toString(StringTemplate tpl) {
  if (direction instanceof GeoCoordSys2D) {
   return getLoc()
     .getPlain(
       "PerpendicularBisectorOfAParallelToB",
       a.getLabel(tpl) + b.getLabel(tpl),
       direction.getLabel(tpl));
  }
  return getLoc()
    .getPlain(
      "PerpendicularBisectorOfAPerpendicularToB",
      a.getLabel(tpl) + b.getLabel(tpl),
      direction.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLinePoint.java
```java
public abstract class AlgoLinePoint extends AlgoElement3D {
 private GeoPointND point; 
 private GeoElement inputParallel; 
 private GeoLine3D line; 
 public AlgoLinePoint(Construction cons, GeoPointND point, GeoElement inputParallel) {
  super(cons);
  this.point = point;
  this.inputParallel = inputParallel;
  line = createLine(cons);
  line.showUndefinedInAlgebraView(true);
  setInputOutput(new GeoElement[] {(GeoElement) point, inputParallel}, new GeoElement[] {line});
  compute();
 }
 public AlgoLinePoint(Construction cons) {
  super(cons);
 }
 protected GeoLine3D createLine(Construction cons1) {
  return new GeoLine3D(cons1);
 }
 public GeoLine3D getLine() {
  return line;
 }
 protected GeoPointND getPoint() {
  return point;
 }
 protected GeoElement getInputParallel() {
  return inputParallel;
 }
 public final void compute() {
  Coords v = getDirection();
  if (v.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   getLine().setUndefined();
  } else {
   getLine().setCoord(getPoint().getInhomCoordsInD3(), v.normalize());
  }
 }
 protected abstract Coords getDirection();
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("LineThroughAParallelToB", point.getLabel(tpl), inputParallel.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLinePointLine3D.java
```java
public class AlgoLinePointLine3D extends AlgoLinePoint {
 public AlgoLinePointLine3D(Construction cons, GeoPointND point, GeoLineND line) {
  super(cons, point, (GeoElement) line);
 }
 public Commands getClassName() {
  return Commands.Line;
 }
 protected Coords getDirection() {
  return getInputParallel().getMainDirection();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLinePointVector3D.java
```java
public class AlgoLinePointVector3D extends AlgoLinePoint {
 public AlgoLinePointVector3D(Construction cons, GeoPointND point, GeoVectorND v) {
  super(cons, point, (GeoElement) v);
 }
 public Commands getClassName() {
  return Commands.Line;
 }
 protected Coords getDirection() {
  return ((GeoVectorND) getInputParallel()).getCoordsInD3();
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "LineThroughAwithDirectionB",
      getPoint().getLabel(tpl),
      getInputParallel().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLocus3D.java
```java
public class AlgoLocus3D extends AlgoLocusND<MyPoint3D> {
 private double[] maxZdist;
 private double[] farZmin;
 private double[] farZmax;
 private double lastZ;
 private static int MAX_Z_PIXEL_DIST = MAX_X_PIXEL_DIST;
 public AlgoLocus3D(
   Construction cons, GeoPointND Q, GeoPointND P, int min_steps, boolean registerCE) {
  super(cons, Q, P, min_steps, registerCE);
 }
 public AlgoLocus3D(Construction cons, String label, GeoPointND Q, GeoPointND P) {
  super(cons, label, Q, P);
 }
 protected void createMaxDistances() {
  super.createMaxDistances();
  maxZdist = new double[3];
  farZmin = new double[3];
  farZmax = new double[3];
 }
 protected void setMaxDistances(int i) {
  super.setMaxDistances(i);
  if (i == 2) { 
   maxZdist[i] = MAX_Z_PIXEL_DIST / kernel.getZscale(i);
   double zmin = kernel.getZmin(i);
   double zmax = kernel.getZmax(i);
   double widthRW = zmax - zmin;
   farZmin[i] = zmin - widthRW / 2;
   farZmax[i] = zmax + widthRW / 2;
  } else {
   maxZdist[i] = Double.POSITIVE_INFINITY; 
   farZmin[i] = Double.NEGATIVE_INFINITY;
   farZmax[i] = Double.POSITIVE_INFINITY;
  }
 }
 protected void createStartPos(Construction cons1) {
  startQPos = new GeoPoint3D(cons1);
  if (movingPoint.isGeoElement3D()) {
   startPPos = new GeoPoint3D(cons1);
  } else {
   startPPos = new GeoPoint(cons1);
  }
 }
 protected GeoLocus3D newGeoLocus(Construction cons1) {
  return new GeoLocus3D(cons1);
 }
 protected boolean isFarAway(GeoPointND point, int i) {
  Coords coords = point.getInhomCoordsInD3();
  return isFarAway(coords.getX(), coords.getY(), coords.getZ(), i);
 }
 protected boolean distanceOK(GeoPointND point, int i) {
  final double[] min = {farXmin[i], farYmin[i], farZmin[i]};
  final double[] max = {farXmax[i], farYmax[i], farZmax[i]};
  Coords coords = point.getInhomCoordsInD3();
  double minX = lastX;
  double minY = lastY;
  double minZ = lastZ;
  double maxX = coords.getX();
  double maxY = coords.getY();
  double maxZ = coords.getZ();
  if (coords.getX() < minX) {
   minX = coords.getX();
   maxX = lastX;
  }
  if (coords.getY() < minY) {
   minY = coords.getY();
   maxY = lastY;
  }
  if (coords.getZ() < minZ) {
   minZ = coords.getZ();
   maxZ = lastZ;
  }
  boolean ok2d = !MyMath.intervalsIntersect(minX, maxX, min[0], max[0])
    || !MyMath.intervalsIntersect(minY, maxY, min[1], max[1]);
  return i < 2 ? ok2d : (ok2d || !MyMath.intervalsIntersect(minZ, maxZ, min[2], max[2]));
 }
 protected boolean distanceSmall(GeoPointND point, boolean orInsteadOfAnd) {
  Coords coords = point.getInhomCoordsInD3();
  boolean[] distSmall = new boolean[3];
  for (int i = 0; i < distSmall.length; i++) {
   distSmall[i] = Math.abs(coords.getX() - lastX) < maxXdist[i]
     && Math.abs(coords.getY() - lastY) < maxYdist[i]
     && Math.abs(coords.getZ() - lastZ) < maxZdist[i];
  }
  if (orInsteadOfAnd) {
   for (int i = 0; i < distSmall.length; i++) {
    if (distSmall[i] && visibleEV[i]) {
     return true;
    }
   }
   return false;
  }
  for (int i = 0; i < distSmall.length; i++) {
   if (!distSmall[i] && visibleEV[i]) {
    return false;
   }
  }
  return true;
 }
 protected void insertPoint(GeoPointND point, boolean lineTo) {
  Coords coords = point.getInhomCoordsInD3();
  insertPoint(coords.getX(), coords.getY(), coords.getZ(), lineTo);
 }
 private void insertPoint(double x, double y, double z, boolean lineTo) {
  pointCount++;
  locus.insertPoint(x, y, z, lineTo);
  lastX = x;
  lastY = y;
  lastZ = z;
  for (int i = 0; i < lastFarAway.length; i++) {
   lastFarAway[i] = isFarAway(lastX, lastY, lastZ, i);
  }
 }
 private boolean isFarAway(double x, double y, double z, int i) {
  return x > farXmax[i]
    || x < farXmin[i]
    || y > farYmax[i]
    || y < farYmin[i]
    || z > farZmax[i]
    || z < farZmin[i];
 }
 protected boolean differentFromLast(GeoPointND point) {
  Coords coords = point.getInhomCoordsInD3();
  return coords.getX() != lastX || coords.getY() != lastY || coords.getZ() != lastZ;
 }
 protected boolean areEqual(GeoPointND p1, GeoPointND p2) {
  return p1.isEqual(p2);
 }
 protected MyPoint3D[] createQCopyCache(int length) {
  return new MyPoint3D[length];
 }
 protected void setQCopyCache(MyPoint3D copy, GeoPointND point) {
  Coords coords = point.getInhomCoordsInD3();
  copy.setLocation(coords.getX(), coords.getY(), coords.getZ());
 }
 protected MyPoint3D newCache() {
  return new MyPoint3D();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoLocusSlider3D.java
```java
public class AlgoLocusSlider3D extends AlgoLocusSliderND<MyPoint3D> {
 private double[] maxZdist;
 private double[] farZmin;
 private double[] farZmax;
 private double lastZ;
 private static int MAX_Z_PIXEL_DIST = MAX_X_PIXEL_DIST;
 public AlgoLocusSlider3D(Construction cons, String label, GeoPointND Q, GeoNumeric P) {
  super(cons, label, Q, P);
 }
 protected void createMaxDistances() {
  super.createMaxDistances();
  maxZdist = new double[3];
  farZmin = new double[3];
  farZmax = new double[3];
 }
 protected void setMaxDistances(int i) {
  super.setMaxDistances(i);
  if (i == 2) { 
   maxZdist[i] = MAX_Z_PIXEL_DIST / kernel.getZscale(i);
   double zmin = kernel.getZmin(i);
   double zmax = kernel.getZmax(i);
   double widthRW = zmax - zmin;
   farZmin[i] = zmin - widthRW / 2;
   farZmax[i] = zmax + widthRW / 2;
  } else {
   maxZdist[i] = Double.POSITIVE_INFINITY;
   farZmin[i] = Double.NEGATIVE_INFINITY;
   farZmax[i] = Double.POSITIVE_INFINITY;
  }
 }
 protected void createStartPos(Construction cons1) {
  startQPos = new GeoPoint3D(cons1);
 }
 protected GeoLocus3D newGeoLocus(Construction cons1) {
  return new GeoLocus3D(cons1);
 }
 protected boolean distanceOK(GeoPointND point, int i) {
  final double[] min = {farXmin[i], farYmin[i], farZmin[i]};
  final double[] max = {farXmax[i], farYmax[i], farZmax[i]};
  Coords coords = point.getInhomCoordsInD3();
  double minX = lastX;
  double minY = lastY;
  double minZ = lastZ;
  double maxX = coords.getX();
  double maxY = coords.getY();
  double maxZ = coords.getZ();
  if (coords.getX() < minX) {
   minX = coords.getX();
   maxX = lastX;
  }
  if (coords.getY() < minY) {
   minY = coords.getY();
   maxY = lastY;
  }
  if (coords.getZ() < minZ) {
   minZ = coords.getZ();
   maxZ = lastZ;
  }
  boolean ok2d = !MyMath.intervalsIntersect(minX, maxX, min[0], max[0])
    || !MyMath.intervalsIntersect(minY, maxY, min[1], max[1]);
  return i < 2 ? ok2d : (ok2d || !MyMath.intervalsIntersect(minZ, maxZ, min[2], max[2]));
 }
 protected boolean distanceSmall(GeoPointND point, boolean orInsteadOfAnd) {
  Coords coords = point.getInhomCoordsInD3();
  boolean[] distSmall = new boolean[3];
  for (int i = 0; i < distSmall.length; i++) {
   distSmall[i] = Math.abs(coords.getX() - lastX) < maxXdist[i]
     && Math.abs(coords.getY() - lastY) < maxYdist[i]
     && Math.abs(coords.getZ() - lastZ) < maxZdist[i];
  }
  if (orInsteadOfAnd) {
   for (int i = 0; i < distSmall.length; i++) {
    if (distSmall[i] && visibleEV[i]) {
     return true;
    }
   }
   return false;
  }
  for (int i = 0; i < distSmall.length; i++) {
   if (!distSmall[i] && visibleEV[i]) {
    return false;
   }
  }
  return true;
 }
 protected void insertPoint(GeoPointND point, boolean lineTo) {
  Coords coords = point.getInhomCoordsInD3();
  insertPoint(coords.getX(), coords.getY(), coords.getZ(), lineTo);
 }
 private void insertPoint(double x, double y, double z, boolean lineTo) {
  pointCount++;
  locus.insertPoint(x, y, z, lineTo);
  lastX = x;
  lastY = y;
  lastZ = z;
  for (int i = 0; i < lastFarAway.length; i++) {
   lastFarAway[i] = isFarAway(lastX, lastY, lastZ, i);
  }
 }
 private boolean isFarAway(double x, double y, double z, int i) {
  return x > farXmax[i]
    || x < farXmin[i]
    || y > farYmax[i]
    || y < farYmin[i]
    || z > farZmax[i]
    || z < farZmin[i];
 }
 protected boolean differentFromLast(GeoPointND point) {
  Coords coords = point.getInhomCoordsInD3();
  return coords.getX() != lastX || coords.getY() != lastY || coords.getZ() != lastZ;
 }
 protected boolean areEqual(GeoPointND p1, GeoPointND p2) {
  return p1.isEqual(p2);
 }
 protected MyPoint3D[] createQCopyCache() {
  return new MyPoint3D[paramCache.length];
 }
 protected void setQCopyCache(MyPoint3D copy, GeoPointND point) {
  Coords coords = point.getInhomCoordsInD3();
  copy.setLocation(coords.getX(), coords.getY(), coords.getZ());
 }
 protected MyPoint3D newCache() {
  return new MyPoint3D();
 }
 protected boolean isFarAway(GeoPointND point, int i) {
  Coords coords = point.getInhomCoordsInD3();
  return isFarAway(coords.getX(), coords.getY(), coords.getZ(), i);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoMidpoint3D.java
```java
public class AlgoMidpoint3D extends AlgoMidpointND {
 private Coords tmpCoords;
 public AlgoMidpoint3D(Construction cons, GeoPointND P, GeoPointND Q) {
  super(cons, P, Q);
 }
 public AlgoMidpoint3D(Construction cons, GeoSegmentND segment) {
  super(cons, segment);
 }
 protected GeoPointND newGeoPoint(Construction cons1) {
  tmpCoords = Coords.createInhomCoorsInD3();
  return new GeoPoint3D(cons1);
 }
 public GeoPoint3D getPoint() {
  return (GeoPoint3D) super.getPoint();
 }
 protected void copyCoords(GeoPointND point) {
  getPoint().setCoords(point.getCoordsInD3());
 }
 protected void computeMidCoords() {
  tmpCoords.setAdd3(getP().getInhomCoordsInD3(), getQ().getInhomCoordsInD3()).mulInside3(0.5);
  getPoint().setCoords(tmpCoords);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoMidpointSegment3D.java
```java
public class AlgoMidpointSegment3D extends AlgoMidpoint3D {
 private GeoSegmentND segment;
 AlgoMidpointSegment3D(Construction cons, GeoSegmentND segment) {
  super(cons, segment);
  this.segment = segment;
  setInputOutput();
  compute();
 }
 protected void setInputOutput() {
  input = new GeoElement[1];
  input[0] = (GeoElement) segment;
  setOnlyOutput(getPoint());
  setDependencies(); 
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("MidpointOfA", segment.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoMirror3D.java
```java
public class AlgoMirror3D extends AlgoMirror {
 private GeoCoordSys2D mirrorPlane;
 public AlgoMirror3D(Construction cons, GeoElement in, GeoPointND point) {
  super(cons, in, point);
 }
 public AlgoMirror3D(Construction cons, GeoElement in, GeoLineND line) {
  super(cons, in, line);
 }
 public AlgoMirror3D(Construction cons, GeoElement in, GeoCoordSys2D plane) {
  super(cons);
  mirrorPlane = plane;
  endOfConstruction(cons, in, (GeoElement) plane);
 }
 protected void computeRegardingMirror() {
  if (mirror == mirrorPlane) {
   if (out instanceof MirrorableAtPlane) {
    ((MirrorableAtPlane) out).mirror(mirrorPlane);
   } else {
    out.setUndefined();
   }
  } else {
   super.computeRegardingMirror();
  }
 }
 protected GeoElement copy(GeoElement geo) {
  if (mirror.isGeoElement3D()) {
   Log.debug("COPY " + geo.getGeoClassType());
   return kernel.copy3D(geo);
  }
  return super.copy(geo);
 }
 protected GeoElement getResultTemplate(GeoElement geo) {
  if ((geo instanceof GeoFunction || geo instanceof GeoCurveCartesian)
    && mirror.isGeoElement3D()) {
   return new GeoCurveCartesian3D(cons);
  }
  if (geo instanceof GeoFunctionNVar && mirror != mirrorPoint) {
   return new GeoSurfaceCartesian3D(cons);
  }
  return super.getResultTemplate(geo);
 }
 protected GeoElement copyInternal(Construction cons1, GeoElement geo) {
  if (mirror.isGeoElement3D()) {
   return kernel.copyInternal3D(cons1, geo);
  }
  return super.copyInternal(cons1, geo);
 }
 protected void setOutGeo() {
  if (inGeo instanceof GeoFunction && mirror.isGeoElement3D()) {
   AlgoTransformation3D.toGeoCurveCartesian(
     kernel, (GeoFunction) inGeo, (GeoCurveCartesian3D) outGeo);
  } else if (inGeo instanceof GeoFunctionNVar && mirror != mirrorPoint) {
   AlgoTransformation3D.toGeoSurfaceCartesian(
     kernel, (GeoFunctionNVar) inGeo, (GeoSurfaceCartesian3D) outGeo);
  } else {
   super.setOutGeo();
  }
 }
 protected Coords getMirrorCoords() {
  return mirrorPoint.getInhomCoordsInD3();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrientedHeight.java
```java
public class AlgoOrientedHeight extends AlgoElement {
 private HasHeight c; 
 private GeoNumeric num; 
 public AlgoOrientedHeight(Construction cons, HasHeight c) {
  super(cons);
  this.c = c;
  num = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
 }
 public Commands getClassName() {
  return Commands.Height;
 }
 protected void setInputOutput() {
  input = new GeoElement[1];
  input[0] = (GeoElement) c;
  setOnlyOutput(num);
  setDependencies(); 
 }
 public GeoNumeric getOrientedHeight() {
  return num;
 }
 public final void compute() {
  if (!((GeoElement) c).isDefined()) {
   num.setUndefined();
  } else {
   num.setValue(c.getOrientedHeight());
  }
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("HeightOfA", ((GeoElement) c).getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrtho.java
```java
public abstract class AlgoOrtho extends AlgoElement3D {
 protected GeoPointND point; 
 protected GeoElement inputOrtho; 
 protected GeoLine3D line; 
 public AlgoOrtho(Construction cons, String label, GeoPointND point, GeoElement ortho) {
  super(cons);
  this.point = point;
  this.inputOrtho = ortho;
  line = new GeoLine3D(cons);
  setSpecificInputOutput();
  compute();
  line.setLabel(label);
 }
 protected void setSpecificInputOutput() {
  setInputOutput(new GeoElement[] {(GeoElement) point, inputOrtho}, new GeoElement[] {line});
 }
 public GeoLine3D getLine() {
  return line;
 }
 protected GeoPointND getPoint() {
  return point;
 }
 protected GeoElement getInputOrtho() {
  return inputOrtho;
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("LineThroughAPerpendicularToB", point.getLabel(tpl), inputOrtho.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoLineLine.java
```java
public abstract class AlgoOrthoLineLine extends AlgoElement3D {
 protected GeoLineND line1; 
 private GeoLine3D line; 
 protected Coords origin;
 protected Coords direction2;
 protected Coords origin1;
 protected Coords direction1;
 public AlgoOrthoLineLine(Construction cons, GeoLineND line1) {
  super(cons);
  this.line1 = line1;
  line = new GeoLine3D(cons);
 }
 public GeoLine3D getLine() {
  return line;
 }
 public void compute() {
  origin1 = line1.getPointInD(3, 0).getInhomCoordsInSameDimension();
  direction1 = line1.getPointInD(3, 1).sub(origin1);
  setOriginAndDirection2();
  getLine().setCoord(origin, direction1.crossProduct(direction2));
 }
 protected abstract void setOriginAndDirection2();
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoLineLineLine.java
```java
public class AlgoOrthoLineLineLine extends AlgoOrthoLineLine {
 private GeoLineND line2; 
 public AlgoOrthoLineLineLine(Construction cons, String label, GeoLineND line1, GeoLineND line2) {
  super(cons, line1);
  this.line2 = line2;
  setInputOutput(
    new GeoElement[] {(GeoElement) line1, (GeoElement) line2}, new GeoElement[] {getLine()});
  compute();
  getLine().setLabel(label);
 }
 public Commands getClassName() {
  return Commands.OrthogonalLine;
 }
 protected void setOriginAndDirection2() {
  Coords o2 = line2.getPointInD(3, 0).getInhomCoordsInSameDimension();
  direction2 = line2.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o2);
  Coords[] points =
    CoordMatrixUtil.nearestPointsFromTwoLines(origin1, direction1, o2, direction2);
  origin = points[0];
 }
 public String toString(StringTemplate tpl) {
  return getLoc().getPlain("LinePerpendicularToAandB", line1.getLabel(tpl), line2.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoLinePointDirectionDirection.java
```java
public class AlgoOrthoLinePointDirectionDirection extends AlgoElement3D {
 private GeoPointND point;
 private GeoDirectionND direction1;
 private GeoDirectionND direction2;
 private GeoLine3D line; 
 public AlgoOrthoLinePointDirectionDirection(
   Construction cons,
   String label,
   GeoPointND point,
   GeoDirectionND direction1,
   GeoDirectionND direction2) {
  super(cons);
  this.point = point;
  this.direction1 = direction1;
  this.direction2 = direction2;
  line = new GeoLine3D(cons);
  setInputOutput(
    new GeoElement[] {(GeoElement) point, (GeoElement) direction1, (GeoElement) direction2},
    new GeoElement[] {getLine()});
  compute();
  getLine().setLabel(label);
 }
 public GeoLine3D getLine() {
  return line;
 }
 public Commands getClassName() {
  return Commands.OrthogonalLine;
 }
 public void compute() {
  Coords direction = direction1.getDirectionInD3().crossProduct(direction2.getDirectionInD3());
  if (direction.isZero()) {
   line.setUndefined();
  } else {
   line.setCoord(point.getInhomCoordsInD3(), direction);
  }
 }
 public String toString(StringTemplate tpl) {
  if (direction1 instanceof GeoCoordSys2D) {
   return getLoc()
     .getPlain(
       "LineThroughAParallelToBPerpendicularToC",
       point.getLabel(tpl),
       direction1.getLabel(tpl),
       direction2.getLabel(tpl));
  }
  if (direction2 instanceof GeoCoordSys2D) {
   return getLoc()
     .getPlain(
       "LineThroughAPerpendicularToBParallelToC",
       point.getLabel(tpl),
       direction1.getLabel(tpl),
       direction2.getLabel(tpl));
  }
  return getLoc()
    .getPlain(
      "LineThroughAPerpendicularToBAndC",
      point.getLabel(tpl),
      direction1.getLabel(tpl),
      direction2.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoLinePointLine3D.java
```java
public class AlgoOrthoLinePointLine3D extends AlgoOrtho {
 public AlgoOrthoLinePointLine3D(
   Construction cons, String label, GeoPointND point, GeoLineND line) {
  super(cons, label, point, (GeoElement) line);
 }
 protected void setSpecificInputOutput() {
  setInputOutput(
    new GeoElement[] {(GeoElement) point, inputOrtho, (GeoSpace) cons.getSpace()},
    new GeoElement[] {line});
 }
 public Commands getClassName() {
  return Commands.OrthogonalLine;
 }
 private GeoLineND getInputLine() {
  return (GeoLineND) getInputOrtho();
 }
 public final void compute() {
  GeoLineND line1 = getInputLine();
  Coords o = line1.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords v1 = line1.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o);
  Coords o2 = getPoint().getInhomCoordsInD3();
  Coords v2 = o2.sub(o);
  Coords v3 = v1.crossProduct(v2);
  Coords v = v3.crossProduct(v1);
  if (v.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   getLine().setUndefined();
  } else {
   getLine().setCoord(getPoint().getInhomCoordsInD3(), v.normalize());
  }
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "LineThroughAPerpendicularToBinSpace", point.getLabel(tpl), inputOrtho.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoLinePointPlane.java
```java
public class AlgoOrthoLinePointPlane extends AlgoOrtho {
 public AlgoOrthoLinePointPlane(
   Construction cons, String label, GeoPointND point, GeoCoordSys2D cs) {
  super(cons, label, point, (GeoElement) cs);
 }
 public Commands getClassName() {
  return Commands.OrthogonalLine;
 }
 private GeoCoordSys2D getCS() {
  return (GeoCoordSys2D) getInputOrtho();
 }
 public final void compute() {
  CoordSys coordsys = getCS().getCoordSys();
  getLine().setCoord(getPoint().getInhomCoordsInD3(), coordsys.getVz());
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoPlane.java
```java
public abstract class AlgoOrthoPlane extends AlgoElement3D {
 private GeoPlane3D plane; 
 private Coords vn1 = new Coords(3);
 private Coords vn2 = new Coords(3);
 public AlgoOrthoPlane(Construction cons) {
  super(cons);
  plane = new GeoPlane3D(cons);
 }
 public GeoPlane3D getPlane() {
  return plane;
 }
 protected abstract Coords getNormal();
 protected abstract Coords getPoint();
 public final void compute() {
  CoordSys coordsys = plane.getCoordSys();
  coordsys.resetCoordSys();
  Coords vz = getNormal();
  if (vz.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   plane.setUndefined();
   return;
  }
  Coords o = getPoint();
  coordsys.addPoint(o);
  vz.completeOrthonormal3(vn1, vn2);
  coordsys.addVectorWithoutCheckMadeCoordSys(vn1);
  coordsys.addVectorWithoutCheckMadeCoordSys(vn2);
  coordsys.makeOrthoMatrix(false, false);
  coordsys.setEquationVector(o, vz);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoPlaneBisectorPointPoint.java
```java
public class AlgoOrthoPlaneBisectorPointPoint extends AlgoOrthoPlane {
 private GeoPointND point1; 
 private GeoPointND point2; 
 private Coords normal = new Coords(4);
 private Coords point = Coords.createInhomCoorsInD3();
 public AlgoOrthoPlaneBisectorPointPoint(
   Construction cons, String label, GeoPointND point1, GeoPointND point2) {
  super(cons);
  this.point1 = point1;
  this.point2 = point2;
  setInputOutput(
    new GeoElement[] {(GeoElement) point1, (GeoElement) point2}, new GeoElement[] {getPlane()});
  compute();
  getPlane().setLabel(label);
 }
 public Commands getClassName() {
  return Commands.PlaneBisector;
 }
 protected Coords getNormal() {
  return normal.setSub3(point2.getInhomCoordsInD3(), point1.getInhomCoordsInD3());
 }
 protected Coords getPoint() {
  return point
    .setAdd3(point1.getInhomCoordsInD3(), point2.getInhomCoordsInD3())
    .mulInside3(0.5);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoPlaneBisectorSegment.java
```java
public class AlgoOrthoPlaneBisectorSegment extends AlgoOrthoPlane {
 private GeoSegmentND segment; 
 public AlgoOrthoPlaneBisectorSegment(Construction cons, String label, GeoSegmentND segment) {
  super(cons);
  this.segment = segment;
  setInputOutput(new GeoElement[] {(GeoElement) segment}, new GeoElement[] {getPlane()});
  compute();
  getPlane().setLabel(label);
 }
 public Commands getClassName() {
  return Commands.PlaneBisector;
 }
 protected Coords getNormal() {
  return segment.getMainDirection();
 }
 protected Coords getPoint() {
  return segment.getPointInD(3, 0.5).getInhomCoordsInSameDimension();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoPlanePoint.java
```java
public abstract class AlgoOrthoPlanePoint extends AlgoOrthoPlane {
 private GeoPointND point; 
 private GeoElement secondInput; 
 public AlgoOrthoPlanePoint(
   Construction cons, String label, GeoPointND point, GeoElement secondInput) {
  super(cons);
  this.point = point;
  this.secondInput = secondInput;
  setInputOutput(
    new GeoElement[] {(GeoElement) point, secondInput}, new GeoElement[] {getPlane()});
  compute();
  getPlane().setLabel(label);
 }
 public Commands getClassName() {
  return Commands.OrthogonalPlane;
 }
 protected Coords getPoint() {
  return point.getInhomCoordsInD3();
 }
 protected GeoElement getSecondInput() {
  return secondInput;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("PlaneThroughAPerpendicularToB", point.getLabel(tpl), secondInput.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoPlanePointLine.java
```java
public class AlgoOrthoPlanePointLine extends AlgoOrthoPlanePoint {
 public AlgoOrthoPlanePointLine(
   Construction cons, String label, GeoPointND point, GeoLineND line) {
  super(cons, label, point, (GeoElement) line);
 }
 protected Coords getNormal() {
  return ((GeoLineND) getSecondInput()).getDirectionForEquation();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoPlanePointVector.java
```java
public class AlgoOrthoPlanePointVector extends AlgoOrthoPlanePoint {
 public AlgoOrthoPlanePointVector(
   Construction cons, String label, GeoPointND point, GeoVectorND vector) {
  super(cons, label, point, (GeoElement) vector);
 }
 protected Coords getNormal() {
  return ((GeoVectorND) getSecondInput()).getCoordsInD3();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoVectorLineDirection.java
```java
public class AlgoOrthoVectorLineDirection extends AlgoElement3D {
 private GeoLineND line;
 private GeoDirectionND direction;
 private GeoVector3D vector;
 AlgoOrthoVectorLineDirection(
   Construction cons, String label, GeoLineND line, GeoDirectionND direction) {
  super(cons);
  this.line = line;
  this.direction = direction;
  vector = new GeoVector3D(cons);
  setInputOutput(
    new GeoElement[] {(GeoElement) line, (GeoElement) direction}, new GeoElement[] {vector});
  vector.setLabel(label);
 }
 public GeoVector3D getVector() {
  return vector;
 }
 public void compute() {
  if (!line.isDefined() || !direction.isDefined()) {
   vector.setUndefined();
   return;
  }
  Coords d1 = line.getDirectionInD3();
  Coords d2 = direction.getDirectionInD3();
  vector.setCoords(d2.crossProduct4(d1));
 }
 public Commands getClassName() {
  return Commands.OrthogonalVector;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoOrthoVectorPlane.java
```java
public class AlgoOrthoVectorPlane extends AlgoElement3D {
 protected GeoCoordSys2D plane;
 private GeoVector3D vector;
 protected Coords vCoords;
 AlgoOrthoVectorPlane(Construction cons, String label, GeoCoordSys2D plane) {
  super(cons);
  vCoords = new Coords(4);
  this.plane = plane;
  vector = new GeoVector3D(cons);
  setInputOutput(new GeoElement[] {(GeoElement) plane}, new GeoElement[] {vector});
  compute();
  vector.setLabel(label);
 }
 public GeoVector3D getVector() {
  return vector;
 }
 public void compute() {
  if (!plane.isDefined()) {
   vector.setUndefined();
   return;
  }
  updateCoords();
  vector.setCoords(vCoords);
 }
 protected void updateCoords() {
  if (plane instanceof GeoPlane3D) {
   vCoords.setValues(plane.getCoordSys().getEquationVector(), 3);
  } else {
   vCoords = plane.getCoordSys().getVz();
  }
 }
 public Commands getClassName() {
  return Commands.OrthogonalVector;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("VectorPerpendicularToA", plane.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoParabolaPointLine3D.java
```java
public class AlgoParabolaPointLine3D extends AlgoParabolaPointLineND {
 public AlgoParabolaPointLine3D(Construction cons, String label, GeoPointND F, GeoLineND l) {
  super(cons, label, F, l);
 }
 public AlgoParabolaPointLine3D(Construction cons, GeoPointND F, GeoLineND l) {
  super(cons, F, l);
 }
 protected GeoConicND newGeoConic(Construction cons1) {
  GeoConic3D ret = new GeoConic3D(cons1);
  ret.setCoordSys(new CoordSys(2));
  return ret;
 }
 public final void compute() {
  Coords Fc = F.getInhomCoordsInD3();
  Coords lo = line.getStartInhomCoords().getInhomCoordsInSameDimension();
  Coords ld = line.getDirectionInD3();
  CoordSys cs = parabola.getCoordSys();
  cs.resetCoordSys();
  cs.addPoint(Fc);
  cs.addVector(ld);
  cs.addPoint(lo);
  if (!cs.makeOrthoMatrix(false, false)) {
   parabola.setUndefined();
   return;
  }
  double y0 = cs.getNormalProjection(lo)[1].getY();
  parabola.setParabola(y0);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPlaneCS2D.java
```java
public class AlgoPlaneCS2D extends AlgoElement3D {
 protected GeoCoordSys2D cs;
 private GeoCoordSys2D csInput;
 public AlgoPlaneCS2D(Construction c, GeoCoordSys2D csInput) {
  super(c);
  this.csInput = csInput;
  cs = new GeoPlane3D(c);
  setInputOutput(new GeoElement[] {(GeoElement) csInput}, new GeoElement[] {(GeoElement) cs});
 }
 public void compute() {
  CoordSys coordsys = cs.getCoordSys();
  if (!csInput.isDefined()) {
   coordsys.setUndefined();
   return;
  }
  coordsys.set(csInput.getCoordSys());
  if (coordsys.isDefined()) {
   coordsys.makeEquationVector();
  }
 }
 public GeoCoordSys2D getCoordSys() {
  return cs;
 }
 public Commands getClassName() {
  return Commands.Plane;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("PlaneContainingA", csInput.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPlaneThreePoints.java
```java
public class AlgoPlaneThreePoints extends AlgoElement3D {
 protected GeoCoordSys2D cs;
 private GeoPointND A;
 private GeoPointND B;
 private GeoPointND C;
 public AlgoPlaneThreePoints(
   Construction c, String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  this(c, A, B, C);
  cs.setLabel(label);
 }
 public AlgoPlaneThreePoints(Construction c, GeoPointND A, GeoPointND B, GeoPointND C) {
  super(c);
  this.A = A;
  this.B = B;
  this.C = C;
  cs = new GeoPlane3D(c);
  setInputOutput(
    new GeoElement[] {(GeoElement) A, (GeoElement) B, (GeoElement) C},
    new GeoElement[] {(GeoElement) cs});
 }
 public void compute() {
  CoordSys coordsys = cs.getCoordSys();
  if (!A.isDefined() || !B.isDefined() || !C.isDefined()) {
   coordsys.setUndefined();
   return;
  }
  coordsys.resetCoordSys();
  Coords cA = A.getInhomCoordsInD3();
  Coords cB = B.getInhomCoordsInD3();
  Coords cC = C.getInhomCoordsInD3();
  coordsys.addPoint(cA);
  coordsys.addPoint(cB);
  coordsys.addPoint(cC);
  if (coordsys.makeOrthoMatrix(false, false)) {
   if (coordsys.isDefined()) {
    coordsys.setEquationVector(cA, cB, cC);
   }
  }
 }
 public GeoCoordSys2D getCoordSys() {
  return cs;
 }
 public Commands getClassName() {
  return Commands.Plane;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("PlaneThroughABC", A.getLabel(tpl), B.getLabel(tpl), C.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPlaneThroughPoint.java
```java
public abstract class AlgoPlaneThroughPoint extends AlgoElement3D {
 private GeoPointND point; 
 private GeoPlane3D plane; 
 public AlgoPlaneThroughPoint(Construction cons, GeoPointND point) {
  super(cons);
  this.point = point;
  plane = new GeoPlane3D(cons);
 }
 public Commands getClassName() {
  return Commands.Plane;
 }
 public GeoPlane3D getPlane() {
  return plane;
 }
 protected GeoPointND getPoint() {
  return point;
 }
 protected abstract GeoElement getSecondInput();
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "PlaneThroughAParallelToB", point.getLabel(tpl), getSecondInput().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPlaneThroughPointAndLine.java
```java
public class AlgoPlaneThroughPointAndLine extends AlgoPlaneThroughPoint {
 private GeoLineND line; 
 public AlgoPlaneThroughPointAndLine(
   Construction cons, String label, GeoPointND point, GeoLineND line) {
  super(cons, point);
  this.line = line;
  setInputOutput(
    new GeoElement[] {(GeoElement) point, (GeoElement) line}, new GeoElement[] {getPlane()});
  compute();
  getPlane().setLabel(label);
 }
 public final void compute() {
  CoordSys coordsys = getPlane().getCoordSys();
  coordsys.resetCoordSys();
  Coords cA = getPoint().getInhomCoordsInD3();
  Coords cB = line.getPointInD(3, 0).getInhomCoordsInSameDimension();
  Coords cC = line.getPointInD(3, 1).getInhomCoordsInSameDimension();
  coordsys.addPoint(cA);
  coordsys.addPoint(cB);
  coordsys.addPoint(cC);
  if (coordsys.makeOrthoMatrix(true, false)) {
   coordsys.setEquationVector(cA, cB, cC);
  }
 }
 protected GeoElement getSecondInput() {
  return (GeoElement) line;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("PlaneThroughAB", getPoint().getLabel(tpl), getSecondInput().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPlaneThroughPointAndPlane.java
```java
public class AlgoPlaneThroughPointAndPlane extends AlgoPlaneThroughPoint {
 private GeoCoordSys2D cs; 
 public AlgoPlaneThroughPointAndPlane(
   Construction cons, String label, GeoPointND point, GeoCoordSys2D cs) {
  super(cons, point);
  this.cs = cs;
  setInputOutput(
    new GeoElement[] {(GeoElement) point, (GeoElement) cs}, new GeoElement[] {getPlane()});
  compute();
  getPlane().setLabel(label);
 }
 public final void compute() {
  CoordSys coordsys = getPlane().getCoordSys();
  coordsys.resetCoordSys();
  if (!cs.toGeoElement().isDefined()) {
   return;
  }
  Coords o = getPoint().getInhomCoordsInD3();
  coordsys.addPoint(o);
  CoordSys inputCS = cs.getCoordSys();
  coordsys.addVectorWithoutCheckMadeCoordSys(inputCS.getVx());
  coordsys.addVectorWithoutCheckMadeCoordSys(inputCS.getVy());
  coordsys.makeOrthoMatrix(true, false);
  if (cs instanceof GeoPlane3D) {
   coordsys.setEquationVector(o, inputCS.getEquationVector());
  } else {
   coordsys.setEquationVector(o, inputCS.getVz());
  }
 }
 protected GeoElement getSecondInput() {
  return (GeoElement) cs;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPlaneTwoLines.java
```java
public class AlgoPlaneTwoLines extends AlgoElement3D {
 protected GeoCoordSys2D cs;
 private GeoLineND a;
 private GeoLineND b;
 public AlgoPlaneTwoLines(Construction c, String label, GeoLineND a, GeoLineND b) {
  super(c);
  this.a = a;
  this.b = b;
  cs = new GeoPlane3D(c);
  setInputOutput(
    new GeoElement[] {(GeoElement) a, (GeoElement) b}, new GeoElement[] {(GeoElement) cs});
  compute();
  cs.setLabel(label);
 }
 public void compute() {
  CoordSys coordsys = cs.getCoordSys();
  if (!a.isDefined() || !b.isDefined()) {
   coordsys.setUndefined();
   return;
  }
  Coords oa = a.getStartInhomCoords();
  Coords va = a.getDirectionInD3();
  Coords ob = b.getStartInhomCoords();
  Coords vb = b.getDirectionInD3();
  Coords vn = va.crossProduct(vb);
  Coords oo = ob.sub(oa);
  if (!DoubleUtil.isZero(vn.dotproduct(oo))) {
   coordsys.setUndefined();
   return;
  }
  coordsys.resetCoordSys();
  coordsys.addPoint(oa);
  coordsys.addVector(va);
  if (vn.isZero()) {
   coordsys.addVector(oo);
   vn = va.crossProduct(oo);
  } else {
   coordsys.addVector(vb);
  }
  if (coordsys.makeOrthoMatrix(false, false)) {
   if (coordsys.isDefined()) {
    coordsys.setEquationVector(oa, vn);
   }
  }
 }
 public GeoCoordSys2D getCoordSys() {
  return cs;
 }
 public Commands getClassName() {
  return Commands.Plane;
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("PlaneThroughAB", a.getLabel(tpl), b.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPoint3DInRegion.java
```java
public class AlgoPoint3DInRegion extends AlgoElement3D {
 private Region region; 
 private GeoPoint3D P; 
 public AlgoPoint3DInRegion(Construction cons, Region region, Coords coords) {
  super(cons);
  this.region = region;
  P = new GeoPoint3D(cons, region);
  setInputOutput(); 
  if (coords != null) {
   P.setCoords(coords);
  }
  compute();
 }
 public AlgoPoint3DInRegion(Construction cons, String label, Region region, Coords coords) {
  this(cons, region, coords);
  P.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.PointIn;
 }
 protected void setInputOutput() {
  input = new GeoElement[1];
  input[0] = region.toGeoElement();
  setOnlyOutput(P);
  setDependencies(); 
 }
 public GeoPoint3D getP() {
  return P;
 }
 Region getRegion() {
  return region;
 }
 public final void compute() {
  if (input[0].isDefined()) {
   region.regionChanged(P);
  } else {
   P.setUndefined();
  }
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlainDefault("PointInA", "Point in %0", input[0].getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPoint3DOnPath.java
```java
public class AlgoPoint3DOnPath extends AlgoPointOnPath {
 public AlgoPoint3DOnPath(Construction cons, Path path, double x, double y, double z) {
  super(cons, path, x, y, z, true);
 }
 public AlgoPoint3DOnPath(Construction cons, Path path, GeoNumberValue param) {
  super(cons, path, param);
 }
 protected void createPoint(Path path, double x, double y, double z) {
  P = new GeoPoint3D(cons, path);
  P.setCoords(x, y, z, 1.0);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPointVector3D.java
```java
public class AlgoPointVector3D extends AlgoPointVectorND {
 private Coords tmpCoords;
 public AlgoPointVector3D(Construction cons, GeoPointND P, GeoVectorND v) {
  super(cons, P, v);
 }
 public final void compute() {
  tmpCoords.setAdd3(P.getInhomCoordsInD3(), v.getCoordsInD3());
  Q.setCoords(tmpCoords, false);
 }
 protected GeoPointND newGeoPoint(Construction cons1) {
  tmpCoords = Coords.createInhomCoorsInD3();
  return new GeoPoint3D(cons1);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolarLine3D.java
```java
public class AlgoPolarLine3D extends AlgoPolarLineND {
 private GeoLine polar2D;
 private Coords coords2D;
 private double[] polarCoords;
 private Coords polarOrigin;
 private Coords polarDirection;
 public AlgoPolarLine3D(Construction cons, String label, GeoConicND c, GeoPointND P) {
  super(cons, label, c, P);
 }
 protected GeoLineND newGeoLine(Construction cons1) {
  polar2D = new GeoLine(cons1);
  polarCoords = new double[3];
  return new GeoLine3D(cons1);
 }
 public final void compute() {
  coords2D = c.getCoordSys().getNormalProjection(P.getInhomCoordsInD3())[1];
  if (!DoubleUtil.isZero(coords2D.getZ())) {
   polar.setUndefined();
   return;
  }
  coords2D.setZ(1);
  c.polarLine(coords2D, polar2D);
  polar2D.getCoords(polarCoords);
  polarDirection = c.getCoordSys().getVector(-polarCoords[1], polarCoords[0]);
  if (DoubleUtil.isZero(polarCoords[0])) {
   polarOrigin = c.getCoordSys().getPoint(0, -polarCoords[2] / polarCoords[1]);
  } else {
   polarOrigin = c.getCoordSys().getPoint(-polarCoords[2] / polarCoords[0], 0);
  }
  ((GeoLine3D) polar).setCoord(polarOrigin, polarDirection);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolarPoint3D.java
```java
public class AlgoPolarPoint3D extends AlgoPolarPointND {
 private GeoPoint polar2D;
 private Coords equation2D;
 private double[] polarCoords;
 public AlgoPolarPoint3D(Construction cons, String label, GeoConicND c, GeoLineND line) {
  super(cons, label, c, line);
 }
 protected GeoPointND newGeoPoint(Construction cons1) {
  polar2D = new GeoPoint(cons1);
  polarCoords = new double[3];
  return new GeoPoint3D(cons1);
 }
 public final void compute() {
  equation2D = line.getCartesianEquationVector(c.getCoordSys().getMatrixOrthonormal());
  if (equation2D == null) {
   polar.setUndefined();
   return;
  }
  c.polarPoint(equation2D, polar2D);
  polar2D.getCoords(polarCoords);
  ((GeoPoint3D) polar)
    .setCoords(c.getCoordSys().getPoint(polarCoords[0], polarCoords[1], polarCoords[2]));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyLine3D.java
```java
public class AlgoPolyLine3D extends AlgoPolyLine {
 public AlgoPolyLine3D(Construction cons, String label, GeoList geoList) {
  this(cons, label, null, geoList);
 }
 public AlgoPolyLine3D(Construction cons, String label, GeoPointND[] points) {
  this(cons, label, points, null);
 }
 protected AlgoPolyLine3D(Construction cons, String label, GeoPointND[] points, GeoList geoList) {
  super(cons, points, geoList);
  poly.setLabel(label);
 }
 protected void createPolyLine() {
  poly = new GeoPolyLine3D(this.cons, this.points);
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_POLYLINE;
 }
 private void updatePointArray(GeoList pointList) {
  if (!pointList.getElementType().equals(GeoClass.POINT)
    && !pointList.getElementType().equals(GeoClass.POINT3D)) {
   poly.setUndefined();
   return;
  }
  int size = pointList.size();
  points = new GeoPointND[size];
  for (int i = 0; i < size; i++) {
   points[i] = (GeoPointND) pointList.get(i);
  }
  poly.setPoints(points);
 }
 public void update() {
  compute();
  getOutput(0).update();
 }
 public void compute() {
  if (geoList != null) {
   updatePointArray(geoList);
  }
  poly.calcLength();
 }
 protected void setInputOutput() {
  GeoElement[] efficientInput = createEfficientInput();
  input = new GeoElement[efficientInput.length];
  for (int i = 0; i < efficientInput.length; i++) {
   input[i] = efficientInput[i];
  }
  setEfficientDependencies(input, efficientInput);
  setOnlyOutput(poly);
  setDependencies();
 }
 protected GeoElement[] createEfficientInput() {
  GeoElement[] efficientInput;
  if (geoList != null) {
   efficientInput = new GeoElement[1];
   efficientInput[0] = geoList;
  } else {
   efficientInput = new GeoElement[points.length];
   for (int i = 0; i < points.length; i++) {
    efficientInput[i] = (GeoElement) points[i];
   }
  }
  return efficientInput;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolygon3D.java
```java
public class AlgoPolygon3D extends AlgoPolygon {
 public AlgoPolygon3D(Construction cons, String[] label, GeoPointND[] points, GeoList vertices) {
  this(cons, label, points, true, vertices);
 }
 public AlgoPolygon3D(
   Construction cons,
   String[] labels,
   GeoPointND[] points,
   boolean createSegments,
   GeoList vertices) {
  super(cons, labels, points, vertices, null, createSegments, null, null);
 }
 public AlgoPolygon3D(
   Construction cons, GeoPointND[] points, boolean createSegments, GeoElement polyhedron) {
  super(cons, points, null, null, createSegments, polyhedron, null);
 }
 protected void createPolygon(boolean createSegments) {
  if (points == null) {
   int size = geoList.size();
   points = new GeoPointND[size];
   for (int i = 0; i < size; i++) {
    points[i] = (GeoPointND) geoList.get(i);
   }
  }
  poly = new GeoPolygon3D(cons, points, cs2D, createSegments);
  if (polyhedron != null) {
   ((GeoPolygon3D) poly).setIsPartOfClosedSurface(true);
   poly.addMeta(polyhedron);
  }
 }
 public void compute() {
  if (geoList != null) {
   updatePointArray();
   calcArea();
   poly.updateRegionCS();
  } else {
   if (((GeoPolygon3D) poly).updateCoordSys()) {
    super.compute();
   } else {
    poly.setUndefined();
   }
  }
 }
 public void calcCentroid(GeoPoint p) {
  Log.debug("centroid unimplemented for 3D polys");
  p.setUndefined();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolygon3DDirection.java
```java
public class AlgoPolygon3DDirection extends AlgoPolygon {
 public AlgoPolygon3DDirection(
   Construction cons, String[] labels, GeoPointND[] points, GeoDirectionND direction) {
  super(cons, labels, points, null, null, true, null, direction);
 }
 protected GeoElement[] createEfficientInput() {
  GeoElement[] efficientInput;
  if (geoList != null) {
   efficientInput = new GeoElement[2];
   efficientInput[0] = geoList;
   efficientInput[1] = (GeoElement) direction;
  } else {
   efficientInput = new GeoElement[points.length + 1];
   for (int i = 0; i < points.length; i++) {
    efficientInput[i] = (GeoElement) points[i];
   }
   efficientInput[points.length] = (GeoElement) direction;
  }
  return efficientInput;
 }
 protected void createPolygon(boolean createSegments) {
  poly = new GeoPolygon3D(cons, points, cs2D, createSegments);
 }
 public void compute() {
  CoordSys coordsys = poly.getCoordSys();
  coordsys.resetCoordSys();
  coordsys.addPoint(points[0].getInhomCoordsInD3());
  Coords[] v = direction.getDirectionInD3().completeOrthonormal();
  coordsys.addVector(v[0]);
  coordsys.addVector(v[1]);
  coordsys.makeOrthoMatrix(false, false);
  if (((GeoPolygon3D) poly).checkPointsAreOnCoordSys(kernel.getStandardPrecision())) {
   super.compute();
  }
 }
 protected void createStringBuilder(StringTemplate tpl) {
  if (sb == null) {
   sb = new StringBuilder();
  } else {
   sb.setLength(0);
  }
  String label;
  if (geoList != null) {
   label = geoList.getLabel(tpl);
  } else {
   int last = points.length - 1;
   for (int i = 0; i < last; i++) {
    sb.append(points[i].getLabel(tpl));
    sb.append(", ");
   }
   sb.append(points[last].getLabel(tpl));
   label = sb.toString();
   sb.setLength(0);
  }
  sb.append(getLoc().getPlain("PolygonAParallelToB", label, direction.getLabel(tpl)));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolygonOperations3D.java
```java
public abstract class AlgoPolygonOperations3D extends AlgoElement3D {
 protected GeoPolygon inPoly0;
 protected GeoPolygon inPoly1;
 protected OutputHandler<GeoPolygon3D> outputPolygons;
 protected OutputHandler<GeoPoint3D> outputPoints;
 protected OutputHandler<GeoSegment3D> outputSegments;
 private Path subject;
 private Path clip;
 private Paths solution;
 private Coords tmpCoord;
 private CoordMatrix matrix;
 private Coords retCoords;
 private GeoLine3D planeIntsctGeoLine3D;
 private TreeMap<Double, Coords> newCoords;
 private GeoPoint3D tmpPoint;
 private ArrayList<Integer> intersectSegmentIndex;
 protected PolyOperation operationType;
 protected String[] labels;
 private boolean silent;
 private Coords o1;
 private Coords d1;
 public AlgoPolygonOperations3D(
   Construction cons,
   String[] labels,
   GeoPoly inPoly0,
   GeoPoly inPoly1,
   PolyOperation operationType) {
  super(cons);
  this.operationType = operationType;
  this.inPoly0 = (GeoPolygon) inPoly0;
  this.inPoly1 = (GeoPolygon) inPoly1;
  tmpCoord = new Coords(4);
  subject = new Path(this.inPoly0.getPointsLength());
  clip = new Path(this.inPoly1.getPointsLength());
  solution = new Paths();
  planeIntsctGeoLine3D = new GeoLine3D(getConstruction());
  newCoords = new TreeMap<>(Kernel.doubleComparator(Kernel.STANDARD_PRECISION));
  tmpPoint = new GeoPoint3D(getConstruction());
  intersectSegmentIndex = new ArrayList<>();
  createOutput();
  this.labels = labels;
  silent = cons.isSuppressLabelsActive();
 }
 protected void initialize(int[] outputSizes) {
  setInputOutput();
  compute(false);
  if (labels == null) {
   outputPolygons.setLabels(null);
   outputPoints.setLabels(null);
   outputSegments.setLabels(null);
  } else {
   int labelsLength = labels.length;
   if (labelsLength > 1) {
    if (outputSizes != null) {
     outputPolygons.adjustOutputSize(outputSizes[0], false);
     outputPoints.adjustOutputSize(outputSizes[1], false);
     outputSegments.adjustOutputSize(outputSizes[2], false);
     int i1 = 0;
     int i2 = 0;
     while (i1 < outputSizes[0]) {
      outputPolygons.getElement(i1).setLabel(labels[i2]);
      i1++;
      i2++;
     }
     i1 = 0;
     while (i1 < outputSizes[1]) {
      outputPoints.getElement(i1).setLabel(labels[i2]);
      i1++;
      i2++;
     }
     i1 = 0;
     while (i1 < outputSizes[2]) {
      outputSegments.getElement(i1).setLabel(labels[i2]);
      i1++;
      i2++;
     }
    } else {
     outputPolygons.setLabels(null);
     outputSegments.setLabels(null);
     outputPoints.setLabels(null);
    }
   } else if (labels.length == 1 && labels[0] != null && !labels[0].equals("")) {
    outputPolygons.setIndexLabels(labels[0]);
   }
  }
  update();
 }
 protected void getCmdOutputXML(XMLStringBuilder sb, StringTemplate tpl) {
  String sizes = outputPolygons.size() + "," + outputPoints.size() + "," + outputSegments.size();
  sb.startTag("outputSizes").attr("val", sizes).endTag();
  super.getCmdOutputXML(sb, tpl);
 }
 private void createOutput() {
  outputPolygons = new OutputHandler<>(() -> {
   GeoPolygon3D p = new GeoPolygon3D(cons, true);
   p.setParentAlgorithm(this);
   if (outputPolygons.size() > 0) {
    p.setAllVisualProperties(outputPolygons.getElement(0), false);
   }
   p.setViewFlags(inPoly0.getViewSet());
   p.setNotFixedPointsLength(true);
   return p;
  });
  outputPolygons.adjustOutputSize(1, false);
  outputPoints = new OutputHandler<>(() -> {
   GeoPoint3D newPoint = new GeoPoint3D(cons);
   newPoint.setCoords(0, 0, 1);
   newPoint.setParentAlgorithm(this);
   newPoint.setAuxiliaryObject(true);
   newPoint.setViewFlags(inPoly0.getViewSet());
   return newPoint;
  });
  outputPoints.adjustOutputSize(1, false);
  outputSegments = new OutputHandler<>(() -> {
   GeoSegment3D segment = (GeoSegment3D) outputPolygons
     .getElement(0)
     .createSegment(cons, outputPoints.getElement(0), outputPoints.getElement(0), true);
   segment.setAuxiliaryObject(true);
   segment.setViewFlags(inPoly0.getViewSet());
   return segment;
  });
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = inPoly0;
  input[1] = inPoly1;
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
  cons.addToAlgorithmList(this);
  setDependencies();
 }
 public final void compute() {
  compute(!silent);
 }
 protected void compute(boolean updateLabels) {
  if (!this.inPoly0.isDefined() || !this.inPoly1.isDefined()) {
   setOutputUndefined();
   return;
  }
  Coords[] res = CoordMatrixUtil.intersectPlanes(
    this.inPoly0.getCoordSys().getMatrixOrthonormal(),
    this.inPoly1.getCoordSys().getMatrixOrthonormal());
  if (res[1].isZero() && !res[0].isZero()) {
   subject.clear();
   for (int i = 0; i < this.inPoly0.getPointsLength(); i++) {
    DoublePoint point = new DoublePoint(
      this.inPoly0.getPoint(i).getX(), this.inPoly0.getPoint(i).getY());
    subject.add(point);
   }
   matrix = this.inPoly0.getCoordSys().getMatrixOrthonormal();
   clip.clear();
   for (int i = 0; i < this.inPoly1.getPointsLength(); i++) {
    this.inPoly1.getPoint3D(i).projectPlaneInPlaneCoords(matrix, tmpCoord);
    DoublePoint point = new DoublePoint(tmpCoord.getX(), tmpCoord.getY());
    clip.add(point);
   }
   DefaultClipper clipper = new DefaultClipper(Clipper.STRICTLY_SIMPLE);
   clipper.addPath(clip, PolyType.CLIP, true);
   clipper.addPath(subject, PolyType.SUBJECT, true);
   boolean solutionValid = false;
   solution.clear();
   switch (operationType) {
    default:
    case INTERSECTION:
     solutionValid = clipper.execute(
       ClipType.INTERSECTION, solution, PolyFillType.EVEN_ODD, PolyFillType.EVEN_ODD);
     break;
    case UNION:
     solutionValid = clipper.execute(
       ClipType.UNION, solution, PolyFillType.EVEN_ODD, PolyFillType.EVEN_ODD);
     break;
    case DIFFERENCE:
     solutionValid = clipper.execute(
       ClipType.DIFFERENCE, solution, PolyFillType.EVEN_ODD, PolyFillType.EVEN_ODD);
     break;
    case XOR:
     solutionValid =
       clipper.execute(ClipType.XOR, solution, PolyFillType.EVEN_ODD, PolyFillType.EVEN_ODD);
     break;
   }
   if (!solutionValid) { 
    setOutputUndefined();
   } else {
    outputPolygons.adjustOutputSize(solution.size(), false);
    int pointCount = 0;
    for (Path path : solution) {
     pointCount += path.size();
    }
    outputPoints.adjustOutputSize(pointCount, false);
    outputSegments.adjustOutputSize(pointCount, false);
    pointCount = 0;
    for (Path path : solution) {
     for (int i = 0; i < path.size(); i++) {
      GeoPoint3D point = outputPoints.getElement(pointCount);
      DoublePoint calcPoint = path.get(i);
      retCoords = this.inPoly0.getCoordSys().getPoint(calcPoint.getX(), calcPoint.getY());
      point.setCoords(retCoords.getX(), retCoords.getY(), retCoords.getZ(), 1);
      pointCount++;
     }
    }
    if (updateLabels) {
     outputPoints.updateLabels();
    }
    GeoPoint3D[] points = new GeoPoint3D[pointCount];
    points = outputPoints.getOutput(points);
    int pointIndex = 0;
    int polygonIndex = 0;
    int segmentIndex = 0;
    for (Path path : solution) {
     GeoPolygon3D polygon = outputPolygons.getElement(polygonIndex);
     polygonIndex++;
     GeoPoint3D[] polyPoints = new GeoPoint3D[path.size()];
     GeoSegment3D[] polySegments = new GeoSegment3D[path.size()];
     for (int i = 0; i < path.size(); i++) {
      GeoSegment3D segment = outputSegments.getElement(segmentIndex);
      segment.setPoints(points[pointIndex + i], points[pointIndex + (i + 1) % path.size()]);
      segment.setCoord(points[pointIndex + i], points[pointIndex + (i + 1) % path.size()]);
      segment.update();
      polyPoints[i] = points[pointIndex + i];
      polySegments[i] = segment;
      segmentIndex++;
     }
     pointIndex += path.size();
     polygon.setPoints(polyPoints, null, false);
     polygon.setSegments(polySegments);
     polygon.calcArea();
    }
   }
  }
  else if (res[1].isZero() && res[0].isZero()) {
   setOutputUndefined();
  }
  else {
   if (this.operationType == PolyOperation.INTERSECTION) {
    this.planeIntsctGeoLine3D.setCoord(res[0], res[1].normalize());
    this.newCoords.clear();
    intersectionsCoords(this.inPoly0, this.planeIntsctGeoLine3D, newCoords);
    intersectionsCoords(this.inPoly1, this.planeIntsctGeoLine3D, newCoords);
    Coords[] coords = new Coords[1];
    coords = newCoords.values().toArray(coords);
    this.intersectSegmentIndex.clear();
    tmpCoord.setW(1); 
    for (int i = 0; i < coords.length - 1; i++) {
     tmpCoord.setAdd3(coords[i], coords[i + 1]).mulInside3(0.5);
     tmpPoint.setCoords(tmpCoord);
     if (this.inPoly0.isInRegion(tmpPoint) && this.inPoly1.isInRegion(tmpPoint)) {
      this.intersectSegmentIndex.add(i);
     }
    }
    int noOfSegs = this.intersectSegmentIndex.size();
    outputPolygons.adjustOutputSize(noOfSegs, false);
    outputPoints.adjustOutputSize(noOfSegs * 2, false);
    outputSegments.adjustOutputSize(noOfSegs, false);
    int pointIndex = 0;
    for (int i = 0; i < noOfSegs; i++) {
     outputPoints.getElement(pointIndex).setCoords(coords[intersectSegmentIndex.get(i)]);
     outputPoints
       .getElement(pointIndex + 1)
       .setCoords(coords[intersectSegmentIndex.get(i) + 1]);
     GeoPoint3D[] polyPoints = new GeoPoint3D[2];
     polyPoints[0] = outputPoints.getElement(pointIndex);
     polyPoints[1] = outputPoints.getElement(pointIndex + 1);
     pointIndex = pointIndex + 2;
     GeoSegment3D[] polySegments = new GeoSegment3D[1];
     outputSegments.getElement(i).setPoints(polyPoints[0], polyPoints[1]);
     polySegments[0] = outputSegments.getElement(i);
     polySegments[0].update();
     outputPolygons.getElement(i).setPoints(polyPoints, null, false);
     outputPolygons.getElement(i).setSegments(polySegments);
     outputPolygons.getElement(i).calcArea();
    }
   }
   else {
    setOutputUndefined();
   }
  }
  if (updateLabels) {
   outputSegments.updateLabels();
   outputPolygons.updateLabels();
  }
 }
 private void setOutputUndefined() {
  outputPolygons.adjustOutputSize(1, false);
  outputPoints.adjustOutputSize(1, false);
  outputSegments.adjustOutputSize(1, false);
  outputSegments.updateLabels();
  outputPolygons.updateLabels();
  outputPolygons.setUndefined();
 }
 private void setIntersectionLine(GeoLineND line) {
  o1 = line.getPointInD(3, 0).getInhomCoordsInSameDimension();
  d1 = line.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o1);
 }
 private void intersectionsCoords(
   GeoPolygon poly, GeoLineND line, TreeMap<Double, Coords> newCoords1) {
  switch (AlgoIntersectCS1D2D.getConfigLinePlane(line, poly)) {
   case GENERAL: 
    intersectionsCoordsGeneral(poly, line, newCoords1);
    break;
   case CONTAINED: 
    intersectionsCoordsContained(poly, line, newCoords1);
    break;
   case PARALLEL: 
    break;
  }
 }
 private void intersectionsCoordsContained(
   HasSegments p, GeoLineND line, TreeMap<Double, Coords> newCoords1) {
  setIntersectionLine(line);
  for (int i = 0; i < p.getSegments().length; i++) {
   GeoSegmentND seg = p.getSegments()[i];
   Coords o2 = seg.getPointInD(3, 0).getInhomCoordsInSameDimension();
   Coords d2 = seg.getPointInD(3, 1).getInhomCoordsInSameDimension().sub(o2);
   Coords[] project = CoordMatrixUtil.nearestPointsFromTwoLines(o1, d1, o2, d2);
   if (project != null && project[0].equalsForKernel(project[1], Kernel.STANDARD_PRECISION)) {
    double t1 = project[2].get(1); 
    double t2 = project[2].get(2); 
    if (line.respectLimitedPath(t1) && seg.respectLimitedPath(t2)) {
     newCoords1.put(t1, project[0]);
    }
   }
  }
 }
 private static void intersectionsCoordsGeneral(
   GeoPolygon p, GeoLineND line, TreeMap<Double, Coords> newCoords) {
  Coords globalCoords = new Coords(4);
  Coords inPlaneCoords = new Coords(4);
  Coords singlePoint =
    AlgoIntersectCS1D2D.getIntersectLinePlane(line, p, globalCoords, inPlaneCoords);
  if (singlePoint != null) {
   newCoords.put(0d, singlePoint);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolygonRegular3D.java
```java
public class AlgoPolygonRegular3D extends AlgoPolygonRegularND {
 private GeoDirectionND direction;
 private Coords coordsA;
 private Coords coordsB;
 private Coords vAB;
 private Coords vDirection;
 public AlgoPolygonRegular3D(
   Construction c,
   String[] labels,
   GeoPointND A1,
   GeoPointND B1,
   GeoNumberValue num,
   GeoDirectionND direction) {
  super(c, labels, A1, B1, num, direction);
 }
 protected GeoPolygon newGeoPolygon(Construction cons1) {
  return new GeoPolygon3D(cons1);
 }
 protected GeoElement newGeoPoint(Construction cons1) {
  GeoPoint3D newPoint = new GeoPoint3D(cons1);
  newPoint.setCoords(0, 0, 0, 1);
  return newPoint;
 }
 protected void setInputOutput() {
  input = new GeoElement[4];
  input[0] = (GeoElement) A;
  input[1] = (GeoElement) B;
  input[2] = num.toGeoElement();
  input[3] = (GeoElement) direction;
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
  cons.addToAlgorithmList(this);
  getPoly().setParentAlgorithm(this);
 }
 protected void setDirection(GeoDirectionND direction) {
  this.direction = direction;
 }
 protected void setCenterPoint(double beta) {
  Coords m = coordsA.add(coordsB).mul(0.5);
  Coords vn = vDirection.crossProduct4(vAB);
  double tanBetaHalf = Math.tan(beta) / 2;
  ((GeoPoint3D) centerPoint).setCoords(m.add(vn.mul(tanBetaHalf)));
 }
 protected void rotate(GeoPointND point) {
  ((GeoPoint3D) point).rotate(rotAngle, centerPoint.getInhomCoordsInD3(), direction);
 }
 protected boolean checkUnDefined(int n) {
  boolean ret = super.checkUnDefined(n);
  coordsA = A.getInhomCoordsInD3();
  coordsB = B.getInhomCoordsInD3();
  vAB = coordsB.sub(coordsA);
  vDirection = direction.getDirectionInD3();
  if (!DoubleUtil.isZero(vAB.dotproduct(vDirection))) {
   getPoly().setUndefined();
   for (int i = 0; i < outputPoints.size(); i++) {
    outputPoints.getElement(i).setUndefined();
   }
   if (getPoly().getPointsND() == null) {
    getPoly().setPoints(new GeoPointND[] {A, B}, null, false);
   }
   numOld = 2;
   return true;
  }
  return ret;
 }
 public void calcCentroid(GeoPoint p) {
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedron.java
```java
public abstract class AlgoPolyhedron extends AlgoElement3D {
 protected OutputHandler<GeoPoint3D> outputPoints;
 protected OutputHandler<GeoPolyhedron> outputPolyhedron;
 protected GeoPolyhedron polyhedron;
 protected AlgoPolyhedron(Construction c) {
  super(c);
 }
 protected void init() {
  cons.addToAlgorithmList(this);
  outputPolyhedron = new OutputHandler<>(() -> {
   GeoPolyhedron p = new GeoPolyhedron(cons, getPolyhedronType());
   p.setParentAlgorithm(this);
   return p;
  });
  outputPolyhedron.adjustOutputSize(1);
  polyhedron = getPolyhedron();
  polyhedron.setChildrenLabelsSet(true);
  outputPoints = createOutputPointsHandler();
  createOutputPolygons();
  createOutputSegments();
 }
 protected abstract GeoPolyhedron.Type getPolyhedronType();
 protected abstract boolean isFirstInputPointVisible();
 protected abstract boolean isFirstInputPointLabelVisible();
 protected void createFaces() {
  polyhedron.createFaces();
 }
 protected abstract void createOutputSegments();
 protected OutputHandler<GeoSegment3D> createOutputSegmentsHandler() {
  return new OutputHandler<>(() -> {
   GeoSegment3D s = new GeoSegment3D(cons);
   s.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return s;
  });
 }
 protected abstract void createOutputPolygons();
 protected OutputHandler<GeoPolygon3D> createOutputPolygonsHandler() {
  return new OutputHandler<>(() -> {
   GeoPolygon3D p = new GeoPolygon3D(cons);
   p.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return p;
  });
 }
 protected void addAlgoToInput() {
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
 }
 protected abstract void updateOutput();
 protected final void setOutput() {
  updateOutput();
 }
 public GeoPolyhedron getPolyhedron() {
  return outputPolyhedron.getElement(0);
 }
 public void removeOutputExcept(GeoElement keepGeo) {
  for (int i = 0; i < super.getOutputLength(); i++) {
   GeoElement geo = super.getOutput(i);
   if (geo != keepGeo) {
    if (geo.isGeoPoint()) {
     removePoint(geo);
    } else {
     geo.doRemove();
    }
   }
  }
 }
 private void removePoint(GeoElement oldPoint) {
  ArrayList<AlgoElement> algoList = oldPoint.getAlgorithmList();
  for (int k = 0; k < algoList.size(); k++) {
   AlgoElement algo = algoList.get(k);
   for (int j = 0; j < input.length; j++) {
    input[j].removeFromUpdateSets(algo);
   }
  }
  oldPoint.setParentAlgorithm(null);
  GeoPolyhedron poly = getPolyhedron();
  for (int k = 0; k < algoList.size(); k++) {
   AlgoElement algo = algoList.get(k);
   if (algo instanceof AlgoJoinPoints3D && ((AlgoJoinPoints3D) algo).getPoly() == poly) {
    continue;
   } else if (algo instanceof AlgoPolygon3D && ((AlgoPolygon3D) algo).getPolyhedron() == poly) {
    continue;
   }
   algo.remove();
  }
  algoList.clear();
  oldPoint.doRemove();
 }
 protected void updateDependentGeos() {
  getPolyhedron().update();
 }
 protected OutputHandler<GeoPoint3D> createOutputPointsHandler() {
  return new OutputHandler<>(new PointFactory());
 }
 protected class PointFactory implements ElementFactory<GeoPoint3D> {
  public GeoPoint3D newElement() {
   GeoPoint3D p = new GeoPoint3D(cons);
   p.setCoords(0, 0, 0, 1);
   p.setParentAlgorithm(AlgoPolyhedron.this);
   boolean visible = false;
   boolean labelVisible = false;
   int size = outputPoints.size();
   if (size > 0) { 
    for (int i = 0; i < size && !visible && !labelVisible; i++) {
     visible = visible || outputPoints.getElement(i).isEuclidianVisible();
     labelVisible = labelVisible || outputPoints.getElement(i).getLabelVisible();
    }
   } else { 
    visible = isFirstInputPointVisible();
    labelVisible = isFirstInputPointLabelVisible() && labelsAllowed();
   }
   p.setEuclidianVisible(visible);
   if (!visible) { 
    p.dontSetEuclidianVisibleBySetParentAlgorithm();
   }
   p.setLabelVisible(labelVisible);
   p.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   if (getPolyhedron().getShowObjectCondition() != null) {
    try {
     p.setShowObjectCondition(getPolyhedron().getShowObjectCondition());
    } catch (Exception ignored) {
    }
   }
   getPolyhedron().addPointCreated(p);
   return p;
  }
 }
 protected boolean labelsAllowed() {
  return kernel.getApplication().getSettings().getLabelSettings().getLabelVisibility()
    != LabelVisibility.AlwaysOff;
 }
 protected void getOutputXML(XMLStringBuilder sb) {
  super.getOutputXML(sb);
  for (GeoPolygon polygon : polyhedron.getPolygonsLinked()) {
   if (polygon.isLabelSet()) {
    polygon.getXML(false, sb);
   }
  }
  for (GeoSegmentND segment : polyhedron.getSegmentsLinked()) {
   if (segment.isLabelSet()) {
    ((GeoElement) segment).getXML(false, sb);
   }
  }
 }
 protected void setLabels(String[] labels) {
  kernel.batchAddStarted();
  if (labels == null || labels.length <= 1) {
   polyhedron.initLabels(labels);
  } else {
   polyhedron.setAllLabelsAreSet(true);
   for (int i = 0; i < labels.length; i++) {
    getOutput(i).setLabel(labels[i]);
   }
  }
  kernel.batchAddComplete();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronConvex.java
```java
public class AlgoPolyhedronConvex extends AlgoElement3D {
 private GeoPointND[] pointList;
 protected OutputHandler<GeoPolyhedron> outputPolyhedron;
 protected OutputHandler<GeoSegment3D> outputSegments;
 protected OutputHandler<GeoPolygon3D> outputPolygons;
 private Point3d[] point3dList;
 private QuickHull3D quickHull3D;
 public AlgoPolyhedronConvex(Construction c, String[] labels, GeoElement[] pointList) {
  super(c);
  this.pointList = new GeoPointND[pointList.length];
  point3dList = new Point3d[pointList.length];
  for (int i = 0; i < pointList.length; i++) {
   this.pointList[i] = (GeoPointND) pointList[i];
   point3dList[i] = new Point3d();
  }
  quickHull3D = new QuickHull3D();
  input = pointList;
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
  outputPolyhedron = new OutputHandler<>(() -> {
   GeoPolyhedron p = new GeoPolyhedron(cons, GeoPolyhedron.Type.UNKNOWN);
   p.setParentAlgorithm(this);
   return p;
  });
  outputPolyhedron.adjustOutputSize(1);
  outputPolygons = createOutputPolygons();
  outputSegments = createOutputSegments();
  updateHull();
  GeoPolyhedron p = getPolyhedron();
  int[][] faceIndices = quickHull3D.getFaces(QuickHull3D.POINT_RELATIVE | QuickHull3D.CLOCKWISE);
  for (int i = 0; i < faceIndices.length; i++) {
   p.startNewFace();
   for (int k = 0; k < faceIndices[i].length; k++) {
    int index = faceIndices[i][k];
    p.addPointToCurrentFace(this.pointList[index]);
   }
   p.endCurrentFace();
  }
  p.createFaces();
  refreshOutput();
  setLabels(labels);
  update();
  updateOutputSegmentsAndPolygonsParentAlgorithms();
 }
 private void updateHull() {
  for (int i = 0; i < pointList.length; i++) {
   Coords coords = pointList[i].getInhomCoordsInD3();
   point3dList[i].set(coords.getX(), coords.getY(), coords.getZ());
  }
  quickHull3D.build(point3dList);
 }
 public void compute() {
  updateHull();
  GeoPolyhedron p = getPolyhedron();
  ArrayList<ConstructionElementCycle> newFaces = new ArrayList<>();
  TreeSet<Integer> availableIndices = new TreeSet<>();
  availableIndices.addAll(p.getPolygonsIndices());
  int[][] faceIndices = quickHull3D.getFaces(QuickHull3D.POINT_RELATIVE | QuickHull3D.CLOCKWISE);
  for (int i = 0; i < faceIndices.length; i++) {
   p.startNewFace();
   for (int k = 0; k < faceIndices[i].length; k++) {
    int index = faceIndices[i][k];
    p.addPointToCurrentFace(this.pointList[index]);
   }
   Integer index = p.getCurrentFaceIndex();
   if (index == null) {
    newFaces.add(p.getCurrentFace());
   } else {
    availableIndices.remove(index);
   }
  }
  StringBuilder sb = new StringBuilder("\nnew faces:");
  for (ConstructionElementCycle face : newFaces) {
   sb.append("\n   ");
   sb.append(face);
  }
  sb.append("\navailable indices:");
  for (Integer index : availableIndices) {
   sb.append(" ");
   sb.append(index);
  }
  Log.debug(sb);
 }
 public GeoPolyhedron getPolyhedron() {
  return outputPolyhedron.getElement(0);
 }
 public GetCommand getClassName() {
  return Commands.Polyhedron;
 }
 private OutputHandler<GeoSegment3D> createOutputSegments() {
  return new OutputHandler<>(() -> {
   GeoSegment3D s = new GeoSegment3D(cons);
   return s;
  });
 }
 private OutputHandler<GeoPolygon3D> createOutputPolygons() {
  return new OutputHandler<>(() -> {
   GeoPolygon3D p = new GeoPolygon3D(cons);
   return p;
  });
 }
 private void setLabels(String[] labels) {
  if (labels == null || labels.length <= 1) {
   getPolyhedron().initLabels(labels);
  } else {
   getPolyhedron().setAllLabelsAreSet(true);
   for (int i = 0; i < labels.length; i++) {
    getOutput(i).setLabel(labels[i]);
   }
  }
 }
 private void updateOutputSegmentsAndPolygonsParentAlgorithms() {
  outputSegments.updateParentAlgorithm();
  outputPolygons.updateParentAlgorithm();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronNet.java
```java
public abstract class AlgoPolyhedronNet extends AlgoElement3D {
 protected GeoPolyhedron polyhedron;
 protected NumberValue v;
 private final GeoNumeric vNum;
 protected OutputHandler<GeoPolyhedronNet> outputNet;
 protected int bottomPointsLength;
 protected OutputHandler<GeoPoint3D> outputPointsBottom;
 protected OutputHandler<GeoPoint3D> outputPointsSide;
 protected OutputHandler<GeoPoint3D> outputPointsTop;
 protected OutputHandler<GeoSegment3D> outputSegmentsBottom;
 protected OutputHandler<GeoSegment3D> outputSegmentsSide;
 protected OutputHandler<GeoSegment3D> outputSegmentsTop;
 protected OutputHandler<GeoPolygon3D> outputPolygonsBottom;
 protected OutputHandler<GeoPolygon3D> outputPolygonsSide;
 protected OutputHandler<GeoPolygon3D> outputPolygonsTop;
 public AlgoPolyhedronNet(Construction c, String[] labels, GeoPolyhedron p, NumberValue v) {
  super(c);
  this.polyhedron = p;
  this.v = v;
  vNum = ChangeableParent.getGeoNumeric(v);
  outputNet = new OutputHandler<>(() -> {
   GeoPolyhedronNet p1 = new GeoPolyhedronNet(cons);
   p1.setParentAlgorithm(this);
   return p1;
  });
  outputNet.adjustOutputSize(1);
  outputPointsBottom = createOutputPoints();
  outputPointsSide = createOutputPoints();
  outputPointsTop = createOutputPoints();
  outputPolygonsBottom = createOutputPolygons();
  outputPolygonsSide = createOutputPolygons();
  outputPolygonsTop = createOutputPolygons();
  outputSegmentsBottom = createOutputSegments();
  outputSegmentsSide = createOutputSegments();
  outputSegmentsTop = createOutputSegments();
  bottomPointsLength = p.getBottomFace().getPointsLength();
  createNet(bottomPointsLength);
  input = new GeoElement[] {p, (GeoElement) v};
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
  getNet().createFaces();
  setOutput(bottomPointsLength);
  setLabels(labels);
  update();
  updateOutputSegmentsAndPolygonsParentAlgorithms();
 }
 private void setLabels(String[] labels) {
  kernel.batchAddStarted();
  if (labels == null || labels.length <= 1) {
   getNet().initLabels(labels);
  } else {
   getNet().setAllLabelsAreSet(true);
   int n = getPointLengthFromLabelsLength(labels.length);
   if (n > bottomPointsLength) {
    adjustOutputSize(n, false); 
   }
   for (int i = 0; i < labels.length; i++) {
    getOutput(i).setLabel(labels[i]);
   }
  }
  kernel.batchAddComplete();
 }
 protected abstract int getPointLengthFromLabelsLength(int length);
 protected abstract void createNet(int n);
 protected abstract void setOutputSideTop(
   int n, GeoPolygon3D polygon, int step, GeoSegmentND[] segments);
 private void setOutput(int n) {
  GeoPolyhedronNet net = getNet();
  Collection<GeoPolygon3D> faces = net.getFacesCollection();
  int step = 1;
  for (GeoPolygon polygon : faces) {
   GeoSegmentND[] segments = polygon.getSegments();
   if (step == 1) { 
    outputPolygonsBottom.addOutput((GeoPolygon3D) polygon, false);
    for (int i = 0; i < segments.length; i++) {
     outputSegmentsBottom.addOutput((GeoSegment3D) segments[i], false);
    }
   } else { 
    setOutputSideTop(n, (GeoPolygon3D) polygon, step, segments);
   }
   step++;
  }
  refreshOutput();
 }
 private OutputHandler<GeoPoint3D> createOutputPoints() {
  return new OutputHandler<>(() -> {
   GeoPoint3D p1 = new GeoPoint3D(cons);
   p1.setCoords(0, 0, 0, 1);
   p1.setParentAlgorithm(this);
   getNet().addPointCreated(p1);
   p1.setLabelVisible(false);
   p1.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return p1;
  });
 }
 private OutputHandler<GeoSegment3D> createOutputSegments() {
  return new OutputHandler<>(() -> {
   GeoSegment3D s = new GeoSegment3D(cons);
   s.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return s;
  });
 }
 private OutputHandler<GeoPolygon3D> createOutputPolygons() {
  return new OutputHandler<>(() -> {
   GeoPolygon3D poly = new GeoPolygon3D(cons);
   setChangeableParent(poly);
   poly.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return poly;
  }) {
   public void addOutput(GeoPolygon3D polygon, boolean setDependencies) {
    setChangeableParent(polygon);
    super.addOutput(polygon, setDependencies);
   }
  };
 }
 final void setChangeableParent(GeoPolygon3D polygon) {
  ChangeableParent.setPolyhedronNet(polygon, vNum, polyhedron, polyhedron);
 }
 protected void rotate(
   GeoPoint3D point,
   Coords pointCoords,
   Coords projectCoords,
   Coords o,
   Coords vs,
   double f,
   Coords fd,
   double dist,
   boolean test) {
  Coords v2 = projectCoords.sub(o);
  double d2 = pointCoords.distLine(o, vs);
  double angle;
  if (DoubleUtil.isEqual(dist, d2, kernel.getStandardPrecision())) {
   angle = Math.PI / 2;
  } else {
   angle = Math.asin(dist / d2);
  }
  if (test ^ (v2.crossProduct(vs).dotproduct(fd) < 0)) { 
   angle = Math.PI - angle;
  }
  point.rotate(f * angle, o, vs);
 }
 protected abstract void compute(double f, GeoPolygon bottomPolygon, Coords[] points);
 protected void adjustOutputSize(int n) {
  if (n > outputPointsBottom.size()) { 
   outputPointsBottom.adjustOutputSize(n, false);
  }
 }
 protected abstract void adjustOutputSize(int n, boolean setLabels);
 protected void updateBottom(int newBottomPointsLength) {
  GeoPolygon polygon = outputPolygonsBottom.getElement(0);
  GeoPoint3D[] points = new GeoPoint3D[newBottomPointsLength];
  GeoSegment3D[] segments = new GeoSegment3D[newBottomPointsLength];
  for (int i = 0; i < newBottomPointsLength; i++) {
   points[i] = outputPointsBottom.getElement(i);
   segments[i] = outputSegmentsBottom.getElement(i);
  }
  polygon.modifyInputPoints(points);
  polygon.setSegments(segments);
  polygon.calcArea();
 }
 public void compute() {
  if (!polyhedron.isDefined()) {
   setUndefined();
   return;
  }
  double f = v.getDouble();
  double precision = kernel.getStandardPrecision();
  if (DoubleUtil.isGreater(f, 1, precision) || DoubleUtil.isGreater(0, f, precision)) {
   setUndefined();
   return;
  }
  GeoPolygon bottomFace = polyhedron.getBottomFace();
  if (bottomFace.isConvex()) {
   getNet().setDefined();
   Coords[] points = getPointsCoords(bottomFace);
   adjustOutputSize(points.length);
   outputPointsBottom.setLabels(null);
   for (int i = 0; i < points.length; i++) {
    outputPointsBottom.getElement(i).setCoords(points[i]);
   }
   compute(f, bottomFace, points);
  } else {
   setUndefined();
  }
 }
 private void setUndefined() {
  getNet().setUndefined();
  outputPointsBottom.setUndefined();
  outputPointsSide.setUndefined();
  outputPointsTop.setUndefined();
 }
 protected static Coords[] getPointsCoords(GeoPolygon polygon) {
  int l = polygon.getPointsLength();
  Coords[] points = new Coords[l];
  for (int i = 0; i < l; i++) {
   points[i] = polygon.getPoint3D(i);
  }
  return points;
 }
 public GetCommand getClassName() {
  return Commands.Net;
 }
 public GeoPolyhedronNet getNet() {
  return outputNet.getElement(0);
 }
 private void updateOutputSegmentsAndPolygonsParentAlgorithms() {
  outputSegmentsBottom.updateParentAlgorithm();
  outputSegmentsSide.updateParentAlgorithm();
  outputPolygonsBottom.updateParentAlgorithm();
  outputPolygonsSide.updateParentAlgorithm();
  if (polyhedron.getType() == GeoPolyhedron.Type.PRISM) {
   outputSegmentsTop.updateParentAlgorithm();
   outputPolygonsTop.updateParentAlgorithm();
  }
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_NET;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronNetConvex.java
```java
public class AlgoPolyhedronNetConvex extends AlgoElement3D {
 protected GeoPolyhedron p;
 protected NumberValue v;
 private GeoPolygon bottomFace;
 protected int iBottom; 
 private GeoSegmentND[] userCutSegments;
 protected OutputHandler<GeoPolyhedronNet> outputNet;
 protected OutputHandler<GeoPoint3D> outputPointsNet;
 int pointsCounter = 0; 
 protected OutputHandler<GeoSegment3D> outputSegments;
 protected OutputHandler<GeoPolygon3D> outputPolygons;
 private ArrayList<ArrayList<Integer>> netMap = new ArrayList<>();
 private ArrayList<PolygonInfoElement> polygonInfo = new ArrayList<>();
 private ArrayList<ArrayList<Integer>> polygonChildSegsList = new ArrayList<>();
 protected ArrayList<GeoSegmentND> segmentList = new ArrayList<>();
 protected ArrayList<SegmentInfo> segmentInfoList = new ArrayList<>();
 private boolean netComplete = true;
 private Coords projCoord;
 static class SegmentInfo {
  int segmentParent1;
  int segmentParent2;
  int pointIndex1 = -1;
  int pointIndex2 = -1;
  boolean userCut = false;
 }
 static class PolygonInfoElement {
  int linkSegNumber;
  int rank;
  int segShift;
  ArrayList<Integer> pointIndex = new ArrayList<>();
 }
 public AlgoPolyhedronNetConvex(
   Construction c,
   String[] labels,
   GeoPolyhedron p,
   NumberValue v,
   GeoPolygon bottomFace,
   GeoSegmentND[] pivotSegments) {
  super(c);
  projCoord = new Coords(4);
  this.p = p;
  this.v = v;
  this.bottomFace = bottomFace;
  this.userCutSegments = pivotSegments;
  int pivotSegmentsLength = 0;
  if (pivotSegments != null) {
   pivotSegmentsLength = pivotSegments.length;
  }
  if (bottomFace == null) {
   input = new GeoElement[2 + pivotSegmentsLength];
   input[0] = p;
   input[1] = (GeoElement) v;
   for (int i = 0; i < pivotSegmentsLength; i++) {
    input[2 + i] = (GeoElement) pivotSegments[i];
   }
  } else {
   input = new GeoElement[3 + pivotSegmentsLength];
   input[0] = p;
   input[1] = (GeoElement) v;
   input[2] = bottomFace;
   for (int i = 0; i < pivotSegmentsLength; i++) {
    input[3 + i] = (GeoElement) pivotSegments[i];
   }
  }
  for (int i = 0; i < input.length; i++) {
   input[i].addAlgorithm(this);
  }
  outputNet = new OutputHandler<>(() -> {
   GeoPolyhedronNet p1 = new GeoPolyhedronNet(cons);
   p1.setParentAlgorithm(this);
   return p1;
  });
  outputNet.adjustOutputSize(1);
  outputPointsNet = createOutputPoints();
  outputPolygons = createOutputPolygons();
  outputSegments = createOutputSegments();
  kernel.batchAddStarted();
  netFacesCompute();
  if (iBottom != -1) {
   if (netComplete) {
    GeoPolyhedronNet net = getNet();
    GeoNumeric num = ChangeableParent.getGeoNumeric(v);
    Collection<GeoPolygon3D> faces = net.getFacesCollection();
    for (GeoPolygon3D polygon : faces) {
     ChangeableParent.setPolyhedronNet(polygon, num, p, outputNet.getElement(0));
     outputPolygons.addOutput(polygon, false);
    }
    for (GeoSegment3D segment : net.getSegments3D()) {
     outputSegments.addOutput(segment, false);
    }
   }
   refreshOutput();
   setLabels(labels);
   update();
   updateOutputSegmentsAndPolygonsParentAlgorithms();
  }
  kernel.batchAddComplete();
 }
 private void netFacesCompute() {
  setSegmentsToFacesLink(p);
  if (iBottom != -1) {
   netComplete = makeNetMap(p);
   if (netComplete) {
    getNet().clearIndexes();
    createNet();
    getNet().createFaces();
   }
  }
 }
 private void setSegmentsToFacesLink(GeoPolyhedron p) {
  segmentInfoList.clear();
  segmentList.clear();
  polygonChildSegsList.clear();
  if (bottomFace != null) {
   iBottom = -1; 
  } else {
   iBottom = 0;
  }
  GeoPolygon[] polygonList = p.getFaces();
  for (int iP = 0; iP < polygonList.length; iP++) {
   ArrayList<Integer> segsList = new ArrayList<>();
   GeoPolygon thisPolygon = polygonList[iP];
   if (iBottom < 0) { 
    if (bottomFace.isEqual(thisPolygon)) {
     iBottom = iP;
    }
   }
   for (GeoSegmentND thisSegment : thisPolygon.getSegments()) {
    boolean found = false;
    for (int i = 0; i < segmentList.size(); i++) {
     if (segmentList.get(i).isEqual(thisSegment)) {
      found = true;
      segmentInfoList.get(i).segmentParent2 = iP;
      segsList.add(i);
      break;
     }
    }
    if (!found) {
     segmentList.add(thisSegment);
     SegmentInfo newSegParent = new SegmentInfo();
     newSegParent.segmentParent1 = iP;
     if (userCutSegments != null) {
      for (GeoSegmentND pSeg : userCutSegments) {
       if (pSeg.isEqual(thisSegment)) {
        newSegParent.userCut = true;
       }
      }
     }
     segmentInfoList.add(newSegParent);
     segsList.add(segmentInfoList.size() - 1);
    }
   }
   polygonChildSegsList.add(segsList);
  }
 }
 private boolean makeNetMap(GeoPolyhedron p1) {
  netMap.clear();
  polygonInfo.clear();
  GeoPolygon[] polygonList = p1.getFaces();
  for (int iP = 0; iP < polygonList.length; iP++) {
   ArrayList<Integer> linkedPolygonList = new ArrayList<>();
   netMap.add(linkedPolygonList);
   PolygonInfoElement infoElt = new PolygonInfoElement();
   polygonInfo.add(infoElt);
  }
  netMap.get(iBottom).add(-1); 
  polygonInfo.get(iBottom).rank = 0; 
  polygonInfo.get(iBottom).linkSegNumber = -1; 
  boolean newFaceFound = true; 
  int nbFoundedFaces = 1;
  int maxRank = 0;
  while ((nbFoundedFaces < polygonList.length) && newFaceFound) {
   maxRank++;
   newFaceFound = false;
   for (int iP = 0; iP < polygonList.length; iP++) {
    if ((netMap.get(iP).size() == 1) && polygonInfo.get(iP).rank < maxRank) {
     for (int iSeg : polygonChildSegsList.get(iP)) {
      if (!segmentInfoList.get(iSeg).userCut) {
       int iChildPoly;
       if (segmentInfoList.get(iSeg).segmentParent1 == iP) {
        iChildPoly = segmentInfoList.get(iSeg).segmentParent2;
       } else {
        iChildPoly = segmentInfoList.get(iSeg).segmentParent1;
       }
       if (netMap.get(iChildPoly).size() == 0) { 
        netMap.get(iChildPoly).add(iP);
        polygonInfo.get(iChildPoly).rank = maxRank;
        polygonInfo.get(iChildPoly).linkSegNumber = iSeg;
        nbFoundedFaces++;
        newFaceFound = true;
        netMap.get(iP).add(iChildPoly);
       }
      }
     }
    }
   }
  }
  return newFaceFound;
 }
 public void compute() {
  if (!p.isDefined()) {
   setUndefined();
   return;
  }
  netFacesCompute();
  if (iBottom == -1) {
   setUndefined();
   return;
  }
  if (!netComplete) {
   setUndefined();
   return;
  }
  double f = v.getDouble();
  double precision = kernel.getStandardPrecision();
  if (DoubleUtil.isGreater(f, 1, precision) || DoubleUtil.isGreater(0, f, precision)) {
   setUndefined();
   return;
  }
  getNet().setDefined();
  for (int iPoly = 0; iPoly < polygonInfo.size(); iPoly++) {
   GeoPolygon currentFace = p.getFace(iPoly);
   Coords[] points = getPointsCoords(currentFace);
   int iBegin = 2;
   if (iPoly == iBottom) {
    iBegin = 0;
   }
   for (int i = iBegin; i < points.length; i++) {
    outputPointsNet
      .getElement(polygonInfo.get(iPoly).pointIndex.get(i))
      .setCoords(points[(i + polygonInfo.get(iPoly).segShift) % points.length]);
   }
  }
  getNet().setArea(p.getArea());
  rotateFace(iBottom, f);
 }
 private ArrayList<Integer> rotateFace(int iFace, double fUnsigned) {
  double f = fUnsigned;
  ArrayList<Integer> pointsToRotate = new ArrayList<>();
  for (int i = 1; i < netMap.get(iFace).size(); i++) {
   pointsToRotate.addAll(rotateFace(netMap.get(iFace).get(i), f));
  }
  if (iFace != iBottom) {
   for (int index = 2; index < polygonInfo.get(iFace).pointIndex.size(); index++) {
    pointsToRotate.add(polygonInfo.get(iFace).pointIndex.get(index));
   }
   GeoPolygon face = p.getFace(netMap.get(iFace).get(0));
   GeoPoint3D facePoint =
     outputPointsNet.getElement(polygonInfo.get(iFace).pointIndex.get(2));
   Coords cCoord = facePoint.getInhomCoordsInD3();
   cCoord.projectPlane(face.getCoordSys().getMatrixOrthonormal(), projCoord);
   double dist = projCoord.distance(cCoord);
   Coords o =
     outputPointsNet.getElement(polygonInfo.get(iFace).pointIndex.get(1)).getInhomCoordsInD3();
   Coords o1 = segmentList
     .get(polygonInfo.get(iFace).linkSegNumber)
     .getStartPoint()
     .getInhomCoordsInD3();
   Coords vs = segmentList.get(polygonInfo.get(iFace).linkSegNumber).getDirectionInD3();
   int sgn = 1;
   if (DoubleUtil.isGreater(o1.distance(o), 0, kernel.getStandardPrecision())) {
    sgn = -1;
   }
   Coords faceDirection = face.getDirectionInD3();
   if (face.isConvexInverseDirection()) {
    f *= -1;
    sgn *= -1;
   }
   Coords v2 = projCoord.sub(o);
   double d2 = cCoord.distLine(o, vs);
   double angle;
   if (DoubleUtil.isEqual(dist, d2, kernel.getStandardPrecision())) {
    angle = Math.PI / 2;
   } else {
    angle = Math.asin(dist / d2);
   }
   if (sgn * v2.crossProduct(vs).dotproduct(faceDirection) < 0) { 
    angle = Math.PI - angle;
   }
   for (int iPoint = 0; iPoint < pointsToRotate.size(); iPoint++) {
    facePoint = outputPointsNet.getElement(pointsToRotate.get(iPoint));
    facePoint.rotate(f * sgn * angle, o, vs);
   }
  }
  return pointsToRotate;
 }
 private OutputHandler<GeoPoint3D> createOutputPoints() {
  return new OutputHandler<>(() -> {
   GeoPoint3D p1 = new GeoPoint3D(cons);
   p1.setCoords(0, 0, 0, 1);
   p1.setParentAlgorithm(this);
   getNet().addPointCreated(p1);
   p1.setLabelVisible(false);
   p1.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return p1;
  });
 }
 public GeoPolyhedronNet getNet() {
  return outputNet.getElement(0);
 }
 public GetCommand getClassName() {
  return Commands.Net;
 }
 protected void createNet() {
  GeoPolyhedronNet net = getNet();
  int iNetPoints = 0;
  for (int i = 0; i < p.getFacesSize(); i++) {
   iNetPoints = iNetPoints + p.getFace(i).getPointsLength();
   if (i != iBottom) {
    iNetPoints -= 2;
   }
  }
  outputPointsNet.adjustOutputSize(iNetPoints, false);
  outputPointsNet.setLabels(null);
  pointsCounter = 0;
  createFace(iBottom);
  for (int pNum = 0; pNum < polygonInfo.size(); pNum++) {
   net.startNewFace();
   for (int i : polygonInfo.get(pNum).pointIndex) {
    net.addPointToCurrentFace(outputPointsNet.getElement(i));
   }
   net.endCurrentFace();
  }
 }
 private void createFace(int faceNumber) {
  int linkSegNumber = polygonInfo.get(faceNumber).linkSegNumber;
  ArrayList<Integer> currentPolygonSegList = polygonChildSegsList.get(faceNumber);
  if (linkSegNumber != -1) {
   int linkSegIndex;
   for (linkSegIndex = 0;
     currentPolygonSegList.get(linkSegIndex) != linkSegNumber;
     linkSegIndex++) {
    if (currentPolygonSegList.get(linkSegIndex) != linkSegNumber) {
     segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex1 = -1;
     segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex2 = -1;
    }
   }
   polygonInfo.get(faceNumber).segShift = linkSegIndex;
   if (linkSegIndex == 0) { 
    segmentInfoList.get(currentPolygonSegList.get(1)).pointIndex1 =
      segmentInfoList.get(currentPolygonSegList.get(0)).pointIndex1;
    segmentInfoList.get(currentPolygonSegList.get(currentPolygonSegList.size() - 1))
        .pointIndex2 =
      segmentInfoList.get(currentPolygonSegList.get(0)).pointIndex2;
   } else {
    segmentInfoList.get(
          currentPolygonSegList.get((linkSegIndex + 1) % currentPolygonSegList.size()))
        .pointIndex1 =
      segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex1;
    segmentInfoList.get(currentPolygonSegList.get(linkSegIndex - 1)).pointIndex2 =
      segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex2;
   }
   int temp = segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex1;
   segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex1 =
     segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex2;
   segmentInfoList.get(currentPolygonSegList.get(linkSegIndex)).pointIndex2 = temp;
   for (int linkSegIndex2 = linkSegIndex + 1;
     linkSegIndex2 < currentPolygonSegList.size();
     linkSegIndex2++) {
    if (linkSegIndex2 > linkSegIndex + 1) {
     segmentInfoList.get(currentPolygonSegList.get(linkSegIndex2)).pointIndex1 = -1;
    }
    if ((linkSegIndex2 < currentPolygonSegList.size() - 1) || (linkSegIndex != 0)) {
     segmentInfoList.get(currentPolygonSegList.get(linkSegIndex2)).pointIndex2 = -1;
    }
   }
   for (int segNumber = 0; segNumber < currentPolygonSegList.size(); segNumber++) {
    if (segmentInfoList.get(currentPolygonSegList.get(segNumber)).pointIndex1 == -1) {
     segmentInfoList.get(currentPolygonSegList.get(segNumber)).pointIndex1 = pointsCounter;
     if (segNumber > 0) {
      segmentInfoList.get(currentPolygonSegList.get(segNumber - 1)).pointIndex2 =
        pointsCounter;
     } else {
      segmentInfoList.get(currentPolygonSegList.get(currentPolygonSegList.size() - 1))
        .pointIndex2 = pointsCounter;
     }
     pointsCounter++;
    }
    if (segmentInfoList.get(currentPolygonSegList.get(segNumber)).pointIndex2 == -1) {
     segmentInfoList.get(currentPolygonSegList.get(segNumber)).pointIndex2 = pointsCounter;
     segmentInfoList.get(
         currentPolygonSegList.get((segNumber + 1) % currentPolygonSegList.size()))
       .pointIndex1 = pointsCounter;
     pointsCounter++;
    }
   }
   for (int segNumber = polygonInfo.get(faceNumber).segShift;
     segNumber < polygonInfo.get(faceNumber).segShift + currentPolygonSegList.size();
     segNumber++) {
    polygonInfo
      .get(faceNumber)
      .pointIndex
      .add(segmentInfoList.get(
          currentPolygonSegList.get(segNumber % currentPolygonSegList.size()))
        .pointIndex1);
   }
  } else { 
   int segNumber;
   for (segNumber = 0; segNumber < currentPolygonSegList.size(); segNumber++) {
    segmentInfoList.get(currentPolygonSegList.get(segNumber)).pointIndex2 = pointsCounter;
    segmentInfoList.get(
        currentPolygonSegList.get((segNumber + 1) % currentPolygonSegList.size()))
      .pointIndex1 = pointsCounter;
    pointsCounter++;
   }
   for (segNumber = polygonInfo.get(faceNumber).segShift;
     segNumber < polygonInfo.get(faceNumber).segShift + currentPolygonSegList.size();
     segNumber++) {
    polygonInfo
      .get(faceNumber)
      .pointIndex
      .add(segmentInfoList.get(
          currentPolygonSegList.get(segNumber % currentPolygonSegList.size()))
        .pointIndex1);
   }
  }
  for (int childPolygonIndex = 1;
    childPolygonIndex < netMap.get(faceNumber).size();
    childPolygonIndex++) {
   createFace(netMap.get(faceNumber).get(childPolygonIndex));
  }
 }
 private OutputHandler<GeoSegment3D> createOutputSegments() {
  return new OutputHandler<>(() -> {
   GeoSegment3D s = new GeoSegment3D(cons);
   s.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return s;
  });
 }
 private OutputHandler<GeoPolygon3D> createOutputPolygons() {
  return new OutputHandler<>(() -> {
   GeoPolygon3D p1 = new GeoPolygon3D(cons);
   p1.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
   return p1;
  });
 }
 private void setLabels(String[] labels) {
  if (labels == null || labels.length <= 1) {
   getNet().initLabels(labels);
  } else {
   getNet().setAllLabelsAreSet(true);
   for (int i = 0; i < labels.length; i++) {
    getOutput(i).setLabel(labels[i]);
   }
  }
 }
 private void updateOutputSegmentsAndPolygonsParentAlgorithms() {
  outputSegments.updateParentAlgorithm();
  outputPolygons.updateParentAlgorithm();
 }
 protected static Coords[] getPointsCoords(GeoPolygon polygon) {
  int l = polygon.getPointsLength();
  Coords[] points = new Coords[l];
  for (int i = 0; i < l; i++) {
   points[i] = polygon.getPoint3D(i);
  }
  return points;
 }
 private void setUndefined() {
  getNet().setUndefined();
  outputPointsNet.setUndefined();
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_NET;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronNetPrism.java
```java
public class AlgoPolyhedronNetPrism extends AlgoPolyhedronNet {
 private Coords pp1;
 public AlgoPolyhedronNetPrism(Construction c, String[] labels, GeoPolyhedron p, NumberValue v) {
  super(c, labels, p, v);
 }
 protected int getPointLengthFromLabelsLength(int length) {
  return length / 10;
 }
 protected void createNet(int n) {
  GeoPolyhedronNet net = getNet();
  outputPointsBottom.adjustOutputSize(n, false);
  outputPointsSide.adjustOutputSize(2 * n, false);
  outputPointsTop.adjustOutputSize(n - 2, false);
  net.startNewFace();
  for (int i = 0; i < n; i++) {
   net.addPointToCurrentFace(outputPointsBottom.getElement(i));
  }
  net.endCurrentFace();
  for (int i = 0; i < n; i++) {
   createSideFace(net, i, n);
  }
  net.startNewFace();
  net.addPointToCurrentFace(outputPointsSide.getElement(0));
  net.addPointToCurrentFace(outputPointsSide.getElement(1));
  for (int i = 0; i < n - 2; i++) {
   net.addPointToCurrentFace(outputPointsTop.getElement(i));
  }
  net.endCurrentFace();
 }
 protected void setOutputSideTop(int n, GeoPolygon3D polygon, int step, GeoSegmentND[] segments) {
  if (step == n + 2) { 
   outputPolygonsTop.addOutput(polygon, false);
   for (int i = 1; i < segments.length; i++) {
    outputSegmentsTop.addOutput((GeoSegment3D) segments[i], false);
   }
  } else {
   setOutputSide(polygon);
  }
 }
 private void setOutputSide(GeoPolygon3D polygon) {
  outputPolygonsSide.addOutput(polygon, false);
  outputSegmentsSide.addOutput((GeoSegment3D) polygon.getSegments()[3], false);
  outputSegmentsSide.addOutput((GeoSegment3D) polygon.getSegments()[2], false);
  outputSegmentsSide.addOutput((GeoSegment3D) polygon.getSegments()[1], false);
 }
 public void compute(double fUnsigned, GeoPolygon bottomPolygon, Coords[] points) {
  double f = fUnsigned;
  if (pp1 == null) {
   pp1 = new Coords(4);
  }
  Coords[] topP = getPointsCoords(polyhedron.getTopFace());
  Coords topCo = topP[0];
  topCo.projectPlane(bottomPolygon.getCoordSys().getMatrixOrthonormal(), pp1);
  double dd1 = polyhedron.getOrientedHeight();
  if (dd1 < 0) { 
   f *= -1;
   dd1 *= -1;
  }
  Coords faceDirection = bottomPolygon.getDirectionInD3();
  if (bottomPolygon.isConvexInverseDirection()) {
   f *= -1;
   faceDirection = faceDirection.mul(-1);
  }
  GeoPoint3D wpoint1;
  GeoPoint3D wpoint2;
  GeoPoint3D wpoint3;
  Coords cCoord; 
  int sz = points.length;
  for (int i = 0; i < sz; i++) {
   wpoint1 = outputPointsSide.getElement(2 * i);
   int j = 2 * i - 1;
   if (j < 0) {
    j = 2 * sz - 1;
   }
   wpoint2 = outputPointsSide.getElement(j);
   cCoord = topP[i];
   wpoint1.setCoords(cCoord);
   wpoint2.setCoords(cCoord);
   if (i > 1) { 
    wpoint3 = outputPointsTop.getElement(i - 2);
    wpoint3.setCoords(cCoord);
   }
  }
  Coords[] bottomSegsDirections = new Coords[sz];
  Coords p1 = points[sz - 1];
  Coords p2 = points[0];
  bottomSegsDirections[sz - 1] = p2.sub(p1).normalized();
  for (int i = 0; i < sz - 1; i++) {
   p1 = p2;
   p2 = points[i + 1];
   bottomSegsDirections[i] = p2.sub(p1).normalized();
  }
  Coords o = topP[1];
  Coords vs = bottomSegsDirections[0];
  GeoPolygon side0 = polyhedron.getFirstSideFace();
  for (int i = 0; i < sz - 2; i++) {
   wpoint3 = outputPointsTop.getElement(i);
   cCoord = wpoint3.getInhomCoordsInD3();
   cCoord.projectPlane(side0.getCoordSys().getMatrixOrthonormal(), pp1);
   double dist = pp1.distance(cCoord);
   rotate(wpoint3, cCoord, pp1, o, vs, f, side0.getDirectionInD3(), dist, true);
  }
  for (int i = 0; i < 2 * sz; i += 2) {
   o = points[i / 2];
   vs = bottomSegsDirections[i / 2];
   wpoint1 = outputPointsSide.getElement(i);
   cCoord = wpoint1.getInhomCoordsInD3();
   cCoord.projectPlane(bottomPolygon.getCoordSys().getMatrixOrthonormal(), pp1);
   rotate(wpoint1, cCoord, pp1, o, vs, f, faceDirection, dd1, false);
   wpoint2 = outputPointsSide.getElement(i + 1);
   cCoord = wpoint2.getInhomCoordsInD3();
   cCoord.projectPlane(bottomPolygon.getCoordSys().getMatrixOrthonormal(), pp1);
   rotate(wpoint2, cCoord, pp1, o, vs, f, faceDirection, dd1, false);
   if (i == 0) { 
    for (int j = 0; j < sz - 2; j++) {
     wpoint3 = outputPointsTop.getElement(j);
     rotate(wpoint3, cCoord, pp1, o, vs, f, faceDirection, dd1, false);
    }
   }
  }
  getNet().setArea(polyhedron.getArea());
 }
 protected void adjustOutputSize(int newBottomPointsLength) {
  adjustOutputSize(newBottomPointsLength, true);
 }
 protected void adjustOutputSize(int newBottomPointsLength, boolean setLabels) {
  super.adjustOutputSize(newBottomPointsLength);
  int nOld = outputPointsSide.size() / 2;
  if (newBottomPointsLength > nOld) {
   outputPointsTop.adjustOutputSize(newBottomPointsLength - 2, false);
   if (setLabels) {
    outputPointsTop.setLabels(null);
   }
   GeoPolyhedronNet net = getNet();
   for (int i = nOld; i < newBottomPointsLength - 1; i++) {
    GeoSegment3D segmentTop = (GeoSegment3D)
      net.createSegment(outputPointsTop.getElement(i - 2), outputPointsTop.getElement(i - 1));
    outputSegmentsTop.addOutput(segmentTop, false);
   }
   GeoSegment3D segmentTop = (GeoSegment3D) net.createSegment(
     outputPointsTop.getElement(newBottomPointsLength - 3), outputPointsSide.getElement(0));
   outputSegmentsTop.addOutput(segmentTop, false);
   if (setLabels) {
    outputSegmentsTop.setLabels(null);
   }
  }
  if (newBottomPointsLength > bottomPointsLength) {
   for (int i = bottomPointsLength; i < newBottomPointsLength && i <= nOld; i++) {
    GeoSegmentND segmentBottom = outputSegmentsBottom.getElement(i - 1);
    segmentBottom.modifyInputPoints(
      outputPointsBottom.getElement(i - 1), outputPointsBottom.getElement(i));
    GeoSegmentND segmentTop = outputSegmentsTop.getElement(i - 2);
    segmentTop.modifyInputPoints(
      outputPointsTop.getElement(i - 3), outputPointsTop.getElement(i - 2));
   }
   for (int i = bottomPointsLength - 1; i < newBottomPointsLength && i < nOld; i++) {
    updateSide(i, newBottomPointsLength);
   }
  }
  if (newBottomPointsLength > nOld) {
   outputPointsSide.adjustOutputSize(newBottomPointsLength * 2, false);
   if (setLabels) {
    outputPointsSide.setLabels(null);
   }
   GeoPolyhedronNet net = getNet();
   for (int i = nOld; i < newBottomPointsLength; i++) {
    createSideFace(net, i, newBottomPointsLength);
    GeoPolygon3D polygon = net.createPolygon(i + 2); 
    setOutputSide(polygon);
    outputSegmentsBottom.addOutput((GeoSegment3D) polygon.getSegments()[0], false); 
   }
   if (setLabels) {
    outputSegmentsBottom.setLabels(null);
    outputSegmentsSide.setLabels(null);
    outputPolygonsSide.setLabels(null);
   }
   refreshOutput();
  }
  if (newBottomPointsLength > bottomPointsLength) {
   updateBottom(newBottomPointsLength);
   updateTop(newBottomPointsLength);
  } else if (newBottomPointsLength < bottomPointsLength) {
   for (int i = newBottomPointsLength; i < bottomPointsLength; i++) {
    outputPointsBottom.getElement(i).setUndefined();
    outputPointsSide.getElement(2 * i).setUndefined();
    outputPointsSide.getElement(2 * i + 1).setUndefined();
    outputPointsTop.getElement(i - 2).setUndefined();
   }
   GeoSegmentND segmentBottom = outputSegmentsBottom.getElement(newBottomPointsLength - 1);
   segmentBottom.modifyInputPoints(
     outputPointsBottom.getElement(newBottomPointsLength - 1),
     outputPointsBottom.getElement(0));
   updateBottom(newBottomPointsLength);
   GeoSegmentND segmentTop = outputSegmentsTop.getElement(newBottomPointsLength - 2);
   segmentTop.modifyInputPoints(
     outputPointsTop.getElement(newBottomPointsLength - 3), outputPointsSide.getElement(0));
   updateTop(newBottomPointsLength);
   updateSide(newBottomPointsLength - 1, newBottomPointsLength);
  }
  bottomPointsLength = newBottomPointsLength;
 }
 private void updateSide(int index, int newBottomPointsLength) {
  GeoPointND pointBottom1 = outputPointsBottom.getElement(index);
  GeoPointND pointBottom2 = outputPointsBottom.getElement((index + 1) % newBottomPointsLength);
  GeoPointND pointSide2 = outputPointsSide.getElement(2 * index);
  GeoPointND pointSide1 =
    outputPointsSide.getElement((2 * index + 1) % (2 * newBottomPointsLength));
  GeoSegmentND segmentSide3 = outputSegmentsSide.getElement(3 * index);
  GeoSegmentND segmentSide2 = outputSegmentsSide.getElement(3 * index + 1);
  GeoSegmentND segmentSide1 =
    outputSegmentsSide.getElement((3 * index + 2) % (3 * newBottomPointsLength));
  segmentSide1.modifyInputPoints(pointBottom2, pointSide1);
  segmentSide2.modifyInputPoints(pointSide1, pointSide2);
  segmentSide3.modifyInputPoints(pointSide2, pointBottom1);
  GeoPolygon polygon = outputPolygonsSide.getElement(index);
  GeoPointND[] points = new GeoPointND[4];
  points[0] = pointBottom1;
  points[1] = pointBottom2;
  points[2] = pointSide1;
  points[3] = pointSide2;
  polygon.modifyInputPoints(points);
  GeoSegmentND[] s = new GeoSegmentND[4];
  GeoSegmentND segmentBottom = outputSegmentsBottom.getElement(index);
  s[0] = segmentBottom;
  s[1] = segmentSide1;
  s[2] = segmentSide2;
  s[3] = segmentSide3;
  polygon.setSegments(s);
  polygon.calcArea();
 }
 private void createSideFace(GeoPolyhedronNet net, int index, int newBottomPointsLength) {
  net.startNewFace();
  net.addPointToCurrentFace(outputPointsBottom.getElement(index));
  net.addPointToCurrentFace(outputPointsBottom.getElement((index + 1) % newBottomPointsLength));
  net.addPointToCurrentFace(
    outputPointsSide.getElement((2 * index + 1) % (2 * newBottomPointsLength)));
  net.addPointToCurrentFace(outputPointsSide.getElement(2 * index));
  net.endCurrentFace();
 }
 protected void updateTop(int newBottomPointsLength) {
  GeoPolygon polygon = outputPolygonsTop.getElement(0);
  GeoPoint3D[] points = new GeoPoint3D[newBottomPointsLength];
  GeoSegment3D[] segments = new GeoSegment3D[newBottomPointsLength];
  points[0] = outputPointsSide.getElement(0);
  points[1] = outputPointsSide.getElement(1);
  for (int i = 2; i < newBottomPointsLength; i++) {
   points[i] = outputPointsTop.getElement(i - 2);
  }
  segments[0] = outputSegmentsSide.getElement(0);
  for (int i = 1; i < newBottomPointsLength; i++) {
   segments[i] = outputSegmentsTop.getElement(i - 1);
  }
  polygon.modifyInputPoints(points);
  polygon.setSegments(segments);
  polygon.calcArea();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronNetPyramid.java
```java
public class AlgoPolyhedronNetPyramid extends AlgoPolyhedronNet {
 private Coords p1;
 public AlgoPolyhedronNetPyramid(Construction c, String[] labels, GeoPolyhedron p, NumberValue v) {
  super(c, labels, p, v);
 }
 protected int getPointLengthFromLabelsLength(int length) {
  return (length - 2) / 6;
 }
 protected void createNet(int n) {
  GeoPolyhedronNet net = getNet();
  outputPointsBottom.adjustOutputSize(n, false);
  outputPointsSide.adjustOutputSize(n, false);
  net.startNewFace();
  for (int i = 0; i < n; i++) {
   net.addPointToCurrentFace(outputPointsBottom.getElement(i));
  }
  net.endCurrentFace();
  for (int i = 0; i < n; i++) {
   createSideFace(net, i, n);
  }
 }
 private void createSideFace(GeoPolyhedronNet net, int index, int newBottomPointsLength) {
  net.startNewFace();
  net.addPointToCurrentFace(outputPointsBottom.getElement(index));
  net.addPointToCurrentFace(outputPointsBottom.getElement((index + 1) % newBottomPointsLength));
  net.addPointToCurrentFace(outputPointsSide.getElement(index));
  net.endCurrentFace();
 }
 protected void setOutputSideTop(int n, GeoPolygon3D polygon, int step, GeoSegmentND[] segments) {
  setOutputSide(polygon);
 }
 private void setOutputSide(GeoPolygon3D polygon) {
  outputPolygonsSide.addOutput(polygon, false);
  outputSegmentsSide.addOutput((GeoSegment3D) polygon.getSegments()[2], false);
  outputSegmentsSide.addOutput((GeoSegment3D) polygon.getSegments()[1], false);
 }
 protected void adjustOutputSize(int newBottomPointsLength) {
  adjustOutputSize(newBottomPointsLength, true);
 }
 protected void adjustOutputSize(int newBottomPointsLength, boolean setLabels) {
  super.adjustOutputSize(newBottomPointsLength);
  int nOld = outputPointsSide.size();
  if (newBottomPointsLength > bottomPointsLength) {
   for (int i = bottomPointsLength; i < newBottomPointsLength && i <= nOld; i++) {
    GeoSegmentND segmentBottom = outputSegmentsBottom.getElement(i - 1);
    segmentBottom.modifyInputPoints(
      outputPointsBottom.getElement(i - 1), outputPointsBottom.getElement(i));
   }
   for (int i = bottomPointsLength - 1; i < newBottomPointsLength && i < nOld; i++) {
    updateSide(i, newBottomPointsLength);
   }
  }
  if (newBottomPointsLength > nOld) {
   outputPointsSide.adjustOutputSize(newBottomPointsLength, false);
   if (setLabels) {
    outputPointsSide.setLabels(null);
   }
   GeoPolyhedronNet net = getNet();
   for (int i = nOld; i < newBottomPointsLength; i++) {
    createSideFace(net, i, newBottomPointsLength);
    GeoPolygon3D polygon = net.createPolygon(i + 1); 
    setOutputSide(polygon);
    outputSegmentsBottom.addOutput((GeoSegment3D) polygon.getSegments()[0], false); 
   }
   if (setLabels) {
    outputSegmentsBottom.setLabels(null);
    outputSegmentsSide.setLabels(null);
    outputPolygonsSide.setLabels(null);
   }
   refreshOutput();
  }
  if (newBottomPointsLength > bottomPointsLength) {
   updateBottom(newBottomPointsLength);
  } else if (newBottomPointsLength < bottomPointsLength) {
   for (int i = newBottomPointsLength; i < bottomPointsLength; i++) {
    outputPointsSide.getElement(i).setUndefined();
    outputPointsBottom.getElement(i).setUndefined();
   }
   GeoSegmentND segmentBottom = outputSegmentsBottom.getElement(newBottomPointsLength - 1);
   segmentBottom.modifyInputPoints(
     outputPointsBottom.getElement(newBottomPointsLength - 1),
     outputPointsBottom.getElement(0));
   updateBottom(newBottomPointsLength);
   updateSide(newBottomPointsLength - 1, newBottomPointsLength);
  }
  bottomPointsLength = newBottomPointsLength;
 }
 private void updateSide(int index, int newBottomPointsLength) {
  GeoPointND pointBottom1 = outputPointsBottom.getElement(index);
  GeoPointND pointBottom2 = outputPointsBottom.getElement((index + 1) % newBottomPointsLength);
  GeoPointND pointSide = outputPointsSide.getElement(index);
  GeoSegmentND segmentBottom = outputSegmentsBottom.getElement(index);
  GeoSegmentND segmentSide1 = outputSegmentsSide.getElement(2 * index);
  GeoSegmentND segmentSide2 =
    outputSegmentsSide.getElement((2 * index + 1) % (2 * newBottomPointsLength));
  segmentSide2.modifyInputPoints(pointBottom2, pointSide);
  segmentSide1.modifyInputPoints(pointSide, pointBottom1);
  GeoPolygon polygon = outputPolygonsSide.getElement(index);
  GeoPointND[] points = new GeoPointND[3];
  points[0] = pointBottom1;
  points[1] = pointBottom2;
  points[2] = pointSide;
  polygon.modifyInputPoints(points);
  GeoSegmentND[] s = new GeoSegmentND[3];
  s[0] = segmentBottom;
  s[1] = segmentSide2;
  s[2] = segmentSide1;
  polygon.setSegments(s);
  polygon.calcArea();
 }
 public void compute(double f0, GeoPolygon bottomPolygon, Coords[] points) {
  if (p1 == null) {
   p1 = new Coords(4);
  }
  Coords topCoords = polyhedron.getTopPoint();
  topCoords.projectPlane(bottomPolygon.getCoordSys().getMatrixOrthonormal(), p1);
  double d1 = polyhedron.getOrientedHeight();
  double f = f0;
  Coords faceDirection = bottomPolygon.getDirectionInD3();
  if (d1 < 0) { 
   f *= -1;
   d1 *= -1;
  }
  if (bottomPolygon.isConvexInverseDirection()) {
   f *= -1;
   faceDirection = faceDirection.mul(-1);
  }
  int n = points.length;
  Coords o2 = points[0];
  for (int i = 0; i < n; i++) {
   GeoPoint3D wpoint = outputPointsSide.getElement(i);
   wpoint.setCoords(topCoords, false);
   Coords o = o2;
   o2 = points[(i + 1) % n];
   Coords vs = o2.sub(o).normalized();
   rotate(wpoint, topCoords, p1, o, vs, f, faceDirection, d1, false);
  }
  getNet().setArea(polyhedron.getArea());
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronPoints.java
```java
public abstract class AlgoPolyhedronPoints extends AlgoPolyhedron {
 private GeoPointND[] bottomPoints;
 protected GeoPointND[] points;
 private GeoPointND topPoint;
 protected GeoPolygon bottom;
 protected NumberValue height;
 protected boolean bottomAsInput = false;
 protected int bottomPointsLength = -1;
 protected OutputHandler<GeoSegment3D> outputSegmentsBottom;
 protected OutputHandler<GeoSegment3D> outputSegmentsSide;
 protected OutputHandler<GeoSegment3D> outputSegmentsTop;
 protected OutputHandler<GeoPolygon3D> outputPolygonsBottom;
 protected OutputHandler<GeoPolygon3D> outputPolygonsSide;
 protected OutputHandler<GeoPolygon3D> outputPolygonsTop;
 ChangeableParent heightChangeableParent = null;
 private final int shift;
 private final class OutputPolygonsHandler extends OutputHandler<GeoPolygon3D> {
  private OutputPolygonsHandler(ElementFactory<GeoPolygon3D> factory) {
   super(factory);
  }
  public void addOutput(GeoPolygon3D geo, boolean setDependencies) {
   if (heightChangeableParent != null) {
    geo.setChangeableParent(heightChangeableParent);
   }
   super.addOutput(geo, setDependencies);
  }
 }
 protected OutputHandler<GeoPolygon3D> createOutputPolygonsHandler() {
  return new OutputPolygonsHandler(() -> {
   GeoPolygon3D p = new GeoPolygon3D(cons);
   if (heightChangeableParent != null) {
    p.setChangeableParent(heightChangeableParent);
   }
   return p;
  });
 }
 private final class OutputSegmentsHandler extends OutputHandler<GeoSegment3D> {
  private OutputSegmentsHandler(ElementFactory<GeoSegment3D> factory) {
   super(factory);
  }
  public void addOutput(GeoSegment3D geo, boolean setDependencies) {
   if (heightChangeableParent != null) {
    geo.setChangeableParentIfNull(heightChangeableParent);
   }
   super.addOutput(geo, setDependencies);
  }
 }
 protected OutputHandler<GeoSegment3D> createOutputSegmentsHandler() {
  return new OutputSegmentsHandler(() -> {
   GeoSegment3D s = new GeoSegment3D(cons);
   if (heightChangeableParent != null) {
    s.setChangeableParentIfNull(heightChangeableParent);
   }
   return s;
  });
 }
 private final class OutputPointsHandler extends OutputHandler<GeoPoint3D> {
  private OutputPointsHandler() {
   super(new PointFactory() {
    public GeoPoint3D newElement() {
     GeoPoint3D ret = super.newElement();
     if (heightChangeableParent != null) {
      ret.setChangeableParentIfNull(heightChangeableParent);
     }
     return ret;
    }
   });
  }
  public void addOutput(GeoPoint3D geo, boolean setDependencies) {
   if (heightChangeableParent != null) {
    geo.setChangeableParentIfNull(heightChangeableParent);
   }
   super.addOutput(geo, setDependencies);
  }
 }
 protected OutputHandler<GeoPoint3D> createOutputPointsHandler() {
  return new OutputPointsHandler();
 }
 public AlgoPolyhedronPoints(Construction c, String[] labels, GeoPointND[] points) {
  super(c);
  init();
  initCoords();
  bottomPoints = new GeoPointND[points.length - 1];
  for (int i = 0; i < points.length - 1; i++) {
   bottomPoints[i] = points[i];
  }
  setTopPoint(points[points.length - 1]);
  shift = 1; 
  createPolyhedron();
  input = new GeoElement[points.length];
  for (int i = 0; i < points.length; i++) {
   input[i] = (GeoElement) points[i];
  }
  addAlgoToInput();
  updateOutputPoints();
  createFaces();
  setOutput();
  setLabels(labels);
  update();
  updateOutputSegmentsAndPolygonsParentAlgorithms();
 }
 public AlgoPolyhedronPoints(
   Construction c, String[] labels, GeoPolygon polygon, GeoPointND point) {
  super(c);
  init();
  initCoords();
  bottom = polygon;
  bottomAsInput = true;
  setTopPoint(point);
  shift = 1; 
  createPolyhedron();
  input = new GeoElement[2];
  input[0] = bottom;
  input[1] = (GeoElement) topPoint;
  addAlgoToInput();
  updateOutputPoints();
  createFaces();
  setOutput();
  setLabels(labels);
  update();
  updateOutputSegmentsAndPolygonsParentAlgorithms();
 }
 public AlgoPolyhedronPoints(
   Construction c, String[] labels, GeoPolygon polygon, NumberValue height) {
  super(c);
  init();
  GeoNumeric changeableHeight = ChangeableParent.getGeoNumeric(height);
  if (changeableHeight != null) {
   heightChangeableParent =
     new ChangeableParent(changeableHeight, polygon, new ExtrudeConverter(), getPolyhedron());
  }
  initCoords();
  bottom = polygon;
  bottomAsInput = true;
  this.height = height;
  shift = 0; 
  outputPoints.augmentOutputSize(1, false);
  setTopPoint(outputPoints.getElement(0));
  createPolyhedron();
  input = new GeoElement[2];
  input[0] = bottom;
  input[1] = (GeoElement) height;
  addAlgoToInput();
  updateOutputPoints();
  createFaces();
  setOutput();
  setLabels(labels);
  update();
  updateOutputSegmentsAndPolygonsParentAlgorithms();
 }
 protected void createOutputSegments() {
  outputSegmentsBottom = createOutputSegmentsHandler();
  outputSegmentsSide = createOutputSegmentsHandler();
  outputSegmentsTop = createOutputSegmentsHandler();
 }
 protected void createOutputPolygons() {
  outputPolygonsBottom = createOutputPolygonsHandler();
  outputPolygonsSide = createOutputPolygonsHandler();
  outputPolygonsTop = createOutputPolygonsHandler();
 }
 protected void augmentOutputSize(int length) {
  int n = getSideLengthFromLabelsLength(length);
  if (n > outputSegmentsSide.size()) {
   if (getBottom().getParentAlgorithm() instanceof AlgoPolygonRegularND) {
    AlgoPolygonRegularND algo = (AlgoPolygonRegularND) getBottom().getParentAlgorithm();
    int nOld = algo.getCurrentPointsLength();
    if (nOld < n) {
     algo.compute(n);
     updateOutput(n);
     algo.compute(nOld);
    } else {
     updateOutput(n);
    }
   } else {
    GeoPolygon polygon = getBottom();
    int nOld = polygon.getPointsLength();
    if (nOld < n) {
     polygon.setPointsAndSegmentsLength(n);
     updateOutput(n);
     polygon.setPointsAndSegmentsLength(nOld);
    }
    updateOutput(n);
   }
  }
 }
 protected abstract int getSideLengthFromLabelsLength(int length);
 protected void initCoords() {
 }
 protected abstract void updateOutputPoints();
 protected abstract void updateOutputSegmentsAndPolygonsParentAlgorithms();
 private void createPolyhedron() {
  GeoPointND[] bottomPoints1 = getBottomPoints();
  if (bottomPoints1 == null) {
   if (getBottom().getParentAlgorithm() instanceof AlgoPolygonRegularND) {
    AlgoPolygonRegularND algo = (AlgoPolygonRegularND) getBottom().getParentAlgorithm();
    algo.compute(3);
    bottomPoints1 = getBottomPoints();
    createPolyhedron(bottomPoints1);
    algo.compute(2);
   }
  } else {
   createPolyhedron(bottomPoints1);
  }
 }
 protected abstract void createPolyhedron(GeoPointND[] bottomPoints1);
 protected abstract void updateOutput(int newBottomPointsLength);
 protected void setBottom(GeoPolyhedron polyhedron) {
  if (bottom != null) {
   polyhedron.addPolygonLinked(bottom);
  } else {
   GeoPointND[] bottomPoints1 = getBottomPoints();
   polyhedron.startNewFace();
   for (int i = 0; i < bottomPoints1.length; i++) {
    polyhedron.addPointToCurrentFace(bottomPoints1[i]);
   }
   polyhedron.endCurrentFace();
  }
 }
 protected GeoPolygon getBottom() {
  if (bottom != null) {
   return bottom;
  }
  return outputPolygonsBottom.getElement(0);
 }
 protected int getShift() {
  return shift;
 }
 public boolean preCompute() {
  if (bottomAsInput) {
   if (!getBottom().isDefined()) {
    polyhedron.setUndefined();
    return false;
   }
   polyhedron.setDefined();
   updateOutput(bottom.getPointsLength());
   if (height == null && !getBottom().wasInitLabelsCalled()) {
    updateOutputSegmentsAndPolygonsParentAlgorithms();
   }
  } 
  double h;
  updateBottom();
  if (height != null) {
   h = height.getDouble();
  } else {
   h = getTopPoint()
     .getInhomCoordsInD3()
     .distPlaneOriented(
       getBottomPoints()[0].getInhomCoordsInD3(), getBottom().getDirectionInD3());
  }
  updateVolume(Math.abs(h));
  polyhedron.setOrientedHeight(h);
  if (height != null) {
   boolean isBottomInverse =
     bottomAsInput && bottom != null && bottom.isConvexInverseDirection();
   polyhedron.setReverseNormalsForDrawing(isBottomInverse ^ (height.getDouble() < 0));
  }
  return true;
 }
 protected abstract void updateVolume(double heightVal);
 private void updateBottom() {
  if (!bottomAsInput) {
   ((GeoPolygon3D) getBottom()).updateCoordSys();
   getBottom().calcArea();
  }
 }
 protected GeoPointND[] getBottomPoints() {
  if (bottom != null) {
   return bottom.getPointsND();
  }
  return bottomPoints;
 }
 protected GeoPointND getTopPoint() {
  return topPoint;
 }
 private void setTopPoint(GeoPointND p) {
  topPoint = p;
 }
 public void setOutputOtherEuclidianVisible(boolean visible) {
  for (int i = 0; i < outputSegmentsBottom.size(); i++) {
   outputSegmentsBottom.getElement(i).setEuclidianVisible(visible);
  }
  for (int i = 0; i < outputSegmentsSide.size(); i++) {
   outputSegmentsSide.getElement(i).setEuclidianVisible(visible);
  }
  for (int i = 0; i < outputSegmentsTop.size(); i++) {
   outputSegmentsTop.getElement(i).setEuclidianVisible(visible);
  }
  for (int i = 0; i < outputPolygonsBottom.size(); i++) {
   outputPolygonsBottom.getElement(i).setEuclidianVisible(visible, false);
  }
  for (int i = 0; i < outputPolygonsSide.size(); i++) {
   outputPolygonsSide.getElement(i).setEuclidianVisible(visible, false);
  }
  for (int i = 0; i < outputPolygonsTop.size(); i++) {
   outputPolygonsTop.getElement(i).setEuclidianVisible(visible, false);
  }
 }
 public void notifyUpdateOutputOther() {
  for (int i = 0; i < outputSegmentsBottom.size(); i++) {
   getKernel().notifyUpdate(outputSegmentsBottom.getElement(i));
  }
  for (int i = 0; i < outputSegmentsSide.size(); i++) {
   getKernel().notifyUpdate(outputSegmentsSide.getElement(i));
  }
  for (int i = 0; i < outputSegmentsTop.size(); i++) {
   getKernel().notifyUpdate(outputSegmentsTop.getElement(i));
  }
  for (int i = 0; i < outputPolygonsBottom.size(); i++) {
   getKernel().notifyUpdate(outputPolygonsBottom.getElement(i));
  }
  for (int i = 0; i < outputPolygonsSide.size(); i++) {
   getKernel().notifyUpdate(outputPolygonsSide.getElement(i));
  }
  for (int i = 0; i < outputPolygonsTop.size(); i++) {
   getKernel().notifyUpdate(outputPolygonsTop.getElement(i));
  }
 }
 public void setOutputPointsEuclidianVisible(boolean visible) {
  for (int i = 0; i < outputPoints.size(); i++) {
   outputPoints.getElement(i).setEuclidianVisible(visible);
  }
 }
 public void notifyUpdateOutputPoints() {
  for (int i = 0; i < outputPoints.size(); i++) {
   getKernel().notifyUpdate(outputPoints.getElement(i));
  }
 }
 public GeoPolygon getTopFace() {
  return outputPolygonsTop.getElement(0);
 }
 public GeoPolygon3D getSide(int i) {
  return outputPolygonsSide.getElement(i);
 }
 public NumberValue getHeight() {
  return height;
 }
 protected final boolean isFirstInputPointVisible() {
  GeoElement point = (GeoElement) getBottomPoints()[0];
  return point.isEuclidianVisible() && point.isLabelSet();
 }
 protected final boolean isFirstInputPointLabelVisible() {
  return ((GeoElement) getBottomPoints()[0]).getLabelVisible();
 }
 protected static void addToOutputIf3D(
   OutputHandler<GeoSegment3D> outputSegmentsHandler, GeoSegmentND segment) {
  if (segment instanceof GeoSegment3D) {
   outputSegmentsHandler.addOutput((GeoSegment3D) segment, false);
  }
 }
 protected void setLabels(String[] labels) {
  kernel.batchAddStarted();
  if (labels == null || labels.length <= 1) {
   polyhedron.initLabels(labels);
  } else {
   augmentOutputSize(labels.length);
   for (int i = 0; i < labels.length; i++) {
    getOutput(i).setLabel(labels[i]);
   }
   polyhedron.setAllLabelsAreSet(true);
  }
  kernel.batchAddComplete();
 }
}
```
